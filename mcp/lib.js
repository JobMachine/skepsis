// Skepsis MCP: course logic shared by the server and its tests.
// Reuses the web app's course (content.js) and engine (engine.js) so both teach the same way.
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const require = createRequire(import.meta.url);
const { COURSE } = require("../app/src/content.js");
const { Engine: E } = require("../app/src/engine.js");

export { COURSE, E };
export const IX = E.indexCourse(COURSE);

/** @typedef {ReturnType<typeof E.freshState>} State */

// ---------- progress file ----------
export function homeDir() {
  return process.env.SKEPSIS_HOME ? path.resolve(process.env.SKEPSIS_HOME) : path.join(os.homedir(), ".skepsis");
}
export function progressPath() {
  return path.join(homeDir(), "progress.json");
}
/** @returns {State} */
export function loadState() {
  const file = progressPath();
  try {
    const raw = fs.readFileSync(file, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new TypeError("State must be an object");
    }
    const fresh = E.freshState();
    const safe = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
      if (k in fresh && v !== null && (fresh[k] === null || typeof v === typeof fresh[k])) {
        safe[k] = v;
      }
    }
    return Object.assign(fresh, safe, { onboarded: true });
  } catch (e) {
    if (e && e.code !== "ENOENT") {
      if (e instanceof SyntaxError || e instanceof TypeError) {
        try { fs.renameSync(file, `${file}.bad-${Date.now()}`); } catch { /* ignore */ }
      }
      console.error(`[skepsis] could not read ${file}: ${e.message}. Starting fresh.`);
    }
    return Object.assign(E.freshState(), { onboarded: true });
  }
}
/** Atomic write: temp file then rename. @param {State} s */
export function saveState(s) {
  s.updatedAt = Date.now();
  const file = progressPath();
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const tmp = `${file}.${process.pid}.${randomUUID().slice(0, 8)}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(s, null, 2), { mode: 0o600 });
    fs.renameSync(tmp, file);
  } catch (err) {
    try { fs.unlinkSync(tmp); } catch { /* ignore */ }
    throw err;
  }
}

// ---------- helpers ----------
const today = () => E.dayKey();
const stripTags = (h) => String(h).replace(/<[^>]+>/g, "");
const norm = (t) => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ς/g, "σ").replace(/[^a-z0-9α-ω\s'-]/g, " ").replace(/\s+/g, " ").trim();
const LETTERS = "abcdefgh";

export function itemCard(it) {
  if (it.kind === "root") {
    return [
      `**${it.root}** (${it.gr}, ${it.tr}) = ${it.m}`,
      `Texas take: ${it.hook}`,
      `Teach it: ${it.say}`,
      `Words: ${it.ex.map(([w, d]) => `${w} (${d})`).join("; ")}`,
    ].join("\n");
  }
  if (it.kind === "idea") {
    return [
      `**${it.term}** (${it.gr}, ${it.tr}, literally "${it.lit}") = ${it.m}`,
      `Story: ${it.story}`,
      `Texas take: ${it.tex}`,
      `At work: ${it.work}`,
      `Teach it: ${it.say}`,
    ].join("\n");
  }
  return `**${it.w}**: ${it.greek ? "Greek" : "not Greek"}. ${it.from}`;
}

/** The card shown when an item is first taught in a lesson (first two examples only; the third is held back). */
function introCard(it) {
  if (it.kind === "root") {
    return [`New word part: **${it.root}** (${it.gr}) = ${it.m}`, `Texas take: ${it.hook}`, ...it.ex.slice(0, 2).map(([w, d]) => `- ${w}: ${d}`)].join("\n");
  }
  return [`New idea: **${it.term}** (${it.gr}) = ${it.m}`, `Literally: "${it.lit}"`, it.story, `Texas take: ${it.tex}`].join("\n");
}

/** Render a question for the learner. Never includes the answer. */
export function renderQuestion(q) {
  const head = `[${q.label}${q.guess ? " · just a guess, no penalty" : ""}]`;
  if (q.type === "mcq") {
    const word = q.word ? `\nWord: **${q.word}**` : q.greek ? `\nGreek: ${q.greek}` : "";
    return `${head}\n${stripTags(q.prompt)}${word}\n${q.options.map((o, i) => `${i + 1}. ${o}`).join("\n")}\nReply with the number.`;
  }
  if (q.type === "tf") return `${head}\nIs **${q.word}** from Greek?\n1. Greek\n2. Not Greek\nReply 1 or 2.`;
  if (q.type === "build") {
    return `${head}\n${stripTags(q.prompt)}\nPieces: ${q.tiles.map((t, i) => `${i + 1}. ${t}`).join("   ")}\nReply with the pieces in order, as numbers ("2 1") or the pieces ("tele phone").`;
  }
  if (q.type === "match") {
    return `${head}\nPair each word with its meaning.\n${q.left.map((l, i) => `${i + 1}. ${l}`).join("\n")}\n${q.right.map((r, i) => `${LETTERS[i]}. ${r}`).join("\n")}\nReply with every pair, like "1b 2a 3d 4c".`;
  }
  return `${head}`;
}

/** Correct answer as text, for feedback after the learner replied. */
function answerText(q) {
  if (q.type === "mcq") return q.answer;
  if (q.type === "tf") return q.answer ? "Greek" : "Not Greek";
  if (q.type === "build") return `${q.answer.join(" + ")} = ${q.word}`;
  if (q.type === "match") return q.pairs.map(([l, r]) => `${l} = ${r}`).join("; ");
  return "";
}

/**
 * Parse a learner's reply. Returns {ok:boolean} or {error:string} when the reply can't be understood
 * (then the question is not used up).
 */
export function grade(q, response) {
  const raw = String(response ?? "").trim();
  const r = norm(raw);
  if (!r) return { error: "Empty reply. Pass the learner's answer." };
  if (q.type === "mcq") {
    if (/^\d+$/.test(r)) {
      const idx = Number(r) - 1;
      if (idx < 0 || idx >= q.options.length) return { error: `Reply with an option number from 1 to ${q.options.length}.` };
      return { ok: norm(q.options[idx]) === norm(q.answer), chosen: q.options[idx] };
    }
    const opts = q.options.map(norm);
    let idx = opts.indexOf(r);
    if (idx < 0) {
      const hits = opts.map((o, i) => (o.includes(r) || r.includes(o) ? i : -1)).filter((i) => i >= 0);
      if (hits.length === 1) idx = hits[0];
    }
    if (idx < 0 || idx >= q.options.length) return { error: `Reply with an option number from 1 to ${q.options.length}.` };
    return { ok: norm(q.options[idx]) === norm(q.answer), chosen: q.options[idx] };
  }
  if (q.type === "tf") {
    let v = null;
    if (/^(1|greek|yes|y|true|it is greek)$/.test(r)) v = true;
    else if (/^(2|not[ -]?greek|no|n|false|not)$/.test(r)) v = false;
    if (v === null) return { error: 'Reply 1 (Greek) or 2 (Not Greek).' };
    return { ok: v === q.answer };
  }
  if (q.type === "build") {
    if (r.replace(/[\s+-]/g, "") === q.word.toLowerCase()) return { ok: true };
    const toks = raw.split(/[\s,+-]+/).map((t) => t.replace(/\.$/, "")).filter(Boolean);
    const pieces = [];
    for (const t of toks) {
      if (/^\d+$/.test(t)) {
        const p = q.tiles[Number(t) - 1];
        if (!p) return { error: `There is no piece ${t}. Use numbers 1 to ${q.tiles.length}.` };
        pieces.push(p);
      } else {
        const p = q.tiles.find((x) => x.toLowerCase() === t.toLowerCase());
        if (!p) return { error: `"${t}" isn't one of the pieces. Use the numbers or the pieces as shown.` };
        pieces.push(p);
      }
    }
    return { ok: pieces.length === q.answer.length && pieces.every((p, i) => p === q.answer[i]) };
  }
  if (q.type === "match") {
    const pairs = [...raw.toLowerCase().matchAll(/(\d)\s*(?:[-:=]\s*)?([a-h])/g)];
    if (pairs.length < q.pairs.length) return { error: `Give all ${q.pairs.length} pairs, like "1b 2a 3d 4c".` };
    const seen = new Set();
    for (const [, n] of pairs) {
      if (seen.has(n)) return { error: `Item ${n} was paired more than once.` };
      seen.add(n);
    }
    const ok = pairs.every(([, n, l]) => {
      const left = q.left[Number(n) - 1], right = q.right[LETTERS.indexOf(l)];
      return q.pairs.some(([a, b]) => a === left && b === right);
    });
    return { ok };
  }
  return { error: "This question type can't be answered." };
}

