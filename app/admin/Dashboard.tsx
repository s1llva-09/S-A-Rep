import { useEffect, useState } from "react";
import {
  Plus,
  LogOut,
  ExternalLink,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Loader2,
  ImagePlus,
  PackageOpen,
  Boxes,
  Menu,
  X,
} from "lucide-react";
import { toast } from "./toast";
import { supabase } from "../supabase/client";
import { BrandRow, ProductRow } from "../supabase/types";
import {
  loadAll,
  saveBrand,
  saveProduct,
  deleteProductRow,
  deleteBrandRow,
  uploadToBucket,
  STORAGE,
} from "./AdminApp";

// ---- Sistema de estilos (tokens visuais) ----
const card =
  "rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-22px_rgba(0,0,0,0.20)]";
const inputCls =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground hover:border-foreground/20 focus:border-red-500/50 focus:outline-none focus:ring-4 focus:ring-red-500/10";
const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-black text-white shadow-sm shadow-red-600/25 transition-all hover:bg-red-700 hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary";
const btnDanger =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-bold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 dark:hover:border-red-900/60 dark:hover:bg-red-950/30";

// Limites de tamanho de upload (plano grátis do Supabase aceita até ~50 MB por arquivo).
const MAX_PDF_MB = 50;
const MAX_IMG_MB = 25;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400">
      <span className="h-px w-6 bg-red-500/40" />
      {children}
    </div>
  );
}

