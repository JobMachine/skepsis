// All progress lives on this phone, in SQLite (expo-sqlite's localStorage). Nothing is uploaded.
// The engine's state (streaks, spaced review, badges) is extended with app-only fields:
// drachmas (coins), quests, Homer's hats and settings.
import "expo-sqlite/localStorage/install";
import { useSyncExternalStore } from "react";
import { randomUUID } from "expo-crypto";

import { E, type EngineState } from "@/course";

export type Hat = "wreath" | "cowboy" | "helmet" | "grad";

export type QuestDay = { day: string; ids: string[]; progress: Record<string, number>; claimed: Record<string, boolean>; chest: boolean };

export type AppState = EngineState & {
  drachmas: number;
  haptics: boolean;
  analytics: boolean;
  reminders: { on: boolean; hour: number; minute: number };
  motivation: string | null;
  quests: QuestDay | null;
  hats: Hat[];
  hat: Hat;
  installId: string;
  installedAt: string;
  reviewAsked: boolean;
  /** The after-lesson-1 reminder question was shown. */
  remindAsked: boolean;
  lessonsFinished: number;
};

const KEY = "skepsis:v1";

function fresh(): AppState {
  return {
    ...E.freshState(),
    drachmas: 0,
    haptics: true,
    analytics: true,
    reminders: { on: false, hour: 19, minute: 0 },
    motivation: null,
    quests: null,
    hats: ["wreath"],
    hat: "wreath",
    installId: randomUUID(),
    installedAt: E.dayKey(),
    reviewAsked: false,
    remindAsked: false,
    lessonsFinished: 0,
  };
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch {
    // A broken save should never brick the app; start fresh.
  }
  const s = fresh();
  localStorage.setItem(KEY, JSON.stringify(s));
  return s;
}

let state: AppState = load();
const listeners = new Set<() => void>();

export function getState(): AppState {
  return state;
}

/** Change state: `fn` gets a copy it may mutate (the engine mutates in place). Saves and re-renders. */
export function update(fn: (s: AppState) => void): AppState {
  const next: AppState = JSON.parse(JSON.stringify(state));
  fn(next);
  next.updatedAt = Date.now();
  state = next;
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
  return state;
}

/** Erase everything on this phone. Keeps the anonymous install id so analytics counts stay honest. */
export function resetAll() {
  const keep = state.installId;
  update((s) => Object.assign(s, fresh(), { installId: keep }));
}

/** Everything we store, as JSON, for the "Export my data" button. */
export function exportJson(): string {
  return JSON.stringify(state, null, 2);
}

export function useApp(): AppState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
}
