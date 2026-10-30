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
