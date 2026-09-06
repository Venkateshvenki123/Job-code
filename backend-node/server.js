import { createApp } from "./app.js";
import { getConfig } from "./config.js";
import { createPool, closePool } from "./db.js";

const config = getConfig();
const pool = createPool(config);
const app = createApp({ config, pool });

if (!config.valid) {
  console.error(`[config] ${config.error}`, config.details);
  if (!config.fallback) console.error("[config] API data routes will return 503 until PostgreSQL is configured.");
}

const server = app.listen(config.PORT, () => {
  console.log(`Node API running on http://localhost:${config.PORT}${config.fallback ? " (explicit DEV_FALLBACK mode)" : ""}`);
});

async function shutdown(signal) {
  console.log(`${signal} received; shutting down.`);
  server.close(async () => {
    await closePool(pool);
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
