import { describe, it, expect } from 'vitest';
import {
  shouldNotify,
  mergePreferences,
  urlBase64ToUint8Array,
  getNotificationUrl,
  defaultPreferences,
  type NotificationEvent,
  type NotificationPreferences,
} from './notifications';

function makeEvent(overrides: Partial<NotificationEvent> = {}): NotificationEvent {
  return {
    id: 'x',
    title: 'Titre',
    titleEn: 'Title',
    description: 'desc',
    descriptionEn: 'desc',
    type: 'event',
    date: new Date().toISOString(),
    urgent: false,
    category: 'dance',
    ...overrides,
  };
}

describe('shouldNotify', () => {
  it('autorise un événement quand le type et la catégorie sont activés', () => {
    // Régression : avant correction, le type "event" (singulier) était cherché
    // sous la clé "event" inexistante (au lieu de "events") → toujours false.
    expect(shouldNotify(defaultPreferences, makeEvent())).toBe(true);
  });

  it('mappe chaque type vers la bonne clé de préférence', () => {
    expect(shouldNotify(defaultPreferences, makeEvent({ type: 'article', category: 'art' }))).toBe(true);
    expect(shouldNotify(defaultPreferences, makeEvent({ type: 'announcement', category: 'cultural' }))).toBe(true);
    expect(shouldNotify(defaultPreferences, makeEvent({ type: 'reminder', category: 'music' }))).toBe(true);
  });

  it('bloque si le type est désactivé', () => {
    const prefs: NotificationPreferences = { ...defaultPreferences, events: false };
    expect(shouldNotify(prefs, makeEvent({ type: 'event' }))).toBe(false);
  });

  it('bloque si la catégorie est désactivée', () => {
    const prefs = mergePreferences(defaultPreferences, {
      categories: { ...defaultPreferences.categories, dance: false },
    });
    expect(shouldNotify(prefs, makeEvent({ category: 'dance' }))).toBe(false);
  });
});

describe('mergePreferences', () => {
  it('fusionne les catégories en profondeur sans les écraser', () => {
    const merged = mergePreferences(defaultPreferences, {
      events: false,
      categories: { ...defaultPreferences.categories, art: false },
    });
    expect(merged.events).toBe(false);
    expect(merged.categories.art).toBe(false);
    expect(merged.categories.dance).toBe(true); // inchangé
    expect(merged.articles).toBe(true); // inchangé
  });
});

describe('urlBase64ToUint8Array', () => {
  it('décode une chaîne base64-url en octets', () => {
    // "aGVsbG8" = "hello" en base64-url (sans padding)
    expect(Array.from(urlBase64ToUint8Array('aGVsbG8'))).toEqual([104, 101, 108, 108, 111]);
  });

  it('gère le base64-url (caractères - et _) et le padding manquant', () => {
    const key = 'BOqG0wEaM-gkTnRb9jE6jQgWOkNIGG0pNp8aIJ4jQQo6-KE2YN5ROOGxdDUyK1FsL2Q';
    const bytes = urlBase64ToUint8Array(key);
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.byteLength).toBeGreaterThan(0);
  });
});

describe('getNotificationUrl', () => {
  it('renvoie la bonne destination selon le type', () => {
    expect(getNotificationUrl(makeEvent({ type: 'event' }))).toBe('/community#events');
    expect(getNotificationUrl(makeEvent({ type: 'article' }))).toBe('/insights');
    expect(getNotificationUrl(makeEvent({ type: 'announcement' }))).toBe('/');
    expect(getNotificationUrl(makeEvent({ type: 'reminder' }))).toBe('/community');
  });
});
