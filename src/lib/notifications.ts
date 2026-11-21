'use client';

import React from 'react';

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

const STORAGE_KEY = 'leke_notification_preferences';
const SUBSCRIPTION_KEY = 'leke_push_subscription';
const APP_ICON = '/icons/icon.svg';

// Clé publique VAPID (en production, à servir depuis le serveur)
const VAPID_PUBLIC_KEY = 'BOqG0wEaM-gkTnRb9jE6jQgWOkNIGG0pNp8aIJ4jQQo6-KE2YN5ROOGxdDUyK1FsL2Q';

// Préférences par défaut (tout activé)
export const defaultPreferences: NotificationPreferences = {
  events: true,
  articles: true,
  reminders: true,
  announcements: true,
  categories: {
    cultural: true,
    dance: true,
    art: true,
    music: true,
    festival: true,
  },
};

// Lien entre le type d'événement (singulier) et la clé de préférence (pluriel)
const TYPE_TO_PREF_KEY = {
  event: 'events',
  article: 'articles',
  reminder: 'reminders',
  announcement: 'announcements',
} as const satisfies Record<NotificationEvent['type'], keyof NotificationPreferences>;

/**
 * Fonction pure : décide si une notification doit être affichée selon les
 * préférences de l'utilisateur (type + catégorie). Testable sans DOM.
 */
export function shouldNotify(
  preferences: NotificationPreferences,
  event: NotificationEvent
): boolean {
  const prefKey = TYPE_TO_PREF_KEY[event.type];
  if (!preferences[prefKey]) return false;
  if (!preferences.categories[event.category]) return false;
  return true;
}

/** Fusionne des préférences partielles avec les préférences existantes. */
export function mergePreferences(
  base: NotificationPreferences,
  partial: Partial<NotificationPreferences>
): NotificationPreferences {
  return {
    ...base,
    ...partial,
    categories: { ...base.categories, ...(partial.categories ?? {}) },
  };
}

