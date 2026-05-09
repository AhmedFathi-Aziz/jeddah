"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export type AdminArticleRow = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverAlt: string;
  coverWidth: number | null;
  coverHeight: number | null;
  published: boolean;
  createdAt: number;
  updatedAt: number;
};

export function ArticleManagement() {
  const [phase, setPhase] = useState<"loading" | "ready" | "unauth" | "db" | "fail">("loading");
  const [failDetail, setFailDetail] = useState<string | null>(null);
  const [rows, setRows] = useState<AdminArticleRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const r = await fetch("/api/admin/articles/list", { credentials: "include", cache: "no-store" });
        const data = (await r.json()) as
          | { ok: true; articles: AdminArticleRow[] }
          | { ok: false; error?: string };

        if (cancelled) return;

        if (r.status === 401) {
          setPhase("unauth");
          return;
        }
        if (r.status === 503) {
          setPhase("db");
          return;
        }
        if (!r.ok || !("ok" in data) || !data.ok || !("articles" in data)) {
          setPhase("fail");
          setFailDetail("error" in data && typeof data.error === "string" ? data.error : "query-failed");
          return;
        }
        setRows(data.articles);
        setPhase("ready");
      } catch {
        if (!cancelled) {
          setPhase("fail");
          setFailDetail("network");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (phase === "loading") {
    return (
      <section className="rounded-xl border bg-card p-5 text-right">
        <h2 className="text-xl font-bold text-primary">تعديل وحذف المقالات</h2>
        <p className="mt-3 text-sm text-muted-foreground">جارٍ تحميل القائمة…</p>
      </section>
    );
  }

  if (phase === "unauth") {
    return (
      <section className="rounded-xl border bg-card p-5 text-right">
        <h2 className="text-xl font-bold text-primary">إدارة المقالات</h2>
        <p className="mt-2 text-sm text-destructive">انتهت الجلسة أو غير مصرّح. افتح صفحة تسجيل الدخول.</p>
      </section>
    );
  }

  if (phase === "db") {
    return (
      <section className="rounded-xl border bg-card p-5 text-right">
        <h2 className="text-xl font-bold text-primary">إدارة المقالات</h2>
        <p className="mt-2 text-sm text-destructive">تعذر الاتصال بقاعدة البيانات على السيرفر.</p>
      </section>
    );
  }

  if (phase === "fail") {
    return (
      <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-right">
        <h2 className="text-xl font-bold text-primary">إدارة المقالات</h2>
        <p className="mt-2 text-sm text-destructive leading-relaxed">
          تعذّر تحميل قائمة المقالات ({failDetail ?? "خطأ"}). يمكنك إضافة مقال جديد من النموذج المجاور؛ إن استمر الخطأ نفّذ ترحيل D1:{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs" dir="ltr">
            npm run db:migrate:remote
          </code>
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border bg-card p-5 text-right">
      <h2 className="text-xl font-bold text-primary">تعديل وحذف المقالات</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">لا توجد مقالات محفوظة بعد.</p>
      ) : (
        <div className="mt-5 space-y-6">
          {rows.map((row) => (
            <article key={row.id} className="rounded-lg border p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-primary">{row.title}</p>
                <span className="text-xs text-muted-foreground">{row.slug}</span>
              </div>

              <form action="/api/admin/articles/manage" method="post" className="space-y-3">
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="intent" value="update" />
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium">slug</label>
                    <input name="slug" defaultValue={row.slug} className={inputClass} dir="ltr" required />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">التصنيف</label>
                    <input name="category" defaultValue={row.category} className={inputClass} required />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">العنوان</label>
                  <input name="title" defaultValue={row.title} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">الملخص</label>
                  <textarea name="excerpt" defaultValue={row.excerpt} className={inputClass} rows={2} required />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">المحتوى (Markdown)</label>
                  <textarea
                    name="content"
                    defaultValue={row.content}
                    dir="rtl"
                    className={cn(inputClass, "font-mono text-xs leading-relaxed")}
                    rows={12}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">رابط الغلاف (HTTPS)</label>
                  <input
                    name="coverImageUrl"
                    defaultValue={row.coverImageUrl}
                    className={inputClass}
                    dir="ltr"
                    placeholder="https://..."
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium">وصف الصورة</label>
                    <input name="coverAlt" defaultValue={row.coverAlt} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">العرض</label>
                    <input
                      name="coverWidth"
                      type="number"
                      defaultValue={row.coverWidth ?? 1200}
                      className={inputClass}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">الارتفاع</label>
                    <input
                      name="coverHeight"
                      type="number"
                      defaultValue={row.coverHeight ?? 630}
                      className={inputClass}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">الحالة</label>
                  <select name="published" defaultValue={row.published ? "true" : "false"} className={inputClass}>
                    <option value="true">منشور</option>
                    <option value="false">مسودة</option>
                  </select>
                </div>

                <div className="flex flex-wrap justify-end gap-2 pt-2">
                  <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
                    حفظ التعديلات
                  </button>
                </div>
              </form>

              <form action="/api/admin/articles/manage" method="post" className="mt-3 flex justify-end">
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="intent" value="delete" />
                <button
                  type="submit"
                  className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive"
                >
                  حذف المقال
                </button>
              </form>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
