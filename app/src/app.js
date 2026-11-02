// UI for "Skepsis". Depends on globals COURSE (content.js) and Engine (engine.js).
(() => {
  "use strict";
  const E = Engine;
  const IX = E.indexCourse(COURSE);
  const LS_KEY = "greek-to-me:v1"; // kept from the old name so nobody loses progress
  const IN_CLAUDE = !!(window.claude && typeof window.claude.use === "function");

  // ---------- helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const today = () => E.dayKey();
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const seed = () => Math.floor(Math.random() * 2 ** 31);
  /** Product analytics. Only the public website loads PostHog (see site.mjs); elsewhere this does nothing. */
  function track(event, props = {}) {
    try { if (window.posthog && typeof window.posthog.capture === "function") window.posthog.capture(event, props); } catch { /* analytics must never break the app */ }
  }

  const REPO = "https://github.com/ionpetro/skepsis";
  /** GitHub link that asks people to star the repo. `where` says which button was clicked, for analytics. */
  const starLink = (cls, where, inner) => `<a class="${cls}" href="${REPO}" target="_blank" rel="noopener" data-star="${where}" aria-label="Star Skepsis on GitHub">${inner}</a>`;
  /** Bottom-of-screen note: open source, what we track and why, and a star prompt. The analytics line shows only where PostHog is loaded (the public website). */
  function siteNote() {
    const tracked = !!window.posthog;
    return `<footer class="sitenote">
      <p><b>Skepsis is free and always will be. The code is open (MIT).</b>${tracked ? " The only thing we do is measure how it's used with PostHog, so we can make it better. No account, no ads, and session recordings hide anything you type." : " No account, no ads."}</p>
      ${starLink("btn ghost star-cta", "footer", `${I.github}<span>Star it on GitHub</span>`)}
      <p class="sitenote-sub">A star helps other people find it.</p>
    </footer>`;
  }

  // ---------- icons ----------
  const I = {
    github: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.6 5.3-2.9 7.3C7.6 11.5 7 13 7 14.6 7 18.1 9.3 21 12 21s5-2.6 5-6.2c0-2.1-.9-3.7-2-5 .1 1.6-.5 2.8-1.6 3.3.5-3.6-.6-7.6-1.4-11.1z"/></svg>',
    coin: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="currentColor"/><path d="M12 6.5 7.6 16.5h8.8z" fill="none" stroke="var(--surface)" stroke-width="2" stroke-linejoin="round"/></svg>',
    snow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 2v20M4 6.5l16 11M20 6.5 4 17.5M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5"/></svg>',
    trail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/></svg>',
    temple: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M3 9 12 3l9 6zM5 9v9M9.6 9v9M14.4 9v9M19 9v9M3 21h18M4 18h16"/></svg>',
    scroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h11a2 2 0 0 1 2 2v1h-4M7 4a2 2 0 0 0-2 2v12a2 2 0 0 1-2 2h11a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M8.5 9h5M8.5 13h5"/></svg>',
    helmet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a8 8 0 0 0-8 8v9h5v-6h6v6h5v-9a8 8 0 0 0-8-8zM12 3v8M8 3.8C9 2 15 2 16 3.8"/></svg>',
    redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg>',
    shoe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 21v-8a6 6 0 0 1 12 0v8M3.5 21H8M16 21h4.5"/><circle cx="7" cy="15" r=".6" fill="currentColor"/><circle cx="17" cy="15" r=".6" fill="currentColor"/><circle cx="8.6" cy="10" r=".6" fill="currentColor"/><circle cx="15.4" cy="10" r=".6" fill="currentColor"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.5 2.8 6.3 6.7.6-5.1 4.5 1.5 6.7L12 17.1l-5.9 3.5 1.5-6.7L2.5 9.4l6.7-.6z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true" width="16" height="16"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
  };
  const lone = `<span style="color:var(--brand)">${I.star}</span>`;
  function wreath(letter, color = "var(--gold)") {
    return `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="${color}">${[...Array(6)].map((_, i) => {
      const a = (200 + i * 26) * Math.PI / 180, b = (-20 - i * 26) * Math.PI / 180;
      const p = (t) => [24 + 19 * Math.cos(t), 26 + 19 * Math.sin(t)];
      const [x1, y1] = p(a), [x2, y2] = p(b);
      return `<ellipse cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" rx="3" ry="6" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x1.toFixed(1)} ${y1.toFixed(1)})"/><ellipse cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" rx="3" ry="6" transform="rotate(${(b * 180 / Math.PI + 90).toFixed(0)} ${x2.toFixed(1)} ${y2.toFixed(1)})"/>`;
    }).join("")}</g><text x="24" y="31" text-anchor="middle" font-family="GFS Didot, Georgia, serif" font-size="18" fill="var(--ink)">${esc(letter)}</text></svg>`;
  }

  /** Homer the armadillo, in a laurel wreath. mood: happy | sad | cheer */
  function mascot(mood = "happy") {
    const eye = mood === "sad" ? '<path d="M100 69q3-3 6 0" stroke="var(--m-ink)" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : '<circle cx="103" cy="68" r="2.8" fill="var(--m-ink)"/><circle cx="104" cy="67" r=".9" fill="#fff"/>';
    const mouth = mood === "sad" ? '<path d="M106 80q4-3 8 0" stroke="var(--m-ink)" stroke-width="2" fill="none" stroke-linecap="round"/>' : '<path d="M105 77q5 4 10 0" stroke="var(--m-ink)" stroke-width="2" fill="none" stroke-linecap="round"/>';
    const arm = mood === "cheer" ? '<path d="M84 72q10-14 14-26" stroke="var(--m-skin)" stroke-width="7" stroke-linecap="round" fill="none"/>' : "";
    const leaves = [...Array(7)].map((_, i) => {
      const t = (190 + i * 24) * Math.PI / 180;
      const x = 98 + 15 * Math.cos(t), y = 58 + 11 * Math.sin(t);
      return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.6" ry="5" fill="var(--olive)" transform="rotate(${(t * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }).join("");
    return `<svg class="mascot" viewBox="0 0 124 112" role="img" aria-label="Homer the armadillo">
      <ellipse cx="60" cy="104" rx="42" ry="5" fill="var(--line)"/>
      <path d="M22 88q-14 6-17-6" stroke="var(--m-skin)" stroke-width="6" stroke-linecap="round" fill="none"/>
      <ellipse cx="34" cy="95" rx="8" ry="7" fill="var(--m-skin)"/><ellipse cx="84" cy="95" rx="8" ry="7" fill="var(--m-skin)"/>
      <path d="M18 92q2-52 44-54 40 2 42 54z" fill="var(--m-shell)"/>
      <path d="M40 47q-5 22-2 45M53 41q-2 25 0 51M66 40v52M79 43q3 24 1 49M91 52q4 20 2 40" stroke="var(--m-band)" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${arm}
      <path d="M92 60q22 0 28 18-8 8-24 6z" fill="var(--m-skin)"/>
      <ellipse cx="94" cy="54" rx="5" ry="9" fill="var(--m-skin)" transform="rotate(-25 94 54)"/>
      ${leaves}${eye}${mouth}
    </svg>`;
  }

  // ---------- sound (WebAudio, starts after the first tap) ----------
  let actx = null;
  function tone(freqs, dur = 0.09, type = "triangle", gap = 0.07, vol = 0.12) {
    if (!S.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") {
        actx.resume().catch(() => {});
      }
      freqs.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = type; o.frequency.value = f;
        const t0 = Math.max(actx.currentTime, actx.currentTime + i * gap);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g).connect(actx.destination);
        o.start(t0); o.stop(t0 + dur + 0.02);
      });
    } catch { /* audio is optional */ }
  }
  const sfx = {
    right: () => tone([660, 990]),
    wrong: () => tone([196, 147], 0.16, "square", 0.1, 0.05),
    done: () => tone([523, 659, 784, 1047], 0.14, "triangle", 0.09),
    tick: () => tone([880], 0.03, "sine", 0, 0.04),
  };
  const buzz = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch { /* optional */ } };

  // ---------- confetti ----------
  let confettiFrame = null;
  function confetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const existing = $("#confetti");
    if (existing) existing.remove();
    if (confettiFrame) { cancelAnimationFrame(confettiFrame); confettiFrame = null; }
    const c = document.createElement("canvas");
    c.id = "confetti";
    document.body.appendChild(c);
    const ctx = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const cols = ["--gold", "--brand", "--olive", "--flame", "--clay"].map((v) => css.getPropertyValue(v).trim());
    const ps = [...Array(110)].map(() => ({ x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 11, vy: -Math.random() * 12 - 4, s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: pick(cols) }));
    let f = 0;
    (function step() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const p of ps) {
        p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vx *= 0.99;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
      }
      if (++f < 150) confettiFrame = requestAnimationFrame(step);
      else { c.remove(); confettiFrame = null; }
    })();
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); toast("Copied. Paste it in Slack."); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      toast("Press Cmd/Ctrl+C to copy");
      setTimeout(() => ta.remove(), 4000);
    }
  }

  // ---------- state + persistence ----------
  const safeJsonParse = (str) => {
    try {
      return JSON.parse(str, (k, v) => (k === "__proto__" || k === "constructor" || k === "prototype" ? undefined : v));
    } catch { return null; }
  };
  function sanitizeState(parsed) {
    const base = E.freshState();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return base;
    const s = Object.assign(base, parsed);
    s.days = s.days && typeof s.days === "object" ? s.days : {};
    s.done = s.done && typeof s.done === "object" ? s.done : {};
    s.items = s.items && typeof s.items === "object" ? s.items : {};
    s.badges = s.badges && typeof s.badges === "object" ? s.badges : {};
    s.freezes = typeof s.freezes === "number" && !isNaN(s.freezes) ? s.freezes : 1;
    return s;
  }
  function loadLocal() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return sanitizeState(safeJsonParse(raw));
    } catch { /* storage can be blocked */ }
    return E.freshState();
  }
  let S = loadLocal();

  // ---------- analytics helpers ----------
  /** How far this player has got. Sent with every event, so any chart can be split by progress. */
  function progressProps() {
    const t = today();
    return {
      total_xp: S.xp,
      today_xp: S.days[t] || 0,
      goal_xp: S.goal,
      streak: E.liveStreak(S, t),
      learned: Object.keys(S.items).length,
      lessons_done: Object.keys(S.done).length,
      days_active: Object.keys(S.days).length,
      onboarded: !!S.onboarded,
    };
  }
  /** Refresh the progress numbers PostHog attaches to every event. */
  function syncProgress() {
    try { if (window.posthog && typeof window.posthog.register === "function") window.posthog.register(progressProps()); } catch { /* optional */ }
  }
  /** Whole days between two dayKeys ("YYYY-MM-DD"). */
  const dayGap = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
  const VISIT_KEY = "skepsis.visit";
  /**
   * Once per page load: who is this (new or returning), where they first came from,
   * and whether their streak broke since last time.
   */
  function trackAppOpened() {
    if (!window.posthog) return;
    let v = {};
    try { v = JSON.parse(localStorage.getItem(VISIT_KEY) || "{}"); } catch { /* storage can be blocked */ }
    if (!v || typeof v !== "object" || Array.isArray(v)) v = {};
    const t = today();
    const qs = new URLSearchParams(location.search);
    const campaign = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"]) if (qs.get(k)) campaign[k] = qs.get(k);
    let refHost = null;
    try { refHost = document.referrer ? new URL(document.referrer).hostname : null; } catch { /* bad referrer */ }
    if (refHost === location.hostname) refHost = null;
    const firstVisit = !v.first;
    if (firstVisit) { v.first = t; v.source = campaign.utm_source || campaign.ref || refHost || "direct"; }
    const daysSinceLast = v.last ? dayGap(v.last, t) : null;
    v.last = t;
    try { localStorage.setItem(VISIT_KEY, JSON.stringify(v)); } catch { /* fine */ }
    try { window.posthog.register({ first_source: v.source, first_seen: v.first }); } catch { /* optional */ }
    syncProgress();
    const live = E.liveStreak(S, t);
    const streakLost = S.streak > 0 && live === 0;
    const h = location.hash.slice(1);
    const entryTab = TABS.some((tab) => tab.id === h) ? h : null;
    track("app_opened", { first_visit: firstVisit, returning: !firstVisit, days_since_last_visit: daysSinceLast, referrer_host: refHost, ...campaign, streak_lost: streakLost, entry_tab: entryTab });
    if (streakLost) track("streak_lost", { lost_streak: S.streak, last_active: S.lastDay });
  }
  /** After XP is added: fire goal and streak events when they change. */
  function trackDayProgress(prevTodayXp, st) {
    const t = today();
    const now = S.days[t] || 0;
    if (prevTodayXp < S.goal && now >= S.goal) track("daily_goal_reached", { goal_xp: S.goal, today_xp: now });
    if (st && st.streakUp) track("streak_extended", { streak: S.streak, best_streak: S.bestStreak, used_freeze: st.usedFreeze > 0 });
  }

  const cloud ={ db: null, user: null, uid: null, players: [], ready: false, canWrite: true };
  const queues = {};
  function enqueue(path, fn) {
    queues[path] = (queues[path] || Promise.resolve()).then(fn).catch((e) => {
      console.warn("[greek] save failed", path, e && e.code);
      if (e && e.code === "invalid_argument") cloud.canWrite = false;
    });
  }
  function save() {
    S.updatedAt = Date.now();
    try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch { /* fine */ }
    syncProgress();
    if (cloud.db && cloud.uid && cloud.canWrite) {
      const snap = JSON.stringify(S);
      const xp = S.xp, at = S.updatedAt;
      enqueue("state", () => cloud.db.doc(`data/users/${cloud.uid}/state`).set({ s: snap, xp, at }));
      syncPlayer();
    }
  }
  function playerDoc() {
    const t = today();
    return { weekKey: E.weekKey(t), weekXp: E.weekXp(S, t), xp: S.xp, streak: E.liveStreak(S, t), learned: Object.keys(S.items).length, rodeoBest: S.rodeoBest, at: Date.now() };
  }
  function syncPlayer() {
    if (!cloud.db || !cloud.uid || !cloud.canWrite) return;
    const ref = cloud.db.doc(`players/${cloud.uid}`);
    if (S.board) enqueue("player", () => ref.set(playerDoc()));
    else enqueue("player", () => ref.delete());
  }

  async function connect() {
    const c = window.claude;
    if (!c || typeof c.use !== "function") { cloud.ready = true; rerenderTab(); return; }
    const [db, user] = await Promise.all([c.use("db"), c.use("user")]);
    cloud.user = user;
    if (!db || !user) { cloud.ready = true; rerenderTab(); return; }
    const uid = await user.id();
    if (!uid) { cloud.ready = true; rerenderTab(); return; }
    cloud.db = db; cloud.uid = uid;
    const w = await user.can("data.write");
    if (w === false) cloud.canWrite = false;
    try {
      const snap = await db.doc(`data/users/${uid}/state`).get();
      if (snap.exists) {
        const remote = sanitizeState(safeJsonParse(snap.data().s));
        if (!run && (remote.updatedAt || 0) > (S.updatedAt || 0)) {
          S = remote;
          try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch { /* fine */ }
        } else if (S.updatedAt) save();
      } else if (S.updatedAt) save();
    } catch (e) { console.warn("[greek] load failed", e && e.code); }
    db.collection("players").orderBy("xp", "desc").limit(300).onSnapshot(
      (qs) => { cloud.players = qs.docs.map((d) => ({ id: d.id, ...d.data() })); if (ui.tab === "agora" && !ui.overlay) render(); },
      (e) => console.warn("[greek] board", e && e.code),
    );
    cloud.ready = true;
    // first visit through the cloud: refresh the player row so this week's numbers are current
    if (S.board) syncPlayer();
    render();
  }

  // ---------- UI state ----------
  const ui = { tab: "learn", overlay: null, teachFilter: "all", teachQuery: "", boardMode: "week", confirmReset: false };
  // The team board needs claude.ai's shared storage, so the public website leaves it out.
  const TABS = [
    { id: "learn", label: "Learn", icon: I.trail },
    IN_CLAUDE && { id: "agora", label: "Team", icon: I.temple },
    { id: "teach", label: "Teach", icon: I.scroll },
    { id: "me", label: "Me", icon: I.helmet },
  ].filter(Boolean);
  function setTab(id) {
    if (id !== ui.tab) track("tab_viewed", { tab: id });
    ui.tab = id;
    if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
    render();
    scrollTo(0, 0);
  }
  addEventListener("hashchange", () => {
    if (run) closeRun();
    const h = location.hash.slice(1);
    if (TABS.some((t) => t.id === h) && h !== ui.tab) { ui.tab = h; render(); }
  });
  function rerenderTab() { if (!ui.overlay) render(); }

  const app = () => $("#app");

  function topbar() {
    const t = today();
    const st = E.liveStreak(S, t);
    const active = S.lastDay === t;
    return `<header class="topbar">
      <div class="wordmark">Skepsis<small class="greek">σκέψις</small></div>
      <div class="stats">
        <span class="stat flame ${active ? "" : "cold"}" title="${active ? "Streak is safe today" : "Do a lesson to keep your streak"}">${I.flame}<span>${st}</span></span>
        <span class="stat" title="Streak freezes" style="color:var(--brand)">${I.snow}<span>${S.freezes}</span></span>
        <span class="stat xp" title="Total XP">${I.coin}<span>${S.xp}</span></span>
      </div>
      ${starLink("gh", "topbar", `${I.github}<span class="gh-label">${I.star}Star</span>`)}
    </header>`;
  }
  function tabbar() {
    return `<nav class="tabbar" aria-label="Sections"><div class="tabbar-inner">${TABS.map((t) => `<button class="tab" data-tab="${t.id}" ${ui.tab === t.id ? 'aria-current="page"' : ""}>${t.icon}<span>${t.label}</span></button>`).join("")}</div></nav>`;
  }

  function render() {
    if (!S.onboarded) { app().innerHTML = onboarding(); bindOnboarding(); return; }
    const body = { learn: learnView, agora: agoraView, teach: teachView, me: meView }[ui.tab]();
    app().innerHTML = topbar() + `<main class="view">${body}${siteNote()}</main>` + tabbar();
    bindCommon();
    if (ui.tab === "agora") fillNames();
  }

  // ---------- onboarding ----------
  function onboarding() {
    return `<div class="onboard">
      ${mascot("cheer")}
      <h1>Skepsis</h1>
      <p class="lede"><span class="greek" style="color:var(--brand)">σκέψις</span>: Greek for "looking closely", the root of skeptic. Y'all already speak a little Greek. Three minutes a day and you'll see it everywhere: telephone, Metroplex, astronaut, kudos.</p>
      <div class="card" style="display:flex;flex-direction:column;gap:12px">
        <h3>How much time a day?</h3>
        <div class="goalopts">${E.GOALS.map((g) => `<button class="goalopt" data-goal="${g.xp}" aria-pressed="${S.goal === g.xp}">${g.label}<small>${g.sub}</small></button>`).join("")}</div>
        ${IN_CLAUDE ? `<div class="setting" style="border:0;padding-bottom:0">
          <div><label for="ob-board">Join the team board</label><small>Your weekly XP shows on a shared board. You can turn it off any time.</small></div>
          <input type="checkbox" class="switch" id="ob-board" ${S.board ? "checked" : ""}>
        </div>` : ""}
      </div>
      <button class="btn block" id="ob-go">Saddle up</button>
      <p class="muted" style="text-align:center;font-size:13px;font-weight:700">Weekends never break your streak. No hearts, no penalties.</p>
      ${siteNote()}
    </div>`;
  }
  function bindStars(root) {
    root.querySelectorAll("[data-star]").forEach((a) => a.addEventListener("click", () => track("github_star_clicked", { where: a.dataset.star })));
  }
  function bindOnboarding() {
    bindStars(app());
    app().querySelectorAll("[data-goal]").forEach((b) => b.addEventListener("click", () => { S.goal = +b.dataset.goal; render(); }));
    const ob = $("#ob-board"); if (ob) ob.addEventListener("change", (e) => { S.board = e.target.checked; });
    $("#ob-go").addEventListener("click", () => { S.onboarded = true; track("onboarding_completed", { goal_xp: S.goal }); save(); render(); startNode(E.nextNode(IX, S)); });
  }

  // ---------- learn tab ----------
  function rootOfDay() {
    const all = [...IX.items.values()].filter((x) => x.kind !== "origin");
    const n = Math.abs(E.daysBetween("2026-01-01", today()));
    return all[(n * 7) % all.length]; // same item for the whole team on a given day
  }
  function slackText(it) {
    if (it.kind === "root") return `*${it.root}* (${it.gr}) = ${it.m}\n${it.say}\nTexas take: ${it.hook}\nWords: ${it.ex.map((e) => e[0]).join(", ")}`;
    if (it.kind === "idea") return `*${it.term}* (${it.gr}, "${it.lit}") = ${it.m}\n${it.say}\nTexas take: ${it.tex}\nAt work: ${it.work}`;
    return `*${it.w}*: ${it.greek ? "Greek" : "not Greek"}. ${it.from}`;
  }

  function learnView() {
    const t = today();
    const todayXp = S.days[t] || 0;
    const pct = Math.min(1, todayXp / S.goal);
    const C = 2 * Math.PI * 24;
    const next = E.nextNode(IX, S);
    const due = E.dueItems(S, t).length;
    const learned = Object.keys(S.items).length;
    const rod = rootOfDay();
    const greet = todayXp >= S.goal ? "Daily goal done. Smarter than a tree full of owls." : S.lastDay === t ? "Good work today. A little more hits your goal." : pick(["Howdy! Ready for three minutes of Greek?", "Saddle up, partner. One lesson keeps the streak alive.", "Fixin' to learn some Greek?"]);
    return `
      <section class="hero">${mascot(todayXp >= S.goal ? "cheer" : "happy")}<div class="bubble">${esc(greet)}</div></section>
      <section class="card goalring">
        <svg viewBox="0 0 58 58" aria-hidden="true"><circle class="track" cx="29" cy="29" r="24" fill="none" stroke-width="8"/><circle class="fill" cx="29" cy="29" r="24" fill="none" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - pct)).toFixed(1)}"/></svg>
        <div style="flex:1;min-width:0"><div class="eyebrow">Daily goal</div><h3 class="tnum">${todayXp} / ${S.goal} XP</h3><p class="muted" style="font-weight:700;font-size:14px">${E.isWeekend(t) ? "It's the weekend: optional, streak is safe." : "Weekends never break your streak."}</p></div>
        ${next ? `<button class="btn" data-start="${next.id}">${Object.keys(S.done).length ? "Continue" : "Start"}</button>` : ""}
      </section>
      <section class="quick">
        <button class="tile" data-act="practice" ${learned < 3 ? "disabled" : ""}><span style="color:var(--olive)">${I.redo}</span><b>Practice</b><span>${learned < 3 ? "Unlocks after lesson 1" : due ? `${due} due for review` : "Strengthen weak spots"}</span></button>
        <button class="tile" data-act="rodeo"><span style="color:var(--flame)">${I.shoe}</span><b>Rodeo</b><span>8 seconds a question · best ${S.rodeoBest}</span></button>
      </section>
      <section class="card rotd" style="display:flex;flex-direction:column;gap:8px">
        <div class="row" style="justify-content:space-between"><span class="eyebrow">${IN_CLAUDE ? "Today's root for the team" : "Root of the day"}</span><button class="btn ghost small" data-copy="${rod.id}">${I.copy} Copy</button></div>
        <div class="row" style="flex-wrap:wrap;align-items:baseline;gap:4px 12px"><span class="big">${esc(E.labelOf(rod))}</span><span class="greek">${esc(rod.gr)}</span></div>
        <p style="font-weight:800">${esc(rod.m)}</p>
        <p class="muted" style="font-weight:700">${esc(rod.kind === "root" ? rod.hook : rod.tex)}</p>
      </section>
      ${trail()}`;
  }

  function trail() {
    const nodes = E.pathNodes(IX);
    const next = E.nextNode(IX, S);
    const offsets = [0, 60, 90, 60, 0, -60, -90, -60];
    let k = 0;
    return IX.course.units.map((u, ui2) => {
      const uNodes = nodes.filter((n) => n.unitId === u.id);
      const unlocked = E.isUnlocked(IX, S, uNodes[0].id);
      return `<section class="unit">
        <div class="unit-head ${unlocked ? "" : "locked"}">
          <div style="min-width:0"><div class="eyebrow">Unit ${ui2 + 1}</div><h2>${esc(u.title)}</h2><p>${esc(u.blurb)}</p></div>
          <button class="present" data-huddle="${u.id}" title="Present this unit to the team">Huddle</button>
        </div>
        <div class="trail">${uNodes.map((n) => {
          const done = !!S.done[n.id];
          const open = E.isUnlocked(IX, S, n.id);
          const cur = next && next.id === n.id;
          const off = offsets[k++ % offsets.length];
          return `<div class="stone-wrap ${cur ? "current" : ""}" style="transform:translateX(${off}px)">
            <button class="stone ${n.kind === "roundup" ? "boss" : ""} ${done ? "done" : open ? "" : "locked"}" ${open ? `data-start="${n.id}"` : "disabled"} aria-label="${esc(n.title)}${done ? " (done)" : open ? "" : " (locked)"}">${done ? I.check.replace('aria-hidden="true"', 'aria-hidden="true" width="34" height="34"') : n.letter}</button>
            <span class="stone-label">${esc(n.title)}</span>
          </div>`;
        }).join("")}</div>
      </section>`;
    }).join("");
  }

  // ---------- agora (team board) ----------
  function agoraView() {
    const t = today(), wk = E.weekKey(t);
    if (!cloud.ready) return `<section class="card empty">${mascot()}<p>Loading the team board…</p></section>`;
    if (!cloud.db) {
      return `<section class="card empty">${mascot("sad")}<h3>The team board needs you signed in</h3><p class="muted">Open this page from claude.ai while signed in to see your team. Your own progress still saves on this device.</p></section>`;
    }
    const rows = cloud.players.map((p) => ({
      ...p,
      xp: Number(p.xp) || 0,
      streak: Number(p.streak) || 0,
      learned: Number(p.learned) || 0,
      rodeoBest: Number(p.rodeoBest) || 0,
      weekXp: p.weekKey === wk ? Number(p.weekXp) || 0 : 0,
    }));
    const sorted = rows.slice().sort((a, b) => ui.boardMode === "week" ? b.weekXp - a.weekXp || b.xp - a.xp : ui.boardMode === "rodeo" ? (b.rodeoBest || 0) - (a.rodeoBest || 0) : b.xp - a.xp);
    const teamWeek = rows.reduce((a, p) => a + p.weekXp, 0);
    const teamLearned = rows.reduce((a, p) => a + (p.learned || 0), 0);
    const goal = Math.max(100, 60 * Math.max(1, rows.length));
    const val = (p) => ui.boardMode === "week" ? `${p.weekXp} XP` : ui.boardMode === "rodeo" ? `${p.rodeoBest || 0} rides` : `${p.xp} XP`;
    const joinCard = S.board ? "" : `<section class="card" style="display:flex;flex-direction:column;gap:10px"><h3>You're keeping it private</h3><p class="muted" style="font-weight:700">Join to add your XP to the team goal and show up on the board.</p><button class="btn" id="join-board">Join the team board</button></section>`;
    return `
      <section style="display:flex;flex-direction:column;gap:6px"><div class="eyebrow">The Agora · week of ${esc(fmtDay(wk))}</div><h1>Team board</h1><p class="muted" style="font-weight:700">The agora was Athens' town square. Resets every Monday. Everyone starts even.</p></section>
      <section class="card" style="display:flex;flex-direction:column;gap:10px">
        <div class="row" style="justify-content:space-between"><h3>Team goal this week</h3><b class="tnum">${teamWeek} / ${goal} XP</b></div>
        <div class="teambar"><i style="width:${Math.min(100, (teamWeek / goal) * 100).toFixed(0)}%"></i></div>
        <p class="muted" style="font-weight:700;font-size:14px">${rows.length} on the board · ${teamLearned} words and ideas learned together</p>
      </section>
      ${joinCard}
      <section class="card" style="display:flex;flex-direction:column;gap:10px">
        <div class="seg" role="group" aria-label="Board view">
          <button data-board="week" aria-pressed="${ui.boardMode === "week"}">This week</button>
          <button data-board="all" aria-pressed="${ui.boardMode === "all"}">All time</button>
          <button data-board="rodeo" aria-pressed="${ui.boardMode === "rodeo"}">Rodeo</button>
        </div>
        ${sorted.length ? `<div class="board">${sorted.map((p, i) => `
          <div class="prow ${p.id === cloud.uid ? "me" : ""}" data-pid="${esc(p.id)}">
            <span class="rank ${i < 3 ? "top" : ""}">${i + 1}</span>
            <img alt="" data-av>
            <div style="min-width:0"><div class="nm" data-nm>${p.id === cloud.uid ? "You" : "…"}</div><div class="sub">${I.flame.replace("<svg", '<svg width="12" height="12" style="color:var(--flame);vertical-align:-1px"')} ${p.streak || 0} day streak · ${p.learned || 0} learned</div></div>
            <span class="pts">${val(p)}</span>
          </div>`).join("")}</div>` : `<div class="empty">${mascot()}<p class="muted" style="font-weight:700">Nobody's on the board yet. Finish a lesson to be first.</p></div>`}
      </section>`;
  }
  async function fillNames() {
    if (!cloud.user) return;
    const els = [...document.querySelectorAll("[data-pid]")];
    if (!els.length) return;
    let ps;
    try {
      ps = await cloud.user.profiles(els.map((e) => e.dataset.pid));
    } catch (e) {
      console.warn("[greek] profiles failed", e);
      return;
    }
    for (const el of els) {
      const p = ps && ps[el.dataset.pid];
      if (!p) continue;
      const img = el.querySelector("[data-av]");
      if (img && typeof p.avatarUrl === "string" && /^https?:\/\//i.test(p.avatarUrl)) img.src = p.avatarUrl;
      const nm = el.querySelector("[data-nm]");
      if (nm) nm.textContent = p.isMe ? `${p.name || "You"} (you)` : p.name || "Teammate";
    }
  }
  function fmtDay(k) { return new Date(k + "T12:00").toLocaleDateString(undefined, { month: "short", day: "numeric" }); }

  // ---------- teach tab ----------
  function teachView() {
    const q = ui.teachQuery.trim().toLowerCase();
    const items = [...IX.items.values()].filter((it) => {
      if (ui.teachFilter === "roots" && it.kind !== "root") return false;
      if (ui.teachFilter === "ideas" && it.kind !== "idea") return false;
      if (ui.teachFilter === "origins" && it.kind !== "origin") return false;
      if (ui.teachFilter === "learned" && !S.items[it.id]) return false;
      if (!q) return true;
      return JSON.stringify(it).toLowerCase().includes(q);
    });
    const unitTitle = (id) => IX.course.units.find((u) => u.id === id)?.title || "";
    return `
      <section style="display:flex;flex-direction:column;gap:6px"><div class="eyebrow">For whoever's teaching</div><h1>Teach it in 30 seconds</h1><p class="muted" style="font-weight:700">Every root and idea with a one-breath line, a Texas example and a Slack-ready copy. Tap Huddle on any unit to present it at standup.</p></section>
      <input class="search" id="teach-q" type="search" placeholder="Search: tele, hubris, rodeo…" value="${esc(ui.teachQuery)}" aria-label="Search">
      <div class="chips" role="group" aria-label="Filter">${[["all", "All"], ["roots", "Roots"], ["ideas", "Ideas & myths"], ["origins", "Is it Greek?"], ["learned", "I've learned"]].map(([k, l]) => `<button class="fchip" data-filter="${k}" aria-pressed="${ui.teachFilter === k}">${l}</button>`).join("")}</div>
      <div class="chips">${IX.course.units.map((u, i) => `<button class="fchip" data-huddle="${u.id}">Huddle: unit ${i + 1}</button>`).join("")}</div>
      <section class="lex">${items.length ? items.map((it) => `
        <article class="card lexcard">
          <div class="lexhead"><b>${esc(E.labelOf(it))}</b>${it.gr ? `<span class="greek">${esc(it.gr)}</span>` : ""}<span class="m">${esc(it.kind === "origin" ? (it.greek ? "Greek" : "Not Greek") : it.m)}</span></div>
          <p class="say">${esc(it.say)}</p>
          ${it.kind === "root" ? `<p class="ex">${esc(it.ex.map((e) => e[0]).join(" · "))}</p><div class="texas">${lone}<span>${esc(it.hook)}</span></div>` : ""}
          ${it.kind === "idea" ? `<div class="texas">${lone}<span>${esc(it.tex)}</span></div><div class="worknote"><b>At work:</b> ${esc(it.work)}</div>` : ""}
          ${it.kind === "origin" ? `<p class="ex">${esc(it.from)}</p>` : ""}
          <div class="row" style="justify-content:space-between;flex-wrap:wrap"><span class="pill ${S.items[it.id] ? "learned" : ""}">${S.items[it.id] ? "Learned" : esc(unitTitle(it.unitId))}</span><button class="btn ghost small" data-copy="${it.id}">${I.copy} Copy for Slack</button></div>
        </article>`).join("") : `<div class="card empty"><p class="muted">No matches. Try another word.</p></div>`}</section>`;
  }

  // ---------- me tab ----------
  function meView() {
    const learned = Object.keys(S.items).length;
    const acc = S.answered ? Math.round((S.correct / S.answered) * 100) : 0;
    const total = IX.items.size;
    return `
      <section class="hero">${mascot()}<div class="bubble">${learned ? `You've learned ${learned} of ${total} words and ideas.` : "Finish a lesson to start your collection."}</div></section>
      <section class="grid2">
        ${[["Total XP", S.xp], ["Best streak", `${S.bestStreak} days`], ["Accuracy", `${acc}%`], ["Rodeo best", S.rodeoBest]].map(([h, v]) => `<div class="card"><div class="eyebrow">${h}</div><h2 class="tnum">${v}</h2></div>`).join("")}
      </section>
      <section style="display:flex;flex-direction:column;gap:10px"><h2>Laurels</h2><div class="badges">${E.BADGES.map((b) => `<div class="badge ${S.badges[b.id] ? "" : "off"}">${wreath(b.name[0])}<b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`).join("")}</div></section>
      <section class="card">
        <div class="setting" style="flex-direction:column;align-items:stretch"><label>Daily goal</label><div class="goalopts">${E.GOALS.map((g) => `<button class="goalopt" data-goal="${g.xp}" aria-pressed="${S.goal === g.xp}">${g.label}<small>${g.sub}</small></button>`).join("")}</div></div>
        ${IN_CLAUDE ? `<div class="setting"><div><label for="set-board">Team board</label><small>Show your weekly XP to the team</small></div><input type="checkbox" class="switch" id="set-board" ${S.board ? "checked" : ""}></div>` : ""}
        <div class="setting"><div><label for="set-sound">Sounds</label><small>Dings and buzzes</small></div><input type="checkbox" class="switch" id="set-sound" ${S.sound ? "checked" : ""}></div>
        <div class="setting"><div><label>Streak freezes: ${S.freezes}</label><small>One free each week; earn another every 7-day streak (max 2)</small></div></div>
        <div class="setting"><div><label>Start over</label><small>Erase your progress on this account</small></div>${ui.confirmReset ? `<div class="row"><button class="btn clay small" id="reset-yes">Erase</button><button class="btn ghost small" id="reset-no">Keep</button></div>` : `<button class="btn ghost small" id="reset">Reset</button>`}</div>
      </section>
      <p class="muted" style="font-size:13px;font-weight:700;text-align:center">${IN_CLAUDE ? "Progress saves to your account when you're signed in, and to this device either way." : "Progress saves in this browser."}</p>`;
  }

  // ---------- event wiring ----------
  function bindCommon() {
    const root = app();
    root.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
    bindStars(root);
    root.querySelectorAll("[data-start]").forEach((b) => b.addEventListener("click", () => startNode(E.pathNodes(IX).find((n) => n.id === b.dataset.start))));
    root.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", () => { track("copied_for_slack", { item_id: b.dataset.copy, tab: ui.tab }); copyText(slackText(IX.items.get(b.dataset.copy))); }));
    root.querySelectorAll("[data-huddle]").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); openHuddle(b.dataset.huddle); }));
    root.querySelectorAll("[data-goal]").forEach((b) => b.addEventListener("click", () => { const from = S.goal; S.goal = +b.dataset.goal; if (from !== S.goal) track("goal_changed", { from_xp: from, to_xp: S.goal }); save(); render(); }));
    root.querySelectorAll("[data-filter]").forEach((b) => b.addEventListener("click", () => { ui.teachFilter = b.dataset.filter; render(); }));
    root.querySelectorAll("[data-board]").forEach((b) => b.addEventListener("click", () => { ui.boardMode = b.dataset.board; render(); }));
    const act = (a, fn) => { const el = root.querySelector(`[data-act="${a}"]`); if (el) el.addEventListener("click", fn); };
    act("practice", () => startRun("practice"));
    act("rodeo", () => startRodeo());
    const q = $("#teach-q");
    if (q) q.addEventListener("input", (e) => {
      ui.teachQuery = e.target.value;
      const pos = e.target.selectionStart;
      render();
      const n = $("#teach-q"); n.focus(); n.setSelectionRange(pos, pos);
    });
    const jb = $("#join-board"); if (jb) jb.addEventListener("click", () => { S.board = true; save(); toast("You're on the board"); render(); });
    const sb = $("#set-board"); if (sb) sb.addEventListener("change", (e) => { S.board = e.target.checked; track("setting_changed", { setting: "board", value: S.board }); save(); });
    const ss = $("#set-sound"); if (ss) ss.addEventListener("change", (e) => { S.sound = e.target.checked; track("setting_changed", { setting: "sound", value: S.sound }); save(); });
    const rs = $("#reset"); if (rs) rs.addEventListener("click", () => { ui.confirmReset = true; render(); });
    const rn = $("#reset-no"); if (rn) rn.addEventListener("click", () => { ui.confirmReset = false; render(); });
    const ry = $("#reset-yes"); if (ry) ry.addEventListener("click", () => { track("progress_reset", progressProps()); const keep = { board: S.board, sound: S.sound }; S = Object.assign(E.freshState(), keep); ui.confirmReset = false; save(); render(); });
  }

  // ---------- lesson runner ----------
  let run = null;
  function startNode(node) {
    if (!node) return;
    if (node.kind === "roundup") startRun("roundup", node);
    else startRun("lesson", node);
  }
  function startRun(mode, node = null) {
    const sd = seed();
    let steps;
    if (mode === "lesson") steps = E.buildLesson(IX, S, node.id, sd);
    else if (mode === "roundup") steps = E.buildRoundup(IX, S, node.unitId, sd);
    else steps = E.buildPractice(IX, S, sd);
    if (!steps.length) { toast("Nothing to practice yet"); return; }
    run = { mode, node, steps, i: 0, misses: 0, combo: 0, maxCombo: 0, right: 0, scored: 0, requeued: new Set(), answered: false, start: Date.now() };
    track("lesson_started", runProps());
    ui.overlay = "lesson";
    drawStep();
  }
  function runProps() {
    return run ? { mode: run.mode, lesson_id: run.node ? run.node.id : null, unit_id: run.node ? run.node.unitId : null } : {};
  }
  /** What the player is looking at right now, for step-level events. */
  function stepProps(q) {
    const it = q && q.itemId ? IX.items.get(q.itemId) : null;
    return {
      step: run.i,
      steps: run.steps.length,
      step_type: q ? q.type : null,
      item_id: (q && q.itemId) || null,
      item_kind: it ? it.kind : null,
      item_label: it ? E.labelOf(it) : (q && q.word) || null,
      retry: !!q && q.label === "Try again",
      guess: !!(q && q.guess),
    };
  }
  function closeRun() {
    if (run && !run.finished) {
      const q = run.steps[run.i];
      track(run.mode === "rodeo" ? "rodeo_quit" : "lesson_quit", {
        ...runProps(), ...stepProps(q),
        answered: run.scored, right: run.right, misses: run.misses,
        seconds: Math.round((Date.now() - run.start) / 1000),
        seconds_on_step: run.stepAt ? Math.round((Date.now() - run.stepAt) / 1000) : null,
        on_feedback: !!run.answered,
        rides: run.mode === "rodeo" ? run.right : undefined,
      });
    }
    run = null; ui.overlay = null;
    const o = $(".lesson"); if (o) o.remove();
    const conf = $("#confetti"); if (conf) conf.remove();
    if (confettiFrame) { cancelAnimationFrame(confettiFrame); confettiFrame = null; }
    clearTimeout(rodeoTimer);
    render();
  }

  function shell(inner, footer = "") {
    let o = $(".lesson");
    if (!o) { o = document.createElement("div"); o.className = "lesson"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); document.body.appendChild(o); }
    const prog = run.mode === "rodeo" ? 100 : (run.i / run.steps.length) * 100;
    o.innerHTML = `<div class="lesson-inner">
        <div class="lesson-top"><button class="xbtn" id="quit" aria-label="Quit">${I.x}</button>
          ${run.mode === "rodeo" ? `<div style="flex:1;font-weight:900">Rodeo · <span class="tnum">${run.right}</span> rides</div>` : `<div class="progress" aria-hidden="true"><i style="width:${prog}%"></i></div>`}
          <span class="combo">${run.combo >= 3 ? `${I.flame.replace("<svg", '<svg width="14" height="14"')} ${run.combo}` : ""}</span></div>
        ${run.mode === "rodeo" ? '<div class="timer"><i id="timer"></i></div>' : ""}
        <div class="stage" id="stage">${inner}</div>
      </div><div class="footer" id="footer">${footer}</div>`;
    $("#quit").addEventListener("click", closeRun);
    return o;
  }
  function footerBtn(label, cls = "", id = "next", disabled = false) {
    return `<div class="footer-inner"><button class="btn block ${cls}" id="${id}" ${disabled ? "disabled" : ""}>${label}</button></div>`;
  }

  function drawStep() {
    if (run.i >= run.steps.length) return finishRun();
    run.answered = false;
    const q = run.steps[run.i];
    run.stepAt = Date.now();
    track("lesson_step_viewed", { ...runProps(), ...stepProps(q) });
    if (q.type === "intro") return drawIntro(q);
    if (q.type === "intro-origin") return drawOriginIntro();
    if (q.type === "mcq") return drawMcq(q);
    if (q.type === "tf") return drawTf(q);
    if (q.type === "build") return drawBuild(q);
    if (q.type === "match") return drawMatch(q);
  }
  function advance() { run.i += 1; drawStep(); }

  function drawIntro(q) {
    const it = IX.items.get(q.itemId);
    E.learn(S, it.id, today());
    let inner;
    if (it.kind === "root") {
      inner = `<div class="intro">
        <div class="qlabel">New word part</div>
        <div class="rootline"><span class="bigword">${esc(it.root)}</span><span class="greek">${esc(it.gr)}</span></div>
        <p class="meaning">means <em>${esc(it.m)}</em></p>
        <div class="texas">${lone}<span>${esc(it.hook)}</span></div>
        <div class="family">${it.ex.slice(0, 2).map(([w, d]) => `<div class="fw"><b>${hl(w, it.root)}</b><span>${esc(d)}</span></div>`).join("")}</div>
      </div>`;
    } else {
      inner = `<div class="intro">
        <div class="qlabel">New idea</div>
        <div class="rootline"><span class="bigword">${esc(it.term)}</span><span class="greek">${esc(it.gr)}</span></div>
        <p class="meaning"><em>${esc(it.m)}</em></p>
        <p class="muted" style="font-weight:800">Literally: "${esc(it.lit)}"</p>
        <p class="story">${esc(it.story)}</p>
        <div class="texas">${lone}<span>${esc(it.tex)}</span></div>
      </div>`;
    }
    shell(inner, footerBtn("Got it"));
    $("#next").addEventListener("click", advance);
    $("#next").focus();
  }
  function drawOriginIntro() {
    shell(`<div class="intro"><div class="qlabel">Is it Greek?</div><h1>Not every fancy word is Greek</h1>
      <p class="story">Texas English is a stew: Spanish from the ranches, Nahuatl from Mexico, Caddo from the first Texans, Dutch from old New York. Your job: call each word Greek or not.</p>
      <div class="texas">${lone}<span>Spotting fakes keeps you from over-using roots. "Rodeo" has nothing to do with "rhodo-" (rose).</span></div></div>`, footerBtn("Let's ride"));
    $("#next").addEventListener("click", advance);
  }
  /** Highlight a root inside a word (first match, case-insensitive). */
  function hl(word, root) {
    const r = String(root).split(/[\s/]+/)[0].replace(/^-/, "").replace(/-$/, "");
    const i = word.toLowerCase().indexOf(r.toLowerCase().slice(0, Math.max(3, r.length - 1)));
    if (i < 0 || !r) return esc(word);
    const len = Math.min(r.length, word.length - i);
    return `${esc(word.slice(0, i))}<span class="root-hl">${esc(word.slice(i, i + len))}</span>${esc(word.slice(i + len))}`;
  }

  function header(q) {
    return `<div class="qlabel ${q.guess ? "guess" : ""}">${esc(q.label)}${q.guess ? " · no penalty" : ""}</div>`;
  }

  function drawMcq(q) {
    const it = q.itemId ? IX.items.get(q.itemId) : null;
    const top = q.word
      ? `<p class="prompt">${q.prompt}</p><div class="bigword">${q.guess ? esc(q.word) : hl(q.word, it ? it.root : "")}</div>`
      : `<p class="prompt">${q.prompt}</p>${q.greek ? `<div class="greek" style="font-size:26px;color:var(--muted)">${esc(q.greek)}</div>` : ""}`;
    const inner = `${header(q)}${top}<div class="options" role="group">${q.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
    shell(inner, "");
    document.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => answerMcq(q, +b.dataset.i)));
    if (run.mode === "rodeo") startTimer(() => answerMcq(q, -1));
  }
  function answerMcq(q, idx) {
    if (run.answered) return;
    run.answered = true;
    const ok = idx >= 0 && q.options[idx] === q.answer;
    document.querySelectorAll(".opt").forEach((b, i) => {
      b.disabled = true;
      if (q.options[i] === q.answer) b.classList.add("right");
      else if (i === idx) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    resolve(q, ok, idx < 0 ? "Time's up!" : null, { chosen: idx >= 0 ? q.options[idx] : null });
  }

  function drawTf(q) {
    const inner = `${header(q)}<p class="prompt">Is this word from Greek?</p><div class="bigword">${esc(q.word)}</div>
      <div class="tfrow"><button class="opt" data-v="1"><span class="k">1</span>Greek</button><button class="opt" data-v="0"><span class="k">2</span>Not Greek</button></div>`;
    shell(inner, "");
    document.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => answerTf(q, b.dataset.v === "1", b)));
    if (run.mode === "rodeo") startTimer(() => answerTf(q, null, null));
  }
  function answerTf(q, v, btn) {
    if (run.answered) return;
    run.answered = true;
    const ok = v === q.answer;
    document.querySelectorAll(".opt").forEach((b) => {
      b.disabled = true;
      const bv = b.dataset.v === "1";
      if (bv === q.answer) b.classList.add("right");
      else if (b === btn) b.classList.add("wrong");
    });
    resolve(q, ok, v === null ? "Time's up!" : null, { chosen: v === null ? null : v ? "Greek" : "Not Greek" });
  }

  function drawBuild(q) {
    const placed = [];
    const inner = `${header(q)}<p class="prompt">${q.prompt}</p><div class="slots" id="slots" aria-live="polite"></div>
      <div class="bank" id="bank">${q.tiles.map((t, i) => `<button class="chip" data-i="${i}">${esc(t)}</button>`).join("")}</div>`;
    shell(inner, footerBtn("Check", "", "check", true));
    const slots = $("#slots"), check = $("#check");
    const redraw = () => {
      slots.innerHTML = placed.map((i, k) => `<button class="chip placed" data-k="${k}">${esc(q.tiles[i])}</button>`).join("");
      document.querySelectorAll("#bank .chip").forEach((b) => b.classList.toggle("used", placed.includes(+b.dataset.i)));
      slots.querySelectorAll(".chip").forEach((b) => b.addEventListener("click", () => { if (run.answered) return; placed.splice(+b.dataset.k, 1); redraw(); }));
      check.disabled = placed.length === 0;
    };
    document.querySelectorAll("#bank .chip").forEach((b) => b.addEventListener("click", () => { if (run.answered || placed.includes(+b.dataset.i)) return; placed.push(+b.dataset.i); sfx.tick(); redraw(); }));
    check.addEventListener("click", () => {
      if (run.answered) return;
      run.answered = true;
      const got = placed.map((i) => q.tiles[i]);
      const ok = got.length === q.answer.length && got.every((t, i) => t === q.answer[i]);
      resolve(q, ok, null, { chosen: got.join(" + ") });
    });
  }

  function drawMatch(q) {
    let selL = null, selR = null, done = 0, mistakes = 0;
    const inner = `${header(q)}<p class="prompt">Tap a word, then its meaning</p><div class="match">
      <div class="mcol">${q.left.map((l) => `<button class="mbtn left" data-l="${esc(l)}">${esc(l)}</button>`).join("")}</div>
      <div class="mcol">${q.right.map((r) => `<button class="mbtn" data-r="${esc(r)}">${esc(r)}</button>`).join("")}</div></div>`;
    shell(inner, "");
    const tryPair = () => {
      if (selL == null || selR == null) return;
      const lb = document.querySelector(`[data-l="${CSS.escape(selL)}"]`), rb = document.querySelector(`[data-r="${CSS.escape(selR)}"]`);
      const ok = q.pairs.some(([a, b]) => a === selL && b === selR);
      if (ok) {
        sfx.right(); [lb, rb].forEach((b) => { b.classList.remove("sel"); b.classList.add("ok"); b.disabled = true; }); done++;
        if (done === q.pairs.length) { run.answered = true; resolve(q, mistakes === 0, null, { mistakes }); }
      } else {
        mistakes += 1; sfx.wrong(); buzz(40);
        [lb, rb].forEach((b) => { b.classList.remove("sel"); b.classList.add("bad"); setTimeout(() => b.classList.remove("bad"), 350); });
      }
      selL = selR = null;
    };
    document.querySelectorAll("[data-l]").forEach((b) => b.addEventListener("click", () => {
      if (run.answered || b.disabled) return;
      if (selL === b.dataset.l) { b.classList.remove("sel"); selL = null; return; }
      document.querySelectorAll("[data-l]").forEach((x) => x.classList.remove("sel"));
      selL = b.dataset.l; b.classList.add("sel"); tryPair();
    }));
    document.querySelectorAll("[data-r]").forEach((b) => b.addEventListener("click", () => {
      if (run.answered || b.disabled) return;
      if (selR === b.dataset.r) { b.classList.remove("sel"); selR = null; return; }
      document.querySelectorAll("[data-r]").forEach((x) => x.classList.remove("sel"));
      selR = b.dataset.r; b.classList.add("sel"); tryPair();
    }));
  }

  const RIGHT = ["That's right as rain.", "Yeehaw! Nailed it.", "Smarter than a tree full of owls.", "Bullseye, partner.", "Aristotle would be proud.", "You're on a roll."];
  const WRONG = ["Close, but no cigar.", "Shake it off, partner.", "That one bucked you. It'll come back around.", "Not quite. Even Odysseus took a wrong turn."];
  const GUESS = ["Good guess! Now let's learn it.", "Guessing first helps it stick. Here's the answer."];

  /** The right answer as plain text, for analytics. */
  function answerText(q) {
    if (Array.isArray(q.answer)) return q.answer.join(" + ");
    if (q.type === "tf") return q.answer ? "Greek" : "Not Greek";
    return q.answer == null ? null : String(q.answer);
  }
  /** `detail` carries what the player picked (`chosen`) or, for matching, how many wrong pairs (`mistakes`). */
  function resolve(q, ok, why = null, detail = {}) {
    clearTimeout(rodeoTimer);
    const t = today();
    const answerProps = {
      ...runProps(), ...stepProps(q),
      type: q.type, label: q.label, correct: ok, timed_out: why === "Time's up!",
      ms: run.stepAt ? Date.now() - run.stepAt : null,
      chosen: detail.chosen === undefined ? null : detail.chosen,
      answer: answerText(q),
      mistakes: detail.mistakes === undefined ? null : detail.mistakes,
    };
    if (q.guess) {
      track("question_answered", { ...answerProps, graded: false });
      // pretest: no penalty, no grading, just reveal
      (ok ? sfx.right : sfx.tick)();
      showFeedback(true, ok ? "Nice instinct!" : pick(GUESS), q, true);
      return;
    }
    run.scored += 1; S.answered += 1;
    if (ok) { run.right += 1; S.correct += 1; run.combo += 1; run.maxCombo = Math.max(run.maxCombo, run.combo); sfx.right(); buzz(15); }
    else { run.misses += 1; run.combo = 0; sfx.wrong(); buzz([30, 40, 30]); }
    if (q.itemId) E.grade(S, q.itemId, ok, t);
    track("question_answered", { ...answerProps, graded: true, combo: run.combo });
    if (run.mode === "rodeo") { showFeedback(ok, ok ? pick(RIGHT) : why || "Bucked off!", q); return; }
    if (!ok && !run.requeued.has(run.i)) {
      // missed questions come back at the end of the lesson
      run.requeued.add(run.steps.length);
      run.steps.push({ ...q, label: "Try again" });
    }
    showFeedback(ok, ok ? (run.combo >= 3 ? `${run.combo} in a row!` : pick(RIGHT)) : why || pick(WRONG), q);
  }
  function showFeedback(ok, title, q, neutral = false) {
    const f = $("#footer");
    f.className = `footer ${ok ? "right" : "wrong"}`;
    const ans = !ok && q.type === "mcq" ? `<b>Answer:</b> ${esc(q.answer)}<br>` : !ok && q.type === "build" ? `<b>Answer:</b> ${esc(q.answer.join(" + "))}<br>` : !ok && q.type === "tf" ? `<b>${q.answer ? "Greek" : "Not Greek"}.</b> ` : "";
    const lastRodeo = run.mode === "rodeo" && !ok;
    f.innerHTML = `<div class="footer-inner" role="status">
      <div class="fb-title">${ok || neutral ? I.check.replace("<svg", '<svg width="26" height="26"') : I.x.replace("<svg", '<svg width="26" height="26"')} ${esc(title)}</div>
      <div class="fb-body">${ans}${esc(q.explain || "")}${q.family ? `<span class="fam">Word family: ${esc(q.family)}</span>` : ""}</div>
      <button class="btn block ${ok || neutral ? "olive" : "clay"}" id="next">${lastRodeo ? "See results" : "Continue"}</button></div>`;
    const next = $("#next");
    next.addEventListener("click", () => (run.mode === "rodeo" ? (ok ? nextRodeo() : finishRodeo()) : advance()));
    next.focus();
  }

  function finishRun() {
    const t = today();
    const perfect = run.misses === 0;
    const base = { lesson: 10, roundup: 15, practice: 8 }[run.mode];
    const bonus = perfect ? 5 : 0;
    const comboBonus = run.maxCombo >= 5 ? 2 : 0;
    const gained = base + bonus + comboBonus;
    const before = E.liveStreak(S, t);
    const wasActive = S.lastDay === t;
    const prevTodayXp = S.days[t] || 0;
    E.addXp(S, t, gained);
    const st = E.touchStreak(S, t);
    if (run.mode === "practice") S.practices += 1;
    const wasDone = !!(run.node && S.done[run.node.id]);
    if (run.node && (run.mode === "lesson" || run.mode === "roundup")) S.done[run.node.id] = { perfect, at: t };
    const fresh = E.awardBadges(S, t);
    save();
    run.finished = true;
    track("lesson_completed", { ...runProps(), accuracy: run.scored ? run.right / run.scored : 1, perfect, xp: gained, seconds: Math.round((Date.now() - run.start) / 1000), max_combo: run.maxCombo, streak: S.streak, used_freeze: st.usedFreeze > 0, total_xp: S.xp, learned: Object.keys(S.items).length, answered: run.scored, misses: run.misses, retries: run.requeued.size, first_time: !!run.node && !wasDone });
    trackDayProgress(prevTodayXp, st);
    for (const b of fresh) track("badge_earned", { badge: b.id });
    const acc = run.scored ? Math.round((run.right / run.scored) * 100) : 100;
    const secs = Math.round((Date.now() - run.start) / 1000);
    sfx.done(); confetti();
    const streakLine = !wasActive && st.streakUp ? (st.usedFreeze ? `A freeze saved your streak. ${S.streak} days!` : S.streak > 1 ? `${S.streak}-day streak! ${before === 0 ? "" : "Keep it rolling."}` : "Day 1 of your streak. See you tomorrow.") : `Streak: ${S.streak} days.`;
    shell(`<div class="results">
      ${mascot("cheer")}
      <h1>${perfect ? "Flawless!" : pick(["Well done, partner!", "Lesson complete!", "Yeehaw!"])}</h1>
      <div class="resgrid">
        <div class="res gold"><div class="h">XP</div><div class="v">+${gained}</div></div>
        <div class="res olive"><div class="h">Accuracy</div><div class="v">${acc}%</div></div>
        <div class="res flame"><div class="h">Time</div><div class="v">${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}</div></div>
      </div>
      <p style="font-weight:800">${esc(streakLine)}</p>
      ${fresh.map((b) => `<div class="newbadge">${wreath(b.name[0]).replace("<svg", '<svg width="40" height="40"')}<div>New laurel: ${esc(b.name)}<br><span class="muted">${esc(b.desc)}</span></div></div>`).join("")}
    </div>`, footerBtn("Continue", "gold"));
    $(".progress > i") && ($(".progress > i").style.width = "100%");
    $("#next").addEventListener("click", closeRun);
    $("#next").focus();
  }

  // ---------- rodeo ----------
  let rodeoTimer = null;
  const RODEO_MS = 8000;
  function startRodeo() {
    run = { mode: "rodeo", node: null, steps: [], i: 0, misses: 0, combo: 0, maxCombo: 0, right: 0, scored: 0, requeued: new Set(), answered: false, start: Date.now(), r: E.rng(seed()) };
    track("rodeo_started", { best: S.rodeoBest });
    ui.overlay = "lesson";
    shell(`<div class="results">${mascot("cheer")}<h1>Rodeo</h1><p class="story" style="max-width:34ch">A real bull ride lasts 8 seconds. Here, every question does. Answer before the clock runs out to stay on. One miss and you're bucked off.</p><p class="muted" style="font-weight:800">Your best: ${S.rodeoBest} rides</p></div>`, footerBtn("Open the gate", "gold"));
    $("#next").addEventListener("click", nextRodeo);
  }
  function nextRodeo() {
    const q = E.rodeoQuestion(IX, S, run.r);
    run.steps = [q]; run.i = 0;
    drawStep();
  }
  function startTimer(onTimeout) {
    const bar = $("#timer");
    if (bar) {
      bar.style.transition = "none"; bar.style.transform = "scaleX(1)";
      requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = `transform ${RODEO_MS}ms linear`; bar.style.transform = "scaleX(0)"; }));
    }
    clearTimeout(rodeoTimer);
    rodeoTimer = setTimeout(onTimeout, RODEO_MS);
  }
  function finishRodeo() {
    const t = today();
    const score = run.right;
    const best = score > S.rodeoBest;
    if (best) S.rodeoBest = score;
    const gained = Math.min(score, 20);
    const prevTodayXp = S.days[t] || 0;
    let st = null;
    if (gained > 0) { E.addXp(S, t, gained); st = E.touchStreak(S, t); }
    const fresh = E.awardBadges(S, t);
    save();
    run.finished = true;
    track("rodeo_finished", { rides: score, best: S.rodeoBest, new_best: best && score > 0, xp: gained, seconds: Math.round((Date.now() - run.start) / 1000) });
    trackDayProgress(prevTodayXp, st);
    for (const b of fresh) track("badge_earned", { badge: b.id });
    if (best && score > 0) confetti();
    sfx.done();
    shell(`<div class="results">${mascot(score >= 5 ? "cheer" : "sad")}
      <h1>${score === 0 ? "Bucked off!" : best ? "New best ride!" : `${score} rides!`}</h1>
      <div class="resgrid"><div class="res gold"><div class="h">XP</div><div class="v">+${gained}</div></div><div class="res flame"><div class="h">Rides</div><div class="v">${score}</div></div><div class="res olive"><div class="h">Best</div><div class="v">${S.rodeoBest}</div></div></div>
      ${fresh.map((b) => `<div class="newbadge">${wreath(b.name[0]).replace("<svg", '<svg width="40" height="40"')}<div>New laurel: ${esc(b.name)}</div></div>`).join("")}
    </div>`, `<div class="footer-inner"><button class="btn block gold" id="again">Ride again</button><button class="btn block ghost" id="next">Done</button></div>`);
    $("#again").addEventListener("click", startRodeo);
    $("#next").addEventListener("click", closeRun);
  }

  // ---------- huddle (present a unit at standup) ----------
  let huddle = null;
  function openHuddle(unitId) {
    const u = IX.course.units.find((x) => x.id === unitId);
    const its = u.lessons.flatMap((l) => l.items.map((x) => IX.items.get(x.id)));
    huddle = { u, its, i: 0 };
    track("huddle_opened", { unit_id: unitId, tab: ui.tab });
    ui.overlay = "huddle";
    drawHuddle();
  }
  function drawHuddle() {
    let o = $(".huddle");
    if (!o) { o = document.createElement("div"); o.className = "huddle"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); document.body.appendChild(o); }
    const it = huddle.its[huddle.i];
    const body = it.kind === "origin"
      ? `<div class="w">${esc(it.w)}</div><div class="m">${it.greek ? "Greek" : "Not Greek"}</div><p class="say">${esc(it.from)}</p>`
      : `<div class="w">${esc(E.labelOf(it))}</div><div class="greek">${esc(it.gr)}</div><div class="m">${esc(it.m)}</div><p class="say">${esc(it.say)}</p><p class="tx">${esc(it.kind === "root" ? it.hook : it.tex)}</p>${it.kind === "root" ? `<p class="tx">${esc(it.ex.map((e) => e[0]).join(" · "))}</p>` : `<p class="tx">At work: ${esc(it.work)}</p>`}`;
    o.innerHTML = `<div class="huddle-inner">
      <div class="row"><button class="xbtn" id="hx" aria-label="Close">${I.x}</button><div style="font-weight:900">Huddle · ${esc(huddle.u.title)}</div></div>
      <div class="slide">${body}</div>
      <div class="nav"><button class="btn small" id="hp" ${huddle.i === 0 ? "disabled" : ""}>Back</button><span class="count">${huddle.i + 1} / ${huddle.its.length}</span><button class="btn small" id="hn">${huddle.i === huddle.its.length - 1 ? "Done" : "Next"}</button></div>
    </div>`;
    $("#hx").addEventListener("click", closeHuddle);
    $("#hp").addEventListener("click", () => { if (huddle.i > 0) { huddle.i--; drawHuddle(); } });
    $("#hn").addEventListener("click", () => { if (huddle.i < huddle.its.length - 1) { huddle.i++; drawHuddle(); } else closeHuddle(); });
  }
  function closeHuddle() {
    if (huddle) track("huddle_closed", { unit_id: huddle.u.id, slide: huddle.i + 1, slides: huddle.its.length, finished: huddle.i === huddle.its.length - 1 });
    huddle = null; ui.overlay = null; const o = $(".huddle"); if (o) o.remove(); render(); }

  // ---------- keyboard ----------
  addEventListener("keydown", (e) => {
    if (ui.overlay === "huddle") {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); $("#hn") && $("#hn").click(); }
      if (e.key === "ArrowLeft") $("#hp") && $("#hp").click();
      if (e.key === "Escape") closeHuddle();
      return;
    }
    if (ui.overlay !== "lesson" || !run) return;
    if (e.key === "Escape") return closeRun();
    if (/^[1-4]$/.test(e.key) && !run.answered) {
      const opts = document.querySelectorAll(".options .opt, .tfrow .opt");
      const b = opts[+e.key - 1];
      if (b) { e.preventDefault(); b.click(); }
    }
    if (e.key === "Enter") {
      const n = $("#next") || $("#check");
      if (n && !n.disabled && document.activeElement !== n) { e.preventDefault(); n.click(); }
    }
  });

  // ---------- boot ----------
  const h = location.hash.slice(1);
  if (TABS.some((t) => t.id === h)) ui.tab = h;
  trackAppOpened();
  render();
  connect().catch((e) => { console.warn("[greek] connect", e); cloud.ready = true; rerenderTab(); });
})();
