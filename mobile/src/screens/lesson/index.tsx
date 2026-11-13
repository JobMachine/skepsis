// Runs a lesson, unit roundup or practice session: one step at a time, missed questions come
// back at the end, then a streak celebration (first lesson of the day) and the results.
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View, type ScrollViewInstance } from "react-native";
import { router } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { E, IX, NODES, type Question, type Step } from "@/course";
import { Mascot } from "@/components/mascot";
import { Btn, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { sfx } from "@/lib/feedback";
import { finishRun, maybeAskReview, type Mode, type Outcome } from "@/lib/progress";
import { getState, update } from "@/lib/store";
import { useTheme } from "@/theme";
import { ReminderAsk } from "@/screens/onboarding/reminder-ask";
import { Results, StreakCelebration } from "./celebrate";
import { TopBar } from "./chrome";
import { FeedbackPanel } from "./feedback-panel";
import { Build, Intro, Match, Mcq, OriginIntro, Tf } from "./questions";

const RIGHT = ["That's right as rain.", "Yeehaw! Nailed it.", "Smarter than a tree full of owls.", "Bullseye, partner.", "Aristotle would be proud.", "You're on a roll."];
const WRONG = ["Close, but no cigar.", "Shake it off, partner.", "That one bucked you. It'll come back around.", "Not quite. Even Odysseus took a wrong turn."];
const GUESS = ["Good guess! Now let's learn it.", "Guessing first helps it stick. Here's the answer."];
const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];
const seed = () => Math.floor(Math.random() * 2 ** 31);

function build(mode: Mode, nodeId?: string): Step[] {
  const s = getState();
  const node = NODES.find((n) => n.id === nodeId);
  if (mode === "lesson" && node) return E.buildLesson(IX, s, node.id, seed());
  if (mode === "roundup" && node) return E.buildRoundup(IX, s, node.unitId, seed());
  return E.buildPractice(IX, s, seed());
}

