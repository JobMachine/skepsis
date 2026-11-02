// Daily quests: three small goals a day that pay drachmas (in-app coins, no real money).
// Picked by date, so they're the same for everyone on a given day. Finish all three for a chest.
import { E } from "@/course";
import type { AppState, QuestDay } from "./store";

export type QuestMetric = "xp" | "combo" | "perfect" | "lessons" | "rodeo" | "practice" | "correct" | "origin";
export type Quest = { id: string; title: string; metric: QuestMetric; target: number; reward: number; mode: "add" | "max"; icon: string };

export const QUESTS: Quest[] = [
  { id: "xp30", title: "Earn 30 XP", metric: "xp", target: 30, reward: 10, mode: "add", icon: "bolt.fill" },
  { id: "combo5", title: "Get 5 right in a row", metric: "combo", target: 5, reward: 10, mode: "max", icon: "flame.fill" },
  { id: "perfect1", title: "Finish a lesson with no misses", metric: "perfect", target: 1, reward: 15, mode: "add", icon: "star.fill" },
  { id: "lessons2", title: "Finish 2 lessons", metric: "lessons", target: 2, reward: 10, mode: "add", icon: "book.fill" },
  { id: "rodeo5", title: "Stay on for 5 Rodeo rides", metric: "rodeo", target: 5, reward: 15, mode: "max", icon: "timer" },
  { id: "practice1", title: "Do one practice session", metric: "practice", target: 1, reward: 10, mode: "add", icon: "arrow.clockwise" },
  { id: "correct15", title: "Answer 15 questions right", metric: "correct", target: 15, reward: 10, mode: "add", icon: "checkmark.seal.fill" },
  { id: "origin3", title: "Call 3 words Greek or not", metric: "origin", target: 3, reward: 10, mode: "add", icon: "questionmark.circle.fill" },
];
export const CHEST_REWARD = 25;

export const questById = (id: string) => QUESTS.find((q) => q.id === id)!;

function pickForDay(day: string): string[] {
  const n = Math.abs(E.daysBetween("2026-01-01", day));
  const r = E.rng(n * 9301 + 49297);
  // Always one "show up" quest (XP or lessons), plus two others.
  const anchor = r() < 0.5 ? "xp30" : "lessons2";
  const rest = E.shuffle(QUESTS.filter((q) => q.id !== "xp30" && q.id !== "lessons2").map((q) => q.id), r);
  return [anchor, rest[0], rest[1]];
}

/** Today's quests (rolls over at midnight). Call inside update(). */
export function ensureQuests(s: AppState, today = E.dayKey()): QuestDay {
  if (!s.quests || s.quests.day !== today) {
    s.quests = { day: today, ids: pickForDay(today), progress: {}, claimed: {}, chest: false };
  }
  return s.quests;
}

/** Record progress on a metric. Call inside update(). */
export function questEvent(s: AppState, metric: QuestMetric, value: number) {
  const qd = ensureQuests(s);
  for (const id of qd.ids) {
    const q = questById(id);
    if (q.metric !== metric) continue;
    const cur = qd.progress[id] || 0;
    qd.progress[id] = Math.min(q.target, q.mode === "add" ? cur + value : Math.max(cur, value));
  }
}

export function questStatus(qd: QuestDay | null) {
  if (!qd) return { ready: 0, done: 0, total: 3 };
  let ready = 0, done = 0;
  for (const id of qd.ids) {
    const full = (qd.progress[id] || 0) >= questById(id).target;
    if (full) done++;
    if (full && !qd.claimed[id]) ready++;
  }
  return { ready, done, total: qd.ids.length };
}
