// Small building blocks shared by every screen: text, buttons, cards, pills.
// The chunky "pressable 3D" button is the website's .btn: a solid shadow that squashes on press.
import type { ReactNode } from "react";
import { Pressable, Text, View, type PressableProps, type StyleProp, type TextProps, type TextStyle, type ViewStyle } from "react-native";
import { SymbolView, type SFSymbol } from "expo-symbols";

import { haptic } from "@/lib/feedback";
import { cardShadow, font, radius, useTheme, type Palette } from "@/theme";

export function T({ style, w = "bold", size = 16, color, ...p }: TextProps & { w?: keyof typeof font; size?: number; color?: string }) {
  const c = useTheme();
  return <Text {...p} style={[{ fontFamily: font[w], fontSize: size, color: color ?? c.ink, lineHeight: Math.round(size * 1.35) }, style]} />;
}

export function Eyebrow({ children, color }: { children: ReactNode; color?: string }) {
  const c = useTheme();
  return <T w="heavy" size={12} color={color ?? c.muted} style={{ letterSpacing: 1, textTransform: "uppercase" }}>{children}</T>;
}

type Tone = "brand" | "gold" | "olive" | "clay" | "ghost" | "disabled";
const tones = (c: Palette): Record<Tone, { bg: string; deep: string; fg: string; border?: string }> => ({
  brand: { bg: c.brand, deep: c.brandDeep, fg: c.onBrand },
  gold: { bg: c.gold, deep: c.goldDeep, fg: "#ffffff" },
  olive: { bg: c.olive, deep: c.oliveDeep, fg: "#ffffff" },
  clay: { bg: c.clay, deep: c.clayDeep, fg: "#ffffff" },
  ghost: { bg: c.surface, deep: c.line, fg: c.ink, border: c.line },
  disabled: { bg: c.line, deep: c.locked, fg: c.muted },
});

export function Btn({ label, tone = "brand", onPress, disabled, icon, small, style, block = true }: {
  label: string; tone?: Tone; onPress?: () => void; disabled?: boolean; icon?: SFSymbol; small?: boolean; style?: StyleProp<ViewStyle>; block?: boolean;
}) {
  const c = useTheme();
  const t = tones(c)[disabled ? "disabled" : tone];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => { haptic.soft(); onPress?.(); }}
      style={({ pressed }) => [{
        minHeight: small ? 38 : 52, paddingHorizontal: small ? 14 : 20, borderRadius: radius.md, borderCurve: "continuous",
        backgroundColor: t.bg, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8,
        borderWidth: t.border ? 1.5 : 0, borderColor: t.border,
        boxShadow: `0 ${pressed ? 1 : small ? 3 : 4}px 0 ${t.deep}`,
        transform: [{ translateY: pressed ? (small ? 2 : 3) : 0 }],
        alignSelf: block ? "stretch" : "auto",
      }, style]}
    >
      {icon && <SymbolView name={icon} size={small ? 15 : 18} tintColor={t.fg} />}
      <T w="black" size={small ? 13 : 16} color={t.fg} style={{ letterSpacing: 0.6, textTransform: "uppercase" }}>{label}</T>
    </Pressable>
  );
}

export function Card({ children, style, onPress, ...p }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void } & Omit<PressableProps, "style" | "children">) {
  const c = useTheme();
  const base: ViewStyle = { backgroundColor: c.surface, borderRadius: radius.lg, borderCurve: "continuous", padding: 16, borderWidth: 1, borderColor: c.line, boxShadow: cardShadow, gap: 10 };
  if (!onPress) return <View style={[base, style]}>{children}</View>;
  return (
    <Pressable {...p} onPress={() => { haptic.tap(); onPress(); }} style={({ pressed }) => [base, { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] }, style]}>
      {children}
    </Pressable>
  );
}

export function Pill({ icon, label, color, bg, onPress }: { icon: SFSymbol; label: string | number; color: string; bg?: string; onPress?: () => void }) {
  const c = useTheme();
  return (
    <Pressable onPress={onPress} hitSlop={6} accessibilityLabel={String(label)} style={({ pressed }) => ({
      flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999,
      backgroundColor: bg ?? c.surface, borderWidth: 1, borderColor: c.line, opacity: pressed ? 0.7 : 1,
    })}>
      <SymbolView name={icon} size={16} tintColor={color} />
      <T w="heavy" size={15} color={color} style={{ fontVariant: ["tabular-nums"] }}>{label}</T>
    </Pressable>
  );
}

export function Icon({ name, size = 20, color }: { name: SFSymbol; size?: number; color: string }) {
  return <SymbolView name={name} size={size} tintColor={color} />;
}

/** Engine prompts mark the key word as <span class="w">…</span>; render it bold in brand blue. */
export function Rich({ html, size = 20, style, center }: { html: string; size?: number; style?: StyleProp<TextStyle>; center?: boolean }) {
  const c = useTheme();
  const parts = html.split(/<span class="w">(.*?)<\/span>/g);
  return (
    <T w="heavy" size={size} style={[{ textAlign: center ? "center" : "left" }, style]}>
      {parts.map((p, i) => (i % 2 ? <Text key={i} style={{ color: c.brand, fontFamily: font.black }}>{p}</Text> : p))}
    </T>
  );
}