export function LessonRunner({ mode, nodeId, auto }: { mode: Mode; nodeId?: string; auto?: string }) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const node = NODES.find((n) => n.id === nodeId);
  const [steps, setSteps] = useState<Step[]>(() => build(mode, nodeId));
  const [i, setI] = useState(0);
  const [fb, setFb] = useState<{ ok: boolean; neutral?: boolean; title: string } | null>(null);
  const [phase, setPhase] = useState<"run" | "streak" | "results" | "remind">("run");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [secs, setSecs] = useState(0);
  const [combo, setCombo] = useState(0);
  const st = useRef({ scored: 0, right: 0, misses: 0, combo: 0, maxCombo: 0, origins: 0, requeued: new Set<number>(), start: 0, finished: false });
  const scroll = useRef<ScrollViewInstance>(null);
  const props = { mode, lesson_id: node?.id ?? null, unit_id: node?.unitId ?? null };

  useEffect(() => { st.current.start = Date.now(); track("lesson_started", props); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const step = steps[i];
  useEffect(() => {
    if (step?.type === "intro") update((s) => E.learn(s, step.itemId, E.dayKey()));
    scroll.current?.scrollTo({ y: 0, animated: false });
  }, [i, step]);

  function quit() {
    if (phase !== "run") return router.back();
    Alert.alert("Quit this lesson?", "You'll lose this lesson's progress. Homer will be sad.", [
      { text: "Keep learning", style: "cancel" },
      { text: "Quit", style: "destructive", onPress: () => { track("lesson_quit", { ...props, step: i, steps: steps.length, answered: st.current.scored }); router.back(); } },
    ]);
  }

  function answer(q: Question, ok: boolean) {
    const r = st.current;
    if (q.guess) {
      (ok ? sfx.right : sfx.tick)();
      setFb({ ok: true, neutral: true, title: ok ? "Nice instinct!" : pick(GUESS) });
      return;
    }
    r.scored += 1;
    if (q.type === "tf") r.origins += 1;
    if (ok) { r.right += 1; r.combo += 1; r.maxCombo = Math.max(r.maxCombo, r.combo); sfx.right(); }
    else { r.misses += 1; r.combo = 0; sfx.wrong(); }
    setCombo(r.combo);
    const t = E.dayKey();
    update((s) => { s.answered += 1; if (ok) s.correct += 1; if (q.itemId) E.grade(s, q.itemId, ok, t); });
    track("question_answered", { ...props, item_id: q.itemId, type: q.type, label: q.label, correct: ok });
    if (!ok && !r.requeued.has(i)) {
      r.requeued.add(steps.length);
      setSteps([...steps, { ...q, label: "Try again" } as Step]);
    }
    setFb({ ok, title: ok ? (r.combo >= 3 ? `${r.combo} in a row!` : pick(RIGHT)) : pick(WRONG) });
  }

  function next() {
    setFb(null);
    if (i + 1 < steps.length) { setI(i + 1); return; }
    const r = st.current;
    r.finished = true;
    const seconds = Math.round((Date.now() - r.start) / 1000);
    const o = finishRun({ mode, nodeId: node?.id, unitId: node?.unitId, scored: r.scored, right: r.right, misses: r.misses, maxCombo: r.maxCombo, seconds, origins: r.origins });
    setSecs(seconds);
    setOutcome(o);
    setPhase(o.firstToday ? "streak" : "results");
  }

  // Dev only: ?auto=1 plays the lesson by itself (every 3rd answer wrong) so the whole flow can be checked.
  useEffect(() => {
    if (!__DEV__ || !auto || phase !== "run" || !steps[i]) return;
    const t = setTimeout(() => {
      const cur = steps[i];
      if (fb || cur.type === "intro" || cur.type === "intro-origin") next();
      else answer(cur, (i + 1) % 3 !== 0);
    }, 900);
    return () => clearTimeout(t);
  });

  if (!steps.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 16 }}>
        <Mascot mood="sad" />
        <T w="black" size={20} style={{ textAlign: "center" }}>Nothing to practice yet</T>
        <T w="bold" color={c.muted} style={{ textAlign: "center" }}>Finish a lesson first, then come back to review.</T>
        <Btn label="Back" onPress={() => router.back()} />
      </View>
    );
  }

  if (phase === "streak" && outcome) return <StreakCelebration o={outcome} onNext={() => setPhase("results")} />;
  if (phase === "results" && outcome) {
    const title = outcome.perfect ? "Flawless!" : mode === "practice" ? "Practice done!" : mode === "roundup" ? "Unit complete!" : "Lesson complete!";
    // After the first finished lesson, ask once when to send a reminder (skipped if already on).
    const askRemind = () => { const x = getState(); return !x.remindAsked && !x.reminders.on && x.lessonsFinished >= 1; };
    return <Results o={outcome} title={title} seconds={secs} onNext={() => { if (askRemind()) { setPhase("remind"); return; } router.back(); maybeAskReview(); }} />;
  }
  if (phase === "remind") {
    return <ReminderAsk onDone={() => router.back()} />;
  }

  const isIntro = step.type === "intro" || step.type === "intro-origin";
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopBar onQuit={quit} progress={i / steps.length} combo={combo} />
      <ScrollView ref={scroll} contentContainerStyle={{ padding: 16, paddingBottom: fb ? 320 : 140, gap: 18 }}>
        <Animated.View key={i} entering={FadeIn.duration(180)}>
          {step.type === "intro" && <Intro itemId={step.itemId} />}
          {step.type === "intro-origin" && <OriginIntro />}
          {step.type === "mcq" && <Mcq q={step} reveal={false} onAnswer={(ok) => answer(step, ok)} />}
          {step.type === "tf" && <Tf q={step} reveal={false} onAnswer={(ok) => answer(step, ok)} />}
          {step.type === "build" && <Build q={step} reveal={false} onAnswer={(ok) => answer(step, ok)} />}
          {step.type === "match" && <Match q={step} reveal={false} onAnswer={(ok) => answer(step, ok)} />}
        </Animated.View>
      </ScrollView>
      {isIntro && (
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 16, paddingBottom: insets.bottom + 12, borderTopWidth: 2, borderTopColor: c.line, backgroundColor: c.bg }}>
          <Btn label={step.type === "intro-origin" ? "Let's ride" : "Got it"} onPress={next} />
        </View>
      )}
      {fb && !isIntro && <FeedbackPanel ok={fb.ok} neutral={fb.neutral} title={fb.title} q={step as Question} onNext={next} />}
    </View>
  );
}
