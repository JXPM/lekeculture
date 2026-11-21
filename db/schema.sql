-- Leke · billetterie des événements (listening parties, etc.)
-- Idempotent : peut être rejoué (npm run migrate).
-- Un événement est défini dans le code (src/lib/billetterie/evenements.ts) et identifié par son slug.

-- Une réservation = une place = un ticket avec QR. Gratuit pour l'instant (une place par numéro WhatsApp).
CREATE TABLE IF NOT EXISTS reservations (
  id             bigserial PRIMARY KEY,
  evenement      text NOT NULL,                               -- slug, ex. 'ozaki-listening-party'
  numero         integer NOT NULL,                            -- n° du ticket dans l'événement : 1, 2, 3…
  code           text NOT NULL UNIQUE,                        -- secret encodé dans le QR
  prenom         text NOT NULL,
  nom            text NOT NULL,
  telephone      text NOT NULL,                               -- E.164 : +2250707000000
  statut         text NOT NULL DEFAULT 'valide' CHECK (statut IN ('valide', 'annule')),
  entre_le       timestamptz,                                 -- scanné à l'entrée
  entre_par      text,                                        -- poste de contrôle
  source         text,                                        -- d'où vient la personne (?src=insta, whatsapp…)
  cgv_version    text NOT NULL,
  optin_infos    boolean NOT NULL DEFAULT false,              -- accepte d'être prévenu des prochains événements
  cree_le        timestamptz NOT NULL DEFAULT now(),
  anonymisee_le  timestamptz,
  UNIQUE (evenement, numero)
);
-- Une seule place par numéro et par événement (hors réservations annulées ou anonymisées).
CREATE UNIQUE INDEX IF NOT EXISTS reservations_une_par_numero
  ON reservations (evenement, telephone) WHERE statut = 'valide' AND anonymisee_le IS NULL;
CREATE INDEX IF NOT EXISTS reservations_evenement_idx ON reservations (evenement, cree_le);

-- Contacts ayant accepté d'être prévenus des prochains événements (loi n° 2013-450).
CREATE TABLE IF NOT EXISTS abonnes (
  telephone   text PRIMARY KEY,
  prenom      text NOT NULL,
  nom         text NOT NULL,
  consenti_le timestamptz NOT NULL DEFAULT now(),
  source      text NOT NULL                                   -- événement d'origine
);

-- Traçabilité des opérations de l'équipe (scan, annulation, export).
CREATE TABLE IF NOT EXISTS journal (
  id      bigserial PRIMARY KEY,
  quand   timestamptz NOT NULL DEFAULT now(),
  acteur  text NOT NULL,
  action  text NOT NULL,
  ref     text,
  details jsonb
);
CREATE INDEX IF NOT EXISTS journal_quand_idx ON journal (quand);
