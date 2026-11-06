// Downloads the Creative Commons photos listed in scripts/images.json from
// Wikimedia Commons, records author + licence for the credits page, and writes
// right-sized AVIF + WebP variants to src/assets/img/.
//
//   npm run images            # process anything missing
//   npm run images -- --force # re-process everything
//
// To swap a photo: change its Commons file title in scripts/images.json,
// delete the matching files in src/assets/img/ and run `npm run images`.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const MANIFEST = path.join(ROOT, 'scripts/images.json');
const OUT = path.join(ROOT, 'src/assets/img');
const RAW = path.join(ROOT, '.cache/raw');
const META = path.join(ROOT, 'src/data/images.json');
const WIDTHS = [480, 800, 1200, 1600];
const UA = 'NileSourceSafarisSiteBuild/1.0 (static site image pipeline)';
const force = process.argv.includes('--force');

const strip = (s = '') => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function info(title) {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=2400&titles=${encodeURIComponent(title)}`;
  const r = await fetch(u, { headers: { 'User-Agent': UA } });
  const j = await r.json();
  const p = Object.values(j.query.pages)[0];
  const ii = p.imageinfo[0];
  const m = ii.extmetadata;
  return {
    src: ii.thumburl || ii.url,
    page: ii.descriptionurl,
    author: strip(m.Artist?.value) || 'Unknown',
    license: m.LicenseShortName?.value || '',
    licenseUrl: m.LicenseUrl?.value || '',
    title: title.replace(/^File:/, ''),
  };
}

async function main() {
  const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  let meta = {};
  try { meta = JSON.parse(await fs.readFile(META, 'utf8')); } catch {}
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(RAW, { recursive: true });
  for (const [key, title] of Object.entries(manifest)) {
    const done = meta[key] && meta[key].title === title.replace(/^File:/, '');
    const exists = await fs.access(path.join(OUT, `${key}-480.webp`)).then(() => true, () => false);
    if (done && exists && !force) continue;
    const i = await info(title);
    const rawFile = path.join(RAW, `${key}.jpg`);
    let buf;
    try { buf = await fs.readFile(rawFile); } catch {
      const r = await fetch(i.src, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error(`${key}: ${r.status}`);
      buf = Buffer.from(await r.arrayBuffer());
      await fs.writeFile(rawFile, buf);
    }
    const img = sharp(buf).rotate();
    const { width, height } = await img.metadata();
    const widths = WIDTHS.filter((w) => w <= width);
    for (const w of widths) {
      // a very light blur on the large sizes removes sensor noise, which
      // roughly halves file size with no visible loss at display size
      let base = sharp(buf).rotate().resize({ width: w });
      if (w >= 1200) base = base.blur(w >= 1600 ? 0.7 : 0.55);
      await base.clone().avif({ quality: 40, effort: 5 }).toFile(path.join(OUT, `${key}-${w}.avif`));
      await base.clone().webp({ quality: 60, effort: 5 }).toFile(path.join(OUT, `${key}-${w}.webp`));
    }
    // tiny blurred placeholder colour
    const { dominant } = await sharp(buf).stats();
    meta[key] = { ...i, width, height, widths, color: `rgb(${dominant.r},${dominant.g},${dominant.b})` };
    console.log('ok', key, width + 'x' + height, i.license);
    await fs.writeFile(META, JSON.stringify(meta, null, 1));
    await new Promise((r) => setTimeout(r, 400));
  }
  await fs.writeFile(META, JSON.stringify(meta, null, 1));
}
main().catch((e) => { console.error(e); process.exit(1); });
