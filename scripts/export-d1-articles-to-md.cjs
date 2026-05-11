/**
 * يصدّر كل المقالات المنشورة من D1 البعيد إلى ‎content/blog/<slug>.md‎
 * لتظهر في البناء الثابت (Cloudflare Pages) وفي الريبو.
 *
 * يشغّل من الجهاز بعد ‎wrangler login‎:
 *   npm run articles:export-from-d1
 */
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const stringify = require("gray-matter/lib/stringify");

const DB_NAME = "tasarubat-articles";
const root = path.join(__dirname, "..");
const outDir = path.join(root, "content", "blog");

const SQL = `SELECT id, slug, category, title, excerpt, content, cover_image_url, cover_alt, cover_width, cover_height, created_at
FROM articles WHERE published = 1 ORDER BY created_at DESC;`;

function parseWranglerRows(stdout) {
  const raw = String(stdout);
  const start = raw.search(/[\[{]/);
  const trimmed = start >= 0 ? raw.slice(start).trim() : raw.trim();
  if (!trimmed) return [];
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch (e) {
    console.error("[export-d1-articles-to-md] JSON غير صالح من wrangler:", e?.message ?? e);
    console.error("[export-d1-articles-to-md] أوّل 400 حرف من المخرجات:\n", raw.slice(0, 400));
    process.exit(1);
  }
  const batches = Array.isArray(parsed) ? parsed : [parsed];
  const rows = [];
  for (const batch of batches) {
    const r = batch?.results;
    if (Array.isArray(r)) rows.push(...r);
  }
  return rows;
}

function toIsoMs(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return new Date(0).toISOString();
  const ms = n < 1e12 ? n * 1000 : n;
  return new Date(ms).toISOString();
}

function safeBasename(slug) {
  const s = String(slug ?? "").trim();
  if (!s) return null;
  return s.replace(/[/\\?%*:|"<>]/g, "-");
}

function rowToFrontmatter(row) {
  return {
    id: String(row.id ?? "").trim(),
    slug: String(row.slug ?? "").trim(),
    category: String(row.category ?? "").trim(),
    title: String(row.title ?? "").trim(),
    excerpt: String(row.excerpt ?? "").trim(),
    coverSrc: String(row.cover_image_url ?? "").trim(),
    coverAlt: String(row.cover_alt ?? "").trim(),
    coverWidth: Number(row.cover_width) || 800,
    coverHeight: Number(row.cover_height) || 320,
    createdAt: toIsoMs(row.created_at),
  };
}

function main() {
  const tmpSql = path.join(os.tmpdir(), `d1-export-articles-${process.pid}-${Date.now()}.sql`);
  fs.writeFileSync(tmpSql, SQL, "utf8");
  let stdout;
  try {
    stdout = execSync(`npx wrangler d1 execute ${DB_NAME} --remote --file="${tmpSql}" --json`, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 64 * 1024 * 1024,
      shell: true,
      env: { ...process.env, WRANGLER_LOG: "error", CI: "true" },
    });
  } catch (e) {
    console.error(
      "[export-d1-articles-to-md] فشل wrangler d1 execute — تأكد من wrangler login والاتصال واسم القاعدة:",
      e?.message ?? e,
    );
    process.exit(1);
  } finally {
    try {
      fs.unlinkSync(tmpSql);
    } catch {
      /* ignore */
    }
  }

  const rows = parseWranglerRows(stdout);
  if (!rows.length) {
    console.warn("[export-d1-articles-to-md] لا توجد مقالات منشورة في D1.");
    return;
  }

  fs.mkdirSync(outDir, { recursive: true });
  let written = 0;

  for (const row of rows) {
    const data = rowToFrontmatter(row);
    if (!data.slug || !data.id) {
      console.warn("[export-d1-articles-to-md] تخطّي صف بلا slug أو id:", row);
      continue;
    }
    const base = safeBasename(data.slug);
    if (!base) continue;
    const filePath = path.join(outDir, `${base}.md`);
    const body = typeof row.content === "string" ? row.content : "";
    const file = stringify({ content: body.endsWith("\n") ? body : `${body}\n` }, data);
    fs.writeFileSync(filePath, file, "utf8");
    written += 1;
    console.log(`[export-d1-articles-to-md] → ${path.relative(root, filePath)}`);
  }

  console.log(`[export-d1-articles-to-md] تم كتابة ${written} مقالاً تحت content/blog/`);
}

main();
