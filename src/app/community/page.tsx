'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  Gift,
  Video,
  Bell
} from 'lucide-react';
import { NotificationSettings } from '@/components/NotificationSettings';

const upcomingEvents = [
  {
    id: 1,
    title: "Atelier Danse Zaouli",
    titleEn: "Zaouli Dance Workshop",
    date: "2024-02-15",
    time: "14:00",
    location: "Centre Culturel Abidjan",
    locationEn: "Abidjan Cultural Center",
    description: "Apprenez les mouvements gracieux de la danse Zaouli avec un maître danseur traditionnel.",
    descriptionEn: "Learn the graceful movements of Zaouli dance with a traditional master dancer.",
    category: "Atelier",
    categoryEn: "Workshop",
    price: "Gratuit",
    priceEn: "Free",
    attendees: 45,
    maxAttendees: 60,
    featured: true
  },
  {
    id: 2,
    title: "Festival des Masques",
    titleEn: "Festival of Masks",
    date: "2024-02-22",
    time: "16:00",
    location: "Place de la République",
    locationEn: "Republic Square",
    description: "Célébration des traditions masquées de Côte d'Ivoire avec défilés et performances.",
    descriptionEn: "Celebration of Côte d'Ivoire's masked traditions with parades and performances.",
    category: "Festival",
    categoryEn: "Festival",
    price: "5000 FCFA",
    priceEn: "5000 FCFA",
    attendees: 120,
    maxAttendees: 200,
    featured: true
  },
  {
    id: 3,
    title: "Conférence: Histoire des Royaumes Akan",
    titleEn: "Conference: History of Akan Kingdoms",
    date: "2024-03-01",
    time: "18:30",
    location: "Université Félix Houphouët-Boigny",
    locationEn: "Félix Houphouët-Boigny University",
    description: "Plongée dans l'histoire fascinante des royaumes Akan de Côte d'Ivoire.",
    descriptionEn: "Dive into the fascinating history of Akan kingdoms of Côte d'Ivoire.",
    category: "Conférence",
    categoryEn: "Conference",
    price: "Gratuit",
    priceEn: "Free",
    attendees: 25,
    maxAttendees: 100,
    featured: false
  }
];

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "Discussions Exclusives",
    titleEn: "Exclusive Discussions",
    description: "Échangez avec des passionnés de culture ivoirienne",
    descriptionEn: "Exchange with Ivorian culture enthusiasts",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Video,
    title: "Live Q&A",
    titleEn: "Live Q&A",
    description: "Sessions en direct avec nos experts culturels",
    descriptionEn: "Live sessions with our cultural experts",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Gift,
    title: "Contenu Premium",
    titleEn: "Premium Content",
    description: "Accès à des articles et vidéos exclusifs",
    descriptionEn: "Access to exclusive articles and videos",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Star,
    title: "Événements Prioritaires",
    titleEn: "Priority Events",
    description: "Invitations en avant-première aux événements",
    descriptionEn: "Early invitations to events",
    color: "from-yellow-500 to-yellow-600"
  }
];

