// Vérifications pures (sans base) : testées dans validation.test.ts.
import { randomInt } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans 0/O ni 1/I
const aleatoire = (n: number) =>
  Array.from({ length: n }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');

// Code secret du QR (~100 bits) : LK-XXXXX-XXXXX-XXXXX-XXXXX
export const nouveauCode = () => `LK-${aleatoire(5)}-${aleatoire(5)}-${aleatoire(5)}-${aleatoire(5)}`;

export const normaliserCode = (code: unknown) => String(code ?? '').trim().toUpperCase();

// Numéro ivoirien (10 chiffres, 01/05/07) ou international (+33…, +1…) → E.164.
export function normaliserTelephone(brut: unknown): string | null {
  let d = String(brut ?? '').replace(/[\s.\-()]/g, '');
  if (d.startsWith('00')) d = `+${d.slice(2)}`;
  if (d.startsWith('+225')) d = d.slice(4);
  else if (/^225\d{10}$/.test(d)) d = d.slice(3);
  if (/^0[157]\d{8}$/.test(d)) return `+225${d}`;
  if (/^\+[1-9]\d{7,14}$/.test(d)) return d;
  return null;
}

const texte = (v: unknown, max = 60) => String(v ?? '').trim().replace(/\s+/g, ' ').slice(0, max);

export type EntreeReservation = {
  prenom?: unknown;
  nom?: unknown;
  telephone?: unknown;
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
  const telephone = normaliserTelephone(e.telephone);
  if (!telephone) erreurs.telephone = 'Numéro WhatsApp invalide (ex. 07 07 00 00 00).';
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