// ---------- sessions ----------
/**
 * @typedef {{ id: string, mode: "lesson"|"roundup"|"practice", nodeId: string|null, steps: any[], i: number,
 *   misses: number, right: number, scored: number, combo: number, maxCombo: number, requeued: Set<number>, start: number }} Session
 */
/** @type {Map<string, Session>} */
const sessions = new Map();

function newSession(mode, nodeId, steps) {
  const id = randomUUID().slice(0, 8);
  /** @type {Session} */
  const s = { id, mode, nodeId, steps, i: 0, misses: 0, right: 0, scored: 0, combo: 0, maxCombo: 0, requeued: new Set(), start: Date.now() };
  sessions.set(id, s);
  if (sessions.size > 50) sessions.delete(sessions.keys().next().value);
  return s;
}
export function getSession(id) {
  return sessions.get(String(id).trim()) || null;
}

/** Move past intro cards, teaching each one. Returns the cards shown and the next question (or null when done). */
function advanceToQuestion(sess, S) {
  const cards = [];
  while (sess.i < sess.steps.length) {
    const st = sess.steps[sess.i];
    if (st.type === "intro") {
      const it = IX.items.get(st.itemId);
      E.learn(S, it.id, today());
      cards.push(introCard(it));
      sess.i += 1;
    } else if (st.type === "intro-origin") {
      cards.push("Is it Greek? Texas English is a stew: Spanish from the ranches, Nahuatl from Mexico, Caddo from the first Texans, Dutch from old New York. Call each word Greek or not.");
      sess.i += 1;
    } else return { cards, question: st };
  }
  return { cards, question: null };
}

