'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const heroImages = [
  {
    src: 'https://landtours.com/blog/wp-content/uploads/2023/11/Zaouli.jpg',
    alt: 'Danse Zaouli traditionnelle',
    caption: 'La danse Zaouli, symbole de beauté et de grâce'
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Cizaouli.jpg',
    alt: 'Festival de masques en Côte d\'Ivoire',
    caption: 'Festivals culturels ivoiriens'
  },
  {
    src: 'https://www.wildimages-phototours.com/wp-content/uploads/2023/02/Jongleurs-girls-pair-Ivory-Coast-Inger-Vandyke.jpg',
    alt: 'Artisans traditionnels ivoiriens',
    caption: 'L\'artisanat traditionnel ivoirien'
  },
  {
    src: 'https://i0.wp.com/franceleclerc.com/wp-content/uploads/2022/07/CIMasks-1-of-25.jpg',
    alt: 'Célébration des masques',
    caption: 'Célébrations et traditions ancestrales'
  }
];

export function HeroSection() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const currentImage = heroImages[currentImageIndex];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={prevImage}
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={nextImage}
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-oswald font-bold mb-6 animate-fade-in">
          {t('hero.title')}
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl font-ubuntu font-light mb-8 animate-slide-up">
          {t('hero.subtitle')}
        </p>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed opacity-90 animate-slide-up">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Button
            size="lg"
            className="btn-primary text-lg px-8 py-3 font-ubuntu font-medium"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.explore')}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 font-ubuntu font-medium bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={() => {
              window.location.href = '/community';
            }}
          >
            {t('hero.join')}
          </Button>
        </div>
      </div>

      {/* Image Caption */}
      <div className="absolute bottom-16 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
        <p className="text-white text-sm font-ubuntu">
          {currentImage.caption}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
