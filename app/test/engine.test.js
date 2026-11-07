// Run: node --test test/
const test = require("node:test");
const assert = require("node:assert/strict");
const { COURSE } = require("../src/content.js");
const { Engine: E } = require("../src/engine.js");

const IX = E.indexCourse(COURSE);
const all = [...IX.items.values()];

test("item ids are unique", () => {
  const ids = COURSE.units.flatMap((u) => u.lessons.flatMap((l) => l.items.map((i) => i.id)));
  assert.equal(new Set(ids).size, ids.length);
});

test("every item has the fields its kind needs", () => {
  for (const it of all) {
    assert.ok(it.say, `${it.id}: say`);
    if (it.kind === "root") {
      for (const k of ["root", "gr", "tr", "m", "hook"]) assert.ok(it[k], `${it.id}: ${k}`);
      assert.ok(it.ex.length >= 3, `${it.id}: needs 3 examples (2 taught, 1 held back)`);
    } else if (it.kind === "idea") {
      for (const k of ["term", "gr", "tr", "lit", "m", "story", "tex", "work"]) assert.ok(it[k], `${it.id}: ${k}`);
      assert.equal(it.q.w.length, 3, `${it.id}: 3 wrong answers`);
      assert.ok(!it.q.w.includes(it.q.a), `${it.id}: answer listed as wrong`);
    } else if (it.kind === "origin") {
      assert.equal(typeof it.greek, "boolean");
      assert.ok(it.w && it.from);
    } else assert.fail(`${it.id}: unknown kind ${it.kind}`);
  }
});

test("example words spell out exactly from their tiles", () => {
  for (const r of IX.roots) for (const [w, , parts] of r.ex) {
    assert.equal(parts.join("").toLowerCase(), w.toLowerCase(), `${r.id}: ${parts.join("+")} != ${w}`);
  }
});

test("root meanings are distinct so multiple choice is fair", () => {
  const ms = IX.roots.map((r) => r.m);
  assert.equal(new Set(ms).size, ms.length);
});

function checkQ(q, where) {
  if (q.type === "mcq") {
    assert.ok(q.options.includes(q.answer), `${where}: answer missing (${q.prompt})`);
    assert.equal(new Set(q.options).size, q.options.length, `${where}: duplicate options`);
    assert.ok(q.options.length >= 3, `${where}: too few options`);
  } else if (q.type === "build") {
    for (const p of q.answer) assert.ok(q.tiles.includes(p), `${where}: tile ${p} missing`);
    assert.ok(q.tiles.length > q.answer.length, `${where}: no distractor tiles`);
  } else if (q.type === "match") {
    assert.ok(q.pairs.length >= 3 && q.pairs.length <= 4, where);
    assert.equal(new Set(q.pairs.map((p) => p[0])).size, q.pairs.length, `${where}: duplicate left`);
    assert.equal(new Set(q.pairs.map((p) => p[1])).size, q.pairs.length, `${where}: duplicate right`);
  } else if (q.type === "tf") assert.equal(typeof q.answer, "boolean");
}

test("every lesson and roundup builds valid questions across many seeds", () => {
  const s = E.freshState();
  for (let seed = 1; seed <= 60; seed++) {
    for (const l of IX.lessons) {
      const steps = E.buildLesson(IX, s, l.id, seed);
      const scored = steps.filter((q) => q.type !== "intro" && q.type !== "intro-origin" && !q.guess);
      assert.ok(scored.length >= 5 && scored.length <= 10, `${l.id}: ${scored.length} scored steps`);
      steps.forEach((q, i) => checkQ(q, `${l.id}#${i} seed ${seed}`));
      const roots = l.items.filter((x) => x.kind === "root").length;
      if (roots >= 2) assert.ok(steps.filter((q) => q.label === "New word: decode it").length >= 2, `${l.id}: needs 2 transfer items`);
    }
    for (const u of COURSE.units) E.buildRoundup(IX, s, u.id, seed).forEach((q, i) => checkQ(q, `${u.id} roundup #${i}`));
  }
});

test("practice and rodeo work for a learner with progress", () => {
  const s = E.freshState();
  for (const it of all.slice(0, 20)) E.learn(s, it.id, "2026-10-01");
  const steps = E.buildPractice(IX, s, 7);
  assert.ok(steps.length >= 6);
  steps.forEach((q, i) => checkQ(q, `practice #${i}`));
  const r = E.rng(3);
  for (let i = 0; i < 200; i++) checkQ(E.rodeoQuestion(IX, s, r), `rodeo #${i}`);
  // brand-new learner still gets rodeo questions
  for (let i = 0; i < 50; i++) checkQ(E.rodeoQuestion(IX, E.freshState(), r), `rodeo new #${i}`);
});

