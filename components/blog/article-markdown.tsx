import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { getMarkdownHeadingIds } from "@/lib/articles/markdown-toc";
import { cn } from "@/lib/utils";

type Props = {
  markdown: string;
  className?: string;
};

function buildHeadingComponents(ids: string[]): Components {
  let index = 0;
  const nextId = () => ids[index++] ?? "";

  return {
    h1: ({ children, ...props }) => (
      <h2 id={nextId()} {...props}>
        {children}
      </h2>
    ),
    h2: ({ children, ...props }) => (
      <h3 id={nextId()} {...props}>
        {children}
      </h3>
    ),
    h3: ({ children, ...props }) => (
      <h4 id={nextId()} {...props}>
        {children}
      </h4>
    ),
    h4: "h5",
    h5: "h6",
    img: ({ alt, src, node: _node, ...props }) => {
      const resolvedAlt =
        typeof alt === "string" && alt.trim() !== ""
          ? alt
          : "صورة توضيحية ضمن مقال عن كشف التسربات والعزل في جدة";
      return (
        // eslint-disable-next-line @next/next/no-img-element -- مصادر الصور في Markdown خارجية وغير مضبوطة في `next.config`
        <img src={typeof src === "string" ? src : ""} alt={resolvedAlt} {...props} />
      );
    },
  };
}

/**
 * عرض نص المقال المخزّن كـ Markdown (عناوين، قوائم، جداول، كود…).
 */
export function ArticleMarkdown({ markdown, className }: Props) {
  const text = markdown.trim();
  if (!text) {
    return null;
  }

  const headingIds = getMarkdownHeadingIds(text);
  const markdownComponents = buildHeadingComponents(headingIds);

  return (
    <div
      className={cn(
        "prose prose-slate max-w-none text-right [text-align:right]",
        "prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-primary",
        "prose-h2:text-xl md:prose-h2:text-2xl",
        "prose-h3:text-lg md:prose-h3:text-xl",
        "prose-h4:text-base md:prose-h4:text-lg",
        "prose-p:max-w-[68ch] prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground",
        "prose-a:font-medium prose-a:text-[#00658d] prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
        "prose-li:marker:text-primary",
        "prose-blockquote:border-e-primary/40 prose-blockquote:border-s-0 prose-blockquote:ps-0 prose-blockquote:pe-4 prose-blockquote:text-muted-foreground",
        "prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-muted prose-pre:text-foreground prose-pre:rounded-xl prose-pre:border prose-pre:border-border",
        "prose-img:rounded-lg prose-img:border prose-img:shadow-sm",
        "prose-table:block prose-table:overflow-x-auto",
        "prose-th:text-end prose-td:text-end",
        className,
      )}
      dir="rtl"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
