import { useEffect } from "react";
import { AppState, useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black } from "@expo-google-fonts/nunito";
import { GFSDidot_400Regular } from "@expo-google-fonts/gfs-didot";
import { Rye_400Regular } from "@expo-google-fonts/rye";

import { track } from "@/lib/analytics";
import { reschedule } from "@/lib/reminders";
import { update } from "@/lib/store";
import { ensureQuests } from "@/lib/quests";
import { font, palettes } from "@/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const c = palettes[scheme === "dark" ? "dark" : "light"];
  const [loaded] = useFonts({ Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black, GFSDidot_400Regular, Rye_400Regular });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  // Screen views, the app's version of the website's pageviews. Paths only (e.g. /lesson), no params.
  const pathname = usePathname();
  useEffect(() => {
    if (pathname && pathname !== "/dev") track("$screen", { $screen_name: pathname });
  }, [pathname]);

  useEffect(() => {
    track("app_opened");
    update((s) => { ensureQuests(s); });
    reschedule();
    const sub = AppState.addEventListener("change", (st) => {
      if (st !== "active") return;
      update((s) => { ensureQuests(s); });
      reschedule();
    });
    return () => sub.remove();
  }, []);

  if (!loaded) return null;

  const base = scheme === "dark" ? DarkTheme : DefaultTheme;
  const theme = { ...base, colors: { ...base.colors, background: c.bg, card: c.bg, text: c.ink, primary: c.brand, border: c.line } };
  const sheet = { presentation: "formSheet" as const, sheetGrabberVisible: true, sheetCornerRadius: 28, headerShown: false, contentStyle: { backgroundColor: c.bg } };

  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={{ headerTitleStyle: { fontFamily: font.black }, contentStyle: { backgroundColor: c.bg } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false, animation: "fade" }} />
        <Stack.Screen name="lesson" options={{ headerShown: false, presentation: "fullScreenModal", gestureEnabled: false }} />
        <Stack.Screen name="rodeo" options={{ headerShown: false, presentation: "fullScreenModal", gestureEnabled: false }} />
        <Stack.Screen name="huddle/[unit]" options={{ headerShown: false, presentation: "fullScreenModal" }} />
        <Stack.Screen name="streak" options={{ ...sheet, sheetAllowedDetents: [0.75, 1] }} />
        <Stack.Screen name="shop" options={{ ...sheet, sheetAllowedDetents: [0.8, 1] }} />
        <Stack.Screen name="word/[id]" options={{ ...sheet, sheetAllowedDetents: [0.6, 1] }} />
        <Stack.Screen name="privacy" options={{ presentation: "modal", title: "Your data" }} />
      </Stack>
    </ThemeProvider>
  );
}
