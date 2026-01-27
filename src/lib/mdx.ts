import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ToolCard } from "@/components/mdx/tool-card";

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: {
      ToolCard,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
