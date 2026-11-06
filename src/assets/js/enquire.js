// Enquiry form: pre-fill from links, validate, and send without leaving the page.
// Without JavaScript the form posts directly to the form service and returns to /thank-you.
(() => {
  const form = document.querySelector('[data-enquiry]');
  if (!form) return;
  const status = form.querySelector('[data-status]');
  const q = new URLSearchParams(location.search);
  const sel = form.elements.starting_point;
  if (q.get('destination')) sel.value = `destination:${q.get('destination')}`;
  if (q.get('journey')) sel.value = `journey:${q.get('journey')}`;
  if (q.get('interest') === 'birding') form.querySelector('input[value="Birding"]').checked = true;
  if (q.get('route')) {
    form.querySelector('[data-route-field]').value = q.get('route');
    const msg = form.elements.message;
    if (!msg.value) msg.value = `Route from the planner: ${q.get('route')}\n\n`;
  }

  const rules = {
    name: (v) => (v.trim() ? '' : 'Please tell us your name.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
    consent: (_, el) => (el.checked ? '' : 'Please tick to let us reply to you.'),
  };
  const check = (name) => {
    const el = form.elements[name];
    const msg = rules[name](el.value, el);
    const err = document.getElementById(`e-${name}`);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg;
    return !msg;
  };
  Object.keys(rules).forEach((n) => form.elements[n].addEventListener('blur', () => check(n)));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }
    if (form.elements._honey.value) return;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.firstChild.textContent = 'Sending… ';
    const fd = new FormData(form);
    const payload = {};
    for (const [k, v] of fd.entries()) payload[k] = payload[k] ? `${payload[k]}, ${v}` : v;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(form.dataset.ajax || form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal,
      });
      clearTimeout(timer);
      const j = await res.json().catch(() => ({}));
      if (!res.ok || j.success === 'false' || j.success === false) throw new Error(j.message || 'failed');
      form.reset();
      status.classList.remove('is-error');
      status.innerHTML = '<strong>Thank you. Your enquiry is on its way.</strong> A planner will reply to the email address you gave us.';
    } catch (err) {
      clearTimeout(timer);
      // Never lose an enquiry: offer the same details as a ready-written email.
      const skip = ['_subject', '_template', '_next', '_captcha', '_honey', 'consent'];
      const lines = Object.entries(payload).filter(([k, v]) => v && !skip.includes(k)).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`);
      const href = `mailto:${form.dataset.email}?subject=${encodeURIComponent('Enquiry')}&body=${encodeURIComponent(lines.join('\n'))}`;
      status.classList.add('is-error');
      status.innerHTML = `<strong>Our form service did not respond.</strong> Your details are still here. <a href="${href}">Send them by email instead</a> (opens your email app with everything filled in), or write to <a href="mailto:${form.dataset.email}">${form.dataset.email}</a>.`;
    }
    status.hidden = false; status.focus();
    btn.disabled = false; btn.firstChild.textContent = 'Send enquiry ';
  });
})();
