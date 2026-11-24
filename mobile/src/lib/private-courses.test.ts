/// <reference types="node" />
// The public/private split. Public builds (the App Store) have no Japanese or philosophy at all;
// the owner's private build has both. These tests load the app's state code both ways.
import "expo-sqlite/localStorage/install";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import fs from "node:fs";
import path from "node:path";

type Store = typeof import("./store");
type Progress = typeof import("./progress");

/** Load the state code the way a build with the gate on or off would. Storage is shared between loads. */
function load(priv: boolean) {
  process.env.EXPO_PUBLIC_PRIVATE_COURSES = priv ? "1" : "0";
  let store!: Store, progress!: Progress;
  jest.isolateModules(() => {
    /* eslint-disable @typescript-eslint/no-require-imports */
    store = require("./store");
    progress = require("./progress");
    /* eslint-enable @typescript-eslint/no-require-imports */
  });
  return { store, progress };
}

const KEY = "skepsis:v1";
const saved = () => JSON.parse(localStorage.getItem(KEY) as string);
const K_SAVED = { done: { u1l1: { at: "2026-11-01", perfect: true } }, sittings: { u1l2: 1 }, items: {}, mistakes: {}, answered: 12, correct: 9, futureField: "keep me" };
const L_SAVED = { done: { u01l1: { at: "2026-11-02", last: "2026-11-02", n: 1 } }, items: { "u01-thales": { box: 2, due: "2026-11-05", right: 1, wrong: 0 } }, comebacks: 0, badges: {} };

beforeEach(() => { localStorage.clear(); });

describe("public build (no private courses)", () => {
  it("has only the Greek course: a saved Komorebi or Logos choice lands on Skepsis with XP and streak intact", () => {
    for (const course of ["komorebi", "logos"]) {
      localStorage.setItem(KEY, JSON.stringify({ course, xp: 120, streak: 4, bestStreak: 6, lastDay: "2026-11-20", komorebi: K_SAVED, logos: L_SAVED }));
      const { store } = load(false);
      const s = store.getState();
      expect(s.course).toBe("skepsis");
      expect(s.xp).toBe(120);
      expect(s.streak).toBe(4);
      expect(s.bestStreak).toBe(6);
    }
  });

  it("keeps saved private progress untouched through load, finish and save", () => {
    localStorage.setItem(KEY, JSON.stringify({ course: "komorebi", xp: 50, streak: 2, komorebi: K_SAVED, logos: L_SAVED }));
    const { store, progress } = load(false);
    progress.finishRun({ mode: "lesson", nodeId: "u1l1", unitId: "u1", scored: 5, right: 5, misses: 0, maxCombo: 5, seconds: 30, origins: 0 });
    store.update((s) => { s.haptics = false; });
    const out = saved();
    expect(out.komorebi).toEqual(K_SAVED);
    expect(out.logos).toEqual(L_SAVED);
    expect(out.course).toBe("skepsis");
    expect(out.xp).toBeGreaterThan(50);
  });

  it("round-trips: private data saved by a public build is still readable by a private one", () => {
    localStorage.setItem(KEY, JSON.stringify({ komorebi: K_SAVED, logos: L_SAVED }));
    load(false).store.update((s) => { s.reviewAsked = true; });
    const { store } = load(true);
    expect(store.getState().komorebi.done.u1l1).toBeTruthy();
    expect(store.getState().logos.done.u01l1.n).toBe(1);
  });

  it("starts fresh users without any private fields", () => {
    const s = load(false).store.getState();
    expect(s.course).toBe("skepsis");
    expect("komorebi" in s).toBe(false);
    expect("logos" in s).toBe(false);
  });

  it("ignores a private mode if one ever reaches it", () => {
    const { store, progress } = load(false);
    const o = progress.finishRun({ mode: "logos", nodeId: "u01l1", scored: 0, right: 0, misses: 0, maxCombo: 0, seconds: 1, origins: 0 });
    expect(o.courseBadges).toBeUndefined();
    expect("logos" in store.getState()).toBe(false);
  });
});

describe("private build", () => {
  it("has all three courses' state and keeps the saved course", () => {
    localStorage.setItem(KEY, JSON.stringify({ course: "logos", logos: L_SAVED }));
    const s = load(true).store.getState();
    expect(s.course).toBe("logos");
    expect(s.komorebi.done).toEqual({});
    expect(s.logos.done.u01l1).toBeTruthy();
    const fresh = (localStorage.clear(), load(true).store.getState());
    expect(fresh.course).toBe("skepsis");
    expect(fresh.logos.done).toEqual({});
  });

  it("falls back to Skepsis for an unknown saved course", () => {
    localStorage.setItem(KEY, JSON.stringify({ course: "klingon" }));
    expect(load(true).store.getState().course).toBe("skepsis");
  });
});

describe("the gate in the source", () => {
  const srcDir = path.join(__dirname, "..");
  const walk = (d: string): string[] => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === "vendor" ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
  const files = walk(srcDir).filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\./.test(f));
  const rel = (f: string) => path.relative(srcDir, f);
  const PRIVATE = /(^|\/)(komorebi|logos)(\/|$)|screens\/(komorebi|logos)|private-courses|japanese-voice/;
  // Files that belong to the private build only. Anything inside them may import private code.
  const privateFiles = (f: string) => /^(komorebi|logos|screens\/komorebi|screens\/logos)\//.test(rel(f)) || ["lib/private-courses.ts", "screens/learn/private-courses.tsx", "lib/japanese-voice.ts"].includes(rel(f));
  const valueImports = (text: string) => [...text.matchAll(/^import\s+(?!type\b)[^;]*?from\s+["']([^"']+)["']/gms)].map((m) => m[1]);
  const requires = (text: string) => [...text.matchAll(/\brequire\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]);

  it("never statically imports private code from a file the public build loads", () => {
    const leaks: string[] = [];
    for (const f of files) {
      if (privateFiles(f)) continue;
      for (const spec of valueImports(fs.readFileSync(f, "utf8"))) if (PRIVATE.test(spec)) leaks.push(`${rel(f)} imports ${spec}`);
    }
    expect(leaks).toEqual([]);
  });

  it("requires private code only behind the inline env check, in the same file", () => {
    const bad: string[] = [];
    let gated = 0;
    for (const f of files) {
      if (privateFiles(f)) continue;
      const text = fs.readFileSync(f, "utf8");
      for (const spec of requires(text)) {
        if (!PRIVATE.test(spec)) continue;
        gated += 1;
        if (!/process\.env\.EXPO_PUBLIC_PRIVATE_COURSES === "1"\s*\?\s*[^;]*require\(/s.test(text)) bad.push(`${rel(f)} requires ${spec} without the inline env check`);
      }
    }
    expect(gated).toBeGreaterThanOrEqual(5);
    expect(bad).toEqual([]);
  });

  it("keeps analytics off in the private build and the config guarded", () => {
    expect(fs.readFileSync(path.join(srcDir, "lib/analytics.ts"), "utf8")).toMatch(/!PRIVATE_BUILD && /);
    const cfg = fs.readFileSync(path.join(srcDir, "../app.config.js"), "utf8");
    expect(cfg).toMatch(/if \(priv && !dev\)\s*\{\s*throw/);
    const eas = JSON.parse(fs.readFileSync(path.join(srcDir, "../eas.json"), "utf8"));
    expect(eas.build.production.env.EXPO_PUBLIC_PRIVATE_COURSES).toBe("0");
    expect(eas.build.production.env.APP_VARIANT).toBe("production");
  });
});
