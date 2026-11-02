// Writes the app's sound effects to assets/sounds/*.wav. Run: node scripts/make-sounds.mjs
//
// The sound of Skepsis is a lyre: every effect is plucked strings (Karplus-Strong synthesis)
// in D major, with a soft pad and bell overtones for shimmer, and a small hall reverb.
// No samples and no third-party audio, so anyone can change a note and rebuild.
import { mkdirSync, writeFileSync } from "node:fs";

const RATE = 44100;

// ---------- notes ----------
const A4 = 440;
const NOTE = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };
/** "F#5" -> Hz */
function hz(name) {
  const m = /^([A-G])(#|b)?(\d)$/.exec(name);
  const semis = NOTE[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + (Number(m[3]) - 4) * 12;
  return A4 * 2 ** (semis / 12);
}

// ---------- voices ----------
/** Deterministic noise so rebuilding gives the same files. */
function noise(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (((t ^ (t >>> 14)) >>> 0) / 4294967296) * 2 - 1;
  };
}

/** A plucked lyre string. brightness 0..1 shapes the pluck; decay ~ how long it rings. */
function pluck(f, dur, { brightness = 0.5, decay = 0.996, seed = 1 } = {}) {
  const n = Math.round(dur * RATE);
  const out = new Float32Array(n);
  const len = Math.max(2, Math.round(RATE / f));
  const buf = new Float32Array(len);
  const r = noise(seed + Math.round(f));
  let prev = 0;
  for (let i = 0; i < len; i++) {
    // low-passed noise = a soft finger pluck instead of a harsh pick
    const x = r();
    prev = prev + brightness * (x - prev);
    buf[i] = prev;
  }
  let idx = 0;
  for (let i = 0; i < n; i++) {
    const cur = buf[idx];
    const nxt = buf[(idx + 1) % len];
    buf[idx] = decay * 0.5 * (cur + nxt);
    out[i] = cur;
    idx = (idx + 1) % len;
  }
  // gentle fade so nothing clicks
  const fade = Math.min(n, Math.round(0.08 * RATE));
  for (let i = 0; i < fade; i++) out[n - 1 - i] *= i / fade;
  return out;
}

/** A soft bell: inharmonic sine partials that shimmer and fade. */
function bell(f, dur) {
  const n = Math.round(dur * RATE);
  const out = new Float32Array(n);
  const partials = [[1, 1, 1.0], [2.0, 0.35, 1.6], [2.76, 0.22, 2.2], [5.4, 0.08, 3.5]];
  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    const att = Math.min(1, t / 0.004);
    let v = 0;
    for (const [mul, amp, damp] of partials) v += amp * Math.sin(2 * Math.PI * f * mul * t) * Math.exp((-damp * t) / dur * 3);
    out[i] = v * att * 0.5;
  }
  return out;
}

/** A warm pad: detuned sines with a slow swell, the "aura" under a chord. */
function pad(freqs, dur, swell = 0.25) {
  const n = Math.round(dur * RATE);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    const env = Math.min(1, t / swell) * Math.exp((-2.2 * t) / dur);
    let v = 0;
    for (const f of freqs) for (const d of [-0.18, 0.18]) v += Math.sin(2 * Math.PI * (f + d) * t) + 0.25 * Math.sin(2 * Math.PI * 2 * (f + d) * t);
    out[i] = (v / (freqs.length * 2)) * env;
  }
  return out;
}

// ---------- mixing ----------
function track(len) {
  return { L: new Float32Array(Math.round(len * RATE)), R: new Float32Array(Math.round(len * RATE)) };
}
/** Add a mono voice at `at` seconds, panned -1..1. */
function add(tr, voice, at, gain = 1, pan = 0) {
  const o = Math.round(at * RATE);
  const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4), gr = gain * Math.sin(((pan + 1) * Math.PI) / 4);
  for (let i = 0; i < voice.length && o + i < tr.L.length; i++) {
    tr.L[o + i] += voice[i] * gl * Math.SQRT2;
    tr.R[o + i] += voice[i] * gr * Math.SQRT2;
  }
}

/** A small hall (Schroeder: 4 combs + 2 allpasses per side, slightly different for width). */
function reverb(tr, mix = 0.25, room = 0.82) {
  const side = (x, spread) => {
    const combs = [1116, 1188, 1277, 1356].map((d) => ({ b: new Float32Array(d + spread), i: 0, s: 0 }));
    const aps = [556, 441].map((d) => ({ b: new Float32Array(d + spread), i: 0 }));
    const y = new Float32Array(x.length);
    for (let n = 0; n < x.length; n++) {
      let acc = 0;
      for (const c of combs) {
        const out = c.b[c.i];
        c.s = out * 0.7 + c.s * 0.3; // damping: darker tail
        c.b[c.i] = x[n] * 0.015 + c.s * room;
        c.i = (c.i + 1) % c.b.length;
        acc += out;
      }
      for (const a of aps) {
        const bo = a.b[a.i];
        const v = -acc + bo;
        a.b[a.i] = acc + bo * 0.5;
        a.i = (a.i + 1) % a.b.length;
        acc = v;
      }
      y[n] = acc;
    }
    return y;
  };
  const wl = side(tr.L, 0), wr = side(tr.R, 23);
  for (let n = 0; n < tr.L.length; n++) {
    tr.L[n] = tr.L[n] * (1 - mix) + wl[n] * mix * 3;
    tr.R[n] = tr.R[n] * (1 - mix) + wr[n] * mix * 3;
  }
  return tr;
}

