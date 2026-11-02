import { Linking, ScrollView, View } from "react-native";

import { Card, Eyebrow, Icon, T } from "@/components/ui";
import { analyticsAvailable } from "@/lib/analytics";
import { useApp } from "@/lib/store";
import { useTheme } from "@/theme";

const REPO = "https://github.com/ionpetro/skepsis";

function Line({ icon, children }: { icon: Parameters<typeof Icon>[0]["name"]; children: React.ReactNode }) {
  const c = useTheme();
  return <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}><Icon name={icon} size={20} color={c.brand} /><T w="semibold" style={{ flex: 1 }}>{children}</T></View>;
}

/** Plain-language data policy. The code that sends analytics is src/lib/analytics.ts; link to it. */
export default function Privacy() {
  const s = useApp();
  const c = useTheme();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
      <Eyebrow>Stays on this phone</Eyebrow>
      <Card>
        <Line icon="iphone">Your streak, XP, drachmas, words learned, answers and settings are saved only on this phone, in a local database.</Line>
        <Line icon="person.crop.circle.badge.xmark">There are no accounts. We never ask for your name, email or phone number.</Line>
        <Line icon="bell.fill">Reminders are scheduled by iOS on your phone. No push server knows about you.</Line>
        <Line icon="trash.fill">Deleting the app deletes everything. You can also export or erase it in Settings.</Line>
      </Card>
      <Eyebrow>What we count</Eyebrow>
      <Card>
        {analyticsAvailable ? (
          <>
            <Line icon="chart.bar.fill">Anonymous events like &ldquo;lesson u1l2 finished, 80% right, 3 minutes&rdquo; and which screens you open. We use them to find lessons that are too hard and where people give up.</Line>
            <Line icon="number">Each event carries a random id made on this phone ({s.installId.slice(0, 8)}…), not linked to you, plus the app version and iOS version.</Line>
            <Line icon="hand.raised.fill">No location (GeoIP is turned off), no contacts, no ad ids, no profiles, no selling. Data goes to PostHog, our analytics tool.</Line>
            <Line icon="switch.2">You can turn it off in Settings › Share anonymous usage. Status: <T w="black">{s.analytics ? "on" : "off"}</T>.</Line>
          </>
        ) : (
          <Line icon="checkmark.shield.fill">This build was made without an analytics key, so it sends nothing at all.</Line>
        )}
      </Card>
      <Eyebrow>Check it yourself</Eyebrow>
      <Card onPress={() => Linking.openURL(`${REPO}/blob/main/mobile/src/lib/analytics.ts`)}>
        <Line icon="chevron.left.forwardslash.chevron.right">Skepsis is open source. Everything that leaves your phone is in one short file: mobile/src/lib/analytics.ts. Tap to read it on GitHub.</Line>
      </Card>
      <T w="semibold" size={12} color={c.muted} style={{ textAlign: "center" }}>Questions? Open an issue on GitHub.</T>
    </ScrollView>
  );
}
