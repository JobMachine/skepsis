// Builds the public website into ./vercel: the app at "/" plus one static, crawlable page per
// root/idea (/words/<slug>), a word index, an about page, sitemap, robots, 404 and a web manifest.
// Called from build.mjs with the inlined app markup.
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { COURSE } = require("./src/content.js");

export const SITE = "https://tryskepsis.com";
export const REPO = "https://github.com/ionpetro/skepsis";

// The family of free, open-source learning apps. Keep this list the same in Skepsis, Carpe, Gnothi, Objection, Agora, Oikos and Guanxi (app.js and site.mjs).
const FAMILY = [
    {"id": "skepsis", "name": "Skepsis", "url": "https://tryskepsis.com", "repo": "https://github.com/ionpetro/skepsis", "en": "the Greek hiding in everyday English", "el": "οι ελληνικές ρίζες που κρύβονται στα αγγλικά"},
    {"id": "carpe", "name": "Carpe", "url": "https://carpe-latin.vercel.app", "repo": "https://github.com/ionpetro/carpe", "en": "Latin for Greece's national exams", "el": "Λατινικά για τις Πανελλαδικές"},
    {"id": "gnothi", "name": "Gnothi", "url": "https://gnothi-greek.vercel.app", "repo": "https://github.com/ionpetro/gnothi", "en": "Ancient Greek for Greece's national exams", "el": "Αρχαία Ελληνικά για τις Πανελλαδικές"},
    {"id": "objection", "name": "Objection", "url": "https://objection-bar.vercel.app", "repo": "https://github.com/ionpetro/objection", "en": "prep for the US bar exam", "el": "προετοιμασία για τις εξετάσεις δικηγόρων των ΗΠΑ"},
    {"id": "agora", "name": "Agora", "url": "https://agora-sales-xi.vercel.app", "repo": "https://github.com/ionpetro/agora", "en": "sales and negotiation, with ethics", "el": "πωλήσεις και διαπραγμάτευση, με ηθική"},
    {"id": "oikos", "name": "Oikos", "url": "https://oikos-azure-five.vercel.app", "repo": "https://github.com/ionpetro/oikos", "en": "economics and incentives", "el": "οικονομικά και κίνητρα"},
    {"id": "guanxi", "name": "Guanxi", "url": "https://guanxi-mandarin.vercel.app", "repo": "https://github.com/ionpetro/guanxi", "en": "Mandarin and local culture", "el": "Μανδαρινικά και τοπική κουλτούρα"},
    {"id": "everyday-ethics", "name": "Everyday Ethics", "url": "https://everyday-ethics-ion.wintrypenny4.chatgpt.site", "repo": "https://github.com/ionpetro/everyday-ethics", "en": "everyday choices and ethical judgment · private preview", "el": "καθημερινές επιλογές και ηθική κρίση · ιδιωτική προεπισκόπηση"},
  ];
const SISTERS = FAMILY.filter((a) => a.id !== "skepsis");
const sisterHref = (a) => `${a.url}/?utm_source=skepsis&amp;utm_medium=sister_link`;
const NAME = "Skepsis";
const TAGLINE = "Learn Greek roots in 3 minutes a day";
const DESC = "A free, open-source game that teaches the Greek roots, myths and ideas hiding in everyday English (tele, photo, hubris, kudos) in 3-minute lessons, with Texas examples.";
const AUTHOR = "Ion Petropoulos";
const AUTHOR_URL = "https://ionpetro.com";
const PERSON = { "@type": "Person", name: AUTHOR, url: AUTHOR_URL };
/** Product Hunt launch card (post 1311444, launched 2026-11-10). Lazy, so it never slows the app's first paint. */
const PH_EMBED = `<div class="ph-embed"><iframe src="https://cards.producthunt.com/cards/posts/1311444?v=1" title="${NAME} on Product Hunt" width="500" height="405" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="border:none;width:100%;max-width:500px;height:405px"></iframe></div>`;

