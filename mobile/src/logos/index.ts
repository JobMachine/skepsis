// Logos (philosophy, one lesson per podcast episode) as a private course inside the Skepsis app.
// The course and its engine are Logos's own files, copied into ./vendor by `npm run logos:sync`
// (source of truth: the Logos repo, philosophy.tryskepsis.com). New episodes arrive by re-running
// the sync: nothing here lists episodes. Progress lives in AppState.logos; XP and the streak are
// shared with Skepsis.
//
// Only private builds (EXPO_PUBLIC_PRIVATE_COURSES=1) may import this file at runtime.
// See src/lib/private-courses.ts.

export type LTerm = {
  id: string; kind: "term"; term: string; meaning: string; say: string; status: string; src: string; sourceIds: string[];
  person?: boolean; ask?: string; use?: string; hook?: string; literal?: string;
};
export type LPairs = { id: string; kind: "pairs"; set: string; pairs: { l: string; r: string }[]; say: string; status: string; src: string; sourceIds: string[] };
export type LThinker = { id: string; name: string; dates: string; sort: number; place: string; idea: string };
export type LLesson = {
  id: string; episode: number; title: string; minutes: number; page: string; spotify: string; transcript: string;
  recap: string[]; fieldwork?: string; thinkers: LThinker[]; items: (LTerm | LPairs)[];
};
export type LUnit = { id: string; title: string; blurb: string; caveat?: string; lessons: LLesson[] };
export type LSource = { id: string; title: string; url: string; publisher: string; note: string };

/** An item as the index returns it: with where it sits. */
export type LIndexedTerm = LTerm & { lessonId: string; unitId: string; episode: number };
export type LIndexedLesson = LLesson & { unitId: string };
export type LIndex = {
  course: { units: LUnit[] };
  items: Map<string, LIndexedTerm | (LPairs & { lessonId: string; unitId: string; episode: number })>;
  lessons: LIndexedLesson[];
  terms: LIndexedTerm[];
  unitOf(id: string): LUnit | undefined;
  lessonOf(id: string): LIndexedLesson | undefined;
};
export type LNode = { id: string; unitId: string; title: string; kind: "lesson" | "exam"; episode?: number };

export type LState = {
  done: Record<string, { at: string; last: string; n: number }>;
  items: Record<string, { box: number; due: string; right: number; wrong: number }>;
  comebacks: number;
  badges: Record<string, string>;
  exams?: Record<string, { best: number; total: number; last: number; at: string }>;
  [k: string]: unknown;
};
export type LBadge = { id: string; name: string; desc: string };
export type LMemory = { total: number; seen: number; due: number; level: number; max: number; label: string };

type LBase = { itemId: string; label: string };
export type LRecap = { type: "recap"; lessonId: string; closing?: boolean };
export type LCard = { type: "card"; itemId: string };
/** An exam question about a thinker (timeline, school, who said what) has no idea card behind it: itemId is null. */
export type LMcq = Omit<LBase, "itemId"> & { itemId: string | null; type: "mcq"; form: "meaning" | "reverse" | "born" | "school" | "who"; prompt: string; mark?: string; quote?: string; options: string[]; answer: string; hint?: string; explain?: string; exam?: boolean };
export type LMatch = LBase & { type: "match"; prompt: string; pairs: [string, string][]; left: string[]; right: string[] };
export type LRecallCard = LBase & { episode: number; ask: string; mark: string; hint: string; back: string; more: string };
export type LRecall = { type: "recall"; cards: LRecallCard[] };
export type LStep = LRecap | LCard | LMcq | LMatch | LRecall;

type LEngine = {
  XP: { lesson: number; refresh: number; exam: number };
  REFRESH_N: number;
  dayKey(d?: Date): string;
  freshState(): LState;
  normalizeState(raw: unknown, ix: LIndex): LState;
  indexCourse(units: LUnit[]): LIndex;
  pathNodes(ix: LIndex): LNode[];
  lessonTerms(ix: LIndex, lessonId: string): LIndexedTerm[];
  isOpen(ix: LIndex, s: LState, nodeId: string): boolean;
  nextNode(ix: LIndex, s: LState): LNode | null;
  lessonMemory(ix: LIndex, s: LState, lessonId: string, today: string): LMemory;
  learn(s: LState, id: string, today: string): void;
  grade(s: LState, id: string, correct: boolean, today: string, opts?: { soft?: boolean }): void;
  dueItems(s: LState, today: string): string[];
  nextDue(s: LState, ids?: string[]): string | null;
  inDays(today: string, day: string): string;
  daysBetween(a: string, b: string): number;
  dot(s: string): string;
  askOf(it: LTerm): string;
  typeLabel(it: LTerm): string;
  feedbackText(it: LTerm, firstTry: boolean): string;
  buildLesson(ix: LIndex, s: LState, lessonId: string, seed: number): LStep[];
  buildRefresh(ix: LIndex, s: LState, o: { lessonId?: string | null; seed: number; today: string; n?: number }): LStep[];
  buildExam(ix: LIndex, s: LState, unitId: string, seed: number): LStep[];
  awardBadges(s: LState, today: string, ix: LIndex): LBadge[];
  STATUS_LABELS: Record<string, string>;
};

/* eslint-disable @typescript-eslint/no-require-imports */
const vendor = require("./vendor/index.js") as { Engine: LEngine; units: LUnit[]; sources: LSource[] };
/* eslint-enable @typescript-eslint/no-require-imports */

export const LE = vendor.Engine;
export const LIX: LIndex = LE.indexCourse(vendor.units);
export const LSOURCES: LSource[] = vendor.sources;

export const SHOW_URL = "https://www.philosophizethis.org";
export const UNOFFICIAL = "Logos is an unofficial companion and is not affiliated with Philosophize This!";

/** Episodes finished, out of all episodes in the course. */
export function episodesDone(s: LState) {
  return LIX.lessons.filter((l) => s.done[l.id]).length;
}

/** The first episode not finished yet, or null. */
export function nextEpisode(s: LState): LIndexedLesson | null {
  const n = LE.nextNode(LIX, s);
  return n ? (LIX.lessonOf(n.id) ?? null) : null;
}

/** Every thinker in the course in historical order, with the episodes they appear in. */
export function allThinkers(s: LState) {
  const byId = new Map<string, LThinker & { episodes: number[]; met: boolean }>();
  for (const l of LIX.lessons) {
    for (const th of l.thinkers ?? []) {
      const e = byId.get(th.id) ?? { ...th, episodes: [], met: false };
      e.episodes.push(l.episode);
      e.met = e.met || !!s.done[l.id];
      byId.set(th.id, e);
    }
  }
  return [...byId.values()].sort((a, b) => a.sort - b.sort);
}
