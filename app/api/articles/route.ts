import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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

  try {
    await req.json();
  } catch {
    return NextResponse.json({ error: "جسم الطلب غير صالح" }, { status: 400 });
  }

  return NextResponse.json(
    {
      error:
        "نشر المقالات عبر API معطّل: أضف ملف Markdown تحت content/blog ثم أعد البناء والنشر. راجع content/blog/README.md",
    },
    { status: 410 },
  );
}
