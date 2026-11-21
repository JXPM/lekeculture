import { describe, expect, it } from 'vitest';
import { extraireCode, masquerTelephone, normaliserTelephone, nouveauCode, telephoneLisible, validerReservation } from './validation';

describe('normaliserTelephone', () => {
  it('accepte les formats ivoiriens courants', () => {
    expect(normaliserTelephone('07 07 00 00 00')).toBe('+2250707000000');
    expect(normaliserTelephone('+225 05.01.02.03.04')).toBe('+2250501020304');
    expect(normaliserTelephone('002250102030405')).toBe('+2250102030405');
    expect(normaliserTelephone('2250707000000')).toBe('+2250707000000');
  });
  it('accepte un numéro international de la diaspora', () => {
    expect(normaliserTelephone('+33 6 12 34 56 78')).toBe('+33612345678');
  });
  it('refuse le reste', () => {
    expect(normaliserTelephone('0807000000')).toBeNull();
    expect(normaliserTelephone('12345')).toBeNull();
    expect(normaliserTelephone('')).toBeNull();
  });
});

describe('validerReservation', () => {
  const ok = { prenom: ' Awa ', nom: 'Koné', telephone: '0707000000', consentement: true };
  it('nettoie et valide', () => {
    const r = validerReservation({ ...ok, source: 'Insta!' });
    expect(r).toEqual({ ok: true, valeur: { prenom: 'Awa', nom: 'Koné', telephone: '+2250707000000', optin: false, source: 'insta' } });
  });
  it('exige le consentement et chaque champ', () => {
    const r = validerReservation({ telephone: 'abc' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.erreurs).sort()).toEqual(['consentement', 'nom', 'prenom', 'telephone']);
  });
});

describe('codes', () => {
  it('génère des codes uniques au bon format', () => {
    const a = nouveauCode();
    expect(a).toMatch(/^LK-[A-Z2-9]{5}(-[A-Z2-9]{5}){3}$/);
    expect(nouveauCode()).not.toBe(a);
  });
  it('extrait le code d’une URL de ticket', () => {
    expect(extraireCode('https://leke-culture.vercel.app/t/lk-abcde-fghjk-mnpqr-stuvw')).toBe('LK-ABCDE-FGHJK-MNPQR-STUVW');
    expect(extraireCode(' lk-abcde ')).toBe('LK-ABCDE');
  });
});

describe('affichage des numéros', () => {
  it('masque le numéro au contrôle', () => {
    expect(masquerTelephone('+2250707001234')).toBe('+225 •••• 12 34');
  });
  it('rend le numéro lisible dans l’export', () => {
    expect(telephoneLisible('+2250707001234')).toBe('225 07 07 00 12 34');
    expect(telephoneLisible('+33612345678')).toBe('33612345678');
  });
});
