# Facts to verify before launch

Every fact below appears on the site and must be checked against an official source. Prices follow the site rule: they read **“From (amount)”** and come only from the Uganda Wildlife Authority (UWA). Where a figure changes, edit it in the file listed and run `npm run build`.

Last drafted: 6 November 2026.

## Permits and prices (UWA)

Source: https://ugandawildlife.org (tariffs), confirmed with a registered operator.

| Fact on site | Where it appears | File |
|---|---|---|
| Gorilla trekking permit **from USD 800** per person | Home (“What people come for”), Bwindi, Mgahinga | `src/templates/pages.mjs`, `src/data/destinations.mjs` |
| Gorilla habituation experience **from USD 1,500** per person | Home, Bwindi | same |
| Chimpanzee tracking (Kibale) **from USD 250** per person. Reports say USD 300 from January 2027: check and update | Home, Kibale | same |
| Golden monkey permit is “lower cost” than gorillas (no figure shown) | Mgahinga | `src/data/destinations.mjs` |
| Minimum ages: **15** for gorilla trekking, **12** for chimpanzee tracking | Booking Terms | `src/templates/legal.mjs` |
| Up to **8** visitors per gorilla family per day; **one hour** with the family | Bwindi | `src/data/destinations.mjs` |
| Habituation experience: **up to four hours**, up to **4** visitors, run in the southern sectors (Rushaga) | Bwindi, sector chooser | `src/data/destinations.mjs`, `src/data/sectors.mjs` |
| Permits paid in full when reserved, generally non-refundable; rescheduling fee | Booking Terms | `src/templates/legal.mjs` |

## Entry, health and safety

| Fact | Source |
|---|---|
| Uganda e-visa applied for online before travel; East Africa Tourist Visa covers Uganda, Kenya and Rwanda | https://visas.immigration.go.ug, https://www.gov.uk/foreign-travel-advice/uganda/entry-requirements |
| Yellow fever vaccination certificate required | https://travelhealthpro.org.uk/countries |
| Passport valid six months beyond return (stated as “typically”) | FCDO entry requirements |
| **DRC border status.** The brief records the Uganda–DRC border closed on 27 May 2026 (Ebola) with limited exceptions. The site does not state the status; Booking Terms say we monitor advice. Check before every booking in the west (Bwindi, Mgahinga, Rwenzori, Ishasha) | https://www.gov.uk/foreign-travel-advice/uganda/safety-and-security, https://travel.state.gov, https://www.health.go.ug |
| Karamoja (Kidepo) travel advice: Kidepo page tells visitors to check it | FCDO, US State Department |
| **LGBT+ travellers.** About page, “Before you go”: same-sex relationships criminalised; Anti-Homosexuality Act 2023 added severe penalties; advice to avoid public displays of affection. Check wording against current FCDO and US advice | https://www.gov.uk/foreign-travel-advice/uganda/local-laws-and-customs |
| US dollar notes printed 2013 or later (older notes often refused) | About, “Before you go” |
| Yellow fever certificate and malaria advice | About, “Before you go” |
| Gorilla viewing rules (distance, masks, illness) referenced in Booking Terms | UWA |

## Seasons

Source: Uganda National Meteorological Authority, https://www.unma.go.ug

- Drier seasons “roughly June to September and December to February”; wetter “March to May and October to November” (journal article *When to go*, destination glance rows, journeys).
- Kidepo’s dry season “roughly September to March”.
- Lake Bunyonyi “generally considered free of bilharzia, but check locally”.

## Places and numbers

| Fact | Where | Source to check |
|---|---|---|
| Bwindi ~330 km², UNESCO World Heritage Site, roughly half the world’s mountain gorillas | Bwindi | https://whc.unesco.org/en/list/682, UWA |
| Bwindi altitude ~1,160–2,600 m | Bwindi | UWA |
| Mgahinga ~34 km²; Muhavura 4,127 m; motto “where gold meets silver” | Mgahinga | UWA |
| Kibale ~795 km²; 13 primate species | Kibale | UWA |
| Queen Elizabeth: 600+ bird species; Kazinga Channel ~32 km | Queen Elizabeth | UWA, NatureUganda |
| Murchison ~3,840 km², Uganda’s largest park | Murchison | UWA |
| Lake Bunyonyi ~1,950 m; 29 islands; name translated “place of many little birds” | Bunyonyi | Kabale District / Uganda Tourism Board |
| Margherita Peak 5,109 m, Africa’s third-highest summit; Rwenzori UNESCO site; summit circuit 7–9 days | Rwenzori | https://whc.unesco.org/en/list/684, UWA |
| Jinja: Speke reached the outflow in 1862; springs now under the dam reservoir; Nile ~6,000+ km | Jinja | Uganda Museum / UTB |
| Kidepo ~1,440 km²; cheetah, ostrich and bat-eared fox found only here among Uganda’s parks | Kidepo | UWA |
| Mabamba Swamp is a Ramsar site about an hour from Entebbe | Kampala & Entebbe, journal | https://rsis.ramsar.org |
| Grey crowned crane is on Uganda’s flag and is IUCN Endangered | Bird list, About | https://www.iucnredlist.org |
| Hero caption coordinates for Kampala: 00°19′N 32°35′E | Home | any gazetteer |

## Road and flight times

All drive and flight times are planning estimates. Check against current road conditions and the published schedules of the scheduled domestic airlines (Entebbe, Kasese, Kihihi, Kisoro, Pakuba, Kidepo).

- Sector chooser drive times, altitudes and difficulty: `src/data/sectors.mjs`
- Route planner road-hour table and flight durations: `src/data/routes.mjs`
- Destination “Getting there” rows: `src/data/destinations.mjs`

## Birds

Every species entry in `src/data/birds.mjs` (sites, months, likelihood wording) should be checked against eBird regional data and NatureUganda, in particular:

- Green-breasted pitta months at Kibale (shown May–September).
- Northern carmine bee-eater as a December–March visitor in Murchison.
- African skimmer seasonality (shown November–April).
- Karamoja apalis around Kidepo.

## Legal pages

Privacy Policy, Booking Terms and Cookie Policy are complete drafts written for a Kampala-based operator. Before launch, have them reviewed by a Ugandan lawyer, in particular the cancellation scale, the balance due date (60 days), insurance requirements and references to Uganda’s Data Protection and Privacy Act, 2019. If analytics or cookies are ever added, update the Cookie Policy first.

## Business address

Spaces AHA Towers, 4th Floor, AHA Towers, Plot 7 Lourdel Road, Nakasero, Kampala, Uganda. Confirm the plot number and that a virtual office or desk is contracted there before using it as the registered address.
