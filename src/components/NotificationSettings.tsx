'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  BellOff,
  Settings,
  Calendar,
  FileText,
  Megaphone,
  Clock,
  Music,
  Palette,
  Users,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  LekeCultureNotifications,
  NotificationPreferences,
  useNotifications,
  NotificationEvent
} from '@/lib/notifications';

export function NotificationSettings() {
  const { t, language } = useLanguage();
  const { isSupported, isSubscribed, service, enableNotifications, showTestNotification } = useNotifications();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (service) {
      setPreferences(service.getPreferences());
    }
  }, [service]);

  const handleToggleNotifications = async () => {
    setIsLoading(true);
    try {
      if (!isSubscribed) {
        await enableNotifications();
      }
    } catch (error) {
      console.error('Erreur lors de l\'activation des notifications:', error);
    }
    setIsLoading(false);
  };

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: boolean) => {
    if (!service || !preferences) return;

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    service.updatePreferences({ [key]: value });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCategoryChange = (category: keyof NotificationPreferences['categories'], value: boolean) => {
    if (!service || !preferences) return;

    const newCategories = { ...preferences.categories, [category]: value };
    const newPreferences = { ...preferences, categories: newCategories };
    setPreferences(newPreferences);
    service.updatePreferences({ categories: newCategories });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleTestNotification = async () => {
    await showTestNotification(language);
  };

  const scheduleExampleReminder = () => {
    if (!service) return;

    const exampleEvent: NotificationEvent = {
      id: 'reminder-test',
      title: 'Événement Test',
      titleEn: 'Test Event',
      description: 'Ceci est un rappel de test',
      descriptionEn: 'This is a test reminder',
      type: 'reminder',
      date: new Date(Date.now() + 10000).toISOString(), // Dans 10 secondes
      urgent: true,
      category: 'cultural'
    };

    // Programmer un rappel dans 5 secondes
    const reminderTime = new Date(Date.now() + 5000);
    service.scheduleReminder(exampleEvent, reminderTime, language);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  if (!isSupported) {
    return (
      <Card className="card-cultural">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-oswald font-bold">
            <BellOff className="h-6 w-6 mr-2 text-gray-500" />
            Notifications Non Supportées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 font-ubuntu">
            Votre navigateur ne supporte pas les notifications push.
            Veuillez utiliser un navigateur moderne pour activer cette fonctionnalité.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="card-cultural">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-oswald font-bold">
            <Bell className={`h-6 w-6 mr-2 ${isSubscribed ? 'text-leke-green-500' : 'text-gray-500'}`} />
            Notifications Push
            {isSubscribed && (
              <Badge className="ml-3 bg-leke-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Activées
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Recevez des notifications pour les nouveaux événements culturels et actualités
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubscribed ? (
            <div className="text-center py-6">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-oswald font-semibold mb-2">
                Activez les Notifications
              </h3>
              <p className="text-gray-600 font-ubuntu mb-6">
                Ne manquez plus jamais un événement culturel ou une nouvelle importante de Leke Culture.
              </p>

              <Button
                onClick={handleToggleNotifications}
                disabled={isLoading}
                className="btn-primary font-ubuntu font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Activation...</span>
                  </div>
                ) : (
                  <>
                    <Bell className="h-4 w-4 mr-2" />
                    Activer les Notifications
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-leke-green-500" />
                  <span className="font-ubuntu font-medium">Notifications activées</span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestNotification}
                    className="font-ubuntu"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Test
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={scheduleExampleReminder}
                    className="font-ubuntu"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Rappel Test
                  </Button>
                </div>
              </div>

              {showSuccess && (
                <div className="p-3 bg-leke-green-50 border border-leke-green-200 rounded-lg flex items-center space-x-2 text-leke-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-ubuntu text-sm">Préférences mises à jour avec succès</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      {isSubscribed && preferences && (
        <>
          {/* Types de Notifications */}
          <Card className="card-cultural">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-oswald font-bold">
                <Settings className="h-5 w-5 mr-2 text-leke-red-500" />
                Types de Notifications
              </CardTitle>
              <CardDescription>
                Choisissez les types de notifications que vous souhaitez recevoir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    key: 'events' as keyof NotificationPreferences,
                    icon: Calendar,
                    title: 'Événements',
                    description: 'Nouveaux ateliers, festivals et célébrations culturelles'
                  },
                  {
                    key: 'articles' as keyof NotificationPreferences,
                    icon: FileText,
                    title: 'Articles',
                    description: 'Nouveaux insights culturels et contenus éducatifs'
                  },
                  {
                    key: 'reminders' as keyof NotificationPreferences,
                    icon: Clock,
                    title: 'Rappels',
                    description: 'Rappels pour les événements auxquels vous participez'
                  },
                  {
                    key: 'announcements' as keyof NotificationPreferences,
                    icon: Megaphone,
                    title: 'Annonces',
                    description: 'Nouvelles importantes et mises à jour de la plateforme'
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  const isEnabled = preferences[item.key] as boolean;

                  return (
                    <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isEnabled ? 'bg-leke-red-100 text-leke-red-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-ubuntu font-semibold">{item.title}</h4>
                          <p className="text-sm text-gray-600 font-ubuntu">{item.description}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handlePreferenceChange(item.key, !isEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isEnabled ? 'bg-leke-red-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Catégories Culturelles */}
          <Card className="card-cultural">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-oswald font-bold">
                <Palette className="h-5 w-5 mr-2 text-leke-green-500" />
                Catégories Culturelles
              </CardTitle>
              <CardDescription>
                Personnalisez les notifications selon vos intérêts culturels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    key: 'cultural' as keyof NotificationPreferences['categories'],
                    icon: Users,
                    title: 'Culture Générale',
                    description: 'Événements culturels généraux',
                    color: 'text-blue-600 bg-blue-100'
                  },
                  {
                    key: 'dance' as keyof NotificationPreferences['categories'],
                    icon: Music,
                    title: 'Danse',
                    description: 'Ateliers et spectacles de danse',
                    color: 'text-leke-red-600 bg-leke-red-100'
                  },
                  {
                    key: 'art' as keyof NotificationPreferences['categories'],
                    icon: Palette,
                    title: 'Art',
                    description: 'Expositions et créations artistiques',
                    color: 'text-purple-600 bg-purple-100'
                  },
                  {
                    key: 'music' as keyof NotificationPreferences['categories'],
                    icon: Music,
                    title: 'Musique',
                    description: 'Concerts et performances musicales',
                    color: 'text-leke-green-600 bg-leke-green-100'
                  },
                  {
                    key: 'festival' as keyof NotificationPreferences['categories'],
                    icon: Zap,
                    title: 'Festivals',
                    description: 'Grands festivals et célébrations',
                    color: 'text-leke-yellow-600 bg-leke-yellow-100'
                  }
                ].map((category) => {
                  const Icon = category.icon;
                  const isEnabled = preferences.categories[category.key];

                  return (
                    <div key={category.key} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${category.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <h4 className="font-ubuntu font-semibold">{category.title}</h4>
                        </div>

                        <button
                          onClick={() => handleCategoryChange(category.key, !isEnabled)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            isEnabled ? 'bg-leke-red-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              isEnabled ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 font-ubuntu">{category.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Exemples d'Événements à Venir */}
      {isSubscribed && (
        <Card className="card-cultural">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-oswald font-bold">
              <Calendar className="h-5 w-5 mr-2 text-leke-yellow-500" />
              Événements à Venir
            </CardTitle>
            <CardDescription>
              Aperçu des prochains événements pour lesquels vous recevrez des notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {LekeCultureNotifications.getExampleEvents().map((event, index) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-leke-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-ubuntu font-semibold text-sm">
                      {language === 'fr' ? event.title : event.titleEn}
                    </h4>
                    <p className="text-xs text-gray-600 font-ubuntu">
                      {new Date(event.date).toLocaleDateString('fr-FR')}
                      {event.time && ` • ${event.time}`}
                      {event.location && ` • ${language === 'fr' ? event.location : event.locationEn}`}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
