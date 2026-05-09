import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Droplets, Home, Layers, Phone, Newspaper, Mail } from "lucide-react";

import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { ArticleCoverOrPlaceholder } from "@/components/blog/article-cover-or-placeholder";
import { BlogJsonLd } from "@/components/blog/blog-json-ld";
import { BlogNewsletterForm } from "@/components/blog/blog-newsletter-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { listPublishedArticles } from "@/lib/articles/repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدونة كشف تسربات المياه والعزل في جدة",
  description:
    "مقالات وإرشادات عملية عن كشف التسربات بدون تكسير، العزل الحراري، وفهم استهلاك المياه في منطقة جدة.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: `مدونة تسربات المياه والعزل — ${siteConfig.name}`,
    description:
      "نصائح تقنية حول التسربات والعزل المائي والحراري لمنزل في جدة.",
    images: [{ url: images.blogStains.src, width: images.blogStains.width, height: images.blogStains.height, alt: images.blogStains.alt }],
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ newsletter?: string }>;
}) {
  const resolved = await searchParams;
  const newsletter = resolved?.newsletter;
  const posts = await listPublishedArticles();

  const leakSlug = posts.find((p) => p.category.includes("تسرب"))?.slug;
  const roofSlug = posts.find((p) => p.category.includes("العزل الحراري"))?.slug;
  const billSlug = posts.find((p) => p.category.includes("صيانة"))?.slug;

  const categories = [
    {
      href: leakSlug ? `#${leakSlug}` : "/blog",
      label: "موضوعات كشف التسربات في جدة",
      Icon: Droplets,
    },
    {
      href: roofSlug ? `#${roofSlug}` : "/blog",
      label: "مقالات عزل الأسطح والحرارة لمباني الساحل",
      Icon: Home,
    },
    {
      href: billSlug ? `#${billSlug}` : "/blog",
      label: "نصائح صيانة وقراءة فاتورة المياه بالسعودية",
      Icon: Newspaper,
    },
    { href: "/#coverage", label: "خريطة التغطية وأحياء جدة التي نعمل بخدمات العزل والتسرب", Icon: Layers },
  ] as const;

  const tel = `tel:${siteConfig.phone}`;

  return (
    <>
      <BlogJsonLd posts={posts} />
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:pt-12">
        <header className="mb-12 rounded-2xl border-0 bg-card/60 p-6 text-right shadow-sm md:p-8">
          {newsletter === "ok" && (
            <p role="status" className="mb-4 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
              تم تسجيل البريد (تجربة وهمية؛ اربط السيرفر بحساب بريدي لاحقاً).
            </p>
          )}
          {newsletter === "invalid" && (
            <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              البريد غير صالح.
            </p>
          )}
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
            مدونة جدة للتسربات والعزل
          </h1>
          <p className="mt-4 max-w-3xl text-pretty leading-8 text-muted-foreground">
            محتوى احترافي منظم عن كشف التسربات، العزل المائي والحراري، وترشيد استهلاك المياه في جدة.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="order-2 space-y-5 lg:order-1 lg:col-span-3">
            <div className="rounded-xl border-0 bg-card p-5 shadow-sm lg:sticky lg:top-24">
              <h2 className="mb-4 border-e-4 border-[#3dbeff] pe-3 text-lg font-bold text-primary text-right">
                التصنيفات
              </h2>
              <ul className="space-y-2 text-sm">
                {categories.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex flex-row-reverse items-center justify-between gap-2 rounded-md px-2 py-2 font-medium text-muted-foreground hover:bg-muted"
                    >
                      {label}
                      <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <Separator className="my-5" />
              <div className="rounded-lg bg-primary p-4 text-primary-foreground shadow-sm">
                <div className="mb-2 flex flex-row-reverse items-center gap-2 font-bold">
                  خدمة الطوارئ <Phone className="size-4 shrink-0" aria-hidden />
                </div>
                <p className="mb-4 text-sm text-primary-foreground/90 leading-relaxed">
                  تسرب مفاجئ؟ احجز مراسلة فنية سريعة عبر الهاتف.
                </p>
                <Link
                  href={tel}
                  className={cn(buttonVariants({ size: "default" }), "w-full justify-center font-bold bg-white text-primary hover:bg-white/90")}
                >
                  اتصل الآن
                </Link>
              </div>
            </div>
          </aside>

          <section className="order-1 space-y-10 lg:order-2 lg:col-span-9" aria-labelledby="blog-articles-heading">
            <h2 id="blog-articles-heading" className="sr-only">
              أحدث المقالات
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post, idx) => (
                <article
                  key={post.id}
                  id={post.slug}
                  className="flex flex-col overflow-hidden rounded-xl border-0 bg-card shadow-sm scroll-mt-28 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-[5/3] shrink-0 overflow-hidden">
                    <ArticleCoverOrPlaceholder
                      fill
                      src={post.cover.src}
                      title={post.title}
                      category={post.category}
                      alt={post.cover.alt}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="transition-opacity hover:opacity-95"
                      priority={idx === 0}
                      quality={idx === 0 ? 78 : 72}
                      compact
                    />
                  </Link>
                  <Card className="flex flex-1 flex-col rounded-none rounded-b-xl border-0 bg-transparent shadow-none">
                    <CardHeader className="pb-2 text-right">
                      <p className="text-xs font-bold text-[#00658d]">{post.category}</p>
                      <h3 className="mt-2 text-xl font-bold leading-snug text-primary">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                    </CardHeader>
                    <CardContent className="line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {post.excerpt}
                    </CardContent>
                    <CardFooter className="justify-end pt-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex flex-row-reverse items-center gap-1 text-sm font-bold text-[#00658d] hover:underline"
                      >
                        تفاصيل المقالة <ChevronRight className="size-4 rotate-180" aria-hidden />
                      </Link>
                    </CardFooter>
                  </Card>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="relative mt-16 overflow-hidden rounded-2xl border-0 bg-muted/30 p-8 shadow-sm md:p-12" aria-labelledby="newsletter-h">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(0,63,135,0.35) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-[1] mx-auto max-w-2xl text-center">
            <Mail className="mx-auto mb-4 size-12 text-primary" aria-hidden />
            <h2 id="newsletter-h" className="text-2xl font-bold text-primary">
              اشتراك في النشرة البريدية
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              تلقي نصائح صيانة وقائية دون تشغيل سكربتات طرف ثالث على الصفحة.
            </p>
            <BlogNewsletterForm />
          </div>
        </section>

        <RelatedServicesSection currentPath="/blog" heading="خدمات ذات صلة بالمدونة" />
      </main>
      <aside className="sr-only">
        <Link href="/">الصفحة الرئيسية</Link> / <span>مدونة كشف تسربات وعزل بجدة</span>
      </aside>
    </>
  );
}
