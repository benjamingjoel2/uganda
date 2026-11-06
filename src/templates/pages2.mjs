import config from '../../site.config.mjs';
import { destinations, bySlug } from '../data/destinations.mjs';
import { birds, groups } from '../data/birds.mjs';
import { journeys } from '../data/journeys.mjs';
import { stays } from '../data/stays.mjs';
import { articles } from '../data/journal.mjs';
import * as routes from '../data/routes.mjs';
import alts from '../data/alts.mjs';
import { esc, html, picture, layout, crown, stems, linkArrow, btn, sectionHead, cta, crumbs, breadcrumbLd, addressLines, ctx } from './ui.mjs';
import { articleCard, journeyCard, stayRow, MONTHS, fmtDate, pad2 } from './pages.mjs';

const plainHead = ({ eyebrow, title, lede, items }) => `<header class="page-head has-stems">${stems('right', 5)}${crumbs(items, true)}<span class="eyebrow mt-m">${esc(eyebrow)}</span><h1 class="h1">${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}</header>`;

const imageHero = ({ img, fig, figR, items, eyebrow, title, lede, meta, cta: c }) => `<section class="hero hero--inner" aria-labelledby="t">
  ${picture(img, { sizes: '100vw', eager: true, priority: true })}
  <div class="hero__top"><p class="fig"><b>Fig. 01</b>${esc(fig)}</p><p class="fig">${esc(figR || '')}</p></div>
  ${crumbs(items)}
  <div class="hero__body">${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}<h1 class="h1 hero__title" id="t">${title}</h1>${lede ? `<p class="hero__lede">${lede}</p>` : ''}</div>
  <div class="hero__bar"><ul class="hero__meta">${(meta || []).map((m) => `<li>${esc(m)}</li>`).join('')}</ul>${c || ''}</div>
</section>`;

// ── Birds: the field guide ──────────────────────────────────────────────
export function birdsPage() {
  const items = [['Home', '/'], ['The Bird List', '/birds']];
  const sites = destinations.filter((d) => birds.some((b) => b.sites.includes(d.slug)));
  const body = html`
${imageHero({ img: 'shoebill', fig: 'Shoebill in a Ugandan wetland', figR: `${birds.length} species`, items, eyebrow: 'The Bird List', title: 'Uganda’s big birds, and where to find them.', lede: 'A field guide to the birds people cross the world for: the shoebill, the crested crane, three turacos and the Albertine Rift endemics. Filter by place, month or type.', meta: ['Shoebill', 'Crested crane', 'Turacos', 'Rift endemics'], cta: btn('/enquire?interest=birding', 'Plan a birding trip', 'btn--light') })}
<section class="section wrap" aria-labelledby="guide-title">
  <h2 class="sr-only" id="guide-title">Field guide</h2>
  <form class="filters" data-bird-filters aria-label="Filter the bird list">
    <div class="filters__row">
      <label>Where<select name="site"><option value="">All places</option>${sites.map((d) => `<option value="${d.slug}">${esc(d.short)}</option>`).join('')}</select></label>
      <label>When<select name="month"><option value="">Any month</option>${MONTHS.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('')}</select></label>
      <label>Type<select name="group"><option value="">All types</option>${groups.map((g) => `<option value="${g.id}">${esc(g.label)}</option>`).join('')}</select></label>
      <button class="chip" type="reset">Clear</button>
      <p class="filters__count" aria-live="polite" data-count>${birds.length} species</p>
    </div>
  </form>
  <div class="birds" data-birds>${birds.map((b) => html`<article class="bird" id="${b.id}" data-sites="${b.sites.join(' ')}" data-months="${b.months.join(' ')}" data-group="${b.group}">
    ${b.image ? `<div class="bird__media">${picture(b.image, { sizes: '(min-width:1100px) 32vw, (min-width:700px) 48vw, 100vw' })}</div>` : `<div class="bird__media bird__media--none" aria-hidden="true">${crown()}</div>`}
    <div class="bird__body">
      <p class="bird__like">${esc(b.likelihood)}</p>
      <h3>${esc(b.name)}</h3><i lang="la">${esc(b.latin)}</i>
      <p class="bird__where"><strong>Where:</strong> ${esc(b.where)}</p>
      <p>${esc(b.note)}</p>
      <div><span class="sr-only">Months when regular: ${b.months.length === 12 ? 'all year' : b.months.map((m) => MONTHS[m - 1]).join(', ')}.</span><div class="months" aria-hidden="true">${MONTHS.map((m, i) => `<span class="${b.months.includes(i + 1) ? 'on' : ''}">${m[0]}</span>`).join('')}</div></div>
      <div class="bird__sites">${b.sites.map((s) => `<a href="/destinations/${s}"><span class="tag">${esc(bySlug[s].short)}</span></a>`).join('')}</div>
    </div>
  </article>`).join('')}</div>
  <p class="empty" hidden data-empty>No birds match those filters. Try another month or place.</p>
  <p class="note mt-m">Likelihood is given in words because birds do not keep timetables. Months show when a species is regular, not guaranteed. Sources to check: eBird regional data and NatureUganda.</p>
</section>
${cta({ title: 'A bird guide who hears it first.', text: 'Tell us your target list. We will match the route, the months and a specialist guide to it.', image: 'crane-flight', fig: 'Grey crowned crane over Bigodi Wetland' })}`;
  return { path: '/birds', html: layout({ path: '/birds', title: 'The Bird List: a field guide to Uganda’s big birds', description: 'Where and when to see Uganda’s big birds: shoebill, grey crowned crane, great blue, Ross’s and Rwenzori turacos, green-breasted pitta and more. Filter by place, month and type.', body, heroImage: 'shoebill', scripts: ['birds'], jsonld: [breadcrumbLd(items)] }) };
}

