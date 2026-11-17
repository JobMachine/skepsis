// The Learn tab when the Komorebi (Japanese) course is picked: continue, review, and the chapters.
// All chapters are open from the start, like the website. "Lessons" (practice from live tutor
// classes) is shown first.
import { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import { Btn, Card, Eyebrow, Icon, T } from "@/components/ui";
import { haptic } from "@/lib/feedback";
import { useApp } from "@/lib/store";
import { KE, KIX, lessonStatus, nextLesson, type KUnit } from "@/komorebi";
import { useTheme } from "@/theme";

const startLesson = (id: string) => router.push({ pathname: "/komorebi", params: { lesson: id } });
const LESSONS_UNIT = "u13";
const ORDER: KUnit[] = [...KIX.units.filter((u) => u.id === LESSONS_UNIT), ...KIX.units.filter((u) => u.id !== LESSONS_UNIT)];

function Chapter({ u, n, open, onToggle }: { u: KUnit; n: string; open: boolean; onToggle: () => void }) {
  const s = useApp();
  const c = useTheme();
  const k = s.komorebi;
  const finished = u.lessons.filter((l) => k.done[l.id]).length;
  const tutor = u.id === LESSONS_UNIT;
  return (
    <Card style={{ gap: 12, borderWidth: tutor ? 2 : 1, borderColor: tutor ? c.gold : c.line, backgroundColor: tutor ? c.goldSoft : c.surface }}>
      <Pressable onPress={() => { haptic.tap(); onToggle(); }} accessibilityRole="button" accessibilityState={{ expanded: open }} accessibilityLabel={u.title}
        style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: finished === u.lessons.length ? c.gold : tutor ? c.gold : c.brand }}>
          {tutor ? <Icon name="person.2.fill" size={18} color="#ffffff" /> : <T w="black" size={16} color="#ffffff">{n}</T>}
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Eyebrow>{u.place}</Eyebrow>
          <T w="black" size={18}>{u.title}</T>
          <T w="bold" size={13} color={c.muted}>{finished}/{u.lessons.length} lessons</T>
        </View>
        <Icon name={open ? "chevron.up" : "chevron.down"} size={16} color={c.muted} />
      </Pressable>
      {open && (
        <View style={{ gap: 8 }}>
          <T w="semibold" size={14} color={c.muted}>{u.blurb}</T>
          {u.lessons.map((l, i) => {
            const st = lessonStatus(k, l.id);
            return (
              <Pressable key={l.id} onPress={() => { haptic.tap(); startLesson(l.id); }} accessibilityRole="button" accessibilityLabel={l.title}
                style={({ pressed }) => ({
                  flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderRadius: 12, borderCurve: "continuous",
                  borderWidth: 2, borderColor: c.line, backgroundColor: c.surface, opacity: pressed ? 0.8 : 1,
                })}>
                <Icon name={st.done ? "checkmark.circle.fill" : st.sittings ? "circle.lefthalf.filled" : "circle"} size={22} color={st.done ? c.olive : c.brand} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <T w="black" size={15}>{tutor ? l.title : `${i + 1}. ${l.title}`}</T>
                  <T w="bold" size={12} color={c.muted} numberOfLines={2}>{st.done ? "Done · tap to revisit" : st.sittings ? `Part ${st.sittings + 1} of ${st.total} next` : l.scene}</T>
                </View>
                <Icon name="chevron.right" size={14} color={c.muted} />
              </Pressable>
            );
          })}
        </View>
      )}
    </Card>
  );
}

export function KomorebiLearn() {
  const s = useApp();
  const c = useTheme();
  const k = s.komorebi;
  const p = KE.progress(KIX, k);
  const next = nextLesson(k);
  const due = KE.dueItems(k, KE.dayKey()).filter((id) => KIX.items.has(id)).length;
  const nextUnit = next?.id.split("l")[0];
  const [open, setOpen] = useState<Set<string>>(() => new Set([LESSONS_UNIT, ...(nextUnit ? [nextUnit] : [])]));
  const toggle = (id: string) => setOpen((o) => { const n = new Set(o); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <View style={{ gap: 18 }}>
      <Card style={{ gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}>
          <T style={{ fontFamily: "Hiragino Sans", fontWeight: "700", fontSize: 26 }}>木漏れ日</T>
          <T w="heavy" size={15} color={c.muted}>komorebi · Japanese</T>
        </View>
        <T w="bold" size={14} color={c.muted}>{p.done}/{p.total} lessons · {p.learned} phrases learned. XP and your streak are shared with Skepsis.</T>
        <View style={{ height: 10, borderRadius: 999, backgroundColor: c.surface2, overflow: "hidden" }}>
          <View style={{ width: `${p.percent}%`, height: "100%", backgroundColor: c.olive }} />
        </View>
        {next && <Btn label={`${p.done || Object.keys(k.sittings).length ? "Continue" : "Start"} · ${next.title}`} onPress={() => startLesson(next.id)} />}
        <Btn label={due ? `Review · ${due} due` : "Review · nothing due"} tone="ghost" small disabled={!due} onPress={() => router.push({ pathname: "/komorebi", params: { review: "1" } })} />
      </Card>
      {ORDER.map((u) => <Chapter key={u.id} u={u} n={u.id.slice(1)} open={open.has(u.id)} onToggle={() => toggle(u.id)} />)}
      <T w="semibold" size={13} color={c.muted} style={{ textAlign: "center" }}>
        Komorebi is free and open source (MIT), also at komorebi.tryskepsis.com. Audio uses your phone’s Japanese voice.
      </T>
    </View>
  );
}
