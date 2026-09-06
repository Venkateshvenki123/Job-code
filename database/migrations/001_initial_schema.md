# Migration 001: Initial Job Portal schema

Apply `database/schema.sql` to create the base collections/tables:
Users, Admins, Companies, Startup Profiles, Startup Categories, Jobs, Internships, Courses, Resources, Contact Messages, Testimonials, Categories, Roles, Applications, Candidate Profiles, Candidate Skills, Job Skills, Referrers, Referral Requests, Referral Status History, Interview Schedules, Interview Feedback, Interview Questions, Interview Experiences, Notifications, Activity Logs, AI Search History, and AI Recommendations.

The Node API is the primary application data adapter. The frontend keeps only
theme preference in browser storage and loads core records through the API.
`DEV_FALLBACK=true` is an explicitly labeled, non-persistent development mode;
production deployments must use PostgreSQL.

Relationship model:

```text
companies
  -> startup_profiles
  -> jobs
  -> internships
  -> referral_requests

users
  -> candidate_profiles
  -> applications
  -> referral_requests
  -> ai_search_history
  -> ai_recommendations
```

AI modules must retrieve real database records first, then format or score results. They should not invent job, internship, startup, or referral records.