test("weekends never break a streak", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-10-30"); // Fri
  E.touchStreak(s, "2026-11-02"); // Mon
  assert.equal(s.streak, 2);
  assert.equal(s.freezes, 1, "no freeze used over a weekend");
});

test("a missed weekday uses a freeze, two missed reset", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-11-02"); // Mon
  const a = E.touchStreak(s, "2026-11-04"); // Wed, missed Tue
  assert.equal(a.usedFreeze, 1);
  assert.equal(s.streak, 2);
  const b = E.touchStreak(s, "2026-11-07"); // Sat, missed Thu + Fri, no freezes left this week
  assert.ok(b.reset);
  assert.equal(s.streak, 1);
});

test("same-day activity doesn't double count", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-11-02");
  E.touchStreak(s, "2026-11-02");
  assert.equal(s.streak, 1);
});

test("leitner boxes climb on time and drop on a miss", () => {
  const s = E.freshState();
  E.learn(s, "tele", "2026-11-02");
  assert.equal(s.items.tele.due, "2026-11-03");
  E.grade(s, "tele", true, "2026-11-03");
  assert.equal(s.items.tele.box, 2);
  assert.equal(s.items.tele.due, "2026-11-06");
  E.grade(s, "tele", true, "2026-11-04"); // early review: no promotion
  assert.equal(s.items.tele.box, 2);
  E.grade(s, "tele", false, "2026-11-06");
  assert.equal(s.items.tele.box, 1);
  assert.equal(s.items.tele.due, "2026-11-07");
});

test("week xp only counts this week", () => {
  const s = E.freshState();
  E.addXp(s, "2026-10-30", 10); // Fri, previous week
  E.addXp(s, "2026-11-02", 15); // Mon
  assert.equal(E.weekXp(s, "2026-11-03"), 15);
  assert.equal(E.weekKey("2026-11-08"), "2026-11-02"); // Sunday belongs to the week starting Monday
});

test("date math handles leap years and DST noon safety", () => {
  // Leap year 2024
  assert.equal(E.addDays("2024-02-28", 1), "2024-02-29");
  assert.equal(E.addDays("2024-02-29", 1), "2024-03-01");
  assert.equal(E.daysBetween("2024-02-28", "2024-03-01"), 2);

  // Non-leap year 2025
  assert.equal(E.addDays("2025-02-28", 1), "2025-03-01");
  assert.equal(E.daysBetween("2025-02-28", "2025-03-01"), 1);

  // Negative days
  assert.equal(E.addDays("2024-03-01", -1), "2024-02-29");
  assert.equal(E.daysBetween("2026-11-05", "2026-11-02"), -3);
});

test("liveStreak calculates current standing without mutating state", () => {
  const s = E.freshState();
  assert.equal(E.liveStreak(s, "2026-11-02"), 0);

  E.touchStreak(s, "2026-11-02"); // Mon, streak 1
  assert.equal(E.liveStreak(s, "2026-11-02"), 1);
  assert.equal(E.liveStreak(s, "2026-11-03"), 1); // 0 missed weekdays between Mon and Tue

  // Missed Tuesday, checked on Wednesday with 1 freeze available
  assert.equal(E.liveStreak(s, "2026-11-04"), 1);

  // Missed Tuesday and Wednesday, checked on Thursday (exceeds 1 freeze)
  assert.equal(E.liveStreak(s, "2026-11-05"), 0);
});

test("streak milestones award freezes capped at MAX_FREEZES and preserve bestStreak", () => {
  const s = E.freshState();
  s.freezes = 0; // depleted freeze
  s.freezeWeek = "2026-11-02";

  // Build 7-day streak
  let day = "2026-11-02"; // Mon
  for (let i = 0; i < 7; i++) {
    E.touchStreak(s, day);
    day = E.addDays(day, 1);
  }
  assert.equal(s.streak, 7);
  assert.equal(s.bestStreak, 7);
  assert.equal(s.freezes, 1, "streak of 7 awards 1 freeze");

  // Build up to 14-day streak
  for (let i = 0; i < 7; i++) {
    E.touchStreak(s, day);
    day = E.addDays(day, 1);
  }
  assert.equal(s.streak, 14);
  assert.equal(s.freezes, 2, "streak of 14 awards 2nd freeze");

  // 21-day streak does not exceed MAX_FREEZES (2)
  for (let i = 0; i < 7; i++) {
    E.touchStreak(s, day);
    day = E.addDays(day, 1);
  }
  assert.equal(s.streak, 21);
  assert.equal(s.freezes, 2, "freezes capped at MAX_FREEZES");

  // Clock skew: backward date resets streak to 1, preserves bestStreak
  const skew = E.touchStreak(s, "2026-10-01");
  assert.equal(skew.streakUp, true);
  assert.equal(skew.reset, true);
  assert.equal(s.streak, 1);
  assert.equal(s.bestStreak, 21);
});

