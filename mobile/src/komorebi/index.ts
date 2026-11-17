// Komorebi (Japanese) as a second course inside the Skepsis app.
// The course and its engine are Komorebi's own files, copied into ./vendor by
// `npm run komorebi:sync` (source of truth: the Komorebi repo, komorebi.tryskepsis.com).
// Progress lives in AppState.komorebi; XP and the streak are shared with Skepsis.

export type KPhrase = { ja: string; kana: string; romaji: string; meaning: string };
type KBase = { id: string; say: string; src: string; status: string; transfer?: boolean };
export type KWord = KBase & KPhrase & { kind: "word" | "character"; distractors: string[]; note?: string; example?: KPhrase };
export type KSentence = KBase & KPhrase & { kind: "sentence"; tiles: { ja: string; romaji: string }[] };
export type KGrammar = KBase & { kind: "grammar"; title: string; explanation: string; examples: KPhrase[] };
export type KCulture = KBase & { kind: "culture"; title: string; place: string; body: string; phrase?: KPhrase };
export type KScenario = KBase & { kind: "scenario"; title: string; scene: string; q: string };
export type KItem = KWord | KSentence | KGrammar | KCulture | KScenario;

export type KLesson = { id: string; title: string; scene: string; mission?: string; dialogue?: (KPhrase & { speaker: string })[]; items: KItem[] };
export type KUnit = { id: string; title: string; blurb: string; place: string; focus: string; lessons: KLesson[] };

type QBase = { itemId: string; kind: string; label: string; say: string; explain?: string; guess?: boolean; retrieval?: boolean };
export type KChoiceQ = QBase & { type: "choice"; prompt: string; options: string[]; answer: string; ja?: string; kana?: string; romaji?: string; title?: string };
export type KTilesQ = QBase & { type: "tiles"; prompt: string; ja: string; kana: string; romaji: string; meaning: string; tiles: { ja: string; romaji: string; key: number }[]; answer: string[] };
export type KScenarioQ = QBase & { type: "scenario"; prompt: string; title: string; scene: string; options: { text: string; why: string }[]; answer: number };
export type KRomajiQ = QBase & { type: "romaji"; prompt: string; ja: string; answer: string; note: string };
export type KTeach = { type: "teach"; itemId: string; kind: string };
export type KQuestion = KChoiceQ | KTilesQ | KScenarioQ | KRomajiQ;
export type KStep = KQuestion | KTeach;

export type KState = {
  done: Record<string, { at: string; perfect: boolean }>;
  sittings: Record<string, number>;
  items: Record<string, { box: number; due: string; right: number; wrong: number }>;
  mistakes: Record<string, number>;
  answered: number; correct: number;
  [k: string]: unknown;
};

export type KIndex = { units: KUnit[]; lessons: KLesson[]; items: Map<string, KItem>; lessonById: Map<string, KLesson>; unitById: Map<string, KUnit> };

type KEngine = {
  dayKey(d?: Date): string;
  freshState(): KState;
  repairState(raw: unknown): KState;
  indexCourse(units: KUnit[]): KIndex;
  lessonSittings(ix: KIndex, lessonId: string): string[][];
  buildLesson(ix: KIndex, s: KState, lessonId: string, seed: number, sitting: number): KStep[];
  buildReview(ix: KIndex, s: KState, today: string, seed: number, limit?: number): KQuestion[];
  dueItems(s: KState, today: string): string[];
  learn(s: KState, id: string, today: string): void;
  grade(s: KState, id: string, correct: boolean, today: string): void;
  acceptsRomaji(expected: string, typed: string): boolean;
  norm(s: string): string;
  progress(ix: KIndex, s: KState): { done: number; total: number; percent: number; learned: number };
};

/* eslint-disable @typescript-eslint/no-require-imports */
const vendor = require("./vendor/index.js") as { Engine: KEngine; units: KUnit[] };
/* eslint-enable @typescript-eslint/no-require-imports */

export const KE = vendor.Engine;
export const KIX: KIndex = KE.indexCourse(vendor.units);

/** Where a lesson stands: sittings finished out of how many. */
export function lessonStatus(s: KState, lessonId: string) {
  const total = KE.lessonSittings(KIX, lessonId).length || 1;
  return { done: !!s.done[lessonId], sittings: Math.min(s.sittings[lessonId] || 0, total), total };
}

/** The first lesson not finished yet, in course order. */
export function nextLesson(s: KState): KLesson | null {
  return KIX.lessons.find((l) => !s.done[l.id]) ?? null;
}
