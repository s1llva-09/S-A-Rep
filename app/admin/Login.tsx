import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "../supabase/client";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError("E-mail ou senha incorretos.");
  };

  const field =
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/20 focus:border-red-500/50 focus:outline-none focus:ring-4 focus:ring-red-500/10";

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background p-6">
      {/* brilho de fundo sutil */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(220,38,38,0.12),transparent)]" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.25)]"
      >
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <img src="/assets/sa-logo.png" alt="S&A" className="h-12 w-12 object-contain" />
          </span>
          <h1 className="text-xl font-black tracking-tight text-foreground">Painel S&A</h1>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Lock className="h-3 w-3" /> Acesso exclusivo da equipe
          </p>
        </div>

        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          placeholder="voce@email.com"
          className={`mb-4 ${field}`}
        />

        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className={`mb-5 ${field}`}
        />

        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-black text-white shadow-sm shadow-red-600/30 transition-all hover:bg-red-700 hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
