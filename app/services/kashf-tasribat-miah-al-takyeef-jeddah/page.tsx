import type { Metadata } from "next";

import { KashfTakyeefJeddahPageBody } from "@/components/services/kashf-takyeef-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  buildKashfTakyeefFaqSchema,
  buildKashfTakyeefServiceSchema,
  KASHF_TAKYEEF_PAGE_PATH,
  KASHF_TAKYEEF_SEO,
} from "@/lib/seo/kashf-takyeef-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: KASHF_TAKYEEF_SEO.title,
    description: KASHF_TAKYEEF_SEO.description,
    path: KASHF_TAKYEEF_PAGE_PATH,
    keywords: [...KASHF_TAKYEEF_SEO.keywords],
    ogTitle: KASHF_TAKYEEF_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.kashfTakyeefPageHero.src,
        width: images.kashfTakyeefPageHero.width,
        height: images.kashfTakyeefPageHero.height,
        alt: images.kashfTakyeefPageHero.alt,
      },
    ],
  },
};

export default function KashfTasribatMiahAlTakyeefJeddahPage() {
  const faqSchema = buildKashfTakyeefFaqSchema();
  const serviceSchema = buildKashfTakyeefServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <KashfTakyeefJeddahPageBody />
    </>
  );
}
