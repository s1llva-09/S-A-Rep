export interface Product {
  id: string;
  name: string;
  ref: string;
  description: string;
  image: string;
  category: string;
}

export interface ExtraCatalog {
  label: string;
  file: string;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  logoText: string;
  logo?: string;
  logoBg?: string;
  featuredProducts: Product[];
  catalogProducts: Product[];
  extraCatalogs?: ExtraCatalog[];
}

const IMG = {
  suspension: "https://images.unsplash.com/photo-1603137000613-6833a8002b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  brake: "https://images.unsplash.com/photo-1620600253422-2b87adc47eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  bearings: "https://images.unsplash.com/photo-1634071257121-8cd59787ff1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  battery: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  electric: "https://images.unsplash.com/photo-1609630875289-22852fa678ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  performance: "https://images.unsplash.com/photo-1590507014612-08b6a0b4e31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  parts: "https://images.unsplash.com/photo-1590506995460-d0d9892b54da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
};

function product(
  id: string,
  name: string,
  ref: string,
  description: string,
  image: string,
  category: string,
): Product {
  return { id, name, ref, description, image, category };
}

const cometaProducts = [
  product("com-1", "Manete de embreagem Bros/XRE", "COM-EMBL", "Manete curta para Bros 150, XRE 300, Falcon e Tornado.", "/assets/products/cometa-1.png", "Manete"),
  product("com-2", "Manete CG/Titan/Fan", "COM-EMBCG", "Manete de embreagem para CG 92-95, Titan e Fan — alta aplicabilidade.", "/assets/products/cometa-2.png", "Manete"),
  product("com-3", "Manete cromado CBX/Twister/CB300", "COM-EMBCR", "Versão curta cromada para Twister, CB 300, XLR e XLS.", "/assets/products/cometa-3.png", "Manete"),
  product("com-4", "Manete YBR 125", "COM-EMBYBR", "Manete cromado curto para YBR 125, acabamento premium.", "/assets/products/cometa-4.png", "Manete"),
  product("com-5", "Manete NX Sahara / XLX", "COM-EMBNX", "Manete curto cromado para NX Sahara 150/200 e XLX.", "/assets/products/cometa-5.png", "Manete"),
  product("com-6", "Manete polido Titan 150", "COM-EMBPOL", "Versão polida para Titan 95/99/00 e Titan 150, peça de alto giro.", "/assets/products/cometa-6.png", "Manete"),
];

const unibreqProducts = [
  product("uni-1", "Pastilhas de freio", "UNI-PAST", "Pastilhas para reposição com resposta segura na frenagem.", "/assets/products/unibreq-1.jpg", "Pastilha"),
  product("uni-2", "Discos de freio", "UNI-DISCO", "Discos para diferentes modelos e cilindradas.", "/assets/products/unibreq-2.jpg", "Disco"),
  product("uni-3", "Sistemas de freio", "UNI-FREIO", "Linha voltada para oficinas, lojas e distribuidores.", "/assets/products/unibreq-3.jpg", "Freios"),
  product("uni-4", "Kits de freio", "UNI-KIT", "Combinações para manutenção prática e venda consultiva.", "/assets/products/unibreq-4.jpg", "Kit"),
  product("uni-5", "Sapatas de freio", "UNI-SAP", "Aplicações para motos de uso diário.", IMG.parts, "Sapata"),
  product("uni-6", "Linha completa Unibreq", "UNI-CAT", "Consulte o catálogo para códigos, modelos e aplicações.", IMG.performance, "Catálogo"),
];

const fnaProducts = [
  product("fna-1", "Amortecedor Titan 150/160", "FNA-TITAN", "Amortecedor traseiro para reposição direta nas principais motos de trabalho.", "/assets/products/fna-1.jpg", "Amortecedor"),
  product("fna-2", "Amortecedor CB 300R", "FNA-CB300", "Reposição para trail e naked com amortecimento progressivo.", "/assets/products/fna-2.jpg", "Amortecedor"),
  product("fna-3", "Amortecedor XTZ 250 Lander", "FNA-XTZ250", "Linha para uso off-road e estrada com maior resistência.", "/assets/products/fna-3.jpg", "Suspensão"),
  product("fna-4", "Amortecedor NXR Bros 150", "FNA-BROS", "Aplicação específica para Bros, linha de alta demanda no Nordeste.", "/assets/products/fna-4.jpg", "Amortecedor"),
  product("fna-5", "Amortecedor XRE 300", "FNA-XRE", "Suspensão traseira para adventure com maior curso de amortecimento.", "/assets/products/fna-5.jpg", "Suspensão"),
  product("fna-6", "Amortecedor PCX 150", "FNA-PCX", "Reposição para scooter e motos de uso urbano intenso.", "/assets/products/fna-6.jpg", "Scooter"),
];

