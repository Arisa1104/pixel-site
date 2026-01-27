import type { ReactNode } from "react";

export function ToolCard({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <section className="my-6 rounded-2xl border border-ink/10 bg-white/40 p-6 shadow-sm">
      <header className="flex items-start justify-between gap-4">
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
      </header>
      <div className="mt-4 space-y-3 font-sans text-sm leading-7 text-ink/75">{children}</div>
    </section>
  );
}
