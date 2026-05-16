import { ListTree } from "lucide-react";

import { buildTocTree, type TocEntry, type TocNode } from "@/lib/articles/markdown-toc";
import { cn } from "@/lib/utils";

type Props = {
  items: TocEntry[];
  className?: string;
  /** inline: أعلى المقال (موبايل) | sidebar: عمود ثابت بجانب النص */
  variant?: "inline" | "sidebar";
};

function TocLink({
  node,
  index,
  compact,
}: {
  node: TocNode;
  index: number;
  compact?: boolean;
}) {
  const isSection = node.level === 2;

  return (
    <a
      href={`#${node.id}`}
      className={cn(
        "group flex items-start gap-2.5 rounded-lg text-start transition-colors",
        "hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        compact ? "px-2 py-1.5 text-sm" : "px-3 py-2.5",
        isSection ? "font-semibold text-[#163d57]" : "font-medium text-[#1b5a73]",
      )}
    >
      {isSection ? (
        <span
          className={cn(
            "mt-0.5 flex shrink-0 items-center justify-center rounded-md bg-primary/10 font-bold tabular-nums text-primary",
            compact ? "size-6 text-[10px]" : "size-7 text-xs",
          )}
          aria-hidden
        >
          {index}
        </span>
      ) : (
        <span
          className={cn(
            "shrink-0 rounded-full bg-[#5eb8c9] ring-2 ring-[#5eb8c9]/25",
            compact ? "mt-2 size-1" : "mt-2.5 size-1.5",
          )}
          aria-hidden
        />
      )}
      <span className="min-w-0 flex-1 leading-relaxed group-hover:text-primary">{node.text}</span>
    </a>
  );
}

function TocList({
  nodes,
  depth = 0,
  compact,
}: {
  nodes: TocNode[];
  depth?: number;
  compact?: boolean;
}) {
  let sectionIndex = 0;

  return (
    <ol
      className={cn(
        "m-0 list-none p-0",
        depth > 0 && (compact ? "me-2 mt-0.5 border-e border-[#d9dee2] pe-1" : "me-3 mt-1 border-e-2 border-[#d9dee2]/80 pe-1"),
      )}
    >
      {nodes.map((node) => {
        const displayIndex = node.level === 2 ? ++sectionIndex : sectionIndex;
        return (
          <li key={node.id}>
            <TocLink node={node} index={displayIndex} compact={compact} />
            {node.children.length > 0 ? (
              <TocList nodes={node.children} depth={depth + 1} compact={compact} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function ArticleTableOfContents({ items, className, variant = "inline" }: Props) {
  if (items.length === 0) return null;

  const tree = buildTocTree(items);
  const sectionCount = items.filter((e) => e.level === 2).length;
  const isSidebar = variant === "sidebar";
  const headingId = isSidebar ? "article-toc-sidebar-heading" : "article-toc-heading";

  return (
    <nav
      className={cn(
        "overflow-hidden rounded-xl border border-[#d9dee2] bg-white shadow-sm",
        isSidebar ? "mb-0" : "mb-8",
        className,
      )}
      aria-labelledby={headingId}
    >
      <header
        className={cn(
          "flex flex-wrap items-center justify-between gap-2 border-b border-[#d9dee2]/70 bg-white",
          isSidebar ? "px-3 py-3" : "px-4 py-4 md:px-5",
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex items-center justify-center rounded-lg bg-primary/10 text-primary",
              isSidebar ? "size-8" : "size-9",
            )}
          >
            <ListTree className={isSidebar ? "size-4" : "size-5"} aria-hidden />
          </span>
          <h2
            id={headingId}
            className={cn("font-bold text-primary", isSidebar ? "text-base" : "text-lg md:text-xl")}
          >
            جدول المحتويات
          </h2>
        </div>
        {sectionCount > 0 && !isSidebar ? (
          <span className="rounded-full border border-[#d9dee2] bg-white px-3 py-1 text-xs font-semibold text-[#1b5a73]">
            {sectionCount} {sectionCount === 1 ? "قسم" : "أقسام"}
          </span>
        ) : null}
      </header>

      <div
        className={cn(
          "bg-white",
          isSidebar
            ? "max-h-[min(62vh,calc(100dvh-18rem))] overflow-y-auto px-1.5 py-2"
            : "px-2 pb-4 pt-2 md:px-3 md:pb-5",
        )}
      >
        <TocList nodes={tree} compact={isSidebar} />
        {!isSidebar ? (
          <p className="mx-2 mt-3 border-t border-[#d9dee2]/60 pt-3 text-xs leading-relaxed text-muted-foreground">
            انقر على أي عنوان للانتقال مباشرة إلى القسم داخل المقال.
          </p>
        ) : null}
      </div>
    </nav>
  );
}
