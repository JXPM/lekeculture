'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';

export function HeroSection() {
  const { t, language } = useLanguage();
  const hero = IMAGES.lalibela;

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
        {/* Texte */}
        <div className="lg:col-span-6 xl:col-span-5">
          <span className="eyebrow">{t('hero.kicker')}</span>
          <h1 className="mt-5 font-serif text-[2.75rem] leading-[1.04] tracking-tightish text-foreground sm:text-6xl lg:text-[4.25rem]">
            {t('hero.titleLine1')}{' '}
            <span className="italic leading-[1.1] text-primary">{t('hero.titleLine2')}</span>
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-foreground/75 sm:text-xl">
            {t('hero.subtitle')}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg" className="h-12 px-7 text-base">
              <Link href="/insights">{t('hero.ctaPrimary')}</Link>
            </Button>
            <Link href="/about" className="link-underline text-base font-medium">
              {t('hero.ctaSecondary')}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <figure className="lg:col-span-6 xl:col-span-7">
          <div className="overflow-hidden rounded-xl border border-border shadow-soft">
            <img
              src={hero.url}
              alt={language === 'fr' ? hero.altFr : hero.altEn}
              width={1600}
              height={1067}
              fetchPriority="high"
              className="h-[360px] w-full object-cover sm:h-[440px] lg:h-[560px]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            {language === 'fr' ? hero.captionFr : hero.captionEn}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
