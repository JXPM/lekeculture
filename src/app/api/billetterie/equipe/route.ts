import { NextResponse } from 'next/server';
import { trouverEvenement } from '@/lib/billetterie/evenements';
import { annuler, journaliser, lister, statistiques, ErreurBilletterie } from '@/lib/billetterie/service';
import { pasDeCache, repondreErreur, verifierCle } from '@/lib/billetterie/acces';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function evenementDe(slug: unknown) {
  const ev = trouverEvenement(String(slug ?? ''));
  if (!ev) throw new ErreurBilletterie(404, 'introuvable', 'Événement introuvable.');
  return ev;
}

// GET ?evenement=&q= : statistiques + liste des réservations (organisation uniquement).
export async function GET(req: Request) {
  try {
    verifierCle(req, 'admin');
    const p = new URL(req.url).searchParams;
    const ev = evenementDe(p.get('evenement'));
    const [stats, liste] = await Promise.all([statistiques(ev), lister(ev.slug, p.get('q') ?? '')]);
    return NextResponse.json({ stats, liste }, { headers: pasDeCache });
  } catch (err) {
    return repondreErreur(err);
  }
}

// POST { evenement, action: 'annuler', numero, acteur }
export async function POST(req: Request) {
  try {
    verifierCle(req, 'admin');
    const body = await req.json().catch(() => ({}));
    const ev = evenementDe(body.evenement);
    if (body.action !== 'annuler') throw new ErreurBilletterie(400, 'action', 'Action inconnue.');
    const numero = Number(body.numero);
    if (!Number.isInteger(numero) || numero < 1) throw new ErreurBilletterie(422, 'numero', 'Numéro de ticket invalide.');
    const t = await annuler(ev.slug, numero);
    await journaliser(String(body.acteur ?? 'équipe'), 'annuler', `${ev.slug}#${numero}`);
    return NextResponse.json({ ok: true, numero: t.numero }, { headers: pasDeCache });
  } catch (err) {
    return repondreErreur(err);
  }
}
