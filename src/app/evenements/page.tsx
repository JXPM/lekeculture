import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { EVENEMENTS, dateLongue, horaire, type Evenement } from '@/lib/billetterie/evenements';

export const metadata: Metadata = {
  title: 'Événements',
  description: 'Listening parties, soirées et rencontres organisées par Lêkê à Abidjan. Réserve ton ticket en ligne.',
};

// Page régénérée chaque heure pour qu'un événement passe tout seul dans « passés ».
export const revalidate = 3600;

// Un événement reste « à venir » jusqu'à la fin de sa journée (heure d'Abidjan = UTC).
const aVenir = (e: Evenement) => new Date(`${e.date}T23:59:59Z`) >= new Date();

function Carte({ ev, passe = false }: { ev: Evenement; passe?: boolean }) {
  const heure = horaire(ev);
  return (
    <Link
      href={`/evenements/${ev.slug}`}
      className="group grid overflow-hidden rounded-lg border bg-card shadow-soft transition-shadow hover:shadow-lift md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 md:aspect-auto md:min-h-[340px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ev.photos[0].src}
          alt={ev.photos[0].alt}
          className={`absolute inset-0 h-full w-full object-cover object-top grayscale transition duration-700 group-hover:scale-[1.03] ${passe ? 'opacity-60' : ''}`}
        />
        {!passe && ev.prix === 'gratuit' && (
          <span className="absolute left-4 top-4 rounded bg-neutral-950/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
            Entrée gratuite
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{ev.titre}</p>
        <h2 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{ev.artiste}</h2>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-muted-foreground">{ev.accroche}</p>
        <div className="mt-6 space-y-2 text-sm">
          <p className="flex items-center gap-2.5">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
            {dateLongue(ev)}{heure ? ` · ${heure}` : ''}
          </p>
          <p className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 text-primary" aria-hidden />
            {ev.lieu}, {ev.ville}
          </p>
        </div>
        <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
          {passe ? 'Revoir l’événement' : ev.ouvert ? 'Réserver mon ticket' : 'Voir l’événement'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export default function PageEvenements() {
  const tous = Object.values(EVENEMENTS).sort((a, b) => a.date.localeCompare(b.date));
  const prochains = tous.filter(aVenir);
  const passes = tous.filter((e) => !aVenir(e)).reverse();

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Événements</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl">
          La culture, <em className="text-primary">en vrai</em>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Listening parties, soirées et rencontres organisées par Lêkê et ses partenaires à Abidjan.
          Réserve ta place en ligne en quelques secondes, ton ticket arrive tout de suite.
        </p>
      </header>

      <section className="mt-12" aria-labelledby="titre-prochains">
        <h2 id="titre-prochains" className="sr-only">Prochains événements</h2>
        {prochains.length ? (
          <div className="space-y-8">{prochains.map((ev) => <Carte key={ev.slug} ev={ev} />)}</div>
        ) : (
          <p className="rounded-lg border bg-card p-8 text-muted-foreground">
            Pas d’événement annoncé pour le moment. Suis Lêkê sur Instagram pour être au courant du prochain.
          </p>
        )}
      </section>

      {passes.length > 0 && (
        <section className="mt-20" aria-labelledby="titre-passes">
          <h2 id="titre-passes" className="font-serif text-3xl">Événements passés</h2>
          <div className="mt-8 space-y-8">{passes.map((ev) => <Carte key={ev.slug} ev={ev} passe />)}</div>
        </section>
      )}
    </div>
  );
}
