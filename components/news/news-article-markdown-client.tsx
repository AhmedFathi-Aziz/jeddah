"use client";

import { ArticleMarkdown } from "@/components/blog/article-markdown";

type Props = {
  markdown: string;
  presetHeadingIds?: string[];
  className?: string;
};

/** Markdown في المتصفح فقط — يمنع أخطاء hydration مع react-markdown. */
export function NewsArticleMarkdownClient({ markdown, presetHeadingIds, className }: Props) {
  return <ArticleMarkdown markdown={markdown} presetHeadingIds={presetHeadingIds} className={className} />;
}
