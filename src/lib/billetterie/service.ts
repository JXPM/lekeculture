// Cœur métier : réservation, ticket, contrôle à l'entrée, suivi de l'équipe.
import 'server-only';
import { CGV_VERSION, type Evenement } from './evenements';
import { query, tx } from './db';
import { normaliserCode, nouveauCode, type Reservation } from './validation';

export class ErreurBilletterie extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

export type Ticket = {
  numero: number;
  code: string;
  evenement: string;
  prenom: string;
  nom: string;
  telephone: string;
  statut: 'valide' | 'annule';
  entre_le: Date | null;
  entre_par: string | null;
  cree_le: Date;
};

const COLONNES = 'numero, code, evenement, prenom, nom, telephone, statut, entre_le, entre_par, cree_le';

// Réserve une place. Sérialisé par événement (verrou) pour que la jauge et la numérotation restent justes.
export async function reserver(ev: Evenement, r: Reservation): Promise<Ticket> {
  if (!ev.ouvert) throw new ErreurBilletterie(409, 'ferme', 'Les réservations sont fermées pour cet événement.');
  return tx(async (c) => {
    await c.query('SELECT pg_advisory_xact_lock(hashtext($1))', [ev.slug]);
    const { rows: [deja] } = await c.query(
      `SELECT 1 FROM reservations WHERE evenement = $1 AND telephone = $2 AND statut = 'valide' AND anonymisee_le IS NULL`,
      [ev.slug, r.telephone]);
    if (deja) {
      throw new ErreurBilletterie(409, 'deja_reserve',
        'Ce numéro a déjà un ticket pour cet événement. Une place par personne.');
    }
    const { rows: [s] } = await c.query<{ places: number; dernier: number }>(
      `SELECT COUNT(*) FILTER (WHERE statut = 'valide')::int AS places, COALESCE(MAX(numero), 0)::int AS dernier
       FROM reservations WHERE evenement = $1`, [ev.slug]);
    if (ev.jauge !== null && s.places >= ev.jauge) {
      throw new ErreurBilletterie(409, 'complet', 'C’est complet : toutes les places ont été réservées.');
    }
    const { rows: [t] } = await c.query<Ticket>(
      `INSERT INTO reservations (evenement, numero, code, prenom, nom, telephone, source, cgv_version, optin_infos)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING ${COLONNES}`,
      [ev.slug, s.dernier + 1, nouveauCode(), r.prenom, r.nom, r.telephone, r.source, CGV_VERSION, r.optin]);
    if (r.optin) {
      await c.query(
        `INSERT INTO abonnes (telephone, prenom, nom, source) VALUES ($1, $2, $3, $4)
         ON CONFLICT (telephone) DO UPDATE SET prenom = $2, nom = $3, consenti_le = now(), source = $4`,
        [r.telephone, r.prenom, r.nom, ev.slug]);
    }
    return t;
  });
}

export async function trouverTicket(code: string): Promise<Ticket | null> {
  const { rows: [t] } = await query<Ticket>(
    `SELECT ${COLONNES} FROM reservations WHERE code = $1 AND anonymisee_le IS NULL`, [normaliserCode(code)]);
  return t ?? null;
}

export type ResultatControle =
  | { resultat: 'ok' | 'deja_entre' | 'annule' | 'autre_evenement'; ticket: Ticket }
  | { resultat: 'inconnu' };

// Scan à l'entrée : la mise à jour conditionnelle garantit qu'un ticket n'entre qu'une fois,
// même si deux téléphones scannent le même QR au même moment.
export async function controler(evenement: string, code: string, poste: string): Promise<ResultatControle> {
  const c = normaliserCode(code);
  const { rows: [entre] } = await query(
    `UPDATE reservations SET entre_le = now(), entre_par = $3
     WHERE code = $1 AND evenement = $2 AND statut = 'valide' AND entre_le IS NULL AND anonymisee_le IS NULL
     RETURNING id`, [c, evenement, poste.slice(0, 40) || 'Entrée']);
  const ticket = await trouverTicket(c);
  if (!ticket) return { resultat: 'inconnu' };
  if (entre) return { resultat: 'ok', ticket };
  if (ticket.evenement !== evenement) return { resultat: 'autre_evenement', ticket };
  if (ticket.statut === 'annule') return { resultat: 'annule', ticket };
  return { resultat: 'deja_entre', ticket };
}

