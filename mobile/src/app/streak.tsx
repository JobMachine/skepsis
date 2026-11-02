import { ScrollView, View } from "react-native";

import { E } from "@/course";
import { Card, Eyebrow, Icon, T } from "@/components/ui";
import { useApp } from "@/lib/store";
import { useTheme } from "@/theme";

/** Streak details: the number, the last five weeks, and how freezes work. */
export default function StreakSheet() {
  const s = useApp();
  const c = useTheme();
  const t = E.dayKey();
  const streak = E.liveStreak(s, t);
  const start = E.addDays(E.weekKey(t), -28);
  const weeks = [...Array(5)].map((_, w) => [...Array(7)].map((__, d) => E.addDays(start, w * 7 + d)));
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingTop: 28 }}>
      <View style={{ alignItems: "center", gap: 4 }}>
        <Icon name="flame.fill" size={72} color={streak ? c.flame : c.locked} />
        <T w="black" size={44} color={streak ? c.flame : c.muted} style={{ fontVariant: ["tabular-nums"], lineHeight: 50 }}>{streak}</T>
        <T w="black" size={18}>day streak</T>
        <T w="bold" color={c.muted}>Best ever: {s.bestStreak} days</T>
      </View>
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <T key={i} w="heavy" size={12} color={c.muted} style={{ width: 34, textAlign: "center" }}>{d}</T>)}
        </View>
        {weeks.map((wk) => (
          <View key={wk[0]} style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {wk.map((k) => {
              const did = (s.days[k] || 0) > 0;
              const future = k > t;
              return (
                <View key={k} style={{ width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: did ? c.flame : "transparent", borderWidth: k === t ? 2 : 0, borderColor: c.flame, opacity: future ? 0.3 : 1 }}>
                  <T w="heavy" size={13} color={did ? "#fff" : E.isWeekend(k) ? c.muted : c.ink}>{Number(k.slice(8))}</T>
                </View>
              );
            })}
          </View>
        ))}
      </Card>
      <Eyebrow>How streaks work</Eyebrow>
      <Card>
        <View style={{ flexDirection: "row", gap: 10 }}><Icon name="moon.zzz.fill" size={20} color={c.brand} /><T w="semibold" style={{ flex: 1 }}>Weekends never break your streak. Rest is part of learning.</T></View>
        <View style={{ flexDirection: "row", gap: 10 }}><Icon name="snowflake" size={20} color={c.brand} /><T w="semibold" style={{ flex: 1 }}>You have <T w="black">{s.freezes}</T> streak freeze{s.freezes === 1 ? "" : "s"}. A freeze covers a missed weekday. You get one free each week, earn one every 7-day streak, or buy one in the shop (max 2).</T></View>
        <View style={{ flexDirection: "row", gap: 10 }}><Icon name="bolt.fill" size={20} color={c.brand} /><T w="semibold" style={{ flex: 1 }}>Any lesson, practice or Rodeo ride with XP counts for the day.</T></View>
      </Card>
    </ScrollView>
  );
}
