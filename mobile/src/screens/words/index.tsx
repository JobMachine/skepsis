// Every root, idea and "Is it Greek?" word, searchable. Tap one for its page; Huddle presents a unit.
import { useLayoutEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, View } from "react-native";
import { router, useNavigation } from "expo-router";

import { E, IX, type IndexedItem } from "@/course";
import { Card, Icon, T } from "@/components/ui";
import { haptic } from "@/lib/feedback";
import { useApp } from "@/lib/store";
import { useTheme } from "@/theme";

const FILTERS = [["all", "All"], ["roots", "Roots"], ["ideas", "Ideas & myths"], ["origins", "Is it Greek?"], ["learned", "I've learned"], ["weak", "Needs work"]] as const;
type Filter = (typeof FILTERS)[number][0];

function Chip({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  const c = useTheme();
  return (
    <Pressable onPress={() => { haptic.tap(); onPress(); }} accessibilityState={{ selected: on }}
      style={{ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, borderWidth: 2, borderColor: on ? c.brand : c.line, backgroundColor: on ? c.brandSoft : c.surface }}>
      <T w="heavy" size={13} color={on ? c.brand : c.ink}>{label}</T>
    </Pressable>
  );
}

function Row({ it }: { it: IndexedItem }) {
  const s = useApp();
  const c = useTheme();
  const prog = s.items[it.id];
  const meaning = it.kind === "origin" ? (it.greek ? "Greek" : "Not Greek") : it.m;
  return (
    <Card onPress={() => router.push({ pathname: "/word/[id]", params: { id: it.id } })} style={{ gap: 4 }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <T w="black" size={19}>{E.labelOf(it)}</T>
        {"gr" in it && <T w="greek" size={17} color={c.brand}>{it.gr}</T>}
        <View style={{ flex: 1 }} />
        {prog && (
          <View style={{ flexDirection: "row", gap: 2 }} accessibilityLabel={`Strength ${prog.box} of 5`}>
            {[1, 2, 3, 4, 5].map((b) => <View key={b} style={{ width: 6, height: 12, borderRadius: 2, backgroundColor: b <= prog.box ? c.olive : c.surface2 }} />)}
          </View>
        )}
      </View>
      <T w="heavy" size={14} color={it.kind === "origin" ? (it.greek ? c.olive : c.clay) : c.ink}>{meaning}</T>
      <T w="semibold" size={14} color={c.muted} numberOfLines={2}>{it.say}</T>
    </Card>
  );
}

export function Words() {
  const s = useApp();
  const c = useTheme();
  const nav = useNavigation();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useLayoutEffect(() => {
    nav.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search: tele, hubris, rodeo…",
        autoCapitalize: "none",
        hideWhenScrolling: false,
        onChangeText: (e: { nativeEvent: { text: string } }) => setQ(e.nativeEvent.text),
        onCancelButtonPress: () => setQ(""),
      },
    });
  }, [nav]);

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return [...IX.items.values()].filter((it) => {
      if (filter === "roots" && it.kind !== "root") return false;
      if (filter === "ideas" && it.kind !== "idea") return false;
      if (filter === "origins" && it.kind !== "origin") return false;
      if (filter === "learned" && !s.items[it.id]) return false;
      if (filter === "weak" && !(s.items[it.id] && (s.items[it.id].box <= 1 || s.items[it.id].wrong > s.items[it.id].right))) return false;
      return !needle || JSON.stringify(it).toLowerCase().includes(needle);
    });
  }, [q, filter, s.items]);

  const learned = Object.keys(s.items).length;
  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.id}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 48 }}
      ListHeaderComponent={
        <View style={{ gap: 12, paddingBottom: 6 }}>
          <T w="bold" color={c.muted}>{learned} of {IX.items.size} learned. Every one has a one-breath line you can use to teach it.</T>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {FILTERS.map(([k, l]) => <Chip key={k} label={l} on={filter === k} onPress={() => setFilter(k)} />)}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {IX.course.units.map((u, i) => (
              <Pressable key={u.id} onPress={() => router.push({ pathname: "/huddle/[unit]", params: { unit: u.id } })}
                style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, backgroundColor: c.brand }}>
                <Icon name="person.3.fill" size={13} color={c.onBrand} />
                <T w="heavy" size={13} color={c.onBrand}>Huddle: unit {i + 1}</T>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      }
      ListEmptyComponent={<Card><T w="bold" color={c.muted}>No matches. Try another word.</T></Card>}
      renderItem={({ item }) => <Row it={item} />}
    />
  );
}
