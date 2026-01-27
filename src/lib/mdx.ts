import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export async function renderMdx(source: string) {
  // Keep this intentionally simple for now.
  // If we later want custom components (callouts, cards, etc.), we can add them here.
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
