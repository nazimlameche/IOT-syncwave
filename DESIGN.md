# DESIGN.md — Site vitrine Syncwave

Ce fichier est la référence unique de design du site. Toute page, section ou composant généré doit s'y conformer. En cas de doute entre une valeur de ce fichier et une valeur "habituelle", ce fichier gagne. Ne jamais inventer une couleur, une taille ou un rayon qui n'est pas défini ici : ajouter le token d'abord, l'utiliser ensuite.

Stack : Astro (site statique) + Tailwind v4. Pas de librairie de composants d'interface (pas d'antd, pas de MUI, pas de shadcn). React sert uniquement aux effets animés, copiés de React Bits dans `src/components/react/` : îlots `PageBackground` (fond animé de toute la page), `HeroWordmark` (titre du hero et son orbite d'icônes), `CardText` (un par texte de carte qui se déplie), `TeamCard` (cartes de l'équipe), `FooterRing` et `SyncwaveWordmark` (logo et mot du pied de page), plus `StarBorder`, rendu côté serveur sans aucun JS envoyé. Voir §5. `ogl`, `gsap` et `motion` ne sont importés que par ces composants. Pas de 3D au sens « modèle 3D » : le shader du fond (GradientWaves, via `ogl`) est le seul rendu WebGL du site. Tout le reste est en `.astro`.

---

## 1. Intention

Syncwave est un bracelet connecté noir mat, traversé de bandes lumineuses cyan et magenta. Le site doit donner la même sensation que l'objet : **sombre, lumineux, précis, calme**. Un produit premium présenté comme une pièce de matériel, pas comme un SaaS.

Trois mots directeurs : **lumineux · épuré · tangible**.

Ce que le site n'est pas : un dashboard, une landing page SaaS à cards grises, un site "gaming" saturé de néons partout. La lumière est rare et donc précieuse : elle vient du produit et de quelques accents, jamais du décor.

