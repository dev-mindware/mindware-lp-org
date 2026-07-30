/**
 * Modelo de conteúdo dos documentos legais (privacidade, termos).
 * O texto vive aqui em dados puros para que a apresentação — índice lateral,
 * numeração das secções, âncoras — seja gerada automaticamente e os dois
 * documentos se mantenham visualmente idênticos.
 *
 * Nos campos de texto, `**assim**` é renderizado a negrito.
 */

export type LegalListItem = {
  /** Rótulo a negrito antes do texto, ex.: "Dados de Perfil:" */
  label?: string;
  text: string;
};

export type LegalBlock =
  | { kind: "text"; text: string }
  | { kind: "list"; items: LegalListItem[] }
  /** Destaque com barra lateral — avisos e notas importantes. */
  | { kind: "note"; label?: string; text: string }
  | { kind: "table"; head: string[]; rows: string[][] };

export type LegalSection = {
  /** Âncora usada no índice e no URL (#id). */
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  /** Rótulo acima do título, ex.: "Documentos Legais" */
  eyebrow: string;
  /** Primeira parte do título, em cor neutra. */
  title: string;
  /** Segunda parte do título, destacada a primário/itálico. */
  titleAccent: string;
  /** Nome curto para o cabeçalho do índice lateral. */
  shortTitle: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};
