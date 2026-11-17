// Starting lessons from anywhere.
import { router } from "expo-router";

import type { PathNode } from "@/course";

/** `from` is sent with lesson_started: "auto" (first launch), "next_lesson" (finish screen), else a tap. */
export function startNode(node: PathNode | null, from?: "auto" | "next_lesson") {
  if (!node) return;
  const params = { mode: node.kind === "roundup" ? "roundup" : "lesson", node: node.id, ...(from ? { from } : {}) };
  // From the finish screen, replace the finished lesson so Back goes home, not to the old results.
  if (from === "next_lesson") router.replace({ pathname: "/lesson", params });
  else router.push({ pathname: "/lesson", params });
}
export function startPractice() {
  router.push({ pathname: "/lesson", params: { mode: "practice" } });
}
export function startRodeo() {
  router.push("/rodeo");
}
