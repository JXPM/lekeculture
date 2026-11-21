/**
 * Catalogue d'images — photographies réelles et libres de droits (Wikimedia Commons),
 * vérifiées (HTTP 200, image/jpeg). Sujets pan-africains, dont la Côte d'Ivoire
 * (racines du projet) : patrimoine, textiles, arts, portraits et scènes de vie.
 *
 * Chaque entrée porte un texte alternatif bilingue (accessibilité) et une légende
 * courte. Les URLs pointent vers upload.wikimedia.org (autorisé dans next.config.js).
 *
 * ▸ POUR UTILISER VOS PROPRES PHOTOS (Instagram, archives) :
 *   1. déposez le fichier dans `public/leke/` (ex. public/leke/zaouli.jpg) ;
 *   2. remplacez la valeur `url` ci-dessous par "/leke/zaouli.jpg".
 *   Les photos Instagram ne peuvent pas être récupérées automatiquement
 *   (mur de connexion + URLs CDN signées qui expirent), il faut les déposer ici.
 */

export interface CulturalImage {
  url: string;
  altFr: string;
  altEn: string;
  /** Lieu / peuple représenté, affiché en légende fonctionnelle. */
  captionFr: string;
  captionEn: string;
}

export const IMAGES = {
  lalibela: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Ethiopia_-_sunset_at_Church_of_Saint_George%2C_Lalibela_01.jpg/1920px-Ethiopia_-_sunset_at_Church_of_Saint_George%2C_Lalibela_01.jpg",
    altFr: "Église Saint-Georges taillée dans la roche, Lalibela, Éthiopie, au coucher du soleil",
    altEn: "Rock-hewn Church of Saint George at sunset, Lalibela, Ethiopia",
    captionFr: "Lalibela, Éthiopie",
    captionEn: "Lalibela, Ethiopia",
  },
  kente: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Different_Kente_cloth%2C_Tafi%2C_Volta_region.jpg/1920px-Different_Kente_cloth%2C_Tafi%2C_Volta_region.jpg",
    altFr: "Pagnes Kente tissés aux motifs colorés, région de la Volta, Ghana",
    altEn: "Woven Kente cloth with colourful patterns, Volta region, Ghana",
    captionFr: "Tissage Kente, Ghana",
    captionEn: "Kente weaving, Ghana",
  },
  ndebele: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Ndebele_Architecture.jpg/1920px-Ndebele_Architecture.jpg",
    altFr: "Maison peinte de motifs géométriques Ndebele, Afrique du Sud",
    altEn: "House painted with Ndebele geometric patterns, South Africa",
    captionFr: "Peinture Ndebele, Afrique du Sud",
    captionEn: "Ndebele painting, South Africa",
  },
  maasai: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Maasai_women_dancing.jpg/1920px-Maasai_women_dancing.jpg",
    altFr: "Femmes maasaï dansant en parures de perles, Afrique de l'Est",
    altEn: "Maasai women dancing in beaded regalia, East Africa",
    captionFr: "Danse maasaï, Afrique de l'Est",
    captionEn: "Maasai dance, East Africa",
  },
  djenne: {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Great_Mosque_of_Djenn%C3%A9_1.jpg",
    altFr: "Grande Mosquée de Djenné en banco, Mali",
    altEn: "Great Mosque of Djenné built in adobe, Mali",
    captionFr: "Djenné, Mali",
    captionEn: "Djenné, Mali",
  },
  greatZimbabwe: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Great_Zimbabwe_Ruins.jpg/1920px-Great_Zimbabwe_Ruins.jpg",
    altFr: "Murs de pierre sèche des ruines du Grand Zimbabwe",
    altEn: "Dry-stone walls of the Great Zimbabwe ruins",
    captionFr: "Grand Zimbabwe",
    captionEn: "Great Zimbabwe",
  },
  meroe: {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/10/Sudan_Meroe_Pyramids_2001_N18.jpg",
    altFr: "Pyramides nubiennes de Méroé dans le désert, Soudan",
    altEn: "Nubian pyramids of Meroë in the desert, Sudan",
    captionFr: "Méroé, Soudan",
    captionEn: "Meroë, Sudan",
  },
  tuareg: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/A_Tuareg_in_northern_Mali_prepares_a_fire_for_making_tea.jpg/1920px-A_Tuareg_in_northern_Mali_prepares_a_fire_for_making_tea.jpg",
    altFr: "Homme touareg préparant le thé dans le nord du Mali",
    altEn: "Tuareg man preparing tea in northern Mali",
    captionFr: "Sahara, Mali",
    captionEn: "Sahara, Mali",
  },
  gelede: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/British_Museum_Room_25_Gelede_mask_Yoruba_people_17022019_5003.jpg/1920px-British_Museum_Room_25_Gelede_mask_Yoruba_people_17022019_5003.jpg",
    altFr: "Masque Gelede sculpté du peuple Yoruba",
    altEn: "Carved Gelede mask of the Yoruba people",
    captionFr: "Masque Gelede, Yoruba",
    captionEn: "Gelede mask, Yoruba",
  },
  djembe: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Djembe_drummers_-_Flickr_-_416style.jpg/1920px-Djembe_drummers_-_Flickr_-_416style.jpg",
    altFr: "Percussionnistes jouant du djembé en plein air",
    altEn: "Drummers playing the djembe outdoors",
    captionFr: "Percussions djembé",
    captionEn: "Djembe drumming",
  },
  goree: {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Senegal_Gor%C3%A9e_%288%29.jpg",
    altFr: "Maisons coloniales colorées de l'île de Gorée, Sénégal",
    altEn: "Colourful colonial houses on Gorée Island, Senegal",
    captionFr: "Île de Gorée, Sénégal",
    captionEn: "Gorée Island, Senegal",
  },
  adinkra: {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adinkra_cloth.JPG",
    altFr: "Étoffe imprimée de symboles Adinkra, Ghana",
    altEn: "Cloth printed with Adinkra symbols, Ghana",
    captionFr: "Symboles Adinkra, Ghana",
    captionEn: "Adinkra symbols, Ghana",
  },
  beninBronze: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Benin_Bronzes.jpg/1920px-Benin_Bronzes.jpg",
    altFr: "Bronzes du royaume du Bénin, plaques en alliage de cuivre",
    altEn: "Benin Bronzes, copper-alloy plaques from the Kingdom of Benin",
    captionFr: "Bronzes du Bénin",
    captionEn: "Benin Bronzes",
  },
  himba: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Namibie_Himba_0717a.jpg/1920px-Namibie_Himba_0717a.jpg",
    altFr: "Portrait d'une femme himba, Namibie",
    altEn: "Portrait of a Himba woman, Namibia",
    captionFr: "Peuple himba, Namibie",
    captionEn: "Himba people, Namibia",
  },
  bogolan: {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Traditional_mud_cloth.jpg",
    altFr: "Bogolan, étoffe teinte à la boue aux motifs traditionnels, Mali",
    altEn: "Bogolan mud cloth with traditional patterns, Mali",
    captionFr: "Bogolan, Mali",
    captionEn: "Bogolan, Mali",
  },
  marrakech: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Oriental_hanging_lanterns._Souk_Haddadine%2C_Marrakech_Medina%2C_Morocco.jpg/1920px-Oriental_hanging_lanterns._Souk_Haddadine%2C_Marrakech_Medina%2C_Morocco.jpg",
    altFr: "Lanternes de cuivre suspendues dans un souk de Marrakech, Maroc",
    altEn: "Hanging brass lanterns in a Marrakech souk, Morocco",
    captionFr: "Médina de Marrakech, Maroc",
    captionEn: "Marrakech Medina, Morocco",
  },
  fulani: {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/COLLECTIE_TROPENMUSEUM_Portret_van_een_Fulani_vrouw_TMnr_20016721_-_Djenn%C3%A9%2C_Mali%2C_1970-1971.jpg",
    altFr: "Portrait d'une femme peule parée de bijoux d'or, Djenné, Mali",
    altEn: "Portrait of a Fulani woman wearing gold jewellery, Djenné, Mali",
    captionFr: "Peuple peul, Mali",
    captionEn: "Fulani people, Mali",
  },
  sape: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Justin_makangara_RDC_%288%29.JPG/1920px-Justin_makangara_RDC_%288%29.JPG",
    altFr: "Adepte de la Sape en tenue élégante, République démocratique du Congo",
    altEn: "A 'sapeur' in an elegant outfit, Democratic Republic of the Congo",
    captionFr: "La Sape, Congo",
    captionEn: "La Sape, Congo",
  },
  coffee: {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Ethiopian_Coffee_Ceremony_Set.jpg",
    altFr: "Service traditionnel de la cérémonie du café éthiopien",
    altEn: "Traditional Ethiopian coffee ceremony set",
    captionFr: "Cérémonie du café, Éthiopie",
    captionEn: "Coffee ceremony, Ethiopia",
  },
  portrait: {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/67/Amakholwa.jpg",
    altFr: "Portrait studio d'une femme en coiffe traditionnelle, Afrique australe",
    altEn: "Studio portrait of a woman in traditional headdress, Southern Africa",
    captionFr: "Afrique australe",
    captionEn: "Southern Africa",
  },

  // ----- Côte d'Ivoire (racines du projet) -----
  zaouli: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Portrait_du_zaouli_2.jpg/1920px-Portrait_du_zaouli_2.jpg",
    altFr: "Danseur portant le masque Zaouli du peuple Gouro, Côte d'Ivoire",
    altEn: "Dancer wearing the Zaouli mask of the Guro people, Côte d'Ivoire",
    captionFr: "Danse Zaouli, Côte d'Ivoire",
    captionEn: "Zaouli dance, Côte d'Ivoire",
  },
  danMask: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ritual_mask%2C_Dan_people%2C_Ivory_Coast%2C_03.jpg/1920px-Ritual_mask%2C_Dan_people%2C_Ivory_Coast%2C_03.jpg",
    altFr: "Masque rituel du peuple Dan, ouest de la Côte d'Ivoire",
    altEn: "Ritual mask of the Dan people, western Côte d'Ivoire",
    captionFr: "Masque Dan, Côte d'Ivoire",
    captionEn: "Dan mask, Côte d'Ivoire",
  },
  korhogo: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Korhogo_cloth%2C_Senufo_people%2C_Ivory_Coast_01.jpg/1920px-Korhogo_cloth%2C_Senufo_people%2C_Ivory_Coast_01.jpg",
    altFr: "Toile peinte de Korhogo aux motifs Sénoufo, Côte d'Ivoire",
    altEn: "Painted Korhogo cloth with Senufo motifs, Côte d'Ivoire",
    captionFr: "Toile de Korhogo, Côte d'Ivoire",
    captionEn: "Korhogo cloth, Côte d'Ivoire",
  },
  abidjan: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Plateau_Abidjan_de_nuit.jpg/1920px-Plateau_Abidjan_de_nuit.jpg",
    altFr: "Le quartier du Plateau à Abidjan illuminé la nuit, Côte d'Ivoire",
    altEn: "The Plateau district of Abidjan lit up at night, Côte d'Ivoire",
    captionFr: "Abidjan, Côte d'Ivoire",
    captionEn: "Abidjan, Côte d'Ivoire",
  },
  grandBassam: {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/41/Grand-BassamTribunal.jpg",
    altFr: "Bâtiment colonial du quartier France de Grand-Bassam, Côte d'Ivoire",
    altEn: "Colonial building in the old town of Grand-Bassam, Côte d'Ivoire",
    captionFr: "Grand-Bassam, Côte d'Ivoire",
    captionEn: "Grand-Bassam, Côte d'Ivoire",
  },
  baouleMask: {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Kple_Kple_mask._Baoul%C3%A9._C%C3%B4te_d%27Ivoire._Mus%C3%A9um_de_La_Rochelle_H3443.jpg",
    altFr: "Masque Kplé Kplé du peuple Baoulé, Côte d'Ivoire",
    altEn: "Kple Kple mask of the Baoulé people, Côte d'Ivoire",
    captionFr: "Masque Baoulé, Côte d'Ivoire",
    captionEn: "Baoulé mask, Côte d'Ivoire",
  },
} as const satisfies Record<string, CulturalImage>;

export type ImageKey = keyof typeof IMAGES;
