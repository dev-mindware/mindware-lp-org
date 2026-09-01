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
      "Domínio Gratuito (1 ano)",
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
      "Domínio próprio + Hospedagem de alta disponibilidade (1 ano)",
      "Contas de e-mail profissional configuradas para a equipa",
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
    duration: "Dia 1 - 2",
    description: "Alinhamos os objetivos do seu negócio, público-alvo, referências visuais e estrutura essencial das páginas.",
    icon: Zap,
  },
  {
    step: "02",
    title: "Identidade & Protótipo Visual",
    duration: "Dia 3 - 5",
    description: "Criamos a paleta estratégica, tipografia, refinamento de logo e o layout interativo para validação direta consigo.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Engenharia Web & SEO",
    duration: "Dia 6 - 9",
    description: "Desenvolvemos o website com Next.js de alta performance, carregamento instantâneo, mobile-first e SEO Google configurado.",
    icon: Layout,
  },
  {
    step: "04",
    title: "Domínio, E-mails & Lançamento",
    duration: "Dia 10 - 12",
    description: "Configuração do domínio próprio, contas de email institucional corporativo, testes de segurança e entrega com formação.",
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
    title: "Domínio Próprio Incluído (1 Ano)",
    desc: "Registo e gestão técnica do seu domínio exclusivo para garantir a autoridade da marca.",
  },
  {
    title: "Hospedagem Cloud de Alta Performance (1 Ano)",
    desc: "Servidores seguros, certificado SSL gratuito (HTTPS) e carregamento em milissegundos.",
  },
  {
    title: "E-mails Corporativos (@suaempresa)",
    desc: "Contas profissionais configuradas para transmitir máxima seriedade em propostas e correspondências.",
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
    title: "Suporte Técnico & Formação",
    desc: "Acompanhamento dedicado para tirar dúvidas e garantir que a sua presença online opera sem falhas.",
  },
];

