import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { NewsArticleMarkdownGate } from "@/components/news/news-article-markdown-gate";
import { NewsSourceLink } from "@/components/news/news-source-link";
import { getMarkdownHeadingIds } from "@/lib/articles/markdown-toc";
import { formatNewsDate } from "@/lib/news/format-date";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllNewsSlugs, getNewsBySlug, listNews } from "@/lib/news/repository";
import { normalizeMetaDescription } from "@/lib/seo/build-metadata";
import { images } from "@/lib/images";
import { buildSocialMetadataFields } from "@/lib/seo/social-metadata-helpers";
import { absUrl, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "الخبر غير موجود" };
  const url = absUrl(`/news/${item.slug}`);
  const metaDescription = normalizeMetaDescription(item.excerpt);
  const social = buildSocialMetadataFields({
    title: item.title,
    description: metaDescription,
    ogImages: [
      {
        url: images.blogStains.src,
        width: images.blogStains.width,
        height: images.blogStains.height,
        alt: images.blogStains.alt,
      },
    ],
  });

  return {
    title: { absolute: item.title },
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      ...social.openGraph,
      url,
      locale: siteConfig.locale.replace("_", "-"),
    },
    twitter: social.twitter,
    robots: social.robots,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const others = listNews().filter((n) => n.slug !== item.slug).slice(0, 3);
  const headingIds = item.markdown ? getMarkdownHeadingIds(item.markdown) : [];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <nav className="mb-8 text-right text-sm text-[#5a7588]" aria-label="مسار التصفح">
        <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
          الرئيسية
        </Link>
        <span className="mx-2 text-[#c5d5de]">/</span>
        <Link href="/news" className="font-medium text-[#1f7f8a] hover:underline">
          الأخبار
        </Link>
        <span className="mx-2 text-[#c5d5de]">/</span>
        <span className="text-[#163d57]">{item.title}</span>
      </nav>

      <article className="text-right" dir="rtl">
        <header className="border-b border-[#d7e8ee] pb-8">
          <time
            dateTime={item.publishedAt}
            className="mb-3 inline-flex flex-row-reverse items-center gap-2 text-sm font-semibold text-[#1f7f8a]"
          >
            <Calendar className="size-4 shrink-0" aria-hidden />
            {formatNewsDate(item.publishedAt)}
          </time>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-4xl">{item.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-[#4a6677]">{item.excerpt}</p>
          {item.sourceName && item.sourceUrl && (
            <div className="mt-4 text-sm text-[#5a7588]">
              المصدر: <NewsSourceLink name={item.sourceName} url={item.sourceUrl} />
            </div>
          )}
        </header>

        {item.markdown ? (
          <NewsArticleMarkdownGate
            markdown={item.markdown}
            presetHeadingIds={headingIds}
            className="prose prose-slate mt-8 max-w-none text-right prose-p:text-[#4a6677] prose-p:leading-[1.9] prose-p:text-base md:prose-p:text-lg prose-headings:text-[#163d57]"
          />
        ) : (
          <div className="prose prose-slate mt-8 max-w-none text-right prose-p:text-[#4a6677] prose-p:leading-[1.9] prose-p:text-base md:prose-p:text-lg prose-headings:text-[#163d57]">
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {item.sourceName && item.sourceUrl && (
          <aside className="mt-8 rounded-xl border border-[#d7e8ee] bg-[#fafcfd] px-4 py-3 text-sm text-[#4a6677]">
            <span className="font-medium text-[#163d57]">الخبر الأصلي: </span>
            <NewsSourceLink name={item.sourceName} url={item.sourceUrl} />
          </aside>
        )}
      </article>

      {others.length > 0 && (
        <section className="mt-14 border-t border-[#e8eef1] pt-10" aria-labelledby="more-news">
          <h2 id="more-news" className="text-lg font-extrabold text-[#163d57] md:text-xl">
            أخبار أخرى
          </h2>
          <ul className="mt-4 space-y-3">
            {others.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/news/${n.slug}`}
                  className="block rounded-xl border border-transparent px-3 py-2 text-right text-[#1f7f8a] hover:border-[#d7e8ee] hover:bg-[#fafcfd]"
                >
                  <span className="font-semibold">{n.title}</span>
                  <span className="mt-1 block text-xs text-[#5a7588]">{formatNewsDate(n.publishedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 flex flex-row-reverse flex-wrap justify-end gap-3">
        <Link href="/news" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-xl border-[#8cc7d2]")}>
          كل الأخبار
        </Link>
        <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "rounded-xl bg-[#1f7f8a] font-bold text-white hover:bg-[#1a6d76]")}>
          تواصل معنا
        </Link>
      </div>

      <div className="mt-14">
        <RelatedServicesSection currentPath={`/news/${slug}`} heading="روابط ذات صلة" />
      </div>
    </main>
  );
}
