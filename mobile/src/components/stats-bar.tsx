// Streak · drachmas · XP pills, shown in the Learn header. Tapping one opens what it's about.
import { View } from "react-native";
import { router } from "expo-router";

import { E } from "@/course";
import { useApp } from "@/lib/store";
import { useTheme } from "@/theme";
import { Pill } from "./ui";

export function StatsBar() {
  const s = useApp();
  const c = useTheme();
  const streak = E.liveStreak(s, E.dayKey());
  const activeToday = s.lastDay === E.dayKey();
  return (
    <View style={{ flexDirection: "row", gap: 6 }}>
      <Pill icon="flame.fill" label={streak} color={activeToday ? c.flame : c.muted} onPress={() => router.push("/streak")} />
      <Pill icon="dollarsign.circle.fill" label={s.drachmas} color={c.xpText} onPress={() => router.push("/shop")} />
    </View>
  );
}
