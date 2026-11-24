// The Learn tab's course switch and the private courses behind it (Japanese, philosophy).
// Only private builds load this file; see src/lib/private-courses.ts for how it is kept out of
// the App Store build.
import { Pressable, View } from "react-native";

import { T } from "@/components/ui";
import { track } from "@/lib/analytics";
import { haptic } from "@/lib/feedback";
import { update, type AppState } from "@/lib/store";
import { KomorebiLearn } from "@/screens/komorebi/learn";
import { LogosLearn } from "@/screens/logos/learn";
import { useTheme } from "@/theme";

type Course = AppState["course"];

const OPTIONS: { id: Course; label: string; sub: string }[] = [
  { id: "skepsis", label: "Greek roots", sub: "Skepsis" },
  { id: "komorebi", label: "Japanese", sub: "Komorebi" },
  { id: "logos", label: "Philosophy", sub: "Logos" },
];

/** Pick the course: Skepsis (Greek roots), Komorebi (Japanese) or Logos (philosophy). */
export function CourseSwitch({ course }: { course: Course }) {
  const c = useTheme();
  return (
    <View accessibilityRole="tablist" style={{ flexDirection: "row", gap: 6, padding: 4, borderRadius: 14, backgroundColor: c.surface2 }}>
      {OPTIONS.map((o) => {
        const on = course === o.id;
        return (
          <Pressable key={o.id} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={`${o.sub}, ${o.label}`}
            onPress={() => { if (on) return; haptic.tap(); track("course_switched", { course: o.id }); update((s) => { s.course = o.id; }); }}
            style={{ flex: 1, alignItems: "center", paddingVertical: 8, borderRadius: 11, borderCurve: "continuous", backgroundColor: on ? c.surface : "transparent", boxShadow: on ? "0 1px 3px rgba(0,0,0,0.12)" : undefined }}>
            <T w="black" size={14} color={on ? c.brand : c.muted}>{o.label}</T>
            <T w="bold" size={11} color={c.muted}>{o.sub}</T>
          </Pressable>
        );
      })}
    </View>
  );
}

/** The body of the Learn tab for a private course. */
export function PrivateCourse({ course }: { course: Exclude<Course, "skepsis"> }) {
  return course === "logos" ? <LogosLearn /> : <KomorebiLearn />;
}
