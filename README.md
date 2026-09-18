# Syncwave — site vitrine

Site statique une page, Astro + Tailwind v4. Référence de design : `DESIGN.md`.

## Lancer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert dist/
```

## Déployer

- Netlify : build `npm run build`, publish `dist`. Le formulaire de démo utilise Netlify Forms (`data-netlify`) et redirige vers `/merci`.
- Vercel : preset Astro détecté automatiquement. Le formulaire n'a pas de backend sur Vercel : brancher `action` du `<form>` (src/components/DemoForm.astro) sur un endpoint ou un service (Formspree, etc.).

## Structure

- `src/styles/global.css` — tous les tokens (DESIGN.md §3 et §9). Aucune couleur, taille ou rayon en dur ailleurs.
- `src/components/` — inventaire fermé de DESIGN.md §5 : Button, Header, Hero, FeatureBlock, Steps, SpecCard, DemoForm, Footer, plus Logo (S + wordmark).
- `src/pages/index.astro` — la page, sections dans l'ordre de DESIGN.md §6.
- `src/pages/merci.astro` — page de confirmation du formulaire.
- `public/brand/`, `public/product/` — assets (voir DESIGN.md §8).

## Contenu à valider

Chercher `TODO` dans `src/` : chaque placeholder de contenu est signalé.
