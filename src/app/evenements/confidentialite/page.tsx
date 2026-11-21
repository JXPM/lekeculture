import type { Metadata } from 'next';
import { CONSERVATION_MOIS, CGV_VERSION } from '@/lib/billetterie/evenements';

export const metadata: Metadata = { title: 'Confidentialité des réservations' };

export default function PageConfidentialite() {
  const date = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(CGV_VERSION));
  return (
    <article className="mx-auto max-w-prose px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Mise à jour le {date}</p>
      <h1 className="mt-3 font-serif text-4xl">Confidentialité des réservations</h1>
      <div className="mt-8 space-y-6 leading-relaxed text-foreground/85 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground">
        <p>
          Quand tu réserves un ticket pour un événement Lêkê, nous collectons le minimum nécessaire pour gérer ton entrée.
          Cette page explique quoi, pourquoi, et comment exercer tes droits, conformément à la loi ivoirienne
          n° 2013-450 relative à la protection des données à caractère personnel.
        </p>
        <h2>Ce que nous collectons</h2>
        <p>Ton prénom, ton nom, ton numéro WhatsApp, la date de ta réservation et l’heure de ton passage à l’entrée.</p>
        <h2>Pourquoi</h2>
        <p>
          Pour t’attribuer un ticket, vérifier qu’il n’est utilisé qu’une fois, limiter les réservations à une place par
          personne et compter le nombre de participants. Si tu coches la case prévue, nous utilisons aussi ton numéro pour
          te prévenir des prochains événements Lêkê. Tu peux retirer cet accord à tout moment.
        </p>
        <h2>Qui y a accès</h2>
        <p>
          Uniquement l’équipe d’organisation de l’événement (Lêkê et ses partenaires organisateurs) et, le jour J, l’équipe
          d’accueil qui voit ton nom au moment du scan. Tes données ne sont jamais vendues. Elles sont hébergées chez nos
          prestataires techniques (Vercel pour le site, Neon pour la base de données), dans l’Union européenne.
        </p>
        <h2>Combien de temps</h2>
        <p>
          Tes informations sont anonymisées {CONSERVATION_MOIS} mois après l’événement. Seules restent des statistiques
          sans nom (nombre de réservations et d’entrées). Si tu as accepté d’être prévenu des prochains événements, ton
          prénom, ton nom et ton numéro sont gardés 24 mois au plus.
        </p>
        <h2>Tes droits</h2>
        <p>
          Tu peux demander à consulter, corriger ou supprimer tes données, ou retirer ton accord pour être prévenu,
          en écrivant à Lêkê sur Instagram (@leke_is_the_culture). Tu peux aussi saisir l’ARTCI (autorité de protection
          des données en Côte d’Ivoire).
        </p>
      </div>
    </article>
  );
}
