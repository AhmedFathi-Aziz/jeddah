import Link from "next/link";

import { getRelatedServiceLinks } from "@/lib/navigation/related-service-links";

type Props = {
  slug: string;
  title?: string;
  excerpt?: string;
};

/** شريط روابط داخلية واضح أعلى نص المقال — يربط المحتوى بصفحات الموقع */
export function ArticleTopicLinksPanel({ slug, title = "", excerpt = "" }: Props) {
  const context = `${title} ${excerpt}`.trim();
  const links = getRelatedServiceLinks(`/blog/${slug}`, context).slice(0, 10);
  if (links.length === 0) return null;

  return (
    <nav
      className="mb-5 min-w-0 overflow-hidden rounded-xl border border-[#cfe8ee] bg-gradient-to-b from-[#f4fbfc] to-white p-3 shadow-sm sm:mb-6 sm:rounded-xl sm:p-4 md:p-5"
      aria-label="صفحات الموقع ذات الصلة"
    >
      <p className="text-xs font-extrabold text-[#163d57] sm:text-sm">صفحات الموقع ذات الصلة</p>
      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
        انتقل مباشرة لخدماتنا وأحياء جدة ومقالات مرتبطة بموضوع هذا الدليل.
      </p>
      <ul className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              title={link.description}
              className="inline-flex max-w-full items-center break-words rounded-md border border-[#b8dce4] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#1b5a73] shadow-sm transition hover:border-[#197e8f] hover:bg-[#eef7f9] hover:underline sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-xs"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
