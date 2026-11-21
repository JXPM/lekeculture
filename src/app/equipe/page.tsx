'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Download, LogOut, RefreshCw, Search } from 'lucide-react';
import { EVENEMENTS } from '@/lib/billetterie/evenements';

type Ligne = {
  numero: number; code: string; prenom: string; nom: string; telephone: string;
  statut: 'valide' | 'annule'; entre_le: string | null; cree_le: string; source: string | null; optin_infos: boolean;
};
type Stats = {
  reservations: number; entrees: number; annulees: number; aujourdhui: number; optin: number;
  parSource: { source: string; total: number }[]; jauge: number | null;
};

const EVENEMENT = Object.keys(EVENEMENTS)[0];
const date = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Abidjan' }).format(new Date(iso));

export default function PageEquipe() {
  const [cle, setCle] = useState('');
  const [erreur, setErreur] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [liste, setListe] = useState<Ligne[]>([]);
  const [q, setQ] = useState('');
  const [chargement, setChargement] = useState(false);

  const charger = useCallback(async (k: string, recherche = '') => {
    setChargement(true);
    try {
      const res = await fetch(`/api/billetterie/equipe?evenement=${EVENEMENT}&q=${encodeURIComponent(recherche)}`, { headers: { 'x-cle': k } });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error(d.message), { status: res.status });
      setStats(d.stats);
      setListe(d.liste);
      setCle(k);
      setErreur('');
      sessionStorage.setItem('leke-equipe', k);
    } catch (e) {
      if ((e as { status?: number }).status === 401) {
        setCle('');
        sessionStorage.removeItem('leke-equipe');
        setErreur('Code incorrect.');
      } else setErreur('Chargement impossible. Vérifie le réseau.');
    }
    setChargement(false);
  }, []);

  useEffect(() => {
    const k = sessionStorage.getItem('leke-equipe');
    if (k) charger(k);
  }, [charger]);

  async function annulerTicket(l: Ligne) {
    if (!confirm(`Annuler le ticket n° ${l.numero} de ${l.prenom} ${l.nom} ? Son QR sera refusé à l’entrée.`)) return;
    const res = await fetch('/api/billetterie/equipe', {
      method: 'POST',
      headers: { 'x-cle': cle, 'Content-Type': 'application/json' },
      body: JSON.stringify({ evenement: EVENEMENT, action: 'annuler', numero: l.numero }),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) alert(d.message ?? 'Annulation impossible.');
    charger(cle, q);
  }

  async function exporter() {
    const res = await fetch(`/api/billetterie/export?evenement=${EVENEMENT}`, { headers: { 'x-cle': cle } });
    if (!res.ok) return alert('Export impossible.');
    const url = URL.createObjectURL(await res.blob());
    const a = Object.assign(document.createElement('a'), { href: url, download: `${EVENEMENT}-reservations.csv` });
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copierLien(l: Ligne) {
    const lien = `${window.location.origin}/t/${l.code}`;
    try {
      await navigator.clipboard.writeText(lien);
      alert(`Lien du ticket de ${l.prenom} copié. Tu peux le lui renvoyer sur WhatsApp.`);
    } catch {
      prompt('Lien du ticket :', lien);
    }
  }

  const champ = 'rounded-md border border-neutral-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500';

  if (!cle) {
    return (
      <div className="px-4 py-16">
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); charger(String(new FormData(e.currentTarget).get('cle') ?? '').trim()); }}
          className="mx-auto max-w-sm space-y-4 rounded-lg border bg-card p-6"
        >
          <h1 className="font-serif text-3xl">Espace équipe</h1>
          <p className="text-sm text-muted-foreground">Réservations · {EVENEMENTS[EVENEMENT].artiste} {EVENEMENTS[EVENEMENT].titre}</p>
          <input name="cle" type="password" placeholder="Code d’accès" required autoComplete="off" className={`${champ} w-full`} />
          {erreur && <p role="alert" className="text-sm text-red-600">{erreur}</p>}
          <button className="w-full rounded-md bg-ink py-3 font-semibold text-background">Entrer</button>
        </form>
      </div>
    );
  }

  const cartes = stats ? [
    { label: 'Réservations', valeur: stats.jauge ? `${stats.reservations} / ${stats.jauge}` : stats.reservations },
    { label: 'Entrés (scannés)', valeur: stats.entrees },
    { label: 'Taux de venue', valeur: stats.reservations ? `${Math.round((stats.entrees / stats.reservations) * 100)} %` : '0 %' },
    { label: 'Aujourd’hui', valeur: stats.aujourdhui },
    { label: 'OK pour être prévenus', valeur: stats.optin },
    { label: 'Annulés', valeur: stats.annulees },
  ] : [];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Espace équipe</p>
          <h1 className="font-serif text-4xl">{EVENEMENTS[EVENEMENT].artiste} · {EVENEMENTS[EVENEMENT].titre}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => charger(cle, q)} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
            <RefreshCw className={`h-4 w-4 ${chargement ? 'animate-spin' : ''}`} aria-hidden /> Actualiser
          </button>
          <button onClick={exporter} className="flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm text-background">
            <Download className="h-4 w-4" aria-hidden /> Exporter (Excel)
          </button>
          <button onClick={() => { setCle(''); sessionStorage.removeItem('leke-equipe'); }} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
            <LogOut className="h-4 w-4" aria-hidden /> Quitter
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {cartes.map((c) => (
          <div key={c.label} className="rounded-lg border bg-card p-4">
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{c.valeur}</p>
          </div>
        ))}
      </div>

      {stats && stats.parSource.length > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Provenance : {stats.parSource.map((s) => `${s.source} ${s.total}`).join(' · ')}
        </p>
      )}

      <form onSubmit={(e) => { e.preventDefault(); charger(cle, q); }} className="mt-8 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Chercher un nom, un numéro, un n° de ticket…" className={`${champ} w-full pl-9`} />
        </div>
        <button className="rounded-md border px-4">Chercher</button>
      </form>

      <div className="mt-4 overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">N°</th><th className="px-4 py-3">Nom</th><th className="px-4 py-3">WhatsApp</th>
              <th className="px-4 py-3">Réservé</th><th className="px-4 py-3">Entrée</th><th className="px-4 py-3">Source</th><th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {liste.map((l) => (
              <tr key={l.numero} className={`border-b last:border-0 ${l.statut === 'annule' ? 'text-muted-foreground line-through' : ''}`}>
                <td className="px-4 py-3 tabular-nums">{String(l.numero).padStart(4, '0')}</td>
                <td className="px-4 py-3 font-medium">{l.prenom} {l.nom}</td>
                <td className="px-4 py-3 tabular-nums">
                  <a href={`https://wa.me/${l.telephone.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">{l.telephone}</a>
                </td>
                <td className="px-4 py-3">{date(l.cree_le)}</td>
                <td className="px-4 py-3">{l.entre_le ? <span className="font-medium text-emerald-700">{date(l.entre_le)}</span> : '–'}</td>
                <td className="px-4 py-3">{l.source ?? 'direct'}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  {l.statut === 'valide' && (
                    <>
                      <button onClick={() => copierLien(l)} className="mr-3 text-xs underline underline-offset-2">Lien du ticket</button>
                      <button onClick={() => annulerTicket(l)} className="text-xs text-red-600 underline underline-offset-2">Annuler</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {liste.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">Aucune réservation pour l’instant.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
