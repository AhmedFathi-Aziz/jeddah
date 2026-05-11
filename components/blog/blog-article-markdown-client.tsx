"use client";

import { buildMarkdownToc } from "@/lib/articles/markdown-toc";

import { ArticleMarkdown } from "./article-markdown";
import { ArticleTableOfContents } from "./article-table-of-contents";

type Props = {
  markdown: string;
};

/** Markdown + TOC في المتصفح فقط — يخفّض CPU على Cloudflare Worker. */
export function BlogArticleMarkdownClient({ markdown }: Props) {
  const toc = buildMarkdownToc(markdown);
  const presetHeadingIds = toc.map((e) => e.id);

  return (
    <>
      <ArticleTableOfContents items={toc} />
      <ArticleMarkdown markdown={markdown} presetHeadingIds={presetHeadingIds} />
    </>
  );
}
