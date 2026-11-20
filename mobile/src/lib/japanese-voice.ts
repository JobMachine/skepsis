// Reads Japanese aloud with the best native Japanese voice installed on the phone.
// Speech runs in its own system audio session, so it is heard even when the silent switch is on
// (the app's lyre sounds still respect the switch; see feedback.ts).
import * as Speech from "expo-speech";

/** Only the fields we read; quality is "Default" or "Enhanced" (expo-speech VoiceQuality values). */
type VoiceLike = { identifier: string; name: string; quality: string; language: string };

/** Higher is better: premium > enhanced > compact/default. Non-Japanese voices score -1. */
export function voiceScore(v: VoiceLike): number {
  if (!/^ja([-_]|$)/i.test(v.language)) return -1;
  const id = v.identifier.toLowerCase();
  if (id.includes("premium")) return 3;
  if (v.quality === "Enhanced" || id.includes("enhanced")) return 2;
  return 1;
}

/** The best Japanese voice in the list, or null when the phone has none. Ties keep the list order. */
export function pickJapaneseVoice(voices: readonly VoiceLike[]): VoiceLike | null {
  let best: VoiceLike | null = null;
  for (const v of voices) if (voiceScore(v) > (best ? voiceScore(best) : 0)) best = v;
  return best;
}

let voicePromise: Promise<string | undefined> | null = null;
/** Looked up once per launch; undefined lets iOS choose its default ja-JP voice. */
function japaneseVoiceId(): Promise<string | undefined> {
  voicePromise ??= Speech.getAvailableVoicesAsync()
    .then((all) => pickJapaneseVoice(all)?.identifier)
    .catch(() => undefined);
  return voicePromise;
}

export async function speakJapanese(text: string): Promise<void> {
  Speech.stop();
  const voice = await japaneseVoiceId();
  Speech.speak(text, { language: "ja-JP", voice, rate: 0.85, useApplicationAudioSession: false });
}
