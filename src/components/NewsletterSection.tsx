'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Reveal } from '@/components/Reveal';
import { CheckCircle2, AlertCircle, Newspaper, CalendarDays, Sparkles } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const perks = [
    { icon: Newspaper, key: 'stories' as const },
    { icon: CalendarDays, key: 'events' as const },
    { icon: Sparkles, key: 'culture' as const },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus('error');
      setMessage(t('home.newsletter.invalid'));
      return;
    }
    setStatus('loading');
    try {
      // Démo : à connecter à un service email (Resend, Mailchimp, etc.)
      await new Promise((r) => setTimeout(r, 900));
      setStatus('success');
      setMessage(t('home.newsletter.success'));
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 4000);
    } catch {
      setStatus('error');
      setMessage(t('home.newsletter.error'));
    }
  };

  return (
    <section id="newsletter" className="border-t border-border">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Texte + avantages */}
        <Reveal>
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{t('home.newsletter.title')}</h2>
          <p className="mt-4 max-w-prose text-lg text-foreground/70">
            {t('home.newsletter.description')}
          </p>
          <ul className="mt-8 space-y-5">
            {perks.map(({ icon: Icon, key }) => (
              <li key={key} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-lg text-foreground">
                    {t(`home.newsletter.perks.${key}.title`)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(`home.newsletter.perks.${key}.desc`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Formulaire */}
        <Reveal className="lg:pt-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-2">
              <label htmlFor="newsletter-email" className="block text-sm font-medium text-foreground">
                {t('home.newsletter.placeholder')}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t('home.newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="h-12 flex-1 bg-background text-base"
                />
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-12 whitespace-nowrap px-7 text-base font-semibold"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      {t('home.newsletter.subscribing')}
                    </span>
                  ) : (
                    t('home.newsletter.subscribe')
                  )}
                </Button>
              </div>

              {status !== 'idle' && status !== 'loading' && message && (
                <div
                  role="status"
                  className={`mt-3 flex items-center gap-2 rounded-md border p-3 text-sm ${
                    status === 'success'
                      ? 'border-primary/30 bg-primary/5 text-primary'
                      : 'border-destructive/30 bg-destructive/5 text-destructive'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 shrink-0" />
                  )}
                  <span>{message}</span>
                </div>
              )}
            </form>
            <p className="mt-5 text-xs text-muted-foreground">{t('home.newsletter.privacy')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
