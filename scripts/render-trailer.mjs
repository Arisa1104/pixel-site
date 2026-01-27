import path from "node:path";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import ffmpegStatic from "ffmpeg-static";

const siteRoot = path.resolve(process.cwd());

const entry = path.join(siteRoot, "remotion", "remotion-entry.ts");
const out = path.join(siteRoot, "public", "pixel-trailer.mp4");

const log = (...args) => console.log("[trailer]", ...args);

if (!ffmpegStatic) {
  throw new Error(
    "ffmpeg-static did not provide a binary. Install ffmpeg (brew install ffmpeg) or fix ffmpeg-static.",
  );
}

log("Bundling…");
const bundleLocation = await bundle({
  entryPoint: entry,
  webpackOverride: (config) => config,
});

log("Reading compositions…");
const comps = await getCompositions(bundleLocation, {
  inputProps: {
    title: "PIXEL",
    subtitle: "YOUR FUTURISTIC AI SIDEKICK",
  },
});

const comp = comps.find((c) => c.id === "PixelTrailer");
if (!comp) {
  throw new Error(`Composition PixelTrailer not found. Found: ${comps.map((c) => c.id).join(", ")}`);
}

log("Rendering mp4… (this can take a minute)");
await renderMedia({
  composition: comp,
  serveUrl: bundleLocation,
  codec: "h264",
  outputLocation: out,
  inputProps: {
    title: "PIXEL",
    subtitle: "YOUR FUTURISTIC AI SIDEKICK",
  },
  // ffmpeg
  ffmpegExecutable: ffmpegStatic,
  // quality/speed tradeoff (good enough for web)
  crf: 20,
  verbose: false,
});

log("Done:", out);
