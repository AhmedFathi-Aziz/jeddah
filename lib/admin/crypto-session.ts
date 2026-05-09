/** كوكي جلسة إدارة: موقع بـ HMAC بحيث لا يعتمد المتصفح على السر الخام */

const SESSION_MAX_MS = 7 * 24 * 60 * 60 * 1000;

export const ADMIN_SESSION_COOKIE = "tasarubat_admin_sess";

async function secretKey(secret: string): Promise<CryptoKey> {
  const material = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return crypto.subtle.importKey(
    "raw",
    material,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function base64UrlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createAdminSessionValue(secret: string): Promise<string> {
  const exp = Date.now() + SESSION_MAX_MS;
  const payload = JSON.stringify({ exp });
  const key = await secretKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${base64UrlEncode(new TextEncoder().encode(payload))}.${base64UrlEncode(new Uint8Array(sig))}`;
}

async function timingSafeEqual(a: Uint8Array, b: Uint8Array): Promise<boolean> {
  if (a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) x |= a[i]! ^ b[i]!;
  return x === 0;
}

function base64UrlToBytes(s: string): Uint8Array | null {
  try {
    const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

export async function verifyAdminSessionValue(
  raw: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!raw || !secret) return false;
  const dot = raw.indexOf(".");
  if (dot < 1) return false;
  const payloadB64 = raw.slice(0, dot);
  const sigB64 = raw.slice(dot + 1);
  const payloadBytes = base64UrlToBytes(payloadB64);
  const sigBytes = base64UrlToBytes(sigB64);
  if (!payloadBytes || !sigBytes) return false;

  const payload = new TextDecoder().decode(payloadBytes);
  const key = await secretKey(secret);
  const expected = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  if (!(await timingSafeEqual(sigBytes, new Uint8Array(expected)))) return false;

  try {
    const data = JSON.parse(payload) as { exp?: number };
    if (typeof data.exp !== "number" || data.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
