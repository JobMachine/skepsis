// One view per question type. Each reports the learner's answer through onAnswer(ok);
// the runner owns scoring, feedback and what comes next. `reveal` shows the right answer
// even when nothing was picked (Rodeo timeouts).
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { IX, type BuildQ, type IndexedItem, type MatchQ, type McqQ, type TfQ } from "@/course";
import { Texas } from "@/components/texas";
import { Btn, Eyebrow, Rich, T } from "@/components/ui";
import { sfx, haptic } from "@/lib/feedback";
import { font, useTheme } from "@/theme";

const shake = {
  animationName: { "0%": { transform: [{ translateX: 0 }] }, "25%": { transform: [{ translateX: -6 }] }, "75%": { transform: [{ translateX: 6 }] }, "100%": { transform: [{ translateX: 0 }] } },
  animationDuration: "300ms",
} as const;

export function Label({ text, guess }: { text: string; guess?: boolean }) {
  const c = useTheme();
  return <Eyebrow color={guess ? c.xpText : c.brand}>{text}{guess ? " · no penalty" : ""}</Eyebrow>;
}

/** Highlight a root inside a word (first match), like the website's hl(). */
export function HlWord({ word, root, size = 40 }: { word: string; root?: string; size?: number }) {
  const c = useTheme();
  const r = String(root || "").split(/[\s/]+/)[0].replace(/^-/, "").replace(/-$/, "");
  const i = r ? word.toLowerCase().indexOf(r.toLowerCase().slice(0, Math.max(3, r.length - 1))) : -1;
  const base = { fontFamily: font.black, fontSize: size, color: c.ink, lineHeight: size * 1.15 };
  if (i < 0) return <Text style={base} selectable>{word}</Text>;
  const len = Math.min(r.length, word.length - i);
  return (
    <Text style={base} selectable>
      {word.slice(0, i)}
      <Text style={{ color: c.brand, textDecorationLine: "underline", textDecorationColor: c.gold }}>{word.slice(i, i + len)}</Text>
      {word.slice(i + len)}
    </Text>
  );
}

type OptState = "idle" | "right" | "wrong" | "dim";
function Option({ label, k, state, onPress, big }: { label: string; k?: number; state: OptState; onPress: () => void; big?: boolean }) {
  const c = useTheme();
  const border = state === "right" ? c.olive : state === "wrong" ? c.clay : c.line;
  const bg = state === "right" ? c.oliveSoft : state === "wrong" ? c.claySoft : c.surface;
  return (
    <Animated.View style={state === "wrong" ? shake : undefined}>
      <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={state !== "idle"} onPress={onPress}
        style={({ pressed }) => ({
          flexDirection: "row", alignItems: "center", justifyContent: big ? "center" : "flex-start", gap: 12,
          paddingHorizontal: 16, paddingVertical: 14, minHeight: big ? 76 : 56, borderRadius: 14, borderCurve: "continuous",
          borderWidth: 2, borderColor: border, backgroundColor: bg, opacity: state === "dim" ? 0.5 : 1,
          boxShadow: `0 ${pressed ? 1 : 3}px 0 ${border}`, transform: [{ translateY: pressed ? 2 : 0 }],
        })}>
        {k != null && !big && (
          <View style={{ width: 26, height: 26, borderRadius: 8, borderWidth: 2, borderColor: c.line, alignItems: "center", justifyContent: "center" }}>
            <T w="heavy" size={13} color={c.muted} style={{ lineHeight: 16 }}>{k}</T>
          </View>
        )}
        <T w="heavy" size={big ? 19 : 17} style={{ flexShrink: 1 }}>{label}</T>
      </Pressable>
    </Animated.View>
  );
}

type Props<Q> = { q: Q; onAnswer: (ok: boolean) => void; reveal: boolean };

export function Mcq({ q, onAnswer, reveal }: Props<McqQ>) {
  const c = useTheme();
  const [picked, setPicked] = useState<number | null>(null);
  const it = q.itemId ? IX.items.get(q.itemId) : null;
  const done = picked !== null || reveal;
  const st = (i: number): OptState => (!done ? "idle" : q.options[i] === q.answer ? "right" : i === picked ? "wrong" : "dim");
  return (
    <View style={{ gap: 18 }}>
      <Label text={q.label} guess={q.guess} />
      <Rich html={q.prompt} size={21} />
      {q.word ? <HlWord word={q.word} root={q.guess ? undefined : it && it.kind === "root" ? it.root : undefined} /> : q.greek ? <T w="greek" size={26} color={c.muted}>{q.greek}</T> : null}
      <View style={{ gap: 10 }}>
        {q.options.map((o, i) => (
          <Option key={o} label={o} k={i + 1} state={st(i)} onPress={() => { setPicked(i); onAnswer(o === q.answer); }} />
        ))}
      </View>
    </View>
  );
}

