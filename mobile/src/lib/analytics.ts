// Anonymous usage analytics. This file is the whole story; read it to see exactly what leaves the phone.
//
// What we send: event names ("lesson_completed") and game numbers (accuracy, XP, lesson id),
// tagged with a random install id made on this phone. That's how we learn which lessons are
// too hard and where people give up.
// What we never send: your name, email, contacts, location, answers you type, or anything
// that identifies you. There are no accounts. PostHog builds no person profile
// ($process_person_profile: false) and skips GeoIP lookups ($geoip_disable: true).
// You can turn it off in Me › Settings › Share anonymous usage; then nothing is sent at all.
// If the app is built without EXPO_PUBLIC_POSTHOG_KEY (any fork, by default), nothing is sent.
import { AppState as RNAppState, Platform } from "react-native";
import * as Application from "expo-application";

import { getState } from "./store";

const KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY || "";
const HOST = (process.env.EXPO_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com").replace(/\/$/, "");
// Development builds don't send (so testing never pollutes real numbers) unless you opt in
// with EXPO_PUBLIC_ANALYTICS_IN_DEV=1, which also logs each batch to the console.
const DEV_SEND = process.env.EXPO_PUBLIC_ANALYTICS_IN_DEV === "1";
const ENABLED = /^phc_[A-Za-z0-9]+$/.test(KEY) && (!__DEV__ || DEV_SEND);

type Props = Record<string, string | number | boolean | null | undefined>;
type Event = { event: string; properties: Props; timestamp: string };

let queue: Event[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let sessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const analyticsAvailable = ENABLED;

export function track(event: string, props: Props = {}) {
  if (!ENABLED || !getState().analytics) return;
  const s = getState();
  queue.push({
    event,
    timestamp: new Date().toISOString(),
    properties: {
      ...props,
      distinct_id: s.installId,
      $process_person_profile: false,
      $geoip_disable: true,
      $session_id: sessionId,
      app: "skepsis",
      env: __DEV__ ? "development" : "production",
      surface: Platform.OS,
      app_version: Application.nativeApplicationVersion ?? "dev",
      $os: Platform.OS,
      $os_version: String(Platform.Version),
    },
  });
  if (queue.length >= 20) flush();
  else if (!timer) timer = setTimeout(flush, 10_000);
}

export async function flush() {
  if (timer) { clearTimeout(timer); timer = null; }
  if (!ENABLED || !queue.length) return;
  if (!getState().analytics) { queue = []; return; }
  const batch = queue;
  queue = [];
  try {
    const res = await fetch(`${HOST}/batch/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: KEY, batch }),
    });
    if (!res.ok && queue.length < 200) queue = batch.concat(queue);
    if (__DEV__) console.log(`[analytics] sent ${batch.length} events: HTTP ${res.status}`);
  } catch {
    // Offline: keep the events for the next try (bounded so it never grows forever).
    if (queue.length < 200) queue = batch.concat(queue);
  }
}

/** Drop anything not yet sent (used when the user turns analytics off). */
export function dropQueue() {
  queue = [];
}

RNAppState.addEventListener("change", (st) => {
  if (st === "background") flush();
  if (st === "active") sessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
});
