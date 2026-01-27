"use client";

import { useRef, useState } from "react";

export function DemoVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Video-style preview</div>
          <div className="mt-1 text-xs text-white/60">
            A cinematic “recording” mock — lightweight, no external video file.
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70">
          <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.55)]" />
          Rec
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <div className="relative aspect-[16/9]">
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            src="/pixel-trailer.mp4"
            autoPlay
            muted={muted}
            loop
            playsInline
          />

          <div aria-hidden className="absolute inset-0 scanlines" />
          <div aria-hidden className="absolute inset-0 bg-vignette" />

          {/* HUD */}
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80">
            Pixel / Trailer
          </div>
          <div className="absolute right-4 top-4 text-[10px] text-white/60">
            00:12 • H.264
          </div>

          {/* Audio toggle */}
          <button
            type="button"
            className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur transition hover:bg-black/65"
            onClick={async () => {
              const v = ref.current;
              if (!v) return;
              const next = !muted;
              setMuted(next);
              v.muted = next;
              if (!next) {
                try {
                  await v.play();
                } catch {
                  // ignore
                }
              }
            }}
          >
            <span
              className={
                "h-2 w-2 rounded-full " +
                (muted
                  ? "bg-white/40"
                  : "bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.65)]")
              }
            />
            {muted ? "Enable sound" : "Mute"}
          </button>

          {/* Subtitles */}
          <div className="absolute bottom-10 left-1/2 w-[92%] -translate-x-1/2">
            <div className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-sm text-white/90 shadow-[0_0_30px_rgba(0,0,0,0.35)]">
              <span className="text-white/60">Trailer:</span> Schedule → Scout → Deliver.
            </div>
          </div>

          {/* Timeline */}
          <div className="absolute bottom-0 left-0 right-0 h-9 border-t border-white/10 bg-black/45">
            <div className="relative h-full">
              <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/10" />
              <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-300/70 via-indigo-400/60 to-pink-400/60" />
              <div className="absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.35)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-white/55">
        Want a real recorded clip next? We can add it later (mp4) — this keeps the site fast and zero-dependency.
      </div>
    </div>
  );
}
