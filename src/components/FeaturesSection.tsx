'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Palette, Users, MapPin, Calendar, Camera } from 'lucide-react';

const features = [
  {
    icon: Music,
    imageKey: 'dance',
    bgImage: 'https://landtours.com/blog/wp-content/uploads/2023/11/Zaouli.jpg',
    color: 'from-leke-red-500 to-leke-red-600'
  },
  {
    icon: Palette,
    imageKey: 'art',
    bgImage: 'https://www.wildimages-phototours.com/wp-content/uploads/2023/02/Jongleurs-girls-pair-Ivory-Coast-Inger-Vandyke.jpg',
    color: 'from-gray-600 to-gray-700'
  },
  {
    icon: Users,
    imageKey: 'music',
    bgImage: 'https://www.wildimages-phototours.com/wp-content/uploads/2021/10/Boloye-Dancer-3-Ivory-Coast-Inger-Vandyke.jpg',
    color: 'from-slate-600 to-slate-700'
  }
];

const additionalFeatures = [
  {
    icon: MapPin,
    title: 'Tour Virtuel 3D',
    description: 'Explorez les sites culturels ivoiriens en réalité virtuelle',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Calendar,
    title: 'Événements Live',
    description: 'Participez à nos événements culturels en direct',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Camera,
    title: 'Galerie Communautaire',
    description: 'Partagez vos photos et histoires culturelles',
    color: 'from-pink-500 to-pink-600'
  }
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-oswald font-bold text-gray-900 mb-6">
            {t('home.features.title')}
          </h2>
          <div className="w-24 h-1 bg-leke-red-500 mx-auto mb-8"></div>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group overflow-hidden card-cultural">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={feature.bgImage}
                    alt={t(`home.features.${feature.imageKey}.title`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-70`}></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-oswald font-bold text-gray-900">
                    {t(`home.features.${feature.imageKey}.title`)}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-ubuntu">
                    {t(`home.features.${feature.imageKey}.description`)}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-leke-red-500 hover:text-white transition-all duration-300"
                  >
                    En savoir plus
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-oswald font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-ubuntu">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block bg-leke-red-500 p-8 rounded-2xl cultural-pattern">
            <h3 className="text-2xl font-oswald font-bold text-white mb-4">
              Prêt à découvrir la culture ivoirienne ?
            </h3>
            <p className="text-white/90 font-ubuntu mb-6 max-w-md mx-auto">
              Rejoignez notre communauté et plongez dans un univers culturel riche et authentique.
            </p>
            <Button
              size="lg"
              className="bg-white text-leke-red-500 hover:bg-gray-100 font-ubuntu font-semibold"
            >
              {t('hero.join')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
