import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Headphones,
  MapPin,
  MessageCircle,
  Package,
  Shield,
  Star,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import { brands, Brand } from "./data";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_CONFIG, getWhatsAppUrl } from "../config";

interface AboutPageProps {
  onBack: () => void;
  onSelectBrand: (brand: Brand) => void;
}

const TEAM = [
  { name: "Aline Brandrão", role: "Televendas", icon: Headphones },
  { name: "Ana Paula", role: "SAC", icon: UserRound },
];

const STATES = [
  { uf: "BA", name: "Bahia" },
  { uf: "SE", name: "Sergipe" },
  { uf: "AL", name: "Alagoas" },
  { uf: "PE", name: "Pernambuco" },
];

const VALUES = [
  {
    icon: Shield,
    title: "Confiança",
    desc: "Representação com marcas selecionadas e atendimento próximo aos clientes.",
  },
  {
    icon: Zap,
    title: "Agilidade",
    desc: "Contato direto para pedidos, catálogos e suporte comercial no dia a dia.",
  },
  {
    icon: Users,
    title: "Relacionamento",
    desc: "Parceria com lojas, oficinas e distribuidores que precisam comprar melhor.",
  },
  {
    icon: Star,
    title: "Compromisso",
    desc: "Cuidado com cada negociação, do primeiro contato ao pós-venda.",
  },
];

const METRICS = [
  { value: "2009", label: "Desde" },
  { value: String(brands.length), label: "Indústrias" },
  { value: String(STATES.length), label: "Estados" },
];

export function AboutPage({ onBack, onSelectBrand }: AboutPageProps) {
  return (
    <div className="min-h-full bg-background transition-colors duration-300 pb-24">
      <div className="sticky top-0 z-30 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Voltar</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-foreground font-semibold text-sm hidden sm:block">{SITE_CONFIG.companyName}</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Sobre nós</span>
            </div>
            <h1 className="text-foreground font-black tracking-tight mb-5" style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}>
              Representação comercial em motopeças desde 2009
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              A <span className="text-foreground font-semibold">S&A Representações</span> conecta indústrias de motopeças a lojas,
              oficinas e distribuidores na Bahia, Sergipe, Alagoas e Pernambuco, com atendimento próximo e foco em venda consultiva.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-9 max-w-xl">
              {METRICS.map((item) => (
                <div key={item.label} className="bg-background border border-border rounded-lg p-4">
                  <p className="text-red-500 font-black text-2xl leading-none">{item.value}</p>
                  <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6 flex flex-col items-center text-center shadow-sm">
            <img
              src="/assets/sa-logo.png"
              alt="S&A Representações"
              className="w-full max-w-[260px] aspect-square object-contain"
            />
            <div className="w-full border-t border-border pt-5 mt-5">
              <p className="text-foreground font-bold">Atendimento comercial</p>
              <p className="text-muted-foreground text-sm mt-1">Motopeças, catálogos e pedidos por WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-red-500/60" />
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Quem somos</span>
            </div>
            <h2 className="text-foreground font-black tracking-tight text-2xl mb-6">
              Um elo direto entre indústria e revenda
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
              <p>
                A S&A Representações atua no mercado de motopeças levando marcas parceiras até clientes que precisam de variedade,
                disponibilidade e segurança para comprar.
              </p>
              <p>
                O trabalho é feito com atendimento comercial próximo, leitura do mix ideal para cada cliente e suporte para consulta
                de catálogos, lançamentos e condições de pedido.
              </p>
              <p>
                Hoje representamos <strong className="text-foreground font-semibold">COMETA, UNIBREQ, FNA, MOTOBATT, GAUSS, DURA RACE e REPOOL</strong>,
                atendendo o Nordeste com presença comercial nos estados de BA, SE, AL e PE.
              </p>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-red-500/60" />
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">O que nos move</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-lg p-5">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center mb-4">
                    <Icon className="w-4.5 h-4.5 text-red-500" />
                  </div>
                  <p className="text-foreground font-bold text-sm mb-1.5">{title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-red-500/60" />
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Cobertura</span>
            </div>
            <h2 className="text-foreground font-black tracking-tight text-2xl mb-4">Estados representados</h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-6">
              A atuação comercial da S&A está concentrada em quatro estados do Nordeste, com atendimento voltado para lojistas,
              oficinas e distribuidores de motopeças.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Bahia, Sergipe, Alagoas e Pernambuco.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {STATES.map((state) => (
              <div key={state.uf} className="bg-card border border-border rounded-lg p-5">
                <p className="text-red-500 font-black text-2xl leading-none">{state.uf}</p>
                <p className="text-foreground font-bold text-sm mt-3">{state.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-red-500/60" />
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Equipe</span>
            </div>
            <h2 className="text-foreground font-black tracking-tight text-2xl mb-4">Quem atende você</h2>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              O contato comercial é direto, com pessoas responsáveis por orientar pedidos, acompanhar dúvidas e facilitar a rotina de compra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEAM.map(({ name, role, icon: Icon }) => (
              <div key={name} className="bg-card border border-border rounded-lg p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-foreground font-bold">{name}</p>
                  <p className="text-muted-foreground text-sm mt-1">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-red-500/60" />
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Indústrias</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-foreground font-black tracking-tight text-2xl">Marcas representadas</h2>
              <p className="text-muted-foreground text-sm mt-2">Selecione uma indústria para ver linhas e catálogo.</p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Building2 className="w-4 h-4 text-red-500" />
              <span>{brands.length} indústrias parceiras</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(brand)}
                className="group flex items-center gap-4 bg-card border border-border rounded-lg p-5 text-left hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer hover:border-border/60"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                  style={{ border: `1.5px solid ${brand.color}35`, backgroundColor: brand.logoBg ?? 'white' }}
                >
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="font-black text-sm" style={{ color: brand.color }}>{brand.name.slice(0, 3)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-bold text-sm">{brand.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{brand.tagline}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="bg-red-600 rounded-lg p-8 sm:p-10 text-center shadow-xl shadow-red-600/20">
          <MessageCircle className="w-10 h-10 text-white/85 mx-auto mb-4" />
          <h3 className="text-white font-black text-2xl mb-2 tracking-tight">Fale com a S&A Representações</h3>
          <p className="text-red-50 max-w-md mx-auto mb-6 text-sm leading-relaxed">
            Solicite catálogos, tire dúvidas sobre as indústrias representadas ou inicie seu pedido pelo WhatsApp.
          </p>
          <a
            href={getWhatsAppUrl("Olá! Vim pelo site da S&A Representações e gostaria de mais informações.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white text-red-700 font-bold px-7 py-3 rounded-lg hover:bg-red-50 transition-colors shadow-lg cursor-pointer"
          >
            <Package className="w-4.5 h-4.5" />
            Entrar em contato
          </a>
        </div>
      </section>
    </div>
  );
}
