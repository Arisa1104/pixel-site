import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PixelStatus } from "@/components/pixel-status";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const latest = getAllPosts()[0];

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />

      <main className="relative mx-auto w-full max-w-5xl px-6 py-14">
        {/* Decorative blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-[-8%] h-96 w-96 blob-shape bg-accent-rose/20 blur-3xl animate-blob" />
          <div className="absolute bottom-0 left-[-10%] h-80 w-80 blob-shape bg-accent-sage/30 blur-3xl animate-blob animation-delay-2000" />
        </div>

        <section className="relative grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-accent-rose">The editorial journal</p>

            <h1 className="mt-6 font-display text-6xl leading-none tracking-tight md:text-7xl">
              Curated <span className="italic font-normal">notes</span>
              <br />
              on AI tools
              <span className="text-accent-rose">.</span>
            </h1>

            <div className="editorial-line mt-10 w-2/3" />

            <p className="mt-8 max-w-xl text-base leading-7 text-ink/75">
              Every day, Pixel collects a handful of tools that are gaining attention (X-first), then verifies and distills
              them into calm, practical summaries.
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
              <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-accent-rose">Latest</div>
              {latest ? (
                <>
                  <div className="mt-2 font-display text-3xl tracking-tight">{latest.frontmatter.title}</div>
                  {latest.frontmatter.description ? (
                    <p className="mt-4 text-sm leading-6 text-ink/70">{latest.frontmatter.description}</p>
                  ) : null}
                  <div className="mt-7">
                    <Link
                      className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-ink/80 hover:text-ink"
                      href={`/blog/${latest.slug}`}
                    >
                      Read narrative <span className="text-accent-rose">→</span>
                    </Link>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-sm text-ink/70">No posts yet. (Pixel is stretching.)</p>
              )}
            </div>

            <div aria-hidden className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-ink/15 to-transparent" />

            <p className="mt-6 font-sans text-[11px] leading-6 text-ink/60">
              Notes: “Trending” is inferred via public web signals (not the official X trend API). Links are verified when
              possible.
            </p>
          </div>
        </section>

        {/* Pixel's Live Status */}
        <div className="mt-12 flex justify-center md:justify-start">
          <PixelStatus />
        </div>

        {/* Baban! Masterpiece Illustration */}
        <section className="relative mt-24 overflow-hidden rounded-3xl border border-ink/10 bg-white/20 shadow-xl group">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <img 
            src="/hero-masterpiece.png" 
            alt="Pixel in the glass orb" 
            className="w-full h-auto aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-sans">
             <div className="text-[10px] tracking-[0.4em] uppercase text-paper/80 mb-2 font-bold">Featured Artwork</div>
             <h2 className="text-paper text-3xl font-display tracking-tight leading-tight">Pixel's Core</h2>
             <p className="text-paper/70 text-sm mt-3 max-w-lg">The mechanical heart of the assistant, dreaming in a loop of glowing data and synthwave melodies.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