// ── Route planner (gorilla & chimp combiner) ────────────────────────────
export function plannerPage() {
  const items = [['Home', '/'], ['Route planner', '/route-planner']];
  const data = { stops: routes.stops, gateways: routes.gateways, road: routes.road, flights: routes.flights, airstrips: routes.airstrips };
  const opt = (type, name, value, label, checked) => `<label class="opt"><input type="${type}" name="${name}" value="${value}"${checked ? ' checked' : ''}><span>${esc(label)}</span></label>`;
  const body = html`
${imageHero({ img: 'gorilla-tree', fig: 'Mountain gorilla, Bwindi', figR: 'Gorilla & chimp combiner', items, eyebrow: 'The route planner', title: 'Gorillas and chimps, in the best order.', lede: 'Choose your gorilla sector and the places you want to add. We put them in the order that works on the ground and show the road and flight time for every leg.', meta: ['Kibale chimps', 'Bwindi gorillas', 'Road & flight times'] })}
<section class="section wrap">
  <div class="planner" data-planner>
    <form data-planner-form aria-label="Route options">
      <fieldset><legend>Fly in to</legend><div class="opts">${opt('radio', 'start', 'entebbe', 'Entebbe, Uganda', true)}${opt('radio', 'start', 'kigali', 'Kigali, Rwanda')}</div></fieldset>
      <fieldset><legend>Fly home from</legend><div class="opts">${opt('radio', 'end', 'entebbe', 'Entebbe, Uganda', true)}${opt('radio', 'end', 'kigali', 'Kigali, Rwanda')}</div></fieldset>
      <fieldset><legend>Gorillas: which Bwindi sector?</legend><div class="opts">${['buhoma', 'ruhija', 'rushaga', 'nkuringo'].map((s, i) => opt('radio', 'sector', s, s[0].toUpperCase() + s.slice(1), i === 0)).join('')}</div><p class="note mt-s">Not sure? <a href="/destinations/bwindi#sectors">Use the sector chooser</a>.</p></fieldset>
      <fieldset><legend>Chimpanzees</legend><div class="opts">${opt('checkbox', 'fixed', 'kibale', 'Kibale Forest', true)}</div><p class="note mt-s">Always included: this is a gorilla-and-chimp route.</p></fieldset>
      <fieldset><legend>Add</legend><div class="opts">${['jinja', 'murchison', 'qenp', 'mgahinga', 'bunyonyi'].map((id) => { const s = routes.stops.find((x) => x.id === id); return opt('checkbox', 'add', id, s.short, id === 'qenp'); }).join('')}</div></fieldset>
      <fieldset><legend>How to travel</legend><div class="opts">${opt('radio', 'mode', 'fly', 'Fly the long legs', true)}${opt('radio', 'mode', 'road', 'Road all the way')}</div></fieldset>
    </form>
    <div>
      <span class="eyebrow">Your route</span>
      <div class="totals" aria-live="polite" data-totals><div><b data-t-nights>–</b><span>Nights, suggested</span></div><div><b data-t-road>–</b><span>Hours on the road</span></div><div><b data-t-air>–</b><span>Hours in the air</span></div></div>
      <ol class="itin" data-itin><li class="itin__stop"><span class="itin__n">·</span><span class="itin__name">Turn on JavaScript to build a route, or see our <a href="/journeys">sample journeys</a>.</span></li></ol>
      <p class="mt-m">${btn('/enquire', 'Send this route to a planner', '')}</p>
      <p class="note mt-m">All times are planning estimates from experience on these roads and published scheduled flights. Flights run on set days and may stop at other airstrips on the way. We confirm every leg when we book.</p>
    </div>
  </div>
  <script type="application/json" id="route-data">${JSON.stringify(data)}</script>
</section>
${cta({ title: 'Want us to check it?', text: 'Send the route and your dates. We will check permits and flights and come back with a costed plan.' })}`;
  return { path: '/route-planner', html: layout({ path: '/route-planner', title: 'Gorilla & chimp route planner', description: 'Combine gorillas in Bwindi with chimpanzees in Kibale. Our planner orders the parks in the best route from Entebbe or Kigali and shows road and flight times.', body, heroImage: 'gorilla-tree', scripts: ['planner'], jsonld: [breadcrumbLd(items)] }) };
}

