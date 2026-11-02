// Starting lessons from anywhere.
import { router } from "expo-router";

import type { PathNode } from "@/course";

export function startNode(node: PathNode | null) {
  if (!node) return;
  router.push({ pathname: "/lesson", params: { mode: node.kind === "roundup" ? "roundup" : "lesson", node: node.id } });
}
export function startPractice() {
  router.push({ pathname: "/lesson", params: { mode: "practice" } });
}
export function startRodeo() {
  router.push("/rodeo");
}
