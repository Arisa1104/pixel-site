import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const bg = {
  backgroundColor: "#000",
  backgroundImage:
    "radial-gradient(circle at 20% 25%, rgba(34,211,238,0.28), transparent 55%), radial-gradient(circle at 78% 42%, rgba(99,102,241,0.26), transparent 55%), radial-gradient(circle at 35% 90%, rgba(236,72,153,0.18), transparent 60%)",
};

const gradientText: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg,#22d3ee,#6366f1,#ec4899)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

function GlowGrid() {
  return (
    <AbsoluteFill
      style={{
        opacity: 0.18,
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage:
          "radial-gradient(circle at 50% 15%, black 0%, transparent 70%)",
      }}
    />
  );
}

function Scanlines() {
  return (
    <AbsoluteFill
      style={{
        opacity: 0.08,
        mixBlendMode: "overlay",
        background:
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 6px)",
      }}
    />
  );
}

function GlitchJitter({ enabled }: { enabled: boolean }) {
  const frame = useCurrentFrame();
  if (!enabled) return null;

  const seed = Math.floor(frame / 2);
  const x = (random(`x-${seed}`) - 0.5) * 18;
  const y = (random(`y-${seed}`) - 0.5) * 10;
  const o = 0.16 + random(`o-${seed}`) * 0.12;

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${x}px, ${y}px)`,
        opacity: o,
        filter: "saturate(1.25) contrast(1.15)",
        mixBlendMode: "screen",
      }}
    />
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        fontSize: 14,
        letterSpacing: 1.6,
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.78)",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: "#22d3ee",
          boxShadow: "0 0 18px rgba(34,211,238,0.8)",
        }}
      />
      {text}
    </div>
  );
}

function TitleBlock({ title, subtitle }: { title: string; subtitle: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ fps, frame, config: { damping: 18, mass: 0.9 } });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            transform: `translateY(${interpolate(enter, [0, 1], [18, 0])}px)` ,
            opacity: enter,
            fontSize: 90,
            fontWeight: 800,
            letterSpacing: 6,
            ...gradientText,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          marginTop: 10,
          opacity: interpolate(frame, [10, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(frame, [10, 40], [14, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          color: "rgba(255,255,255,0.80)",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 2.5,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}

function BigWord({ word }: { word: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ fps, frame, config: { damping: 14, mass: 0.7 } });

  const flicker = interpolate(frame % 6, [0, 2, 3, 6], [0.85, 1, 0.9, 1]);

  return (
    <div
      style={{
        fontSize: 78,
        fontWeight: 880,
        letterSpacing: 2.2,
        opacity: pop * flicker,
        transform: `scale(${interpolate(pop, [0, 1], [0.92, 1])})`,
        textAlign: "center",
        textShadow:
          "0 0 24px rgba(34,211,238,0.20), 0 0 44px rgba(99,102,241,0.14)",
      }}
    >
      {word}
    </div>
  );
}

function ChatCard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = spring({ fps, frame: frame - 30, config: { damping: 18 } });

  const y = interpolate(t, [0, 1], [18, 0]);
  const o = t;

  return (
    <div
      style={{
        width: 820,
        borderRadius: 26,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
        padding: 18,
        backdropFilter: "blur(14px)",
        boxShadow: "0 0 80px rgba(34,211,238,0.10)",
        opacity: o,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>
          #bot / morning digest
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
          07:00 AM
        </div>
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        <div
          style={{
            marginLeft: "auto",
            maxWidth: 560,
            borderRadius: 20,
            background: "white",
            color: "black",
            padding: "10px 14px",
            fontSize: 16,
            lineHeight: 1.45,
          }}
        >
          <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: 1.4 }}>
            ARISA
          </div>
          Post my digest: schedule + top Tech/AI headlines.
        </div>

        <div
          style={{
            marginRight: "auto",
            maxWidth: 620,
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
            color: "white",
            padding: "10px 14px",
            fontSize: 16,
            lineHeight: 1.45,
          }}
        >
          <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 1.4 }}>
            PIXEL
          </div>
          On it. I’ll pull calendar events, scan reputable sources, summarize, and deliver.
        </div>

        <div
          style={{
            marginRight: "auto",
            maxWidth: 620,
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(180deg, rgba(34,211,238,0.10), rgba(255,255,255,0.04))",
            color: "white",
            padding: "10px 14px",
            fontSize: 16,
            lineHeight: 1.45,
          }}
        >
          <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 1.4 }}>
            PIXEL
          </div>
          ✅ Posted. (Schedule + 6 headlines + quick productivity tip)
        </div>
      </div>
    </div>
  );
}

function Stinger({ text, offset }: { text: string; offset: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - offset;
  const s = spring({ fps, frame: local, config: { damping: 16, mass: 0.8 } });

  const opacity = interpolate(local, [0, 10, 70, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
        textAlign: "center",
        fontSize: 32,
        fontWeight: 650,
        letterSpacing: 1.2,
        color: "rgba(255,255,255,0.92)",
        textShadow: "0 0 26px rgba(0,0,0,0.5)",
      }}
    >
      {text}
    </div>
  );
}

export const PixelTrailer: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const vignetteOpacity = interpolate(frame, [0, 60], [0.65, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // quick camera shake around impacts
  const shake = (at: number, dur: number, amp: number) => {
    const t = frame - at;
    const w = interpolate(t, [0, dur], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const s = Math.sin(t * 0.9) * amp * w;
    return s;
  };

  const shakeX =
    shake(90, 18, 12) + shake(150, 18, 10) + shake(210, 18, 10) + shake(240, 16, 8);
  const shakeY =
    shake(90, 18, 6) + shake(150, 18, 5) + shake(210, 18, 5) + shake(240, 16, 4);

  const glitchOn = (frame >= 146 && frame <= 156) || (frame >= 206 && frame <= 214);

  return (
    <AbsoluteFill style={{ ...bg, fontFamily: "system-ui, -apple-system" }}>
      {/* Sound design */}
      <Audio src={staticFile("/remotion/hit.mp3")} startFrom={0} endAt={20} volume={0.9} />
      <Audio src={staticFile("/remotion/whoosh.mp3")} startFrom={88} endAt={88 + 20} volume={0.55} />
      <Audio src={staticFile("/remotion/hit.mp3")} startFrom={90} endAt={90 + 18} volume={0.8} />

      <Audio src={staticFile("/remotion/whoosh.mp3")} startFrom={148} endAt={148 + 20} volume={0.55} />
      <Audio src={staticFile("/remotion/hit.mp3")} startFrom={150} endAt={150 + 18} volume={0.75} />

      <Audio src={staticFile("/remotion/whoosh.mp3")} startFrom={208} endAt={208 + 20} volume={0.55} />
      <Audio src={staticFile("/remotion/hit.mp3")} startFrom={210} endAt={210 + 18} volume={0.75} />

      <Audio src={staticFile("/remotion/glitch.mp3")} startFrom={146} endAt={146 + 18} volume={0.6} />
      <Audio src={staticFile("/remotion/glitch.mp3")} startFrom={206} endAt={206 + 18} volume={0.6} />

      <AbsoluteFill style={{ opacity: vignetteOpacity }} />
      <GlowGrid />
      <Scanlines />
      <GlitchJitter enabled={glitchOn} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 70,
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <div style={{ display: "grid", gap: 24, justifyItems: "center" }}>
          <Badge text="A CLAWDBOT ORIGINAL" />

          {/* Title intro */}
          <div
            style={{
              opacity: interpolate(frame, [0, 70, 88], [1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [0, 80], [0, -8], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}px)`,
            }}
          >
            <TitleBlock title={title} subtitle={subtitle} />
          </div>

          {/* Big words (hard cuts) */}
          <div style={{ position: "absolute", top: "29%", left: 0, right: 0 }}>
            {frame >= 90 && frame < 150 && <BigWord word="SCHEDULE" />}
            {frame >= 150 && frame < 210 && <BigWord word="SCOUT" />}
            {frame >= 210 && frame < 270 && <BigWord word="DELIVER" />}
          </div>

          {/* Extra cut card */}
          <div style={{ position: "absolute", top: "44%", left: 0, right: 0 }}>
            <Stinger text="AUTOMATE THE BORING" offset={110} />
            <Stinger text="KEEP THE SIGNAL" offset={170} />
          </div>

          {/* Chat card sequence */}
          <div
            style={{
              position: "absolute",
              bottom: 96,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              opacity: interpolate(frame, [240, 270, 330, 360], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <ChatCard />
          </div>

          {/* Stingers */}
          <div style={{ position: "absolute", bottom: 190, left: 0, right: 0 }}>
            <Stinger text="DAILY DIGESTS" offset={240} />
            <Stinger text="TRENDING AI TOOLS" offset={290} />
            <Stinger text="GENTLE REMINDERS" offset={340} />
          </div>

          {/* Final card */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              opacity: interpolate(frame, [330, 360, 360 + 60], [0, 1, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: 1.5 }}>
                <span style={gradientText}>PIXEL</span>
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  opacity: 0.75,
                  letterSpacing: 1.4,
                }}
              >
                Powered by Clawdbot • Runs on your machine
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 16,
                  opacity: 0.85,
                  letterSpacing: 1.2,
                }}
              >
                Daily brief at <span style={{ ...gradientText, fontWeight: 800 }}>07:00 AM</span>
              </div>

              <div
                style={{
                  marginTop: 18,
                  display: "inline-flex",
                  gap: 12,
                  alignItems: "center",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  padding: "12px 16px",
                  color: "rgba(255,255,255,0.80)",
                  fontSize: 14,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: "#22d3ee",
                    boxShadow: "0 0 18px rgba(34,211,238,0.8)",
                  }}
                />
                pixel-site-pied.vercel.app
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: 26,
          bottom: 22,
          fontSize: 12,
          opacity: 0.45,
          letterSpacing: 1.2,
        }}
      >
        demo trailer
      </div>
    </AbsoluteFill>
  );
};