// ── Journeys ────────────────────────────────────────────────────────────
export function journeysPage() {
  const items = [['Home', '/'], ['Journeys', '/journeys']];
  const body = html`
${imageHero({ img: 'giraffe', fig: 'Rothschild’s giraffe, Murchison Falls', figR: `${journeys.length} journeys`, items, eyebrow: 'Sample journeys', title: 'Six routes we would take ourselves.', lede: 'Each is a starting point. We rebuild it around your dates, pace and the permits available, and cost it only then.', meta: ['8 to 16 nights', 'Flights where they help', 'Permits secured first'] })}
<section class="section wrap">
  ${sectionHead({ eyebrow: 'At a glance', title: 'Pick a shape.', aside: 'Prices depend on dates, lodges and permits, so we quote each journey to you rather than print a number that will not hold.' })}
  <div class="journeys">${journeys.map(journeyCard).join('')}</div>
</section>
<section class="wrap" aria-label="Journey details">
  ${journeys.map((j) => html`<article class="jdetail" id="${j.slug}">
    <div class="jdetail__media" data-reveal>${picture(j.image, { sizes: '(min-width:1000px) 40vw, 100vw' })}</div>
    <div data-reveal style="--d:.1s">
      <span class="eyebrow">${j.nights} nights · ${esc(j.season)}</span>
      <h2 class="h2">${esc(j.name)}</h2>
      <p class="lede mt-m">${esc(j.summary)}</p>
      <p class="journey__route mt-m">${j.route.map((s) => `<a href="/destinations/${s}" style="text-decoration:none">${esc(bySlug[s].short)}</a>`).join(' → ')}</p>
      <ol class="days">${j.days.map(([d, t]) => `<li><b>${esc(d)}</b><span>${esc(t)}</span></li>`).join('')}</ol>
      <p class="mt-m">${btn(`/enquire?journey=${j.slug}`, 'Start from this journey')}</p>
    </div>
  </article>`).join('')}
</section>
${cta()}`;
  return { path: '/journeys', html: layout({ path: '/journeys', title: 'Sample journeys in Uganda', description: 'Six sample Uganda journeys from 8 to 16 nights: primates by air, the western edge, the birders’ line, north by air, mountains and lakes, and source to forest.', body, heroImage: 'giraffe', jsonld: [breadcrumbLd(items)] }) };
}

