import { useEffect, useState } from "react";
import { Plus, LogOut, ExternalLink, Trash2, ArrowUp, ArrowDown, Save, Loader2 } from "lucide-react";
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

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelCls = "mb-1 block text-xs font-bold text-muted-foreground";

// Limites de tamanho de upload (plano grátis do Supabase aceita até ~50 MB por arquivo).
const MAX_PDF_MB = 50;
const MAX_IMG_MB = 25;

export function Dashboard() {
  const [brands, setBrands] = useState<BrandRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
  };

  const selected = brands.find((b) => b.id === selectedId) ?? null;
  const brandProducts = products
    .filter((p) => p.brand_id === selectedId)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <img src="/assets/sa-logo.png" alt="S&A" className="h-8 w-8 object-contain" />
          <span className="font-black">Painel S&A</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="mb-2 px-2 text-xs font-black uppercase text-muted-foreground">Marcas</p>
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedId(b.id)}
              className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                b.id === selectedId ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.color ?? "#999" }} />
              <span className="truncate">{b.name}</span>
            </button>
          ))}
          <button
            onClick={addBrand}
            className="mt-2 flex w-full items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary/60"
          >
            <Plus className="h-4 w-4" /> Nova marca
          </button>
        </div>
        <div className="border-t border-border p-3">
          <a
            href="/"
            className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary/60"
          >
            <ExternalLink className="h-4 w-4" /> Ver site
          </a>
          <button
            onClick={() => supabase?.auth.signOut()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary/60"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">Carregando…</div>
        ) : selected ? (
          <BrandEditor
            key={selected.id}
            brand={selected}
            products={brandProducts}
            onSaved={refresh}
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">
            Crie a primeira marca para começar.
          </div>
        )}
      </main>
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
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-black">{form.name || "Marca"}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              if (!confirm(`Excluir a marca "${form.name}" e TODOS os seus produtos? Esta ação não pode ser desfeita.`)) return;
              try {
                await deleteBrandRow(brand.id);
                await onSaved();
                toast.success("Marca excluída.");
              } catch {
                toast.error("Erro ao excluir a marca.");
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <Trash2 className="h-4 w-4" />
            Excluir marca
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-black text-white hover:bg-red-700 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Salvar marca
          </button>
        </div>
      </div>

      <section className="grid gap-4 rounded-xl border border-border bg-card p-5">
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
            <label className={labelCls}>Cor (hex)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.color ?? "#DB2020"}
                onChange={(e) => set({ color: e.target.value })}
                className="h-9 w-10 shrink-0 rounded border border-border bg-background"
              />
              <input className={inputCls} value={form.color ?? ""} onChange={(e) => set({ color: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Fundo do logo (opcional)</label>
            <input className={inputCls} value={form.logo_bg ?? ""} onChange={(e) => set({ logo_bg: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Ordem</label>
            <input
              type="number"
              className={inputCls}
              value={form.sort_order ?? 0}
              onChange={(e) => set({ sort_order: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Logo</label>
            <div className="flex items-center gap-3">
              {form.logo_url && (
                <img src={form.logo_url} alt="logo" className="h-12 w-12 rounded border border-border bg-white object-contain p-1" />
              )}
              <FileButton accept="image/*" busy={busy === "logo"} onPick={uploadLogo} label="Trocar logo" maxMB={MAX_IMG_MB} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Catálogo principal (PDF)</label>
            <div className="flex items-center gap-3">
              {form.main_catalog_url && (
                <a href={form.main_catalog_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-red-600 underline">
                  ver atual
                </a>
              )}
              <FileButton accept="application/pdf" busy={busy === "catalog"} onPick={uploadMainCatalog} label="Trocar PDF" maxMB={MAX_PDF_MB} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Tamanho máximo: {MAX_PDF_MB} MB.</p>
          </div>
        </div>

        {/* Catálogos extras */}
        <div>
          <label className={labelCls}>Catálogos extras</label>
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
                  <a href={c.file} target="_blank" rel="noreferrer" className="shrink-0 text-xs font-bold text-red-600 underline">
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
                <button onClick={() => removeExtra(i)} className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-secondary">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button onClick={addExtra} className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600">
              <Plus className="h-4 w-4" /> Adicionar catálogo extra
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Lembre de clicar em “Salvar marca” após adicionar/editar.</p>
        </div>
      </section>

      {/* Produtos */}
      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-lg font-black">Produtos ({products.length})</h2>
        <button onClick={addProduct} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-bold hover:bg-secondary">
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
      </div>
    </div>
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
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex gap-4">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div className="h-20 w-20 overflow-hidden rounded-lg border border-border bg-white">
            {form.image_url && <img src={form.image_url} alt={form.name} className="h-full w-full object-contain p-1" />}
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
          <button disabled={isFirst} onClick={() => move(-1)} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary disabled:opacity-30">
            <ArrowUp className="h-4 w-4" />
          </button>
          <button disabled={isLast} onClick={() => move(1)} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary disabled:opacity-30">
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={remove} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
            <Trash2 className="h-4 w-4" /> Excluir
          </button>
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-black text-background disabled:opacity-60">
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
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border font-bold hover:bg-secondary ${
        small ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
      }`}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
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
