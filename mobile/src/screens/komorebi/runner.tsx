// Runs one Komorebi lesson sitting (or a review of due Japanese cards), with the same flow as a
// Skepsis lesson: one step at a time, missed questions return once at the end, then the streak
// celebration and results. Steps come from Komorebi's own engine (buildLesson / buildReview).
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View, type ScrollViewInstance } from "react-native";
import { router } from "expo-router";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Speech from "expo-speech";

import { Mascot } from "@/components/mascot";
import { Btn, Icon, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { sfx } from "@/lib/feedback";
import { finishRun, maybeAskReview, type Outcome } from "@/lib/progress";
import { getState, update } from "@/lib/store";
import { KE, KIX, lessonStatus, nextLesson, type KQuestion, type KStep } from "@/komorebi";
import { Results, StreakCelebration } from "@/screens/lesson/celebrate";
import { TopBar } from "@/screens/lesson/chrome";
import { useTheme } from "@/theme";
import { Choice, Romaji, Scenario, Teach, Tiles } from "./questions";

const RIGHT = ["That's right!", "いいですね! (ii desu ne, nice!)", "Spot on.", "You're on a roll.", "すごい! (sugoi, great!)"];
const WRONG = ["Not quite. It'll come back around.", "Close. Read the note below.", "Shake it off, you'll see it again."];
const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];
const seed = () => Math.floor(Math.random() * 2 ** 31);

type Plan = { steps: KStep[]; sitting: number; total: number };

function plan(review: boolean, lessonId?: string): Plan {
  const k = getState().komorebi;
  if (review || !lessonId) return { steps: KE.buildReview(KIX, k, KE.dayKey(), seed(), 12), sitting: 0, total: 1 };
  const st = lessonStatus(k, lessonId);
  const sitting = st.done ? 0 : st.sittings % st.total;
  return { steps: KE.buildLesson(KIX, k, lessonId, seed(), sitting), sitting, total: st.total };
}

function answerText(q: KQuestion): string | null {
  if (q.type === "choice") return q.answer;
  if (q.type === "tiles") return `${q.ja} (${q.romaji})`;
  if (q.type === "romaji") return q.answer;
  return q.options[q.answer]?.text ?? null;
}

