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

CREATE TABLE roles (
  id UUID PRIMARY KEY,
  name VARCHAR(80) UNIQUE NOT NULL,
  permissions JSONB DEFAULT '[]'
);

CREATE TABLE applications (
  id UUID PRIMARY KEY,
  candidate_id UUID REFERENCES users(id),
  job_id UUID REFERENCES jobs(id),
  candidate_name VARCHAR(160),
  candidate_email VARCHAR(180),
  resume_url TEXT,
  stage VARCHAR(80) DEFAULT 'Applied',
  score VARCHAR(40),
  assigned_hr VARCHAR(160),
  hiring_manager VARCHAR(160),
  interview_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interview_schedules (
  id UUID PRIMARY KEY,
  application_id UUID REFERENCES applications(id),
  round VARCHAR(120),
  scheduled_at TIMESTAMP,
  mode VARCHAR(80),
  meeting_link TEXT,
  status VARCHAR(60) DEFAULT 'Scheduled'
);

CREATE TABLE interview_feedback (
  id UUID PRIMARY KEY,
  application_id UUID REFERENCES applications(id),
  reviewer_id UUID REFERENCES users(id),
  rating INTEGER,
  recommendation VARCHAR(80),
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interview_questions (
  id UUID PRIMARY KEY,
  company VARCHAR(180),
  role VARCHAR(180),
  technology VARCHAR(120),
  experience_level VARCHAR(80),
  department VARCHAR(120),
  question TEXT NOT NULL,
  answer TEXT,
  difficulty VARCHAR(60),
  tags TEXT,
  interview_round VARCHAR(120),
  asked_date DATE,
  notes TEXT,
  status VARCHAR(60) DEFAULT 'Pending',
  submitted_by VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interview_experiences (
  id UUID PRIMARY KEY,
  company_name VARCHAR(180),
  job_role VARCHAR(180),
  experience_level VARCHAR(80),
  interview_date DATE,
  location VARCHAR(160),
  interview_mode VARCHAR(80),
  rounds VARCHAR(40),
  questions_asked TEXT,
  coding_questions TEXT,
  hr_questions TEXT,
  technical_questions TEXT,
  overall_experience TEXT,
  difficulty_rating VARCHAR(60),
  tips TEXT,
  selection_result VARCHAR(80),
  anonymous BOOLEAN DEFAULT false,
  status VARCHAR(60) DEFAULT 'Pending',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  title VARCHAR(180),
  message TEXT,
  audience VARCHAR(180),
  status VARCHAR(60) DEFAULT 'Unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY,
  actor VARCHAR(160),
  action VARCHAR(180),
  entity VARCHAR(180),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
