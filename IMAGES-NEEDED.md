# Images needed

The site uses only photos it is clearly allowed to use: Creative Commons photos from Wikimedia Commons, each taken at the place it illustrates and credited on `/credits`. No image has been copied from a venue’s own website.

## Stays: no property photos yet

The stay names on the site are **placeholders** (marked “Placeholder name” on every card). Until real partner lodges are confirmed, each card shows a correct photo of the **location**, not the property. When a lodge is confirmed, get a photo you are allowed to use (the lodge’s media kit or press terms, a booking-platform partner feed, or a Creative Commons image) and add it.

| Placeholder stay | Location | Photo used now (location) |
|---|---|---|
| Entebbe Garden House | Entebbe | Lake shore, Entebbe Botanical Gardens |
| Kampala Hill Hotel | Kololo, Kampala | View over Kampala |
| Buhoma Forest Edge Lodge | Buhoma, Bwindi | Ferns on the Buhoma trail |
| Ruhija Ridge Camp | Ruhija, Bwindi | Mist rising from Bwindi |
| Rushaga Valley Lodge | Rushaga, Bwindi | Mountain gorilla, Bwindi |
| Nkuringo View Lodge | Nkuringo, Bwindi | Mountain gorilla, Bwindi |
| Mgahinga Volcano Cottages | Mgahinga | Virunga volcanoes from Mgahinga |
| Kibale Crater Lodge | Crater lakes near Kibale | Lake Nkuruba |
| Mweya Channel Lodge | Mweya, Queen Elizabeth | Kazinga Channel |
| Ishasha River Camp | Ishasha, Queen Elizabeth | Tree-climbing lions, Ishasha |
| Paraa River Lodge | Paraa, Murchison Falls | The Nile below the falls |
| Bunyonyi Island Cottages | Lake Bunyonyi | Lake Bunyonyi islands at dusk |
| Rwenzori Foothill Lodge | Rwenzori foothills | Giant groundsels, Rwenzori |
| Jinja Riverbank House | Jinja | Rapids on the Nile below Jinja |
| Kidepo Valley Camp | Kidepo | Sunset, Kidepo Valley |

To replace one: add the image to `scripts/images.json` (or drop processed files into `src/assets/img/` following the `key-WIDTH.avif|webp` pattern and add an entry to `src/data/images.json`), then set the stay’s `image` in `src/data/stays.mjs`.

## Nice to have (better location matches)

| Wanted | Why |
|---|---|
| A sector-specific photo for **Ruhija**, **Rushaga** and **Nkuringo** | The sector chooser currently uses Bwindi photos without a known sector (only Buhoma’s is sector-specific). |
| A **crested crane taking off over papyrus at dawn**, in Uganda | The home hero uses a real Ugandan crane with its wings raised near Lake Bunyonyi. A dawn take-off over papyrus would match the brief exactly. Commission or license one (Uganda Wildlife Authority, Uganda Tourism Board media library, or a local photographer). |
| Shoebill photographed **at Mabamba** at closer range | The shoebill photo used is from Uganda; a sharp Mabamba image would be better for the Entebbe page. |
| Entebbe Botanical Gardens with turaco or colobus | Current Entebbe photo is a quiet lake shore. |
| Bird photos for species without one | Black-billed turaco, green-breasted pitta, African green broadbill, regal sunbird, handsome spurfowl, papyrus gonolek, African fish eagle, martial eagle, saddle-billed stork, African skimmer, ostrich, secretarybird, Karamoja apalis. These show the crown motif until a licensed, Uganda-taken photo is found. |
