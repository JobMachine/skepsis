// First run: one welcome screen, one button, straight into lesson 1. The reminder question waits
// until after the first finished lesson (ReminderAsk); goal and analytics live in Me › Settings.
// Nov 2026 web data: every extra screen before the first lesson lost most new players.
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { E, IX } from "@/course";
import { Mascot } from "@/components/mascot";
import { Btn, T } from "@/components/ui";
import { analyticsAvailable, track } from "@/lib/analytics";
import { startNode } from "@/lib/nav";
import { update, useApp } from "@/lib/store";
import { useTheme } from "@/theme";

export function Onboarding() {
  const s = useApp();
  const c = useTheme();
  const insets = useSafeAreaInsets();

  function start() {
    update((x) => { x.onboarded = true; });
    track("onboarding_completed", { goal_xp: s.goal, analytics: s.analytics, one_screen: true });
    router.replace("/(tabs)/(learn)");
    setTimeout(() => startNode(E.nextNode(IX, s)), 350);
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8, paddingBottom: insets.bottom + 12 }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={{ alignItems: "center", gap: 16, paddingTop: 24 }}>
          <Mascot mood="cheer" size={180} />
          <T w="west" size={44} color={c.brand}>Skepsis</T>
          <T w="greek" size={26} color={c.brand}>σκέψις</T>
          <T w="black" size={15} color={c.xpText} style={{ letterSpacing: 1.5, textTransform: "uppercase", marginTop: -8 }}>Roots to reason</T>
          <T w="semibold" size={17} style={{ textAlign: "center", lineHeight: 25 }}>
            Y&apos;all already speak a little Greek: telephone, Metroplex, astronaut. Three minutes a day and you&apos;ll see it everywhere.
          </T>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["Free forever", "Open source", "No account", "No ads"].map((x) => (
              <View key={x} style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: c.oliveSoft }}><T w="heavy" size={13} color={c.rightText}>{x}</T></View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        <Btn label="Start lesson 1 · 2 min" tone="gold" onPress={start} />
        <T w="bold" size={12} color={c.muted} style={{ textAlign: "center" }}>
          Your progress stays on this phone.{analyticsAvailable ? " We count anonymous usage to fix hard lessons; turn it off in Me › Settings." : ""}
        </T>
      </View>
    </View>
  );
}
