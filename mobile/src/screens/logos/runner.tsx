// Runs one Logos lesson (an episode's first listen), a refresh of what you have heard, or an era
// roundup. Steps come from Logos's own engine (buildLesson / buildRefresh / buildRoundup); every
// step is a tap, nothing is timed and nothing can be failed. Finishing always pays the same XP and
// keeps the shared streak going, then comes the streak celebration and a results screen with Flux.
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Confetti } from "@/components/confetti";
import { Btn, Card, Icon, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { sfx } from "@/lib/feedback";
import { finishRun, maybeAskReview, type Outcome } from "@/lib/progress";
import { getState, update } from "@/lib/store";
import { LE, LIX, SHOW_URL, nextEpisode, type LIndexedLesson } from "@/logos";
import { plan, type Plan } from "@/logos/plan";
import { StreakCelebration } from "@/screens/lesson/celebrate";
import { TopBar } from "@/screens/lesson/chrome";
import { useTheme } from "@/theme";
import { Flux, usePlum } from "./flux";
import { CardStep, EpisodeLinks, LinkChip, MatchStep, McqStep, RecallStep, RecapStep, Unofficial } from "./steps";

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function LogosRunner({ nodeId, refresh }: { nodeId?: string; refresh?: boolean }) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const [p] = useState(() => plan(nodeId, refresh));
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"run" | "streak" | "results">("run");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [secs, setSecs] = useState(0);
  const [seen, setSeen] = useState<string[]>([]);
  const ideas = useRef(new Set<string>());
  const exam = useRef({ asked: 0, firstTry: 0 });
  const start = useRef(0);
  const props = { mode: p.mode, course: "logos", lesson_id: p.nodeId ?? null, unit_id: p.unitId ?? null };

  useEffect(() => { start.current = Date.now(); track("lesson_started", props); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const step = p.steps[i];
  // Teaching a card puts the idea into spaced review, exactly as the Logos website does.
  useEffect(() => {
    if (step?.type !== "card") return;
    ideas.current.add(step.itemId);
    update((s) => LE.learn(s.logos, step.itemId, LE.dayKey()));
  }, [step]);

  function quit() {
    if (phase !== "run") return router.back();
    Alert.alert("Leave this lesson?", "Nothing is lost: ideas you have already seen stay saved. You can't fail here.", [
      { text: "Keep going", style: "cancel" },
      { text: "Leave", style: "destructive", onPress: () => { track("lesson_quit", { ...props, step: i, steps: p.steps.length }); router.back(); } },
    ]);
  }

  /** A right answer (or a marked recall card): schedule the idea's next review. Never reduces XP. */
  function grade(itemId: string, correct: boolean, soft = false) {
    ideas.current.add(itemId);
    update((s) => LE.grade(s.logos, itemId, correct, LE.dayKey(), { soft }));
  }

  function next() {
    if (i + 1 < p.steps.length) { setI(i + 1); return; }
    const seconds = Math.round((Date.now() - start.current) / 1000);
    const o = finishRun({ mode: p.mode, nodeId: p.nodeId, unitId: p.unitId, scored: exam.current.asked, right: exam.current.firstTry, misses: 0, maxCombo: 0, seconds, origins: 0 });
    setSecs(seconds);
    setSeen([...ideas.current]);
    setOutcome(o);
    setPhase(o.firstToday ? "streak" : "results");
  }

  if (!p.steps.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 16 }}>
        <Flux mood="sleepy" size={120} />
        <T w="black" size={20} style={{ textAlign: "center" }}>Nothing to refresh yet</T>
        <T w="bold" color={c.muted} style={{ textAlign: "center" }}>Finish an episode first. Its ideas come back here at growing gaps.</T>
        <Btn label="Back" onPress={() => router.back()} />
      </View>
    );
  }

  if (phase === "streak" && outcome) return <StreakCelebration o={outcome} onNext={() => setPhase("results")} />;
  if (phase === "results" && outcome) return <LogosResults p={p} o={outcome} ideas={seen} seconds={secs} onDone={() => { router.back(); maybeAskReview(); }} />;

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopBar onQuit={quit} progress={i / p.steps.length} combo={0} />
      <View key={i} style={{ flex: 1 }}>
        {step.type === "recap" && <RecapStep q={step} welcome={p.welcome && i === 0} onNext={next} />}
        {step.type === "card" && <CardStep q={step} onNext={next} />}
        {step.type === "mcq" && <McqStep q={step} onGrade={(id, first) => { if (id) grade(id, first); if (step.exam) { exam.current.asked += 1; if (first) exam.current.firstTry += 1; } }} onNext={next} />}
        {step.type === "match" && <MatchStep q={step} onNext={next} />}
        {step.type === "recall" && <RecallStep q={step} onGrade={(id, got) => grade(id, got, true)} onDone={next} />}
      </View>
    </View>
  );
}

