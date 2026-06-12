import Link from "next/link";

import { ArticleAuthorByline } from "@/components/blog/article-author-byline";
import { ArticleCoverOrPlaceholder } from "@/components/blog/article-cover-or-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { listPublishedArticleCards } from "@/lib/articles/repository";

export async function HomeArticlesPreview() {
  const all = await listPublishedArticleCards();
  const previews = all.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20" aria-labelledby="articles-heading">
      <header className="mb-12 flex flex-row flex-wrap items-center justify-between gap-4">
        <h2 id="articles-heading" className="text-3xl font-bold text-primary md:text-4xl">
          مقالات مفيدة
        </h2>
        <Link href="/blog" className={cn(buttonVariants({ variant: "outline" }))}>
          عرض كل المقالات
        </Link>
      </header>
      <div className="grid gap-8 md:grid-cols-3">
        {previews.map((post) => (
          <Card key={`${post.slug}-${post.id}`} className="flex flex-col overflow-hidden border pt-0">
            <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-lg">
              <ArticleCoverOrPlaceholder
                fill
                src={post.cover.src}
                title={post.title}
                category={post.category}
                alt={post.cover.alt}
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={72}
                className="transition-opacity duration-300 hover:opacity-95"
                compact
              />
            </div>
            <CardHeader className="space-y-2 pb-2 text-right">
              <h3 className="text-xl font-semibold leading-snug text-primary">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <ArticleAuthorByline
                author={post.author}
                compact
                teamSize={Math.max(0, (post.contributors ?? []).length - 1)}
              />
            </CardHeader>
            <CardContent className="line-clamp-2 flex-1 text-right text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </CardContent>
            <CardFooter className="justify-end pt-2">
              <Link
                href={`/blog/${post.slug}`}
                className="text-start text-sm font-semibold text-[#1f7f8a] hover:underline"
              >
                تفاصيل المقالة: {post.title}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
