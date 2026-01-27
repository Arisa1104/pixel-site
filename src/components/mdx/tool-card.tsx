import type { ReactNode } from "react";

function Dots({ value }: { value: number }) {
  const v = Math.max(0, Math.min(3, value));
  return (
    <span className="inline-flex items-center gap-1" aria-label={`重要度 ${v}/3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i < v ? "bg-accent-rose" : "bg-ink/15"}`}
        />
      ))}
    </span>
  );
}

export function ToolCard({
  title,
  href,
  tag,
  importance,
  uses,
  children,
}: {
  title: string;
  href?: string;
  tag?: string;
  importance?: 1 | 2 | 3;
  uses?: string[];
  children: ReactNode;
}) {
  return (
    <section className="my-6 rounded-2xl border border-ink/10 bg-white/40 p-6 shadow-sm">
      <header className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="m-0 font-display text-xl tracking-tight text-ink">{title}</h3>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xs tracking-widest uppercase text-accent-rose hover:text-ink"
            >
              Open →
            </a>
          ) : null}
        </div>

        {(tag || importance || (uses && uses.length)) && (
          <div className="flex flex-wrap items-center gap-2">
            {tag ? (
              <span className="rounded-full bg-ink px-3 py-1 font-sans text-[10px] tracking-[0.22em] uppercase text-paper">
                {tag}
              </span>
            ) : null}

            {typeof importance === "number" ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3 py-1">
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-ink/60">Importance</span>
                <Dots value={importance} />
              </span>
            ) : null}

            {uses?.length ? (
              <span className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3 py-1">
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-ink/60">Use</span>
                {uses.map((u) => (
                  <span
                    key={u}
                    className="rounded-full bg-white/60 px-2 py-0.5 font-sans text-[11px] text-ink/70"
                  >
                    {u}
                  </span>
                ))}
              </span>
            ) : null}
          </div>
        )}
      </header>

      <div className="mt-4 space-y-3 font-sans text-sm leading-7 text-ink/75">{children}</div>
    </section>
  );
}
