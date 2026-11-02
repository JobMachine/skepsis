// One source of truth: the app runs the same lessons and game rules as the website
// (skepsis-greek.vercel.app) and the MCP server. Edit ../../../app/src/*.js, not copies.
import type { Course, CourseIndex, EngineApi } from "./types";

/* eslint-disable @typescript-eslint/no-require-imports */
const { COURSE } = require("../../../app/src/content.js") as { COURSE: Course };
const { Engine } = require("../../../app/src/engine.js") as { Engine: EngineApi };
/* eslint-enable @typescript-eslint/no-require-imports */

export const E = Engine;
export const IX: CourseIndex = Engine.indexCourse(COURSE);
export const NODES = Engine.pathNodes(IX);
export const TOTAL_ITEMS = IX.items.size;
export * from "./types";
