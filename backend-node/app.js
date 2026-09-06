import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { hashPassword, issueToken, verifyPassword, authenticate, requireRole } from "./auth.js";
import { checkDatabase } from "./db.js";

const emailSchema = z.string().email().max(180);
const passwordSchema = z.string().min(8).max(200);
const text = (max = 1000) => z.string().trim().max(max).optional().nullable();

const fallbackData = {
  users: [],
  startups: [
    { id: "dev-startup-1", name: "Development Startup", tagline: "Explicit development fallback record", industry: "SaaS", stage: "Seed", companySize: "1-10", workLocations: "Remote", remoteAvailability: "Remote", technologiesUsed: "React, Node.js", description: "This record is only available when DEV_FALLBACK=true.", hiringStatus: "Hiring Now", referralAvailability: true, published: true, featured: false }
  ],
  jobs: [],
  internships: [],
  courses: [],
  resources: [],
  referrals: []
};

const entityConfig = {
  jobs: {
    table: "jobs",
    select: `SELECT id, startup_profile_id AS "startupId", company_name AS "companyName", company_logo AS "companyLogo", job_title AS "jobTitle", department, location, NULL::text AS "workMode", salary, experience, employment_type AS "employmentType", skills_required AS "skillsRequired", job_description AS "jobDescription", responsibilities, qualifications, benefits, application_link AS "applicationLink", last_date AS "lastDate", expiry_date AS "expiryDate", published, featured, views, created_at AS "createdAt" FROM jobs`,
    fallback: "jobs",
    columns: { startupId: "startup_profile_id", companyName: "company_name", companyLogo: "company_logo", jobTitle: "job_title", department: "department", location: "location", salary: "salary", experience: "experience", employmentType: "employment_type", skillsRequired: "skills_required", jobDescription: "job_description", responsibilities: "responsibilities", qualifications: "qualifications", benefits: "benefits", applicationLink: "application_link", lastDate: "last_date", expiryDate: "expiry_date", published: "published", featured: "featured" },
    search: ["job_title", "company_name", "location", "skills_required"]
  },
  internships: {
    table: "internships",
    select: `SELECT id, startup_profile_id AS "startupId", company, role, duration, stipend, location, mode, eligibility, skills, apply_link AS "applyLink", last_date AS "lastDate", expiry_date AS "expiryDate", published, featured, created_at AS "createdAt" FROM internships`,
    fallback: "internships",
    columns: { startupId: "startup_profile_id", company: "company", role: "role", duration: "duration", stipend: "stipend", location: "location", mode: "mode", eligibility: "eligibility", skills: "skills", applyLink: "apply_link", lastDate: "last_date", expiryDate: "expiry_date", published: "published", featured: "featured" },
    search: ["company", "role", "location", "skills"]
  },
  courses: {
    table: "courses",
    select: `SELECT id, course_image AS "courseImage", course_title AS "courseTitle", instructor, duration, level, category, price, description, learning_outcomes AS "learningOutcomes", enroll_link AS "enrollLink", expiry_date AS "expiryDate", published, featured, created_at AS "createdAt" FROM courses`,
    fallback: "courses",
    columns: { courseImage: "course_image", courseTitle: "course_title", instructor: "instructor", duration: "duration", level: "level", category: "category", price: "price", description: "description", learningOutcomes: "learning_outcomes", enrollLink: "enroll_link", expiryDate: "expiry_date", published: "published", featured: "featured" },
    search: ["course_title", "category", "description"]
  },
  resources: {
    table: "resources",
    select: `SELECT id, title, category, pdf_upload AS "pdfUpload", video_link AS "videoLink", external_link AS "externalLink", description, thumbnail, published, featured, created_at AS "createdAt" FROM resources`,
    fallback: "resources",
    columns: { title: "title", category: "category", pdfUpload: "pdf_upload", videoLink: "video_link", externalLink: "external_link", description: "description", thumbnail: "thumbnail", published: "published", featured: "featured" },
    search: ["title", "category", "description"]
  },
  referrals: {
    table: "referral_requests",
    select: `SELECT id, candidate_id AS "candidateId", startup_profile_id AS "startupId", company_id AS "companyId", job_id AS "jobId", internship_id AS "internshipId", opportunity_title AS "opportunityTitle", full_name AS "fullName", email, phone, linkedin_profile AS "linkedInProfile", portfolio_github AS "portfolioGithub", resume_upload AS "resumeUpload", current_location AS "currentLocation", experience, current_position AS "currentRole", skills, suitability, additional_message AS "additionalMessage", status, notes, created_at AS "createdAt" FROM referral_requests`,
    fallback: "referrals",
    columns: { candidateId: "candidate_id", startupId: "startup_profile_id", companyId: "company_id", jobId: "job_id", internshipId: "internship_id", opportunityTitle: "opportunity_title", fullName: "full_name", email: "email", phone: "phone", linkedInProfile: "linkedin_profile", portfolioGithub: "portfolio_github", resumeUpload: "resume_upload", currentLocation: "current_location", experience: "experience", currentRole: "current_position", skills: "skills", suitability: "suitability", additionalMessage: "additional_message", status: "status", notes: "notes" },
    search: ["opportunity_title", "full_name", "email", "status"]
  },
  startups: {
    table: "startup_profiles",
    select: `SELECT sp.id, c.name, sp.tagline, sc.name AS industry, sp.company_stage AS "stage", sp.funding_stage AS "fundingStage", sp.founded_year AS "foundedYear", sp.founders, sp.headquarters, sp.work_locations AS "workLocations", sp.remote_availability AS "remoteAvailability", sp.company_size AS "companySize", c.website, sp.linkedin_url AS "linkedInUrl", c.careers_link AS "careersPage", c.description, sp.technologies_used AS "technologiesUsed", sp.funding_information AS "fundingInformation", sp.benefits, sp.culture_information AS "cultureInformation", sp.referral_availability AS "referralAvailability", sp.hiring_status AS "hiringStatus", sp.published, sp.featured, sp.last_updated_date AS "lastUpdatedDate" FROM startup_profiles sp LEFT JOIN companies c ON c.id = sp.company_id LEFT JOIN startup_categories sc ON sc.id = sp.category_id`,
    fallback: "startups",
    columns: { name: "name", tagline: "tagline", industry: "industry", stage: "company_stage", fundingStage: "funding_stage", foundedYear: "founded_year", founders: "founders", headquarters: "headquarters", workLocations: "work_locations", remoteAvailability: "remote_availability", companySize: "company_size", website: "website", linkedInUrl: "linkedin_url", careersPage: "careers_link", description: "description", technologiesUsed: "technologies_used", fundingInformation: "funding_information", benefits: "benefits", cultureInformation: "culture_information", referralAvailability: "referral_availability", hiringStatus: "hiring_status", published: "published", featured: "featured" },
    search: ["sp.tagline", "c.name", "sc.name", "sp.work_locations", "sp.technologies_used"]
  }
};

