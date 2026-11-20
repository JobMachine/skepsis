// Komorebi's step views: the teaching card and the four question types its engine builds
// (choice, sentence tiles, typed romaji, scenario). Each reports onAnswer(ok, detail?);
// the runner owns scoring and feedback. Japanese is read aloud by the phone's own voice (expo-speech).
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Btn, Card, Eyebrow, Icon, T } from "@/components/ui";
import { haptic } from "@/lib/feedback";
import { speakJapanese } from "@/lib/japanese-voice";
import { KE, KIX, type KChoiceQ, type KItem, type KPhrase, type KRomajiQ, type KScenarioQ, type KTilesQ } from "@/komorebi";
import { Label, Option } from "@/screens/lesson/questions";
import { font, useTheme } from "@/theme";

const JA_FONT = "Hiragino Sans";

export function speak(text: string) {
  speakJapanese(text).catch(() => {});
}

export function SpeakBtn({ text }: { text: string }) {
  const c = useTheme();
  return (
    <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="Listen" onPress={() => { haptic.tap(); speak(text); }}
      style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: c.brandSoft, opacity: pressed ? 0.7 : 1 })}>
      <Icon name="speaker.wave.2.fill" size={18} color={c.brand} />
    </Pressable>
  );
}

/** Japanese, with its kana reading (when different) and romaji underneath. */
export function Ja({ p, size = 34, meaning = true }: { p: Partial<KPhrase> & { ja: string }; size?: number; meaning?: boolean }) {
  const c = useTheme();
  return (
    <View style={{ gap: 2 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <T selectable style={{ fontFamily: JA_FONT, fontWeight: "700", fontSize: size, lineHeight: Math.round(size * 1.3), flexShrink: 1 }}>{p.ja}</T>
        <SpeakBtn text={p.ja} />
      </View>
      {!!p.kana && p.kana !== p.ja && <T selectable size={15} color={c.muted} style={{ fontFamily: JA_FONT }}>{p.kana}</T>}
      {!!p.romaji && <T w="heavy" size={16} color={c.brand}>{p.romaji}</T>}
      {meaning && !!p.meaning && <T w="bold" size={16}>{p.meaning}</T>}
    </View>
  );
}

const KIND_LABEL: Record<string, string> = { word: "New phrase", character: "New character", sentence: "Sentence", grammar: "Grammar", culture: "Culture" };

export function Teach({ itemId }: { itemId: string }) {
  const c = useTheme();
  const it = KIX.items.get(itemId) as KItem | undefined;
  if (!it) return null;
  return (
    <View style={{ gap: 16 }}>
      <Eyebrow color={c.brand}>{KIND_LABEL[it.kind] ?? "Learn"}</Eyebrow>
      {(it.kind === "word" || it.kind === "character") && (
        <Card style={{ gap: 12 }}>
          <Ja p={it} size={38} />
          <T w="semibold" size={15}>{it.say}</T>
          {!!it.note && <T w="semibold" size={14} color={c.muted}>{it.note}</T>}
          {it.example && <View style={{ borderTopWidth: 1, borderTopColor: c.line, paddingTop: 10 }}><Ja p={it.example} size={20} /></View>}
        </Card>
      )}
      {it.kind === "sentence" && (
        <Card style={{ gap: 12 }}>
          <Ja p={it} size={26} />
          <T w="semibold" size={15}>{it.say}</T>
        </Card>
      )}
      {it.kind === "grammar" && (
        <Card style={{ gap: 12 }}>
          <T w="black" size={21}>{it.title}</T>
          <T w="semibold" size={16}>{it.explanation}</T>
          {it.examples.map((e, i) => <View key={i} style={{ borderTopWidth: 1, borderTopColor: c.line, paddingTop: 10 }}><Ja p={e} size={20} /></View>)}
        </Card>
      )}
      {it.kind === "culture" && (
        <Card style={{ gap: 12 }}>
          <Eyebrow>{it.place}</Eyebrow>
          <T w="black" size={21}>{it.title}</T>
          <T w="semibold" size={16}>{it.body}</T>
          {it.phrase && <Ja p={it.phrase} size={20} />}
        </Card>
      )}
    </View>
  );
}

type St = "idle" | "right" | "wrong" | "dim";

export function Choice({ q, onAnswer }: { q: KChoiceQ; onAnswer: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const st = (i: number): St => (picked === null ? "idle" : q.options[i] === q.answer ? "right" : i === picked ? "wrong" : "dim");
  return (
    <View style={{ gap: 18 }}>
      <Label text={q.label} guess={q.guess} />
      {!!q.title && <T w="heavy" size={15}>{q.title}</T>}
      <T w="heavy" size={21}>{q.prompt}</T>
      {!!q.ja && <Ja p={{ ja: q.ja, kana: q.kana, romaji: q.romaji }} meaning={false} />}
      <View style={{ gap: 10 }}>
        {q.options.map((o, i) => (
          <Option key={o} label={o} k={i + 1} state={st(i)} onPress={() => { setPicked(i); onAnswer(o === q.answer); }} />
        ))}
      </View>
    </View>
  );
}

export function Scenario({ q, onAnswer }: { q: KScenarioQ; onAnswer: (ok: boolean, why: string) => void }) {
  const c = useTheme();
  const [picked, setPicked] = useState<number | null>(null);
  const st = (i: number): St => (picked === null ? "idle" : i === q.answer ? "right" : i === picked ? "wrong" : "dim");
  return (
    <View style={{ gap: 16 }}>
      <Label text={q.label} />
      <T w="black" size={19}>{q.title}</T>
      <Card style={{ backgroundColor: c.surface2 }}><T w="semibold" size={16}>{q.scene}</T></Card>
      <T w="heavy" size={19}>{q.prompt}</T>
      <View style={{ gap: 10 }}>
        {q.options.map((o, i) => (
          <Option key={i} label={o.text} k={i + 1} state={st(i)} onPress={() => { setPicked(i); onAnswer(i === q.answer, o.why); }} />
        ))}
      </View>
    </View>
  );
}

export function Tiles({ q, onAnswer }: { q: KTilesQ; onAnswer: (ok: boolean) => void }) {
  const c = useTheme();
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const byKey = new Map(q.tiles.map((t) => [t.key, t]));
  const plain = (x: string) => x.replace(/[\p{P}\p{Z}\s]/gu, "");
  const check = () => {
    setChecked(true);
    const built = chosen.map((k) => byKey.get(k)!.ja).join("");
    onAnswer(plain(built) === plain(q.answer.join("")));
  };
  const tile = (k: number, onPress: () => void, used = false) => {
    const t = byKey.get(k)!;
    return (
      <Pressable key={k} disabled={checked || used} onPress={() => { haptic.tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={t.romaji}
        style={({ pressed }) => ({
          paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderCurve: "continuous", borderWidth: 2, borderColor: c.line,
          backgroundColor: used ? c.surface2 : c.surface, opacity: used ? 0.35 : 1, boxShadow: `0 ${pressed ? 1 : 3}px 0 ${c.line}`,
          transform: [{ translateY: pressed ? 2 : 0 }], alignItems: "center",
        })}>
        <T style={{ fontFamily: JA_FONT, fontWeight: "700", fontSize: 20 }}>{t.ja}</T>
        <T w="bold" size={11} color={c.muted}>{t.romaji}</T>
      </Pressable>
    );
  };
  return (
    <View style={{ gap: 18 }}>
      <Label text={q.label} />
      <T w="heavy" size={21}>Build: “{q.prompt}”</T>
      <View style={{ minHeight: 70, flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 10, borderRadius: 14, borderWidth: 2, borderStyle: "dashed", borderColor: c.line }}>
        {chosen.map((k) => tile(k, () => setChosen(chosen.filter((x) => x !== k))))}
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {q.tiles.map((t) => tile(t.key, () => setChosen([...chosen, t.key]), chosen.includes(t.key)))}
      </View>
      {!checked && <Btn label="Check" disabled={!chosen.length} onPress={check} />}
    </View>
  );
}

export function Romaji({ q, onAnswer }: { q: KRomajiQ; onAnswer: (ok: boolean) => void }) {
  const c = useTheme();
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const check = () => { if (!text.trim() || checked) return; setChecked(true); onAnswer(KE.acceptsRomaji(q.answer, text)); };
  return (
    <View style={{ gap: 18 }}>
      <Label text={q.label} />
      <T w="heavy" size={21}>{q.prompt}</T>
      <Ja p={{ ja: q.ja }} meaning={false} size={38} />
      <TextInput value={text} onChangeText={setText} editable={!checked} autoCapitalize="none" autoCorrect={false} spellCheck={false}
        placeholder="e.g. konnichiwa" placeholderTextColor={c.muted} returnKeyType="done" onSubmitEditing={check} autoFocus
        style={{ fontFamily: font.heavy, fontSize: 20, color: c.ink, padding: 14, borderRadius: 14, borderWidth: 2, borderColor: c.line, backgroundColor: c.surface }} />
      <T w="semibold" size={13} color={c.muted}>Long vowels: type ō as ou or oo, ū as uu.</T>
      {!checked && <Btn label="Check" disabled={!text.trim()} onPress={check} />}
    </View>
  );
}
