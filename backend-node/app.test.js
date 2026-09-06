import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./app.js";
import { hashPassword } from "./auth.js";

const config = {
  valid: true,
  fallback: true,
  databaseConfigured: false,
  JWT_SECRET: "development-test-secret-with-at-least-32-chars",
  JWT_EXPIRES_IN: "1h",
  corsOrigins: ["http://127.0.0.1:5173"],
  AI_PROVIDER: "disabled",
  ADMIN_EMAIL: "admin@test.local",
  ADMIN_PASSWORD_HASH: await hashPassword("test-password")
};

const server = createApp({ config }).listen(0);
const baseUrl = `http://127.0.0.1:${server.address().port}`;

test.after(() => server.close());

test("health identifies explicit development fallback", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.data.database.status, "not_configured");
  assert.equal(body.data.fallback, true);
});

test("register and login issue a JWT", async () => {
  const register = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Test Candidate", email: "candidate@test.local", password: "test-password" })
  });
  const registered = await register.json();
  assert.equal(register.status, 201);
  assert.ok(registered.data.token);

  const login = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "candidate@test.local", password: "test-password" })
  });
  const loggedIn = await login.json();
  assert.equal(login.status, 200);
  assert.equal(loggedIn.data.user.role, "candidate");
});

test("public records and referral writes use the API", async () => {
  const jobs = await fetch(`${baseUrl}/api/jobs`);
  const jobsBody = await jobs.json();
  assert.equal(jobs.status, 200);
  assert.ok(Array.isArray(jobsBody.data.jobs));

  const referral = await fetch(`${baseUrl}/api/referrals`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ fullName: "Test Candidate", email: "candidate@test.local", skills: "React", opportunityTitle: "Frontend role" })
  });
  assert.equal(referral.status, 201);
});

test("admin protected writes reject candidates", async () => {
  const login = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "candidate@test.local", password: "test-password" })
  });
  const token = (await login.json()).data.token;
  const response = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify({ jobTitle: "Not allowed" })
  });
  assert.equal(response.status, 403);
});
