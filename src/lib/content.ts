/**
 * Contenu éditorial partagé par les pages et la page d'accueil.
 * Tout est bilingue (FR/EN) et puise dans le catalogue d'images vérifié (images.ts).
 *
 * Leke documente les cultures vivantes du continent africain et de sa diaspora.
 * La Côte d'Ivoire, berceau du projet, y tient une place de premier plan, sans
 * que le regard se limite à un seul pays.
 */

import { IMAGES, type ImageKey } from "@/lib/images";

export interface Bilingual {
  fr: string;
  en: string;
}

export interface Rubrique {
  id: string;
  label: Bilingual;
}

/** Rubriques éditoriales (sert aussi de filtres pour /insights). */
export const RUBRIQUES: Rubrique[] = [
  { id: "patrimoine", label: { fr: "Patrimoine", en: "Heritage" } },
  { id: "textiles", label: { fr: "Textiles", en: "Textiles" } },
  { id: "musique", label: { fr: "Musiques", en: "Music" } },
  { id: "arts", label: { fr: "Arts & masques", en: "Arts & masks" } },
  { id: "societe", label: { fr: "Modes de vie", en: "Ways of life" } },
  { id: "diaspora", label: { fr: "Diaspora", en: "Diaspora" } },
];

export function rubriqueLabel(id: string, lang: "fr" | "en"): string {
  return RUBRIQUES.find((r) => r.id === id)?.label[lang] ?? id;
}

