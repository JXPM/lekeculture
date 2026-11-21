'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { IMAGES, type ImageKey } from '@/lib/images';
import { RUBRIQUES, STATS } from '@/lib/content';
import { cn } from '@/lib/utils';

type Kind = 'image' | 'tint';

const RUBRIQUE_CARDS: {
  id: string;
  image: ImageKey | null;
  kind: Kind;
  span: string;
  teaser: { fr: string; en: string };
}[] = [
  {
    id: 'patrimoine',
    image: 'greatZimbabwe',
    kind: 'image',
    span: 'md:col-span-2 md:row-span-2',
    teaser: { fr: "Cités, mosquées de terre et pierres dressées.", en: 'Cities, earthen mosques and standing stones.' },
  },
  {
    id: 'textiles',
    image: 'kente',
    kind: 'image',
    span: '',
    teaser: { fr: 'Kente, bogolan, indigo et leurs récits.', en: 'Kente, bogolan, indigo and their stories.' },
  },
  {
    id: 'musique',
    image: null,
    kind: 'tint',
    span: '',
    teaser: { fr: 'Des percussions mandingues à l’afrobeats.', en: 'From Mandinka percussion to afrobeats.' },
  },
  {
    id: 'arts',
    image: 'zaouli',
    kind: 'image',
    span: '',
    teaser: { fr: 'Du Zaouli aux bronzes de cour.', en: 'From Zaouli to court bronzes.' },
  },
  {
    id: 'societe',
    image: null,
    kind: 'tint',
    span: '',
    teaser: { fr: 'Rituels, repas et gestes du quotidien.', en: 'Rituals, food and everyday gestures.' },
  },
  {
    id: 'diaspora',
    image: 'sape',
    kind: 'image',
    span: '',
    teaser: { fr: 'Ce que le continent devient ailleurs.', en: 'What the continent becomes elsewhere.' },
  },
];

export function FeaturesSection() {
  const { t, language } = useLanguage();
  const label = (id: string) => RUBRIQUES.find((r) => r.id === id)?.label[language] ?? id;

  return (
    <>
      {/* Manifeste */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="max-w-4xl">
            <h2 className="font-serif text-3xl leading-[1.12] text-foreground sm:text-4xl lg:text-[2.9rem]">
              {t('home.manifesto.title')}
            </h2>
            <p className="lede mt-6">{t('home.manifesto.body')}</p>
          </Reveal>

          <Reveal as="dl" className="mt-14 grid grid-cols-1 gap-y-8 border-t border-border pt-10 sm:grid-cols-3 sm:gap-x-10">
            {STATS.map((s) => (
              <div key={s.value}>
                <dt className="font-serif text-5xl text-primary">{s.value}</dt>
                <dd className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                  {s.label[language]}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Rubriques (bento asymétrique) */}
      <section id="rubriques" className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{t('home.rubriques.title')}</h2>
            <p className="mt-4 text-lg text-foreground/70">{t('home.rubriques.intro')}</p>
          </Reveal>

          <div className="grid auto-rows-[210px] grid-cols-1 gap-4 md:grid-cols-3">
            {RUBRIQUE_CARDS.map((card, i) => {
              const href = `/insights?category=${card.id}`;
              if (card.kind === 'image' && card.image) {
                const img = IMAGES[card.image];
                return (
                  <Reveal key={card.id} delay={i * 60} className={cn('h-full', card.span)}>
                    <Link
                      href={href}
                      className="group relative flex h-full flex-col justify-end overflow-hidden rounded-lg border border-border"
                    >
                      <img
                        src={img.url}
                        alt={language === 'fr' ? img.altFr : img.altEn}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                      <div className="relative p-5 text-background">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-2xl">{label(card.id)}</h3>
                          <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="mt-1 max-w-xs text-sm text-background/80">{card.teaser[language]}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              }
              return (
                <Reveal key={card.id} delay={i * 60} className={cn('h-full', card.span)}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col justify-between rounded-lg border border-border bg-secondary p-5 transition-colors hover:bg-accent"
                  >
                    <ArrowUpRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <div>
                      <h3 className="font-serif text-2xl text-foreground">{label(card.id)}</h3>
                      <p className="mt-1 text-sm text-foreground/70">{card.teaser[language]}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
