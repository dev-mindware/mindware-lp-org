/**
 * Configuração da personagem 3D da secção About.
 *
 * Por omissão, a cena constrói um "gémeo digital" volumétrico a partir das
 * duas fotografias de referência (frente e costas), recortadas e com um mapa
 * de profundidade gerado por insuflação da silhueta. Ver docs/about-3d.md.
 *
 * Quando existir o modelo hiper-realista em GLB/GLTF, coloque-o em
 * `public/about/` e defina `CHARACTER_MODEL_URL` — a cena passa a usar o
 * modelo, mantendo a mesma coreografia de câmara, luz e rotação.
 */
export const CHARACTER_MODEL_URL: string | null = null;

/**
 * Altura total (em unidades da cena) a que o modelo GLB é escalado. O topo da
 * cabeça alinha-se com o enquadramento; com um modelo de corpo inteiro, ~5.4
 * deixa a cintura no fundo do quadro, como no gémeo digital.
 */
export const CHARACTER_HEIGHT = 5.4;

/** Assets gerados por scripts/about-twin-prep.py (mesmo enquadramento). */
export const TWIN_ASSETS = {
  front: "/about/twin-front.webp",
  back: "/about/twin-back.webp",
  depth: "/about/twin-depth.png",
} as const;

/** Recortes usados na versão estática (sem WebGL / movimento reduzido). */
export const PORTRAIT_ASSETS = {
  front: { src: "/about/portrait-front.webp", width: 727, height: 900 },
  back: { src: "/about/portrait-back.webp", width: 900, height: 872 },
} as const;
