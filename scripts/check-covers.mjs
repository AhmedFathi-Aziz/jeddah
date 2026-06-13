import fs from 'fs';
import path from 'path';

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md');

for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const block = t.match(/^coverSrc:\s*>\-\s*\n([\s\S]*?)(?=\ncoverAlt:)/m);
  const inline = t.match(/^coverSrc:\s*['"]?(.+?)['"]?\s*$/m);
  const url = (block ? block[1].replace(/\s+/g, '') : inline?.[1]?.trim()) ?? '';
  if (!url || url.startsWith('/')) continue;
  try {
    const r = await fetch(url, { method: 'HEAD' });
    if (r.status >= 400) console.log(`${r.status}\t${f}\n  ${url.slice(0, 100)}...\n`);
  } catch (e) {
    console.log(`ERR\t${f}\t${e.message}\n`);
  }
}
