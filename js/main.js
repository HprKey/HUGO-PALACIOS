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

/* ==============================
   PROYECTOS Y VISTA PREVIA
   (los datos están en js/projects.js)
================================ */
const grid = $('#projects'), modal = $('#pvModal'), frame = $('#pvFrame');
const mk = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };

function openPreview(p) {
  $('#pvTitle').textContent = p.nombre;
  $('#pvCat').textContent = p.categoria || 'Proyecto';
  $('#pvDesc').textContent = p.descripcion || '';
  $('#pvStack').textContent = p.tecnologias && p.tecnologias.length ? 'Tecnologías: ' + p.tecnologias.join(', ') : '';
  const link = $('#pvLink'), note = $('.pv__note');
  link.hidden = note.hidden = !p.url;
  if (p.url) link.href = p.url;
  frame.replaceChildren();
  if (p.url) {
    const f = mk('iframe');
    f.src = p.url; f.title = 'Vista previa de ' + p.nombre; f.loading = 'lazy';
    f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
    frame.appendChild(f);
  } else if (p.imagen) {
    const i = mk('img'); i.src = p.imagen; i.alt = 'Captura de ' + p.nombre; frame.appendChild(i);
  }
  modal.showModal();
}
function closePreview() { modal.close(); frame.replaceChildren(); }
$('#pvClose').addEventListener('click', closePreview);
modal.addEventListener('click', e => { if (e.target === modal) closePreview(); });
modal.addEventListener('close', () => frame.replaceChildren());

function renderProjects() {
  grid.replaceChildren();
  if (!PROJECTS.length) {
    grid.appendChild(mk('article', 'project project--empty reveal in', 'Próximamente: aquí aparecerán mis nuevos proyectos.'));
    return;
  }
  PROJECTS.forEach(p => {
    const card = mk('article', 'project reveal in');
    const imgBox = mk('div', 'project__img');
    if (p.imagen) {
      const i = mk('img'); i.src = p.imagen; i.alt = 'Captura del proyecto ' + p.nombre; i.loading = 'lazy'; i.width = 640; i.height = 400;
      i.addEventListener('error', () => { i.remove(); imgBox.appendChild(mk('span', 'project__ph', p.nombre.charAt(0))); });
      imgBox.appendChild(i);
    } else imgBox.appendChild(mk('span', 'project__ph', p.nombre.charAt(0)));
    const body = mk('div', 'project__body');
    body.append(mk('span', 'tag', p.categoria || 'Proyecto'), mk('h3', '', p.nombre), mk('p', '', p.descripcion || ''));
    if (p.tecnologias && p.tecnologias.length) body.appendChild(mk('p', 'stack', 'Tecnologías: ' + p.tecnologias.join(', ')));
    const btns = mk('div', 'btns');
    const prev = mk('button', 'btn btn--sm', 'Vista previa'); prev.type = 'button';
    prev.addEventListener('click', () => openPreview(p));
    btns.appendChild(prev);
    if (p.url) { const a = mk('a', 'btn btn--sm btn--ghost', 'Ver proyecto'); a.href = p.url; a.target = '_blank'; a.rel = 'noopener'; btns.appendChild(a); }
    body.appendChild(btns);
    card.append(imgBox, body);
    grid.appendChild(card);
  });
}
renderProjects();
