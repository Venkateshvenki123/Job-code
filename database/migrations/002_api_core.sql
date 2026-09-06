CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  email VARCHAR(180) NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(40) NOT NULL DEFAULT 'candidate',
  profile JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (lower(email));

CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(180) NOT NULL,
  description TEXT,
  website TEXT,
  careers_link TEXT,
  industry VARCHAR(120),
  location VARCHAR(160),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS startup_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS startup_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  tagline VARCHAR(240),
  category_id UUID REFERENCES startup_categories(id),
  company_stage VARCHAR(120),
  funding_stage VARCHAR(120),
  founded_year INTEGER,
  founders TEXT,
  headquarters VARCHAR(180),
  work_locations TEXT,
  remote_availability VARCHAR(80),
  company_size VARCHAR(80),
  linkedin_url TEXT,
  technologies_used TEXT,
  funding_information TEXT,
  benefits TEXT,
  culture_information TEXT,
  referral_availability BOOLEAN NOT NULL DEFAULT false,
  hiring_status VARCHAR(120),
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  last_updated_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE SET NULL,
  company_name VARCHAR(180),
  company_logo TEXT,
  job_title VARCHAR(180) NOT NULL,
  department VARCHAR(120),
  location VARCHAR(160),
  salary VARCHAR(120),
  experience VARCHAR(120),
  employment_type VARCHAR(80),
  skills_required TEXT,
  job_description TEXT,
  responsibilities TEXT,
  qualifications TEXT,
  benefits TEXT,
  application_link TEXT,
  last_date DATE,
  expiry_date DATE,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE SET NULL,
  company VARCHAR(180),
  role VARCHAR(180) NOT NULL,
  duration VARCHAR(120),
  stipend VARCHAR(120),
  location VARCHAR(160),
  mode VARCHAR(40),
  eligibility TEXT,
  skills TEXT,
  apply_link TEXT,
  last_date DATE,
  expiry_date DATE,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_image TEXT,
  course_title VARCHAR(180) NOT NULL,
  instructor VARCHAR(180),
  duration VARCHAR(120),
  level VARCHAR(80),
  category VARCHAR(120),
  price VARCHAR(80),
  description TEXT,
  learning_outcomes TEXT,
  enroll_link TEXT,
  expiry_date DATE,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS referral_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES users(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE SET NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  internship_id UUID REFERENCES internships(id) ON DELETE SET NULL,
  opportunity_title VARCHAR(220),
  full_name VARCHAR(180) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(80),
  linkedin_profile TEXT,
  portfolio_github TEXT,
  resume_upload TEXT,
  current_location VARCHAR(180),
  experience VARCHAR(120),
  current_position VARCHAR(180),
  skills TEXT NOT NULL,
  suitability TEXT,
  additional_message TEXT,
  status VARCHAR(80) NOT NULL DEFAULT 'Submitted',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE jobs ADD COLUMN IF NOT EXISTS department VARCHAR(120);
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS benefits TEXT;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE internships ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS jobs_published_idx ON jobs (published, expiry_date);
CREATE INDEX IF NOT EXISTS internships_published_idx ON internships (published, expiry_date);
CREATE INDEX IF NOT EXISTS courses_published_idx ON courses (published, expiry_date);
CREATE INDEX IF NOT EXISTS referral_requests_status_idx ON referral_requests (status);
