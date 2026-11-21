import { NextResponse } from 'next/server';
import { trouverEvenement } from '@/lib/billetterie/evenements';
import { validerReservation } from '@/lib/billetterie/validation';
import { reserver } from '@/lib/billetterie/service';
import { pasDeCache, repondreErreur } from '@/lib/billetterie/acces';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST { evenement, prenom, nom, telephone, consentement, optin, source, site } → { code, numero }
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    // Champ piège invisible : rempli uniquement par les robots.
    if (body.site) return NextResponse.json({ erreur: 'refuse', message: 'Réservation refusée.' }, { status: 400 });
    const ev = trouverEvenement(String(body.evenement ?? ''));
    if (!ev) return NextResponse.json({ erreur: 'introuvable', message: 'Événement introuvable.' }, { status: 404 });
    const v = validerReservation(body);
    if (!v.ok) {
      return NextResponse.json({ erreur: 'validation', message: 'Certaines informations sont à corriger.', champs: v.erreurs }, { status: 422 });
    }
    const t = await reserver(ev, v.valeur);
    return NextResponse.json({ code: t.code, numero: t.numero }, { status: 201, headers: pasDeCache });
  } catch (err) {
    return repondreErreur(err);
  }
}