function wav(tr, peak = 0.6) {
  let max = 1e-9;
  for (let i = 0; i < tr.L.length; i++) max = Math.max(max, Math.abs(tr.L[i]), Math.abs(tr.R[i]));
  const g = peak / max;
  const n = tr.L.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(RATE, 24); buf.writeUInt32LE(RATE * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    const fadeOut = Math.min(1, (n - i) / (0.05 * RATE));
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, tr.L[i] * g * fadeOut)) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, tr.R[i] * g * fadeOut)) * 32767), 46 + i * 4);
  }
  return buf;
}

// ---------- the sounds (all in D major) ----------
const SOUNDS = {
  /** Right answer: a quick rising strum that resolves up to the tonic. */
  right() {
    const tr = track(1.1);
    [["A4", 0, -0.3], ["D5", 0.055, 0], ["F#5", 0.11, 0.3]].forEach(([n, at, pan], i) => add(tr, pluck(hz(n), 1, { brightness: 0.55, decay: 0.9965, seed: i }), at, 0.9, pan));
    add(tr, bell(hz("A5"), 0.9), 0.11, 0.18, 0.2);
    add(tr, pad([hz("D4"), hz("F#4"), hz("A4")], 1.0, 0.08), 0, 0.12);
    return reverb(tr, 0.22);
  },
  /** Wrong answer: soft and kind, a sigh down to a minor sixth. Never a buzzer. */
  wrong() {
    const tr = track(1.0);
    add(tr, pluck(hz("F4"), 0.9, { brightness: 0.3, decay: 0.994, seed: 3 }), 0, 0.8, -0.2);
    add(tr, pluck(hz("D4"), 0.9, { brightness: 0.3, decay: 0.994, seed: 4 }), 0.12, 0.8, 0.2);
    add(tr, pad([hz("Bb3"), hz("D4")], 0.9, 0.05), 0, 0.1);
    return reverb(tr, 0.25);
  },
  /** Lesson done: a lyre glissando up the pentatonic scale, landing on a ringing chord with bells. */
  done() {
    const tr = track(2.6);
    const run = ["D4", "E4", "F#4", "A4", "B4", "D5", "E5", "F#5", "A5"];
    run.forEach((n, i) => add(tr, pluck(hz(n), 1.4, { brightness: 0.5, decay: 0.997, seed: 10 + i }), i * 0.06, 0.6, -0.6 + (1.2 * i) / run.length));
    const t = run.length * 0.06 + 0.05;
    ["D4", "A4", "D5", "F#5", "A5", "D6"].forEach((n, i) => add(tr, pluck(hz(n), 2, { brightness: 0.45, decay: 0.998, seed: 30 + i }), t + i * 0.015, 0.55, -0.4 + i * 0.16));
    add(tr, bell(hz("D6"), 1.8), t, 0.22, 0.3);
    add(tr, bell(hz("A5"), 1.6), t + 0.12, 0.15, -0.3);
    add(tr, pad([hz("D3"), hz("A3"), hz("D4"), hz("F#4")], 2.2, 0.3), t - 0.2, 0.22);
    return reverb(tr, 0.3, 0.85);
  },
  /** Tile tap: a single quiet harmonic, like touching a string. */
  tick() {
    const tr = track(0.35);
    add(tr, pluck(hz("A5"), 0.3, { brightness: 0.35, decay: 0.99, seed: 50 }), 0, 0.6);
    return reverb(tr, 0.12);
  },
  /** Streak: an ascending arpeggio over a glowing pad, crowned with bells. The big moment. */
  streak() {
    const tr = track(3.0);
    add(tr, pad([hz("D3"), hz("A3"), hz("F#4"), hz("A4")], 2.8, 0.5), 0, 0.3);
    ["D4", "F#4", "A4", "D5", "F#5", "A5", "D6"].forEach((n, i) => add(tr, pluck(hz(n), 1.8, { brightness: 0.5, decay: 0.998, seed: 60 + i }), 0.1 + i * 0.09, 0.6, -0.5 + i * 0.16));
    [["D6", 0.75], ["A6", 0.9], ["F#6", 1.05]].forEach(([n, at], i) => add(tr, bell(hz(n), 1.8), at, 0.16, i - 1));
    return reverb(tr, 0.32, 0.86);
  },
};

mkdirSync(new URL("../assets/sounds/", import.meta.url), { recursive: true });
for (const [name, make] of Object.entries(SOUNDS)) {
  writeFileSync(new URL(`../assets/sounds/${name}.wav`, import.meta.url), wav(make(), name === "tick" ? 0.35 : 0.6));
}
console.log("wrote", Object.keys(SOUNDS).join(", "));
