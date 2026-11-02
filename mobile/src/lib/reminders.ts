// Local reminders, scheduled on the phone by iOS. No push server, no device token leaves the phone.
// We keep the next 7 days scheduled and skip today once the daily goal is met.
import * as Notifications from "expo-notifications";

import { E } from "@/course";
import { getState } from "./store";

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: false, shouldSetBadge: false }),
});

const LINES = [
  (n: number) => (n > 1 ? `Your ${n}-day streak is waiting on you, partner.` : "Three minutes of Greek? Homer saved you a seat."),
  () => "Tele, phon, graph... you know more Greek than you think. Prove it.",
  (n: number) => (n > 1 ? `Don't let ${n} days go to waste. One quick lesson keeps it alive.` : "Fixin' to learn a Greek root? It takes three minutes."),
  () => "Today's quests are fresh. Drachmas don't earn themselves.",
  () => "Homer's been polishing his shell. Come say howdy.",
  (n: number) => (n >= 7 ? `${n} days! Marathon runners would be proud. Keep going.` : "A word a day keeps the hubris away."),
  () => "Rodeo's open. Eight seconds a question. Can you stay on?",
];
const TITLES = ["Skepsis", "Homer the armadillo", "Time for Greek", "Yeehaw, it's lesson time"];

export async function askPermission(): Promise<boolean> {
  const cur = await Notifications.getPermissionsAsync();
  if (cur.granted) return true;
  const req = await Notifications.requestPermissionsAsync({ ios: { allowAlert: true, allowSound: true, allowBadge: false } });
  return req.granted;
}

/** Replace all scheduled reminders with the next 7 days. Safe to call often. */
export async function reschedule() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const s = getState();
    if (!s.onboarded || !s.reminders.on) return;
    const perm = await Notifications.getPermissionsAsync();
    if (!perm.granted) return;
    const today = E.dayKey();
    const doneToday = (s.days[today] || 0) >= s.goal;
    const streak = E.liveStreak(s, today);
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const at = new Date(now);
      at.setDate(now.getDate() + i);
      at.setHours(s.reminders.hour, s.reminders.minute, 0, 0);
      if (at <= now) continue;
      if (i === 0 && doneToday) continue;
      const n = i === 0 ? streak : streak + i; // assume they keep going
      await Notifications.scheduleNotificationAsync({
        content: { title: TITLES[(at.getDate() + i) % TITLES.length], body: LINES[(at.getDate() * 3 + i) % LINES.length](n) },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at },
      });
    }
  } catch {
    // Reminders are a nice-to-have; never crash over them.
  }
}
