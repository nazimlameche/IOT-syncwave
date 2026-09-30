import { useState } from 'react';
import OrbitImages from './OrbitImages.jsx';
import SyncwaveWordmark from './SyncwaveWordmark.jsx';
import { EFFECTS, prefersReducedMotion } from './effects.js';

/**
 * Ligne 1 du titre du hero : « Syncwave » qui se dessine, entouré d'une orbite d'icônes — DESIGN.md §5 HeroWordmark.
 */
export default function HeroWordmark() {
  const [reducedMotion] = useState(prefersReducedMotion);
  return (
    <>
      <div className="hero-orbit">
        <OrbitImages {...EFFECTS.orbit} paused={reducedMotion} />
      </div>
      <SyncwaveWordmark />
    </>
  );
}
