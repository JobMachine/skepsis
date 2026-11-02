// End-of-run screens: the streak celebration (first lesson of the day) and the results card.
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { E } from "@/course";
import { Confetti } from "@/components/confetti";
import { Mascot } from "@/components/mascot";
import { Wreath } from "@/components/wreath";
import { Btn, Icon, T } from "@/components/ui";
import { sfx } from "@/lib/feedback";
import type { Outcome } from "@/lib/progress";
import { useApp } from "@/lib/store";
import { useTheme } from "@/theme";

const DOW = ["M", "T", "W", "T", "F", "S", "S"];

export function WeekStrip() {
  const s = useApp();
  const c = useTheme();
  const t = E.dayKey();
  const mon = E.weekKey(t);
  return (
    <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
      {DOW.map((d, i) => {
        const k = E.addDays(mon, i);
        const did = (s.days[k] || 0) > 0;
        const wk = E.isWeekend(k);
        const isToday = k === t;
        return (
          <View key={k} style={{ alignItems: "center", gap: 4 }}>
            <T w="heavy" size={12} color={isToday ? c.flame : c.muted}>{d}</T>
            <View style={{ width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: did ? c.flame : wk ? c.surface2 : c.surface, borderWidth: 2, borderColor: did ? c.flame : isToday ? c.flame : c.line }}>
              {did ? <Icon name="checkmark" size={14} color="#fff" /> : wk ? <Icon name="moon.zzz.fill" size={12} color={c.muted} /> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export function StreakCelebration({ o, onNext }: { o: Outcome; onNext: () => void }) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  useEffect(() => { sfx.streak(); }, []);
  const line = o.usedFreeze ? "A streak freeze saved your streak!" : o.streak === 1 ? "Day one. Come back tomorrow to keep it going." : o.streak % 7 === 0 ? "A full week! You earned a streak freeze." : "Practice every weekday to keep it alive. Weekends are free.";
  return (
    <View style={{ flex: 1, paddingTop: insets.top + 40, paddingBottom: insets.bottom + 12, paddingHorizontal: 16, justifyContent: "space-between" }}>
      <View style={{ alignItems: "center", gap: 18 }}>
        <Animated.View entering={ZoomIn.springify().damping(12)}>
          <Icon name="flame.fill" size={140} color={c.flame} />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200)} style={{ alignItems: "center" }}>
          <T w="black" size={72} color={c.flame} style={{ lineHeight: 80, fontVariant: ["tabular-nums"] }}>{o.streak}</T>
          <T w="black" size={26} color={c.flame}>day streak!</T>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(350)} style={{ gap: 16, alignSelf: "stretch" }}>
          <WeekStrip />
          <T w="bold" size={16} color={c.muted} style={{ textAlign: "center" }}>{line}</T>
        </Animated.View>
      </View>
      <Btn label="Continue" tone="gold" onPress={onNext} />
      <Confetti />
    </View>
  );
}

function Res({ h, v, color }: { h: string; v: string; color: string }) {
  const c = useTheme();
  return (
    <View style={{ flex: 1, borderRadius: 14, borderCurve: "continuous", borderWidth: 2, borderColor: color, overflow: "hidden", backgroundColor: c.surface }}>
      <View style={{ backgroundColor: color, paddingVertical: 4 }}><T w="black" size={12} color="#fff" style={{ textAlign: "center", letterSpacing: 1 }}>{h.toUpperCase()}</T></View>
      <T w="black" size={22} color={color} style={{ textAlign: "center", paddingVertical: 10, fontVariant: ["tabular-nums"] }}>{v}</T>
    </View>
  );
}

export function Results({ o, title, seconds, onNext, extra, primary = "Continue", onSecondary, secondary }: {
  o: Outcome; title: string; seconds?: number; onNext: () => void; extra?: React.ReactNode; primary?: string; onSecondary?: () => void; secondary?: string;
}) {
  const c = useTheme();
  const s = useApp();
  const insets = useSafeAreaInsets();
  useEffect(() => { sfx.done(); }, []);
  const secs = seconds ?? 0;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 32, paddingHorizontal: 16, gap: 18, alignItems: "center", paddingBottom: 24 }}>
        <Animated.View entering={ZoomIn.springify()}><Mascot mood={o.accuracy >= 0.5 ? "cheer" : "sad"} hat={s.hat} size={150} /></Animated.View>
        <T w="black" size={30} style={{ textAlign: "center" }}>{title}</T>
        <Animated.View entering={FadeInUp.delay(150)} style={{ flexDirection: "row", gap: 10, alignSelf: "stretch" }}>
          <Res h="XP" v={`+${o.xp}`} color={c.gold} />
          <Res h="Accuracy" v={`${Math.round(o.accuracy * 100)}%`} color={c.olive} />
          {seconds != null ? <Res h="Time" v={`${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`} color={c.flame} /> : extra}
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(300)} style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: c.goldSoft }}>
          <Icon name="dollarsign.circle.fill" size={20} color={c.xpText} />
          <T w="black" color={c.xpText}>+{o.drachmas} drachmas</T>
        </Animated.View>
        {o.goalMetNow && <T w="heavy" color={c.olive}>Daily goal reached. Yeehaw!</T>}
        {o.badges.map((b) => (
          <Animated.View key={b.id} entering={ZoomIn.delay(450)} style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 14, borderWidth: 2, borderColor: c.gold, backgroundColor: c.goldSoft, alignSelf: "stretch" }}>
            <Wreath letter={b.name[0]} size={44} />
            <View style={{ flex: 1 }}><T w="black">New laurel: {b.name}</T><T w="bold" size={13} color={c.muted}>{b.desc}</T></View>
          </Animated.View>
        ))}
      </ScrollView>
      <View style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 12, gap: 10 }}>
        <Btn label={primary} tone="gold" onPress={onNext} />
        {onSecondary && <Btn label={secondary ?? "Done"} tone="ghost" onPress={onSecondary} />}
      </View>
      {(o.accuracy >= 0.5 || o.newBest) && <Confetti />}
    </View>
  );
}