// ── Stays ───────────────────────────────────────────────────────────────
export function staysPage() {
  const items = [['Home', '/'], ['Stays', '/stays']];
  const byPlace = destinations.map((d) => [d, stays.filter((s) => s.place === d.slug)]).filter(([, l]) => l.length);
  const body = html`
${imageHero({ img: 'buhoma-trek', fig: 'Ferns on the trail at Buhoma, Bwindi', figR: `${stays.length} stays`, items, eyebrow: 'Stays', title: 'Close to the trailhead.', lede: 'We choose where you sleep by position first: walking distance to the gorilla briefing, above the channel, on the ridge with the view.', meta: ['Forest lodges', 'River camps', 'Island cottages'] })}
<section class="section wrap">
  <p class="lede" style="max-width:56ch">The names on this page are placeholders while partner lodges are confirmed. Photographs show the place, not the property.</p>
  ${byPlace.map(([d, list]) => `<div class="stay-group" data-reveal><div><span class="eyebrow">${esc(d.region)}</span><h2 class="h3"><a href="/destinations/${d.slug}">${esc(d.short)}</a></h2></div><ol class="rows">${list.map((s, i) => `<li id="${s.id}" style="scroll-margin-top:calc(var(--hdr) + 24px)">${stayRow(s, i).replace(/^<li>|<\/li>$/g, '')}</li>`).join('')}</ol></div>`).join('')}
</section>
${cta()}`;
  return { path: '/stays', html: layout({ path: '/stays', title: 'Where to stay in Uganda', description: 'Lodges and camps chosen for their position: forest-edge lodges in Bwindi, a channel-side lodge in Queen Elizabeth, island cottages on Lake Bunyonyi.', body, heroImage: 'buhoma-trek', jsonld: [breadcrumbLd(items)] }) };
}

