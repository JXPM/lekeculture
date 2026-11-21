// Accès de l'équipe : codes CONTROLE_KEY (hôtesse à l'entrée) et ADMIN_KEY (organisation),
// envoyés dans l'en-tête « x-cle ». L'admin peut aussi scanner.
import 'server-only';
import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { ErreurBilletterie } from './service';

const egal = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export function verifierCle(req: Request, role: 'controle' | 'admin'): void {
  const cle = req.headers.get('x-cle') ?? '';
  const admin = process.env.ADMIN_KEY ?? '';
  const controle = process.env.CONTROLE_KEY ?? '';
  const ok = (admin && egal(cle, admin)) || (role === 'controle' && controle && egal(cle, controle));
  if (!ok) throw new ErreurBilletterie(401, 'cle', 'Code d’accès incorrect.');
}

export function repondreErreur(err: unknown) {
  if (err instanceof ErreurBilletterie) {
    return NextResponse.json({ erreur: err.code, message: err.message }, { status: err.status });
  }
  console.error(err);
  return NextResponse.json({ erreur: 'serveur', message: 'Erreur du serveur, réessaie dans un instant.' }, { status: 500 });
}

export const pasDeCache = { 'Cache-Control': 'no-store' };