export type Statistiques = {
  reservations: number;
  entrees: number;
  annulees: number;
  aujourdhui: number;
  optin: number;
  parSource: { source: string; total: number }[];
  jauge: number | null;
};

export async function statistiques(ev: Evenement): Promise<Statistiques> {
  const { rows: [s] } = await query(
    `SELECT COUNT(*) FILTER (WHERE statut = 'valide')::int AS reservations,
            COUNT(*) FILTER (WHERE statut = 'valide' AND entre_le IS NOT NULL)::int AS entrees,
            COUNT(*) FILTER (WHERE statut = 'annule')::int AS annulees,
            COUNT(*) FILTER (WHERE statut = 'valide' AND optin_infos)::int AS optin,
            COUNT(*) FILTER (WHERE statut = 'valide'
              AND cree_le >= date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC')::int AS aujourdhui
     FROM reservations WHERE evenement = $1`, [ev.slug]);
  const { rows: parSource } = await query<{ source: string; total: number }>(
    `SELECT COALESCE(source, 'direct') AS source, COUNT(*)::int AS total FROM reservations
     WHERE evenement = $1 AND statut = 'valide' GROUP BY 1 ORDER BY 2 DESC`, [ev.slug]);
  return { ...(s as Omit<Statistiques, 'parSource' | 'jauge'>), parSource, jauge: ev.jauge };
}

export async function lister(evenement: string, recherche = ''): Promise<(Ticket & { source: string | null; optin_infos: boolean })[]> {
  const q = recherche.trim().slice(0, 60);
  const vals: unknown[] = [evenement];
  let filtre = '';
  if (q) {
    vals.push(`%${q}%`);
    filtre = `AND (prenom ILIKE $2 OR nom ILIKE $2 OR telephone ILIKE $2 OR numero::text = $3)`;
    vals.push(q.replace(/^#/, ''));
  }
  const { rows } = await query(
    `SELECT ${COLONNES}, source, optin_infos FROM reservations
     WHERE evenement = $1 AND anonymisee_le IS NULL ${filtre} ORDER BY numero DESC LIMIT 2000`, vals);
  return rows as (Ticket & { source: string | null; optin_infos: boolean })[];
}

// Annule un ticket (le QR sera refusé à l'entrée et le numéro pourra réserver à nouveau).
export async function annuler(evenement: string, numero: number): Promise<Ticket> {
  const { rows: [t] } = await query<Ticket>(
    `UPDATE reservations SET statut = 'annule' WHERE evenement = $1 AND numero = $2 AND statut = 'valide'
     RETURNING ${COLONNES}`, [evenement, numero]);
  if (!t) throw new ErreurBilletterie(404, 'introuvable', `Ticket n° ${numero} introuvable ou déjà annulé.`);
  return t;
}

export async function journaliser(acteur: string, action: string, ref: string | null, details?: unknown) {
  try {
    await query('INSERT INTO journal (acteur, action, ref, details) VALUES ($1, $2, $3, $4)',
      [acteur.slice(0, 60) || 'inconnu', action, ref, details ? JSON.stringify(details) : null]);
  } catch (err) {
    console.error('journal', err);
  }
}

// Durées de conservation (annoncées dans /evenements/confidentialite) : à lancer chaque jour (cron Vercel).
export async function purger(evenements: Evenement[], conservationMois: number, maintenant = new Date()) {
  let participants = 0;
  for (const ev of evenements) {
    const limite = new Date(`${ev.date}T00:00:00Z`);
    limite.setUTCMonth(limite.getUTCMonth() + conservationMois);
    if (maintenant < limite) continue;
    const r = await query(
      `UPDATE reservations SET prenom = 'Anonyme', nom = '', telephone = '', anonymisee_le = now()
       WHERE evenement = $1 AND anonymisee_le IS NULL`, [ev.slug]);
    participants += r.rowCount ?? 0;
  }
  const abonnes = await query(`DELETE FROM abonnes WHERE consenti_le < $1::timestamptz - interval '24 months'`, [maintenant]);
  const journal = await query(`DELETE FROM journal WHERE quand < $1::timestamptz - interval '12 months'`, [maintenant]);
  return { participants, abonnes: abonnes.rowCount ?? 0, journal: journal.rowCount ?? 0 };
}
