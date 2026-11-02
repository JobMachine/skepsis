// Development only: load demo progress so every screen can be checked without playing through.
// Open with: xcrun simctl openurl booted "exp://127.0.0.1:8081/--/dev?to=/"
// In release builds this route just goes home and changes nothing.
import { useEffect } from "react";
import { router, useLocalSearchParams, type Href } from "expo-router";

import { E, NODES } from "@/course";
import { ensureQuests, questById } from "@/lib/quests";
import { getState, update, type AppState } from "@/lib/store";

function resetState(s: AppState) {
  const keep = getState().installId;
  Object.assign(s, E.freshState(), { drachmas: 0, quests: null, hats: ["wreath"], hat: "wreath", lessonsFinished: 0, installId: keep });
}

export default function Dev() {
  const { to = "/", fresh, blank } = useLocalSearchParams<{ to?: string; fresh?: string; blank?: string }>();
  useEffect(() => {
    if (!__DEV__) { router.replace("/"); return; }
    update((s) => {
      if (fresh) { s.onboarded = false; return; }
      if (blank) { resetState(s); s.onboarded = true; return; }
      const t = E.dayKey();
      s.onboarded = true;
      s.motivation = "work";
      NODES.slice(0, 5).forEach((n, i) => { s.done[n.id] = { perfect: i % 2 === 0, at: E.addDays(t, -i) }; });
      ["tele", "phone", "scope", "photo", "graph", "auto", "mega", "micro", "poly"].forEach((id, i) => {
        s.items[id] = { box: (i % 5) + 1, due: E.addDays(t, i % 3 - 1), right: 3 + i, wrong: i % 3 };
      });
      for (let i = 0; i < 7; i++) s.days[E.addDays(t, -i)] = i === 0 ? 15 : 10 + ((i * 7) % 25);
      s.xp = 240; s.streak = 6; s.bestStreak = 9; s.lastDay = t; s.drachmas = 140; s.rodeoBest = 7;
      s.answered = 120; s.correct = 98; s.practices = 2;
      E.awardBadges(s, t);
      const q = ensureQuests(s);
      q.progress[q.ids[0]] = questById(q.ids[0]).target; q.progress[q.ids[1]] = 1;
    });
    router.replace(to as Href);
  }, [fresh, blank, to]);
  return null;
}
