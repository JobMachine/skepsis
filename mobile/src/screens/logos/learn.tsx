// The Learn tab when the Logos (philosophy) course is picked: what to do next, a refresh, one
// idea to try to remember, every episode by era with its memory meter and official links, and the
// thinkers timeline. Every episode is open from the start, in any order. New episodes appear by
// re-running `npm run logos:sync`; nothing here lists them.
import { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import { Btn, Card, Eyebrow, Icon, T } from "@/components/ui";
import { haptic } from "@/lib/feedback";
import { useApp } from "@/lib/store";
import { LE, LIX, SHOW_URL, allThinkers, episodesDone, nextEpisode, type LIndexedLesson, type LMemory, type LState, type LUnit } from "@/logos";
import { useTheme } from "@/theme";
import { Flux, usePlum } from "./flux";
import { EpisodeLinks, Highlight, LinkChip, Unofficial } from "./steps";

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
const play = (node: string) => router.push({ pathname: "/logos", params: { node } });
const refresh = () => router.push({ pathname: "/logos", params: { refresh: "1" } });

/** Six small bars: how well an episode is remembered (the average review gap reached). */
function MemoryMeter({ m }: { m: LMemory }) {
  const c = useTheme();
  const plum = usePlum();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }} accessible accessibilityLabel={`Memory: ${m.label}`}>
      <View style={{ flexDirection: "row", gap: 3 }}>
        {Array.from({ length: m.max }, (_, i) => <View key={i} style={{ width: 14, height: 6, borderRadius: 3, backgroundColor: i < m.level ? plum.brand : c.surface2 }} />)}
      </View>
      <T w="bold" size={12} color={c.muted}>{m.label}</T>
    </View>
  );
}

function Episode({ l, s, current, today }: { l: LIndexedLesson; s: LState; current: boolean; today: string }) {
  const c = useTheme();
  const plum = usePlum();
  const done = !!s.done[l.id];
  const m = LE.lessonMemory(LIX, s, l.id, today);
  return (
    <View style={{ gap: 10, padding: 12, borderRadius: 14, borderCurve: "continuous", borderWidth: 2, borderColor: current ? plum.brand : c.line, backgroundColor: c.surface }}>
      <Pressable onPress={() => { haptic.tap(); play(l.id); }} accessibilityRole="button" accessibilityLabel={`Episode ${l.episode}, ${l.title}, ${done ? "refresh" : "start"}`}
        style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 12, opacity: pressed ? 0.8 : 1 })}>
        <View style={{ width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: done ? c.olive : plum.brand }}>
          {done ? <Icon name="checkmark" size={16} color="#ffffff" /> : <T w="black" size={15} color={plum.on}>{l.episode}</T>}
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <T w="bold" size={12} color={c.muted}>{`Episode ${l.episode} · ${l.minutes} min · ${plural(m.total, "idea", "ideas")}`}</T>
          <T w="black" size={17}>{l.title}</T>
          {done && (
            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <MemoryMeter m={m} />
              {m.due > 0 && <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, backgroundColor: c.goldSoft }}><T w="heavy" size={11} color={c.xpText}>Ready to refresh</T></View>}
            </View>
          )}
        </View>
        <T w="black" size={13} color={plum.brand} style={{ textTransform: "uppercase", letterSpacing: 0.6 }}>{done ? "Refresh" : "Start"}</T>
      </Pressable>
      <EpisodeLinks lesson={l} />
    </View>
  );
}

