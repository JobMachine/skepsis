// The panel that slides up after an answer: right/wrong, the answer, why, and Continue.
import { View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Question } from "@/course";
import { Btn, Icon, T } from "@/components/ui";
import { useTheme } from "@/theme";

export function FeedbackPanel({ ok, neutral, title, q, onNext, nextLabel = "Continue" }: { ok: boolean; neutral?: boolean; title: string; q: Question; onNext: () => void; nextLabel?: string }) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const good = ok || neutral;
  const answer = !ok && q.type === "mcq" ? q.answer : !ok && q.type === "build" ? q.answer.join(" + ") : !ok && q.type === "tf" ? (q.answer ? "Greek" : "Not Greek") : null;
  return (
    <Animated.View entering={SlideInDown.duration(220)} style={{
      position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingTop: 16, paddingBottom: insets.bottom + 12, gap: 10,
      backgroundColor: good ? c.oliveSoft : c.claySoft, borderTopWidth: 2, borderTopColor: good ? c.olive : c.clay,
    }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }} accessibilityLiveRegion="polite">
        <Icon name={good ? "checkmark.circle.fill" : "xmark.circle.fill"} size={26} color={good ? c.olive : c.clay} />
        <T w="black" size={21} color={good ? c.rightText : c.wrongText} style={{ flex: 1 }}>{title}</T>
      </View>
      {answer && <T w="heavy" size={15}>Answer: {answer}</T>}
      {!!q.explain && <T w="semibold" size={15} selectable>{q.explain}</T>}
      {!!q.family && <T w="bold" size={13} color={c.muted}>Word family: {q.family}</T>}
      <Btn label={nextLabel} tone={good ? "olive" : "clay"} onPress={onNext} />
    </Animated.View>
  );
}
