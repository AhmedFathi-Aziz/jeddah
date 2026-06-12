/**
 * توحيد شكل الـ slug للمقارنة مع قاعدة البيانات وللروابط غير اللاتينية.
 * يعالج أحياناً وصول الجزء الديناميكي من المسار مشفّراً (%D8...) بينما التخزين UTF-8 عادي.
 */
export function normalizeArticleSlugParam(raw: string): string {
  const t = raw.trim();
  if (!t) return t;
  let s = t;
  try {
    if (/%[0-9A-Fa-f]{2}/.test(s)) {
      s = decodeURIComponent(s);
    }
  } catch {
    /* يُبقى s كما هو */
  }
  return s.normalize("NFC");
}

/** مرشحات محتملة لنفس المقال (مطابقة مرنة عند اختلاف الترميز فقط). */
export function articleSlugLookupCandidates(raw: string): string[] {
  const trimmed = raw.trim();
  const normalized = normalizeArticleSlugParam(trimmed);
  return Array.from(new Set([normalized, trimmed].filter(Boolean)));
}

/** أزواج slug قديم/بديل لنفس المقال (استعلام فقط — بدون إعادة توجيه HTTP). */
const BLOG_SLUG_LEGACY_SYNONYMS: readonly (readonly string[])[] = [
  ["ahamiyat-alazl-bi-anwaaih", "kashf-tasarubat-almiyah-wa-alazl-bialriyadh", "ahemiyat-alzal-harari", "أهمية-العزل-بأنواعه"],
  /** روابط عربية SEO كانت في الإنتاج / D1 */
  ["kashf-tasarubat-fi-jeddah", "كشف-تسربات-المياه-جدة", "kashf-tasarubat-miyah-jeddah", "kashf-tasarubat-miah-jeddah-asbab-holol"],
  ["irtifaa-fatura-almiyah-jeddah", "ارتفاع-فاتورة-المياه-جدة"],
  ["ما-هي-التسربات-ولماذا-تحدث", "ma-hiya-altasarubat-wa-limatha-tahduth"],
  ["خطورة-تسربات-المياه", "khaturat-tasarubat-miyah"],
  ["kashf-tasarubat-alriyadh", "كشف-تسربات-بالرياض"],
  ["عزل-خزانات-بجدة", "azl-alkhazanat-fi-jeddah"],
];

/** يوسّع مرشحات البحث عن مقال عند تغيّر الـ slug مع بقاء روابط قديمة في الفهرس أو المشاركات. */
export function blogArticleSlugLookupCandidates(raw: string): string[] {
  const base = new Set(articleSlugLookupCandidates(raw));
  for (const group of BLOG_SLUG_LEGACY_SYNONYMS) {
    const hit = [...base].some((s) => group.includes(s));
    if (!hit) continue;
    for (const g of group) {
      for (const c of articleSlugLookupCandidates(g)) base.add(c);
    }
  }
  return [...base];
}

/** هل يُعرَض slugان كمقال واحد (بما فيه أزواج legacy)؟ */
export function blogArticleSlugsConflict(a: string, b: string): boolean {
  const A = new Set(blogArticleSlugLookupCandidates(a));
  for (const x of blogArticleSlugLookupCandidates(b)) {
    if (A.has(x)) return true;
  }
  return false;
}

/** هل جزء المسار من الـ URL يطابق slug المقال المخزَّن (بعد التطبيع)؟ */
export function articlePathSlugMatchesStored(paramSlug: string, storedSlug: string): boolean {
  return normalizeArticleSlugParam(paramSlug) === normalizeArticleSlugParam(storedSlug);
}

const MAX_SLUG_LEN = 200;

export function isValidArticleSlug(raw: string): boolean {
  const s = normalizeArticleSlugParam(raw);
  if (!s || s.length > MAX_SLUG_LEN) return false;
  // أحرف تكسر مسار الـ URL أو تسبب لبساً
  if (/[\s/\\?#\r\n\u0000-\u001F]/.test(s)) return false;
  return true;
}
