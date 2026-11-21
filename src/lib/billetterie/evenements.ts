// Événements Leke ouverts à la réservation. Un événement = une entrée ici + son slug dans l'URL
// (/evenements/<slug>). Les champs à null sont encore à confirmer par l'équipe : la page affiche
// « bientôt annoncé » à la place.

export type Evenement = {
  slug: string;
  titre: string;
  artiste: string;
  accroche: string;
  description: string[];
  date: string; // AAAA-MM-JJ
  heureDebut: string | null; // HH:MM, heure d'Abidjan (GMT)
  heureFin: string | null;
  lieu: string;
  ville: string;
  adresse: string | null;
  mapsUrl: string | null;
  jauge: number | null; // null = pas de limite tant que la capacité n'est pas connue
  ageMinimum: number | null;
  prix: 'gratuit';
  partenaires: string[];
  ouvert: boolean; // false = réservations fermées
  photos: { src: string; alt: string }[];
  liensEcoute: { label: string; url: string }[];
};

export const EVENEMENTS: Record<string, Evenement> = {
  'ozaki-listening-party': {
    slug: 'ozaki-listening-party',
    titre: 'Listening Party',
    artiste: 'Ozaki',
    accroche: 'Écoute en avant-première du nouvel EP, en présence de l’artiste.',
    description: [
      'Une soirée pour découvrir le nouvel EP d’Ozaki, avec la participation d’ABDXXL et Goh Dedi, dans les conditions d’un vrai lancement.',
      'Entrée gratuite, sur réservation : prends ton ticket ici, garde ton QR code, et présente-le à l’entrée.',
    ],
    date: '2026-11-27',
    heureDebut: null,
    heureFin: null,
    lieu: 'Palm Square',
    ville: 'Abidjan',
    adresse: null,
    mapsUrl: null,
    jauge: null,
    ageMinimum: null,
    prix: 'gratuit',
    partenaires: ['Lêkê', 'Slime Life Ivoire', 'NSC', 'New Wave Gen'],
    ouvert: true,
    photos: [
      { src: '/evenements/ozaki/ozaki-1.jpg', alt: 'Ozaki en costume noir, cagoule et lunettes' },
      { src: '/evenements/ozaki/ozaki-2.jpg', alt: 'Ozaki en costume noir avec un sac à damier' },
      { src: '/evenements/ozaki/ozaki-3.jpg', alt: 'Ozaki en t-shirt vert, foulard vert sur la tête' },
      { src: '/evenements/ozaki/ozaki-4.jpg', alt: 'Portrait d’Ozaki de profil, bob et chaîne' },
      { src: '/evenements/ozaki/ozaki-5.jpg', alt: 'Ozaki en pull clair, en mouvement' },
    ],
    liensEcoute: [],
  },
};

export const trouverEvenement = (slug: string): Evenement | null => EVENEMENTS[slug] ?? null;

// « Vendredi 27 novembre 2026 »
export function dateLongue(e: Evenement): string {
  const d = new Date(`${e.date}T12:00:00Z`);
  const s = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function horaire(e: Evenement): string | null {
  if (!e.heureDebut) return null;
  const f = (h: string) => h.replace(':', 'h');
  return e.heureFin ? `${f(e.heureDebut)} à ${f(e.heureFin)}` : `À partir de ${f(e.heureDebut)}`;
}

// Version de la politique de confidentialité affichée (/evenements/confidentialite).
// À changer à chaque modification de cette page.
export const CGV_VERSION = '2026-11-21';

// Données des participants anonymisées 3 mois après l'événement (annoncé dans la politique).
export const CONSERVATION_MOIS = 3;
