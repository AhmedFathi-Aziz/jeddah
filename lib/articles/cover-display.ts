/** روابط تعتبر «بدون صورة حقيقية» — نعرض غلافاً مرسوماً بدلاً من تحميل صورة خارجية رمادية */
export function isVisualCoverPlaceholder(src: string): boolean {
  const t = src.trim();
  if (!t) return true;
  if (t.startsWith("/media/") || t.startsWith("/uploads/") || t.startsWith("/images/")) return false;
  try {
    const u = new URL(t);
    if (u.protocol !== "https:" && u.protocol !== "http:") return true;
    const host = u.hostname.toLowerCase();
    if (host === "placehold.co") return true;
    return false;
  } catch {
    return false;
  }
}
