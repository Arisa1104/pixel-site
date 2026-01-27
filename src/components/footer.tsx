export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-white/55">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-white/80">Pixel</div>
          <div className="text-xs">A personal AI assistant living in your tools.</div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <a
            className="hover:text-white"
            href="https://docs.clawd.bot"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
          <a
            className="hover:text-white"
            href="https://docs.clawd.bot/automation/cron-jobs"
            target="_blank"
            rel="noreferrer"
          >
            Cron
          </a>
          <a
            className="hover:text-white"
            href="https://github.com/clawdbot/clawdbot"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="mt-6 text-[11px] leading-5 text-white/45">
        This is a showcase page. No personal data is collected. “Pixel” is the assistant persona running inside Clawdbot.
      </div>
    </footer>
  );
}
