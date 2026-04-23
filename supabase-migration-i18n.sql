-- PRISM HK — add Simplified Chinese + bilingual address/featured columns
-- Run in Supabase SQL Editor after initial setup

ALTER TABLE listings
  ADD COLUMN IF NOT EXISTS name_zhHans TEXT,
  ADD COLUMN IF NOT EXISTS description_zhHans TEXT,
  ADD COLUMN IF NOT EXISTS district_zhHans TEXT,
  ADD COLUMN IF NOT EXISTS address_zh TEXT,
  ADD COLUMN IF NOT EXISTS address_zhHans TEXT,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_listings_featured ON listings(featured);
