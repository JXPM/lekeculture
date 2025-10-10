'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search, MapPin, Heart, Share2, Eye } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tous', nameEn: 'All', color: 'bg-gray-500' },
  { id: 'dance', name: 'Danse', nameEn: 'Dance', color: 'bg-leke-red-500' },
  { id: 'art', name: 'Art', nameEn: 'Art', color: 'bg-gray-600' },
  { id: 'music', name: 'Musique', nameEn: 'Music', color: 'bg-slate-600' },
  { id: 'history', name: 'Histoire', nameEn: 'History', color: 'bg-purple-500' },
  { id: 'crafts', name: 'Artisanat', nameEn: 'Crafts', color: 'bg-blue-500' }
];

const articles = [
  {
    id: 1,
    title: "La Danse Zaouli : Symbole de Beauté Féminine",
    titleEn: "Zaouli Dance: Symbol of Feminine Beauty",
    excerpt: "Découvrez l'histoire fascinante de la danse Zaouli, performance hypnotique qui célèbre la grâce et la beauté des femmes Guro.",
    excerptEn: "Discover the fascinating history of Zaouli dance, a hypnotic performance celebrating the grace and beauty of Guro women.",
    category: 'dance',
    author: "Amélie Kouassi",
    date: "2024-01-15",
    readTime: "5 min",
    image: "https://landtours.com/blog/wp-content/uploads/2023/11/Zaouli.jpg",
    likes: 42,
    views: 1250,
    featured: true
  },
  {
    id: 2,
    title: "L'Art du Masque en Côte d'Ivoire",
    titleEn: "The Art of Masks in Côte d'Ivoire",
    excerpt: "Exploration des techniques traditionnelles de fabrication des masques sacrés et leur signification spirituelle dans la culture ivoirienne.",
    excerptEn: "Exploration of traditional techniques for making sacred masks and their spiritual significance in Ivorian culture.",
    category: 'art',
    author: "Kouamé Beugré",
    date: "2024-01-10",
    readTime: "7 min",
    image: "https://www.wildimages-phototours.com/wp-content/uploads/2023/02/Jongleurs-girls-pair-Ivory-Coast-Inger-Vandyke.jpg",
    likes: 38,
    views: 890,
    featured: false
  },
  {
    id: 3,
    title: "Rythmes Traditionnels : Les Instruments de Musique Ivoiriens",
    titleEn: "Traditional Rhythms: Ivorian Musical Instruments",
    excerpt: "Plongée dans l'univers sonore de la Côte d'Ivoire à travers ses instruments traditionnels et leurs rôles dans les cérémonies.",
    excerptEn: "Dive into the sound universe of Côte d'Ivoire through its traditional instruments and their roles in ceremonies.",
    category: 'music',
    author: "Fatou Diabaté",
    date: "2024-01-08",
    readTime: "6 min",
    image: "https://www.wildimages-phototours.com/wp-content/uploads/2021/10/Boloye-Dancer-3-Ivory-Coast-Inger-Vandyke.jpg",
    likes: 29,
    views: 650,
    featured: false
  },
  {
    id: 4,
    title: "Histoire des Royaumes Akan de Côte d'Ivoire",
    titleEn: "History of Akan Kingdoms of Côte d'Ivoire",
    excerpt: "Retour sur l'époque glorieuse des royaumes Akan et leur influence sur la culture contemporaine ivoirienne.",
    excerptEn: "Looking back at the glorious era of Akan kingdoms and their influence on contemporary Ivorian culture.",
    category: 'history',
    author: "Dr. Koffi Asante",
    date: "2024-01-05",
    readTime: "10 min",
    image: "https://i0.wp.com/franceleclerc.com/wp-content/uploads/2022/07/CIMasks-1-of-25.jpg",
    likes: 51,
    views: 1420,
    featured: true
  },
  {
    id: 5,
    title: "Textile Traditionnel : L'Art du Kente Ivoirien",
    titleEn: "Traditional Textile: The Art of Ivorian Kente",
    excerpt: "Découverte des techniques ancestrales de tissage du Kente et la symbolique de ses motifs colorés.",
    excerptEn: "Discovery of ancestral Kente weaving techniques and the symbolism of its colorful patterns.",
    category: 'crafts',
    author: "Marie Adjoua",
    date: "2024-01-03",
    readTime: "8 min",
    image: "https://i0.wp.com/franceleclerc.com/wp-content/uploads/2022/07/CIMasks-2-of-25.jpg",
    likes: 33,
    views: 780,
    featured: false
  },
  {
    id: 6,
    title: "Festivals Culturels : Le Carnaval de Bouaké",
    titleEn: "Cultural Festivals: Bouaké Carnival",
    excerpt: "Immersion dans l'atmosphère festive du carnaval de Bouaké, célébration annuelle de la diversité culturelle ivoirienne.",
    excerptEn: "Immersion in the festive atmosphere of Bouaké carnival, annual celebration of Ivorian cultural diversity.",
    category: 'dance',
    author: "Yves Kouakou",
    date: "2024-01-01",
    readTime: "4 min",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Cizaouli.jpg",
    likes: 67,
    views: 1890,
    featured: true
  }
];

