-- Run in Supabase SQL Editor
-- https://supabase.com/dashboard/project/jtsifootrchbsgrldfxk/sql

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

alter table feedback enable row level security;
alter table suggestions enable row level security;

create policy "Anyone can insert feedback" on feedback for insert with check (true);
create policy "Anyone can insert suggestions" on suggestions for insert with check (true);
create policy "Anyone can read suggestions" on suggestions for select using (true);
create policy "Anyone can update suggestion votes" on suggestions for update using (true);
