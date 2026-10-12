# Dopazon — project memory for Claude

Dopazon (https://www.dopazon.com) is a parody shopping site: you browse, add to
cart and "buy" for $0, satisfying the urge without spending. Revenue comes from
Amazon affiliate links (tag `dopazon-20`) shown when a user says they would buy
the real thing. The owner speaks Turkish — reply in Turkish; code, comments and
commit messages stay in English.

## Stack (no build step)

- Static HTML + vanilla JS, served by **Vercel**. Every push to `main`
  auto-deploys to production in ~30s. There is no staging.
- `vercel.json`: clean-URL rewrites (`/shop`, `/product`, `/account`, ...) and
  security headers including a strict **CSP**.
- **Supabase** (project ref `jtsifootrchbsgrldfxk`): Auth (email + password,
  email confirmation ON), Postgres with RLS, accessed from the browser with
  `@supabase/supabase-js@2` from jsDelivr and the public anon key.
- Google Analytics `G-D7NNBGKNB3` on every page.
- Local preview: `npx serve -p 5500 .` (note: `serve` strips `.html` and drops
  the query string on redirect — open `/product?id=s1`, not `/product.html?id=s1`).

## Files that matter

| File | Role |
|---|---|
| `shared.js` | Supabase URL + anon key, `escHtml`, `imgFallback`, toast/confetti, feedback widget |
| `catalog.js` | **The only product catalogue.** `DZ_CATALOG` (297 hand-written products, 20 departments), `DZ_DETAILS` (long copy), `DZ_PRODUCTS` (merged), `dzFindProduct(id)` |
| `dzstore.js` | User data layer `DZ`: localStorage when signed out, Supabase when signed in, one-time guest→account merge on first sign-in. Orders, wishlist, streak, `savingsSummary()` |
| `index.html` / `shop.html` / `product.html` | Home, grid (48 per page, paginated), detail. All three read `catalog.js` |
| `account.html` / `orders.html` / `wishlist.html` | Account area; account leads with "money you did not spend" |
| `drops.html` | 5 daily drops + streak (streak persisted via `DZ.checkInStreak`) |
| `confessions.html` | Community "almost bought" feed (currently empty) |
| `dopa*.html` | 11 parody service pages (DopaFood, DopaCar, ...) |
| `seed_products.mjs` | Seeds 1000 DB products. Needs `SUPABASE_SERVICE_KEY` from env |
| `*.sql` | Migrations, applied by hand so far (see below) |

## Database

Tables: `products` (1000 seeded rows with `user_id IS NULL` + user-created rows),
`stores`, `profiles` (+ `streak`, `last_drop`), `confessions`, `suggestions`,
`feedback`, `orders`, `wishlist`; view `my_savings`.

RLS model — keep it this way:
- Public read: `products`, `stores`, `profiles`, `confessions`, `suggestions`.
- Owner-only write: `products`/`stores` (`auth.uid() = user_id`), `profiles` (`= id`).
- **Strictly private**: `orders`, `wishlist` (select/insert/delete only own rows).
- `feedback` is **write-only** for anon — nobody can read it through the API,
  including you with the anon key. Read it with the DB connection or the dashboard.
- Like/same counters change only through SECURITY DEFINER RPCs; there is no
  UPDATE policy on `confessions` on purpose.

SQL history (all already applied in production): `setup.sql` (consolidated
schema + RLS), `add_user_data.sql` (orders, wishlist, streak),
`fix_product_images.sql`, `fix_trademarks.sql`. `supabase_schema.sql` and
`feedback_schema.sql` are deprecated stubs — do not run them.

## Rules learned the hard way

1. **One catalogue.** Never create a second product list in a page. It has
   happened twice (product.html knew 12 of 85 products; index.html kept its own
   copy and still showed Nike/Gucci after the shop was cleaned). Import `catalog.js`.
2. **Brand audit every image at full size.** No recognisable brands or logos
   in product photos or titles (Nike, Apple, Gucci, LEGO, PS5, Xbox, Sony, JBL,
   DeWalt, Chanel, car makes...). Logos are invisible in small thumbnails — a
   "clean" pick at 145px turned out to be a Nike Air Max. Render candidates as
   contact sheets at ≥200px and read them; verify every URL loads (Unsplash IDs
   404 often). User-facing names also go through the `TRADEMARKS` list in `shop.html`.
3. **XSS:** every DB value goes through `escHtml`. Never put user data inside
   inline JS (`onclick="f('${x}')"`) — use `data-*` attributes, index lookups,
   and `imgFallback(this)` with `data-emoji`.
4. **`products.id` is a uuid; seed ids are strings** (`s1`, `sf3`, `p042`).
   Never pass a seed id into a uuid filter (`.eq/.neq('id', ...)`) — Postgres
   rejects the whole query (22P02). Check with a uuid regex first.
5. **CSP:** any new external host (API, CDN, image source, analytics endpoint)
   must be added to `vercel.json` or it silently fails in production. GA was
   dropped for a while because `analytics.google.com` was missing.
6. **PostgREST returns 204 on PATCH/DELETE even when RLS matched 0 rows.**
   Verify writes with `Prefer: return=representation` or a re-read.
7. **No broad deletes.** `rm -f a*.html` once deleted `account.html` and
   `git add -A` shipped the deletion. Put scratch files in the scratchpad or in
   the `.gitignore`d patterns, and read `git status` before committing.
8. **Secrets never in the repo.** The service_role key bypasses RLS. It was
   committed once (history: c2e935e, removed in cd956dc) — treat that key as
   burned. Read secrets from environment variables only; keep `.env` ignored.
   **Revoking it is not one click.** On Supabase's legacy keys, anon and
   service_role are both JWTs signed by the same JWT secret: rotating that
   secret also kills the anon key hardcoded in `shared.js` (site down) and
   signs every user out. Safe order: (1) switch `shared.js` to the new
   publishable key `sb_publishable_...`, deploy, verify login + shop work;
   (2) create a new secret key `sb_secret_...` for scripts; (3) only then
   disable the legacy API keys. Never rotate the JWT secret as a shortcut.
9. **Real users exist.** ~9 signups, one active user ("Thomas", store
   "Plum Fingerboards"). Never delete or rewrite real user rows without the
   owner's explicit approval; seeded rows are `user_id IS NULL`.
10. **Screenshots after scrolling can come back blank** in the preview browser.
    Verify with DOM queries, not only screenshots.

## How to verify a change

1. Local: `npx serve -p 5500 .`, open the page, check the console is clean.
2. After pushing: poll the live site until the new file is served
   (`curl -s https://www.dopazon.com/<file>?cb=$RANDOM`), then check in a browser.
3. DB changes: re-read through the REST API with the anon key to confirm both
   the data and that RLS still blocks what it should (anon read of `orders`
   must return `[]`, anon insert must return 401).

## Applying SQL

If `SUPABASE_DB_URL` is set, apply migrations yourself with `psql` inside a
transaction, then verify. Otherwise write the migration as a new `.sql` file,
explain it, and ask the owner to run it in the Supabase SQL editor. New
migrations must be idempotent (`IF NOT EXISTS`, `DROP POLICY IF EXISTS`).

## Commit style

Imperative subject (`fix:` / `feat:` / `perf:`), body explains why and what
was verified. Small focused commits.

## Current state (2026-10-12)

- Live and healthy. 297 catalogue products + 1000 seeded DB products, all with
  verified Unsplash photos. Shop paginated. Account/orders/wishlist work.
- Signed-in sync (`dzstore.js` + `orders`/`wishlist` tables) is deployed but
  has **not** been tested end to end with a real signed-in session.
- Traffic: no new signup since 2026-08-23. On 2026-10-07 Thomas came back and
  created a **duplicate** "Plum Fingerboards" store just to fix a typo in its
  tagline — the site has no way to view or edit your own store.

## Roadmap (in priority order)

1. **My Store page** — view/edit your store (name, tagline, icon), add/edit/
   delete your products, delete the store. Then, with owner approval, merge
   Thomas's two stores.
2. **Test the signed-in flow** end to end (owner provides a test account):
   order → account total → second browser shows the same total; guest history
   merges on first sign-in.
3. **Distribution** — shareable "money I did not spend" receipt image, share
   buttons, UTM-tagged links. The product works; nobody is arriving.
4. **"I almost bought this"** — user types a product (name, price, optional
   link) → Dopazon creates a fake product page for it → records the saving →
   affiliate link to the real item. Removes the catalogue/brand problem.
5. Brand audit of the ~348 photos used by DB products (electronics, gaming,
   automotive are the risky pools) and of the 4 hero + 2 banner images.
6. Confessions is empty — seed it with clearly-labelled examples or hide it.
7. One-question feedback prompt right after checkout.
8. Move the root `*.sql` files into an ordered `supabase/migrations/` folder.
