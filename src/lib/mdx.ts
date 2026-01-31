import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ToolCard } from "@/components/mdx/tool-card";
import { CodeBlock } from "@/components/mdx/code-block";
import { StepCard } from "@/components/mdx/step-card";

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: {
      ToolCard,
      StepCard,
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
