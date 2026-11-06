// Page builders. Each returns { path, html }.
import config from '../../site.config.mjs';
import { destinations, bySlug } from '../data/destinations.mjs';
import { sectors, priorities } from '../data/sectors.mjs';
import { birds, groups } from '../data/birds.mjs';
import { journeys } from '../data/journeys.mjs';
import { stays, stayById } from '../data/stays.mjs';
import { articles } from '../data/journal.mjs';
import * as routes from '../data/routes.mjs';
import alts from '../data/alts.mjs';
import {
  ctx, esc, html, picture, layout, crown, stems, linkArrow, btn, destCard, sectionHead, railNav, cta, crumbs,
  breadcrumbLd, dots, arrow, addressLines, addressInline,
} from './ui.mjs';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const pad2 = (n) => String(n).padStart(2, '0');

// ── Shared pieces ───────────────────────────────────────────────────────
function journeyCard(j, i = 0) {
  const route = j.route.map((s) => bySlug[s].short).join(' · ');
  return `<article class="journey" data-reveal style="--d:${(i % 2) * 0.08}s">
    <a class="card" href="/journeys#${j.slug}" tabindex="-1" aria-hidden="true"><div class="card__media ar-1610">${picture(j.image, { sizes: '(min-width:900px) 48vw, 100vw', alt: '' })}</div></a>
    <div class="card__body">
      <span class="eyebrow">${j.nights} nights · ${esc(j.season)}</span>
      <h3 class="card__title"><a href="/journeys#${j.slug}" class="link-plain" style="text-decoration:none">${esc(j.name)}</a></h3>
      <p class="journey__route">${esc(route)}</p>
      <ul class="journey__list">${j.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      <div class="journey__foot"><div><span class="k">Length</span><span class="v">${j.nights} nights</span></div>${btn(`/journeys#${j.slug}`, 'View journey', 'btn--sm')}</div>
    </div>
  </article>`;
}
function stayRow(s, i) {
  const d = bySlug[s.place];
  return `<li><a class="row" href="/stays#${s.id}">
    <span class="row__n">${pad2(i + 1)}</span>
    <span class="row__title">${esc(s.name)}<small>${esc(s.area)}</small></span>
    <p class="row__desc">${esc(s.text)}</p>
    <span class="row__val"><span class="tag tag--ph">Placeholder name</span></span>
    <span class="row__thumb">${picture(s.image, { sizes: '136px', alt: `${alts[s.image]} (location photo; ${d.short})` })}</span>
  </a></li>`;
}

// ── Home ────────────────────────────────────────────────────────────────
export function home() {
  const sig = [
    { t: 'Gorilla trekking', s: 'Bwindi and Mgahinga', d: 'One hour with a habituated family, in the sector that suits your knees.', v: 'From USD 800', img: 'gorilla-bwindi', href: '/destinations/bwindi' },
    { t: 'Gorilla habituation', s: 'Rushaga, Bwindi', d: 'Up to four hours with a family still learning to accept people.', v: 'From USD 1,500', img: 'gorilla-juvenile', href: '/destinations/bwindi#sectors' },
    { t: 'Chimpanzee tracking', s: 'Kibale Forest', d: 'Follow the pant-hoots off the path with a ranger guide.', v: 'From USD 250', img: 'chimp-face', href: '/destinations/kibale' },
    { t: 'Shoebill by canoe', s: 'Mabamba Swamp', d: 'Poled through the papyrus at first light, an hour from Entebbe.', v: 'Morning', img: 'shoebill', href: '/journal/a-shoebill-before-breakfast' },
    { t: 'The Kazinga Channel', s: 'Queen Elizabeth', d: 'Hippo, buffalo and elephant from the water, between two lakes.', v: 'Afternoon', img: 'kazinga', href: '/destinations/queen-elizabeth' },
    { t: 'The falls, by boat and on foot', s: 'Murchison Falls', d: 'Up the Nile to the spray, then the trail to the top of the gap.', v: 'Half day', img: 'murchison-river', href: '/destinations/murchison-falls' },
  ];
  const reasons = [
    ['The right sector', 'Bwindi has four trekking sectors. We match you to one by fitness, interests and the road you arrive on.'],
    ['Chimps before gorillas', 'Routes run in the order that makes sense on the ground, so the long drives become short ones.'],
    ['Fly the long legs', 'Scheduled flights to Kihihi, Kisoro, Kasese and Pakuba wherever the road would take a whole day.'],
    ['Real guides', 'Driver-guides, bird guides and trackers who live and work in Uganda, chosen for the trip you want.'],
    ['Permits first', 'Gorilla and chimpanzee permits are limited. We secure them before anything else is booked.'],
    ['One planner', 'The person you first write to plans the whole journey and stays with you until you are home.'],
  ];
  const body = html`
<section class="hero hero--home" aria-labelledby="hero-title">
  ${picture('hero-crane', { sizes: '100vw', eager: true, priority: true, position: '50% 30%' })}
  <div class="hero__top"><p class="fig"><b>Fig. 01</b>Grey crowned crane, papyrus edge near Lake Bunyonyi</p><p class="fig">00°19′N 32°35′E · Kampala</p></div>
  <div class="hero__body">
    <h1 class="display hero__title" id="hero-title">Uganda, from the source.</h1>
    <p class="hero__lede">The primate and birding capital of Africa: gorillas in Bwindi, chimps in Kibale, the Nile where it begins and lions in the fig trees, with real guides.</p>
  </div>
  <div class="hero__bar">
    <ul class="hero__meta"><li>Gorillas · Bwindi</li><li>Chimps · Kibale</li><li>The Nile · Jinja</li><li>Tree lions · Ishasha</li></ul>
    ${btn('/enquire', 'Plan a journey', 'btn--light')}
  </div>
</section>

<section class="section wrap" aria-labelledby="intro-title">
  <div class="grid intro">
    <div class="intro__text" data-reveal>
      <div class="crown-rule">${crown()}</div>
      <span class="eyebrow">Uganda, planned by forest, river and swamp</span>
      <h2 class="h2" id="intro-title">The edges are where Uganda happens.</h2>
      <p class="lede">Forest meets savannah at Kibale and Queen Elizabeth. The Nile forces itself through a gap at Murchison. Bwindi’s ridges fall into Congo on one side and farmland on the other.</p>
      <p class="muted">We plan by those edges. We match you to the right Bwindi sector, put chimps in Kibale before the gorillas and the Kazinga Channel after them, and fly the long legs so the road is something you see rather than something you sit through. Then we find the bird guide who hears the turaco before anyone sees it.</p>
      <p class="mt-m">${linkArrow('/about', 'How we plan')}</p>
    </div>
    <div class="intro__media" data-reveal style="--d:.15s">${picture('crane-pair', { sizes: '(min-width:900px) 40vw, 100vw' })}<p class="fig muted mt-s"><b>Fig. 02</b>Crested cranes at the swamp edge</p></div>
  </div>
  <ul class="reasons">${reasons.map(([t, d], i) => `<li data-reveal style="--d:${(i % 3) * 0.08}s"><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
</section>

<section class="section--tight" aria-labelledby="where-title" style="padding-top:0">
  <div class="wrap">${sectionHead({ eyebrow: 'Ten destinations', title: '<span id="where-title">Where to go.</span>', count: '10', link: `<div class="flex-between">${linkArrow('/destinations', 'All destinations')}${railNav('dest-rail')}</div>` })}</div>
  <div class="rail" id="dest-rail" tabindex="0" aria-label="Destinations, scroll sideways">${destinations.map((d, i) => destCard(d, undefined, i)).join('')}</div>
  <div class="rail-progress" aria-hidden="true" data-rail-progress="dest-rail"><i></i></div>
</section>

<section class="section bg-forest on-dark" aria-labelledby="sectors-title">
  <div class="wrap">${sectionHead({ eyebrow: 'Bwindi Impenetrable Forest', title: '<span id="sectors-title">Four sectors.</span>', count: '04', aside: 'One forest, four ways in. Each starts at a different height, on a different road, with different gorilla families. Choosing the right one is most of the planning.', link: `<p class="mt-s">${linkArrow('/destinations/bwindi#sectors', 'Compare the four sectors')}</p>` })}</div>
  <div class="strip">${sectors.map((s, i) => `<a class="strip__item" href="/destinations/bwindi#sector-${s.id}" data-reveal style="--d:${i * 0.08}s">${picture(s.image, { sizes: '(min-width:900px) 25vw, 50vw' })}<span class="strip__top"><b>S-${pad2(i + 1)}</b>${esc(s.side)} · ${esc(s.altitude.replace('About ', '').replace(' at the trailhead', '').replace(', the highest of the four', '').replace(' on the ridge, far lower in the valley', ''))}</span><span><span class="strip__name">${esc(s.name)}</span><span class="strip__spec"><span>Trek ${dots(s.difficulty)}</span><span>${esc(s.airstrip)} airstrip</span></span></span></a>`).join('')}</div>
</section>

<section class="section wrap" aria-labelledby="sig-title">
  ${sectionHead({ eyebrow: 'Signature days', title: '<span id="sig-title">What people come for.</span>', count: '06', aside: 'Permit prices are set by the Uganda Wildlife Authority and quoted per person. We confirm them when we book.' })}
  <ol class="rows">${sig.map((x, i) => `<li data-reveal><a class="row" href="${x.href}"><span class="row__n">${pad2(i + 1)}</span><span class="row__title">${esc(x.t)}<small>${esc(x.s)}</small></span><p class="row__desc">${esc(x.d)}</p><span class="row__val">${esc(x.v)}</span><span class="row__thumb">${picture(x.img, { sizes: '136px', alt: '' })}</span></a></li>`).join('')}</ol>
</section>

<section class="section bg-reed" aria-labelledby="journeys-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Sample journeys', title: '<span id="journeys-title">In the right order.</span>', aside: 'Starting points, not packages. Each is rebuilt around your dates, your pace and the permits available.', link: `<p class="mt-s">${linkArrow('/journeys', 'All six journeys')}</p>` })}
    <div class="journeys">${journeys.slice(0, 4).map(journeyCard).join('')}</div>
  </div>
</section>

<section class="section bg-swamp on-dark has-stems" aria-labelledby="birds-title">
  ${stems('right', 7)}
  <div class="wrap band-split">
    <div data-reveal>
      <div class="crown-rule">${crown()}</div>
      <span class="eyebrow">The Bird List</span>
      <h2 class="h2" id="birds-title">A shoebill before breakfast.</h2>
      <p class="lede mt-m">Uganda’s big birds in one field guide: where to find them, which months, and how likely you are to see them, in words rather than promises.</p>
      <p class="mt-m">${linkArrow('/birds', 'Open the field guide')}</p>
    </div>
    <div class="birdgrid">${['shoebill', 'crowned-crane', 'great-blue-turaco', 'rwenzori-turaco'].map((id, i) => { const b = birds.find((x) => x.id === id); return `<a class="card" href="/birds#${b.id}" data-reveal style="--d:${i * 0.08}s"><div class="card__media ar-45">${picture(b.image, { sizes: '(min-width:1000px) 26vw, 46vw' })}</div><div class="card__body"><span class="eyebrow">${esc(b.likelihood.split(';')[0])}</span><h3 class="card__title">${esc(b.name)}</h3></div></a>`; }).join('')}</div>
  </div>
</section>

<section class="fullbleed" aria-labelledby="planner-title">
  ${picture('chimp-alpha', { sizes: '100vw', alt: '' })}
  <p class="fig"><b>Fig. 03</b>Alpha male, Kibale forest</p>
  <div class="fullbleed__inner">
    <h2 class="h1" id="planner-title" data-reveal>Chimps first. Gorillas second.</h2>
    <div class="fullbleed__aside" data-reveal style="--d:.1s"><p>Our route planner puts the parks you choose in the order that works on the ground, from Entebbe or Kigali, and shows the road and flight times between them.</p>${btn('/route-planner', 'Open the route planner', 'btn--light')}</div>
  </div>
</section>

<section class="section bg-forest on-dark" aria-labelledby="stays-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Where you sleep', title: '<span id="stays-title">Close to the trailhead.</span>', aside: 'Lodges chosen for their position first: walking distance to the briefing, above the channel, on the ridge with the view.', link: `<p class="mt-s">${linkArrow('/stays', 'All stays')}</p>` })}
    <div class="cards cards--4">${['buhoma-forest-edge', 'kibale-crater-lodge', 'mweya-channel-lodge', 'bunyonyi-island-cottages'].map((id, i) => { const s = stayById[id]; return `<a class="card" href="/stays#${s.id}" data-reveal style="--d:${i * 0.08}s"><div class="card__media ar-45">${picture(s.image, { sizes: '(min-width:1000px) 24vw, (min-width:640px) 46vw, 100vw' })}</div><div class="card__body"><span class="eyebrow">${esc(bySlug[s.place].short)} · ${esc(s.style)}</span><h3 class="card__title">${esc(s.name)}</h3><p class="card__text">${esc(s.text)}</p><span class="tag tag--ph" style="color:var(--crown);border-color:var(--crown)">Placeholder name</span></div></a>`; }).join('')}</div>
  </div>
</section>

<section class="section wrap" aria-labelledby="journal-title">
  ${sectionHead({ eyebrow: 'Journal', title: '<span id="journal-title">Field notes.</span>', link: linkArrow('/journal', 'All articles') })}
  <div class="cards cards--3">${articles.slice(0, 3).map((a, i) => articleCard(a, i)).join('')}</div>
</section>

${cta()}`;
  return {
    path: '/',
    html: layout({
      path: '/', title: '', description: config.brand.description, body, heroImage: 'hero-crane',
      jsonld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: config.brand.name, url: config.siteUrl }],
    }),
  };
}

