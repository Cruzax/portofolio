/* =========================================================
   theme.js — bascule clair / sombre
   Le choix est mémorisé dans localStorage. Sans choix
   explicite, on suit la préférence du système et on
   continue de la suivre si elle change en cours de route.
   ========================================================= */

(function () {
  'use strict';

  var KEY  = 'cruz-theme';
  var root = document.documentElement;
  var btn  = document.getElementById('theme-toggle');
  var mql  = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  /** Le thème réellement affiché, choix explicite ou système. */
  function current() {
    return root.getAttribute('data-theme') || (mql.matches ? 'dark' : 'light');
  }

  function sync() {
    if (!btn) return;
    var dark = current() === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('title', dark ? 'Passer en thème clair' : 'Passer en thème sombre');
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    sync();
  }

  if (btn) {
    btn.addEventListener('click', function () {
      apply(current() === 'dark' ? 'light' : 'dark');
    });
  }

  // Tant que rien n'a été choisi à la main, le système reste maître.
  var onSystemChange = function () { if (!stored()) sync(); };
  if (mql.addEventListener) mql.addEventListener('change', onSystemChange);
  else if (mql.addListener) mql.addListener(onSystemChange);

  sync();
})();
