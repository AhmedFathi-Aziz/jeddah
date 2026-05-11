import { HomeEmergencyFab } from "@/components/home/home-emergency-fab";
import { HomeArticlesPreview } from "@/components/home/home-articles-preview";
import { HomeDistricts } from "@/components/home/home-districts";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeLeaksFeatureBoxes } from "@/components/home/home-leaks-feature-boxes";
import { HomeHero } from "@/components/home/home-hero";
import { HomeInsulationBoxes } from "@/components/home/home-insulation-boxes";
import { HomeInsulationFocus } from "@/components/home/home-insulation-focus";
import { HomeLeaksFocus } from "@/components/home/home-leaks-focus";
import { HomeJsonLd } from "@/components/home/home-json-ld";
import { HomeServices } from "@/components/home/home-services";
import { HomeWhy } from "@/components/home/home-why";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { siteConfig } from "@/lib/site-config";

/** ISR للصفحة الرئيسية (معاينة المقالات) — يطابق مدة كاش المقالات في المستودع. */
export const revalidate = 900;

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <HomeEmergencyFab phone={siteConfig.phone} />
      <main>
        <HomeHero phone={siteConfig.phone} />
        <HomeServices />
        <HomeInsulationFocus phone={siteConfig.phone} />
        <HomeInsulationBoxes />
        <HomeLeaksFocus phone={siteConfig.phone} />
        <HomeLeaksFeatureBoxes />
        <HomeWhy />
        <HomeFaq />
        <HomeDistricts />
        <HomeArticlesPreview />
        <RelatedServicesSection currentPath="/" heading="استكشف خدماتنا وصفحات مفيدة" />
      </main>
    </>
  );
}
