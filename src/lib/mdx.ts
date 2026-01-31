import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ToolCard } from "@/components/mdx/tool-card";
import { CodeBlock } from "@/components/mdx/code-block";

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: {
      ToolCard,
      pre: CodeBlock,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
