/**
 * إشعار Google Indexing API بصفحات جديدة أو محدّثة بعد النشر.
 *
 * المتطلبات (مرة واحدة):
 * 1) مشروع Google Cloud + تفعيل "Indexing API".
 * 2) إنشاء Service Account وتنزيل JSON المفتاح.
 * 3) في Search Console: إضافة البريد الكامل لحساب الخدمة كمالك (Owner) على نفس خاصية الموقع.
 *
 * الرسمي: الواجهة مخصّصة لـ JobPosting و BroadcastEvent؛ الاستخدام العام «على مسؤوليتك» وقد لا يضمن الفهرسة الفورية.
 *
 * الاستخدام:
 *   node scripts/google-indexing-notify.cjs https://example.com/ https://example.com/blog/foo
 * أو عبر المتغيرات:
 *   INDEXING_NOTIFY_PATHS=/,/services,/blog/slug
 *   NEXT_PUBLIC_SITE_URL=https://example.com
 *
 * الاعتمادات:
 *   GOOGLE_INDEXING_CREDENTIALS_PATH=./secrets/indexing-sa.json
 * أو: GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
 * أو: GOOGLE_APPLICATION_CREDENTIALS (مسار ملف JSON قياسي من Google)
 *
 * اختياري: INDEXING_NOTIFICATION_TYPE=URL_UPDATED | URL_DELETED (افتراضي URL_UPDATED)
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

function loadOptionalEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function b64url(bufOrStr) {
  const b = Buffer.isBuffer(bufOrStr) ? bufOrStr : Buffer.from(bufOrStr);
  return b
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function loadServiceAccount() {
  const inline = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) {
    try {
      return JSON.parse(inline);
    } catch (e) {
      throw new Error("GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON ليس JSON صالحاً.");
    }
  }
  const credPath =
    process.env.GOOGLE_INDEXING_CREDENTIALS_PATH?.trim() ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (!credPath) {
    throw new Error(
      "حدّد GOOGLE_INDEXING_CREDENTIALS_PATH أو GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON أو GOOGLE_APPLICATION_CREDENTIALS.",
    );
  }
  const resolved = path.isAbsolute(credPath) ? credPath : path.join(ROOT, credPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`ملف الاعتماد غير موجود: ${resolved}`);
  }
  return JSON.parse(fs.readFileSync(resolved, "utf8"));
}

function createJwtAssertion(sa) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: sa.client_email,
    scope: INDEXING_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };
  const encHeader = b64url(JSON.stringify(header));
  const encPayload = b64url(JSON.stringify(payload));
  const unsigned = `${encHeader}.${encPayload}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsigned);
  const key = sa.private_key;
  if (!key) throw new Error("private_key مفقود في JSON حساب الخدمة.");
  const sigBuffer = sign.sign(key);
  const encSig = b64url(sigBuffer);
  return `${unsigned}.${encSig}`;
}

async function fetchAccessToken(sa) {
  const assertion = createJwtAssertion(sa);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`فشل طلب التوكن: ${res.status} ${JSON.stringify(data)}`);
  }
  if (!data.access_token) {
    throw new Error(`لم يُرجع access_token: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function publishUrl(accessToken, url, type) {
  const res = await fetch(PUBLISH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, type }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

function resolveSiteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "";
  if (!raw) return "";
  const candidate =
    raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    return new URL(candidate).href.replace(/\/$/, "");
  } catch {
    return "";
  }
}

function collectUrls() {
  const fromCli = process.argv.slice(2).filter((a) => a.startsWith("http://") || a.startsWith("https://"));
  if (fromCli.length) return fromCli;

  const pathsRaw = process.env.INDEXING_NOTIFY_PATHS?.trim();
  const base = resolveSiteBase();
  if (pathsRaw && !base) {
    throw new Error("عند استخدام INDEXING_NOTIFY_PATHS حدّد NEXT_PUBLIC_SITE_URL أو SITE_URL.");
  }
  if (pathsRaw) {
    return pathsRaw
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const pathPart = p.startsWith("/") ? p : `/${p}`;
        return `${base}${pathPart}`;
      });
  }

  return [];
}

async function main() {
  loadOptionalEnvLocal();

  const notificationType =
    process.env.INDEXING_NOTIFICATION_TYPE === "URL_DELETED"
      ? "URL_DELETED"
      : "URL_UPDATED";

  const urls = collectUrls();
  if (!urls.length) {
    console.error(`
استخدام:
  node scripts/google-indexing-notify.cjs <url1> <url2> ...

أو عيّن INDEXING_NOTIFY_PATHS=/,/services  مع NEXT_PUBLIC_SITE_URL
`);
    process.exit(1);
  }

  const sa = loadServiceAccount();
  if (sa.type !== "service_account") {
    throw new Error('JSON يجب أن يكون لحساب خدمة (type: "service_account").');
  }

  const token = await fetchAccessToken(sa);
  let failures = 0;

  for (const url of urls) {
    const { ok, status, data } = await publishUrl(token, url, notificationType);
    if (ok) {
      console.log(`OK ${status} ${url}`);
    } else {
      failures += 1;
      console.error(`FAIL ${status} ${url}`, JSON.stringify(data));
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  if (failures) process.exit(1);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
