-- ============================================================
-- DOPAZON — remove real trademarks from seeded product titles
-- (Supabase SQL Editor -> Run).  Safe to re-run.
--
-- The site already blocks trademarked names in user-submitted
-- stores/products (TRADEMARKS list in shop.html), but the 1000
-- seeded products were never run through that check. 13 of them
-- carry a real brand name.
--
-- "LEGO Set" is the risky group: it uses the mark as the product
-- noun for a non-LEGO product. The others ("For PS/Xbox/PC",
-- "Apple Pencil Support", "Google Home") are compatibility
-- references, but they are swapped for neutral wording too so the
-- catalogue is uniformly brand-free.
-- ============================================================

-- 8 products: "<Brand> LEGO Set — ..."  ->  "<Brand> Brick Set — ..."
UPDATE products
SET title = replace(title, 'LEGO Set', 'Brick Set')
WHERE title LIKE '%LEGO Set%';

-- 3 products: "For PS/Xbox/PC"  ->  "For All Major Consoles"
UPDATE products
SET title = replace(title, 'For PS/Xbox/PC', 'For All Major Consoles')
WHERE title LIKE '%Xbox%';

-- 1 product: "Apple Pencil Support"  ->  "Stylus Support"
UPDATE products
SET title = replace(title, 'Apple Pencil Support', 'Stylus Support')
WHERE title LIKE '%Apple Pencil%';

-- 1 product: "Google Home"  ->  "Smart Assistants"
UPDATE products
SET title = replace(title, 'Google Home', 'Smart Assistants')
WHERE title LIKE '%Google Home%';

-- Verify nothing is left:
--   SELECT title FROM products
--   WHERE title ILIKE '%lego%' OR title ILIKE '%xbox%'
--      OR title ILIKE '%apple%' OR title ILIKE '%google%';

-- ============================================================
-- Housekeeping: remove the row left behind by the RLS probe we
-- ran while verifying the security policies.
-- ============================================================
DELETE FROM confessions WHERE item = '__RLS_TEST__';
DELETE FROM suggestions WHERE product_name = 'Test' AND reason = 'Deneme';
