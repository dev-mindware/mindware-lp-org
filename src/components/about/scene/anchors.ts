import * as THREE from "three";

/** Topo da cabeça no enquadramento da cena (o GLB alinha-se por aqui). */
export const HEAD_TOP_Y = 1.31;

/**
 * Pontos de ancoragem (coordenadas locais) para as etiquetas de interface.
 * Medidos sobre twin-front.webp (600×733): x = px·u − 1.146, y = 1.4 − py·u,
 * com u = 2.8 / 733.
 */
export function createAnchors(): Record<string, THREE.Vector3> {
  return {
    head: new THREE.Vector3(-0.08, 1.06, 0.2),
    headphones: new THREE.Vector3(-0.47, 0.2, 0.3),
    chest: new THREE.Vector3(0.14, 0.1, 0.34),
    vest: new THREE.Vector3(-0.58, -0.22, 0.3),
    shoulder: new THREE.Vector3(0.83, 0.31, 0.1),
  };
}
