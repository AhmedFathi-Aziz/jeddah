import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";

import { ArticleCoverOrPlaceholder } from "@/components/blog/article-cover-or-placeholder";
import { articleDateLocaleShort, safeArticleDate } from "@/lib/articles/article-date";
import type { ArticleCard } from "@/lib/articles/types";
import { cn } from "@/lib/utils";

type Props = {
  posts: ArticleCard[];
  className?: string;
  compact?: boolean;
};

export function ArticleRecentPostsPanel({ posts, className, compact }: Props) {
  if (posts.length === 0) return null;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-[#d9dee2] bg-white shadow-sm",
        className,
      )}
      aria-labelledby="article-recent-posts-heading"
    >
      <header
        className={cn(
          "flex items-center justify-between gap-2 border-b border-[#d9dee2]/70 bg-white",
          compact ? "px-3 py-3" : "px-4 py-4",
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex items-center justify-center rounded-lg bg-primary/10 text-primary",
              compact ? "size-8" : "size-9",
            )}
          >
            <Newspaper className={compact ? "size-4" : "size-5"} aria-hidden />
          </span>
          <h2
            id="article-recent-posts-heading"
            className={cn("font-bold text-primary", compact ? "text-base" : "text-lg")}
          >
            أحدث المقالات
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-xs font-semibold text-[#197e8f] hover:text-primary hover:underline"
        >
          الكل
        </Link>
      </header>

      <ul className={cn("m-0 list-none p-0", compact ? "p-2" : "p-3")}>
        {posts.map((post, index) => {
          const published = safeArticleDate(post.createdAt).toISOString();
          return (
            <li
              key={post.id}
              className={cn(index > 0 && "mt-2 border-t border-[#d9dee2]/60 pt-2")}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted/30"
              >
                <div className="relative h-[4.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-lg border border-[#d9dee2]/60 bg-muted">
                  <ArticleCoverOrPlaceholder
                    fill
                    compact
                    src={post.cover.src}
                    title={post.title}
                    category={post.category}
                    alt={post.cover.alt}
                    sizes="88px"
                    quality={70}
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="min-w-0 flex-1 text-start">
                  <p className="text-[10px] font-bold text-[#197e8f]">{post.category}</p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-[#163d57] group-hover:text-primary">
                    {post.title}
                  </p>
                  <time dateTime={published} className="mt-1 block text-[11px] text-muted-foreground">
                    {articleDateLocaleShort(post.createdAt)}
                  </time>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={cn("border-t border-[#d9dee2]/70 bg-white", compact ? "px-3 py-3" : "px-4 py-3")}>
        <Link
          href="/blog"
          className="flex items-center justify-center gap-1 text-sm font-semibold text-[#1b5a73] transition-colors hover:text-primary"
        >
          عرض كل المقالات
          <ArrowLeft className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
