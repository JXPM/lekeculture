export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "Qui sommes-nous",
      insights: "Insights Culturels",
      community: "Rejoindre la Communauté",
      language: "Langue"
    },
    hero: {
      title: "Leke Culture",
      subtitle: "Art, Tradition et Fierté Africaine",
      description: "Découvrez la richesse de la culture ivoirienne et africaine à travers nos articles, événements et communauté passionnée.",
      explore: "Explorer la Culture",
      join: "Rejoindre la Communauté"
    },
    home: {
      insights: "Insights Culturels",
      insightsDesc: "Découvrez les derniers articles sur la culture ivoirienne",
      categories: {
        dance: "Danse",
        art: "Art",
        music: "Musique",
        history: "Histoire",
        crafts: "Artisanat"
      },
      newsletter: {
        title: "Restez connecté",
        description: "Recevez les dernières nouvelles culturelles directement dans votre boîte mail",
        placeholder: "Votre adresse email",
        subscribe: "S'abonner"
      },
      features: {
        title: "Explorez notre culture",
        dance: {
          title: "Danse Zaouli",
          description: "Découvrez la danse traditionnelle Zaouli, symbole de beauté féminine"
        },
        art: {
          title: "Art Traditionnel",
          description: "Explorez l'artisanat ivoirien, des masques aux textiles"
        },
        music: {
          title: "Musique & Rythmes",
          description: "Immergez-vous dans les rythmes authentiques de Côte d'Ivoire"
        }
      }
    },
    about: {
      title: "Notre Mission",
      description: "Préserver, promouvoir et partager la richesse culturelle de la Côte d'Ivoire",
      timeline: {
        title: "Histoire Culturelle Ivoirienne",
        items: [
          {
            year: "Antiquité",
            title: "Origines Ancestrales",
            description: "Les premières civilisations s'établissent en Côte d'Ivoire"
          },
          {
            year: "Moyen Âge",
            title: "Royaumes Traditionnels",
            description: "Émergence des grands royaumes Baoulé, Agni et autres"
          },
          {
            year: "Époque Moderne",
            title: "Renaissance Culturelle",
            description: "Revitalisation et préservation des traditions"
          }
        ]
      }
    },
    community: {
      title: "Rejoignez Notre Communauté",
      whatsapp: {
        title: "Groupe WhatsApp",
        description: "Connectez-vous avec d'autres passionnés de culture ivoirienne",
        join: "Rejoindre le groupe"
      },
      events: {
        title: "Événements à venir",
        description: "Participez à nos meetups, festivals et célébrations culturelles"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      insights: "Cultural Insights",
      community: "Join Community",
      language: "Language"
    },
    hero: {
      title: "Leke Culture",
      subtitle: "Art, Tradition and African Pride",
      description: "Discover the richness of Ivorian and African culture through our articles, events and passionate community.",
      explore: "Explore Culture",
      join: "Join Community"
    },
    home: {
      insights: "Cultural Insights",
      insightsDesc: "Discover the latest articles on Ivorian culture",
      categories: {
        dance: "Dance",
        art: "Art",
        music: "Music",
        history: "History",
        crafts: "Crafts"
      },
      newsletter: {
        title: "Stay Connected",
        description: "Receive the latest cultural news directly in your inbox",
        placeholder: "Your email address",
        subscribe: "Subscribe"
      },
      features: {
        title: "Explore our culture",
        dance: {
          title: "Zaouli Dance",
          description: "Discover the traditional Zaouli dance, symbol of feminine beauty"
        },
        art: {
          title: "Traditional Art",
          description: "Explore Ivorian craftsmanship, from masks to textiles"
        },
        music: {
          title: "Music & Rhythms",
          description: "Immerse yourself in the authentic rhythms of Côte d'Ivoire"
        }
      }
    },
    about: {
      title: "Our Mission",
      description: "Preserve, promote and share the cultural richness of Côte d'Ivoire",
      timeline: {
        title: "Ivorian Cultural History",
        items: [
          {
            year: "Ancient Times",
            title: "Ancestral Origins",
            description: "The first civilizations established in Côte d'Ivoire"
          },
          {
            year: "Middle Ages",
            title: "Traditional Kingdoms",
            description: "Emergence of the great Baoulé, Agni and other kingdoms"
          },
          {
            year: "Modern Era",
            title: "Cultural Renaissance",
            description: "Revitalization and preservation of traditions"
          }
        ]
      }
    },
    community: {
      title: "Join Our Community",
      whatsapp: {
        title: "WhatsApp Group",
        description: "Connect with other Ivorian culture enthusiasts",
        join: "Join the group"
      },
      events: {
        title: "Upcoming Events",
        description: "Participate in our meetups, festivals and cultural celebrations"
      }
    }
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.fr;
