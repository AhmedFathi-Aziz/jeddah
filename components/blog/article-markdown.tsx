"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { getMarkdownHeadingIds } from "@/lib/articles/markdown-toc";
import { sanitizeArticleMarkdown } from "@/lib/articles/sanitize-article-markdown";
import { optimizeArticleImageSrc } from "@/lib/article-image-url";
import { cn } from "@/lib/utils";

type Props = {
  markdown: string;
  className?: string;
  /** من `buildMarkdownToc` على السيرفر لتفادي مسح Markdown مرتين */
  presetHeadingIds?: string[];
};

function isInternalHref(href: string | undefined): href is string {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

function buildHeadingComponents(ids: string[]): Components {
  let index = 0;
  const nextId = () => ids[index++] ?? "";

  return {
    a: ({ href, children, node: _node, ...props }) => {
      void _node;
      if (isInternalHref(href)) {
        return (
          <Link
            href={href}
            className="font-semibold text-[#163d57] underline decoration-[#197e8f]/60 decoration-2 underline-offset-2 transition-colors before:content-none after:content-none hover:text-[#197e8f] hover:decoration-[#197e8f]"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          className="font-semibold text-[#163d57] underline decoration-[#197e8f]/60 decoration-2 underline-offset-2 transition-colors before:content-none after:content-none hover:text-[#197e8f] hover:decoration-[#197e8f]"
          rel="noopener noreferrer"
          target="_blank"
          {...props}
        >
          {children}
        </a>
      );
    },
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
    img: (props) => {
      const { alt, src, node: _node, ...rest } = props;
      void _node;
      const resolvedAlt =
        typeof alt === "string" && alt.trim() !== ""
          ? alt
          : "صورة توضيحية ضمن مقال عن كشف التسربات والعزل في جدة";
      const raw = typeof src === "string" ? src : "";
      const optimized = optimizeArticleImageSrc(raw);
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...rest}
          src={optimized}
          alt={resolvedAlt}
          loading="lazy"
          decoding="async"
          className="h-auto max-w-full"
        />
      );
    },
    table: ({ children, ...props }) => (
      <div className="not-prose my-5 min-w-0 w-full max-w-full overflow-x-auto rounded-lg border border-[#d9dee2] sm:my-8 sm:rounded-xl [-webkit-overflow-scrolling:touch]">
        <table
          {...props}
          className="w-full min-w-[280px] border-collapse text-xs sm:min-w-0 sm:text-sm [&_td]:break-words [&_td]:border [&_td]:border-[#d9dee2] [&_td]:px-2 [&_td]:py-2 [&_td]:text-end [&_td]:align-top sm:[&_td]:px-4 sm:[&_td]:py-3 [&_th]:break-words [&_th]:border [&_th]:border-[#d9dee2] [&_th]:px-2 [&_th]:py-2 [&_th]:text-end [&_th]:font-semibold [&_th]:text-primary [&_th]:align-top sm:[&_th]:px-4 sm:[&_th]:py-3 [&_thead]:bg-primary/[0.06]"
        >
          {children}
        </table>
      </div>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        {...props}
        className="my-5 max-w-full overflow-x-auto break-words rounded-lg border border-primary/15 border-e-4 border-s-0 bg-primary/[0.04] px-3 py-3 text-[0.9rem] leading-[1.8] text-foreground/90 shadow-sm sm:my-8 sm:rounded-xl sm:px-5 sm:py-4 sm:text-[0.98rem] sm:leading-[1.85]"
      >
        {children}
      </blockquote>
    ),
  };
}

/**
 * يعمل في المتصفح لتقليل استهلاك CPU على Cloudflare Worker (خطأ 1102 مع remark/markdown).
 */
export function ArticleMarkdown({ markdown, className, presetHeadingIds }: Props) {
  const text = sanitizeArticleMarkdown(markdown.trim());
  if (!text) return null;

  const headingIds = presetHeadingIds?.length ? presetHeadingIds : getMarkdownHeadingIds(text);
  const markdownComponents = buildHeadingComponents(headingIds);

  return (
    <div
      className={cn(
        "prose prose-sm prose-slate sm:prose-base max-w-none min-w-0 w-full overflow-x-hidden text-right [text-align:right] [overflow-wrap:anywhere]",
        "prose-headings:scroll-mt-20 sm:prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-primary prose-headings:break-words",
        "prose-h2:text-lg sm:prose-h2:text-xl md:prose-h2:text-2xl",
        "prose-h3:text-base sm:prose-h3:text-lg md:prose-h3:text-xl",
        "prose-h4:text-sm sm:prose-h4:text-base md:prose-h4:text-lg",
        "prose-p:max-w-none prose-p:break-words prose-p:text-sm prose-p:leading-[1.8] prose-p:text-muted-foreground sm:prose-p:text-base sm:prose-p:leading-[1.85] md:prose-p:text-[1.0625rem]",
        "prose-headings:mt-8 prose-headings:mb-3 sm:prose-headings:mt-10 sm:prose-headings:mb-4 prose-h2:mt-9 sm:prose-h2:mt-12",
        "prose-ul:my-4 prose-ol:my-4 sm:prose-ul:my-6 sm:prose-ol:my-6 prose-li:my-0.5 sm:prose-li:my-1 prose-li:break-words",
        "[&_a]:before:content-none [&_a]:after:content-none",
        "prose-a:font-semibold prose-a:break-words prose-a:text-[#163d57] prose-a:underline prose-a:decoration-[#197e8f]/60 prose-a:decoration-2 prose-a:underline-offset-2 prose-a:before:content-none prose-a:after:content-none hover:prose-a:text-[#197e8f] hover:prose-a:decoration-[#197e8f]",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
        "prose-li:marker:text-primary",
        "prose-blockquote:my-5 prose-blockquote:max-w-full prose-blockquote:overflow-x-auto prose-blockquote:break-words prose-blockquote:rounded-lg sm:prose-blockquote:rounded-xl prose-blockquote:border prose-blockquote:border-primary/15 prose-blockquote:border-e-4 prose-blockquote:border-s-0 prose-blockquote:bg-primary/[0.04] prose-blockquote:px-3 prose-blockquote:py-3 prose-blockquote:ps-0 prose-blockquote:pe-3 sm:prose-blockquote:px-5 sm:prose-blockquote:py-4 sm:prose-blockquote:pe-5 prose-blockquote:text-[0.9rem] sm:prose-blockquote:text-[0.98rem] prose-blockquote:leading-[1.8] sm:prose-blockquote:leading-[1.85] prose-blockquote:text-foreground/90 prose-blockquote:shadow-sm",
        "prose-hr:my-12 prose-hr:border-[#d9dee2]",
        "prose-th:border prose-th:border-[#d9dee2] prose-th:px-2 prose-th:py-2 sm:prose-th:px-4 sm:prose-th:py-3 prose-th:font-semibold prose-th:text-primary prose-th:break-words",
        "prose-td:border prose-td:border-[#d9dee2] prose-td:px-2 prose-td:py-2 sm:prose-td:px-4 sm:prose-td:py-3 prose-td:break-words",
        "prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:bg-muted prose-pre:text-foreground prose-pre:rounded-xl prose-pre:border prose-pre:border-border",
        "prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg prose-img:border prose-img:shadow-sm",
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
