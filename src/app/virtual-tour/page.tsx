'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PLACES } from '@/lib/content';
import { IMAGES } from '@/lib/images';

export default function PlacesPage() {
  const { t, language } = useLanguage();
  const [index, setIndex] = useState(0);
  const place = PLACES[index];
  const img = IMAGES[place.image];

  const go = (dir: number) => setIndex((i) => (i + dir + PLACES.length) % PLACES.length);

  return (
    <div>
      <section>
        <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <Reveal className="max-w-3xl">
            <h1 className="font-serif text-4xl leading-[1.06] tracking-tightish text-foreground sm:text-5xl lg:text-6xl">
              {t('places.title')}
            </h1>
            <p className="lede mt-6">{t('places.intro')}</p>
          </Reveal>
        </div>
      </section>

      {/* Visionneuse */}
      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-xl border border-border shadow-soft">
                <img
                  key={img.url}
                  src={img.url}
                  alt={language === 'fr' ? img.altFr : img.altEn}
                  className="h-[320px] w-full animate-fade-in object-cover sm:h-[460px] lg:h-[540px]"
                />
              </div>

              {/* Vignettes */}
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {PLACES.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setIndex(i)}
                    aria-label={p.name[language]}
                    aria-current={i === index}
                    className={cn(
                      'h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                      i === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                    )}
                  >
                    <img
                      src={IMAGES[p.image].url}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Détails */}
            <div className="flex flex-col lg:col-span-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {place.region[language]}
              </div>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                {place.name[language]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-foreground/75">{place.blurb[language]}</p>

              <dl className="mt-6 border-t border-border pt-5">
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {t('places.eraLabel')}
                </dt>
                <dd className="mt-1 font-serif text-xl text-foreground">{place.era[language]}</dd>
              </dl>

              <div className="mt-auto flex items-center gap-3 pt-8">
                <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Précédent">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {index + 1} / {PLACES.length}
                </span>
                <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Suivant">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tous les lieux */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {PLACES.map((p, i) => (
              <Reveal as="article" key={p.id} delay={(i % 3) * 70}>
                <button
                  onClick={() => {
                    setIndex(i);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group block w-full text-left"
                >
                  <div className="overflow-hidden rounded-lg border border-border">
                    <img
                      src={IMAGES[p.image].url}
                      alt={language === 'fr' ? IMAGES[p.image].altFr : IMAGES[p.image].altEn}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{p.region[language]}</p>
                  <h3 className="mt-1 font-serif text-xl text-foreground transition-colors group-hover:text-primary">
                    {p.name[language]}
                  </h3>
                </button>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 text-sm text-muted-foreground">{t('places.note')}</p>
        </div>
      </section>
    </div>
  );
}
