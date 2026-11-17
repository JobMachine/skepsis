import { beforeEach, describe, expect, it } from "@jest/globals";

import { finishRun } from "@/lib/progress";
import { getState, resetAll } from "@/lib/store";
import { KE, KIX, lessonStatus, nextLesson } from "./index";

beforeEach(() => resetAll());

const SHOWN = new Set(["teach", "choice", "tiles", "romaji", "scenario"]);

describe("Komorebi course inside the app", () => {
  it("loads all chapters, including Lessons from tutor classes", () => {
    expect(KIX.units.length).toBeGreaterThanOrEqual(13);
    expect(KIX.unitById.get("u13")?.title).toBe("Lessons");
    expect(nextLesson(getState().komorebi)?.id).toBe("u1l1");
  });

  it("builds only step types the app can show, for every sitting of every lesson", () => {
    const k = getState().komorebi;
    for (const l of KIX.lessons) {
      const sittings = KE.lessonSittings(KIX, l.id);
      expect(sittings.length).toBeGreaterThan(0);
      sittings.forEach((_, j) => {
        const steps = KE.buildLesson(KIX, k, l.id, 7, j);
        expect(steps.length).toBeGreaterThan(2);
        for (const st of steps) expect(SHOWN.has(st.type)).toBe(true);
      });
    }
  });

  it("marks a lesson done after its last part, and shares XP with Skepsis", () => {
    const total = lessonStatus(getState().komorebi, "u13l1").total;
    const run = { mode: "komorebi" as const, nodeId: "u13l1", unitId: "u13", scored: 5, right: 5, misses: 0, maxCombo: 5, seconds: 60, origins: 0 };
    for (let j = 0; j < total; j++) finishRun({ ...run, lessonDone: j + 1 >= total });
    const s = getState();
    expect(s.komorebi.done.u13l1).toBeTruthy();
    expect(s.done.u13l1).toBeUndefined();
    expect(s.xp).toBeGreaterThan(0);
    expect(s.streak).toBe(1);
  });

  it("survives a saved state from before Komorebi existed", () => {
    const k = KE.repairState(undefined);
    expect(k.done).toEqual({});
  });
});
