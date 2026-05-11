/**
 * يصدّر **كل** صفوف جدول المقالات من D1 إلى Markdown.
 *
 * ملاحظة: ‎wrangler d1 execute --file‎ في الإصدارات الحديثة قد يعيد **ملخصاً** بدل صفوف الـ SELECT؛
 * لذلك نستخدم ‎--command‎ مع تمرير آمن عبر ‎execFileSync‎ (بدون shell).
 *
 * - منشور → ‎content/blog/<slug>.md‎
 * - غير منشور → ‎content/blog-drafts/<slug>.md‎
 *
 * ‎EXPORT_D1_PUBLISHED_ONLY=1‎ → منشورات فقط إلى ‎content/blog‎
 * ‎EXPORT_D1_LOCAL=1‎ → ‎--local‎ بدل ‎--remote‎
 * ‎SKIP_D1_EXPORT=1‎ → خروج فوري (للبناء بدون D1)
 *
 *   npm run articles:export-from-d1
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const stringify = require("gray-matter/lib/stringify");

const DB_NAME = "tasarubat-articles";
const root = path.join(__dirname, "..");
const outPublished = path.join(root, "content", "blog");
const outDrafts = path.join(root, "content", "blog-drafts");

const wranglerCli = path.join(root, "node_modules", "wrangler", "wrangler-dist", "cli.js");
const wranglerConfig = path.join(root, "wrangler.jsonc");

/**
 * ‎process.execPath‎ قد يشير إلى Node مضمّن (مثل Cursor) بسلوك stdout غير موثوق مع Wrangler.
 * عند ‎npm run‎ يضبط npm ‎npm_node_execpath‎ على Node الفعلي — نستخدمه أولاً.
 */
function nodeForWrangler() {
  const override = process.env.TASARUBAT_NODE_FOR_WRANGLER;
  if (override && fs.existsSync(override)) return override;
  const npmNode = process.env.npm_node_execpath;
  if (npmNode && fs.existsSync(npmNode)) return npmNode;
  return process.platform === "win32" ? "node.exe" : "node";
}

function runWranglerSql(sql) {
  if (!fs.existsSync(wranglerCli)) {
    throw new Error(`لم يُعثر على wrangler CLI: ${wranglerCli} — نفّذ npm ci أولاً.`);
  }
  const oneLine = sql.replace(/\s+/g, " ").trim();
  const remoteFlag = process.env.EXPORT_D1_LOCAL === "1" ? "--local" : "--remote";
  /** مثل ‎bin/wrangler.js‎ — بدونها قد يخرج Wrangler بـ 0 بدون أي stdout على Windows. */
  const args = [
    "--no-warnings",
    "--experimental-vm-modules",
    wranglerCli,
    "d1",
    "execute",
    DB_NAME,
  ];
  if (fs.existsSync(wranglerConfig)) args.push("--config", wranglerConfig);
  args.push(remoteFlag, "--command", oneLine, "--json");

  const env = { ...process.env };
  delete env.CI;
  /** ‎WRANGLER_LOG=error‎ يُفرغ stdout لـ ‎d1 execute --json‎ (Wrangler 4.x). */
  delete env.WRANGLER_LOG;

  try {
    return execFileSync(nodeForWrangler(), args, {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
      env,
    });
  } catch (e) {
    const stderr = e.stderr ? String(e.stderr) : "";
    throw new Error(`${e?.message ?? e}\n${stderr}`);
  }
}

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
      for (const row of batch.results) {
        if (row && typeof row === "object" && !Array.isArray(row)) rows.push(row);
      }
      continue;
    }
    if (Array.isArray(batch?.result)) {
      for (const block of batch.result) {
        if (Array.isArray(block?.results)) {
          for (const row of block.results) {
            if (row && typeof row === "object" && !Array.isArray(row)) rows.push(row);
          }
        }
      }
    }
  }

  return rows;
}

function runCount(publishedOnly) {
  const wh = publishedOnly ? "WHERE published = 1" : "";
  const sql = `SELECT COUNT(*) AS cnt FROM articles ${wh}`;
  const out = runWranglerSql(sql);
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

/**
 * صف واحد لكل استعلام — يتجنّب حد طول سطر الأوامر مع ‎--command‎
 * ويتفادى سلوك ‎--file‎ الذي يعيد ملخصاً بدل الصفوف.
 */
function fetchAllRows(publishedOnly) {
  const total = runCount(publishedOnly);
  const all = [];
  const whereSql = publishedOnly ? "WHERE published = 1" : "";

  for (let offset = 0; offset < total; offset += 1) {
    const sql = `SELECT rowid, id, slug, category, title, excerpt, content, cover_image_url, cover_alt, cover_width, cover_height, published, created_at, updated_at FROM articles ${whereSql} ORDER BY rowid ASC LIMIT 1 OFFSET ${offset}`;
    const stdout = runWranglerSql(sql);
    const rows = parseWranglerRows(stdout).map(normalizeRow).filter(Boolean);
    if (rows[0]) {
      all.push(rows[0]);
    } else {
      console.warn(`[export-d1-articles-to-md] تحذير: لا صف عند OFFSET ${offset} (المتوقع ${total}).`);
    }
    if ((offset + 1) % 25 === 0 || offset + 1 === total) {
      process.stdout.write(`\r[export-d1-articles-to-md] جلب ${offset + 1}/${total}…`);
    }
  }
  if (total > 0) process.stdout.write("\n");

  return all;
}

function uniqueFilePath(dir, base, id) {
  let p = path.join(dir, `${base}.md`);
  if (!fs.existsSync(p)) return p;

  try {
    const matter = require("gray-matter");
    const prev = matter(fs.readFileSync(p, "utf8"));
    if (String(prev.data?.id ?? "") === id) return p;
  } catch {
    /* ignore */
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

  if (expected === 0) {
    console.warn(
      publishedOnly
        ? "[export-d1-articles-to-md] لا توجد مقالات منشورة في D1."
        : "[export-d1-articles-to-md] لا توجد صفوف في جدول articles.",
    );
    return;
  }

  const rows = fetchAllRows(publishedOnly);
  if (!rows.length) {
    console.warn("[export-d1-articles-to-md] فشل جلب الصفوف رغم COUNT > 0 — راجع wrangler login أو EXPORT_D1_LOCAL.");
    return;
  }

  if (expected > 0 && rows.length !== expected) {
    console.warn(
      `[export-d1-articles-to-md] تحذير: جُلب ${rows.length} صفاً بينما COUNT = ${expected}.`,
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
    console.log(`[export-d1-articles-to-md] تم: ${nPub} ملفاً → content/blog/ (COUNT: ${expected})`);
  } else {
    console.log(
      `[export-d1-articles-to-md] تم: ${nPub} منشور → content/blog/ | ${nDraft} مسودة → content/blog-drafts/ | صفوف: ${rows.length}`,
    );
  }
}

main();
