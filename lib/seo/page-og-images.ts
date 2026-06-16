import { images } from "@/lib/images";

/** صورة Open Graph / Twitter */
export type OgImageDescriptor = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type SiteImageEntry = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

function fromSiteImage(image: SiteImageEntry): OgImageDescriptor {
  return {
    url: image.src,
    width: image.width,
    height: image.height,
    alt: image.alt,
  };
}

const INSULATION_SERVICE_OG: Record<string, OgImageDescriptor> = {
  "thermal-insulation": fromSiteImage(images.insulationRoofBitumen),
  "tank-epoxy-insulation": fromSiteImage(images.insulationTankInternal),
  "bathroom-foam-insulation": fromSiteImage(images.azlHamamatPageFloor),
  "thermal-bathroom-insulation": fromSiteImage(images.azlHamamatPageFoam),
  "tank-injection": fromSiteImage(images.insulationTankExternalBlack),
  "external-tank-thermal-insulation": fromSiteImage(images.insulationTankExternalWhite),
  "large-area-thermal-insulation": fromSiteImage(images.insulationFoamSpray),
  "foam-thermal-waterproof-insulation": fromSiteImage(images.insulationFoamSpray),
};

/**
 * صورة OG افتراضية حسب مسار الصفحة — تمنع وراثة صورة الصفحة الرئيسية
 * على الصفحات التي لا تُمرّر `ogImage` صراحةً.
 */
export function defaultOgImageForPath(path: string): OgImageDescriptor {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized === "/") return fromSiteImage(images.hero);
  if (normalized.startsWith("/blog") || normalized.startsWith("/news")) return fromSiteImage(images.blogStains);
  if (normalized.startsWith("/coverage")) return fromSiteImage(images.coverageAsSafaCover);
  if (normalized.startsWith("/insulation-services/")) {
    const slug = normalized.split("/")[2];
    if (slug && INSULATION_SERVICE_OG[slug]) return INSULATION_SERVICE_OG[slug];
    return fromSiteImage(images.insulationRoofBitumen);
  }
  if (normalized.startsWith("/services/kashf")) return fromSiteImage(images.kashfJeddahPageHero);
  if (normalized.startsWith("/services/azl-ashtof")) return fromSiteImage(images.insulationRoofBitumen);
  if (normalized.startsWith("/services/azl-maei")) return fromSiteImage(images.insulationBitumenRoll);
  if (normalized.startsWith("/services/azl-harari")) return fromSiteImage(images.insulationFoamSpray);
  if (normalized.startsWith("/services/azl-khazanat")) return fromSiteImage(images.insulationTankInternal);
  if (normalized.startsWith("/services/azl-fom")) return fromSiteImage(images.insulationFoamSpray);
  if (normalized.startsWith("/services/azl-hamamat")) return fromSiteImage(images.azlHamamatPageField);
  if (normalized.startsWith("/services/azl-epoxy")) return fromSiteImage(images.azlEpoxyPageField);
  if (normalized.startsWith("/services")) return fromSiteImage(images.hero);
  if (normalized.startsWith("/leak-detection")) return fromSiteImage(images.leakGalleryPipelineScan);
  if (normalized.startsWith("/insulation")) return fromSiteImage(images.insulationRoofBitumen);
  if (normalized.startsWith("/smart-leak-diagnosis")) return fromSiteImage(images.leakDetection);
  if (normalized.startsWith("/contact") || normalized.startsWith("/about") || normalized.startsWith("/team")) {
    return fromSiteImage(images.engineer);
  }

  return fromSiteImage(images.hero);
}
