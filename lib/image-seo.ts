/** مدينة التركيز الافتراضية لنصوص SEO للصور */
export const IMAGE_SEO_CITY_AR = "جدة";

export type ImageSeoFields = {
  alt: string;
  /** يظهر في `title` على عنصر الصورة — يدعم Google Images والتلميحات */
  title: string;
};

/** يدمج نص alt مع سياق المدينة عند الحاجة (بدون تكرار «بجدة» مرتين). */
export function imageAltWithCity(alt: string, cityAr: string = IMAGE_SEO_CITY_AR): string {
  if (alt.includes("جدة") || alt.includes(cityAr)) return alt;
  return `${alt} في ${cityAr}`;
}
