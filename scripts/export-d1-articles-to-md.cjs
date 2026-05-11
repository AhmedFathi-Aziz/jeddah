/**
 * يصدّر **كل** صفوف جدول المقالات من D1 إلى Markdown.
 *
 * - منشور → ‎content/blog/<slug>.md‎
 * - غير منشور → ‎content/blog-drafts/<slug>.md‎ (ما لم يُضبط ‎EXPORT_D1_PUBLISHED_ONLY‎)
 *
 * ‎EXPORT_D1_PUBLISHED_ONLY=1‎ → منشورات فقط إلى ‎content/blog‎
 * ‎EXPORT_D1_LOCAL=1‎ → استعلام ‎--local‎ بدل ‎--remote‎
 *
 *   npm run articles:export-from-d1
 *
 * على Cloudflare Pages: استخدم ‎npm run build:pages‎ (يصدّر من D1 ثم ‎build:static‎).
 * لازم يكون ‎CLOUDFLARE_API_TOKEN‎ (صلاحيات D1) متاحاً في بيئة البناء — ‎wrangler login‎ غير تفاعلي في CI.
 * لتخطّي التصدير يدوياً: ‎SKIP_D1_EXPORT=1‎ ثم ‎npm run articles:export-from-d1‎ (يخرج فوراً بنجاح).
 */
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const stringify = require("gray-matter/lib/stringify");

const DB_NAME = "tasarubat-articles";
const root = path.join(__dirname, "..");
const outPublished = path.join(root, "content", "blog");
const outDrafts = path.join(root, "content", "blog-drafts");

/** صفوف أصغر = JSON أصغر من Wrangler وأقل احتمالاً لاقتطاع الاستجابة */
const PAGE_SIZE = 40;

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
    console.error("[export-d1-articles-to-md] أوّل 500 حرف:\n", raw.slice(0, 500));
    process.exit(1);
  }

  const rows = [];
  const batches = Array.isArray(parsed) ? parsed : [parsed];

  for (const batch of batches) {
    if (Array.isArray(batch?.results)) {
      rows.push(...batch.results);
      continue;
    }
    if (Array.isArray(batch?.result)) {
      for (const block of batch.result) {
        if (Array.isArray(block?.results)) rows.push(...block.results);
      }
    }
  }

  return rows;
}

function runQuery(sql) {
  const tmpSql = path.join(
    os.tmpdir(),
    `d1-export-articles-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}.sql`,
  );
  fs.writeFileSync(tmpSql, sql, "utf8");
  const remoteFlag = process.env.EXPORT_D1_LOCAL === "1" ? "--local" : "--remote";
  try {
    return execSync(`npx wrangler d1 execute ${DB_NAME} ${remoteFlag} --file="${tmpSql}" --json`, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 256 * 1024 * 1024,
      shell: true,
      env: { ...process.env, WRANGLER_LOG: "error", CI: "true" },
    });
  } finally {
    try {
      fs.unlinkSync(tmpSql);
    } catch {
      /* ignore */
    }
  }
}

