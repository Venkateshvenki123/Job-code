-- Job Portal database schema reference
-- Intended for PostgreSQL or any SQL database with small type adjustments.

CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(40) DEFAULT 'student',
  profile JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  role VARCHAR(60) NOT NULL,
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE companies (
  id UUID PRIMARY KEY,
  logo TEXT,
  name VARCHAR(180) NOT NULL,
  description TEXT,
  website TEXT,
  careers_link TEXT,
  industry VARCHAR(120),
  location VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  company_logo TEXT,
  company_name VARCHAR(180),
  job_title VARCHAR(180) NOT NULL,
  location VARCHAR(160),
  salary VARCHAR(120),
  experience VARCHAR(120),
  employment_type VARCHAR(80),
  skills_required TEXT,
  job_description TEXT,
  responsibilities TEXT,
  qualifications TEXT,
  application_link TEXT,
  last_date DATE,
  expiry_date DATE,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE internships (
  id UUID PRIMARY KEY,
  company VARCHAR(180),
  role VARCHAR(180),
  duration VARCHAR(120),
  stipend VARCHAR(120),
  location VARCHAR(160),
  mode VARCHAR(40),
  eligibility TEXT,
  skills TEXT,
  apply_link TEXT,
  last_date DATE,
  expiry_date DATE,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id UUID PRIMARY KEY,
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
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
  id UUID PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  category VARCHAR(120),
  pdf_upload TEXT,
  video_link TEXT,
  external_link TEXT,
  description TEXT,
  thumbnail TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY,
  name VARCHAR(160),
  email VARCHAR(180),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY,
  name VARCHAR(160),
  role VARCHAR(160),
  quote TEXT,
  published BOOLEAN DEFAULT true
);

CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(120) UNIQUE NOT NULL,
  type VARCHAR(80)
);