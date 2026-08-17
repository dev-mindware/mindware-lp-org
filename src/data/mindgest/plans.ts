export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string | null;
  priceNote?: string;
  highlighted?: boolean;
  cta: string;
  /** Sem valor, o CTA aponta para o registo */
  ctaHref?: string;
  features: string[];
};

export const NEGOTIATION_EMAIL = "geral@mindware.ao";

export const PLANS: Plan[] = [
  {
    id: "base",
    name: "Base",
    tagline: "Para quem está a começar a vender",
    price: "5.445,22 Kz",
    cta: "Escolher Base",
    features: [
      "Até 3 utilizadores",
      "Até 1 loja",
      "Facturas e documentos ilimitados",
      "Relatórios",
      "Categorias de itens",
      "Bancos e configurações fiscais",
      "Relatórios básicos de vendas",
      "Acesso web multiplataforma",
      "Gestão de clientes",
      "Gestão de produtos e serviços",
      "Assistente MIND - 10 mensagens",
    ],
  },
  {
    id: "smart",
    name: "Smart",
    tagline: "Para negócios que querem crescer",
    price: "11.998,22 Kz",
    highlighted: true,
    cta: "Escolher Smart",
    features: [
      "Tudo do plano Base",
      "Até 6 utilizadores",
      "Até 3 lojas",
      "Gestão de stock",
      "Ponto de Venda",
      "Personalização de aparência",
      "Impressão em A4 e talão",
      "Movimentos de caixa",
      "Configurações POS do operador",
      "Controlo de stock",
      "Registo de produtos com código de barras",
      "Relatórios de clientes",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Para operações multi-loja",
    price: "19.998,22 Kz",
    cta: "Escolher Pro",
    features: [
      "Tudo do plano Smart",
      "Até 12 utilizadores",
      "Lojas ilimitadas",
      "Gestão de reservas de stock",
      "Gestão avançada de POS",
      "Controlo avançado de produtos",
      "Relatórios avançados",
      "Relatórios de acesso e auditoria",
      "Gestão completa para operações multi-loja",
    ],
  },
];
