import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/native-tabs";

import { questStatus } from "@/lib/quests";
import { useApp } from "@/lib/store";
import { useTheme } from "@/theme";

export default function TabsLayout() {
  const s = useApp();
  const c = useTheme();
  if (!s.onboarded) return <Redirect href="/onboarding" />;
  const ready = questStatus(s.quests).ready;
  return (
    <NativeTabs tintColor={c.brand} minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="(learn)">
        <NativeTabs.Trigger.Icon sf={{ default: "building.columns", selected: "building.columns.fill" }} md="school" />
        <NativeTabs.Trigger.Label>Learn</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="quests">
        <NativeTabs.Trigger.Icon sf={{ default: "scroll", selected: "scroll.fill" }} md="flag" />
        <NativeTabs.Trigger.Label>Quests</NativeTabs.Trigger.Label>
        {ready > 0 && <NativeTabs.Trigger.Badge>{String(ready)}</NativeTabs.Trigger.Badge>}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="words">
        <NativeTabs.Trigger.Icon sf={{ default: "book", selected: "book.fill" }} md="menu_book" />
        <NativeTabs.Trigger.Label>Words</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="me">
        <NativeTabs.Trigger.Icon sf={{ default: "person.crop.circle", selected: "person.crop.circle.fill" }} md="person" />
        <NativeTabs.Trigger.Label>Me</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
