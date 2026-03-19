-- PRISM HK — Supabase Setup
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sheet_row_id INTEGER UNIQUE NOT NULL,
  status TEXT DEFAULT 'Draft',
  name_en TEXT NOT NULL,
  name_zh TEXT,
  category TEXT DEFAULT 'Other',
  tags TEXT[] DEFAULT '{}',
  price TEXT,
  district_en TEXT,
  district_zh TEXT,
  region TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  hours TEXT,
  website TEXT,
  facebook TEXT,
  instagram TEXT,
  linkedin TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  description_en TEXT,
  description_zh TEXT,
  verified BOOLEAN DEFAULT FALSE,
  last_checked TEXT,
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_district ON listings(district_en);
CREATE INDEX IF NOT EXISTS idx_listings_sheet_row ON listings(sheet_row_id);

-- Sync log table
CREATE TABLE IF NOT EXISTS sync_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  rows_processed INTEGER,
  rows_upserted INTEGER,
  errors JSONB,
  duration_ms INTEGER
);

-- RLS policies (allow public read, service key for writes)
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_log ENABLE ROW LEVEL SECURITY;

-- Public can read published listings
CREATE POLICY "Public can read published listings"
  ON listings
  FOR SELECT
  USING (status = 'Published');

-- Service role can do everything
CREATE POLICY "Service role full access to listings"
  ON listings
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to sync_log"
  ON sync_log
  FOR ALL
  USING (auth.role() = 'service_role');
