import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
  tags?: string[];
  category?: string;
  image?: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

export function getAllPosts(): Post[] {
  const files = safeReadDir(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .sort();

  const posts = files
    .map((file) => {
      const fullPath = path.join(POSTS_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);

      const slug = file.replace(/\.(mdx|md)$/, "");
      const frontmatter = data as PostFrontmatter;

      // Minimal sanity defaults
      if (!frontmatter.title) frontmatter.title = slug;
      if (!frontmatter.date) frontmatter.date = "1970-01-01";

      return { slug, frontmatter, content } satisfies Post;
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const candidates = [
    path.join(POSTS_DIR, `${slug}.mdx`),
    path.join(POSTS_DIR, `${slug}.md`),
  ];
  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  if (!frontmatter.title) frontmatter.title = slug;
  if (!frontmatter.date) frontmatter.date = "1970-01-01";

  return { slug, frontmatter, content };
}
