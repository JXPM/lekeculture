import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';
import { EVENEMENTS, dateLongue, horaire, trouverEvenement } from '@/lib/billetterie/evenements';
import { FormulaireReservation } from '@/components/billetterie/FormulaireReservation';

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(EVENEMENTS).map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const ev = trouverEvenement((await params).slug);
  if (!ev) return {};
  const titre = `${ev.artiste} · ${ev.titre}`;
  const description = `${dateLongue(ev)} · ${ev.lieu}, ${ev.ville}. Entrée gratuite sur réservation : prends ton ticket.`;
  return {
    title: titre,
    description,
    openGraph: { title: titre, description, type: 'website', images: [{ url: '/evenements/ozaki/partage.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: titre, description, images: ['/evenements/ozaki/partage.jpg'] },
  };
}

export default async function PageEvenement({ params }: { params: Promise<{ slug: string }> }) {
  const ev = trouverEvenement((await params).slug);
  if (!ev) notFound();
  const heure = horaire(ev);
  const [principale, ...autres] = ev.photos;

  return (
    <div className="bg-neutral-950 text-neutral-100">
      {/* En-tête sur fond blanc : la photo studio se fond dans la page */}
      <div className="bg-white text-neutral-950">
      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Lêkê présente
          </p>
          <h1 className="mt-5 font-sans text-[clamp(4rem,13vw,9.5rem)] font-bold uppercase leading-[0.85] tracking-[-0.04em]">
            {ev.artiste}
          </h1>
          <p className="mt-3 font-serif text-[clamp(1.9rem,4.5vw,3.25rem)] italic leading-tight text-neutral-600">
            {ev.titre}
          </p>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-neutral-700">{ev.accroche}</p>

          <dl className="mt-8 grid gap-4 border-y border-neutral-200 py-6 sm:grid-cols-3">
            <div className="flex gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden />
              <div>
                <dt className="sr-only">Date</dt>
                <dd className="font-medium">{dateLongue(ev)}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden />
              <div>
                <dt className="sr-only">Horaire</dt>
                <dd className="font-medium">{heure ?? 'Horaire bientôt annoncé'}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden />
              <div>
                <dt className="sr-only">Lieu</dt>
                <dd className="font-medium">
                  {ev.mapsUrl ? (
                    <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-emerald-600/60 underline-offset-4 hover:text-emerald-700">
                      {ev.lieu}
                    </a>
                  ) : ev.lieu}
                  , {ev.ville}
                </dd>
              </div>
            </div>
          </dl>

          <a
            href="#reserver"
            className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-md bg-emerald-500 px-6 py-3.5 text-base font-semibold text-neutral-950 transition-colors hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <Ticket className="h-5 w-5" aria-hidden />
            Réserver mon ticket gratuit
          </a>

          {ev.liensEcoute.length > 0 && (
            <p className="mt-5 text-sm text-neutral-600">
              Écouter {ev.artiste} sur{' '}
              {ev.liensEcoute.map((l, i) => (
                <span key={l.url}>
                  {i > 0 && ', '}
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-950 underline decoration-emerald-600/60 underline-offset-4 hover:text-emerald-700">
                    {l.label}
                  </a>
                </span>
              ))}
            </p>
          )}
        </div>

        <figure className="relative">
          <img
            src="/evenements/ozaki/ozaki-1-blanc.jpg"
            alt={principale.alt}
            width={934}
            height={1400}
            fetchPriority="high"
            className="aspect-[4/5] w-full object-cover object-top mix-blend-multiply"
          />
          <figcaption className="absolute bottom-4 left-4 rounded bg-neutral-950/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Entrée gratuite · sur réservation
          </figcaption>
        </figure>
      </section>
      </div>

      {/* Réservation */}
      <section id="reserver" className="scroll-mt-20 bg-neutral-950">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Prends ta place</h2>
            <div className="mt-5 space-y-4 text-neutral-300">
              {ev.description.map((p) => <p key={p} className="leading-relaxed">{p}</p>)}
            </div>
            <ol className="mt-8 space-y-4">
              {[
                'Remplis tes infos : 30 secondes, rien à télécharger.',
                'Ton ticket avec QR code s’affiche tout de suite.',
                'Le jour J, montre-le à l’entrée sur ton téléphone.',
              ].map((etape, i) => (
                <li key={etape} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/60 text-sm font-semibold text-emerald-400">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-neutral-200">{etape}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-neutral-400">
              Une place par personne et par numéro WhatsApp.
              {ev.ageMinimum ? ` Entrée réservée aux ${ev.ageMinimum} ans et plus.` : ''}
            </p>
          </div>

          <FormulaireReservation evenement={ev.slug} ouvert={ev.ouvert} />
        </div>
      </section>

      {/* Photos */}
      <section aria-label={`Photos de ${ev.artiste}`} className="border-t border-neutral-800">
        <div className="flex gap-3 overflow-x-auto px-4 py-10 sm:px-6 lg:px-8 [scrollbar-width:none]">
          {autres.map((p) => (
            <img key={p.src} src={p.src} alt={p.alt} loading="lazy"
              className="h-72 w-auto shrink-0 rounded-md object-cover grayscale transition duration-500 hover:grayscale-0 sm:h-96" />
          ))}
        </div>
      </section>

      {/* Partenaires */}
      <section className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Organisé par</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-300">
            {ev.partenaires.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <p className="mx-auto max-w-[1400px] px-4 pb-10 text-xs text-neutral-500 sm:px-6 lg:px-8">
          Tes données servent uniquement à gérer l’entrée.{' '}
          <Link href="/evenements/confidentialite" className="underline underline-offset-2 hover:text-neutral-300">
            Politique de confidentialité
          </Link>
        </p>
      </section>
    </div>
  );
}
