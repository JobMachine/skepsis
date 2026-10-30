// Inline src/* into one page: dist/index.html (the Artifact publishes a single file).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { buildSite } from "./site.mjs";
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
console.log(`vercel/: app + ${n} word pages`);
