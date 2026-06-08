-- ============================================================
-- DOPAZON — Supabase Database Setup
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. PROFILES (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile after signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. STORES
CREATE TABLE IF NOT EXISTS stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tagline TEXT DEFAULT 'Free everything, always',
  icon TEXT DEFAULT '🏪',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "stores_select" ON stores FOR SELECT USING (true);
CREATE POLICY "stores_insert" ON stores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "stores_update" ON stores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "stores_delete" ON stores FOR DELETE USING (auth.uid() = user_id);

-- 3. PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price INTEGER DEFAULT 99,
  category TEXT DEFAULT 'other',
  emoji TEXT DEFAULT '📦',
  stars FLOAT DEFAULT 4.5,
  reviews INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_select" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert" ON products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "products_update" ON products FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "products_delete" ON products FOR DELETE USING (auth.uid() = user_id);

-- 4. CONFESSIONS
CREATE TABLE IF NOT EXISTS confessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
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
CREATE POLICY "confessions_select" ON confessions FOR SELECT USING (true);
-- Allow both authenticated and anonymous inserts
CREATE POLICY "confessions_insert" ON confessions FOR INSERT WITH CHECK (true);
CREATE POLICY "confessions_update" ON confessions FOR UPDATE USING (true);

-- Increment functions (avoids race conditions on likes)
CREATE OR REPLACE FUNCTION increment_likes(confession_id UUID)
RETURNS VOID AS $$
  UPDATE confessions SET likes = likes + 1 WHERE id = confession_id;
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_likes(confession_id UUID)
RETURNS VOID AS $$
  UPDATE confessions SET likes = GREATEST(likes - 1, 0) WHERE id = confession_id;
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_sames(confession_id UUID)
RETURNS VOID AS $$
  UPDATE confessions SET sames = sames + 1 WHERE id = confession_id;
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_sames(confession_id UUID)
RETURNS VOID AS $$
  UPDATE confessions SET sames = GREATEST(sames - 1, 0) WHERE id = confession_id;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Done!
-- After running this script, go to Authentication → Settings
-- and enable "Email" provider if not already enabled.
