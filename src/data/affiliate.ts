export const AFFILIATE_PORTAL_URL = "https://parceiros.mindware.ao";
export const AFFILIATE_PORTAL_DOMAIN = "parceiros.mindware.ao";
export const AFFILIATE_REGISTER_URL = `${AFFILIATE_PORTAL_URL}/auth/register`;
export const AFFILIATE_LOGIN_URL = `${AFFILIATE_PORTAL_URL}/auth/login`;

/** Secções navegáveis do header contextual dos Afiliados. */
export const AFFILIATE_NAV = [
  { name: "Comissões", hash: "comissoes" },
  { name: "Níveis", hash: "niveis" },
  { name: "Planos", hash: "planos-afiliado" },
  { name: "Carteira", hash: "carteira" },
  { name: "FAQ", hash: "faq-afiliado" },
];

export const AFFILIATE_HERO = {
  eyebrow: "Mindgest Partners Program",
  title: {
    line1: "Ganhe comissões.",
    highlight: "Cresça connosco.",
  },
  description:
    "Uma plataforma simples para gerir as suas referências, acompanhar comissões em tempo real e receber os seus ganhos de forma segura — com progressão automática de nível.",
  pills: [
    "Comissões automáticas",
    "Ranking de parceiros",
    "Pagamentos rápidos",
  ],
} as const;

export const COMMISSION_RULES = {
  firstPayment: {
    label: "Primeiro pagamento",
    rate: "20%",
    detail:
      "Do valor pago pelo cliente no primeiro mês ou na primeira anuidade — em todos os planos (BASE, SMART e PRO).",
  },
  recurring: {
    label: "Pagamentos recorrentes",
    rate: "15% → 38%",
    detail:
      "Nas mensalidades seguintes. Começa em 15% e sobe automaticamente até 38% conforme o seu nível de parceiro.",
  },
} as const;

export type PartnerTier = {
  id: string;
  name: string;
  icon: string;
  clients: string;
  clientsMin: number;
  recurring: string;
  bonus: string;
  total: string;
  rational: string;
  highlighted?: boolean;
};

export const PARTNER_TIERS: PartnerTier[] = [
  {
    id: "base",
    name: "Base",
    icon: "○",
    clients: "< 15 clientes",
    clientsMin: 0,
    recurring: "15%",
    bonus: "0%",
    total: "15%",
    rational: "Alinhado com a entrada no mercado",
  },
  {
    id: "silver",
    name: "Prata",
    icon: "◈",
    clients: "15 – 39 clientes",
    clientsMin: 15,
    recurring: "18%",
    bonus: "+2%",
    total: "20%",
    rational: "Subida progressiva sem esgotar a margem cedo",
  },
  {
    id: "gold",
    name: "Ouro",
    icon: "★",
    clients: "40 – 99 clientes",
    clientsMin: 40,
    recurring: "22%",
    bonus: "+5%",
    total: "27%",
    rational: "Salto real face à Prata",
    highlighted: true,
  },
  {
    id: "platinum",
    name: "Platina",
    icon: "◇",
    clients: "100 – 249 clientes",
    clientsMin: 100,
    recurring: "26%",
    bonus: "+7%",
    total: "33%",
    rational: "Nível estratégico de alto volume",
  },
  {
    id: "elite",
    name: "Elite",
    icon: "♛",
    clients: "250+ clientes",
    clientsMin: 250,
    recurring: "28%",
    bonus: "+10%",
    total: "38%",
    rational: "Topo do programa — parceiros verdadeiramente estratégicos",
  },
];

export const AFFILIATE_PLANS = [
  {
    id: "base",
    name: "BASE",
    price: "5.445,22 Kz",
    period: "/mês",
    description: "Ideal para pequenas empresas e profissionais singulares.",
    note: null as string | null,
  },
  {
    id: "smart",
    name: "SMART",
    price: "11.998,22 Kz",
    period: "/mês",
    description: "Plano completo com funcionalidades avançadas para crescer.",
    note: null as string | null,
  },
  {
    id: "pro",
    name: "PRO",
    price: "19.998,22 Kz",
    period: "/mês",
    description: "Plano corporativo de alto desempenho.",
    note: "Apenas parceiros com Certificação Comercial activa.",
  },
] as const;

