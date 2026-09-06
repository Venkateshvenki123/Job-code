import { getConfig } from "./config.js";
import { createPool, closePool } from "./db.js";
import { hashPassword } from "./auth.js";

const config = getConfig();
if (!config.valid || !config.databaseConfigured) {
  console.error("Seed refused:", config.details || "PostgreSQL is not configured.");
  process.exit(1);
} else {
  const pool = createPool(config);
  try {
    const email = config.ADMIN_EMAIL || "admin@careergrid.dev";
    const passwordHash = config.ADMIN_PASSWORD_HASH || await hashPassword(process.env.ADMIN_PASSWORD || "");
    if (!config.ADMIN_PASSWORD_HASH && !process.env.ADMIN_PASSWORD) throw new Error("Set ADMIN_PASSWORD_HASH or ADMIN_PASSWORD before seeding.");
    await pool.query(
      `INSERT INTO users (id, name, email, password_hash, role) VALUES (gen_random_uuid(), $1, lower($2), $3, 'admin')
       ON CONFLICT (lower(email)) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'admin'`,
      ["CareerGrid Administrator", email, passwordHash]
    );
    await pool.query(
      `INSERT INTO companies (id, name, description, website, careers_link, industry, location)
       VALUES (gen_random_uuid(), 'Development Startup', 'Seed company for local development', 'https://example.com', 'https://example.com/careers', 'SaaS', 'Remote')
       ON CONFLICT DO NOTHING`
    );
    console.log(`Seeded admin ${email}.`);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await closePool(pool);
  }
}
