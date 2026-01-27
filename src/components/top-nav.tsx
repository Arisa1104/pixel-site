import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#" className="group inline-flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-xl border border-white/15 bg-white/5">
            <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.38),transparent_60%)]" />
            <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.20),transparent_60%)]" />
            <span className="relative text-sm font-semibold tracking-tight">P</span>
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Pixel <span className="text-white/50">by Clawdbot</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
          <Link className="hover:text-white" href="#capabilities">
            Capabilities
          </Link>
          <Link className="hover:text-white" href="#demo">
            Demo
          </Link>
          <a
            className="hover:text-white"
            href="https://docs.clawd.bot/automation/cron-jobs"
            target="_blank"
            rel="noreferrer"
          >
            Cron jobs
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur transition hover:bg-white/10 sm:inline-flex"
            href="https://docs.clawd.bot/start/getting-started"
            target="_blank"
            rel="noreferrer"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