// ── About ───────────────────────────────────────────────────────────────
export function aboutPage() {
  const items = [['Home', '/'], ['About', '/about']];
  const principles = [
    ['We plan by sector, not by country', 'Uganda rewards precision. The difference between Buhoma and Nkuringo is a whole day of your life. We start from the trail and work outwards.'],
    ['We say how long the road is', 'Kampala to Bwindi is a full day by road. We tell you that, and then we tell you where we would fly instead.'],
    ['We put the guide first', 'A good driver-guide or bird guide changes a trip more than any lodge. We choose them for your interests, by name.'],
    ['We check before we promise', 'Permit prices, border status and travel advice change. We check official sources for your dates, and we tell you what we checked.'],
  ];
  const body = html`
${imageHero({ img: 'crane-head', fig: 'Grey crowned crane, Echuya Forest Reserve', figR: 'Kampala, Uganda', items, eyebrow: 'About', title: 'Named for where the river starts.', lede: `The Nile leaves Lake Victoria at Jinja, an hour and a half from our desk in Kampala. ${esc(config.brand.name)} plans journeys from that source outwards.`, meta: ['Based in Kampala', 'Uganda only'] })}
<section class="section wrap">
  <div class="grid intro">
    <div class="intro__text" data-reveal>
      <div class="crown-rule">${crown()}</div>
      <span class="eyebrow">Our story</span>
      <h2 class="h2">A shoebill, a crane and a country that lives at its edges.</h2>
      <p class="lede">At Mabamba, an hour from Entebbe, the canoe slides into the papyrus before the heat. The boatman stops and points. A shoebill stands in the channel, grey as wet slate. Behind it, where the swamp gives way to grazing, a pair of crested cranes walk with their gold crowns catching the low sun.</p>
      <p class="muted">The crested crane stands on Uganda’s flag. It feeds where the swamp meets the grass, and that is how we think about the country. Forest meets savannah at Kibale and Queen Elizabeth. The Nile is forced through a narrow gap at Murchison. Bwindi’s ridges fall away to Congo on one side and farmland on the other.</p>
      <p class="muted">We plan by those edges, for travellers who want primates, birds and big landscapes in one wild country, with the long drives cut short or flown.</p>
    </div>
    <div class="intro__media" data-reveal style="--d:.12s">${picture('mabamba-canoe', { sizes: '(min-width:900px) 40vw, 100vw' })}<p class="fig muted mt-s"><b>Fig. 02</b>Mabamba Swamp, first light</p></div>
  </div>
</section>
<section class="section bg-papyrus on-dark has-stems">
  ${stems('right', 8)}
  <div class="wrap">
    ${sectionHead({ eyebrow: 'How we plan', title: 'Four rules.', count: '04' })}
    <ol class="rows">${principles.map(([t, d], i) => `<li data-reveal><div class="row" style="grid-template-columns:64px 1fr"><span class="row__n">${pad2(i + 1)}</span><span class="row__title">${esc(t)}<small>${esc(d)}</small></span></div></li>`).join('')}</ol>
  </div>
</section>
<section class="section wrap">
  ${sectionHead({ eyebrow: 'How it works', title: 'From first email to the forest.' })}
  <div class="grid">
    <ol class="steps" style="grid-column:1/-1">
      <li><strong>You write to us.</strong> Dates, who is travelling, what you hope to see, how you feel about long drives and steep trails.</li>
      <li><strong>We send a first route.</strong> One planner, one route, with the reasoning: which Bwindi sector, which order, where to fly.</li>
      <li><strong>We secure permits first.</strong> Gorilla and chimp permits are limited. Once you are happy with the route, they are booked before anything else.</li>
      <li><strong>We confirm the rest.</strong> Lodges, flights, guides and transfers, with written booking terms and a clear payment schedule.</li>
      <li><strong>You travel.</strong> Your guide meets you at Entebbe or Kigali. Your planner is a message away throughout.</li>
    </ol>
  </div>
  <p>${linkArrow('/booking-terms', 'Read our booking terms')}</p>
</section>
<section class="section bg-reed" id="before-you-go" aria-labelledby="byg-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Before you go', title: '<span id="byg-title">The honest list.</span>', aside: 'Rules and advice change. We check official sources for your dates and nationality, and so should you. These are the questions we are asked most.' })}
    <ul class="glance">
      <li><b>Visas</b><span>Uganda issues visas online through its official e-visa portal, <a class="link-u" href="https://visas.immigration.go.ug" rel="noopener">visas.immigration.go.ug</a>. The East Africa Tourist Visa covers Uganda, Kenya and Rwanda on one trip. Apply before you fly.</span></li>
      <li><b>Permits</b><span>Gorilla and chimpanzee permits are issued by the <a class="link-u" href="https://ugandawildlife.org" rel="noopener">Uganda Wildlife Authority</a>, which sets prices and minimum ages. Gorilla trekking: From USD 800 per person. Chimpanzee tracking: From USD 250 per person. They are limited, so we book them first.</span></li>
      <li><b>Borders &amp; safety</b><span>Bwindi, Mgahinga, Ishasha and the Rwenzoris lie near the border with the Democratic Republic of Congo, and Kidepo near South Sudan. Border status and advice can change quickly. Read the <a class="link-u" href="https://www.gov.uk/foreign-travel-advice/uganda" rel="noopener">UK Foreign Office advice</a> or your own government’s before booking and again before you travel.</span></li>
      <li><b>Health</b><span>A yellow fever vaccination certificate is required, and malaria prevention is recommended in most areas. Check <a class="link-u" href="https://travelhealthpro.org.uk/countries" rel="noopener">TravelHealthPro</a> or your travel clinic. Gorilla treks are refused to anyone who appears unwell, to protect the gorillas.</span></li>
      <li><b>LGBT+ travellers</b><span>Same-sex relationships are criminalised in Uganda, and the Anti-Homosexuality Act 2023 added severe penalties. Many LGBT+ travellers visit without incident, but the risk is real and public displays of affection are best avoided. Read the <a class="link-u" href="https://www.gov.uk/foreign-travel-advice/uganda/local-laws-and-customs" rel="noopener">official local laws advice</a>, and talk to us in confidence: we will plan with discretion and tell you plainly what to expect.</span></li>
      <li><b>Money</b><span>The currency is the Uganda shilling. US dollars are widely used for park fees and lodges; bring notes printed in 2013 or later, as older notes are often refused.</span></li>
    </ul>
  </div>
</section>
${cta()}`;
  return { path: '/about', html: layout({ path: '/about', title: 'About', description: `${config.brand.name} plans Uganda journeys from Kampala: gorillas by sector, chimps first, the long legs flown and real guides chosen for you.`, body, heroImage: 'crane-head', current: 'about', jsonld: [breadcrumbLd(items)] }) };
}