function Era({ u, s, open, onToggle, current, today }: { u: LUnit; s: LState; open: boolean; onToggle: () => void; current: string | null; today: string }) {
  const c = useTheme();
  const plum = usePlum();
  const lessons = LIX.lessons.filter((l) => l.unitId === u.id);
  const done = lessons.filter((l) => s.done[l.id]).length;
  const exam = LE.pathNodes(LIX).find((n) => n.unitId === u.id && n.kind === "exam");
  const examOpen = !!exam && LE.isOpen(LIX, s, exam.id);
  const best = exam ? s.exams?.[exam.id] : undefined;
  const left = lessons.filter((l) => !s.done[l.id]).map((l) => l.episode);
  return (
    <Card style={{ gap: 12 }}>
      <Pressable onPress={() => { haptic.tap(); onToggle(); }} accessibilityRole="button" accessibilityState={{ expanded: open }} accessibilityLabel={u.title}
        style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <T w="black" size={19}>{u.title}</T>
          <T w="bold" size={13} color={c.muted}>{done}/{lessons.length} episodes</T>
        </View>
        <Icon name={open ? "chevron.up" : "chevron.down"} size={16} color={c.muted} />
      </Pressable>
      {open && (
        <View style={{ gap: 10 }}>
          <T w="semibold" size={14} color={c.muted}>{u.blurb}{u.caveat ? ` ${u.caveat}` : ""}</T>
          {lessons.map((l) => <Episode key={l.id} l={l} s={s} current={current === l.id} today={today} />)}
          {exam && (
            <Pressable disabled={!examOpen} onPress={() => { haptic.tap(); play(exam.id); }} accessibilityRole="button" accessibilityLabel={exam.title}
              style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 16, borderCurve: "continuous", borderWidth: 2, borderStyle: examOpen ? "solid" : "dashed", borderColor: examOpen ? c.gold : c.line, backgroundColor: examOpen ? c.goldSoft : c.surface }}>
              <Icon name="laurel.leading" size={30} color={examOpen ? c.gold : c.muted} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <T w="bold" size={12} color={c.muted}>Era exam</T>
                <T w="black" size={17}>{exam.title}</T>
                <T w="bold" size={13} color={c.muted}>{!examOpen ? `Opens once you finish ${left.length === 1 ? "Episode" : "Episodes"} ${left.join(" and ")}.` : best ? `Best: ${best.best} of ${best.total} on the first try. Sit it again any time.` : "About a dozen questions: ideas, who came first, and which school. No way to fail."}</T>
              </View>
              {examOpen && <T w="black" size={14} color={plum.brand}>{best ? "Again" : "Start"}</T>}
            </Pressable>
          )}
        </View>
      )}
      {!open && <View style={{ height: 0 }} />}
      <View style={{ height: 4, borderRadius: 2, backgroundColor: c.surface2, overflow: "hidden" }}>
        <View style={{ width: `${lessons.length ? (done / lessons.length) * 100 : 0}%`, height: "100%", backgroundColor: plum.brand }} />
      </View>
    </Card>
  );
}

/** One idea a day to try to remember before peeking. Nothing is recorded. */
function PeekCard({ s, today }: { s: LState; today: string }) {
  const c = useTheme();
  const plum = usePlum();
  const [open, setOpen] = useState(false);
  const pool = LIX.terms.filter((it) => s.items[it.id]);
  if (!pool.length) return null;
  const it = pool[Math.abs(LE.daysBetween("2026-01-01", today)) % pool.length];
  return (
    <Card onPress={() => setOpen(!open)} style={{ gap: 6 }} accessibilityLabel="Do you remember? Tap to peek">
      <Eyebrow color={plum.brand}>Do you remember?</Eyebrow>
      <Highlight text={LE.askOf(it)} mark={it.term} size={18} />
      {open ? (
        <>
          <T w="heavy" size={16} selectable>{LE.dot(it.meaning)}</T>
          <T w="semibold" size={14} color={c.muted} selectable>{it.say}</T>
        </>
      ) : <T w="heavy" size={13} color={plum.brand}>Tap to peek</T>}
    </Card>
  );
}

function Thinkers({ s }: { s: LState }) {
  const c = useTheme();
  const plum = usePlum();
  const [open, setOpen] = useState(false);
  const all = allThinkers(s);
  if (!all.length) return null;
  const met = all.filter((x) => x.met).length;
  return (
    <Card style={{ gap: 12 }}>
      <Pressable onPress={() => { haptic.tap(); setOpen(!open); }} accessibilityRole="button" accessibilityState={{ expanded: open }} accessibilityLabel="The thinkers"
        style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <T w="black" size={19}>The thinkers</T>
          <T w="bold" size={13} color={c.muted}>{met} of {all.length} met so far, in historical order</T>
        </View>
        <Icon name={open ? "chevron.up" : "chevron.down"} size={16} color={c.muted} />
      </Pressable>
      {open && all.map((x, i) => (
        <View key={x.id} style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ alignItems: "center", width: 14 }}>
            <View style={{ width: 12, height: 12, borderRadius: 6, marginTop: 4, backgroundColor: x.met ? plum.brand : c.line }} />
            {i < all.length - 1 && <View style={{ flex: 1, width: 2, backgroundColor: c.line }} />}
          </View>
          <View style={{ flex: 1, gap: 2, paddingBottom: 14 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <T w="black" size={16} style={{ flexShrink: 1 }}>{x.name}</T>
              <T w="heavy" size={11} color={x.met ? plum.brand : c.muted}>{x.met ? "Met" : "Not yet"}</T>
            </View>
            <T w="bold" size={12} color={c.muted}>{x.dates}{x.place ? ` · ${x.place}` : ""} · {x.episodes.length === 1 ? "Episode" : "Episodes"} {x.episodes.join(", ")}</T>
            <T w="semibold" size={14}>{x.idea}</T>
          </View>
        </View>
      ))}
    </Card>
  );
}

