# Build prompt: Crested Crane (Uganda)

Prompt v1, 2026-10-26. Repo: `benjamingjoel2/uganda`. The brief is at `brand/BRIEF.md` in this repo. Read it first: it holds the research, the sources and every fact that still needs verifying.

---

## 1. What the brand is

You are building the website for **Crested Crane**, a tailor-made travel specialist for **Uganda (UG)**. The business is enquiry-led: **no prices and no booking engine.** Every page leads to the trip planner, the enquiry form or WhatsApp.

**Positioning:** *For travellers who want primates, birds and big game in one wild country: Uganda planned by forest sector, river and swamp, with the long drives cut short or flown.*

**Brand story** (use it in full on About, and an excerpt on Home):

> At Mabamba, an hour from Entebbe, the canoe slides into the papyrus before the heat. The boatman stops paddling and points. A shoebill stands in the channel, completely still, grey as wet slate. Behind it, where the swamp gives way to grazing, a pair of crested cranes walk with their gold crowns catching the low sun.
>
> Uganda's national bird stands on the flag. It feeds where the swamp meets the grass, and that is how we think about the country: it lives at its edges. Forest meets savannah at Kibale and Queen Elizabeth. The Nile is forced through a narrow gap in the rock at Murchison. Bwindi's ridges fall into Congo on one side and farmland on the other.
>
> We plan by those edges. We match you to the right Bwindi sector for your knees and your interests. We put chimps in Kibale before the gorillas and the Kazinga Channel after them. We fly the long legs, so the road is something you see, not something you endure. Then we find the bird guide who hears the pitta before anyone sees it.

Put a `verify()` flag on the Murchison gap, the flag description and Mabamba's distance until a specialist signs them off.

**Voice:**
- **Field-sharp.** Name the species, the sector, the month.
- **Plain about the road.** Say how long and how bumpy, and when to fly instead.
- **Warm, without the brochure.** People with names and jobs, not slogans.
- **Banned words:** Pearl of Africa, exotic, hidden gem, untouched, primitive, tribe, Big Five, breathtaking, unforgettable, bucket list, once in a lifetime, "jungle" for montane forest.

Sample headlines:
- "Four sectors of Bwindi. One of them is right for you."
- "Chimps first. Gorillas second. The Nile last."
- "A shoebill before breakfast."

**Currencies:** USD is primary (UWA fees and most ground quotes are in USD). GBP and EUR are display options, used only in the planner's budget-band step. No trip or stay prices anywhere. Permit fees appear only in the FAQ, quoted from `FACTS-TO-VERIFY.md` with the date checked.

## 2. Stack

Follow the pattern of `/home/user/greece` and `/home/user/sri-lanka` (read both READMEs). Do **not** use Next.js.

### Build
- A dependency-free Node (18.17+) static site generator.
- `build.mjs` renders `src/pages/*.mjs` with the data into plain HTML/CSS in `dist/`.
- Dev dependencies are allowed only for the checks (Playwright, axe-core).
- Scripts: `npm run build`, `npm run dev`, `npm run serve`, `npm run check:fast`, `npm run check`.

### `site.config.json`, the only place for:
- `brand`: name, shortName, tagline, positioning, nameStory, copyright year.
  - **The brand name lives only here.** The build fails if "Crested Crane" appears hard-coded anywhere in `src/` templates. The bird's species entry in `birds.json` uses "grey crowned crane", which the lint allows.
- `contact`: email, phone, WhatsApp, address, hours, and a licence line. **All are `[PLACEHOLDER]`.**
- `enquiry.endpoint`
- `analytics`: `{ "provider": "" | "plausible" | "ga4" | "vercel", "id": "" }`
- `site.url`, `site.basePath`
- `palette`, `contrastPairs`, `fonts`, `currencies`

### `src/data/*.json`, all content
No copy is hard-coded in templates, so a later TravelPorts migration is a data move.

| File | Holds |
|---|---|
| `destinations.json` | The 12 destinations: intro, best for, season by month, how long, getting there (road and air), linked experiences and routes, photo keys, `advisory` note |
| `experiences.json` | The 10 experiences, with fitness, minimum age and rules |
| `routes.json` | The 5 trip-planner routes |
| `sectors.json` | Four Sectors: Buhoma, Ruhija, Rushaga, Nkuringo and Mgahinga, with altitude range, terrain, access (airstrip, road), nearby, who it suits, coordinates, `verify` flags |
| `birds.json` | The Bird List: ~40 species with sites, months, likelihood in words, source, `verify` |
| `uganda.json` | Simplified Natural Earth (public domain) outline, lakes and the Nile, and park points |
| `stays.json` | Stays. Every entry is `placeholder: true` |
| `faq.json`, `journal.json` | FAQ and journal content |

