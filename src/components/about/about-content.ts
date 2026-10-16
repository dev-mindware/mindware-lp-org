/**
 * Conteúdo institucional da secção About.
 * O texto é o mesmo da versão anterior da secção — apenas reorganizado
 * em torno de três conceitos (criatividade, engenharia, impacto).
 */

export const ABOUT_SIGNATURE = "A mente cria, o código segue.";

export const ABOUT_HEADING = {
  index: "02",
  label: "Quem somos",
  title: "Construímos soluções estratégicas que resolvem problemas reais",
};

export type AboutPillar = {
  key: string;
  index: string;
  title: string;
  kicker: string;
  body: string;
};

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    key: "criatividade",
    index: "01",
    title: "Criatividade",
    kicker: "Transformar ideias em soluções",
    body: "A Mindware existe para transformar ideias em soluções digitais sólidas e transformar negócios através da tecnologia.",
  },
  {
    key: "engenharia",
    index: "02",
    title: "Engenharia",
    kicker: "Construir software robusto e útil",
    body: "O nosso diferencial está na combinação de visão técnica com mentalidade de negócio. Não entregamos apenas código funcional; entregamos sistemas pensados para escalar, operar offline quando necessário, integrar microserviços e adaptar-se à realidade do mercado angolano.",
  },
  {
    key: "impacto",
    index: "03",
    title: "Impacto",
    kicker: "Tecnologia para resolver problemas reais",
    body: "Na Mindware não desenvolvemos apenas software. Acreditamos que tecnologia sem propósito é desperdício de tempo e dinheiro. Por isso, cada projecto nasce com um objectivo claro: gerar eficiência, crescimento e vantagem competitiva para os nossos clientes.",
  },
];

/** Etiquetas de interface que acompanham a revelação do modelo (cena 02). */
export const ABOUT_TAGS = [
  { key: "software", label: "Engenharia de software" },
  { key: "automacao", label: "Automação" },
  { key: "produto", label: "Produto digital" },
  { key: "inovacao", label: "Inovação" },
] as const;
