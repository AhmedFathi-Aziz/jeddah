function isLocalSiteHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
}

/**
 * عنوان الموقع العام للـ canonical و JSON-LD والـ OG.
 * يُفرض HTTPS لأي دومين إنتاج حتى لو وُضع NEXT_PUBLIC_SITE_URL بصيغة http:// (شائع في أخطاء الإعداد).
 */
function resolvePublicSiteUrl(): string {
  const fallback = "https://tasarubat-jeddah.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return fallback;
  const candidate =
    raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    const u = new URL(candidate);
    if (!isLocalSiteHostname(u.hostname)) {
      u.protocol = "https:";
    }
    return u.href.replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: "جدة للتسربات والعزل",
  nameEn: "Jeddah Leaks & Insulation",
  logo: {
    mark: {
      src: "/logo-mark.png",
      width: 474,
      height: 188,
      alt: "جذر — للعزل وكشف تسربات المياه",
    },
    full: {
      src: "/brand-logo.png",
      width: 466,
      height: 474,
      alt: "جذر — للعزل وكشف تسربات المياه",
    },
  },
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
