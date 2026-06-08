import { RefObject } from "react";
import { ArrowLeft, BookOpen, Download, Package, Tag } from "lucide-react";
import { Brand } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ThemeToggle } from "./ThemeToggle";
import { downloadBrandCatalogPdf } from "./catalogPdf";

interface BrandPageProps {
  brand: Brand;
  onBack: () => void;
  scrollContainer: RefObject<HTMLDivElement | null>;
}

export function BrandPage({ brand, onBack }: BrandPageProps) {
  const handleDownloadCatalog = () => downloadBrandCatalogPdf(brand);

  return (
    <div className="min-h-full bg-background transition-colors duration-300 pb-24">
      <div className="sticky top-0 z-30 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Voltar para marcas</span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleDownloadCatalog}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-border text-foreground hover:bg-secondary active:bg-secondary/80 transition-all text-sm cursor-pointer font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Baixar PDF
            </button>
          </div>
        </div>
      </div>

      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-7">
            <div
              className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
              style={{
                border: `2px solid ${brand.color}40`,
                boxShadow: `0 8px 28px -10px ${brand.color}55`,
                backgroundColor: brand.logoBg ?? 'white',
              }}
            >
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-2" />
              ) : (
                <span className="font-black text-2xl tracking-tight" style={{ color: brand.color }}>
                  {brand.name.slice(0, 3)}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: brand.color }}>
                {brand.tagline}
              </p>
              <h1 className="text-foreground font-black tracking-tight" style={{ fontSize: "clamp(1.875rem, 5vw, 3rem)" }}>
                {brand.name}
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">{brand.description}</p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${brand.color}18` }}>
              <Package className="w-4.5 h-4.5" style={{ color: brand.color }} />
            </div>
            <div>
              <h2 className="text-foreground font-bold text-xl tracking-tight">Produtos em destaque</h2>
              <p className="text-muted-foreground text-xs">{brand.featuredProducts.length} linhas selecionadas</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brand.featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-border/60"
            >
              <div className="h-48 overflow-hidden relative bg-secondary/40">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm"
                    style={{ backgroundColor: `${brand.color}cc`, color: "#fff" }}
                  >
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <p className="text-card-foreground font-semibold text-sm leading-snug flex-1">{product.name}</p>
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-muted-foreground text-[11px] font-mono bg-secondary/60 px-2 py-0.5 rounded">
                    {product.ref}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs mt-2 leading-relaxed line-clamp-2">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div
          className="rounded-lg p-8 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-7 border"
          style={{
            background: `linear-gradient(135deg, ${brand.color}14 0%, var(--color-secondary) 70%)`,
            borderColor: `${brand.color}28`,
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4" style={{ color: brand.color }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: brand.color }}>
                Catálogo completo
              </span>
            </div>
            <h3 className="text-foreground font-black text-2xl tracking-tight">{brand.name}</h3>
            <p className="text-muted-foreground mt-1 text-sm max-w-md">
              PDF com as linhas da indústria, referências, categorias e descrições para consulta comercial.
            </p>
          </div>
          <button
            onClick={handleDownloadCatalog}
            className="shrink-0 flex items-center gap-2.5 px-7 py-3.5 rounded-lg text-white font-bold transition-all hover:opacity-90 active:opacity-80 cursor-pointer shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundColor: brand.color,
              boxShadow: `0 8px 24px -6px ${brand.color}60`,
            }}
          >
            <BookOpen className="w-4.5 h-4.5" />
            Baixar PDF do catálogo
          </button>
        </div>
      </section>

      {brand.extraCatalogs && brand.extraCatalogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mt-6">
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Download className="w-4 h-4" style={{ color: brand.color }} />
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: brand.color }}>
                Lançamentos
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {brand.extraCatalogs.map((extra) => (
                <a
                  key={extra.file}
                  href={extra.file}
                  download
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground hover:bg-secondary transition-all text-sm font-medium cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: brand.color }} />
                  {extra.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}


    </div>
  );
}
