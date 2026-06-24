import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured, BUCKETS } from "../supabase/client";
import { BrandRow, ProductRow } from "../supabase/types";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto grid min-h-screen max-w-lg place-items-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-black text-foreground">Painel não configurado</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Defina <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code> no <code>.env</code>{" "}
            (veja o arquivo <code>SETUP-SUPABASE.md</code>) e recarregue.
          </p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Carregando…</div>;
  }

  return session ? <Dashboard /> : <Login />;
}

// ---- Helpers de Storage/DB compartilhados pelo painel ----

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}

/** Sobe um arquivo para o bucket e devolve a URL pública. */
export async function uploadToBucket(bucket: string, file: File): Promise<string> {
  if (!supabase) throw new Error("Supabase não configurado");
  const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export const STORAGE = BUCKETS;

export async function loadAll(): Promise<{ brands: BrandRow[]; products: ProductRow[] }> {
  if (!supabase) return { brands: [], products: [] };
  const [{ data: brands }, { data: products }] = await Promise.all([
    supabase.from("brands").select("*").order("sort_order", { ascending: true }),
    supabase.from("products").select("*").order("sort_order", { ascending: true }),
  ]);
  return { brands: (brands as BrandRow[]) ?? [], products: (products as ProductRow[]) ?? [] };
}

export async function saveBrand(row: BrandRow) {
  if (!supabase) return;
  const { error } = await supabase.from("brands").upsert(row);
  if (error) throw error;
}

export async function saveProduct(row: ProductRow) {
  if (!supabase) return;
  const { error } = await supabase.from("products").upsert(row);
  if (error) throw error;
}

export async function deleteProductRow(id: string) {
  if (!supabase) return;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export { slugify };
