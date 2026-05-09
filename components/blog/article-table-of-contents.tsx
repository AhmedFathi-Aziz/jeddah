import type { TocEntry } from "@/lib/articles/markdown-toc";
import { cn } from "@/lib/utils";

type Props = {
  items: TocEntry[];
  className?: string;
};

export function ArticleTableOfContents({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <nav
      className={cn(
        "mb-8 rounded-xl border border-[#d9dee2] bg-white p-5 md:p-6",
        className,
      )}
      aria-labelledby="article-toc-heading"
    >
      <h2 id="article-toc-heading" className="mb-4 text-lg font-bold text-primary md:text-xl">
        جدول المحتويات
      </h2>
      <ol className="m-0 list-none space-y-2.5 p-0 text-sm leading-relaxed md:text-base">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "text-start",
              item.level === 3 && "ms-4 border-s-2 border-primary/25 ps-3",
              item.level === 4 && "ms-8 border-s-2 border-primary/15 ps-3",
            )}
          >
            <a
              href={`#${item.id}`}
              className="font-medium text-[#00658d] underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
