// Release guard: exports the PUBLIC iOS bundle (no private courses) and fails if anything from
// Komorebi (Japanese) or Logos (philosophy) is inside it. Run it before every App Store release:
//   npm run check:public
// The Hermes bytecode keeps string literals, so searching the bytes is a faithful test.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = mkdtempSync(path.join(tmpdir(), "skepsis-public-"));
// Markers that exist only in the private courses. Add more here when a course grows.
const MARKERS = ["Komorebi", "komorebi", "木漏れ日", "Anaximander", "Presocratics", "Philosophize", "Flux the frog", "Hiragino Sans", "course_switched"];

const env = { ...process.env, EXPO_PUBLIC_PRIVATE_COURSES: "0", APP_VARIANT: "production" };
execFileSync("npx", ["expo", "export", "--platform", "ios", "--output-dir", outDir], { cwd: root, env, stdio: "inherit" });

function* files(dir) {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) yield* files(p);
    else yield p;
  }
}
const found = [];
for (const f of files(outDir)) {
  if (!/\.(hbc|js|bundle)$/.test(f) && !/_expo\/static\/js/.test(f)) continue;
  // The two route files (komorebi.tsx, logos.tsx) exist in public builds only to redirect home; their
  // file names are in the route table. That is the one allowed trace.
  const text = readFileSync(f).toString("latin1").replaceAll("komorebi.tsx", "").replaceAll("logos.tsx", "");
  const buf = Buffer.from(text, "latin1");
  for (const m of MARKERS) if (buf.includes(Buffer.from(m, "latin1")) || text.includes(Buffer.from(m, "utf8").toString("latin1"))) found.push(`${path.relative(outDir, f)}: ${m}`);
}
rmSync(outDir, { recursive: true, force: true });
if (found.length) {
  console.error(`PUBLIC BUNDLE LEAK:\n${found.join("\n")}`);
  process.exit(1);
}
console.log("Public bundle is clean: no Komorebi or Logos markers.");
