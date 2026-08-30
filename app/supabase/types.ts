// Tipos das linhas das tabelas no Supabase.

export interface BrandRow {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  color: string | null;
  logo_url: string | null;
  logo_bg: string | null;
  logo_text: string | null;
  main_catalog_url: string | null;
  extra_catalogs: { label: string; file: string }[] | null;
  sort_order: number | null;
}

export interface ProductRow {
  id: string;
  brand_id: string;
  name: string;
  ref: string | null;
  description: string | null;
  category: string | null;
  image_url: string | null;
  sort_order: number | null;
}

export interface ContactPersonRow {
  id: string;
  name: string;
  role: string | null;
  phone: string | null;
  phone_display: string | null;
  image_url: string | null;
  sort_order: number | null;
}
