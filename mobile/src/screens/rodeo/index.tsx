// Rodeo: 8 seconds per question, one miss bucks you off. Questions come from what you've learned.
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import Animated, { Easing, FadeIn, useAnimatedStyle, useSharedValue, withTiming, cancelAnimation } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { E, IX, type Question } from "@/course";
import { Mascot } from "@/components/mascot";
import { Btn, Icon, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { sfx } from "@/lib/feedback";
import { finishRun, type Outcome } from "@/lib/progress";
import { getState, update, useApp } from "@/lib/store";
import { useTheme } from "@/theme";
import { Results } from "../lesson/celebrate";
import { TopBar } from "../lesson/chrome";
import { FeedbackPanel } from "../lesson/feedback-panel";
import { Mcq, Tf } from "../lesson/questions";

const RODEO_MS = 8000;
const RIGHT = ["Still on!", "Yeehaw!", "Hold on tight!", "Eight seconds, easy.", "Ride 'em, cowboy!"];

function TimerBar({ running, k }: { running: boolean; k: number }) {
  const c = useTheme();
  const v = useSharedValue(1);
  useEffect(() => {
    v.value = 1;
    v.value = withTiming(0, { duration: RODEO_MS, easing: Easing.linear });
    return () => cancelAnimation(v);
  }, [k, v]);
  useEffect(() => { if (!running) cancelAnimation(v); }, [running, v]);
  const st = useAnimatedStyle(() => ({ transform: [{ scaleX: v.value }] }));
  return (
    <View style={{ height: 10, borderRadius: 999, backgroundColor: c.surface2, overflow: "hidden", marginHorizontal: 16 }}>
      <Animated.View style={[{ height: "100%", width: "100%", backgroundColor: c.flame, transformOrigin: "left" }, st]} />
    </View>
  );
}

export function Rodeo() {
  const c = useTheme();
  const s = useApp();
  const insets = useSafeAreaInsets();
  const rng = useRef(E.rng(Math.floor(Math.random() * 2 ** 31)));
  const [phase, setPhase] = useState<"intro" | "ride" | "results">("intro");
  const [q, setQ] = useState<Question | null>(null);
  const [n, setN] = useState(0);
  const [fb, setFb] = useState<{ ok: boolean; title: string } | null>(null);
  const [reveal, setReveal] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [rides, setRides] = useState(0);
  const r = useRef({ right: 0, scored: 0, origins: 0, start: 0, finished: false });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function nextQ() {
    const nq = E.rodeoQuestion(IX, getState(), rng.current);
    setQ(nq); setFb(null); setReveal(false); setN((x) => x + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { setReveal(true); onAnswer(nq, false, true); }, RODEO_MS);
  }
  function start() {
    r.current = { right: 0, scored: 0, origins: 0, start: Date.now(), finished: false };
    setRides(0);
    track("rodeo_started", { best: getState().rodeoBest });
    setPhase("ride");
    nextQ();
  }
  function onAnswer(question: Question, ok: boolean, timedOut = false) {
    if (timer.current) clearTimeout(timer.current);
    const x = r.current;
    x.scored += 1;
    if (question.type === "tf") x.origins += 1;
    if (ok) { x.right += 1; setRides(x.right); sfx.right(); } else sfx.wrong();
    update((st) => { st.answered += 1; if (ok) st.correct += 1; if (question.itemId && st.items[question.itemId]) E.grade(st, question.itemId, ok, E.dayKey()); });
    track("question_answered", { mode: "rodeo", item_id: question.itemId, type: question.type, correct: ok, timed_out: timedOut });
    setFb({ ok, title: ok ? RIGHT[Math.floor(Math.random() * RIGHT.length)] : timedOut ? "Time's up!" : "Bucked off!" });
  }
  function finish() {
    const x = r.current;
    x.finished = true;
    const o = finishRun({ mode: "rodeo", scored: x.scored, right: x.right, misses: 1, maxCombo: x.right, seconds: Math.round((Date.now() - x.start) / 1000), origins: x.origins });
    setOutcome(o);
    setPhase("results");
  }
  function quit() {
    if (phase === "ride" && !r.current.finished) track("rodeo_quit", { rides: r.current.right });
    router.back();
  }

  if (phase === "results" && outcome) {
    const score = rides;
    return (
      <Results o={{ ...outcome, accuracy: score ? 1 : 0 }} title={score === 0 ? "Bucked off!" : outcome.newBest ? "New best ride!" : `${score} rides!`}
        extra={<View style={{ flex: 1, borderRadius: 14, borderWidth: 2, borderColor: c.flame, alignItems: "center", paddingVertical: 10 }}><T w="black" size={12} color={c.flame}>RIDES</T><T w="black" size={22} color={c.flame}>{score}</T></View>}
        primary="Ride again" onNext={() => { setOutcome(null); start(); }} secondary="Done" onSecondary={() => router.back()} />
    );
  }

  if (phase === "intro") {
    return (
      <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom + 12 }}>
        <TopBar onQuit={quit} combo={0} title="Rodeo" />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 16 }}>
          <Mascot mood="cheer" hat={s.hat === "wreath" ? "cowboy" : s.hat} size={150} />
          <T w="west" size={36} color={c.flame}>Rodeo</T>
          <T w="semibold" size={17} style={{ textAlign: "center", maxWidth: 320, lineHeight: 25 }}>A real bull ride lasts 8 seconds. Here, every question does. Answer before the clock runs out to stay on. One miss and you&apos;re bucked off.</T>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Icon name="trophy.fill" size={18} color={c.gold} />
            <T w="heavy" color={c.muted}>Your best: {s.rodeoBest} rides</T>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}><Btn label="Open the gate" tone="gold" onPress={start} /></View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopBar onQuit={quit} combo={rides} title={`Rodeo · ${rides} rides`} />
      <TimerBar k={n} running={!fb} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: fb ? 320 : 60 }}>
        {q && (
          <Animated.View key={n} entering={FadeIn.duration(150)}>
            {q.type === "tf" ? <Tf q={q} reveal={reveal} onAnswer={(ok) => onAnswer(q, ok)} /> : q.type === "mcq" ? <Mcq q={q} reveal={reveal} onAnswer={(ok) => onAnswer(q, ok)} /> : null}
          </Animated.View>
        )}
      </ScrollView>
      {fb && q && <FeedbackPanel ok={fb.ok} title={fb.title} q={q} nextLabel={fb.ok ? "Next ride" : "See results"} onNext={() => (fb.ok ? nextQ() : finish())} />}
    </View>
  );
}
