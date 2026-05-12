/**
 * تحسين تسليم صور المقالات مع ‎output: 'export'‎ (‎unoptimized‎) وروابط Cloudinary:
 * نُدرِج تحويلات Cloudinary (‎f_auto‎ + ‎q_auto‎) ليحصل المتصفح على WebP/AVIF حسب الدعم،
 * مع ضغط أفضل لـ PageSpeed — دون إعادة رفع الملفات.
 */
export function optimizeArticleImageSrc(src: string): string {
  if (!src || typeof src !== "string") return src;
  const trimmed = src.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) return trimmed;

  try {
    const u = new URL(trimmed);
    if (u.hostname.toLowerCase() !== "res.cloudinary.com") return trimmed;

    const marker = "/image/upload/";
    const p = u.pathname;
    const idx = p.indexOf(marker);
    if (idx === -1) return trimmed;

    const afterMarker = p.slice(idx + marker.length);
    const firstSegment = afterMarker.split("/")[0] ?? "";
    if (firstSegment.includes(",")) return trimmed;

    const insertion = "f_auto,q_auto,fl_progressive/";
    u.pathname = p.slice(0, idx + marker.length) + insertion + afterMarker;
    return u.toString();
  } catch {
    return trimmed;
  }
}
