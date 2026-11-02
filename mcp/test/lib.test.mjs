// Run: node --test mcp/test/lib.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate SKEPSIS_HOME before loading lib.js
const testHome = fs.mkdtempSync(path.join(os.tmpdir(), "skepsis-lib-test-"));
process.env.SKEPSIS_HOME = testHome;

const { grade, loadState, saveState, breakDown, explain, rootOfTheDay, E, IX } = await import("../lib.js");

test.after(() => {
  fs.rmSync(testHome, { recursive: true, force: true });
});

test("loadState recovers gracefully from corrupted JSON with backup", () => {
  const pPath = path.join(testHome, "progress.json");
  fs.writeFileSync(pPath, "{ truncated invalid json");

  const s = loadState();
  assert.ok(s.onboarded, "returns valid fresh state");
  assert.equal(s.streak, 0);

  // Verifies .bad-* backup was created
  const files = fs.readdirSync(testHome);
  assert.ok(files.some((f) => f.startsWith("progress.json.bad-")), "corrupted file backed up");
});

test("grade() validates MCQ inputs deterministically", () => {
  const q = { type: "mcq", options: ["far", "sound", "to look"], answer: "far" };

  // Valid number and string
  assert.deepEqual(grade(q, "1"), { ok: true, chosen: "far" });
  assert.deepEqual(grade(q, "far"), { ok: true, chosen: "far" });
  assert.deepEqual(grade(q, "FAR"), { ok: true, chosen: "far" });

  // Wrong answers
  assert.deepEqual(grade(q, "2"), { ok: false, chosen: "sound" });
  assert.deepEqual(grade(q, "sound"), { ok: false, chosen: "sound" });

  // Out of range or invalid (including digit 0)
  assert.match(grade(q, "0").error, /from 1 to 3/);
  assert.match(grade(q, "4").error, /from 1 to 3/);
  assert.match(grade(q, "").error, /Empty reply/);
  assert.match(grade(q, null).error, /Empty reply/);
});

test("grade() validates TF inputs with all colloquial aliases", () => {
  const qGreek = { type: "tf", answer: true };
  const qNotGreek = { type: "tf", answer: false };

  for (const positive of ["1", "greek", "yes", "y", "true", "it is greek", " GREEK "]) {
    assert.deepEqual(grade(qGreek, positive), { ok: true }, `positive truthy: ${positive}`);
    assert.deepEqual(grade(qNotGreek, positive), { ok: false }, `negative truthy: ${positive}`);
  }

  for (const negative of ["2", "not greek", "not-greek", "no", "n", "false", "not", "No"]) {
    assert.deepEqual(grade(qNotGreek, negative), { ok: true }, `positive falsy: ${negative}`);
    assert.deepEqual(grade(qGreek, negative), { ok: false }, `negative falsy: ${negative}`);
  }

  assert.match(grade(qGreek, "maybe").error, /Reply 1 .* or 2/);
});

test("grade() validates Build question tokens, full word, and ordering", () => {
  const q = {
    type: "build",
    word: "telescope",
    tiles: ["tele", "micro", "scope", "phone"],
    answer: ["tele", "scope"],
  };

  // Full word match (with spacing/casing variations)
  assert.deepEqual(grade(q, "telescope"), { ok: true });
  assert.deepEqual(grade(q, "tele-scope"), { ok: true });
  assert.deepEqual(grade(q, "TELE SCOPE"), { ok: true });

  // Number indices
  assert.deepEqual(grade(q, "1 3"), { ok: true });
  assert.deepEqual(grade(q, "1, 3"), { ok: true });
  assert.deepEqual(grade(q, "1. 3."), { ok: true });

  // Tile text tokens
  assert.deepEqual(grade(q, "tele scope"), { ok: true });

  // Wrong order or pieces
  assert.deepEqual(grade(q, "3 1"), { ok: false });
  assert.deepEqual(grade(q, "1 2"), { ok: false });
  assert.deepEqual(grade(q, "1"), { ok: false }); // incomplete

  // Invalid tokens
  assert.match(grade(q, "9 1").error, /There is no piece 9/);
  assert.match(grade(q, "foo bar").error, /isn't one of the pieces/);
});

test("grade() validates Match question format and blocks repeat pairs", () => {
  const q = {
    type: "match",
    pairs: [["tele", "far"], ["phon", "sound"], ["scope", "look"]],
    left: ["tele", "phon", "scope"],
    right: ["sound", "far", "look"],
  };
  // Expected mapping: 1->b (tele->far), 2->a (phon->sound), 3->c (scope->look)

  // Correct syntax variations
  assert.deepEqual(grade(q, "1b 2a 3c"), { ok: true });
  assert.deepEqual(grade(q, "1-b, 2-a, 3-c"), { ok: true });
  assert.deepEqual(grade(q, "1:b 2:a 3:c"), { ok: true });

  // Wrong match
  assert.deepEqual(grade(q, "1a 2b 3c"), { ok: false });

  // Incomplete match
  assert.match(grade(q, "1b 2a").error, /Give all 3 pairs/);

  // Repeated same pair exploit blocked
  assert.match(grade(q, "1b 1b 1b").error, /paired more than once/);
});

test("breakDown() handles edge cases, minimum length and connector letters", () => {
  assert.throws(() => breakDown("ab"), /whole English word/);
  assert.equal(breakDown("telescope").found, true);
  assert.equal(breakDown("dermatologist").found, true);
  assert.equal(breakDown("zzzzxyzw").found, false);
});
