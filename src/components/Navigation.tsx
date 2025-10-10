'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Languages } from 'lucide-react';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/insights', label: t('nav.insights') },
    { href: '/gallery', label: 'Galerie' },
    { href: '/virtual-tour', label: 'Tour Virtuel' },
    { href: '/community', label: t('nav.community') }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-leke-red-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 logo-gradient rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-oswald font-bold text-gradient">
                Leke Culture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-leke-red-500 transition-colors duration-200 font-ubuntu font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2">
                  <Languages className="h-4 w-4" />
                  <span className="uppercase font-medium">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setLanguage('fr')}
                  className={language === 'fr' ? 'bg-leke-red-50' : ''}
                >
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-leke-red-50' : ''}
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 logo-gradient rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">L</span>
                    </div>
                    <span className="text-lg font-oswald font-bold text-gradient">
                      Leke Culture
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-gray-700 hover:text-leke-red-500 transition-colors duration-200 font-ubuntu font-medium text-lg"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Language Selector */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">{t('nav.language')}</p>
                    <div className="flex space-x-2">
                      <Button
                        variant={language === 'fr' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLanguage('fr')}
                        className={language === 'fr' ? 'bg-leke-red-500 hover:bg-leke-red-600' : ''}
                      >
                        Français
                      </Button>
                      <Button
                        variant={language === 'en' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLanguage('en')}
                        className={language === 'en' ? 'bg-leke-red-500 hover:bg-leke-red-600' : ''}
                      >
                        English
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
