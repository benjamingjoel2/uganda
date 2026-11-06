// Static site build: renders every page to dist/ with hashed, long-cacheable assets.
//   npm run build
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import config from '../site.config.mjs';
import { ctx } from '../src/templates/ui.mjs';
import { home, destinationsIndex, destination } from '../src/templates/pages.mjs';
import { birdsPage, plannerPage, journeysPage, staysPage, aboutPage, journalPage, articlePage, enquirePage, thanksPage, creditsPage, notFoundPage } from '../src/templates/pages2.mjs';
import { privacyPage, termsPage, cookiesPage } from '../src/templates/legal.mjs';
import { destinations } from '../src/data/destinations.mjs';
import { articles } from '../src/data/journal.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'src/assets');
const DIST = path.join(ROOT, 'dist');
const t0 = Date.now();

const hash = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 10);
const minCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();
const minJs = (s) => s.replace(/^\s*\/\/.*$/gm, '').replace(/\n\s+/g, '\n').replace(/\n{2,}/g, '\n').trim();

async function main() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(path.join(DIST, 'assets'), { recursive: true });
  ctx.images = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/images.json'), 'utf8'));

  // 1. Hash fonts and JS; plan image names (images are copied after rendering, only if used).
  const pending = [];
  for (const dir of ['fonts', 'js']) {
    for (const f of await fs.readdir(path.join(SRC, dir))) {
      let buf = await fs.readFile(path.join(SRC, dir, f));
      if (dir === 'js') buf = Buffer.from(minJs(buf.toString()));
      const ext = path.extname(f), base = path.basename(f, ext);
      const out = `/assets/${dir}/${base}.${hash(buf)}${ext}`;
      ctx.assets[`${dir}/${f}`] = out;
      pending.push([out, buf]);
    }
  }
  const imgFiles = await fs.readdir(path.join(SRC, 'img'));
  const imgMap = {};
  for (const f of imgFiles) {
    const buf = await fs.readFile(path.join(SRC, 'img', f));
    const ext = path.extname(f), base = path.basename(f, ext);
    const out = `/assets/img/${base}.${hash(buf)}${ext}`;
    ctx.assets[`img/${f}`] = out;
    imgMap[f] = [out, buf];
  }
  // favicon: the crown on forest
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${config.palette.forest}"/><g stroke="${config.palette.crown}" stroke-width="2.4" stroke-linecap="round">${Array.from({ length: 11 }, (_, i) => { const a = (-75 + i * 15) * Math.PI / 180; const L = 20 - Math.abs(i - 5) * 0.8 + (i % 2 ? -3 : 0); return `<line x1="${(32 + Math.sin(a) * 5).toFixed(1)}" y1="${(46 - Math.cos(a) * 5).toFixed(1)}" x2="${(32 + Math.sin(a) * (5 + L)).toFixed(1)}" y2="${(46 - Math.cos(a) * (5 + L)).toFixed(1)}"/>`; }).join('')}</g><circle cx="32" cy="46" r="3.5" fill="${config.palette.crown}"/></svg>`;
  ctx.assets['favicon.svg'] = `/assets/favicon.${hash(Buffer.from(fav))}.svg`;
  pending.push([ctx.assets['favicon.svg'], Buffer.from(fav)]);

  // 2. CSS: palette tokens from config + stylesheet, inlined into every page.
  const tokens = `:root{${Object.entries(config.palette).map(([k, v]) => `--${k}:${v}`).join(';')}}`;
  ctx.css = minCss(tokens + (await fs.readFile(path.join(SRC, 'css/site.css'), 'utf8')).replace(/\/assets\/fonts\/([\w-]+\.woff2)/g, (m, f) => ctx.assets[`fonts/${f}`]));

  // 3. Render pages (credits last, so it can list every photo used).
  const pages = [
    home(), destinationsIndex(), ...destinations.map(destination), birdsPage(), plannerPage(), journeysPage(),
    staysPage(), aboutPage(), journalPage(), ...articles.map(articlePage), enquirePage(), thanksPage(),
    privacyPage(), termsPage(), cookiesPage(), notFoundPage(),
  ];
  pages.push(creditsPage());
  for (const p of pages) {
    const file = p.path === '/' ? 'index.html' : `${p.path.slice(1)}.html`;
    const out = path.join(DIST, file);
    await fs.mkdir(path.dirname(out), { recursive: true });
    let h = p.html;
    if (p.noindex) h = h.replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="robots" content="noindex">');
    await fs.writeFile(out, h);
  }

  // 4. Write assets that pages actually use.
  for (const [out, buf] of pending) { const f = path.join(DIST, out); await fs.mkdir(path.dirname(f), { recursive: true }); await fs.writeFile(f, buf); }
  let imgCount = 0;
  for (const key of ctx.usedImages) {
    for (const [f, [out, buf]] of Object.entries(imgMap)) {
      if (f.startsWith(key + '-') && /^\d+\.(avif|webp)$/.test(f.slice(key.length + 1))) {
        const dst = path.join(DIST, out); await fs.mkdir(path.dirname(dst), { recursive: true }); await fs.writeFile(dst, buf); imgCount++;
      }
    }
  }

  // 5. sitemap + robots
  const urls = pages.filter((p) => !p.noindex).map((p) => `<url><loc>${config.siteUrl}${p.path === '/' ? '/' : p.path}</loc></url>`).join('');
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  await fs.writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);

  console.log(`Built ${pages.length} pages, ${imgCount} image files, in ${Date.now() - t0} ms → dist/`);
}
main().catch((e) => { console.error(e); process.exit(1); });
