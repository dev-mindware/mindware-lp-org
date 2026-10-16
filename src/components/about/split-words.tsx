import type { ElementType } from "react";

type SplitWordsProps = {
  text: string;
  id?: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  /** Atributo usado pela timeline para encontrar as palavras */
  group: string;
  /**
   * Começa com as palavras escondidas abaixo da máscara. Usa-se `transform`
   * inline (e não a utilidade `translate-*` do Tailwind, que escreve a
   * propriedade CSS `translate` e se somaria ao transform do GSAP).
   */
  concealed?: boolean;
};

/**
 * Divide o texto em palavras, cada uma dentro de uma máscara
 * (overflow-hidden), para revelações tipográficas por máscara.
 * O texto completo continua disponível para leitores de ecrã.
 */
export function SplitWords({
  text,
  id,
  as: Tag = "span",
  className,
  wordClassName = "",
  group,
  concealed = false,
}: SplitWordsProps) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
        >
          <span
            data-split={group}
            className={`inline-block will-change-transform ${wordClassName}`}
            style={concealed ? { transform: "translateY(115%)" } : undefined}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
