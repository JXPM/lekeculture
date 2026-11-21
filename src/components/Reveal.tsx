'use client';

import React, { createElement, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Délai d'apparition en ms (pour échelonner une grille). */
  delay?: number;
  /** Balise rendue (div par défaut). */
  as?: React.ElementType;
}

/**
 * Révèle son contenu lorsqu'il entre dans le viewport.
 * S'appuie sur IntersectionObserver (aucun listener de scroll) et respecte
 * `prefers-reduced-motion` via la CSS de `.reveal` dans globals.css.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined;

  return createElement(
    as,
    { ref, className: cn('reveal', visible && 'is-visible', className), style },
    children
  );
}
