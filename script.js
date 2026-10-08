// ===== Année footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== THEME : chargement sauvegardé ou préférence système =====
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('natsu-theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (saved) {
  html.setAttribute('data-theme', saved);
} else {
  html.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
}

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('natsu-theme', next);
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
  });
});

// ===== NAV : effet au scroll =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== REVEAL AU SCROLL =====
const revealEls = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el, i) => {
    el.dataset.delay = (i % 3) * 80;
    observer.observe(el);
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});