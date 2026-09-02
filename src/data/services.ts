import { Palette, Layout, Building2, UserCheck, Briefcase, Store, Zap, ShieldCheck } from "lucide-react";

/** Secções navegáveis do header contextual dos Serviços. */
export const SERVICE_NAV = [
  { name: "Branding", hash: "branding-section" },
  { name: "Websites", hash: "website-section" },
  { name: "Para Quem É", hash: "para-quem" },
  { name: "Processo", hash: "processo" },
  { name: "Preço", hash: "precos" },
];

export const services = [
  {
    title: "Identidade Visual",
    description:
      "Construa uma marca memorável. Design estratégico que comunica autoridade, desde o logo até a paleta de cores completa.",
    icon: Palette,
    features: [
      "Logo & Manual da Marca",
      "Paleta de Cores Estratégica",
      "Tipografia & Assets Visuais",
    ],
    link: "/service#branding-section",
  },
  {
    title: "Desenvolvimento Web",
    description:
      "Websites de alta performance projetados para converter. SEO, design responsivo e uma experiência de usuário impecável.",
    icon: Layout,
    features: [
      "Website Responsivo & Rápido",
      "SEO & Otimização Google",
      "Hospedagem Cloud & SSL (1 ano)",
    ],
    highlight: true,
    link: "/service#website-section",
  },
];

export interface AudienceProfile {
  id: string;
  title: string;
  badge: string;
  icon: typeof Building2;
  tagline: string;
  description: string;
  painPoints: string[];
  deliverables: string[];
  results: string;
}

export const TARGET_AUDIENCES: AudienceProfile[] = [
  {
    id: "empresas",
    title: "Empresas & PMEs",
    badge: "B2B & Institucional",
    icon: Building2,
    tagline: "Autoridade corporativa e captação ativa de novos clientes e contratos.",
    description:
      "Ideal para empresas que precisam de transmitir solidez, profissionalismo e segurança no mercado angolano, substituindo páginas amadoras por uma presença digital de topo.",
    painPoints: [
      "Apresentações fracas que não transmitem a real envergadura da empresa",
      "Falta de e-mail corporativo institucional próprio (@suaempresa.ao)",
      "Pouca visibilidade nas buscas de fornecedores no Google em Luanda",
    ],
    deliverables: [
      "Website corporativo de 5 secções otimizado para conversão B2B",
      "Manual completo de identidade visual & assets de marca",
      "Hospedagem cloud de alta performance (1 ano)",
      "Prontidão para integração de e-mail corporativo e domínio próprio",
    ],
    results: "Elevação imediata do valor percebido da marca e aumento de orçamentos qualificados.",
  },
  {
    id: "profissionais",
    title: "Profissionais Liberais",
    badge: "Consultores & Especialistas",
    icon: UserCheck,
    tagline: "Posicionamento premium que justifica os seus honorários e atrai os melhores clientes.",
    description:
      "Para médicos, advogados, consultores, arquitetos e engenheiros que pretendem consolidar a sua autoridade pessoal e facilitar o contacto direto e agendamento.",
    painPoints: [
      "Dependência exclusiva de redes sociais sem canal próprio de autoridade",
      "Dificuldade em apresentar especialidades e credenciais de forma clara",
      "Processo de contacto disperso e pouco profissional",
    ],
    deliverables: [
      "Página profissional de alta conversão com foco em agendamentos",
      "Branding pessoal sofisticado e consistente",
      "Botão WhatsApp integrado com mensagem pré-formatada",
      "Otimização SEO para ser encontrado por especialidade na sua região",
    ],
    results: "Mais clientes a entrar em contacto já convictos da sua autoridade e competência.",
  },
  {
    id: "freelancers",
    title: "Freelancers & Criadores",
    badge: "Portfólio de Elite",
    icon: Briefcase,
    tagline: "Uma montra de alto impacto para fechar projetos maiores e internacionais.",
    description:
      "Desenvolvido para designers, developers, gestores de tráfego, criadores de conteúdo e videomakers que precisam de um portfólio que fale por si.",
    painPoints: [
      "Perda de propostas de alto valor por apresentar links soltos em PDFs",
      "Websites lentos ou templates genéricos que não impressionam",
      "Falta de identidade visual coesa nos pontos de contacto",
    ],
    deliverables: [
      "Portfólio ultra-rápido com galeria dinâmica de projetos",
      "Sistema de marca pessoal memorável e adaptável",
      "Design responsivo otimizado para navegação mobile impecável",
      "Formulário e ligação direta para orçamentos rápidos",
    ],
    results: "Capacidade de negociar orçamentos mais altos apresentando uma presença impecável.",
  },
  {
    id: "negocios-locais",
    title: "Negócios Locais & Comércio",
    badge: "Visibilidade & Vendas",
    icon: Store,
    tagline: "Esteja onde os clientes procuram quando precisam do seu produto ou serviço hoje.",
    description:
      "Perfeito para clínicas, centros de formação, espaços de eventos, restaurantes e oficinas que querem transformar pesquisas no Google em visitas reais e pedidos.",
    painPoints: [
      "Clientes procuram serviços no Google e só encontram os concorrentes",
      "Informações desatualizadas de horários, serviços e localização",
      "Perda de vendas por falta de catálogo claro de serviços",
    ],
    deliverables: [
      "Website focado em conversão local com mapa e rotas diretas",
      "Catálogo estruturado de produtos ou serviços principais",
      "SEO Local estruturado para o mercado de Luanda e Angola",
      "Integração direta com WhatsApp Business para fecho imediato",
    ],
    results: "Fluxo constante de novos clientes locais prontos a comprar.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Diagnóstico & Briefing",
    duration: "Dia 1 - 4",
    description: "Alinhamos os objetivos do seu negócio, público-alvo, referências visuais e arquitetura essencial das páginas.",
    icon: Zap,
  },
  {
    step: "02",
    title: "Identidade & Protótipo Visual",
    duration: "Dia 5 - 12",
    description: "Criamos a paleta estratégica, tipografia, refinamento de logo e o layout interativo para validação direta consigo.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Engenharia Web & SEO",
    duration: "Dia 13 - 22",
    description: "Desenvolvemos o website com Next.js de alta performance, carregamento instantâneo, mobile-first e SEO Google configurado.",
    icon: Layout,
  },
  {
    step: "04",
    title: "Testes, Segurança & Lançamento",
    duration: "Dia 23 - 31",
    description: "Testes rigorosos de segurança e responsividade, homologação final com o cliente e publicação oficial com formação.",
    icon: ShieldCheck,
  },
];

