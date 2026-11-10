import React from "react";
import { AbsoluteFill, Easing, interpolate, random, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "./theme";
import { Mascot } from "./Mascot";

// Timeline (30 fps, 150 frames):
//   0-30   hook text      24-110 phone: quiz (tele) then build-a-word (photograph)
//   106-128 montage: streak 6->7, rodeo timer, confetti      124-150 end card
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const FLAME = "M12 2c1 3.5-1.6 5.3-2.9 7.3C7.6 11.5 7 13 7 14.6 7 18.1 9.3 21 12 21s5-2.6 5-6.2c0-2.1-.9-3.7-2-5 .1 1.6-.5 2.8-1.6 3.3.5-3.6-.6-7.6-1.4-11.1z";

export const Coin: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill={C.gold} /><path d="M12 6.5 7.6 16.5h8.8z" fill="none" stroke="#fff" strokeWidth={2} strokeLinejoin="round" /></svg>
);
export const Flame: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path d={FLAME} fill={C.flame} /></svg>
);
export const Check: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);

/** Greek letters drifting behind everything. */
export const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  const letters = ["α", "β", "γ", "Ω", "σ", "λ", "φ", "δ", "ψ"];
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {letters.map((l, i) => {
        const x = 60 + random(`x${i}`) * 960;
        const y = 40 + random(`y${i}`) * 980 - f * (0.6 + random(`s${i}`) * 0.8);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, fontFamily: F.greek, fontSize: 90 + random(`z${i}`) * 90, color: C.brand, opacity: 0.07, transform: `rotate(${(random(`r${i}`) - 0.5) * 30 + f * 0.2}deg)` }}>{l}</div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words: [string, string][] = [["Y'all", C.ink], ["already", C.ink], ["speak", C.ink], ["Greek.", C.brand]];
  const exit = interpolate(f, [22, 30], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const top = spring({ frame: f, fps, config: { damping: 14 } });
  const under = interpolate(f, [16, 24], [0, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 26, opacity: 1 - exit, transform: `translateY(${-140 * exit}px)` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 22, opacity: top, transform: `scale(${0.8 + 0.2 * top})` }}>
        <span style={{ fontFamily: F.greek, fontSize: 64, color: C.goldDeep }}>σκέψις</span>
        <span style={{ fontFamily: F.west, fontSize: 56, color: C.brand }}>Skepsis</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        {[[0, 1], [2, 3]].map((line) => (
          <div key={line[0]} style={{ display: "flex", justifyContent: "center", gap: 40 }}>
            {line.map((i) => {
              const [w, color] = words[i];
              const s = spring({ frame: f - 2 - i * 2, fps, config: { damping: 22, stiffness: 320, overshootClamping: true } });
              return (
                <span key={w} style={{ position: "relative", flexShrink: 0, whiteSpace: "nowrap", fontFamily: F.ui, fontWeight: 900, fontSize: 132, lineHeight: 1.08, color, opacity: Math.min(1, s * 1.6), transform: `scale(${1.7 - 0.7 * s})`, transformOrigin: "50% 60%", display: "inline-block", letterSpacing: -2 }}>
                  {w}
                  {i === 3 && <span style={{ position: "absolute", left: 4, bottom: 6, height: 14, width: `${under * 96}%`, background: C.gold, borderRadius: 8 }} />}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------- phone ----------
const PW = 660, PH = 880, PX = (1080 - PW) / 2, PY = 110;
const INNER_W = PW - 24 - 88; // border + padding

const Option: React.FC<{ text: string; n: number; state: "idle" | "right" | "dim" }> = ({ text, n, state }) => {
  const right = state === "right";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, height: 96, padding: "0 22px", borderRadius: 22, border: `3px solid ${right ? C.olive : C.line}`, background: right ? C.oliveSoft : C.surface, boxShadow: `0 6px 0 ${right ? C.olive : C.line}`, opacity: state === "dim" ? 0.45 : 1, fontFamily: F.ui, fontWeight: 800, fontSize: 32, color: C.ink }}>
      <span style={{ width: 40, height: 40, borderRadius: 10, border: `3px solid ${right ? C.olive : C.line}`, display: "grid", placeItems: "center", fontSize: 20, color: right ? C.oliveDeep : C.muted, flex: "none" }}>
        {right ? <Check size={24} color={C.oliveDeep} /> : n}
      </span>
      {text}
    </div>
  );
};

const QuizPane: React.FC<{ f: number }> = ({ f }) => {
  const { fps } = useVideoConfig();
  const answered = f >= 20;
  const fingerIn = interpolate(f, [4, 14], [0, 1], { ...clamp, easing: easeOut });
  const press = interpolate(f, [14, 17, 20], [1, 0.82, 1], clamp);
  const fingerOut = interpolate(f, [22, 28], [1, 0], clamp);
  const ring = interpolate(f, [16, 28], [0, 1], { ...clamp, easing: easeOut });
  const xp = spring({ frame: f - 21, fps, config: { damping: 9, stiffness: 160 } });
  const xpUp = interpolate(f, [21, 40], [0, -16], { ...clamp, easing: easeOut });
  const xpFade = interpolate(f, [36, 42], [1, 0], clamp);
  const foot = spring({ frame: f - 22, fps, config: { damping: 16 } });
  const tapX = 430, tapY = 190 + 48;
  const opts = ["far, at a distance", "sound, voice", "light", "small"];
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ fontFamily: F.ui, fontWeight: 900, fontSize: 22, letterSpacing: 2.5, color: C.brand }}>NEW WORD PART</div>
      <div style={{ position: "absolute", top: 40, fontFamily: F.ui, fontWeight: 900, fontSize: 46, whiteSpace: "nowrap", color: C.ink }}>
        What does <span style={{ color: C.brand }}>tele</span> mean?
      </div>
      <div style={{ position: "absolute", top: 112, fontFamily: F.greek, fontSize: 46, color: C.muted }}>τῆλε</div>
      <div style={{ position: "absolute", top: 190, left: 0, right: 0, display: "flex", flexDirection: "column", gap: 18 }}>
        {opts.map((o, i) => <Option key={o} text={o} n={i + 1} state={!answered ? "idle" : i === 0 ? "right" : "dim"} />)}
      </div>
      {/* tap ring + finger */}
      <div style={{ position: "absolute", left: tapX - 60, top: tapY - 60, width: 120, height: 120, borderRadius: 60, border: `6px solid ${C.brand}`, opacity: ring > 0 ? 1 - ring : 0, transform: `scale(${0.3 + ring * 1.4})` }} />
      <div style={{ position: "absolute", left: tapX - 30 + (1 - fingerIn) * 260, top: tapY - 30 + (1 - fingerIn) * 320, width: 60, height: 60, borderRadius: 30, background: "rgba(22,26,58,0.28)", border: "4px solid rgba(255,255,255,0.9)", opacity: fingerIn * fingerOut, transform: `scale(${press})` }} />
      {/* +10 XP */}
      <div style={{ position: "absolute", right: 0, top: 112 + xpUp, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 10, padding: "10px 22px", borderRadius: 999, background: C.goldSoft, border: `3px solid ${C.gold}`, fontFamily: F.ui, fontWeight: 900, fontSize: 34, color: C.goldDeep, opacity: f >= 21 ? xpFade : 0, transform: `scale(${xp})`, transformOrigin: "100% 50%" }}>
        <Coin size={34} /> +10 XP
      </div>
      {/* feedback footer like the real app */}
      <div style={{ position: "absolute", left: -10, right: -10, top: 660 + (1 - foot) * 160, opacity: f >= 22 ? 1 : 0, padding: "22px 26px", borderRadius: 24, background: C.oliveSoft, border: `3px solid ${C.olive}`, display: "flex", alignItems: "center", gap: 14, fontFamily: F.ui, fontWeight: 900, fontSize: 36, color: C.oliveDeep }}>
        <Check size={36} color={C.oliveDeep} /> Yeehaw! Nailed it.
      </div>
    </div>
  );
};

const tileW = (s: string) => s.length * 22 + 48;
const Tile: React.FC<{ text: string; x: number; y: number; placed?: boolean; ok?: boolean; style?: React.CSSProperties }> = ({ text, x, y, placed, ok, style }) => (
  <div style={{ position: "absolute", left: x, top: y, width: tileW(text), height: 72, borderRadius: 16, display: "grid", placeItems: "center", background: ok ? C.oliveSoft : C.surface, border: `3px solid ${ok ? C.olive : placed ? C.brand : C.line}`, boxShadow: `0 5px 0 ${ok ? C.olive : placed ? C.brand : C.line}`, fontFamily: F.ui, fontWeight: 900, fontSize: 36, color: ok ? C.oliveDeep : placed ? C.brand : C.ink, ...style }}>{text}</div>
);

const BuildPane: React.FC<{ f: number }> = ({ f }) => {
  const { fps } = useVideoConfig();
  const SLOT_Y = 266;
  const row1 = ["graph", "tele", "photo"], row2 = ["scope", "bio"];
  const layRow = (row: string[], y: number) => {
    const total = row.reduce((a, t) => a + tileW(t), 0) + 16 * (row.length - 1);
    let x = (INNER_W - total) / 2;
    return row.map((t) => { const p = { t, x, y }; x += tileW(t) + 16; return p; });
  };
  const bank = [...layRow(row1, 420), ...layRow(row2, 510)];
  const target: Record<string, { x: number; y: number; start: number }> = {
    photo: { x: 16, y: SLOT_Y, start: 46 },
    graph: { x: 16 + tileW("photo") + 12, y: SLOT_Y, start: 52 },
  };
  const done = f >= 60;
  const res = spring({ frame: f - 60, fps, config: { damping: 10, stiffness: 170 } });
  const cap = interpolate(f, [63, 69], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ fontFamily: F.ui, fontWeight: 900, fontSize: 22, letterSpacing: 2.5, color: C.brand }}>BUILD THE WORD</div>
      <div style={{ position: "absolute", top: 40, width: INNER_W, fontFamily: F.ui, fontWeight: 900, fontSize: 42, lineHeight: 1.2, color: C.ink }}>
        Build the word that means <span style={{ color: C.brand }}>"an image drawn by light"</span>
      </div>
      <div style={{ position: "absolute", top: 250, left: 0, width: INNER_W, height: 104, borderTop: `3px solid ${done ? C.olive : C.line}`, borderBottom: `3px solid ${done ? C.olive : C.line}`, background: done ? C.oliveSoft : "transparent", borderRadius: done ? 18 : 0 }} />
      {bank.map(({ t, x, y }) => {
        const tg = target[t];
        if (!tg) return <Tile key={t} text={t} x={x} y={y} />;
        const p = interpolate(f, [tg.start, tg.start + 8], [0, 1], { ...clamp, easing: easeOut });
        const arc = Math.sin(p * Math.PI) * -60;
        return <Tile key={t} text={t} x={x + (tg.x - x) * p} y={y + (tg.y - y) * p + arc} placed={p >= 1} ok={done} style={{ transform: `scale(${1 + Math.sin(p * Math.PI) * 0.12})`, zIndex: 2 }} />;
      })}
      <div style={{ position: "absolute", top: 590, width: INNER_W, textAlign: "center", fontFamily: F.ui, fontWeight: 900, fontSize: 68, letterSpacing: -1, color: C.ink, opacity: done ? 1 : 0, transform: `scale(${res})` }}>
        <span style={{ color: C.brand, textDecoration: `underline ${C.gold}`, textDecorationThickness: 8, textUnderlineOffset: 10 }}>photo</span>graph
      </div>
      <div style={{ position: "absolute", top: 676, width: INNER_W, textAlign: "center", fontFamily: F.ui, fontWeight: 800, fontSize: 32, color: C.muted, opacity: cap }}>
        photo = light · graph = write
      </div>
    </div>
  );
};

export const Phone: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: f, fps, config: { damping: 15, stiffness: 120 } });
  const exit = interpolate(f, [78, 86], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const swap = interpolate(f, [36, 44], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const prog = interpolate(f, [0, 20, 26, 60, 66], [22, 22, 48, 48, 78], { ...clamp, easing: easeOut });
  return (
    <div style={{ position: "absolute", left: PX, top: PY, width: PW, height: PH, borderRadius: 70, border: `12px solid ${C.ink}`, background: C.bg, overflow: "hidden", boxShadow: "0 40px 80px rgba(22,26,58,0.22)", transform: `translateY(${(1 - enter) * 1000}px) scale(${1 - exit * 0.15})`, opacity: 1 - exit }}>
      <div style={{ position: "absolute", top: 34, left: 44, right: 44, display: "flex", alignItems: "center", gap: 22 }}>
        <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth={2.8} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        <div style={{ flex: 1, height: 24, borderRadius: 999, background: C.surface2, overflow: "hidden" }}>
          <div style={{ width: `${prog}%`, height: "100%", borderRadius: 999, background: C.olive, boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.12)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: F.ui, fontWeight: 900, fontSize: 26, color: C.flame }}><Flame size={26} />{f >= 60 ? 3 : f >= 20 ? 2 : 1}</div>
      </div>
      <div style={{ position: "absolute", top: 110, left: 44, width: INNER_W, height: PH - 140 }}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-swap * 700}px)` }}><QuizPane f={f} /></div>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - swap) * 700}px)` }}><BuildPane f={f} /></div>
      </div>
    </div>
  );
};

