import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Cpu,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { TeamMemberCard } from "@/components/team/team-member-card";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ABOUT_EQUIPMENT,
  ABOUT_FOUNDING,
  ABOUT_HERO_STATS,
  ABOUT_PROJECTS,
  ABOUT_SERVICE_CITIES,
  ABOUT_SERVICE_GROUPS,
  ABOUT_SEO,
  ABOUT_TEAM,
  buildAboutPageJsonLd,
} from "@/lib/seo/about-page-data";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { TEAM_MEMBERS } from "@/lib/seo/team-page-data";
import { siteConfig } from "@/lib/site-config";

/** بطاقات بدون حدود — ظل فقط (متسق مع contact/services) */
const aboutCard =
  "border-0 shadow-[0_12px_32px_-20px_rgba(19,66,89,0.28)] transition-shadow hover:shadow-[0_16px_40px_-18px_rgba(19,66,89,0.32)]";
const aboutHero =
  "border-0 shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)]";

export const metadata: Metadata = buildPageMetadata({
  title: ABOUT_SEO.title,
  description: ABOUT_SEO.description,
  path: "/about",
  keywords: [...ABOUT_SEO.keywords],
  ogTitle: ABOUT_SEO.ogTitle,
});

export default function AboutPage() {
  const tel = `tel:${siteConfig.phone}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildAboutPageJsonLd()) }}
      />
      <main className="page-main pb-mobile-fab pt-8 md:pt-14">
        <nav className="mb-8 text-right text-sm text-[#5a7588]" aria-label="مسار التصفح">
          <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
            الرئيسية
          </Link>
          <span className="mx-2 text-[#b8c9d4]" aria-hidden>
            /
          </span>
          <span className="text-[#163d57]">من نحن</span>
        </nav>

        <section className={cn("rounded-3xl bg-white p-7 text-right md:p-10", aboutHero)}>
          <p className="mb-3 inline-flex w-fit flex-row-reverse items-center gap-2 rounded-full bg-[#ecf8f8] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
            <ShieldCheck className="size-4" aria-hidden />
            الخبرة · التخصص · الموثوقية
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
            من نحن — {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-4xl text-pretty text-lg leading-8 text-[#4a6677]">
            {ABOUT_PROJECTS.paragraphs[0]}
          </p>
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

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_HERO_STATS.map((stat) => (
            <li
              key={stat.label}
              className={cn("rounded-2xl bg-white p-5 text-center", aboutCard)}
            >
              <p className="text-3xl font-extrabold text-[#1f7f8a]">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-[#4a6677]">{stat.label}</p>
            </li>
          ))}
        </ul>

        <section className={cn("mt-10 rounded-2xl bg-[#f7f9fa] p-6 text-right md:p-8", aboutCard)}>
          <h2 className="text-2xl font-extrabold text-[#163d57]">{ABOUT_FOUNDING.heading}</h2>
          {ABOUT_FOUNDING.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="mt-4 leading-[1.9] text-[#4a6677]">
              {p}
            </p>
          ))}
        </section>

        <section className="mt-10 text-right" aria-labelledby="about-cities-heading">
          <h2 id="about-cities-heading" className="inline-flex items-center gap-2 text-2xl font-extrabold text-[#163d57]">
            <MapPin className="size-6 text-[#1f7f8a]" aria-hidden />
            {ABOUT_SERVICE_CITIES.heading}
          </h2>
          <p className="mt-3 max-w-3xl leading-8 text-[#4a6677]">{ABOUT_SERVICE_CITIES.intro}</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              {ABOUT_SERVICE_CITIES.cities.map((city) => (
                <Card key={city.name} className={cn("h-full rounded-2xl bg-white text-right ring-0", aboutCard)}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-[#163d57]">{city.name}</CardTitle>
                    <p className="text-sm font-semibold text-[#1f7f8a]">{city.role}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm leading-7 text-[#4a6677]">{city.detail}</p>
                    <Link href={city.href} className="inline-flex text-sm font-semibold text-[#1f7f8a] hover:underline">
                      دليل التغطية الكامل
                      <ArrowLeft className="mr-1 size-4" aria-hidden />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-7">
              <p className="mb-4 text-base font-bold text-[#163d57]">{ABOUT_SERVICE_CITIES.majorAreasHeading}</p>
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                {ABOUT_SERVICE_CITIES.majorAreas.map((area) => (
                  <li key={area.href}>
                    <Link
                      href={area.href}
                      className={cn(
                        "flex min-h-14 items-center justify-center rounded-xl bg-white px-3 py-3 text-center text-sm font-semibold text-[#214f66] ring-0",
                        aboutCard,
                      )}
                    >
                      {area.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-[#4a6677]">
                هذه أبرز المناطق — وليس القائمة الكاملة.{" "}
                <Link href="/coverage" className="font-semibold text-[#1f7f8a] hover:underline">
                  تصفّح كل أحياء جدة (+60)
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className={cn("mt-10 rounded-2xl bg-white p-6 text-right md:p-8", aboutCard)}>
          <h2 className="inline-flex items-center gap-2 text-2xl font-extrabold text-[#163d57]">
            <Building2 className="size-6 text-[#1f7f8a]" aria-hidden />
            {ABOUT_PROJECTS.heading}
          </h2>
          <p className="mt-4 leading-[1.9] text-[#4a6677]">{ABOUT_PROJECTS.paragraphs[1]}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_PROJECTS.highlights.map((item) => (
              <li key={item.label} className={cn("rounded-xl bg-[#fafcfd] p-4 text-center", aboutCard)}>
                <p className="text-2xl font-extrabold text-[#1f7f8a]">{item.value}</p>
                <p className="mt-1 text-xs leading-6 text-[#4a6677]">{item.label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-6 text-[#7a919e]">{ABOUT_PROJECTS.footnote}</p>
        </section>

        <section className="mt-10 text-right" aria-labelledby="about-services-heading">
          <h2 id="about-services-heading" className="inline-flex items-center gap-2 text-2xl font-extrabold text-[#163d57]">
            <Wrench className="size-6 text-[#1f7f8a]" aria-hidden />
            أنواع الخدمات
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {ABOUT_SERVICE_GROUPS.map((group) => (
              <article key={group.title} className={cn("rounded-2xl bg-white p-6", aboutCard)}>
                <h3 className="text-lg font-bold text-[#163d57]">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex flex-row-reverse items-center justify-end gap-2 text-sm font-medium text-[#214f66] hover:text-[#1f7f8a] hover:underline"
                      >
                        {item.label}
                        <ArrowLeft className="size-3.5 shrink-0 opacity-60" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 text-right" aria-labelledby="about-equipment-heading">
          <h2 id="about-equipment-heading" className="inline-flex items-center gap-2 text-2xl font-extrabold text-[#163d57]">
            <Cpu className="size-6 text-[#1f7f8a]" aria-hidden />
            {ABOUT_EQUIPMENT.heading}
          </h2>
          <p className="mt-3 max-w-3xl leading-8 text-[#4a6677]">{ABOUT_EQUIPMENT.intro}</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {ABOUT_EQUIPMENT.categories.map((cat) => (
              <article key={cat.title} className={cn("rounded-2xl bg-[#f7f9fa] p-6", aboutCard)}>
                <h3 className="text-lg font-bold text-[#163d57]">{cat.title}</h3>
                <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-7 text-[#4a6677] marker:text-[#1f7f8a]">
                  {cat.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 text-right" aria-labelledby="about-team-heading">
          <div className="flex flex-row-reverse flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="about-team-heading" className="inline-flex items-center gap-2 text-2xl font-extrabold text-[#163d57]">
                <Users className="size-6 text-[#1f7f8a]" aria-hidden />
                {ABOUT_TEAM.heading}
              </h2>
              <p className="mt-3 max-w-3xl leading-8 text-[#4a6677]">{ABOUT_TEAM.intro}</p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f7f8a] hover:underline"
            >
              عرض الفريق كاملاً
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.slice(0, 3).map((member) => (
              <li key={member.id}>
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        </section>

        <RelatedServicesSection currentPath="/about" />
      </main>
    </>
  );
}
