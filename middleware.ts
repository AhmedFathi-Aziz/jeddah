import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/site-config";

const canonicalUrl = new URL(siteConfig.url);
const canonicalHost = canonicalUrl.host.toLowerCase();
const wwwCanonicalHost = `www.${canonicalHost}`;

const LOCAL_HOST_PATTERN = /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i;

function getRequestHost(request: NextRequest) {
  return (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host).toLowerCase();
}

function getRequestProtocol(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedProto) return forwardedProto.toLowerCase();
  return request.nextUrl.protocol.replace(":", "").toLowerCase();
}

export function middleware(request: NextRequest) {
  const host = getRequestHost(request);
  if (LOCAL_HOST_PATTERN.test(host)) return NextResponse.next();

  // Enforce one crawlable origin for SEO (HTTPS + single host).
  const isCanonicalFamily = host === canonicalHost || host === wwwCanonicalHost;
  if (!isCanonicalFamily) return NextResponse.next();

  const protocol = getRequestProtocol(request);
  const needsProtocolRedirect = protocol !== "https";
  const needsHostRedirect = host !== canonicalHost;

  if (!needsProtocolRedirect && !needsHostRedirect) return NextResponse.next();

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https";
  redirectUrl.host = canonicalHost;

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
