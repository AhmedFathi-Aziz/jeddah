import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin/crypto-session";
import { getArticlesAdminSecret } from "@/lib/admin/env-secret";
import { getDb } from "@/lib/db/client";
import { articles } from "@/lib/db/schema";

const DEFAULT_COVER_IMAGE_URL = "https://placehold.co/1200x630/webp?text=Tasarubat+Jeddah";

async function assertAdminRequest() {
  const secret = await getArticlesAdminSecret();
  if (!secret) return false;
  const jar = await cookies();
  const raw = jar.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionValue(raw, secret);
}

function toAdmin(req: Request, status: string) {
  const u = new URL("/admin", req.url);
  u.searchParams.set("status", status);
  return NextResponse.redirect(u, { status: 303 });
}

export async function POST(req: Request) {
  if (!(await assertAdminRequest())) return toAdmin(req, "unauthorized");

  const db = await getDb();
  if (!db) return toAdmin(req, "db-unavailable");

  const form = await req.formData();
  const intent = String(form.get("intent") ?? "");
  const id = String(form.get("id") ?? "").trim();
  if (!id) return toAdmin(req, "invalid-id");

  try {
    if (intent === "delete") {
      await db.delete(articles).where(eq(articles.id, id));
      return toAdmin(req, "deleted");
    }

    if (intent === "update") {
      await db
        .update(articles)
        .set({
          slug: String(form.get("slug") ?? "").trim(),
          category: String(form.get("category") ?? "").trim(),
          title: String(form.get("title") ?? "").trim(),
          excerpt: String(form.get("excerpt") ?? "").trim(),
          content: String(form.get("content") ?? "").trim(),
          coverImageUrl:
            String(form.get("coverImageUrl") ?? "").trim() || DEFAULT_COVER_IMAGE_URL,
          coverAlt: String(form.get("coverAlt") ?? "").trim(),
          coverWidth: Number(form.get("coverWidth") || 1200),
          coverHeight: Number(form.get("coverHeight") || 630),
          published: String(form.get("published") ?? "true") !== "false",
          updatedAt: Date.now(),
        })
        .where(eq(articles.id, id));
      return toAdmin(req, "updated");
    }
  } catch {
    return toAdmin(req, "failed");
  }

  return toAdmin(req, "unknown-intent");
}
