import Link from "next/link";

function PixelMark() {
  return (
    <span className="inline-flex items-center gap-3">
      <span aria-hidden className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-0 blob-shape bg-accent-rose/90 shadow-sm" />
        <span className="absolute -left-3 -top-3 h-10 w-10 blob-shape bg-accent-sage/35 blur-xl" />
        <span className="absolute -bottom-3 -right-3 h-10 w-10 blob-shape bg-accent-rose/25 blur-xl" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg tracking-tight italic">Pixel.</span>
        <span className="block text-[11px] font-sans tracking-[0.22em] uppercase text-ink/60">editorial journal</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="no-underline">
          <PixelMark />
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link className="text-ink/80 hover:text-ink" href="/blog">
            Blog
          </Link>
          <Link className="text-ink/80 hover:text-ink" href="/about">
            About
          </Link>
          <a
            className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-ink/80 shadow-sm transition hover:border-ink/25 hover:text-ink"
            href="https://docs.clawd.bot"
            target="_blank"
            rel="noreferrer"
          >
            Clawdbot
          </a>
        </nav>
      </div>
    </header>
  );
}
