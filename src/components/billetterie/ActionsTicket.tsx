'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Copy, MessageCircle } from 'lucide-react';

export function ActionsTicket({ lien, texte, slugEvenement }: { lien: string; texte: string; slugEvenement: string }) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(lien);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      window.prompt('Copie ce lien :', lien);
    }
  }

  const bouton = 'flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3.5 text-sm font-semibold transition-colors';
  return (
    <div className="mt-6 space-y-4">
      <div className="flex gap-3">
        <a href={`https://wa.me/?text=${encodeURIComponent(`${texte} ${lien}`)}`} target="_blank" rel="noopener noreferrer"
          className={`${bouton} bg-emerald-500 text-neutral-950 hover:bg-emerald-400`}>
          <MessageCircle className="h-4 w-4" aria-hidden />
          M’envoyer sur WhatsApp
        </a>
        <button type="button" onClick={copier} className={`${bouton} border border-neutral-700 text-neutral-200 hover:border-neutral-500`}>
          {copie ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          {copie ? 'Lien copié' : 'Copier le lien'}
        </button>
      </div>
      <p className="text-center text-sm text-neutral-500">
        <Link href={`/evenements/${slugEvenement}`} className="underline underline-offset-4 hover:text-neutral-300">
          Revoir la page de l’événement
        </Link>
      </p>
    </div>
  );
}
