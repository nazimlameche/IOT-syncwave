import { useEffect, useState } from 'react';
import OrbitImages from './OrbitImages.jsx';
import StrokeText from './StrokeText.jsx';
import { EFFECTS, prefersReducedMotion, readToken } from './effects.js';

/**
 * Ligne 1 du titre du hero : « Syncwave » qui se dessine, entouré d'une orbite d'icônes — DESIGN.md §5 HeroWordmark.
 * Attend Sora 700 avant de monter StrokeText, sinon la mesure du viewBox est fausse et le mot est rogné.
 */

const { strokeColorToken, fillColorToken, ...strokeProps } = EFFECTS.wordmark;

export default function HeroWordmark() {
  const [colors, setColors] = useState(null);
  const [reducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    let cancelled = false;
    const font = `${strokeProps.fontWeight} ${strokeProps.fontSize}px Sora`;
    const loaded = document.fonts?.load(font) ?? Promise.resolve();
    loaded
      .catch(() => {})
      .then(() => {
        if (cancelled) return;
        setColors({ strokeColor: readToken(strokeColorToken), fillColor: readToken(fillColorToken) });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!colors) return null;
  return (
    <>
      <div className="hero-orbit">
        <OrbitImages {...EFFECTS.orbit} paused={reducedMotion} />
      </div>
      <StrokeText {...strokeProps} {...colors} />
    </>
  );
}
