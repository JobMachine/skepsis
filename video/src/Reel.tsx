// Portrait (9:16, 15 s) cut for Instagram Reels / Stories.
// Reuses the square scenes (placed in the middle 1080x1080) and adds two full-height scenes:
// words split into their Greek roots, and "Is it Greek? Texas edition".
// Instagram covers roughly the top 250px and bottom 350px with its UI; nothing important goes there.
import React from "react";
import { AbsoluteFill, Easing, Freeze, interpolate, random, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "./theme";
import { Check, EndCard, Hook, Montage, Phone } from "./SkepsisX";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const SQ = 420; // top of the centered square: (1920 - 1080) / 2

// Timeline (30 fps)
const T = { hook: 0, phone: 42, roots: 128, greek: 264, montage: 358, end: 380 } as const;
const ROOT_EACH = 34;
const GREEK_EACH = 48;
export const REEL_FRAMES = 450; // 15 s

const Square: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", top: SQ, left: 0, width: 1080, height: 1080, overflow: "hidden" }}>{children}</div>
);

const Letters: React.FC = () => {
  const f = useCurrentFrame();
  const letters = ["α", "β", "γ", "δ", "λ", "π", "σ", "φ", "ψ", "Ω", "θ", "μ", "ξ", "ω"];
  return (
    <>
      {letters.map((l, i) => {
        const x = 40 + random(`lx${i}`) * 960;
        const y = 60 + random(`ly${i}`) * 1800 - f * (0.4 + random(`ls${i}`) * 0.6);
        return <div key={i} style={{ position: "absolute", left: x, top: y, fontFamily: F.greek, fontSize: 90 + random(`lz${i}`) * 90, color: C.brand, opacity: 0.07, transform: `rotate(${(random(`lr${i}`) - 0.5) * 30 + f * 0.2}deg)` }}>{l}</div>;
      })}
    </>
  );
};

const Pill: React.FC<{ children: React.ReactNode; o: number }> = ({ children, o }) => (
  <div style={{ position: "absolute", top: 300, left: 0, right: 0, textAlign: "center", opacity: o, transform: `translateY(${(1 - o) * 20}px)` }}>
    <span style={{ display: "inline-block", padding: "14px 30px", borderRadius: 999, background: C.surface, border: `3px solid ${C.line}`, boxShadow: `0 6px 0 ${C.line}`, fontFamily: F.ui, fontWeight: 900, fontSize: 40, color: C.ink }}>{children}</span>
  </div>
);

// ---------- words split into roots ----------
type Part = { r: string; g: string; m: string; latin?: boolean };
const WORDS: { parts: [Part, Part]; gloss: string }[] = [
  { parts: [{ r: "astro", g: "ἄστρον", m: "star" }, { r: "naut", g: "ναύτης", m: "sailor" }], gloss: "star sailor" },
  { parts: [{ r: "demo", g: "δῆμος", m: "people" }, { r: "cracy", g: "κράτος", m: "power" }], gloss: "people power" },
  { parts: [{ r: "hippo", g: "ἵππος", m: "horse" }, { r: "potamus", g: "ποταμός", m: "river" }], gloss: "river horse" },
  { parts: [{ r: "petro", g: "πέτρα", m: "rock" }, { r: "leum", g: "oleum · Latin", m: "oil", latin: true }], gloss: "rock oil" },
];

