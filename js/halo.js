/* =========================================================
   halo.js — la tache d'accent en fond suit le pointeur, de loin.
   Souris uniquement, et jamais si le mouvement est limité.
   ========================================================= */

(function () {
  'use strict';

  var halo = Cruz.un('.halo');
  if (!halo || Cruz.mouvementReduit) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var enAttente = false, x = 0, y = 0;

  window.addEventListener('mousemove', function (e) {
    x = (e.clientX / window.innerWidth) * 100;
    y = (e.clientY / window.innerHeight) * 100;

    // Une seule écriture de style par image, pas une par mouvement.
    if (enAttente) return;
    enAttente = true;
    requestAnimationFrame(function () {
      halo.style.setProperty('--mx', x.toFixed(2) + '%');
      halo.style.setProperty('--my', y.toFixed(2) + '%');
      enAttente = false;
    });
  }, { passive: true });
})();
