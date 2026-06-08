import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Phone } from "lucide-react";

import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { RequestInspectionBox } from "@/components/layout/request-inspection-box";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { insulationServices } from "@/lib/insulation-services";
import { SCHEMA_LOCAL_BUSINESS_ID } from "@/lib/seo/schema-ids";
import {
  buildInsulationServiceFaqSchema,
  getInsulationServiceContent,
} from "@/lib/seo/insulation-services-content";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { absUrl, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

function renderInlineBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[#163d57]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const tel = `tel:${siteConfig.phone}`;
const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`;

export async function generateStaticParams() {
  return insulationServices.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getInsulationServiceContent(slug);
  if (!content) return { title: "الخدمة غير موجودة" };

  const path = `/insulation-services/${content.slug}`;
  return buildPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path,
    keywords: [content.primaryKeyword, ...insulationServices.find((s) => s.slug === slug)!.keywords],
    ogTitle: `${content.h1} | ${siteConfig.name}`,
  });
}

export default async function InsulationServicePage({ params }: Props) {
  const { slug } = await params;
  const service = insulationServices.find((s) => s.slug === slug);
  const content = getInsulationServiceContent(slug);
  if (!service || !content) notFound();

  const path = `/insulation-services/${content.slug}`;
  const faqSchema = buildInsulationServiceFaqSchema(content);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.h1,
    description: content.metaDescription,
    url: absUrl(path),
    provider: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: "جدة",
      containedInPlace: { "@type": "Country", name: "المملكة العربية السعودية" },
    },
    serviceType: content.primaryKeyword,
  };

  const sectionClass = "rounded-2xl border border-[#e8edf0] bg-white p-6 text-right shadow-sm md:p-8";
  const h2Class = "text-2xl font-extrabold text-[#163d57] md:text-3xl";
  const pClass = "mt-4 text-base leading-[1.95] text-[#4a6677] md:text-lg";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />

      <main className="page-main pb-mobile-fab py-10 md:py-16">
        <nav className="mx-auto mb-6 max-w-7xl px-6 text-sm text-[#5a7588]" aria-label="مسار التصفح">
          <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link href="/insulation" className="font-medium text-[#1f7f8a] hover:underline">
            العزل
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#163d57]">{content.h1}</span>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:items-start">
          <div className="space-y-8 lg:col-span-8">
            <Link
              href="/insulation"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "inline-flex items-center gap-2 rounded-xl border-0 bg-white px-4 text-[#3c596d] shadow-sm hover:bg-[#f8fbfc]",
              )}
            >
              <ArrowLeft className="size-4" aria-hidden />
              العودة لصفحة العزل
            </Link>

            <header className="rounded-3xl border border-[#e8edf0] bg-gradient-to-b from-[#f8fbfc] to-white p-6 md:p-10">
              <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
                {content.h1}
              </h1>
              {content.intro.map((para) => (
                <p key={para.slice(0, 48)} className={pClass}>
                  {renderInlineBold(para)}
                </p>
              ))}
              <div className="mt-6 flex flex-row-reverse flex-wrap gap-3">
                <a
                  href={tel}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
                  )}
                >
                  <Phone className="size-4" aria-hidden />
                  طلب معاينة
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "inline-flex h-11 items-center gap-2 rounded-xl border-[#25D366]/50 bg-[#25D366] px-6 font-semibold text-white hover:bg-[#20bd5a]",
                  )}
                >
                  <WhatsAppLogo className="size-5 text-white" />
                  واتساب
                </a>
              </div>
            </header>

            <section className={sectionClass}>
              <h2 className={h2Class}>{content.whyHeading}</h2>
              {content.whyBody.map((p) => (
                <p key={p.slice(0, 40)} className={pClass}>
                  {p}
                </p>
              ))}
            </section>

            <section className={cn(sectionClass, "bg-[#f7f9fa]")}>
              <h2 className={h2Class}>خطوات تنفيذ {content.primaryKeyword}</h2>
              <ol className="mt-6 space-y-4">
                {content.process.map((step, i) => (
                  <li key={step.title} className="rounded-xl bg-white p-5">
                    <h3 className="text-lg font-bold text-[#163d57]">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="mt-2 leading-8 text-[#4a6677]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className={sectionClass}>
              <h2 className={h2Class}>المواد والتقنيات</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {content.materials.map((m) => (
                  <article key={m.title} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
                    <h3 className="font-bold text-[#163d57]">{m.title}</h3>
                    <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{m.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={cn(sectionClass, "bg-[#f7f9fa]")}>
              <h2 className={h2Class}>فوائد الخدمة</h2>
              <ul className="mt-4 space-y-3">
                {content.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[#33586d]">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#1f7f8a]" aria-hidden />
                    <span className="leading-8">{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={cn(h2Class, "inline-flex items-center gap-2")}>
                <MapPin className="size-6 text-[#1f7f8a]" aria-hidden />
                صلة الخدمة بمناخ جدة
              </h2>
              <p className={pClass}>{content.jeddahNote}</p>
            </section>

            <section className={cn(sectionClass, "bg-[#f7f9fa]")}>
              <h2 className={h2Class}>أسئلة شائعة</h2>
              <div className="mt-6 space-y-4">
                {content.faq.map((item) => (
                  <article key={item.question} className="rounded-xl border border-[#e8edf0] bg-white p-5">
                    <h3 className="text-lg font-bold text-[#163d57]">{item.question}</h3>
                    <p className="mt-2 leading-8 text-[#4a6677]">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={h2Class}>خاتمة</h2>
              <p className={pClass}>
                <strong>{content.primaryKeyword}</strong> استثمار في راحة منزلك وحماية المبنى — ينجح
                عندما يُبنى على معاينة صحيحة ومادة مناسبة. اتصل أو راسلنا على واتساب لتحديد موعد
                معاينة في حيّك بجدة.
              </p>
              <ul className="mt-4 flex flex-wrap justify-end gap-2">
                {content.internalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block rounded-lg bg-[#f8fbfc] px-3 py-2 text-sm font-semibold text-[#1f7f8a] hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <RequestInspectionBox phone={siteConfig.phone} className="sticky top-24" />
          </aside>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-6">
          <RelatedServicesSection currentPath={path} heading="خدمات وصفحات ذات صلة" />
        </div>
      </main>
    </>
  );
}