const regions = [
  {
    name: "Abidjan",
    description: "Centre économique et culturel",
    speciality: "Art contemporain et traditions urbaines",
    x: "45%",
    y: "75%"
  },
  {
    name: "Bouaké",
    description: "Capitale culturelle du centre",
    speciality: "Carnaval et danse traditionnelle",
    x: "55%",
    y: "45%"
  },
  {
    name: "Man",
    description: "Région des masques",
    speciality: "Art traditionnel et masques sacrés",
    x: "25%",
    y: "50%"
  },
  {
    name: "Korhogo",
    description: "Terre des arts",
    speciality: "Textile et artisanat",
    x: "60%",
    y: "25%"
  }
];

export default function InsightsPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-leke-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 cultural-pattern opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold mb-6">
            {t('home.insights')}
          </h1>
          <p className="text-xl sm:text-2xl font-ubuntu max-w-3xl mx-auto leading-relaxed">
            {t('home.insightsDesc')}
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 font-ubuntu"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`font-ubuntu ${selectedCategory === category.id ? category.color : ''}`}
                >
                  {language === 'fr' ? category.name : category.nameEn}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-oswald font-bold text-gray-900 mb-8">Articles en vedette</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredArticles.map((article) => (
                    <Card key={article.id} className="group card-cultural">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={article.image}
                          alt={language === 'fr' ? article.title : article.titleEn}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge className={`${categories.find(c => c.id === article.category)?.color} text-white border-none`}>
                            {language === 'fr' ? categories.find(c => c.id === article.category)?.name : categories.find(c => c.id === article.category)?.nameEn}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                          <div className="flex items-center space-x-1 text-white text-sm">
                            <Heart className="h-4 w-4" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-white text-sm">
                            <Eye className="h-4 w-4" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl font-oswald font-bold group-hover:text-ivorian-orange-500 transition-colors">
                          {language === 'fr' ? article.title : article.titleEn}
                        </CardTitle>
                        <CardDescription className="font-ubuntu text-gray-600">
                          {language === 'fr' ? article.excerpt : article.excerptEn}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500 font-ubuntu">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Articles */}
            <div>
              <h2 className="text-3xl font-oswald font-bold text-gray-900 mb-8">Tous les articles</h2>
              <div className="space-y-6">
                {regularArticles.map((article) => (
                  <Card key={article.id} className="group card-cultural">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-l-lg">
                        <img
                          src={article.image}
                          alt={language === 'fr' ? article.title : article.titleEn}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${categories.find(c => c.id === article.category)?.color} text-white border-none`}>
                            {language === 'fr' ? categories.find(c => c.id === article.category)?.name : categories.find(c => c.id === article.category)?.nameEn}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-xl font-oswald font-bold group-hover:text-ivorian-orange-500 transition-colors">
                            {language === 'fr' ? article.title : article.titleEn}
                          </CardTitle>
                          <CardDescription className="font-ubuntu text-gray-600">
                            {language === 'fr' ? article.excerpt : article.excerptEn}
                          </CardDescription>
                        </CardHeader>
                        <div className="flex items-center justify-between text-sm text-gray-500 font-ubuntu">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{article.likes}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Interactive Map */}
            <Card className="mb-8 card-cultural">
              <CardHeader>
                <CardTitle className="text-xl font-oswald font-bold flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-ivorian-orange-500" />
                  Carte Culturelle de Côte d'Ivoire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-ivorian-green-100 to-ivorian-orange-100 rounded-lg p-6 h-80">
                  {/* Simplified Côte d'Ivoire shape */}
                  <div className="relative w-full h-full bg-ivorian-green-200 rounded-lg overflow-hidden">
                    {regions.map((region, index) => (
                      <div
                        key={index}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                          selectedRegion === region.name ? 'scale-110' : 'hover:scale-105'
                        }`}
                        style={{ left: region.x, top: region.y }}
                        onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                      >
                        <div className="w-4 h-4 bg-ivorian-orange-500 rounded-full shadow-lg"></div>
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-max z-10">
                          <p className="font-ubuntu font-semibold text-sm">{region.name}</p>
                          {selectedRegion === region.name && (
                            <div className="mt-2 text-xs text-gray-600">
                              <p>{region.description}</p>
                              <p className="font-semibold text-ivorian-orange-600 mt-1">{region.speciality}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-ubuntu mt-4">
                  Cliquez sur les points pour découvrir les spécialités culturelles de chaque région.
                </p>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card className="card-cultural">
              <CardHeader>
                <CardTitle className="text-xl font-oswald font-bold">Articles populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.slice(0, 4).map((article, index) => (
                    <div key={article.id} className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={article.image}
                          alt={language === 'fr' ? article.title : article.titleEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-ubuntu font-semibold text-sm line-clamp-2">
                          {language === 'fr' ? article.title : article.titleEn}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