export function lessonStatus(S) {
  const next = E.nextNode(IX, S);
  return COURSE.units.map((u, ui) => ({
    unit: ui + 1,
    id: u.id,
    title: u.title,
    lessons: E.pathNodes(IX).filter((n) => n.unitId === u.id).map((n) => ({
      id: n.id,
      title: n.title,
      status: S.done[n.id] ? "done" : E.isUnlocked(IX, S, n.id) ? "open" : "locked",
      next: !!next && next.id === n.id,
    })),
  }));
}

/** Start a lesson or unit roundup. Returns text for the agent. */
export function startLesson(S, lessonId) {
  const nodes = E.pathNodes(IX);
  const node = lessonId ? nodes.find((n) => n.id === lessonId.trim()) : E.nextNode(IX, S);
  if (!node) {
    if (!lessonId) throw new Error("Every lesson is done. Try `review` for spaced practice.");
    throw new Error(`No lesson "${lessonId}". Call list_course to see lesson ids (like "u1l1" or the roundup "u1-review").`);
  }
  if (!E.isUnlocked(IX, S, node.id)) {
    const nx = E.nextNode(IX, S);
    throw new Error(`"${node.title}" is locked. Finish the lessons before it first. Next up: ${nx ? `${nx.id} (${nx.title})` : "none"}.`);
  }
  const seed = Math.floor(Math.random() * 2 ** 31);
  const steps = node.kind === "roundup" ? E.buildRoundup(IX, S, node.unitId, seed) : E.buildLesson(IX, S, node.id, seed);
  const sess = newSession(node.kind === "roundup" ? "roundup" : "lesson", node.id, steps);
  const { cards, question } = advanceToQuestion(sess, S);
  saveState(S);
  const unit = COURSE.units.find((u) => u.id === node.unitId);
  return [
    `Session ${sess.id} · ${unit.title} › ${node.title} · ${countQuestions(sess)} questions`,
    ...(cards.length ? ["", "Teach these first:", ...cards.map((c) => `\n${c}`)] : []),
    "",
    "Ask this question (don't reveal the answer):",
    renderQuestion(question),
  ].join("\n");
}

