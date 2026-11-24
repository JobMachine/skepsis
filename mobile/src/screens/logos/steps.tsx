// Logos's step views: the episode recap, an idea card, the three-choice tap question, the
// "Who said what?" match and the recall deck. Every answer is a tap; nothing is timed and nothing
// can be failed. A wrong tap only switches that option off and says to have another go.
// Each view reports to the runner (which owns progress and XP) through its callbacks.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";

import { Bubble } from "@/components/texas";
import { Btn, Card, Eyebrow, Icon, T } from "@/components/ui";
import { haptic, sfx } from "@/lib/feedback";
import { LE, LIX, LSOURCES, UNOFFICIAL, type LCard, type LIndexedLesson, type LIndexedTerm, type LMatch, type LMcq, type LRecall, type LRecap } from "@/logos";
import { Option } from "@/screens/lesson/questions";
import { font, useTheme } from "@/theme";
import { Flux, usePlum } from "./flux";

const pick = <X,>(a: X[]) => a[Math.floor(Math.random() * a.length)];

export const openLink = (url: string) => { haptic.tap(); WebBrowser.openBrowserAsync(url).catch(() => {}); };

/** A tappable official link: opens in an in-app browser sheet. */
export function LinkChip({ label, url }: { label: string; url: string }) {
  const plum = usePlum();
  return (
    <Pressable onPress={() => openLink(url)} accessibilityRole="link" accessibilityLabel={label} hitSlop={6}
      style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: plum.soft, opacity: pressed ? 0.7 : 1 })}>
      <T w="heavy" size={13} color={plum.brand}>{label}</T>
      <Icon name="arrow.up.right" size={11} color={plum.brand} />
    </Pressable>
  );
}

/** Official episode page, Spotify and transcript links for an episode. */
export function EpisodeLinks({ lesson }: { lesson: LIndexedLesson }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <LinkChip label="Episode page" url={lesson.page} />
      <LinkChip label="Spotify" url={lesson.spotify} />
      <LinkChip label="Transcript" url={lesson.transcript} />
    </View>
  );
}

/** The always-visible "unofficial" line. */
export function Unofficial({ center }: { center?: boolean }) {
  const c = useTheme();
  return <T w="semibold" size={12} color={c.muted} style={center ? { textAlign: "center" } : undefined}>{UNOFFICIAL}</T>;
}

/** `text` with the first occurrence of `mark` (the term being asked about) in plum. */
export function Highlight({ text, mark, size = 21 }: { text: string; mark?: string; size?: number }) {
  const plum = usePlum();
  const i = mark ? text.toLowerCase().indexOf(mark.toLowerCase()) : -1;
  if (i < 0 || !mark) return <T w="heavy" size={size}>{text}</T>;
  return (
    <T w="heavy" size={size}>
      {text.slice(0, i)}
      <Text style={{ color: plum.brand, fontFamily: font.black }}>{text.slice(i, i + mark.length)}</Text>
      {text.slice(i + mark.length)}
    </T>
  );
}

/** Scrolling content with a bar fixed at the bottom. */
export function Frame({ children, footer, bottomPad = 150 }: { children: ReactNode; footer?: ReactNode; bottomPad?: number }) {
  const insets = useSafeAreaInsets();
  const c = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: bottomPad + insets.bottom, gap: 18 }}>{children}</ScrollView>
      {footer && (
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 16, paddingBottom: insets.bottom + 12, borderTopWidth: 2, borderTopColor: c.line, backgroundColor: c.bg, gap: 10 }}>
          {footer}
        </View>
      )}
    </View>
  );
}

/** The panel that slides up after a right answer. Always the "right" look: there is no red in Logos. */
function Feedback({ title, body, onNext }: { title: string; body?: string; onNext: () => void }) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Animated.View entering={SlideInDown.duration(220)} style={{
      position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingTop: 16, paddingBottom: insets.bottom + 12, gap: 10,
      backgroundColor: c.oliveSoft, borderTopWidth: 2, borderTopColor: c.olive,
    }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }} accessibilityLiveRegion="polite">
        <Icon name="checkmark.circle.fill" size={26} color={c.olive} />
        <T w="black" size={21} color={c.rightText} style={{ flex: 1 }}>{title}</T>
      </View>
      {!!body && <T w="semibold" size={15} selectable>{body}</T>}
      <Btn label="Continue" tone="olive" onPress={onNext} />
    </Animated.View>
  );
}

