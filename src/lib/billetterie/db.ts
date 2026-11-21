// Connexion Postgres (Neon) partagée entre les requêtes d'une même instance serverless.
import 'server-only';
import pg from 'pg';

const g = globalThis as unknown as { lekePool?: pg.Pool };

function pool(): pg.Pool {
  if (!g.lekePool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL manquant');
    g.lekePool = new pg.Pool({ connectionString: url, max: 3, idleTimeoutMillis: 10_000 });
  }
  return g.lekePool;
}

export const query = <T extends pg.QueryResultRow = pg.QueryResultRow>(sql: string, params: unknown[] = []) =>
  pool().query<T>(sql, params);

export async function tx<T>(fn: (c: pg.PoolClient) => Promise<T>): Promise<T> {
  const client = await pool().connect();
  try {
    await client.query('BEGIN');
    const r = await fn(client);
    await client.query('COMMIT');
    return r;
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}
