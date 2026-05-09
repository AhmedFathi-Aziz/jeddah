/**
 * يحوّل كائن JSON-LD إلى نص آمن لـ `<script type="application/ld+json">`.
 * يزيل المفاتيح ذات القيم `undefined` ويمنع إغلاق الوسم المبكر عبر `</script>` داخل النصوص.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
