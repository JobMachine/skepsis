import { Alert, ScrollView, Share, Switch, View } from "react-native";
import { Stack } from "expo-router";

import { E } from "@/course";
import { Choice } from "@/components/choice";
import { Btn, Card, Eyebrow, T } from "@/components/ui";
import { analyticsAvailable, dropQueue, track } from "@/lib/analytics";
import { askPermission, reschedule } from "@/lib/reminders";
import { exportJson, resetAll, update, useApp } from "@/lib/store";
import { useTheme } from "@/theme";

const TIMES = [[8, 0], [12, 30], [17, 30], [19, 0], [21, 30]] as const;
const fmt = (h: number, m: number) => new Date(2026, 0, 1, h, m).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

function Toggle({ label, sub, value, onChange }: { label: string; sub: string; value: boolean; onChange: (v: boolean) => void }) {
  const c = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 6 }}>
      <View style={{ flex: 1 }}><T w="black">{label}</T><T w="bold" size={13} color={c.muted}>{sub}</T></View>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: c.brand }} />
    </View>
  );
}

export default function Settings() {
  const s = useApp();
  const c = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: "Settings", headerLargeTitleEnabled: false }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 48 }}>
        <Eyebrow>Daily goal</Eyebrow>
        {E.GOALS.map((g) => <Choice key={g.xp} label={g.label} sub={g.sub} right={`${g.xp} XP`} selected={s.goal === g.xp} onPress={() => { update((x) => { x.goal = g.xp; }); track("goal_changed", { goal: g.xp }); reschedule(); }} />)}

        <Eyebrow>Reminders</Eyebrow>
        <Card>
          <Toggle label="Daily reminder" sub="A nudge from Homer, set on your phone (no servers)" value={s.reminders.on} onChange={async (v) => {
            const ok = v ? await askPermission() : false;
            if (v && !ok) Alert.alert("Notifications are off", "Turn on notifications for Skepsis in the Settings app to get reminders.");
            update((x) => { x.reminders.on = v && ok; });
            reschedule();
          }} />
          {s.reminders.on && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {TIMES.map(([h, m]) => {
                const on = s.reminders.hour === h && s.reminders.minute === m;
                return <Btn key={`${h}${m}`} small block={false} tone={on ? "brand" : "ghost"} label={fmt(h, m)} onPress={() => { update((x) => { x.reminders.hour = h; x.reminders.minute = m; }); reschedule(); }} />;
              })}
            </View>
          )}
        </Card>

        <Eyebrow>Feel</Eyebrow>
        <Card>
          <Toggle label="Sounds" sub="Dings and buzzes (follows the silent switch)" value={s.sound} onChange={(v) => update((x) => { x.sound = v; })} />
          <Toggle label="Haptics" sub="Little taps when you answer" value={s.haptics} onChange={(v) => update((x) => { x.haptics = v; })} />
        </Card>

        <Eyebrow>Privacy</Eyebrow>
        <Card>
          {analyticsAvailable ? (
            <Toggle label="Share anonymous usage" sub="Lesson and answer counts with a random id. Never your name, contacts or location." value={s.analytics} onChange={(v) => {
              if (!v) { track("analytics_opt_out"); dropQueue(); }
              update((x) => { x.analytics = v; });
            }} />
          ) : (
            <T w="bold" color={c.muted}>This build sends no analytics at all.</T>
          )}
          <Btn label="Export my data" icon="square.and.arrow.up" tone="ghost" onPress={() => Share.share({ message: exportJson(), title: "skepsis-progress.json" })} />
          <Btn label="Erase all progress" tone="clay" onPress={() => Alert.alert("Erase everything?", "This deletes your streak, XP, words and drachmas from this phone. It can't be undone.", [
            { text: "Keep it", style: "cancel" },
            { text: "Erase", style: "destructive", onPress: () => { track("progress_reset"); resetAll(); } },
          ])} />
        </Card>
        <T w="semibold" size={12} color={c.muted} style={{ textAlign: "center" }}>Skepsis is free and open source under the MIT license.</T>
      </ScrollView>
    </>
  );
}
