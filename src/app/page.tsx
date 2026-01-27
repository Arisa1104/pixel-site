import Link from "next/link";
import { DemoChat } from "@/components/demo-chat";
import { DemoVideo } from "@/components/demo-video";
import { FeatureGrid } from "@/components/feature-grid";
import { Footer } from "@/components/footer";
import { HeroOrb } from "@/components/hero-orb";
import { TopNav } from "@/components/top-nav";

export default function Home() {
  return (
    <div className="min-h-dvh bg-black text-white">
      <TopNav />

      {/* Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.30),transparent_60%)] blur-2xl" />
        <div className="absolute top-32 right-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-[-200px] left-[-160px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-stars" />
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 scanlines" />
        <div className="absolute inset-0 bg-vignette" />
      </div>

      <main className="relative mx-auto w-full max-w-6xl px-6 pb-24">
        {/* Hero */}
        <section className="pt-20 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
              Pixel is alive in your tools — automation, research, reminders.
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-gradient">Pixel</span> — your futuristic AI sidekick
              <span className="text-white/60"> for everyday life</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg">
              Pixel can scout the web, summarize what matters, schedule daily digests, and post updates straight into Discord.
              Built on Clawdbot — your own personal assistant that lives on your machine.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#demo"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition hover:bg-white/90"
              >
                Watch the demo
              </Link>
              <Link
                href="#capabilities"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                What Pixel can do
              </Link>
            </div>

            <HeroOrb />

            <div className="mt-10 grid grid-cols-1 gap-3 text-left text-xs text-white/60 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-white/90">Daily digests</div>
                <div className="mt-1">“Good morning + schedule + Tech/AI news” at 7:00.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-white/90">Web scouting</div>
                <div className="mt-1">Find trending AI tools & usage examples (no API required).</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-white/90">Automations</div>
                <div className="mt-1">Cron scheduling, reminders, and chat delivery.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Capabilities</h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
              A quick tour of what Pixel can do today — in real life, for real people.
            </p>
          </div>
          <div className="mt-8">
            <FeatureGrid />
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Demos</h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
              A cinematic preview + a chat simulation (schedule → summarize → deliver).
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <DemoVideo />
            <DemoChat />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 sm:mt-24">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur sm:p-10">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div>
                <h3 className="text-xl font-semibold">Want Pixel to ship your daily brief?</h3>
                <p className="mt-2 max-w-xl text-sm text-white/70">
                  Set a schedule, choose a target (Discord, WhatsApp, Telegram…), and Pixel delivers a clean summary every morning.
                </p>
              </div>
              <a
                className="inline-flex h-11 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-black transition hover:bg-cyan-200"
                href="https://docs.clawd.bot/start/getting-started"
                target="_blank"
                rel="noreferrer"
              >
                Learn Clawdbot setup
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
