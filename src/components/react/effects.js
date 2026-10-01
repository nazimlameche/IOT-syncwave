/**
 * Paramètres des effets animés du site — source unique, documentée dans DESIGN.md §4 bis.
 * Aucune couleur ici : elles sont lues sur les tokens à l'exécution (voir readToken).
 */
export const EFFECTS = {
  background: {
    /** Couleurs de GradientWaves, lues sur les tokens à l'exécution. */
    colorTokens: {
      horizonColor: '--color-violet',
      waveColor: '--color-magenta',
      crestColor: '--color-text',
    },
    speed: 0.4,
    amplitude: 2.5,
    waveScale: 0.6,
    waveRatio: 0.9,
    swell: 35,
    turbulence: 20,
    tilt: 1.11,
    zoom: 1.0,
    height: 5.5,
    fogDepth: 15,
    detail: 'medium',
    brightness: 1.0,
    /** Opacité de l'effet (DESIGN.md §5 Hero). */
    opacity: 1.0,
    mouseInteraction: true,
    parallaxStrength: 0.5,
    grain: true,
    grainIntensity: 0.05,
    /** Délai max (ms) avant de charger ogl si le navigateur n'est jamais inactif. */
    idleTimeout: 2000,
  },
  /** Surcharge appliquée sous prefers-reduced-motion (DESIGN.md §4). */
  backgroundReducedMotion: {
    speed: 0,
    mouseInteraction: false,
    grain: false,
  },
  /** Bordure animée des cartes de section (props de StarBorder, rendu serveur sans JS). */
  cardBorder: {
    colorToken: '--color-cyan',
    speed: '6s',
    thickness: 1,
  },
  /**
   * Dépliage des textes des cartes (props de FoldText). Rejoué à chaque retour en haut de page
   * (événement PAGE_TOP_EVENT, émis par le header).
   */
  foldText: {
    splitBy: 'word',
    hinge: 'top',
    trigger: 'scroll',
    duration: 0.65,
    stagger: 0.03,
    ease: 'power3.out',
    perspective: 700,
    creaseShading: 0.55,
  },
  /** Anneau de texte autour du logo du pied de page (props de CircularText). */
  footerRing: {
    text: 'SYNCWAVE • MOOROON 5 • ',
    spinDuration: 20,
    onHover: 'speedUp',
  },
  /** Cartes de l'équipe (props de ProfileCard). Couleurs en var() sur les tokens. */
  profileCard: {
    contactText: 'Contacter',
    linkedinText: 'LinkedIn',
    contactTarget: 'demo',
    innerGradient:
      'linear-gradient(145deg, color-mix(in srgb, var(--color-violet) 55%, transparent) 0%, color-mix(in srgb, var(--color-cyan) 27%, transparent) 100%)',
    behindGlowColor: 'color-mix(in srgb, var(--color-cyan) 67%, transparent)',
    behindGlowEnabled: true,
    enableTilt: true,
  },
  wordmark: {
    text: 'Syncwave',
    strokeColorToken: '--color-text',
    fillColorToken: '--color-text',
    strokeWidth: 1.4,
    drawDuration: 1.6,
    fillDelay: 0.2,
    stagger: 0.05,
    ease: 'power2.out',
    trigger: 'loop',
    fillMode: 'wipe',
    /** Taille de mesure (nombre). La taille affichée est pilotée en CSS, voir global.css. */
    fontSize: 128,
    fontWeight: 700,
    letterSpacing: -4,
  },
  /**
   * Orbite d'icônes autour de « Syncwave » (props d'OrbitImages). Unités de l'espace de dessin baseWidth,
   * mis à l'échelle sur la largeur --orbit-size (global.css). Rayons choisis pour que les icônes ne
   * croisent jamais les lettres.
   */
  orbit: {
    images: ['/hero/orbit-sos.webp', '/hero/orbit-acces.webp', '/hero/orbit-paiement.webp', '/hero/orbit-plateforme.webp'],
    altPrefix: 'Fonction Syncwave',
    shape: 'ellipse',
    baseWidth: 1000,
    radiusX: 430,
    radiusY: 158,
    rotation: -4,
    duration: 30,
    itemSize: 80,
    direction: 'normal',
    responsive: true,
  },
};

/** Émis sur document quand on revient en haut de page (voir Header.astro). */
export const PAGE_TOP_EVENT = 'syncwave:page-top';

/** Valeur calculée d'un token CSS déclaré sur :root. */
export const readToken = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** false côté serveur (rendu Astro), la vraie préférence dans le navigateur. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