const motobattProducts = [
  product("mot-1", "Bateria MBTX 12U AGM QuadFlex", "MOT-MBTX12", "Bateria 14Ah com tecnologia AGM e 4 terminais ajustáveis para múltiplas motos.", "/assets/products/motobatt-1.jpg", "AGM"),
  product("mot-2", "Bateria MBTX 12U — vista posterior", "MOT-MBTX12B", "Reposição prática com QuadFlex para facilitar a instalação em oficinas.", "/assets/products/motobatt-2.jpg", "AGM"),
  product("mot-3", "Bateria MBTX 9U AGM", "MOT-MBTX9", "Linha para naked e esportivas, com alta demanda de partida e vida útil superior.", "/assets/products/motobatt-3.jpg", "AGM"),
  product("mot-4", "Bateria MTZ 6S selada", "MOT-MTZ6", "Bateria selada compacta para motos de menor cilindrada.", "/assets/products/motobatt-4.jpg", "Selada"),
  product("mot-5", "Bateria MTZ 5BR", "MOT-MTZ5", "Modelo de alto giro para motos urbanas e entregadores.", "/assets/products/motobatt-5.jpg", "Selada"),
  product("mot-6", "Bateria MTX 9A", "MOT-MTX9", "Opção de custo-benefício para oficinas com ampla cobertura de aplicação.", "/assets/products/motobatt-6.jpg", "AGM"),
];

const gaussProducts = [
  product("gau-1", "Reguladores de voltagem", "GAU-REG", "Componentes elétricos para reposição segura.", "/assets/products/gauss-regulador.webp", "Elétrica"),
  product("gau-2", "Retificadores", "GAU-RET", "Linha para manutenção do sistema de carga.", "/assets/products/gauss-retificador.webp", "Retificador"),
  product("gau-3", "Relés e sensores", "GAU-REL", "Aplicações para diagnóstico e correção elétrica.", "/assets/products/gauss-rele.webp", "Sensor"),
  product("gau-4", "Bobinas de ignição", "GAU-BOB", "Peças para estabilidade de partida e funcionamento.", "/assets/products/gauss-bobina.webp", "Ignição"),
  product("gau-5", "Linha de iluminação", "GAU-LUZ", "Itens elétricos para reposição e manutenção.", "/assets/products/gauss-lampada.webp", "Iluminação"),
  product("gau-6", "Linha completa Gauss", "GAU-CAT", "Consulte o catálogo para códigos e aplicações.", "/assets/products/gauss-vela.webp", "Catálogo"),
];

const duraRaceProducts = [
  product("dur-1", "Biela Titan 150 — pino 15mm", "DUR-BIEL150", "Biela completa para reposição direta na Titan 150, com pino de 15mm.", "/assets/products/dura-race-1.jpg", "Biela"),
  product("dur-2", "Induzido motor partida Titan 150", "DUR-IND280", "Induzido do motor de partida para Titan 150 — alta aplicabilidade.", "/assets/products/dura-race-2.jpg", "Induzido"),
  product("dur-3", "Biela Titan 160 / NXR 160 / FAN 160", "DUR-BIEL160", "Reposição para os modelos mais novos da linha Honda 160cc.", "/assets/products/dura-race-3.jpg", "Biela"),
  product("dur-4", "Biela CB 300 / XRE 300", "DUR-BIELCB", "Biela completa para trail e naked de 300cc.", "/assets/products/dura-race-4.jpg", "Biela"),
  product("dur-5", "Biela Titan 150 ES/KS/ESD", "DUR-BIELKS", "Aplicação extensa para as versões mais comuns da Titan 150.", "/assets/products/dura-race-5.jpg", "Biela"),
  product("dur-6", "Biela Fazer 150 / Crosser 150", "DUR-BIELFAZ", "Linha para motos Yamaha 150cc com ampla cobertura.", "/assets/products/dura-race-6.jpg", "Biela"),
];

