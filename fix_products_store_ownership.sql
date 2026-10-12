-- ============================================================
-- DOPAZON — products may only point at the caller's own store
-- Supabase SQL Editor -> paste -> Run.  Safe to re-run.
--
-- products_insert / products_update (setup.sql) only check
-- auth.uid() = user_id. store_id was not checked, so a signed-in user
-- could insert or move one of their own products into SOMEONE ELSE's
-- store (e.g. Plum Fingerboards) and it would show up under that store.
--
-- New rule for INSERT and UPDATE: the row is yours AND store_id is
-- either NULL or a store you own. SELECT and DELETE are unchanged.
--
-- Existing data already passes: on 2026-10-12 only 2 products had a
-- store_id, both Thomas's, both pointing at his own stores. The rule
-- is only checked on new writes, so no existing row is touched.
-- ============================================================

BEGIN;

DROP POLICY IF EXISTS "products_insert" ON public.products;
CREATE POLICY "products_insert" ON public.products
  FOR INSERT
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND (
      products.store_id IS NULL
      OR EXISTS (
        SELECT 1 FROM public.stores s
        WHERE s.id = products.store_id
          AND s.user_id = (SELECT auth.uid())
      )
    )
  );

DROP POLICY IF EXISTS "products_update" ON public.products;
CREATE POLICY "products_update" ON public.products
  FOR UPDATE
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND (
      products.store_id IS NULL
      OR EXISTS (
        SELECT 1 FROM public.stores s
        WHERE s.id = products.store_id
          AND s.user_id = (SELECT auth.uid())
      )
    )
  );

COMMIT;

-- Verify (should list products_insert and products_update with the
-- store check in with_check):
--   SELECT policyname, cmd, qual, with_check
--   FROM pg_policies WHERE tablename = 'products' ORDER BY policyname;
