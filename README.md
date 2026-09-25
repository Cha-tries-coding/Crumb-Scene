# Crumb Scene

Application interactive de diagnostic pâtissier, construite avec React, TypeScript, Vite et Tailwind CSS.

## Lancer le projet

Prérequis : Node.js 22 et pnpm. Le dépôt contient déjà le lockfile pnpm.

```bash
corepack enable
pnpm install
pnpm dev
```

Vite affiche ensuite l'adresse locale à ouvrir dans le navigateur.

## Commandes utiles

```bash
pnpm dev        # serveur de développement
pnpm build      # vérification TypeScript puis build de production
pnpm preview    # prévisualisation du build
pnpm typecheck  # vérification TypeScript seule
pnpm format     # formatage du projet
```

## Structure

```text
src/
├── assets/images/       # images locales des trois cas
├── components/          # composants UI réutilisables
│   └── previews/        # aperçus visuels dynamiques des tests
├── data/cases.ts        # contenu et logique métier des cas
├── screens/             # écrans du jeu
├── types/game.ts        # types TypeScript partagés
├── utils/game.ts        # fonctions utilitaires
├── App.tsx              # orchestration et état global du jeu
├── index.css            # thème et styles globaux
└── main.tsx             # point d'entrée React
```

## Personnaliser le jeu

- Pour modifier le texte, les suspects, les variables ou la logique d'un cas : `src/data/cases.ts`.
- Pour modifier un écran : `src/screens/`.
- Pour modifier les composants communs : `src/components/`.
- Pour remplacer une image : `src/assets/images/` puis mettre à jour son import dans `src/data/cases.ts`.
- La typographie du projet est Montserrat sur l'ensemble de l'interface.

## Nettoyage par rapport à l'export Figma Make

Le dépôt ne contient plus les fichiers spécifiques à Figma Make, le dossier de build `download/`, ni les configurations d'environnement propres à Figma. Les images des cas sont stockées localement dans le dépôt et le code a été séparé en modules pour faciliter la maintenance.
