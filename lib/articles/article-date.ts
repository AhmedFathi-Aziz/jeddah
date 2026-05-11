/** تاريخ آمن لـ JSON-LD وواجهة المقال بعد التسلسل من الكاش. */
export function safeArticleDate(value: unknown): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  const d = new Date(value as string | number);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
}

export function articleDateLocaleLong(value: unknown, locale = "ar-SA"): string {
  return safeArticleDate(value).toLocaleDateString(locale, { dateStyle: "long" });
}
