export const APP_URL = "https://mindgest.mindware.ao";
export const REGISTER_URL = `${APP_URL}/auth/register`;
export const LOGIN_URL = APP_URL;

/** Secções navegáveis do header contextual do Mindgest. */
export const MINDGEST_NAV = [
  { name: "Funcionalidades", hash: "funcionalidades" },
  { name: "MindIA", hash: "MindIA" },
  { name: "Como funciona", hash: "como-funciona" },
  { name: "Planos", hash: "planos" },
  { name: "FAQ", hash: "faq" },
];

export const DOCUMENT_TYPES = [
  "Fatura Normal",
  "Fatura-Recibo",
  "Fatura Proforma",
  "Recibo",
  "Nota de Crédito",
  "Relatórios",
  "Multi-loja",
  "MindIA",
] as const;
