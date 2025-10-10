'use client';

// Types pour les notifications
export interface NotificationEvent {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: 'event' | 'article' | 'announcement' | 'reminder';
  date: string;
  time?: string;
  location?: string;
  locationEn?: string;
  image?: string;
  urgent: boolean;
  category: 'cultural' | 'dance' | 'art' | 'music' | 'festival';
}

export interface NotificationPreferences {
  events: boolean;
  articles: boolean;
  reminders: boolean;
  announcements: boolean;
  categories: {
    cultural: boolean;
    dance: boolean;
    art: boolean;
    music: boolean;
    festival: boolean;
  };
}

// Service Worker pour les notifications push
export class LekeCultureNotifications {
  private static instance: LekeCultureNotifications;
  private registration: ServiceWorkerRegistration | null = null;
  private subscription: PushSubscription | null = null;
  private preferences: NotificationPreferences;

  constructor() {
    this.preferences = this.loadPreferences();
  }

  static getInstance(): LekeCultureNotifications {
    if (!LekeCultureNotifications.instance) {
      LekeCultureNotifications.instance = new LekeCultureNotifications();
    }
    return LekeCultureNotifications.instance;
  }

  // Initialiser les notifications
  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Service Worker ou Push Manager non supporté');
      return false;
    }

    try {
      // Enregistrer le service worker
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker enregistré:', this.registration);

      // Demander la permission pour les notifications
      const permission = await this.requestPermission();
      if (permission !== 'granted') {
        console.log('Permission de notification refusée');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des notifications:', error);
      return false;
    }
  }

  // Demander la permission pour les notifications
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('Ce navigateur ne supporte pas les notifications');
      return 'denied';
    }

    let permission = Notification.permission;

    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    return permission;
  }

  // S'abonner aux notifications push
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.log('Service Worker non enregistré');
      return null;
    }

    try {
      // Clé publique VAPID (en production, cela devrait venir du serveur)
      const vapidKey = 'BOqG0wEaM-gkTnRb9jE6jQgWOkNIGG0pNp8aIJ4jQQo6-KE2YN5ROOGxdDUyK1FsL2Q';

      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidKey)
      });

      // En production, envoyer l'abonnement au serveur
      await this.sendSubscriptionToServer(this.subscription);

      return this.subscription;
    } catch (error) {
      console.error('Erreur lors de l\'abonnement push:', error);
      return null;
    }
  }

  // Envoyer l'abonnement au serveur (simulé)
  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    // En production, cela devrait envoyer l'abonnement à votre serveur
    console.log('Abonnement push envoyé au serveur:', subscription);

    // Simuler l'envoi au serveur
    localStorage.setItem('leke_push_subscription', JSON.stringify(subscription));
  }

  // Afficher une notification locale
  async showNotification(event: NotificationEvent, language: 'fr' | 'en' = 'fr'): Promise<void> {
    if (!this.shouldShowNotification(event)) {
      return;
    }

    const title = language === 'fr' ? event.title : event.titleEn;
    const body = language === 'fr' ? event.description : event.descriptionEn;

    const options: NotificationOptions = {
      body,
      icon: '/icons/leke-culture-icon-192.png',
      badge: '/icons/leke-culture-badge-72.png',
      data: {
        eventId: event.id,
        type: event.type,
        url: this.getNotificationUrl(event),
        image: event.image
      },
      actions: [
        {
          action: 'view',
          title: language === 'fr' ? 'Voir' : 'View',
          icon: '/icons/view-icon.png'
        },
        {
          action: 'remind',
          title: language === 'fr' ? 'Rappeler plus tard' : 'Remind later',
          icon: '/icons/remind-icon.png'
        }
      ],
      requireInteraction: event.urgent,
      silent: false,
      timestamp: new Date(event.date).getTime()
    };

    if (this.registration) {
      await this.registration.showNotification(title, options);
    } else {
      // Fallback vers les notifications du navigateur
      new Notification(title, options);
    }
  }

  // Vérifier si on doit afficher la notification selon les préférences
  private shouldShowNotification(event: NotificationEvent): boolean {
    const prefs = this.preferences;

    // Vérifier le type de notification
    if (!prefs[event.type as keyof NotificationPreferences]) {
      return false;
    }

    // Vérifier la catégorie
    if (!prefs.categories[event.category]) {
      return false;
    }

    return true;
  }

  // Obtenir l'URL pour la notification
  private getNotificationUrl(event: NotificationEvent): string {
    switch (event.type) {
      case 'event':
        return '/community#events';
      case 'article':
        return '/insights';
      case 'announcement':
        return '/';
      default:
        return '/community';
    }
  }

  // Planifier une notification de rappel
  scheduleReminder(event: NotificationEvent, reminderTime: Date, language: 'fr' | 'en' = 'fr'): void {
    const now = new Date();
    const delay = reminderTime.getTime() - now.getTime();

    if (delay <= 0) {
      return; // Le temps est déjà passé
    }

    setTimeout(() => {
      const reminderEvent: NotificationEvent = {
        ...event,
        title: language === 'fr'
          ? `Rappel: ${event.title}`
          : `Reminder: ${event.titleEn}`,
        titleEn: `Reminder: ${event.titleEn}`,
        description: language === 'fr'
          ? `L'événement commence dans 30 minutes`
          : `Event starts in 30 minutes`,
        descriptionEn: `Event starts in 30 minutes`,
        type: 'reminder',
        urgent: true
      };

      this.showNotification(reminderEvent, language);
    }, delay);
  }

  // Gérer les préférences de notification
  updatePreferences(newPreferences: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...newPreferences };
    this.savePreferences();
  }

  getPreferences(): NotificationPreferences {
    return { ...this.preferences };
  }

  private loadPreferences(): NotificationPreferences {
    const saved = localStorage.getItem('leke_notification_preferences');
    if (saved) {
      return JSON.parse(saved);
    }

    // Préférences par défaut
    return {
      events: true,
      articles: true,
      reminders: true,
      announcements: true,
      categories: {
        cultural: true,
        dance: true,
        art: true,
        music: true,
        festival: true
      }
    };
  }

  private savePreferences(): void {
    localStorage.setItem('leke_notification_preferences', JSON.stringify(this.preferences));
  }

  // Convertir la clé VAPID
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  // Événements d'exemple pour démonstration
  static getExampleEvents(): NotificationEvent[] {
    return [
      {
        id: '1',
        title: 'Atelier Danse Zaouli',
        titleEn: 'Zaouli Dance Workshop',
        description: 'Apprenez la danse traditionnelle Zaouli avec un maître danseur',
        descriptionEn: 'Learn traditional Zaouli dance with a master dancer',
        type: 'event',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Demain
        time: '14:00',
        location: 'Centre Culturel Abidjan',
        locationEn: 'Abidjan Cultural Center',
        image: 'https://landtours.com/blog/wp-content/uploads/2023/11/Zaouli.jpg',
        urgent: false,
        category: 'dance'
      },
      {
        id: '2',
        title: 'Festival des Masques',
        titleEn: 'Festival of Masks',
        description: 'Célébration des traditions masquées de Côte d\'Ivoire',
        descriptionEn: 'Celebration of masked traditions of Côte d\'Ivoire',
        type: 'event',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Dans une semaine
        time: '16:00',
        location: 'Place de la République',
        locationEn: 'Republic Square',
        urgent: true,
        category: 'festival'
      },
      {
        id: '3',
        title: 'Nouvel Article: Art Traditionnel',
        titleEn: 'New Article: Traditional Art',
        description: 'Découvrez les techniques ancestrales de sculpture sur bois',
        descriptionEn: 'Discover ancestral wood carving techniques',
        type: 'article',
        date: new Date().toISOString(),
        urgent: false,
        category: 'art'
      }
    ];
  }
}

