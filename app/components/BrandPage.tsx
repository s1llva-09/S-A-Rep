import { RefObject } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Layers3,
  MessageCircle,
  Package,
  Tag,
} from "lucide-react";
import { Brand } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ThemeToggle } from "./ThemeToggle";
import { downloadBrandCatalogPdf } from "./catalogPdf";
import { getWhatsAppUrl } from "../config";

interface BrandPageProps {
  brand: Brand;
  onBack: () => void;
  scrollContainer: RefObject<HTMLDivElement | null>;
}

export function BrandPage({ brand, onBack }: BrandPageProps) {
  const handleDownloadCatalog = () => downloadBrandCatalogPdf(brand);
  const whatsappUrl = getWhatsAppUrl(
    `Olá! Vim pelo site da S&A Representações e gostaria de fazer um pedido de produtos da marca ${brand.name}.`
  );

  return (
    <div className="min-h-full bg-background pb-20 transition-colors duration-300">
      <div className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar para marcas
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleDownloadCatalog}
              className="hidden items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-bold text-foreground shadow-sm transition-colors hover:bg-secondary sm:flex cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              Baixar PDF
            </button>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-border bg-card">
        <div
          className="absolute inset-x-0 top-0 h-1.5"
          style={{ backgroundColor: brand.color }}
        />
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center lg:py-16">
          <div>
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-black uppercase"
              style={{ borderColor: `${brand.color}25`, backgroundColor: `${brand.color}10`, color: brand.color }}
            >
              <Package className="h-3.5 w-3.5" />
              Indústria representada
            </div>
            <h1 className="text-4xl font-black leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">{brand.name}</h1>
            <p className="mt-3 text-lg font-bold" style={{ color: brand.color }}>
              {brand.tagline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {brand.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleDownloadCatalog}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-95 cursor-pointer"
                style={{ backgroundColor: brand.color, boxShadow: `0 18px 38px -18px ${brand.color}` }}
              >
                <FileText className="h-4 w-4" />
                Baixar catálogo
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-green-600" />
                Fazer pedido
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-5 shadow-xl shadow-black/5">
            <div className="flex items-center gap-5 border-b border-border pb-5">
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border shadow-sm"
                style={{
                  borderColor: `${brand.color}35`,
                  backgroundColor: brand.logoBg ?? "white",
                }}
              >
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="h-full w-full object-contain p-3" />
                ) : (
                  <span className="text-2xl font-black" style={{ color: brand.color }}>
                    {brand.name.slice(0, 3)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-black uppercase text-muted-foreground">Resumo comercial</p>
                <p className="mt-2 text-2xl font-black text-foreground">{brand.catalogProducts.length} linhas</p>
                <p className="text-sm text-muted-foreground">Produtos e referências para consulta</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-5">
              <div className="rounded-lg border border-border bg-card p-4">
                <Layers3 className="mb-3 h-5 w-5" style={{ color: brand.color }} />
                <p className="text-sm font-black text-foreground">{brand.featuredProducts.length} destaques</p>
                <p className="mt-1 text-xs text-muted-foreground">Linhas principais</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <BookOpen className="mb-3 h-5 w-5" style={{ color: brand.color }} />
                <p className="text-sm font-black text-foreground">Catálogo PDF</p>
                <p className="mt-1 text-xs text-muted-foreground">Consulta comercial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs font-black uppercase" style={{ color: brand.color }}>
              <span className="h-px w-9" style={{ backgroundColor: `${brand.color}80` }} />
              Linha de produtos
            </div>
            <h2 className="text-3xl font-black text-foreground">Produtos em destaque</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Principais itens para análise de mix, exposição e compra comercial.
            </p>
          </div>
          <div
            className="flex w-full items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-sm sm:w-auto"
            style={{ borderColor: `${brand.color}25` }}
          >
            <Tag className="h-4 w-4" style={{ color: brand.color }} />
            <span className="text-sm font-bold text-foreground">{brand.catalogProducts.length} referências no catálogo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {brand.featuredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${brand.color}45`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 18px 40px -18px ${brand.color}70`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-white p-4">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-black text-white shadow-sm"
                  style={{ backgroundColor: brand.color }}
                >
                  {product.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-base font-black leading-snug text-card-foreground">{product.name}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-mono font-semibold text-muted-foreground">
                    {product.ref}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" style={{ color: brand.color }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="h-1.5 w-full" style={{ backgroundColor: brand.color }} />
          <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase" style={{ color: brand.color }}>
                <BookOpen className="h-4 w-4" />
                Catálogo completo
              </div>
              <h3 className="text-2xl font-black text-foreground">{brand.name}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Baixe o PDF com linhas, referências, categorias e descrições para usar na rotina comercial.
              </p>
            </div>
            <button
              onClick={handleDownloadCatalog}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-95 cursor-pointer"
              style={{ backgroundColor: brand.color, boxShadow: `0 18px 38px -18px ${brand.color}` }}
            >
              <Download className="h-4 w-4" />
              Baixar PDF
            </button>
          </div>
        </div>
      </section>

      {brand.extraCatalogs && brand.extraCatalogs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase" style={{ color: brand.color }}>
              <Download className="h-4 w-4" />
              Lançamentos
            </div>
            <div className="flex flex-wrap gap-3">
              {brand.extraCatalogs.map((extra) => (
                <a
                  key={extra.file}
                  href={extra.file}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5 shrink-0" style={{ color: brand.color }} />
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
