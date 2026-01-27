"use client";

import { useEffect, useRef } from "react";

export function HeroOrb() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative mx-auto mt-10 grid max-w-3xl place-items-center">
      <div
        ref={ref}
        className="orb-wrap relative h-[220px] w-[220px] sm:h-[260px] sm:w-[260px]"
      >
        <div aria-hidden className="orb absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[40px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),transparent_45%)]"
        />

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/5 text-xl font-semibold shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            P
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-[56px] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_55%)] blur-2xl"
        />
      </div>

      <div className="mt-4 text-center text-xs text-white/55">
        Hover/Move your cursor — it tilts like a hologram.
      </div>
    </div>
  );
}