function articleCard(a, i = 0) {
  return `<a class="card" href="/journal/${a.slug}" data-reveal style="--d:${(i % 3) * 0.08}s"><div class="card__media ar-32">${picture(a.image, { sizes: '(min-width:1000px) 32vw, (min-width:640px) 46vw, 100vw', alt: '' })}</div><div class="card__body"><span class="eyebrow">${esc(a.category)} · <time datetime="${a.date}">${fmtDate(a.date)}</time></span><h3 class="card__title">${esc(a.title)}</h3><p class="card__text">${esc(a.dek)}</p><span class="card__more">Read <span class="arr" aria-hidden="true">→</span></span></div></a>`;
}

// ── Destinations index ──────────────────────────────────────────────────
export function destinationsIndex() {
  const body = html`
<section class="hero hero--inner" aria-labelledby="t">
  ${picture('murchison-river', { sizes: '100vw', eager: true, priority: true })}
  <div class="hero__top"><p class="fig"><b>Fig.</b>The Nile below Murchison Falls</p><p class="fig">10 destinations</p></div>
  ${crumbs([['Home', '/'], ['Destinations', '/destinations']])}
  <div class="hero__body"><h1 class="h1 hero__title" id="t">Ten places, one country.</h1><p class="hero__lede">From the shoebill swamps of Lake Victoria to the glaciers of the Rwenzoris, by sector, river and season.</p></div>
  <div class="hero__bar"><ul class="hero__meta"><li>Primates</li><li>Savannah</li><li>Lakes & rivers</li><li>Mountains</li></ul>${btn('/route-planner', 'Plan a route', 'btn--light')}</div>
</section>
<section class="section wrap">
  ${sectionHead({ eyebrow: 'All destinations', title: 'Where to go.', count: '10', aside: 'Most journeys combine three or four of these. The route planner puts them in order.' })}
  <div class="cards cards--4">${destinations.map((d, i) => destCard(d, '(min-width:1000px) 24vw, (min-width:640px) 46vw, 100vw', i)).join('')}</div>
</section>
${cta()}`;
  return { path: '/destinations', html: layout({ path: '/destinations', title: 'Destinations in Uganda', description: 'Ten Uganda destinations: Bwindi, Mgahinga, Kibale, Queen Elizabeth, Murchison Falls, Kidepo, Lake Bunyonyi, the Rwenzoris, Jinja, Kampala and Entebbe.', body, heroImage: 'murchison-river', jsonld: [breadcrumbLd([['Home', '/'], ['Destinations', '/destinations']])] }) };
}

