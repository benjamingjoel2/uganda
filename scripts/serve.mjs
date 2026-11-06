// Tiny static server for dist/ that mimics Vercel's cleanUrls. `npm run serve`
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../dist');
const PORT = process.env.PORT || 4173;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/') && p !== '/') p = p.slice(0, -1);
  const tries = p === '/' ? ['/index.html'] : [p, p + '.html'];
  for (const t of tries) {
    const f = path.join(ROOT, t);
    if (f.startsWith(ROOT) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
      return fs.createReadStream(f).pipe(res);
    }
  }
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(path.join(ROOT, '404.html')).pipe(res);
}).listen(PORT, () => console.log(`Serving dist/ on http://localhost:${PORT}`));
