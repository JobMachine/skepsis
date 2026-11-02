import { useEffect, useRef } from "react";
import { Pressable, ScrollView, Share, View, type ScrollViewInstance } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { E, IX, type IndexedItem } from "@/course";
import { GoalRing } from "@/components/goal-ring";
import { Mascot } from "@/components/mascot";
import { Bubble } from "@/components/texas";
import { Btn, Card, Eyebrow, Icon, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { haptic } from "@/lib/feedback";
import { startNode, startPractice, startRodeo } from "@/lib/nav";
import { questStatus } from "@/lib/quests";
import { useApp } from "@/lib/store";
import { useTheme } from "@/theme";
import { Trail } from "./trail";

/** Same item for everyone on a given day (matches the website). */
export function rootOfDay(today: string): IndexedItem {
  const all = [...IX.items.values()].filter((x) => x.kind !== "origin");
  const n = Math.abs(E.daysBetween("2026-01-01", today));
  return all[(n * 7) % all.length];
}

export function shareText(it: IndexedItem) {
  if (it.kind === "root") return `${it.root} (${it.gr}) = ${it.m}\n${it.say}\nTexas take: ${it.hook}\nWords: ${it.ex.map((e) => e[0]).join(", ")}\n\nLearned on Skepsis, the free Greek roots app: https://skepsis-greek.vercel.app`;
  if (it.kind === "idea") return `${it.term} (${it.gr}, "${it.lit}") = ${it.m}\n${it.say}\nTexas take: ${it.tex}\n\nLearned on Skepsis, the free Greek roots app: https://skepsis-greek.vercel.app`;
  return `${it.w}: ${it.greek ? "Greek" : "not Greek"}. ${it.from}\n\nPlay "Is it Greek?" on Skepsis: https://skepsis-greek.vercel.app`;
}

const GREETS = ["Howdy! Ready for three minutes of Greek?", "Saddle up, partner. One lesson keeps the streak alive.", "Fixin' to learn some Greek?", "Every English word has a story. Let's find one."];

function Tile({ icon, color, title, sub, onPress, disabled }: { icon: Parameters<typeof Icon>[0]["name"]; color: string; title: string; sub: string; onPress: () => void; disabled?: boolean }) {
  const c = useTheme();
  return (
    <Pressable disabled={disabled} onPress={() => { haptic.tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={title}
      style={({ pressed }) => ({
        flex: 1, gap: 4, padding: 14, borderRadius: 16, borderCurve: "continuous", backgroundColor: c.surface, borderWidth: 2, borderColor: c.line,
        boxShadow: `0 ${pressed ? 1 : 3}px 0 ${c.line}`, transform: [{ translateY: pressed ? 2 : 0 }], opacity: disabled ? 0.55 : 1,
      })}>
      <Icon name={icon} size={28} color={color} />
      <T w="black" size={16}>{title}</T>
      <T w="bold" size={13} color={c.muted}>{sub}</T>
    </Pressable>
  );
}

export function Learn() {
  const s = useApp();
  const c = useTheme();
  const t = E.dayKey();
  const todayXp = s.days[t] || 0;
  const met = todayXp >= s.goal;
  const next = E.nextNode(IX, s);
  const due = E.dueItems(s, t).length;
  const learned = Object.keys(s.items).length;
  const rod = rootOfDay(t);
  const qs = questStatus(s.quests);
  const scroll = useRef<ScrollViewInstance>(null);
  const { y } = useLocalSearchParams<{ y?: string }>();
  // Dev only: /?y=900 scrolls down, so screenshots can reach the trail.
  useEffect(() => { if (__DEV__ && y) setTimeout(() => scroll.current?.scrollTo({ y: Number(y), animated: false }), 300); }, [y]);
  const greet = met ? "Daily goal done. Smarter than a tree full of owls." : s.lastDay === t ? "Good work today. A little more hits your goal." : GREETS[Math.abs(E.daysBetween("2026-01-01", t)) % GREETS.length];

  return (
    <ScrollView ref={scroll} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, gap: 18, paddingBottom: 48 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <Mascot mood={met ? "cheer" : "happy"} hat={s.hat} size={84} />
        <Bubble text={greet} />
      </View>

      <Card style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <GoalRing pct={todayXp / s.goal} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Eyebrow>Daily goal</Eyebrow>
          <T w="black" size={17} style={{ fontVariant: ["tabular-nums"] }}>{todayXp} / {s.goal} XP</T>
          <T w="bold" size={13} color={c.muted}>{E.isWeekend(t) ? "Weekend: optional, your streak is safe." : "Weekends never break your streak."}</T>
        </View>
        {next && <Btn label={Object.keys(s.done).length ? "Go" : "Start"} block={false} onPress={() => startNode(next)} />}
      </Card>

      <Card onPress={() => router.push("/quests")} style={{ flexDirection: "row", alignItems: "center", gap: 12, borderColor: qs.ready ? c.gold : c.line, borderWidth: qs.ready ? 2 : 1, backgroundColor: qs.ready ? c.goldSoft : c.surface }}>
        <Icon name="scroll.fill" size={28} color={c.gold} />
        <View style={{ flex: 1 }}>
          <T w="black" size={16}>{qs.ready ? `${qs.ready} quest reward${qs.ready > 1 ? "s" : ""} ready!` : `Daily quests · ${qs.done}/${qs.total}`}</T>
          <T w="bold" size={13} color={c.muted}>{qs.ready ? "Tap to collect your drachmas" : "Finish all three for a treasure chest"}</T>
        </View>
        <Icon name="chevron.right" size={16} color={c.muted} />
      </Card>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Tile icon="arrow.clockwise" color={c.olive} title="Practice" disabled={learned < 3} onPress={startPractice}
          sub={learned < 3 ? "Unlocks after lesson 1" : due ? `${due} due for review` : "Strengthen weak spots"} />
        <Tile icon="timer" color={c.flame} title="Rodeo" onPress={startRodeo} sub={`8 seconds a question · best ${s.rodeoBest}`} />
      </View>

      <Card style={{ borderWidth: 2, borderColor: c.gold, backgroundColor: c.goldSoft }} onPress={() => router.push({ pathname: "/word/[id]", params: { id: rod.id } })}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Eyebrow>Root of the day</Eyebrow>
          <Pressable hitSlop={10} accessibilityLabel="Share" onPress={() => { track("word_shared", { item_id: rod.id, where: "rotd" }); Share.share({ message: shareText(rod) }); }}>
            <Icon name="square.and.arrow.up" size={18} color={c.xpText} />
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", columnGap: 12 }}>
          <T w="black" size={30} style={{ lineHeight: 34 }}>{E.labelOf(rod)}</T>
          <T w="greek" size={24} color={c.xpText}>{"gr" in rod ? rod.gr : ""}</T>
        </View>
        <T w="heavy" size={16}>{rod.kind !== "origin" ? rod.m : ""}</T>
        <T w="bold" size={14} color={c.muted}>{rod.kind === "root" ? rod.hook : rod.kind === "idea" ? rod.tex : ""}</T>
      </Card>

      <Trail />

      <View style={{ alignItems: "center", gap: 8, paddingTop: 8 }}>
        <T w="semibold" size={13} color={c.muted} style={{ textAlign: "center" }}>Skepsis is free and open source (MIT). Your progress never leaves this phone.</T>
      </View>
    </ScrollView>
  );
}
