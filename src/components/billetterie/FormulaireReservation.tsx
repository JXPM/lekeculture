'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Loader2, Ticket } from 'lucide-react';
import { PAYS } from '@/lib/billetterie/telephone';

type Champs = 'prenom' | 'nom' | 'telephone' | 'consentement';

const cleLocale = (evenement: string) => `leke-ticket-${evenement}`;

export function FormulaireReservation({ evenement, ouvert }: { evenement: string; ouvert: boolean }) {
  const router = useRouter();
  const [envoi, setEnvoi] = useState(false);
  const [erreurs, setErreurs] = useState<Partial<Record<Champs, string>>>({});
  const [message, setMessage] = useState('');
  const [ticketExistant, setTicketExistant] = useState<string | null>(null);
  const [pays, setPays] = useState(PAYS[0]);

  // Ticket déjà pris sur ce téléphone : on vérifie qu'il existe toujours (sinon on l'oublie).
  useEffect(() => {
    let code: string | null = null;
    try {
      code = localStorage.getItem(cleLocale(evenement));
    } catch {
      return; /* navigation privée */
    }
    if (!code) return;
    fetch(`/api/billetterie/statut?code=${encodeURIComponent(code)}`, { cache: 'no-store' })
      .then((r) => {
        if (r.ok) setTicketExistant(code);
        else if (r.status === 404) localStorage.removeItem(cleLocale(evenement));
      })
      .catch(() => setTicketExistant(code));
  }, [evenement]);

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setEnvoi(true);
    setErreurs({});
    setMessage('');
    try {
      const res = await fetch('/api/billetterie/reserver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evenement,
          prenom: f.get('prenom'),
          nom: f.get('nom'),
          telephone: f.get('telephone'),
          indicatif: pays.indicatif,
          consentement: f.get('consentement') === 'on',
          optin: f.get('optin') === 'on',
          site: f.get('site'),
          source: new URLSearchParams(window.location.search).get('src'),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.code) {
        try {
          localStorage.setItem(cleLocale(evenement), data.code);
        } catch {
          /* navigation privée */
        }
        router.push(`/t/${encodeURIComponent(data.code)}?nouveau=1`);
        return;
      }
      setErreurs(data.champs ?? {});
      setMessage(data.message ?? 'La réservation n’a pas abouti. Réessaie.');
    } catch {
      setMessage('Pas de connexion. Vérifie ton réseau et réessaie.');
    }
    setEnvoi(false);
  }

  if (!ouvert) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-8 text-neutral-300">
        Les réservations sont fermées pour cet événement.
      </div>
    );
  }

  const champ =
    'mt-2 block w-full rounded-md border bg-neutral-950 px-4 py-3.5 text-base text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-400';
  const bord = (c: Champs) => (erreurs[c] ? 'border-red-500' : 'border-neutral-700');

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
      {ticketExistant && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm">
          <span className="text-emerald-200">Tu as déjà réservé sur ce téléphone.</span>
          <Link href={`/t/${encodeURIComponent(ticketExistant)}`} className="font-semibold text-emerald-300 underline underline-offset-4">
            Voir mon ticket
          </Link>
        </div>
      )}

      <form onSubmit={envoyer} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-neutral-200">
            Prénom
            <input name="prenom" autoComplete="given-name" required maxLength={60}
              aria-invalid={!!erreurs.prenom} aria-describedby="err-prenom" className={`${champ} ${bord('prenom')}`} />
            {erreurs.prenom && <span id="err-prenom" className="mt-1.5 block text-sm text-red-400">{erreurs.prenom}</span>}
          </label>
          <label className="block text-sm font-medium text-neutral-200">
            Nom
            <input name="nom" autoComplete="family-name" required maxLength={60}
              aria-invalid={!!erreurs.nom} aria-describedby="err-nom" className={`${champ} ${bord('nom')}`} />
            {erreurs.nom && <span id="err-nom" className="mt-1.5 block text-sm text-red-400">{erreurs.nom}</span>}
          </label>
        </div>

        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-neutral-200">Numéro WhatsApp</label>
          <div className="mt-2 flex gap-2">
            <div className="relative shrink-0">
              <label htmlFor="pays" className="sr-only">Pays du numéro</label>
              <select
                id="pays"
                value={pays.code}
                onChange={(e) => setPays(PAYS.find((p) => p.code === e.target.value) ?? PAYS[0])}
                className="h-full w-[7.75rem] appearance-none rounded-md border border-neutral-700 bg-neutral-950 py-3.5 pl-3 pr-9 text-base text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {PAYS.map((p) => (
                  <option key={p.code} value={p.code}>{p.nom} (+{p.indicatif})</option>
                ))}
              </select>
              {/* Affichage compact par-dessus la liste : seul l'indicatif est visible */}
              <span aria-hidden className="pointer-events-none absolute inset-y-px left-px right-7 flex items-center rounded-l-md bg-neutral-950 pl-3 text-base text-neutral-100">
                {pays.code} +{pays.indicatif}
              </span>
              <ChevronDown aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            </div>
            <input id="telephone" name="telephone" type="tel" inputMode="tel" autoComplete="tel-national" required placeholder={pays.exemple}
              aria-invalid={!!erreurs.telephone} aria-describedby="err-telephone aide-telephone"
              className={`min-w-0 flex-1 rounded-md border bg-neutral-950 px-4 py-3.5 text-base text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${bord('telephone')}`} />
          </div>
          {erreurs.telephone
            ? <span id="err-telephone" className="mt-1.5 block text-sm text-red-400">{erreurs.telephone}</span>
            : <span id="aide-telephone" className="mt-1.5 block text-sm text-neutral-500">Choisis le pays, puis tape ton numéro. Un ticket par numéro.</span>}
        </div>

        {/* Piège à robots : invisible pour les humains */}
        <input name="site" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />

        <div className="space-y-3 pt-1">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-300">
            <input name="consentement" type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-500" />
            <span>
              J’accepte que Lêkê utilise mes infos pour gérer mon entrée, selon la{' '}
              <Link href="/evenements/confidentialite" target="_blank" className="underline underline-offset-2 hover:text-white">
                politique de confidentialité
              </Link>.
            </span>
          </label>
          {erreurs.consentement && <span className="block text-sm text-red-400">{erreurs.consentement}</span>}
          <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-400">
            <input name="optin" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-500" />
            <span>Préviens-moi des prochaines soirées Lêkê sur WhatsApp (facultatif).</span>
          </label>
        </div>

        {message && (
          <p role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{message}</p>
        )}

        <button type="submit" disabled={envoi}
          className="flex w-full items-center justify-center gap-2.5 rounded-md bg-emerald-500 px-6 py-4 text-base font-semibold text-neutral-950 transition-colors hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-70">
          {envoi ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Ticket className="h-5 w-5" aria-hidden />}
          {envoi ? 'Réservation…' : 'Obtenir mon ticket'}
        </button>
        <p className="text-center text-xs text-neutral-500">Gratuit · Ticket immédiat · Aucune appli à installer</p>
      </form>
    </div>
  );
}