export function Dashboard() {
  const [brands, setBrands] = useState<BrandRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false); // gaveta no mobile

  const refresh = async () => {
    const { brands, products } = await loadAll();
    setBrands(brands);
    setProducts(products);
    // Mantém a seleção se ainda existir; senão cai pra primeira marca.
    setSelectedId((prev) => (prev && brands.some((b) => b.id === prev) ? prev : brands[0]?.id ?? null));
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const addBrand = async () => {
    const id = `marca-${Date.now()}`;
    const row: BrandRow = {
      id,
      name: "Nova marca",
      tagline: "",
      description: "",
      color: "#DB2020",
      logo_url: null,
      logo_bg: null,
      logo_text: "Nova marca",
      main_catalog_url: null,
      extra_catalogs: [],
      sort_order: brands.length,
    };
    await saveBrand(row);
    await refresh();
    setSelectedId(id);
    setNavOpen(false);
    toast.success("Marca criada.");
  };

  const selected = brands.find((b) => b.id === selectedId) ?? null;
  const brandProducts = products
    .filter((p) => p.brand_id === selectedId)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Backdrop (mobile) */}
      {navOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setNavOpen(false)} />
      )}

      {/* Sidebar (gaveta no mobile, fixa no desktop) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0 ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-4">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-border bg-white shadow-sm">
            <img src="/assets/sa-logo.png" alt="S&A" className="h-8 w-8 object-contain" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-black leading-tight">Painel S&A</p>
            <p className="truncate text-xs text-muted-foreground">Conteúdo do site</p>
          </div>
          <button
            onClick={() => setNavOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-muted-foreground hover:bg-secondary lg:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 text-[11px] font-black uppercase tracking-wider text-muted-foreground">
            Marcas
          </p>
          <div className="space-y-0.5">
            {brands.map((b) => {
              const active = b.id === selectedId;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedId(b.id);
                    setNavOpen(false);
                  }}
                  className={`group relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-red-600" />
                  )}
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-offset-1 ring-offset-card transition"
                    style={{ backgroundColor: b.color ?? "#999", boxShadow: active ? `0 0 0 1px ${b.color ?? "#999"}` : undefined, ["--tw-ring-color" as string]: `${b.color ?? "#999"}40` }}
                  />
                  <span className="truncate">{b.name}</span>
                </button>
              );
            })}
          </div>
          <button
            onClick={addBrand}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-2.5 text-sm font-bold text-muted-foreground transition-colors hover:border-red-400/50 hover:bg-secondary/60 hover:text-foreground"
          >
            <Plus className="h-4 w-4" /> Nova marca
          </button>
        </div>

        <div className="space-y-0.5 border-t border-border p-3">
          <a href="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground">
            <ExternalLink className="h-4 w-4" /> Ver site
          </a>
          <button
            onClick={() => supabase?.auth.signOut()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Coluna principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar (mobile) */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <button
            onClick={() => setNavOpen(true)}
            className="rounded-lg p-1.5 text-foreground hover:bg-secondary"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <img src="/assets/sa-logo.png" alt="S&A" className="h-7 w-7 object-contain" />
          <span className="font-black">Painel S&A</span>
        </div>

        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Carregando…
              </span>
            </div>
          ) : selected ? (
            <BrandEditor key={selected.id} brand={selected} products={brandProducts} onSaved={refresh} />
          ) : (
            <div className="grid h-full place-items-center p-6 text-center">
              <div className="max-w-xs">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
                  <Boxes className="h-7 w-7" />
                </div>
                <p className="text-base font-black text-foreground">Nenhuma marca ainda</p>
                <p className="mt-1 text-sm text-muted-foreground">Toque no menu e em “Nova marca” para começar.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function BrandEditor({
  brand,
  products,
  onSaved,
}: {
  brand: BrandRow;
  products: ProductRow[];
  onSaved: () => Promise<void>;
}) {
  const [form, setForm] = useState<BrandRow>(brand);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<string>("");

  const set = (patch: Partial<BrandRow>) => setForm((f) => ({ ...f, ...patch }));

  const handleSave = async () => {
    if (!form.name?.trim()) {
      toast.error("Dê um nome à marca antes de salvar.");
      return;
    }
    setSaving(true);
    try {
      await saveBrand(form);
      await onSaved();
      toast.success("Marca salva.");
    } catch {
      toast.error("Não foi possível salvar a marca. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Excluir a marca "${form.name}" e TODOS os seus produtos? Esta ação não pode ser desfeita.`)) return;
    try {
      await deleteBrandRow(brand.id);
      await onSaved();
      toast.success("Marca excluída.");
    } catch {
      toast.error("Erro ao excluir a marca.");
    }
  };

  // Uploads salvam na hora (o arquivo já foi pro storage), evitando perda se sair sem salvar.
  const uploadLogo = async (file: File) => {
    setBusy("logo");
    try {
      const url = await uploadToBucket(STORAGE.images, file);
      const next = { ...form, logo_url: url };
      setForm(next);
      await saveBrand(next);
      toast.success("Logo atualizada.");
    } catch {
      toast.error("Erro ao enviar a logo.");
    } finally {
      setBusy("");
    }
  };

  const uploadMainCatalog = async (file: File) => {
    setBusy("catalog");
    try {
      const url = await uploadToBucket(STORAGE.catalogs, file);
      const next = { ...form, main_catalog_url: url };
      setForm(next);
      await saveBrand(next);
      toast.success("Catálogo atualizado.");
    } catch {
      toast.error("Erro ao enviar o catálogo.");
    } finally {
      setBusy("");
    }
  };

  const addExtra = () => set({ extra_catalogs: [...(form.extra_catalogs ?? []), { label: "", file: "" }] });
  const updateExtra = (i: number, patch: Partial<{ label: string; file: string }>) =>
    set({ extra_catalogs: (form.extra_catalogs ?? []).map((c, idx) => (idx === i ? { ...c, ...patch } : c)) });
  const removeExtra = (i: number) =>
    set({ extra_catalogs: (form.extra_catalogs ?? []).filter((_, idx) => idx !== i) });

  const addProduct = async () => {
    const id = crypto.randomUUID();
    try {
      await saveProduct({
        id,
        brand_id: brand.id,
        name: "Novo produto",
        ref: "",
        description: "",
        category: "",
        image_url: null,
        sort_order: products.length,
      });
      await onSaved();
      toast.success("Produto adicionado.");
    } catch {
      toast.error("Erro ao adicionar produto.");
    }
  };

  return (
    <>
      {/* Toolbar fixa */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: form.color ?? "#999" }}
            />
            <h1 className="truncate text-lg font-black tracking-tight sm:text-xl">{form.name || "Marca"}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={handleDelete} className={btnDanger}>
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Excluir</span>
            </button>
            <button onClick={handleSave} disabled={saving} className={btnPrimary}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Salvar marca
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Identidade */}
        <section className={`${card} p-6`}>
          <SectionLabel>Identidade</SectionLabel>
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Nome</label>
                <input className={inputCls} value={form.name} onChange={(e) => set({ name: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Subtítulo (tagline)</label>
                <input className={inputCls} value={form.tagline ?? ""} onChange={(e) => set({ tagline: e.target.value })} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Descrição</label>
              <textarea
                className={inputCls}
                rows={3}
                value={form.description ?? ""}
                onChange={(e) => set({ description: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelCls}>Cor da marca</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.color ?? "#DB2020"}
                    onChange={(e) => set({ color: e.target.value })}
                    className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-border bg-background p-1"
                  />
                  <input className={inputCls} value={form.color ?? ""} onChange={(e) => set({ color: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Fundo do logo</label>
                <input className={inputCls} placeholder="opcional" value={form.logo_bg ?? ""} onChange={(e) => set({ logo_bg: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Ordem no site</label>
                <input
                  type="number"
                  className={inputCls}
                  value={form.sort_order ?? 0}
                  onChange={(e) => set({ sort_order: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mídia */}
        <section className={`${card} mt-5 p-6`}>
          <SectionLabel>Logo e catálogo</SectionLabel>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Logo</label>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border"
                  style={{ backgroundColor: form.logo_bg || "white" }}
                >
                  {form.logo_url ? (
                    <img src={form.logo_url} alt="logo" className="h-full w-full object-contain p-1.5" />
                  ) : (
                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <FileButton accept="image/*" busy={busy === "logo"} onPick={uploadLogo} label="Trocar logo" maxMB={MAX_IMG_MB} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Catálogo principal (PDF)</label>
              <div className="flex items-center gap-3">
                <FileButton accept="application/pdf" busy={busy === "catalog"} onPick={uploadMainCatalog} label="Trocar PDF" maxMB={MAX_PDF_MB} />
                {form.main_catalog_url && (
                  <a href={form.main_catalog_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-red-600 hover:underline">
                    ver atual
                  </a>
                )}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">Tamanho máximo: {MAX_PDF_MB} MB.</p>
            </div>
          </div>

          {/* Catálogos extras */}
          <div className="mt-6 border-t border-border pt-5">
            <label className={labelCls}>Catálogos extras (lançamentos)</label>
            <div className="space-y-2">
              {(form.extra_catalogs ?? []).map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className={inputCls}
                    placeholder="Rótulo (ex: Lançamentos Maio)"
                    value={c.label}
                    onChange={(e) => updateExtra(i, { label: e.target.value })}
                  />
                  {c.file ? (
                    <a href={c.file} target="_blank" rel="noreferrer" className="shrink-0 text-xs font-bold text-red-600 hover:underline">
                      ver
                    </a>
                  ) : null}
                  <FileButton
                    accept="application/pdf"
                    small
                    maxMB={MAX_PDF_MB}
                    onPick={async (file) => {
                      const url = await uploadToBucket(STORAGE.catalogs, file);
                      updateExtra(i, { file: url });
                    }}
                    label="PDF"
                  />
                  <button
                    onClick={() => removeExtra(i)}
                    className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                    aria-label="Remover catálogo extra"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button onClick={addExtra} className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700">
                <Plus className="h-4 w-4" /> Adicionar catálogo extra
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Após adicionar/editar os extras, clique em “Salvar marca”.</p>
          </div>
        </section>

        {/* Produtos */}
        <div className="mb-3 mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageOpen className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-black tracking-tight">Produtos</h2>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-muted-foreground">{products.length}</span>
          </div>
          <button onClick={addProduct} className={btnGhost}>
            <Plus className="h-4 w-4" /> Novo produto
          </button>
        </div>
        <div className="space-y-3">
          {products.map((p, idx) => (
            <ProductCard
              key={p.id}
              product={p}
              isFirst={idx === 0}
              isLast={idx === products.length - 1}
              siblings={products}
              onSaved={onSaved}
            />
          ))}
          {products.length === 0 && (
            <div className={`${card} grid place-items-center p-10 text-center`}>
              <p className="text-sm text-muted-foreground">Nenhum produto ainda. Clique em “Novo produto”.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ProductCard({
  product,
  isFirst,
  isLast,
  siblings,
  onSaved,
}: {
  product: ProductRow;
  isFirst: boolean;
  isLast: boolean;
  siblings: ProductRow[];
  onSaved: () => Promise<void>;
}) {
  const [form, setForm] = useState<ProductRow>(product);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (patch: Partial<ProductRow>) => setForm((f) => ({ ...f, ...patch }));

  const save = async () => {
    if (!form.name?.trim()) {
      toast.error("Dê um nome ao produto antes de salvar.");
      return;
    }
    setSaving(true);
    try {
      await saveProduct(form);
      await onSaved();
      toast.success("Produto salvo.");
    } catch {
      toast.error("Não foi possível salvar o produto.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Excluir o produto "${form.name}"?`)) return;
    try {
      await deleteProductRow(form.id);
      await onSaved();
      toast.success("Produto excluído.");
    } catch {
      toast.error("Erro ao excluir o produto.");
    }
  };

  const move = async (dir: -1 | 1) => {
    const idx = siblings.findIndex((s) => s.id === form.id);
    const other = siblings[idx + dir];
    if (!other) return;
    try {
      await saveProduct({ ...form, sort_order: other.sort_order ?? 0 });
      await saveProduct({ ...other, sort_order: form.sort_order ?? 0 });
      await onSaved();
    } catch {
      toast.error("Erro ao reordenar.");
    }
  };

  // Salva a foto na hora (já está no storage), evitando perda se sair sem salvar.
  const uploadImage = async (file: File) => {
    setBusy(true);
    try {
      const url = await uploadToBucket(STORAGE.images, file);
      const next = { ...form, image_url: url };
      setForm(next);
      await saveProduct(next);
      toast.success("Foto atualizada.");
    } catch {
      toast.error("Erro ao enviar a foto.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`${card} p-4 transition-shadow hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_22px_40px_-24px_rgba(0,0,0,0.28)]`}>
      <div className="flex gap-4">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
            {form.image_url ? (
              <img src={form.image_url} alt={form.name} className="h-full w-full object-contain p-1" />
            ) : (
              <ImagePlus className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <FileButton accept="image/*" small busy={busy} onPick={uploadImage} label="Foto" maxMB={MAX_IMG_MB} />
        </div>
        <div className="grid flex-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Nome</label>
            <input className={inputCls} value={form.name} onChange={(e) => set({ name: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Referência</label>
            <input className={inputCls} value={form.ref ?? ""} onChange={(e) => set({ ref: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Categoria</label>
            <input className={inputCls} value={form.category ?? ""} onChange={(e) => set({ category: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Descrição</label>
            <textarea className={inputCls} rows={2} value={form.description ?? ""} onChange={(e) => set({ description: e.target.value })} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div className="flex gap-1">
          <button
            disabled={isFirst}
            onClick={() => move(-1)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Mover para cima"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <button
            disabled={isLast}
            onClick={() => move(1)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Mover para baixo"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={remove} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30">
            <Trash2 className="h-4 w-4" /> Excluir
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-black text-background transition-all hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

function FileButton({
  accept,
  onPick,
  label,
  busy,
  small,
  maxMB,
}: {
  accept: string;
  onPick: (file: File) => void | Promise<void>;
  label: string;
  busy?: boolean;
  small?: boolean;
  maxMB?: number;
}) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card font-bold text-foreground transition-colors hover:border-foreground/20 hover:bg-secondary ${
        small ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm"
      }`}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className={small ? "h-3.5 w-3.5" : "h-4 w-4"} />}
      {label}
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          if (maxMB && file.size > maxMB * 1024 * 1024) {
            const mb = (file.size / (1024 * 1024)).toFixed(1);
            alert(
              `Este arquivo tem ${mb} MB e ultrapassa o limite de ${maxMB} MB.\n\n` +
                `Escolha um arquivo menor` +
                (accept.includes("pdf") ? " (tente comprimir o PDF em ferramentas como o iLovePDF)." : "."),
            );
            return;
          }
          onPick(file);
        }}
      />
    </label>
  );
}
