// The lesson's top bar: quit, progress (or a title for Rodeo), and a combo counter.
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { Icon, T } from "@/components/ui";
import { useTheme } from "@/theme";

export function TopBar({ onQuit, progress = 0, combo, title }: { onQuit: () => void; progress?: number; combo: number; title?: string }) {
  const c = useTheme();
  const pct = `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%` as const;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 8 }}>
      <Pressable onPress={onQuit} hitSlop={10} accessibilityLabel="Quit" style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center" }}>
        <Icon name="xmark" size={22} color={c.muted} />
      </Pressable>
      {title != null ? (
        <T w="black" size={17} style={{ flex: 1 }}>{title}</T>
      ) : (
        <View style={{ flex: 1, height: 16, borderRadius: 999, backgroundColor: c.surface2, overflow: "hidden" }}>
          {/* Absolutely positioned and childless, so animating width is cheap (see expo-animation). */}
          <Animated.View style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: pct, backgroundColor: c.olive, borderRadius: 999, transitionProperty: "width", transitionDuration: 350 }} />
        </View>
      )}
      <View style={{ minWidth: 44, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
        {combo >= 3 && <><Icon name="flame.fill" size={14} color={c.flame} /><T w="black" size={14} color={c.flame}>{combo}</T></>}
      </View>
    </View>
  );
}
