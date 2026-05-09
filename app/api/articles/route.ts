import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CreateArticlePayload } from "@/lib/articles/insert-article";
import { insertArticleFromPayload } from "@/lib/articles/insert-article";
import { getDb } from "@/lib/db/client";

function unauthorized() {
  return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
}

/** إنشاء مقال جديد (سرّي — أضِف ARTICLES_ADMIN_SECRET عبر wrangler secret). */
export async function POST(req: Request) {
  const { env } = await getCloudflareContext({ async: true });

  const expected = env.ARTICLES_ADMIN_SECRET;
  if (!expected) {
    return NextResponse.json(
      {
        error:
          "ARTICLES_ADMIN_SECRET غير مُعرّف. نفّذ: wrangler secret put ARTICLES_ADMIN_SECRET ثم أنشِئ التوكن في الطلب (Authorization: Bearer ...).",
      },
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization") ?? "";
  const token =
    auth.startsWith("Bearer ") ? auth.slice(7).trim() : req.headers.get("x-admin-secret") ?? "";
  if (token !== expected) return unauthorized();

  let payload: CreateArticlePayload;
  try {
    payload = (await req.json()) as CreateArticlePayload;
  } catch {
    return NextResponse.json({ error: "جسم الطلب غير صالح" }, { status: 400 });
  }

  const db = await getDb();
  if (!db)
    return NextResponse.json({ error: "قاعدة البيانات غير متوفرة لهذا الطلب" }, { status: 503 });

  const result = await insertArticleFromPayload(db, payload);

  if (!result.ok) {
    const status =
      result.code === "conflict"
        ? 409
        : result.code === "bad_slug" || result.code === "bad_input"
          ? 400
          : 500;
    return NextResponse.json({ error: result.message }, { status });
  }

  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("host") ?? "";

  const url = host ? `${proto}://${host}/blog/${result.slug}` : `/blog/${result.slug}`;

  return NextResponse.json({
    ok: true,
    id: result.id,
    slug: result.slug,
    url,
  });
}
