'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Mail } from 'lucide-react';
import { RUBRIQUES, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/lib/content';

export function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  const exploreLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/insights', label: t('nav.insights') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/virtual-tour', label: t('nav.virtualTour') },
    { href: '/evenements', label: t('nav.events') },
    { href: '/community', label: t('nav.community') },
  ];

  return (
    <footer className="bg-ink text-background">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Marque */}
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-semibold">
              leke<span className="text-primary">.</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              {t('footer.tagline')}
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-background/20 px-3.5 py-2 text-sm text-background/90 transition-colors hover:border-background/50 hover:text-background"
            >
              <Instagram className="h-4 w-4" />
              @{INSTAGRAM_HANDLE}
            </a>
          </div>

          {/* Explorer */}
          <nav aria-label={t('footer.explore')}>
            <h3 className="text-xs uppercase tracking-[0.18em] text-background/50">{t('footer.explore')}</h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-background/80 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Rubriques */}
          <nav aria-label={t('footer.rubriques')}>
            <h3 className="text-xs uppercase tracking-[0.18em] text-background/50">{t('footer.rubriques')}</h3>
            <ul className="mt-5 space-y-3">
              {RUBRIQUES.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/insights?category=${r.id}`}
                    className="text-sm text-background/80 transition-colors hover:text-primary"
                  >
                    {r.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-background/50">{t('footer.contact')}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="mailto:hello@leke.africa" className="flex items-center gap-2 text-background/80 transition-colors hover:text-primary">
                  <Mail className="h-4 w-4" />
                  hello@leke.africa
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/80 transition-colors hover:text-primary">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="mb-3 text-sm text-background/70">{t('footer.newsletterPrompt')}</p>
              <Link
                href="/#newsletter"
                className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t('footer.newsletterButton')}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-background/15 pt-6 text-sm text-background/60 md:flex-row md:items-center">
          <p>© {year} leke. {t('footer.rights')}</p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