// ---------- montage ----------
export const Confetti: React.FC<{ f: number }> = ({ f }) => {
  const cols = [C.gold, C.brand, C.olive, C.flame, C.clay];
  return (
    <>
      {[...Array(80)].map((_, i) => {
        const t = Math.max(0, f - 3);
        const a = random(`a${i}`) * Math.PI * 2;
        const v = 14 + random(`v${i}`) * 18;
        const x = 540 + Math.cos(a) * v * t;
        const y = 470 + Math.sin(a) * v * t - 14 * t + 1.1 * t * t;
        const s = 12 + random(`s${i}`) * 14;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s / 2, background: cols[i % cols.length], opacity: f >= 3 ? 1 : 0, transform: `rotate(${random(`r${i}`) * 360 + t * 18}deg)`, borderRadius: 2 }} />;
      })}
    </>
  );
};

export const Montage: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (d: number) => spring({ frame: f - d, fps, config: { damping: 11, stiffness: 170 } });
  const tick = spring({ frame: f - 7, fps, config: { damping: 7, stiffness: 220 } });
  const drain = interpolate(f, [0, 22], [100, 12], clamp);
  const lift = interpolate(f, [0, 6, 12, 18], [0, 1, 0.5, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 80, top: 110, display: "flex", alignItems: "center", gap: 18, padding: "20px 34px", borderRadius: 34, background: C.surface, border: `3px solid ${C.line}`, boxShadow: `0 8px 0 ${C.line}`, transform: `scale(${pop(0)})`, fontFamily: F.ui, fontWeight: 900, color: C.ink }}>
        <Flame size={76} />
        <span style={{ fontSize: 96, color: C.flame, display: "inline-block", minWidth: 60, transform: `scale(${f >= 7 ? 1 + (1 - tick) * 0.6 : 1})` }}>{f >= 7 ? 7 : 6}</span>
        <span style={{ fontSize: 40 }}>day<br />streak</span>
      </div>
      <div style={{ position: "absolute", right: 80, top: 130, display: "flex", alignItems: "center", gap: 12, padding: "18px 30px", borderRadius: 999, background: C.goldSoft, border: `3px solid ${C.gold}`, transform: `scale(${pop(3)})`, fontFamily: F.ui, fontWeight: 900, fontSize: 48, color: C.goldDeep }}>
        <Coin size={52} /> 340 XP
      </div>
      <div style={{ position: "absolute", left: 540 - 210, top: 330, transform: `scale(${pop(1)}) rotate(${Math.sin(f / 3) * 3}deg)` }}><Mascot size={420} cheer armLift={lift} /></div>
      <Confetti f={f} />
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 110, display: "flex", flexDirection: "column", gap: 16, transform: `translateY(${(1 - pop(2)) * 300}px)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.ui, fontWeight: 900, fontSize: 42, color: C.ink }}>
          <span>RODEO</span><span style={{ color: C.flame }}>8-second ride</span>
        </div>
        <div style={{ height: 30, borderRadius: 999, background: C.surface2, overflow: "hidden" }}>
          <div style={{ width: `${drain}%`, height: "100%", background: C.flame, borderRadius: 999 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- end card ----------
export const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wipe = interpolate(f, [0, 9], [0, 820], { ...clamp, easing: easeOut });
  const s = (d: number) => spring({ frame: f - d, fps, config: { damping: 13, stiffness: 160 } });
  const item = (d: number): React.CSSProperties => ({ opacity: Math.min(1, s(d) * 1.3), transform: `translateY(${(1 - s(d)) * 40}px)` });
  return (
    <AbsoluteFill style={{ background: C.brand, clipPath: `circle(${wipe}px at 540px 540px)`, alignItems: "center", justifyContent: "center", gap: 18, textAlign: "center" }}>
      <div style={{ ...item(2), fontFamily: F.greek, fontSize: 70, color: C.goldSoft }}>σκέψις</div>
      <div style={{ ...item(3), fontFamily: F.west, fontSize: 168, lineHeight: 1, color: "#fff" }}>Skepsis</div>
      <div style={{ ...item(5), fontFamily: F.ui, fontWeight: 900, fontSize: 54, color: "#fff", marginTop: 6 }}>Greek roots in 3 minutes a day</div>
      <div style={{ ...item(7), marginTop: 18, padding: "16px 36px", borderRadius: 999, background: "#fff", boxShadow: `0 7px 0 ${C.brandDeep}`, fontFamily: F.ui, fontWeight: 900, fontSize: 42, color: C.ink }}>skepsis-greek.vercel.app</div>
      <div style={{ ...item(9), marginTop: 10, fontFamily: F.ui, fontWeight: 800, fontSize: 32, color: "rgba(255,255,255,0.85)" }}>open source · MCP for your agent</div>
    </AbsoluteFill>
  );
};

export const SkepsisX: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Backdrop />
    <Sequence from={0} durationInFrames={30} premountFor={10}><Hook /></Sequence>
    <Sequence from={24} durationInFrames={86} premountFor={20}><Phone /></Sequence>
    <Sequence from={106} durationInFrames={22} premountFor={20}><Montage /></Sequence>
    <Sequence from={124} durationInFrames={26} premountFor={20}><EndCard /></Sequence>
  </AbsoluteFill>
);
