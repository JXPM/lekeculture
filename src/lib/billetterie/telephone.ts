// Numéros de téléphone : liste des pays proposés et mise au format international (E.164).
// Module pur, utilisable côté navigateur (formulaire) et côté serveur (validation).

export type Pays = { code: string; nom: string; indicatif: string; exemple: string };

// Côte d'Ivoire en premier (par défaut), puis la diaspora et la sous-région.
export const PAYS: Pays[] = [
  { code: 'CI', nom: 'Côte d’Ivoire', indicatif: '225', exemple: '07 07 00 00 00' },
  { code: 'FR', nom: 'France', indicatif: '33', exemple: '06 12 34 56 78' },
  { code: 'BE', nom: 'Belgique', indicatif: '32', exemple: '0470 12 34 56' },
  { code: 'CH', nom: 'Suisse', indicatif: '41', exemple: '078 123 45 67' },
  { code: 'CA', nom: 'Canada / États-Unis', indicatif: '1', exemple: '514 123 4567' },
  { code: 'GB', nom: 'Royaume-Uni', indicatif: '44', exemple: '07400 123456' },
  { code: 'DE', nom: 'Allemagne', indicatif: '49', exemple: '01512 3456789' },
  { code: 'IT', nom: 'Italie', indicatif: '39', exemple: '312 345 6789' },
  { code: 'ES', nom: 'Espagne', indicatif: '34', exemple: '612 34 56 78' },
  { code: 'SN', nom: 'Sénégal', indicatif: '221', exemple: '77 123 45 67' },
  { code: 'ML', nom: 'Mali', indicatif: '223', exemple: '65 01 23 45' },
  { code: 'BF', nom: 'Burkina Faso', indicatif: '226', exemple: '70 12 34 56' },
  { code: 'GN', nom: 'Guinée', indicatif: '224', exemple: '621 12 34 56' },
  { code: 'GH', nom: 'Ghana', indicatif: '233', exemple: '024 123 4567' },
  { code: 'TG', nom: 'Togo', indicatif: '228', exemple: '90 12 34 56' },
  { code: 'BJ', nom: 'Bénin', indicatif: '229', exemple: '01 90 12 34 56' },
  { code: 'NG', nom: 'Nigeria', indicatif: '234', exemple: '0802 123 4567' },
  { code: 'CM', nom: 'Cameroun', indicatif: '237', exemple: '6 71 23 45 67' },
  { code: 'MA', nom: 'Maroc', indicatif: '212', exemple: '06 12 34 56 78' },
];

const INDICATIFS = new Set(PAYS.map((p) => p.indicatif));

// Pays où le 0 du début disparaît après l'indicatif (« 06… » en France → +336…).
// En Côte d'Ivoire et au Bénin, le 0 fait partie du numéro et reste.
const GARDE_LE_ZERO = new Set(['225', '229']);

/**
 * Met un numéro au format international (+…).
 * - Si le numéro commence par + ou 00, l'indicatif tapé l'emporte sur le pays choisi.
 * - Sinon, l'indicatif du pays choisi est ajouté (Côte d'Ivoire par défaut).
 */
export function normaliserTelephone(brut: unknown, indicatif: unknown = '225'): string | null {
  let d = String(brut ?? '').replace(/[\s.\-()/]/g, '');
  if (!d) return null;
  if (d.startsWith('00')) d = `+${d.slice(2)}`;

  if (!d.startsWith('+')) {
    if (!/^\d+$/.test(d)) return null;
    const ind = INDICATIFS.has(String(indicatif)) ? String(indicatif) : '225';
    if (d.startsWith(ind) && d.length > ind.length + 7) d = d.slice(ind.length); // indicatif tapé sans le +
    if (!GARDE_LE_ZERO.has(ind)) d = d.replace(/^0/, '');
    d = `+${ind}${d}`;
  }

  // Côte d'Ivoire : 10 chiffres commençant par 01, 05 ou 07.
  if (d.startsWith('+225')) return /^\+2250[157]\d{8}$/.test(d) ? d : null;
  // Le 0 national tapé après l'indicatif (« +33 06… ») n'existe pas en international.
  d = d.replace(/^\+(33|32|41|44|49|31|352|39|212|233|234)0(?=\d)/, '+$1');
  return /^\+[1-9]\d{7,14}$/.test(d) ? d : null;
}
