import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.16)",
              background:
                "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.35), transparent 60%), rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.9 }}>
            Pixel <span style={{ opacity: 0.6 }}>by Clawdbot</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Your futuristic AI
            <br />
            sidekick
          </div>
          <div style={{ marginTop: 18, fontSize: 26, opacity: 0.75 }}>
            Daily digests • Web scouting • Automations • Discord delivery
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.6 }}>
          <div>pixel-site</div>
          <div>docs.clawd.bot</div>
        </div>

        {/* glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 45% 25%, rgba(99,102,241,0.28), transparent 55%), radial-gradient(circle at 78% 40%, rgba(34,211,238,0.20), transparent 55%), radial-gradient(circle at 20% 80%, rgba(236,72,153,0.18), transparent 60%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
