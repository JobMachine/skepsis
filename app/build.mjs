// Inline src/* into one page: dist/index.html (the Artifact publishes a single file).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
// Load app/.env (optional) before site.mjs reads POSTHOG_KEY. Format: KEY=value per line.
try {
  for (const line of readFileSync(new URL("./.env", import.meta.url), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch { /* no .env: build without analytics */ }
const { buildSite } = await import("./site.mjs");
const r = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const strip = (js) => js.replace(/^if \(typeof module[^\n]*\n?/m, "");
const out = r("./src/shell.html")
  .replace("/*STYLE*/", () => r("./src/style.css"))
  .replace("/*CONTENT*/", () => strip(r("./src/content.js")))
  .replace("/*ENGINE*/", () => strip(r("./src/engine.js")))
  .replace("/*APP*/", () => r("./src/app.js"));
mkdirSync(new URL("./dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("./dist/index.html", import.meta.url), out);
console.log(`dist/index.html ${(out.length / 1024).toFixed(0)} KB`);

// Public website for Vercel: the app plus static SEO pages (see site.mjs) and the images in public/.
const siteDir = new URL("./vercel/", import.meta.url);
const n = buildSite(out, siteDir);
for (const f of readdirSync(new URL("./public/", import.meta.url))) copyFileSync(new URL(`./public/${f}`, import.meta.url), new URL(f, siteDir));
console.log(`vercel/: app + ${n} word pages, analytics ${process.env.POSTHOG_KEY ? "ON" : "off (no POSTHOG_KEY in app/.env)"}`);
