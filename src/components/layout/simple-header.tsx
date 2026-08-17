import { ModeToggle } from "@/components/mode-toggle";
import { HeaderLockup } from "./header-lockup";
import { HeaderShell } from "./header-shell";

export type SimpleHeaderProps = {
  /**
   * Zona do site — "Blog", "Legal", "Sobre"… Aparece como selo ao lado da
   * marca para quem chega por link directo saber onde está.
   */
  badge?: string;
};

/**
 * Header das páginas de leitura (blog, documentos legais, sobre, carreiras).
 *
 * Sem navegação e sem CTA: o conteúdo manda. O caminho de volta vive no
 * lockup à esquerda, igual ao dos headers global e de produto.
 */
export function SimpleHeader({ badge }: SimpleHeaderProps) {
  return (
    <HeaderShell>
      <HeaderLockup back badge={badge} />
      <ModeToggle />
    </HeaderShell>
  );
}
