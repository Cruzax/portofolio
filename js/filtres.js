/* =========================================================
   filtres.js — filtrage des projets par domaine. Sans JS, les six
   projets restent tous affichés : le filtre n'enlève rien, il trie.
   ========================================================= */

(function () {
  'use strict';

  var boutons = Cruz.tous('.filter');
  var projets = Cruz.tous('#projects-list .project');
  var compteur = Cruz.un('#filters-count');
  if (!boutons.length || !projets.length) return;

  var libelle = function (n) { return n + (n > 1 ? ' projets' : ' projet'); };

  function appliquer(cle) {
    var visibles = 0;

    projets.forEach(function (carte) {
      var domaines = (carte.getAttribute('data-tags') || '').split(/\s+/);
      var garde = cle === 'all' || domaines.indexOf(cle) !== -1;
      carte.hidden = !garde;
      if (garde) {
        visibles++;
        // Une carte masquée puis réaffichée ne repasse jamais devant
        // l'observateur de révélations : on la force à l'état visible.
        carte.classList.add('is-in');
      }
    });

    boutons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === cle));
    });

    if (compteur) compteur.textContent = libelle(visibles);
  }

  boutons.forEach(function (b) {
    b.addEventListener('click', function () { appliquer(b.getAttribute('data-filter')); });
  });

  if (compteur) compteur.textContent = libelle(projets.length);
})();
