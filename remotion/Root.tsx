import { Composition } from "remotion";
import { PixelTrailer } from "./trailer/PixelTrailer";
import { PowerUpMV } from "./PowerUpMV";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PowerUpMV"
        component={PowerUpMV}
        durationInFrames={30 * 12} // 12 seconds preview
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="PixelTrailer"
        component={PixelTrailer}
        durationInFrames={30 * 12}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          title: "PIXEL",
          subtitle: "YOUR FUTURISTIC AI SIDEKICK",
        }}
      />
    </>
  );
};
