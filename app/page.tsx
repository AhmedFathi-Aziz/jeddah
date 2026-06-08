import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { HomeEmergencyFab } from "@/components/home/home-emergency-fab";
import { HomeIntro } from "@/components/home/home-intro";
import { HomeArticlesPreview } from "@/components/home/home-articles-preview";
import { HomeDistricts } from "@/components/home/home-districts";
import { HomeLeaksFeatureBoxes } from "@/components/home/home-leaks-feature-boxes";
import { HomeHero } from "@/components/home/home-hero";
import { HomeInsulationBoxes } from "@/components/home/home-insulation-boxes";
import { HomeInsulationFocus } from "@/components/home/home-insulation-focus";
import { HomeLeaksFocus } from "@/components/home/home-leaks-focus";
import { HomeJsonLd } from "@/components/home/home-json-ld";
import { HomeServices } from "@/components/home/home-services";
import { HomeEncyclopedia } from "@/components/home/home-encyclopedia";
import { HomeKeywordIndex } from "@/components/home/home-keyword-index";
import { HomeWhy } from "@/components/home/home-why";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { HOME_PAGE_PATH, HOME_SEO, buildHomeServiceSchema } from "@/lib/seo/home-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    path: HOME_PAGE_PATH,
    keywords: [...HOME_SEO.keywords],
    ogTitle: HOME_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.hero.src,
        width: images.hero.width,
        height: images.hero.height,
        alt: images.hero.alt,
      },
    ],
  },
};

/** هيكل تقريبي يقلّل القفزات أثناء جلب حزمة الـ Accordion (تحسين ‎INP‎). */
function HomeFaqFallback() {
  return (
    <section
      className="mx-auto max-w-3xl px-6 py-20"
      aria-busy="true"
      aria-label="جاري تحميل قسم الأسئلة الشائعة"
    >
      <div className="mb-12 space-y-3 text-center">
        <div className="mx-auto h-10 max-w-sm rounded-md bg-muted/40 motion-safe:animate-pulse" />
        <div className="mx-auto h-5 max-w-md rounded-md bg-muted/25 motion-safe:animate-pulse" />
      </div>
      <div className="min-h-[20rem] w-full rounded-xl border border-border bg-muted/10" />
    </section>
  );
}

const HomeFaq = dynamic(
  () => import("@/components/home/home-faq").then((m) => ({ default: m.HomeFaq })),
  { loading: () => <HomeFaqFallback /> },
);

/** ISR للصفحة الرئيسية (معاينة المقالات) — يطابق مدة كاش المقالات في المستودع. */
export const revalidate = 900;

export default function HomePage() {
  const serviceSchema = buildHomeServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <HomeJsonLd />
      <HomeEmergencyFab phone={siteConfig.phone} />
      <main>
        <HomeHero phone={siteConfig.phone} />
        <HomeIntro />
        <HomeServices />
        <HomeInsulationFocus phone={siteConfig.phone} />
        <HomeInsulationBoxes />
        <HomeLeaksFocus phone={siteConfig.phone} />
        <HomeLeaksFeatureBoxes />
        <HomeWhy />
        <HomeEncyclopedia />
        <HomeKeywordIndex />
        <HomeFaq />
        <HomeDistricts />
        <HomeArticlesPreview />
        <RelatedServicesSection currentPath="/" heading="استكشف خدماتنا وصفحات مفيدة" />
      </main>
    </>
  );
}