function LogosResults({ p, o, ideas, seconds, onDone }: { p: Plan; o: Outcome; ideas: string[]; seconds: number; onDone: () => void }) {
  const c = useTheme();
  const plum = usePlum();
  const insets = useSafeAreaInsets();
  const s = getState();
  const t = LE.dayKey();
  useEffect(() => { sfx.done(); }, []);
  const exam = p.mode === "logos-exam" && p.nodeId ? s.logos.exams?.[p.nodeId] : undefined;
  const lesson: LIndexedLesson | null = p.mode === "logos" && p.nodeId ? (LIX.lessonOf(p.nodeId) ?? null) : null;
  const back = LE.nextDue(s.logos, ideas);
  const nextLesson = nextEpisode(s.logos);
  const lastEpisode = Math.max(0, ...LIX.lessons.map((l) => l.episode));
  const title = lesson ? `Episode ${lesson.episode}, remembered.` : exam ? (exam.last === exam.total ? "Every one on the first try." : `${exam.last} of ${exam.total} on the first try.`) : ["Still in there.", "Refreshed.", "Good as new."][seconds % 3];
  const summary = ideas.length
    ? `${plural(ideas.length, "idea", "ideas")} ${lesson ? "learned" : "refreshed"}.${back ? ` ${ideas.length === 1 ? "It comes" : "They come"} back ${LE.inDays(t, back)}, then at longer and longer gaps.` : ""}`
    : "";
  const badges = o.courseBadges ?? [];
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 24, paddingHorizontal: 16, gap: 16, alignItems: "center", paddingBottom: 24 }}>
        <Animated.View entering={ZoomIn.springify()}><Flux mood="cheer" size={150} /></Animated.View>
        <T w="black" size={28} style={{ textAlign: "center" }}>{title}</T>
        <Animated.View entering={FadeInUp.delay(150)} style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Chip text={`+${o.xp} XP`} fg={c.xpText} bg={c.goldSoft} />
          <Chip text={plural(o.streak, "day", "days") + " in a row"} fg={c.flame} bg={c.surface2} />
          <Chip text={`+${o.drachmas} drachmas`} fg={c.xpText} bg={c.goldSoft} />
        </Animated.View>
        {!!exam && <T w="heavy" size={15} style={{ textAlign: "center" }}>{`Your best for this era: ${exam.best} of ${exam.total}. Every question got its answer, and you can sit it again any time.`}</T>}
        {!!summary && !exam && <T w="heavy" size={15} style={{ textAlign: "center" }}>{summary}</T>}
        {!!lesson?.fieldwork && (
          <Card style={{ alignSelf: "stretch", backgroundColor: plum.soft, borderColor: plum.brand }}>
            <T w="black" size={14} color={plum.brand}>Something to sit with</T>
            <T w="semibold" size={16} selectable>{lesson.fieldwork}</T>
            <T w="bold" size={12} color={c.muted}>No answer needed.</T>
          </Card>
        )}
        {[...badges, ...o.badges].map((b) => (
          <View key={b.id} style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 14, borderWidth: 2, borderColor: c.gold, backgroundColor: c.goldSoft, alignSelf: "stretch" }}>
            <Icon name="rosette" size={30} color={c.gold} />
            <View style={{ flex: 1 }}><T w="black">New badge: {b.name}</T><T w="bold" size={13} color={c.muted}>{b.desc}</T></View>
          </View>
        ))}
        <Card style={{ alignSelf: "stretch" }}>
          {nextLesson ? (
            <>
              <T w="black" size={16}>Up next: Episode {nextLesson.episode}, {nextLesson.title}</T>
              <T w="bold" size={13} color={c.muted}>Start it whenever you have listened.</T>
            </>
          ) : (
            <>
              <T w="black" size={16}>Episode {lastEpisode + 1} comes next</T>
              <T w="bold" size={13} color={c.muted}>Listen first, then come back. Its lesson is added here afterwards.</T>
              <View style={{ flexDirection: "row" }}><LinkChip label="Find it on the show's site" url={SHOW_URL} /></View>
            </>
          )}
        </Card>
        {lesson && (
          <View style={{ alignSelf: "stretch", gap: 8 }}>
            <T w="bold" size={13} color={c.muted}>Hear it again:</T>
            <EpisodeLinks lesson={lesson} />
          </View>
        )}
        <Unofficial center />
      </ScrollView>
      <View style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 12, gap: 10 }}>
        {nextLesson ? (
          <>
            <Btn label={`Start Episode ${nextLesson.episode}`} tone="gold" onPress={() => router.replace({ pathname: "/logos", params: { node: nextLesson.id } })} />
            <Btn label="Done" tone="ghost" onPress={onDone} />
          </>
        ) : <Btn label="Done" tone="gold" onPress={onDone} />}
      </View>
      {(!!lesson || badges.length > 0) && <Confetti />}
    </View>
  );
}

function Chip({ text, fg, bg }: { text: string; fg: string; bg: string }) {
  return <View style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: bg }}><T w="black" color={fg}>{text}</T></View>;
}
