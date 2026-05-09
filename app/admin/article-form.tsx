"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const inputClass =
  "flex min-h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

type FormState = { ok: true; slug: string } | { ok: false; message: string } | null;

export function ArticleForm() {
  const router = useRouter();
  const [state, setState] = useState<FormState>(null);
  const [pending, setPending] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.push("/admin/login");
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setState(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const r = await fetch("/api/admin/articles/create", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = (await r.json()) as FormState;
      if (data && data.ok === true) {
        router.push(`/blog/${data.slug}`);
        router.refresh();
        return;
      }
      if (data && data.ok === false) {
        setState(data);
        return;
      }
      setState({ ok: false, message: "استجابة غير متوقعة من السيرفر." });
    } catch {
      setState({ ok: false, message: "تعذّر الاتصال بالسيرفر. تحقق من الشبكة وحاول مجدداً." });
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 text-right">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-primary">مقالة جديدة</h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/blog" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            عرض المدونة
          </Link>
          <button type="button" onClick={() => void logout()} className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            خروج
          </button>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
        الحقل <span className="font-mono text-xs">slug</span> يجب أن يكون بالإنجليزية الصغيرة والأرقام والشرطات فقط (مثال:{" "}
        <span className="font-mono text-xs">kesaf-jeddah-2026</span>).
      </p>

      {state?.ok === false && (
        <p role="alert" className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <form onSubmit={(e) => void handleSubmit(e)} encType="multipart/form-data" className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium">
            slug <span className="text-destructive">*</span>
          </label>
          <Input id="slug" name="slug" required dir="ltr" className="h-10 text-left font-mono text-sm" placeholder="kesaf-maa-fi-jeddah" />
        </div>
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            العنوان <span className="text-destructive">*</span>
          </label>
          <Input id="title" name="title" required className="h-10" />
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            التصنيف <span className="text-destructive">*</span>
          </label>
          <Input id="category" name="category" required className="h-10" placeholder="كشف التسربات" />
        </div>
        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-sm font-medium">
            ملخص ظاهر في القائمة <span className="text-destructive">*</span>
          </label>
          <textarea id="excerpt" name="excerpt" rows={3} required className={inputClass + " resize-y"} />
        </div>
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            نص المقال — Markdown
          </label>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            استخدم{" "}
            <span className="font-mono" dir="ltr">
              # ## ###
            </span>{" "}
            للعناوين، <span className="font-mono" dir="ltr">**نص**</span> عريض، قوائم <span className="font-mono" dir="ltr">-</span> ،
            وروابط <span className="font-mono" dir="ltr">[نص](https://…)</span>. سطر فارغ يفصل الفقرات.
          </p>
          <textarea
            id="content"
            name="content"
            rows={14}
            dir="rtl"
            placeholder={'## مقدمة\n\nفقرة أولى.\n\n- بند\n- بند آخر\n\n[رابط](https://example.com)'}
            className={cn(inputClass, "resize-y font-mono text-sm leading-relaxed")}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="coverFile" className="text-sm font-medium">
            صورة الغلاف من جهازك
          </label>
          <div className="space-y-1 rounded-md border border-[#b8d8df] bg-[#ecf8f8] px-3 py-2 text-xs leading-relaxed text-[#154c69]">
            <p>
              <strong>الأسهل على الإنتاج:</strong> اترك الملف فارغاً وضع رابط صورة يبدأ بـ{" "}
              <span className="font-mono" dir="ltr">
                https://
              </span>{" "}
              في الحقل التالي — النشر يعمل فوراً.
            </p>
            <p className="text-[11px] text-[#2c6274]">
              <strong>رفع من الجهاز</strong> يحتاج تفعيل R2 والدلو في Cloudflare (انظر تعليقات{" "}
              <span className="font-mono" dir="ltr">
                wrangler.jsonc
              </span>
              ). إن اخترت ملفاً والرفع غير متاح، يُستخدم غلاف افتراضي ويُنشر المقال مع ذلك.
            </p>
          </div>
          <input
            id="coverFile"
            name="coverFile"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={cn(inputClass, "h-auto cursor-pointer py-2 file:cursor-pointer")}
          />
          <p className="text-xs text-muted-foreground">JPG أو PNG أو WebP — حتى 5 ميجابايت عند تفعيل R2.</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="coverImageUrl" className="text-sm font-medium">
            رابط صورة الغلاف (HTTPS) — موصى به على الإنتاج
          </label>
          <Input id="coverImageUrl" name="coverImageUrl" type="url" dir="ltr" className="h-10 text-left text-sm" placeholder="https://…" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="coverAlt" className="text-sm font-medium">
              وصف الصورة (بديل نصّي)
            </label>
            <Input id="coverAlt" name="coverAlt" className="h-10" />
          </div>
          <div className="space-y-2">
            <label htmlFor="published" className="text-sm font-medium">
              الحالة
            </label>
            <select
              id="published"
              name="published"
              className={cn(inputClass, "h-10 cursor-pointer bg-background")}
              defaultValue="true"
            >
              <option value="true">منشور</option>
              <option value="false">مسودة (لا يظهر في الموقع للزوار)</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="coverWidth" className="text-sm font-medium">
              عرض الصورة (بكسل)
            </label>
            <Input id="coverWidth" name="coverWidth" type="number" min={100} max={4000} defaultValue={1200} className="h-10" dir="ltr" />
          </div>
          <div className="space-y-2">
            <label htmlFor="coverHeight" className="text-sm font-medium">
              ارتفاع الصورة (بكسل)
            </label>
            <Input id="coverHeight" name="coverHeight" type="number" min={100} max={4000} defaultValue={630} className="h-10" dir="ltr" />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <button type="submit" disabled={pending} className={cn(buttonVariants({ size: "default" }), "min-w-[10rem] font-bold")}>
            {pending ? "جارٍ الحفظ…" : "نشر المقال"}
          </button>
        </div>
      </form>
    </main>
  );
}
