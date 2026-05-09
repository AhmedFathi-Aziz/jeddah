import { cookies } from "next/headers";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin/crypto-session";
import { getArticlesAdminSecret } from "@/lib/admin/env-secret";
import { insertArticleFromPayload } from "@/lib/articles/insert-article";
import { getDb } from "@/lib/db/client";
import { storeCoverFile } from "@/lib/uploads/store-cover";

const DEFAULT_COVER_IMAGE_URL = "https://placehold.co/1200x630/webp?text=Tasarubat+Jeddah";

export type CreateArticleFormResult =
  | { ok: true; slug: string }
  | { ok: false; message: string };

type FileLike = {
  size: number;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

function isFileLike(value: unknown): value is FileLike {
  return (
    !!value &&
    typeof value === "object" &&
    "size" in value &&
    typeof (value as { size?: unknown }).size === "number" &&
    "type" in value &&
    typeof (value as { type?: unknown }).type === "string" &&
    "arrayBuffer" in value &&
    typeof (value as { arrayBuffer?: unknown }).arrayBuffer === "function"
  );
}

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

/** يُستدعى من Route Handler أو Server Action — نفس منطق نشر المقال */
export async function createArticleFromForm(formData: FormData): Promise<CreateArticleFormResult> {
  try {
    if (!(await assertAdmin())) {
      return {
        ok: false,
        message: "انتهت الجلسة أو غير مصرّح. افتح صفحة تسجيل الدخول وسجّل من جديد.",
      };
    }

    const coverUrlRaw = String(formData.get("coverImageUrl") ?? "").trim();

    let coverImageUrl = coverUrlRaw;
    const uploaded = formData.get("coverFile");
    if (isFileLike(uploaded) && uploaded.size > 0) {
      const stored = await storeCoverFile(uploaded);
      if (stored.ok) {
        coverImageUrl = stored.url;
      } else if (coverUrlRaw) {
        coverImageUrl = coverUrlRaw;
      } else {
        /* بدون R2 أو فشل الرفع: ننشر المقال بغلاف افتراضي بدل إيقاف المستخدم */
        coverImageUrl = DEFAULT_COVER_IMAGE_URL;
      }
    }

    if (!coverImageUrl) {
      coverImageUrl = DEFAULT_COVER_IMAGE_URL;
    }

    const payload = {
      slug: String(formData.get("slug") ?? ""),
      category: String(formData.get("category") ?? ""),
      title: String(formData.get("title") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      content: String(formData.get("content") ?? ""),
      coverImageUrl,
      coverAlt: String(formData.get("coverAlt") ?? ""),
      coverWidth: Number(formData.get("coverWidth") || 800),
      coverHeight: Number(formData.get("coverHeight") || 320),
      published: String(formData.get("published") ?? "true") !== "false",
    };

    const db = await getDb();
    if (!db) {
      return { ok: false, message: "قاعدة البيانات غير متوفرة" };
    }

    const result = await insertArticleFromPayload(db, payload);
    if (!result.ok) {
      return { ok: false, message: result.message };
    }

    return { ok: true, slug: result.slug };
  } catch {
    return {
      ok: false,
      message: "تعذّر حفظ المقال. تحقق من رابط صورة الغلاف (HTTPS) أو أعد المحاولة.",
    };
  }
}
