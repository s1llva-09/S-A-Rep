import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  Headphones,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
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
    icon: ShieldCheck,
    title: "Confiança",
    desc: "Marcas selecionadas, relacionamento próximo e suporte para decisões comerciais.",
  },
  {
    icon: Zap,
    title: "Agilidade",
    desc: "Contato direto para catálogos, dúvidas, lançamentos e acompanhamento de pedidos.",
  },
  {
    icon: Users,
    title: "Relacionamento",
    desc: "Parceria com revendas, oficinas e distribuidores que precisam comprar melhor.",
  },
  {
    icon: Star,
    title: "Compromisso",
    desc: "Cuidado com cada etapa da negociação, da consulta inicial ao pós-venda.",
  },
];

const METRICS = [
  { value: "2009", label: "ano de início" },
  { value: String(brands.length), label: "indústrias" },
  { value: String(STATES.length), label: "estados" },
];

const COMMERCIAL_POINTS = [
  "Portfólio com marcas de alto giro no mercado de motopeças.",
  "Atendimento voltado para lojas, oficinas e distribuidores.",
  "Consulta rápida a catálogos, linhas, lançamentos e aplicações.",
];

export function AboutPage({ onBack, onSelectBrand }: AboutPageProps) {
  const whatsappUrl = getWhatsAppUrl("Olá! Vim pelo site da S&A Representações e gostaria de mais informações.");

  return (
    <div className="min-h-full bg-background pb-20 transition-colors duration-300">
      <div className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-black text-foreground sm:block">{SITE_CONFIG.companyName}</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
              backgroundSize: "54px 54px",
            }}
          />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:items-center lg:py-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <Factory className="h-3.5 w-3.5" />
              Sobre a S&A
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Representação comercial estruturada para o mercado de motopeças.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A <strong className="font-bold text-foreground">S&A Representações</strong> conecta indústrias parceiras a
              revendas, oficinas e distribuidores no Nordeste, com atuação consultiva e foco em relacionamento comercial de longo prazo.
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {METRICS.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                  <p className="text-3xl font-black leading-none text-red-600">{item.value}</p>
                  <p className="mt-2 text-xs font-black uppercase text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-6 text-center shadow-xl shadow-black/5">
            <img
              src="/assets/sa-logo.png"
              alt="S&A Representações"
              className="mx-auto aspect-square w-full max-w-[260px] object-contain"
            />
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-lg font-black text-foreground">Atendimento comercial</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Catálogos, pedidos e suporte para linhas de motopeças por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <span className="h-px w-9 bg-red-500/50" />
              Quem somos
            </div>
            <h2 className="text-3xl font-black text-foreground">Um elo direto entre indústria e revenda</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                A S&A atua levando marcas parceiras até clientes que precisam de variedade, disponibilidade e segurança para comprar.
              </p>
              <p>
                O trabalho combina atendimento próximo, leitura do mix ideal para cada cliente e suporte na consulta de catálogos,
                lançamentos e condições comerciais.
              </p>
              <p>
                Hoje a empresa representa{" "}
                <strong className="font-bold text-foreground">COMETA, UNIBREQ, FNA, MOTOBATT, GAUSS, DURA RACE e REPOOL</strong>,
                com presença comercial em BA, SE, AL e PE.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">Atuação comercial</p>
                <p className="text-xs text-muted-foreground">Estrutura para compra consultiva</p>
              </div>
            </div>
            <div className="space-y-3">
              {COMMERCIAL_POINTS.map((point) => (
                <div key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/45">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="mb-9 max-w-2xl">
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <span className="h-px w-9 bg-red-500/50" />
              O que nos move
            </div>
            <h2 className="text-3xl font-black text-foreground">Valores que sustentam a operação</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-red-500/30 hover:shadow-lg">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-red-500/15 bg-red-500/10">
                  <Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-base font-black text-foreground">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <span className="h-px w-9 bg-red-500/50" />
              Cobertura
            </div>
            <h2 className="text-3xl font-black text-foreground">Presença regional no Nordeste</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A atuação da S&A é concentrada em quatro estados, com foco em clientes que precisam de atendimento comercial próximo,
              informação rápida e portfólio adequado para motopeças.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <MapPin className="h-4 w-4 text-red-600" />
              Bahia, Sergipe, Alagoas e Pernambuco.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATES.map((state) => (
              <div key={state.uf} className="rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-red-500/30 hover:shadow-lg">
                <p className="text-4xl font-black leading-none text-red-600">{state.uf}</p>
                <p className="mt-3 text-base font-black text-foreground">{state.name}</p>
                <p className="mt-1 text-xs font-semibold text-muted-foreground">Cobertura comercial</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-16">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <span className="h-px w-9 bg-red-500/50" />
              Equipe
            </div>
            <h2 className="text-3xl font-black text-foreground">Quem atende você</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O contato comercial é direto, com pessoas responsáveis por orientar pedidos, acompanhar dúvidas e facilitar a rotina de compra.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TEAM.map(({ name, role, icon: Icon }) => (
              <div key={name} className="rounded-lg border border-border bg-background p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-lg font-black text-foreground">{name}</p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase text-red-600 dark:text-red-400">
              <span className="h-px w-9 bg-red-500/50" />
              Indústrias
            </div>
            <h2 className="text-3xl font-black text-foreground">Marcas representadas</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Portfólio comercial disponível para consulta.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <Building2 className="h-4 w-4 text-red-600" />
            {brands.length} indústrias parceiras
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onSelectBrand(brand)}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${brand.color}45`;
                e.currentTarget.style.boxShadow = `0 14px 30px -18px ${brand.color}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border shadow-sm"
                style={{ borderColor: `${brand.color}35`, backgroundColor: brand.logoBg ?? "white" }}
              >
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="h-full w-full object-contain p-1.5" />
                ) : (
                  <span className="text-sm font-black" style={{ color: brand.color }}>
                    {brand.name.slice(0, 3)}
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black text-foreground">{brand.name}</span>
                <span className="mt-1 block truncate text-xs font-semibold text-muted-foreground">{brand.tagline}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: brand.color }} />
            </button>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white/10">
              <MessageCircle className="h-6 w-6 text-red-300" />
            </div>
            <h2 className="max-w-2xl text-3xl font-black sm:text-4xl">Fale com a S&A Representações</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Solicite catálogos, tire dúvidas sobre as indústrias representadas ou inicie seu pedido diretamente pelo WhatsApp.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-black text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-red-50 cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-green-600" />
            Entrar em contato
          </a>
        </div>
      </section>
    </div>
  );
}
