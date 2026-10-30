#!/usr/bin/env node
// Skepsis MCP server: learn Greek roots, myths and big ideas through your AI agent.
// Stdio transport. Logs go to stderr only (stdout carries the protocol).
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  COURSE, IX, E, loadState, lessonStatus, startLesson, startReview, answer,
  explain, breakDown, rootOfTheDay, itemCard, progressText,
} from "./lib.js";

const TUTOR = "Act as a friendly tutor: teach the cards first in your own words, then ask ONE question at a time, wait for the learner's reply, and pass it to `answer` unchanged. Never reveal the answer before they reply.";

const server = new McpServer(
  { name: "skepsis", version: "1.0.0" },
  { instructions: `Skepsis teaches Greek roots (tele, phon, astro…), myths (Achilles' heel, mentor) and ideas (ethos, kairos, stoic) with Texas-flavored examples, in 3-minute lessons with spaced review, XP and streaks. Progress is saved on this machine. ${TUTOR}` },
);

/** Wrap a handler so thrown errors come back as tool errors the agent can read. */
const run = (fn) => async (args) => {
  try {
    const out = await fn(args || {});
    return { content: [{ type: "text", text: typeof out === "string" ? out : out.text }] };
  } catch (e) {
    return { content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }], isError: true };
  }
};

server.registerTool("list_course", {
  title: "List the course",
  description: "Show every unit and lesson with done/open/locked status and which lesson is next. Use it to pick a lesson id for start_lesson.",
  inputSchema: {},
  annotations: { readOnlyHint: true },
}, run(() => {
  const S = loadState();
  const units = lessonStatus(S);
  return units.map((u) => [`Unit ${u.unit}: ${u.title}`, ...u.lessons.map((l) => `  ${l.status === "done" ? "✓" : l.status === "open" ? "○" : "·"} ${l.id} ${l.title}${l.next ? "  ← next" : ""}${l.status === "locked" ? " (locked)" : ""}`)].join("\n")).join("\n");
}));

server.registerTool("start_lesson", {
  title: "Start a lesson",
  description: `Start the next lesson (or a given lesson id like "u1l2", or a unit roundup like "u1-review"). Returns cards to teach and the first question. A lesson is ~3 minutes: guess-first warm-up, new roots/ideas, then practice. ${TUTOR}`,
  inputSchema: { lesson_id: z.string().max(40).optional().describe('Lesson id from list_course. Leave empty for the next lesson.') },
}, run(({ lesson_id }) => startLesson(loadState(), lesson_id)));

server.registerTool("answer", {
  title: "Answer a question",
  description: "Grade the learner's reply to the current question in a session and get feedback plus the next question (or the session summary with XP and streak). Pass the learner's reply as given: an option number, the option text, 1/2 for Greek or not, pieces in order for build questions (\"2 1\" or \"tele phone\"), or pairs like \"1b 2a 3d\" for matching. Missed questions come back at the end.",
  inputSchema: {
    session_id: z.string().min(1).max(40).describe("Session id from start_lesson or review."),
    response: z.string().min(1).max(200).describe("The learner's reply."),
  },
}, run(({ session_id, response }) => answer(loadState(), session_id, response)));

server.registerTool("review", {
  title: "Spaced review",
  description: `Start a short review of words that are due (spaced repetition: 1, 3, 7, 14, 30 days) or weakest. Same flow as a lesson: ask, then call answer. ${TUTOR}`,
  inputSchema: {},
}, run(() => startReview(loadState())));

server.registerTool("explain", {
  title: "Explain a root or idea",
  description: "Look up a Greek root, idea, myth or word origin (e.g. \"tele\", \"hubris\", \"mentor\", \"telescope\", \"rodeo\"). Returns the Greek spelling, meaning, a Texas example, a one-line way to teach it and example words.",
  inputSchema: { term: z.string().min(1).max(60).describe("A root, idea, or English word.") },
  annotations: { readOnlyHint: true },
}, run(({ term }) => explain(term)));

server.registerTool("break_down_word", {
  title: "Break down a word",
  description: "Find the Greek roots inside any English word (e.g. photophobia = photo 'light' + phob 'fear'). Works on words outside the course too. Matching is by spelling, so it says when nothing fits.",
  inputSchema: { word: z.string().min(1).max(60).describe("An English word, like telemetry or hydrotherapy.") },
  annotations: { readOnlyHint: true },
}, run(({ word }) => breakDown(word)));

server.registerTool("root_of_the_day", {
  title: "Root of the day",
  description: "Today's root or idea. Everyone using Skepsis gets the same one on a given day, so a team can talk about it at standup.",
  inputSchema: {},
  annotations: { readOnlyHint: true },
}, run(() => `Root of the day (${E.dayKey()}):\n${itemCard(rootOfTheDay())}`));

server.registerTool("progress", {
  title: "Show progress",
  description: "XP, streak, streak freezes, words learned, items due for review, accuracy, badges, and the next lesson.",
  inputSchema: {},
  annotations: { readOnlyHint: true },
}, run(() => progressText(loadState())));

server.registerPrompt("daily_lesson", {
  title: "Daily Greek lesson",
  description: "Run today's 3-minute Skepsis lesson as a friendly, Texas-flavored tutor.",
}, () => ({
  messages: [{
    role: "user",
    content: {
      type: "text",
      text: [
        "Be my Skepsis tutor for today's 3-minute Greek lesson. Keep it friendly with a little Texas flavor, and keep every message short.",
        "1. Call `progress` and tell me my streak in one line.",
        "2. If items are due, offer a quick `review` first; otherwise call `start_lesson`.",
        "3. Teach each card in a sentence or two, using its Texas example. Then ask ONE question at a time exactly as given, with its numbered options.",
        "4. Wait for my reply, pass it to `answer` unchanged, and share the feedback and word family briefly.",
        "5. Never reveal an answer before I reply. When the session ends, celebrate the XP and streak in one line and name tomorrow's lesson.",
      ].join("\n"),
    },
  }],
}));

server.registerResource("course", "skepsis://course", {
  title: "Skepsis course",
  description: "The whole course as JSON: units, lessons, roots, ideas and word origins.",
  mimeType: "application/json",
}, async (uri) => ({ contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(COURSE) }] }));

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`[skepsis] MCP server ready: ${IX.items.size} items, ${E.pathNodes(IX).length} lessons`);
