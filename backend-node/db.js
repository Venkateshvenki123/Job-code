import pg from "pg";

const { Pool } = pg;

export function createPool(config) {
  if (!config?.databaseConfigured) return null;
  return new Pool({
    ...config.database,
    max: Number(process.env.DB_POOL_MAX || 10),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000
  });
}

export async function checkDatabase(pool) {
  if (!pool) return { status: "not_configured" };
  try {
    await pool.query("SELECT 1");
    return { status: "ok" };
  } catch (error) {
    console.error("[database] health check failed:", error.message);
    return { status: "unavailable" };
  }
}

export async function closePool(pool) {
  if (pool) await pool.end();
}
