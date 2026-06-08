import { RefObject } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Factory,
  Headphones,
  MapPin,
  MessageCircle,
  PackageCheck,
  Route,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { brands, Brand } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SITE_CONFIG, getWhatsAppUrl } from "../config";
import { ThemeToggle } from "./ThemeToggle";

interface HomePageProps {
  onSelectBrand: (brand: Brand) => void;
  onNavigateAbout: () => void;
  scrollContainer: RefObject<HTMLDivElement | null>;
}

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: "Indústrias selecionadas",
    desc: "Portfólio com marcas de reposição, elétrica, freios, suspensão e componentes de alto giro para motopeças.",
  },
  {
    icon: Users,
    title: "Venda consultiva",
    desc: "Apoio comercial para escolher linhas, aplicações e lançamentos que fazem sentido para cada perfil de cliente.",
  },
  {
    icon: Route,
    title: "Cobertura regional",
    desc: "Atuação estruturada em Bahia, Sergipe, Alagoas e Pernambuco com atendimento próximo ao varejo.",
  },
  {
    icon: TrendingUp,
    title: "Catálogos em dia",
    desc: "Consulta rápida a produtos, linhas e materiais comerciais das indústrias representadas.",
  },
];

const STEPS = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Definição do mix",
    desc: "A equipe entende sua loja ou oficina e indica marcas com maior potencial de giro.",
  },
  {
    step: "02",
    icon: BookOpen,
    title: "Consulta comercial",
    desc: "Você acessa catálogos, linhas e referências para montar o pedido com segurança.",
  },
  {
    step: "03",
    icon: PackageCheck,
    title: "Pedido acompanhado",
    desc: "O atendimento segue pelo WhatsApp com suporte do orçamento até o pós-venda.",
  },
];

const COVERAGE = ["Bahia", "Sergipe", "Alagoas", "Pernambuco"];

