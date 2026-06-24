import { useEffect, useState } from "react";
import { Brand, Product, fallbackBrands } from "../components/data";
import { supabase, isSupabaseConfigured } from "./client";
import { BrandRow, ProductRow } from "./types";

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    ref: row.ref ?? "",
    description: row.description ?? "",
    category: row.category ?? "",
    image: row.image_url ?? "",
  };
}

function mapBrand(row: BrandRow, products: Product[]): Brand {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    color: row.color ?? "#DB2020",
    logoText: row.logo_text ?? row.name,
    logo: row.logo_url ?? undefined,
    logoBg: row.logo_bg ?? undefined,
    featuredProducts: products.slice(0, 4),
    catalogProducts: products,
    extraCatalogs: (row.extra_catalogs ?? []).filter((c) => c.file),
    mainCatalogUrl: row.main_catalog_url ?? undefined,
  };
}

export async function fetchBrands(): Promise<Brand[]> {
  if (!isSupabaseConfigured || !supabase) return fallbackBrands;

  const [{ data: brandRows, error: brandErr }, { data: productRows, error: prodErr }] =
    await Promise.all([
      supabase.from("brands").select("*").order("sort_order", { ascending: true }),
      supabase.from("products").select("*").order("sort_order", { ascending: true }),
    ]);

  if (brandErr || prodErr || !brandRows || brandRows.length === 0) {
    if (brandErr || prodErr) console.error("Erro ao buscar do Supabase:", brandErr || prodErr);
    return fallbackBrands;
  }

  const productsByBrand = new Map<string, Product[]>();
  for (const row of (productRows ?? []) as ProductRow[]) {
    const list = productsByBrand.get(row.brand_id) ?? [];
    list.push(mapProduct(row));
    productsByBrand.set(row.brand_id, list);
  }

  return (brandRows as BrandRow[]).map((b) => mapBrand(b, productsByBrand.get(b.id) ?? []));
}

/**
 * Retorna as marcas. Começa com o conteúdo de fallback (render instantâneo)
 * e, se o Supabase estiver configurado, substitui pelo conteúdo do banco.
 */
export function useBrands(): { brands: Brand[]; loading: boolean } {
  const [brands, setBrands] = useState<Brand[]>(fallbackBrands);
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    fetchBrands()
      .then((b) => {
        if (active) setBrands(b);
      })
      .catch((err) => {
        console.error("Falha ao buscar conteúdo do Supabase, usando fallback.", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { brands, loading };
}
