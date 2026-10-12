-- ============================================================
-- DOPAZON - take real brand names out of seeded product titles
-- Safe to re-run. Applied 2026-10-12 via the Supabase MCP.
--
-- seed_products.mjs built titles from brand-like names (BeatsPro,
-- EchoMini, ProMax, KitchenAid Clone, NerfClone, AirMax...) and specs
-- naming real products (Instant Pot, LEGO Set, Kindle E-Reader, Works with
-- Alexa, Google Home, Apple Pencil Support, For PS/Xbox/PC). The template
-- is fixed in seed_products.mjs; this rewrites the seeded rows already in
-- the table. Only user_id IS NULL rows; once run, nothing matches again.
-- ============================================================

BEGIN;
SET LOCAL lock_timeout = '5s';

UPDATE public.products
SET title = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(title, 'BeatsPro', 'ThumpPro'), 'EchoMini', 'HumMini'), 'EchoDrive', 'HumDrive'), 'SwitchPro', 'PadPro'), 'Intel Core i7', '8-Core CPU'), 'Apple Pencil Support', 'Stylus Support'), 'Works with Alexa', 'Voice Assistant Ready'), 'Google Home', 'Smart Home Ready'), 'KitchenAid Clone', 'KitchenCraft'), 'Instant Pot', 'Multi-Cooker'), 'VitaMix Clone', 'VitaBlend'), 'LEGO Set', 'Building Brick Set'), 'NerfClone', 'FoamStrike'), 'Nerf-Style Blaster', 'Foam Dart Blaster'), 'For PS/Xbox/PC', 'For All Consoles & PC'), 'Kindle E-Reader', 'E-Ink Reader'), 'ProMax', 'MaxCore'), 'AirMax', 'AeroFlow'),
    description = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(description, 'BeatsPro', 'ThumpPro'), 'EchoMini', 'HumMini'), 'EchoDrive', 'HumDrive'), 'SwitchPro', 'PadPro'), 'Intel Core i7', '8-Core CPU'), 'Apple Pencil Support', 'Stylus Support'), 'Works with Alexa', 'Voice Assistant Ready'), 'Google Home', 'Smart Home Ready'), 'KitchenAid Clone', 'KitchenCraft'), 'Instant Pot', 'Multi-Cooker'), 'VitaMix Clone', 'VitaBlend'), 'LEGO Set', 'Building Brick Set'), 'NerfClone', 'FoamStrike'), 'Nerf-Style Blaster', 'Foam Dart Blaster'), 'For PS/Xbox/PC', 'For All Consoles & PC'), 'Kindle E-Reader', 'E-Ink Reader'), 'ProMax', 'MaxCore'), 'AirMax', 'AeroFlow')
WHERE user_id IS NULL
  AND (title ~ 'BeatsPro|EchoMini|EchoDrive|SwitchPro|Intel\ Core\ i7|Apple\ Pencil\ Support|Works\ with\ Alexa|Google\ Home|KitchenAid\ Clone|Instant\ Pot|VitaMix\ Clone|LEGO\ Set|NerfClone|Nerf\-Style\ Blaster|For\ PS/Xbox/PC|Kindle\ E\-Reader|ProMax|AirMax' OR coalesce(description, '') ~ 'BeatsPro|EchoMini|EchoDrive|SwitchPro|Intel\ Core\ i7|Apple\ Pencil\ Support|Works\ with\ Alexa|Google\ Home|KitchenAid\ Clone|Instant\ Pot|VitaMix\ Clone|LEGO\ Set|NerfClone|Nerf\-Style\ Blaster|For\ PS/Xbox/PC|Kindle\ E\-Reader|ProMax|AirMax');

COMMIT;
