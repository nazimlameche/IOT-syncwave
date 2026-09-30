import { useState } from 'react';
import CircularText from './CircularText.jsx';
import { EFFECTS, prefersReducedMotion } from './effects.js';

/**
 * Anneau de texte qui tourne autour du logo, dans le pied de page — DESIGN.md §5 Pied de page.
 * Sous prefers-reduced-motion, la rotation est rendue imperceptible et le survol ne l'accélère plus.
 */
const REDUCED_SPIN_DURATION = 1e9;

export default function FooterRing() {
  const [reducedMotion] = useState(prefersReducedMotion);
  const { text, spinDuration, onHover } = EFFECTS.footerRing;
  return (
    <CircularText
      text={text}
      spinDuration={reducedMotion ? REDUCED_SPIN_DURATION : spinDuration}
      onHover={reducedMotion ? undefined : onHover}
      className="footer-ring"
    />
  );
}
