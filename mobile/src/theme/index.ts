// Skepsis design tokens, copied from the website (app/src/style.css) so the app looks the same.
// Palette: Texas bluebonnet (brand), laurel gold (rewards), olive (right), clay (wrong), marble ground.
import { useColorScheme } from "react-native";

const light = {
  bg: "#f6f6f2", surface: "#ffffff", surface2: "#eef0f7", ink: "#161a3a", muted: "#5d6286", line: "#e0e2ec",
  brand: "#3446c9", brandDeep: "#222e8e", brandSoft: "#e3e7fb", onBrand: "#ffffff",
  gold: "#d99a06", goldDeep: "#a87402", goldSoft: "#fbefd0",
  olive: "#4b8a2a", oliveDeep: "#356a1b", oliveSoft: "#e3f1d8",
  clay: "#c2412d", clayDeep: "#932c1c", claySoft: "#f9e0da",
  flame: "#ee6a1c", flameDeep: "#b4500f", locked: "#c9ccda",
  mShell: "#c99a5e", mBand: "#9a6c38", mSkin: "#e8c79c", mInk: "#3a2a18",
  xpText: "#a87402", rightText: "#356a1b", wrongText: "#932c1c",
};
export type Palette = typeof light;

const dark: Palette = {
  bg: "#0e1124", surface: "#171b36", surface2: "#20254a", ink: "#eceefa", muted: "#a2a7c9", line: "#2a3058",
  brand: "#7183f5", brandDeep: "#3c4bc4", brandSoft: "#262d63", onBrand: "#0e1124",
  gold: "#f2bb3a", goldDeep: "#b98712", goldSoft: "#3a3016",
  olive: "#84c25c", oliveDeep: "#4f8a2e", oliveSoft: "#1f3317",
  clay: "#ef735e", clayDeep: "#a8402d", claySoft: "#3d1d18",
  flame: "#ff8a3d", flameDeep: "#c4560f", locked: "#3a4070",
  mShell: "#c99a5e", mBand: "#9a6c38", mSkin: "#e8c79c", mInk: "#3a2a18",
  xpText: "#f2bb3a", rightText: "#84c25c", wrongText: "#ef735e",
};

export const palettes = { light, dark };

/** The current palette. Re-renders when the system switches light/dark. */
export function useTheme(): Palette {
  return useColorScheme() === "dark" ? dark : light;
}

export const font = {
  regular: "Nunito_400Regular",
  semibold: "Nunito_600SemiBold",
  bold: "Nunito_700Bold",
  heavy: "Nunito_800ExtraBold",
  black: "Nunito_900Black",
  greek: "GFSDidot_400Regular",
  west: "Rye_400Regular",
};

export const radius = { sm: 10, md: 14, lg: 16, xl: 22 };
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
export const cardShadow = "0 1px 0 rgba(22, 26, 58, 0.06), 0 6px 20px rgba(22, 26, 58, 0.06)";
