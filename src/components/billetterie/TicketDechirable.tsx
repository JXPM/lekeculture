"use client";

import { useEffect, useState, type ReactNode } from "react";

// Bord dentelé (déchirure) : polygone en dents de scie, en haut ou en bas de la pièce.
const DENTS = 22;
const PROFONDEUR = "9px";
function bordDechire(cote: "haut" | "bas"): string {
  const pts: string[] = [];
  for (let i = 0; i <= DENTS; i++) {
    const x = `${((i / DENTS) * 100).toFixed(2)}%`;
    const creux = i % 2 === 1;
    if (cote === "bas")
      pts.push(`${x} ${creux ? `calc(100% - ${PROFONDEUR})` : "100%"}`);
    else pts.push(`${x} ${creux ? PROFONDEUR : "0"}`);
  }
  return cote === "bas"
    ? `polygon(0 0, 100% 0, ${pts.reverse().join(", ")})`
    : `polygon(${pts.join(", ")}, 100% 100%, 0 100%)`;
}
const DECHIRE_HAUT = bordDechire("bas"); // bas de la partie haute
const DECHIRE_TALON = bordDechire("haut"); // haut du talon

const heureAbidjan = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Abidjan",
  }).format(new Date(iso));

export function TicketDechirable({
  code,
  entreLe: entreInitial,
  annule,
  haut,
  qr,
  numero,
  titulaire,
  pied,
}: {
  code: string;
  entreLe: string | null;
  annule: boolean;
  haut: ReactNode;
  qr: ReactNode;
  numero: string;
  titulaire: string;
  pied: ReactNode;
}) {
  const [entreLe, setEntreLe] = useState(entreInitial);
  const [enDirect, setEnDirect] = useState(false); // vrai si la déchirure arrive pendant que la page est ouverte
  const dechire = !!entreLe && !annule;

  // Tant que le ticket n'est pas utilisé, on surveille son état : au scan, il se déchire sous les yeux.
  useEffect(() => {
    if (entreLe || annule) return;
    let actif = true;
    const verifier = async () => {
      if (document.hidden) return;
      try {
        const r = await fetch(
          `/api/billetterie/statut?code=${encodeURIComponent(code)}`,
          { cache: "no-store" },
        );
        if (!r.ok) return;
        const d = await r.json();
        if (actif && d.entre_le) {
          setEnDirect(true);
          setEntreLe(d.entre_le);
          if (navigator.vibrate) navigator.vibrate([60, 40, 120]);
        }
      } catch {
        /* réseau : on réessaiera */
      }
    };
    const id = setInterval(verifier, 3000);
    return () => {
      actif = false;
      clearInterval(id);
    };
  }, [code, entreLe, annule]);

  const transition = enDirect
    ? "transition-all duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
    : "";

  return (
    <div className={`relative transition-[margin] duration-700 ${dechire ? 'mb-12' : ''}`} aria-label="Ticket d’entrée">
      {/* Partie haute : reste en place */}
      <div
        className="overflow-hidden rounded-t-2xl bg-neutral-100 text-neutral-950 shadow-2xl"
        style={
          dechire ? { clipPath: DECHIRE_HAUT, paddingBottom: "6px" } : undefined
        }
      >
        {haut}
      </div>

      {/* Ligne de découpe (ticket intact uniquement) */}
      {!dechire && (
        <div className="relative flex items-center bg-neutral-100" aria-hidden>
          <span className="absolute -left-3 h-6 w-6 rounded-full bg-neutral-950" />
          <span className="mx-5 w-full border-t-2 border-dashed border-neutral-300" />
          <span className="absolute -right-3 h-6 w-6 rounded-full bg-neutral-950" />
        </div>
      )}

      {/* Talon : se détache au scan */}
      <div
        className={`overflow-hidden rounded-b-2xl bg-neutral-100 text-neutral-950 shadow-2xl ${transition}`}
        style={{
          clipPath: dechire ? DECHIRE_TALON : undefined,
          transform: dechire ? "translateY(26px) rotate(-3.5deg)" : "none",
          transformOrigin: "100% 0",
          paddingTop: dechire ? "6px" : undefined,
        }}
      >
        <div className="px-5 pb-6 pt-5 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
            Au nom de
          </p>
          <p className="mt-1 text-xl font-semibold">{titulaire}</p>

          <div className="relative mx-auto mt-5 w-64 max-w-full">
            <div
              className={`${dechire ? "opacity-20 grayscale" : ""} ${annule ? "opacity-15" : ""} ${transition}`}
            >
              {qr}
            </div>
            {dechire && (
              <div
                className={`absolute inset-0 flex items-center justify-center ${enDirect ? "animate-tampon" : ""}`}
              >
                <div className="-rotate-12 rounded-md border-[3px] border-emerald-700 px-4 py-2 text-center text-emerald-700">
                  <p className="text-2xl font-black uppercase tracking-[0.12em]">
                    Entré
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                    à {heureAbidjan(entreLe!)}
                  </p>
                </div>
              </div>
            )}
            {annule && (
              <p className="absolute inset-0 flex items-center justify-center text-lg font-bold uppercase tracking-wider text-red-700">
                Ticket annulé
              </p>
            )}
          </div>

          <p
            className="mt-4 text-sm text-neutral-600"
            role="status"
            aria-live="polite"
          >
            {annule
              ? "Ce ticket n’est plus valable."
              : dechire
                ? "Ticket utilisé. Bonne soirée !"
                : "Présente ce QR code à l’entrée. Il ne sert qu’une fois."}
          </p>
          <p className="mt-3 font-mono text-[11px] tracking-wider text-neutral-400">
            {code} · N° {numero}
          </p>
        </div>
        {pied}
      </div>
    </div>
  );
}
