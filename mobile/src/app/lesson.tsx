import { useLocalSearchParams } from "expo-router";

import type { Mode } from "@/lib/progress";
import { LessonRunner } from "@/screens/lesson";

export default function LessonScreen() {
  const { mode = "lesson", node, auto } = useLocalSearchParams<{ mode?: Mode; node?: string; auto?: string }>();
  return <LessonRunner mode={mode} nodeId={node} auto={auto} />;
}