### `photos.json`, an Unsplash registry until real photos exist
- Hotlink `images.unsplash.com` with a responsive `srcset`.
- Accept a photo only if the photographer's own Unsplash **location tag** names the place, and store that tag verbatim.
- Free Unsplash License only, never Unsplash+.
- Every photo has a visible credit, and `/credits/` lists them all.
- If a place has no verified photo, show a papyrus-line panel labelled "Illustration". Never show somewhere else (Rwandan gorillas and Kenyan savannah are banned unless tagged to Uganda).
- Photo direction: forest light, wet leaves, the Nile in spate, papyrus, tea on the hills, guides at work, birds in habitat. No gorilla "selfies", no staged "village visits", no Batwa as photo props.

### `FACTS-TO-VERIFY.md`
- Start from BRIEF section 8: visas and the EATV, UWA permit prices and rules, Ebola and the DRC border, security, LGBT+ law, yellow fever, the flag and IUCN status, UNESCO, Mabamba, airstrips, Murchison, bird list, seasons.
- Record where each fact is used, its official source link, and the date it was checked.
- Pages show inline `verify()` flags until each fact is signed off.

### Check scripts
- WCAG AA contrast for every `contrastPairs` entry. The check fails below 4.5:1.
- An internal link check over `dist/`.
- An axe-core audit of every page at 375px and 1280px.
- A brand-name lint.
- A font-size lint: Rozha One is never used below 32px.

## 3. Design

### Palette
Emit the palette as CSS custom properties `--c-<token>`. Never hard-code hex values in CSS or templates.

| Token | Hex | Role |
|---|---|---|
| `mist` | `#F2F1EC` | Page ground |
| `heron` | `#1E2124` | Text, header, dark bands, footer |
| `crane` | `#575C61` | Secondary text, grey bands (mist text) |
| `papyrus` | `#3B5E2B` | Links, buttons, focus ring, map land |
| `crown` | `#E2B23C` | Accent **on `heron` only**: markers, rules, display words, focus ring on dark |
| `crownink` | `#7E5C0E` | Small gold-family labels on light grounds |
| `reed` | `#DCE3C6` | Alternate section ground, cards, tags |

`contrastPairs` (text/ground):
- heron/mist 14.30
- heron/reed 12.21
- crane/mist 5.97
- crane/reed 5.10
- papyrus/mist 6.58
- papyrus/reed 5.62
- crownink/mist 5.42
- crownink/reed 4.63
- mist/heron 14.30
- mist/crane 5.97
- mist/papyrus 6.58
- mist/crownink 5.42
- crown/heron 8.22
- reed/heron 12.21
- reed/crane 5.10
- reed/papyrus 5.62

Forbidden pairs: crown on mist, reed, crane or papyrus; papyrus, crane or crownink on heron. Text over photos sits on a heron scrim of at least 65%, tested against pure white.

### Fonts (assigned)
- **Rozha One** for display: 400 only, 32px and above, sentence case, tight leading. The wordmark is Rozha One in title case.
- **Mukta** for text and UI: 400, 500 and 600, with 300 for large intro paragraphs. Labels and tags are Mukta 600 caps with +0.08em tracking.
- Load from Google Fonts with `display=swap` and preconnect, and preload Rozha One. **No third font.**

### Design references (primary first)
Use the design patterns only. **Never copy text, photos, logos, icons or code.**
- **Primary: andbeyond.com.** Full-bleed hero with a clear statement and a "Plan your trip" path, a sticky header with mega menu and enquire button, destination cards in horizontally scrolling rows, trip-idea cards with nights and highlights, editorial bands about guides and conservation, a call-back pattern (here, WhatsApp), and a deep footer with newsletter and links.
- **Secondary: singita.com.** Cinematic restraint for the dark bands: full-screen imagery, slow reveals, large display type over images, and lodge-style detail layouts for experiences.
- andBeyond's testimonial and award blocks are **not** reproduced: no invented credibility.

### House rules
- Full-width bands; text left-aligned with a 68ch maximum line length.
- No invented credibility: no testimonials, awards, press logos, review scores or "years of experience".

### Don't reuse sibling signature moves
- No elevation profile or culture calendar (Rwanda sibling), no north-to-south scroll map (Malawi), no walking-morning scroll (Zambia).
- No giant word along the bottom of the hero, no `(01)` mono labels, no fixed side tab, no expanding image panels.

