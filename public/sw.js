// Service Worker — Leke Culture (cache + notifications push)

const CACHE_NAME = 'leke-culture-v2';
const APP_ICON = '/icons/icon.svg';
const OFFLINE_URLS = [
  '/',
  '/about',
  '/insights',
  '/gallery',
  '/virtual-tour',
  '/community',
  '/icons/icon.svg',
  '/icons/manifest.json',
];

// Installation : précache résilient (un échec isolé ne bloque pas l'install)
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(OFFLINE_URLS.map((url) => cache.add(url)));
      await self.skipWaiting();
    })()
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

// Fetch : cache-first pour les GET same-origin, repli réseau puis page d'accueil
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // on ne touche pas au cross-origin
  if (url.pathname.startsWith('/_next/')) return; // laissé au réseau (assets versionnés)

  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && response.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        if (request.mode === 'navigate') {
          const fallback = await caches.match('/');
          if (fallback) return fallback;
        }
        return Response.error();
      }
    })()
  );
});

// Notifications push
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: 'Leke Culture', body: event.data.text() };
    }
  }

  const title = data.title || 'Leke Culture';
  const options = {
    body: data.body || 'Nouvelle notification culturelle',
    icon: data.icon || APP_ICON,
    badge: data.badge || APP_ICON,
    data: data.data || { url: '/' },
    vibrate: [200, 100, 200],
    requireInteraction: Boolean(data.urgent),
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Clic sur une notification : focus d'un onglet existant ou ouverture
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;

  const data = event.notification.data || {};
  let urlToOpen = '/';
  if (event.action === 'view' && data.url) urlToOpen = data.url;
  else if (data.url) urlToOpen = data.url;
  else if (data.type === 'article') urlToOpen = '/insights';
  else if (data.type === 'event') urlToOpen = '/community';

  event.waitUntil(
    (async () => {
      const clientList = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      const existing = clientList.find((c) => c.url.includes(self.location.origin));
      if (existing) {
        await existing.focus();
        if ('navigate' in existing) return existing.navigate(urlToOpen);
        return;
      }
      return self.clients.openWindow(urlToOpen);
    })()
  );
});

// Messages depuis la page (mise à jour immédiate)
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_NAME });
  }
});
