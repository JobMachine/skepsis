// The private courses (Komorebi, Japanese; Logos, philosophy): fresh state, repair of saved state,
// and what a finished run changes. This is the ONLY module that imports the private engines for
// the app's shared code, and it is reached ONLY through the gate below, so a public build
// (the App Store) bundles none of it.
//
// THE GATE. Metro can only drop a `require` that sits behind an env check written inline in the
// same file, so every caller spells the check out in full:
//
//   const priv: typeof import("./private-courses") | null =
//     process.env.EXPO_PUBLIC_PRIVATE_COURSES === "1" ? require("./private-courses") : null;
//
// Never import this file (or "@/komorebi", "@/logos", "@/screens/komorebi", "@/screens/logos")
// with a plain top-level `import` from code the public build loads. `npm run check:public`
// exports the public bundle and fails if any private marker is in it.
import { KE } from "@/komorebi";
import { LE, LIX } from "@/logos";
import type { LBadge } from "@/logos";
import type { RunSummary } from "./progress";
import type { AppState } from "./store";

/** The private slice of a fresh app state. */
export function freshPrivate(): Pick<AppState, "komorebi" | "logos"> {
  return { komorebi: KE.freshState(), logos: LE.freshState() };
}

/** Repair saved private progress (each engine whitelists what it understands). */
export function repairPrivate(saved: Partial<AppState>): Pick<AppState, "komorebi" | "logos"> {
  return { komorebi: KE.repairState(saved.komorebi), logos: LE.normalizeState(saved.logos, LIX) };
}

/** Which course a run belongs to, for analytics. */
export function courseOf(mode: RunSummary["mode"]): "komorebi" | "logos" | null {
  if (mode.startsWith("komorebi")) return "komorebi";
  if (mode.startsWith("logos")) return "logos";
  return null;
}

export type PrivateRun = {
  xp: number; coins: number;
  /** Counts toward the "practice" quest. */
  practice: boolean;
  /** A flawless run counts toward the "perfect" quest (never for Logos: nothing there is scored). */
  perfectQuest: boolean;
  /** Logos's own badges earned by this run. */
  courseBadges: LBadge[];
};

/** Apply a finished private run to `s` (already a mutable copy). Null when the run is not a private one. */
export function applyRun(s: AppState, r: RunSummary, t: string, perfect: boolean): PrivateRun | null {
  if (r.mode === "komorebi" || r.mode === "komorebi-review") {
    // Same rewards as a Skepsis lesson/practice; Komorebi's own lesson record gets the progress.
    const review = r.mode === "komorebi-review";
    if (!review && r.nodeId) {
      const k = s.komorebi;
      if (!k.done[r.nodeId]) k.sittings[r.nodeId] = (k.sittings[r.nodeId] || 0) + 1;
      if (r.lessonDone) k.done[r.nodeId] = { perfect, at: t };
    }
    return { xp: (review ? 8 : 10) + (perfect ? 5 : 0) + (r.maxCombo >= 5 ? 2 : 0), coins: 5 + (perfect ? 5 : 0), practice: review, perfectQuest: true, courseBadges: [] };
  }
  if (r.mode === "logos" || r.mode === "logos-refresh" || r.mode === "logos-exam") {
    // Logos: finishing always pays the same, however the taps went. Nothing is scored.
    const L = s.logos;
    const kind = r.mode === "logos" ? "lesson" : r.mode === "logos-exam" ? "exam" : "refresh";
    if (kind === "refresh" && Object.values(L.done).some((d) => d.at < t)) L.comebacks += 1;
    if (r.nodeId) {
      const d = L.done[r.nodeId];
      L.done[r.nodeId] = d ? { at: d.at, last: t, n: d.n + 1 } : { at: t, last: t, n: 1 };
      if (kind === "exam" && r.scored > 0) {
        // An exam only counts answers right on the first try; it keeps the best, and cannot be failed.
        const old = (L.exams ??= {})[r.nodeId];
        L.exams[r.nodeId] = { best: Math.max(r.right, old ? old.best : 0), total: r.scored, last: r.right, at: t };
      }
    }
    return { xp: LE.XP[kind], coins: kind === "exam" ? 15 : 5, practice: kind === "refresh", perfectQuest: false, courseBadges: LE.awardBadges(L, t, LIX) };
  }
  return null;
}
