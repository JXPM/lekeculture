import { NextResponse } from 'next/server';
import { trouverTicket } from '@/lib/billetterie/service';
import { pasDeCache, repondreErreur } from '@/lib/billetterie/acces';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET ?code= : état d'un ticket, pour que la page du ticket se « déchire » en direct au scan.
// Le code est secret (il n'est connu que du titulaire) ; on ne renvoie rien de personnel.
export async function GET(req: Request) {
  try {
    const t = await trouverTicket(new URL(req.url).searchParams.get('code') ?? '');
    if (!t) return NextResponse.json({ erreur: 'introuvable' }, { status: 404, headers: pasDeCache });
    return NextResponse.json({ statut: t.statut, entre_le: t.entre_le }, { headers: pasDeCache });
  } catch (err) {
    return repondreErreur(err);
  }
}
