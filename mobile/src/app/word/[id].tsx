import { ScrollView, Share, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { E, IX } from "@/course";
import { Texas } from "@/components/texas";
import { Btn, Card, Eyebrow, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { useApp } from "@/lib/store";
import { shareText } from "@/screens/learn";
import { HlWord } from "@/screens/lesson/questions";
import { useTheme } from "@/theme";

/** One word or idea, everything we know about it, and a Share button. */
export default function WordSheet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const s = useApp();
  const c = useTheme();
  const it = IX.items.get(id);
  if (!it) return <T style={{ padding: 24 }}>Word not found.</T>;
  const prog = s.items[it.id];
  const unit = IX.course.units.find((u) => u.id === it.unitId);
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 14, paddingTop: 28, paddingBottom: 40 }}>
      <Eyebrow>{it.kind === "root" ? "Greek root" : it.kind === "idea" ? "Greek idea" : "Is it Greek?"} · {unit?.title}</Eyebrow>
      <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", columnGap: 12 }}>
        <T w="black" size={40} style={{ lineHeight: 46 }} selectable>{E.labelOf(it)}</T>
        {"gr" in it && <T w="greek" size={28} color={c.brand} selectable>{it.gr}</T>}
      </View>
      {"tr" in it && it.tr && <T w="bold" color={c.muted}>Pronounced like: {it.tr}</T>}
      <T w="black" size={20} color={it.kind === "origin" ? (it.greek ? c.olive : c.clay) : c.ink}>
        {it.kind === "origin" ? (it.greek ? "Greek" : "Not Greek") : it.m}
      </T>
      {it.kind === "idea" && <T w="heavy" color={c.muted}>Literally: &ldquo;{it.lit}&rdquo;</T>}
      <Card><Eyebrow>Teach it in one breath</Eyebrow><T w="semibold" size={17} selectable>{it.say}</T></Card>
      {it.kind === "root" && (
        <>
          <Texas text={it.hook} />
          <Eyebrow>Word family</Eyebrow>
          {it.ex.map(([w, d, parts]) => (
            <Card key={w} style={{ gap: 2 }}>
              <HlWord word={w} root={it.root} size={20} />
              <T w="semibold" color={c.muted}>{d}</T>
              <T w="heavy" size={13} color={c.brand}>{parts.join(" + ")}</T>
            </Card>
          ))}
        </>
      )}
      {it.kind === "idea" && (
        <>
          <T w="semibold" size={16} style={{ lineHeight: 24 }} selectable>{it.story}</T>
          <Texas text={it.tex} />
          <View style={{ padding: 12, borderRadius: 14, borderWidth: 2, borderColor: c.olive, backgroundColor: c.oliveSoft }}>
            <T w="semibold"><T w="black" color={c.rightText}>At work: </T>{it.work}</T>
          </View>
        </>
      )}
      {it.kind === "origin" && <T w="semibold" size={16} selectable>{it.from}</T>}
      {prog && (
        <Card style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <T w="heavy" color={c.muted}>Right {prog.right} · Missed {prog.wrong}</T>
          <T w="heavy" color={c.muted}>Next review {prog.due <= E.dayKey() ? "today" : prog.due}</T>
        </Card>
      )}
      <Btn label="Share" icon="square.and.arrow.up" tone="ghost" onPress={() => { track("word_shared", { item_id: it.id, where: "word" }); Share.share({ message: shareText(it) }); }} />
    </ScrollView>
  );
}