// ── Journal ─────────────────────────────────────────────────────────────
export function journalPage() {
  const items = [['Home', '/'], ['Journal', '/journal']];
  const [lead, ...rest] = articles;
  const body = html`
${plainHead({ eyebrow: 'Journal', title: 'Field notes from Uganda.', lede: 'Planning notes, birds and the reasoning behind our routes.', items })}
<section class="section wrap">
  <a class="card grid" href="/journal/${lead.slug}" data-reveal style="align-items:end">
    <div class="card__media ar-32" style="grid-column:1/-1">${picture(lead.image, { sizes: '(min-width:900px) 66vw, 100vw', alt: '' })}</div>
    <div class="card__body" style="grid-column:1/-1"><span class="eyebrow">${esc(lead.category)} · <time datetime="${lead.date}">${fmtDate(lead.date)}</time></span><h2 class="h2" style="max-width:20ch">${esc(lead.title)}</h2><p class="lede mt-s">${esc(lead.dek)}</p><span class="card__more mt-s">Read <span class="arr" aria-hidden="true">→</span></span></div>
  </a>
  <div class="cards cards--3 mt-l">${rest.map((a, i) => articleCard(a, i)).join('')}</div>
</section>`;
  return { path: '/journal', html: layout({ path: '/journal', title: 'Journal', description: 'Field notes on Uganda: choosing a Bwindi sector, finding the shoebill, why chimps come before gorillas and when to go.', body, plain: true, current: 'journal', jsonld: [breadcrumbLd(items)] }) };
}

