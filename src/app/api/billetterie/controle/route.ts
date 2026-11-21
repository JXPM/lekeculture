import { NextResponse } from 'next/server';
import { trouverEvenement } from '@/lib/billetterie/evenements';
import { extraireCode, masquerTelephone } from '@/lib/billetterie/validation';
import { controler, journaliser, statistiques, ErreurBilletterie } from '@/lib/billetterie/service';
import { pasDeCache, repondreErreur, verifierCle } from '@/lib/billetterie/acces';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function evenementDe(slug: unknown) {
  const ev = trouverEvenement(String(slug ?? ''));
  if (!ev) throw new ErreurBilletterie(404, 'introuvable', 'Événement introuvable.');
  return ev;
}

// GET ?evenement= : vérifie le code d'accès et renvoie le compteur.
export async function GET(req: Request) {
  try {
    verifierCle(req, 'controle');
    const ev = evenementDe(new URL(req.url).searchParams.get('evenement'));
    const s = await statistiques(ev);
    return NextResponse.json({ entrees: s.entrees, reservations: s.reservations, jauge: s.jauge }, { headers: pasDeCache });
  } catch (err) {
    return repondreErreur(err);
  }
}

// POST { evenement, code, poste } : valide une entrée.
export async function POST(req: Request) {
  try {
    verifierCle(req, 'controle');
    const body = await req.json().catch(() => ({}));
    const ev = evenementDe(body.evenement);
    const code = extraireCode(body.code);
    if (!code) return NextResponse.json({ erreur: 'vide', message: 'Aucun code lu.' }, { status: 422 });
    const poste = String(body.poste ?? 'Entrée').slice(0, 40);
    const r = await controler(ev.slug, code, poste);
    const t = 'ticket' in r ? r.ticket : null;
    await journaliser(poste, 'scan', t ? `${t.evenement}#${t.numero}` : null, { resultat: r.resultat });
    const s = await statistiques(ev);
    return NextResponse.json({
      resultat: r.resultat,
      ticket: t && {
        numero: t.numero,
        titulaire: `${t.prenom} ${t.nom}`,
        telephone: masquerTelephone(t.telephone),
        entre_le: t.entre_le,
        entre_par: t.entre_par,
      },
      entrees: s.entrees,
    }, { headers: pasDeCache });
  } catch (err) {
    return repondreErreur(err);
  }
}
