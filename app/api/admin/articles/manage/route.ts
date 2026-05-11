import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin/crypto-session";
import { getArticlesAdminSecret } from "@/lib/admin/env-secret";

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
  await req.formData();
  return toAdmin(req, "markdown-files");
}
