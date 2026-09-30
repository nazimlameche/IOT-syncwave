import { useEffect, useState } from 'react';
import FoldText from './FoldText.jsx';
import { EFFECTS, PAGE_TOP_EVENT } from './effects.js';

/**
 * Texte d'une carte qui se déplie à l'entrée dans l'écran — DESIGN.md §5 Carte de section.
 * Hérite police, taille, graisse et couleur de l'élément parent (h2, p…).
 * Remonté à chaque retour en haut de page : le texte est de nouveau plié et se redéplie au prochain passage.
 */
export default function CardText({ text, splitBy }) {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const reset = () => setCycle((c) => c + 1);
    document.addEventListener(PAGE_TOP_EVENT, reset);
    return () => document.removeEventListener(PAGE_TOP_EVENT, reset);
  }, []);

  return (
    <FoldText
      key={cycle}
      {...EFFECTS.foldText}
      {...(splitBy ? { splitBy } : {})}
      text={text}
      fontSize="inherit"
      fontWeight="inherit"
      color="currentColor"
      className="card-text"
    />
  );
}
