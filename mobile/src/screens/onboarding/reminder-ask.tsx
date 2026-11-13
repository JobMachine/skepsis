// One-time "when should I nudge you?" screen, shown right after the first finished lesson
// (it used to be step 4 of onboarding; asking before any lesson cost us new players).
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SFSymbol } from "expo-symbols";

import { Choice } from "@/components/choice";
import { Mascot } from "@/components/mascot";
import { Bubble } from "@/components/texas";
import { Btn, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { askPermission, reschedule } from "@/lib/reminders";
import { update } from "@/lib/store";
import { useTheme } from "@/theme";

const TIMES = [
  { label: "Morning coffee", h: 8, m: 0, icon: "sunrise.fill" as SFSymbol },
  { label: "Lunch break", h: 12, m: 30, icon: "sun.max.fill" as SFSymbol },
  { label: "Evening", h: 19, m: 0, icon: "sunset.fill" as SFSymbol },
  { label: "Before bed", h: 21, m: 30, icon: "moon.stars.fill" as SFSymbol },
];
const fmt = (h: number, m: number) => new Date(2026, 0, 1, h, m).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

export function ReminderAsk({ onDone }: { onDone: () => void }) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const [time, setTime] = useState(2);

  async function remind() {
    const t = TIMES[time];
    const ok = await askPermission();
    update((x) => { x.reminders = { on: ok, hour: t.h, minute: t.m }; x.remindAsked = true; });
    track("reminders_set", { granted: ok, hour: t.h, where: "first_lesson" });
    await reschedule();
    onDone();
  }
  function skip() {
    update((x) => { x.remindAsked = true; });
    track("reminders_set", { granted: false, skipped: true, where: "first_lesson" });
    onDone();
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8, paddingBottom: insets.bottom + 12 }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}><Mascot size={80} mood="cheer" /><Bubble text="Nice riding! People who pick a time are way more likely to keep a streak. When should I nudge you?" /></View>
        {TIMES.map((t, i) => <Choice key={t.label} label={t.label} icon={t.icon} right={fmt(t.h, t.m)} selected={time === i} onPress={() => setTime(i)} />)}
        <T w="bold" size={13} color={c.muted} style={{ textAlign: "center" }}>Reminders are set on your phone. No servers involved.</T>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        <Btn label="Remind me" icon="bell.fill" onPress={remind} />
        <Btn label="Not now" tone="ghost" onPress={skip} />
      </View>
    </View>
  );
}
