import React from "react";
import { C } from "./theme";

// Homer the armadillo, ported from mascot() in app/src/app.js.
export const Mascot: React.FC<{ size: number; cheer?: boolean; armLift?: number }> = ({ size, cheer = false, armLift = 1 }) => {
  const leaves = [...Array(7)].map((_, i) => {
    const t = ((190 + i * 24) * Math.PI) / 180;
    const x = 98 + 15 * Math.cos(t), y = 58 + 11 * Math.sin(t);
    return <ellipse key={i} cx={x} cy={y} rx={2.6} ry={5} fill={C.olive} transform={`rotate(${(t * 180) / Math.PI + 90} ${x} ${y})`} />;
  });
  const armY = 72 - 26 * armLift;
  return (
    <svg width={size} height={(size * 112) / 124} viewBox="0 0 124 112">
      <ellipse cx="60" cy="104" rx="42" ry="5" fill={C.line} />
      <path d="M22 88q-14 6-17-6" stroke={C.skin} strokeWidth={6} strokeLinecap="round" fill="none" />
      <ellipse cx="34" cy="95" rx="8" ry="7" fill={C.skin} />
      <ellipse cx="84" cy="95" rx="8" ry="7" fill={C.skin} />
      <path d="M18 92q2-52 44-54 40 2 42 54z" fill={C.shell} />
      <path d="M40 47q-5 22-2 45M53 41q-2 25 0 51M66 40v52M79 43q3 24 1 49M91 52q4 20 2 40" stroke={C.band} strokeWidth={3} fill="none" strokeLinecap="round" />
      {cheer && <path d={`M84 72Q94 ${(72 + armY) / 2} 98 ${armY}`} stroke={C.skin} strokeWidth={7} strokeLinecap="round" fill="none" />}
      <path d="M92 60q22 0 28 18-8 8-24 6z" fill={C.skin} />
      <ellipse cx="94" cy="54" rx="5" ry="9" fill={C.skin} transform="rotate(-25 94 54)" />
      {leaves}
      <circle cx="103" cy="68" r="2.8" fill={C.mink} />
      <circle cx="104" cy="67" r=".9" fill="#fff" />
      <path d="M105 77q5 4 10 0" stroke={C.mink} strokeWidth={2} fill="none" strokeLinecap="round" />
    </svg>
  );
};
