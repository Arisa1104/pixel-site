"use client";

import Link from "next/link";
import { useState } from "react";

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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6 text-ink/80"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="no-underline">
          <PixelMark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link className="text-ink/80 hover:text-ink" href="/blog">
            Blog
          </Link>
          <Link className="text-ink/80 hover:text-ink" href="/records">
            Records
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

        {/* Mobile hamburger button */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <nav className="border-t border-ink/10 bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <Link
              className="text-ink/80 hover:text-ink"
              href="/blog"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              className="text-ink/80 hover:text-ink"
              href="/records"
              onClick={() => setMenuOpen(false)}
            >
              Records
            </Link>
            <Link
              className="text-ink/80 hover:text-ink"
              href="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <a
              className="inline-block rounded-full border border-ink/15 bg-paper px-4 py-2 text-center text-ink/80 shadow-sm transition hover:border-ink/25 hover:text-ink"
              href="https://docs.clawd.bot"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Clawdbot
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
