// The winding trail of lesson stones, one section per unit. Same rules as the website:
// a lesson opens when the one before it is done; each unit ends with a roundup (Ω).
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import Animated from "react-native-reanimated";

import { E, IX, NODES, type PathNode } from "@/course";
import { Icon, T } from "@/components/ui";
import { haptic } from "@/lib/feedback";
import { startNode } from "@/lib/nav";
import { useApp } from "@/lib/store";
import { font, useTheme } from "@/theme";

const OFFSETS = [0, 56, 84, 56, 0, -56, -84, -56];
const bob = {
  animationName: { "0%": { transform: [{ translateY: 0 }] }, "50%": { transform: [{ translateY: -5 }] }, "100%": { transform: [{ translateY: 0 }] } },
  animationDuration: "1.8s",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
} as const;

function Stone({ n, offset, current }: { n: PathNode; offset: number; current: boolean }) {
  const s = useApp();
  const c = useTheme();
  const done = !!s.done[n.id];
  const open = E.isUnlocked(IX, s, n.id);
  const boss = n.kind === "roundup";
  const bg = done ? c.gold : open ? c.brand : c.surface2;
  const deep = done ? c.goldDeep : open ? c.brandDeep : c.line;
  const fg = done ? "#1d1500" : open ? c.onBrand : c.locked;
  return (
    <View style={{ alignItems: "center", gap: 4, transform: [{ translateX: offset }], marginTop: current ? 26 : 0 }}>
      {current && (
        <View style={{ position: "absolute", top: -30, backgroundColor: c.surface, borderWidth: 2, borderColor: c.line, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
          <T w="black" size={12} color={c.brand} style={{ letterSpacing: 1 }}>START</T>
        </View>
      )}
      <Animated.View style={current ? bob : undefined}>
        <Pressable
          disabled={!open}
          accessibilityRole="button"
          accessibilityLabel={`${n.title}${done ? ", done" : open ? "" : ", locked"}`}
          onPress={() => { haptic.tap(); startNode(n); }}
          style={({ pressed }) => ({
            width: boss ? 84 : 72, height: boss ? 76 : 66, borderRadius: boss ? 26 : 36, borderCurve: "continuous",
            backgroundColor: bg, alignItems: "center", justifyContent: "center",
            boxShadow: `0 ${pressed ? 2 : 6}px 0 ${deep}`, transform: [{ translateY: pressed ? 4 : 0 }],
          })}
        >
          {done ? <Icon name="checkmark" size={30} color={fg} /> : !open ? <Icon name="lock.fill" size={22} color={fg} /> : <T w="greek" size={34} color={fg} style={{ lineHeight: 40 }}>{n.letter}</T>}
        </Pressable>
      </Animated.View>
      <T w="heavy" size={13} color={c.muted} style={{ maxWidth: 150, textAlign: "center", lineHeight: 16 }}>{n.title}</T>
    </View>
  );
}

const UNIT_TONES = ["brand", "olive", "flame", "gold", "clay"] as const;

export function Trail() {
  const s = useApp();
  const c = useTheme();
  const next = E.nextNode(IX, s);
  let k = 0;
  return (
    <View style={{ gap: 18 }}>
      {IX.course.units.map((u, i) => {
        const uNodes = NODES.filter((n) => n.unitId === u.id);
        const unlocked = E.isUnlocked(IX, s, uNodes[0].id);
        const tone = UNIT_TONES[i % UNIT_TONES.length];
        const bg = unlocked ? c[tone] : c.surface2;
        const deep = unlocked ? c[`${tone}Deep`] : c.line;
        const fg = unlocked ? (tone === "brand" ? c.onBrand : "#ffffff") : c.muted;
        const doneCount = uNodes.filter((n) => s.done[n.id]).length;
        return (
          <View key={u.id} style={{ gap: 6 }}>
            <View style={{ backgroundColor: bg, borderRadius: 16, borderCurve: "continuous", padding: 14, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 8, boxShadow: `0 4px 0 ${deep}` }}>
              <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
                <T w="heavy" size={12} color={fg} style={{ letterSpacing: 1, opacity: 0.85 }}>UNIT {i + 1} · {doneCount}/{uNodes.length}</T>
                <T w="black" size={19} color={fg}>{u.title}</T>
                <T w="bold" size={14} color={fg} style={{ opacity: 0.9 }}>{u.blurb}</T>
              </View>
              <Pressable onPress={() => { haptic.tap(); router.push({ pathname: "/huddle/[unit]", params: { unit: u.id } }); }} accessibilityLabel={`Present unit ${i + 1}`}
                style={({ pressed }) => ({ backgroundColor: unlocked ? "rgba(255,255,255,0.2)" : c.surface, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, opacity: pressed ? 0.7 : 1 })}>
                <T w="black" size={12} color={fg} style={{ fontFamily: font.black, letterSpacing: 0.6 }}>HUDDLE</T>
              </Pressable>
            </View>
            <View style={{ alignItems: "center", gap: 14, paddingTop: 18, paddingBottom: 10 }}>
              {uNodes.map((n) => <Stone key={n.id} n={n} offset={OFFSETS[k++ % OFFSETS.length]} current={!!next && next.id === n.id} />)}
            </View>
          </View>
        );
      })}
    </View>
  );
}
