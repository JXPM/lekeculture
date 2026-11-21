'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Languages, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { INSTAGRAM_URL } from '@/lib/content';

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-serif text-2xl font-semibold tracking-tightish text-foreground', className)}>
      leke<span className="text-primary">.</span>
    </span>
  );
}

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Bascule passive de l'arrière-plan du bandeau (pas d'animation par frame).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/insights', label: t('nav.insights') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/virtual-tour', label: t('nav.virtualTour') },
    { href: '/evenements', label: t('nav.events') },
    { href: '/community', label: t('nav.community') },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-background/0'
      )}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="leke, accueil" className="shrink-0">
          <Wordmark />
        </Link>

        {/* Navigation bureau, sur une seule ligne */}
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'link-underline text-sm font-medium',
                isActive(item.href) ? 'text-primary after:scale-x-100' : 'text-foreground/70'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram leke_is_the_culture"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent hover:text-foreground sm:flex"
          >
            <Instagram className="h-[18px] w-[18px]" />
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden items-center gap-2 sm:flex">
                <Languages className="h-4 w-4" />
                <span className="font-medium uppercase">{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLanguage('fr')}
                className={language === 'fr' ? 'text-primary' : ''}
              >
                Français
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'text-primary' : ''}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Ouvrir le menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <div className="mt-2 flex flex-col gap-8">
                <Wordmark />
                <div className="flex flex-col">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'border-b border-border py-3 font-serif text-xl transition-colors',
                        isActive(item.href) ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant={language === 'fr' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLanguage('fr')}
                    >
                      Français
                    </Button>
                    <Button
                      variant={language === 'en' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLanguage('en')}
                    >
                      English
                    </Button>
                  </div>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram leke_is_the_culture"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/70 hover:text-primary"
                  >
                    <Instagram className="h-[18px] w-[18px]" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
