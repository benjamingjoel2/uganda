// Bwindi sector chooser: pick a priority, highlight the best sector with reasons.
(() => {
  const root = document.querySelector('[data-chooser]');
  if (!root) return;
  const chips = [...root.querySelectorAll('[data-priority]')];
  const cards = [...root.querySelectorAll('[data-sector]')];
  const out = root.querySelector('[data-result]');
  const reasons = {
    knees: 'has the lowest trailheads and the gentlest average trek, with lodges a few minutes from the briefing.',
    birds: 'sits high on the eastern ridge above the Mubwindi Swamp trail, the best birding in the park.',
    views: 'looks straight across to the Virunga volcanoes. Be ready for a steep trek down and back up.',
    habituation: 'runs the four-hour gorilla habituation experience and has the most habituated families.',
    qenp: 'is closest to Queen Elizabeth, via the Ishasha sector and its tree-climbing lions.',
    kigali: 'is the closest sector to Kigali and pairs naturally with Lake Bunyonyi.',
  };
  const pick = (p) => {
    let best = null, top = -1;
    cards.forEach((c) => { const s = JSON.parse(c.dataset.scores)[p]; if (s > top) { top = s; best = c; } });
    return best;
  };
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') !== 'true';
    chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
    cards.forEach((c) => c.classList.remove('is-pick', 'is-dim'));
    if (!on) { out.textContent = 'Pick a priority above, or compare all four below.'; return; }
    chip.setAttribute('aria-pressed', 'true');
    const p = chip.dataset.priority;
    const best = pick(p);
    cards.forEach((c) => c.classList.add(c === best ? 'is-pick' : 'is-dim'));
    const name = best.querySelector('h3').textContent;
    out.innerHTML = '';
    const strong = document.createElement('strong'); strong.textContent = name;
    out.append(strong, ' ' + reasons[p] + ' ');
    const a = document.createElement('a'); a.href = '#sector-' + best.dataset.sector; a.textContent = 'See the details'; a.className = 'link-u';
    out.append(a);
    if (matchMedia('(max-width: 699px)').matches) best.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
})();
