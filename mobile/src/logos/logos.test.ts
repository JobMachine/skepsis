/// <reference types="node" />
import { beforeEach, describe, expect, it } from "@jest/globals";
import fs from "node:fs";
import path from "node:path";

import { finishRun } from "@/lib/progress";
import { getState, resetAll } from "@/lib/store";
import { LE, LIX, UNOFFICIAL, allThinkers, episodesDone, nextEpisode } from "./index";
import { plan } from "./plan";

beforeEach(() => resetAll());

const TAP_STEPS = new Set(["recap", "card", "mcq", "match", "recall"]);
const run = (mode: "logos" | "logos-refresh" | "logos-exam", nodeId?: string) =>
  finishRun({ mode, nodeId, unitId: nodeId?.split("l")[0], scored: 0, right: 0, misses: 0, maxCombo: 0, seconds: 30, origins: 0 });

describe("Logos course inside the app", () => {
  it("loads the synced episodes, each one numbered with its official links", () => {
    expect(LIX.lessons.length).toBeGreaterThanOrEqual(1);
    const episodes = LIX.lessons.map((l) => l.episode);
    expect(new Set(episodes).size).toBe(episodes.length);
    for (const l of LIX.lessons) for (const k of ["page", "spotify", "transcript"] as const) expect(l[k]).toMatch(/^https:\/\//);
    expect(nextEpisode(getState().logos)?.id).toBe(LIX.lessons[0].id);
  });

  it("picks up every synced unit file, so new episodes need no code change", () => {
    const vendor = path.join(__dirname, "vendor");
    const files = fs.readdirSync(path.join(vendor, "units")).filter((f) => /^u\d+\.js$/.test(f));
    const index = fs.readFileSync(path.join(vendor, "index.js"), "utf8");
    for (const f of files) expect(index).toContain(`./units/${f}`);
    expect(LIX.course.units.length).toBe(files.length);
  });

  it("builds only tap steps for every lesson, refresh and roundup", () => {
    const s = getState().logos;
    for (const l of LIX.lessons) {
      for (let seed = 1; seed <= 10; seed++) {
        const steps = LE.buildLesson(LIX, s, l.id, seed);
        expect(steps[0].type).toBe("recap");
        expect(steps.at(-1)?.type).toBe("match");
        expect(steps.every((q) => TAP_STEPS.has(q.type))).toBe(true);
        for (const q of steps) if (q.type === "mcq") expect(q.options).toContain(q.answer);
        for (const q of steps) if (q.type === "mcq") expect(q.options.length).toBeLessThanOrEqual(3);
      }
    }
  });

  it("plans first listen, refresh once done, and a mixed refresh", () => {
    const id = LIX.lessons[0].id;
    expect(plan(id).mode).toBe("logos");
    expect(plan(id).welcome).toBe(true);
    expect(plan(undefined, true).steps).toEqual([]); // nothing learned yet
    run("logos", id);
    for (const it of LE.lessonTerms(LIX, id)) LE.learn(getState().logos, it.id, LE.dayKey());
    expect(plan(id).mode).toBe("logos-refresh");
    expect(plan("nope").steps).toEqual([]);
  });

  it("finishing always earns the same XP, shares XP and streak, and keeps Logos progress apart", () => {
    const id = LIX.lessons[0].id;
    const o = run("logos", id);
    const s = getState();
    expect(o.xp).toBe(LE.XP.lesson);
    expect(o.accuracy).toBe(1);
    expect(s.xp).toBe(LE.XP.lesson);
    expect(s.streak).toBe(1);
    expect(s.logos.done[id]).toMatchObject({ n: 1 });
    expect(s.done[id]).toBeUndefined();
    expect(s.komorebi.done).toEqual({});
    expect(episodesDone(s.logos)).toBe(1);
    expect(o.courseBadges?.map((b) => b.id)).toContain("first_step");
    expect(run("logos-refresh", id).xp).toBe(LE.XP.refresh);
    expect(getState().logos.done[id].n).toBe(2);
  });

  it("can never be failed: a run full of wrong taps pays exactly what a clean one does", () => {
    const id = LIX.lessons[0].id;
    const o = finishRun({ mode: "logos", nodeId: id, unitId: "u01", scored: 10, right: 0, misses: 10, maxCombo: 0, seconds: 30, origins: 0 });
    expect(o.xp).toBe(LE.XP.lesson);
    expect(getState().logos.done[id]).toBeTruthy();
    expect(getState().xp).toBe(LE.XP.lesson);
  });

  it("lists thinkers in historical order and says it is unofficial", () => {
    const all = allThinkers(getState().logos);
    expect(all.length).toBeGreaterThan(3);
    expect(all.map((x) => x.sort)).toEqual([...all.map((x) => x.sort)].sort((a, b) => a - b));
    expect(UNOFFICIAL).toMatch(/unofficial/i);
    expect(UNOFFICIAL).toMatch(/not affiliated with Philosophize This!/);
    const screens = ["learn.tsx", "steps.tsx", "runner.tsx"].map((f) => fs.readFileSync(path.join(__dirname, "../screens/logos", f), "utf8")).join("\n");
    expect(screens).toContain("Unofficial");
  });

  it("repairs a damaged saved Logos state instead of crashing", () => {
    expect(LE.normalizeState({ done: "x", items: 5, xp: -1 }, LIX).done).toEqual({});
    expect(LE.normalizeState(null, LIX).comebacks).toBe(0);
  });
});

describe("Logos era exam inside the app", () => {
  it("plans the exam, asks only taps, and keeps the best first-try count", () => {
    const exam = LE.pathNodes(LIX).find((n) => n.kind === "exam");
    if (!exam) return; // the course needs two episodes in one era first
    const before = plan(exam.id);
    expect(before.mode).toBe("logos-exam");
    expect(before.steps.length).toBeGreaterThanOrEqual(10);
    expect(before.steps.every((q) => q.type === "mcq" && q.exam && q.options.includes(q.answer))).toBe(true);
    finishRun({ mode: "logos-exam", nodeId: exam.id, unitId: exam.unitId, scored: 12, right: 7, misses: 0, maxCombo: 0, seconds: 60, origins: 0 });
    finishRun({ mode: "logos-exam", nodeId: exam.id, unitId: exam.unitId, scored: 12, right: 5, misses: 0, maxCombo: 0, seconds: 60, origins: 0 });
    expect(getState().logos.exams?.[exam.id]).toMatchObject({ best: 7, last: 5, total: 12 });
  });
});
