// Shared UI: layout, header, footer, images, icons and small components.
import config from '../../site.config.mjs';
import { destinations } from '../data/destinations.mjs';
import alts from '../data/alts.mjs';

export const ctx = { images: {}, assets: {}, usedImages: new Set(), css: '' };

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const html = (strings, ...vals) => strings.reduce((a, s, i) => a + s + (i < vals.length ? (Array.isArray(vals[i]) ? vals[i].join('') : vals[i] ?? '') : ''), '');

// ── Icons & motifs ──────────────────────────────────────────────────────
// The crown: a fan of golden bristles, as on the crested crane's head.
export const crown = (cls = '') => {
  let lines = '';
  const n = 15;
  for (let i = 0; i < n; i++) {
    const a = (-80 + (160 / (n - 1)) * i) * (Math.PI / 180);
    const len = 17 + (i % 2 ? -4 : 2) - Math.abs(i - 7) * 0.6;
    const x1 = 24 + Math.sin(a) * 4, y1 = 30 - Math.cos(a) * 4;
    const x2 = 24 + Math.sin(a) * (4 + len), y2 = 30 - Math.cos(a) * (4 + len);
    lines += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  return `<svg class="${cls}" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true" focusable="false">${lines}<circle cx="24" cy="30" r="2.2" fill="currentColor" stroke="none"/></svg>`;
};
// Papyrus stems: thin verticals topped by umbels.
export const stems = (side = 'right', count = 5) => {
  let g = '';
  const w = count * 22 + 20;
  for (let i = 0; i < count; i++) {
    const x = 14 + i * 22 + (i % 2 ? 4 : 0);
    const top = 40 + ((i * 37) % 90);
    g += `<line x1="${x}" y1="600" x2="${x + (i % 2 ? -3 : 3)}" y2="${top}"/>`;
    for (let k = 0; k < 9; k++) {
      const a = (-70 + k * 17.5) * (Math.PI / 180);
      const L = 22 + (k % 3) * 4;
      const cx = x + (i % 2 ? -3 : 3);
      g += `<line x1="${cx}" y1="${top}" x2="${(cx + Math.sin(a) * L).toFixed(1)}" y2="${(top - Math.cos(a) * L * 0.8).toFixed(1)}"/>`;
    }
  }
  return `<div class="stems stems--${side}" aria-hidden="true"><svg viewBox="0 0 ${w} 600" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1">${g}</svg></div>`;
};
export const arrow = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5"/></svg>';
export const arrowL = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M15 8H2M7 3 2 8l5 5"/></svg>';
export const chev = '<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="m1 1 4 4 4-4"/></svg>';
export const linkArrow = (href, text, extra = '') => `<a class="link-arrow" href="${href}"${extra}><span class="circ">${arrow}</span><span>${esc(text)}</span></a>`;
export const btn = (href, text, cls = '') => `<a class="btn ${cls}" href="${href}">${esc(text)} <span class="arr" aria-hidden="true">→</span></a>`;

// ── Images ──────────────────────────────────────────────────────────────
// picture(key, { sizes, eager, alt, cls, priority })
export function picture(key, o = {}) {
  const m = ctx.images[key];
  if (!m) throw new Error(`Unknown image key: ${key}`);
  ctx.usedImages.add(key);
  const widths = m.widths;
  const set = (fmt) => widths.map((w) => `${ctx.assets[`img/${key}-${w}.${fmt}`]} ${w}w`).join(', ');
  const fallbackW = widths.includes(800) ? 800 : widths[widths.length - 1];
  const maxW = widths[widths.length - 1];
  const h = Math.round((m.height / m.width) * maxW);
  const alt = o.alt ?? alts[key] ?? '';
  const sizes = o.sizes || '100vw';
  const loading = o.eager ? 'eager' : 'lazy';
  const fp = o.priority ? ' fetchpriority="high"' : '';
  const style = o.position ? ` style="object-position:${o.position}"` : '';
  return `<picture${o.cls ? ` class="${o.cls}"` : ''}><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${ctx.assets[`img/${key}-${fallbackW}.webp`]}" width="${maxW}" height="${h}" alt="${esc(alt)}" loading="${loading}" decoding="${o.eager ? 'sync' : 'async'}"${fp}${style}></picture>`;
}
export function preloadImage(key, sizes = '100vw') {
  const m = ctx.images[key];
  const set = m.widths.map((w) => `${ctx.assets[`img/${key}-${w}.avif`]} ${w}w`).join(', ');
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${set}" imagesizes="${sizes}" fetchpriority="high">`;
}

// ── Navigation ──────────────────────────────────────────────────────────
const tools = [
  { href: '/destinations/bwindi#sectors', name: 'Bwindi sector chooser', note: 'Buhoma, Ruhija, Rushaga or Nkuringo' },
  { href: '/birds', name: 'The Bird List', note: 'A field guide to Uganda’s big birds' },
  { href: '/route-planner', name: 'Gorilla & chimp route planner', note: 'Parks in the right order, with times' },
];
const regions = [
  ['The southwest', ['bwindi', 'mgahinga', 'lake-bunyonyi']],
  ['The west', ['kibale', 'queen-elizabeth', 'rwenzori']],
  ['North, east & centre', ['murchison-falls', 'kidepo', 'jinja', 'kampala-entebbe']],
];
const dname = (s) => destinations.find((d) => d.slug === s);

function megaDestinations() {
  return `<div class="mega" id="mega-dest">${regions.map(([r, list]) => `<div><h2>${r}</h2><ul>${list.map((s) => { const d = dname(s); return `<li><a href="/destinations/${s}">${esc(d.short)}<small>${esc(d.tags.slice(0, 2).join(' · '))}</small></a></li>`; }).join('')}</ul></div>`).join('')}
  <a class="mega__feature" href="/destinations">${picture('crane-pair', { sizes: '30vw', alt: '' })}<span>All ten destinations →</span></a></div>`;
}
function megaTools() {
  return `<div class="mega mega--tools" id="mega-tools">${tools.map((t) => `<div><ul><li><a href="${t.href}">${esc(t.name)}<small>${esc(t.note)}</small></a></li></ul></div>`).join('')}
  <a class="mega__feature" href="/journeys">${picture('chimp-mother', { sizes: '30vw', alt: '' })}<span>Sample journeys →</span></a></div>`;
}

export function header(current = '') {
  const cur = (p) => (current === p ? ' aria-current="page"' : '');
  return html`<header class="site-header" id="top">
  <a class="skip" href="#main">Skip to content</a>
  <div class="hdr">
    <a class="wordmark" href="/" aria-label="${esc(config.brand.name)} home">${crown()}<span class="wordmark__name">${esc(config.brand.shortName)} <small>Safaris</small></span></a>
    <nav class="primary" aria-label="Main">
      <ul>
        <li class="has-mega"><button type="button" aria-expanded="false" aria-controls="mega-dest">Destinations ${chev}</button>${megaDestinations()}</li>
        <li><a href="/journeys"${cur('journeys')}>Journeys</a></li>
        <li class="has-mega"><button type="button" aria-expanded="false" aria-controls="mega-tools">Plan ${chev}</button>${megaTools()}</li>
        <li><a href="/stays"${cur('stays')}>Stays</a></li>
        <li><a href="/journal"${cur('journal')}>Journal</a></li>
        <li><a href="/about"${cur('about')}>About</a></li>
      </ul>
    </nav>
    <a class="btn btn--sm" href="/enquire">Plan a journey <span class="arr" aria-hidden="true">→</span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu"><i aria-hidden="true"></i>Menu</button>
  </div>
  <div class="mobile-menu on-dark" id="mobile-menu" hidden>
    <div class="hdr"><a class="wordmark" href="/" aria-label="${esc(config.brand.name)} home">${crown()}<span class="wordmark__name">${esc(config.brand.shortName)} <small>Safaris</small></span></a><button class="menu-btn" type="button" data-close>Close</button></div>
    <nav aria-label="Mobile">
      <ul>
        <li><details><summary>Destinations ${chev}</summary><ul>${destinations.map((d) => `<li><a href="/destinations/${d.slug}">${esc(d.short)}</a></li>`).join('')}<li><a href="/destinations">All destinations</a></li></ul></details></li>
        <li><details><summary>Plan ${chev}</summary><ul>${tools.map((t) => `<li><a href="${t.href}">${esc(t.name)}</a></li>`).join('')}</ul></details></li>
        <li><a href="/journeys">Journeys</a></li>
        <li><a href="/stays">Stays</a></li>
        <li><a href="/journal">Journal</a></li>
        <li><a href="/about">About</a></li>
      </ul>
      <a class="btn btn--crown" href="/enquire">Plan a journey <span class="arr" aria-hidden="true">→</span></a>
      <p class="mm-contact"><a href="mailto:${config.contact.email}">${config.contact.email}</a></p>
    </nav>
  </div>
</header>`;
}

export const addressLines = () => {
  const a = config.address;
  return [a.venue, a.line1, a.street, `${a.district}, ${a.city}`, a.country];
};
export const addressInline = () => addressLines().join(', ');

export function footer() {
  return html`<footer class="site-footer on-dark">
  ${stems('right', 6)}
  <div class="foot-grid">
    <div class="foot-brand">
      <a class="wordmark" href="/" aria-label="${esc(config.brand.name)} home">${crown()}<span class="wordmark__name">${esc(config.brand.shortName)} <small>Safaris</small></span></a>
      <p class="mt-s">${esc(config.brand.description)}</p>
      <address>${addressLines().map(esc).join('<br>')}<br><a href="mailto:${config.contact.email}">${config.contact.email}</a></address>
    </div>
    <div><h2>Destinations</h2><ul>${destinations.slice(0, 10).map((d) => `<li><a href="/destinations/${d.slug}">${esc(d.short)}</a></li>`).join('')}</ul></div>
    <div><h2>Plan</h2><ul>
      <li><a href="/journeys">Sample journeys</a></li>
      <li><a href="/destinations/bwindi#sectors">Bwindi sector chooser</a></li>
      <li><a href="/birds">The Bird List</a></li>
      <li><a href="/route-planner">Route planner</a></li>
      <li><a href="/stays">Stays</a></li>
      <li><a href="/enquire">Enquire</a></li>
    </ul></div>
    <div><h2>About</h2><ul>
      <li><a href="/about">About us</a></li>
      <li><a href="/journal">Journal</a></li>
      <li><a href="/destinations">All destinations</a></li>
      <li><a href="/credits">Photo credits</a></li>
    </ul></div>
    <div><h2>Legal</h2><ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/booking-terms">Booking Terms</a></li>
      <li><a href="/cookies">Cookie Policy</a></li>
    </ul></div>
  </div>
  <p class="foot-mark" aria-hidden="true">Nile Source<span>.</span></p>
  <div class="foot-bottom">
    <p class="mb-0">© ${new Date().getFullYear()} ${esc(config.brand.name)}. ${esc(config.address.city)}, ${esc(config.address.country)}.</p>
    <ul><li><a href="/privacy">Privacy</a></li><li><a href="/booking-terms">Booking Terms</a></li><li><a href="/cookies">Cookies</a></li><li><a href="#top">Back to top ↑</a></li></ul>
  </div>
</footer>`;
}

// ── Layout ──────────────────────────────────────────────────────────────
export function layout({ path, title, description, body, heroImage, plain = false, current = '', jsonld = [], scripts = [], ogImage }) {
  const full = title ? `${title} · ${config.brand.name}` : `${config.brand.name} · ${config.brand.tagline}`;
  const url = config.siteUrl + (path === '/' ? '' : path);
  const og = ogImage || heroImage || 'hero-crane';
  const ogUrl = config.siteUrl + ctx.assets[`img/${og}-1200.webp`] || '';
  const ld = [orgLd(), ...jsonld].map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('');
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="${config.palette.forest}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(config.brand.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogUrl}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${ctx.assets['favicon.svg']}" type="image/svg+xml">
<link rel="preload" href="${ctx.assets['fonts/playfair-display-500.woff2']}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.assets['fonts/mukta-400.woff2']}" as="font" type="font/woff2" crossorigin>
${heroImage ? preloadImage(heroImage) : ''}
<style>${ctx.css}</style>
<script>document.documentElement.classList.add('js')</script>
${ld}
</head>
<body class="${plain ? 'page-plain' : 'page-hero'}">
${header(current)}
<main id="main">
${body}
</main>
${footer()}
<script src="${ctx.assets['js/site.js']}" defer></script>
${scripts.map((s) => `<script src="${ctx.assets[`js/${s}.js`]}" defer></script>`).join('')}
</body>
</html>`;
}

export function orgLd() {
  const a = config.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: config.brand.name,
    description: config.brand.description,
    url: config.siteUrl,
    email: config.contact.email,
    image: config.siteUrl + (ctx.assets['img/hero-crane-1200.webp'] || ''),
    address: { '@type': 'PostalAddress', streetAddress: `${a.line1}, ${a.street}`, addressLocality: `${a.district}, ${a.city}`, addressCountry: a.countryCode },
    geo: { '@type': 'GeoCoordinates', latitude: a.geo.lat, longitude: a.geo.lng },
    areaServed: { '@type': 'Country', name: 'Uganda' },
  };
}
export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: config.siteUrl + path })),
});
export const crumbs = (items, light = false) => `<nav class="crumbs${light ? ' crumbs--light' : ''}" aria-label="Breadcrumb"><ol>${items.map(([n, p], i) => (i === items.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${p}">${esc(n)}</a></li>`)).join('')}</ol></nav>`;

// ── Components ──────────────────────────────────────────────────────────
export function destCard(d, sizes = '(min-width:1000px) 24vw, (min-width:640px) 45vw, 78vw', i = 0) {
  return `<a class="card" href="/destinations/${d.slug}" data-reveal style="--d:${(i % 4) * 0.08}s">
    <div class="card__media ar-45">${picture(d.hero, { sizes, alt: alts[d.hero] })}</div>
    <div class="card__body"><span class="eyebrow">${esc(d.region)}</span><h3 class="card__title">${esc(d.short)}</h3><p class="card__text">${esc(d.card)}</p><span class="card__more">Explore <span class="arr" aria-hidden="true">→</span></span></div>
  </a>`;
}
export function sectionHead({ eyebrow, title, count, aside, link }) {
  return `<div class="sec-head" data-reveal><div>${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}<h2 class="h2">${title}${count ? `<span class="count">(${count})</span>` : ''}</h2></div>${aside || link ? `<div class="sec-head__aside">${aside ? `<p class="muted">${aside}</p>` : ''}${link || ''}</div>` : ''}</div>`;
}
export function railNav(id) {
  return `<div class="rail-nav" data-rail-nav="${id}"><button type="button" data-dir="-1" aria-label="Previous">${arrowL}</button><button type="button" data-dir="1" aria-label="Next">${arrow}</button></div>`;
}
export function cta({ title = 'Tell us when. We’ll find the sector.', text = 'Your dates, who is coming and what you hope to see. One planner reads it, replies with a first route and tells you which permits to secure first.', image = 'papyrus-mist', fig = 'Fog over papyrus, western Uganda' } = {}) {
  return `<section class="fullbleed cta" aria-labelledby="cta-title">
  ${picture(image, { sizes: '100vw', alt: '' })}
  <p class="fig"><b>Fig.</b>${esc(fig)}</p>
  <div class="fullbleed__inner">
    <h2 class="h1" id="cta-title" data-reveal>${title}</h2>
    <div class="fullbleed__aside cta__aside" data-reveal style="--d:.1s"><p>${esc(text)}</p>${btn('/enquire', 'Plan a journey', 'btn--crown')}</div>
  </div>
</section>`;
}
export const dots = (n, of = 5) => `<span class="dots" role="img" aria-label="Difficulty ${n} of ${of}">${Array.from({ length: of }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`;
