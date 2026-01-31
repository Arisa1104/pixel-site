import type { ReactNode } from "react";

export function StepCard({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="my-8 rounded-2xl border border-ink/10 bg-white/40 p-6 shadow-sm ring-1 ring-white/20">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-paper">
            {step}
          </span>
          <h3 className="m-0 font-display text-xl tracking-tight text-ink">
            {title}
          </h3>
        </div>
        <div className="h-px w-full bg-gradient-to-right from-ink/5 via-ink/10 to-transparent" />
      </header>

      <div className="mt-6 space-y-4 font-sans text-sm leading-7 text-ink/75">
        {children}
      </div>
    </section>
  );
}