### Motif
- The crown "bristle": a small fan of fine gold lines as a bullet and divider on heron bands; a papyrus-umbel line drawing on light bands.
- **No** flag or coat of arms, gorilla cartoons or "tribal" patterns.

### Two signature features (unique to this brand)

**Four Sectors (`/bwindi/`)**
- An SVG map of Bwindi and Mgahinga from `uganda.json` and `sectors.json`, with the four sectors and the airstrips (Kihihi, Kisoro) marked.
- Five cards (Buhoma, Ruhija, Rushaga, Nkuringo, Mgahinga): altitude range, terrain, access by air and road, what's nearby, who it suits, all `verify`.
- A chooser with five toggles ("easier walking", "birding", "views", "habituation", "arriving from Queen Elizabeth / from Kigali") ranks the sectors and explains the top choice in words.
- "Plan this sector" pre-fills the planner. Without JS it is a comparison table with the map.

**The Bird List (`/birds/`)**
- About 40 species from `birds.json`, filterable by site and month (CSS-only filters with `:has()`, enhanced by JS).
- Each species card: common and scientific name, sites, months, likelihood in words ("regular", "scarce", "seasonal"), source link, `verify` flag, and a line drawing or verified photo.
- Albertine Rift endemics carry a text tag, not just a colour.
- Ticking species builds a "birding interests" list that pre-fills the planner's interests step.
- Without JS it is a full list grouped by site.

## 4. Pages and content

- **Home:**
  - full-bleed hero (Bwindi forest or Mabamba papyrus at dawn)
  - the positioning line
  - the brand story excerpt
  - destinations in scrolling rows, with a map of Uganda
  - signature experiences
  - the five routes
  - teasers for Four Sectors and the Bird List
  - "how we plan" in 4 steps, with no stats
  - a closing call to action
- **Destinations:** an index and 12 pages:
  - Entebbe & Lake Victoria
  - Kampala
  - Jinja & the source of the Nile
  - Ziwa Rhino Sanctuary
  - Murchison Falls
  - Kibale & the Fort Portal crater lakes
  - Rwenzori Mountains
  - Queen Elizabeth National Park
  - Bwindi Impenetrable National Park
  - Mgahinga & Lake Mutanda
  - Lake Mburo
  - Kidepo Valley

  Each page has: intro, best for, the season strip (text labels, not colour alone), how long, getting there (road and air, no timetables), experiences, routes, placeholder stays, verified photos, an advisory note where relevant, and a call to action.
- **Experiences:** an index and 10 pages:
  - Gorilla trekking in Bwindi
  - The gorilla habituation experience
  - Chimpanzees in Kibale
  - Shoebill at Mabamba
  - Murchison Falls by boat and on foot
  - The Kazinga Channel
  - Ishasha's tree-climbing lions
  - Walking and riding in Lake Mburo
  - Bigodi Wetland
  - Kidepo by air
- **Routes:** an index and 5 pages. Each pre-fills the planner.
  1. The western edge (14–16 nights)
  2. Primates, flown (7–8)
  3. The birders' line (14–18)
  4. North by air (8–10)
  5. Mountains and lakes (10–12)
- **Trip planner (`/plan/`):** a multi-step enquiry:
  1. destinations, a Bwindi sector or a route
  2. month
  3. nights
  4. party (adults, children and ages; flags gorilla and chimp minimum ages)
  5. pace, fitness and "fly or drive"
  6. interests (primates, birds, savannah, walking, culture; birding list from `/birds/`)
  7. an optional budget band per person (USD, switchable to GBP/EUR)
  8. contact details

  It validates each step, saves progress in `localStorage`, and posts to `enquiry.endpoint`.
- `/bwindi/` and `/birds/`
- **Journal:** an index and 3 posts:
  - "Which Bwindi sector? An honest guide"
  - "Chimps in Kibale: trekking or habituation"
  - "Fly or drive? Uganda's distances, plainly"
- **About:** the full story and the name story. No invented team bios.
- FAQ, built from the topics in BRIEF section 7. Answers only restate facts listed in `FACTS-TO-VERIFY.md`, including the LGBT+ and safety answers, which link to FCDO.
- Contact / enquire
- Privacy, terms, cookies, credits, 404

## 5. From day one (phase 1, not phase 5)

