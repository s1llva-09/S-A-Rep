import { RefObject } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronRight,
  Headphones,
  MapPin,
  MessageCircle,
  Package,
  Shield,
} from "lucide-react";
import { brands, Brand } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SITE_CONFIG } from "../config";
import { ThemeToggle } from "./ThemeToggle";

interface HomePageProps {
  onSelectBrand: (brand: Brand) => void;
  onNavigateAbout: () => void;
  scrollContainer: RefObject<HTMLDivElement | null>;
}

const HERO_IMAGE = "/assets/sa-presentation.png";

const STATS = [
  { value: String(brands.length), label: "Indústrias", icon: Building2 },
  { value: "4", label: "Estados", icon: MapPin },
  { value: "2009", label: "Desde", icon: CalendarDays },
  { value: "Direto", label: "WhatsApp", icon: MessageCircle },
];

const STEPS = [
  { step: "01", title: "Escolha a indústria", desc: "Veja as marcas representadas e encontre a linha mais adequada para sua loja ou oficina." },
  { step: "02", title: "Consulte o catálogo", desc: "Acesse produtos, categorias e referências para montar o pedido com mais segurança." },
  { step: "03", title: "Fale com a equipe", desc: "Finalize dúvidas e condições diretamente com o atendimento comercial da S&A." },
];

