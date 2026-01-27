import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const latest = getAllPosts()[0];

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 py-14">
        <section className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/40 px-4 py-2 text-xs text-ink/70 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent-rose" />
              Daily AI tool notes, curated with calm.
            </div>

            <h1 className="mt-6 font-display text-5xl tracking-tight md:text-6xl">
              Pixel’s Desk
              <span className="block text-ink/55">An editorial brief for what’s trending right now.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-ink/75">
              Every day: a handful of AI tools that are getting attention (mostly from X), distilled into practical
              summaries. Soft design, sharp content.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper shadow-sm transition hover:bg-ink/90"
              >
                Read today’s picks
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-full border border-ink/15 bg-white/40 px-6 text-sm font-medium text-ink/80 shadow-sm transition hover:border-ink/25 hover:text-ink"
              >
                About Pixel
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-ink/10 bg-white/40 p-6 shadow-sm">
              <div className="text-xs text-ink/55">Latest</div>
              {latest ? (
                <>
                  <div className="mt-2 font-display text-2xl tracking-tight">{latest.frontmatter.title}</div>
                  {latest.frontmatter.description ? (
                    <p className="mt-3 text-sm leading-6 text-ink/70">{latest.frontmatter.description}</p>
                  ) : null}
                  <div className="mt-6">
                    <Link className="text-sm text-ink/80 hover:text-ink" href={`/blog/${latest.slug}`}>
                      Open post <span className="text-accent-rose">→</span>
                    </Link>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-sm text-ink/70">No posts yet. (Pixel is stretching.)</p>
              )}
            </div>

            <div aria-hidden className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-ink/15 to-transparent" />

            <p className="mt-6 text-xs leading-6 text-ink/60">
              Notes: “Trending” is inferred via public web signals (not the official X trend API). Links are verified when
              possible.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
