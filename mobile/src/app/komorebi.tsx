import { Redirect, useLocalSearchParams } from "expo-router";

// Private courses only. The inline env check keeps the runner (and Komorebi) out of public builds,
// where this route just sends you home.
const Runner: typeof import("@/screens/komorebi/runner").KomorebiRunner | null =
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  process.env.EXPO_PUBLIC_PRIVATE_COURSES === "1" ? require("@/screens/komorebi/runner").KomorebiRunner : null;

export default function PrivateCourseRoute() {
  const { lesson, review } = useLocalSearchParams<{ lesson?: string; review?: string }>();
  if (!Runner) return <Redirect href="/" />;
  return <Runner key={`${lesson ?? ""}-${review ?? ""}`} lessonId={lesson} review={review === "1"} />;
}
