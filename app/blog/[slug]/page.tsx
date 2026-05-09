export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail } from "lucide-react";

import { ArticleMarkdown } from "@/components/blog/article-markdown";
import { ArticleHeroSection } from "@/components/blog/article-hero-section";
import { ArticleTableOfContents } from "@/components/blog/article-table-of-contents";
import { RequestInspectionBox } from "@/components/layout/request-inspection-box";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { ArticleJsonLd } from "@/components/blog/article-json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { isVisualCoverPlaceholder } from "@/lib/articles/cover-display";
import { buildMarkdownToc } from "@/lib/articles/markdown-toc";
import { getArticleBySlug, listPublishedArticles } from "@/lib/articles/repository";
import { images } from "@/lib/images";
import { absUrl, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "المقالة غير موجودة" };
  }
  const url = `/blog/${article.slug}`;
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
  const allPosts = await listPublishedArticles();
  const relatedPosts = allPosts.filter((p) => p.slug !== article.slug).slice(0, 3);
  const toc = buildMarkdownToc(article.content);
  return (
    <>
      <ArticleJsonLd article={article} />
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-8 text-right md:pt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
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
              <p className="text-base text-muted-foreground">
                {article.createdAt.toLocaleDateString("ar-SA", {
                  dateStyle: "long",
                })}
              </p>
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
              <ArticleTableOfContents items={toc} />
              <ArticleMarkdown markdown={article.content} />
            </div>

            <footer className="mt-12 border-t border-[#d9dee2] pt-6">
              <p className="text-sm text-muted-foreground">
                {siteConfig.name} —{" "}
                <Link href={`${absUrl("/blog")}/${article.slug}`} className="text-primary underline">
                  رابط المقالة الدائم ({article.title})
                </Link>
              </p>
            </footer>
          </article>

          <aside className="space-y-6 lg:col-span-4">
            <RequestInspectionBox phone={siteConfig.phone} />

            <Card className="border-0 ring-0 bg-[#f8fbfc] shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)]">
              <CardHeader>
                <CardTitle className="text-[#163d57]">مقالات ذات صلة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block rounded-lg border-0 bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-[#1b5a73] shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] hover:bg-[#eef7f9] hover:text-[#163d57]"
                  >
                    {post.title}
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)]">
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