// ── Destination page ────────────────────────────────────────────────────
export function destination(d) {
  const path = `/destinations/${d.slug}`;
  const crumbItems = [['Home', '/'], ['Destinations', '/destinations'], [d.short, path]];
  const siteBirds = birds.filter((b) => b.sites.includes(d.slug));
  const body = html`
<section class="hero hero--inner" aria-labelledby="t">
  ${picture(d.hero, { sizes: '100vw', eager: true, priority: true })}
  <div class="hero__top"><p class="fig"><b>Fig. 01</b>${esc(d.fig)}</p><p class="fig">${esc(d.region)}</p></div>
  ${crumbs(crumbItems)}
  <div class="hero__body"><span class="eyebrow">${esc(d.name)}</span><h1 class="h1 hero__title" id="t">${esc(d.title)}</h1><p class="hero__lede">${esc(d.lede)}</p></div>
  <div class="hero__bar"><ul class="hero__meta">${d.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>${btn(`/enquire?destination=${d.slug}`, `Plan ${d.short}`, 'btn--light')}</div>
</section>

<section class="section wrap">
  <div class="grid intro">
    <div class="intro__text" data-reveal>
      <div class="crown-rule">${crown()}</div>
      <span class="eyebrow">Overview</span>
      ${d.intro.map((p, i) => `<p class="${i === 0 ? 'lede' : 'muted'}">${esc(p)}</p>`).join('')}
    </div>
    <div class="intro__media" data-reveal style="--d:.12s">
      <span class="eyebrow">At a glance</span>
      <ul class="glance">${d.glance.map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="wrap" aria-labelledby="exp-title" style="padding-bottom:clamp(48px,6vw,96px)">
  <h2 class="sr-only" id="exp-title">Experiences in ${esc(d.short)}</h2>
  ${d.experiences.map((x, i) => `<article class="exp"><div class="exp__media" data-reveal>${picture(x.image, { sizes: '(min-width:900px) 56vw, 100vw' })}</div><div class="exp__body" data-reveal style="--d:.1s"><span class="eyebrow">Experience ${pad2(i + 1)}</span><h3 class="h3">${esc(x.title)}</h3><p>${esc(x.text)}</p>${x.permit ? `<p class="permit"><small>UWA permit</small>${esc(x.permit)}</p>` : ''}</div></article>`).join('')}
</section>

${d.sectorChooser ? sectorChooser() : ''}

<figure class="wide-figure">${picture(d.wide, { sizes: '100vw' })}<figcaption><b>Fig. 02</b>${esc(d.wideCaption)}</figcaption></figure>

<section class="section wrap" aria-labelledby="stay-title">
  ${sectionHead({ eyebrow: 'Where to stay', title: `<span id="stay-title">Sleep close to it.</span>`, aside: 'Lodge names below are placeholders while we confirm partner properties. Photos show the location.', link: `<p class="mt-s">${linkArrow('/stays', 'All stays')}</p>` })}
  <ol class="rows">${d.stays.map((id, i) => stayRow(stayById[id], i)).join('')}</ol>
</section>

${siteBirds.length ? `<section class="section--tight bg-reed"><div class="wrap flex-between"><div><span class="eyebrow">On the bird list here</span><p class="h3 mb-0" style="max-width:28ch">${siteBirds.map((b) => esc(b.name)).join(', ')}.</p></div>${linkArrow(`/birds?site=${d.slug}`, `Birds of ${d.short}`)}</div></section>` : ''}

<section class="section wrap" aria-labelledby="pairs-title">
  ${sectionHead({ eyebrow: 'Pairs well with', title: `<span id="pairs-title">On the same road.</span>`, link: linkArrow('/route-planner', 'Plan the route') })}
  <div class="cards cards--3">${d.pairs.map((s, i) => destCard(bySlug[s], '(min-width:1000px) 32vw, (min-width:640px) 46vw, 100vw', i)).join('')}</div>
</section>
${cta({ title: `Plan ${esc(d.short)} into your journey.` })}`;
  return {
    path,
    html: layout({
      path, title: d.name, description: `${d.lede} ${d.card}`.slice(0, 300), body, heroImage: d.hero,
      scripts: d.sectorChooser ? ['bwindi'] : [],
      jsonld: [breadcrumbLd(crumbItems), { '@context': 'https://schema.org', '@type': 'TouristDestination', name: d.name, description: d.lede, url: config.siteUrl + path, containedInPlace: { '@type': 'Country', name: 'Uganda' } }],
    }),
  };
}

