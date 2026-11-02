import { Alert, ScrollView, View } from "react-native";

import { Mascot } from "@/components/mascot";
import { Btn, Card, Eyebrow, Icon, T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { sfx } from "@/lib/feedback";
import { update, useApp, type Hat } from "@/lib/store";
import { useTheme } from "@/theme";

const FREEZE_PRICE = 50;
const MAX_FREEZES = 2;
const HATS: { id: Hat; name: string; desc: string; price: number }[] = [
  { id: "wreath", name: "Laurel wreath", desc: "Homer's classic. Worn by Olympic winners.", price: 0 },
  { id: "cowboy", name: "Ten-gallon hat", desc: "For riding the Rodeo in style.", price: 60 },
  { id: "helmet", name: "Hoplite helmet", desc: "Bronze, crested, very Spartan.", price: 120 },
  { id: "grad", name: "Philosopher's cap", desc: "For when you've out-read Aristotle.", price: 200 },
];

/** Spend drachmas (earned in lessons and quests; never real money). */
export default function Shop() {
  const s = useApp();
  const c = useTheme();
  function buy(label: string, price: number, fn: () => void) {
    if (s.drachmas < price) {
      Alert.alert("Not enough drachmas", `You need ${price - s.drachmas} more. Finish lessons and daily quests to earn them.`);
      return;
    }
    fn();
    sfx.done();
    track("shop_purchase", { item: label, price });
  }
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingTop: 28 }}>
      <View style={{ alignItems: "center", gap: 6 }}>
        <Mascot size={120} hat={s.hat} mood="cheer" />
        <T w="black" size={24}>The Agora shop</T>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: c.goldSoft }}>
          <Icon name="dollarsign.circle.fill" size={18} color={c.xpText} />
          <T w="black" color={c.xpText} style={{ fontVariant: ["tabular-nums"] }}>{s.drachmas} drachmas</T>
        </View>
        <T w="bold" size={13} color={c.muted} style={{ textAlign: "center" }}>Drachmas are earned, never bought. There is nothing to pay for in Skepsis.</T>
      </View>

      <Eyebrow>Power-ups</Eyebrow>
      <Card style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Icon name="snowflake" size={32} color={c.brand} />
        <View style={{ flex: 1 }}>
          <T w="black">Streak freeze</T>
          <T w="bold" size={13} color={c.muted}>Covers one missed weekday. You have {s.freezes}/{MAX_FREEZES}.</T>
        </View>
        <Btn small block={false} tone={s.freezes >= MAX_FREEZES ? "ghost" : "gold"} disabled={s.freezes >= MAX_FREEZES} label={s.freezes >= MAX_FREEZES ? "Full" : `${FREEZE_PRICE}`}
          onPress={() => buy("freeze", FREEZE_PRICE, () => update((x) => { x.drachmas -= FREEZE_PRICE; x.freezes = Math.min(MAX_FREEZES, x.freezes + 1); }))} />
      </Card>

      <Eyebrow>Hats for Homer</Eyebrow>
      {HATS.map((h) => {
        const owned = s.hats.includes(h.id);
        const worn = s.hat === h.id;
        return (
          <Card key={h.id} style={{ flexDirection: "row", alignItems: "center", gap: 12, borderColor: worn ? c.brand : c.line, borderWidth: worn ? 2 : 1 }}>
            <Mascot size={64} hat={h.id} />
            <View style={{ flex: 1 }}>
              <T w="black">{h.name}</T>
              <T w="bold" size={13} color={c.muted}>{h.desc}</T>
            </View>
            {worn ? <Icon name="checkmark.circle.fill" size={26} color={c.brand} />
              : owned ? <Btn small block={false} tone="ghost" label="Wear" onPress={() => { update((x) => { x.hat = h.id; }); track("hat_worn", { hat: h.id }); }} />
              : <Btn small block={false} tone="gold" label={`${h.price}`} onPress={() => buy(`hat_${h.id}`, h.price, () => update((x) => { x.drachmas -= h.price; x.hats.push(h.id); x.hat = h.id; }))} />}
          </Card>
        );
      })}
    </ScrollView>
  );
}
