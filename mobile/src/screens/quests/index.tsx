import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import Animated, { ZoomIn } from "react-native-reanimated";

import { E } from "@/course";
import { Confetti } from "@/components/confetti";
import { Mascot } from "@/components/mascot";
import { WeekStrip } from "@/screens/lesson/celebrate";
import { Btn, Card, Eyebrow, Icon, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { sfx } from "@/lib/feedback";
import { CHEST_REWARD, ensureQuests, questById, questStatus } from "@/lib/quests";
import { update, useApp } from "@/lib/store";
import { useTheme } from "@/theme";

function untilMidnight() {
  const now = new Date();
  const end = new Date(now); end.setHours(24, 0, 0, 0);
  const mins = Math.max(0, Math.round((+end - +now) / 60000));
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export function Quests() {
  const s = useApp();
  const c = useTheme();
  const [party, setParty] = useState(0);
  const [left, setLeft] = useState(untilMidnight());
  useEffect(() => {
    if (!s.quests || s.quests.day !== E.dayKey()) update((x) => { ensureQuests(x); });
    const t = setInterval(() => setLeft(untilMidnight()), 30_000);
    return () => clearInterval(t);
  }, [s.quests]);
  const qd = s.quests;
  if (!qd) return null;
  const st = questStatus(qd);
  const allClaimed = qd.ids.every((id) => qd.claimed[id]);
  const streak = E.liveStreak(s, E.dayKey());

  function claim(id: string) {
    const q = questById(id);
    update((x) => { const d = ensureQuests(x); if (d.claimed[id]) return; d.claimed[id] = true; x.drachmas += q.reward; });
    track("quest_claimed", { quest: id, reward: q.reward });
    sfx.right();
  }
  function openChest() {
    update((x) => { const d = ensureQuests(x); if (d.chest) return; d.chest = true; x.drachmas += CHEST_REWARD; });
    track("chest_opened", { reward: CHEST_REWARD });
    sfx.done();
    setParty((p) => p + 1);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 48 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Eyebrow>Daily quests</Eyebrow>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Icon name="clock" size={13} color={c.muted} />
            <T w="heavy" size={13} color={c.muted}>New quests in {left}</T>
          </View>
        </View>
        {qd.ids.map((id) => {
          const q = questById(id);
          const p = qd.progress[id] || 0;
          const full = p >= q.target;
          const claimed = !!qd.claimed[id];
          return (
            <Card key={id} style={{ flexDirection: "row", alignItems: "center", gap: 12, opacity: claimed ? 0.6 : 1 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: full ? c.goldSoft : c.surface2, alignItems: "center", justifyContent: "center" }}>
                <Icon name={q.icon as never} size={22} color={full ? c.gold : c.muted} />
              </View>
              <View style={{ flex: 1, gap: 6 }}>
                <T w="black" size={15}>{q.title}</T>
                <View style={{ height: 12, borderRadius: 999, backgroundColor: c.surface2, overflow: "hidden" }}>
                  <View style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(p / q.target) * 100}%`, backgroundColor: full ? c.gold : c.brand, borderRadius: 999 }} />
                </View>
                <T w="heavy" size={12} color={c.muted} style={{ fontVariant: ["tabular-nums"] }}>{p} / {q.target}</T>
              </View>
              {claimed ? <Icon name="checkmark.circle.fill" size={26} color={c.olive} />
                : full ? <Btn small block={false} tone="gold" label={`+${q.reward}`} onPress={() => claim(id)} />
                : <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}><Icon name="dollarsign.circle" size={14} color={c.muted} /><T w="heavy" size={13} color={c.muted}>{q.reward}</T></View>}
            </Card>
          );
        })}

        <Card style={{ alignItems: "center", borderWidth: 2, borderColor: allClaimed && !qd.chest ? c.gold : c.line, backgroundColor: allClaimed && !qd.chest ? c.goldSoft : c.surface }}>
          <Animated.View key={String(qd.chest)} entering={ZoomIn}>
            <Icon name={qd.chest ? "shippingbox.fill" : "shippingbox"} size={52} color={allClaimed ? c.gold : c.locked} />
          </Animated.View>
          <T w="black" size={17}>{qd.chest ? "Chest opened. See you tomorrow!" : allClaimed ? "Treasure chest unlocked!" : `Treasure chest · ${st.done}/3 quests`}</T>
          <T w="bold" size={13} color={c.muted} style={{ textAlign: "center" }}>{qd.chest ? `You got ${CHEST_REWARD} drachmas.` : `Finish and claim all three quests for ${CHEST_REWARD} bonus drachmas.`}</T>
          {allClaimed && !qd.chest && <Btn label="Open chest" tone="gold" onPress={openChest} />}
        </Card>

        <Eyebrow>Your streak</Eyebrow>
        <Card onPress={() => router.push("/streak")} style={{ gap: 14 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Icon name="flame.fill" size={40} color={streak ? c.flame : c.locked} />
            <View style={{ flex: 1 }}>
              <T w="black" size={22} style={{ fontVariant: ["tabular-nums"] }}>{streak} day streak</T>
              <T w="bold" size={13} color={c.muted}>Best: {s.bestStreak} · Freezes: {s.freezes}</T>
            </View>
            <Icon name="chevron.right" size={16} color={c.muted} />
          </View>
          <WeekStrip />
        </Card>

        <Card onPress={() => router.push("/shop")} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Mascot size={56} hat={s.hat} />
          <View style={{ flex: 1 }}>
            <T w="black" size={16}>The Agora shop</T>
            <T w="bold" size={13} color={c.muted}>Streak freezes and hats for Homer · {s.drachmas} drachmas</T>
          </View>
          <Icon name="chevron.right" size={16} color={c.muted} />
        </Card>
      </ScrollView>
      {party > 0 && <Confetti key={party} seed={party} />}
    </View>
  );
}