export function Tf({ q, onAnswer, reveal }: Props<TfQ>) {
  const [picked, setPicked] = useState<boolean | null>(null);
  const done = picked !== null || reveal;
  const st = (v: boolean): OptState => (!done ? "idle" : v === q.answer ? "right" : v === picked ? "wrong" : "dim");
  return (
    <View style={{ gap: 18 }}>
      <Label text={q.label} />
      <T w="heavy" size={21}>Is this word from Greek?</T>
      <T w="black" size={44} style={{ lineHeight: 50 }} selectable>{q.word}</T>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {[true, false].map((v) => (
          <View key={String(v)} style={{ flex: 1 }}>
            <Option big label={v ? "Greek" : "Not Greek"} state={st(v)} onPress={() => { setPicked(v); onAnswer(v === q.answer); }} />
          </View>
        ))}
      </View>
    </View>
  );
}

function Chip({ label, onPress, placed, hidden }: { label: string; onPress: () => void; placed?: boolean; hidden?: boolean }) {
  const c = useTheme();
  return (
    <Pressable onPress={onPress} disabled={hidden} accessibilityLabel={label}
      style={({ pressed }) => ({
        paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderCurve: "continuous", borderWidth: 2,
        borderColor: placed ? c.brand : c.line, backgroundColor: c.surface, opacity: hidden ? 0 : 1,
        boxShadow: `0 ${pressed ? 1 : 3}px 0 ${placed ? c.brand : c.line}`, transform: [{ translateY: pressed ? 2 : 0 }],
      })}>
      <T w="heavy" size={18} color={placed ? c.brand : c.ink}>{label}</T>
    </Pressable>
  );
}

export function Build({ q, onAnswer }: Props<BuildQ>) {
  const c = useTheme();
  const [placed, setPlaced] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ gap: 18 }}>
      <Label text={q.label} />
      <Rich html={q.prompt} size={21} />
      <View style={{ minHeight: 68, flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center", padding: 10, borderTopWidth: 2, borderBottomWidth: 2, borderColor: c.line }}>
        {placed.length === 0 && <T w="bold" color={c.muted}>Tap the pieces in order</T>}
        {placed.map((ti, k) => (
          <Chip key={`${ti}-${k}`} placed label={q.tiles[ti]} onPress={() => { if (checked) return; haptic.tap(); setPlaced(placed.filter((_, j) => j !== k)); }} />
        ))}
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        {q.tiles.map((t, i) => (
          <Chip key={i} label={t} hidden={placed.includes(i)} onPress={() => { if (checked) return; sfx.tick(); setPlaced([...placed, i]); }} />
        ))}
      </View>
      {!checked && (
        <Btn label="Check" disabled={!placed.length} onPress={() => {
          setChecked(true);
          const got = placed.map((i) => q.tiles[i]);
          onAnswer(got.length === q.answer.length && got.every((t, i) => t === q.answer[i]));
        }} />
      )}
    </View>
  );
}

