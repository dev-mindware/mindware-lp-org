import type * as THREE from "three";

/**
 * Estado contínuo da cena, interpolado pela timeline GSAP sincronizada com o
 * scroll. A cena Three.js apenas lê estes valores a cada frame — nunca
 * reconstrói objectos quando o progresso muda.
 */
export type SceneState = {
  /** Câmara (posição relativa ao centro do modelo) */
  camX: number;
  camY: number;
  camZ: number;
  lookX: number;
  lookY: number;
  /** Rotação do modelo em torno do eixo vertical (radianos) */
  rotY: number;
  /** Deslocamento lateral do modelo (cena 04 abre espaço para o texto) */
  figureX: number;
  /** 0 → partículas dispersas, 1 → corpo montado */
  assemble: number;
  /** Intensidades de luz */
  rim: number;
  key: number;
  keySweep: number;
  exposure: number;
  /** Brilho volumétrico atrás da personagem */
  glow: number;
  /** Partículas ambientais */
  particles: number;
  /** Linha de varrimento (cena 02) */
  scan: number;
  /** Anel/mostrador no chão */
  ring: number;
};

export const INITIAL_STATE: SceneState = {
  camX: 0,
  camY: 0.15,
  camZ: 7.5,
  lookX: 0,
  lookY: 0.05,
  rotY: 0,
  figureX: 0,
  assemble: 0,
  rim: 0,
  key: 0,
  keySweep: -1,
  exposure: 0,
  glow: 0,
  particles: 0,
  scan: 0,
  ring: 0,
};

export type QualityTier = "high" | "low";

export interface CharacterRig {
  object: THREE.Object3D;
  kind: "twin" | "glb";
  /** Pontos de ancoragem em coordenadas locais, para etiquetas de interface */
  anchors: Record<string, THREE.Vector3>;
  pointCount?: number;
  /** Luzes que pertencem ao mundo (não rodam com o modelo) */
  lights?: THREE.Object3D;
  update(state: SceneState, time: number, camera: THREE.Camera, viewScale: number): void;
  dispose(): void;
}
