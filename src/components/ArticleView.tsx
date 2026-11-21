'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { rubriqueLabel, type Article } from '@/lib/content';

interface Props {
  article: Article;
  body?: { fr: string[]; en: string[] };
  related: Article[];
}

export function ArticleView({ article, body, related }: Props) {
  const { t, language } = useLanguage();
  const img = IMAGES[article.image];
  const paragraphs = body ? body[language] : [];
  const locale = language === 'fr' ? 'fr-FR' : 'en-GB';
  const date = new Date(article.date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article>
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <Link href="/insights" className="link-underline text-sm font-medium text-muted-foreground">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          {t('nav.insights')}
        </Link>

        <header className="mt-8">
          <p className="eyebrow text-primary">{rubriqueLabel(article.category, language)}</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.08] tracking-tightish text-foreground sm:text-5xl">
            {article.title[language]}
          </h1>
          <p className="lede mt-5">{article.excerpt[language]}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            {t('common.by')} {article.author} · {article.region[language]}
            <span className="mx-2 text-border">|</span>
            {date}
            <span className="mx-2 text-border">|</span>
            {article.readMin} {t('common.minRead')}
          </p>
        </header>
      </div>

      <figure className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-border shadow-soft">
          <img
            src={img.url}
            alt={language === 'fr' ? img.altFr : img.altEn}
            className="aspect-[16/9] w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {language === 'fr' ? img.captionFr : img.captionEn}
        </figcaption>
      </figure>

      <div className="mx-auto mt-12 max-w-prose px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          {t('common.by')} <span className="text-foreground">{article.author}</span> · {article.region[language]}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-[1400px] border-t border-border px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="mb-10 font-serif text-2xl text-foreground sm:text-3xl">{t('home.stories.title')}</h2>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <Link key={a.id} href={`/insights/${a.slug}`} className="group block">
                <div className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={IMAGES[a.image].url}
                    alt={language === 'fr' ? IMAGES[a.image].altFr : IMAGES[a.image].altEn}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-4 text-primary">{rubriqueLabel(a.category, language)}</p>
                <h3 className="mt-2 flex items-start justify-between gap-3 font-serif text-xl leading-snug text-foreground">
                  <span className="transition-colors group-hover:text-primary">{a.title[language]}</span>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
