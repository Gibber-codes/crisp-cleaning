// The menu on a phone, and dropdowns that open on tap as well as hover.
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const body = document.body;
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close the menu' : 'Open the menu');
    });
  }
  document.querySelectorAll('.sub-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const li = btn.closest('li');
      const open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    body.classList.remove('menu-open');
    document.querySelectorAll('.has-sub.open').forEach(li => li.classList.remove('open'));
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
  // "Read our reviews" (and any #reviews link) opens the footer's reviews before jumping to them.
  const reviews = document.getElementById('reviews');
  // Focus moves with it, so keyboard and screen-reader users land on the reviews too.
  const openReviews = () => {
    if (!reviews) return;
    reviews.open = true;
    reviews.scrollIntoView({ block: 'start' });
    reviews.querySelector('summary').focus({ preventScroll: true });
  };
  document.querySelectorAll('[data-open-reviews]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openReviews(); }));
  if (location.hash === '#reviews') openReviews();
  // A form that posts to Netlify shows its own thanks; the fallback page covers a plain host.
  document.querySelectorAll('form[data-netlify]').forEach(f => {
    f.addEventListener('submit', () => {
      const b = f.querySelector('button[type=submit]');
      if (b) { b.disabled = true; b.textContent = 'Sending…'; }
    });
  });
})();
