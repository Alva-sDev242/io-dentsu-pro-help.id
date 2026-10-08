document.documentElement.classList.add('js');
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
try {
  const saved = localStorage.getItem('natsu-theme');
  root.dataset.theme = saved || 'dark';
} catch { root.dataset.theme = 'dark'; }
if (themeBtn) {
  const setLabel = () => {
    const isLight = root.dataset.theme === 'light';
    themeBtn.textContent = isLight ? '☾' : '☼';
    themeBtn.setAttribute('aria-label', isLight ? 'Activer le thème sombre' : 'Activer le thème clair');
  };
  setLabel();
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('natsu-theme', root.dataset.theme); } catch {}
    setLabel();
  });
}
const burger = document.getElementById('burger');
const menu = document.getElementById('primary-navigation');
if (burger && menu) {
  const closeMenu = () => { menu.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Ouvrir le menu'); };
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
  });
  menu.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}
document.getElementById('year').textContent = new Date().getFullYear();
const revealEls = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealEls.forEach((el, index) => {
    el.style.setProperty('--reveal-delay', (index % 3) * 80 + 'ms');
    revealObserver.observe(el);
  });
}
if ('IntersectionObserver' in window) {
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.menu__link[href^="#"]').forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
