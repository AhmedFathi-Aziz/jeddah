import fs from 'fs';
import path from 'path';

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md');
const slugs = new Map();
const titles = new Map();
const h2map = new Map();
const short = [];

for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const slug = t.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
  const title = t.match(/^title:\s*['"]?(.+?)['"]?\s*$/m)?.[1]?.trim();
  const body = t.replace(/^---[\s\S]*?---\n?/, '').trim();

  if (body.length < 100) short.push({ f, len: body.length });

  if (slugs.has(slug)) console.log('DUP SLUG:', slug, slugs.get(slug), f);
  else slugs.set(slug, f);

  if (titles.has(title)) console.log('DUP TITLE:', title, titles.get(title), f);
  else titles.set(title, f);

  for (const m of t.matchAll(/^## (.+)$/gm)) {
    const h = m[1].trim();
    if (!h2map.has(h)) h2map.set(h, []);
    h2map.get(h).push(f);
  }
}

const dupH2 = [...h2map.entries()]
  .filter(([h, a]) => a.length > 1 && !h.includes('اقرأ') && !h.includes('خدمات'))
  .sort((a, b) => b[1].length - a[1].length);

console.log('Articles:', files.length);
console.log('Unique slugs:', slugs.size, 'Unique titles:', titles.size);
console.log('Short bodies:', short.length, short.map((s) => s.f).join(', ') || 'none');
console.log('\nShared H2 (excl nav sections):', dupH2.length);
dupH2.slice(0, 12).forEach(([h, a]) => console.log(`  [${a.length}] ${h}`));
