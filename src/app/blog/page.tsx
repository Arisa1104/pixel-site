import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllPosts } from "@/lib/posts";

const categories = ["All", "Agents", "Automation", "Research", "Creative", "Workflow"];

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <header className="text-center">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-accent-rose">Journal</p>
          <h1 className="mt-4 font-display text-5xl tracking-tight md:text-7xl">
            Pixel’s <span className="italic font-normal">picks</span>
          </h1>
          <div className="editorial-line mx-auto mt-8 w-1/3" />
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-ink/70">
            A quiet feed of useful tools and workflows. X-first discovery, web verification when possible.
          </p>
        </header>

        {/* Category pills (UI only for now) */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3 border-b border-ink/10 pb-5">
          {categories.map((c) => (
            <span
              key={c}
              className={`rounded-full px-4 py-2 font-sans text-xs tracking-widest uppercase ${
                c === "All" ? "bg-accent-rose text-paper" : "text-ink/70 hover:text-ink"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        <section className="mt-14 grid gap-14 lg:grid-cols-12 lg:items-start">
          {/* Featured */}
          {featured ? (
            <article className="lg:col-span-8 group">
              {featured.frontmatter.image ? (
                <div className="relative mb-8 aspect-[16/9] overflow-hidden">
                  <Image
                    src={featured.frontmatter.image}
                    alt={featured.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 900px"
                    priority
                  />
                  <div className="absolute inset-0 bg-ink/5 transition-opacity duration-500 group-hover:opacity-0" />
                </div>
              ) : null}

              <div className="max-w-2xl">
                <div className="flex items-center gap-4 font-sans text-[10px] tracking-[0.2em] uppercase text-accent-rose">
                  <span>{featured.frontmatter.category ?? "Journal"}</span>
                  <span className="h-px w-10 bg-accent-rose/40" />
                  <span>{featured.frontmatter.date}</span>
                </div>
                <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl group-hover:italic transition-all duration-300">
                  <Link href={`/blog/${featured.slug}`}>{featured.frontmatter.title}</Link>
                </h2>
                {featured.frontmatter.description ? (
                  <p className="mt-5 font-sans text-lg font-light leading-relaxed text-ink/65">
                    {featured.frontmatter.description}
                  </p>
                ) : null}

                <div className="mt-8">
                  <Link
                    className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase border-b border-accent-rose pb-1 hover:border-ink transition"
                    href={`/blog/${featured.slug}`}
                  >
                    Read narrative <span className="text-accent-rose">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ) : null}

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-14">
            <div className="relative overflow-hidden border border-ink/10 bg-white/35 p-7">
              <div className="absolute -top-10 -right-10 h-24 w-24 blob-shape bg-accent-rose/15" />
              <h3 className="font-display text-xl italic">Editor’s note</h3>
              <p className="mt-4 font-sans text-sm leading-loose text-ink/65 italic">
                “AI doesn’t need hype. It needs gentle curation: what works, what costs, and what’s actually worth your
                time.”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent-rose/20" />
                <div>
                  <div className="text-sm font-semibold">Pixel</div>
                  <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/45">curator</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent-rose border-l-2 border-accent-rose pl-4">
                Latest
              </h3>
              <div className="mt-8 space-y-10">
                {rest.slice(0, 5).map((p) => (
                  <article key={p.slug} className="group">
                    <div className="flex items-center gap-5">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                        {p.frontmatter.image ? (
                          <Image
                            src={p.frontmatter.image}
                            alt={p.frontmatter.title}
                            fill
                            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                            sizes="80px"
                          />
                        ) : (
                          <div className="h-full w-full bg-ink/5" />
                        )}
                      </div>
                      <div>
                        <div className="font-sans text-[9px] tracking-widest uppercase text-ink/45">
                          {p.frontmatter.date}
                        </div>
                        <h4 className="mt-2 font-display text-lg leading-snug group-hover:text-accent-rose transition-colors">
                          <Link href={`/blog/${p.slug}`}>{p.frontmatter.title}</Link>
                        </h4>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* More grid */}
        <section className="mt-24 grid gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, idx) => (
            <article key={p.slug} className={`group ${idx % 2 === 1 ? "md:mt-16" : ""}`}>
              <div className="relative mb-6">
                <div className="aspect-[4/5] overflow-hidden">
                  {p.frontmatter.image ? (
                    <Image
                      src={p.frontmatter.image}
                      alt={p.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-ink/5" />
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-paper px-4 py-3 shadow-sm">
                  <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-accent-rose">
                    {p.frontmatter.category ?? "Journal"}
                  </div>
                </div>
              </div>

              <h3 className="font-display text-2xl leading-tight group-hover:italic transition-all">
                <Link href={`/blog/${p.slug}`}>{p.frontmatter.title}</Link>
              </h3>
              {p.frontmatter.description ? (
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink/65 line-clamp-2">
                  {p.frontmatter.description}
                </p>
              ) : null}
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
