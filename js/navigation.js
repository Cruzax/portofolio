/* =========================================================
   navigation.js — deux repères de lecture : un trait sous la barre
   haute dès qu'on quitte le sommet, et le lien de la section en
   cours souligné dans le menu.
   ========================================================= */

(function () {
  'use strict';

  var barre = Cruz.un('#topbar');
  if (barre) {
    var majTrait = function () {
      barre.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', majTrait, { passive: true });
    majTrait();
  }

  var liens = Cruz.tous('.nav a');
  var sections = liens
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  var marquer = function (id) {
    liens.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  // La bande active est la tranche médiane de l'écran.
  var espion = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) { if (e.isIntersecting) marquer(e.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (s) { espion.observe(s); });
})();