export const WALLET_BALANCES = [
  {
    id: "pending",
    label: "Saldo Pendente",
    example: "Kz 25.000,00",
    description:
      "Comissões em período de garantia. Validação automática de 15 dias após o pagamento do cliente.",
  },
  {
    id: "available",
    label: "Saldo Disponível",
    example: "Kz 45.000,00",
    description:
      "Fundos prontos para levantamento. Transita automaticamente do pendente após a maturação.",
  },
  {
    id: "lifetime",
    label: "Total Ganho",
    example: "Kz 70.000,00",
    description:
      "Histórico acumulado de todas as comissões creditadas desde que se juntou ao programa.",
  },
] as const;

export const WITHDRAWAL_STEPS = [
  {
    step: "01",
    title: "Aceda à Carteira",
    description: "No portal do afiliado, abra a secção Wallet.",
  },
  {
    step: "02",
    title: "Solicite o levantamento",
    description:
      "Escolha o valor (mínimo 8.000 Kz). O montante fica retido durante o processamento.",
  },
  {
    step: "03",
    title: "Análise administrativa",
    description:
      "A equipa analisa o pedido. Em caso de aprovação, a transferência é feita e o comprovativo fica no painel.",
  },
  {
    step: "04",
    title: "Receba na sua conta",
    description:
      "Geralmente 1–3 dias úteis. Se rejeitado (IBAN incorrecto, etc.), o valor regressa ao Saldo Disponível com justificação.",
  },
] as const;

export const CERTIFICATION = {
  title: "Certificação Comercial",
  eligibility: "Nível Prata — 15+ clientes activos",
  benefits: [
    "Acesso à promoção do plano PRO",
    "Suporte comercial avançado",
    "Ferramentas exclusivas de parceiro certificado",
  ],
  process:
    "Quando atingir a elegibilidade, submeta o pedido no painel. Um gestor Mindware analisa a candidatura e activa a conta como Parceiro Comercial Certificado.",
} as const;

export const AFFILIATE_FAQS = [
  {
    question: "O meu nível desce se perder clientes?",
    answer:
      "Sim. O número de clientes activos é recalculado periodicamente. Se ficar abaixo do limiar do seu nível actual, a comissão ajusta-se no processamento seguinte.",
  },
  {
    question: "Os clientes anuais contam para o meu nível?",
    answer:
      "Sim. Qualquer subscrição activa (mensal ou anual) atribuída ao seu perfil conta para o total de clientes activos.",
  },
  {
    question: "Quanto tempo demora um levantamento?",
    answer:
      "Após submeter o pedido, a equipa financeira processa a transferência e associa o comprovativo ao painel. O tempo depende da disponibilidade bancária — geralmente 1 a 3 dias úteis.",
  },
  {
    question: "Como são contabilizados os clientes activos?",
    answer:
      "De forma única por identificador de cliente (NIF). A progressão de nível é recalculada automaticamente a cada novo pagamento validado.",
  },
  {
    question: "Qual é o valor mínimo de levantamento?",
    answer:
      "8.000 Kz. Não é possível submeter um pedido abaixo deste valor. Certifique-se também de que o Banco e IBAN estão correctos nas definições de perfil.",
  },
] as const;

export type SoftwareShot = {
  id: string;
  label: string;
  urlDisplay: string;
  /** Path under /public — null means placeholder */
  src: string | null;
  alt: string;
};

export const SOFTWARE_SHOTS: SoftwareShot[] = [
  {
    id: "login",
    label: "Portal — Login",
    urlDisplay: AFFILIATE_PORTAL_DOMAIN,
    src: "/affiliate-login.png",
    alt: "Ecrã de login do portal de afiliados Mindware com formulário de acesso e destaque do programa",
  },
  {
    id: "wallet",
    label: "Carteira digital",
    urlDisplay: `${AFFILIATE_PORTAL_DOMAIN}/wallet`,
    src: null,
    alt: "Vista da carteira digital do afiliado (imagem em breve)",
  },
  {
    id: "ranking",
    label: "Ranking & níveis",
    urlDisplay: `${AFFILIATE_PORTAL_DOMAIN}/ranking`,
    src: null,
    alt: "Painel de ranking e níveis de parceiro (imagem em breve)",
  },
  {
    id: "withdraw",
    label: "Levantamentos",
    urlDisplay: `${AFFILIATE_PORTAL_DOMAIN}/withdrawals`,
    src: null,
    alt: "Fluxo de solicitação de levantamento (imagem em breve)",
  },
];