// Fonction utilitaire pour initialiser les notifications
export async function initializeNotifications(): Promise<LekeCultureNotifications | null> {
  try {
    const notificationService = LekeCultureNotifications.getInstance();
    const success = await notificationService.initialize();

    if (success) {
      await notificationService.subscribeToPush();
      return notificationService;
    }

    return null;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des notifications:', error);
    return null;
  }
}

// Hook React pour utiliser les notifications
import React from 'react';

export function useNotifications() {
  const [isSupported, setIsSupported] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [service, setService] = React.useState<LekeCultureNotifications | null>(null);

  React.useEffect(() => {
    const checkSupport = () => {
      const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
      setIsSupported(supported);
    };

    checkSupport();
  }, []);

  const enableNotifications = async () => {
    const notificationService = await initializeNotifications();
    if (notificationService) {
      setService(notificationService);
      setIsSubscribed(true);
    }
  };

  const showTestNotification = async (language: 'fr' | 'en' = 'fr') => {
    if (service) {
      const testEvent: NotificationEvent = {
        id: 'test',
        title: 'Test Notification',
        titleEn: 'Test Notification',
        description: 'Ceci est une notification de test pour Leke Culture',
        descriptionEn: 'This is a test notification for Leke Culture',
        type: 'announcement',
        date: new Date().toISOString(),
        urgent: false,
        category: 'cultural'
      };

      await service.showNotification(testEvent, language);
    }
  };

  return {
    isSupported,
    isSubscribed,
    service,
    enableNotifications,
    showTestNotification
  };
}
