export const APP_URL = "https://mindgest.mindware.ao";
export const REGISTER_URL = `${APP_URL}/auth/register`;
export const LOGIN_URL = APP_URL;

/** Link estável para a versão mais recente do instalador do Mindgest POS (Windows). */
export const POS_DOWNLOAD_URL =
  "https://github.com/dev-mindware/mindgest-pos-desktop/releases/latest/download/Mindgest-POS-Setup.exe";

/** Secções navegáveis do header contextual do Mindgest. */
export const MINDGEST_NAV = [
  { name: "Funcionalidades", hash: "funcionalidades" },
  { name: "MindIA", hash: "MindIA" },
  { name: "POS Offline", hash: "pos-offline" },
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
