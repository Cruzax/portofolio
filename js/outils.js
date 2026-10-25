/* =========================================================
   outils.js — le strict minimum partagé par les autres scripts.
   Doit être chargé en premier.
   ========================================================= */

window.Cruz = {
  /** Un seul élément. */
  un: function (selecteur, racine) {
    return (racine || document).querySelector(selecteur);
  },

  /** Tous les éléments, sous forme de vrai tableau. */
  tous: function (selecteur, racine) {
    return Array.prototype.slice.call((racine || document).querySelectorAll(selecteur));
  },

  /** L'utilisateur a demandé à limiter les animations. */
  mouvementReduit: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};
