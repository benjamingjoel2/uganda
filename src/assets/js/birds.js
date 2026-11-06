// The Bird List: filter by place, month and type. State is mirrored in the URL
// so filtered views can be linked (e.g. /birds?site=kibale&month=6).
(() => {
  const form = document.querySelector('[data-bird-filters]');
  if (!form) return;
  const cards = [...document.querySelectorAll('[data-birds] .bird')];
  const count = form.querySelector('[data-count]');
  const empty = document.querySelector('[data-empty]');
  const params = new URLSearchParams(location.search);
  ['site', 'month', 'group'].forEach((k) => { if (params.get(k) && form.elements[k]) form.elements[k].value = params.get(k); });
  const apply = () => {
    const site = form.elements.site.value, month = form.elements.month.value, group = form.elements.group.value;
    let n = 0;
    cards.forEach((c) => {
      const ok = (!site || c.dataset.sites.split(' ').includes(site)) && (!month || c.dataset.months.split(' ').includes(month)) && (!group || c.dataset.group === group);
      c.hidden = !ok; if (ok) n++;
    });
    count.textContent = `${n} ${n === 1 ? 'species' : 'species'}`;
    empty.hidden = n > 0;
    const q = new URLSearchParams();
    if (site) q.set('site', site); if (month) q.set('month', month); if (group) q.set('group', group);
    history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname);
  };
  form.addEventListener('change', apply);
  form.addEventListener('reset', () => setTimeout(apply, 0));
  form.addEventListener('submit', (e) => e.preventDefault());
  apply();
})();
