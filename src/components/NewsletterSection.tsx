'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export function NewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Veuillez entrer une adresse email valide');
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call - Dans un vrai projet, connecter à same.new ou service email
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, just simulate success
      setStatus('success');
      setMessage('Merci ! Vous êtes maintenant inscrit à notre newsletter.');
      setEmail('');

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 kente-pattern opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="bg-white/80 backdrop-blur-sm border border-ivorian-orange-200 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6">
              <div className="w-20 h-20 bg-leke-red-500 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="h-10 w-10 text-white" />
              </div>
            </div>

            <CardTitle className="text-3xl sm:text-4xl font-oswald font-bold text-gray-900 mb-4">
              {t('home.newsletter.title')}
            </CardTitle>

            <CardDescription className="text-lg text-gray-600 font-ubuntu max-w-2xl mx-auto">
              {t('home.newsletter.description')}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-8">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder={t('home.newsletter.placeholder')}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-lg font-ubuntu"
                  disabled={status === 'loading'}
                />

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary h-12 px-8 font-ubuntu font-semibold text-lg whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Inscription...</span>
                    </div>
                  ) : (
                    t('home.newsletter.subscribe')
                  )}
                </Button>
              </div>

              {/* Status Message */}
              {status !== 'idle' && message && (
                <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
                  status === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {status === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span className="font-ubuntu">{message}</span>
                </div>
              )}
            </form>

            {/* Newsletter Features */}
            <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-ivorian-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📰</span>
                </div>
                <h4 className="font-oswald font-semibold text-gray-900">Articles Exclusifs</h4>
                <p className="text-sm text-gray-600 font-ubuntu">Contenu premium réservé aux abonnés</p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-ivorian-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎭</span>
                </div>
                <h4 className="font-oswald font-semibold text-gray-900">Événements</h4>
                <p className="text-sm text-gray-600 font-ubuntu">Invitations en avant-première</p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-ivorian-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-oswald font-semibold text-gray-900">Culture</h4>
                <p className="text-sm text-gray-600 font-ubuntu">Insights culturels hebdomadaires</p>
              </div>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-gray-500 text-center mt-8 font-ubuntu">
              Nous respectons votre vie privée. Vos données ne seront jamais partagées avec des tiers.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
