// Logos game logic: dates, spaced review, question builders, ranks, badges and the calendar reminder.
// No DOM access, so `npm test` can check everything. Content comes in as an array of unit objects
// (see CONTENT_SCHEMA.md); `indexCourse` makes it queryable.
//
// The rules this file protects: every answer is a tap, nothing is timed, nothing can be failed,
// and every episode is open from the start.

const Engine = (() => {
  // ---------- dates (local calendar days as "YYYY-MM-DD") ----------
  function dayKey(d = new Date()) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function parseDay(key) {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d, 12); // noon avoids DST edge cases
  }
  function addDays(key, n) {
    const d = parseDay(key);
    d.setDate(d.getDate() + n);
    return dayKey(d);
  }
  function daysBetween(a, b) {
    return Math.round((parseDay(b) - parseDay(a)) / 86400000);
  }
  /** "today", "tomorrow", "in 3 days": when a day is, seen from `today`. */
  function inDays(today, day) {
    const n = daysBetween(today, day);
    return n <= 0 ? "today" : n === 1 ? "tomorrow" : `in ${n} days`;
  }

  // ---------- state ----------
  function freshState() {
    return {
      v: 3,
      onboarded: false,
      name: "",
      sound: false,
      theme: "system",
      xp: 0, // earned by finishing, never reduced and never based on answers
      streak: 0,
      bestStreak: 0,
      lastDay: null,
      freezes: 1, // forgiven weekdays
      freezeWeek: null,
      days: {}, // dayKey -> runs finished that day
      done: {}, // lessonId | roundupId -> { at: first finished, last: most recent, n: times finished }
      items: {}, // term itemId -> { box, due, right, wrong }
      comebacks: 0, // refreshes finished on a later day than the first episode
      badges: {}, // badgeId -> dayKey
      exams: {}, // examId -> { best, total, last, at }: questions right on the first try
      reminder: null, // { freq, time, at } once a calendar file was downloaded
      updatedAt: 0,
    };
  }

  /** Whitelist saved or imported progress. Content and code never come from a backup. Saves from the first version of Logos load cleanly. */
  function normalizeState(raw, ix) {
    const out = freshState();
    const object = (v) => v && typeof v === "object" && !Array.isArray(v);
    if (!object(raw)) return out;
    const count = (v, max = 1000000000) => (Number.isFinite(v) && v >= 0 ? Math.min(max, Math.floor(v)) : 0);
    const date = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && dayKey(parseDay(v)) === v;
    const entries = (v) => (object(v) ? Object.entries(v) : []);
    const nodes = new Set(pathNodes(ix).map((n) => n.id));
    for (const k of ["onboarded", "sound"]) if (typeof raw[k] === "boolean") out[k] = raw[k];
    if (typeof raw.name === "string") out.name = raw.name.slice(0, 30);
    if (["system", "light", "dark"].includes(raw.theme)) out.theme = raw.theme;
    for (const [d, n] of entries(raw.days)) if (date(d) && Number.isFinite(n) && n > 0) out.days[d] = count(n);
    for (const [id, v] of entries(raw.done)) if (nodes.has(id) && object(v) && date(v.at)) {
      const last = date(v.last) && v.last >= v.at ? v.last : v.at;
      out.done[id] = { at: v.at, last, n: Math.max(1, count(v.n, 100000)) };
    }
    for (const [id, v] of entries(raw.items)) if (ix.items.has(id) && ix.items.get(id).kind === "term" && object(v) && date(v.due)) {
      out.items[id] = { box: Math.max(1, count(v.box, INTERVALS.length)), due: v.due, right: count(v.right), wrong: count(v.wrong) };
    }
    out.comebacks = count(raw.comebacks);
    for (const [id, v] of entries(raw.exams)) if (nodes.has(id) && id.endsWith("-exam") && object(v) && date(v.at)) {
      const total = count(v.total, 100);
      if (total) out.exams[id] = { best: Math.min(total, count(v.best)), total, last: Math.min(total, count(v.last)), at: v.at };
    }
    for (const k of ["xp", "streak", "bestStreak"]) out[k] = count(raw[k]);
    out.bestStreak = Math.max(out.streak, out.bestStreak);
    if (Number.isFinite(raw.freezes) && raw.freezes >= 0) out.freezes = count(raw.freezes, MAX_FREEZES);
    for (const k of ["lastDay", "freezeWeek"]) if (date(raw[k])) out[k] = raw[k];
    for (const [id, at] of entries(raw.badges)) if (BADGES.some((b) => b.id === id) && date(at)) out.badges[id] = at;
    if (object(raw.reminder) && REMINDER_FREQS.includes(raw.reminder.freq) && REMINDER_TIMES.some((t) => t.time === raw.reminder.time) && date(raw.reminder.at)) {
      out.reminder = { freq: raw.reminder.freq, time: raw.reminder.time, at: raw.reminder.at };
    }
    out.updatedAt = count(raw.updatedAt, 30000000000000);
    return out;
  }

  // ---------- XP and streak (the family rules: weekends never break it, one missed weekday a week is forgiven) ----------
  const MAX_FREEZES = 2;
  const XP = { lesson: 10, refresh: 5, exam: 15 };
  function weekKey(key) {
    const d = parseDay(key);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return dayKey(d);
  }
  const isWeekend = (key) => [0, 6].includes(parseDay(key).getDay());
  function missedWeekdays(a, b) {
    let n = 0;
    for (let i = 1; i < daysBetween(a, b); i++) if (!isWeekend(addDays(a, i))) n++;
    return n;
  }
  function touchStreak(s, today) {
    const out = { streakUp: false, usedFreeze: 0, reset: false };
    const wk = weekKey(today);
    if (s.freezeWeek !== wk) { s.freezeWeek = wk; if (s.freezes < 1) s.freezes = 1; }
    if (s.lastDay === today) return out;
    if (s.lastDay && s.lastDay > today) { if (s.lastDay > addDays(today, 1)) s.lastDay = today; return out; } // travel or a changed clock
    if (!s.lastDay) s.streak = 1;
    else {
      const missed = missedWeekdays(s.lastDay, today);
      if (missed === 0) s.streak += 1;
      else if (missed <= s.freezes) { s.freezes -= missed; out.usedFreeze = missed; s.streak += 1; }
      else { s.streak = 1; out.reset = true; }
    }
    out.streakUp = true;
    s.lastDay = today;
    s.bestStreak = Math.max(s.bestStreak, s.streak);
    if (s.streak % 7 === 0 && s.freezes < MAX_FREEZES) s.freezes += 1;
    return out;
  }
  function liveStreak(s, today) {
    if (!s.lastDay) return 0;
    if (s.lastDay >= today) return s.streak;
    const available = s.freezeWeek !== weekKey(today) ? Math.max(1, s.freezes) : s.freezes;
    return missedWeekdays(s.lastDay, today) <= available ? s.streak : 0;
  }
  /** Finishing always earns the same XP, however the answers went. */
  function awardFinish(s, mode, today) {
    const xp = XP[mode] || XP.refresh;
    s.xp += xp;
    return { xp, ...touchStreak(s, today) };
  }

  // ---------- spaced review (Leitner boxes) ----------
  // The gap grows each time an idea is remembered on schedule: 1 day, then 3, 7, 14, 30 and 60.
  const INTERVALS = [1, 3, 7, 14, 30, 60];
  function learn(s, id, today) {
    if (!s.items[id]) s.items[id] = { box: 1, due: addDays(today, INTERVALS[0]), right: 0, wrong: 0 };
  }
  /**
   * Record one answer. A missed tap question sends the idea back to tomorrow. `soft` (a self-checked
   * recall card marked "Show me again") only steps back one gap. The learner never sees any of this.
   */
  function grade(s, id, correct, today, { soft = false } = {}) {
    const wasDue = !s.items[id] || s.items[id].due <= today;
    learn(s, id, today);
    const it = s.items[id];
    if (correct) {
      it.right += 1;
      if (wasDue) it.box = Math.min(it.box + 1, INTERVALS.length);
    } else {
      it.wrong += 1;
      it.box = soft ? Math.max(1, it.box - 1) : 1;
    }
    // Early correct practice never postpones a review: only a miss or a due idea is rescheduled.
    if (!correct || wasDue) it.due = addDays(today, INTERVALS[it.box - 1]);
  }
  /** Ideas ready for a refresh today, the longest-waiting first. */
  function dueItems(s, today) {
    return Object.entries(s.items)
      .filter(([, v]) => v.due <= today)
      .sort((a, b) => (a[1].due < b[1].due ? -1 : a[1].due > b[1].due ? 1 : a[1].box - b[1].box))
      .map(([k]) => k);
  }
  /** The next day any of `ids` (default: every learned idea) comes back, or null. */
  function nextDue(s, ids = Object.keys(s.items)) {
    let best = null;
    for (const id of ids) { const v = s.items[id]; if (v && (!best || v.due < best)) best = v.due; }
    return best;
  }
  const MEMORY_LABELS = ["Not started", "New", "New", "Settling", "Settling", "Sticking", "Long-term"];
  /** How well one episode is remembered: ideas seen, ideas ready today, and a 0-6 level (the average gap reached). */
  function lessonMemory(ix, s, lessonId, today) {
    const terms = lessonTerms(ix, lessonId);
    const seen = terms.filter((it) => s.items[it.id]);
    const due = seen.filter((it) => s.items[it.id].due <= today).length;
    const level = seen.length ? Math.max(1, Math.round(seen.reduce((a, it) => a + s.items[it.id].box, 0) / seen.length)) : 0;
    return { total: terms.length, seen: seen.length, due, level, max: INTERVALS.length, label: MEMORY_LABELS[level] };
  }

  // ---------- text helpers ----------
  const normCache = new Map();
  /** Lowercase, strip accents, punctuation and articles, collapse spaces. */
  function norm(str) {
    const key = String(str || "");
    let out = normCache.get(key);
    if (out === undefined) {
      out = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "")
        .replace(/[.,;:!?"“”«»()[\]{}\-–—/\\]/g, " ").replace(/\b(?:a|an|the)\b/g, " ").replace(/\s+/g, " ").trim();
      if (normCache.size > 50000) normCache.clear();
      normCache.set(key, out);
    }
    return out;
  }
  /** End a phrase with a full stop unless it already ends in terminal punctuation. */
  function dot(str) {
    const t = String(str == null ? "" : str).trim();
    return !t || /[.?!…)"”']$/.test(t) ? t : `${t}.`;
  }

  // ---------- course index ----------
  const KINDS = ["term", "pairs"];
  const STATUS_LABELS = { history: "History", idea: "Philosophical idea", legend: "Ancient story", example: "Modern example" };
  function sortUnits(units) {
    const n = (u) => parseInt(String(u.id).replace(/^u/, ""), 10) || 999;
    return units.slice().sort((a, b) => n(a) - n(b));
  }
  function indexCourse(units) {
    const course = { units: sortUnits(units) };
    const items = new Map();
    const lessons = [];
    const terms = [];
    for (const u of course.units) {
      for (const l of u.lessons) {
        lessons.push({ ...l, unitId: u.id });
        for (const it of l.items) {
          const full = { ...it, lessonId: l.id, unitId: u.id, episode: l.episode };
          items.set(it.id, full);
          if (it.kind === "term") terms.push(full);
        }
      }
    }
    lessons.sort((a, b) => (a.episode || 0) - (b.episode || 0));
    const lessonMap = new Map(lessons.map((l) => [l.id, l]));
    return { course, items, lessons, terms, unitOf: (id) => course.units.find((u) => u.id === id), lessonOf: (id) => lessonMap.get(id) };
  }
  const lessonItems = (ix, lessonId, kind) => {
    const l = ix.lessonOf(lessonId);
    return l ? l.items.filter((it) => it.kind === kind).map((it) => ix.items.get(it.id)) : [];
  };
  const lessonTerms = (ix, lessonId) => lessonItems(ix, lessonId, "term");

  // ---------- path: every episode is open; an era exam appears once the era has two episodes ----------
  const EXAM_MIN = 2;
  function pathNodes(ix) {
    const nodes = [];
    for (const u of ix.course.units) {
      for (const l of u.lessons) nodes.push({ id: l.id, unitId: u.id, title: l.title, kind: "lesson", episode: l.episode });
      if (u.lessons.length >= EXAM_MIN) nodes.push({ id: `${u.id}-exam`, unitId: u.id, title: `${u.title} exam`, kind: "exam" });
    }
    return nodes;
  }
  /** Episodes are always open. An era exam opens once every episode in the era is done. */
  function isOpen(ix, s, nodeId) {
    const n = pathNodes(ix).find((x) => x.id === nodeId);
    if (!n) return false;
    if (n.kind === "lesson") return true; // listen in any order
    return ix.unitOf(n.unitId).lessons.every((l) => s.done[l.id]);
  }
  /** The earliest episode that has not been finished yet, or null when every episode is done. */
  function nextNode(ix, s) {
    const l = ix.lessons.find((x) => !s.done[x.id]);
    return l ? pathNodes(ix).find((n) => n.id === l.id) : null;
  }

  // ---------- randomness ----------
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, r) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- question builders ----------
  // Every question is a tap. Three options at most: fewer wrong options means fewer wrong ideas to remember.
  const OPTIONS = 3;
  /** The small label above a card or question: "Thinker", "Idea", or the status of a card that is neither (a group label such as Presocratics is "History"). */
  const typeLabel = (it) => (it.person ? "Thinker" : it.status && it.status !== "idea" && STATUS_LABELS[it.status] ? STATUS_LABELS[it.status] : "Idea");
  /** The question a card asks: the authored `ask`, or "Who was Thales?" / "What does Monism mean?". */
  const askOf = (it) => it.ask || (it.person ? `Who was ${it.term}?` : `What does ${it.term} mean?`);
  /**
   * Wrong options for `it`, the most similar first: the same episode and the same type (thinkers with
   * thinkers), then the same episode, the same era, and anywhere. Never a card with the same name or meaning.
   */
  function distractors(ix, it, r, n = OPTIONS - 1) {
    const seenTerm = new Set([norm(it.term)]);
    const seenMeaning = new Set([norm(it.meaning)]);
    const out = [];
    const tiers = [
      (x) => x.lessonId === it.lessonId && !!x.person === !!it.person,
      (x) => x.lessonId === it.lessonId,
      (x) => x.unitId === it.unitId,
      () => true,
    ];
    for (const tier of tiers) {
      for (const x of shuffle(ix.terms.filter(tier), r)) {
        if (out.length === n) return out;
        if (x.id === it.id || seenTerm.has(norm(x.term)) || seenMeaning.has(norm(x.meaning))) continue;
        seenTerm.add(norm(x.term)); seenMeaning.add(norm(x.meaning));
        out.push(x);
      }
    }
    return out;
  }
  /** "Who was Thales?" with three descriptions to pick from. */
  function qMeaning(ix, it, r) {
    const wrong = distractors(ix, it, r);
    if (!wrong.length) return null;
    return { type: "mcq", form: "meaning", itemId: it.id, label: typeLabel(it), prompt: askOf(it), mark: it.term, options: shuffle([it.meaning, ...wrong.map((x) => x.meaning)], r), answer: it.meaning };
  }
  /** A description with three names to pick from. */
  function qReverse(ix, it, r) {
    const wrong = distractors(ix, it, r);
    if (!wrong.length) return null;
    return { type: "mcq", form: "reverse", itemId: it.id, label: typeLabel(it), prompt: it.person ? "Who is this?" : "What is this called?", quote: it.meaning, options: shuffle([it.term, ...wrong.map((x) => x.term)], r), answer: it.term };
  }
  /** One tap question about an idea; `i` alternates the two forms. */
  const qTerm = (ix, it, r, i = 0) => (i % 2 ? qReverse(ix, it, r) || qMeaning(ix, it, r) : qMeaning(ix, it, r) || qReverse(ix, it, r));
  /** The "Who said what?" match: at most five pairs on screen. */
  const MATCH_MAX = 5;
  function qPairs(it, r) {
    const uniq = [];
    const seenL = new Set(), seenR = new Set();
    for (const p of shuffle(it.pairs, r)) {
      const a = norm(p.l), b = norm(p.r);
      if (seenL.has(a) || seenR.has(b)) continue;
      seenL.add(a); seenR.add(b); uniq.push([p.l, p.r]);
      if (uniq.length === MATCH_MAX) break;
    }
    if (uniq.length < 3) return null;
    return { type: "match", itemId: it.id, label: it.set || "Match", prompt: "Tap a name, then its idea.", pairs: uniq, left: shuffle(uniq.map((p) => p[0]), r), right: shuffle(uniq.map((p) => p[1]), r) };
  }
  /** A self-checked recall card: the question first, the answer after a tap. */
  function recallCard(it) {
    return { itemId: it.id, label: typeLabel(it), episode: it.episode, ask: askOf(it), mark: it.term, hint: it.hook || (it.literal ? `Literally: ${it.literal}` : ""), back: it.meaning, more: it.use || it.say || "" };
  }
  /**
   * What Flux says once the right answer is on screen. On a first-try hit it adds something new rather
   * than repeating the option just tapped; after a slip it restates the idea in full.
   */
  function feedbackText(it, firstTry) {
    if (firstTry) return dot(it.use || it.say);
    return `${it.term}: ${dot(it.meaning)} ${dot(it.say)}`.trim();
  }

  // ---------- runs ----------
  /** Split n ideas into small teaching groups of two or three. */
  function chunkSizes(n) {
    if (n <= 3) return n ? [n] : [];
    const groups = Math.ceil(n / 3);
    const base = Math.floor(n / groups);
    return Array.from({ length: groups }, (_, i) => base + (i < n % groups ? 1 : 0));
  }
  /**
   * A first listen: the 30-second recap, then the ideas in small groups. Each group is two or three
   * short cards followed by one easy question per card, in a different order, so a question never
   * comes straight after the card that answers it. The "Who said what?" match closes the episode.
   */
  function buildLesson(ix, s, lessonId, seed) {
    const r = rng(seed);
    const lesson = ix.lessonOf(lessonId);
    if (!lesson) return [];
    const steps = [{ type: "recap", lessonId }];
    const terms = lessonTerms(ix, lessonId);
    let at = 0, asked = 0;
    for (const size of chunkSizes(terms.length)) {
      const group = terms.slice(at, at + size);
      at += size;
      for (const it of group) steps.push({ type: "card", itemId: it.id });
      let order = shuffle(group, r);
      if (order.length > 1 && order[0] === group[group.length - 1]) order = order.slice(1).concat(order[0]);
      for (const it of order) { const q = qTerm(ix, it, r, asked++); if (q) steps.push(q); }
    }
    for (const it of lessonItems(ix, lessonId, "pairs")) { const q = qPairs(it, r); if (q) steps.push(q); }
    return steps;
  }

  const REFRESH_N = 6;
  /**
   * Ideas for a refresh: those ready today first (longest-waiting first), then the least settled. Ideas
   * that tie are put in a seeded random order, with the ones missed most often first, so a "refresh
   * anyway" does not keep asking the same six while the rest of an episode waits.
   */
  function refreshPool(ix, s, { lessonId = null, today, seed = 1 }) {
    const pool = lessonId ? lessonTerms(ix, lessonId) : ix.terms.filter((it) => s.items[it.id]);
    const key = (it) => { const v = s.items[it.id]; return v ? [v.due <= today ? 0 : 1, v.due, v.box, -v.wrong] : [0, "", 0, 0]; };
    return shuffle(pool, rng(seed)).map((it, i) => [key(it), i, it])
      .sort((a, b) => a[0][0] - b[0][0] || (a[0][1] < b[0][1] ? -1 : a[0][1] > b[0][1] ? 1 : 0) || a[0][2] - b[0][2] || a[0][3] - b[0][3] || a[1] - b[1])
      .map((x) => x[2]);
  }
  /**
   * A return visit: remember first, then peek. Up to six recall cards (think of the answer, tap to
   * check, mark it yourself). A single episode's refresh then replays its match and ends on the recap;
   * the mixed refresh draws from every episode heard so far.
   */
  function buildRefresh(ix, s, { lessonId = null, seed, today, n = REFRESH_N }) {
    const r = rng(seed);
    const picked = refreshPool(ix, s, { lessonId, today, seed }).slice(0, n);
    if (!picked.length) return [];
    const steps = [{ type: "recall", cards: shuffle(picked, r).map(recallCard) }];
    if (lessonId) {
      for (const it of lessonItems(ix, lessonId, "pairs")) { const q = qPairs(it, r); if (q) steps.push(q); }
      steps.push({ type: "recap", lessonId, closing: true });
    }
    return steps;
  }
  // ---------- thinkers, timeline and era exam ----------
  /** The groups the timeline colors thinkers by. */
  const SCHOOLS = {
    milesian: "Milesians", ephesian: "A loner, no school", pythagorean: "Pythagoreans", eleatic: "Eleatics",
    pluralist: "Pluralists", atomist: "Atomists", sophist: "Sophists", socratic: "Socrates", platonic: "Plato's Academy", peripatetic: "Aristotle's school",
  };
  const fmtYear = (y) => (y < 0 ? `${-y} BCE` : `${y} CE`);
  /** Every thinker once (first listing wins), with the episodes they appear in, oldest first. */
  function thinkersOf(ix, unitId = null) {
    const byId = new Map();
    for (const l of ix.lessons) {
      if (unitId && l.unitId !== unitId) continue;
      for (const th of l.thinkers || []) {
        const e = byId.get(th.id);
        if (e) { if (!e.episodes.includes(l.episode)) e.episodes.push(l.episode); e.lessonIds.push(l.id); continue; }
        byId.set(th.id, { ...th, episodes: [l.episode], lessonIds: [l.id] });
      }
    }
    const key = (x) => (Number.isFinite(x.from) ? x.from : x.sort);
    return [...byId.values()].sort((a, b) => key(a) - key(b) || a.sort - b.sort);
  }
  /** "Who was born first?" from three thinkers born at least 25 years apart, so it is never a coin toss. */
  const BORN_GAP = 30;
  function qBornFirst(people, r, avoid = new Set()) {
    const dated = people.filter((p) => Number.isFinite(p.from));
    for (let k = 0; k < 60; k++) {
      const pick = shuffle(dated, r).slice(0, OPTIONS).sort((a, b) => a.from - b.from);
      if (pick.length < OPTIONS || avoid.has(pick[0].id)) continue;
      if (!pick.every((p, i) => i === 0 || p.from - pick[i - 1].from >= BORN_GAP)) continue;
      return { type: "mcq", form: "born", itemId: null, thinkerId: pick[0].id, label: "Timeline", prompt: "Who was born first?",
        options: shuffle(pick.map((p) => p.name), r), answer: pick[0].name,
        hint: `The earliest of these three came from ${pick[0].place}.`,
        explain: `${pick.map((p) => `${p.name} (born c. ${fmtYear(p.from)})`).join(", then ")}.` };
    }
    return null;
  }
  /**
   * Groups that overlap, so they are never offered as a wrong answer for each other: atomists are a kind
   * of pluralist, and some thinkers also drew on a second group (Empedocles on the Pythagoreans and
   * Parmenides, Parmenides on a Pythagorean teacher, Plato on Socrates, Aristotle on Plato's Academy).
   */
  const SCHOOL_OVERLAP = { atomist: ["pluralist"], pluralist: ["atomist"] };
  const PERSON_OVERLAP = { empedocles: ["pythagorean", "eleatic"], parmenides: ["pythagorean"], plato: ["socratic"], aristotle: ["platonic"] };
  /** "Which group is Parmenides usually placed with?", against the other groups in the course that do not also fit. */
  function qSchool(p, everyone, r) {
    if (!SCHOOLS[p.school]) return null;
    const fits = new Set([p.school, ...(SCHOOL_OVERLAP[p.school] || []), ...(PERSON_OVERLAP[p.id] || [])]);
    const others = [...new Set(everyone.map((x) => x.school).filter((x) => SCHOOLS[x] && !fits.has(x)))];
    if (others.length < OPTIONS - 1) return null;
    return { type: "mcq", form: "school", itemId: null, thinkerId: p.id, label: "Schools", prompt: `Which group is ${p.name} usually placed with?`, mark: p.name,
      options: shuffle([p.school, ...shuffle(others, r).slice(0, OPTIONS - 1)], r).map((x) => SCHOOLS[x]), answer: SCHOOLS[p.school],
      hint: `${p.name}: ${dot(p.idea)}`, explain: `${p.name}: ${SCHOOLS[p.school]}. ${dot(p.idea)}` };
  }
  /** One line of a "Who said what?" match, asked the other way round. */
  function qWhoSaid(it, r) {
    const pair = shuffle(it.pairs, r)[0];
    const names = [...new Set(it.pairs.map((x) => x.l).filter((l) => norm(l) !== norm(pair.l)))];
    if (names.length < OPTIONS - 1) return null;
    return { type: "mcq", form: "who", itemId: null, label: it.set || "Who said what?", prompt: "Who is this idea linked to?", quote: pair.r,
      options: shuffle([pair.l, ...shuffle(names, r).slice(0, OPTIONS - 1)], r), answer: pair.l, hint: "", explain: `${pair.l}: ${dot(pair.r)}` };
  }
  const EXAM_TERMS = 7;
  /**
   * An era exam: about a dozen tap questions mixing the era's ideas (spread evenly over its episodes)
   * with two timeline questions, two school questions and one "who said what". Still three options,
   * still a second go after a wrong tap; the exam only counts how many were right on the first try.
   */
  function buildExam(ix, s, unitId, seed) {
    const r = rng(seed);
    const unit = ix.unitOf(unitId);
    if (!unit) return [];
    const queues = unit.lessons.map((l) => shuffle(lessonTerms(ix, l.id), r)).filter((q) => q.length);
    const picked = [];
    while (picked.length < EXAM_TERMS && queues.some((q) => q.length)) for (const q of queues) if (q.length && picked.length < EXAM_TERMS) picked.push(q.shift());
    const qs = picked.map((it, i) => qTerm(ix, it, r, i)).filter(Boolean);
    const people = thinkersOf(ix, unitId), everyone = thinkersOf(ix);
    const used = new Set();
    for (let k = 0; k < 2; k++) { const q = qBornFirst(people, r, used); if (q) { used.add(q.thinkerId); qs.push(q); } }
    for (const p of shuffle(people.filter((x) => SCHOOLS[x.school]), r).slice(0, 2)) { const q = qSchool(p, everyone, r); if (q) qs.push(q); }
    const matches = unit.lessons.flatMap((l) => lessonItems(ix, l.id, "pairs"));
    if (matches.length) { const q = qWhoSaid(shuffle(matches, r)[0], r); if (q) qs.push(q); }
    return shuffle(qs, r).map((q) => ({ ...q, exam: true }));
  }

  // ---------- ranks: one step up for listening, never for speed or accuracy ----------
  const RANKS = [
    { id: "listener", name: "Listener", episodes: 0, note: "Every philosopher starts by listening." },
    { id: "questioner", name: "Questioner", episodes: 3, note: "You have started asking why." },
    { id: "agora", name: "Student of the Agora", episodes: 10, note: "The agora was the Athenian square where Socrates asked his questions." },
    { id: "skeptic", name: "Friendly Skeptic", episodes: 25, note: "From the Greek skepsis, 'inquiry'." },
    { id: "dialectician", name: "Dialectician", episodes: 50, note: "Dialectic is testing ideas through question and answer." },
    { id: "peripatetic", name: "Peripatetic", episodes: 100, note: "Named after the covered walks of Aristotle's school." },
    { id: "scholar", name: "Scholar", episodes: 150, note: "From the Greek schole, 'leisure': free time spent thinking." },
    { id: "lover", name: "Lover of Wisdom", episodes: 200, note: "What the word 'philosopher' literally means." },
  ];
  function episodesDone(ix, s) { return ix.lessons.filter((l) => s.done[l.id]).length; }
  function rankOf(ix, s) {
    const n = episodesDone(ix, s);
    let cur = RANKS[0];
    for (const r of RANKS) if (n >= r.episodes) cur = r;
    const next = RANKS[RANKS.indexOf(cur) + 1] || null;
    return { rank: cur, next, toNext: next ? next.episodes - n : 0 };
  }

  // ---------- badges ----------
  // `open` hides a badge until the course has enough episodes to earn it.
  const boxCount = (s, box) => Object.values(s.items).filter((x) => x.box >= box).length;
  const BADGES = [
    { id: "first_step", name: "First question", desc: "Finish your first episode", test: (s, ix) => episodesDone(ix, s) >= 1 },
    { id: "came_back", name: "Came back", desc: "Refresh on a later day", test: (s) => s.comebacks >= 1 },
    { id: "made_to_stick", name: "Made to stick", desc: "Remember 5 ideas on two reviews", test: (s) => boxCount(s, 3) >= 5 },
    { id: "long_memory", name: "Long memory", desc: "Carry an idea for a month", test: (s) => boxCount(s, 5) >= 1 },
    { id: "five_episodes", name: "Regular listener", desc: "Finish 5 episodes", open: (ix) => ix.lessons.length >= 5, test: (s, ix) => episodesDone(ix, s) >= 5 },
    { id: "roundup", name: "Exam day", desc: "Finish an era exam", open: (ix) => ix.course.units.some((u) => u.lessons.length >= EXAM_MIN), test: (s) => Object.keys(s.done).some((id) => id.endsWith("-exam")) },
    { id: "exam_sharp", name: "Sharp memory", desc: "Every exam question right on the first try", open: (ix) => ix.course.units.some((u) => u.lessons.length >= EXAM_MIN), test: (s) => Object.values(s.exams || {}).some((e) => e.total > 0 && e.best >= e.total) },
  ];
  const badgeOpen = (b, ix) => !b.open || b.open(ix);
  function awardBadges(s, today, ix) {
    const fresh = [];
    for (const b of BADGES) if (!s.badges[b.id] && badgeOpen(b, ix) && b.test(s, ix)) { s.badges[b.id] = today; fresh.push(b); }
    return fresh;
  }

  // ---------- calendar reminder (a file the learner adds to their own calendar; nothing leaves the device) ----------
  const REMINDER_FREQS = ["weekly", "daily"];
  const REMINDER_TIMES = [
    { time: "08:00", label: "Morning" }, { time: "13:00", label: "Midday" },
    { time: "19:00", label: "Evening" }, { time: "21:30", label: "Night" },
  ];
  /** An .ics calendar file with one repeating five-minute event in the device's local time. */
  function reminderIcs({ freq = "weekly", time = "19:00", start, url, stamp = new Date() }) {
    if (!REMINDER_FREQS.includes(freq) || !REMINDER_TIMES.some((t) => t.time === time)) throw new Error("unknown reminder option");
    const day = start.replace(/-/g, "");
    const [h, m] = time.split(":").map(Number);
    const end = h * 60 + m + 5;
    const hm = (mins) => `${String(Math.floor(mins / 60)).padStart(2, "0")}${String(mins % 60).padStart(2, "0")}00`;
    const utc = stamp.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    // Calendar files fold lines longer than 75 characters; a folded line continues after a line break and one space.
    const fold = (line) => line.match(/.{1,74}/g).join("\r\n ");
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Logos//Refresh reminder//EN", "BEGIN:VEVENT",
      "UID:refresh-reminder@philosophy.tryskepsis.com", `DTSTAMP:${utc}`,
      `DTSTART:${day}T${hm(h * 60 + m)}`, `DTEND:${day}T${hm(end)}`,
      `RRULE:FREQ=${freq.toUpperCase()}`, "SUMMARY:Logos: a quick philosophy refresh",
      `DESCRIPTION:A minute with Flux to keep the episodes you heard. ${url}`, `URL:${url}`,
      "BEGIN:VALARM", "ACTION:DISPLAY", "TRIGGER:PT0M", "DESCRIPTION:Logos: a quick philosophy refresh", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"].map(fold).join("\r\n") + "\r\n";
  }

  return {
    INTERVALS, KINDS, STATUS_LABELS, RANKS, BADGES, OPTIONS, MATCH_MAX, REFRESH_N, EXAM_MIN, EXAM_TERMS, SCHOOLS, REMINDER_FREQS, REMINDER_TIMES,
    dayKey, parseDay, addDays, daysBetween, inDays, XP, MAX_FREEZES, weekKey, isWeekend, missedWeekdays, touchStreak, liveStreak, awardFinish,
    freshState, normalizeState, learn, grade, dueItems, nextDue, lessonMemory,
    norm, dot, indexCourse, sortUnits, lessonTerms, pathNodes, isOpen, nextNode,
    rng, shuffle, typeLabel, askOf, distractors, qMeaning, qReverse, qTerm, qPairs, recallCard, feedbackText,
    chunkSizes, buildLesson, refreshPool, buildRefresh, fmtYear, thinkersOf, qBornFirst, qSchool, qWhoSaid, buildExam,
    episodesDone, rankOf, badgeOpen, awardBadges, reminderIcs,
  };
})();

if (typeof module !== "undefined") module.exports = { Engine };
