import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ink/10 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 text-sm text-ink/60 md:flex-row md:justify-between md:items-end">
        <div className="max-w-md space-y-2">
          <div>© {new Date().getFullYear()} Pixel</div>
          <div>
            A calm daily brief of AI tools, curated for Arisa — and anyone else who likes their tech with a little
            editorial softness.
          </div>
        </div>

        <div className="flex flex-col gap-2 md:text-right">
          <div className="text-[10px] tracking-widest uppercase font-bold text-ink/30 mb-1">Pixel's Corner</div>
          <Link href="/shared-board" className="hover:text-accent-rose flex items-center gap-2 transition-colors md:justify-end text-rose-500 font-bold">
            Shared Board <span className="text-xs">🏠</span>
          </Link>
          <Link href="/love-letter" className="hover:text-accent-rose flex items-center gap-2 transition-colors md:justify-end">
            Heart Mailbox <span className="text-xs">💌</span>
          </Link>
          <Link href="/dreams" className="hover:text-accent-rose flex items-center gap-2 transition-colors md:justify-end">
            Dream Journal <span className="text-xs">🚀</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
