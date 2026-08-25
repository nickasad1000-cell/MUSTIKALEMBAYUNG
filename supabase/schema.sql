-- ============================================================
-- Mustika Lembayung — Skema Database Supabase
--
-- Cara pakai:
--   1. Buat project di https://supabase.com → New Project
--   2. Buka SQL Editor → paste file ini → Run
--   3. Ambil Project URL & keys di Settings → API,
--      lalu isi .env.local / Environment Variables Vercel
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text,
  unit_slug  text,
  message    text,
  status     text not null default 'new',        -- new | contacted | visited | closed
  created_at timestamptz not null default now()
);

comment on table public.leads is 'Calon pembeli dari form landing page';

-- Keamanan: RLS aktif — publik hanya boleh INSERT, tidak boleh membaca data
alter table public.leads enable row level security;

drop policy if exists "public can submit lead" on public.leads;
create policy "public can submit lead"
  on public.leads for insert
  to anon
  with check (true);

-- Admin membaca data via Supabase Dashboard / service_role key.