const repoolProducts = [
  product("rep-1", "Peças de reposição", "REP-PEC", "Linha para manutenção de motos de uso diário.", "/assets/products/repool-1.jpg", "Reposição"),
  product("rep-2", "Componentes para motor", "REP-MOT", "Itens para oficinas e revendedores de motopeças.", "/assets/products/repool-2.jpg", "Motor"),
  product("rep-3", "Kits de manutenção", "REP-KIT", "Produtos organizados para facilitar compra e revenda.", "/assets/products/repool-3.jpg", "Kit"),
  product("rep-4", "Linha de transmissão", "REP-TRA", "Componentes para revisão e manutenção preventiva.", "/assets/products/repool-4.jpg", "Transmissão"),
  product("rep-5", "Acessórios de reposição", "REP-ACE", "Peças de giro para atendimento comercial.", "/assets/products/repool-5.jpg", "Acessórios"),
  product("rep-6", "Linha completa Repool", "REP-CAT", "Consulte o catálogo 2026 para aplicações atualizadas.", "/assets/products/repool-6.jpg", "Catálogo"),
];

export const brands: Brand[] = [
  {
    id: "cometa",
    name: "COMETA",
    tagline: "Manetes e ciclística",
    description: "Linha completa de manetes, pedais, suportes e componentes de ciclística para as principais motocicletas do mercado nacional.",
    color: "#CC1515",
    logoText: "COMETA",
    logo: "/assets/brands/cometa.png",
    featuredProducts: cometaProducts.slice(0, 4),
    catalogProducts: cometaProducts,
  },
  {
    id: "unibreq",
    name: "UNIBREQ",
    tagline: "Freios e segurança",
    description: "Marca reconhecida em freios para motos, com pastilhas, discos e itens de manutenção para o varejo de motopeças.",
    color: "#FFD100",
    logoText: "UNIBREQ",
    logo: "/assets/brands/unibreq.png",
    featuredProducts: unibreqProducts.slice(0, 4),
    catalogProducts: unibreqProducts,
  },
  {
    id: "fna",
    name: "FNA",
    tagline: "Amortecedores para motos",
    description: "Fábrica Nacional de Amortecedores: linha completa de amortecedores traseiros para as principais motocicletas do mercado nacional.",
    color: "#F47B20",
    logoText: "FNA",
    logo: "/assets/brands/fna.webp",
    featuredProducts: fnaProducts.slice(0, 4),
    catalogProducts: fnaProducts,
  },
  {
    id: "motobatt",
    name: "MOTOBATT",
    tagline: "Baterias para motocicletas",
    description: "Soluções em baterias e energia para motos, com foco em partida confiável e reposição de qualidade.",
    color: "#facc15",
    logoText: "MOTOBATT",
    logo: "/assets/brands/motobatt.png",
    logoBg: "#111111",
    featuredProducts: motobattProducts.slice(0, 4),
    catalogProducts: motobattProducts,
  },
  {
    id: "gauss",
    name: "GAUSS",
    tagline: "Elétrica e eletrônica",
    description: "Componentes elétricos e eletrônicos para reposição, manutenção e diagnóstico no segmento de motocicletas.",
    color: "#0066B3",
    logoText: "GAUSS",
    logo: "/assets/brands/gauss.png",
    featuredProducts: gaussProducts.slice(0, 4),
    catalogProducts: gaussProducts,
    extraCatalogs: [
      { label: "Lançamentos — Maio", file: "/catalogs/lançamentos-moto-maio 1 1.pdf" },
      { label: "Lançamentos — Agosto", file: "/catalogs/lancamentos_moto_agosto.pdf" },
      { label: "Lançamentos — Dezembro", file: "/catalogs/lancamentos_moto_dezembro.pdf" },
    ],
  },
  {
    id: "dura-race",
    name: "DURA RACE",
    tagline: "Peças internas de motor",
    description: "Linha de bielas, induzidos e componentes internos de motor para reposição nas principais motocicletas do mercado.",
    color: "#E8540A",
    logoText: "DURA RACE",
    logo: "/assets/brands/dura-race.jpg",
    featuredProducts: duraRaceProducts.slice(0, 4),
    catalogProducts: duraRaceProducts,
  },
  {
    id: "repool",
    name: "REPOOL",
    tagline: "Reposição para motos",
    description: "Linha comercial de peças de reposição para lojas e oficinas, com catálogo atualizado para o mercado de motos.",
    color: "#27AE60",
    logoText: "REPOOL",
    logo: "/assets/brands/repool.png",
    featuredProducts: repoolProducts.slice(0, 4),
    catalogProducts: repoolProducts,
  },
];
