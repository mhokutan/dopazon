-- ============================================================
-- DOPAZON — lock down SECURITY DEFINER functions, add size limits
-- Safe to re-run (needs setup.sql's policies). Applied 2026-10-12
-- via the Supabase MCP.
--
-- Only privileges, policies and CHECK constraints change here. No
-- existing row is modified. Every CHECK was compared to the live data
-- first (max lengths on 2026-10-12: product title 77, description 222,
-- emoji 2, img 71, store name 17, tagline 35, profile name 8; all
-- product images on images.unsplash.com; confessions, feedback,
-- suggestions, orders, wishlist empty). VALIDATE would abort the whole
-- transaction if any existing row failed.
--
-- 1. handle_new_user() is the auth.users trigger. Nobody needs to call
--    it over /rest/v1/rpc. Triggers do not check EXECUTE, so revoking
--    it keeps sign-up working.
-- 2. like/same counters: anon (and PUBLIC) could call the
--    SECURITY DEFINER RPCs in a loop. Signed-in users only now.
-- 3. confessions_insert: the client could insert likes/sames of any
--    size and pin itself to the top. New rows must start at 0.
--    suggestions: votes must start at 1.
-- 4. Text and JSON size limits so anon inserts (feedback, suggestions,
--    confessions) cannot fill the database, plus emoji/icon length as a
--    second line behind escHtml (the emoji XSS in product.html).
-- ============================================================

BEGIN;
SET LOCAL lock_timeout = '5s';

-- ---------- 1 + 2. function privileges ----------------------
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.increment_likes(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.decrement_likes(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.increment_sames(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.decrement_sames(uuid) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.increment_likes(uuid) TO authenticated;
GRANT  EXECUTE ON FUNCTION public.decrement_likes(uuid) TO authenticated;
GRANT  EXECUTE ON FUNCTION public.increment_sames(uuid) TO authenticated;
GRANT  EXECUTE ON FUNCTION public.decrement_sames(uuid) TO authenticated;

-- ---------- 3. insert policies -------------------------------
-- ALTER (not DROP + CREATE): both policies exist since setup.sql, and
-- the Supabase MCP hangs on DROP POLICY waiting for a confirmation.
ALTER POLICY "confessions_insert" ON public.confessions
  WITH CHECK (
    (user_id IS NULL OR (SELECT auth.uid()) = user_id)
    AND coalesce(likes, 0) = 0
    AND coalesce(sames, 0) = 0
  );

ALTER POLICY "anon insert suggestions" ON public.suggestions
  WITH CHECK (coalesce(votes, 1) = 1);

-- ---------- 4. size limits ----------------------------------
ALTER TABLE public.feedback DROP CONSTRAINT IF EXISTS feedback_size_check;
ALTER TABLE public.feedback ADD CONSTRAINT feedback_size_check CHECK (
  char_length(message) <= 2000 AND char_length(coalesce(page, '')) <= 200
) NOT VALID;
ALTER TABLE public.feedback VALIDATE CONSTRAINT feedback_size_check;

ALTER TABLE public.suggestions DROP CONSTRAINT IF EXISTS suggestions_size_check;
ALTER TABLE public.suggestions ADD CONSTRAINT suggestions_size_check CHECK (
  char_length(product_name) <= 120
  AND char_length(coalesce(category, '')) <= 40
  AND char_length(coalesce(reason, '')) <= 1000
) NOT VALID;
ALTER TABLE public.suggestions VALIDATE CONSTRAINT suggestions_size_check;

ALTER TABLE public.confessions DROP CONSTRAINT IF EXISTS confessions_size_check;
ALTER TABLE public.confessions ADD CONSTRAINT confessions_size_check CHECK (
  char_length(item) <= 120
  AND char_length(coalesce(story, '')) <= 1000
  AND char_length(coalesce(username, '')) <= 60
  AND char_length(coalesce(mood, '')) <= 16
  AND char_length(coalesce(category, '')) <= 40
  AND amount BETWEEN 1 AND 10000000
) NOT VALID;
ALTER TABLE public.confessions VALIDATE CONSTRAINT confessions_size_check;

ALTER TABLE public.stores DROP CONSTRAINT IF EXISTS stores_size_check;
ALTER TABLE public.stores ADD CONSTRAINT stores_size_check CHECK (
  char_length(name) <= 60
  AND char_length(coalesce(tagline, '')) <= 140
  AND char_length(coalesce(icon, '')) <= 16
) NOT VALID;
ALTER TABLE public.stores VALIDATE CONSTRAINT stores_size_check;

ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_size_check;
ALTER TABLE public.products ADD CONSTRAINT products_size_check CHECK (
  char_length(title) <= 200
  AND char_length(coalesce(description, '')) <= 2000
  AND char_length(coalesce(emoji, '')) <= 16
  AND char_length(coalesce(category, '')) <= 40
  AND char_length(coalesce(store_name, '')) <= 80
  AND (img IS NULL OR (char_length(img) <= 500 AND img ~ '^https://images\.unsplash\.com/'))
  AND price BETWEEN 0 AND 10000000
  AND coalesce(stars, 0) BETWEEN 0 AND 5
  AND coalesce(reviews, 0) BETWEEN 0 AND 1000000
) NOT VALID;
ALTER TABLE public.products VALIDATE CONSTRAINT products_size_check;

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_size_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_size_check CHECK (
  char_length(coalesce(name, '')) <= 80
) NOT VALID;
ALTER TABLE public.profiles VALIDATE CONSTRAINT profiles_size_check;

ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_size_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_size_check CHECK (
  saved BETWEEN 0 AND 1000000000
  AND char_length(coalesce(ref, '')) <= 40
  AND pg_column_size(items) <= 65536
) NOT VALID;
ALTER TABLE public.orders VALIDATE CONSTRAINT orders_size_check;

ALTER TABLE public.wishlist DROP CONSTRAINT IF EXISTS wishlist_size_check;
ALTER TABLE public.wishlist ADD CONSTRAINT wishlist_size_check CHECK (
  char_length(product_id) <= 64
  AND pg_column_size(item) <= 16384
) NOT VALID;
ALTER TABLE public.wishlist VALIDATE CONSTRAINT wishlist_size_check;

COMMIT;

-- Verify:
--   SELECT proname, proacl FROM pg_proc WHERE pronamespace = 'public'::regnamespace;
--   SELECT conrelid::regclass, conname FROM pg_constraint
--    WHERE contype = 'c' AND conname LIKE '%_size_check';
--   Then run the Supabase security advisor.
