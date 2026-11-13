import { Linking, Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";

import { E, TOTAL_ITEMS } from "@/course";
import { Mascot } from "@/components/mascot";
import { Bubble } from "@/components/texas";
import { Wreath } from "@/components/wreath";
import { Card, Eyebrow, Icon, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { useApp } from "@/lib/store";
import { useTheme } from "@/theme";

export const REPO = "https://github.com/ionpetro/skepsis";

function WeekChart() {
  const s = useApp();
  const c = useTheme();
  const t = E.dayKey();
  const days = [...Array(7)].map((_, i) => E.addDays(t, i - 6));
  const vals = days.map((d) => s.days[d] || 0);
  const max = Math.max(s.goal, ...vals);
  return (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Eyebrow>Last 7 days</Eyebrow>
        <T w="heavy" size={13} color={c.muted}>{vals.reduce((a, b) => a + b, 0)} XP</T>
      </View>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8, height: 120 }}>
        {days.map((d, i) => {
          const v = vals[i];
          const met = v >= s.goal;
          return (
            <View key={d} style={{ flex: 1, alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }} accessibilityLabel={`${d}: ${v} XP`}>
              {v > 0 && <T w="heavy" size={11} color={c.muted}>{v}</T>}
              <View style={{ width: "100%", height: `${Math.max(4, (v / max) * 80)}%`, borderRadius: 6, borderCurve: "continuous", backgroundColor: v === 0 ? c.surface2 : met ? c.gold : c.brand }} />
              <T w="heavy" size={11} color={d === t ? c.ink : c.muted}>{new Date(`${d}T12:00`).toLocaleDateString(undefined, { weekday: "narrow" })}</T>
            </View>
          );
        })}
      </View>
      <T w="bold" size={12} color={c.muted}>Gold bars hit your {s.goal} XP daily goal.</T>
    </Card>
  );
}

function Row({ icon, label, sub, onPress, color }: { icon: Parameters<typeof Icon>[0]["name"]; label: string; sub?: string; onPress: () => void; color?: string }) {
  const c = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10, opacity: pressed ? 0.6 : 1 })}>
      <Icon name={icon} size={22} color={color ?? c.brand} />
      <View style={{ flex: 1 }}><T w="black">{label}</T>{sub && <T w="bold" size={13} color={c.muted}>{sub}</T>}</View>
      <Icon name="chevron.right" size={14} color={c.muted} />
    </Pressable>
  );
}

export function Me() {
  const s = useApp();
  const c = useTheme();
  const learned = Object.keys(s.items).length;
  const acc = s.answered ? Math.round((s.correct / s.answered) * 100) : 0;
  const strong = Object.values(s.items).filter((x) => x.box >= 4).length;
  const stats: [string, string | number][] = [["Total XP", s.xp], ["Best streak", `${s.bestStreak} days`], ["Accuracy", `${acc}%`], ["Rodeo best", s.rodeoBest], ["Words learned", `${learned}/${TOTAL_ITEMS}`], ["Mastered", strong]];
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 48 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <Mascot hat={s.hat} size={84} />
        <Bubble text={learned ? `You've learned ${learned} of ${TOTAL_ITEMS} words and ideas. ${strong ? `${strong} are rock solid.` : "Keep reviewing to lock them in."}` : "Finish a lesson to start your collection."} />
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {stats.map(([h, v]) => (
          <Card key={h} style={{ width: "48%", flexGrow: 1, gap: 2 }}>
            <Eyebrow>{h}</Eyebrow>
            <T w="black" size={22} style={{ fontVariant: ["tabular-nums"] }}>{v}</T>
          </Card>
        ))}
      </View>
      <WeekChart />
      <T w="black" size={20}>Laurels</T>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {E.BADGES.map((b) => {
          const got = !!s.badges[b.id];
          return (
            <View key={b.id} style={{ width: "31%", flexGrow: 1, alignItems: "center", gap: 4, padding: 10, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, opacity: got ? 1 : 0.55 }}>
              <Wreath letter={b.name[0]} size={52} off={!got} />
              <T w="black" size={13} style={{ textAlign: "center" }}>{b.name}</T>
              <T w="bold" size={11} color={c.muted} style={{ textAlign: "center" }}>{b.desc}</T>
            </View>
          );
        })}
      </View>
      <Card style={{ gap: 0 }}>
        <Row icon="gearshape.fill" label="Settings" sub="Goal, sounds, reminders, data" onPress={() => router.push("/me/settings")} />
        <Row icon="lock.shield.fill" label="Your data" sub="What stays on your phone (everything)" onPress={() => router.push("/privacy")} />
        <Row icon="star.fill" color={c.gold} label="Star Skepsis on GitHub" sub="Free and open source. A star helps others find it." onPress={() => { track("github_star_clicked", { where: "me" }); Linking.openURL(REPO); }} />
        <Row icon="sparkles" label="Learn with your AI agent" sub="Use the same lessons with AI tools" onPress={() => { track("mcp_link_clicked"); Linking.openURL(`${REPO}/tree/main/mcp`); }} />
        <Row icon="exclamationmark.bubble.fill" label="Suggest a word or fix one" sub="Corrections with a source are very welcome" onPress={() => Linking.openURL(`${REPO}/issues/new`)} />
      </Card>
    </ScrollView>
  );
}