export interface Article {
  id: number;
  slug: string;
  category: string;
  image: ImageKey;
  title: Bilingual;
  excerpt: Bilingual;
  author: string;
  region: Bilingual;
  date: string; // ISO
  readMin: number;
  featured: boolean;
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: "zaouli-danse-gouro",
    category: "arts",
    image: "zaouli",
    title: {
      fr: "Le Zaouli, la danse qui défie le tempo",
      en: "Zaouli, the dance that defies the tempo",
    },
    excerpt: {
      fr: "Masque Gouro et pieds plus rapides que les tambours : portrait d'une danse ivoirienne classée au patrimoine de l'humanité.",
      en: "A Guro mask and feet faster than the drums: a portrait of an Ivorian dance recognised as world heritage.",
    },
    author: "Affoué N'Guessan",
    region: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire" },
    date: "2026-05-28",
    readMin: 7,
    featured: true,
  },
  {
    id: 2,
    slug: "korhogo-toile-senufo",
    category: "textiles",
    image: "korhogo",
    title: {
      fr: "Korhogo : la toile que l'on peint à la boue",
      en: "Korhogo: the cloth painted with mud",
    },
    excerpt: {
      fr: "Chez les Sénoufo du nord ivoirien, chaque animal peint sur le coton raconte un proverbe et protège celui qui le porte.",
      en: "Among the Senufo of northern Côte d'Ivoire, each animal painted on cotton tells a proverb and protects its wearer.",
    },
    author: "Salif Coulibaly",
    region: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire" },
    date: "2026-05-14",
    readMin: 6,
    featured: true,
  },
  {
    id: 3,
    slug: "lalibela-pierre-vivante",
    category: "patrimoine",
    image: "lalibela",
    title: {
      fr: "Lalibela : onze églises taillées dans la montagne",
      en: "Lalibela: eleven churches carved from the mountain",
    },
    excerpt: {
      fr: "Comment les bâtisseurs éthiopiens du XIIe siècle ont creusé une Jérusalem souterraine, encore vivante aujourd'hui.",
      en: "How twelfth-century Ethiopian builders carved an underground Jerusalem that is still alive today.",
    },
    author: "Naïma Belkacem",
    region: { fr: "Éthiopie", en: "Ethiopia" },
    date: "2026-05-02",
    readMin: 8,
    featured: true,
  },
  {
    id: 4,
    slug: "kente-langage-tisse",
    category: "textiles",
    image: "kente",
    title: {
      fr: "Le Kente, un langage qui se tisse",
      en: "Kente, a language that is woven",
    },
    excerpt: {
      fr: "Chaque bande, chaque couleur porte un proverbe. Rencontre avec les maîtres tisserands d'Ashanti et de la Volta.",
      en: "Every strip and colour carries a proverb. A visit to the master weavers of Ashanti and the Volta.",
    },
    author: "Yaw Owusu",
    region: { fr: "Ghana", en: "Ghana" },
    date: "2026-04-22",
    readMin: 6,
    featured: true,
  },
  {
    id: 5,
    slug: "grand-bassam-ville-jardin",
    category: "patrimoine",
    image: "grandBassam",
    title: {
      fr: "Grand-Bassam, première capitale devenue mémoire",
      en: "Grand-Bassam, a first capital turned memory",
    },
    excerpt: {
      fr: "Ville-jardin du sud ivoirien, son quartier France classé raconte le commerce, la fièvre jaune et l'indépendance.",
      en: "A garden town in southern Côte d'Ivoire whose listed quarter tells of trade, yellow fever and independence.",
    },
    author: "Konan Kacou",
    region: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire" },
    date: "2026-04-08",
    readMin: 7,
    featured: false,
  },
  {
    id: 6,
    slug: "abidjan-coupe-decale",
    category: "musique",
    image: "abidjan",
    title: {
      fr: "Abidjan la nuit : le coupé-décalé, vingt ans après",
      en: "Abidjan after dark: coupé-décalé, twenty years on",
    },
    excerpt: {
      fr: "Né dans les maquis et les clubs d'Abidjan, le coupé-décalé a essaimé jusqu'aux dancefloors de Paris et de Londres.",
      en: "Born in the bars and clubs of Abidjan, coupé-décalé spread to the dancefloors of Paris and London.",
    },
    author: "Yann Koffi",
    region: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire" },
    date: "2026-03-25",
    readMin: 6,
    featured: false,
  },
  {
    id: 7,
    slug: "djembe-circulation-rythmes",
    category: "musique",
    image: "djembe",
    title: {
      fr: "Du djembé à l'afrobeats : la route des rythmes",
      en: "From djembe to afrobeats: the route of rhythm",
    },
    excerpt: {
      fr: "Des percussions mandingues aux studios de Lagos, la trame rythmique qui relie les générations.",
      en: "From Mandinka percussion to the studios of Lagos, the rhythmic thread linking generations.",
    },
    author: "Chinelo Okafor",
    region: { fr: "Afrique de l'Ouest", en: "West Africa" },
    date: "2026-03-12",
    readMin: 7,
    featured: false,
  },
  {
    id: 8,
    slug: "masques-baoule-akan",
    category: "arts",
    image: "baouleMask",
    title: {
      fr: "Masques Baoulé : le visage des esprits Akan",
      en: "Baoulé masks: the face of the Akan spirits",
    },
    excerpt: {
      fr: "Du Goli au Kplé Kplé, les masques baoulé orchestrent fêtes et deuils dans le centre de la Côte d'Ivoire.",
      en: "From Goli to Kple Kple, Baoulé masks orchestrate feasts and mourning in central Côte d'Ivoire.",
    },
    author: "Konan Kacou",
    region: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire" },
    date: "2026-02-26",
    readMin: 9,
    featured: false,
  },
  {
    id: 9,
    slug: "gelede-masque-yoruba",
    category: "arts",
    image: "gelede",
    title: {
      fr: "Gelede : le masque qui rend hommage aux mères",
      en: "Gelede: the mask that honours mothers",
    },
    excerpt: {
      fr: "Inscrit au patrimoine de l'humanité, le spectacle Gelede des Yoruba mêle satire, danse et pouvoir féminin.",
      en: "Recognised as world heritage, the Yoruba Gelede spectacle blends satire, dance and feminine power.",
    },
    author: "Folake Adeyemi",
    region: { fr: "Nigeria, Bénin", en: "Nigeria, Benin" },
    date: "2026-02-12",
    readMin: 9,
    featured: false,
  },
  {
    id: 10,
    slug: "bronzes-benin-retour",
    category: "arts",
    image: "beninBronze",
    title: {
      fr: "Les Bronzes du Bénin et la question du retour",
      en: "The Benin Bronzes and the question of return",
    },
    excerpt: {
      fr: "Chefs-d'œuvre de fonte du royaume d'Edo, ils racontent une cour, un commerce et un débat toujours ouvert.",
      en: "Cast masterpieces of the Edo kingdom that tell of a court, a trade and a still-open debate.",
    },
    author: "Tendai Moyo",
    region: { fr: "Nigeria", en: "Nigeria" },
    date: "2026-01-29",
    readMin: 11,
    featured: false,
  },
  {
    id: 11,
    slug: "cafe-ethiopie-ceremonie",
    category: "societe",
    image: "coffee",
    title: {
      fr: "La cérémonie du café, à l'origine d'un rituel",
      en: "The coffee ceremony, where a ritual begins",
    },
    excerpt: {
      fr: "En Éthiopie, terre d'origine du café, partager une tasse est un acte social codifié et profondément hospitalier.",
      en: "In Ethiopia, the birthplace of coffee, sharing a cup is a codified and deeply hospitable social act.",
    },
    author: "Naïma Belkacem",
    region: { fr: "Éthiopie", en: "Ethiopia" },
    date: "2026-01-15",
    readMin: 4,
    featured: false,
  },
  {
    id: 12,
    slug: "sape-elegance-congo",
    category: "diaspora",
    image: "sape",
    title: {
      fr: "La Sape : l'élégance comme prise de parole",
      en: "La Sape: elegance as a statement",
    },
    excerpt: {
      fr: "De Brazzaville à Paris, les Sapeurs font du costume un art de la dignité et de la résistance.",
      en: "From Brazzaville to Paris, the Sapeurs turn the suit into an art of dignity and resistance.",
    },
    author: "Amara Diallo",
    region: { fr: "Congo, diaspora", en: "Congo, diaspora" },
    date: "2026-01-08",
    readMin: 6,
    featured: false,
  },
];

