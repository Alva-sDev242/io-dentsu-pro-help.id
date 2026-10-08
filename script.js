const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');
try {
  const savedTheme = localStorage.getItem('natsutech-theme');
  const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.dataset.theme = savedTheme || (systemLight ? 'light' : 'dark');
} catch { root.dataset.theme = 'dark'; }
if (themeButton) {
  const updateThemeLabel = () => {
    const light = root.dataset.theme === 'light';
    themeButton.textContent = light ? '☾' : '☀';
    themeButton.setAttribute('aria-label', light ? 'Activer le thème sombre' : 'Activer le thème clair');
  };
  updateThemeLabel();
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('natsutech-theme', root.dataset.theme); } catch {}
    updateThemeLabel();
  });
}
const menuButton = document.querySelector('[data-menu-toggle]');
const menu = document.getElementById('primary-navigation');
if (menuButton && menu) {
  const closeMenu = () => { menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
