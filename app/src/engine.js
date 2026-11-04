// Pure game logic for "Skepsis": dates, streaks, spaced review and question building.
// No DOM access here, so `node test/engine.test.js` can check it.

const Engine = (() => {
  // ---------- dates (local calendar days as "YYYY-MM-DD") ----------
  /** @param {Date} d */
  function dayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  /** @param {string} key */
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
  /** Monday of the week that holds `key`. Weekly league resets on Monday. */
  function weekKey(key) {
    const d = parseDay(key);
    const dow = (d.getDay() + 6) % 7; // Mon=0 .. Sun=6
    d.setDate(d.getDate() - dow);
    return dayKey(d);
  }
  function isWeekend(key) {
    const dow = parseDay(key).getDay();
    return dow === 0 || dow === 6;
  }
  /** Weekdays strictly between a and b (exclusive both ends). */
  function missedWeekdays(a, b) {
    let n = 0;
    for (let k = addDays(a, 1); k < b; k = addDays(k, 1)) if (!isWeekend(k)) n++;
    return n;
  }

  // ---------- state ----------
  const GOALS = [
    { xp: 10, label: "Quick", sub: "1 lesson · ~3 min" },
    { xp: 20, label: "Steady", sub: "2 lessons · ~6 min" },
    { xp: 40, label: "Hoplite", sub: "4 lessons · ~12 min" },
  ];
  const MAX_FREEZES = 2;

  function freshState() {
    return {
      v: 1,
      onboarded: false,
      goal: 10,
      board: false,
      sound: true,
      xp: 0,
      days: {}, // dayKey -> xp earned that day
      streak: 0,
      bestStreak: 0,
      lastDay: null,
      freezes: 1,
      freezeWeek: null,
      done: {}, // lessonId -> { perfect, at }
      items: {}, // itemId -> { box, due, right, wrong }
      rodeoBest: 0,
      practices: 0,
      answered: 0,
      correct: 0,
      badges: {}, // badgeId -> dayKey
      updatedAt: 0,
    };
  }

  /**
   * Record activity on `today` and update the streak.
   * Weekends never break a streak. A missed weekday uses a freeze if one is left.
   * Everyone gets one free freeze per week (capped at MAX_FREEZES).
   * @returns {{streakUp: boolean, usedFreeze: number, reset: boolean}}
   */
  function touchStreak(s, today) {
    const out = { streakUp: false, usedFreeze: 0, reset: false };
    const wk = weekKey(today);
    if (s.freezeWeek !== wk) {
      s.freezeWeek = wk;
      if (s.freezes < 1) s.freezes = 1;
    }
    if (s.lastDay === today) return out;
    if (!s.lastDay || s.lastDay > today) {
      s.streak = 1;
    } else {
      const missed = missedWeekdays(s.lastDay, today);
      if (missed === 0) {
        s.streak += 1;
      } else if (missed <= s.freezes) {
        s.freezes -= missed;
        out.usedFreeze = missed;
        s.streak += 1;
      } else {
        s.streak = 1;
        out.reset = true;
      }
    }
    out.streakUp = true;
    s.lastDay = today;
    if (s.streak > s.bestStreak) s.bestStreak = s.streak;
    if (s.streak > 0 && s.streak % 7 === 0 && s.freezes < MAX_FREEZES) s.freezes += 1;
    return out;
  }

  /** Streak as it stands today, without recording activity (0 if it has lapsed). */
  function liveStreak(s, today) {
    if (!s.lastDay) return 0;
    if (s.lastDay === today) return s.streak;
    const missed = missedWeekdays(s.lastDay, today);
    return missed <= s.freezes ? s.streak : 0;
  }

  function addXp(s, today, n) {
    s.xp += n;
    s.days[today] = (s.days[today] || 0) + n;
  }
  function weekXp(s, today) {
    const start = weekKey(today);
    let t = 0;
    for (const [k, v] of Object.entries(s.days)) if (k >= start && k <= today) t += v;
    return t;
  }

  // ---------- spaced review (Leitner boxes) ----------
  const INTERVALS = [1, 3, 7, 14, 30]; // days until the next review for box 1..5

  function learn(s, id, today) {
    if (!s.items[id]) s.items[id] = { box: 1, due: addDays(today, INTERVALS[0]), right: 0, wrong: 0 };
  }
  /** Grade one answer. A miss drops the item back to box 1. */
  function grade(s, id, correct, today) {
    learn(s, id, today);
    const it = s.items[id];
    if (correct) {
      it.right += 1;
      if (it.due <= today) it.box = Math.min(it.box + 1, INTERVALS.length);
    } else {
      it.wrong += 1;
      it.box = 1;
    }
    it.due = addDays(today, INTERVALS[it.box - 1]);
  }
  function dueItems(s, today) {
    return Object.entries(s.items)
      .filter(([, v]) => v.due <= today)
      .sort((a, b) => (a[1].due < b[1].due ? -1 : a[1].due > b[1].due ? 1 : a[1].box - b[1].box))
      .map(([k]) => k);
  }

  // ---------- course index ----------
  function indexCourse(course) {
    const items = new Map();
    const lessons = []; // in path order
    const unitOf = new Map();
    for (const u of course.units) {
      for (const l of u.lessons) {
        lessons.push({ ...l, unitId: u.id });
        for (const it of l.items) {
          items.set(it.id, { ...it, lessonId: l.id, unitId: u.id });
          unitOf.set(it.id, u.id);
        }
      }
    }
    const roots = [...items.values()].filter((i) => i.kind === "root");
    const ideas = [...items.values()].filter((i) => i.kind === "idea");
    const origins = [...items.values()].filter((i) => i.kind === "origin");
    const examples = roots.flatMap((r) => r.ex.map(([w, def, parts]) => ({ w, def, parts, rootId: r.id })));
    const tilePool = [...new Set(examples.flatMap((e) => e.parts))];
    return { course, items, lessons, unitOf, roots, ideas, origins, examples, tilePool };
  }

  /** Path order unlock: a lesson opens when the one before it is done. Each unit ends with a roundup. */
  function pathNodes(ix) {
    const nodes = [];
    for (const u of ix.course.units) {
      u.lessons.forEach((l, i) => nodes.push({ id: l.id, unitId: u.id, title: l.title, letter: GREEK_LETTERS[i] || "•", kind: "lesson" }));
      nodes.push({ id: `${u.id}-review`, unitId: u.id, title: "Unit roundup", letter: "Ω", kind: "roundup" });
    }
    return nodes;
  }
  const GREEK_LETTERS = ["α", "β", "γ", "δ", "ε", "ζ"];
  function nextNode(ix, s) {
    return pathNodes(ix).find((n) => !s.done[n.id]) || null;
  }
  function isUnlocked(ix, s, nodeId) {
    const nodes = pathNodes(ix);
    const i = nodes.findIndex((n) => n.id === nodeId);
    return i === 0 || (i > 0 && !!s.done[nodes[i - 1].id]) || !!s.done[nodeId];
  }

  // ---------- randomness ----------
  function rng(seed) {
    // mulberry32: small, seedable, good enough for shuffling
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
  function pickDistinct(pool, n, r, exclude = []) {
    const seen = new Set(exclude);
    const out = [];
    for (const x of shuffle(pool, r)) {
      if (seen.has(x)) continue;
      seen.add(x);
      out.push(x);
      if (out.length === n) break;
    }
    return out;
  }

  // ---------- question builders ----------
  // Every question: { type, itemId, ... } where type is intro | mcq | build | match | tf.
  const meaningOf = (it) => (it.kind === "root" ? it.m : it.m);
  const labelOf = (it) => (it.kind === "root" ? it.root : it.kind === "idea" ? it.term : it.w);
  const familyOf = (it) => (it.kind === "root" ? it.ex.map((e) => e[0]).join(" · ") : "");

  /** Distractor meanings: prefer look-alikes from the same unit (interleaving), then anything. */
  function meaningDistractors(ix, it, n, r) {
    const sameKind = [...ix.items.values()].filter((x) => x.kind === it.kind && x.id !== it.id && meaningOf(x) !== meaningOf(it));
    const sameUnit = sameKind.filter((x) => x.unitId === it.unitId).map(meaningOf);
    const other = sameKind.filter((x) => x.unitId !== it.unitId).map(meaningOf);
    const fromUnit = pickDistinct(sameUnit, Math.min(2, n), r, [meaningOf(it)]);
    return fromUnit.concat(pickDistinct(other, n - fromUnit.length, r, [meaningOf(it), ...fromUnit]));
  }

  function qMeaning(ix, it, r, label = "New word part") {
    const options = shuffle([meaningOf(it), ...meaningDistractors(ix, it, 3, r)], r);
    if (it.kind === "root") {
      return { type: "mcq", itemId: it.id, label, prompt: `What does <span class="w">${it.root}</span> mean?`, greek: it.gr, options, answer: meaningOf(it), explain: `${it.root} (${it.gr}) = ${it.m}.`, family: familyOf(it) };
    }
    return { type: "mcq", itemId: it.id, label, prompt: `What does <span class="w">${it.term}</span> mean?`, greek: it.gr, options, answer: meaningOf(it), explain: `${it.term}: literally "${it.lit}".` };
  }

  function qReverse(ix, it, r) {
    // meaning -> which root
    const pool = ix.roots.filter((x) => x.id !== it.id && x.m !== it.m).map((x) => x.root);
    const options = shuffle([it.root, ...pickDistinct(pool, 3, r, [it.root])], r);
    return { type: "mcq", itemId: it.id, label: "Recall", prompt: `Which Greek piece means <span class="w">"${it.m}"</span>?`, options, answer: it.root, explain: `${it.root} (${it.gr}) = ${it.m}.`, family: familyOf(it) };
  }

  /** Decode a word: show the word, pick its meaning. `guess` = pretest before the intro (no penalty). */
  function qDecode(ix, it, exIdx, r, { guess = false, label } = {}) {
    const [w, def] = it.ex[exIdx];
    const pool = ix.examples.filter((e) => e.w !== w && e.def !== def).map((e) => e.def);
    const options = shuffle([def, ...pickDistinct(pool, 3, r, [def])], r);
    return {
      type: "mcq", itemId: it.id, guess,
      label: label || (guess ? "Take a guess" : exIdx >= 2 ? "New word: decode it" : "Decode"),
      prompt: guess ? `You haven't learned this yet. What might <span class="w">${w}</span> mean?` : `What does <span class="w">${w}</span> mean?`,
      word: w, hl: it.root, options, answer: def,
      explain: `${w}: ${def}. Built on ${it.root} = ${it.m}.`, family: familyOf(it),
    };
  }

  function qBuild(ix, it, exIdx, r) {
    const [w, def, parts] = it.ex[exIdx];
    const extra = pickDistinct(ix.tilePool, Math.max(2, 5 - parts.length), r, parts);
    return { type: "build", itemId: it.id, label: "Build the word", prompt: `Build the word that means <span class="w">"${def}"</span>`, tiles: shuffle([...parts, ...extra], r), answer: parts, word: w, explain: `${parts.join(" + ")} = ${w}.`, family: familyOf(it) };
  }

  function qScenario(ix, it, r) {
    const options = shuffle([it.q.a, ...it.q.w], r);
    return { type: "mcq", itemId: it.id, label: "Use it at work", prompt: it.q.prompt, options, answer: it.q.a, explain: it.work };
  }

  function qStory(ix, it, r) {
    const pool = ix.ideas.filter((x) => x.id !== it.id).map((x) => x.term);
    const options = shuffle([it.term, ...pickDistinct(pool, 3, r, [it.term])], r);
    const clue = it.say.replace(new RegExp(it.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "____");
    return { type: "mcq", itemId: it.id, label: "Name that idea", prompt: clue, options, answer: it.term, explain: `${it.term} (${it.gr}): ${it.m}.` };
  }

  function qOrigin(it) {
    return { type: "tf", itemId: it.id, label: "Is it Greek?", word: it.w, answer: it.greek, explain: it.from };
  }

  function qMatch(ix, its, r) {
    const pairs = its.slice(0, 4).map((it) => [labelOf(it), meaningOf(it), it.id]);
    return { type: "match", itemId: null, label: "Match the pairs", pairs, left: shuffle(pairs.map((p) => p[0]), r), right: shuffle(pairs.map((p) => p[1]), r) };
  }

  /** One retrieval question for any learned item (used by review and rodeo). */
  function qReview(ix, it, r) {
    if (it.kind === "origin") return qOrigin(it);
    if (it.kind === "idea") return r() < 0.5 ? qMeaning(ix, it, r, "Review") : qScenario(ix, it, r);
    const roll = r();
    if (roll < 0.3) return qMeaning(ix, it, r, "Review");
    if (roll < 0.55) return qReverse(ix, it, r);
    if (roll < 0.8) return qDecode(ix, it, 2, r, { label: "Review: decode" });
    const bi = it.ex.findIndex((e) => e[2].length >= 2);
    return bi >= 0 ? qBuild(ix, it, bi, r) : qMeaning(ix, it, r, "Review");
  }

  /**
   * A lesson: guess first (pretest) -> each item's intro + quick check -> practice with
   * at least two unseen-word decodes -> a match round -> one or two interleaved review items.
   * `short` (a brand-new player's first lesson): no guess, no practice round, no review: just
   * each item's intro + quick check, then the match round. About 7 screens instead of 13.
   */
  function buildLesson(ix, s, lessonId, seed, { short = false } = {}) {
    const r = rng(seed);
    const lesson = ix.lessons.find((l) => l.id === lessonId);
    const its = lesson.items.map((x) => ix.items.get(x.id));
    const steps = [];

    if (its.every((x) => x.kind === "origin")) {
      steps.push({ type: "intro-origin" });
      for (const it of shuffle(its, r)) steps.push(qOrigin(it));
      return steps;
    }

    const firstRoot = its.find((x) => x.kind === "root");
    if (firstRoot && !short) steps.push(qDecode(ix, firstRoot, 2, r, { guess: true }));

    for (const it of its) {
      steps.push({ type: "intro", itemId: it.id });
      steps.push(it.kind === "root" ? qMeaning(ix, it, r) : qMeaning(ix, it, r, "New idea"));
    }
    if (short) {
      if (its.length >= 3) steps.push(qMatch(ix, its, r));
      return steps;
    }

    const practice = [];
    for (const it of its) {
      if (it.kind === "root") {
        practice.push(qDecode(ix, it, 2, r));
        const bi = it.ex.findIndex((e, i) => i < 2 && e[2].length >= 2);
        practice.push(bi >= 0 ? qBuild(ix, it, bi, r) : qReverse(ix, it, r));
      } else if (it.kind === "idea") {
        practice.push(qScenario(ix, it, r));
        practice.push(qStory(ix, it, r));
      }
    }
    const transfers = practice.filter((q) => q.label === "New word: decode it");
    const rest = shuffle(practice.filter((q) => !transfers.includes(q)), r);
    steps.push(...shuffle([...transfers, ...rest.slice(0, Math.max(2, 4 - transfers.length))], r));

    if (its.length >= 3) steps.push(qMatch(ix, its, r));

    // Interleave: one or two older items that are due (or weakest).
    const own = new Set(its.map((x) => x.id));
    const older = dueItems(s, dayKey()).filter((id) => !own.has(id) && ix.items.has(id)).slice(0, 2);
    for (const id of older) steps.push(qReview(ix, ix.items.get(id), r));
    return steps;
  }

  function buildRoundup(ix, s, unitId, seed) {
    const r = rng(seed);
    const unit = ix.course.units.find((u) => u.id === unitId);
    const its = unit.lessons.flatMap((l) => l.items.map((x) => ix.items.get(x.id)));
    const steps = [];
    if (its.every((x) => x.kind === "origin")) {
      for (const it of shuffle(its, r).slice(0, 8)) steps.push(qOrigin(it));
      return steps;
    }
    const picks = shuffle(its, r).slice(0, 7);
    for (const it of picks) {
      if (it.kind === "root") {
        const roll = r();
        steps.push(roll < 0.4 ? qDecode(ix, it, 2, r) : roll < 0.7 ? qBuild(ix, it, it.ex.findIndex((e) => e[2].length >= 2), r) : qReverse(ix, it, r));
      } else {
        steps.push(r() < 0.5 ? qScenario(ix, it, r) : qStory(ix, it, r));
      }
    }
    steps.push(qMatch(ix, shuffle(its, r), r));
    // A "Greek or not?" check in every unit keeps people from over-applying roots.
    steps.splice(Math.floor(r() * steps.length), 0, qOrigin(ix.origins[Math.floor(r() * ix.origins.length)]));
    return steps;
  }

  function buildPractice(ix, s, seed) {
    const r = rng(seed);
    const today = dayKey();
    let ids = dueItems(s, today).filter((id) => ix.items.has(id));
    if (ids.length < 6) {
      const weak = Object.entries(s.items)
        .filter(([id]) => ix.items.has(id) && !ids.includes(id))
        .sort((a, b) => a[1].box - b[1].box || b[1].wrong - a[1].wrong)
        .map(([id]) => id);
      ids = ids.concat(weak);
    }
    const picked = ids.slice(0, 7).map((id) => ix.items.get(id));
    return shuffle(picked, r).map((it) => qReview(ix, it, r));
  }

  /** Rodeo: fast 3-option questions from what you've learned (or unit 1 if you're new). */
  function rodeoQuestion(ix, s, r) {
    let pool = Object.keys(s.items).map((id) => ix.items.get(id)).filter((x) => x && x.kind !== "origin");
    if (pool.length < 4) pool = ix.lessons.slice(0, 2).flatMap((l) => l.items.map((x) => ix.items.get(x.id)));
    const it = pool[Math.floor(r() * pool.length)];
    if (r() < 0.25 && ix.origins.length) {
      const o = ix.origins[Math.floor(r() * ix.origins.length)];
      return qOrigin(o);
    }
    const q = it.kind === "root" && r() < 0.5 ? qReverse(ix, it, r) : qMeaning(ix, it, r, "Rodeo");
    // keep the right answer plus two distractors
    const wrong = q.options.filter((o) => o !== q.answer).slice(0, 2);
    return { ...q, label: "Rodeo", options: shuffle([q.answer, ...wrong], r) };
  }

  // ---------- badges ----------
  const BADGES = [
    { id: "first", name: "First Drachma", desc: "Finish a lesson", test: (s) => Object.keys(s.done).length >= 1 },
    { id: "perfect", name: "Flawless", desc: "A lesson with no misses", test: (s) => Object.values(s.done).some((d) => d.perfect) },
    { id: "streak3", name: "Three-Peat", desc: "3-day streak", test: (s) => s.bestStreak >= 3 },
    { id: "streak7", name: "Marathoner", desc: "7-day streak", test: (s) => s.bestStreak >= 7 },
    { id: "labors", name: "Twelve Labors", desc: "Finish 12 lessons", test: (s) => Object.keys(s.done).length >= 12 },
    { id: "rodeo8", name: "Eight Seconds", desc: "Rodeo score of 8+", test: (s) => s.rodeoBest >= 8 },
    { id: "socratic", name: "Socratic", desc: "5 practice sessions", test: (s) => s.practices >= 5 },
    { id: "philologist", name: "Philologist", desc: "Learn 40 words and ideas", test: (s) => Object.keys(s.items).length >= 40 },
    { id: "streak30", name: "Olympian", desc: "30-day streak", test: (s) => s.bestStreak >= 30 },
  ];
  function awardBadges(s, today) {
    const fresh = [];
    for (const b of BADGES) if (!s.badges[b.id] && b.test(s)) { s.badges[b.id] = today; fresh.push(b); }
    return fresh;
  }

  return {
    dayKey, addDays, daysBetween, weekKey, isWeekend, missedWeekdays,
    GOALS, freshState, touchStreak, liveStreak, addXp, weekXp,
    INTERVALS, learn, grade, dueItems,
    indexCourse, pathNodes, nextNode, isUnlocked,
    rng, shuffle, buildLesson, buildRoundup, buildPractice, rodeoQuestion, qReview,
    labelOf, meaningOf, BADGES, awardBadges,
  };
})();

if (typeof module !== "undefined") module.exports = { Engine };
