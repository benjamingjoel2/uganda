# Nile Source Safaris

A fast, static travel website for **Nile Source Safaris**, a Uganda specialist: gorillas in Bwindi, chimps in Kibale, the Nile at its source, and the birds that make Uganda the primate and birding capital of Africa.

- **Live site:** https://uganda-delta.vercel.app (Vercel project `uganda`, team “Benjamin - Sevo”)
- **Planned domain:** https://nilesourcesafaris.tourground.com (used for canonical links, sitemap and structured data)
- **Contact:** nilesourcesafaris@tourground.com

## Run it

You need Node.js 18 or newer. No other tools are needed to build.

```bash
npm install
```

```bash
npm run build
```

```bash
npm run serve
```

The build writes plain HTML, CSS, JS, fonts and images to `dist/` in under a second. `npm run serve` serves `dist/` at http://localhost:4173 with the same clean URLs as Vercel. `npm run dev` does both.

## Deploy

The site is deployed on Vercel from the `main` branch of `benjamingjoel2/uganda`. Every push to `main` builds and deploys automatically. `vercel.json` sets:

- build command `npm run build`, output folder `dist`
- clean URLs (`/destinations/bwindi`, no `.html`), no trailing slash
- a one-year immutable cache for everything in `/assets/` (file names carry a content hash, so changes always get a new URL), and no cache for HTML
- basic security headers

## Change the brand

Everything that identifies the business is in **`site.config.mjs`**:

| Setting | What it controls |
|---|---|
| `brand` | Name, short name (header wordmark), tagline and description |
| `siteUrl` / `liveUrl` | Canonical domain and the current deployment URL |
| `contact.email` | The one email address used across the site and forms |
| `address` | Business address in the footer, enquiry page, legal pages and JSON-LD |
| `form` | Where the enquiry form sends submissions |
| `palette` | Every colour on the site (injected as CSS variables at build time) |
| `fonts` | Display and text font files in `src/assets/fonts/` |

Change a value and run `npm run build`.

## Edit content

| What | File |
|---|---|
| Destination pages (10) | `src/data/destinations.mjs` |
| Bwindi sector chooser | `src/data/sectors.mjs` |
| The Bird List (field guide) | `src/data/birds.mjs` |
| Route planner road and flight times | `src/data/routes.mjs` |
| Sample journeys | `src/data/journeys.mjs` |
| Stays (placeholder names) | `src/data/stays.mjs` |
| Journal articles | `src/data/journal.mjs` |
| Image alt text | `src/data/alts.mjs` |
| Home, destination and Bwindi layouts | `src/templates/pages.mjs` |
| Birds, planner, journeys, stays, about, journal, enquiry, credits | `src/templates/pages2.mjs` |
| Privacy Policy, Booking Terms, Cookie Policy | `src/templates/legal.mjs` |
| Header, footer, mega menus, shared components | `src/templates/ui.mjs` |
| All styles | `src/assets/css/site.css` |
| Behaviour (menus, reveals, tools, form) | `src/assets/js/*.js` |

Rules the content follows: every price reads **“From (amount)”** and only UWA permit prices are shown; no phone numbers, WhatsApp, social links, licence information, team section, reviews or testimonials; facts that need checking are listed in `FACTS-TO-VERIFY.md`.

## Photos

All photos are Creative Commons images from Wikimedia Commons, each taken at the place it illustrates. They are credited automatically on `/credits` (author, licence and source come from Commons when the image is processed).

- The list of photos is `scripts/images.json` (key → Commons file title).
- `npm run images` downloads any new entries and writes AVIF and WebP files at 480, 800, 1200 and 1600 px to `src/assets/img/`, plus metadata to `src/data/images.json`. Processed files are committed, so the Vercel build never needs to download or resize anything.
- To add a photo: add a key and Commons title to `scripts/images.json`, add alt text to `src/data/alts.mjs`, run `npm run images`, then use the key in content.
- Photos still needed (lodges, sector-specific shots, some birds) are listed in `IMAGES-NEEDED.md`.

## The enquiry form

The form posts to [FormSubmit](https://formsubmit.co), which forwards each enquiry to the email in `site.config.mjs`. With JavaScript it sends in the background and shows a confirmation on the page; without JavaScript it posts normally and returns to `/thank-you`. The route planner and destination pages pre-fill the form through the link.

If the form service does not answer within 15 seconds, the page offers the visitor a ready-written email with all their details, so no enquiry is lost.

**One-time setup:** the first submission makes FormSubmit send an activation email to nilesourcesafaris@tourground.com. Click the link in it once; after that every enquiry is delivered. To use a different service, change `form.endpoint` and `form.ajaxEndpoint` in `site.config.mjs`.

## Performance

Mobile-first and built for Core Web Vitals:

- CSS is inlined; JavaScript is small, deferred and page-specific (no frameworks, no libraries)
- the hero image is preloaded with `fetchpriority="high"`; all other images lazy-load
- every image has `srcset`/`sizes`, AVIF with a WebP fallback, and width and height to prevent layout shift
- three font files only (Rozha One 400, Mukta 400 and 600), self-hosted, preloaded, `font-display: swap`, with metric-matched fallbacks
- off-screen sections use `content-visibility: auto`
- no cookies, analytics or third-party scripts

## Design

Theme **Crown and Papyrus**: the golden crown of the crested crane as the signature shape (logo mark, dividers, favicon), papyrus stems as fine vertical lines, soft forest mist over photos. Rozha One (high-contrast display serif) for headings, Mukta for text. Palette: crane grey, crown gold, papyrus green, forest dark and swamp-water brown, all text pairs WCAG AA. Layout is left-aligned and full-bleed with small side margins.

## Project files

```
site.config.mjs        brand, contact, address, palette, fonts
scripts/build.mjs      static build → dist/
scripts/serve.mjs      local server for dist/
scripts/images.mjs     photo download + AVIF/WebP processing
src/data/              content
src/templates/         page templates
src/assets/            CSS, JS, fonts, processed images
FACTS-TO-VERIFY.md     facts to check before launch
IMAGES-NEEDED.md       photos still to source
brand/                 original brief and build prompt
```
