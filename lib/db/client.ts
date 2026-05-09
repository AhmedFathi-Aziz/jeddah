import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

/** اتصال D1 لكل طلب (Workers / معاينة OpenNext / next dev بعد init للربط المحلي). */
export async function getDb(): Promise<DrizzleD1Database<typeof schema> | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const binding = env.DB;
    if (!binding) return null;
    return drizzle(binding, { schema });
  } catch {
    return null;
  }
}
