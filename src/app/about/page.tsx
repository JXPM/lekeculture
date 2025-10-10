'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Target, Heart, Star, Award } from 'lucide-react';

const timelineEvents = [
  {
    year: "Antiquité",
    yearEn: "Ancient Times",
    title: "Origines Ancestrales",
    titleEn: "Ancestral Origins",
    description: "Les premières civilisations s'établissent en Côte d'Ivoire, développant des traditions riches et des systèmes sociaux complexes.",
    descriptionEn: "The first civilizations established in Côte d'Ivoire, developing rich traditions and complex social systems.",
    image: "https://www.wildimages-phototours.com/wp-content/uploads/2023/02/Jongleurs-girls-pair-Ivory-Coast-Inger-Vandyke.jpg",
    color: "from-leke-red-500 to-leke-red-600"
  },
  {
    year: "Moyen Âge",
    yearEn: "Middle Ages",
    title: "Royaumes Traditionnels",
    titleEn: "Traditional Kingdoms",
    description: "Émergence des grands royaumes Baoulé, Agni et autres, avec leurs propres langues, coutumes et arts distinctifs.",
    descriptionEn: "Emergence of the great Baoulé, Agni and other kingdoms, with their own languages, customs and distinctive arts.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Cizaouli.jpg",
    color: "from-gray-600 to-gray-700"
  },
  {
    year: "Époque Moderne",
    yearEn: "Modern Era",
    title: "Renaissance Culturelle",
    titleEn: "Cultural Renaissance",
    description: "Revitalisation et préservation des traditions à travers l'art contemporain, la musique et les festivals culturels.",
    descriptionEn: "Revitalization and preservation of traditions through contemporary art, music and cultural festivals.",
    image: "https://landtours.com/blog/wp-content/uploads/2023/11/Zaouli.jpg",
    color: "from-slate-600 to-slate-700"
  }
];

const teamMembers = [
  {
    name: "Amélie Kouassi",
    role: "Fondatrice & Directrice Culturelle",
    roleEn: "Founder & Cultural Director",
    description: "Passionnée par la préservation des traditions ivoiriennes",
    descriptionEn: "Passionate about preserving Ivorian traditions",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b630?w=400&h=400&fit=crop",
    speciality: "Danse traditionnelle"
  },
  {
    name: "Kouamé Beugré",
    role: "Expert en Arts Traditionnels",
    roleEn: "Traditional Arts Expert",
    description: "Maître artisan spécialisé dans les masques Zaouli",
    descriptionEn: "Master craftsman specializing in Zaouli masks",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    speciality: "Artisanat"
  },
  {
    name: "Fatou Diabaté",
    role: "Coordinatrice Communauté",
    roleEn: "Community Coordinator",
    description: "Organisatrice d'événements culturels et festivals",
    descriptionEn: "Cultural events and festivals organizer",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
    speciality: "Événements"
  }
];

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-leke-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 cultural-pattern opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl sm:text-2xl font-ubuntu max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center card-cultural">
              <CardHeader>
                <div className="w-16 h-16 bg-leke-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-oswald font-bold">Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-ubuntu text-base">
                  Préserver et transmettre la richesse culturelle ivoirienne aux générations futures à travers l'art, la danse et les traditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center card-cultural">
              <CardHeader>
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-oswald font-bold">Nos Valeurs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-ubuntu text-base">
                  Authenticité, respect des traditions, inclusivité et passion pour la culture africaine dans toute sa diversité.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center card-cultural">
              <CardHeader>
                <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-oswald font-bold">Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-ubuntu text-base">
                  Devenir le pont culturel mondial qui connecte la diaspora africaine à ses racines et traditions ancestrales.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-oswald font-bold text-gray-900 mb-6">
              {t('about.timeline.title')}
            </h2>
            <div className="w-24 h-1 bg-leke-red-500 mx-auto"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-ivorian-orange-500 via-ivorian-green-500 to-ivorian-yellow-500 hidden md:block"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <Card className="card-cultural">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={event.image}
                          alt={language === 'fr' ? event.title : event.titleEn}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-70`}></div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                            <Calendar className="h-4 w-4 mr-2" />
                            {language === 'fr' ? event.year : event.yearEn}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl font-oswald font-bold">
                          {language === 'fr' ? event.title : event.titleEn}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="font-ubuntu text-base leading-relaxed">
                          {language === 'fr' ? event.description : event.descriptionEn}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-6 h-6 bg-white border-4 border-ivorian-orange-500 rounded-full shadow-lg"></div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-oswald font-bold text-gray-900 mb-6">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 font-ubuntu max-w-3xl mx-auto">
              Des passionnés de culture qui œuvrent chaque jour pour préserver et partager l'héritage ivoirien.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group card-cultural text-center">
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-ivorian-orange-500 to-ivorian-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-oswald font-bold">{member.name}</CardTitle>
                  <CardDescription className="font-ubuntu font-semibold text-ivorian-orange-600">
                    {language === 'fr' ? member.role : member.roleEn}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-ubuntu text-gray-600 mb-4">
                    {language === 'fr' ? member.description : member.descriptionEn}
                  </p>
                  <Badge variant="outline" className="border-ivorian-green-500 text-ivorian-green-600">
                    {member.speciality}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-oswald font-bold mb-6">
              Découvrez Notre Histoire
            </h2>
            <p className="text-xl font-ubuntu max-w-3xl mx-auto opacity-90">
              Une vidéo qui raconte l'évolution de la culture ivoirienne et notre engagement à la préserver.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-ivorian-orange-500 to-ivorian-green-500 rounded-xl shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="font-ubuntu text-lg opacity-90">
                  Vidéo à venir - L'histoire de Leke Culture
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-leke-red-500 p-12 rounded-2xl cultural-pattern">
            <h2 className="text-3xl sm:text-4xl font-oswald font-bold text-white mb-6">
              Rejoignez Notre Mission
            </h2>
            <p className="text-xl text-white/90 font-ubuntu mb-8 max-w-2xl mx-auto">
              Ensemble, préservons et célébrons la beauté de la culture ivoirienne pour les générations futures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-ivorian-orange-500 hover:bg-gray-100 font-ubuntu font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                Rejoindre la communauté
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-ivorian-orange-500 font-ubuntu font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                Découvrir nos événements
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
