"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center" dir="rtl">
      <h1 className="text-xl font-bold text-destructive">تعذّر تحميل لوحة المقالات</h1>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        حدث خطأ في الخادم أثناء عرض هذه الصفحة. جرّب تحديث الصفحة أو سجّل الدخول من جديد.
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-muted-foreground" dir="ltr">
          Digest: {error.digest}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          إعادة المحاولة
        </button>
        <a href="/admin/login" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
          تسجيل الدخول
        </a>
      </div>
    </div>
  );
}
