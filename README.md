# Leke Culture

Site vitrine célébrant la culture ivoirienne et africaine — articles, événements,
galerie, tour virtuel et communauté. Bilingue **FR / EN**, responsive, avec
notifications push (PWA).

## Stack

- **Next.js 15** (App Router) + **React 18**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix)
- **Vitest** (tests unitaires)
- Police : Oswald (titres) + Ubuntu (texte), via `next/font`
- Déploiement : **Vercel**

## Démarrage

```bash
bun install        # ou npm install
bun run dev        # http://localhost:3000
```

## Scripts

| Commande         | Description                          |
| ---------------- | ----------------------------------- |
| `bun run dev`    | Serveur de développement (Turbopack) |
| `bun run build`  | Build de production                  |
| `bun run start`  | Sert le build de production          |
| `bun run lint`   | Typecheck (`tsc`) + ESLint           |
| `bun run test`   | Tests unitaires (Vitest)             |
| `bun run format` | Formatage (Biome)                    |

## Structure

```
src/
├── app/         # Pages : accueil, about, insights, gallery, virtual-tour, community
├── components/  # Navigation, Hero, Footer, NotificationSettings, ui/*
├── contexts/    # LanguageContext (FR/EN)
└── lib/         # translations, notifications (logique push), utils
public/
├── sw.js        # Service Worker (cache + push)
└── icons/       # Icône SVG + manifest PWA
```

## Design system

La palette et les tokens sont définis dans `tailwind.config.ts` et
`src/app/globals.css` : rouge de marque `#d60c07`, ocre/or et vert ivoiriens,
fond ivoire. Les motifs `kente-pattern` / `adinkra-pattern` et l'échelle
`leke-*` (alias `ivorian-*`) sont disponibles comme utilitaires.

## Déploiement

Projet déployé sur Vercel.

```bash
vercel        # preview
vercel --prod # production
```
