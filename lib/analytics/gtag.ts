/**
 * إرسال حدث GA4 عبر `gtag` إن وُجد (بعد تحميل `GoogleAnalytics` في الـ layout).
 * لا يُرمى خطأ إذا لم يُثبّت التتبع بعد — مناسب للاختبار المحلي.
 */
export function sendGtagEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;

  const cleaned = eventParams
    ? Object.fromEntries(
        Object.entries(eventParams).filter(([, v]) => v !== undefined) as [string, string | number | boolean][],
      )
    : undefined;

  if (cleaned && Object.keys(cleaned).length > 0) {
    gtag("event", eventName, cleaned);
  } else {
    gtag("event", eventName);
  }
}
