-- ============================================================
-- DOPAZON — close the my_savings view hole (Supabase advisor: Critical)
-- Supabase SQL Editor -> paste -> Run.  Safe to re-run.
--
-- A Postgres view runs with its OWNER's rights by default, so RLS on
-- the underlying table is checked against the owner, not the caller.
-- my_savings aggregates orders for every user, so anyone (even signed
-- out) could read every user's order count and total saved. No data
-- leaked: the orders table is still empty. Nothing on the site reads
-- this view; it was added as a convenience.
-- ============================================================

-- Evaluate RLS as the person querying: each user sees only their own row.
ALTER VIEW IF EXISTS public.my_savings SET (security_invoker = true);

-- Signed-out visitors have no savings to read.
REVOKE ALL ON public.my_savings FROM anon;
GRANT SELECT ON public.my_savings TO authenticated;

-- Verify (should return: security_invoker=true):
--   SELECT relname, reloptions FROM pg_class WHERE relname = 'my_savings';