export function HomePage({ onSelectBrand, onNavigateAbout }: HomePageProps) {
  const scrollToMarcas = () => {
    document.getElementById("marcas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const whatsappUrl = getWhatsAppUrl(
    "Olá! Vim pelo site da S&A Representações e gostaria de mais informações."
  );

  return (
    <div className="min-h-full bg-background transition-colors duration-300">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-center gap-3 px-4 text-center text-xs font-semibold sm:justify-between sm:px-6">
          <span className="hidden items-center gap-2 sm:flex">
            <BadgeCheck className="h-3.5 w-3.5 text-red-300" />
            Representação comercial especializada em motopeças
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-red-300" />
            Bahia, Sergipe, Alagoas e Pernambuco
          </span>
        </div>
      </div>

      <nav className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
          <button onClick={scrollToMarcas} className="flex min-w-0 items-center gap-3 text-left cursor-pointer">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white shadow-sm">
              <img src="/assets/sa-logo.png" alt="S&A Representações" className="h-10 w-10 object-contain" />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-black text-foreground">{SITE_CONFIG.companyName}</span>
              <span className="block truncate text-xs font-semibold text-muted-foreground">{SITE_CONFIG.shortDescription}</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 md:flex">
              <button
                onClick={scrollToMarcas}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
              >
                Marcas
              </button>
              <button
                onClick={onNavigateAbout}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
              >
                Sobre
              </button>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-green-700/20 transition-colors hover:bg-green-700 sm:flex"
            >
              <MessageCircle className="h-4 w-4" />
              Comercial
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/assets/sa-presentation.png"
            alt="Apresentação S&A Representações"
            className="h-full w-full object-cover object-center opacity-45 sm:opacity-75 dark:opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background)_0%,rgba(255,255,255,0.92)_45%,rgba(255,255,255,0.2)_100%)] dark:bg-[linear-gradient(90deg,var(--color-background)_0%,rgba(24,24,24,0.9)_48%,rgba(24,24,24,0.22)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--color-background)_100%)] opacity-45" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-150px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <Factory className="h-3.5 w-3.5" />
              Representação comercial no Nordeste
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] text-foreground sm:text-5xl lg:text-6xl">
              S&A Representações
              <span className="mt-3 block text-red-600 dark:text-red-500">
                grandes marcas de motopeças para o seu negócio.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Uma operação comercial preparada para conectar revendas, oficinas e distribuidores a{" "}
              <strong className="font-bold text-foreground">{brands.length} indústrias parceiras</strong>, com
              atendimento consultivo, catálogos atualizados e presença em quatro estados.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToMarcas}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-red-600/35 cursor-pointer"
              >
                Explorar indústrias
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card/80 px-6 py-3.5 text-sm font-bold text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-secondary cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-green-600" />
                Solicitar atendimento
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 sm:hidden">
              {[
                { value: String(brands.length), label: "indústrias" },
                { value: "4", label: "estados" },
                { value: "2009", label: "desde" },
              ].map((metric) => (
                <span key={metric.label} className="rounded-md border border-red-500/20 bg-card/80 px-3 py-2 text-xs font-black text-foreground shadow-sm">
                  {metric.value} <span className="font-semibold text-muted-foreground">{metric.label}</span>
                </span>
              ))}
            </div>

            <div className="mt-10 hidden max-w-2xl grid-cols-3 gap-3 sm:grid">
              {[
                { value: String(brands.length), label: "indústrias" },
                { value: "4", label: "estados" },
                { value: "2009", label: "desde" },
              ].map((metric) => (
                <div key={metric.label} className="border-l-2 border-red-500/35 pl-4">
                  <p className="text-2xl font-black leading-none text-foreground sm:text-3xl">{metric.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-md rounded-lg border border-border bg-card/90 p-5 shadow-2xl shadow-black/10 backdrop-blur">
              <div className="flex items-start justify-between gap-5 border-b border-border pb-5">
                <div>
                  <p className="text-xs font-black uppercase text-red-600 dark:text-red-400">Operação comercial</p>
                  <h2 className="mt-2 text-2xl font-black text-foreground">Portfólio pronto para revendas</h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-5">
                {COVERAGE.map((state) => (
                  <div key={state} className="rounded-lg border border-border bg-background px-4 py-3">
                    <p className="text-sm font-black text-foreground">{state}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Cobertura ativa</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-5">
                {[
                  "Catálogos por indústria",
                  "Linhas de alto giro para motopeças",
                  "Contato comercial direto por WhatsApp",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase text-red-200">Indústrias representadas</p>
            <button
              onClick={scrollToMarcas}
              className="hidden items-center gap-1.5 text-xs font-bold text-white/75 transition-colors hover:text-white sm:flex cursor-pointer"
            >
              Ver portfólio
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {brands.map((brand, idx) => (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(brand)}
                className={`group flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-3 transition-all hover:-translate-y-0.5 hover:bg-white/[0.08] cursor-pointer${idx === brands.length - 1 && brands.length % 2 !== 0 ? " col-span-2 sm:col-span-1" : ""}`}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border shadow-sm"
                  style={{ backgroundColor: brand.logoBg ?? "white", borderColor: `${brand.color}55` }}
                >
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="h-full w-full object-contain p-1.5" />
                  ) : (
                    <span className="text-xs font-black" style={{ color: brand.color }}>
                      {brand.name.slice(0, 3)}
                    </span>
                  )}
                </span>
                <span className="text-center text-xs font-black text-white/80 transition-colors group-hover:text-white">
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="marcas" className="scroll-mt-[72px] border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-3 text-xs font-black uppercase text-red-600 dark:text-red-400">
                <span className="h-px w-9 bg-red-500/50" />
                Portfólio comercial
              </div>
              <h2 className="text-3xl font-black text-foreground sm:text-4xl">Marcas fortes para lojas, oficinas e distribuidores</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Consulte cada indústria, veja produtos em destaque e acesse materiais comerciais para acelerar a compra.
              </p>
            </div>
            <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm sm:w-auto">
              <Building2 className="h-5 w-5 shrink-0 text-red-600" />
              <div>
                <p className="text-sm font-black text-foreground">{brands.length} indústrias parceiras</p>
                <p className="text-xs text-muted-foreground">Portfólio atualizado para motopeças</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(brand)}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${brand.color}55`;
                  e.currentTarget.style.boxShadow = `0 20px 42px -18px ${brand.color}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="flex items-center gap-4 border-b border-border p-5">
                  <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border shadow-sm"
                    style={{
                      borderColor: `${brand.color}35`,
                      backgroundColor: brand.logoBg ?? "white",
                    }}
                  >
                    {brand.logo ? (
                      <img src={brand.logo} alt={brand.name} className="h-full w-full object-contain p-2" />
                    ) : (
                      <span className="text-sm font-black" style={{ color: brand.color }}>
                        {brand.name.slice(0, 3)}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-black text-foreground">{brand.name}</span>
                    <span className="mt-1 block text-sm font-bold" style={{ color: brand.color }}>
                      {brand.tagline}
                    </span>
                  </span>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:translate-x-0.5"
                    style={{ backgroundColor: `${brand.color}14` }}
                  >
                    <ChevronRight className="h-4 w-4" style={{ color: brand.color }} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{brand.description}</p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {brand.featuredProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="aspect-square overflow-hidden rounded-md bg-secondary">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {brand.featuredProducts.slice(0, 2).map((product) => (
                      <span
                        key={product.id}
                        className="rounded-md border px-2.5 py-1 text-xs font-bold"
                        style={{ borderColor: `${brand.color}25`, backgroundColor: `${brand.color}0f`, color: brand.color }}
                      >
                        {product.category}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs font-semibold text-muted-foreground">{brand.catalogProducts.length} linhas no catálogo</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-black" style={{ color: brand.color }}>
                      Ver detalhes
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/45">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 flex items-center gap-3 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <span className="h-px w-9 bg-red-500/50" />
              Diferenciais
            </div>
            <h2 className="text-3xl font-black text-foreground sm:text-4xl">Estrutura comercial para vender com mais segurança</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-red-500/30 hover:shadow-lg">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-red-500/15 bg-red-500/10">
                  <Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-base font-black text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-3 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <span className="h-px w-9 bg-red-500/50" />
              Processo
              <span className="h-px w-9 bg-red-500/50" />
            </div>
            <h2 className="text-3xl font-black text-foreground sm:text-4xl">Do catálogo ao pedido, sem burocracia</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              A S&A centraliza o contato comercial para facilitar a rotina de quem compra e revende motopeças.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative rounded-lg border border-border bg-card p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-black text-muted-foreground">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-black text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

                  {index < STEPS.length - 1 && (
                    <div className="absolute -right-3 top-10 z-10 hidden h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm md:flex">
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white/10">
              <Headphones className="h-6 w-6 text-red-300" />
            </div>
            <h2 className="max-w-2xl text-3xl font-black sm:text-4xl">Quer comprar melhor para sua loja ou oficina?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Fale com a equipe comercial, solicite catálogos e conheça as linhas mais indicadas para o seu mix de motopeças.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-black text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-red-50 cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-green-600" />
            Falar pelo WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                  <img src="/assets/sa-logo.png" alt="S&A" className="h-10 w-10 object-contain" />
                </span>
                <div>
                  <p className="text-sm font-black text-foreground">{SITE_CONFIG.companyName}</p>
                  <p className="text-xs font-semibold text-muted-foreground">{SITE_CONFIG.shortDescription}</p>
                </div>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Representação comercial de motopeças para revendas, oficinas e distribuidores no Nordeste.
              </p>
            </div>

            <div>
              <p className="mb-4 text-xs font-black uppercase text-muted-foreground">Marcas</p>
              <div className="grid grid-cols-2 gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => onSelectBrand(brand)}
                    className="flex items-center gap-2 text-left text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: brand.color }} />
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-black uppercase text-muted-foreground">Atendimento</p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  BA, SE, AL e PE
                </p>
                <p className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-red-600" />
                  Televendas e SAC
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.companyName} Ltda. Todos os direitos reservados.</p>
            <p>Catálogos, linhas e pedidos por atendimento comercial.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
