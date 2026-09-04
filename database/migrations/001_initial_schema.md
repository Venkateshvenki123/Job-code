# Migration 001: Initial Job Portal schema

Apply `database/schema.sql` to create the base collections/tables:
Users, Admins, Companies, Startup Profiles, Startup Categories, Jobs, Internships, Courses, Resources, Contact Messages, Testimonials, Categories, Roles, Applications, Candidate Profiles, Candidate Skills, Job Skills, Referrers, Referral Requests, Referral Status History, Interview Schedules, Interview Feedback, Interview Questions, Interview Experiences, Notifications, Activity Logs, AI Search History, and AI Recommendations.

The current frontend implementation uses localStorage as an in-browser data adapter for demo/admin/RMS/startup/referral CRUD. The schema is ready for replacing that adapter with a real API-backed PostgreSQL database shared by public web, Admin, HR, Hiring Manager, Candidate, Referrer, AI services, and mobile clients.

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
