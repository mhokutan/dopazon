-- ============================================================
-- DOPAZON — Consolidated Supabase Setup (idempotent / safe to re-run)
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
--
-- This script reconciles the two earlier, conflicting schemas
-- (setup.sql vs supabase_schema.sql). It does NOT drop the existing
-- `products` table or its rows — it only ADDS the missing ownership
-- columns. It also creates the tables the app needs but that were
-- never created in the live DB (profiles, stores, confessions) and
-- fixes the over-permissive Row Level Security policies.
-- ============================================================

-- ------------------------------------------------------------
-- 1. PROFILES (linked to auth.users)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select" ON profiles;
DROP POLICY IF EXISTS "profiles_insert" ON profiles;
DROP POLICY IF EXISTS "profiles_update" ON profiles;
-- Profiles are public to read (used to show display names) but a user
-- may only create/edit their OWN profile row.
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create a profile row right after signup.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ------------------------------------------------------------
-- 2. STORES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tagline TEXT DEFAULT 'Free everything, always',
  icon TEXT DEFAULT '🏪',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "stores_select" ON stores;
DROP POLICY IF EXISTS "stores_insert" ON stores;
DROP POLICY IF EXISTS "stores_update" ON stores;
DROP POLICY IF EXISTS "stores_delete" ON stores;
CREATE POLICY "stores_select" ON stores FOR SELECT USING (true);
CREATE POLICY "stores_insert" ON stores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "stores_update" ON stores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "stores_delete" ON stores FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 3. PRODUCTS
-- The table already exists in production with display columns
-- (img, description, store_name). We only ADD the ownership columns
-- the app writes to, so existing rows are preserved.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  price INTEGER NOT NULL DEFAULT 99,
  emoji TEXT DEFAULT '📦',
  img TEXT,
  stars NUMERIC(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 100,
  store_name TEXT DEFAULT 'Dopazon Store',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ADD COLUMN IF NOT EXISTS user_id  UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS store_id UUID REFERENCES stores(id)     ON DELETE CASCADE;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read products" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert" ON products;
DROP POLICY IF EXISTS "products_select" ON products;
DROP POLICY IF EXISTS "products_insert" ON products;
DROP POLICY IF EXISTS "products_update" ON products;
DROP POLICY IF EXISTS "products_delete" ON products;
-- Anyone can read; a logged-in user may only create/edit/delete products
-- they own. (Previously any authenticated user could insert with an
-- arbitrary author — tightened to auth.uid() = user_id.)
CREATE POLICY "products_select" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert" ON products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "products_update" ON products FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "products_delete" ON products FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 4. CONFESSIONS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS confessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  username TEXT DEFAULT 'Anonymous Shopper',
  item TEXT NOT NULL,
  amount INTEGER NOT NULL,
  category TEXT DEFAULT 'other',
  story TEXT,
  mood TEXT DEFAULT '😅',
  likes INTEGER DEFAULT 0,
  sames INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE confessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "confessions_select" ON confessions;
DROP POLICY IF EXISTS "confessions_insert" ON confessions;
DROP POLICY IF EXISTS "confessions_update" ON confessions;  -- remove the old, dangerous "USING (true)" update policy
-- Anyone (incl. anonymous) can read and post a confession, but the
-- attached user_id must be null or your own. There is intentionally
-- NO direct UPDATE policy: like/same counters are changed ONLY through
-- the SECURITY DEFINER functions below, so nobody can edit other
-- people's confessions or arbitrarily inflate counts.
CREATE POLICY "confessions_select" ON confessions FOR SELECT USING (true);
CREATE POLICY "confessions_insert" ON confessions FOR INSERT
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

CREATE OR REPLACE FUNCTION increment_likes(confession_id UUID)
RETURNS VOID AS $$
  UPDATE confessions SET likes = likes + 1 WHERE id = confession_id;
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION decrement_likes(confession_id UUID)
RETURNS VOID AS $$
  UPDATE confessions SET likes = GREATEST(likes - 1, 0) WHERE id = confession_id;
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION increment_sames(confession_id UUID)
RETURNS VOID AS $$
  UPDATE confessions SET sames = sames + 1 WHERE id = confession_id;
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION decrement_sames(confession_id UUID)
RETURNS VOID AS $$
  UPDATE confessions SET sames = GREATEST(sames - 1, 0) WHERE id = confession_id;
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

-- ------------------------------------------------------------
-- 5. FEEDBACK + SUGGESTIONS (feedback widget in shared.js)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  page TEXT DEFAULT '/',
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT,
  reason TEXT,
  votes INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon insert feedback" ON feedback;
DROP POLICY IF EXISTS "anon insert suggestions" ON suggestions;
DROP POLICY IF EXISTS "anon read suggestions" ON suggestions;
DROP POLICY IF EXISTS "anon update suggestions" ON suggestions;
-- Feedback is write-only for the public (no read policy = nobody can
-- read others' feedback via the anon key). Suggestions are public.
CREATE POLICY "anon insert feedback"     ON feedback    FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon insert suggestions"  ON suggestions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon read suggestions"    ON suggestions FOR SELECT TO anon, authenticated USING (true);

-- ------------------------------------------------------------
-- Done. After running this, go to Authentication → Providers
-- and make sure "Email" is enabled.
-- ------------------------------------------------------------
