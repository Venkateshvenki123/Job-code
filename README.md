# Job Portal Platform

A modern responsive educational and career platform built with React, React Router, Tailwind CSS, and an admin-managed content architecture.

## Features

- Sticky top navigation
- Dedicated pages: Home, Startups, Jobs, Internships, Courses, Resources, Companies, About, Contact
- Admin Login and protected Admin Dashboard
- Admin CRUD for Jobs, Internships, Courses, Resources, Learning Platforms, Study Materials, Certifications, Startups, Referrals, Companies, AI records, and Home Page Content
- Startup directory with searchable profiles, stages, locations, technologies, hiring status, open opportunities, and referral availability
- Startup profile pages connected to existing jobs, internships, referral requests, and interview experiences
- Smart referral form that auto-populates selected company, job, or internship context
- Candidate referral status tracking across Submitted, Under Review, Referral Available, Referred, Application Submitted, Interview, Selected, and Rejected
- AI Career Assistant UI for data-grounded startup discovery, job matching, course recommendations, certification recommendations, and interview preparation
- Node API starter endpoints for startups, referral statuses, and AI startup search with configurable provider environment variables
- RMS collections for Applications, Interview Questions, Interview Experiences, Notifications, and Activity Logs
- Role portal routes for Super Admin, Admin, HR, Hiring Manager, and Candidate workspaces
- Recruitment pipeline stages from Applied through Joined/Rejected
- Public Interview Question Bank with approval-based community submissions
- Public Interview Experiences page with approval-based candidate stories
- Publish/unpublish and featured controls
- Expiry date support with expired items hidden from public pages
- Search and filters for Jobs, Internships, Courses, and Resources
- Dark/light mode toggle
- Mobile hamburger menu
- Breadcrumb navigation
- Responsive card and table layouts
- Logout clears admin session and redirects to Login with success message

## Setup

```bash
cd frontend
npm install
npm run dev -- --port 5173
```

Open `http://127.0.0.1:5173`.

### Node API and PostgreSQL

Node is the primary backend; the Python and Java folders remain optional,
standalone prototypes and are not wired into the web application. Copy
`.env.example` to `.env`, configure a reachable
PostgreSQL database, then run:

```bash
npm install
npm run db:up
npm --workspace backend-node run migrate
npm --workspace backend-node run seed
npm --workspace backend-node start
```

`npm run db:up` requires Docker Desktop and uses the persistent
`careergrid-postgres` volume defined in `docker-compose.yml`. Set
`DB_PASSWORD` in the shell or `.env` before starting it.

Without PostgreSQL, data endpoints return `503` and `/api/health` reports the
backend and database status separately. For local UI work only, set
`DEV_FALLBACK=true`; responses are explicitly marked as non-persistent fallback data.

## Build

```bash
cd frontend
npm run build
```

## Admin Login

Run the seed command with `ADMIN_EMAIL` and either `ADMIN_PASSWORD_HASH` or
`ADMIN_PASSWORD`. The frontend authenticates against the Node API using JWT;
application data is loaded through the API. Only theme preference remains in
browser storage.

## RMS Routes

- `/interview-questions`
- `/interview-experiences`
- `/startups`
- `/startups/:startupId`
- `/referrals/new`
- `/ai-career-assistant`
- `/portal/super-admin`
- `/portal/admin`
- `/portal/hr`
- `/portal/manager`
- `/portal/candidate`

## Security Notes

Production security should include JWT authentication, bcrypt password hashing, role-based access control, server-side input validation, CSRF/XSS protections, secure headers, API authorization middleware, private resume upload handling, and scoped access for Admin, HR, Candidate, and Referrer roles. `.env.example` includes database, admin, and AI provider variables.

## AI Architecture

```text
Frontend
  -> Backend API
    -> PostgreSQL
    -> AI Service
      -> Smart Startup Search
      -> Job Matching
      -> Resume Analysis
      -> Referral Assistant
      -> Interview Preparation
```

AI features must query real database records before producing suggestions. Generated recommendations are advisory and must be clearly separated from verified job, internship, startup, referral, and interview records.

## Folder Structure

```text
frontend/src/admin       Admin auth, protected route, dashboard
frontend/src/components  Navbar/layout, cards, page headers
frontend/src/data        API client, hydration adapter, and UI seed types
frontend/src/pages       Public route pages
database/               SQL schema and migration notes
backend-node/            Node API starter
backend-python/          Python API starter
backend-java/            Java API starter
```

## Deployment

1. Set environment variables from `.env.example`.
2. Apply migrations and seed an administrator.
3. Build the frontend with `npm run build`.
4. Serve `frontend/dist` and the Node API behind TLS.
5. Verify PostgreSQL connectivity and persistence before calling the deployment production-ready.
