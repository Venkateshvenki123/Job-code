CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(180) NOT NULL,
  category VARCHAR(120),
  pdf_upload TEXT,
  video_link TEXT,
  external_link TEXT,
  description TEXT,
  thumbnail TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS resources_published_idx ON resources (published, created_at);
