import { useLocalSearchParams } from "expo-router";

import { KomorebiRunner } from "@/screens/komorebi/runner";

export default function KomorebiScreen() {
  const { lesson, review } = useLocalSearchParams<{ lesson?: string; review?: string }>();
  return <KomorebiRunner key={`${lesson ?? ""}-${review ?? ""}`} lessonId={lesson} review={review === "1"} />;
}
