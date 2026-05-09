import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * أي رابط صورة خارجي غير مذكور في `next.config` يكسر `<Image />` في الإنتاج.
 * نستخدم `<img>` للروابط العشوائية حتى لا يتعطل نشر/عرض المقالات.
 */
function isNextOptimizedSrc(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const u = new URL(src);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    const host = u.hostname.toLowerCase();
    return host === "placehold.co" || host === "lh3.googleusercontent.com";
  } catch {
    return false;
  }
}

type PropsFixed = {
  src: string;
  alt: string;
  /** يُمرَّر إلى `title` على الصورة — مفيد لـ Google Images وللمستخدم */
  title?: string;
  width: number;
  height: number;
  fill?: false;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  quality?: number;
};

type PropsFill = {
  src: string;
  alt: string;
  title?: string;
  fill: true;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  quality?: number;
};

export function ArticleCoverImage(props: PropsFixed | PropsFill) {
  const { src, alt, title, className, sizes, priority, fetchPriority, quality } = props;
  const resolvedTitle = title ?? alt;

  if ("fill" in props && props.fill) {
    if (isNextOptimizedSrc(src)) {
      return (
        <Image
          fill
          src={src}
          alt={alt}
          title={resolvedTitle}
          className={className}
          sizes={sizes}
          priority={priority}
          fetchPriority={fetchPriority}
          quality={quality}
        />
      );
    }
    return (
      <>
        {/* روابط صور من لوحة التحكم — `<Image />` يتطلب قائمة نطاقات في `next.config` */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          title={resolvedTitle}
          className={cn("absolute inset-0 h-full w-full object-cover", className)}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </>
    );
  }

  const { width, height } = props;

  if (isNextOptimizedSrc(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        title={resolvedTitle}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        fetchPriority={fetchPriority}
        quality={quality}
      />
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        title={resolvedTitle}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </>
  );
}
