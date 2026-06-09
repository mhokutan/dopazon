-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/jtsifootrchbsgrldfxk/sql

create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  price integer not null,
  emoji text default '📦',
  img text,
  stars numeric(2,1) default 4.5,
  reviews integer default 100,
  store_name text default 'Dopazon Store',
  description text,
  created_at timestamptz default now()
);

alter table products enable row level security;

create policy "Public can read products"
  on products for select
  using (true);

create policy "Authenticated users can insert"
  on products for insert
  with check (auth.uid() is not null);
