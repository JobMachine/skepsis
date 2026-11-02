import { Stack } from "expo-router";

import { font, useTheme } from "@/theme";

export default function MeStack() {
  const c = useTheme();
  return (
    <Stack screenOptions={{
      headerLargeTitleEnabled: true, headerShadowVisible: false, headerLargeTitleShadowVisible: false,
      headerStyle: { backgroundColor: c.bg }, headerLargeStyle: { backgroundColor: c.bg },
      headerTitleStyle: { fontFamily: font.black, color: c.ink }, headerLargeTitleStyle: { fontFamily: font.black, color: c.ink },
      headerBackButtonDisplayMode: "minimal", headerTintColor: c.brand,
    }}>
      <Stack.Screen name="index" options={{ title: "Me" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
  );
}
