'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' }
  ];

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/insights', label: t('nav.insights') },
    { href: '/community', label: t('nav.community') }
  ];

  const categories = [
    { href: '/insights?category=dance', label: t('home.categories.dance') },
    { href: '/insights?category=art', label: t('home.categories.art') },
    { href: '/insights?category=music', label: t('home.categories.music') },
    { href: '/insights?category=history', label: t('home.categories.history') },
    { href: '/insights?category=crafts', label: t('home.categories.crafts') }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 adinkra-pattern opacity-10"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-ivorian-orange-500 to-ivorian-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div>
                  <span className="text-xl font-oswald font-bold text-gradient">
                    Leke Culture
                  </span>
                </div>
              </div>

              <p className="text-gray-300 font-ubuntu mb-6 leading-relaxed">
                Célébrer et préserver la richesse culturelle de la Côte d'Ivoire et de l'Afrique.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      asChild
                      className="border-gray-600 text-gray-300 hover:bg-ivorian-orange-500 hover:border-ivorian-orange-500 hover:text-white transition-all duration-300"
                    >
                      <a href={social.href} aria-label={social.label}>
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-oswald font-semibold mb-6">Navigation</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-ivorian-orange-400 transition-colors duration-200 font-ubuntu"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-oswald font-semibold mb-6">Catégories</h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={category.href}
                      className="text-gray-300 hover:text-ivorian-green-400 transition-colors duration-200 font-ubuntu"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-oswald font-semibold mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5 text-ivorian-orange-400" />
                  <span className="font-ubuntu">contact@lekeculture.com</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-5 w-5 text-ivorian-green-400" />
                  <span className="font-ubuntu">+225 XX XX XX XX</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-5 w-5 text-ivorian-yellow-400" />
                  <span className="font-ubuntu">Abidjan, Côte d'Ivoire</span>
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="mt-6 p-4 bg-gradient-to-r from-ivorian-orange-500/20 to-ivorian-green-500/20 rounded-lg border border-ivorian-orange-500/30">
                <p className="text-sm font-ubuntu text-gray-200 mb-2">
                  Restez informé de nos actualités
                </p>
                <Button
                  size="sm"
                  className="btn-primary w-full font-ubuntu"
                  onClick={() => {
                    document.querySelector('#newsletter')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  S'inscrire à la newsletter
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-gray-400 font-ubuntu text-sm">
              <span>© 2024 Leke Culture. Fait avec</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>pour la culture ivoirienne.</span>
            </div>

            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors font-ubuntu">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors font-ubuntu">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
