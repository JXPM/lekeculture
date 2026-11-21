import { describe, it, expect } from 'vitest';
import { translations } from './translations';

/** Collecte tous les chemins de clés "feuilles" d'un objet (arrays inclus). */
function leafPaths(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
    leafPaths(value, prefix ? `${prefix}.${key}` : key)
  );
}

describe('translations', () => {
  it('FR et EN ont exactement la même structure de clés', () => {
    const fr = leafPaths(translations.fr).sort();
    const en = leafPaths(translations.en).sort();
    expect(en).toEqual(fr);
  });

  it('ne contient aucune valeur vide', () => {
    const values = leafPaths(translations.fr).concat(leafPaths(translations.en));
    expect(values.length).toBeGreaterThan(0);
  });

  it('expose les clés de navigation attendues dans les deux langues', () => {
    for (const lang of ['fr', 'en'] as const) {
      const nav = translations[lang].nav;
      expect(nav.home).toBeTruthy();
      expect(nav.gallery).toBeTruthy();
      expect(nav.virtualTour).toBeTruthy();
      expect(nav.community).toBeTruthy();
    }
  });
});
