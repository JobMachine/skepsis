// Flux, Logos's small frog who sits by Heraclitus's river and keeps asking why: drawn exactly like
// the Logos website's mascot (philosophy/app/src/app.js), plus Logos's plum color for accents.
import { useColorScheme } from "react-native";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";

import { useTheme } from "@/theme";

/** Logos's brand color (plum), light and dark, from philosophy/app/src/style.css. */
export function usePlum() {
  const dark = useColorScheme() === "dark";
  return dark
    ? { brand: "#d9a6cf", deep: "#a86f9e", soft: "#3a2437", on: "#17151a" }
    : { brand: "#6b2f63", deep: "#4a2545", soft: "#f3e6f0", on: "#ffffff" };
}

export type FluxMood = "happy" | "sleepy" | "cheer";

export function Flux({ mood = "happy", size = 110 }: { mood?: FluxMood; size?: number }) {
  const c = useTheme();
  const plum = usePlum();
  const skin = useColorScheme() === "dark" ? "#a5d183" : "#9ccb79";
  const shell = "#6f9f52", belly = "#e6f0c9", ink = "#2b2420", tongue = "#d98a7e", brass = "#c9962b";
  const sleepy = mood === "sleepy", cheer = mood === "cheer";
  return (
    <Svg width={size} height={(size * 116) / 130} viewBox="0 0 130 116" accessibilityLabel="Flux the frog">
      <Path d="M8 109q14-7 28 0t29 0 29 0 28 0" fill="none" stroke={plum.brand} strokeWidth={3.5} strokeLinecap="round" opacity={0.45} />
      <Ellipse cx={33} cy={99} rx={19} ry={8} fill={shell} />
      <Ellipse cx={97} cy={99} rx={19} ry={8} fill={shell} />
      <Path d="M28 76q0-30 37-30t37 30q0 27-37 27T28 76" fill={skin} />
      <Ellipse cx={65} cy={83} rx={23} ry={18} fill={belly} />
      {cheer ? (
        <G>
          <Path d="M33 76Q16 66 18 50M97 76q17-10 15-26" stroke={skin} strokeWidth={9} fill="none" strokeLinecap="round" />
          <Circle cx={18} cy={47} r={6} fill={skin} />
          <Circle cx={112} cy={47} r={6} fill={skin} />
        </G>
      ) : (
        <Path d="M36 80q-7 12-2 22M94 80q7 12 2 22" stroke={skin} strokeWidth={9} fill="none" strokeLinecap="round" />
      )}
      <Path d="M24 49q0-22 21-24 12-1 20 7 8-8 20-7 21 2 21 24 0 20-41 20T24 49" fill={skin} />
      <Circle cx={45} cy={33} r={13} fill={skin} />
      <Circle cx={85} cy={33} r={13} fill={skin} />
      <Circle cx={45} cy={33} r={10} fill="#ffffff" />
      <Circle cx={85} cy={33} r={10} fill="#ffffff" />
      {sleepy ? (
        <Path d="M38 35q7 6 14 0M78 35q7 6 14 0" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      ) : (
        <G>
          <Circle cx={45} cy={33} r={6.5} fill={ink} />
          <Circle cx={85} cy={33} r={6.5} fill={ink} />
          <Circle cx={47.5} cy={30.5} r={2.2} fill="#ffffff" />
          <Circle cx={87.5} cy={30.5} r={2.2} fill="#ffffff" />
        </G>
      )}
      <Ellipse cx={35} cy={54} rx={6} ry={3.5} fill={tongue} opacity={0.55} />
      <Ellipse cx={95} cy={54} rx={6} ry={3.5} fill={tongue} opacity={0.55} />
      <Path d="M50 54q15 11 30 0" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <Path d="M43 66q22 8 44 0l-4 7q-18 6-36 0z" fill={brass} />
      {sleepy && <Path d="M100 20h8l-8 8h8" fill="none" stroke={c.muted} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}
    </Svg>
  );
}
