// What a Logos run plays, decided from the saved progress. Kept apart from the screen so tests can use it.
import { getState } from "@/lib/store";
import type { Mode } from "@/lib/progress";
import { LE, LIX, type LStep } from "./index";

const seed = () => Math.floor(Math.random() * 2 ** 31);

export type Plan = { mode: Extract<Mode, "logos" | "logos-refresh" | "logos-exam">; nodeId?: string; unitId?: string; steps: LStep[]; welcome: boolean };

/** What to run: an episode's first listen (or its refresh once done), an era exam, or a mixed refresh. */
export function plan(nodeId?: string, refresh?: boolean): Plan {
  const L = getState().logos;
  const today = LE.dayKey();
  const welcome = Object.keys(L.done).length === 0 && Object.keys(L.items).length === 0;
  if (refresh || !nodeId) return { mode: "logos-refresh", steps: LE.buildRefresh(LIX, L, { seed: seed(), today }), welcome: false };
  const node = LE.pathNodes(LIX).find((n) => n.id === nodeId);
  if (!node) return { mode: "logos", nodeId, steps: [], welcome: false };
  if (node.kind === "exam") return { mode: "logos-exam", nodeId, unitId: node.unitId, steps: LE.buildExam(LIX, L, node.unitId, seed()), welcome: false };
  if (L.done[nodeId]) return { mode: "logos-refresh", nodeId, unitId: node.unitId, steps: LE.buildRefresh(LIX, L, { lessonId: nodeId, seed: seed(), today }), welcome: false };
  return { mode: "logos", nodeId, unitId: node.unitId, steps: LE.buildLesson(LIX, L, nodeId, seed()), welcome };
}
