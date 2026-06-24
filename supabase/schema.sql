-- ============================================================
-- S&A Representações — estrutura do banco no Supabase
-- Cole este conteúdo no SQL Editor do Supabase e rode (Run).
-- ============================================================

-- Tabela de marcas
create table if not exists public.brands (
  id text primary key,
  name text not null,
  tagline text,
  description text,
  color text,
  logo_url text,
  logo_bg text,
  logo_text text,
  main_catalog_url text,
  extra_catalogs jsonb default '[]'::jsonb,
  sort_order int default 0,
  updated_at timestamptz default now()
);

-- Tabela de produtos
create table if not exists public.products (
  id text primary key,
  brand_id text references public.brands(id) on delete cascade,
  name text not null,
  ref text,
  description text,
  category text,
  image_url text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create index if not exists products_brand_id_idx on public.products(brand_id);

-- ============================================================
-- Segurança (RLS): qualquer um LÊ; só quem está logado ESCREVE
-- ============================================================
alter table public.brands enable row level security;
alter table public.products enable row level security;

-- Leitura pública
drop policy if exists "brands_public_read" on public.brands;
create policy "brands_public_read" on public.brands for select using (true);

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select using (true);

-- Escrita só para usuários autenticados (o dono logado no painel)
drop policy if exists "brands_auth_write" on public.brands;
create policy "brands_auth_write" on public.brands for all
  to authenticated using (true) with check (true);

drop policy if exists "products_auth_write" on public.products;
create policy "products_auth_write" on public.products for all
  to authenticated using (true) with check (true);

-- ============================================================
-- Storage: buckets públicos para imagens e catálogos (PDFs)
-- ============================================================
insert into storage.buckets (id, name, public) values ('images', 'images', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('catalogs', 'catalogs', true)
  on conflict (id) do nothing;

-- Leitura pública dos arquivos
drop policy if exists "storage_public_read" on storage.objects;
create policy "storage_public_read" on storage.objects for select
  using (bucket_id in ('images', 'catalogs'));

-- Upload/edição só para usuários autenticados
drop policy if exists "storage_auth_write" on storage.objects;
create policy "storage_auth_write" on storage.objects for all
  to authenticated
  using (bucket_id in ('images', 'catalogs'))
  with check (bucket_id in ('images', 'catalogs'));