/** Ignore a second tap on Continue that lands right after the screen appears. */
function useTapGuard() {
  const shown = useRef(0);
  useEffect(() => { shown.current = Date.now(); }, []);
  return () => Date.now() - shown.current >= 350;
}

// ---------- recap ----------
export function RecapStep({ q, welcome, onNext }: { q: LRecap; welcome: boolean; onNext: () => void }) {
  const c = useTheme();
  const l = LIX.lessonOf(q.lessonId)!;
  const u = LIX.unitOf(l.unitId);
  return (
    <Frame footer={<Btn label={q.closing ? "Finish" : "Quiz me, gently"} tone="gold" onPress={onNext} />}>
      {welcome && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <Flux size={84} />
          <Bubble text="Hello, I'm Flux. Each lesson here is one podcast episode: a quick recap, then easy questions. You can't fail, and there is no sign-up." />
        </View>
      )}
      <View style={{ gap: 8 }}>
        <Eyebrow>{`Episode ${l.episode} · ${u?.title ?? ""}`}</Eyebrow>
        <T w="black" size={30} style={{ lineHeight: 36 }}>{l.title}</T>
        <T w="heavy" size={15} color={c.muted}>{q.closing ? "One more look at the whole episode" : "The episode in 30 seconds"}</T>
      </View>
      <Card style={{ gap: 12 }}>
        {l.recap.map((x, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 10 }}>
            <T w="black" size={15} color={c.muted} style={{ width: 20 }}>{i + 1}.</T>
            <T w="semibold" size={16} style={{ flex: 1 }} selectable>{x}</T>
          </View>
        ))}
      </Card>
      <EpisodeLinks lesson={l} />
      <Unofficial />
    </Frame>
  );
}

// ---------- idea card ----------
export function SourceLinks({ ids }: { ids?: string[] }) {
  const c = useTheme();
  const sources = (ids ?? []).map((id) => LSOURCES.find((s) => s.id === id)).filter((s) => !!s);
  if (!sources.length) return null;
  return (
    <View style={{ gap: 4 }}>
      <Eyebrow>Sources</Eyebrow>
      {sources.map((s) => (
        <Pressable key={s.id} onPress={() => openLink(s.url)} accessibilityRole="link" accessibilityLabel={`${s.title}, ${s.publisher}`}>
          <T w="bold" size={13} color={c.muted}>{s.title} · {s.publisher}</T>
        </Pressable>
      ))}
    </View>
  );
}

export function CardStep({ q, onNext }: { q: LCard; onNext: () => void }) {
  const c = useTheme();
  const plum = usePlum();
  const it = LIX.items.get(q.itemId) as LIndexedTerm;
  return (
    <Frame footer={<Btn label="Got it" onPress={onNext} />}>
      <Eyebrow color={plum.brand}>{LE.typeLabel(it)}</Eyebrow>
      <Card style={{ gap: 12 }}>
        <T w="black" size={32} style={{ lineHeight: 38 }} selectable>{it.term}</T>
        {!!it.literal && <T w="bold" size={14} color={c.muted}>{it.literal}</T>}
        <T w="heavy" size={18} selectable>{LE.dot(it.meaning)}</T>
        <T w="semibold" size={16} selectable>{it.say}</T>
      </Card>
      {!!it.use && (
        <View style={{ padding: 14, borderRadius: 14, borderCurve: "continuous", backgroundColor: c.goldSoft, gap: 2 }}>
          <T w="black" size={13} color={c.xpText}>Worth remembering</T>
          <T w="semibold" size={15} selectable>{it.use}</T>
        </View>
      )}
      {!!it.hook && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderRadius: 14, borderCurve: "continuous", backgroundColor: plum.soft }}>
          <Flux size={56} />
          <T w="bold" size={15} style={{ flex: 1 }} selectable>{it.hook}</T>
        </View>
      )}
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: c.surface2 }}>
          <T w="heavy" size={12} color={c.muted}>{LE.STATUS_LABELS[it.status] ?? "Idea"}</T>
        </View>
      </View>
      <SourceLinks ids={it.sourceIds} />
    </Frame>
  );
}

