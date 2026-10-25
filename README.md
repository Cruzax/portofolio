# Cruz.dev — portfolio

Portfolio one-page de **Benjamin Scheurer (Cruz.dev)**, développeur web.
**HTML / CSS / JS vanilla. Aucun framework, aucun build, aucun serveur.**

## Lancer

Ouvre `index.html` dans un navigateur. **Aucune requête réseau** : polices comprises, tout est servi
depuis le dossier.

## Structure

Chaque fichier fait une chose. Pour retrouver une règle, on part de ce qu'on veut changer :
un composant, une section, ou le socle commun.

```
index.html              la page : contenu en dur, lisible sans JavaScript
mentions-legales.html   mentions légales (complètes)

css/base/               le socle, commun à tout le site
  fonts.css               @font-face des trois polices locales
  tokens.css              variables : couleurs des deux thèmes, tailles, rythme
  reset.css               remise à zéro du document
  typographie.css         titres, paragraphes, code
  utilitaires.css         mono, lead, mark, sr-only, lien d'évitement
  textures.css            grain, halo d'accent, réglures verticales
  animations.css          révélations au scroll + prefers-reduced-motion

css/layout/             l'ossature de la page
  page.css                enveloppe, sections, entêtes de section
  topbar.css              barre haute : marque, navigation, repli mobile
  footer.css              pied de page

css/components/         les briques réutilisables
  boutons.css             plein, accent, fantôme
  tags.css                puces et étiquettes
  card.css                carte générique (section Compétences)
  icon-link.css           liens en icône (GitHub, LinkedIn)
  theme-toggle.css        bascule clair / sombre
  notice.css              encadré pointillé des notes
  filters.css             filtres de projets et compteur
  project-card.css        grille de projets + corps d'une carte
  project-plate.css       la planche : capture, trame, badge
  marquee.css             bandeau attelé au défilement

css/sections/           une feuille par section de la page
  hero.css   services.css   stack.css
  methode.css   a-propos.css   contact.css

js/                     un fichier par comportement, tous en defer
  outils.js               le minimum partagé — à charger en premier
  theme.js                bascule clair / sombre, mémorisée
  revelations.js          apparition des blocs au scroll
  navigation.js           trait de la barre haute + section active
  filtres.js              filtrage des projets
  contact.js              copie du mail + année du pied de page
  halo.js                 la tache d'accent qui suit le pointeur

assets/fonts/           Unbounded, Instrument Sans, JetBrains Mono (woff2)
assets/img/             portrait détouré + captures des six projets
```

**Où modifier quoi.** Une couleur ou une taille : `css/base/tokens.css`, jamais ailleurs.
L'apparence d'une carte projet : `css/components/project-card.css`. La mise en page d'une
section précise : le fichier du même nom dans `css/sections/`. Un comportement : le fichier
`js/` qui porte son nom.

Les feuilles sont liées une par une dans le `<head>`, groupées par famille. C'est verbeux,
mais elles se téléchargent en parallèle : un `@import` unique serait plus court à lire et
plus lent à charger.

## Parti pris

- **Contenu en dur dans le HTML**, pas généré en JavaScript : la page reste complète et
  indexable sans script. Le JS n'ajoute que du confort.
- **Projets en grille de cards.** Chaque card montre une capture, une accroche courte et trois
  tags ; le détail est replié dans un `<details>` natif — sans JavaScript, accessible au clavier,
  et le texte reste dans le HTML pour les moteurs de recherche.
- **Thème par défaut = celui du système.** Un clic sur la bascule fige le choix dans
  `localStorage`. Le thème est appliqué par un script inline dans le `<head>` pour éviter le
  flash blanc.
- **Accessibilité** : lien d'évitement, `:focus-visible` partout, contrastes tenus dans les deux
  thèmes, `aria-pressed` sur les filtres et la bascule, `aria-live` sur le compteur de projets,
  et `prefers-reduced-motion` respecté.

## Refaire les captures

Les captures ont été prises avec Chrome en headless, en 1440 × 1060 (le cadrage 16/9 des cards
rogne le bas, ce qui élimine les bandeaux cookies).

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,1060 --virtual-time-budget=9000 \
  --screenshot="assets/img/assomar.png" "https://assomar.fr"
```

Pour une page qui demande une connexion ou dont les animations doivent être achevées
(cas de RAOUT), passer par le script piloté `capture.js` du dossier de travail, qui exécute du
JavaScript dans la page avant de déclencher la capture.

## Ce qui reste à faire

- [x] Mentions légales complétées (SIRET, APE, hébergeur OVH) — vérifier le SIRET sur l'avis SIRENE
- [ ] Mettre à jour le bloc Hébergement si le site est déposé ailleurs qu'OVH (alternatives en commentaire dans la page)
- [ ] Brancher un vrai formulaire de contact (nécessite un serveur ou un service tiers)
- [ ] Mettre le profil LinkedIn à jour — il est lié depuis le site
- [x] Polices hébergées en local — plus aucune dépendance à Google Fonts
- [ ] Refaire les captures de Sillon et RAOUT quand ils auront avancé
