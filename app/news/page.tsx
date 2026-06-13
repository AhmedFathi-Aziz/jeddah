import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ChevronLeft, Newspaper } from "lucide-react";

import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { NewsSourceLink } from "@/components/news/news-source-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatNewsDate } from "@/lib/news/format-date";
import { listNews } from "@/lib/news/repository";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { keywordsForPath } from "@/lib/seo/keyword-clusters";
import { absUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "أخبار كشف التسربات والعزل في جدة | مستجدات ونصائح موسمية محلية",
    description:
      "مستجدات ونصائح موسمية وتحديثات خدمة من جدة للتسربات والعزل: فحص التسربات بدون تكسير، صيانة الخزانات، عزل الأسطح، والمجمعات السكنية في المدينة.",
    path: "/news",
    keywords: keywordsForPath("/news"),
    ogTitle: `الأخبار — ${siteConfig.name}`,
  }),
  openGraph: {
    images: [
      {
        url: images.blogStains.src,
        width: images.blogStains.width,
        height: images.blogStains.height,
        alt: images.blogStains.alt,
      },
    ],
  },
};

export default function NewsPage() {
  const items = listNews();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <nav className="mb-8 text-right text-sm text-[#5a7588]" aria-label="مسار التصفح">
        <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
          الرئيسية
        </Link>
        <span className="mx-2 text-[#c5d5de]">/</span>
        <span className="text-[#163d57]">الأخبار</span>
      </nav>

      <header className="rounded-3xl border border-[#d7e8ee] bg-white p-7 text-right shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)] md:p-10">
        <p className="mb-3 inline-flex w-fit flex-row-reverse items-center gap-2 rounded-full bg-[#ecf8f8] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
          <Newspaper className="size-4" aria-hidden />
          تحديثات ونصائح
        </p>
        <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">الأخبار</h1>
        <p className="mt-4 max-w-3xl text-pretty text-lg leading-8 text-[#4a6677]">
          مستجدات عن خدماتنا، تذكيرات موسمية، ومواضيع تهم أصحاب المنازل والمجمعات في جدة — بجانب{" "}
          <Link href="/blog" className="font-semibold text-[#1f7f8a] hover:underline">
            المدونة التفصيلية
          </Link>{" "}
          للإرشادات الطويلة.
        </p>
      </header>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.slug}>
            <article className="flex h-full flex-col rounded-2xl border border-[#e8eef1] bg-white p-6 text-right shadow-[0_12px_28px_-18px_rgba(19,66,89,0.26)] transition-shadow hover:shadow-[0_16px_36px_-20px_rgba(19,66,89,0.3)] md:p-7">
              <time
                dateTime={item.publishedAt}
                className="mb-3 inline-flex flex-row-reverse items-center gap-2 text-sm font-medium text-[#1f7f8a]"
              >
                <Calendar className="size-4 shrink-0" aria-hidden />
                {formatNewsDate(item.publishedAt)}
              </time>
              <h2 className="text-xl font-extrabold leading-snug text-[#163d57] md:text-2xl">{item.title}</h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-[#4a6677]">{item.excerpt}</p>
              {item.sourceName && item.sourceUrl && (
                <div className="mt-3 text-sm text-[#5a7588]">
                  المصدر: <NewsSourceLink name={item.sourceName} url={item.sourceUrl} />
                </div>
              )}
              <Link
                href={`/news/${item.slug}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "mt-5 inline-flex flex-row-reverse items-center gap-1 self-end px-2 font-semibold text-[#1f7f8a] hover:bg-[#ecf8f8]",
                )}
              >
                اقرأ الخبر
                <ChevronLeft className="size-4" aria-hidden />
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center text-sm text-[#5a7588]">
        للاستفسارات أو تغطية إعلامية:{" "}
        <Link href="/contact" className="font-semibold text-[#1f7f8a] hover:underline">
          اتصل بنا
        </Link>
      </p>

      <div className="mt-14">
        <RelatedServicesSection currentPath="/news" heading="روابط ذات صلة" />
      </div>
    </main>
  );
}
