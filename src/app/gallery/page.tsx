'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Reveal } from '@/components/Reveal';
import { X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GALLERY, RUBRIQUES, rubriqueLabel, type GalleryPhoto } from '@/lib/content';
import { IMAGES } from '@/lib/images';

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  const categories = useMemo(() => {
    const present = new Set(GALLERY.map((p) => p.category));
    return RUBRIQUES.filter((r) => present.has(r.id));
  }, []);

  const photos = useMemo(
    () => GALLERY.filter((p) => category === 'all' || p.category === category),
    [category]
  );

  // Fermeture du lightbox à la touche Échap.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <div>
      <section>
        <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl leading-[1.06] tracking-tightish text-foreground sm:text-5xl lg:text-6xl">
                {t('gallery.title')}
              </h1>
              <p className="lede mt-6">{t('gallery.intro')}</p>
            </div>
            <Link href="/community" className="link-underline text-sm font-medium">
              {t('gallery.contribute')}
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-10 flex flex-nowrap gap-2 overflow-x-auto border-y border-border py-5 sm:flex-wrap sm:overflow-visible">
            {[{ id: 'all', label: t('gallery.all') }, ...categories.map((r) => ({ id: r.id, label: r.label[language] }))].map(
              (c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    'shrink-0 rounded-md border px-3.5 py-1.5 text-sm transition-colors',
                    category === c.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {c.label}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
            {photos.map((p) => {
              const img = IMAGES[p.image];
              return (
                <figure key={p.id} className="break-inside-avoid">
                  <button
                    onClick={() => setActive(p)}
                    className="group block w-full overflow-hidden rounded-lg border border-border text-left"
                    aria-label={p.title[language]}
                  >
                    <img
                      src={img.url}
                      alt={language === 'fr' ? img.altFr : img.altEn}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </button>
                  <figcaption className="mt-2.5 flex items-baseline justify-between gap-3">
                    <span className="font-serif text-base text-foreground">{p.title[language]}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {t('common.by')} {p.author}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title[language]}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md text-background/80 transition-colors hover:bg-background/10 hover:text-background"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
          <figure
            className="flex max-h-[88vh] w-full max-w-4xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={IMAGES[active.image].url}
              alt={language === 'fr' ? IMAGES[active.image].altFr : IMAGES[active.image].altEn}
              className="max-h-[74vh] w-full rounded-lg object-contain"
            />
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2 text-background">
              <div>
                <p className="font-serif text-xl">{active.title[language]}</p>
                <p className="text-sm text-background/70">
                  {language === 'fr' ? IMAGES[active.image].captionFr : IMAGES[active.image].captionEn}
                </p>
              </div>
              <p className="text-sm text-background/70">
                {t('common.by')} {active.author} · {rubriqueLabel(active.category, language)}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
