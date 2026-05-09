import { getCloudflareContext } from "@opennextjs/cloudflare";

/** السر من Worker (Cloudflare) أو من `.env.local` أثناء التطوير */
export async function getArticlesAdminSecret(): Promise<string | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const v = env.ARTICLES_ADMIN_SECRET;
    if (typeof v === "string" && v.length > 0) return v;
  } catch {
    /* محلي بدون سياق Cloudflare */
  }
  const local = process.env.ARTICLES_ADMIN_SECRET;
  return typeof local === "string" && local.length > 0 ? local : undefined;
}