export function startReview(S) {
  if (Object.keys(S.items).length < 3) throw new Error("Nothing to review yet. Finish a lesson first with start_lesson.");
  const steps = E.buildPractice(IX, S, Math.floor(Math.random() * 2 ** 31));
  const sess = newSession("practice", null, steps);
  const due = E.dueItems(S, today()).length;
  return [`Session ${sess.id} · Spaced review · ${steps.length} questions (${due} due today)`, "", "Ask this question (don't reveal the answer):", renderQuestion(steps[0])].join("\n");
}

function countQuestions(sess) {
  return sess.steps.filter((q) => q.type !== "intro" && q.type !== "intro-origin").length;
}

const RIGHT = ["That's right as rain.", "Yeehaw! Nailed it.", "Smarter than a tree full of owls.", "Bullseye, partner."];
const WRONG = ["Close, but no cigar.", "Shake it off, partner.", "That one bucked you. It'll come back at the end."];

/** Grade the learner's reply and return feedback plus the next question or the lesson summary. */
export function answer(S, sessionId, response) {
  const sess = getSession(sessionId);
  if (!sess) throw new Error(`No active session "${sessionId}". Sessions live only while this server runs; start a new one with start_lesson or review.`);
  const q = sess.steps[sess.i];
  if (!q) throw new Error("This session is already finished. Start another with start_lesson or review.");
  const g = grade(q, response);
  if (g.error) throw new Error(`${g.error} (The question is still open.)`);
  const t = today();
  const lines = [];
  if (q.guess) {
    lines.push(g.ok ? "Nice instinct! That's right." : `Good guess. The answer: ${answerText(q)}.`);
  } else {
    sess.scored += 1;
    S.answered += 1;
    if (g.ok) { sess.right += 1; S.correct += 1; sess.combo += 1; sess.maxCombo = Math.max(sess.maxCombo, sess.combo); }
    else { sess.misses += 1; sess.combo = 0; }
    if (q.itemId) E.grade(S, q.itemId, g.ok, t);
    if (!g.ok && !sess.requeued.has(sess.i)) {
      sess.requeued.add(sess.steps.length);
      sess.steps.push({ ...q, label: "Try again" });
    }
    lines.push(g.ok ? (sess.combo >= 3 ? `Correct, ${sess.combo} in a row!` : `Correct. ${RIGHT[sess.right % RIGHT.length]}`) : `Not quite. ${WRONG[sess.misses % WRONG.length]} The answer: ${answerText(q)}.`);
  }
  if (q.explain) lines.push(q.explain);
  if (q.family) lines.push(`Word family: ${q.family}`);
  sess.i += 1;
  const { cards, question } = advanceToQuestion(sess, S);
  if (cards.length) lines.push("", "Teach these next:", ...cards.map((c) => `\n${c}`));
  if (question) {
    saveState(S);
    const left = sess.steps.slice(sess.i).filter((x) => x.type !== "intro" && x.type !== "intro-origin").length;
    lines.push("", `Next question (${left} left, don't reveal the answer):`, renderQuestion(question));
    return { text: lines.join("\n"), done: false, correct: q.guess ? null : g.ok };
  }
  lines.push("", finish(S, sess));
  return { text: lines.join("\n"), done: true, correct: q.guess ? null : g.ok };
}

