# Migration 001: Initial Job Portal schema

Apply `database/schema.sql` to create the base collections/tables:
Users, Admins, Jobs, Internships, Courses, Resources, Companies, Contact Messages, Testimonials, and Categories.

The current frontend implementation uses localStorage as an in-browser data adapter for demo/admin CRUD. The schema is ready for replacing that adapter with a real API-backed database.