// Celebration confetti for finished lessons and new records (rare moments, so it gets the delight budget).
// Pure transform/opacity on the UI thread; skipped entirely when Reduce Motion is on.
import { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import { E } from "@/course";
import { useTheme } from "@/theme";

function Piece({ x, delay, color, w, h, spin, drift, height }: { x: number; delay: number; color: string; w: number; h: number; spin: number; drift: number; height: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withDelay(delay, withTiming(1, { duration: 2200, easing: Easing.out(Easing.quad) }));
  }, [delay, t]);
  const st = useAnimatedStyle(() => ({
    opacity: t.value < 0.85 ? 1 : (1 - t.value) / 0.15,
    transform: [
      { translateX: x + drift * t.value },
      { translateY: -40 + (height + 80) * t.value },
      { rotate: `${spin * t.value}deg` },
    ],
  }));
  return <Animated.View style={[{ position: "absolute", top: 0, left: 0, width: w, height: h, borderRadius: 2, backgroundColor: color }, st]} />;
}

export function Confetti({ run = true, seed = 7 }: { run?: boolean; seed?: number }) {
  const c = useTheme();
  const reduced = useReducedMotion();
  const { width, height } = useWindowDimensions();
  const pieces = useMemo(() => {
    const cols = [c.gold, c.brand, c.olive, c.flame, c.clay];
    const r = E.rng(seed);
    return [...Array(48)].map((_, i) => ({
      x: r() * width, delay: r() * 500, color: cols[i % cols.length],
      w: 6 + r() * 6, h: 8 + r() * 8, spin: (r() - 0.5) * 900, drift: (r() - 0.5) * 120,
    }));
  }, [c, width, seed]);
  if (!run || reduced) return null;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p, i) => <Piece key={i} {...p} height={height} />)}
    </View>
  );
}
