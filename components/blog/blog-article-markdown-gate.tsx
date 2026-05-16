"use client";

import dynamic from "next/dynamic";

const BlogArticleMarkdownClient = dynamic(
  () => import("./blog-article-markdown-client").then((m) => m.BlogArticleMarkdownClient),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[280px] rounded-xl border border-dashed border-muted-foreground/20 bg-muted/20"
        aria-busy
        aria-label="جاري تحميل نص المقال"
      />
    ),
  },
);

type Props = {
  markdown: string;
  presetHeadingIds?: string[];
};

export function BlogArticleMarkdownGate({ markdown, presetHeadingIds }: Props) {
  return <BlogArticleMarkdownClient markdown={markdown} presetHeadingIds={presetHeadingIds} />;
}
