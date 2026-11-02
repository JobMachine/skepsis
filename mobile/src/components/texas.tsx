// The "Texas take" callout: a lone star plus a local example. Used on intros and word pages.
import { View } from "react-native";

import { useTheme } from "@/theme";
import { Icon, T } from "./ui";

export function Texas({ text }: { text: string }) {
  const c = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 10, padding: 12, borderRadius: 14, borderCurve: "continuous", backgroundColor: c.brandSoft, alignItems: "flex-start" }}>
      <Icon name="star.fill" size={24} color={c.brand} />
      <T w="bold" size={15} style={{ flex: 1 }} selectable>{text}</T>
    </View>
  );
}

export function Bubble({ text }: { text: string }) {
  const c = useTheme();
  return (
    <View style={{ flex: 1, minWidth: 0 }}>
      <View style={{ position: "absolute", left: -7, top: "50%", marginTop: -7, width: 14, height: 14, transform: [{ rotate: "45deg" }], backgroundColor: c.surface, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: c.line }} />
      <View style={{ backgroundColor: c.surface, borderWidth: 2, borderColor: c.line, borderRadius: 16, borderCurve: "continuous", paddingHorizontal: 14, paddingVertical: 12 }}>
        <T w="bold" size={15}>{text}</T>
      </View>
    </View>
  );
}
