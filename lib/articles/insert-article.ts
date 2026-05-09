import type { DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "@/lib/db/schema";

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function clampCoverDimension(value: unknown, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(4000, Math.max(100, Math.round(n)));
}

export type CreateArticlePayload = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImageUrl: string;
  coverAlt?: string;
  coverWidth?: number;
  coverHeight?: number;
  published?: boolean;
};

export type InsertArticleResult =
  | { ok: true; id: string; slug: string }
  | {
      ok: false;
      code: "bad_input" | "bad_slug" | "db_missing" | "conflict" | "save_failed";
      message: string;
    };

/** التحقق من الحقول وإدراج مقال؛ يستخدم من API ومزود الخادم. */
export async function insertArticleFromPayload(
  db: DrizzleD1Database<typeof schema>,
  payload: CreateArticlePayload,
): Promise<InsertArticleResult> {
  const {
    slug,
    category,
    title,
    excerpt,
    coverImageUrl,
    content,
    coverAlt,
    coverWidth,
    coverHeight,
    published,
  } = payload;

  if (
    typeof slug !== "string" ||
    typeof category !== "string" ||
    typeof title !== "string" ||
    typeof excerpt !== "string" ||
    typeof coverImageUrl !== "string"
  ) {
    return { ok: false, code: "bad_input", message: "حقول ناقصة" };
  }

  const s = slug.trim();
  const c = category.trim();
  const ti = title.trim();
  const ex = excerpt.trim();
  const cu = coverImageUrl.trim();

  if (!s || !c || !ti || !ex || !cu) {
    return { ok: false, code: "bad_input", message: "املأ كل الحقول المطلوبة" };
  }

  if (!slugRe.test(s)) {
    return {
      ok: false,
      code: "bad_slug",
      message:
        "slug غير مسموح: استخدم حروفاً إنجليزية صغيرة وأرقاماً وشرطات فقط (مثل kesaf-maa-jeddah).",
    };
  }

  const nowMs = Date.now();
  const id = crypto.randomUUID();

  try {
    await db.insert(schema.articles).values({
      id,
      slug: s,
      category: c,
      title: ti,
      excerpt: ex,
      content: typeof content === "string" ? content.trim() : "",
      coverImageUrl: cu,
      coverAlt: typeof coverAlt === "string" ? coverAlt.trim() : "",
      coverWidth: clampCoverDimension(coverWidth, 800),
      coverHeight: clampCoverDimension(coverHeight, 320),
      published: published !== false,
      createdAt: nowMs,
      updatedAt: nowMs,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    const conflict =
      typeof msg === "string" &&
      ((msg.includes("slug") && msg.includes("UNIQUE")) || msg.includes("UNIQUE constraint"));
    if (conflict) {
      return { ok: false, code: "conflict", message: "هذا الاسم الداخلي (slug) مستخدم بالفعل" };
    }
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[insertArticle]", e);
    }
    return { ok: false, code: "save_failed", message: "فشل الحفظ" };
  }

  return { ok: true, id, slug: s };
}
