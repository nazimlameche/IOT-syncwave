# DESIGN.md — Site vitrine Syncwave

Ce fichier est la référence unique de design du site. Toute page, section ou composant généré doit s'y conformer. En cas de doute entre une valeur de ce fichier et une valeur "habituelle", ce fichier gagne. Ne jamais inventer une couleur, une taille ou un rayon qui n'est pas défini ici : ajouter le token d'abord, l'utiliser ensuite.

Stack : Astro (site statique) + Tailwind v4. Pas de librairie de composants (pas d'antd, pas de MUI, pas de shadcn). Pas de React sauf besoin ponctuel justifié. Pas de 3D.

---

## 1. Intention

Syncwave est un bracelet connecté noir mat, traversé de bandes lumineuses cyan et magenta. Le site doit donner la même sensation que l'objet : **sombre, lumineux, précis, calme**. Un produit premium présenté comme une pièce de matériel, pas comme un SaaS.

Trois mots directeurs : **lumineux · épuré · tangible**.

Ce que le site n'est pas : un dashboard, une landing page SaaS à cards grises, un site "gaming" saturé de néons partout. La lumière est rare et donc précieuse : elle vient du produit et de quelques accents, jamais du décor.

Références de ton (à imiter dans l'esprit, jamais copier) : pages produit de wearables et d'audio haut de gamme — grand visuel produit, beaucoup de noir, texte court, une seule idée par écran.

---

## 2. Hiérarchie des marques

Deux marques cohabitent :

- **Syncwave** (le produit) : marque principale du site. Symbole = le "S" du boîtier. Porte toute l'identité visuelle.
- **Moore** (l'entreprise) : marque secondaire. Son logo (blason, tartan, mascotte) n'est pas compatible avec la DA sombre et doit rester discret.

Règles :
- Header : logo Syncwave (le "S" + wordmark) uniquement.
- Footer : mention "Un produit Moore" avec une **version monochrome simplifiée** du logo Moore (silhouette du blason en `--color-text-muted`, sans mascotte, sans tartan couleur, sans bannières). Si cette version n'existe pas dans `/public/brand/`, utiliser le texte seul "Moore" et signaler qu'il manque l'asset.
- Le logo Moore complet en couleur n'apparaît que dans la section "À propos / L'équipe", sur un fond `--color-surface`, à taille modérée (max 160 px de large).

---

## 3. Design tokens

Tous les tokens sont déclarés dans `src/styles/global.css` via `@theme` (voir §9). Les valeurs pipetées sur le rendu produit sont approximatives ; les ajuster est autorisé, mais uniquement dans ce fichier et dans `global.css`, jamais en dur dans un composant.

### 3.1 Couleurs

| Token | Valeur | Rôle |
|---|---|---|
| `--color-bg` | `#0D0D12` | Fond de page. Noir légèrement bleuté, comme le silicone sous lumière froide. Jamais `#000`. |
| `--color-surface` | `#15151C` | Surfaces surélevées (cartes de specs, footer, blocs de contenu). |
| `--color-surface-2` | `#1E1E27` | Second niveau (hover de surface, champs de formulaire). |
| `--color-line` | `rgba(237, 237, 242, 0.08)` | Traits et bordures. Toujours translucide. |
| `--color-text` | `#EDEDF2` | Texte principal. Blanc cassé, jamais `#FFF` pur. |
| `--color-text-muted` | `#9A9AA8` | Texte secondaire, légendes, footer. |
| `--color-cyan` | `#3FF0E4` | Accent principal. LED cyan du bracelet. |
| `--color-magenta` | `#E23AC0` | Accent secondaire. LED magenta du bracelet. |
| `--color-violet` | `#7A3FE0` | Point médian du gradient uniquement. Jamais seul. |

Gradient signature (reproduit la bande lumineuse) :

```css
--gradient-wave: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-violet) 50%, var(--color-magenta) 100%);
```

Halos (glow) — la seule "décoration" autorisée :

```css
--glow-cyan: 0 0 24px rgba(63, 240, 228, 0.35), 0 0 80px rgba(63, 240, 228, 0.15);
--glow-magenta: 0 0 24px rgba(226, 58, 192, 0.35), 0 0 80px rgba(226, 58, 192, 0.15);
```

Règles couleur :
- Le fond est toujours `--color-bg`. Pas de sections claires, pas d'alternance noir/blanc.
- **Une seule couleur néon dominante par section.** Le cyan est la couleur par défaut ; le magenta est réservé aux moments forts (CTA principal, une section maximum en dehors du hero).
- Le gradient est réservé à : le CTA principal, les traits/soulignements d'accent, les halos derrière le produit. **Jamais sur du texte courant, jamais en fond de section, jamais sur une bordure de card.**
- Les néons ne servent jamais de couleur de texte pour un paragraphe. En couleur de texte, ils ne sont autorisés que sur un chiffre-clé ou un lien, en petite quantité.
- Contraste : texte principal sur fond ≥ 7:1, texte muted ≥ 4.5:1. Vérifier les néons sur `--color-bg` avant de les utiliser en texte (le cyan passe, le magenta est limite en petite taille : ne pas l'utiliser sous 18 px).

### 3.2 Typographie

Deux familles, clairement distinctes, chargées depuis Google Fonts :

- **Display : Sora** (600 et 700). Géométrique, arrondie, ronde comme le boîtier. Titres et chiffres-clés.
- **Texte : Inter** (400 et 500). Paragraphes, navigation, boutons, légendes.

Échelle (base 16 px, ratio ~1.25) :

| Token | Taille | Usage |
|---|---|---|
| `--text-display` | `clamp(2.75rem, 6vw, 5rem)` / lh 1.02 / Sora 700 / letter-spacing -0.03em | Titre du hero uniquement |
| `--text-h1` | `clamp(2rem, 4vw, 3rem)` / lh 1.1 / Sora 600 / -0.02em | Titre de section |
| `--text-h2` | `1.5rem` / lh 1.2 / Sora 600 | Sous-titre, titre de bloc |
| `--text-body-lg` | `1.125rem` / lh 1.6 / Inter 400 | Chapô, texte de hero |
| `--text-body` | `1rem` / lh 1.6 / Inter 400 | Paragraphe |
| `--text-small` | `0.875rem` / lh 1.5 / Inter 400 | Légendes, footer, mentions |
| `--text-kpi` | `clamp(2.5rem, 5vw, 4rem)` / lh 1 / Sora 700 | Chiffres-clés (autonomie, poids…) |

Règles typo :
- Longueur de ligne max : 65 caractères (`max-width: 36rem` sur les paragraphes).
- Titres en sentence case. **Pas de majuscules espacées**, pas de "eyebrow" au-dessus des titres, pas de labels "01 / 02 / 03" sauf pour une vraie séquence (la section "Comment ça marche" en est une ; les fonctionnalités n'en sont pas une).
- Ne pas colorer un seul mot d'un titre en néon. Un titre est monochrome (`--color-text`).
- Pas de flèche "→" ajoutée au texte des liens et boutons.

### 3.3 Espacement

Échelle en rem, alignée sur 4 px : `1 = 0.25rem, 2 = 0.5rem, 3 = 0.75rem, 4 = 1rem, 6 = 1.5rem, 8 = 2rem, 12 = 3rem, 16 = 4rem, 24 = 6rem, 32 = 8rem`.

- Padding vertical d'une section : `--space-section: clamp(4rem, 10vw, 8rem)`.
- Conteneur : `max-width: 72rem`, padding horizontal `1.5rem` mobile / `3rem` desktop.
- Espace entre un titre de section et son contenu : `3rem`.
- Grilles : gap `1.5rem` mobile, `2rem` desktop.

### 3.4 Rayons

Le boîtier n'a aucun angle vif. Les rayons sont généreux et **hiérarchisés** : ne pas mettre le même rayon partout.

| Token | Valeur | Usage |
|---|---|---|
| `--radius-pill` | `9999px` | Boutons, tags |
| `--radius-lg` | `1.5rem` | Cartes de specs, blocs visuels |
| `--radius-md` | `0.75rem` | Champs de formulaire, petits blocs |
| `--radius-sm` | `0.375rem` | Éléments inline (code, badge) |

### 3.5 Élévation

Pas d'ombre grise classique (`rgba(0,0,0,.1)` interdit). Sur fond sombre, l'élévation se fait par :
1. changement de surface (`--color-surface` → `--color-surface-2`),
2. un trait `1px solid var(--color-line)`,
3. exceptionnellement un halo (`--glow-*`) pour les éléments lumineux.

### 3.6 Mouvement

| Token | Valeur |
|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--duration-fast` | `160ms` (hover, focus) |
| `--duration-base` | `320ms` (ouverture, transition d'état) |
| `--duration-slow` | `900ms` (moment orchestré du hero) |
| `--pulse-period` | `3.2s` (respiration des LED) |

---

## 4. Règles de mouvement

Le mouvement est concentré en **un seul moment** : l'arrivée du hero. Le reste du site est calme.

1. **Hero (le seul moment orchestré)** : au chargement, le produit apparaît (opacité 0 → 1, léger scale 0.96 → 1, `--duration-slow`, `--ease-out`), puis le halo derrière lui "s'allume" (opacité 0 → 1 avec un léger retard de 200 ms). Ensuite le halo respire indéfiniment : variation d'opacité 0.7 ↔ 1 sur `--pulse-period`, très douce. C'est la signature du site : les LED du bracelet qui pulsent.
2. **Aucune animation d'entrée sur les sections suivantes.** Pas de fade-and-slide-up à chaque section, pas de compteur qui s'anime, pas de card qui remonte au hover.
3. **Hover** : les boutons et liens réagissent (couleur, halo léger sur le CTA principal, `--duration-fast`). Les cards de contenu ne bougent pas au hover.
4. **Parallaxe** : autorisé uniquement sur le visuel produit du hero, et uniquement si l'implémentation est légère (CSS `animation-timeline: scroll()` ou 10 lignes de JS). Amplitude faible (≤ 40 px).
5. `prefers-reduced-motion: reduce` : tout mouvement est désactivé, y compris la respiration du halo. Le hero s'affiche directement dans son état final.

---

## 5. Composants

Inventaire fermé. Ne pas créer d'autre composant sans l'ajouter ici.

### Bouton
- **Primaire** : fond `--gradient-wave`, texte `--color-bg` (sombre sur clair, Inter 500), `--radius-pill`, padding `0.875rem 1.75rem`. Hover : `--glow-cyan` léger + luminosité +5 %. Un seul bouton primaire visible par écran.
- **Secondaire** : fond transparent, bordure `1px solid var(--color-line)`, texte `--color-text`. Hover : bordure devient `--color-cyan` à 40 % d'opacité.
- **Lien** : texte `--color-text`, soulignement `1px` en `--color-cyan` au hover. Pas de flèche.
- Focus visible : `outline: 2px solid var(--color-cyan); outline-offset: 3px` sur tous les éléments interactifs.

### Header
- Fixe en haut, fond `--color-bg` à 80 % + `backdrop-filter: blur(12px)`, trait bas `--color-line`.
- Gauche : logo Syncwave. Droite : 3-4 liens d'ancre + bouton primaire "Précommander" (ou le CTA choisi).
- Mobile : menu plein écran, fond `--color-bg`.

### Hero
- Le produit occupe l'écran. Layout desktop : titre + chapô + CTA à gauche (40 %), visuel produit à droite (60 %) avec halo `--glow-cyan` + `--glow-magenta` combinés derrière (deux ellipses floues, `filter: blur(80px)`, une cyan en haut, une magenta en bas, reprenant la disposition des LED).
- Mobile : produit d'abord, puis texte, empilés.
- Titre : `--text-display`, monochrome. Chapô : `--text-body-lg`, `--color-text-muted`, max 2 lignes. Un bouton primaire, un lien secondaire maximum.

### Bloc fonctionnalité
- Une fonctionnalité = un écran ou demi-écran, visuel d'un côté, texte de l'autre, alternance gauche/droite. **Pas une grille de 6 cards identiques avec icône.**
- Texte : `--text-h1` + un paragraphe `--text-body` ≤ 3 lignes.

### Séquence "Comment ça marche"
- Le seul endroit où une numérotation est autorisée (c'est une vraie séquence). Trois étapes maximum, numéros en Sora, `--color-text-muted`.

### Carte de specs
- Fond `--color-surface`, trait `--color-line`, `--radius-lg`, padding `2rem`.
- Chiffre en `--text-kpi` (`--color-text`), libellé en `--text-small` `--color-text-muted` dessous. Le chiffre le plus important du site (ex. autonomie) peut être en `--color-cyan` : un seul.

### Formulaire (précommande / contact)
- Champs : fond `--color-surface-2`, trait `--color-line`, `--radius-md`, texte `--color-text`, placeholder `--color-text-muted`. Focus : trait `--color-cyan`.
- Libellé au-dessus du champ, en `--text-small`, sentence case.
- Message de succès et d'erreur écrits en phrase complète ("Votre précommande est enregistrée." / "Cette adresse e-mail ne semble pas valide.").

### Footer
- Fond `--color-surface`, trait haut `--color-line`.
- Logo Syncwave, liens, mention "Un produit Moore" avec le logo Moore monochrome (voir §2), mentions légales en `--text-small`.

---

## 6. Structure du site (page unique, ancres)

1. **Hero** — le produit, une phrase, un CTA.
2. **Fonctionnalités** — 3 à 4 blocs alternés, un bénéfice par bloc.
3. **Comment ça marche** — 3 étapes numérotées.
4. **Caractéristiques** — grille de 4 à 6 cartes de specs (autonomie, poids, étanchéité, connectivité…).
5. **Précommande / Contact** — formulaire court (e-mail + bouton, ou nom + e-mail + message).
6. **À propos** — l'équipe Moore, logo Moore couleur autorisé ici.
7. **Footer**.

Chaque section a un titre en `--text-h1` et au plus un paragraphe d'introduction. Pas de section "Témoignages", "Partenaires" ou "FAQ" inventée s'il n'y a pas de contenu réel pour la remplir.

---

## 7. Rédaction

- Français, sentence case, voix active, phrases courtes.
- Le site décrit ce que le bracelet fait pour l'utilisateur, pas comment il est construit ("Suivez votre rythme cardiaque toute la nuit", pas "Capteur PPG optique intégré"). Les détails techniques vont dans la section Caractéristiques.
- Un CTA dit ce qui se passe : "Précommander", "Recevoir les nouveautés", jamais "Envoyer" ou "En savoir plus".
- Pas de superlatifs vides ("révolutionnaire", "ultime", "nouvelle génération"). Un chiffre vaut mieux qu'un adjectif.
- Si un contenu réel manque, écrire un placeholder plausible et **le signaler dans un commentaire `<!-- TODO: contenu à valider -->`**, ne pas inventer de caractéristique technique.

---

## 8. Assets

Dossier `/public/brand/` :
- `syncwave-mark.svg` — le "S" seul, monochrome, remplissable en `currentColor`.
- `syncwave-wordmark.svg` — "S" + "Syncwave".
- `moore-mono.svg` — blason Moore simplifié monochrome (à produire ; en attendant, texte "Moore").
- `moore-full.png` — logo Moore complet (section À propos uniquement).

Dossier `/public/product/` :
- `bracelet-hero.png` (ou `.webp`) — rendu principal, fond transparent. Le rendu existant est sur fond blanc : le détourer avant usage, un rendu sur fond blanc posé sur `--color-bg` est interdit.
- Autres angles si disponibles, mêmes contraintes.

Formats : WebP ou AVIF, largeur max 1600 px, `loading="lazy"` sur tout sauf le visuel du hero (qui a `fetchpriority="high"`).

---

## 9. Implémentation Tailwind v4 — `src/styles/global.css`

```css
@import "tailwindcss";

@theme {
  --color-bg: #0D0D12;
  --color-surface: #15151C;
  --color-surface-2: #1E1E27;
  --color-line: rgba(237, 237, 242, 0.08);
  --color-text: #EDEDF2;
  --color-text-muted: #9A9AA8;
  --color-cyan: #3FF0E4;
  --color-magenta: #E23AC0;
  --color-violet: #7A3FE0;

  --font-display: "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;

  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.5rem;
  --radius-pill: 9999px;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 160ms;
  --duration-base: 320ms;
  --duration-slow: 900ms;
}

:root {
  --gradient-wave: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-violet) 50%, var(--color-magenta) 100%);
  --glow-cyan: 0 0 24px rgba(63, 240, 228, 0.35), 0 0 80px rgba(63, 240, 228, 0.15);
  --glow-magenta: 0 0 24px rgba(226, 58, 192, 0.35), 0 0 80px rgba(226, 58, 192, 0.15);
  --space-section: clamp(4rem, 10vw, 8rem);
  --pulse-period: 3.2s;
}

html { background: var(--color-bg); color: var(--color-text); }
body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
h1, h2, h3 { font-family: var(--font-display); }
p { max-width: 36rem; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

Utiliser ensuite les classes Tailwind générées (`bg-bg`, `text-text-muted`, `text-cyan`, `rounded-lg`, `font-display`…) et les variables `var(--gradient-wave)` / `var(--glow-cyan)` en style inline ou en classe utilitaire dédiée. Toute valeur arbitraire de type `bg-[#123456]` ou `rounded-[13px]` est interdite.

Polices : charger Sora (600, 700) et Inter (400, 500) depuis Google Fonts dans `<head>` avec `display=swap`, ou en auto-hébergé via `@fontsource`.

---

## 10. Interdits (à relire avant chaque livraison)

- Fond blanc ou clair sur une section.
- Grille de cards identiques avec icône + titre + texte pour présenter les fonctionnalités.
- Ombre grise `rgba(0,0,0,.1)`, même rayon sur tous les éléments.
- Gradient sur du texte, en fond de section, ou sur une bordure.
- Deux couleurs néon dominantes dans la même section (hero excepté).
- Labels en majuscules espacées, eyebrow au-dessus des titres, "→" dans les boutons, un mot coloré dans un titre.
- Animation d'entrée sur chaque section, hover qui soulève les cards, compteurs animés.
- Logo Moore complet dans le header ou le footer.
- Rendu produit sur fond blanc posé sur le fond sombre.
- Valeurs en dur dans les composants (`#…`, `px` arbitraires) au lieu des tokens.
- Sections inventées sans contenu réel (témoignages, partenaires, FAQ).

---

## 11. Checklist de livraison

- [ ] Toutes les couleurs, tailles et rayons viennent des tokens.
- [ ] Un seul bouton primaire visible par écran.
- [ ] Le hero est le seul moment animé ; `prefers-reduced-motion` respecté.
- [ ] Contraste vérifié sur texte muted et sur tout usage des néons en texte.
- [ ] Focus visible sur tous les éléments interactifs.
- [ ] Responsive testé à 375 px, 768 px, 1280 px, 1600 px.
- [ ] Visuel hero en `fetchpriority="high"`, le reste en lazy.
- [ ] Lighthouse : performance et accessibilité ≥ 90.
- [ ] Aucun `TODO` de contenu laissé sans signalement.
