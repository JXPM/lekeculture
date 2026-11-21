import { trouverEvenement } from '@/lib/billetterie/evenements';
import { journaliser, lister, ErreurBilletterie } from '@/lib/billetterie/service';
import { repondreErreur, verifierCle } from '@/lib/billetterie/acces';
import { telephoneLisible } from '@/lib/billetterie/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const cellule = (v: unknown) => {
  const s = v instanceof Date ? v.toISOString().replace('T', ' ').slice(0, 16) : String(v ?? '');
  // Neutralise les formules (=, +, -, @) à l'ouverture dans Excel.
  const sur = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${sur.replace(/"/g, '""')}"`;
};

// GET ?evenement= : liste au format CSV (ouvrable dans Excel / Google Sheets).
export async function GET(req: Request) {
  try {
    verifierCle(req, 'admin');
    const ev = trouverEvenement(new URL(req.url).searchParams.get('evenement') ?? '');
    if (!ev) throw new ErreurBilletterie(404, 'introuvable', 'Événement introuvable.');
    const liste = await lister(ev.slug);
    const lignes = [
      ['N°', 'Prénom', 'Nom', 'WhatsApp', 'Statut', 'Réservé le (UTC)', 'Entré le (UTC)', 'Source', 'Accepte les infos'],
      ...liste.reverse().map((t) => [t.numero, t.prenom, t.nom, telephoneLisible(t.telephone), t.statut, t.cree_le, t.entre_le ?? '', t.source ?? 'direct', t.optin_infos ? 'oui' : 'non']),
    ];
    await journaliser('équipe', 'export', ev.slug, { lignes: liste.length });
    const csv = `﻿${lignes.map((l) => l.map(cellule).join(';')).join('\r\n')}`;
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${ev.slug}-reservations.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return repondreErreur(err);
  }
}
