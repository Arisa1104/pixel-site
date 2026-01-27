import { Composition } from "remotion";
import { PixelTrailer } from "./trailer/PixelTrailer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