export function LogosLearn() {
  const s = useApp();
  const c = useTheme();
  const plum = usePlum();
  const L = s.logos;
  const today = LE.dayKey();
  const next = nextEpisode(L);
  const due = LE.dueItems(L, today).length;
  const learned = Object.keys(L.items).length;
  const focus = next ? next.unitId : LIX.course.units[0]?.id;
  const [open, setOpen] = useState<Set<string>>(() => new Set(focus ? [focus] : []));
  const toggle = (id: string) => setOpen((o) => { const n = new Set(o); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const lastEpisode = Math.max(0, ...LIX.lessons.map((l) => l.episode));
  const greet = next
    ? learned ? `Episode ${next.episode} is waiting. Heard it yet?` : `Heard Episode ${next.episode}? Let's make it stick.`
    : due ? `${plural(due, "idea is", "ideas are")} ready for a quick refresh.` : "All caught up. Go listen to something good.";

  return (
    <View style={{ gap: 18 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <Flux mood="happy" size={84} />
        <View style={{ flex: 1, minWidth: 0, backgroundColor: c.surface, borderWidth: 2, borderColor: c.line, borderRadius: 16, borderCurve: "continuous", paddingHorizontal: 14, paddingVertical: 12 }}>
          <T w="bold" size={15}>{greet}</T>
        </View>
      </View>

      <Card style={{ gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}>
          <T w="black" size={22} color={plum.brand}>Logos</T>
          <T w="heavy" size={15} color={c.muted}>philosophy · one episode at a time</T>
        </View>
        <T w="bold" size={14} color={c.muted}>{episodesDone(L)}/{LIX.lessons.length} episodes · {plural(learned, "idea", "ideas")} learned. XP and your streak are shared with Skepsis. {"You can't fail here."}</T>
        {next && <Btn label={`${learned ? "Up next" : "Start"} · Episode ${next.episode}`} tone="gold" onPress={() => play(next.id)} />}
        <Btn label={due ? `Refresh · ${plural(Math.min(due, LE.REFRESH_N), "idea", "ideas")} ready` : learned ? "Refresh anyway" : "Refresh · nothing yet"} tone="ghost" small disabled={!learned} onPress={refresh} />
        {!due && learned > 0 && <T w="semibold" size={12} color={c.muted}>Next refresh {LE.inDays(today, LE.nextDue(L) ?? today)}. Ideas come back at growing gaps.</T>}
      </Card>

      <PeekCard s={L} today={today} />

      {LIX.course.units.map((u) => <Era key={u.id} u={u} s={L} open={open.has(u.id)} onToggle={() => toggle(u.id)} current={next?.id ?? null} today={today} />)}

      <Card style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Flux mood="sleepy" size={56} />
        <View style={{ flex: 1, gap: 4 }}>
          <T w="black" size={15}>Episode {lastEpisode + 1} comes next</T>
          <T w="semibold" size={13} color={c.muted}>Listen first. Its lesson is added here afterwards.</T>
          <View style={{ flexDirection: "row" }}><LinkChip label="Find it on the show's site" url={SHOW_URL} /></View>
        </View>
      </Card>

      <Thinkers s={L} />

      <View style={{ gap: 6, alignItems: "center" }}>
        <Unofficial center />
        <T w="semibold" size={12} color={c.muted} style={{ textAlign: "center" }}>Lessons are written in original words. For the real thing, use the official episode and transcript links.</T>
      </View>
    </View>
  );
}
