import { useLocalSearchParams } from "expo-router";

import type { Mode } from "@/lib/progress";
import { LessonRunner } from "@/screens/lesson";

export default function LessonScreen() {
  const { mode = "lesson", node, auto, from } = useLocalSearchParams<{ mode?: Mode; node?: string; auto?: string; from?: string }>();
  return <LessonRunner key={`${mode}-${node ?? ""}`} mode={mode} nodeId={node} auto={auto} from={from} />;
}
