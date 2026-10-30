// Portrait (9:16) cut for Instagram Reels / Stories: the square scene sits in the middle,
// the background and the end-card wipe extend into the top and bottom bands, and the end card
// holds longer (links aren't clickable in Reels, so people need time to read "link in bio").
// Instagram covers roughly the top 250px and bottom 350px with its UI; nothing important goes there.
import React from "react";
import { AbsoluteFill, Easing, Freeze, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "./theme";
import { SkepsisX } from "./SkepsisX";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const SQUARE_TOP = 420; // (1920 - 1080) / 2
const SQUARE_END = 149; // last frame of the square cut; held after this
const END_START = 124; // the square's end card starts here
export const REEL_FRAMES = 195; // 6.5 s

const LETTERS = ["α", "β", "γ", "δ", "λ", "π", "σ", "φ", "ψ", "Ω"];

const BandLetters: React.FC<{ top: number }> = ({ top }) => {
  const f = useCurrentFrame();
  return (
    <>
      {LETTERS.slice(0, 6).map((l, i) => {
        const x = random(`bx${top}${i}`) * 980;
        const y = top + random(`by${top}${i}`) * 340 + Math.sin((f + i * 20) / 18) * 10;
        return <div key={i} style={{ position: "absolute", left: x, top: y, fontFamily: F.greek, fontSize: 90 + random(`bs${top}${i}`) * 80, color: C.brand, opacity: 0.07, transform: `rotate(${(random(`br${top}${i}`) - 0.5) * 30 + f * 0.2}deg)` }}>{l}</div>;
      })}
    </>
  );
};

export const SkepsisReel: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Same wipe as the square end card (0 -> 820px over 9 frames), then it keeps growing to the corners.
  const wipe = interpolate(f, [END_START, END_START + 9, END_START + 13], [0, 820, 1120], { ...clamp, easing: easeOut });
  const label = interpolate(f, [28, 40, 112, 120], [0, 1, 1, 0], clamp);
  const s = (d: number) => spring({ frame: f - END_START - d, fps, config: { damping: 13, stiffness: 160 } });
  const pop = (d: number): React.CSSProperties => ({ opacity: Math.min(1, s(d) * 1.3), transform: `translateY(${(1 - s(d)) * 30}px)` });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <BandLetters top={40} />
      <BandLetters top={1520} />
      {/* blue wipe behind the square: only shows in the bands, and lines up with the square's own wipe */}
      <AbsoluteFill style={{ background: C.brand, clipPath: `circle(${wipe}px at 540px 960px)` }} />

      {/* top band label while the demo plays */}
      <div style={{ position: "absolute", top: 290, left: 0, right: 0, textAlign: "center", opacity: label, transform: `translateY(${(1 - label) * 20}px)` }}>
        <span style={{ display: "inline-block", padding: "14px 30px", borderRadius: 999, background: C.surface, border: `3px solid ${C.line}`, boxShadow: `0 6px 0 ${C.line}`, fontFamily: F.ui, fontWeight: 900, fontSize: 40, color: C.ink }}>
          The Greek inside <span style={{ color: C.brand }}>everyday English</span>
        </span>
      </div>

      {/* the square cut, held on its last frame */}
      <div style={{ position: "absolute", top: SQUARE_TOP, left: 0, width: 1080, height: 1080, overflow: "hidden" }}>
        <Freeze frame={SQUARE_END} active={f >= SQUARE_END}>
          <SkepsisX />
        </Freeze>
      </div>

      {/* end-card extras in the bands */}
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, textAlign: "center", ...pop(10) }}>
        <span style={{ fontFamily: F.ui, fontWeight: 900, fontSize: 46, color: "#fff", letterSpacing: 1 }}>Free · no sign-up · open source</span>
      </div>
      <div style={{ position: "absolute", top: 1440, left: 0, right: 0, textAlign: "center", ...pop(16) }}>
        <span style={{ display: "inline-block", padding: "16px 40px", borderRadius: 999, background: C.gold, boxShadow: `0 7px 0 ${C.goldDeep}`, fontFamily: F.ui, fontWeight: 900, fontSize: 44, color: "#1d1500" }}>Link in bio</span>
      </div>
    </AbsoluteFill>
  );
};