export const PACKAGE_INCLUDED = [
  {
    title: "Identidade Visual Completa",
    desc: "Logo estruturado, paleta cromática estratégica, tipografia e guia de aplicação para todas as plataformas.",
  },
  {
    title: "Website Profissional (Até 5 Secções)",
    desc: "Design exclusivo, arquitetura pensada para conversão, responsivo em mobile, tablet e desktop.",
  },
  {
    title: "Hospedagem Cloud de Alta Performance (1 Ano)",
    desc: "Servidores seguros, certificado SSL gratuito (HTTPS) e carregamento em milissegundos.",
  },
  {
    title: "Certificado de Segurança SSL (HTTPS Ativo)",
    desc: "Navegação blindada e criptografada com garantia de segurança para todos os visitantes.",
  },
  {
    title: "SEO Google & Indexação Rápida",
    desc: "Metadados otimizados, Sitemap XML e configuração para o seu negócio aparecer nas pesquisas.",
  },
  {
    title: "Integração Direta com WhatsApp",
    desc: "Botões de contacto inteligentes que enviam mensagens pré-formatadas para a sua equipa.",
  },
  {
    title: "Design Responsivo & Mobile-First",
    desc: "Experiência perfeita e adaptada a smartphones, tablets e ecrãs de computadores.",
  },
  {
    title: "Suporte Técnico & Formação de Gestão",
    desc: "Acompanhamento dedicado para tirar dúvidas e garantir que a sua presença online opera sem falhas.",
  },
];

export interface ServiceAddon {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const EMAIL_ADDONS: ServiceAddon[] = [
  {
    id: "email-start",
    name: "Email Start",
    badge: "Essencial",
    price: "14.989,00 Kz",
    period: "/ 1 ano",
    description: "Ideal para profissionais e pequenas empresas que precisam de um e-mail institucional corporativo fiável.",
    features: [
      "1 caixa de correio incluída",
      "5 GB de armazenamento por caixa de correio",
      "5 Regras de Encaminhamento",
      "5 aliases de email",
      "Webmail seguro + Acesso via telemóvel e PC (IMAP/SMTP)",
    ],
  },
  {
    id: "email-standard",
    name: "Email Standard",
    badge: "Recomendado",
    price: "25.450,00 Kz",
    period: "/ 1 ano",
    popular: true,
    description: "Para empresas com maior volume de correspondências, propostas comerciais e histórico de comunicações.",
    features: [
      "1 caixa de correio incluída",
      "20 GB de armazenamento por caixa de correio",
      "20 Regras de Encaminhamento",
      "10 aliases de email",
      "Webmail seguro de alta capacidade + Acesso telemóvel/PC",
    ],
  },
];

export const DOMAIN_ADDON: ServiceAddon = {
  id: "dominio",
  name: "Registo de Domínio",
  badge: "Endereço Próprio",
  price: "15.690,00 Kz",
  period: "/ 1 ano",
  description: "Registo e gestão técnica do seu domínio exclusivo (.ao, .com ou outros) com configuração de DNS incluída.",
  features: [
    "1 ano de registo e gestão técnica",
    "Configuração de apontamento e zonas DNS",
    "Prontidão para ligação com o website e e-mails",
    "Proteção e acompanhamento de renovação",
  ],
};

