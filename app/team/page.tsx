import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Users } from "lucide-react";

import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { TeamMemberCard } from "@/components/team/team-member-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import {
  TEAM_INTRO,
  TEAM_MEMBERS,
  TEAM_SEO,
  buildTeamPageJsonLd,
} from "@/lib/seo/team-page-data";
import { siteConfig } from "@/lib/site-config";

const heroSurface = "border-0 shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)]";

export const metadata: Metadata = buildPageMetadata({
  title: TEAM_SEO.title,
  description: TEAM_SEO.description,
  path: "/team",
  keywords: [...TEAM_SEO.keywords],
  ogTitle: TEAM_SEO.ogTitle,
});

export default function TeamPage() {
  const tel = `tel:${siteConfig.phone}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildTeamPageJsonLd()) }}
      />
      <main className="page-main pb-mobile-fab pt-8 md:pt-14">
        <nav className="mb-8 text-right text-sm text-[#5a7588]" aria-label="مسار التصفح">
          <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
            الرئيسية
          </Link>
          <span className="mx-2 text-[#b8c9d4]" aria-hidden>
            /
          </span>
          <Link href="/about" className="font-medium text-[#1f7f8a] hover:underline">
            من نحن
          </Link>
          <span className="mx-2 text-[#b8c9d4]" aria-hidden>
            /
          </span>
          <span className="text-[#163d57]">فريق العمل</span>
        </nav>

        <section className={cn("rounded-3xl bg-white p-7 text-right md:p-10", heroSurface)}>
          <p className="mb-3 inline-flex w-fit flex-row-reverse items-center gap-2 rounded-full bg-[#ecf8f8] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
            <Users className="size-4" aria-hidden />
            وجوه حقيقية — خبرة ميدانية
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
            {TEAM_INTRO.heading}
          </h1>
          {TEAM_INTRO.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="mt-4 max-w-4xl text-pretty text-lg leading-8 text-[#4a6677]">
              {p}
            </p>
          ))}
          <div className="mt-7 flex flex-row-reverse flex-wrap justify-end gap-3">
            <a
              href={tel}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
              )}
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
              )}
            >
              احجز معاينة
            </Link>
          </div>
        </section>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <li key={member.id}>
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>

        <section className="mt-10 rounded-2xl bg-[#f7f9fa] p-6 text-right md:p-8">
          <h2 className="text-xl font-extrabold text-[#163d57]">هل تريد التحدث مع الفريق؟</h2>
          <p className="mt-3 max-w-2xl leading-8 text-[#4a6677]">
            عند الحجز، يُحدَّد المختص المناسب لنوع مشكلتك — كشف تسرب، عزل سطح، أو خزان — قبل وصول الفريق
            إلى موقعك في جدة.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1f7f8a] hover:underline"
          >
            المزيد عن الشركة
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
        </section>

        <RelatedServicesSection currentPath="/team" />
      </main>
    </>
  );
}
