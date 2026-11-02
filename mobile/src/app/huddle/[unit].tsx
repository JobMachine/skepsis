// Huddle: present a unit at standup, one big slide per word. Swipe or tap Next.
import { useRef, useState } from "react";
import { FlatList, Pressable, useWindowDimensions, View, type ListViewToken } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { E, IX, type IndexedItem } from "@/course";
import { Btn, Icon, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { useTheme } from "@/theme";

function Slide({ it, width }: { it: IndexedItem; width: number }) {
  const c = useTheme();
  return (
    <View style={{ width, padding: 24, justifyContent: "center", gap: 14 }}>
      <T w="black" size={52} color="#fff" style={{ lineHeight: 58 }}>{E.labelOf(it)}</T>
      {"gr" in it && <T w="greek" size={34} color={c.goldSoft}>{it.gr}</T>}
      <T w="black" size={24} color={c.gold}>{it.kind === "origin" ? (it.greek ? "Greek" : "Not Greek") : it.m}</T>
      <T w="semibold" size={20} color="#fff" style={{ lineHeight: 28 }}>{it.kind === "origin" ? it.from : it.say}</T>
      {it.kind === "root" && <T w="bold" size={16} color="rgba(255,255,255,0.8)">{it.hook}{"\n\n"}{it.ex.map((e) => e[0]).join(" · ")}</T>}
      {it.kind === "idea" && <T w="bold" size={16} color="rgba(255,255,255,0.8)">{it.tex}{"\n\n"}At work: {it.work}</T>}
    </View>
  );
}

export default function Huddle() {
  const { unit } = useLocalSearchParams<{ unit: string }>();
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const u = IX.course.units.find((x) => x.id === unit)!;
  const its = u.lessons.flatMap((l) => l.items.map((x) => IX.items.get(x.id)!));
  const [i, setI] = useState(0);
  const list = useRef<FlatList<IndexedItem>>(null);
  const [onView] = useState(() => ({ viewableItems }: { viewableItems: ListViewToken[] }) => { if (viewableItems[0]?.index != null) setI(viewableItems[0].index); });
  useState(() => track("huddle_opened", { unit_id: unit }));

  const go = (n: number) => { if (n >= its.length) return router.back(); list.current?.scrollToIndex({ index: Math.max(0, n) }); };
  return (
    <View style={{ flex: 1, backgroundColor: c.brandDeep, paddingTop: insets.top, paddingBottom: insets.bottom + 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 8 }}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityLabel="Close"><Icon name="xmark" size={22} color="#fff" /></Pressable>
        <T w="black" color="#fff" style={{ flex: 1 }} numberOfLines={1}>Huddle · {u.title}</T>
        <T w="heavy" color="rgba(255,255,255,0.8)" style={{ fontVariant: ["tabular-nums"] }}>{i + 1} / {its.length}</T>
      </View>
      <FlatList ref={list} data={its} horizontal pagingEnabled showsHorizontalScrollIndicator={false} keyExtractor={(x) => x.id}
        renderItem={({ item }) => <Slide it={item} width={width} />} onViewableItemsChanged={onView} viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })} />
      <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 16 }}>
        <Btn label="Back" tone="ghost" disabled={i === 0} onPress={() => go(i - 1)} style={{ flex: 1 }} />
        <Btn label={i === its.length - 1 ? "Done" : "Next"} tone="gold" onPress={() => go(i + 1)} style={{ flex: 1 }} />
      </View>
    </View>
  );
}