const fallbackUsers = (config) => {
  if (config.ADMIN_EMAIL && config.ADMIN_PASSWORD_HASH) {
    return [{ id: "dev-admin", name: "Administrator", email: config.ADMIN_EMAIL, passwordHash: config.ADMIN_PASSWORD_HASH, role: "admin" }];
  }
  return [];
};

function ok(res, data, status = 200, meta) {
  return res.status(status).json({ data, ...(meta ? { meta } : {}) });
}

function fail(res, status, code, message, details) {
  return res.status(status).json({ error: { code, message, ...(details ? { details } : {}) } });
}

function normalizeBody(body) {
  return Object.fromEntries(Object.entries(body || {}).filter(([, value]) => value !== undefined).map(([key, value]) => [key, value === "" ? null : value]));
}

function validateAuthBody(body, registration = false) {
  const schema = z.object({
    name: registration ? z.string().trim().min(2).max(160) : text(160),
    email: emailSchema,
    password: passwordSchema
  });
  return schema.safeParse(body);
}

export function createApp({ config, pool = null }) {
  const app = express();
  const memory = structuredClone(fallbackData);
  memory.users = fallbackUsers(config);
  const usingFallback = config.fallback && !pool;
  const isDatabaseReady = () => Boolean(pool);

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigins, credentials: false }));
  app.use(express.json({ limit: "1mb" }));
  app.use(rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: "draft-7", legacyHeaders: false }));

  app.get("/api/health", async (_req, res) => {
    const database = await checkDatabase(pool);
    const backend = config.valid ? "ok" : "misconfigured";
    const status = backend === "ok" && (database.status === "ok" || usingFallback) ? 200 : 503;
    return res.status(status).json({ data: { status: status === 200 ? "ok" : "degraded", backend, database, fallback: usingFallback }, ...(config.error ? { error: { code: "CONFIG_INVALID", message: config.error, details: config.details } } : {}) });
  });

  app.get("/api/tracks", (_req, res) => ok(res, { tracks: ["React JS", "Node.js", "Python", "Java"] }, 200, { fallback: usingFallback }));
  app.get("/api/referrals/statuses", (_req, res) => ok(res, { statuses: ["Submitted", "Under Review", "Referral Available", "Referred", "Application Submitted", "Interview", "Selected", "Rejected"] }, 200, { fallback: usingFallback }));

  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const parsed = validateAuthBody(req.body, true);
      if (!parsed.success) return fail(res, 400, "VALIDATION_ERROR", "Name, email, and a password of at least 8 characters are required.", parsed.error.flatten().fieldErrors);
      const { name, email, password } = parsed.data;
      const passwordHash = await hashPassword(password);
      if (pool) {
        const result = await pool.query("INSERT INTO users (name, email, password_hash, role) VALUES ($1, lower($2), $3, 'candidate') RETURNING id, name, email, role", [name, email, passwordHash]);
        const user = result.rows[0];
        return ok(res, { user, token: issueToken(user, config) }, 201);
      }
      if (!usingFallback) return fail(res, 503, "DATABASE_UNAVAILABLE", "PostgreSQL is required. Set DATABASE_URL or explicitly enable DEV_FALLBACK=true.");
      if (memory.users.some((user) => user.email === email.toLowerCase())) return fail(res, 409, "EMAIL_EXISTS", "An account with this email already exists.");
      const user = { id: `dev-user-${Date.now()}`, name, email: email.toLowerCase(), passwordHash, role: "candidate" };
      memory.users.push(user);
      return ok(res, { user: { id: user.id, name, email: user.email, role: user.role }, token: issueToken(user, config) }, 201);
    } catch (error) { return next(error); }
  });

  app.post("/api/auth/login", async (req, res, next) => {
    try {
      const parsed = validateAuthBody(req.body);
      if (!parsed.success) return fail(res, 400, "VALIDATION_ERROR", "A valid email and password are required.");
      const { email, password } = parsed.data;
      let user;
      if (pool) {
        const result = await pool.query("SELECT id, name, email, password_hash AS \"passwordHash\", role FROM users WHERE lower(email) = lower($1) LIMIT 1", [email]);
        user = result.rows[0];
      } else if (usingFallback) {
        user = memory.users.find((item) => item.email === email.toLowerCase());
      } else {
        return fail(res, 503, "DATABASE_UNAVAILABLE", "PostgreSQL is required. Set DATABASE_URL or explicitly enable DEV_FALLBACK=true.");
      }
      if (!user || !(await verifyPassword(password, user.passwordHash))) return fail(res, 401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
      return ok(res, { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token: issueToken(user, config) });
    } catch (error) { return next(error); }
  });

  app.get("/api/auth/me", authenticate(config), async (req, res, next) => {
    try {
      if (pool) {
        const result = await pool.query("SELECT id, name, email, role FROM users WHERE id = $1", [req.user.sub]);
        if (!result.rows[0]) return fail(res, 404, "USER_NOT_FOUND", "The account no longer exists.");
        return ok(res, { user: result.rows[0] });
      }
      const user = memory.users.find((item) => item.id === req.user.sub);
      return user ? ok(res, { user: { id: user.id, name: user.name, email: user.email, role: user.role } }) : fail(res, 404, "USER_NOT_FOUND", "The account no longer exists.");
    } catch (error) { return next(error); }
  });

  const admin = [authenticate(config), requireRole("admin", "super-admin")];
  for (const [resource, definition] of Object.entries(entityConfig)) {
    app.get(`/api/${resource}`, ...(resource === "referrals" ? [authenticate(config)] : []), async (req, res, next) => {
      try {
        const q = String(req.query.q || "").trim();
        let items;
        if (pool) {
          const conditions = resource === "referrals"
            ? (req.user?.role === "admin" || req.user?.role === "super-admin" ? [] : ["(candidate_id = $1 OR lower(email) = lower($2))"])
            : ["(published = true OR published IS NULL)"];
          const params = resource === "referrals" && conditions.length ? [req.user.sub, req.user.email] : [];
          if (q) {
            const placeholder = `$${params.length + 1}`;
            const offset = definition.search.map((column) => `${column} ILIKE ${placeholder}`).join(" OR ");
            conditions.push(`(${offset})`);
            params.push(`%${q}%`);
          }
          const orderColumn = resource === "startups" ? "sp.created_at" : `${definition.table}.created_at`;
          const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
          const sql = `${definition.select}${where} ORDER BY ${orderColumn} DESC NULLS LAST LIMIT 500`;
          items = (await pool.query(sql, params)).rows;
        } else if (usingFallback) {
          items = memory[definition.fallback].filter((item) => item.published !== false);
          if (q) items = items.filter((item) => JSON.stringify(item).toLowerCase().includes(q.toLowerCase()));
        } else {
          return fail(res, 503, "DATABASE_UNAVAILABLE", "PostgreSQL is required. Set DATABASE_URL or explicitly enable DEV_FALLBACK=true.");
        }
        return ok(res, { [resource]: items }, 200, { fallback: usingFallback });
      } catch (error) { return next(error); }
    });

    app.get(`/api/${resource}/:id`, async (req, res, next) => {
      try {
        if (pool) {
          const idColumn = resource === "startups" ? "sp.id" : `${definition.table}.id`;
          const result = await pool.query(`${definition.select} WHERE ${idColumn} = $1 LIMIT 1`, [req.params.id]);
          if (!result.rows[0]) return fail(res, 404, "NOT_FOUND", `${resource} record was not found.`);
          return ok(res, result.rows[0]);
        }
        if (usingFallback) {
          const item = memory[definition.fallback].find((record) => record.id === req.params.id);
          return item ? ok(res, item) : fail(res, 404, "NOT_FOUND", `${resource} record was not found.`);
        }
        return fail(res, 503, "DATABASE_UNAVAILABLE", "PostgreSQL is required.");
      } catch (error) { return next(error); }
    });

    app.post(`/api/${resource}`, ...(resource === "referrals" ? [] : admin), async (req, res, next) => {
      try {
        const body = normalizeBody(req.body);
        if (resource === "referrals" && (!body.fullName || !body.email || !body.skills || !emailSchema.safeParse(body.email).success)) return fail(res, 400, "VALIDATION_ERROR", "fullName, email, and skills are required.");
        if (pool) {
          if (resource === "startups") {
            if (!body.name) return fail(res, 400, "VALIDATION_ERROR", "name is required.");
            const client = await pool.connect();
            try {
              await client.query("BEGIN");
              const company = await client.query(
                "INSERT INTO companies (id, name, website, careers_link, description) VALUES ($1, $2, $3, $4, $5) RETURNING id",
                [randomUUID(), body.name, body.website, body.careersPage, body.description]
              );
              const startup = await client.query(
                `INSERT INTO startup_profiles (id, company_id, tagline, company_stage, funding_stage, founded_year, founders, headquarters, work_locations, remote_availability, company_size, linkedin_url, technologies_used, funding_information, benefits, culture_information, referral_availability, hiring_status, published, featured)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, COALESCE($17, false), $18, COALESCE($19, false), COALESCE($20, false)) RETURNING id`,
                [randomUUID(), company.rows[0].id, body.tagline, body.stage, body.fundingStage, body.foundedYear, body.founders, body.headquarters, body.workLocations, body.remoteAvailability, body.companySize, body.linkedInUrl, body.technologiesUsed, body.fundingInformation, body.benefits, body.cultureInformation, body.referralAvailability, body.hiringStatus, body.published, body.featured]
              );
              await client.query("COMMIT");
              const result = await pool.query(`${definition.select} WHERE sp.id = $1`, [startup.rows[0].id]);
              return ok(res, result.rows[0], 201);
            } catch (error) {
              await client.query("ROLLBACK");
              throw error;
            } finally {
              client.release();
            }
          }
          const entries = Object.entries(definition.columns).filter(([key]) => body[key] !== undefined);
          if (!entries.length) return fail(res, 400, "VALIDATION_ERROR", "At least one supported field is required.");
          const columns = ["id", ...entries.map(([, column]) => column)];
          const values = [randomUUID(), ...entries.map(([key]) => body[key])];
          const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
          const result = await pool.query(`INSERT INTO ${definition.table} (${columns.join(", ")}) VALUES (${placeholders}) RETURNING *`, values);
          return ok(res, result.rows[0], 201);
        }
        if (!usingFallback) return fail(res, 503, "DATABASE_UNAVAILABLE", "PostgreSQL is required.");
        const item = { ...body, id: body.id || `${resource}-${Date.now()}`, createdAt: new Date().toISOString() };
        memory[definition.fallback].unshift(item);
        return ok(res, item, 201, { fallback: true });
      } catch (error) { return next(error); }
    });

    app.patch(`/api/${resource}/:id`, ...admin, async (req, res, next) => {
      try {
        const entries = Object.entries(definition.columns).filter(([key]) => req.body?.[key] !== undefined);
        if (!entries.length) return fail(res, 400, "VALIDATION_ERROR", "At least one supported field is required.");
        if (pool) {
          if (resource === "startups") {
            const profileFields = entries.filter(([, column]) => !["name", "website", "careers_link", "description"].includes(column));
            const companyFields = entries.filter(([, column]) => ["name", "website", "careers_link", "description"].includes(column));
            const client = await pool.connect();
            try {
              await client.query("BEGIN");
              if (profileFields.length) {
                const values = profileFields.map(([key]) => req.body[key] === "" ? null : req.body[key]);
                const assignments = profileFields.map(([, column], index) => `${column} = $${index + 1}`).join(", ");
                values.push(req.params.id);
                await client.query(`UPDATE startup_profiles SET ${assignments} WHERE id = $${values.length}`, values);
              }
              if (companyFields.length) {
                const values = companyFields.map(([key]) => req.body[key] === "" ? null : req.body[key]);
                const assignments = companyFields.map(([, column], index) => `${column} = $${index + 1}`).join(", ");
                values.push(req.params.id);
                await client.query(`UPDATE companies SET ${assignments} WHERE id = (SELECT company_id FROM startup_profiles WHERE id = $${values.length})`, values);
              }
              const result = await client.query(`${definition.select} WHERE sp.id = $1`, [req.params.id]);
              await client.query("COMMIT");
              return result.rows[0] ? ok(res, result.rows[0]) : fail(res, 404, "NOT_FOUND", "startups record was not found.");
            } catch (error) {
              await client.query("ROLLBACK");
              throw error;
            } finally {
              client.release();
            }
          }
          const values = entries.map(([key]) => req.body[key]);
          const assignments = entries.map(([, column], index) => `${column} = $${index + 1}`).join(", ");
          values.push(req.params.id);
          const result = await pool.query(`UPDATE ${definition.table} SET ${assignments} WHERE id = $${values.length} RETURNING *`, values);
          return result.rows[0] ? ok(res, result.rows[0]) : fail(res, 404, "NOT_FOUND", `${resource} record was not found.`);
        }
        if (!usingFallback) return fail(res, 503, "DATABASE_UNAVAILABLE", "PostgreSQL is required.");
        const index = memory[definition.fallback].findIndex((record) => record.id === req.params.id);
        if (index < 0) return fail(res, 404, "NOT_FOUND", `${resource} record was not found.`);
        memory[definition.fallback][index] = { ...memory[definition.fallback][index], ...req.body };
        return ok(res, memory[definition.fallback][index], 200, { fallback: true });
      } catch (error) { return next(error); }
    });

    app.delete(`/api/${resource}/:id`, ...admin, async (req, res, next) => {
      try {
        if (pool) {
          if (resource === "startups") {
            const result = await pool.query("DELETE FROM startup_profiles WHERE id = $1 RETURNING id", [req.params.id]);
            return result.rows[0] ? ok(res, { id: result.rows[0].id }) : fail(res, 404, "NOT_FOUND", "startups record was not found.");
          }
          const result = await pool.query(`DELETE FROM ${definition.table} WHERE id = $1 RETURNING id`, [req.params.id]);
          return result.rows[0] ? ok(res, { id: result.rows[0].id }) : fail(res, 404, "NOT_FOUND", `${resource} record was not found.`);
        }
        if (!usingFallback) return fail(res, 503, "DATABASE_UNAVAILABLE", "PostgreSQL is required.");
        const before = memory[definition.fallback].length;
        memory[definition.fallback] = memory[definition.fallback].filter((record) => record.id !== req.params.id);
        return memory[definition.fallback].length < before ? ok(res, { id: req.params.id }, 200, { fallback: true }) : fail(res, 404, "NOT_FOUND", `${resource} record was not found.`);
      } catch (error) { return next(error); }
    });
  }

  app.post("/api/ai/startup-search", async (req, res, next) => {
    try {
      const question = String(req.body?.question || "").trim();
      if (!question) return fail(res, 400, "VALIDATION_ERROR", "question is required.");
      const lower = question.toLowerCase();
      const filters = { industry: ["ai", "saas", "data", "cloud"].find((item) => lower.includes(item)) || null, skills: ["react", "java", "python", "sql", "aws"].filter((skill) => lower.includes(skill)), location: ["bengaluru", "hyderabad", "remote"].find((item) => lower.includes(item)) || null };
      const starts = usingFallback ? memory.startups : (pool ? (await pool.query(`${entityConfig.startups.select} WHERE sp.published = true`)).rows : []);
      const results = starts.filter((startup) => {
        const haystack = [startup.industry, startup.workLocations, startup.technologiesUsed].join(" ").toLowerCase();
        return (!filters.industry || haystack.includes(filters.industry)) && (!filters.location || haystack.includes(filters.location)) && filters.skills.every((skill) => haystack.includes(skill));
      });
      return ok(res, { provider: config.AI_PROVIDER, filters, startups: results, note: "Results are retrieved from platform records only; the AI layer does not invent listings." }, 200, { fallback: usingFallback });
    } catch (error) { return next(error); }
  });

  app.use((error, _req, res, _next) => {
    if (error?.type === "entity.parse.failed") return fail(res, 400, "INVALID_JSON", "Request body must contain valid JSON.");
    if (error?.code === "23505") return fail(res, 409, "CONFLICT", "A record with the same unique value already exists.");
    if (error?.code === "22P02") return fail(res, 400, "INVALID_ID", "The record identifier is invalid.");
    console.error(error);
    return fail(res, 500, "INTERNAL_ERROR", "An unexpected server error occurred.");
  });
  return app;
}
