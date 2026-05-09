export const dynamic = "force-dynamic";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { NextRequest } from "next/server";

/** عرض الغلافات المخزّنة في R2 (المسار: /media/covers/&lt;uuid&gt;.&lt;ext&gt;) */
export async function GET(_req: NextRequest, props: { params: Promise<{ key: string[] }> }) {
  const { key } = await props.params;
  const segments = key ?? [];
  const objectKey = segments.join("/");
  if (!/^covers\/[0-9a-f-]+\.(jpg|png|webp)$/i.test(objectKey)) {
    return new Response("Not found", { status: 404 });
  }

  const { env } = await getCloudflareContext({ async: true });
  if (!env.UPLOADS) {
    return new Response("Storage unavailable", { status: 503 });
  }

  const obj = await env.UPLOADS.get(objectKey);
  if (!obj) return new Response("Not found", { status: 404 });

  const type = obj.httpMetadata?.contentType ?? "application/octet-stream";
  const body = obj.body;
  if (!body) return new Response("Empty", { status: 404 });

  return new Response(body as unknown as BodyInit, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