Références de ton (à imiter dans l'esprit, jamais copier) : pages produit de wearables et d'audio haut de gamme — grand visuel produit, beaucoup de noir, texte court, une seule idée par écran.

---

## 2. Hiérarchie des marques

Deux marques cohabitent :

- **Syncwave** (le produit) : marque principale du site. Symbole = le pictogramme "S" fourni (`/public/brand/syncwave-mark-512.png`), bicolore cyan/magenta avec visage et rayons. C'est la **seule exception** à la règle « une couleur néon dominante par section » et au ton « calme » du §1 : il n'apparaît qu'à petite taille (40 px dans le header et le footer, favicon), jamais agrandi en visuel de section. Le wordmark reste le mot « Syncwave » en Sora 700, pas le lettrage de l'image.
- **Mooroon 5** (l'entreprise) : marque secondaire. Son logo (blason, tartan, mascotte) n'est pas compatible avec la DA sombre et doit rester discret.

Règles :
- Header : logo Syncwave (le "S" + wordmark) uniquement.
- Footer : mention "Un produit Mooroon 5" avec une **version monochrome simplifiée** du logo Mooroon 5 (silhouette du blason en `--color-text-muted`, sans mascotte, sans tartan couleur, sans bannières). Si cette version n'existe pas dans `/public/brand/`, utiliser le texte seul "Mooroon 5" et signaler qu'il manque l'asset.
- Le logo Mooroon 5 complet en couleur n'apparaît que dans la section "À propos / L'équipe", sur un fond `--color-surface`, à taille modérée (max 160 px de large).

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
| `--color-violet` | `#7A3FE0` | Point médian du gradient. Seul, uniquement comme couleur d'horizon du fond animé du hero (§4 bis). |

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
- Exception aux majuscules : dans le bas de page uniquement, le titre du bandeau d'appel (`uppercase`) et la signature du pied de page (`uppercase`, `tracking-widest`), comme la référence fournie (§5 Bas de page).
- Ne pas colorer un seul mot d'un titre en néon. Un titre est monochrome (`--color-text`).
- Pas de flèche "→" ajoutée au texte des liens et boutons.

### 3.3 Espacement

Échelle en rem, alignée sur 4 px : `1 = 0.25rem, 2 = 0.5rem, 3 = 0.75rem, 4 = 1rem, 6 = 1.5rem, 8 = 2rem, 12 = 3rem, 16 = 4rem, 24 = 6rem, 32 = 8rem`.

- Padding vertical d'une section : `--space-section: clamp(4rem, 10vw, 8rem)`.
- Conteneur : `max-width: 72rem` (`--container-content`) ; cartes de section : `max-width: 60rem` (`--container-card`) ; padding horizontal `1.5rem` mobile / `3rem` desktop.
- Espace entre un titre de section et son contenu : `3rem`.
- Grilles : gap `1.5rem` mobile, `2rem` desktop.

### 3.4 Rayons

Le boîtier n'a aucun angle vif. Les rayons sont généreux et **hiérarchisés** : ne pas mettre le même rayon partout.

| Token | Valeur | Usage |
|---|---|---|
| `--radius-pill` | `9999px` | Boutons, tags |
| `--radius-xl` | `2rem` | Cartes de section, footer |
| `--radius-lg` | `1.5rem` | Cartes de specs, visuels encadrés (MediaCard) |
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
| `--duration-header` | `700ms` (apparition / disparition du header, lente et régulière) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` (glissement du header, symétrique) |
| `--pulse-period` | `3.2s` (respiration des LED) |

---

## 4. Règles de mouvement

Le hero est le moment fort ; les cartes s'animent ensuite avec retenue, une seule fois par passage.

1. **Fond animé de toute la page** : GradientWaves (houle de vagues violet et magenta) est un calque fixe derrière tout le contenu. Il apparaît en fondu (opacité 0 → 1, `--duration-slow`, `--ease-out`) dès que son canvas est prêt, ondule lentement, et la caméra suit légèrement la souris (parallaxe). Il reste visible entre les cartes et autour d'elles.
2. **Hero** : le mot « Syncwave » se dessine en contour puis se remplit de gauche à droite, et recommence en boucle (pause de 0,9 s entre deux cycles), pendant que quatre petites icônes de fonctions (SOS, accès, paiement, plateforme) tournent lentement autour de lui sur une ellipse, sans jamais croiser les lettres.
3. **Hero, taille** : le mot est plus grand que `--text-display` (`--wordmark-height`, §4 bis), borné sur mobile pour que l'orbite tienne dans l'écran.
4. **Textes des cartes** : chaque titre et paragraphe d'une carte de section se déplie mot par mot depuis son bord haut (FoldText) quand il entre dans l'écran (82 % de la hauteur). Il ne se replie pas en remontant, sauf si l'on revient tout en haut de la page : tous les textes sont alors repliés et se redéplieront au prochain passage.
5. **Récit en cartes empilées** (§5 Récit) : chaque chapitre se fige en haut de l'écran (`position: sticky`) et le suivant monte le recouvrir. La carte recouverte recule (−3,5 % par carte posée dessus) et s'assombrit (voile `--color-bg` à 22 % par carte), jusqu'à trois cartes de profondeur ; au-delà elle disparaît. Les bords des chapitres passés restent visibles au-dessus (décalage de `0.875rem` par carte) : la pile est la mémoire du récit. Chaque chapitre a son moment animé, joué quand il devient actif (voir §5 Récit) ; un chapitre passé reste dans son état final ; tout est rejoué après un retour en haut de page. Sur mobile, pas d'empilement : les cartes défilent, les moments se jouent quand la carte atteint le tiers haut de l'écran.
5 bis. **Bordure des cartes** : un reflet cyan glisse lentement le long des bords haut et bas de chaque carte (StarBorder, 6 s, aller-retour).
6. **Pied de page** : le texte « SYNCWAVE • MOOROON 5 • » tourne lentement autour du logo (CircularText, un tour en 20 s, accéléré au survol) ; à côté, « Syncwave » se dessine en boucle comme dans le hero.
7. **Cartes de l'équipe** : légère inclinaison 3D et reflet holographique qui suivent le pointeur (ProfileCard).
8. **Header masquable** : transition fonctionnelle. Le header n'est visible qu'en haut de page ; il glisse vers le haut dès qu'on descend et redescend quand on revient en haut : `transform: translateY`, `--duration-header`, `--ease-in-out`. Voir §5 Header.
9. **Hover** : les boutons et liens réagissent (couleur, halo léger sur le CTA principal, `--duration-fast`). Les cards de contenu ne bougent pas au hover. Pas de compteur animé.
10. **Parallaxe** : uniquement celle de la caméra du fond (point 1).
11. `prefers-reduced-motion: reduce` : tout mouvement est désactivé.
   - Fond : vagues figées (`speed: 0`), sans parallaxe (`mouseInteraction: false`) ni grain animé (`grain: false`), sans fondu d'entrée.
   - Titre du hero : `StrokeText` s'affiche directement rempli, sans boucle ; l'orbite d'icônes est figée (`paused`).
   - Textes des cartes : simple fondu court, sans pliage (géré par FoldText).
   - Bordure des cartes : reflet immobile (règle CSS globale du §9).
   - Récit : les cartes s'empilent sans recul ni assombrissement ; la vue éclatée est ouverte d'emblée ; les moments animés et les scènes SVG s'affichent directement dans leur état final (paiement validé, foule allumée, équipe arrivée) ; les boucles sont coupées.
   - Pied de page : anneau de texte figé (durée de rotation rendue imperceptible, pas d'accélération au survol) ; « Syncwave » affiché rempli.
   - Cartes de l'équipe : pas d'inclinaison (`enableTilt: false`).
   - Header : apparaît et disparaît sans transition.

---

## 4 bis. Paramètres d'effets

Tous les paramètres des effets vivent dans **un seul objet de config**, `EFFECTS`, en tête de `src/components/react/effects.js`. Aucun paramètre d'effet n'est passé en dur ailleurs. Les couleurs n'y figurent pas : elles sont lues à l'exécution sur les tokens (`getComputedStyle(document.documentElement).getPropertyValue('--color-…')`), jamais en hex.

**`EFFECTS.background`** (props de `GradientWaves`) :

| Paramètre | Valeur | Rôle |
|---|---|---|
| `horizonColor` / `waveColor` / `crestColor` | tokens `--color-violet` / `--color-magenta` / `--color-text` | Horizon, corps des vagues, crêtes proches. Lus à l'exécution. |
| `speed` | `0.4` | Vitesse de la houle. |
| `amplitude` / `waveScale` / `waveRatio` | `2.5` / `0.6` / `0.9` | Hauteur et fréquence des vagues. |
| `swell` / `turbulence` | `35` / `20` | Distorsions à grande échelle. |
| `tilt` / `zoom` / `height` | `1.11` / `1.0` / `5.5` | Caméra : inclinaison vers l'horizon, champ, hauteur de l'horizon. |
| `fogDepth` | `15` | Distance de fondu des vagues vers l'horizon et la transparence. |
| `detail` | `'medium'` | Qualité du raymarching. |
| `brightness` / `opacity` | `1.0` / `1.0` | Luminosité et opacité de l'effet. |
| `mouseInteraction` / `parallaxStrength` | `true` / `0.5` | Parallaxe de caméra au pointeur. |
| `grain` / `grainIntensity` | `true` / `0.05` | Grain de film très léger. |
| `idleTimeout` | voir le fichier | Délai max (ms) avant de charger `ogl` si le navigateur n'est jamais inactif. |

Contraste mesuré dans le hero sur les vagues réelles (pire de 5 images, 375 / 1280 / 1920 px) : titre ≥ 8.1:1, chapô et lien ≥ 6.1:1. Dans les cartes, le texte est sur `--color-surface` opaque : le fond n'intervient pas.

**`EFFECTS.backgroundReducedMotion`** : surcharge appliquée sous `prefers-reduced-motion` (`speed: 0`, `mouseInteraction: false`, `grain: false`).

**`EFFECTS.wordmark`** (props de `StrokeText`) :

| Paramètre | Valeur | Rôle |
|---|---|---|
| `strokeColor` / `fillColor` | token `--color-text` | Titre monochrome (§3.2). |
| `strokeWidth` | `1.4` | Épaisseur du contour. |
| `drawDuration` | `1.6` | Durée du tracé de chaque lettre (s). |
| `fillDelay` | `0.2` | Pause entre le tracé et le remplissage (s). |
| `stagger` | `0.05` | Décalage entre lettres (s). |
| `ease` | `'power2.out'` | Easing GSAP du tracé. |
| `trigger` / `fillMode` | `'loop'` / `'wipe'` | Tracé et remplissage répétés en boucle (0,9 s de pause, fixé par le composant), remplissage en balayage. |
| `fontSize` | `128` | Taille de mesure (nombre, pas une taille d'affichage). La taille affichée est pilotée en CSS : `.hero-title .stroke-text__svg { height: var(--wordmark-height) }`. |
| `fontWeight` | `700` | Sora 700, chargée (`document.fonts.load`) avant la mesure. |
| `letterSpacing` | `-4` | ≈ `-0.03em` à 128 px, comme `--text-display`. |

**`EFFECTS.orbit`** (props d'`OrbitImages`, espace de dessin de `baseWidth` unités mis à l'échelle sur `--orbit-size`) :

| Paramètre | Valeur | Rôle |
|---|---|---|
| `images` | 4 icônes de `/public/hero/` | SOS, accès, paiement, plateforme (§8). |
| `shape` / `rotation` | `'ellipse'` / `-4` | Ellipse légèrement inclinée autour du mot. |
| `baseWidth` | `1000` | Espace de dessin. |
| `radiusX` / `radiusY` | `430` / `158` | Rayons, réglés pour que les icônes ne croisent jamais les lettres. |
| `itemSize` | `80` | Taille d'une icône (≈ 24 px à 375 px, ≈ 43 px sur desktop). |
| `duration` / `direction` | `30` / `'normal'` | Un tour en 30 s. |
| `responsive` | `true` | Mise à l'échelle sur la largeur du conteneur. |

Dimensions CSS associées (`global.css`, `.hero-wordmark`) : `--wordmark-height: min(calc(var(--text-display) * 1.4), calc((100vw - 3rem) / 7))` (grand mot, borné sur mobile pour que l'orbite tienne dans l'écran), `--orbit-size: calc(var(--wordmark-height) * 7)`, hauteur réservée `calc(var(--orbit-size) * 0.4)`.

**`EFFECTS.foldText`** (props de `FoldText`, via l'îlot `CardText`) :

| Paramètre | Valeur | Rôle |
|---|---|---|
| `splitBy` | `'word'` | Découpage par mot (par lettre, les mots se couperaient en fin de ligne). |
| `hinge` | `'top'` | Charnière du pliage : bord haut. |
| `trigger` | `'scroll'` | Dépliage à l'entrée dans l'écran (82 % de la hauteur), une fois par passage. |
| `duration` / `stagger` | `0.65` / `0.03` | Durée par mot et décalage entre mots (s). |
| `ease` | `'power3.out'` | Easing GSAP. |
| `perspective` / `creaseShading` | `700` / `0.55` | Profondeur 3D et ombre du pli. |

Police, taille, graisse et couleur sont héritées de l'élément parent (`fontSize="inherit"`, `color="currentColor"`) ; `.fold-text.card-text` rétablit aussi l'interlignage et l'approche du parent. Le retour en haut de page est signalé par l'événement `syncwave:page-top` (`PAGE_TOP_EVENT`), émis par le header ; chaque `CardText` remonte alors son `FoldText`.

**`EFFECTS.cardBorder`** (props de `StarBorder`) :

| Paramètre | Valeur | Rôle |
|---|---|---|
| `colorToken` | `--color-cyan` | Couleur du reflet (passée en `var()`). |
| `speed` | `'6s'` | Durée d'un aller du reflet. |
| `thickness` | `1` | Épaisseur (px) de la bande où passe le reflet, en haut et en bas. |

Fond, texte et trait de la carte : `--color-surface`, `--color-text`, `--color-line`. `.section-card` remet le rayon (`--radius-xl`), l'alignement à gauche et la taille de police que le CSS de StarBorder fixe pour un bouton.

**`EFFECTS.footerRing`** (props de `CircularText`) : `text: 'SYNCWAVE • MOOROON 5 • '`, `spinDuration: 20` (s par tour), `onHover: 'speedUp'`. Taille (6rem), police (Sora 700) et couleur (`--color-text`) fixées en CSS sur `.circular-text.footer-ring`.

**`EFFECTS.profileCard`** (props de `ProfileCard`) : `contactText: 'Contacter'` (le bouton mène à `#demo`), `innerGradient` (`--color-violet` → `--color-cyan`, via `color-mix`), `behindGlowColor` (`--color-cyan` à 67 %), `behindGlowEnabled: true`, `enableTilt: true`. Pas de motif ni de grain (`iconUrl`, `grainUrl` vides). Largeur `min(18rem, 80vw)` fixée en CSS sur `.team-list .pc-card`. Survol atténué en CSS (`.team-list`) : halo à 30 %, reflet holographique à 35 % et plus sombre, éblouissement à 45 %. Luminance moyenne mesurée au survol : environ 112 contre 209 avec le réglage d'origine (93 au repos).

Modifier un effet = modifier cet objet et ce tableau, dans le même commit.

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
- **Masquable** : visible uniquement en haut de page (défilement < 16 px, `HEADER_TOP_THRESHOLD`). Dès qu'on descend, il glisse vers le haut et disparaît ; quand on revient en haut, il redescend (`--duration-header`, `--ease-in-out`). Il émet alors `syncwave:page-top`, qui replie les textes des cartes. Au chargement il est dans son état correct sans animation (visible en haut de page, masqué si la page s'ouvre plus bas). Masqué = `inert` + `aria-hidden="true"`. Il reste affiché si le menu mobile est ouvert ou si le focus clavier entre dans le header (`focusin`). La logique est isolée dans une fonction avec deux constantes en tête (seuil du haut de page, mode `'top-only'`) pour pouvoir passer plus tard au mode « réapparaît dès qu'on remonte ».

### Hero
Trois variantes, une seule utilisée à la fois :
- **Produit** : le produit occupe l'écran. Layout desktop : titre + chapô + CTA à gauche (40 %), visuel produit à droite (60 %) avec halo `--glow-cyan` + `--glow-magenta` combinés derrière (deux ellipses floues, `filter: blur(80px)`, une cyan en haut, une magenta en bas, reprenant la disposition des LED). Mobile : produit d'abord, puis texte, empilés.
- **Bandeau photo** (non retenue) : photo d'ambiance plein écran (`min-height: 100dvh`, `object-fit: cover`), voile `bg-scrim` (dégradé de `--color-bg` vers transparent, du bas vers le haut, ce n'est pas le gradient signature) pour la lisibilité, texte posé en bas à gauche dans le conteneur, un halo cyan flou sur la zone lumineuse de la photo. Une seule couleur néon dominante sur la photo.
- **Fond animé** (variante retenue) : `min-height: 100dvh`, contenu centré horizontalement et verticalement. Calques, de bas en haut :
  1. fond animé de la page (`PageBackground`, calque fixe, voir §5), le hero lui-même est transparent ;
  2. calque de texte en `pointer-events: none` (les boutons en `pointer-events: auto`), pour que le fond reçoive la souris.
  Titre : `h1` statique contenant le texte complet en `sr-only` (« Syncwave, créons ensemble le festival de demain ») ; la partie visible est `aria-hidden` : ligne 1 « Syncwave » dessinée par l'îlot `HeroWordmark` et entourée de son orbite d'icônes (Sora 700, hauteur réservée pour le mot et l'orbite, voir §4 bis, `<noscript>` de repli), ligne 2 « Créons ensemble le festival de demain » en `--text-h1`, monochrome. Puis chapô, bouton primaire et lien secondaire, centrés.
- Dans tous les cas : titre `--text-display` (ou wordmark à la même hauteur), monochrome. Chapô : `--text-body-lg`, max 2 lignes, en `--color-text-muted` (en `--color-text` sur la variante « Fond animé », pour rester lisible sur les vagues). Un bouton primaire, un lien secondaire maximum. Le bouton primaire du header passe en secondaire tant que le hero est visible avec son propre bouton primaire (règle « un seul bouton primaire par écran »).

### PageBackground (îlot React)
- `src/components/react/PageBackground.jsx`, chargé en `client:only="react"` dans un calque `fixed inset-0 -z-10` en tête de `index.astro` : le fond couvre toute la page, derrière le hero et entre les cartes. `body` n'a donc pas de fond propre (`html` porte `--color-bg`).
- Enveloppe `GradientWaves` (copie React Bits, sans modification ; il se met en pause quand l'onglet est masqué). Le calque étant fixe, il est toujours à l'écran et tourne en continu.
- `ogl` (≈ 15 Ko gzip avec le composant) est chargé en import dynamique après le premier rendu (`requestIdleCallback`), pour ne pas bloquer le LCP. WebGL 2 testé avant : indisponible → rien n'est chargé, le fond reste `--color-bg`.
- Une erreur dans cet îlot ne doit jamais casser le reste (erreur capturée localement).

### HeroWordmark (îlot React)
- `src/components/react/HeroWordmark.jsx`, chargé en `client:only="react"` (sinon le rendu serveur affiche le texte plein puis relance l'animation). Enveloppe `StrokeText` (copie React Bits).
- Attend `document.fonts.load` de Sora 700 avant de monter, sinon la mesure du `viewBox` est fausse et le mot est rogné.
- Contient aussi l'orbite d'icônes (`OrbitImages`, copie React Bits sans modification, dépendance `motion`) : même îlot, pas de troisième îlot React.

### Carte de section
Carte compacte posée sur le fond animé, utilisée après le récit pour la demande de démo.
- `SectionCard.astro` : `section` rendue par `StarBorder` (bordure animée, §4 bis), fond `--color-surface`, `--radius-xl`, padding `1.5rem` / `2rem`. Cartes centrées, `max-width: --container-card`, espacées de `1rem` / `1.5rem`.
- Desktop, grille 3 / 2 colonnes. **Gauche** : titre `--text-h2` (`h2`, ou `h3` pour une fonctionnalité), description `--text-body` `--color-text-muted` en dessous, puis trois points clés (`Points.astro` : coche `--color-cyan` + texte `--color-text`). Aucune carte ne reste avec un titre seul. **Droite** (slot `aside`) : l'image (`MediaCard`) ou, sans image, le contenu (étapes, cartes de specs, formulaire). Sans slot `aside`, une seule colonne. Mobile : tout empilé.
- `MediaCard.astro` : fond `--color-surface-2`, `--radius-lg`, padding `0.75rem` ; visuel `--radius-md` plein cadre en 16:9 (`object-fit: cover`) ; légende `--text-small` en dessous avec le pictogramme Syncwave à droite. Un pictogramme dans un bloc `--color-surface` n'est qu'un placeholder à signaler en TODO.
- Textes de carte : chaque titre, description et point clé passe par `Fold.astro` (îlot `CardText`, `client:idle`). Le texte est rendu côté serveur (référencement) et reste plié (`opacity: 0`) jusqu'à son dépliage. FoldText écrit les espaces en insécables, qui créeraient un retrait en début de ligne : dans les cartes, ils sont masqués et les mots espacés par une marge de `0.28em` ; sans JS, un `<noscript>` dans `Layout.astro` l'affiche directement.

### Récit (StoryStack + StoryCard)
Le cœur de la page : une nuit de festival racontée du point de vue de l'organisateur, l'acheteur. Neuf chapitres, un moment chacun, dans l'ordre d'un programme de festival :

| Heure | Chapitre | Phrase à retenir | Moment animé |
|---|---|---|---|
| Aujourd'hui | Le constat | Un festival, cinq prestataires. | Les cinq prestataires (billetterie, paiement, sécurité, lumière, données) sont barrés un à un, puis « 1 bracelet Syncwave » apparaît (fond `--gradient-wave`). |
| Et si… | L'idée | Et si tout tenait dans un bracelet ? | Vue éclatée en 2,5D pilotée au scroll : le bracelet arrive assemblé, s'ouvre pièce par pièce pendant que la carte monte, puis les numéros 01 à 05 apparaissent et les pièces flottent (`#sous-le-silicone`). |
| J-30 | La préparation | Vous préparez. Le bracelet fait le reste. | Les trois étapes se cochent l'une après l'autre (`#comment-ca-marche`). |
| 18:00 | Ouverture des portes | Le billet est déjà au poignet. | Un anneau cyan se trace, la coche apparaît, « Accès validé », puis un halo qui respire. |
| 21:00 | Les bars se remplissent | Un geste, c'est payé. | Scène SVG : le poignet approche du terminal, ondes NFC, l'écran passe à « Payé », la LED du bracelet s'allume. En boucle. |
| 23:00 | La tête d'affiche | La foule devient le show. | Scène SVG : une scène, des faisceaux qui balaient, une foule de bracelets (points) qui s'allument par vagues cyan et magenta depuis la scène. En boucle. |
| 01:00 | Une alerte | Une alerte, une position, une équipe en route. | Scène SVG : plan du festival, le signal SOS magenta pulse, l'alerte s'affiche, l'équipe de sécurité suit l'allée jusqu'au point, les amis sont localisés à côté. En boucle. |
| Toute la nuit | La régie | Vous voyez tout, en direct. | Les barres du tableau de bord montent une à une. |
| Le lendemain | Le bilan | Une seule facture. | « 5 factures » se barre, « 1 facture » apparaît ; le prix et les specs ; bouton « Demander une démo » (`#caracteristiques`). |

- **Titre du récit** au-dessus de la pile : « Une nuit de festival avec Syncwave » (`--text-h1`) et une phrase d'intro. Ancre `#fonctionnalites`.
- **StoryCard.astro** : `StarBorder` (bordure animée), fond `--color-surface`, `--radius-xl`. En-tête : l'heure en Sora 700 `--text-h2` `--color-cyan` (le repère qui revient à chaque carte) et le nom du chapitre en `--text-small` `--color-text-muted`. Gauche (3/5) : la phrase à retenir en `--text-h1`, le texte `--text-body` `--color-text-muted`, jusqu'à trois points clés. Droite (2/5) : le visuel et son moment. Tous les textes se déplient (FoldText).
- **StoryStack.astro** : la pile (dès 768 px), centrée, `max-width: --container-card`. Pas de programme ni de sommaire à côté : l'heure en tête de chaque carte suffit comme repère.
- **Phrase à retenir** : elle se déplie d'un seul bloc (`split="line"` sur `Fold`), comme un panneau qui bascule ; les espaces insécables devant « ? ! : ; » sont ajoutés automatiquement.
- **Visuels animés** (`src/components/motion/`), tous en SVG ou en calques, couleurs par classes de tokens (`fill-cyan`, `stroke-line`…), boucles jouées seulement quand le chapitre est actif ; hors animation (mouvement réduit, chapitre pas encore atteint), chaque scène montre son état final :
  - `ExplodedView.astro` : cinq calques détourés de `vue-eclatee.webp` (`/public/product/eclate/`), superposés. Assemblés dans le logement du module (37,5 % de la hauteur), les pièces internes (LED, carte, batterie) masquées ; `--story-explode` (0 → 1, posé par StoryStack, lissé) les écarte vers leur position réelle pendant que la carte monte (de 25 % à 100 % de sa couverture). Numéros 01–05 à droite, qui apparaissent l'un après l'autre en fin d'éclatement. Liste des pièces dans la colonne de gauche.
  - `PayMotion.astro`, `CrowdMotion.astro`, `SosMotion.astro` : scènes 400 × 300 décrites dans le tableau ci-dessus.
- **Réglages** (custom properties sur `.story`, `global.css`) : `--story-top: 1.5rem` (position figée de la première carte ; le header est alors masqué), `--story-peek: 0.875rem`, `--story-dwell: 40svh` (défilement entre deux cartes, le temps de lire), `--story-step: 3.5%`, `--story-shade: 0.22`, `--story-stagger: 140ms`.
- **Script** (dans StoryStack) : pour chaque carte, sa « couverture » (0 → 1, du bas de l'écran à sa position figée) ; la profondeur d'une carte est la somme des couvertures des suivantes (`--story-depth`). La dernière carte couverte à plus de 50 % est active (`.is-active`), les précédentes passées (`.is-past`). Les états « avant le moment » ne s'appliquent qu'une fois le script prêt (`.story[data-ready]`) : sans JS, tout est visible dans son état final.
- Chaque carte doit tenir dans l'écran une fois figée (≈ 540 px max à 900 px de haut).

### StarBorder (composant React, rendu serveur)
- `src/components/react/StarBorder.jsx`, copie React Bits sans modification, utilisée par `SectionCard` **sans directive `client:`** : HTML et CSS seulement, aucun JS envoyé. L'animation est du CSS (`@keyframes`), coupée par la règle `prefers-reduced-motion` du §9.

### Équipe
- Section `#a-propos` après les cartes, hors carte : titre `--text-h1`, présentation `--text-body-lg`, puis une carte de profil par membre (îlot `TeamCard`, `client:visible`, qui enveloppe `ProfileCard`, copie React Bits sans modification), centrées en ligne et renvoyées à la ligne (trois par ligne sur desktop). Mention « visuels générés par IA » en `--text-small` sous les cartes.
- Chaque carte : nom, rôle, identifiant, statut, photo détourée. Tant que les vrais contenus manquent : « Membre 1 » à « Membre 5 », pictogramme Syncwave en guise de photo, signalés en TODO.

### Bas de page
Pas une carte : deux bandeaux pleine largeur, d'après la référence fournie.
- **Bandeau d'appel** et **pied de page** partagent le même fond `--color-bg` opaque (posé sur `footer`). Le bandeau est séparé du reste de la page par un trait haut `--color-line`.
- **Bandeau d'appel** : Gauche : titre `--text-h1` Sora en majuscules (exception §3.2). Centre : bouton primaire « Demander une démo » + bouton secondaire. Droite : trois points clés, chacun avec une coche `--color-cyan`. Empilé sous `lg`.
- **Pied de page** : à gauche, le pictogramme Syncwave entouré de son anneau de texte qui tourne (`FooterRing` / CircularText, `client:only`) et « Syncwave » qui se dessine (`SyncwaveWordmark` / StrokeText, `client:only`, `<noscript>` de repli) ; puis un trait `--color-line`, la signature en majuscules espacées (exception §3.2), les liens d'ancre. Dessous, séparée par un trait : phrase de présentation à gauche, « Un produit Mooroon 5 », copyright et mentions légales à droite, en `--text-small` `--color-text-muted`.

### CardText (îlots React)
- `src/components/react/CardText.jsx`, un îlot `client:idle` par texte (via `Fold.astro`). Enveloppe `FoldText` (copie React Bits sans modification, dépendance `gsap`).
- Écoute `syncwave:page-top` et remonte `FoldText` (nouvelle `key`) pour le replier.

### Carte de specs
- Une ligne par spec, dans le chapitre « Le bilan » : fond `--color-surface-2`, trait `--color-line`, `--radius-lg`. Valeur à gauche (Sora 700 `--text-h2`, le prix en `--text-h1` `--color-cyan`), libellé `--text-small` à droite. Uniquement des valeurs établies (prix, NFC, aucun écran, cinq pièces) ; autonomie et étanchéité à ajouter quand elles sont connues (TODO).
- Libellé libellé en `--text-small` `--color-text-muted` dessous. Le chiffre le plus important du site (ex. autonomie) peut être en `--color-cyan` : un seul.

### Formulaire (précommande / contact)
- Champs : fond `--color-surface-2`, trait `--color-line`, `--radius-md`, texte `--color-text`, placeholder `--color-text-muted`. Focus : trait `--color-cyan`.
- Libellé au-dessus du champ, en `--text-small`, sentence case.
- Message de succès et d'erreur écrits en phrase complète ("Votre précommande est enregistrée." / "Cette adresse e-mail ne semble pas valide.").

### Footer
Voir « Bas de page » ci-dessus.

---

## 6. Structure du site (page unique, ancres)

1. **Hero** — le produit, une phrase, un CTA.
2 à 5. **Le récit** — « Une nuit de festival avec Syncwave », neuf chapitres en cartes empilées (§5 Récit) : le constat, l'idée (vue éclatée), la préparation (comment ça marche), l'ouverture des portes, les bars, la tête d'affiche, une alerte, la régie, le bilan (prix et specs).
6. **Précommande / Contact** — formulaire court (e-mail + bouton, ou nom + e-mail + message).
7. **Équipe** — l'équipe Mooroon 5 en cartes de profil (§5 Équipe). Si les visuels du site sont générés par IA, le dire ici en `--text-small`.
8. **Bas de page** — bandeau d'appel puis pied de page (§5 Bas de page).

Chaque section entre le hero et l'équipe est un chapitre du récit ou une carte (§5), avec un titre en `--text-h1` et au plus un paragraphe d'introduction. Pas de section "Témoignages", "Partenaires" ou "FAQ" inventée s'il n'y a pas de contenu réel pour la remplir.

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
- `syncwave-mark.png` / `syncwave-mark-512.png` — le pictogramme "S" détouré, fond transparent (bicolore, voir §2). Une version SVG serait préférable pour la netteté ; à produire si possible.
- `syncwave-logo.png` — logo complet fourni (S + lettrage), conservé pour les supports hors site (deck, réseaux). Non utilisé sur le site.
- `mooroon5-mono.svg` — blason Mooroon 5 simplifié monochrome (à produire ; en attendant, texte "Mooroon 5").
- `mooroon5-full.png` — logo Mooroon 5 complet (section À propos uniquement).

Dossier `/public/product/` (visuels générés par IA, style validé : fond noir, une seule couleur d'accent par image) :
- `ambiance-foule.webp` — 16:9, foule de festival, bracelets allumés en cyan. Ancien hero bandeau photo : **conservée mais non utilisée** depuis la variante « Fond animé ».
- `bracelet-render.webp` — 1:1, rendu trois quarts du bracelet LED allumées, fond noir. **Non utilisé** (remplacé par la scène animée du chapitre 23:00).
- `paiement.webp` — 4:3, poignet sur terminal sans contact. **Non utilisé** (remplacé par la scène animée du chapitre 21:00).
- `application.webp` — 4:3, téléphone avec la carte du festival. **Non utilisé** (remplacé par la scène animée du chapitre 01:00).
- `vue-eclatee.webp` — 3:4, composants séparés verticalement. Source de la vue éclatée 2,5D : découpée en cinq calques à fond transparent dans `/public/product/eclate/` (`bracelet`, `led`, `boitier`, `carte`, `batterie`, 724 × 965, ≈ 90 Ko au total). Plus affichée telle quelle.
- Une image sur fond noir uni (`#000`–`#0A0A0E`) posée sur `--color-bg` doit être soit plein cadre dans un bloc arrondi, soit fondue avec `mask-fade`. Un rendu sur fond blanc posé sur le fond sombre reste interdit.

Dossier `/public/hero/` (icônes de l'orbite du hero, fond transparent, cyan + magenta, recadrées en 160 × 160) :
- `orbit-sos.webp`, `orbit-acces.webp`, `orbit-paiement.webp`, `orbit-plateforme.webp`.
- Deux néons sur une même icône : autorisé, le hero est l'exception à la règle « une seule couleur néon dominante par section » (§10).

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

Cette règle couvre les animations CSS (dont StarBorder). Les îlots React gèrent `prefers-reduced-motion` eux-mêmes (voir §4 et §4 bis).

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
- Hover qui soulève les cards, compteurs animés, animation d'entrée autre que le dépliage des textes de carte.
- React en dehors des composants d'effet listés dans la Stack ; `ogl`, `gsap` ou `motion` importés ailleurs ; paramètre d'effet ou couleur en dur hors de `EFFECTS` et des tokens.
- Section entre le hero et l'équipe qui n'est pas une carte (§5 Carte de section) ; bas de page mis dans une carte.
- Animation JS qui ignore `prefers-reduced-motion`.
- Logo Mooroon 5 complet dans le header ou le footer.
- Rendu produit sur fond blanc posé sur le fond sombre.
- Valeurs en dur dans les composants (`#…`, `px` arbitraires) au lieu des tokens.
- Sections inventées sans contenu réel (témoignages, partenaires, FAQ).

---

## 11. Checklist de livraison

- [ ] Toutes les couleurs, tailles et rayons viennent des tokens.
- [ ] Un seul bouton primaire visible par écran.
- [ ] Mouvement conforme au §4 ; `prefers-reduced-motion` respecté, y compris par les îlots React et StarBorder.
- [ ] Textes des cartes : repliés au chargement, dépliés à l'entrée dans l'écran, repliés au retour en haut de page, visibles sans JS.
- [ ] Contraste vérifié sur texte muted et sur tout usage des néons en texte.
- [ ] Focus visible sur tous les éléments interactifs.
- [ ] Responsive testé à 375 px, 768 px, 1280 px, 1600 px.
- [ ] Images en `loading="lazy"` (le hero n'a plus d'image) ; `ogl` chargé après le premier rendu.
- [ ] Lighthouse : performance et accessibilité ≥ 90.
- [ ] Poids JS mesuré (gzip, par îlot et chunk `ogl`), Lighthouse mobile ≥ 90 avec les îlots.
- [ ] Aucun `TODO` de contenu laissé sans signalement.
