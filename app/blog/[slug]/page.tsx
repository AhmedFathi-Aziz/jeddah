import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, Mail } from "lucide-react";

import { ArticleRecentPostsPanel } from "@/components/blog/article-recent-posts-panel";
import { ArticleStickyCta } from "@/components/blog/article-sticky-cta";
import { ArticleTableOfContents } from "@/components/blog/article-table-of-contents";
import { BlogArticleMarkdownGate } from "@/components/blog/blog-article-markdown-gate";
import { buildMarkdownToc, getTocDisplayEntries } from "@/lib/articles/markdown-toc";
import { ArticleHeroSection } from "@/components/blog/article-hero-section";
import { RequestInspectionBox } from "@/components/layout/request-inspection-box";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { ArticleJsonLd } from "@/components/blog/article-json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { isVisualCoverPlaceholder } from "@/lib/articles/cover-display";
import { articlePathSlugMatchesStored } from "@/lib/articles/slug-utils";
import { articleDateLocaleLong } from "@/lib/articles/article-date";
import {
  getArticleBySlug,
  listAllSlugsForStaticBuild,
  listRecentRelatedArticleCards,
} from "@/lib/articles/repository";
import { images } from "@/lib/images";
import { absUrl, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

/**
 * مسارات من الملفات + ‎data/article-slugs-export.json‎ (يُملأ قبل النشر) + D1 وقت البناء إن وُجد.
 * بعد النشر بدون إعادة بناء: شغّل ‎npm run export:blog-slugs‎ ثم ‎deploy:cf‎.
 */
export async function generateStaticParams() {
  return listAllSlugsForStaticBuild();
}

/** يجب أن يكون معرّفاً كقيمة ثابتة (لا ‎process.env‎) — مطلوب مع ‎output: 'export'‎؛ مقالات جديدة تُضاف عبر ‎generateStaticParams‎ وقت البناء (ملفات + ‎data/article-slugs-export.json‎ + D1 إن وُجد وقت ‎build‎). */
export const dynamicParams = false;

export const revalidate = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "المقالة غير موجودة" };
  }
  if (!articlePathSlugMatchesStored(slug, article.slug)) {
    redirect(`/blog/${article.slug}`);
  }
  const url = absUrl(`/blog/${article.slug}`);
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${article.title} | ${siteConfig.name}`,
      description: article.excerpt,
      locale: siteConfig.locale.replace("_", "-"),
      images: [
        isVisualCoverPlaceholder(article.cover.src)
          ? {
              url: images.blogStains.src,
              width: images.blogStains.width,
              height: images.blogStains.height,
              alt: images.blogStains.alt,
            }
          : {
              url: article.cover.src,
              width: article.cover.width,
              height: article.cover.height,
              alt: article.cover.alt,
            },
      ],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  if (!articlePathSlugMatchesStored(slug, article.slug)) {
    redirect(`/blog/${article.slug}`);
  }
  const recentPosts = await listRecentRelatedArticleCards(article.id, 4);
  const toc = buildMarkdownToc(article.content);
  const tocDisplay = getTocDisplayEntries(toc);

  return (
    <>
      <ArticleJsonLd article={article} toc={tocDisplay} />
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-8 text-right md:pt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <article className="min-w-0 lg:col-span-9">
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                الرئيسية
              </Link>
              <ChevronLeft className="size-4" aria-hidden />
              <Link href="/blog" className="hover:text-primary">
                المدونة
              </Link>
              <ChevronLeft className="size-4" aria-hidden />
              <span className="font-semibold text-primary">{article.category}</span>
            </nav>

            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "mb-6 inline-flex items-center gap-1 text-muted-foreground",
              )}
            >
              <ChevronLeft className="size-4" aria-hidden />
              العودة للمدونة
            </Link>

            <header className="mb-8 space-y-4">
              <h1 className="text-balance text-4xl font-extrabold leading-tight text-primary md:text-5xl">
                {article.title}
              </h1>
              <p className="text-base text-muted-foreground">{articleDateLocaleLong(article.createdAt)}</p>
            </header>

            <ArticleHeroSection
              className="mb-10"
              title={article.title}
              category={article.category}
              coverSrc={article.cover.src}
              coverAlt={article.cover.alt}
              imageTitle={`${article.title} — غلاف المقال | ${siteConfig.name}`}
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />

            <div className="rounded-2xl border border-[#d9dee2] bg-white p-6 md:p-8">
              {article.excerpt ? (
                <p className="mb-8 border-b border-[#d9dee2]/70 pb-6 text-lg leading-relaxed text-[#1b5a73] md:text-xl">
                  {article.excerpt}
                </p>
              ) : null}

              <ArticleRecentPostsPanel posts={recentPosts} compact className="mb-6 lg:hidden" />
              <ArticleStickyCta
                phone={siteConfig.phone}
                phoneDisplay={siteConfig.phoneDisplay}
                className="mb-6 lg:hidden"
              />
              {tocDisplay.length > 0 ? (
                <ArticleTableOfContents items={tocDisplay} className="lg:hidden" />
              ) : null}

              <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:gap-10 lg:items-start">
                <div className="min-w-0">
                  <BlogArticleMarkdownGate
                    markdown={article.content}
                    presetHeadingIds={toc.map((e) => e.id)}
                  />
                </div>

                <aside className="hidden lg:block">
                  <div className="sticky top-24 space-y-4">
                    <ArticleRecentPostsPanel posts={recentPosts} compact />
                    <ArticleStickyCta
                      phone={siteConfig.phone}
                      phoneDisplay={siteConfig.phoneDisplay}
                    />
                    {tocDisplay.length > 0 ? (
                      <ArticleTableOfContents items={tocDisplay} variant="sidebar" />
                    ) : null}
                  </div>
                </aside>
              </div>
            </div>

            <footer className="mt-12 border-t border-[#d9dee2] pt-6">
              <p className="text-sm text-muted-foreground">
                {siteConfig.name} —{" "}
                <Link href={absUrl(`/blog/${article.slug}`)} className="text-primary underline">
                  رابط المقالة الدائم ({article.title})
                </Link>
              </p>
            </footer>
          </article>

          <aside className="space-y-6 lg:col-span-3">
            <RequestInspectionBox phone={siteConfig.phone} />

            <Card className="border border-[#d9dee2] bg-white shadow-sm ring-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-[#163d57]">
                  <Mail className="size-4" aria-hidden />
                  نصائح أسبوعية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-muted-foreground">
                  محتوى دوري عن التسربات والعزل وترشيد الاستهلاك.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="mt-14">
          <RelatedServicesSection currentPath={`/blog/${article.slug}`} heading="خدمات وروابط ذات صلة" />
        </div>
      </main>
    </>
  );
}
