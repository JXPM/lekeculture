'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { IMAGES } from '@/lib/images';
import { ARTICLES, GALLERY, rubriqueLabel } from '@/lib/content';

export function FeaturedStories() {
  const { t, language } = useLanguage();
  const featured = ARTICLES.filter((a) => a.featured);
  const lead = featured[0];
  const rest = ARTICLES.filter((a) => a.id !== lead.id).slice(0, 4);
  const leadImg = IMAGES[lead.image];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{t('home.stories.title')}</h2>
            <p className="mt-4 text-lg text-foreground/70">{t('home.stories.intro')}</p>
          </div>
          <Link href="/insights" className="link-underline text-sm font-medium">
            {t('common.viewAll')}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Récit principal */}
          <Reveal className="lg:col-span-7">
            <Link href={`/insights/${lead.slug}`} className="group block">
              <div className="overflow-hidden rounded-lg border border-border">
                <img
                  src={leadImg.url}
                  alt={language === 'fr' ? leadImg.altFr : leadImg.altEn}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-5 text-primary">{rubriqueLabel(lead.category, language)}</p>
              <h3 className="mt-2 font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                {lead.title[language]}
              </h3>
              <p className="mt-3 max-w-prose text-foreground/70">{lead.excerpt[language]}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {t('common.by')} {lead.author} · {lead.region[language]}
              </p>
            </Link>
          </Reveal>

          {/* Liste des récits récents */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-border border-t border-border">
              {rest.map((a, i) => (
                <Reveal as="li" key={a.id} delay={i * 60}>
                  <Link href={`/insights/${a.slug}`} className="group flex items-start justify-between gap-4 py-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-primary">
                        {rubriqueLabel(a.category, language)}
                      </p>
                      <h4 className="mt-1.5 font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-primary">
                        {a.title[language]}
                      </h4>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {a.author} · {a.readMin} {t('common.minRead')}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GalleryStrip() {
  const { t, language } = useLanguage();
  const photos = GALLERY.slice(0, 8);

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{t('home.gallery.title')}</h2>
            <p className="mt-4 text-lg text-foreground/70">{t('home.gallery.intro')}</p>
          </div>
          <Link href="/gallery" className="link-underline text-sm font-medium">
            {t('common.viewAll')}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      {/* Bande horizontale défilante */}
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-20 sm:px-6 lg:px-8 [scrollbar-width:thin]">
        {photos.map((p) => {
          const img = IMAGES[p.image];
          return (
            <figure key={p.id} className="w-64 shrink-0 snap-start sm:w-72">
              <div className="overflow-hidden rounded-lg border border-border">
                <img
                  src={img.url}
                  alt={language === 'fr' ? img.altFr : img.altEn}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <p className="font-serif text-lg text-foreground">{p.title[language]}</p>
                <p className="text-sm text-muted-foreground">
                  {t('common.by')} {p.author}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export function JoinBand() {
  const { t } = useLanguage();
  return (
    <section className="bg-ink text-background">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {t('home.cta.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-background/75">{t('home.cta.body')}</p>
          <Button
            asChild
            size="lg"
            className="mt-9 h-12 bg-background px-8 text-base text-foreground hover:bg-background/90"
          >
            <Link href="/community">{t('home.cta.button')}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
