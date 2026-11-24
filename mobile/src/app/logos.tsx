import { Redirect, useLocalSearchParams } from "expo-router";

// Private courses only. The inline env check keeps the runner (and Logos) out of public builds,
// where this route just sends you home.
const Runner: typeof import("@/screens/logos/runner").LogosRunner | null =
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  process.env.EXPO_PUBLIC_PRIVATE_COURSES === "1" ? require("@/screens/logos/runner").LogosRunner : null;

/** /logos?node=u01l1 plays an episode (a refresh if it is already done); ?refresh=1 mixes every episode heard. */
export default function PrivateCourseRoute() {
  const { node, refresh } = useLocalSearchParams<{ node?: string; refresh?: string }>();
  if (!Runner) return <Redirect href="/" />;
  return <Runner key={`${node ?? ""}-${refresh ?? ""}`} nodeId={node} refresh={refresh === "1"} />;
}
