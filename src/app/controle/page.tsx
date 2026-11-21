'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Script from 'next/script';
import { Ban, Camera, CheckCircle2, CircleAlert, LogOut, XCircle } from 'lucide-react';
import { EVENEMENTS } from '@/lib/billetterie/evenements';

type Resultat = {
  resultat: 'ok' | 'deja_entre' | 'annule' | 'autre_evenement' | 'inconnu';
  ticket: { numero: number; titulaire: string; telephone: string; entre_le: string | null; entre_par: string | null } | null;
  entrees: number;
};

declare global {
  interface Window {
    jsQR?: (d: Uint8ClampedArray, w: number, h: number, o?: object) => { data: string } | null;
    BarcodeDetector?: new (o: { formats: string[] }) => { detect: (s: CanvasImageSource) => Promise<{ rawValue: string }[]> };
  }
}

const EVENEMENT = Object.keys(EVENEMENTS)[0];
const heure = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Abidjan' }).format(new Date(iso));

export default function PageControle() {
  const [cle, setCle] = useState('');
  const [poste, setPoste] = useState('Entrée');
  const [connecte, setConnecte] = useState(false);
  const [erreurConnexion, setErreurConnexion] = useState('');
  const [entrees, setEntrees] = useState(0);
  const [reservations, setReservations] = useState(0);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [camera, setCamera] = useState<'arret' | 'marche' | 'refusee'>('arret');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fluxRef = useRef<MediaStream | null>(null);
  const occupe = useRef(false);
  const dernier = useRef({ code: '', quand: 0 });

  const appel = useCallback(async (methode: 'GET' | 'POST', k: string, body?: object) => {
    const url = methode === 'GET' ? `/api/billetterie/controle?evenement=${EVENEMENT}` : '/api/billetterie/controle';
    const res = await fetch(url, {
      method: methode,
      headers: { 'x-cle': k, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify({ evenement: EVENEMENT, ...body }) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(data.message ?? 'Erreur'), { status: res.status });
    return data;
  }, []);

  async function connexion(k: string, p: string) {
    try {
      const d = await appel('GET', k);
      setEntrees(d.entrees);
      setReservations(d.reservations);
      setCle(k);
      setPoste(p);
      setConnecte(true);
      setErreurConnexion('');
      sessionStorage.setItem('leke-controle', JSON.stringify({ cle: k, poste: p }));
    } catch (e) {
      setErreurConnexion((e as { status?: number }).status === 401 ? 'Code incorrect.' : 'Connexion impossible. Vérifie le réseau.');
    }
  }

  useEffect(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem('leke-controle') ?? 'null');
      if (s?.cle) connexion(s.cle, s.poste ?? 'Entrée');
    } catch {
      /* rien */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifier = useCallback(async (lu: string) => {
    const maintenant = Date.now();
    // Ignore le même QR relu dans les 4 secondes (la caméra le voit plusieurs fois).
    if (occupe.current || (lu === dernier.current.code && maintenant - dernier.current.quand < 4000)) return;
    occupe.current = true;
    dernier.current = { code: lu, quand: maintenant };
    try {
      const r: Resultat = await appel('POST', cle, { code: lu, poste });
      setResultat(r);
      setEntrees(r.entrees);
      if (navigator.vibrate) navigator.vibrate(r.resultat === 'ok' ? 90 : [220, 90, 220]);
    } catch (e) {
      if ((e as { status?: number }).status === 401) {
        setConnecte(false);
        setErreurConnexion('Code d’accès changé : reconnecte-toi.');
      } else {
        setResultat({ resultat: 'inconnu', ticket: null, entrees });
      }
    } finally {
      setTimeout(() => { occupe.current = false; }, 1200);
    }
  }, [appel, cle, poste, entrees]);

  // Rafraîchit le compteur (plusieurs téléphones à l'entrée).
  useEffect(() => {
    if (!connecte) return;
    const id = setInterval(() => {
      appel('GET', cle).then((d) => { setEntrees(d.entrees); setReservations(d.reservations); }).catch(() => {});
    }, 15000);
    return () => clearInterval(id);
  }, [connecte, cle, appel]);

  async function demarrerCamera() {
    try {
      const flux = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } }, audio: false });
      fluxRef.current = flux;
      const v = videoRef.current!;
      v.srcObject = flux;
      await v.play();
      setCamera('marche');
    } catch {
      setCamera('refusee');
    }
  }

  useEffect(() => {
    if (camera !== 'marche') return;
    let actif = true;
    let detecteur: InstanceType<NonNullable<Window['BarcodeDetector']>> | null = null;
    try {
      if (window.BarcodeDetector) detecteur = new window.BarcodeDetector({ formats: ['qr_code'] });
    } catch {
      detecteur = null;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let derniereLecture = 0;
    const boucle = async (t: number) => {
      if (!actif) return;
      requestAnimationFrame(boucle);
      const v = videoRef.current;
      if (!v || v.readyState < 2 || occupe.current || t - derniereLecture < 180) return;
      derniereLecture = t;
      try {
        if (detecteur) {
          const codes = await detecteur.detect(v);
          if (codes[0]) verifier(codes[0].rawValue);
        } else if (window.jsQR && ctx) {
          const w = 480;
          const h = Math.round((w * v.videoHeight) / v.videoWidth);
          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(v, 0, 0, w, h);
          const code = window.jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: 'dontInvert' });
          if (code) verifier(code.data);
        }
      } catch {
        /* image illisible */
      }
    };
    requestAnimationFrame(boucle);
    return () => { actif = false; };
  }, [camera, verifier]);

  useEffect(() => () => fluxRef.current?.getTracks().forEach((t) => t.stop()), []);

  function deconnexion() {
    fluxRef.current?.getTracks().forEach((t) => t.stop());
    setCamera('arret');
    setConnecte(false);
    setCle('');
    sessionStorage.removeItem('leke-controle');
  }

  if (!connecte) {
    return (
      <div className="min-h-[80vh] bg-neutral-950 px-4 py-16 text-neutral-100">
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            connexion(String(f.get('cle') ?? '').trim(), String(f.get('poste') ?? '').trim() || 'Entrée');
          }}
          className="mx-auto max-w-sm space-y-5 rounded-lg border border-neutral-800 p-6"
        >
          <h1 className="text-2xl font-semibold">Contrôle à l’entrée</h1>
          <p className="text-sm text-neutral-400">{EVENEMENTS[EVENEMENT].artiste} · {EVENEMENTS[EVENEMENT].titre}</p>
          <label className="block text-sm">
            Code d’accès
            <input name="cle" type="password" inputMode="numeric" autoComplete="off" required
              className="mt-2 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </label>
          <label className="block text-sm">
            Nom du poste
            <input name="poste" defaultValue={poste} maxLength={40}
              className="mt-2 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </label>
          {erreurConnexion && <p role="alert" className="text-sm text-red-400">{erreurConnexion}</p>}
          <button className="w-full rounded-md bg-emerald-500 py-3.5 font-semibold text-neutral-950 hover:bg-emerald-400">Entrer</button>
        </form>
      </div>
    );
  }

  const r = resultat;
  const t = r?.ticket;
  const style = !r ? '' : r.resultat === 'ok' ? 'bg-emerald-600' : r.resultat === 'deja_entre' ? 'bg-amber-500 text-neutral-950' : 'bg-red-600';

  return (
    <div className="min-h-[80vh] bg-neutral-950 px-4 py-6 text-neutral-100">
      <Script src="/vendor/jsQR.min.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">{poste}</p>
            <p className="text-3xl font-bold tabular-nums">{entrees}<span className="text-base font-normal text-neutral-400"> entrés / {reservations} réservés</span></p>
          </div>
          <button onClick={deconnexion} className="flex items-center gap-1.5 rounded-md border border-neutral-700 px-3 py-2 text-sm text-neutral-300">
            <LogOut className="h-4 w-4" aria-hidden /> Quitter
          </button>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-black">
          <video ref={videoRef} playsInline muted className={`aspect-square w-full object-cover ${camera === 'marche' ? '' : 'hidden'}`} />
          {camera !== 'marche' && (
            <div className="flex aspect-square flex-col items-center justify-center gap-4 p-6 text-center">
              {camera === 'refusee' && <p className="text-sm text-red-300">Caméra refusée. Autorise-la dans le navigateur ou tape le code ci-dessous.</p>}
              <button onClick={demarrerCamera} className="flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-3 font-semibold text-neutral-950">
                <Camera className="h-5 w-5" aria-hidden /> Lancer la caméra
              </button>
            </div>
          )}
          {camera === 'marche' && <div className="pointer-events-none absolute inset-[18%] rounded-lg border-2 border-emerald-400/80" aria-hidden />}
        </div>

        {r && (
          <div role="status" aria-live="assertive" className={`rounded-lg p-5 ${style}`}>
            <div className="flex items-center gap-3">
              {r.resultat === 'ok' && <CheckCircle2 className="h-9 w-9" aria-hidden />}
              {r.resultat === 'deja_entre' && <CircleAlert className="h-9 w-9" aria-hidden />}
              {r.resultat === 'annule' && <Ban className="h-9 w-9" aria-hidden />}
              {(r.resultat === 'inconnu' || r.resultat === 'autre_evenement') && <XCircle className="h-9 w-9" aria-hidden />}
              <p className="text-2xl font-bold">
                {{ ok: 'Entrée validée', deja_entre: 'Déjà entré', annule: 'Ticket annulé', inconnu: 'Ticket inconnu', autre_evenement: 'Autre événement' }[r.resultat]}
              </p>
            </div>
            {t && (
              <p className="mt-3 text-lg">
                {t.titulaire} · <span className="tabular-nums">N° {String(t.numero).padStart(4, '0')}</span>
                <span className="block text-sm opacity-80">{t.telephone}</span>
                {r.resultat === 'deja_entre' && t.entre_le && (
                  <span className="block text-sm font-semibold">Scanné à {heure(t.entre_le)} ({t.entre_par}) : ne pas laisser entrer.</span>
                )}
              </p>
            )}
            {r.resultat === 'inconnu' && <p className="mt-2 text-sm">Ce QR n’est pas un ticket Lêkê valide.</p>}
          </div>
        )}

        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const code = String(f.get('code') ?? '').trim();
            if (code) {
              dernier.current = { code: '', quand: 0 };
              verifier(code);
              e.currentTarget.reset();
            }
          }}
          className="flex gap-2"
        >
          <input name="code" placeholder="Taper le code (LK-…)" autoCapitalize="characters"
            className="min-w-0 flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          <button className="rounded-md border border-neutral-600 px-4 font-semibold">Vérifier</button>
        </form>
      </div>
    </div>
  );
}
