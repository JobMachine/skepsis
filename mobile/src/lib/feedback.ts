// Sounds and haptics. The tones are the website's, rendered to WAV by scripts/make-sounds.mjs.
// Sounds mix with the user's music and respect the silent switch.
import * as Haptics from "expo-haptics";
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from "expo-audio";

import { getState } from "./store";

const SOURCES = {
  right: require("@/assets/sounds/right.wav"),
  wrong: require("@/assets/sounds/wrong.wav"),
  done: require("@/assets/sounds/done.wav"),
  tick: require("@/assets/sounds/tick.wav"),
  streak: require("@/assets/sounds/streak.wav"),
};
type Sound = keyof typeof SOURCES;

let players: Partial<Record<Sound, AudioPlayer>> | null = null;

function ensurePlayers() {
  if (players) return players;
  players = {};
  setAudioModeAsync({ playsInSilentMode: false, interruptionMode: "mixWithOthers" }).catch(() => {});
  for (const k of Object.keys(SOURCES) as Sound[]) {
    try {
      players[k] = createAudioPlayer(SOURCES[k]);
    } catch {
      // Audio is optional.
    }
  }
  return players;
}

export function play(name: Sound) {
  if (!getState().sound) return;
  try {
    const p = ensurePlayers()[name];
    if (!p) return;
    p.seekTo(0);
    p.play();
  } catch {
    // Audio is optional.
  }
}

const on = () => getState().haptics && process.env.EXPO_OS === "ios";

export const haptic = {
  tap: () => on() && Haptics.selectionAsync().catch(() => {}),
  right: () => on() && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}),
  wrong: () => on() && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {}),
  heavy: () => on() && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {}),
  soft: () => on() && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft).catch(() => {}),
};

export const sfx = {
  right: () => { play("right"); haptic.right(); },
  wrong: () => { play("wrong"); haptic.wrong(); },
  done: () => { play("done"); haptic.heavy(); },
  tick: () => { play("tick"); haptic.tap(); },
  streak: () => { play("streak"); haptic.heavy(); },
};
