import Link from "next/link";

import { getRelatedServiceLinks } from "@/lib/navigation/related-service-links";

type Props = {
  /** المسار الحالي للصفحة، مثل `/leak-detection` أو `/blog/slug-here` */
  currentPath: string;
  /** عنوان القسم الظاهر */
  heading?: string;
};

/**
 * قسم روابط داخلية لخدمات وصفحات ذات صلة — يُوضع أسفل المحتوى لتحسين التصفح وتوزيع الربط الداخلي.
 */
export function RelatedServicesSection({ currentPath, heading = "خدمات وصفحات ذات صلة" }: Props) {
  const links = getRelatedServiceLinks(currentPath);
  if (links.length === 0) return null;

  return (
    <section
      className="bg-[#f8fbfc]/80 py-12 md:py-14"
      aria-labelledby="related-services-heading"
    >
      <div className="mx-auto max-w-7xl px-6 text-right">
        <h2 id="related-services-heading" className="text-xl font-extrabold text-[#163d57] md:text-2xl">
          {heading}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#4a6677] md:text-base">
          اختر الصفحة المناسبة للتنقل بين خدمات الكشف والعزل والمدونة وتغطية الأحياء في جدة.
        </p>
        <nav className="mt-8" aria-label="روابط ذات صلة لخدمات الموقع">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border-0 bg-white p-5 shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-22px_rgba(19,66,89,0.34)]"
                >
                  <span className="text-base font-bold text-[#163d57] underline-offset-4 group-hover:underline">
                    {item.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-[#4a6677]">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