/** Convertit une clé VAPID base64-url en Uint8Array (pure, testable). */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData =
    typeof atob !== 'undefined'
      ? atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');

  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Service de notifications push (singleton, côté client)
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

  async initialize(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Service Worker ou Push Manager non supporté');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js');
      const permission = await this.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error("Erreur lors de l'initialisation des notifications:", error);
      return false;
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'denied';
    }
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }
    return permission;
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.warn('Service Worker non enregistré');
      return null;
    }

    try {
      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
      });
      await this.sendSubscriptionToServer(this.subscription);
      return this.subscription;
    } catch (error) {
      console.error("Erreur lors de l'abonnement push:", error);
      return null;
    }
  }

  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    // En production : POST de l'abonnement vers votre serveur.
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription));
    }
  }

  async showNotification(event: NotificationEvent, language: 'fr' | 'en' = 'fr'): Promise<void> {
    if (!shouldNotify(this.preferences, event)) return;

    const title = language === 'fr' ? event.title : event.titleEn;
    const body = language === 'fr' ? event.description : event.descriptionEn;

    const options: NotificationOptions & { actions?: { action: string; title: string }[] } = {
      body,
      icon: APP_ICON,
      badge: APP_ICON,
      data: {
        eventId: event.id,
        type: event.type,
        url: getNotificationUrl(event),
        image: event.image,
        timestamp: new Date(event.date).getTime(),
      },
      actions: [
        { action: 'view', title: language === 'fr' ? 'Voir' : 'View' },
        { action: 'remind', title: language === 'fr' ? 'Rappeler plus tard' : 'Remind later' },
      ],
      requireInteraction: event.urgent,
    };

    if (this.registration) {
      await this.registration.showNotification(title, options);
    } else if (typeof Notification !== 'undefined') {
      new Notification(title, options);
    }
  }

  scheduleReminder(event: NotificationEvent, reminderTime: Date, language: 'fr' | 'en' = 'fr'): void {
    const delay = reminderTime.getTime() - Date.now();
    if (delay <= 0) return;

    setTimeout(() => {
      const reminderEvent: NotificationEvent = {
        ...event,
        title: language === 'fr' ? `Rappel: ${event.title}` : `Reminder: ${event.titleEn}`,
        titleEn: `Reminder: ${event.titleEn}`,
        description:
          language === 'fr' ? "L'événement commence dans 30 minutes" : 'Event starts in 30 minutes',
        descriptionEn: 'Event starts in 30 minutes',
        type: 'reminder',
        urgent: true,
      };
      void this.showNotification(reminderEvent, language);
    }, delay);
  }

  updatePreferences(newPreferences: Partial<NotificationPreferences>): void {
    this.preferences = mergePreferences(this.preferences, newPreferences);
    this.savePreferences();
  }

  getPreferences(): NotificationPreferences {
    return mergePreferences(defaultPreferences, this.preferences);
  }

  private loadPreferences(): NotificationPreferences {
    if (typeof localStorage === 'undefined') return { ...defaultPreferences };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return mergePreferences(defaultPreferences, JSON.parse(saved));
    } catch (error) {
      console.warn('Préférences de notification illisibles, valeurs par défaut utilisées', error);
    }
    return { ...defaultPreferences };
  }

  private savePreferences(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.preferences));
  }

  static getExampleEvents(): NotificationEvent[] {
    return [
      {
        id: '1',
        title: 'Atelier Danse Zaouli',
        titleEn: 'Zaouli Dance Workshop',
        description: 'Apprenez la danse traditionnelle Zaouli avec un maître danseur',
        descriptionEn: 'Learn traditional Zaouli dance with a master dancer',
        type: 'event',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        time: '14:00',
        location: 'Centre Culturel Abidjan',
        locationEn: 'Abidjan Cultural Center',
        image: 'https://landtours.com/blog/wp-content/uploads/2023/11/Zaouli.jpg',
        urgent: false,
        category: 'dance',
      },
      {
        id: '2',
        title: 'Festival des Masques',
        titleEn: 'Festival of Masks',
        description: "Célébration des traditions masquées de Côte d'Ivoire",
        descriptionEn: 'Celebration of masked traditions of Côte d\'Ivoire',
        type: 'event',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '16:00',
        location: 'Place de la République',
        locationEn: 'Republic Square',
        urgent: true,
        category: 'festival',
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
        category: 'art',
      },
    ];
  }
}

/** URL de destination d'une notification selon son type. */
export function getNotificationUrl(event: NotificationEvent): string {
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

// Initialisation pratique des notifications
export async function initializeNotifications(): Promise<LekeCultureNotifications | null> {
  try {
    const service = LekeCultureNotifications.getInstance();
    const success = await service.initialize();
    if (success) {
      await service.subscribeToPush();
      return service;
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de l'initialisation des notifications:", error);
    return null;
  }
}

// Hook React
export function useNotifications() {
  const [isSupported, setIsSupported] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [service, setService] = React.useState<LekeCultureNotifications | null>(null);

  React.useEffect(() => {
    setIsSupported(
      'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
    );
  }, []);

  const enableNotifications = async () => {
    const notificationService = await initializeNotifications();
    if (notificationService) {
      setService(notificationService);
      setIsSubscribed(true);
    }
  };

  const showTestNotification = async (language: 'fr' | 'en' = 'fr') => {
    if (!service) return;
    const testEvent: NotificationEvent = {
      id: 'test',
      title: 'Test Notification',
      titleEn: 'Test Notification',
      description: 'Ceci est une notification de test pour Leke Culture',
      descriptionEn: 'This is a test notification for Leke Culture',
      type: 'announcement',
      date: new Date().toISOString(),
      urgent: false,
      category: 'cultural',
    };
    await service.showNotification(testEvent, language);
  };

  return { isSupported, isSubscribed, service, enableNotifications, showTestNotification };
}
