import { cookies } from "next/headers";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin/crypto-session";
import { getArticlesAdminSecret } from "@/lib/admin/env-secret";

export type CreateArticleFormResult =
  | { ok: true; slug: string }
  | { ok: false; message: string };

async function assertAdmin(): Promise<boolean> {
  try {
    const secret = await getArticlesAdminSecret();
    if (!secret) return false;
    const jar = await cookies();
    const raw = jar.get(ADMIN_SESSION_COOKIE)?.value;
    return await verifyAdminSessionValue(raw, secret);
  } catch {
    return false;
  }
}

/** يُستدعى من Route Handler — المقالات تُدار عبر ملفات Markdown في ‎content/blog‎. */
export async function createArticleFromForm(formData: FormData): Promise<CreateArticleFormResult> {
  void formData;
  try {
    if (!(await assertAdmin())) {
      return {
        ok: false,
        message: "انتهت الجلسة أو غير مصرّح. افتح صفحة تسجيل الدخول وسجّل من جديد.",
      };
    }

    return {
      ok: false,
      message:
        "المقالات تُدار الآن كملفات Markdown في المجلد content/blog (بدون قاعدة بيانات). أنشئ ملف slug.md بالحقول في content/blog/README.md ثم npm run build وانشر. لتوليد المقالات الأربعة من العرض: npm run articles:from-demo",
    };
  } catch {
    return {
      ok: false,
      message: "تعذّر معالجة الطلب.",
    };
  }
}
