-- Run in Supabase SQL Editor
-- https://supabase.com/dashboard/project/jtsifootrchbsgrldfxk/sql

-- Create tables
create table if not exists feedback (
  id uuid default gen_random_uuid() primary key,
  message text not null,
  page text default '/',
  rating integer check (rating between 1 and 5),
  created_at timestamptz default now()
);

create table if not exists suggestions (
  id uuid default gen_random_uuid() primary key,
  product_name text not null,
  category text,
  reason text,
  votes integer default 1,
  created_at timestamptz default now()
);

-- Enable RLS
alter table feedback enable row level security;
alter table suggestions enable row level security;

-- Drop old policies if they exist
drop policy if exists "Anyone can insert feedback" on feedback;
drop policy if exists "Anyone can insert suggestions" on suggestions;
drop policy if exists "Anyone can read suggestions" on suggestions;
drop policy if exists "Anyone can update suggestion votes" on suggestions;
drop policy if exists "anon insert feedback" on feedback;
drop policy if exists "anon insert suggestions" on suggestions;
drop policy if exists "anon read suggestions" on suggestions;
drop policy if exists "anon update suggestions" on suggestions;

-- Create correct policies
create policy "anon insert feedback" on feedback for insert to anon with check (true);
create policy "anon insert suggestions" on suggestions for insert to anon with check (true);
create policy "anon read suggestions" on suggestions for select to anon using (true);
create policy "anon update suggestions" on suggestions for update to anon using (true);