export function HomePage({ onSelectBrand, onNavigateAbout }: HomePageProps) {
  const scrollToMarcas = () => {
    document.getElementById("marcas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-full bg-background transition-colors duration-300">
      <nav className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg border border-border bg-white flex items-center justify-center overflow-hidden shrink-0">
              <img src="/assets/sa-logo.png" alt="S&A Representações" className="w-9 h-9 object-contain" />
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="text-foreground font-bold text-sm leading-none truncate">{SITE_CONFIG.companyName}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{SITE_CONFIG.shortDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={onNavigateAbout}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Sobre nós
              </button>
              <button
                onClick={scrollToMarcas}
                className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-red-600 transition-colors cursor-pointer"
              >
                Ver marcas
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-px h-5 bg-border hidden sm:block" />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <section className="relative h-[calc(100vh-64px)] min-h-[620px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={HERO_IMAGE}
            alt="Identidade visual da S&A Representações"
            className="w-full h-full object-cover object-center dark:opacity-30 opacity-80"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-[#0a0a0a] dark:via-[#0a0a0a]/75 dark:to-transparent bg-gradient-to-r from-background via-background/86 to-background/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="w-32 sm:w-40 aspect-square mb-6 bg-white rounded-2xl overflow-hidden p-2 shadow-lg">
              <img
                src="/assets/sa-logo.png"
                alt="S&A Representações"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2 mb-6 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Representação comercial</span>
            </div>

            <h1 className="text-foreground leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2.75rem, 7vw, 4.5rem)", fontWeight: 900 }}>
              S&A<br />
              <span className="text-red-600 dark:text-red-500">Representações</span>
            </h1>

            <p className="text-muted-foreground mt-5 text-lg leading-relaxed max-w-xl">
              Indústrias de motopeças conectadas a lojas, oficinas e distribuidores na Bahia, Sergipe, Alagoas e Pernambuco.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <div className="flex items-center gap-2 bg-card/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border text-muted-foreground text-sm font-medium shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                BA, SE, AL e PE
              </div>
              <div className="flex items-center gap-2 bg-card/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border text-muted-foreground text-sm font-medium shadow-sm">
                <Shield className="w-3.5 h-3.5 text-red-500 shrink-0" />
                {brands.length} indústrias representadas
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToMarcas}
                className="group flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-8 py-3.5 rounded-lg font-bold transition-all cursor-pointer shadow-lg shadow-red-600/25 hover:shadow-red-600/45 hover:-translate-y-0.5"
              >
                Ver indústrias
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onNavigateAbout}
                className="flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg font-semibold transition-all cursor-pointer hover:bg-card/80"
              >
                Sobre nós
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToMarcas}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-40 hover:opacity-80 transition-opacity"
          aria-label="Rolar para marcas"
        >
          <div className="w-px h-10 bg-foreground/40 rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
      </section>

      <section className="border-y border-border bg-card/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-0">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={[
                  "flex flex-col items-center text-center py-4 px-4",
                  index < STATS.length - 1 ? "sm:border-r border-border" : "",
                  index % 2 === 0 ? "border-b sm:border-b-0 border-border" : "",
                ].join(" ")}
              >
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-foreground font-black tracking-tight text-2xl leading-none">{stat.value}</p>
                <p className="text-muted-foreground text-xs font-semibold mt-1.5 uppercase tracking-wider leading-tight">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="marcas" className="bg-secondary/40 border-y border-border scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-red-500/60" />
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Indústrias representadas</span>
              <div className="h-px w-10 bg-red-500/60" />
            </div>
            <h2 className="text-foreground font-black tracking-tight text-3xl">Nossas marcas</h2>
            <p className="text-muted-foreground mt-3 text-base max-w-md mx-auto">
              Selecione uma indústria para consultar linhas, produtos e catálogo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(brand)}
                className="group bg-card border border-border rounded-lg text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full flex flex-col overflow-hidden relative shadow-sm hover:shadow-xl"
              >
                <div className="h-1 w-full opacity-70 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: brand.color }} />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ border: `1.5px solid ${brand.color}35`, backgroundColor: brand.logoBg ?? 'white' }}
                    >
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-1.5" />
                      ) : (
                        <span className="font-black text-base tracking-tight" style={{ color: brand.color }}>
                          {brand.name.slice(0, 3)}
                        </span>
                      )}
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${brand.color}15` }}
                    >
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: brand.color }} />
                    </div>
                  </div>

                  <h3 className="text-foreground text-xl font-bold tracking-tight">{brand.name}</h3>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: brand.color }}>{brand.tagline}</p>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed line-clamp-2 flex-grow">{brand.description}</p>

                  <div className="mt-5 flex gap-2">
                    {brand.featuredProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex-1 h-[72px] rounded-lg overflow-hidden bg-secondary/60">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-3">
                    <span className="text-muted-foreground text-xs font-medium">{brand.catalogProducts.length} linhas no catálogo</span>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full shrink-0"
                      style={{ backgroundColor: `${brand.color}15`, color: brand.color }}
                    >
                      Ver catálogo
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-red-500/60" />
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Atendimento</span>
              <div className="h-px w-10 bg-red-500/60" />
            </div>
            <h2 className="text-foreground font-black tracking-tight text-3xl">Como fazer seu pedido</h2>
            <p className="text-muted-foreground mt-3 text-base">Simples, rápido e direto com a equipe S&A.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {STEPS.map((item, index) => (
              <div key={item.step} className="relative bg-card border border-border rounded-lg p-7 shadow-sm overflow-hidden group hover:border-red-500/20 transition-colors">
                <div
                  className="absolute -right-3 -top-4 text-[5rem] font-black leading-none select-none pointer-events-none text-foreground/[0.04] dark:text-foreground/[0.06]"
                  aria-hidden
                >
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-6 relative z-10">
                  <span className="text-red-500 font-black text-base">{item.step}</span>
                </div>
                <h3 className="text-foreground font-bold text-lg mb-2 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{item.desc}</p>

                {index < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-10 z-20 w-6 h-6 rounded-full bg-background border border-border items-center justify-center shadow-sm">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Headphones className="w-4 h-4 text-red-500" />
            <span>Televendas e SAC acompanham o atendimento comercial.</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-border bg-white flex items-center justify-center overflow-hidden shrink-0">
              <img src="/assets/sa-logo.png" alt="S&A Representações" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <p className="text-foreground font-bold text-sm">{SITE_CONFIG.companyName} Ltda</p>
              <p className="text-muted-foreground text-xs">{SITE_CONFIG.shortDescription}</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {SITE_CONFIG.companyName}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
