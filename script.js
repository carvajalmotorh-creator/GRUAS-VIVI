const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector('img').alt;
  lightbox.classList.add('open');
}));
function closeLightbox(){ lightbox.classList.remove('open'); lightboxImage.src = ''; }
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if(event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeLightbox(); });


// Carrusel de localidades de cobertura
(() => {
  const track = document.querySelector('[data-coverage-track]');
  if (!track) return;
  const cards = [...track.querySelectorAll('.coverage-card')];
  const progress = document.querySelector('[data-coverage-progress]');
  const update = () => {
    const max = Math.max(1, track.scrollWidth - track.clientWidth);
    if (progress) progress.style.width = `${Math.max(12, (track.scrollLeft / max) * 100)}%`;
  };
  document.querySelector('[data-coverage-prev]')?.addEventListener('click', () => {
    track.scrollBy({left: -track.clientWidth * .75, behavior: 'smooth'});
  });
  document.querySelector('[data-coverage-next]')?.addEventListener('click', () => {
    track.scrollBy({left: track.clientWidth * .75, behavior: 'smooth'});
  });
  track.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  update();
})();