export interface Place {
  id: string;
  image: ImageKey;
  name: Bilingual;
  region: Bilingual;
  era: Bilingual;
  blurb: Bilingual;
}

/** Lieux de patrimoine pour le parcours « Lieux » (route /virtual-tour). */
export const PLACES: Place[] = [
  {
    id: "grand-bassam",
    image: "grandBassam",
    name: { fr: "Quartier France, Grand-Bassam", en: "Old Town of Grand-Bassam" },
    region: { fr: "Sud-Comoé, Côte d'Ivoire", en: "Sud-Comoé, Côte d'Ivoire" },
    era: { fr: "Fin du XIXe siècle", en: "Late 19th century" },
    blurb: {
      fr: "Première capitale coloniale de la Côte d'Ivoire, ville-jardin inscrite au patrimoine mondial.",
      en: "The first colonial capital of Côte d'Ivoire, a garden town inscribed as world heritage.",
    },
  },
  {
    id: "lalibela",
    image: "lalibela",
    name: { fr: "Églises de Lalibela", en: "Churches of Lalibela" },
    region: { fr: "Amhara, Éthiopie", en: "Amhara, Ethiopia" },
    era: { fr: "XIIe – XIIIe siècle", en: "12th – 13th century" },
    blurb: {
      fr: "Onze sanctuaires monolithes creusés dans le tuf volcanique, toujours en usage liturgique.",
      en: "Eleven monolithic sanctuaries carved into volcanic rock, still in liturgical use.",
    },
  },
  {
    id: "djenne",
    image: "djenne",
    name: { fr: "Grande Mosquée de Djenné", en: "Great Mosque of Djenné" },
    region: { fr: "Mopti, Mali", en: "Mopti, Mali" },
    era: { fr: "Reconstruite en 1907", en: "Rebuilt in 1907" },
    blurb: {
      fr: "Le plus grand édifice en terre crue du monde, recrépi chaque année par toute la ville.",
      en: "The world's largest adobe building, re-plastered every year by the whole town.",
    },
  },
  {
    id: "great-zimbabwe",
    image: "greatZimbabwe",
    name: { fr: "Grand Zimbabwe", en: "Great Zimbabwe" },
    region: { fr: "Masvingo, Zimbabwe", en: "Masvingo, Zimbabwe" },
    era: { fr: "XIe – XVe siècle", en: "11th – 15th century" },
    blurb: {
      fr: "Capitale de pierre sèche d'un royaume marchand, sans mortier ni équivalent en Afrique australe.",
      en: "Dry-stone capital of a trading kingdom, mortar-free and unmatched in Southern Africa.",
    },
  },
  {
    id: "meroe",
    image: "meroe",
    name: { fr: "Pyramides de Méroé", en: "Pyramids of Meroë" },
    region: { fr: "Nahr an-Nil, Soudan", en: "River Nile, Sudan" },
    era: { fr: "300 av. J.-C. – 350 ap. J.-C.", en: "300 BCE – 350 CE" },
    blurb: {
      fr: "Près de deux cents pyramides nubiennes, nécropole des rois et reines de Koush.",
      en: "Nearly two hundred Nubian pyramids, the necropolis of the kings and queens of Kush.",
    },
  },
  {
    id: "goree",
    image: "goree",
    name: { fr: "Île de Gorée", en: "Gorée Island" },
    region: { fr: "Dakar, Sénégal", en: "Dakar, Senegal" },
    era: { fr: "XVe – XIXe siècle", en: "15th – 19th century" },
    blurb: {
      fr: "Lieu de mémoire de la traite atlantique, aujourd'hui dédié au recueillement et à la transmission.",
      en: "A memorial of the Atlantic slave trade, today devoted to remembrance and transmission.",
    },
  },
];

