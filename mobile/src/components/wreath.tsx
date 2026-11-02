// A laurel wreath with a letter in the middle: the badge art ("laurels"), as on the website.
import Svg, { Ellipse, G, Text as SvgText } from "react-native-svg";

import { font, useTheme } from "@/theme";

export function Wreath({ letter, size = 48, off = false }: { letter: string; size?: number; off?: boolean }) {
  const c = useTheme();
  const color = off ? c.locked : c.gold;
  const leaves = [...Array(6)].flatMap((_, i) => {
    const a = ((200 + i * 26) * Math.PI) / 180, b = ((-20 - i * 26) * Math.PI) / 180;
    const p = (t: number) => [24 + 19 * Math.cos(t), 26 + 19 * Math.sin(t)];
    return [a, b].map((t, j) => {
      const [x, y] = p(t);
      return <Ellipse key={`${i}-${j}`} cx={x} cy={y} rx={3} ry={6} transform={`rotate(${((t * 180) / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})`} />;
    });
  });
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <G fill={color}>{leaves}</G>
      <SvgText x={24} y={31} textAnchor="middle" fontFamily={font.greek} fontSize={18} fill={off ? c.muted : c.ink}>{letter}</SvgText>
    </Svg>
  );
}
