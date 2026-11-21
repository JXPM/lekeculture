import { NextResponse } from 'next/server';
import { CONSERVATION_MOIS, EVENEMENTS } from '@/lib/billetterie/evenements';
import { purger } from '@/lib/billetterie/service';
import { repondreErreur } from '@/lib/billetterie/acces';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Appelé chaque jour par le cron Vercel (en-tête Authorization: Bearer CRON_SECRET).
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ erreur: 'cle' }, { status: 401 });
  }
  try {
    return NextResponse.json(await purger(Object.values(EVENEMENTS), CONSERVATION_MOIS));
  } catch (err) {
    return repondreErreur(err);
  }
}
