import { getCloudflareContext } from "@opennextjs/cloudflare";

/** أقصى حجم ملف الغلاف (5 ميجا) */
export const COVER_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

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

function extFromType(t: string): "jpg" | "png" | "webp" | null {
  if (t === "image/jpeg") return "jpg";
  if (t === "image/png") return "png";
  if (t === "image/webp") return "webp";
  return null;
}

/**
 * يحفظ صورة الغلاف: R2 عند وجود UPLOADS (إنتاج Cloudflare)،
 * أو على القرص داخل `public/uploads/covers` في وضع التطوير فقط (next dev).
 */
export async function storeCoverFile(file: unknown): Promise<
  | { ok: true; url: string }
  | {
      ok: false;
      message: string;
    }
> {
  if (!isFileLike(file) || file.size === 0) {
    return { ok: false, message: "ملف الغلاف غير صالح" };
  }
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    return { ok: false, message: "الصورة يجب أن تكون JPG أو PNG أو WebP فقط." };
  }
  if (file.size > COVER_UPLOAD_MAX_BYTES) {
    return { ok: false, message: `حجم الملف أكبر من ${COVER_UPLOAD_MAX_BYTES / (1024 * 1024)} ميجابايت.` };
  }

  const ext = extFromType(file.type);
  if (!ext) return { ok: false, message: "نوع الصورة غير مسموح." };

  const id = crypto.randomUUID();
  const key = `covers/${id}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (env.UPLOADS) {
      await env.UPLOADS.put(key, bytes, {
        httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000" },
      });
      return { ok: true, url: `/media/${key}` };
    }
  } catch {
    /* خارج سياق Cloudflare في next dev بدون تهيئة */
  }

  if (process.env.NODE_ENV === "development") {
    const { mkdir, writeFile } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const pub = join(process.cwd(), "public", "uploads", "covers");
    await mkdir(pub, { recursive: true });
    const filename = `${id}.${ext}`;
    await writeFile(join(pub, filename), bytes);
    return { ok: true, url: `/uploads/covers/${filename}` };
  }

  return {
    ok: false,
    message:
      "الرفع من الجهاز غير متاح (R2 غير مفعّل على السيرفر). اترك الملف فارغاً وضع رابط غلاف يبدأ بـ https في الحقل أدناه، أو فعّل R2 والدلو tasarubat-uploads والربط UPLOADS ثم انشر.",
  };
}
