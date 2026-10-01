import ProfileCard from './ProfileCard.jsx';
import { EFFECTS, prefersReducedMotion } from './effects.js';

/**
 * Carte d'un membre de l'équipe (ProfileCard) — DESIGN.md §5 Équipe.
 * Couleurs en var() sur les tokens. Le bouton ouvre le profil LinkedIn du membre (nouvel onglet) ;
 * sans lien, il mène au formulaire de démo.
 */
export default function TeamCard({ name, role, handle, status, avatarUrl, linkedin }) {
  const { profileCard } = EFFECTS;
  return (
    <ProfileCard
      name={name}
      title={role}
      handle={handle}
      status={status}
      avatarUrl={avatarUrl}
      iconUrl=""
      grainUrl=""
      contactText={linkedin ? profileCard.linkedinText : profileCard.contactText}
      innerGradient={profileCard.innerGradient}
      behindGlowColor={profileCard.behindGlowColor}
      behindGlowEnabled={profileCard.behindGlowEnabled}
      enableTilt={profileCard.enableTilt && !prefersReducedMotion()}
      enableMobileTilt={false}
      onContactClick={() =>
        linkedin
          ? window.open(linkedin, '_blank', 'noopener,noreferrer')
          : document.getElementById(profileCard.contactTarget)?.scrollIntoView({ behavior: 'smooth' })
      }
    />
  );
}
