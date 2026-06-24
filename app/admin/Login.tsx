import { useState } from "react";
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

  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-7 shadow-xl shadow-black/5"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
            <img src="/assets/sa-logo.png" alt="S&A" className="h-9 w-9 object-contain" />
          </span>
          <div>
            <h1 className="text-lg font-black text-foreground">Painel S&A</h1>
            <p className="text-xs text-muted-foreground">Acesso restrito</p>
          </div>
        </div>

        <label className="mb-1 block text-xs font-bold text-muted-foreground">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <label className="mb-1 block text-xs font-bold text-muted-foreground">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        {error && <p className="mb-4 text-sm font-semibold text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
