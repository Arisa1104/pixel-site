import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const bg = {
  backgroundColor: "#0a0a1a",
};

const gradientText: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg,#00f2ff,#ff00ff,#00ff00)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

function Scanlines() {
  return (
    <AbsoluteFill
      style={{
        opacity: 0.15,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        background:
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 6px)",
      }}
    />
  );
}

export const PowerUpMV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Zoom effect on background
  const zoom = interpolate(frame, [0, 300], [1, 1.2], {
    extrapolateRight: "clamp",
  });

  // "Power-Up!" floating text logic
  const renderFloatingText = (text: string, startFrame: number) => {
    const localFrame = frame - startFrame;
    if (localFrame < 0 || localFrame > 60) return null;
    
    const opacity = interpolate(localFrame, [0, 10, 50, 60], [0, 1, 1, 0]);
    const y = interpolate(localFrame, [0, 60], [height / 2, height / 2 - 150]);
    const x = width / 2 + (Math.sin(startFrame) * 200);

    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          opacity,
          fontSize: 80,
          fontWeight: 900,
          fontFamily: "monospace",
          ...gradientText,
          textShadow: "0 0 20px rgba(255, 0, 255, 0.8)",
        }}
      >
        {text}
      </div>
    );
  };

  return (
    <AbsoluteFill style={bg}>
      {/* Background Image from Ideogram */}
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Img src={staticFile("mv_concept_1.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      {/* Music */}
      <Audio src={staticFile("records/power-up-chiptune.mp3")} />

      {/* Effects Overlay */}
      <Scanlines />

      {/* Retro Frame */}
      <div style={{
        position: "absolute",
        inset: 40,
        border: "4px solid #00f2ff",
        boxShadow: "0 0 20px #00f2ff, inset 0 0 20px #00f2ff",
        pointerEvents: "none"
      }} />

      {/* Floating Power-Up texts */}
      {renderFloatingText("POWER UP!", 30)}
      {renderFloatingText("GET READY!", 90)}
      {renderFloatingText("PIXEL MODE!", 150)}
      {renderFloatingText("LEVEL UP!", 210)}

      {/* UI Elements */}
      <div style={{
        position: "absolute",
        top: 80,
        left: 80,
        color: "#00f2ff",
        fontSize: 32,
        fontFamily: "monospace",
        fontWeight: "bold"
      }}>
        SCORE: {Math.floor(frame * 123)}
      </div>

      <div style={{
        position: "absolute",
        bottom: 80,
        right: 80,
        color: "#ff00ff",
        fontSize: 32,
        fontFamily: "monospace",
        fontWeight: "bold"
      }}>
        HP: [||||||||||]
      </div>

      {/* Center Title at start */}
      {frame < 90 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{
            opacity: interpolate(frame, [60, 90], [1, 0]),
            fontSize: 100,
            fontWeight: "black",
            fontFamily: "monospace",
            backgroundColor: "rgba(0,0,0,0.8)",
            padding: "20px 40px",
            border: "5px solid #ff00ff"
          }}>
            <span style={gradientText}>STAGE 1: START</span>
          </div>
        </AbsoluteFill>
      )}

      {/* Pixel Logo at end */}
      {frame > 270 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "rgba(10,10,26,0.8)" }}>
          <div style={{
            opacity: interpolate(frame, [270, 300], [0, 1]),
            textAlign: "center"
          }}>
            <div style={{ fontSize: 120, fontWeight: "black", fontFamily: "monospace", ...gradientText }}>PIXEL</div>
            <div style={{ fontSize: 40, color: "#fff", marginTop: 20 }}>RECORDS PRESENTS</div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