const RootWord: React.FC<{ w: (typeof WORDS)[number] }> = ({ w }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const word = w.parts.map((p) => p.r).join("");
  const size = Math.min(150, 940 / (word.length * 0.6));
  const inS = spring({ frame: f, fps, config: { damping: 13, stiffness: 180 } });
  const split = interpolate(f, [7, 14], [0, 1], { ...clamp, easing: easeOut });
  const card = (d: number) => spring({ frame: f - d, fps, config: { damping: 12, stiffness: 170 } });
  const gloss = spring({ frame: f - 17, fps, config: { damping: 11, stiffness: 190 } });
  const out = interpolate(f, [ROOT_EACH - 4, ROOT_EACH], [1, 0], clamp);
  const colors = [C.brand, C.goldDeep];
  return (
    <AbsoluteFill style={{ opacity: out, transform: `translateY(${(1 - out) * -40}px)` }}>
      <div style={{ position: "absolute", top: 680, left: 0, right: 0, textAlign: "center", fontFamily: F.ui, fontWeight: 900, fontSize: size, letterSpacing: -2, transform: `scale(${0.6 + 0.4 * inS})`, opacity: Math.min(1, inS * 1.5), whiteSpace: "nowrap" }}>
        {w.parts.map((p, i) => (
          <span key={i} style={{ display: "inline-block", color: split > 0 ? colors[i] : C.ink, transform: `translateX(${(i === 0 ? -1 : 1) * split * 22}px)` }}>{p.r}</span>
        ))}
      </div>
      <div style={{ position: "absolute", top: 940, left: 60, right: 60, display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
        {w.parts.map((p, i) => (
          <React.Fragment key={i}>
            {i === 1 && <span style={{ fontFamily: F.ui, fontWeight: 900, fontSize: 64, color: C.muted, opacity: card(10) }}>+</span>}
            <div style={{ width: 400, padding: "22px 16px 26px", borderRadius: 30, background: C.surface, border: `4px solid ${colors[i]}`, boxShadow: `0 8px 0 ${colors[i]}`, textAlign: "center", transform: `scale(${card(8 + i * 3)}) translateY(${(1 - card(8 + i * 3)) * 60}px)` }}>
              <div style={{ fontFamily: F.ui, fontWeight: 900, fontSize: 54, color: colors[i] }}>{p.r}</div>
              <div style={{ fontFamily: p.latin ? F.ui : F.greek, fontWeight: p.latin ? 800 : 400, fontSize: p.latin ? 32 : 46, color: C.muted, marginTop: 4 }}>{p.g}</div>
              <div style={{ display: "inline-block", marginTop: 12, padding: "6px 18px", borderRadius: 12, background: C.goldSoft, fontFamily: F.ui, fontWeight: 900, fontSize: 40, color: C.ink }}>{p.m}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ position: "absolute", top: 1320, left: 0, right: 0, textAlign: "center", fontFamily: F.ui, fontWeight: 900, fontSize: 72, color: C.oliveDeep, transform: `scale(${gloss})`, opacity: Math.min(1, gloss * 1.4) }}>
        = “{w.gloss}”
      </div>
    </AbsoluteFill>
  );
};

const Roots: React.FC = () => {
  const f = useCurrentFrame();
  const pill = interpolate(f, [0, 8, WORDS.length * ROOT_EACH - 6, WORDS.length * ROOT_EACH], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill>
      <Pill o={pill}>Words you <span style={{ color: C.brand }}>already use</span></Pill>
      {WORDS.map((w, i) => (
        <Sequence key={i} from={i * ROOT_EACH} durationInFrames={ROOT_EACH} premountFor={10}><RootWord w={w} /></Sequence>
      ))}
      <div style={{ position: "absolute", top: 1480, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 14 }}>
        {WORDS.map((_, i) => <div key={i} style={{ width: 18, height: 18, borderRadius: 9, background: Math.floor(f / ROOT_EACH) >= i ? C.brand : C.line }} />)}
      </div>
    </AbsoluteFill>
  );
};

// ---------- is it Greek? ----------
const QUIZ = [
  { w: "rodeo", greek: false, why: "Spanish: rodear, “to round up”" },
  { w: "cyclone", greek: true, why: "κύκλος (kyklos) = circle" },
];

const GreekQ: React.FC<{ q: (typeof QUIZ)[number] }> = ({ q }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inS = spring({ frame: f, fps, config: { damping: 12, stiffness: 170 } });
  const btns = spring({ frame: f - 4, fps, config: { damping: 13, stiffness: 170 } });
  const tap = interpolate(f, [15, 24], [0, 1], clamp);
  const picked = f >= 18;
  const why = spring({ frame: f - 21, fps, config: { damping: 12, stiffness: 170 } });
  const out = interpolate(f, [GREEK_EACH - 4, GREEK_EACH], [1, 0], clamp);
  const btn = (label: string, isGreek: boolean) => {
    const right = picked && isGreek === q.greek;
    return (
      <div style={{ position: "relative", width: 420, height: 150, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, border: `4px solid ${right ? C.olive : C.line}`, background: right ? C.oliveSoft : C.surface, boxShadow: `0 8px 0 ${right ? C.olive : C.line}`, opacity: picked && !right ? 0.45 : 1, fontFamily: F.ui, fontWeight: 900, fontSize: 54, color: right ? C.oliveDeep : C.ink }}>
        {right && <Check size={52} color={C.oliveDeep} />}{label}
        {isGreek === q.greek && <div style={{ position: "absolute", left: "50%", top: "50%", width: 140, height: 140, marginLeft: -70, marginTop: -70, borderRadius: 70, border: `8px solid ${C.brand}`, opacity: tap > 0 ? 1 - tap : 0, transform: `scale(${0.3 + tap * 1.6})` }} />}
      </div>
    );
  };
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", top: 700, left: 0, right: 0, textAlign: "center", fontFamily: F.ui, fontWeight: 900, fontSize: 150, letterSpacing: -2, color: C.ink, transform: `scale(${0.6 + 0.4 * inS})`, opacity: Math.min(1, inS * 1.5) }}>
        {q.w}<span style={{ color: C.brand }}>?</span>
      </div>
      <div style={{ position: "absolute", top: 980, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40, transform: `translateY(${(1 - btns) * 120}px)`, opacity: btns }}>
        {btn("Greek", true)}{btn("Not Greek", false)}
      </div>
      <div style={{ position: "absolute", top: 1230, left: 90, right: 90, textAlign: "center", padding: "26px 30px", borderRadius: 26, background: q.greek ? C.oliveSoft : C.brandSoft, fontFamily: q.greek ? F.ui : F.ui, fontWeight: 800, fontSize: 46, color: C.ink, transform: `scale(${why})`, opacity: Math.min(1, why * 1.4) }}>
        {q.greek ? <><span style={{ fontFamily: F.greek, fontWeight: 400 }}>κύκλος</span> (kyklos) = circle</> : q.why}
      </div>
    </AbsoluteFill>
  );
};

const IsItGreek: React.FC = () => {
  const f = useCurrentFrame();
  const total = QUIZ.length * GREEK_EACH;
  const pill = interpolate(f, [0, 8, total - 6, total], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill>
      <Pill o={pill}>Is it Greek? <span style={{ color: C.flame }}>Texas edition</span></Pill>
      {QUIZ.map((q, i) => (
        <Sequence key={i} from={i * GREEK_EACH} durationInFrames={GREEK_EACH} premountFor={10}><GreekQ q={q} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};

// ---------- whole reel ----------
export const SkepsisReel: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Hook plays its entrance, holds, then exits (its own frames 22-30).
  const hookLocal = f < 21 ? f : f < 36 ? 21 : f - 15;
  const label = interpolate(f, [T.phone + 4, T.phone + 14, T.roots - 8, T.roots], [0, 1, 1, 0], clamp);
  // Same wipe as the square end card (0 -> 820px over 9 frames), then it keeps growing to the corners.
  const wipe = interpolate(f, [T.end, T.end + 9, T.end + 13], [0, 820, 1120], { ...clamp, easing: easeOut });
  const s = (d: number) => spring({ frame: f - T.end - d, fps, config: { damping: 13, stiffness: 160 } });
  const pop = (d: number): React.CSSProperties => ({ opacity: Math.min(1, s(d) * 1.3), transform: `translateY(${(1 - s(d)) * 30}px)` });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Letters />
      <AbsoluteFill style={{ background: C.brand, clipPath: `circle(${wipe}px at 540px 960px)` }} />

      {f < T.hook + 45 && <Square><Freeze frame={hookLocal}><Hook /></Freeze></Square>}
      <Sequence from={T.phone} durationInFrames={86} premountFor={20}><Square><Phone /></Square></Sequence>
      <Pill o={label}>The Greek inside <span style={{ color: C.brand }}>everyday English</span></Pill>
      <Sequence from={T.roots} durationInFrames={T.greek - T.roots} premountFor={20}><Roots /></Sequence>
      <Sequence from={T.greek} durationInFrames={T.montage - T.greek} premountFor={20}><IsItGreek /></Sequence>
      <Sequence from={T.montage} durationInFrames={T.end - T.montage + 2} premountFor={20}><Square><Montage /></Square></Sequence>
      {f >= T.end && <Square><Freeze frame={Math.min(f - T.end, 25)}><EndCard /></Freeze></Square>}

      <div style={{ position: "absolute", top: 300, left: 0, right: 0, textAlign: "center", ...pop(10) }}>
        <span style={{ fontFamily: F.ui, fontWeight: 900, fontSize: 46, color: "#fff", letterSpacing: 1 }}>Free · no sign-up · open source</span>
      </div>
      <div style={{ position: "absolute", top: 1440, left: 0, right: 0, textAlign: "center", ...pop(16) }}>
        <span style={{ display: "inline-block", padding: "16px 40px", borderRadius: 999, background: C.gold, boxShadow: `0 7px 0 ${C.goldDeep}`, fontFamily: F.ui, fontWeight: 900, fontSize: 44, color: "#1d1500" }}>Link in bio</span>
      </div>
    </AbsoluteFill>
  );
};
