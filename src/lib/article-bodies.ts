/**
 * Corps des articles (bilingue), indexés par slug. Séparé de content.ts pour
 * garder ce dernier lisible. Chaque entrée est une liste de paragraphes.
 */

export const ARTICLE_BODIES: Record<string, { fr: string[]; en: string[] }> = {
  'zaouli-danse-gouro': {
    fr: [
      "Le Zaouli naît dans les villages gouro du centre-ouest de la Côte d'Ivoire, dans les années 1950. Le masque, finement sculpté et coiffé, représente une jeune femme idéalisée : il rend hommage à la beauté et relie les vivants à la mémoire des ancêtres.",
      "Ce qui sidère, c'est le contraste entre l'immobilité altière du masque et la vitesse des jambes. Le danseur enchaîne des pas si rapides que le pied semble effleurer le sol sans jamais s'y poser, porté par un orchestre de tambours et de flûtes.",
      "Inscrit en 2017 sur la liste représentative du patrimoine culturel immatériel de l'humanité, le Zaouli se transmet aujourd'hui des aînés aux plus jeunes. Loin d'être figé, il s'invite dans les clips et sur les scènes urbaines, preuve qu'une tradition reste vivante tant qu'on la danse.",
    ],
    en: [
      "Zaouli emerged in the Guro villages of central-western Côte d'Ivoire in the 1950s. The finely carved, crowned mask depicts an idealised young woman: it honours beauty and connects the living to the memory of the ancestors.",
      "What stuns audiences is the contrast between the mask's regal stillness and the speed of the legs. The dancer strings together steps so fast the foot seems to graze the ground without ever settling, carried by an ensemble of drums and flutes.",
      "Inscribed in 2017 on the representative list of the intangible cultural heritage of humanity, Zaouli is passed today from elders to the young. Far from frozen, it appears in music videos and on urban stages, proof that a tradition stays alive as long as it is danced.",
    ],
  },
  'korhogo-toile-senufo': {
    fr: [
      "Autour de Korhogo, dans le nord de la Côte d'Ivoire, les artisans sénoufo peignent le coton filé main avec une boue fermentée riche en fer. Au contact de décoctions végétales, la terre vire au brun profond et fixe le dessin pour des décennies.",
      "Les motifs ne sont jamais décoratifs au hasard. Crocodiles, calaos, danseurs masqués et tortues renvoient à des proverbes, à des protections et au savoir des sociétés initiatiques du Poro.",
      "Longtemps réservée aux chasseurs et aux cérémonies, la toile de Korhogo habille aujourd'hui les intérieurs et la mode contemporaine. Le défi des ateliers : vivre du marché sans vider les signes de leur sens.",
    ],
    en: [
      "Around Korhogo, in northern Côte d'Ivoire, Senufo artisans paint hand-spun cotton with an iron-rich fermented mud. Brushed with plant decoctions, the earth turns deep brown and fixes the design for decades.",
      "The motifs are never decorative by chance. Crocodiles, hornbills, masked dancers and tortoises point to proverbs, to protections and to the knowledge of the Poro initiation societies.",
      "Long reserved for hunters and ceremonies, Korhogo cloth now dresses interiors and contemporary fashion. The workshops' challenge: to live off the market without draining the signs of their meaning.",
    ],
  },
  'lalibela-pierre-vivante': {
    fr: [
      "À 2 500 mètres d'altitude, Lalibela aligne onze églises entièrement taillées dans la roche volcanique, vers la fin du XIIe siècle, sous le roi Gebre Mesqel Lalibela. L'idée : offrir une nouvelle Jérusalem à ceux qui ne pouvaient plus rejoindre la Terre sainte.",
      "Les bâtisseurs n'ont pas empilé des pierres : ils ont creusé, du haut vers le bas, des blocs monolithes reliés par un réseau de tranchées, de tunnels et de drains encore fonctionnels.",
      "Huit siècles plus tard, les prêtres y célèbrent toujours la liturgie éthiopienne orthodoxe. Lalibela n'est pas une ruine que l'on visite, mais un lieu de culte où l'on entre pieds nus.",
    ],
    en: [
      "At 2,500 metres of altitude, Lalibela lines up eleven churches entirely carved from volcanic rock in the late twelfth century, under King Gebre Mesqel Lalibela. The aim: to offer a new Jerusalem to those who could no longer reach the Holy Land.",
      "The builders did not stack stones: they carved downward, top to bottom, monolithic blocks linked by a network of trenches, tunnels and drains that still work.",
      "Eight centuries later, priests still celebrate the Ethiopian Orthodox liturgy here. Lalibela is not a ruin to tour, but a place of worship you enter barefoot.",
    ],
  },
  'kente-langage-tisse': {
    fr: [
      "Chez les Ashanti du Ghana et dans la région de la Volta, le Kente se tisse en bandes étroites, assemblées ensuite en pièces somptueuses. Chaque motif porte un nom, et chaque nom, une maxime.",
      "Les couleurs parlent : l'or pour le statut et la royauté, le vert pour la croissance, le bleu pour l'harmonie. Porter tel Kente, c'est afficher une intention sans dire un mot.",
      "Réservé autrefois aux cours royales, le tissu est devenu un emblème panafricain, repris par les diasporas lors des remises de diplômes et des grandes occasions.",
    ],
    en: [
      "Among the Ashanti of Ghana and in the Volta region, Kente is woven in narrow strips, later sewn into sumptuous pieces. Each pattern has a name, and each name, a maxim.",
      "The colours speak: gold for status and royalty, green for growth, blue for harmony. To wear a given Kente is to state an intention without a word.",
      "Once reserved for royal courts, the cloth has become a pan-African emblem, taken up by the diaspora at graduations and on great occasions.",
    ],
  },
  'grand-bassam-ville-jardin': {
    fr: [
      "Première capitale de la Côte d'Ivoire coloniale à partir de 1893, Grand-Bassam s'organise en quartiers : le quartier France administratif et commerçant, et N'zima, côté village.",
      "Une épidémie de fièvre jaune pousse l'administration à déménager vers Bingerville, puis Abidjan. La ville se fige alors dans son architecture de comptoirs, vérandas et maisons à étage.",
      "Classé au patrimoine mondial en 2012, le quartier France se visite comme un livre d'histoire à ciel ouvert, entre lagune et océan, à une heure d'Abidjan.",
    ],
    en: [
      "The first capital of colonial Côte d'Ivoire from 1893, Grand-Bassam was laid out in quarters: the administrative and trading French quarter, and N'zima on the village side.",
      "A yellow fever epidemic pushed the administration to move to Bingerville, then Abidjan. The town froze in its architecture of trading houses, verandas and upper-floor homes.",
      "Inscribed as world heritage in 2012, the French quarter can be read like an open-air history book, between lagoon and ocean, an hour from Abidjan.",
    ],
  },
  'abidjan-coupe-decale': {
    fr: [
      "Au début des années 2000, des Ivoiriens de Paris inventent le coupé-décalé : un tempo rapide, des basses généreuses et une philosophie de la dépense joyeuse née en pleine crise.",
      "DJ Arafat en devient la figure incandescente. À Abidjan, les maquis et les clubs de Yopougon font de la nuit un terrain d'expression et de débrouille.",
      "Vingt ans plus tard, le genre a infusé l'afrobeats et la pop mondiale. Le coupé-décalé reste un marqueur d'Abidjan : une manière de transformer la difficulté en fête.",
    ],
    en: [
      "In the early 2000s, Ivorians in Paris invented coupé-décalé: a fast tempo, generous bass and a philosophy of joyful spending born in the middle of a crisis.",
      "DJ Arafat became its incandescent figure. In Abidjan, the bars and clubs of Yopougon turned the night into a field of expression and hustle.",
      "Twenty years on, the genre has seeped into afrobeats and global pop. Coupé-décalé remains a marker of Abidjan: a way of turning hardship into celebration.",
    ],
  },
  'djembe-circulation-rythmes': {
    fr: [
      "Le djembé naît dans l'empire mandingue, façonné dans un tronc évidé et coiffé d'une peau de chèvre tendue. Un seul tambour imite la voix, du murmure au cri.",
      "Les griots et les ensembles de percussions ont fait voyager ces rythmes, du Mali et de la Guinée jusqu'aux scènes du monde entier.",
      "Aujourd'hui, la même pulsation irrigue les studios de Lagos et d'Accra. L'afrobeats n'efface pas le djembé : il en prolonge la conversation.",
    ],
    en: [
      "The djembe was born in the Mandinka empire, carved from a hollowed trunk and topped with a stretched goatskin. A single drum imitates the voice, from whisper to cry.",
      "Griots and percussion ensembles carried these rhythms abroad, from Mali and Guinea to stages around the world.",
      "Today the same pulse runs through the studios of Lagos and Accra. Afrobeats does not erase the djembe: it extends its conversation.",
    ],
  },
  'masques-baoule-akan': {
    fr: [
      "Au centre de la Côte d'Ivoire, les Baoulé, peuple akan, sculptent des masques au service de la communauté. Le Goli, danse de réjouissance en quatre masques, accompagne fêtes et funérailles.",
      "Le Kplé Kplé, disque rouge et noir aux cornes, ouvre la danse ; viennent ensuite les masques animaux puis les visages humains, du plus brut au plus raffiné.",
      "Ces objets ne sont pas faits pour la vitrine. Hors du rituel, ils dorment ; c'est la danse, le chant et la présence du village qui les animent.",
    ],
    en: [
      "In central Côte d'Ivoire, the Baoulé, an Akan people, carve masks in the service of the community. The Goli, a celebratory dance in four masks, accompanies feasts and funerals.",
      "The Kple Kple, a red and black disc with horns, opens the dance; then come the animal masks and the human faces, from the rawest to the most refined.",
      "These objects are not made for the display case. Outside ritual, they sleep; it is the dance, the song and the presence of the village that bring them to life.",
    ],
  },
  'gelede-masque-yoruba': {
    fr: [
      "Le Gelede célèbre la puissance des mères, des aînées et des femmes, que les Yoruba nomment avec respect « nos mères ». Le spectacle se tient sur les places, à la saison sèche.",
      "Les masques, portés au sommet de la tête, surmontent des scènes sculptées et peintes qui commentent la société avec humour et gravité.",
      "Reconnu par l'UNESCO, le Gelede se pratique du sud-ouest du Nigeria au Bénin et au Togo. C'est un théâtre total où la danse devient pensée collective.",
    ],
    en: [
      "Gelede celebrates the power of mothers, elders and women, whom the Yoruba respectfully call 'our mothers'. The spectacle takes place in public squares during the dry season.",
      "The masks, worn on top of the head, crown carved and painted scenes that comment on society with humour and gravity.",
      "Recognised by UNESCO, Gelede is performed from south-western Nigeria to Benin and Togo. It is total theatre where dance becomes collective thought.",
    ],
  },
  'bronzes-benin-retour': {
    fr: [
      "Les Bronzes du Bénin désignent des milliers de plaques et de sculptures en alliage de cuivre, produites pour la cour du royaume d'Edo, dans l'actuel Nigeria, à partir du XVIe siècle.",
      "En 1897, une expédition punitive britannique pille le palais royal de Benin City. Les œuvres se dispersent ensuite dans les musées d'Europe et d'Amérique.",
      "Depuis, les demandes de restitution se multiplient et quelques pièces reviennent. Le débat dépasse l'objet : il interroge à qui appartient le récit d'une civilisation.",
    ],
    en: [
      "The Benin Bronzes are thousands of copper-alloy plaques and sculptures made for the court of the Edo kingdom, in present-day Nigeria, from the sixteenth century onward.",
      "In 1897, a British punitive expedition looted the royal palace of Benin City. The works then scattered into the museums of Europe and America.",
      "Since then, calls for restitution have multiplied and a few pieces have returned. The debate goes beyond the object: it asks who owns the story of a civilisation.",
    ],
  },
  'cafe-ethiopie-ceremonie': {
    fr: [
      "L'Éthiopie est le berceau du caféier arabica, et la cérémonie du café y rythme l'hospitalité. On y consacre du temps, jamais de la hâte.",
      "Les grains verts sont torréfiés sur le feu devant les invités, moulus, puis infusés dans une jebena en terre cuite. Trois services se succèdent, du plus fort au plus doux.",
      "Encens, herbes fraîches et conversation accompagnent le rituel. Refuser une tasse serait refuser le lien que l'hôte propose.",
    ],
    en: [
      "Ethiopia is the cradle of the arabica coffee plant, and the coffee ceremony there sets the rhythm of hospitality. It calls for time, never haste.",
      "Green beans are roasted over the fire in front of guests, ground, then brewed in a clay jebena. Three servings follow one another, from the strongest to the mildest.",
      "Incense, fresh herbs and conversation accompany the ritual. To refuse a cup would be to refuse the bond the host is offering.",
    ],
  },
  'sape-elegance-congo': {
    fr: [
      "La Sape, Société des Ambianceurs et des Personnes Élégantes, naît entre Brazzaville et Kinshasa. Le sapeur soigne la coupe, l'accord des couleurs et l'art de la démarche.",
      "Derrière l'élégance, il y a une posture : refuser la résignation, transformer des moyens modestes en allure souveraine, faire de soi une œuvre.",
      "De Bacongo aux quartiers de Paris et de Bruxelles, la Sape voyage avec la diaspora. C'est une fierté qui se porte, autant qu'un message qui se transmet.",
    ],
    en: [
      "La Sape, the Society of Ambiance-Makers and Elegant People, was born between Brazzaville and Kinshasa. The sapeur tends to the cut, the colour harmony and the art of the walk.",
      "Behind the elegance lies a stance: to refuse resignation, to turn modest means into sovereign style, to make oneself a work of art.",
      "From Bacongo to the neighbourhoods of Paris and Brussels, la Sape travels with the diaspora. It is a pride that is worn, as much as a message that is passed on.",
    ],
  },
};