// ---------- three-choice tap question ----------
const RIGHT = ["Yes.", "That's it.", "Right.", "You remembered."];
const RETRIED = ["There it is.", "Now you have it."];

export function McqStep({ q, onGrade, onNext }: { q: LMcq; onGrade: (itemId: string | null, firstTry: boolean) => void; onNext: () => void }) {
  const c = useTheme();
  const it = q.itemId ? (LIX.items.get(q.itemId) as LIndexedTerm) : null;
  const hook = it ? it.hook : q.hint;
  const [off, setOff] = useState<number[]>([]);
  const [solved, setSolved] = useState<number | null>(null);
  const [fb, setFb] = useState<{ title: string; body: string } | null>(null);
  const ok = useTapGuard();
  const state = (i: number) => (solved !== null ? (i === solved ? "right" : "dim") : off.includes(i) ? "dim" : "idle") as "right" | "dim" | "idle";
  function tap(i: number) {
    if (solved !== null || off.includes(i)) return;
    if (q.options[i] !== q.answer) {
      setOff([...off, i]);
      sfx.tick();
      return;
    }
    const first = off.length === 0;
    setSolved(i);
    sfx.right();
    onGrade(q.itemId, first);
    setFb({ title: pick(first ? RIGHT : RETRIED), body: it ? LE.feedbackText(it, first) : q.explain ?? "" });
  }
  return (
    <>
      <Frame bottomPad={fb ? 280 : 60}>
        <Eyebrow>{q.label}</Eyebrow>
        <Highlight text={q.prompt} mark={q.mark} />
        {!!q.quote && (
          <View style={{ borderLeftWidth: 4, borderLeftColor: c.line, paddingLeft: 12 }}>
            <T w="semibold" size={17} color={c.muted} selectable>{LE.dot(q.quote)}</T>
          </View>
        )}
        <View style={{ gap: 10 }}>
          {q.options.map((o, i) => <Option key={o} label={o} k={i + 1} state={state(i)} onPress={() => tap(i)} />)}
        </View>
        {off.length > 0 && solved === null && (
          <Animated.View entering={FadeIn.duration(180)} accessibilityLiveRegion="polite">
            <T w="bold" size={15} color={c.muted}>Not that one. Have another go.{off.length === 1 && hook ? ` Hint: ${hook}` : ""}</T>
          </Animated.View>
        )}
      </Frame>
      {fb && <Feedback title={fb.title} body={fb.body} onNext={() => { if (ok()) onNext(); }} />}
    </>
  );
}

// ---------- "Who said what?" match ----------
export function MatchStep({ q, onNext }: { q: LMatch; onNext: () => void }) {
  const c = useTheme();
  const plum = usePlum();
  const it = LIX.items.get(q.itemId)!;
  const [selL, setSelL] = useState<number | null>(null);
  const [selR, setSelR] = useState<number | null>(null);
  const [doneL, setDoneL] = useState<number[]>([]);
  const [doneR, setDoneR] = useState<number[]>([]);
  const [nope, setNope] = useState<{ l: number; r: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ok = useTapGuard();
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const complete = doneL.length === q.pairs.length;

  function tryPair(l: number, r: number) {
    setSelL(null); setSelR(null);
    if (q.pairs.some(([a, b]) => a === q.left[l] && b === q.right[r])) {
      sfx.right();
      setDoneL([...doneL, l]); setDoneR([...doneR, r]);
    } else {
      sfx.tick();
      setNope({ l, r });
      timer.current = setTimeout(() => setNope(null), 450);
    }
  }
  const tapL = (i: number) => { if (doneL.includes(i)) return; setSelL(i); if (selR !== null) tryPair(i, selR); };
  const tapR = (i: number) => { if (doneR.includes(i)) return; setSelR(i); if (selL !== null) tryPair(selL, i); };

  const cell = (text: string, side: "l" | "r", i: number) => {
    const done = (side === "l" ? doneL : doneR).includes(i);
    const sel = (side === "l" ? selL : selR) === i;
    const off = nope && nope[side] === i;
    const border = done ? c.olive : sel ? plum.brand : off ? c.gold : c.line;
    return (
      <Pressable key={`${side}${i}`} disabled={done} onPress={() => { haptic.tap(); (side === "l" ? tapL : tapR)(i); }} accessibilityRole="button" accessibilityLabel={text}
        accessibilityState={{ selected: sel, disabled: done }}
        style={({ pressed }) => ({
          minHeight: 64, justifyContent: "center", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, borderCurve: "continuous", borderWidth: 2, borderColor: border,
          backgroundColor: done ? c.oliveSoft : sel ? plum.soft : c.surface, opacity: done ? 0.75 : 1, boxShadow: `0 ${pressed ? 1 : 3}px 0 ${border}`, transform: [{ translateY: pressed ? 2 : 0 }],
        })}>
        <T w={side === "l" ? "black" : "bold"} size={side === "l" ? 16 : 14}>{text}</T>
      </Pressable>
    );
  };
  return (
    <>
      <Frame bottomPad={complete ? 280 : 60}>
        <Eyebrow>{q.label}</Eyebrow>
        <T w="heavy" size={18}>{q.prompt}</T>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1, gap: 10 }}>{q.left.map((t, i) => cell(t, "l", i))}</View>
          <View style={{ flex: 1, gap: 10 }}>{q.right.map((t, i) => cell(t, "r", i))}</View>
        </View>
      </Frame>
      {complete && <Feedback title="All matched." body={it.say} onNext={() => { if (ok()) onNext(); }} />}
    </>
  );
}

