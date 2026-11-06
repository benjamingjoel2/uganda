// Gorilla-and-chimp combiner: orders the chosen parks along the best route and
// shows road or flight time for each leg. Data is embedded in the page as JSON.
(() => {
  const root = document.querySelector('[data-planner]');
  if (!root) return;
  const data = JSON.parse(document.getElementById('route-data').textContent);
  const form = root.querySelector('[data-planner-form]');
  const list = root.querySelector('[data-itin]');
  const sendBtn = root.querySelector('a.btn[href^="/enquire"]');
  const byId = Object.fromEntries(data.stops.map((s) => [s.id, s]));
  const roadH = (a, b) => data.road[`${a}|${b}`] ?? data.road[`${b}|${a}`];
  const flyH = (a, b) => (a === b ? 0 : data.flights[`${a}|${b}`] ?? data.flights[`${b}|${a}`]);
  const fmt = (h) => { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return !hh ? `${mm} min` : mm ? `${hh} h ${mm}` : `${hh} h`; };
  const place = (id) => byId[id] || data.gateways[id];
  const car = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M2 10V7.5L3.5 4h9L14 7.5V10H2Zm0 0v2h2v-2m8 0v2h2v-2"/></svg>';
  const plane = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="m2 9 4-1 3-6h1.5L9 8l4-1 1 1-5 2.5L8 14H6.5l.5-3.5L3 11z"/></svg>';

  // Best leg between two places: road, or (if allowed and much faster) a flight with transfers.
  function leg(a, b, fly) {
    const A = place(a), B = place(b);
    const r = roadH(a, b);
    const opt = { mode: 'road', hours: r, road: r, air: 0, text: `${fmt(r)} by road` };
    if (!fly || !A.airstrip || !B.airstrip) return opt;
    const f = flyH(A.airstrip, B.airstrip);
    if (f == null || f === 0) return opt;
    const total = (A.transfer || 0) + f + (B.transfer || 0) + 0.75; // check-in buffer
    if (r > 5 && total < r - 1.5) {
      return { mode: 'fly', hours: total, road: (A.transfer || 0) + (B.transfer || 0), air: f,
        text: `Fly ${data.airstrips[A.airstrip]} to ${data.airstrips[B.airstrip]}, ${fmt(f)}${A.transfer || B.transfer ? `, plus ${fmt((A.transfer || 0) + (B.transfer || 0))} of transfers` : ''}`, alt: `${fmt(r)} by road` };
    }
    return opt;
  }

  function build() {
    const fd = new FormData(form);
    const start = fd.get('start'), end = fd.get('end');
    const fly = fd.get('mode') === 'fly';
    const chosen = ['kibale', fd.get('sector'), ...fd.getAll('add')].map((id) => byId[id]);
    // West-bound from Entebbe; south-first (reversed) when arriving from Kigali.
    chosen.sort((a, b) => a.order - b.order);
    if (start === 'kigali') chosen.reverse();
    const seq = [start, ...chosen.map((s) => s.id), end];
    let nights = 0, road = 0, air = 0;
    const rows = [];
    for (let i = 0; i < seq.length; i++) {
      const id = seq[i], p = place(id);
      let legHtml = '';
      if (i > 0) {
        const L = leg(seq[i - 1], id, fly);
        road += L.road; air += L.air;
        legHtml = `<span class="itin__leg"><span class="leg-mode">${L.mode === 'fly' ? plane : car}<b>${L.text}</b></span>${L.alt ? `<span>or ${L.alt}</span>` : ''}<span>from ${place(seq[i - 1]).short}</span></span>`;
      }
      const isEnd = i === 0 || i === seq.length - 1;
      if (!isEnd) nights += p.nights;
      const n = isEnd ? (i === 0 ? 'A' : 'B') : String(i);
      const name = p.page ? `<a href="/destinations/${p.page}">${p.name}</a>` : p.name;
      rows.push(`<li class="itin__stop"><span class="itin__n">${n}</span><span class="itin__name">${name}</span><span class="itin__nights">${isEnd ? (i === 0 ? 'Arrive' : 'Depart') : `${p.nights} nights`}</span>${legHtml}</li>`);
    }
    if (start === 'entebbe') nights += 1; // a first night by the lake
    list.innerHTML = rows.join('');
    root.querySelector('[data-t-nights]').textContent = nights;
    root.querySelector('[data-t-road]').textContent = Math.round(road);
    root.querySelector('[data-t-air]').textContent = air ? Math.round(air * 10) / 10 : 0;
    const summary = `${seq.map((id) => place(id).short).join(' → ')} (${fly ? 'flying the long legs' : 'by road'}, about ${nights} nights)`;
    sendBtn.href = `/enquire?route=${encodeURIComponent(summary)}`;
  }
  form.addEventListener('change', build);
  build();
})();
