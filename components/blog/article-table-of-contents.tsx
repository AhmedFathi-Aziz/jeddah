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
  compact,
}: {
  node: TocNode;
  compact?: boolean;
}) {
  const isSection = node.level === 2;

  return (
    <a
      href={`#${node.id}`}
      className={cn(
        "group block rounded-lg text-start transition-colors",
        "hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        compact ? "px-2 py-1.5 text-sm" : "px-3 py-2.5",
        isSection ? "font-semibold text-[#163d57]" : "font-medium text-[#1b5a73] ps-4",
      )}
    >
      <span className="min-w-0 leading-relaxed group-hover:text-primary">{node.text}</span>
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
  return (
    <ol
      className={cn(
        "m-0 list-none p-0",
        depth > 0 && (compact ? "me-2 mt-0.5 border-e border-[#d9dee2] pe-1" : "me-3 mt-1 border-e-2 border-[#d9dee2]/80 pe-1"),
      )}
    >
      {nodes.map((node) => {
        return (
          <li key={node.id}>
            <TocLink node={node} compact={compact} />
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
  const scrollMaxClass = isSidebar
    ? "max-h-[min(17rem,38vh)]"
    : "max-h-[min(15rem,34vh)]";

  return (
    <nav
      className={cn(
        "overflow-hidden rounded-xl border border-[#d9dee2] bg-white shadow-sm",
        isSidebar ? "mb-0" : "mb-4 sm:mb-6",
        className,
      )}
      aria-labelledby={headingId}
    >
      <header
        className={cn(
          "flex flex-wrap items-center justify-between gap-2 border-b border-[#d9dee2]/70 bg-white",
          isSidebar ? "px-3 py-3" : "px-3 py-3 sm:px-4 sm:py-4 md:px-5",
        )}
      >
        <div className="flex items-center gap-2">
          <h2
            id={headingId}
            className={cn("font-bold text-primary", isSidebar ? "text-base" : "text-base sm:text-lg md:text-xl")}
          >
            جدول المحتويات
          </h2>
        </div>
        {sectionCount > 0 ? (
          <span className="rounded-full border border-[#d9dee2] bg-white px-3 py-1 text-xs font-semibold text-[#1b5a73]">
            {sectionCount} {sectionCount === 1 ? "قسم" : "أقسام"}
          </span>
        ) : null}
      </header>

      <div
        className={cn(
          scrollMaxClass,
          "overflow-y-auto overscroll-contain bg-white [scrollbar-color:#c5d5dc_transparent] [scrollbar-width:thin]",
          isSidebar ? "px-1.5 py-2" : "px-1.5 py-1.5 sm:px-2 sm:py-2 md:px-3",
        )}
      >
        <TocList nodes={tree} compact />
      </div>

      {!isSidebar ? (
        <p className="border-t border-[#d9dee2]/60 bg-white px-4 py-3 text-xs leading-relaxed text-muted-foreground md:px-5">
          انقر على أي عنوان للانتقال مباشرة إلى القسم داخل المقال.
        </p>
      ) : null}
    </nav>
  );
}
