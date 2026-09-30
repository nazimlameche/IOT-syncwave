import { Component, useEffect, useState } from 'react';
import { EFFECTS, prefersReducedMotion, readToken } from './effects.js';

/**
 * Fond animé de toute la page (calque fixe) — DESIGN.md §5 PageBackground.
 * GradientWaves (et donc ogl) est importé dynamiquement après le premier rendu.
 * Sans WebGL 2 ou en cas d'erreur, rien n'est rendu : le fond --color-bg du hero reste seul.
 */

const hasWebGL2 = () => {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
};

const whenIdle = (cb, timeout) => {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(cb, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(cb, 1);
  return () => window.clearTimeout(id);
};

class SilentBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.warn('[PageBackground] fond animé désactivé :', error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const { idleTimeout, colorTokens, ...waveProps } = EFFECTS.background;

function Background() {
  const [Waves, setWaves] = useState(null);
  const [visible, setVisible] = useState(false);
  const [props, setProps] = useState(null);

  useEffect(() => {
    if (!hasWebGL2()) return undefined;
    let cancelled = false;
    const cancelIdle = whenIdle(() => {
      import('./GradientWaves.jsx')
        .then((mod) => {
          if (cancelled) return;
          setProps({
            ...waveProps,
            ...(prefersReducedMotion() ? EFFECTS.backgroundReducedMotion : {}),
            ...Object.fromEntries(Object.entries(colorTokens).map(([prop, token]) => [prop, readToken(token)])),
          });
          setWaves(() => mod.default);
        })
        .catch((error) => console.warn('[PageBackground] chargement impossible :', error));
    }, idleTimeout);
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  // Fondu d'entrée une fois le canvas monté et la première image dessinée.
  useEffect(() => {
    if (!Waves) return undefined;
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [Waves]);

  if (!Waves) return null;
  return (
    <div className="page-bg" style={{ opacity: visible ? 1 : 0 }}>
      <Waves {...props} />
    </div>
  );
}

export default function PageBackground() {
  return (
    <SilentBoundary>
      <Background />
    </SilentBoundary>
  );
}
