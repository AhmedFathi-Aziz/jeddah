import { ArticleCoverImage } from "@/components/blog/article-cover-image";
import { ArticleCoverPlaceholder } from "@/components/blog/article-cover-placeholder";
import { isVisualCoverPlaceholder } from "@/lib/articles/cover-display";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  title: string;
  category: string;
  alt: string;
  /** عنوان SEO للصورة؛ يُشتق من عنوان المقال إن لم يُمرَّر */
  imageTitle?: string;
  fill: true;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  quality?: number;
  compact?: boolean;
};

export function ArticleCoverOrPlaceholder(props: Props) {
  const { src, title, category, alt, imageTitle, className, sizes, priority, fetchPriority, quality, compact } =
    props;
  const coverTitle = imageTitle ?? `${title} — غلاف المقال | جدة للتسربات والعزل`;

  if (isVisualCoverPlaceholder(src)) {
    return (
      <ArticleCoverPlaceholder fill title={title} category={category} compact={compact} className={className} />
    );
  }

  return (
    <ArticleCoverImage
      fill
      src={src}
      alt={alt}
      title={coverTitle}
      sizes={sizes}
      priority={priority}
      fetchPriority={fetchPriority}
      quality={quality}
      className={cn("object-cover", className)}
    />
  );
}