export default function CommunityPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'join' | 'notifications'>('join');
  const [whatsappForm, setWhatsappForm] = useState({
    name: '',
    email: '',
    phone: '',
    interests: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [rsvpEvents, setRsvpEvents] = useState<number[]>([]);

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');

      // Reset form
      setWhatsappForm({ name: '', email: '', phone: '', interests: '' });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const handleRSVP = (eventId: number) => {
    if (rsvpEvents.includes(eventId)) {
      setRsvpEvents(rsvpEvents.filter(id => id !== eventId));
    } else {
      setRsvpEvents([...rsvpEvents, eventId]);
    }
  };

  const featuredEvents = upcomingEvents.filter(event => event.featured);
  const regularEvents = upcomingEvents.filter(event => !event.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-leke-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 cultural-pattern opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold mb-6">
            {t('community.title')}
          </h1>
          <p className="text-xl sm:text-2xl font-ubuntu max-w-3xl mx-auto leading-relaxed">
            Connectez-vous avec une communauté passionnée par la culture ivoirienne
          </p>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-oswald font-bold text-gray-900 mb-6">
              Pourquoi rejoindre notre communauté ?
            </h2>
            <div className="w-24 h-1 bg-leke-red-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {communityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center card-cultural group">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-oswald font-bold">
                      {language === 'fr' ? feature.title : feature.titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-ubuntu">
                      {language === 'fr' ? feature.description : feature.descriptionEn}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
            <button
              onClick={() => setActiveTab('join')}
              className={`px-6 py-3 rounded-md font-ubuntu font-semibold transition-all duration-300 ${
                activeTab === 'join'
                  ? 'bg-leke-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle className="h-5 w-5 mr-2 inline" />
              Rejoindre WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 rounded-md font-ubuntu font-semibold transition-all duration-300 ${
                activeTab === 'notifications'
                  ? 'bg-leke-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bell className="h-5 w-5 mr-2 inline" />
              Notifications
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'join' && (
        <div className="grid lg:grid-cols-2 gap-12">
          {/* WhatsApp Join Form */}
          <div>
            <Card className="card-cultural">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-oswald font-bold">
                  {t('community.whatsapp.title')}
                </CardTitle>
                <CardDescription className="font-ubuntu">
                  {t('community.whatsapp.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-ubuntu">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Votre nom complet"
                        value={whatsappForm.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setWhatsappForm({ ...whatsappForm, name: e.target.value })
                        }
                        className="pl-10 font-ubuntu"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-ubuntu">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        value={whatsappForm.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setWhatsappForm({ ...whatsappForm, email: e.target.value })
                        }
                        className="pl-10 font-ubuntu"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-ubuntu">
                      Numéro WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="+225 XX XX XX XX XX"
                        value={whatsappForm.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setWhatsappForm({ ...whatsappForm, phone: e.target.value })
                        }
                        className="pl-10 font-ubuntu"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-ubuntu">
                      Centres d'intérêt culturels
                    </label>
                    <Input
                      type="text"
                      placeholder="Danse, musique, artisanat..."
                      value={whatsappForm.interests}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setWhatsappForm({ ...whatsappForm, interests: e.target.value })
                      }
                      className="font-ubuntu"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary h-12 font-ubuntu font-semibold text-lg"
                    disabled={submitStatus === 'loading'}
                  >
                    {submitStatus === 'loading' ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Traitement...</span>
                      </div>
                    ) : (
                      t('community.whatsapp.join')
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-ubuntu">
                        Merci ! Vous recevrez bientôt l'invitation WhatsApp.
                      </span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-ubuntu">
                        Une erreur est survenue. Veuillez réessayer.
                      </span>
                    </div>
                  )}
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-ubuntu">
                    <strong>Note:</strong> En rejoignant notre groupe WhatsApp, vous acceptez de recevoir des messages
                    sur les événements culturels et les actualités de Leke Culture.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Calendar */}
          <div>
            <Card className="card-cultural">
              <CardHeader>
                <CardTitle className="text-2xl font-oswald font-bold flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-ivorian-orange-500" />
                  {t('community.events.title')}
                </CardTitle>
                <CardDescription className="font-ubuntu">
                  {t('community.events.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Featured Events */}
                  {featuredEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-ivorian-orange-500 pl-4 bg-gradient-to-r from-ivorian-orange-50 to-white p-4 rounded-r-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge className="bg-ivorian-orange-500 text-white mb-2">
                            {language === 'fr' ? event.category : event.categoryEn}
                          </Badge>
                          <h3 className="font-oswald font-bold text-lg">
                            {language === 'fr' ? event.title : event.titleEn}
                          </h3>
                        </div>
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
                      </div>

                      <p className="text-gray-600 font-ubuntu text-sm mb-3">
                        {language === 'fr' ? event.description : event.descriptionEn}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-500 font-ubuntu mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{language === 'fr' ? event.location : event.locationEn}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees}/{event.maxAttendees}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-ubuntu font-semibold text-ivorian-green-600">
                          {language === 'fr' ? event.price : event.priceEn}
                        </span>
                        <Button
                          onClick={() => handleRSVP(event.id)}
                          variant={rsvpEvents.includes(event.id) ? "default" : "outline"}
                          size="sm"
                          className="font-ubuntu"
                        >
                          {rsvpEvents.includes(event.id) ? 'Inscrit ✓' : 'RSVP'}
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Regular Events */}
                  <div className="space-y-4">
                    {regularEvents.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:border-ivorian-orange-300 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {language === 'fr' ? event.category : event.categoryEn}
                            </Badge>
                            <h4 className="font-oswald font-semibold">
                              {language === 'fr' ? event.title : event.titleEn}
                            </h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 font-ubuntu mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-ubuntu font-semibold text-leke-green-600">
                            {language === 'fr' ? event.price : event.priceEn}
                          </span>
                          <Button
                            onClick={() => handleRSVP(event.id)}
                            variant={rsvpEvents.includes(event.id) ? "default" : "outline"}
                            size="sm"
                            className="font-ubuntu text-xs"
                          >
                            {rsvpEvents.includes(event.id) ? 'Inscrit ✓' : 'RSVP'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="max-w-4xl mx-auto">
            <NotificationSettings />
          </div>
        )}
      </div>

      {/* Community Stats */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-oswald font-bold mb-12">
            Une communauté en croissance
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-oswald font-bold text-ivorian-orange-400 mb-2">500+</div>
              <p className="font-ubuntu">Membres actifs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-oswald font-bold text-ivorian-green-400 mb-2">50+</div>
              <p className="font-ubuntu">Événements organisés</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-oswald font-bold text-ivorian-yellow-400 mb-2">20+</div>
              <p className="font-ubuntu">Artistes partenaires</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-oswald font-bold text-white mb-2">5★</div>
              <p className="font-ubuntu">Note moyenne</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