export function Match({ q, onAnswer }: Props<MatchQ>) {
  const c = useTheme();
  const [selL, setSelL] = useState<string | null>(null);
  const [selR, setSelR] = useState<string | null>(null);
  const [ok, setOk] = useState<string[]>([]);
  const [bad, setBad] = useState<string[]>([]);
  const [missed, setMissed] = useState(false);

  function tryPair(l: string | null, r: string | null) {
    if (l == null || r == null) return;
    const good = q.pairs.some(([a, b]) => a === l && b === r);
    if (good) {
      sfx.right();
      const next = [...ok, l, r];
      setOk(next);
      if (next.length === q.pairs.length * 2) onAnswer(!missed);
    } else {
      sfx.wrong();
      setMissed(true);
      setBad([l, r]);
      setTimeout(() => setBad([]), 350);
    }
    setSelL(null); setSelR(null);
  }
  const cell = (key: string, label: string, side: "l" | "r") => {
    const sel = side === "l" ? selL === key : selR === key;
    const isOk = ok.includes(key), isBad = bad.includes(key);
    const border = isOk ? c.olive : isBad ? c.clay : sel ? c.brand : c.line;
    const bg = isOk ? c.oliveSoft : isBad ? c.claySoft : sel ? c.brandSoft : c.surface;
    return (
      <Animated.View key={key} style={isBad ? shake : undefined}>
        <Pressable disabled={isOk} accessibilityLabel={label} onPress={() => {
          haptic.tap();
          if (side === "l") { setSelL(key); tryPair(key, selR); } else { setSelR(key); tryPair(selL, key); }
        }} style={{ minHeight: 64, padding: 10, borderRadius: 14, borderCurve: "continuous", borderWidth: 2, borderColor: border, backgroundColor: bg, justifyContent: "center", opacity: isOk ? 0.45 : 1, boxShadow: isOk ? "none" : `0 3px 0 ${border}` }}>
          <T w={side === "l" ? "black" : "bold"} size={side === "l" ? 18 : 14} style={{ textAlign: "center", lineHeight: side === "l" ? 22 : 18 }}>{label}</T>
        </Pressable>
      </Animated.View>
    );
  };
  return (
    <View style={{ gap: 18 }}>
      <Label text={q.label} />
      <T w="heavy" size={21}>Tap a word, then its meaning</T>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 0.8, gap: 10 }}>{q.left.map((l) => cell(l, l, "l"))}</View>
        <View style={{ flex: 1.2, gap: 10 }}>{q.right.map((r) => cell(r, r, "r"))}</View>
      </View>
    </View>
  );
}

function Family({ it }: { it: Extract<IndexedItem, { kind: "root" }> }) {
  const c = useTheme();
  return (
    <View style={{ gap: 8 }}>
      {it.ex.slice(0, 2).map(([w, d]) => (
        <View key={w} style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", columnGap: 10, padding: 12, borderRadius: 12, borderWidth: 2, borderStyle: "dashed", borderColor: c.line }}>
          <HlWord word={w} root={it.root} size={18} />
          <T w="bold" color={c.muted}>{d}</T>
        </View>
      ))}
    </View>
  );
}

export function Intro({ itemId }: { itemId: string }) {
  const c = useTheme();
  const it = IX.items.get(itemId)!;
  if (it.kind === "root") {
    return (
      <View style={{ gap: 14 }}>
        <Label text="New word part" />
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", columnGap: 14 }}>
          <T w="black" size={44} style={{ lineHeight: 50 }}>{it.root}</T>
          <T w="greek" size={30} color={c.brand}>{it.gr}</T>
        </View>
        <T w="black" size={22}>means <Text style={{ backgroundColor: c.goldSoft }}> {it.m} </Text></T>
        <Texas text={it.hook} />
        <Family it={it} />
      </View>
    );
  }
  if (it.kind === "idea") {
    return (
      <View style={{ gap: 14 }}>
        <Label text="New idea" />
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", columnGap: 14 }}>
          <T w="black" size={40} style={{ lineHeight: 46 }}>{it.term}</T>
          <T w="greek" size={28} color={c.brand}>{it.gr}</T>
        </View>
        <T w="black" size={20}><Text style={{ backgroundColor: c.goldSoft }}> {it.m} </Text></T>
        <T w="heavy" color={c.muted}>Literally: &ldquo;{it.lit}&rdquo;</T>
        <T w="semibold" size={17} style={{ lineHeight: 26 }}>{it.story}</T>
        <Texas text={it.tex} />
      </View>
    );
  }
  return null;
}

export function OriginIntro() {
  return (
    <View style={{ gap: 14 }}>
      <Label text="Is it Greek?" />
      <T w="black" size={28}>Not every fancy word is Greek</T>
      <T w="semibold" size={17} style={{ lineHeight: 26 }}>Texas English is a stew: Spanish from the ranches, Nahuatl from Mexico, Caddo from the first Texans, Dutch from old New York. Your job: call each word Greek or not.</T>
      <Texas text={'Spotting fakes keeps you from over-using roots. "Rodeo" has nothing to do with "rhodo-" (rose).'} />
    </View>
  );
}
