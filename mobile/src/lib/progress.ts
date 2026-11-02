// What happens when a lesson, practice or rodeo ends: XP, streak, drachmas, quests, badges.
// The rules for XP and streaks are the website's (app/src/app.js › finishRun / finishRodeo).
import * as StoreReview from "expo-store-review";

import { E, type Badge } from "@/course";
import { track } from "./analytics";
import { questEvent } from "./quests";
import { reschedule } from "./reminders";
import { getState, update } from "./store";

export type Mode = "lesson" | "roundup" | "practice" | "rodeo";

export type RunSummary = {
  mode: Mode; nodeId?: string; unitId?: string;
  scored: number; right: number; misses: number; maxCombo: number; seconds: number; origins: number;
};

export type Outcome = {
  xp: number; drachmas: number; perfect: boolean; accuracy: number;
  streak: number; streakUp: boolean; firstToday: boolean; usedFreeze: number;
  badges: Badge[]; goalMetNow: boolean; newBest?: boolean;
};

export function finishRun(r: RunSummary): Outcome {
  const t = E.dayKey();
  const before = getState();
  const firstToday = before.lastDay !== t;
  const goalBefore = (before.days[t] || 0) >= before.goal;
  const perfect = r.misses === 0;
  let out!: Outcome;

  update((s) => {
    let xp: number, coins: number, newBest: boolean | undefined;
    if (r.mode === "rodeo") {
      newBest = r.right > s.rodeoBest;
      if (newBest) s.rodeoBest = r.right;
      xp = Math.min(r.right, 20);
      coins = Math.floor(r.right / 2) + (newBest && r.right > 0 ? 5 : 0);
      questEvent(s, "rodeo", r.right);
    } else {
      xp = { lesson: 10, roundup: 15, practice: 8 }[r.mode] + (perfect ? 5 : 0) + (r.maxCombo >= 5 ? 2 : 0);
      coins = 5 + (perfect ? 5 : 0) + (r.mode === "roundup" ? 10 : 0);
      if (r.mode === "practice") { s.practices += 1; questEvent(s, "practice", 1); }
      if (r.nodeId && (r.mode === "lesson" || r.mode === "roundup")) s.done[r.nodeId] = { perfect, at: t };
      s.lessonsFinished += 1;
      questEvent(s, "lessons", 1);
      if (perfect) questEvent(s, "perfect", 1);
    }
    let st = { streakUp: false, usedFreeze: 0, reset: false };
    if (xp > 0) { E.addXp(s, t, xp); st = E.touchStreak(s, t); }
    questEvent(s, "xp", xp);
    questEvent(s, "combo", r.maxCombo);
    questEvent(s, "correct", r.right);
    if (r.origins) questEvent(s, "origin", r.origins);
    s.drachmas += coins;
    const badges = E.awardBadges(s, t);
    out = {
      xp, drachmas: coins, perfect, accuracy: r.scored ? r.right / r.scored : 1,
      streak: s.streak, streakUp: st.streakUp, firstToday: firstToday && st.streakUp, usedFreeze: st.usedFreeze,
      badges, goalMetNow: !goalBefore && (s.days[t] || 0) >= s.goal, newBest,
    };
  });

  const s = getState();
  track(r.mode === "rodeo" ? "rodeo_finished" : "lesson_completed", {
    mode: r.mode, lesson_id: r.nodeId ?? null, unit_id: r.unitId ?? null, accuracy: out.accuracy, perfect, xp: out.xp,
    drachmas: out.drachmas, seconds: r.seconds, max_combo: r.maxCombo, streak: s.streak, used_freeze: out.usedFreeze > 0,
    total_xp: s.xp, learned: Object.keys(s.items).length, rides: r.mode === "rodeo" ? r.right : undefined, new_best: out.newBest,
  });
  for (const b of out.badges) track("badge_earned", { badge: b.id });
  if (out.goalMetNow) track("daily_goal_met", { goal: s.goal, streak: s.streak });
  reschedule();
  return out;
}

/** Ask for an App Store rating once, after the 3rd finished lesson (a happy moment). */
export async function maybeAskReview() {
  const s = getState();
  if (s.reviewAsked || s.lessonsFinished < 3) return;
  update((x) => { x.reviewAsked = true; });
  try {
    if (await StoreReview.hasAction()) {
      track("review_prompted");
      await StoreReview.requestReview();
    }
  } catch {
    // Not available (simulator, Expo Go): fine.
  }
}
