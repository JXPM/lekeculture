// Applique db/schema.sql sur la base DATABASE_URL (idempotent).
// Usage : node --env-file=.env.local scripts/migrate.mjs
import { readFileSync } from 'node:fs';
import pg from 'pg';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL manquant (lancer avec --env-file=.env.local).');
  process.exit(1);
}
const client = new pg.Client({ connectionString: url });
await client.connect();
await client.query(readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'));
const { rows } = await client.query(
  "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY 1");
console.log('Tables :', rows.map(r => r.table_name).join(', '));
await client.end();
