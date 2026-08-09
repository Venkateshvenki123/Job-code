# Migration 001: Initial Job Portal schema

Apply `database/schema.sql` to create the base collections/tables:
Users, Admins, Jobs, Internships, Courses, Resources, Companies, Contact Messages, Testimonials, Categories, Roles, Applications, Interview Schedules, Interview Feedback, Interview Questions, Interview Experiences, Notifications, and Activity Logs.

The current frontend implementation uses localStorage as an in-browser data adapter for demo/admin/RMS CRUD. The schema is ready for replacing that adapter with a real API-backed database shared by public web, Admin, HR, Hiring Manager, Candidate, and mobile clients.