// PostHog (optional): set POSTHOG_KEY in app/.env. Without it no analytics code ships at all.
const POSTHOG_KEY = process.env.POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
function analytics() {
  if (!POSTHOG_KEY) return "";
  if (!/^phc_[A-Za-z0-9_-]+$/.test(POSTHOG_KEY)) throw new Error("POSTHOG_KEY must be a PostHog project key (phc_...)");
  // Official PostHog loader. Anonymous visitors only (no person profiles), inputs masked in replays.
  return `<script>!function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags identify setPersonProperties group resetGroups reset get_distinct_id get_session_id alias set_config startSessionRecording stopSessionRecording captureException opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init(${JSON.stringify(POSTHOG_KEY)},{api_host:${JSON.stringify(POSTHOG_HOST)},defaults:"2025-05-24",person_profiles:"identified_only",session_recording:{maskAllInputs:true}});
posthog.register({app:"skepsis",surface:"web"});</script>`;
}

const esc = (s) => (s == null ? "" : String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['’‘ʼ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Every item with its unit, lesson, a URL slug and plain-text title/description for SEO. */
export function pages() {
  const out = [];
  for (const u of COURSE.units) for (const l of u.lessons) for (const it of l.items) {
    let s, title, h1, desc;
    if (it.kind === "root") {
      s = slug(it.id);
      title = `${it.root}: Greek root meaning "${it.m}"`;
      h1 = it.root;
      desc = `${it.root} (${it.gr}) means "${it.m}". ${it.say} Examples: ${it.ex.map((e) => e[0]).join(", ")}.`;
    } else if (it.kind === "idea") {
      s = slug(it.term);
      title = `${it.term}: meaning and Greek origin`;
      h1 = it.term;
      desc = `${it.term} (${it.gr}, "${it.lit}"): ${it.m}. ${it.say}`;
    } else {
      s = `is-${slug(it.w)}-greek`;
      title = `Is "${it.w}" a Greek word?`;
      h1 = `Is "${it.w}" Greek?`;
      desc = `${it.greek ? "Yes" : "No"}. ${it.from}`;
    }
    out.push({ it, unit: u, lesson: l, slug: s, title, h1, desc: desc.slice(0, 300) });
  }
  const seen = new Set();
  for (const p of out) {
    if (seen.has(p.slug)) throw new Error(`Slug collision: ${p.slug}`);
    seen.add(p.slug);
  }
  return out;
}

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=GFS+Didot&family=Nunito:wght@400;600;700;800;900&family=Rye&display=swap">';
const ICONS = '<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#3446c9">';

function head({ title, desc, path, type = "website", jsonld = [], noindex = false, keywords = "" }) {
  const url = SITE + path;
  const robots = noindex ? '<meta name="robots" content="noindex, follow">\n' : "";
  const canonical = noindex ? "" : `<link rel="canonical" href="${url}">\n`;
  const kw = keywords ? `<meta name="keywords" content="${esc(keywords)}">\n` : "";
  const articleMeta = type === "article" ? '<meta property="article:section" content="Etymology">\n' : "";
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="${esc(AUTHOR)}">
${kw}${robots}${canonical}<meta property="og:type" content="${type}"><meta property="og:site_name" content="${NAME}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Skepsis: Y'all already speak Greek"><meta property="og:locale" content="en_US">
${articleMeta}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE}/og.png">
${ICONS}${FONTS}${analytics()}
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("\n")}`;
}

// Shared look for the static pages: same tokens as the app.
const PAGE_CSS = `:root{--bg:#f6f6f2;--surface:#fff;--ink:#161a3a;--muted:#5d6286;--line:#e0e2ec;--brand:#3446c9;--brand-deep:#222e8e;--brand-soft:#e3e7fb;--gold:#d99a06;--gold-soft:#fbefd0;--olive:#4b8a2a;--olive-soft:#e3f1d8;--on:#fff;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#0e1124;--surface:#171b36;--ink:#eceefa;--muted:#a2a7c9;--line:#2a3058;--brand:#8a99f7;--brand-deep:#3c4bc4;--brand-soft:#262d63;--gold:#f2bb3a;--gold-soft:#3a3016;--olive:#84c25c;--olive-soft:#1f3317;--on:#0e1124;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 Nunito,ui-rounded,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:720px;margin:0 auto;padding:24px max(16px,env(safe-area-inset-right,0px)) 64px max(16px,env(safe-area-inset-left,0px))}
a{color:var(--brand);font-weight:800}nav.top{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding-bottom:16px;border-bottom:1px solid var(--line)}
nav.top .brand{font-family:Rye,Georgia,serif;font-weight:400;font-size:22px;text-decoration:none;margin-right:auto}nav.top a{text-decoration:none;font-size:15px}
.crumbs{font-size:14px;color:var(--muted);margin:18px 0 6px}.crumbs a{font-weight:700}
h1{font-size:clamp(34px,7vw,52px);line-height:1.05;margin:6px 0 4px;font-weight:900;text-wrap:balance}h2{font-size:22px;margin:32px 0 8px;font-weight:900}
.greek{font-family:"GFS Didot","Palatino Linotype",Palatino,Georgia,serif;font-weight:400}
.gr{font-size:28px;color:var(--brand)}.mean{display:inline-block;font-size:21px;font-weight:900;background:var(--gold-soft);padding:2px 10px;border-radius:8px;margin:8px 0}
.say{font-size:19px;font-weight:700}.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin:12px 0}
.tx{background:var(--brand-soft);border-radius:14px;padding:14px 16px;font-weight:700}.work{background:var(--olive-soft);border-radius:14px;padding:14px 16px;font-weight:700}
ul.fam{list-style:none;padding:0;margin:0;display:grid;gap:8px}ul.fam li{border:2px dashed var(--line);border-radius:12px;padding:10px 14px}ul.fam b{font-size:18px}
.cta{display:inline-flex;align-items:center;gap:8px;margin-top:20px;background:var(--brand);color:var(--on);text-decoration:none;font-weight:900;letter-spacing:.04em;text-transform:uppercase;padding:14px 22px;border-radius:14px;box-shadow:0 4px 0 var(--brand-deep)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}.grid a{display:block;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 12px;text-decoration:none;color:var(--ink)}
.grid a b{display:block;color:var(--brand)}.grid a span{font-size:14px;color:var(--muted);font-weight:700}
footer{margin-top:48px;padding-top:16px;border-top:1px solid var(--line);font-size:14px;color:var(--muted)}footer a{font-weight:700}`;

function nav() {
  return `<nav class="top" aria-label="Site"><a class="brand" href="/">Skepsis</a><a href="/words">All words</a><a href="/about">About</a><a href="${REPO}">GitHub</a></nav>`;
}
function foot() {
  return `<footer><p><b>${NAME} is free and always will be. The code is open (MIT): <a href="${REPO}">GitHub</a>.</b> Made by <a href="${AUTHOR_URL}">${AUTHOR}</a>. Etymologies checked against Etymonline and Merriam-Webster. ${POSTHOG_KEY ? "The only thing we do is measure how it's used with PostHog, so we can make it better. No account, no ads; session recordings hide anything you type. " : "No account, no ads. "}<a href="${REPO}">Source on GitHub</a> (a star helps others find it) · <a href="${REPO}/tree/main/mcp">Learn from your AI agent (MCP)</a> · More free, open-source apps like this: ${SISTERS.map((a) => `<a href="${sisterHref(a)}">${a.name}</a> (${a.en}; <a href="${a.repo}" target="_blank" rel="noopener noreferrer" aria-label="${a.name} on GitHub">GitHub</a>)`).join(" · ")}</p></footer>`;
}
function page({ title, desc, path, body, jsonld, type, noindex = false, keywords = "" }) {
  return `<!doctype html><html lang="en"><head>${head({ title, desc, path, jsonld, type, noindex, keywords })}<style>${PAGE_CSS}</style></head><body><div class="wrap">${nav()}${body}${foot()}</div></body></html>`;
}

function wordPage(p, all) {
  const { it, unit } = p;
  const siblings = all.filter((x) => x.unit.id === unit.id && x !== p);
  let body = `<div class="crumbs"><a href="/words">All words</a> › ${esc(unit.title)}</div>`;
  if (it.kind === "root") {
    body += `<h1>${esc(it.root)}</h1><div class="greek gr" lang="grc">${esc(it.gr)} <span style="font-size:18px;color:var(--muted)">(${esc(it.tr)})</span></div>
      <div class="mean">means “${esc(it.m)}”</div><p class="say">${esc(it.say)}</p>
      <h2>Words built on ${esc(it.root)}</h2><ul class="fam">${it.ex.map(([w, d, parts]) => `<li><b>${esc(w)}</b>: ${esc(d)} <span style="color:var(--muted)">(${esc(parts.join(" + "))})</span></li>`).join("")}</ul>
      <h2>The Texas version</h2><p class="tx">${esc(it.hook)}</p>`;
  } else if (it.kind === "idea") {
    body += `<h1>${esc(it.term)}</h1><div class="greek gr" lang="grc">${esc(it.gr)} <span style="font-size:18px;color:var(--muted)">(${esc(it.tr)}, “${esc(it.lit)}”)</span></div>
      <div class="mean">${esc(it.m)}</div><p class="say">${esc(it.say)}</p>
      <h2>The story</h2><p>${esc(it.story)}</p>
      <h2>The Texas version</h2><p class="tx">${esc(it.tex)}</p>
      <h2>Use it at work</h2><p class="work">${esc(it.work)}</p>`;
  } else {
    body += `<h1>${esc(p.h1)}</h1><div class="mean">${it.greek ? "Yes, it's Greek" : "No, it's not Greek"}</div><p class="say">${esc(it.from)}</p>`;
  }
  body += `<a class="cta" href="/#learn">Practice it in Skepsis</a>
    <h2>More from “${esc(unit.title)}”</h2><div class="grid">${siblings.map((x) => `<a href="/words/${x.slug}"><b>${esc(x.it.kind === "origin" ? x.it.w : x.h1)}</b><span>${esc(x.it.kind === "origin" ? (x.it.greek ? "Greek" : "Not Greek") : x.it.m)}</span></a>`).join("")}</div>`;
  const keywords = it.kind === "root"
    ? `${it.root}, greek root ${it.root}, ${it.root} meaning, ${it.ex.map((e) => e[0]).join(", ")}, greek etymology`
    : it.kind === "idea"
      ? `${it.term}, ${it.term} greek origin, ${it.term} meaning, greek philosophy`
      : `is ${it.w} greek, ${it.w} etymology, origin of ${it.w}`;
  const jsonld = [
    it.kind === "origin"
      ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: p.title, acceptedAnswer: { "@type": "Answer", text: `${it.greek ? "Yes" : "No"}. ${it.from}` } }] }
      : { "@context": "https://schema.org", "@type": "DefinedTerm", name: p.h1, alternateName: it.gr, description: it.kind === "root" ? `${it.m}. ${it.say}` : `${it.m}. ${it.story}`, inLanguage: "en", inDefinedTermSet: { "@type": "DefinedTermSet", name: "Skepsis: Greek roots and ideas in English", url: `${SITE}/words` }, url: `${SITE}/words/${p.slug}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }, { "@type": "ListItem", position: 2, name: "All words", item: `${SITE}/words` }, { "@type": "ListItem", position: 3, name: p.h1, item: `${SITE}/words/${p.slug}` }] },
    { "@context": "https://schema.org", "@type": "WebPage", name: p.title, speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".mean", ".say", ".tx"] }, url: `${SITE}/words/${p.slug}` },
  ];
  return page({ title: `${p.title} | ${NAME}`, desc: p.desc, path: `/words/${p.slug}`, body, jsonld, type: "article", keywords });
}

