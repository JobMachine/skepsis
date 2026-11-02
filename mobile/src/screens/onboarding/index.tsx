import { useState } from "react";
import { ScrollView, Switch, View } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SFSymbol } from "expo-symbols";

import { E, IX } from "@/course";
import { Choice } from "@/components/choice";
import { Mascot } from "@/components/mascot";
import { Bubble } from "@/components/texas";
import { Btn, Card, Icon, T } from "@/components/ui";
import { analyticsAvailable, dropQueue, track } from "@/lib/analytics";
import { startNode } from "@/lib/nav";
import { askPermission, reschedule } from "@/lib/reminders";
import { update, useApp } from "@/lib/store";
import { useTheme } from "@/theme";

const WHY: { id: string; label: string; icon: SFSymbol }[] = [
  { id: "work", label: "Sound sharper at work", icon: "briefcase.fill" },
  { id: "test", label: "Ace a test (SAT, GRE, MCAT)", icon: "graduationcap.fill" },
  { id: "kids", label: "Help my kids with vocabulary", icon: "figure.2.and.child.holdinghands" },
  { id: "trivia", label: "Win at trivia and Scrabble", icon: "trophy.fill" },
  { id: "curious", label: "I'm just curious", icon: "sparkles" },
];
const TIMES = [
  { label: "Morning coffee", h: 8, m: 0, icon: "sunrise.fill" as SFSymbol },
  { label: "Lunch break", h: 12, m: 30, icon: "sun.max.fill" as SFSymbol },
  { label: "Evening", h: 19, m: 0, icon: "sunset.fill" as SFSymbol },
  { label: "Before bed", h: 21, m: 30, icon: "moon.stars.fill" as SFSymbol },
];
const fmt = (h: number, m: number) => new Date(2026, 0, 1, h, m).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

export function Onboarding() {
  const s = useApp();
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(2);
  const STEPS = 5;

  function go() {
    track("onboarding_step", { step });
    setStep(step + 1);
  }
  async function finish() {
    update((x) => { x.onboarded = true; });
    track("onboarding_completed", { goal_xp: s.goal, motivation: s.motivation, reminders: s.reminders.on, analytics: s.analytics });
    await reschedule();
    router.replace("/(tabs)/(learn)");
    setTimeout(() => startNode(E.nextNode(IX, s)), 350);
  }
  async function enableReminders() {
    const t = TIMES[time];
    const ok = await askPermission();
    update((x) => { x.reminders = { on: ok, hour: t.h, minute: t.m }; });
    track("reminders_set", { granted: ok, hour: t.h });
    go();
  }

  const body = [
    <View key="hi" style={{ alignItems: "center", gap: 16, paddingTop: 24 }}>
      <Mascot mood="cheer" size={180} />
      <T w="west" size={44} color={c.brand}>Skepsis</T>
      <T w="greek" size={26} color={c.brand}>σκέψις</T>
      <T w="black" size={15} color={c.xpText} style={{ letterSpacing: 1.5, textTransform: "uppercase", marginTop: -8 }}>Roots to reason</T>
      <T w="semibold" size={17} style={{ textAlign: "center", lineHeight: 25 }}>
        Greek for &ldquo;looking closely&rdquo;, the root of skeptic. Y&apos;all already speak a little Greek. Three minutes a day and you&apos;ll see it everywhere: telephone, Metroplex, astronaut, kudos.
      </T>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {["Free forever", "Open source", "No account", "No ads"].map((x) => (
          <View key={x} style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: c.oliveSoft }}><T w="heavy" size={13} color={c.rightText}>{x}</T></View>
        ))}
      </View>
    </View>,
    <View key="why" style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}><Mascot size={80} /><Bubble text="What brings you to the agora, partner?" /></View>
      {WHY.map((w) => <Choice key={w.id} label={w.label} icon={w.icon} selected={s.motivation === w.id} onPress={() => update((x) => { x.motivation = w.id; })} />)}
    </View>,
    <View key="goal" style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}><Mascot size={80} /><Bubble text="How much time a day? You can change it later." /></View>
      {E.GOALS.map((g) => <Choice key={g.xp} label={g.label} sub={g.sub} right={`${g.xp} XP`} selected={s.goal === g.xp} onPress={() => update((x) => { x.goal = g.xp; })} />)}
      <T w="bold" size={13} color={c.muted} style={{ textAlign: "center" }}>Weekends never break your streak. No hearts, no penalties.</T>
    </View>,
    <View key="remind" style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}><Mascot size={80} /><Bubble text="People who pick a time are way more likely to keep a streak. When should I nudge you?" /></View>
      {TIMES.map((t, i) => <Choice key={t.label} label={t.label} icon={t.icon} right={fmt(t.h, t.m)} selected={time === i} onPress={() => setTime(i)} />)}
      <T w="bold" size={13} color={c.muted} style={{ textAlign: "center" }}>Reminders are set on your phone. No servers involved.</T>
    </View>,
    <View key="privacy" style={{ gap: 14 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}><Mascot size={80} /><Bubble text="One promise before we ride." /></View>
      <Card>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}><Icon name="iphone" size={22} color={c.brand} /><T w="semibold" style={{ flex: 1 }}><T w="black">Your progress stays on this phone.</T> No account, no sign-up, nothing to hack.</T></View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}><Icon name="hand.raised.fill" size={22} color={c.brand} /><T w="semibold" style={{ flex: 1 }}><T w="black">We never collect your name, email, contacts or location.</T></T></View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}><Icon name="chevron.left.forwardslash.chevron.right" size={22} color={c.brand} /><T w="semibold" style={{ flex: 1 }}><T w="black">Open source.</T> Every line is on GitHub, so you can check.</T></View>
      </Card>
      {analyticsAvailable && (
        <Card style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <T w="black">Share anonymous usage</T>
            <T w="bold" size={13} color={c.muted}>Counts like &ldquo;lesson 3 finished, 80% right&rdquo;, so we can fix lessons that are too hard. No personal data.</T>
          </View>
          <Switch value={s.analytics} trackColor={{ true: c.brand }} onValueChange={(v) => { update((x) => { x.analytics = v; }); if (!v) dropQueue(); }} />
        </Card>
      )}
    </View>,
  ];

  const canNext = step !== 1 || !!s.motivation;
  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8, paddingBottom: insets.bottom + 12 }}>
      <View style={{ flexDirection: "row", gap: 6, paddingHorizontal: 16 }}>
        {[...Array(STEPS)].map((_, i) => <View key={i} style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: i <= step ? c.brand : c.surface2 }} />)}
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Animated.View key={step} entering={FadeInRight.duration(220)}>{body[step]}</Animated.View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        {step === 3 ? (
          <>
            <Btn label="Remind me" icon="bell.fill" onPress={enableReminders} />
            <Btn label="Not now" tone="ghost" onPress={() => { track("reminders_set", { granted: false, skipped: true }); go(); }} />
          </>
        ) : step === STEPS - 1 ? (
          <Btn label="Saddle up" tone="gold" onPress={finish} />
        ) : (
          <Btn label={step === 0 ? "Get started" : "Continue"} disabled={!canNext} onPress={go} />
        )}
      </View>
    </View>
  );
}
