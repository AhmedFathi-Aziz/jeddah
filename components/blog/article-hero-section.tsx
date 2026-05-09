import { ArticleCoverImage } from "@/components/blog/article-cover-image";
import { ArticleCoverOrPlaceholder } from "@/components/blog/article-cover-or-placeholder";
import { isVisualCoverPlaceholder } from "@/lib/articles/cover-display";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  category: string;
  coverSrc: string;
  coverAlt: string;
  imageTitle?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * غلاف المقال مع صورة ميدانية (أو بديل محلي لفني بجهاز عند غياب صورة حقيقية) وطبقة عرض + عرض ترويجي واضح.
 */
export function ArticleHeroSection({
  title,
  category,
  coverSrc,
  coverAlt,
  imageTitle,
  sizes = "(max-width: 1024px) 100vw, 900px",
  priority = true,
  className,
}: Props) {
  const fallback = images.leakGalleryPipelineScan;
  const useLocalWorkerHero = isVisualCoverPlaceholder(coverSrc);
  const resolvedSrc = useLocalWorkerHero ? fallback.src : coverSrc;
  const resolvedAlt = useLocalWorkerHero ? fallback.alt : coverAlt;

  return (
    <div
      className={cn("relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#d9dee2] shadow-sm", className)}
    >
      {useLocalWorkerHero ? (
        <ArticleCoverImage
          fill
          src={resolvedSrc}
          alt={resolvedAlt}
          title={imageTitle ?? `${title} — غلاف المقال`}
          sizes={sizes}
          priority={priority}
          fetchPriority="high"
          quality={78}
          className="object-cover"
        />
      ) : (
        <ArticleCoverOrPlaceholder
          fill
          src={coverSrc}
          title={title}
          category={category}
          alt={coverAlt}
          imageTitle={imageTitle}
          sizes={sizes}
          priority={priority}
          fetchPriority="high"
          quality={78}
          className="h-full w-full"
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1f2e]/55 via-transparent to-[#0a1f2e]/70"
        aria-hidden
      />

      <div className="absolute inset-x-0 top-0 flex justify-center p-4 md:justify-start md:px-6 md:pt-5">
        <p
          className="max-w-full rounded-xl border border-white/25 bg-[#c41e3a]/95 px-4 py-2.5 text-center text-base font-extrabold tracking-wide text-white shadow-lg backdrop-blur-sm md:text-start md:text-lg"
          role="status"
        >
          خصم 20% لفترة محدودة
        </p>
      </div>
    </div>
  );
}
