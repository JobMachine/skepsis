// A big selectable row (goal, motivation, reminder time). Pressed state = brand outline.
import { Pressable, View } from "react-native";
import type { SFSymbol } from "expo-symbols";

import { haptic } from "@/lib/feedback";
import { useTheme } from "@/theme";
import { Icon, T } from "./ui";

export function Choice({ label, sub, selected, onPress, icon, right }: { label: string; sub?: string; selected: boolean; onPress: () => void; icon?: SFSymbol; right?: string }) {
  const c = useTheme();
  return (
    <Pressable accessibilityRole="radio" accessibilityState={{ selected }} accessibilityLabel={label} onPress={() => { haptic.tap(); onPress(); }}
      style={({ pressed }) => ({
        flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 14, borderCurve: "continuous", borderWidth: 2,
        borderColor: selected ? c.brand : c.line, backgroundColor: selected ? c.brandSoft : c.surface,
        boxShadow: `0 ${pressed ? 1 : 3}px 0 ${selected ? c.brand : c.line}`, transform: [{ translateY: pressed ? 2 : 0 }],
      })}>
      {icon && <Icon name={icon} size={24} color={selected ? c.brand : c.muted} />}
      <View style={{ flex: 1 }}>
        <T w="black" size={16}>{label}</T>
        {sub && <T w="bold" size={13} color={c.muted}>{sub}</T>}
      </View>
      {right && <T w="heavy" size={14} color={c.muted}>{right}</T>}
    </Pressable>
  );
}
