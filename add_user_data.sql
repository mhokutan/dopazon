-- ============================================================
-- DOPAZON — persist what the user actually cares about
-- Supabase SQL Editor -> paste -> Run.  Safe to re-run.
--
-- Until now the cart, orders, savings total, wishlist and drop
-- streak all lived in localStorage. That meant signing up bought
-- you nothing, and switching browser wiped your history — so the
-- site could never show the one number the whole idea rests on:
-- how much you have NOT spent.
--
-- These tables are strictly private: every policy is scoped to
-- auth.uid(), so a user can only ever see and write their own rows.
-- ============================================================

-- ------------------------------------------------------------
-- ORDERS — one row per "free order" placed at checkout
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ref        TEXT,                                   -- human-facing order number
  saved      INTEGER NOT NULL DEFAULT 0,             -- money not spent, in dollars
  items      JSONB   NOT NULL DEFAULT '[]'::JSONB,
  placed_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS orders_user_placed_idx ON orders (user_id, placed_at DESC);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS orders_select ON orders;
DROP POLICY IF EXISTS orders_insert ON orders;
DROP POLICY IF EXISTS orders_delete ON orders;
CREATE POLICY orders_select ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY orders_insert ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY orders_delete ON orders FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- WISHLIST — one row per saved product, unique per user
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id  TEXT NOT NULL,
  item        JSONB NOT NULL,
  added_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS wishlist_select ON wishlist;
DROP POLICY IF EXISTS wishlist_insert ON wishlist;
DROP POLICY IF EXISTS wishlist_delete ON wishlist;
CREATE POLICY wishlist_select ON wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY wishlist_insert ON wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY wishlist_delete ON wishlist FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- STREAK — lives on the profile, one row per user already
-- ------------------------------------------------------------
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS streak     INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_drop  DATE;

-- profiles is publicly readable (display names), so make sure a user
-- can only ever write their own row. Re-assert the policies here in
-- case this file is run against an older schema.
DROP POLICY IF EXISTS profiles_update ON profiles;
CREATE POLICY profiles_update ON profiles FOR UPDATE USING (auth.uid() = id);

-- ------------------------------------------------------------
-- Handy view of a user's lifetime numbers (respects RLS)
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW my_savings AS
SELECT
  user_id,
  COUNT(*)                                   AS order_count,
  COALESCE(SUM(saved), 0)                    AS total_saved,
  COALESCE(SUM(jsonb_array_length(items)), 0) AS item_count,
  MIN(placed_at)                             AS first_order_at
FROM orders
GROUP BY user_id;

-- Done. The site keeps using localStorage for signed-out visitors and
-- copies anything it finds up to these tables on first sign-in.
