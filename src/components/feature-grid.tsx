"use client";

import { useMemo, useRef, useState } from "react";

type Feature = {
  title: string;
  desc: string;
  detail: string;
};

const features: Feature[] = [
  {
    title: "Morning digest",
    desc: "A clean daily post: good morning + (optional) calendar + Tech/AI news — delivered on schedule.",
    detail: "Runs via Gateway cron, so it keeps working even after restarts.",
  },
  {
    title: "Web scouting",
    desc: "Find trending AI tools, product launches, and usage examples — then summarize with links.",
    detail: "Uses public web_search + web_fetch. No scraping drama.",
  },
  {
    title: "Reminders & nudges",
    desc: "One-shot reminders (“in 20 minutes…”) or repeating habits (“every weekday at 9:00”).",
    detail: "Messages are written like real reminders, not robot logs.",
  },
  {
    title: "Discord delivery",
    desc: "Post into channels, keep format tidy, and tailor the voice for your server.",
    detail: "Perfect for a personal #bot channel.",
  },
  {
    title: "Drafting & rewriting",
    desc: "Turn notes into polished messages, docs, or short explainer posts (EN/JP).",
    detail: "Great for school, work, and side projects.",
  },
  {
    title: "Your data stays yours",
    desc: "Clawdbot runs on your machine. You control what connects, what gets stored, and where it posts.",
    detail: "A personal assistant, not a random website.",
  },
];

function FeatureCard({ f }: { f: Feature }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  };

  const style = useMemo(
    () =>
      ({
        // used by CSS in globals.css
        "--mx": `${pos.x}%`,
        "--my": `${pos.y}%`,
      }) as React.CSSProperties,
    [pos.x, pos.y],
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20"
      style={style}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 hologram" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_60%)] blur-2xl" />
      </div>

      <div className="relative">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          Capability
        </div>
        <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/70">{f.desc}</p>
        <p className="mt-4 text-xs leading-5 text-white/55">{f.detail}</p>
      </div>
    </div>
  );
}

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f) => (
        <FeatureCard key={f.title} f={f} />
      ))}
    </div>
  );
}
