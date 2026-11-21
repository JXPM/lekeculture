'use client';

import React, { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Reveal } from '@/components/Reveal';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ARTICLES, RUBRIQUES, rubriqueLabel, type Article } from '@/lib/content';
import { IMAGES } from '@/lib/images';

function ArticleMeta({ a }: { a: Article }) {
  const { t } = useLanguage();
  return (
    <p className="mt-3 text-sm text-muted-foreground">
      {t('common.by')} {a.author} · {a.readMin} {t('common.minRead')}
    </p>
  );
}

function InsightsContent() {
  const { t, language } = useLanguage();
  const params = useSearchParams();
  const initialCat = params.get('category') ?? 'all';
  const [category, setCategory] = useState(initialCat);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const okCat = category === 'all' || a.category === category;
      const haystack = [
        a.title.fr, a.title.en, a.excerpt.fr, a.excerpt.en,
        a.author, a.region.fr, a.region.en,
      ].join(' ').toLowerCase();
      const okQ = q === '' || haystack.includes(q);
      return okCat && okQ;
    });
  }, [category, query]);

  const lead = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      <section>
        <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <Reveal className="max-w-3xl">
            <h1 className="font-serif text-4xl leading-[1.06] tracking-tightish text-foreground sm:text-5xl lg:text-6xl">
              {t('insights.title')}
            </h1>
            <p className="lede mt-6">{t('insights.intro')}</p>
          </Reveal>

          {/* Filtres */}
          <div className="mt-10 flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label={t('insights.searchPlaceholder')}
                placeholder={t('insights.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 bg-card pl-9"
              />
            </div>
            <div className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
              {[{ id: 'all', label: t('insights.all') }, ...RUBRIQUES.map((r) => ({ id: r.id, label: r.label[language] }))].map(
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
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-24 text-center">
              <p className="font-serif text-2xl text-foreground">{t('insights.empty')}</p>
            </div>
          ) : (
            <>
              {/* Récit principal */}
              <Reveal>
                <Link href={`/insights/${lead.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="overflow-hidden rounded-lg border border-border lg:col-span-7">
                    <img
                      src={IMAGES[lead.image].url}
                      alt={language === 'fr' ? IMAGES[lead.image].altFr : IMAGES[lead.image].altEn}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col justify-center lg:col-span-5">
                    <p className="eyebrow text-primary">{rubriqueLabel(lead.category, language)}</p>
                    <h2 className="mt-3 font-serif text-3xl leading-snug text-foreground transition-colors group-hover:text-primary sm:text-4xl">
                      {lead.title[language]}
                    </h2>
                    <p className="mt-4 max-w-prose text-foreground/70">{lead.excerpt[language]}</p>
                    <ArticleMeta a={lead} />
                  </div>
                </Link>
              </Reveal>

              {/* Grille des autres récits */}
              {rest.length > 0 && (
                <div className="mt-16 grid gap-x-10 gap-y-14 border-t border-border pt-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a, i) => (
                    <Reveal as="article" key={a.id} delay={(i % 3) * 70}>
                      <Link href={`/insights/${a.slug}`} className="group block">
                        <div className="overflow-hidden rounded-lg border border-border">
                          <img
                            src={IMAGES[a.image].url}
                            alt={language === 'fr' ? IMAGES[a.image].altFr : IMAGES[a.image].altEn}
                            loading="lazy"
                            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                        <p className="eyebrow mt-4 text-primary">{rubriqueLabel(a.category, language)}</p>
                        <h3 className="mt-2 font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-primary">
                          {a.title[language]}
                        </h3>
                        <p className="mt-2 text-sm text-foreground/70">{a.excerpt[language]}</p>
                        <ArticleMeta a={a} />
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8" />}>
      <InsightsContent />
    </Suspense>
  );
}
