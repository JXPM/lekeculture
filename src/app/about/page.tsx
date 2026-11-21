'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const editors = [
  { name: 'Amara Diallo', role: { fr: 'Rédacteur en chef', en: 'Editor-in-chief' }, city: 'Dakar' },
  { name: 'Naïma Belkacem', role: { fr: 'Patrimoine & archives', en: 'Heritage & archives' }, city: 'Alger' },
  { name: 'Chinelo Okafor', role: { fr: 'Musiques & scènes', en: 'Music & scenes' }, city: 'Lagos' },
  { name: 'Zanele Dlamini', role: { fr: 'Photo & arts visuels', en: 'Photography & visual arts' }, city: 'Johannesburg' },
];

export default function AboutPage() {
  const { t, language } = useLanguage();
  const headerImg = IMAGES.bogolan;
  const approachImg = IMAGES.marrakech;

  const pillars = ['mission', 'vision', 'values'] as const;

  return (
    <div>
      {/* En-tête */}
      <section>
        <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <Reveal className="max-w-3xl">
            <h1 className="font-serif text-4xl leading-[1.06] tracking-tightish text-foreground sm:text-5xl lg:text-6xl">
              {t('about.title')}
            </h1>
            <p className="lede mt-6">{t('about.intro')}</p>
          </Reveal>
          <Reveal className="mt-12 overflow-hidden rounded-xl border border-border shadow-soft">
            <img
              src={headerImg.url}
              alt={language === 'fr' ? headerImg.altFr : headerImg.altEn}
              className="h-[300px] w-full object-cover sm:h-[420px]"
            />
          </Reveal>
        </div>
      </section>

      {/* Piliers */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {pillars.map((p, i) => (
              <Reveal key={p} delay={i * 80} className="border-t border-primary/40 pt-6">
                <h2 className="font-serif text-2xl text-foreground">{t(`about.pillars.${p}.title`)}</h2>
                <p className="mt-3 text-foreground/70">{t(`about.pillars.${p}.body`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approche (split) */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          <Reveal className="order-2 overflow-hidden rounded-xl border border-border shadow-soft lg:order-1">
            <img
              src={approachImg.url}
              alt={language === 'fr' ? approachImg.altFr : approachImg.altEn}
              className="h-[320px] w-full object-cover lg:h-[460px]"
            />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{t('about.approach.title')}</h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-foreground/75">
              {t('about.approach.body')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Rédaction */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{t('about.team.title')}</h2>
            <p className="mt-4 text-lg text-foreground/70">{t('about.team.intro')}</p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-px sm:grid-cols-2">
            {editors.map((e, i) => (
              <Reveal as="li" key={e.name} delay={i * 60} className="flex items-baseline justify-between gap-4 border-t border-border py-5">
                <div>
                  <p className="font-serif text-xl text-foreground">{e.name}</p>
                  <p className="text-sm text-muted-foreground">{e.role[language]}</p>
                </div>
                <span className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{e.city}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-background">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{t('home.cta.title')}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-background/75">{t('home.cta.body')}</p>
            <Button asChild size="lg" className="mt-9 h-12 bg-background px-8 text-base text-foreground hover:bg-background/90">
              <Link href="/community">
                {t('home.cta.button')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
