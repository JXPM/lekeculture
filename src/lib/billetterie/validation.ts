// Vérifications pures (sans base) : testées dans validation.test.ts.
import { randomInt } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans 0/O ni 1/I
const aleatoire = (n: number) =>
  Array.from({ length: n }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');

// Code secret du QR (~100 bits) : LK-XXXXX-XXXXX-XXXXX-XXXXX
export const nouveauCode = () => `LK-${aleatoire(5)}-${aleatoire(5)}-${aleatoire(5)}-${aleatoire(5)}`;

export const normaliserCode = (code: unknown) => String(code ?? '').trim().toUpperCase();

export { normaliserTelephone } from './telephone';
import { normaliserTelephone } from './telephone';

const texte = (v: unknown, max = 60) => String(v ?? '').trim().replace(/\s+/g, ' ').slice(0, max);

export type EntreeReservation = {
  prenom?: unknown;
  nom?: unknown;
  telephone?: unknown;
  indicatif?: unknown;
  consentement?: unknown;
  optin?: unknown;
  source?: unknown;
};

export type Reservation = {
  prenom: string;
  nom: string;
  telephone: string;
  optin: boolean;
  source: string | null;
};

export type ErreursChamps = Partial<Record<'prenom' | 'nom' | 'telephone' | 'consentement', string>>;

export function validerReservation(e: EntreeReservation):
  { ok: true; valeur: Reservation } | { ok: false; erreurs: ErreursChamps } {
  const erreurs: ErreursChamps = {};
  const prenom = texte(e.prenom);
  const nom = texte(e.nom);
  if (!prenom) erreurs.prenom = 'Indique ton prénom.';
  if (!nom) erreurs.nom = 'Indique ton nom.';
  const telephone = normaliserTelephone(e.telephone, e.indicatif);
  if (!telephone) erreurs.telephone = 'Numéro WhatsApp invalide : vérifie le pays et le numéro.';
  if (e.consentement !== true) erreurs.consentement = 'Accepte la politique de confidentialité pour réserver.';
  if (Object.keys(erreurs).length) return { ok: false, erreurs };
  const source = texte(e.source, 30).toLowerCase().replace(/[^a-z0-9_-]/g, '') || null;
  return { ok: true, valeur: { prenom, nom, telephone: telephone!, optin: e.optin === true, source } };
}

// Accepte le code brut ou l'URL lue dans le QR (…/t/<code>).
export function extraireCode(lu: unknown): string {
  const s = String(lu ?? '').trim();
  const m = s.match(/\/t\/([^/?#\s]+)/);
  let code = m ? m[1] : s;
  try {
    code = decodeURIComponent(code);
  } catch {
    /* code brut */
  }
  return normaliserCode(code);
}

// Masque un numéro pour l'affichage (contrôle à l'entrée) : +225 •••• 12 34
export function masquerTelephone(t: string): string {
  if (!t) return '';
  const indicatif = t.startsWith('+225') ? '+225' : t.slice(0, 3);
  const fin = t.slice(-4);
  return `${indicatif} •••• ${fin.slice(0, 2)} ${fin.slice(2)}`;
}

// Numéro lisible et non interprété comme un nombre par Excel : 225 07 07 00 00 00
export function telephoneLisible(t: string): string {
  if (!t) return '';
  const d = t.replace(/^\+/, '');
  if (d.startsWith('225') && d.length === 13) return `225 ${d.slice(3).replace(/(\d{2})(?=\d)/g, '$1 ')}`;
  return d;
}