function sectorChooser() {
  return html`<section class="section bg-reed" id="sectors" aria-labelledby="sectors-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'The Bwindi sector chooser', title: '<span id="sectors-title">Four sectors, compared.</span>', count: '04', aside: 'Same permit, same hour with the gorillas. Different height, road, families and lodges. Tell us what matters most and we will point you to one.' })}
    <div class="chooser" data-chooser>
      <p class="eyebrow" id="ask-label">What matters most?</p>
      <div class="chooser__ask" role="group" aria-labelledby="ask-label">${priorities.map((p) => `<button type="button" class="chip" aria-pressed="false" data-priority="${p.id}">${esc(p.label)}</button>`).join('')}</div>
      <p class="chooser__result" aria-live="polite" data-result>Pick a priority above, or compare all four below.</p>
      <div class="sectors light-dots">${sectors.map((s) => html`<article class="sector" id="sector-${s.id}" data-sector="${s.id}" data-scores='${JSON.stringify(s.scores)}'>
        <span class="sector__badge">Our pick</span>
        <div class="sector__media">${picture(s.image, { sizes: '(min-width:1200px) 25vw, (min-width:700px) 50vw, 100vw' })}</div>
        <p class="sector__side">${esc(s.side)} sector</p>
        <h3>${esc(s.name)}</h3>
        <p class="muted" style="font-size:.9375rem">${esc(s.summary)}</p>
        <dl>
          <div><dt>Trek difficulty</dt><dd>${dots(s.difficulty)} <span class="sr-only">${s.difficulty} of 5.</span> ${esc(s.difficultyText)}</dd></div>
          <div><dt>Altitude</dt><dd>${esc(s.altitude)}</dd></div>
          <div><dt>Gorilla families</dt><dd>${esc(s.families)}</dd></div>
          <div><dt>Drive times (approx.)</dt><dd><ul>${s.drive.map(([a, b]) => `<li><span>${esc(a)}</span><span>${esc(b)}</span></li>`).join('')}</ul></dd></div>
          <div><dt>Lodges</dt><dd>${s.lodges.map((id) => `<a href="/stays#${id}">${esc(stayById[id].name)}</a> <span class="tag tag--ph">Placeholder</span>`).join('')}</dd></div>
        </dl>
        <div class="sector__best">${s.bestFor.map((b) => `<span class="tag">${esc(b)}</span>`).join('')}</div>
      </article>`).join('')}</div>
      <p class="note mt-m">Drive times are typical dry-season estimates and change with road works and weather. Difficulty is our planning scale and depends on where the family is that day.</p>
    </div>
  </div>
</section>`;
}

export { articleCard, journeyCard, stayRow, MONTHS, fmtDate, pad2 };
