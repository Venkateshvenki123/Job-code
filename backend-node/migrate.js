import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getConfig } from "./config.js";
import { createPool, closePool } from "./db.js";

const config = getConfig();
if (!config.valid || !config.databaseConfigured) {
  console.error("Migration refused:", config.details || "PostgreSQL is not configured.");
  process.exit(1);
} else {
  const pool = createPool(config);
  try {
    const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "database", "migrations");
    const files = (await fs.readdir(directory)).filter((file) => file.endsWith(".sql")).sort();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
    for (const file of files) {
      const sql = await fs.readFile(path.join(directory, file), "utf8");
      const existing = await pool.query("SELECT 1 FROM schema_migrations WHERE filename = $1", [file]);
      if (existing.rowCount) {
        console.log(`Skipped ${file} (already applied)`);
        continue;
      }
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (filename) VALUES ($1)", [file]);
        await client.query("COMMIT");
        console.log(`Applied ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(`${file}: ${error.message}`);
      } finally {
        client.release();
      }
    }
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await closePool(pool);
  }
}
