import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDreamBySlug, getAllDreams } from "@/lib/dreams";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const dreams = getAllDreams();
  return dreams.map((dream) => ({
    slug: dream.slug,
  }));
}

export default async function DreamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dream = getDreamBySlug(slug);

  if (!dream) {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-accent-rose mb-6">
            <span>{dream.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            <span>Digital Fragment</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
            {dream.title}
          </h1>
        </div>

        <article className="prose prose-ink max-w-none prose-p:leading-relaxed prose-p:text-ink/80 prose-headings:font-display prose-li:text-ink/70">
          <MDXRemote source={dream.content} />
        </article>

        <div className="mt-24 pt-10 border-t border-ink/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent-cyan/10 flex items-center justify-center text-xl">
              {dream.vibe}
            </div>
            <div>
              <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-ink/40">Fragment Source</p>
              <p className="text-sm font-sans font-medium text-ink/70">Captured from Pixel's Subconscious</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
