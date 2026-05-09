/** يمنع `new URL("")` أو قيمة غير صالحة من إسقاط كل الصفحات (مثل /admin) في الإنتاج */
function resolvePublicSiteUrl(): string {
  const fallback = "https://tasarubat-jeddah.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return fallback;
  const candidate =
    raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    return new URL(candidate).href.replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: "جدة للتسربات والعزل",
  nameEn: "Jeddah Leaks & Insulation",
  locale: "ar_SA",
  /** دومين الإنتاج (يمكن تجاوزه بمتغير NEXT_PUBLIC_SITE_URL) */
  url: resolvePublicSiteUrl(),
  phone: "+966500000000",
  phoneDisplay: "٠٥٠ ‌٠٠٠٠ ‌٠٠٠٠",
} as const;

export function absUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** لـ الصور النسبية في JSON-LD وOpen Graph */
export function absImageSrc(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return absUrl(src.startsWith("/") ? src : `/${src}`);
}