// ---------- recall deck: remember first, then peek, then mark it yourself ----------
export function RecallStep({ q, onGrade, onDone }: { q: LRecall; onGrade: (itemId: string, gotIt: boolean) => void; onDone: () => void }) {
  const c = useTheme();
  const plum = usePlum();
  const [deck, setDeck] = useState(() => q.cards.map((card) => ({ ...card, repeat: false })));
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const [hinted, setHinted] = useState(false);
  const peekedAt = useRef(0);
  const card = deck[i];

  function leave(gotIt: boolean) {
    if (Date.now() - peekedAt.current < 350) return; // a double tap on Peek must not mark the card
    if (!card.repeat) onGrade(card.itemId, gotIt);
    // "Show me again" brings the card back once at the end of the deck. Either button moves on.
    const again = !gotIt && !card.repeat;
    const len = deck.length + (again ? 1 : 0);
    if (again) setDeck([...deck, { ...card, repeat: true }]);
    if (i + 1 >= len) { onDone(); return; }
    setI(i + 1); setOpen(false); setHinted(false);
  }
  const peek = () => { sfx.tick(); peekedAt.current = Date.now(); setOpen(true); };

  const footer = open ? (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View style={{ flex: 1 }}><Btn label="Show me again" tone="ghost" onPress={() => leave(false)} /></View>
      <View style={{ flex: 1 }}><Btn label="Got it" tone="olive" onPress={() => leave(true)} /></View>
    </View>
  ) : (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {!!card.hint && !hinted && <View style={{ flex: 1 }}><Btn label="Hint" tone="ghost" onPress={() => setHinted(true)} /></View>}
      <View style={{ flex: 1 }}><Btn label="Peek" tone="gold" onPress={peek} /></View>
    </View>
  );
  return (
    <Frame footer={footer}>
      <Eyebrow>{`${card.label} · Episode ${card.episode}`}</Eyebrow>
      <Highlight text={card.ask} mark={card.mark} />
      <Card style={{ gap: 10, minHeight: 150, justifyContent: "center", borderColor: open ? c.olive : c.line, borderWidth: 2, backgroundColor: open ? c.oliveSoft : c.surface }}>
        {open ? (
          <>
            <T w="heavy" size={19} selectable>{LE.dot(card.back)}</T>
            {!!card.more && <T w="semibold" size={15} color={c.muted} selectable>{card.more}</T>}
          </>
        ) : (
          <>
            <T w="heavy" size={17} color={plum.brand}>Say the answer in your head first.</T>
            {hinted && <T w="bold" size={15}><T w="black" size={15}>Hint: </T>{card.hint}</T>}
          </>
        )}
      </Card>
      <T w="semibold" size={12} color={c.muted}>{`Card ${Math.min(i + 1, deck.length)} of ${deck.length}`}</T>
    </Frame>
  );
}
