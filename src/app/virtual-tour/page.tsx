'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Volume2,
  VolumeX,
  Navigation,
  MapPin,
  Clock,
  Users,
  Info,
  ArrowLeft,
  ArrowRight,
  Camera
} from 'lucide-react';

interface VirtualSite {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  location: string;
  image360: string;
  duration: string;
  visitorsCount: number;
  category: 'historical' | 'cultural' | 'artistic' | 'natural';
}

const virtualSites: VirtualSite[] = [
  {
    id: 'basilique',
    name: 'Basilique Notre-Dame de la Paix',
    nameEn: 'Basilica of Our Lady of Peace',
    description: 'La plus grande basilique du monde, symbole architectural de la Côte d\'Ivoire moderne.',
    descriptionEn: 'The largest basilica in the world, architectural symbol of modern Côte d\'Ivoire.',
    location: 'Yamoussoukro, Côte d\'Ivoire',
    image360: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=2048&h=1024&fit=crop',
    duration: '15 min',
    visitorsCount: 25430,
    category: 'historical'
  },
  {
    id: 'musee',
    name: 'Musée des Civilisations',
    nameEn: 'Museum of Civilizations',
    description: 'Voyage à travers les traditions et l\'histoire des peuples ivoiriens.',
    descriptionEn: 'Journey through the traditions and history of Ivorian peoples.',
    location: 'Abidjan, Côte d\'Ivoire',
    image360: 'https://images.unsplash.com/photo-1554072675-66db59dba46f?w=2048&h=1024&fit=crop',
    duration: '20 min',
    visitorsCount: 18790,
    category: 'cultural'
  },
  {
    id: 'parc-banco',
    name: 'Parc National du Banco',
    nameEn: 'Banco National Park',
    description: 'Forêt tropicale au cœur d\'Abidjan, poumon vert de la ville.',
    descriptionEn: 'Tropical forest in the heart of Abidjan, the city\'s green lung.',
    location: 'Abidjan, Côte d\'Ivoire',
    image360: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2048&h=1024&fit=crop',
    duration: '12 min',
    visitorsCount: 12350,
    category: 'natural'
  }
];

