import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { E, IX, NODES } from "@/course";
import { analyticsAvailable, flush, track } from "./analytics";
import { finishRun } from "./progress";
import { CHEST_REWARD, QUESTS, ensureQuests, questById, questEvent, questStatus } from "./quests";
import { exportJson, getState, resetAll, update } from "./store";

beforeEach(() => resetAll());

describe("course bridge", () => {
  it("loads the shared lessons and engine", () => {
    expect(IX.items.size).toBeGreaterThan(90);
    expect(NODES[0].id).toBe("u1l1");
    expect(E.buildLesson(IX, getState(), "u1l1", 1).length).toBeGreaterThan(5);
  });
});

describe("quests", () => {
  it("picks the same three quests for a given day, always including a show-up quest", () => {
    const a = update((s) => { s.quests = null; ensureQuests(s, "2026-10-31"); }).quests!;
    const b = update((s) => { s.quests = null; ensureQuests(s, "2026-10-31"); }).quests!;
    expect(a.ids).toEqual(b.ids);
    expect(new Set(a.ids).size).toBe(3);
    expect(["xp30", "lessons2"]).toContain(a.ids[0]);
  });

  it("rolls over to new quests on a new day", () => {
    update((s) => { ensureQuests(s, "2026-10-30"); s.quests!.progress.x = 1; });
    const q = update((s) => { ensureQuests(s, "2026-10-31"); }).quests!;
    expect(q.day).toBe("2026-10-31");
    expect(q.progress).toEqual({});
  });

  it("adds or keeps the max, and never goes past the target", () => {
    const s = getState();
    update((x) => { x.quests = { day: E.dayKey(), ids: ["xp30", "combo5", "origin3"], progress: {}, claimed: {}, chest: false }; });
    update((x) => { questEvent(x, "xp", 20); questEvent(x, "xp", 20); questEvent(x, "combo", 3); questEvent(x, "combo", 2); });
    const q = getState().quests!;
    expect(q.progress.xp30).toBe(30);
    expect(q.progress.combo5).toBe(3);
    expect(questStatus(q)).toEqual({ ready: 1, done: 1, total: 3 });
    expect(s).not.toBe(getState()); // update makes a new object, so React sees the change
  });

  it("every quest has a positive target and reward", () => {
    for (const q of QUESTS) { expect(q.target).toBeGreaterThan(0); expect(q.reward).toBeGreaterThan(0); }
    expect(questById("xp30").reward).toBe(10);
    expect(CHEST_REWARD).toBeGreaterThan(0);
  });
});

describe("finishing a run", () => {
  it("pays XP, drachmas and starts a streak for a perfect first lesson", () => {
    const o = finishRun({ mode: "lesson", nodeId: "u1l1", unitId: "u1", scored: 8, right: 8, misses: 0, maxCombo: 8, seconds: 120, origins: 0 });
    const s = getState();
    expect(o.xp).toBe(10 + 5 + 2);
    expect(o.drachmas).toBe(10);
    expect(o.firstToday).toBe(true);
    expect(s.streak).toBe(1);
    expect(s.done.u1l1.perfect).toBe(true);
    expect(o.badges.map((b) => b.id)).toEqual(expect.arrayContaining(["first", "perfect"]));
    expect(s.lessonsFinished).toBe(1);
  });

  it("only celebrates the streak once a day", () => {
    finishRun({ mode: "lesson", nodeId: "u1l1", scored: 4, right: 3, misses: 1, maxCombo: 2, seconds: 60, origins: 0 });
    const second = finishRun({ mode: "practice", scored: 4, right: 4, misses: 0, maxCombo: 4, seconds: 60, origins: 0 });
    expect(second.firstToday).toBe(false);
    expect(getState().practices).toBe(1);
  });

  it("rodeo records a new best and pays per ride", () => {
    const o = finishRun({ mode: "rodeo", scored: 7, right: 6, misses: 1, maxCombo: 6, seconds: 50, origins: 2 });
    expect(o.newBest).toBe(true);
    expect(getState().rodeoBest).toBe(6);
    expect(o.xp).toBe(6);
    expect(o.drachmas).toBe(3 + 5);
  });

  it("a bucked-off rodeo with zero rides gives no XP and keeps the streak untouched", () => {
    const o = finishRun({ mode: "rodeo", scored: 1, right: 0, misses: 1, maxCombo: 0, seconds: 8, origins: 0 });
    expect(o.xp).toBe(0);
    expect(getState().streak).toBe(0);
  });
});

describe("privacy", () => {
  it("export contains progress but no personal fields", () => {
    const json = JSON.parse(exportJson());
    expect(json).toHaveProperty("xp");
    for (const k of ["name", "email", "phone", "location"]) expect(json).not.toHaveProperty(k);
  });

  it("sends nothing when analytics is off", async () => {
    const fetchSpy = jest.fn(async () => ({ ok: true }));
    globalThis.fetch = fetchSpy as never;
    update((s) => { s.analytics = false; });
    track("lesson_completed", { xp: 10 });
    await flush();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("this test build has no analytics key, so it can never send", () => {
    expect(analyticsAvailable).toBe(false);
  });
});
