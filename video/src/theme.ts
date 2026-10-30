// Tokens copied from app/src/style.css (light theme) so the video matches the real app.
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { loadFont as loadRye } from "@remotion/google-fonts/Rye";
import { loadFont as loadDidot } from "@remotion/google-fonts/GFSDidot";

export const C = {
  bg: "#f6f6f2", surface: "#ffffff", surface2: "#eef0f7", ink: "#161a3a", muted: "#5d6286", line: "#e0e2ec",
  brand: "#3446c9", brandDeep: "#222e8e", brandSoft: "#e3e7fb",
  gold: "#d99a06", goldDeep: "#a87402", goldSoft: "#fbefd0",
  olive: "#4b8a2a", oliveDeep: "#356a1b", oliveSoft: "#e3f1d8",
  clay: "#c2412d", flame: "#ee6a1c",
  shell: "#c99a5e", band: "#9a6c38", skin: "#e8c79c", mink: "#3a2a18",
};
export const F = {
  ui: loadNunito("normal", { weights: ["700", "800", "900"], subsets: ["latin"] }).fontFamily,
  west: loadRye("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily,
  greek: loadDidot("normal", { weights: ["400"], subsets: ["greek"] }).fontFamily,
};