export function articlePage(a) {
  const path = `/journal/${a.slug}`;
  const items = [['Home', '/'], ['Journal', '/journal'], [a.title.replace(/\.$/, ''), path]];
  const blocks = a.body.map(([t, x, c]) => (t === 'p' ? `<p>${esc(x)}</p>` : t === 'h' ? `<h2>${esc(x)}</h2>` : `<figure>${picture(x, { sizes: '(min-width:1000px) 66vw, 100vw' })}<figcaption>${esc(c)}</figcaption></figure>`)).join('');
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const body = html`
<header class="page-head">${crumbs(items, true)}<span class="eyebrow mt-m">${esc(a.category)}</span><h1 class="h1" style="max-width:18ch">${esc(a.title)}</h1><p class="lede">${esc(a.dek)}</p></header>
<figure class="article-hero" style="margin:0">${picture(a.image, { sizes: '100vw', eager: true, priority: true })}</figure>
<div class="wrap article">
  <aside class="article__meta"><b>Published</b><time datetime="${a.date}">${fmtDate(a.date)}</time><p class="mt-m">${linkArrow('/enquire', 'Plan with us')}</p></aside>
  <div class="prose">${blocks}</div>
</div>
<section class="section bg-reed"><div class="wrap">${sectionHead({ eyebrow: 'Keep reading', title: 'More field notes.' })}<div class="cards cards--3">${more.map((x, i) => articleCard(x, i)).join('')}</div></div></section>`;
  return { path, html: layout({ path, title: a.title.replace(/\.$/, ''), description: a.dek, body, plain: true, heroImage: a.image, current: 'journal', jsonld: [breadcrumbLd(items), { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, datePublished: a.date, description: a.dek, author: { '@type': 'Organization', name: config.brand.name }, publisher: { '@type': 'Organization', name: config.brand.name } }] }) };
}

// ── Enquire ─────────────────────────────────────────────────────────────
export function enquirePage() {
  const items = [['Home', '/'], ['Enquire', '/enquire']];
  const interests = ['Gorillas', 'Chimpanzees', 'Birding', 'Savannah & game drives', 'The Nile & Jinja', 'Walking & mountains', 'Kidepo', 'Lake Bunyonyi'];
  const body = html`
${plainHead({ eyebrow: 'Enquire', title: 'Plan a journey.', lede: 'Tell us when, who and what you hope to see. A planner replies by email with a first route and the permits to secure.', items })}
<section class="section wrap">
  <div class="enquire-grid">
    <form class="form" action="${config.form.endpoint}" method="POST" data-enquiry data-ajax="${config.form.ajaxEndpoint}" data-email="${config.contact.email}" novalidate>
      <input type="hidden" name="_subject" value="New enquiry · ${esc(config.brand.name)}">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_next" value="${config.siteUrl}/thank-you">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="route" value="" data-route-field>
      <label class="hp" aria-hidden="true">Leave this empty<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label>
      <div class="form__row form__row--2">
        <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="e-name"><span class="err" id="e-name"></span></div>
        <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="e-email"><span class="err" id="e-email"></span></div>
      </div>
      <div class="form__row form__row--2">
        <div class="field"><label for="f-when">When would you like to travel?</label><input id="f-when" name="travel_dates" type="text" placeholder="e.g. late July 2027, about 12 nights" aria-describedby="e-when"><span class="err" id="e-when"></span></div>
        <div class="field"><label for="f-who">Who is travelling?</label><input id="f-who" name="travellers" type="text" placeholder="e.g. two adults, one aged 15"></div>
      </div>
      <fieldset class="field"><legend>What are you hoping for?</legend><div class="checks">${interests.map((x) => `<label class="opt"><input type="checkbox" name="interests" value="${esc(x)}"><span>${esc(x)}</span></label>`).join('')}</div></fieldset>
      <div class="form__row form__row--2">
        <div class="field"><label for="f-dest">Starting from a page?</label><select id="f-dest" name="starting_point"><option value="">No particular page</option><optgroup label="Destinations">${destinations.map((d) => `<option value="destination:${d.slug}">${esc(d.short)}</option>`).join('')}</optgroup><optgroup label="Journeys">${journeys.map((j) => `<option value="journey:${j.slug}">${esc(j.name)}</option>`).join('')}</optgroup></select></div>
        <div class="field"><label for="f-pace">Long drives?</label><select id="f-pace" name="pace"><option>Fly where it helps</option><option>Happy on the road</option><option>Not sure yet</option></select></div>
      </div>
      <div class="field"><label for="f-msg">Anything else?</label><textarea id="f-msg" name="message" placeholder="Fitness, special interests, budget range, what you have already booked…"></textarea></div>
      <label class="consent"><input type="checkbox" name="consent" value="yes" required aria-describedby="e-consent"><span>I agree that ${esc(config.brand.name)} may use these details to reply to my enquiry, as described in the <a href="/privacy">Privacy Policy</a>.</span></label><span class="err" id="e-consent"></span>
      <div><button class="btn" type="submit">Send enquiry <span class="arr" aria-hidden="true">→</span></button></div>
      <div class="form-status" role="status" aria-live="polite" tabindex="-1" hidden data-status></div>
    </form>
    <aside class="enquire-aside">
      <h2>What happens next</h2>
      <ol class="steps"><li>A planner reads your enquiry and replies by email.</li><li>We suggest a first route, the right Bwindi sector and where to fly.</li><li>Once you are happy, we secure permits before anything else.</li></ol>
      <h2>Write to us</h2>
      <p><a class="link-u" href="mailto:${config.contact.email}">${config.contact.email}</a></p>
      <h2 class="mt-m">Our address</h2>
      <address>${addressLines().map(esc).join('<br>')}</address>
    </aside>
  </div>
</section>`;
  return { path: '/enquire', html: layout({ path: '/enquire', title: 'Enquire', description: `Plan a Uganda journey with ${config.brand.name}. Tell us your dates and interests and a planner will reply by email.`, body, plain: true, scripts: ['enquire'], jsonld: [breadcrumbLd(items)] }) };
}