function indexPage(all) {
  const greek = all.filter((p) => p.it.kind !== "origin").length;
  const body = `<h1>Greek in everyday English</h1><p class="say">${greek} Greek roots, myths and ideas you already use, plus a round of "Is it Greek?", each with real examples, the original Greek and a one-line way to explain it.</p>
    <div style="margin:20px 0 16px"><input id="q" type="search" placeholder="Search ${all.length} Greek roots, words or meanings…" style="width:100%;padding:12px 16px;border-radius:12px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font:inherit" aria-label="Search Greek words and roots"></div>
    ${COURSE.units.map((u, i) => `<h2>${i + 1}. ${esc(u.title)}</h2><p style="margin:0 0 8px;color:var(--muted);font-weight:700">${esc(u.blurb)}</p><div class="grid">${all.filter((p) => p.unit.id === u.id).map((p) => `<a href="/words/${p.slug}"><b>${esc(p.it.kind === "origin" ? p.it.w : p.h1)}</b><span>${esc(p.it.kind === "origin" ? (p.it.greek ? "Greek" : "Not Greek") : p.it.m)}</span></a>`).join("")}</div>`).join("")}
    <a class="cta" href="/">Start learning, free</a>
    <script>document.getElementById("q")?.addEventListener("input",function(e){var v=e.target.value.toLowerCase().trim();document.querySelectorAll(".grid a").forEach(function(a){a.style.display=(!v||a.textContent.toLowerCase().includes(v))?"":"none";});});</script>`;
  const jsonld = [
    { "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Skepsis: Greek roots and ideas in English", description: `Curated directory of ${greek} Greek roots, myths, and ideas in everyday English.`, inLanguage: "en", url: `${SITE}/words`, hasDefinedTerm: all.filter((p) => p.it.kind !== "origin").map((p) => ({ "@type": "DefinedTerm", name: p.h1, url: `${SITE}/words/${p.slug}` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }, { "@type": "ListItem", position: 2, name: "All words", item: `${SITE}/words` }] },
  ];
  return page({ title: `Greek roots and ideas in English: the full list | ${NAME}`, desc: `All ${greek} Greek roots, myths and ideas taught in Skepsis, from tele and photo to hubris and kudos, with meanings, examples and the original Greek.`, path: "/words", body, jsonld, keywords: "greek roots, greek words in english, etymology list, greek myths in english, learn greek roots" });
}

function aboutPage(all) {
  const roots = all.filter((p) => p.it.kind === "root").length, ideas = all.filter((p) => p.it.kind === "idea").length;
  const body = `<h1>About Skepsis</h1><div class="greek gr" lang="grc">σκέψις <span style="font-size:18px;color:var(--muted)">(skepsis, “looking closely”)</span></div>
    <p class="say">Skepsis teaches the Greek hiding in everyday English, in lessons short enough for a coffee break. It started as a way to teach a busy team in Texas, so every word comes with a Texas example. Made by <a href="${AUTHOR_URL}">${AUTHOR}</a>.</p>
    <h2>What's inside</h2><p>${COURSE.units.length} units, ${roots} word roots and ${ideas} myths and ideas: tele, photo and graph; astronaut and petroleum; ethos, pathos and logos; hubris and nemesis; the Stoics; and a round of “Is it Greek?” (rodeo, maverick, barbecue).</p>
    <h2>How it teaches</h2><ul>
      <li><b>Guess first.</b> Each lesson starts with a word you haven't learned. Guessing before you're told helps it stick.</li>
      <li><b>Word families.</b> Learn a root with its family, then decode words you have never seen.</li>
      <li><b>Spaced review.</b> Words come back after 1, 3, 7, 14 and 30 days.</li>
      <li><b>No punishment.</b> No hearts, no lives. Weekends never break a streak.</li></ul>
    <p>The research behind these choices, with sources, is in <a href="${REPO}/blob/main/RESEARCH.md">RESEARCH.md</a>.</p>
    <h2>Learn from your AI agent</h2><p>Skepsis ships an MCP server, so Claude, Cursor or any MCP-capable agent can tutor you with the same lessons and spaced review:</p>
    <pre class="card" style="overflow-x:auto;font-size:14px">claude mcp add skepsis -- npx -y github:ionpetro/skepsis</pre>
    <h2>Open source</h2><p>Code and content are MIT-licensed on <a href="${REPO}">GitHub</a>. Corrections and new words are welcome.</p>
    <h2>Free, open, and what we measure</h2><p>${NAME} is free and always will be. The code is open under the MIT license: <a href="${REPO}">${REPO.replace("https://", "")}</a>. No account, no sign-up, no ads. Your progress stays in your browser. The only thing we do is measure how it's used with <a href="https://posthog.com">PostHog</a> (visits, lesson results, which words are hard, and session recordings with anything you type hidden), so we can make it better.</p>
    <h2>The family</h2><p>${NAME} is one of ${FAMILY.length} free, open-source learning apps, each one a short daily game:</p><ul>${FAMILY.map((a) => `<li>${a.id === "skepsis" ? `<b>${a.name}</b>` : `<a href="${sisterHref(a)}">${a.name}</a>`}: ${a.en} (<a href="${a.repo}">GitHub</a>)</li>`).join("")}</ul><p>If one helps you, a star on GitHub helps other people find it.</p>
    <h2>On Product Hunt</h2>${PH_EMBED}
    <a class="cta" href="/">Start learning, free</a>`;
  return page({ title: `About ${NAME}: Greek roots in 3 minutes a day`, desc: DESC, path: "/about", body, jsonld: [{ "@context": "https://schema.org", "@type": "AboutPage", name: `About ${NAME}`, url: `${SITE}/about` }] });
}

function notFound() {
  return page({ title: `Not found | ${NAME}`, desc: DESC, path: "/404", body: `<h1>Lost like Odysseus</h1><p class="say">This page doesn't exist. It took him ten years to get home; it'll take you one click.</p><a class="cta" href="/">Back home</a> <a class="cta" href="/words" style="background:var(--olive);box-shadow:0 4px 0 #356a1b">All words</a>`, jsonld: [], noindex: true });
}

/** The app at "/": full document, SEO head, static fallback content for crawlers and no-JS. */
function appPage(appMarkup, all) {
  const jsonld = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: NAME, url: `${SITE}/`, description: DESC, applicationCategory: "EducationalApplication", operatingSystem: "Any (web browser)", inLanguage: "en", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, author: PERSON, sameAs: [REPO] },
    { "@context": "https://schema.org", "@type": "Course", name: `${NAME}: Greek roots, myths and ideas in English`, description: DESC, provider: PERSON, isAccessibleForFree: true, inLanguage: "en", hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT3M" }, offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free" } },
  ];
  // The app markup carries its own <title>; drop it so the SEO title wins.
  const app = appMarkup.replace(/<title>[^<]*<\/title>\s*/, "").replace(/<meta name="description"[^>]*>\s*/, "").replace(/<link rel="(preconnect|stylesheet)"[^>]*>\s*/g, "");
  const fallback = `<noscript><div style="max-width:640px;margin:24px auto;padding:0 16px;font-family:system-ui"><h1>${NAME}: ${TAGLINE}</h1><p>${esc(DESC)}</p><p><a href="/words">Browse all ${all.filter((p) => p.it.kind !== "origin").length} Greek roots and ideas</a> · <a href="/about">About</a></p></div></noscript>`;
  const footer = `<footer class="site-foot" aria-label="More">${PH_EMBED}<a href="/words">All ${all.length} words</a><a href="/about">About</a><a href="${REPO}">Open source</a><a href="${REPO}/tree/main/mcp">Use with your AI agent</a>${SISTERS.map((a) => `<a href="${sisterHref(a)}">Sister app: ${a.name}</a> <a href="${a.repo}" target="_blank" rel="noopener noreferrer" aria-label="${a.name} on GitHub">GitHub</a>`).join("")}<a href="${AUTHOR_URL}">Made by ${AUTHOR}</a></footer>`;
  return `<!doctype html><html lang="en"><head>${head({ title: `${NAME}: ${TAGLINE}`, desc: DESC, path: "/", jsonld })}
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}img{max-width:100%}
.site-foot{max-width:560px;margin:-8px auto 0;display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font:700 13px/1.4 Nunito,system-ui,sans-serif;padding:0 max(16px,env(safe-area-inset-right,0px)) calc(96px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}
.site-foot a{color:var(--muted,#5d6286);text-decoration:none}.site-foot a:hover{color:var(--brand,#3446c9)}body:has(.lesson,.huddle,.onboard) .site-foot{display:none}
.site-foot .ph-embed{flex-basis:100%;display:flex;justify-content:center;margin-bottom:12px}</style>
</head><body>${fallback}${app}${footer}</body></html>`;
}

