"use client";

import { useEffect, useMemo, useState } from "react";

type Msg = {
  role: "arisa" | "pixel";
  text: string;
};

const scripts: Array<{ title: string; messages: Msg[] }> = [
  {
    title: "Morning digest",
    messages: [
      {
        role: "arisa",
        text: "Pixel, post my 7:00 AM digest: schedule + top Tech/AI headlines.",
      },
      {
        role: "pixel",
        text: "On it. I’ll pull today’s calendar events, scan reputable sources, summarize 6 headlines, and deliver in #bot.",
      },
      {
        role: "pixel",
        text: "✅ Posted: Morning digest (schedule + headlines + a quick productivity tip).",
      },
    ],
  },
  {
    title: "Trending AI tools",
    messages: [
      {
        role: "arisa",
        text: "What AI tools are trending on X today? Give usage examples.",
      },
      {
        role: "pixel",
        text: "I’ll scout public posts and official docs, dedupe, and return 8 tools with quick how-to + examples.",
      },
      {
        role: "pixel",
        text: "Here are 8 picks (with links): summary / how to use / example prompts.",
      },
    ],
  },
  {
    title: "A gentle reminder",
    messages: [
      {
        role: "arisa",
        text: "Remind me in 20 minutes to take a break.",
      },
      {
        role: "pixel",
        text: "Got it. I’ll ping you in ~20 minutes: “Reminder: quick break (water + stretch).”",
      },
    ],
  },
];

function Pill({ active, children }: { active: boolean; children: string }) {
  return (
    <span
      className={
        "rounded-full border px-3 py-1 text-xs transition " +
        (active
          ? "border-white/30 bg-white/10 text-white"
          : "border-white/15 bg-white/5 text-white/70")
      }
    >
      {children}
    </span>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-200ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-100ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
    </span>
  );
}

export function DemoChat() {
  const [scriptIndex, setScriptIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [running, setRunning] = useState(false);
  const [typing, setTyping] = useState(false);

  const script = useMemo(() => scripts[scriptIndex], [scriptIndex]);

  useEffect(() => {
    setStep(0);
    setTyped("");
    setRunning(false);
    setTyping(false);
  }, [scriptIndex]);

  // advance message
  useEffect(() => {
    if (!running) return;
    if (step >= script.messages.length) return;

    const msg = script.messages[step];

    // Arisa messages appear instantly
    if (msg.role === "arisa") {
      const t = setTimeout(() => {
        setStep((s) => s + 1);
      }, 700);
      return () => clearTimeout(t);
    }

    // Pixel messages: short "typing…" then typewriter
    setTyping(true);
    const typingDelay = setTimeout(() => {
      setTyping(false);
      setTyped("");
    }, 650);

    return () => clearTimeout(typingDelay);
  }, [running, step, script.messages]);

  // typewriter effect for Pixel messages
  useEffect(() => {
    if (!running) return;
    if (step >= script.messages.length) return;
    const msg = script.messages[step];
    if (msg.role !== "pixel") return;
    if (typing) return;

    if (typed.length >= msg.text.length) {
      const t = setTimeout(() => {
        setStep((s) => s + 1);
      }, 900);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setTyped((s) => msg.text.slice(0, s.length + 1));
    }, 18);

    return () => clearTimeout(t);
  }, [running, step, script.messages, typed, typing]);

  const visible = useMemo(() => {
    const base = script.messages.slice(0, step);
    if (!running) return base;

    // If current message is Pixel and we're past typing indicator, show partially typed bubble
    if (step < script.messages.length) {
      const cur = script.messages[step];
      if (cur.role === "pixel" && !typing) {
        return [...base, { ...cur, text: typed }];
      }
    }
    return base;
  }, [script.messages, step, running, typing, typed]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold">{script.title}</div>
          <div className="mt-1 text-xs text-white/60">Run a short chat animation.</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {scripts.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setScriptIndex(i)}
              type="button"
              className="rounded-full"
              aria-label={`Select demo: ${s.title}`}
            >
              <Pill active={i === scriptIndex}>{s.title}</Pill>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4">
        <div className="space-y-3">
          {visible.map((m, idx) => (
            <div
              key={idx}
              className={
                "flex animate-fade-in " +
                (m.role === "arisa" ? "justify-end" : "justify-start")
              }
            >
              <div
                className={
                  "max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-6 " +
                  (m.role === "arisa"
                    ? "bg-white text-black"
                    : "bg-gradient-to-b from-white/10 to-white/5 text-white border border-white/10")
                }
              >
                <div className="text-[10px] uppercase tracking-wider opacity-60">
                  {m.role}
                </div>
                <div className="mt-1 whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          ))}

          {running && typing && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-4 py-3 text-sm text-white">
                <div className="text-[10px] uppercase tracking-wider opacity-60">
                  pixel
                </div>
                <div className="mt-1">
                  <TypingDots />
                </div>
              </div>
            </div>
          )}

          {visible.length === 0 && !running && (
            <div className="text-sm text-white/60">Ready when you are.</div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full bg-cyan-300 px-5 text-xs font-semibold text-black transition hover:bg-cyan-200 disabled:opacity-60"
          onClick={() => setRunning(true)}
          disabled={running}
        >
          {running ? "Running…" : "Run demo"}
        </button>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-xs font-semibold text-white/85 backdrop-blur transition hover:bg-white/10"
          onClick={() => {
            setStep(0);
            setTyped("");
            setRunning(false);
            setTyping(false);
          }}
        >
          Reset
        </button>

        <div className="text-xs text-white/50">
          This is a showcase simulation — Pixel runs inside Clawdbot.
        </div>
      </div>
    </div>
  );
}