/** Same rewards as the web app's finishRun. */
function finish(S, sess) {
  const t = today();
  const perfect = sess.misses === 0;
  const base = { lesson: 10, roundup: 15, practice: 8 }[sess.mode];
  const gained = base + (perfect ? 5 : 0) + (sess.maxCombo >= 5 ? 2 : 0);
  const wasActive = S.lastDay === t;
  E.addXp(S, t, gained);
  const st = E.touchStreak(S, t);
  if (sess.mode === "practice") S.practices += 1;
  if (sess.nodeId) S.done[sess.nodeId] = { perfect, at: t };
  const fresh = E.awardBadges(S, t);
  saveState(S);
  sessions.delete(sess.id);
  const acc = sess.scored ? Math.round((sess.right / sess.scored) * 100) : 100;
  const next = E.nextNode(IX, S);
  return [
    `Session complete${perfect ? ": flawless!" : "!"} +${gained} XP · accuracy ${acc}% · total ${S.xp} XP`,
    !wasActive && st.streakUp ? (st.usedFreeze ? `A streak freeze saved the streak: ${S.streak} days.` : `Streak: ${S.streak} day${S.streak === 1 ? "" : "s"}.`) : `Streak: ${S.streak} days.`,
    ...fresh.map((b) => `New laurel: ${b.name} (${b.desc})`),
    next ? `Next lesson: ${next.id} (${next.title}).` : "Every lesson is done. Keep it fresh with `review`.",
  ].join("\n");
}

// ---------- lookups ----------
function rootForms(it) {
  return String(it.root)
    .split(/[/,]/)
    .map((f) => f.trim().replace(/^-+|-+$/g, "").toLowerCase())
    .filter((f) => f.length >= 3)
    .flatMap((f) => (f.endsWith("y") && f.length >= 4 ? [f, f.slice(0, -1)] : [f])); // -logy also matches -logist
}

/** Find an item by id, root form, term, origin word, example word or Greek spelling. */
export function explain(term) {
  const q = norm(term).replace(/^-+|-+$/g, "");
  if (!q) throw new Error("Give a word, root or idea to look up.");
  const all = [...IX.items.values()];
  const keys = (it) => {
    const k = [it.id];
    if (it.kind === "root") k.push(...rootForms(it), it.tr, ...it.ex.map((e) => e[0]));
    if (it.kind === "idea") k.push(it.term, it.tr);
    if (it.kind === "origin") k.push(it.w);
    if (it.gr) k.push(it.gr);
    return k.map(norm);
  };
  const exact = all.filter((it) => keys(it).includes(q));
  const loose = exact.length ? [] : all.filter((it) => keys(it).some((k) => k.startsWith(q) || (q.length >= 4 && q.startsWith(k) && k.length >= 3)));
  const hits = exact.length ? exact : loose;
  if (!hits.length) return { text: `No card for "${term}". Try break_down_word to spot Greek roots inside it.`, found: false };
  const [first, ...rest] = hits;
  const unit = COURSE.units.find((u) => u.id === first.unitId);
  return {
    found: true,
    text: [itemCard(first), `(Unit: ${unit ? unit.title : "General"})`, ...(rest.length ? [``, `Also matches: ${rest.slice(0, 5).map((r) => E.labelOf(r)).join(", ")}`] : [])].join("\n"),
  };
}