function runCount(publishedOnly) {
  const wh = publishedOnly ? "WHERE published = 1" : "";
  const sql = `SELECT COUNT(*) AS cnt FROM articles ${wh};`;
  const out = runQuery(sql);
  const rows = parseWranglerRows(out);
  const n = Number(rows[0]?.cnt ?? rows[0]?.CNT ?? 0);
  return Number.isFinite(n) ? n : 0;
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

function normalizeRow(row) {
  if (!row || typeof row !== "object") return null;

  const publishedRaw = row.published ?? row.PUBLISHED;
  const published =
    publishedRaw === true || publishedRaw === 1 || publishedRaw === "1" || String(publishedRaw).toLowerCase() === "true";

  const id = String(row.id ?? "").trim();
  const slug = String(row.slug ?? "").trim();
  if (!id || !slug) return null;

  const content =
    typeof row.content === "string"
      ? row.content
      : row.content != null
        ? String(row.content)
        : "";

  return {
    rowid: Number(row.rowid ?? row.ROWID),
    id,
    slug,
    category: String(row.category ?? "").trim(),
    title: String(row.title ?? "").trim(),
    excerpt: String(row.excerpt ?? "").trim(),
    content,
    cover_image_url: String(row.cover_image_url ?? row.coverImageUrl ?? "").trim(),
    cover_alt: String(row.cover_alt ?? row.coverAlt ?? "").trim(),
    cover_width: Number(row.cover_width ?? row.coverWidth) || 800,
    cover_height: Number(row.cover_height ?? row.coverHeight) || 320,
    created_at: row.created_at ?? row.createdAt,
    updated_at: row.updated_at ?? row.updatedAt,
    published,
  };
}

function rowToFrontmatter(norm) {
  return {
    id: norm.id,
    slug: norm.slug,
    published: norm.published,
    category: norm.category,
    title: norm.title,
    excerpt: norm.excerpt,
    coverSrc: norm.cover_image_url,
    coverAlt: norm.cover_alt,
    coverWidth: norm.cover_width,
    coverHeight: norm.cover_height,
    createdAt: toIsoMs(norm.created_at),
    updatedAt: toIsoMs(norm.updated_at),
  };
}

/** OFFSET على ‎ORDER BY rowid‎ ثابت في SQLite/D1 */
function fetchAllRows(publishedOnly) {
  const all = [];
  let offset = 0;
  const whereSql = publishedOnly ? "WHERE published = 1" : "";

  for (let guard = 0; guard < 10000; guard += 1) {
    const sql = `SELECT rowid, id, slug, category, title, excerpt, content, cover_image_url, cover_alt, cover_width, cover_height, published, created_at, updated_at
FROM articles ${whereSql}
ORDER BY rowid ASC
LIMIT ${PAGE_SIZE} OFFSET ${offset};`;

    let stdout;
    try {
      stdout = runQuery(sql);
    } catch (e) {
      console.error("[export-d1-articles-to-md] فشل الاستعلام:", e?.message ?? e);
      process.exit(1);
    }

    const rows = parseWranglerRows(stdout).map(normalizeRow).filter(Boolean);
    if (!rows.length) break;

    all.push(...rows);
    offset += rows.length;
    if (rows.length < PAGE_SIZE) break;
  }

  return all;
}

/** مسار ملف فريد عند تعارض اسم الملف مع مقال آخر (slug مختلف بعد safeBasename) */
function uniqueFilePath(dir, base, id) {
  let p = path.join(dir, `${base}.md`);
  if (!fs.existsSync(p)) return p;

  try {
    const matter = require("gray-matter");
    const prev = matter(fs.readFileSync(p, "utf8"));
    if (String(prev.data?.id ?? "") === id) return p;
  } catch {
    /* إن تعذّر القراءة نعتبر تعارضاً */
  }

  const short = id.replace(/-/g, "").slice(0, 10);
  const alt = `${base}__${short}.md`;
  console.warn(`[export-d1-articles-to-md] تعارض اسم ملف لـ «${base}.md» — كتابة: ${alt}`);
  return path.join(dir, alt);
}

function main() {
  if (process.env.SKIP_D1_EXPORT === "1") {
    console.log("[export-d1-articles-to-md] تخطّي التصدير (SKIP_D1_EXPORT=1).");
    process.exit(0);
  }

  const publishedOnly = process.env.EXPORT_D1_PUBLISHED_ONLY === "1";
  const remoteLabel = process.env.EXPORT_D1_LOCAL === "1" ? "local" : "remote";

  const expected = runCount(publishedOnly);
  console.log(`[export-d1-articles-to-md] عدد الصفوف في D1 (${remoteLabel}): ${expected}`);

  const rows = fetchAllRows(publishedOnly);
  if (!rows.length) {
    console.warn(
      publishedOnly
        ? "[export-d1-articles-to-md] لا توجد مقالات منشورة."
        : "[export-d1-articles-to-md] لا توجد صفوف في articles.",
    );
    return;
  }

  if (expected > 0 && rows.length !== expected) {
    console.warn(
      `[export-d1-articles-to-md] تحذير: جُلب ${rows.length} صفاً بينما COUNT أعطى ${expected}. إن كان الفرق كبيراً، جرّب EXPORT_D1_LOCAL=1 أو تحقق من الاتصال/القاعدة.`,
    );
  }

  fs.mkdirSync(outPublished, { recursive: true });
  if (!publishedOnly) fs.mkdirSync(outDrafts, { recursive: true });

  let nPub = 0;
  let nDraft = 0;

  for (const norm of rows) {
    const base = safeBasename(norm.slug);
    if (!base) continue;

    const data = rowToFrontmatter(norm);
    const body = norm.content.endsWith("\n") ? norm.content : `${norm.content}\n`;
    const file = stringify({ content: body }, data);

    if (norm.published) {
      const filePath = uniqueFilePath(outPublished, base, norm.id);
      fs.writeFileSync(filePath, file, "utf8");
      nPub += 1;
      console.log(`[export-d1-articles-to-md] blog → ${path.relative(root, filePath)}`);
    } else if (!publishedOnly) {
      const filePath = uniqueFilePath(outDrafts, base, norm.id);
      fs.writeFileSync(filePath, file, "utf8");
      nDraft += 1;
      console.log(`[export-d1-articles-to-md] draft → ${path.relative(root, filePath)}`);
    }
  }

  if (publishedOnly) {
    console.log(`[export-d1-articles-to-md] تم: ${nPub} ملفاً → content/blog/ (متوقع منشور: ${expected})`);
  } else {
    console.log(
      `[export-d1-articles-to-md] تم: ${nPub} منشور → content/blog/ | ${nDraft} مسودة → content/blog-drafts/ | صفوف مُجلَبة: ${rows.length} (COUNT: ${expected})`,
    );
  }

  if (expected > 0 && nPub + nDraft < expected) {
    console.warn(
      "[export-d1-articles-to-md] عدد الملفات أقل من COUNT — راجع صفوفاً بلا slug أو أخطاء أعلاه.",
    );
  }
}

main();
