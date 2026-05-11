import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin/crypto-session";
import { getArticlesAdminSecret } from "@/lib/admin/env-secret";
import { getAllBlogArticlesMerged } from "@/lib/articles/repository";

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

  const rows = await getAllBlogArticlesMerged();
  const list = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    category: r.category,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImageUrl: r.cover.src,
    coverAlt: r.cover.alt,
    coverWidth: r.cover.width,
    coverHeight: r.cover.height,
    published: true,
    createdAt: r.createdAt.getTime(),
    updatedAt: r.createdAt.getTime(),
  }));
  return NextResponse.json({ ok: true as const, articles: list });
}
