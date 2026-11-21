'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Reveal } from '@/components/Reveal';
import {
  MessageCircle, Video, BookOpen, CalendarDays,
  CheckCircle2, AlertCircle, Bell, Instagram,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NotificationSettings } from '@/components/NotificationSettings';
import { INSTAGRAM_URL } from '@/lib/content';

const benefits = [
  { key: 'discuss', icon: MessageCircle },
  { key: 'live', icon: Video },
  { key: 'premium', icon: BookOpen },
  { key: 'events', icon: CalendarDays },
] as const;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CommunityPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'join' | 'notifications'>('join');
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', interests: '' });
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('success');
      setForm({ name: '', email: '', whatsapp: '', interests: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
    }
  };

  const fields = [
    { id: 'name', type: 'text', autoComplete: 'name' },
    { id: 'email', type: 'email', autoComplete: 'email' },
    { id: 'whatsapp', type: 'tel', autoComplete: 'tel' },
    { id: 'interests', type: 'text', autoComplete: 'off' },
  ] as const;

  return (
    <div>
      {/* En-tête */}
      <section>
        <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <Reveal className="max-w-3xl">
            <h1 className="font-serif text-4xl leading-[1.06] tracking-tightish text-foreground sm:text-5xl lg:text-6xl">
              {t('community.title')}
            </h1>
            <p className="lede mt-6">{t('community.intro')}</p>
          </Reveal>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="mb-10">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">{t('community.why.title')}</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.key} delay={i * 60} className="rounded-lg border border-border bg-secondary p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-background text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-foreground">
                    {t(`community.benefits.${b.key}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm text-foreground/70">{t(`community.benefits.${b.key}.desc`)}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Onglets */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-12 inline-flex rounded-lg border border-border bg-card p-1">
            {([
              { id: 'join', icon: MessageCircle, label: t('community.form.title') },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
            ] as const).map((x) => (
              <button
                key={x.id}
                onClick={() => setTab(x.id)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors',
                  tab === x.id ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground'
                )}
              >
                <x.icon className="h-4 w-4" />
                {x.label}
              </button>
            ))}
          </div>

          {tab === 'join' ? (
            <div className="mx-auto max-w-xl">
              <h3 className="font-serif text-2xl text-foreground">{t('community.form.title')}</h3>
              <p className="mt-2 text-foreground/70">{t('community.form.description')}</p>
              <form onSubmit={submit} className="mt-8 space-y-5">
                {fields.map((f) => (
                  <div key={f.id} className="space-y-2">
                    <label htmlFor={`f-${f.id}`} className="block text-sm font-medium text-foreground">
                      {t(`community.form.${f.id}`)}
                      {f.id !== 'interests' && <span className="text-primary"> *</span>}
                    </label>
                    <Input
                      id={`f-${f.id}`}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      required={f.id !== 'interests'}
                      placeholder={t(`community.form.${f.id}Placeholder`)}
                      value={form[f.id]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      disabled={status === 'loading'}
                      className="h-11 bg-card"
                    />
                  </div>
                ))}

                <Button type="submit" disabled={status === 'loading'} className="h-12 w-full text-base font-semibold">
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      {t('community.form.submitting')}
                    </span>
                  ) : (
                    t('community.form.submit')
                  )}
                </Button>

                {status === 'success' && (
                  <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>{t('community.form.success')}</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{t('community.form.error')}</span>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">{t('community.form.note')}</p>
              </form>
            </div>
          ) : (
            <div className="max-w-4xl">
              <NotificationSettings />
            </div>
          )}
        </div>
      </section>

      {/* Bloc Instagram */}
      <section className="bg-ink text-background">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{t('community.instagram.title')}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-background/75">{t('community.instagram.body')}</p>
            <Button
              asChild
              size="lg"
              className="mt-9 h-12 bg-background px-8 text-base text-foreground hover:bg-background/90"
            >
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                {t('community.instagram.button')}
              </a>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
