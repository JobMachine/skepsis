import { describe, expect, it } from "@jest/globals";

import { pickJapaneseVoice, voiceScore } from "./japanese-voice";

const v = (identifier: string, language: string, quality = "Default") => ({ identifier, name: identifier, language, quality });

describe("pickJapaneseVoice", () => {
  it("prefers premium, then enhanced, then the compact Japanese voice", () => {
    const compact = v("com.apple.voice.compact.ja-JP.Kyoko", "ja-JP");
    const enhanced = v("com.apple.voice.enhanced.ja-JP.Otoya", "ja-JP", "Enhanced");
    const premium = v("com.apple.voice.premium.ja-JP.Kyoko", "ja-JP", "Enhanced");
    const english = v("com.apple.voice.premium.en-US.Zoe", "en-US", "Enhanced");
    expect(pickJapaneseVoice([english, compact, enhanced, premium])).toBe(premium);
    expect(pickJapaneseVoice([english, compact, enhanced])).toBe(enhanced);
    expect(pickJapaneseVoice([english, compact])).toBe(compact);
  });

  it("returns null when the phone has no Japanese voice", () => {
    expect(pickJapaneseVoice([v("com.apple.voice.compact.en-US.Samantha", "en-US")])).toBeNull();
    expect(pickJapaneseVoice([])).toBeNull();
  });

  it("only counts Japanese language tags", () => {
    expect(voiceScore(v("x", "ja"))).toBe(1);
    expect(voiceScore(v("x", "ja_JP"))).toBe(1);
    expect(voiceScore(v("x", "jv-ID"))).toBe(-1);
  });
});