test("weekly freeze replenishment does not decrease earned freezes", () => {
  const s = E.freshState();
  s.freezes = 2;
  s.freezeWeek = "2026-11-02";

  // Activity in new week starting 2026-11-09
  E.touchStreak(s, "2026-11-09");
  assert.equal(s.freezes, 2, "rollover keeps balance when >= 1");

  // When depleted to 0, rollover resets to 1
  s.freezes = 0;
  E.touchStreak(s, "2026-11-16");
  assert.equal(s.freezes, 1, "rollover refills to 1 when depleted");
});

test("leitner box climbs to box 5 and drops to box 1 on miss", () => {
  const s = E.freshState();
  const id = "tele";
  let day = "2026-11-01";

  E.learn(s, id, day);
  assert.equal(s.items[id].box, 1);
  assert.equal(s.items[id].due, "2026-11-02");

  // Box 1 -> 2 (+3 days)
  day = "2026-11-02";
  E.grade(s, id, true, day);
  assert.equal(s.items[id].box, 2);
  assert.equal(s.items[id].due, "2026-11-05");

  // Box 2 -> 3 (+7 days)
  day = "2026-11-05";
  E.grade(s, id, true, day);
  assert.equal(s.items[id].box, 3);
  assert.equal(s.items[id].due, "2026-11-12");

  // Box 3 -> 4 (+14 days)
  day = "2026-11-12";
  E.grade(s, id, true, day);
  assert.equal(s.items[id].box, 4);
  assert.equal(s.items[id].due, "2026-11-26");

  // Box 4 -> 5 (+30 days)
  day = "2026-11-26";
  E.grade(s, id, true, day);
  assert.equal(s.items[id].box, 5);
  assert.equal(s.items[id].due, "2026-12-26");

  // Box 5 stays at box 5 (+30 days)
  day = "2026-12-26";
  E.grade(s, id, true, day);
  assert.equal(s.items[id].box, 5);
  assert.equal(s.items[id].due, "2027-01-25");
  assert.equal(s.items[id].right, 5);

  // Early review before due date does not change box or push due date
  E.grade(s, id, true, "2027-01-10");
  assert.equal(s.items[id].box, 5);
  assert.equal(s.items[id].due, "2027-01-25");

  // Miss drops back to box 1 (+1 day)
  E.grade(s, id, false, day);
  assert.equal(s.items[id].box, 1);
  assert.equal(s.items[id].due, "2026-12-27");
  assert.equal(s.items[id].wrong, 1);
});

test("course navigation unlock progression", () => {
  const s = E.freshState();
  const nodes = E.pathNodes(IX);

  // First lesson unlocked
  assert.ok(E.isUnlocked(IX, s, nodes[0].id));
  assert.equal(E.nextNode(IX, s).id, nodes[0].id);
  assert.equal(E.isUnlocked(IX, s, nodes[1].id), false);

  // Completing first unlocks second
  s.done[nodes[0].id] = { perfect: true, at: "2026-11-02" };
  assert.ok(E.isUnlocked(IX, s, nodes[1].id));
  assert.equal(E.nextNode(IX, s).id, nodes[1].id);
});

test("badges trigger under exact threshold conditions", () => {
  const s = E.freshState();
  const today = "2026-11-02";

  // First Drachma & Flawless
  s.done["u1l1"] = { perfect: true, at: today };
  let awarded = E.awardBadges(s, today).map((b) => b.id);
  assert.ok(awarded.includes("first"));
  assert.ok(awarded.includes("perfect"));

  // No duplicate award
  assert.equal(E.awardBadges(s, today).length, 0);

  // Streak badges
  s.bestStreak = 7;
  awarded = E.awardBadges(s, today).map((b) => b.id);
  assert.ok(awarded.includes("streak3"));
  assert.ok(awarded.includes("streak7"));
});

test("content integrity: ideas have prompts, answers and distinct origin words", () => {
  for (const it of all) {
    if (it.kind === "idea") {
      assert.ok(it.q && typeof it.q.prompt === "string" && it.q.prompt.length > 5, `${it.id}: valid q.prompt`);
      assert.ok(typeof it.q.a === "string" && it.q.a.length > 0, `${it.id}: non-empty q.a`);
    } else if (it.kind === "root") {
      for (const [w, def, parts] of it.ex) {
        assert.ok(typeof def === "string" && def.length > 0, `${it.id} ${w}: definition missing`);
        assert.ok(Array.isArray(parts) && parts.length >= 1, `${it.id} ${w}: parts missing`);
        for (const p of parts) assert.ok(p && p.trim() === p, `${it.id}: clean tile '${p}'`);
      }
    }
  }
  const origins = IX.origins.map((o) => o.w.toLowerCase());
  assert.equal(new Set(origins).size, origins.length, "origin words must be unique");
});
