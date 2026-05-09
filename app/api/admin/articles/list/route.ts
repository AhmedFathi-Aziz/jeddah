import { desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin/crypto-session";
import { getArticlesAdminSecret } from "@/lib/admin/env-secret";
import { getDb } from "@/lib/db/client";
import { articles } from "@/lib/db/schema";

async function assertAdminRequest() {
  const secret = await getArticlesAdminSecret();
  if (!secret) return false;
  const jar = await cookies();
  const raw = jar.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionValue(raw, secret);
}

export async function GET() {
  if (!(await assertAdminRequest())) {
    return NextResponse.json({ ok: false as const, error: "unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ ok: false as const, error: "db-unavailable" }, { status: 503 });
  }

  try {
    const rows = await db.select().from(articles).orderBy(desc(articles.createdAt));
    const list = rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      category: r.category,
      title: r.title,
      excerpt: r.excerpt,
      content: r.content,
      coverImageUrl: r.coverImageUrl,
      coverAlt: r.coverAlt,
      coverWidth: r.coverWidth,
      coverHeight: r.coverHeight,
      published: r.published,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
    return NextResponse.json({ ok: true as const, articles: list });
  } catch {
    return NextResponse.json({ ok: false as const, error: "query-failed" }, { status: 500 });
  }
}
