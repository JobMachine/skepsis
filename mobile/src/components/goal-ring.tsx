import Svg, { Circle } from "react-native-svg";

import { useTheme } from "@/theme";

export function GoalRing({ pct, size = 58, color }: { pct: number; size?: number; color?: string }) {
  const c = useTheme();
  const r = 24, C = 2 * Math.PI * r;
  return (
    <Svg width={size} height={size} viewBox="0 0 58 58" style={{ transform: [{ rotate: "-90deg" }] }}>
      <Circle cx={29} cy={29} r={r} stroke={c.line} strokeWidth={8} fill="none" />
      <Circle cx={29} cy={29} r={r} stroke={color ?? c.gold} strokeWidth={8} fill="none" strokeLinecap="round"
        strokeDasharray={`${C}`} strokeDashoffset={C * (1 - Math.max(0, Math.min(1, pct)))} />
    </Svg>
  );
}
