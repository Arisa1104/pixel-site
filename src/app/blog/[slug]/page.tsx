import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { renderMdx } from "@/lib/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const content = await renderMdx(post.content);

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <article className="mx-auto max-w-3xl">
          <div className="text-xs text-ink/55">{post.frontmatter.date}</div>
          <h1 className="mt-2 font-display text-4xl tracking-tight">{post.frontmatter.title}</h1>
          {post.frontmatter.description ? (
            <p className="mt-4 text-base leading-7 text-ink/70">{post.frontmatter.description}</p>
          ) : null}

          <div className="prose prose-ink mt-10 max-w-none">{content}</div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