function generateLlmsTxt(all) {
  return `# Skepsis

> Learn Greek roots, myths and ideas hiding in everyday English (tele, photo, hubris, kudos) in 3 minutes a day, with Texas examples.

Skepsis is a free, open-source educational web app and Model Context Protocol (MCP) server that teaches Greek etymology and ancient concepts with Texas-flavored explanations.

## Key Resources
- [Full Knowledge Base](${SITE}/llms-full.txt): Complete plain-text dictionary of all ${all.filter((p) => p.it.kind !== "origin").length} Greek roots, myths and ideas, plus ${all.filter((p) => p.it.kind === "origin").length} "Is it Greek?" words.
- [All Words & Roots](${SITE}/words): Browse all word pages and root families.
- [About Skepsis](${SITE}/about): Methodology (spaced repetition, guess-first) and open-source mission.
- [GitHub Repository](${REPO}): Source code (MIT), data schemas, and research notes.

## MCP Server for AI Agents
Any MCP-capable AI agent (Claude, Cursor, Codex) can tutor users with Skepsis:
\`\`\`bash
claude mcp add skepsis -- npx -y github:ionpetro/skepsis
\`\`\`
Available tools: start_lesson, answer, review, explain, break_down_word, root_of_the_day, progress.
`;
}

function generateLlmsFullTxt(all) {
  const lines = [
    `# Skepsis: Full Etymology & Greek Roots Knowledge Base`,
    ``,
    `> Complete dictionary of Greek roots, myths, philosophical ideas, and etymological origins taught in Skepsis, with Texas examples.`,
    ``,
    `Website: ${SITE}`,
    `Repository: ${REPO}`,
    `License: MIT`,
    ``,
    `---`,
    ``,
  ];

  for (const u of COURSE.units) {
    lines.push(`## Unit: ${u.title}`);
    lines.push(`${u.blurb}`);
    lines.push(``);
    const unitPages = all.filter((p) => p.unit.id === u.id);
    for (const p of unitPages) {
      const it = p.it;
      if (it.kind === "root") {
        lines.push(`### Root: ${it.root} (${it.gr}, transliterated: ${it.tr})`);
        lines.push(`- Meaning: "${it.m}"`);
        lines.push(`- Teach it: ${it.say}`);
        lines.push(`- Texas take: ${it.hook}`);
        lines.push(`- Examples:`);
        for (const [w, d, parts] of it.ex) {
          lines.push(`  * ${w}: ${d} (${parts.join(" + ")})`);
        }
        lines.push(`- URL: ${SITE}/words/${p.slug}`);
      } else if (it.kind === "idea") {
        lines.push(`### Concept: ${it.term} (${it.gr}, transliterated: ${it.tr}, literally: "${it.lit}")`);
        lines.push(`- Meaning: ${it.m}`);
        lines.push(`- Story: ${it.story}`);
        lines.push(`- Texas take: ${it.tex}`);
        lines.push(`- At work: ${it.work}`);
        lines.push(`- Teach it: ${it.say}`);
        lines.push(`- URL: ${SITE}/words/${p.slug}`);
      } else {
        lines.push(`### Is "${it.w}" Greek?`);
        lines.push(`- Answer: ${it.greek ? "Yes, it is Greek" : "No, it is not Greek"}`);
        lines.push(`- Origin & Etymology: ${it.from}`);
        lines.push(`- URL: ${SITE}/words/${p.slug}`);
      }
      lines.push(``);
    }
    lines.push(`---`);
    lines.push(``);
  }

  return lines.join("\n");
}