export interface GalleryPhoto {
  id: number;
  image: ImageKey;
  title: Bilingual;
  author: string;
  category: string;
  featured: boolean;
}

export const GALLERY: GalleryPhoto[] = [
  { id: 1, image: "zaouli", category: "arts", featured: true, author: "Affoué N'Guessan", title: { fr: "Le Zaouli en mouvement", en: "Zaouli in motion" } },
  { id: 2, image: "korhogo", category: "textiles", featured: true, author: "Salif Coulibaly", title: { fr: "Toile de Korhogo", en: "Korhogo cloth" } },
  { id: 3, image: "abidjan", category: "societe", featured: true, author: "Yann Koffi", title: { fr: "Le Plateau, Abidjan", en: "The Plateau, Abidjan" } },
  { id: 4, image: "danMask", category: "arts", featured: false, author: "Konan Kacou", title: { fr: "Masque Dan", en: "Dan mask" } },
  { id: 5, image: "maasai", category: "societe", featured: false, author: "Oumou Cissé", title: { fr: "Danse maasaï au crépuscule", en: "Maasai dance at dusk" } },
  { id: 6, image: "himba", category: "societe", featured: false, author: "Thandiwe Nkosi", title: { fr: "Regard himba", en: "Himba gaze" } },
  { id: 7, image: "marrakech", category: "patrimoine", featured: false, author: "Karim Haddad", title: { fr: "Lanternes du souk", en: "Lanterns of the souk" } },
  { id: 8, image: "kente", category: "textiles", featured: false, author: "Yaw Owusu", title: { fr: "Bandes de Kente", en: "Strips of Kente" } },
  { id: 9, image: "bogolan", category: "textiles", featured: false, author: "Aminata Traoré", title: { fr: "Bogolan teint à la boue", en: "Mud-dyed bogolan" } },
  { id: 10, image: "djembe", category: "musique", featured: false, author: "Chinelo Okafor", title: { fr: "Cercle de percussions", en: "Drumming circle" } },
  { id: 11, image: "baouleMask", category: "arts", featured: false, author: "Konan Kacou", title: { fr: "Masque Baoulé", en: "Baoulé mask" } },
  { id: 12, image: "sape", category: "diaspora", featured: false, author: "Amara Diallo", title: { fr: "Allure de Sapeur", en: "Sapeur style" } },
];

/** Repères honnêtes sur le projet (pas de chiffres gonflés). */
export const STATS = [
  { value: "54", label: { fr: "pays du continent", en: "countries on the continent" } },
  { value: "6", label: { fr: "rubriques", en: "sections" } },
  { value: "FR · EN", label: { fr: "deux langues", en: "two languages" } },
];

export const INSTAGRAM_URL = "https://www.instagram.com/leke_is_the_culture/";
export const INSTAGRAM_HANDLE = "leke_is_the_culture";
