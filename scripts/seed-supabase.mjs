/**
 * Migração: sobe o conteúdo atual (marcas, produtos, fotos e PDFs) para o Supabase.
 *
 * Pré-requisitos: já ter criado o projeto no Supabase e rodado o supabase/schema.sql.
 *
 * Como rodar (a partir da raiz do projeto), no PowerShell:
 *   $env:SUPABASE_URL="https://xxxx.supabase.co"; $env:SUPABASE_SERVICE_KEY="service_role_key"; node scripts/seed-supabase.mjs
 *
 * - SUPABASE_URL: a URL do projeto (Settings → API).
 * - SUPABASE_SERVICE_KEY: a chave **service_role** (Settings → API). NÃO exponha isso no site;
 *   é usada só aqui, localmente, porque ignora o RLS para popular o banco.
 *
 * Idempotente: pode rodar de novo (upsert) sem duplicar.
 */
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!url || !serviceKey) {
  console.error("Defina SUPABASE_URL e SUPABASE_SERVICE_KEY. Veja o cabeçalho deste arquivo.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const IMG = {
  suspension: "https://images.unsplash.com/photo-1603137000613-6833a8002b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  parts: "https://images.unsplash.com/photo-1590506995460-d0d9892b54da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  performance: "https://images.unsplash.com/photo-1590507014612-08b6a0b4e31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
};

const p = (id, name, ref, description, image, category) => ({ id, name, ref, description, image, category });

const PRODUCTS = {
  cometa: [
    p("com-1", "Manete de embreagem Bros/XRE", "COM-EMBL", "Manete curta para Bros 150, XRE 300, Falcon e Tornado.", "/assets/products/cometa-1.png", "Manete"),
    p("com-2", "Manete CG/Titan/Fan", "COM-EMBCG", "Manete de embreagem para CG 92-95, Titan e Fan — alta aplicabilidade.", "/assets/products/cometa-2.png", "Manete"),
    p("com-3", "Manete cromado CBX/Twister/CB300", "COM-EMBCR", "Versão curta cromada para Twister, CB 300, XLR e XLS.", "/assets/products/cometa-3.png", "Manete"),
    p("com-4", "Manete YBR 125", "COM-EMBYBR", "Manete cromado curto para YBR 125, acabamento premium.", "/assets/products/cometa-4.png", "Manete"),
    p("com-5", "Manete NX Sahara / XLX", "COM-EMBNX", "Manete curto cromado para NX Sahara 150/200 e XLX.", "/assets/products/cometa-5.png", "Manete"),
    p("com-6", "Manete polido Titan 150", "COM-EMBPOL", "Versão polida para Titan 95/99/00 e Titan 150, peça de alto giro.", "/assets/products/cometa-6.png", "Manete"),
  ],
  unibreq: [
    p("uni-1", "Pastilhas de freio", "UNI-PAST", "Pastilhas para reposição com resposta segura na frenagem.", "/assets/products/unibreq-1.jpg", "Pastilha"),
    p("uni-2", "Discos de freio", "UNI-DISCO", "Discos para diferentes modelos e cilindradas.", "/assets/products/unibreq-2.jpg", "Disco"),
    p("uni-3", "Sistemas de freio", "UNI-FREIO", "Linha voltada para oficinas, lojas e distribuidores.", "/assets/products/unibreq-3.jpg", "Freios"),
    p("uni-4", "Kits de freio", "UNI-KIT", "Combinações para manutenção prática e venda consultiva.", "/assets/products/unibreq-4.jpg", "Kit"),
    p("uni-5", "Sapatas de freio", "UNI-SAP", "Aplicações para motos de uso diário.", IMG.parts, "Sapata"),
  ],
  fna: [
    p("fna-1", "Amortecedor Titan 150/160", "FNA-TITAN", "Amortecedor traseiro para reposição direta nas principais motos de trabalho.", "/assets/products/fna-1.jpg", "Amortecedor"),
    p("fna-7", "Garfo dianteiro Titan/Fan", "FNA-GARFTITAN", "Garfo dianteiro completo para reposição direta nas motos de trabalho.", IMG.suspension, "Garfo"),
    p("fna-2", "Amortecedor CB 300R", "FNA-CB300", "Reposição para trail e naked com amortecimento progressivo.", "/assets/products/fna-2.jpg", "Amortecedor"),
    p("fna-3", "Amortecedor XTZ 250 Lander", "FNA-XTZ250", "Linha para uso off-road e estrada com maior resistência.", "/assets/products/fna-3.jpg", "Suspensão"),
    p("fna-4", "Amortecedor NXR Bros 150", "FNA-BROS", "Aplicação específica para Bros, linha de alta demanda no Nordeste.", "/assets/products/fna-4.jpg", "Amortecedor"),
    p("fna-5", "Amortecedor XRE 300", "FNA-XRE", "Suspensão traseira para adventure com maior curso de amortecimento.", "/assets/products/fna-5.jpg", "Suspensão"),
    p("fna-6", "Amortecedor PCX 150", "FNA-PCX", "Reposição para scooter e motos de uso urbano intenso.", "/assets/products/fna-6.jpg", "Scooter"),
    p("fna-8", "Garfo dianteiro CG 150/160", "FNA-GARFCG", "Garfo dianteiro para a linha CG, alta demanda em oficinas e revendas.", IMG.suspension, "Garfo"),
  ],
  motobatt: [
    p("mot-1", "Bateria MBTX 12U AGM QuadFlex", "MOT-MBTX12", "Bateria 14Ah com tecnologia AGM e 4 terminais ajustáveis para múltiplas motos.", "/assets/products/motobatt-1.jpg", "AGM"),
    p("mot-2", "Bateria MBTX 12U — vista posterior", "MOT-MBTX12B", "Reposição prática com QuadFlex para facilitar a instalação em oficinas.", "/assets/products/motobatt-2.jpg", "AGM"),
    p("mot-3", "Bateria MBTX 9U AGM", "MOT-MBTX9", "Linha para naked e esportivas, com alta demanda de partida e vida útil superior.", "/assets/products/motobatt-3.jpg", "AGM"),
    p("mot-4", "Bateria MTZ 6S selada", "MOT-MTZ6", "Bateria selada compacta para motos de menor cilindrada.", "/assets/products/motobatt-4.jpg", "Selada"),
    p("mot-5", "Bateria MTZ 5BR", "MOT-MTZ5", "Modelo de alto giro para motos urbanas e entregadores.", "/assets/products/motobatt-5.jpg", "Selada"),
    p("mot-6", "Bateria MTX 9A", "MOT-MTX9", "Opção de custo-benefício para oficinas com ampla cobertura de aplicação.", "/assets/products/motobatt-6.jpg", "AGM"),
  ],
  gauss: [
    p("gau-1", "Reguladores de voltagem", "GAU-REG", "Componentes elétricos para reposição segura.", "/assets/products/gauss-regulador.webp", "Elétrica"),
    p("gau-2", "Retificadores", "GAU-RET", "Linha para manutenção do sistema de carga.", "/assets/products/gauss-retificador.webp", "Retificador"),
    p("gau-3", "Relés e sensores", "GAU-REL", "Aplicações para diagnóstico e correção elétrica.", "/assets/products/gauss-rele.webp", "Sensor"),
    p("gau-4", "Bobinas de ignição", "GAU-BOB", "Peças para estabilidade de partida e funcionamento.", "/assets/products/gauss-bobina.webp", "Ignição"),
    p("gau-5", "Linha de iluminação", "GAU-LUZ", "Itens elétricos para reposição e manutenção.", "/assets/products/gauss-lampada.webp", "Iluminação"),
  ],
  "dura-race": [
    p("dur-1", "Kit de parafusos de carenagem", "DUR-PARCAR", "Kit completo de parafusos para fixação de carenagem nas principais motos.", "/assets/products/dura-race-1.jpg", "Fixação"),
    p("dur-2", "Parafusos e porcas de motor", "DUR-PARMOT", "Conjunto de parafusos e porcas para fixação de componentes do motor.", "/assets/products/dura-race-2.jpg", "Fixação"),
    p("dur-3", "Abraçadeiras e presilhas", "DUR-ABRA", "Abraçadeiras e presilhas para fixação de mangueiras, cabos e chicotes.", "/assets/products/dura-race-3.jpg", "Fixação"),
    p("dur-4", "Grampos de fixação de carenagem", "DUR-GRAMP", "Grampos e clipes para fixação rápida de carenagens e acabamentos.", "/assets/products/dura-race-4.jpg", "Fixação"),
    p("dur-5", "Kit de fixação universal", "DUR-KITUNI", "Sortimento de parafusos, porcas e arruelas para uso geral em oficina.", "/assets/products/dura-race-5.jpg", "Fixação"),
  ],
  repool: [
    p("rep-1", "Coxim do motor", "REP-COXIM", "Coxins injetados em borracha para fixação e amortecimento do motor.", "/assets/products/repool-1.jpg", "Borracha"),
    p("rep-2", "Paralama e protetores plásticos", "REP-PARAL", "Peças injetadas em plástico para reposição de paralamas e protetores.", "/assets/products/repool-2.jpg", "Plástico"),
    p("rep-3", "Borrachas e vedações", "REP-VEDA", "Linha de borrachas, coxins e vedações injetadas para diversos modelos.", "/assets/products/repool-3.jpg", "Borracha"),
    p("rep-4", "Buchas e amortecedores de borracha", "REP-BUCHA", "Buchas e batentes injetados em borracha para suspensão e chassi.", "/assets/products/repool-4.jpg", "Borracha"),
    p("rep-5", "Acabamentos e peças plásticas", "REP-PLAS", "Componentes injetados em plástico para acabamento e reposição.", "/assets/products/repool-5.jpg", "Plástico"),
  ],
};

const BRANDS = [
  { id: "cometa", name: "COMETA", sort: 0, color: "#CC1515", logo: "/assets/brands/cometa.png", tagline: "Manetes e ciclística", description: "Linha completa de manetes, pedais, suportes e componentes de ciclística para as principais motocicletas do mercado nacional." },
  { id: "unibreq", name: "UNIBREQ", sort: 1, color: "#FFD100", logo: "/assets/brands/unibreq.png", tagline: "Freios e segurança", description: "Marca reconhecida em freios para motos, com pastilhas, discos e itens de manutenção para o mercado de motopeças." },
  { id: "fna", name: "FNA", sort: 2, color: "#F47B20", logo: "/assets/brands/fna.webp", tagline: "Amortecedores e garfos para motos", description: "Fábrica Nacional de Amortecedores: linha completa de amortecedores traseiros e garfos dianteiros para as principais motocicletas do mercado nacional." },
  { id: "motobatt", name: "MOTOBATT", sort: 3, color: "#facc15", logo: "/assets/brands/motobatt.png", logoBg: "#111111", tagline: "Baterias para motocicletas", description: "Soluções em baterias e energia para motos, com foco em partida confiável e reposição de qualidade." },
  { id: "gauss", name: "GAUSS", sort: 4, color: "#0066B3", logo: "/assets/brands/gauss.png", tagline: "Elétrica e eletrônica", description: "Componentes elétricos e eletrônicos para reposição, manutenção e diagnóstico no segmento de motocicletas.", extraCatalogs: [
    { label: "Lançamentos — Maio", file: "/catalogs/lançamentos-moto-maio 1 1.pdf" },
    { label: "Lançamentos — Agosto", file: "/catalogs/lancamentos_moto_agosto.pdf" },
    { label: "Lançamentos — Dezembro", file: "/catalogs/lancamentos_moto_dezembro.pdf" },
  ] },
  { id: "dura-race", name: "DURA RACE", sort: 5, color: "#E8540A", logo: "/assets/brands/dura-race.jpg", tagline: "Linha de fixação para motos", description: "Especialistas na linha de fixação de motos, com catálogo completo e vasto neste segmento." },
  { id: "repool", name: "REPOOL", sort: 6, color: "#27AE60", logo: "/assets/brands/repool.png", tagline: "Injetados em borracha e plástico", description: "Especialistas em produtos injetados em borracha e plástico para o mercado de motos." },
];

const cache = new Map();
const contentTypes = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", pdf: "application/pdf" };

async function uploadSource(bucket, source) {
  if (!source) return null;
  const cacheKey = `${bucket}:${source}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  let buffer, filename;
  try {
    if (source.startsWith("http")) {
      const res = await fetch(source);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      buffer = Buffer.from(await res.arrayBuffer());
      filename = (source.split("/").pop()?.split("?")[0] || "file") + ".jpg";
    } else {
      const local = path.join(PUBLIC, source.replace(/^\//, ""));
      if (!existsSync(local)) {
        console.warn(`  ! não encontrado, pulando: ${source}`);
        cache.set(cacheKey, null);
        return null;
      }
      buffer = await readFile(local);
      filename = path.basename(local);
    }
    const ext = filename.split(".").pop()?.toLowerCase() || "bin";
    const safeName = filename
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // remove acentos
      .replace(/[^a-zA-Z0-9._-]+/g, "_"); // só caracteres válidos em chave de storage
    const objectPath = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
    const { error } = await supabase.storage.from(bucket).upload(objectPath, buffer, {
      contentType: contentTypes[ext] || "application/octet-stream",
      upsert: true,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    cache.set(cacheKey, data.publicUrl);
    console.log(`  ↑ ${filename}`);
    return data.publicUrl;
  } catch (err) {
    console.warn(`  ! falha em ${source}: ${err.message}`);
    cache.set(cacheKey, null);
    return null;
  }
}

async function run() {
  console.log(`Migrando para ${url} ...\n`);

  for (const b of BRANDS) {
    console.log(`Marca ${b.name}:`);
    const logo_url = await uploadSource("images", b.logo);
    const main_catalog_url = await uploadSource("catalogs", `/catalogs/${b.id}-catalogo.pdf`);

    const extra_catalogs = [];
    for (const c of b.extraCatalogs ?? []) {
      const fileUrl = await uploadSource("catalogs", c.file);
      if (fileUrl) extra_catalogs.push({ label: c.label, file: fileUrl });
    }

    const { error: be } = await supabase.from("brands").upsert({
      id: b.id,
      name: b.name,
      tagline: b.tagline,
      description: b.description,
      color: b.color,
      logo_url,
      logo_bg: b.logoBg ?? null,
      logo_text: b.name,
      main_catalog_url,
      extra_catalogs,
      sort_order: b.sort,
    });
    if (be) throw be;

    const list = PRODUCTS[b.id] ?? [];
    for (let i = 0; i < list.length; i++) {
      const prod = list[i];
      const image_url = await uploadSource("images", prod.image);
      const { error: pe } = await supabase.from("products").upsert({
        id: prod.id,
        brand_id: b.id,
        name: prod.name,
        ref: prod.ref,
        description: prod.description,
        category: prod.category,
        image_url,
        sort_order: i,
      });
      if (pe) throw pe;
    }
    console.log(`  ✓ ${b.name} (${list.length} produtos)`);
  }

  console.log("\nPronto! Conteúdo migrado para o Supabase.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
