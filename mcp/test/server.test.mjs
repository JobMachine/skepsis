// End-to-end: spawn the real server over stdio and drive it like an agent would.
// Run: node --test mcp/test/server.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const home = fs.mkdtempSync(path.join(os.tmpdir(), "skepsis-test-"));
const client = new Client({ name: "skepsis-test", version: "0.0.0" });
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [path.join(here, "..", "server.js")],
  env: { ...process.env, SKEPSIS_HOME: home },
  stderr: "ignore",
});

const call = async (name, args = {}) => {
  const r = await client.callTool({ name, arguments: args });
  return { text: r.content.map((c) => c.text).join("\n"), isError: !!r.isError };
};

test.before(async () => { await client.connect(transport); });
test.after(async () => { await client.close(); fs.rmSync(home, { recursive: true, force: true }); });

test("lists all tools, the prompt and the course resource", async () => {
  const { tools } = await client.listTools();
  const names = tools.map((t) => t.name).sort();
  assert.deepEqual(names, ["answer", "break_down_word", "explain", "list_course", "progress", "review", "root_of_the_day", "start_lesson"]);
  const { prompts } = await client.listPrompts();
  assert.ok(prompts.some((p) => p.name === "daily_lesson"));
  const res = await client.readResource({ uri: "skepsis://course" });
  assert.ok(JSON.parse(res.contents[0].text).units.length >= 10);
});

test("review is refused before any lesson", async () => {
  const r = await call("review");
  assert.ok(r.isError);
  assert.match(r.text, /Finish a lesson first/);
});

test("runs a full lesson to the end and saves progress", async () => {
  let r = await call("start_lesson");
  assert.ok(!r.isError, r.text);
  assert.match(r.text, /Session (\w+)/);
  assert.doesNotMatch(r.text, /The answer:/, "first message must not leak the answer");
  const id = r.text.match(/Session (\w+)/)[1];
  let steps = 0;
  let done = false;
  while (!done && steps++ < 40) {
    const reply = /Reply with every pair/.test(r.text) ? "1a 2b 3c 4d" : "1";
    r = await call("answer", { session_id: id, response: reply });
    assert.ok(!r.isError, r.text);
    done = /Session complete/.test(r.text);
  }
  assert.ok(done, "lesson should finish");
  assert.match(r.text, /\+\d+ XP/);
  const p = await call("progress");
  assert.match(p.text, /XP: 1\d total/);
  assert.match(p.text, /Streak: 1 days/);
  const saved = JSON.parse(fs.readFileSync(path.join(home, "progress.json"), "utf8"));
  assert.ok(saved.done.u1l1, "lesson u1l1 marked done on disk");
  const list = await call("list_course");
  assert.match(list.text, /✓ u1l1/);
  assert.match(list.text, /u1l2 .*← next/);
});

test("review works once something is learned", async () => {
  const r = await call("review");
  assert.ok(!r.isError, r.text);
  assert.match(r.text, /Spaced review/);
});

test("unreadable replies don't use up the question", async () => {
  const r = await call("start_lesson");
  const id = r.text.match(/Session (\w+)/)[1];
  const bad = await call("answer", { session_id: id, response: "banana split" });
  assert.ok(bad.isError);
  assert.match(bad.text, /still open/);
});

test("bad session ids and locked lessons are tool errors, not crashes", async () => {
  const a = await call("answer", { session_id: "nope", response: "1" });
  assert.ok(a.isError);
  assert.match(a.text, /No active session/);
  const b = await call("start_lesson", { lesson_id: "u9l3" });
  assert.ok(b.isError);
  assert.match(b.text, /locked/);
});

test("explain finds roots, ideas and origins", async () => {
  assert.match((await call("explain", { term: "TELE" })).text, /τῆλε/);
  assert.match((await call("explain", { term: "hubris" })).text, /overconfidence/);
  assert.match((await call("explain", { term: "rodeo" })).text, /not Greek/);
  assert.match((await call("explain", { term: "telescope" })).text, /far/);
  assert.match((await call("explain", { term: "zzzz" })).text, /No card/);
});

test("break_down_word spots roots and admits misses", async () => {
  const p = await call("break_down_word", { word: "photophobia" });
  assert.match(p.text, /photo \(light\)/);
  assert.match(p.text, /phob \(fear\)/);
  assert.match((await call("break_down_word", { word: "telemetry" })).text, /tele.*metr/s);
  assert.match((await call("break_down_word", { word: "company" })).text, /No Greek roots/);
});

test("root of the day is stable", async () => {
  const a = await call("root_of_the_day");
  const b = await call("root_of_the_day");
  assert.equal(a.text, b.text);
  assert.match(a.text, /Root of the day/);
});
