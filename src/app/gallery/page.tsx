'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Search,
  Camera,
  MapPin,
  Calendar,
  User,
  X,
  Download,
  Flag,
  Award,
  Eye,
  Grid3X3,
  List
} from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  author: string;
  location: string;
  locationEn: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  views: number;
  featured: boolean;
  verified: boolean;
  tags: string[];
}

const photoCategories = [
  { id: 'all', name: 'Toutes', nameEn: 'All', color: 'bg-gray-500' },
  { id: 'dance', name: 'Danse', nameEn: 'Dance', color: 'bg-leke-red-500' },
  { id: 'masks', name: 'Masques', nameEn: 'Masks', color: 'bg-gray-600' },
  { id: 'festivals', name: 'Festivals', nameEn: 'Festivals', color: 'bg-slate-600' },
  { id: 'crafts', name: 'Artisanat', nameEn: 'Crafts', color: 'bg-purple-500' },
  { id: 'landscapes', name: 'Paysages', nameEn: 'Landscapes', color: 'bg-blue-500' },
  { id: 'people', name: 'Portraits', nameEn: 'Portraits', color: 'bg-pink-500' }
];

const galleryPhotos: Photo[] = [
  {
    id: 1,
    src: 'https://landtours.com/blog/wp-content/uploads/2023/11/Zaouli.jpg',
    title: 'Danseur Zaouli en Action',
    titleEn: 'Zaouli Dancer in Action',
    description: 'Performance hypnotique de danse Zaouli lors du festival de Bouaké',
    descriptionEn: 'Hypnotic Zaouli dance performance during Bouaké festival',
    author: 'Marie Koné',
    location: 'Bouaké, Côte d\'Ivoire',
    locationEn: 'Bouaké, Côte d\'Ivoire',
    date: '2024-01-20',
    category: 'dance',
    likes: 89,
    comments: 23,
    views: 1540,
    featured: true,
    verified: true,
    tags: ['zaouli', 'traditionnel', 'festival', 'bouaké']
  },
  {
    id: 2,
    src: 'https://www.wildimages-phototours.com/wp-content/uploads/2023/02/Jongleurs-girls-pair-Ivory-Coast-Inger-Vandyke.jpg',
    title: 'Artisans Masquées Traditionnelles',
    titleEn: 'Traditional Masked Artisans',
    description: 'Deux artisanes portant des masques traditionnels lors d\'une cérémonie',
    descriptionEn: 'Two craftswomen wearing traditional masks during a ceremony',
    author: 'Kouamé Asante',
    location: 'Man, Côte d\'Ivoire',
    locationEn: 'Man, Côte d\'Ivoire',
    date: '2024-01-18',
    category: 'masks',
    likes: 67,
    comments: 15,
    views: 980,
    featured: true,
    verified: true,
    tags: ['masques', 'artisanat', 'tradition', 'man']
  },
  {
    id: 3,
    src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Cizaouli.jpg',
    title: 'Festival des Masques National',
    titleEn: 'National Mask Festival',
    description: 'Célébration colorée du patrimoine culturel ivoirien',
    descriptionEn: 'Colorful celebration of Ivorian cultural heritage',
    author: 'Fatou Diabaté',
    location: 'Abidjan, Côte d\'Ivoire',
    locationEn: 'Abidjan, Côte d\'Ivoire',
    date: '2024-01-15',
    category: 'festivals',
    likes: 125,
    comments: 34,
    views: 2100,
    featured: true,
    verified: true,
    tags: ['festival', 'masques', 'abidjan', 'national']
  },
  {
    id: 4,
    src: 'https://www.wildimages-phototours.com/wp-content/uploads/2021/10/Boloye-Dancer-3-Ivory-Coast-Inger-Vandyke.jpg',
    title: 'Danse Traditionnelle Boloye',
    titleEn: 'Traditional Boloye Dance',
    description: 'Performance énergique de la danse Boloye en costume traditionnel',
    descriptionEn: 'Energetic Boloye dance performance in traditional costume',
    author: 'Yves Kouakou',
    location: 'Korhogo, Côte d\'Ivoire',
    locationEn: 'Korhogo, Côte d\'Ivoire',
    date: '2024-01-12',
    category: 'dance',
    likes: 56,
    comments: 12,
    views: 750,
    featured: false,
    verified: true,
    tags: ['boloye', 'danse', 'korhogo', 'traditionnel']
  },
  {
    id: 5,
    src: 'https://i0.wp.com/franceleclerc.com/wp-content/uploads/2022/07/CIMasks-1-of-25.jpg',
    title: 'Masque Sacré en Performance',
    titleEn: 'Sacred Mask in Performance',
    description: 'Rituel traditionnel avec masque sacré dans un village',
    descriptionEn: 'Traditional ritual with sacred mask in a village',
    author: 'Adjoua Brou',
    location: 'Daloa, Côte d\'Ivoire',
    locationEn: 'Daloa, Côte d\'Ivoire',
    date: '2024-01-10',
    category: 'masks',
    likes: 78,
    comments: 19,
    views: 1200,
    featured: false,
    verified: true,
    tags: ['masque', 'sacré', 'rituel', 'daloa']
  },
  {
    id: 6,
    src: 'https://i0.wp.com/franceleclerc.com/wp-content/uploads/2022/07/CIMasks-2-of-25.jpg',
    title: 'Festival Coloré des Traditions',
    titleEn: 'Colorful Festival of Traditions',
    description: 'Rassemblement communautaire célébrant les traditions ancestrales',
    descriptionEn: 'Community gathering celebrating ancestral traditions',
    author: 'Koffi Mensah',
    location: 'Yamoussoukro, Côte d\'Ivoire',
    locationEn: 'Yamoussoukro, Côte d\'Ivoire',
    date: '2024-01-08',
    category: 'festivals',
    likes: 92,
    comments: 26,
    views: 1650,
    featured: false,
    verified: true,
    tags: ['festival', 'traditions', 'yamoussoukro', 'communauté']
  }
];

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    location: '',
    category: 'dance',
    tags: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPhotos = galleryPhotos.filter(photo => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPhotos = filteredPhotos.filter(photo => photo.featured);
  const regularPhotos = filteredPhotos.filter(photo => !photo.featured);

  const handleLike = (photoId: number) => {
    if (likedPhotos.includes(photoId)) {
      setLikedPhotos(likedPhotos.filter(id => id !== photoId));
    } else {
      setLikedPhotos([...likedPhotos, photoId]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadModalOpen(true);
      // In a real app, you would upload the file here
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload
    console.log('Upload submitted:', uploadForm);
    setUploadModalOpen(false);
    setUploadForm({ title: '', description: '', location: '', category: 'dance', tags: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-leke-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 cultural-pattern opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold mb-6">
            Galerie Culturelle Interactive
          </h1>
          <p className="text-xl sm:text-2xl font-ubuntu max-w-3xl mx-auto leading-relaxed mb-8">
            Partagez et découvrez la beauté de la culture ivoirienne à travers les yeux de notre communauté
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleUploadClick}
              size="lg"
              className="bg-white text-ivorian-orange-500 hover:bg-gray-100 font-ubuntu font-semibold text-lg px-8 py-3"
            >
              <Upload className="h-5 w-5 mr-2" />
              Partager une Photo
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 font-ubuntu font-semibold text-lg px-8 py-3"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Camera className="h-5 w-5 mr-2" />
              Explorer la Galerie
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher par titre, lieu, tags..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 font-ubuntu"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {photoCategories.map((category) => (
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
      </section>

      {/* Gallery Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Photos */}
          {featuredPhotos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-oswald font-bold text-gray-900 mb-8 flex items-center">
                <Award className="h-8 w-8 mr-3 text-ivorian-orange-500" />
                Photos en vedette
              </h2>

              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {featuredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    language={language}
                    isLiked={likedPhotos.includes(photo.id)}
                    onLike={() => handleLike(photo.id)}
                    onClick={() => setSelectedPhoto(photo)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Photos */}
          <div>
            <h2 className="text-3xl font-oswald font-bold text-gray-900 mb-8">
              Toutes les photos ({filteredPhotos.length})
            </h2>

            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
              {regularPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  language={language}
                  isLiked={likedPhotos.includes(photo.id)}
                  onLike={() => handleLike(photo.id)}
                  onClick={() => setSelectedPhoto(photo)}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          language={language}
          isLiked={likedPhotos.includes(selectedPhoto.id)}
          onLike={() => handleLike(selectedPhoto.id)}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <UploadModal
          uploadForm={uploadForm}
          setUploadForm={setUploadForm}
          onSubmit={handleUploadSubmit}
          onClose={() => setUploadModalOpen(false)}
        />
      )}
    </div>
  );
}

// Photo Card Component
interface PhotoCardProps {
  photo: Photo;
  language: string;
  isLiked: boolean;
  onLike: () => void;
  onClick: () => void;
  viewMode: 'grid' | 'list';
}

function PhotoCard({ photo, language, isLiked, onLike, onClick, viewMode }: PhotoCardProps) {
  if (viewMode === 'list') {
    return (
      <Card className="card-cultural overflow-hidden cursor-pointer group" onClick={onClick}>
        <div className="flex">
          <div className="relative w-48 h-32 flex-shrink-0">
            <img
              src={photo.src}
              alt={language === 'fr' ? photo.title : photo.titleEn}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {photo.featured && (
              <Badge className="absolute top-2 left-2 bg-ivorian-orange-500 text-white">
                <Award className="h-3 w-3 mr-1" />
                Vedette
              </Badge>
            )}
          </div>

          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-oswald font-bold text-lg group-hover:text-ivorian-orange-500 transition-colors">
                {language === 'fr' ? photo.title : photo.titleEn}
              </h3>
              {photo.verified && (
                <Badge variant="outline" className="border-green-500 text-green-600 ml-2">
                  ✓ Vérifié
                </Badge>
              )}
            </div>

            <p className="text-gray-600 font-ubuntu text-sm mb-3 line-clamp-2">
              {language === 'fr' ? photo.description : photo.descriptionEn}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 font-ubuntu">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{photo.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{language === 'fr' ? photo.location : photo.locationEn}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike();
                  }}
                  className={`flex items-center space-x-1 transition-colors ${
                    isLiked ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{photo.likes + (isLiked ? 1 : 0)}</span>
                </button>

                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{photo.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="card-cultural overflow-hidden cursor-pointer group" onClick={onClick}>
      <div className="relative h-64 overflow-hidden">
        <img
          src={photo.src}
          alt={language === 'fr' ? photo.title : photo.titleEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {photo.featured && (
          <Badge className="absolute top-3 left-3 bg-ivorian-orange-500 text-white">
            <Award className="h-3 w-3 mr-1" />
            Vedette
          </Badge>
        )}

        {photo.verified && (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
            ✓
          </Badge>
        )}

        <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLike();
                }}
                className={`flex items-center space-x-1 transition-colors ${
                  isLiked ? 'text-red-400' : 'hover:text-red-400'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{photo.likes + (isLiked ? 1 : 0)}</span>
              </button>

              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{photo.comments}</span>
              </div>

              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{photo.views}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle share
              }}
              className="hover:text-ivorian-orange-400 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-oswald font-bold group-hover:text-ivorian-orange-500 transition-colors line-clamp-1">
          {language === 'fr' ? photo.title : photo.titleEn}
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm text-gray-500 font-ubuntu">
          <User className="h-4 w-4" />
          <span>{photo.author}</span>
          <span>•</span>
          <MapPin className="h-4 w-4" />
          <span className="truncate">{language === 'fr' ? photo.location : photo.locationEn}</span>
        </div>
      </CardHeader>
    </Card>
  );
}

// Photo Modal Component
interface PhotoModalProps {
  photo: Photo;
  language: string;
  isLiked: boolean;
  onLike: () => void;
  onClose: () => void;
}

function PhotoModal({ photo, language, isLiked, onLike, onClose }: PhotoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex">
          {/* Image */}
          <div className="flex-1 relative">
            <img
              src={photo.src}
              alt={language === 'fr' ? photo.title : photo.titleEn}
              className="w-full h-[60vh] object-cover"
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Details */}
          <div className="w-80 p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-oswald font-bold">
                {language === 'fr' ? photo.title : photo.titleEn}
              </h2>
              {photo.verified && (
                <Badge className="bg-green-500 text-white">✓ Vérifié</Badge>
              )}
            </div>

            <p className="text-gray-600 font-ubuntu mb-4">
              {language === 'fr' ? photo.description : photo.descriptionEn}
            </p>

            <div className="space-y-3 text-sm text-gray-500 font-ubuntu mb-6">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{photo.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{language === 'fr' ? photo.location : photo.locationEn}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(photo.date).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {photo.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between py-4 border-t">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-50 text-red-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{photo.likes + (isLiked ? 1 : 0)}</span>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span>{photo.comments}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>

                <Button variant="outline" size="sm">
                  <Flag className="h-4 w-4 mr-2" />
                  Signaler
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Upload Modal Component
interface UploadModalProps {
  uploadForm: any;
  setUploadForm: (form: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

function UploadModal({ uploadForm, setUploadForm, onSubmit, onClose }: UploadModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-oswald font-bold">Partager une photo</CardTitle>
            <button onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <CardDescription>
            Partagez un moment culturel avec la communauté
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre *</label>
              <Input
                value={uploadForm.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUploadForm({...uploadForm, title: e.target.value})
                }
                placeholder="Titre de votre photo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Input
                value={uploadForm.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUploadForm({...uploadForm, description: e.target.value})
                }
                placeholder="Décrivez votre photo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lieu</label>
              <Input
                value={uploadForm.location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUploadForm({...uploadForm, location: e.target.value})
                }
                placeholder="Où cette photo a-t-elle été prise ?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Catégorie *</label>
              <select
                value={uploadForm.category}
                onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              >
                {photoCategories.filter(cat => cat.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <Input
                value={uploadForm.tags}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUploadForm({...uploadForm, tags: e.target.value})
                }
                placeholder="tradition, festival, art (séparés par des virgules)"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" className="flex-1 btn-primary">
                Publier
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
