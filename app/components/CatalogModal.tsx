import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Brand } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CatalogModalProps {
  brand: Brand;
  onClose: () => void;
}

export function CatalogModal({ brand, onClose }: CatalogModalProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const categories = ["Todos", ...Array.from(new Set(brand.catalogProducts.map(p => p.category)))];

  const filtered = brand.catalogProducts.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ref.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Todos" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative bg-card border border-border rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border shrink-0 bg-card">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-inner"
              style={{ backgroundColor: brand.color, color: "#fff" }}
            >
              {brand.name.slice(0, 2)}
            </div>
            <div>
              <h2 className="text-foreground text-lg font-bold">{brand.name} — Catálogo Completo</h2>
              <p className="text-muted-foreground text-sm font-medium">{brand.catalogProducts.length} produtos disponíveis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors p-2 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search + Filter */}
        <div className="p-5 border-b border-border flex flex-col sm:flex-row gap-4 shrink-0 bg-secondary/60">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nome ou referência..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm transition-all cursor-pointer font-semibold shadow-sm"
                style={
                  activeCategory === cat
                    ? { backgroundColor: brand.color, color: "#fff", border: `1px solid ${brand.color}` }
                    : { backgroundColor: "var(--color-background)", color: "var(--color-foreground)", border: "1px solid var(--color-border)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="overflow-y-auto flex-1 p-5 bg-card">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground flex flex-col items-center gap-3">
              <Search className="w-10 h-10 opacity-20" />
              <p className="text-lg">Nenhum produto encontrado para "{search}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(product => (
                <div
                  key={product.id}
                  className="bg-background border border-border rounded-xl overflow-hidden hover:border-foreground/30 transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col"
                >
                  <div className="h-40 overflow-hidden relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider self-start"
                      style={{ backgroundColor: brand.color + "15", color: brand.color }}
                    >
                      {product.category}
                    </span>
                    <p className="text-foreground mt-2 text-sm font-bold leading-snug flex-1 group-hover:text-[var(--color-primary)] transition-colors">{product.name}</p>
                    <p className="text-muted-foreground text-xs mt-1 font-mono bg-secondary/50 px-1.5 py-0.5 rounded self-start">Ref: {product.ref}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
