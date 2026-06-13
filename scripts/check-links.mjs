import fs from 'fs';
import path from 'path';

const blogDir = 'content/blog';
const appDirs = ['app', 'content/blog'];

function listBlogSlugs() {
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => {
      const t = fs.readFileSync(path.join(blogDir, f), 'utf8');
      return t.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
    })
    .filter(Boolean);
}

function listStaticRoutes(dir, base = '') {
  const routes = new Set();
  if (!fs.existsSync(dir)) return routes;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.startsWith('[') && ent.name.endsWith(']')) continue;
      for (const r of listStaticRoutes(p, `${base}/${ent.name}`)) routes.add(r);
    } else if (ent.name === 'page.tsx' || ent.name === 'page.ts') {
      routes.add(base || '/');
    }
  }
  return routes;
}

function extractLinks(text) {
  const links = [];
  const md = [...text.matchAll(/\]\((\/[^)\s#]+)(?:#[^)\s]*)?\)/g)];
  for (const m of md) links.push(m[1]);
  const html = [...text.matchAll(/href=["'](\/[^"'#]+)/g)];
  for (const m of html) links.push(m[1]);
  return links;
}

const slugs = new Set(listBlogSlugs());
const appRoutes = listStaticRoutes('app');

const knownPrefixes = [
  '/blog/',
  '/services/',
  '/insulation-services/',
  '/coverage/',
  '/news/',
  '/leak-detection',
  '/insulation',
  '/contact',
  '/about',
  '/team',
  '/smart-leak-diagnosis',
  '/coverage',
  '/services',
];

const broken = new Map();

function scanFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  for (const link of extractLinks(text)) {
    if (!link.startsWith('/')) continue;
    if (link.startsWith('/blog/')) {
      const slug = decodeURIComponent(link.slice('/blog/'.length).split('?')[0]);
      if (!slugs.has(slug)) {
        const key = link;
        if (!broken.has(key)) broken.set(key, []);
        broken.get(key).push(filePath);
      }
      continue;
    }
    if (link.startsWith('/coverage/')) continue;
    if (link.startsWith('/insulation-services/')) continue;
    if (link.startsWith('/news/')) continue;
    const route = link.split('?')[0];
    if (appRoutes.has(route) || knownPrefixes.some((p) => route === p || route.startsWith(p + '/'))) continue;
    if (!broken.has(route)) broken.set(route, []);
    broken.get(route).push(filePath);
  }
}

for (const f of fs.readdirSync(blogDir)) {
  if (f.endsWith('.md')) scanFile(path.join(blogDir, f));
}

for (const dir of ['app', 'components', 'lib']) {
  if (!fs.existsSync(dir)) continue;
  const walk = (d) => {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (/\.(tsx?|mdx?|md|json)$/.test(ent.name)) scanFile(p);
    }
  };
  walk(dir);
}

console.log('Blog slugs:', slugs.size);
console.log('Broken /blog/ or internal links:', broken.size);
[...broken.entries()]
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([link, files]) => {
    console.log(`\n${link}`);
    files.slice(0, 5).forEach((f) => console.log('  -', f));
    if (files.length > 5) console.log(`  ... +${files.length - 5} more`);
  });
