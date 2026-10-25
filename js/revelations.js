/* =========================================================
   revelations.js — les blocs marqués [data-reveal] apparaissent
   quand ils entrent dans le champ. Sans JS, ils sont déjà visibles :
   c'est le CSS qui les masque, et seulement si .js-anim est posée.
   ========================================================= */

(function () {
  'use strict';
  var blocs = Cruz.tous('[data-reveal]');
  if (!blocs.length) return;

  // Mouvement réduit ou navigateur ancien : tout est visible d'emblée.
  if (Cruz.mouvementReduit || !('IntersectionObserver' in window)) {
    blocs.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (!entree.isIntersecting) return;
      entree.target.classList.add('is-in');
      observateur.unobserve(entree.target);   // une fois révélé, on oublie
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: .12 });

  blocs.forEach(function (el) { observateur.observe(el); });
})();
