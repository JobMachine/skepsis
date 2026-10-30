import { Composition } from "remotion";
import { SkepsisX } from "./SkepsisX";
import { SkepsisReel, REEL_FRAMES } from "./Reel";

export const Root = () => (
  <>
    {/* square, for X */}
    <Composition id="SkepsisX" component={SkepsisX} durationInFrames={150} fps={30} width={1080} height={1080} />
    {/* 9:16 portrait, for Instagram Reels and Stories */}
    <Composition id="SkepsisReel" component={SkepsisReel} durationInFrames={REEL_FRAMES} fps={30} width={1080} height={1920} />
  </>
);
