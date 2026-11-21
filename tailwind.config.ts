import type { Config } from "tailwindcss";

/**
 * Leke — Design System (héritage éditorial)
 *
 * Direction : magazine / archive culturelle pan-africaine sur fond papier chaud.
 * Typo de titrage en serif éditorial (Newsreader), texte en grotesque (Hanken Grotesk).
 * Accent unique : un rouge brique (lignée du rouge de marque), verrouillé sur tout le site.
 *
 * Les échelles `leke.*` / `ivorian.*` sont conservées pour la compatibilité de
 * composants secondaires (paramètres de notifications). Les surfaces éditoriales
 * utilisent les tokens sémantiques (`background`, `foreground`, `primary`, …).
 */

const red = {
  50: "#fdf3f1", 100: "#fbe3de", 200: "#f6c4bb", 300: "#ec9a8c",
  400: "#dd6753", 500: "#c0392b", 600: "#a82c20", 700: "#8a2118",
  800: "#6f1c15", 900: "#5c1a14",
} as const;

const orange = {
  50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74",
  400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c",
  800: "#9a3412", 900: "#7c2d12",
} as const;

const green = {
  50: "#f1f7f2", 100: "#dcebe0", 200: "#bcd8c4",
  300: "#8fbd9d", 400: "#5d9b71", 500: "#3c7d54", 600: "#2f6543",
  700: "#274f37", 800: "#21402e", 900: "#1c3527",
} as const;

const yellow = {
  50: "#fdf8e8", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d",
  400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207",
  800: "#854d0e", 900: "#713f12",
} as const;

const gold = {
  50: "#fbf7ee", 100: "#f5ead0", 200: "#ebd29c", 300: "#dfb766",
  400: "#cf9d3f", 500: "#b67f28", 600: "#9a6620", 700: "#7c4f1d",
  800: "#67411e", 900: "#58371d",
} as const;

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Papier / encre : surfaces éditoriales nommées
        paper: "hsl(var(--background))",
        ink: "hsl(var(--foreground))",
        // Échelles de marque (compat)
        leke: { red, orange, green, yellow, gold },
        ivorian: { orange, green, yellow, gold, red },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 3px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 10px)",
      },
      fontFamily: {
        // Sémantique
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        // Alias rétro-compatibles (mappés vers la nouvelle identité)
        oswald: ["var(--font-display)", "Georgia", "serif"],
        ubuntu: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightish: "-0.015em",
      },
      boxShadow: {
        // Ombres chaudes et discrètes, teintées vers l'encre (pas de noir pur)
        soft: "0 1px 2px rgb(45 32 22 / 0.04), 0 8px 24px -12px rgb(45 32 22 / 0.14)",
        lift: "0 2px 4px rgb(45 32 22 / 0.05), 0 18px 40px -16px rgb(45 32 22 / 0.22)",
      },
      maxWidth: {
        prose: "68ch",
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out both",
        "rise": "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        rise: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
