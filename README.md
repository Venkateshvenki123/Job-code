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

## Build

```bash
cd frontend
npm run build
```

## Admin Login

Demo credentials:

- Username/email: `admin@newwebsite.dev`
- Password: `cyber-admin`

The current demo stores admin session, portal data, RMS records, and approval workflows in browser storage. For production, connect the data adapter to the Node API and database using the schema in `database/schema.sql`.

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
frontend/src/data        Seed data and local data adapter
frontend/src/pages       Public route pages
database/               SQL schema and migration notes
backend-node/            Node API starter
backend-python/          Python API starter
backend-java/            Java API starter
```

## Deployment

1. Set environment variables from `.env.example`.
2. Build the frontend with `npm run build`.
3. Serve `frontend/dist` on your static host or deploy with your preferred platform.
4. Connect backend API and database for production persistence.
