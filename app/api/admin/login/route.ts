import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, createAdminSessionValue } from "@/lib/admin/crypto-session";
import { getArticlesAdminSecret } from "@/lib/admin/env-secret";

type Body = { password?: string };

export async function POST(req: Request) {
  const secret = await getArticlesAdminSecret();
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "سر الإدارة غير مُعرّف. عرّف ARTICLES_ADMIN_SECRET في `.env.local` محلياً أو عبر wrangler secret في السحابة.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "جسم الطلب غير صالح" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (password !== secret) {
    return NextResponse.json({ error: "كلمة السر غير صحيحة" }, { status: 401 });
  }

  const token = await createAdminSessionValue(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
