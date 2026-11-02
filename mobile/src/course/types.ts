// Types for the shared course content (../../app/src/content.js) and game engine
// (../../app/src/engine.js). Those files are plain JavaScript shared with the website
// and the MCP server, so the types live here.

export type RootItem = {
  id: string; kind: "root"; root: string; gr: string; tr: string; m: string;
  hook: string; say: string; ex: [word: string, def: string, tiles: string[]][];
};
export type IdeaItem = {
  id: string; kind: "idea"; term: string; gr: string; tr?: string; m: string; lit: string;
  story: string; tex: string; work: string; say: string;
  q: { prompt: string; a: string; w: string[] };
};
export type OriginItem = { id: string; kind: "origin"; w: string; greek: boolean; from: string; say: string };
export type Item = (RootItem | IdeaItem | OriginItem) & { lessonId?: string; unitId?: string };
export type IndexedItem = Item & { lessonId: string; unitId: string };

export type Lesson = { id: string; title: string; items: Item[] };
export type Unit = { id: string; title: string; blurb: string; lessons: Lesson[] };
export type Course = { units: Unit[] };

export type CourseIndex = {
  course: Course;
  items: Map<string, IndexedItem>;
  lessons: (Lesson & { unitId: string })[];
  roots: IndexedItem[]; ideas: IndexedItem[]; origins: IndexedItem[];
};

export type PathNode = { id: string; unitId: string; title: string; letter: string; kind: "lesson" | "roundup" };

type QBase = { itemId: string | null; label: string; explain?: string; family?: string; guess?: boolean };
export type McqQ = QBase & { type: "mcq"; prompt: string; options: string[]; answer: string; greek?: string; word?: string; hl?: string };
export type TfQ = QBase & { type: "tf"; word: string; answer: boolean };
export type BuildQ = QBase & { type: "build"; prompt: string; tiles: string[]; answer: string[]; word: string };
export type MatchQ = QBase & { type: "match"; pairs: [string, string, string][]; left: string[]; right: string[] };
export type IntroStep = { type: "intro"; itemId: string };
export type OriginIntroStep = { type: "intro-origin" };
export type Question = McqQ | TfQ | BuildQ | MatchQ;
export type Step = Question | IntroStep | OriginIntroStep;

/** The engine's saved progress (Engine.freshState()). */
export type EngineState = {
  v: number; onboarded: boolean; goal: number; board: boolean; sound: boolean; xp: number;
  days: Record<string, number>; streak: number; bestStreak: number; lastDay: string | null;
  freezes: number; freezeWeek: string | null;
  done: Record<string, { perfect: boolean; at: string }>;
  items: Record<string, { box: number; due: string; right: number; wrong: number }>;
  rodeoBest: number; practices: number; answered: number; correct: number;
  badges: Record<string, string>; updatedAt: number;
};

export type Badge = { id: string; name: string; desc: string; test: (s: EngineState) => boolean };
export type Goal = { xp: number; label: string; sub: string };

export type EngineApi = {
  dayKey(d?: Date): string; addDays(key: string, n: number): string; daysBetween(a: string, b: string): number;
  weekKey(key: string): string; isWeekend(key: string): boolean;
  GOALS: Goal[]; freshState(): EngineState;
  touchStreak(s: EngineState, today: string): { streakUp: boolean; usedFreeze: number; reset: boolean };
  liveStreak(s: EngineState, today: string): number;
  addXp(s: EngineState, today: string, n: number): void; weekXp(s: EngineState, today: string): number;
  INTERVALS: number[]; learn(s: EngineState, id: string, today: string): void;
  grade(s: EngineState, id: string, correct: boolean, today: string): void;
  dueItems(s: EngineState, today: string): string[];
  indexCourse(c: Course): CourseIndex; pathNodes(ix: CourseIndex): PathNode[];
  nextNode(ix: CourseIndex, s: EngineState): PathNode | null;
  isUnlocked(ix: CourseIndex, s: EngineState, nodeId: string): boolean;
  rng(seed: number): () => number; shuffle<T>(a: T[], r: () => number): T[];
  buildLesson(ix: CourseIndex, s: EngineState, lessonId: string, seed: number): Step[];
  buildRoundup(ix: CourseIndex, s: EngineState, unitId: string, seed: number): Step[];
  buildPractice(ix: CourseIndex, s: EngineState, seed: number): Step[];
  rodeoQuestion(ix: CourseIndex, s: EngineState, r: () => number): Question;
  labelOf(it: Item): string; meaningOf(it: Item): string;
  BADGES: Badge[]; awardBadges(s: EngineState, today: string): Badge[];
};
