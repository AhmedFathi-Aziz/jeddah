"use client";

import dynamic from "next/dynamic";

const NewsArticleMarkdownClient = dynamic(
  () => import("./news-article-markdown-client").then((m) => m.NewsArticleMarkdownClient),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[200px] rounded-xl border border-dashed border-[#d7e8ee] bg-[#fafcfd]/80"
        aria-busy
        aria-label="جاري تحميل نص الخبر"
      />
    ),
  },
);

type Props = {
  markdown: string;
  presetHeadingIds?: string[];
  className?: string;
};

export function NewsArticleMarkdownGate({ markdown, presetHeadingIds, className }: Props) {
  return (
    <NewsArticleMarkdownClient
      markdown={markdown}
      presetHeadingIds={presetHeadingIds}
      className={className}
    />
  );
}