export function buildSite(appMarkup, outDir) {
  const all = pages();
  const w = (rel, s) => { const f = new URL(rel, outDir); mkdirSync(new URL(".", f), { recursive: true }); writeFileSync(f, s); };
  w("index.html", appPage(appMarkup, all));
  w("words.html", indexPage(all));
  for (const p of all) w(`words/${p.slug}.html`, wordPage(p, all));
  w("about.html", aboutPage(all));
  w("404.html", notFound());
  w("llms.txt", generateLlmsTxt(all));
  w("llms-full.txt", generateLlmsFullTxt(all));
  const today = new Date().toISOString().slice(0, 10);
  const sitemapEntry = (loc, priority, changefreq) => `  <url>\n    <loc>${SITE}${loc === "/" ? "/" : loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntry("/", "1.0", "daily")}\n${sitemapEntry("/words", "0.9", "weekly")}\n${sitemapEntry("/about", "0.5", "monthly")}\n${sitemapEntry("/llms.txt", "0.7", "monthly")}\n${all.map((p) => sitemapEntry(`/words/${p.slug}`, "0.8", "monthly")).join("\n")}\n</urlset>\n`;
  w("sitemap.xml", sitemapXml);
  w("robots.txt", `User-agent: *\nAllow: /\n\n# AI Search Crawlers & Answer Engines (GEO)\nUser-agent: GPTBot\nAllow: /\nAllow: /llms.txt\nAllow: /llms-full.txt\n\nUser-agent: PerplexityBot\nAllow: /\nAllow: /llms.txt\nAllow: /llms-full.txt\n\nUser-agent: ClaudeBot\nAllow: /\nAllow: /llms.txt\nAllow: /llms-full.txt\n\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  w("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#3446c9"/><text x="32" y="47" text-anchor="middle" font-family="Georgia,serif" font-size="42" fill="#fff">σ</text></svg>`);
  w("manifest.webmanifest", JSON.stringify({ name: `${NAME}: ${TAGLINE}`, short_name: NAME, description: DESC, start_url: "/", display: "standalone", background_color: "#f6f6f2", theme_color: "#3446c9", icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }] }, null, 2));
  w("vercel.json", JSON.stringify({
    cleanUrls: true, trailingSlash: false,
    headers: [
      { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }] },
      { source: "/(.*)\\.(png|svg|webmanifest|mp4)", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ],
  }, null, 2));
  return all.length;
}
