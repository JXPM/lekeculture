import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { CalendarDays, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { dateLongue, horaire, trouverEvenement } from '@/lib/billetterie/evenements';
import { trouverTicket } from '@/lib/billetterie/service';
import { ActionsTicket } from '@/components/billetterie/ActionsTicket';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Mon ticket',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

const heureAbidjan = (d: Date) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Abidjan' }).format(d);

export default async function PageTicket({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ nouveau?: string }>;
}) {
  const { code } = await params;
  const { nouveau } = await searchParams;
  const ticket = await trouverTicket(decodeURIComponent(code));
  if (!ticket) notFound();
  const ev = trouverEvenement(ticket.evenement);
  if (!ev) notFound();

  const h = await headers();
  const hote = h.get('x-forwarded-host') ?? h.get('host') ?? 'leke-culture.vercel.app';
  const proto = h.get('x-forwarded-proto') ?? (hote.startsWith('localhost') ? 'http' : 'https');
  const lien = `${proto}://${hote}/t/${ticket.code}`;
  const qr = await QRCode.toString(lien, { type: 'svg', errorCorrectionLevel: 'M', margin: 1, color: { dark: '#0a0a0a', light: '#ffffff' } });
  const numero = String(ticket.numero).padStart(4, '0');
  const heure = horaire(ev);
  const annule = ticket.statut === 'annule';

  return (
    <div className="min-h-[80vh] bg-neutral-950 px-4 py-10 text-neutral-100 sm:py-16">
      <div className="mx-auto max-w-md">
        {nouveau && !annule && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
            <p className="text-sm text-emerald-100">
              <strong className="font-semibold">C’est réservé, {ticket.prenom} !</strong> Fais une capture d’écran de ce ticket
              ou envoie-toi le lien sur WhatsApp pour le retrouver le jour J.
            </p>
          </div>
        )}

        <article className="overflow-hidden rounded-2xl bg-neutral-100 text-neutral-950 shadow-2xl" aria-label="Ticket d’entrée">
          {/* Haut du ticket */}
          <div className="relative h-44 overflow-hidden bg-neutral-900">
            <img src="/evenements/ozaki/partage.jpg" alt="" className="h-full w-full object-cover object-[50%_20%] grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/10" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">Lêkê présente</p>
                <p className="text-4xl font-bold uppercase leading-none tracking-[-0.03em]">{ev.artiste}</p>
                <p className="font-serif text-lg italic text-neutral-300">{ev.titre}</p>
              </div>
              <p className="text-right text-xs uppercase tracking-[0.15em] text-neutral-400">
                Ticket<br /><span className="text-lg font-bold tracking-normal text-white">N° {numero}</span>
              </p>
            </div>
          </div>

          {/* Infos */}
          <div className="space-y-2.5 px-5 py-5 text-sm">
            <p className="flex items-center gap-2.5"><CalendarDays className="h-4 w-4 text-emerald-700" aria-hidden />{dateLongue(ev)}</p>
            <p className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-emerald-700" aria-hidden />{heure ?? 'Horaire bientôt annoncé'}</p>
            <p className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-emerald-700" aria-hidden />{ev.lieu}, {ev.ville}</p>
          </div>

          {/* Séparation façon ticket détachable */}
          <div className="relative flex items-center" aria-hidden>
            <span className="absolute -left-3 h-6 w-6 rounded-full bg-neutral-950" />
            <span className="mx-5 w-full border-t-2 border-dashed border-neutral-300" />
            <span className="absolute -right-3 h-6 w-6 rounded-full bg-neutral-950" />
          </div>

          {/* QR */}
          <div className="px-5 pb-6 pt-5 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Au nom de</p>
            <p className="mt-1 text-xl font-semibold">{ticket.prenom} {ticket.nom}</p>

            <div className="relative mx-auto mt-5 w-64 max-w-full">
              <div
                className={`rounded-lg bg-white p-2 [&>svg]:h-auto [&>svg]:w-full ${annule ? 'opacity-15' : ''}`}
                role="img"
                aria-label={`QR code du ticket n° ${numero}`}
                dangerouslySetInnerHTML={{ __html: qr }}
              />
              {annule && (
                <p className="absolute inset-0 flex items-center justify-center text-lg font-bold uppercase tracking-wider text-red-700">
                  Ticket annulé
                </p>
              )}
            </div>

            {ticket.entre_le && !annule ? (
              <p className="mt-4 rounded-md bg-neutral-200 px-3 py-2 text-sm text-neutral-700">
                Entrée validée le {heureAbidjan(new Date(ticket.entre_le))}
              </p>
            ) : (
              <p className="mt-4 text-sm text-neutral-600">
                {annule ? 'Ce ticket n’est plus valable.' : 'Présente ce QR code à l’entrée. Il ne sert qu’une fois.'}
              </p>
            )}
            <p className="mt-3 font-mono text-[11px] tracking-wider text-neutral-400">{ticket.code}</p>
          </div>

          <div className="flex items-center justify-between bg-neutral-950 px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
            <span className="font-semibold text-white">lêkê<span className="text-emerald-400">.</span></span>
            <span>Entrée gratuite · 1 personne</span>
          </div>
        </article>

        <ActionsTicket lien={lien} texte={`Mon ticket pour ${ev.artiste} · ${ev.titre} (${dateLongue(ev)}, ${ev.lieu}) :`} slugEvenement={ev.slug} />
      </div>
    </div>
  );
}
