import { cookies } from "next/headers";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin/crypto-session";
import { getArticlesAdminSecret } from "@/lib/admin/env-secret";

export async function isAdminSession(): Promise<boolean> {
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