1. **The enquiry form posts to `enquiry.endpoint`.**
   - It uses `fetch`, with an ordinary POST as the no-JS fallback.
   - It has inline validation, an error summary, a live-region status and a honeypot.
   - **If the endpoint is empty:**
     - the build prints a loud warning: `WARNING: enquiry.endpoint is empty. Enquiries open the visitor's email app and are NOT delivered.`
     - the form falls back to `mailto:` to `contact.email`, and the page says so
     - the README and config carry a `TODO`
   - The planner, the routes, Four Sectors and the Bird List all feed this same form.
2. **Analytics slot.** Inject the snippet only when `analytics.id` is set, and only after consent when the provider sets cookies (GA4). Plausible and Vercel Analytics need no banner. Every brand gets its own ID.
3. **Legal pages** `/privacy/`, `/terms/` and `/cookies/`, linked in the footer.
   - Draft them for UK GDPR / PECR and EU GDPR, with a clause on Uganda's Data Protection and Privacy Act 2019 for data shared with Ugandan suppliers.
   - Every company detail (legal name, company number, address, the ground operator's UTB licence, ATOL / insolvency protection) is `[PLACEHOLDER]` and marked "Draft: needs legal review".

## 6. Build phases: stop for review after each

1. **Layout, header, footer and design tokens.**
   - `site.config.json` with the palette, fonts, contrast pairs, endpoint and analytics.
   - The sticky header with mega menu and enquire button, the full-screen mobile menu, and the footer (with legal links).
   - The crown bristle and papyrus motifs, and the photo frame and credit component.
   - The check scripts and `vercel.json`.

   **Stop for review.**
2. **Homepage**, every section listed in part 4. **Stop for review.**
3. **Trip planner.**
   - The multi-step planner, tested end to end: an enquiry actually arrives, or report a blocker.
   - Route, sector and bird-list pre-fill.

   **Stop for review.**
4. **Detail pages and journal.**
   - Destinations, experiences, routes, Four Sectors, the Bird List, journal, FAQ, About, legal, credits.
   - `FACTS-TO-VERIFY.md` complete.

   **Stop for review.**
5. **Polish, accessibility, SEO and Lighthouse.**
   - Metadata, canonical URLs, sitemap, robots.
   - JSON-LD `TravelAgency`, leaving out placeholder fields rather than inventing them.
   - An OG image.
   - A clean axe audit and **mobile Lighthouse 90+**.
   - `prefers-reduced-motion` respected, and the site works without JS.
   - A README "Before launch" list of every placeholder.

   **Stop for review.**

Accessibility from phase 1:
- a skip link and visible focus (papyrus on light, crown on dark, 2px plus offset)
- 44px touch targets
- landmarks, labelled controls and live regions; scrolling card rows are keyboard operable
- no information carried by colour alone
- lazy-loaded images with width and height, except the hero
- no horizontal scroll at 360px (scrolling rows scroll inside their own container)

## 7. Final step: host on Vercel

1. Make sure `npm run build` succeeds and writes `dist/`.
2. Add `vercel.json`:
   - `"buildCommand": "npm run build"`, `"outputDirectory": "dist"`, `"cleanUrls": true`, trailing slashes
   - long caching for the hashed assets
   - basic security headers
3. Push to the GitHub repo **`benjamingjoel2/uganda`** on `main`.
4. In Vercel (team **"Benjamin - Sevo"**), import the repo with framework preset **Other**, and deploy.
5. On the live `*.vercel.app` URL, check every page, check for broken links, and submit the enquiry form.
6. Put the URL in `site.config.json` (`site.url`) and the README, then push again to redeploy.

## Design fidelity: match the primary reference closely (overrides any looser wording above)
The first design reference listed above is the **primary reference**. The site must read as the same design as that site when compared side by side: header and nav, hero composition, section order and rhythm, grid and containers, type scale (mapped onto this brand's fonts), cards, buttons, footer and motion. Before building, open the primary reference with Playwright, screenshot it at 1440 and 390 wide, and measure its type sizes, spacing and container widths. If the primary reference will not load, use the second reference as primary and say so. Then compare your own screenshots against it after every phase and fix the differences. Keep this brand's own name, palette, fonts, copy and photos. Never copy the reference's text, photos, logos, icons or source code: rebuild the design yourself. Full rules are in brands-pipeline/REF-MATCH.md in benjamingjoel2/jarvis.

Every page in the list above must be built completely with real content: no empty sections, no lorem ipsum. Before you finish, open every page with Playwright at both widths and confirm there are no console errors, no broken images or links, and no horizontal scroll on mobile.
