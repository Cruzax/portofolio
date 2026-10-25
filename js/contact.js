/* =========================================================
   contact.js — copie de l'adresse mail et année du pied de page.
   ========================================================= */

(function () {
  'use strict';

  var annee = Cruz.un('#year');
  if (annee) annee.textContent = String(new Date().getFullYear());

  var bouton = Cruz.un('#copy-mail');
  if (!bouton) return;

  // Presse-papiers indisponible (http non sécurisé, vieux navigateur) :
  // le bouton disparaît plutôt que de rester sans effet.
  if (!navigator.clipboard) { bouton.hidden = true; return; }

  var libelle = bouton.textContent;
  var minuteur;

  var repondre = function (texte) {
    bouton.textContent = texte;
    clearTimeout(minuteur);
    minuteur = setTimeout(function () { bouton.textContent = libelle; }, 2200);
  };

  bouton.addEventListener('click', function () {
    navigator.clipboard.writeText(bouton.getAttribute('data-mail'))
      .then(function () { repondre('Adresse copiée ✓'); })
      .catch(function () { repondre('Copie impossible'); });
  });
})();