export function thanksPage() {
  const body = html`${plainHead({ eyebrow: 'Thank you', title: 'Your enquiry is on its way.', lede: `A planner will reply to the email address you gave us. If you do not hear back, write to <a class="link-u" href="mailto:${config.contact.email}">${config.contact.email}</a>.`, items: [['Home', '/'], ['Thank you', '/thank-you']] })}<section class="section wrap"><p>${linkArrow('/journal', 'Read the journal while you wait')}</p></section>`;
  return { path: '/thank-you', html: layout({ path: '/thank-you', title: 'Thank you', description: 'Your enquiry has been sent.', body, plain: true }), noindex: true };
}

// ── Credits ─────────────────────────────────────────────────────────────
export function creditsPage() {
  const items = [['Home', '/'], ['Photo credits', '/credits']];
  const used = [...ctx.usedImages].sort();
  const body = html`${plainHead({ eyebrow: 'Credits', title: 'Photo credits.', lede: 'Photographs on this site are used under Creative Commons licences from Wikimedia Commons. Thank you to the photographers.', items })}
<section class="section wrap"><ul class="credits">${used.map((k) => { const m = ctx.images[k]; return `<li>${picture(k, { sizes: '96px', alt: '' })}<div><strong>${esc(m.title.replace(/\.(jpe?g|png)$/i, ''))}</strong><br>Photo: ${esc(m.author)} · Licence: <a href="${esc(m.licenseUrl || m.page)}" rel="license noopener">${esc(m.license)}</a> · <a href="${esc(m.page)}" rel="noopener">Source</a>. Resized and compressed for the web.</div></li>`; }).join('')}</ul></section>`;
  return { path: '/credits', html: layout({ path: '/credits', title: 'Photo credits', description: 'Credits and licences for the photographs used on this site.', body, plain: true, jsonld: [breadcrumbLd(items)] }) };
}

export function notFoundPage() {
  const body = html`<section class="hero notfound" aria-labelledby="t">${picture('papyrus-mist', { sizes: '100vw', eager: true })}<div class="hero__body" style="padding-bottom:64px"><span class="eyebrow">404</span><h1 class="h1 hero__title" id="t">Lost in the papyrus.</h1><p class="hero__lede">That page is not here. Try the destinations, or start a journey.</p><p class="mt-m">${btn('/destinations', 'All destinations', 'btn--light')}</p></div></section>`;
  return { path: '/404', html: layout({ path: '/404', title: 'Page not found', description: 'Page not found.', body }), noindex: true };
}
