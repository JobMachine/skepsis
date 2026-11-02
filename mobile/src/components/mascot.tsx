// Homer the armadillo, drawn exactly like the website's (app/src/app.js › mascot), plus hats
// you can buy with drachmas.
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

import type { Hat } from "@/lib/store";
import { useTheme } from "@/theme";

export type Mood = "happy" | "sad" | "cheer";

export function Mascot({ mood = "happy", hat = "wreath", size = 120 }: { mood?: Mood; hat?: Hat; size?: number }) {
  const c = useTheme();
  const leaves = [...Array(7)].map((_, i) => {
    const t = ((190 + i * 24) * Math.PI) / 180;
    const x = 98 + 15 * Math.cos(t), y = 58 + 11 * Math.sin(t);
    return <Ellipse key={i} cx={x} cy={y} rx={2.6} ry={5} fill={c.olive} transform={`rotate(${((t * 180) / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})`} />;
  });
  return (
    <Svg width={size} height={(size * 112) / 124} viewBox="0 0 124 112" accessibilityLabel="Homer the armadillo">
      <Ellipse cx={60} cy={104} rx={42} ry={5} fill={c.line} />
      <Path d="M22 88q-14 6-17-6" stroke={c.mSkin} strokeWidth={6} strokeLinecap="round" fill="none" />
      <Ellipse cx={34} cy={95} rx={8} ry={7} fill={c.mSkin} />
      <Ellipse cx={84} cy={95} rx={8} ry={7} fill={c.mSkin} />
      <Path d="M18 92q2-52 44-54 40 2 42 54z" fill={c.mShell} />
      <Path d="M40 47q-5 22-2 45M53 41q-2 25 0 51M66 40v52M79 43q3 24 1 49M91 52q4 20 2 40" stroke={c.mBand} strokeWidth={3} fill="none" strokeLinecap="round" />
      {mood === "cheer" && <Path d="M84 72q10-14 14-26" stroke={c.mSkin} strokeWidth={7} strokeLinecap="round" fill="none" />}
      <Path d="M92 60q22 0 28 18-8 8-24 6z" fill={c.mSkin} />
      <Ellipse cx={94} cy={54} rx={5} ry={9} fill={c.mSkin} transform="rotate(-25 94 54)" />
      {hat === "wreath" && <G>{leaves}</G>}
      {hat === "cowboy" && (
        <G>
          <Ellipse cx={100} cy={49} rx={22} ry={4.5} fill="#7a4a1f" />
          <Path d="M89 49q-1-15 11-16 12 1 11 16z" fill="#8d5a2b" />
          <Rect x={89} y={44} width={22} height={3.5} fill="#3a2a18" />
        </G>
      )}
      {hat === "helmet" && (
        <G>
          <Path d="M84 40q16-22 34 0" stroke={c.clay} strokeWidth={6} fill="none" strokeLinecap="round" />
          <Path d="M86 60q0-20 15-20t15 20l-4 2q-1-6-11-6t-11 6z" fill={c.gold} />
          <Path d="M101 40v16" stroke={c.goldDeep} strokeWidth={2} />
        </G>
      )}
      {hat === "grad" && (
        <G>
          <Path d="M80 42l20-8 20 8-20 8z" fill={c.ink} />
          <Path d="M90 46v6q10 5 20 0v-6l-10 4z" fill={c.ink} />
          <Path d="M118 43v10" stroke={c.gold} strokeWidth={2} />
          <Circle cx={118} cy={54} r={2} fill={c.gold} />
        </G>
      )}
      {mood === "sad" ? (
        <Path d="M100 69q3-3 6 0" stroke={c.mInk} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      ) : (
        <G>
          <Circle cx={103} cy={68} r={2.8} fill={c.mInk} />
          <Circle cx={104} cy={67} r={0.9} fill="#fff" />
        </G>
      )}
      {mood === "sad" ? (
        <Path d="M106 80q4-3 8 0" stroke={c.mInk} strokeWidth={2} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M105 77q5 4 10 0" stroke={c.mInk} strokeWidth={2} fill="none" strokeLinecap="round" />
      )}
    </Svg>
  );
}