/** Spot known Greek roots inside any English word. Spelling-based: say so. */
export function breakDown(word) {
  const w = String(word).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  if (w.length < 3) throw new Error("Give a whole English word, like photophobia.");
  const cands = [];
  for (const it of IX.roots) {
    for (const f of rootForms(it)) {
      for (let i = w.indexOf(f); i >= 0; i = w.indexOf(f, i + 1)) cands.push({ start: i, end: i + f.length, form: f, it });
    }
  }
  // Longest matches first, then left to right; keep non-overlapping ones.
  cands.sort((a, b) => b.end - b.start - (a.end - a.start) || a.start - b.start);
  const picked = [];
  for (const c of cands) if (!picked.some((p) => c.start < p.end && p.start < c.end)) picked.push(c);
  picked.sort((a, b) => a.start - b.start);
  // A 3-letter form alone in the middle of a word is usually a coincidence ("pan" in "company").
  // Allow up to 3 connector letters between roots (derm-ato-log).
  const near = (a, b) => (b.start >= a.end && b.start - a.end <= 3) || (a.start >= b.end && a.start - b.end <= 3);
  const kept = picked.filter((c) => c.form.length > 3 || c.start === 0 || picked.some((o) => o !== c && near(o, c)));
  if (!kept.length) {
    const own = [...IX.items.values()].find((it) => it.kind !== "root" && norm(E.labelOf(it)) === w);
    if (own) return { found: true, roots: [], text: itemCard(own) };
    return { found: false, text: `No Greek roots from the Skepsis course found in "${word}". It may be Latin, French, or a Greek root the course doesn't cover yet.` };
  }
  const parts = [];
  let pos = 0;
  for (const c of kept) {
    if (c.start > pos) parts.push(`${w.slice(pos, c.start)}`);
    parts.push(`${w.slice(c.start, c.end)} (${c.it.m})`);
    pos = c.end;
  }
  if (pos < w.length) parts.push(w.slice(pos));
  const own = [...IX.items.values()].find((it) => it.kind !== "root" && norm(E.labelOf(it)) === w);
  const lines = [
    ...(own ? [`Skepsis has a card for this word: ${itemCard(own).split("\n")[0]}`, own.kind === "idea" ? `Story: ${own.story}` : "", "Spelling-level parts (may not be the real history):"].filter(Boolean) : []),
    `**${word}** ≈ ${parts.join(" + ")}`,
    ...kept.map((c) => `- ${c.it.root} (${c.it.gr}) = ${c.it.m}. Also in: ${c.it.ex.map((e) => e[0]).join(", ")}`),
    "Matched by spelling, so double-check odd results with a dictionary.",
  ];
  return { found: true, roots: kept.map((c) => c.it.id), text: lines.join("\n") };
}

/** Same pick as the web app: one item per day for everyone. */
export function rootOfTheDay(day = today()) {
  const all = [...IX.items.values()].filter((x) => x.kind !== "origin");
  const n = Math.abs(E.daysBetween("2026-01-01", day));
  return all[(n * 7) % all.length];
}

export function progressText(S) {
  const t = today();
  const next = E.nextNode(IX, S);
  const acc = S.answered ? Math.round((S.correct / S.answered) * 100) : 0;
  const badges = E.BADGES.filter((b) => S.badges[b.id]).map((b) => b.name);
  return [
    `XP: ${S.xp} total · ${S.days[t] || 0} today (goal ${S.goal}) · ${E.weekXp(S, t)} this week`,
    `Streak: ${E.liveStreak(S, t)} days (best ${S.bestStreak}) · freezes: ${S.freezes} · weekends never break it`,
    `Learned: ${Object.keys(S.items).length} of ${IX.items.size} · due for review: ${E.dueItems(S, t).length} · accuracy ${acc}%`,
    `Lessons done: ${Object.keys(S.done).length} of ${E.pathNodes(IX).length}${next ? ` · next: ${next.id} (${next.title})` : ""}`,
    `Laurels: ${badges.length ? badges.join(", ") : "none yet"}`,
    `Saved in ${progressPath().replace(os.homedir(), "~")}`,
  ].join("\n");
}
