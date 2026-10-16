/**
 * Configuração da personagem 3D da secção About.
 *
 * O modelo é gerado a partir das fotografias de referência pelos scripts em
 * `scripts/character/` (Blender): rosto reconstruído da foto frontal, colete
 * Mindware com a impressão das costas, durag, tranças, auscultadores,
 * esqueleto e a animação "Scroll" controlada pelo scroll. Ver docs/about-3d.md.
 */
export const CHARACTER_MODEL_URL = "/about/mindware-character.glb";

/**
 * Altura total (em unidades da cena) a que o modelo é escalado. O topo da
 * cabeça alinha-se com o enquadramento; 4.0 deixa a cintura no fundo do
 * quadro (o modelo vai da cabeça aos joelhos).
 */
export const CHARACTER_HEIGHT = 4.0;

/** Renders da personagem usados na versão estática (sem WebGL / movimento reduzido). */
export const CHARACTER_RENDERS = {
  front: { src: "/about/character-front.webp", width: 368, height: 745 },
  back: { src: "/about/character-back.webp", width: 668, height: 749 },
} as const;
