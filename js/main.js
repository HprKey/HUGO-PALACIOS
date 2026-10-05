/* ==============================
   CONFIGURACIÓN (edita aquí)
================================ */
const WA_NUMBER = '51952544545';
const ROLES = ['Desarrollador Web', 'Marketing Digital', 'Meta Ads', 'Soluciones con IA'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ==============================
   WHATSAPP
================================ */
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// Enlaces con data-wa="mensaje"
$$('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); });

// Botones de servicios: el mensaje cambia según el servicio
$$('[data-service]').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = `Hola Hugo, vi tu portafolio y quisiera obtener información sobre tu servicio de ${btn.dataset.service}.`;
    window.open(waLink(msg), '_blank', 'noopener');
  });
});

/* ==============================
   NAVBAR Y MENÚ MÓVIL
================================ */
const nav = $('#nav'), menu = $('#menu'), menuBtn = $('#menuBtn'), topBtn = $('#top');

function setMenu(open) {
  menu.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}
menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
$$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 20);
  topBtn.classList.toggle('show', window.scrollY > 600);
}, { passive: true });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

/* ==============================
   SECCIÓN ACTIVA EN EL MENÚ
================================ */
const links = $$('.nav__menu a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach(l => { const s = $(l.getAttribute('href')); if (s) sectionObserver.observe(s); });

/* ==============================
   REVEAL AL HACER SCROLL
================================ */
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

/* ==============================
   HERO: TEXTO ANIMADO (TYPING)
================================ */
const roleEl = $('#role');
if (reduceMotion) {
  roleEl.textContent = ROLES.join(' · ');
} else {
  let r = 0, c = 0, deleting = false;
  (function type() {
    const word = ROLES[r];
    c += deleting ? -1 : 1;
    roleEl.textContent = word.slice(0, c);
    let delay = deleting ? 40 : 85;
    if (!deleting && c === word.length) { deleting = true; delay = 1600; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % ROLES.length; delay = 350; }
    setTimeout(type, delay);
  })();
}

/* ==============================
   FOTO: respaldo si aún no existe la imagen
================================ */
const photo = $('#heroPhoto');
photo.addEventListener('error', () => {
  photo.style.display = 'none';
  photo.parentElement.insertAdjacentHTML('beforeend',
    '<span style="display:grid;place-items:center;height:100%;font:800 4rem Sora,sans-serif;color:#35d0ff">HP</span>');
});

/* ==============================
   FORMULARIO → WHATSAPP
================================ */
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, err = $('#formErr');
  const nombre = f.nombre.value.trim(), correo = f.correo.value.trim(), mensaje = f.mensaje.value.trim();
  if (!nombre || !correo || !mensaje) { err.textContent = 'Completa nombre, correo y mensaje para continuar.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) { err.textContent = 'Escribe un correo válido, por ejemplo nombre@correo.com.'; f.correo.focus(); return; }
  err.textContent = '';
  const msg = `Hola Hugo, soy ${nombre} (${correo}). ${mensaje}`;
  window.open(waLink(msg), '_blank', 'noopener');
  f.reset();
});
