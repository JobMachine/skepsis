import { Stack } from "expo-router";

import { StatsBar } from "@/components/stats-bar";
import { T } from "@/components/ui";
import { font, useTheme } from "@/theme";

export default function LearnStack() {
  const c = useTheme();
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: c.bg }, headerTitleStyle: { fontFamily: font.black, color: c.ink } }}>
      <Stack.Screen name="index" options={{
        title: "Skepsis",
        headerTitle: () => <T w="west" size={22} color={c.brand}>Skepsis</T>,
        headerTitleAlign: "left",
        headerRight: () => <StatsBar />,
      }} />
    </Stack>
  );
}
