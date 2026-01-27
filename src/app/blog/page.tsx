import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl tracking-tight">Blog</h1>
          <p className="mt-3 text-ink/70">
            Daily notes on what’s bubbling up — mostly X-driven, always sanity-checked against the open web.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="rounded-3xl border border-ink/10 bg-white/40 p-6 shadow-sm transition hover:border-ink/20"
            >
              <div className="text-xs text-ink/55">{p.frontmatter.date}</div>
              <h2 className="mt-2 font-display text-2xl tracking-tight">
                <Link className="hover:underline" href={`/blog/${p.slug}`}>
                  {p.frontmatter.title}
                </Link>
              </h2>
              {p.frontmatter.description ? (
                <p className="mt-3 text-sm leading-6 text-ink/70">{p.frontmatter.description}</p>
              ) : null}

              <div className="mt-6">
                <Link
                  className="inline-flex items-center gap-2 text-sm text-ink/80 hover:text-ink"
                  href={`/blog/${p.slug}`}
                >
                  Read
                  <span aria-hidden className="text-accent-rose">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
