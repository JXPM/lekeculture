// Service Worker pour Leke Culture - Notifications Push

const CACHE_NAME = 'leke-culture-v1';
const urlsToCache = [
  '/',
  '/about',
  '/insights',
  '/gallery',
  '/virtual-tour',
  '/community',
  '/icons/leke-culture-icon-192.png',
  '/icons/leke-culture-badge-72.png'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Suppression ancien cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourner la version en cache si disponible
        if (response) {
          return response;
        }

        // Sinon, faire la requête réseau
        return fetch(event.request);
      }
    )
  );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  console.log('Service Worker: Notification push reçue');

  let notificationData = {};

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (error) {
      notificationData = {
        title: 'Leke Culture',
        body: event.data.text() || 'Nouvelle notification culturelle',
        icon: '/icons/leke-culture-icon-192.png',
        badge: '/icons/leke-culture-badge-72.png'
      };
    }
  } else {
    notificationData = {
      title: 'Leke Culture',
      body: 'Nouvelle notification culturelle',
      icon: '/icons/leke-culture-icon-192.png',
      badge: '/icons/leke-culture-badge-72.png'
    };
  }

  const notificationOptions = {
    body: notificationData.body,
    icon: notificationData.icon || '/icons/leke-culture-icon-192.png',
    badge: notificationData.badge || '/icons/leke-culture-badge-72.png',
    data: notificationData.data || { url: '/' },
    actions: [
      {
        action: 'view',
        title: 'Voir',
        icon: '/icons/view-icon.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/icons/close-icon.png'
      }
    ],
    vibrate: [200, 100, 200],
    requireInteraction: notificationData.urgent || false,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || 'Leke Culture',
      notificationOptions
    )
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Clic sur notification');

  event.notification.close();

  const action = event.action;
  const notificationData = event.notification.data || {};

  if (action === 'close') {
    // Ne rien faire, juste fermer la notification
    return;
  }

  // Déterminer l'URL à ouvrir
  let urlToOpen = '/';

  if (action === 'view' && notificationData.url) {
    urlToOpen = notificationData.url;
  } else if (notificationData.eventId) {
    urlToOpen = `/community#event-${notificationData.eventId}`;
  } else if (notificationData.type === 'article') {
    urlToOpen = '/insights';
  } else if (notificationData.type === 'event') {
    urlToOpen = '/community';
  }

  // Ouvrir l'URL dans un onglet existant ou nouveau
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Chercher un onglet existant avec la même origine
        const existingClient = clientList.find(client => {
          return client.url.includes(self.location.origin);
        });

        if (existingClient) {
          // Focuser sur l'onglet existant et naviguer
          return existingClient.focus().then(() => {
            return existingClient.navigate(urlToOpen);
          });
        } else {
          // Ouvrir un nouvel onglet
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Gestion de la fermeture des notifications
self.addEventListener('notificationclose', (event) => {
  console.log('Service Worker: Notification fermée');

  // Optionnel: Analytics ou tracking
  const notificationData = event.notification.data || {};

  if (notificationData.trackingId) {
    // Envoyer des analytics
    fetch('/api/analytics/notification-closed', {
      method: 'POST',
      body: JSON.stringify({
        notificationId: notificationData.trackingId,
        closedAt: new Date().toISOString()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(error => {
      console.log('Erreur envoi analytics:', error);
    });
  }
});

// Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Synchronisation en arrière-plan');

  if (event.tag === 'cultural-content-sync') {
    event.waitUntil(
      // Synchroniser le contenu culturel
      syncCulturalContent()
    );
  }
});

// Fonction pour synchroniser le contenu culturel
async function syncCulturalContent() {
  try {
    // Vérifier les nouveaux événements
    const eventsResponse = await fetch('/api/events/latest');
    if (eventsResponse.ok) {
      const events = await eventsResponse.json();

      // Stocker dans le cache pour accès hors ligne
      const cache = await caches.open(CACHE_NAME);
      await cache.put('/api/events/latest', new Response(JSON.stringify(events)));
    }

    // Vérifier les nouveaux articles
    const articlesResponse = await fetch('/api/articles/latest');
    if (articlesResponse.ok) {
      const articles = await articlesResponse.json();

      // Stocker dans le cache
      const cache = await caches.open(CACHE_NAME);
      await cache.put('/api/articles/latest', new Response(JSON.stringify(articles)));
    }

  } catch (error) {
    console.error('Erreur lors de la synchronisation:', error);
  }
}

// Message du client principal
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message reçu:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Gestion des erreurs globales
self.addEventListener('error', (event) => {
  console.error('Service Worker: Erreur globale:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker: Promise rejetée:', event.reason);
  event.preventDefault();
});