export function KomorebiRunner({ lessonId, review }: { lessonId?: string; review?: boolean }) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const lesson = lessonId ? KIX.lessonById.get(lessonId) : undefined;
  const unitId = lessonId?.split("l")[0];
  const [{ steps: initial, sitting, total }] = useState(() => plan(!!review, lessonId));
  const [steps, setSteps] = useState<KStep[]>(initial);
  const [i, setI] = useState(0);
  const [fb, setFb] = useState<{ ok: boolean; neutral?: boolean; title: string; why?: string } | null>(null);
  const [phase, setPhase] = useState<"run" | "streak" | "results">("run");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [secs, setSecs] = useState(0);
  const [combo, setCombo] = useState(0);
  const st = useRef({ scored: 0, right: 0, misses: 0, combo: 0, maxCombo: 0, requeued: new Set<number>(), start: 0 });
  const scroll = useRef<ScrollViewInstance>(null);
  const mode = review ? "komorebi-review" : "komorebi";
  const props = { mode, course: "komorebi", lesson_id: lessonId ?? null, unit_id: unitId ?? null, sitting };

  useEffect(() => { st.current.start = Date.now(); track("lesson_started", props); return () => { Speech.stop(); }; }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const step = steps[i];
  useEffect(() => {
    if (step?.type === "teach") update((s) => KE.learn(s.komorebi, step.itemId, KE.dayKey()));
    scroll.current?.scrollTo({ y: 0, animated: false });
  }, [i, step]);

  function quit() {
    if (phase !== "run") return router.back();
    Alert.alert("Quit this lesson?", "You'll lose this lesson's progress.", [
      { text: "Keep learning", style: "cancel" },
      { text: "Quit", style: "destructive", onPress: () => { track("lesson_quit", { ...props, step: i, steps: steps.length }); router.back(); } },
    ]);
  }

  function answer(q: KQuestion, ok: boolean, why?: string) {
    const r = st.current;
    if (q.guess) {
      (ok ? sfx.right : sfx.tick)();
      setFb({ ok: true, neutral: true, title: ok ? "Nice instinct!" : "Good guess! Now let's learn it." });
      return;
    }
    r.scored += 1;
    if (ok) { r.right += 1; r.combo += 1; r.maxCombo = Math.max(r.maxCombo, r.combo); sfx.right(); }
    else { r.misses += 1; r.combo = 0; sfx.wrong(); }
    setCombo(r.combo);
    const t = KE.dayKey();
    update((s) => { s.answered += 1; if (ok) s.correct += 1; if (q.itemId && !q.retrieval) KE.grade(s.komorebi, q.itemId, ok, t); });
    track("question_answered", { ...props, item_id: q.itemId, type: q.type, label: q.label, correct: ok });
    if (!ok && !r.requeued.has(i)) {
      r.requeued.add(steps.length);
      setSteps([...steps, { ...q, label: "Try again", retrieval: true } as KStep]);
    }
    setFb({ ok, title: ok ? (r.combo >= 3 ? `${r.combo} in a row!` : pick(RIGHT)) : pick(WRONG), why });
  }

  function next() {
    setFb(null);
    Speech.stop();
    if (i + 1 < steps.length) { setI(i + 1); return; }
    const r = st.current;
    const seconds = Math.round((Date.now() - r.start) / 1000);
    const o = finishRun({ mode, nodeId: lessonId, unitId, scored: r.scored, right: r.right, misses: r.misses, maxCombo: r.maxCombo, seconds, origins: 0, lessonDone: sitting + 1 >= total });
    setSecs(seconds);
    setOutcome(o);
    setPhase(o.firstToday ? "streak" : "results");
  }

  if (!steps.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 16 }}>
        <Mascot mood="happy" />
        <T w="black" size={20} style={{ textAlign: "center" }}>Nothing due for review</T>
        <T w="bold" color={c.muted} style={{ textAlign: "center" }}>Finish a Komorebi lesson, then come back tomorrow to review.</T>
        <Btn label="Back" onPress={() => router.back()} />
      </View>
    );
  }

  if (phase === "streak" && outcome) return <StreakCelebration o={outcome} onNext={() => setPhase("results")} />;
  if (phase === "results" && outcome) {
    const lessonDone = sitting + 1 >= total;
    const title = outcome.perfect ? "Flawless!" : review ? "Review done!" : lessonDone ? "Lesson complete!" : `Part ${sitting + 1} of ${total} done!`;
    const done = () => { router.back(); maybeAskReview(); };
    // Not finished yet: offer the next part of the same lesson; finished: the next lesson.
    const up = review ? null : !lessonDone ? lesson : nextLesson(getState().komorebi);
    if (!up) return <Results o={outcome} title={title} seconds={secs} onNext={done} />;
    const goNext = () => router.replace({ pathname: "/komorebi", params: { lesson: up.id } });
    const label = up.id === lessonId ? `Part ${sitting + 2} · ${up.title}` : `Next lesson · ${up.title}`;
    return <Results o={outcome} title={title} seconds={secs} primary={label} onNext={goNext} secondary="Done for now" onSecondary={done} />;
  }

  const isTeach = step.type === "teach";
  const q = isTeach ? null : step;
  const ans = fb && !fb.ok && q ? answerText(q) : null;
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopBar onQuit={quit} progress={i / steps.length} combo={combo} />
      <ScrollView ref={scroll} keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16, paddingBottom: fb ? 340 : 140, gap: 18 }}>
        <Animated.View key={i} entering={FadeIn.duration(180)}>
          {step.type === "teach" && <Teach itemId={step.itemId} />}
          {step.type === "choice" && <Choice q={step} onAnswer={(ok) => answer(step, ok)} />}
          {step.type === "scenario" && <Scenario q={step} onAnswer={(ok, why) => answer(step, ok, why)} />}
          {step.type === "tiles" && <Tiles q={step} onAnswer={(ok) => answer(step, ok)} />}
          {step.type === "romaji" && <Romaji q={step} onAnswer={(ok) => answer(step, ok)} />}
        </Animated.View>
      </ScrollView>
      {isTeach && (
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 16, paddingBottom: insets.bottom + 12, borderTopWidth: 2, borderTopColor: c.line, backgroundColor: c.bg }}>
          <Btn label="Got it" onPress={next} />
        </View>
      )}
      {fb && q && (
        <Animated.View entering={SlideInDown.duration(220)} style={{
          position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingTop: 16, paddingBottom: insets.bottom + 12, gap: 10,
          backgroundColor: fb.ok ? c.oliveSoft : c.claySoft, borderTopWidth: 2, borderTopColor: fb.ok ? c.olive : c.clay,
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }} accessibilityLiveRegion="polite">
            <Icon name={fb.ok ? "checkmark.circle.fill" : "xmark.circle.fill"} size={26} color={fb.ok ? c.olive : c.clay} />
            <T w="black" size={21} color={fb.ok ? c.rightText : c.wrongText} style={{ flex: 1 }}>{fb.title}</T>
          </View>
          {ans && <T w="heavy" size={15} selectable>Answer: {ans}</T>}
          {!!(fb.why || q.explain || q.say) && <T w="semibold" size={15} selectable>{fb.why || q.explain || q.say}</T>}
          <Btn label="Continue" tone={fb.ok ? "olive" : "clay"} onPress={next} />
        </Animated.View>
      )}
    </View>
  );
}
