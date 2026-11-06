// Site-wide behaviour: header state, menus, scroll reveals and rails. No dependencies.
(() => {
  const d = document;
  const header = d.querySelector('.site-header');
  const hasHero = d.body.classList.contains('page-hero');

  // Header: solid after scrolling past the top, hides on scroll down, shows on scroll up.
  let lastY = window.scrollY, ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', !hasHero || y > 40);
    const menuOpen = d.querySelector('.has-mega.open');
    header.classList.toggle('is-hidden', y > 400 && y > lastY + 4 && !menuOpen);
    if (y < lastY - 4) header.classList.remove('is-hidden');
    lastY = y; ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  // Mega menus: click/keyboard toggle; hover handled in CSS.
  const megas = [...d.querySelectorAll('.has-mega')];
  const closeAll = (except) => megas.forEach((m) => { if (m !== except) { m.classList.remove('open'); m.querySelector('button').setAttribute('aria-expanded', 'false'); } });
  megas.forEach((m) => {
    const b = m.querySelector('button');
    b.addEventListener('click', () => { const open = !m.classList.contains('open'); closeAll(m); m.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open)); });
    m.addEventListener('mouseleave', () => { m.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); });
    m.addEventListener('focusout', (e) => { if (!m.contains(e.relatedTarget)) { m.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); } });
  });
  d.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const o = d.querySelector('.has-mega.open'); closeAll(); if (o) o.querySelector('button').focus(); closeMenu(); } });
  d.addEventListener('click', (e) => { if (!e.target.closest('.has-mega')) closeAll(); });

  // Mobile menu
  const menu = d.getElementById('mobile-menu');
  const openBtn = d.querySelector('.hdr > .menu-btn');
  function openMenu() { menu.hidden = false; openBtn.setAttribute('aria-expanded', 'true'); d.body.style.overflow = 'hidden'; menu.querySelector('[data-close]').focus(); }
  function closeMenu() { if (menu.hidden) return; menu.hidden = true; openBtn.setAttribute('aria-expanded', 'false'); d.body.style.overflow = ''; openBtn.focus(); }
  openBtn.addEventListener('click', openMenu);
  menu.querySelector('[data-close]').addEventListener('click', closeMenu);
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = [...menu.querySelectorAll('a, button, summary')].filter((x) => x.offsetParent !== null);
    if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && d.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  // Reveal on scroll
  const els = d.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach((el) => io.observe(el));
  } else els.forEach((el) => el.classList.add('is-in'));

  // Rails: arrow buttons + progress bar (set up when the browser is idle)
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
  idle(() => d.querySelectorAll('[data-rail-nav]').forEach((nav) => {
    const rail = d.getElementById(nav.dataset.railNav);
    const bar = d.querySelector(`[data-rail-progress="${rail.id}"] i`);
    const [prev, next] = nav.querySelectorAll('button');
    const step = () => (rail.firstElementChild?.getBoundingClientRect().width || 300) + 24;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      prev.disabled = rail.scrollLeft < 4; next.disabled = rail.scrollLeft > max - 4;
      if (bar) { const vis = rail.clientWidth / rail.scrollWidth; bar.style.width = vis * 100 + '%'; bar.style.transform = `translateX(${max ? (rail.scrollLeft / max) * ((1 - vis) / vis) * 100 : 0}%)`; }
    };
    prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
    rail.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', update);
    update();
  }));
})();