export default function VirtualTourPage() {
  const { t, language } = useLanguage();
  const [currentSiteIndex, setCurrentSiteIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  const currentSite = virtualSites[currentSiteIndex];

  const changeSite = (index: number) => {
    if (index >= 0 && index < virtualSites.length) {
      setCurrentSiteIndex(index);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historical': return '🏛️';
      case 'cultural': return '🎭';
      case 'artistic': return '🎨';
      case 'natural': return '🌿';
      default: return '📍';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'historical': return 'bg-blue-500';
      case 'cultural': return 'bg-leke-red-500';
      case 'artistic': return 'bg-purple-500';
      case 'natural': return 'bg-gray-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-leke-red-500 overflow-hidden">
        <div className="absolute inset-0 cultural-pattern opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold mb-6">
            Tour Virtuel 3D
          </h1>
          <p className="text-xl sm:text-2xl font-ubuntu max-w-3xl mx-auto leading-relaxed">
            Explorez les merveilles culturelles de la Côte d'Ivoire en immersion totale
          </p>
        </div>
      </section>

      {/* Virtual Tour Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sites Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-oswald font-bold flex items-center">
                  <Navigation className="h-5 w-5 mr-2 text-leke-red-400" />
                  Sites Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {virtualSites.map((site, index) => (
                    <button
                      key={site.id}
                      onClick={() => changeSite(index)}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                        index === currentSiteIndex
                          ? 'bg-leke-red-500 text-white'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getCategoryIcon(site.category)}</span>
                        <div className="flex-1">
                          <h3 className="font-ubuntu font-semibold text-sm">
                            {language === 'fr' ? site.name : site.nameEn}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`${getCategoryColor(site.category)} text-white text-xs`}>
                              {site.duration}
                            </Badge>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <Users className="h-3 w-3" />
                              <span>{site.visitorsCount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Site Info */}
            <Card className="bg-gray-800 border-gray-700 text-white mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-oswald font-bold flex items-center">
                  <Info className="h-5 w-5 mr-2 text-leke-green-400" />
                  Informations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-ubuntu font-semibold mb-2">
                      {language === 'fr' ? currentSite.name : currentSite.nameEn}
                    </h3>
                    <p className="text-sm text-gray-300 font-ubuntu">
                      {language === 'fr' ? currentSite.description : currentSite.descriptionEn}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{currentSite.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Durée: {currentSite.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="relative">
                {/* 3D Canvas Placeholder */}
                <div className="relative bg-black">
                  <div className="w-full h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-leke-red-400 mx-auto mb-4" />
                      <h3 className="text-xl font-oswald font-bold text-white mb-2">
                        Expérience 3D Interactive
                      </h3>
                      <p className="text-gray-300 font-ubuntu">
                        Découvrez {language === 'fr' ? currentSite.name : currentSite.nameEn} en immersion totale
                      </p>
                      <div className="mt-6">
                        <img
                          src={currentSite.image360}
                          alt={language === 'fr' ? currentSite.name : currentSite.nameEn}
                          className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-black/50 border-white/30 text-white hover:bg-black/70"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`bg-black/50 border-white/30 text-white hover:bg-black/70 ${
                        autoRotate ? 'bg-leke-red-500/20' : ''
                      }`}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className="bg-black/50 border-white/30 text-white hover:bg-black/70"
                    >
                      {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/50 border-white/30 text-white hover:bg-black/70"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>

                {/* Site Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changeSite(currentSiteIndex - 1)}
                    disabled={currentSiteIndex === 0}
                    className="bg-black/50 border-white/30 text-white hover:bg-black/70 disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>

                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                    <span className="text-white font-ubuntu text-sm">
                      {currentSiteIndex + 1} / {virtualSites.length}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changeSite(currentSiteIndex + 1)}
                    disabled={currentSiteIndex === virtualSites.length - 1}
                    className="bg-black/50 border-white/30 text-white hover:bg-black/70 disabled:opacity-50"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/30 max-w-xs">
                  <p className="text-white text-xs font-ubuntu">
                    <strong>Navigation:</strong><br />
                    • Utilisez les contrôles pour l'expérience<br />
                    • Parcourez les sites avec les flèches<br />
                    • Mode plein écran disponible
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sites Grid */}
        <section className="mt-16">
          <h2 className="text-3xl font-oswald font-bold text-white mb-8 text-center">
            Tous les Sites Virtuels
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {virtualSites.map((site, index) => (
              <Card
                key={site.id}
                className={`bg-gray-800 border-gray-700 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  index === currentSiteIndex ? 'ring-2 ring-leke-red-500' : ''
                }`}
                onClick={() => changeSite(index)}
              >
                <div className="relative h-40 overflow-hidden rounded-t-lg">
                  <img
                    src={site.image360}
                    alt={language === 'fr' ? site.name : site.nameEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-2xl">{getCategoryIcon(site.category)}</span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className={`${getCategoryColor(site.category)} text-white`}>
                      {site.duration}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-oswald font-bold text-white">
                    {language === 'fr' ? site.name : site.nameEn}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{site.location}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{site.visitorsCount.toLocaleString()}</span>
                    </div>
                    <span>Vue 360°</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-oswald font-bold text-white mb-8">
            Fonctionnalités du Tour Virtuel
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Camera, title: 'Images 360°', desc: 'Vue panoramique complète' },
              { icon: Volume2, title: 'Guide Audio', desc: 'Narration professionnelle' },
              { icon: Info, title: 'Informations', desc: 'Détails historiques' },
              { icon: Users, title: 'Communauté', desc: 'Partage d\'expériences' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gray-800 border-gray-700 text-white text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-leke-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-oswald font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 font-ubuntu text-sm">{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
