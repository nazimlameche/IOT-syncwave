import { useEffect, useState } from 'react';
import StrokeText from './StrokeText.jsx';
import { EFFECTS, readToken } from './effects.js';

/**
 * « Syncwave » qui se dessine en boucle (StrokeText) — hero et pied de page, DESIGN.md §5.
 * Attend Sora 700 avant de monter, sinon la mesure du viewBox est fausse et le mot est rogné.
 */

const { strokeColorToken, fillColorToken, ...strokeProps } = EFFECTS.wordmark;

export default function SyncwaveWordmark() {
  const [colors, setColors] = useState(null);

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
  return <StrokeText {...strokeProps} {...colors} />;
}
