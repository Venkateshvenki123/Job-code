import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().min(1).optional(),
  DB_HOST: z.string().min(1).optional(),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: z.string().min(1).optional(),
  DB_USER: z.string().min(1).optional(),
  DB_PASSWORD: z.string().optional(),
  DB_SSL: z.enum(["true", "false"]).default("false"),
  JWT_SECRET: z.string().min(32).optional(),
  JWT_EXPIRES_IN: z.string().default("1h"),
  CORS_ORIGIN: z.string().default("http://127.0.0.1:5173,http://localhost:5173"),
  DEV_FALLBACK: z.enum(["true", "false"]).default("false"),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD_HASH: z.string().min(20).optional(),
  AI_PROVIDER: z.string().default("disabled")
});

export function getConfig(env = process.env) {
  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    return {
      valid: false,
      error: "Invalid environment configuration.",
      details: parsed.error.flatten().fieldErrors,
      PORT: Number(env.PORT) || 5000,
      JWT_EXPIRES_IN: env.JWT_EXPIRES_IN || "1h",
      JWT_SECRET: env.JWT_SECRET,
      fallback: env.DEV_FALLBACK === "true",
      databaseConfigured: Boolean(env.DATABASE_URL || (env.DB_HOST && env.DB_NAME && env.DB_USER)),
      corsOrigins: (env.CORS_ORIGIN || "http://127.0.0.1:5173,http://localhost:5173").split(",").map((origin) => origin.trim())
    };
  }

  const values = parsed.data;
  const hasDatabaseUrl = Boolean(values.DATABASE_URL);
  const hasDbParts = Boolean(values.DB_HOST && values.DB_NAME && values.DB_USER);
  const databaseConfigured = hasDatabaseUrl || hasDbParts;
  const errors = [];
  if (!databaseConfigured && values.DEV_FALLBACK !== "true") {
    errors.push("DATABASE_URL or DB_HOST/DB_NAME/DB_USER is required unless DEV_FALLBACK=true.");
  }
  if (!values.JWT_SECRET) {
    errors.push("JWT_SECRET is required.");
  }
  if (values.JWT_SECRET && values.JWT_SECRET.length < 32) {
    errors.push("JWT_SECRET must be at least 32 characters.");
  }

  return {
    valid: errors.length === 0,
    error: errors.length ? "Invalid environment configuration." : null,
    details: errors,
    ...values,
    databaseConfigured,
    database: values.DATABASE_URL
      ? { connectionString: values.DATABASE_URL, ssl: values.DB_SSL === "true" ? { rejectUnauthorized: false } : false }
      : hasDbParts
        ? { host: values.DB_HOST, port: values.DB_PORT, database: values.DB_NAME, user: values.DB_USER, password: values.DB_PASSWORD, ssl: values.DB_SSL === "true" ? { rejectUnauthorized: false } : false }
        : null,
    corsOrigins: values.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean),
    fallback: values.DEV_FALLBACK === "true"
  };
}
