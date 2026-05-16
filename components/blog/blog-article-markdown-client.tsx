"use client";

import { ArticleMarkdown } from "./article-markdown";

type Props = {
  markdown: string;
  presetHeadingIds?: string[];
};

/** Markdown في المتصفح فقط — يخفّض CPU على Cloudflare Worker. جدول المحتويات يُعرض من السيرفر. */
export function BlogArticleMarkdownClient({ markdown, presetHeadingIds }: Props) {
  return <ArticleMarkdown markdown={markdown} presetHeadingIds={presetHeadingIds} />;
}
