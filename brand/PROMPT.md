Name this Claude chat: Nile Source Safaris (Uganda)

Build a travel website for Uganda in this repo, from scratch.

Brand:
- Nile Source Safaris (Uganda is where the Nile begins)

Positioning: Uganda as the primate and birding capital of Africa: gorillas in Bwindi, chimps in Kibale, the Nile at its source and tree-climbing lions, with real guides.

Pages: home, Kampala and Entebbe, Bwindi Impenetrable Forest, Mgahinga, Kibale Forest, Queen Elizabeth National Park, Murchison Falls, Lake Bunyonyi, the Rwenzori Mountains, Jinja and the source of the Nile, Kidepo Valley, sample journeys, stays (placeholder names), about, journal, enquiry form.

Signature features:
1. A Bwindi sector chooser: Buhoma, Ruhija, Rushaga and Nkuringo compared by trek difficulty, lodges and drive time.
2. A bird list: Uganda's big birds (shoebill, crested crane, turacos) with where and when to see them, built as a filterable field guide.
3. A gorilla-and-chimp combiner that orders parks in the best route with road and flight times.

References and layout:
Primary references for this site: safari.com, thetailor.com, affable-wealth-322227.framer.app.
Copy the design of the primary references exactly: page structure, section order, layout grids, navigation and menus, hero treatment, image sizes and crops, type scale, spacing, buttons, hover and scroll animations, and page transitions. Take each part from whichever primary reference does it best, then make the whole site consistent, as if one designer made it, with no mismatched pieces. Open every primary reference (in a browser if you can) and study its home page and inner pages before writing code. When you finish, compare your pages with the references side by side and fix every difference in structure or layout. Use the other sites below only for small extra details.
Layout rules: no centred content. Left-align headings and text. Use full-width layouts where images and sections run edge to edge. Keep side margins small (about 16-24px on mobile and 32-48px on desktop); never put the content in a narrow centred column with wide empty space on the left and right.
Copy the design, not the content: write your own text, use photos as the rules below say, and never use the references' logos, brand names, photos, text or code.
All references: aman.com, belmond.com, sixsenses.com, almahospitality.it, thedrake.ca, safari.com, white-desert.com, elementis.co, flyward.com, thetailor.com, sabbatical.travel, selvora-zeta.vercel.app, vita-travel.webflow.io, stillwild.framer.website, affable-wealth-322227.framer.app, enchanting-impact-453443.framer.app, wonderful-tenets-610450.framer.app, kultiveret.com, mathieu-crepel.com, mountainbikeworldwide.com, localadventure.mammut.com, eaglesnest.sergesyutkin.com, sylverrappresentanze.it. For more ideas, browse awwwards.com.

Theme (sets this brand's colours, typefaces and motifs inside the reference layout; where the theme describes a layout, the primary references win): CROWN AND PAPYRUS. The golden crown of the crested crane as the signature shape, papyrus stems as vertical lines in layouts, and soft forest mist over images. A bold high-contrast display serif for headlines and a clear sans for text. The home page shows a crested crane lifting off from a papyrus swamp at dawn, its crown catching the light. Palette: crane grey, crown gold, papyrus green, forest dark, swamp-water brown. Do NOT use the generic template: no centred hero with headline and two buttons, no row of three rounded feature cards, no Inter or Poppins.

Rules: static site, fast and mobile-first, WCAG AA contrast. Photos: high quality only, and only where the photo's location matches the place it's used for. Unsplash photos carry no credit line on the site; Creative Commons (e.g. Wikimedia) photos are credited on a small credits page. Where the site names a hotel, lodge, restaurant or café, show that real place only with an image you are clearly allowed to use (the venue's media kit or press terms, a booking-platform partner feed, or Creative Commons); never copy images from a venue's own website. If none exists, show a correct photo of the location and list the venue in IMAGES-NEEDED.md. No invented reviews, press logos or awards. Put the brand name, contact details and palette in one config file so the brand can be swapped. List every fact that needs checking (gorilla and chimp permit prices, e-visa rules, DRC border status, rainy seasons, LGBT+ travel advice) in FACTS-TO-VERIFY.md. Write a README explaining how to run and edit the site.

Owner's rules (these override anything above):
1. Speed first: Lighthouse mobile 90+, LCP under 2.5s, CLS under 0.1, first load under ~1.5 MB. Right-sized images (srcset/sizes, AVIF/WebP), width and height on every image, lazy-load below the fold, hero image preloaded with fetchpriority high, only the font weights used with font-display swap, no render-blocking JS, heavy libraries and video loaded on demand (poster only on mobile), long cache headers for static assets in vercel.json.
2. No phone numbers, no WhatsApp links or buttons, no licence information, no team section, no social media links, no testimonials or reviews.
3. Complete Privacy Policy, Booking Terms and Cookie Policy pages with the brand name, email and address below, no placeholders, all linked in the footer.
4. No "Photographs from Unsplash" or other Unsplash credit text.
5. The only email address is nilesourcesafaris@tourground.com; the site URL format is nilesourcesafaris.tourground.com.
6. Images of named hotels, restaurants, cafés and places follow the photo rules above.
7. Every price reads "From (amount)"; never invent prices.
8. Business address: the most premium coworking space in Uganda (flagship space in the capital or main business city); research it and use its exact street address in the config, footer, contact page, legal pages and JSON-LD.
9. Four languages: English (default), French, German, Spanish. Every page in all four (English at the root, /fr/, /de/, /es/), all copy translated naturally including nav, forms, legal pages, meta and alt text; a keyboard-accessible EN · FR · DE · ES selector in the header and mobile menu that links to the same page in the other language; correct html lang, hreflang (x-default English) and canonical; every locale pre-rendered with no translation library in the browser; no automatic redirect by browser language.

When you're done, host it on Vercel: make sure the build command works, add a vercel.json (build command, output folder, clean URLs), push everything to main on GitHub (benjamingjoel2/uganda), import the repo into Vercel under the team "Benjamin - Sevo" and deploy it. Then open the live URL, check every page and the enquiry form there, and put the live URL in the config file and the README.
