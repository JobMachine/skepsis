import { Composition } from "remotion";
import { SkepsisX } from "./SkepsisX";

export const Root = () => (
  <Composition id="SkepsisX" component={SkepsisX} durationInFrames={150} fps={30} width={1080} height={1080} />
);
