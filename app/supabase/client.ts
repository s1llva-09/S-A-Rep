import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lidos do .env (prefixo VITE_ para ficarem disponíveis no browser).
// A anon key é pública por design — a segurança vem das policies (RLS) no Supabase.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** true quando o Supabase está configurado; senão o site usa o conteúdo de fallback. */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;

/** Nomes dos buckets de Storage. */
export const BUCKETS = {
  images: "images",
  catalogs: "catalogs",
} as const;
