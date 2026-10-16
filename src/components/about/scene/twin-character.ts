import * as THREE from "three";
import { createAnchors } from "./anchors";
import type { CharacterRig, SceneState } from "./types";

/**
 * "Gémeo digital" volumétrico construído a partir das duas fotografias de
 * referência:
 *  - frente e costas recortadas e alinhadas no mesmo enquadramento;
 *  - um mapa de profundidade obtido por insuflação da silhueta (transformada
 *    de distância), que dá volume arredondado à cabeça, tronco e braços.
 *
 * Cada pixel válido gera um ponto na casca frontal (+z) com a cor da
 * fotografia frontal e um ponto na casca posterior (−z) com a cor da
 * fotografia de costas. As duas cascas fecham-se no contorno, por isso a
 * rotação da câmara revela um volume real — não uma troca de imagens.
 */

export type TwinSources = {
  front: string;
  back: string;
  depth: string;
};

export type TwinOptions = {
  /** Passo de amostragem em pixels (1 = densidade máxima). */
  stride: number;
  /** Altura do enquadramento em unidades da cena. */
  height: number;
  /** Profundidade máxima da casca frontal, relativa à largura. */
  depthScale: number;
};

type Pixels = { data: Uint8ClampedArray; width: number; height: number };

async function loadPixels(url: string, signal?: AbortSignal): Promise<Pixels> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Falha ao carregar ${url} (${res.status})`);
  const bitmap = await createImageBitmap(await res.blob(), {
    premultiplyAlpha: "none",
    colorSpaceConversion: "none",
  });
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D indisponível");
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return { data: img.data, width: img.width, height: img.height };
}

const VERT = /* glsl */ `
  attribute vec3 color;
  attribute vec4 seed;
  attribute float edge;

  uniform float uTime;
  uniform float uAssemble;
  uniform float uSize;
  uniform float uViewScale;
  uniform vec3 uKeyDir;
  uniform float uKey;
  uniform float uRim;
  uniform float uAmbient;
  uniform vec3 uRimColor;
  uniform float uBreath;
  uniform float uBottom;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlow;

  float easeOut(float t) { return 1.0 - pow(1.0 - t, 3.0); }

  void main() {
    // Os contornos montam-se primeiro, o interior (rosto, colete) depois.
    float delay = (1.0 - edge) * 0.55;
    float a = easeOut(clamp((uAssemble - delay) / 0.45, 0.0, 1.0));

    vec3 pos = position;
    // respiração subtil, mais forte no peito do que na cabeça
    float chest = smoothstep(-0.9, 0.35, pos.y) * (1.0 - smoothstep(0.55, 0.95, pos.y));
    pos.xz *= 1.0 + sin(uTime * 1.15) * 0.006 * chest * uBreath;
    pos.y += sin(uTime * 1.15) * 0.004 * chest * uBreath;

    // dispersão inicial: partículas que convergem para a superfície
    float scatter = 1.0 - a;
    pos += seed.xyz * scatter * scatter * 2.6;
    pos.y += sin(uTime * 0.6 + seed.w * 6.2831) * 0.05 * scatter;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uViewScale / -mv.z * mix(1.8, 1.0, a);

    vec3 n = normalize(normalMatrix * normal);
    vec3 v = normalize(-mv.xyz);
    float nv = dot(n, v);
    // pontos da casca oposta, vistos por frestas, ficam na sombra —
    // só a superfície virada para a câmara recebe contraluz
    float front = smoothstep(-0.12, 0.08, nv);
    float rim = pow(1.0 - clamp(nv, 0.0, 1.0), 2.4) * front;
    float diff = max(dot(n, normalize(uKeyDir)), 0.0);

    vec3 base = color;
    vec3 lit = base * (uAmbient + diff * uKey) * mix(0.12, 1.0, front) + uRimColor * rim * uRim;
    // durante a montagem, os pontos brilham em roxo
    lit = mix(lit, uRimColor * 1.4, scatter * 0.85);
    vColor = lit;
    vGlow = scatter;

    // o enquadramento termina na cintura: desvanece em vez de cortar
    float bottomFade = smoothstep(uBottom, uBottom + 0.45, position.y);
    // contorno ligeiramente translúcido: suaviza o recorte da silhueta
    float edgeSoft = mix(1.0, 0.55, smoothstep(0.82, 1.0, edge));
    vAlpha = smoothstep(0.0, 0.15, uAssemble - delay * 0.6) * bottomFade * edgeSoft;
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = mix(1.0, smoothstep(0.5, 0.0, d), vGlow);
    float alpha = vAlpha * soft;
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;


export async function createTwinCharacter(
  sources: TwinSources,
  options: TwinOptions,
  signal?: AbortSignal,
): Promise<CharacterRig> {
  const [front, back, depth] = await Promise.all([
    loadPixels(sources.front, signal),
    loadPixels(sources.back, signal),
    loadPixels(sources.depth, signal),
  ]);

  const { width: W, height: H } = front;
  if (back.width !== W || depth.width !== W || back.height !== H || depth.height !== H) {
    throw new Error("As imagens do gémeo digital têm dimensões diferentes");
  }

  const stride = Math.max(1, Math.round(options.stride));
  const unit = options.height / H; // unidades por pixel
  const halfW = (W * unit) / 2;
  const top = options.height * 0.5;
  const depthMax = W * unit * options.depthScale;

  const depthAt = (x: number, y: number) => {
    const cx = Math.min(W - 1, Math.max(0, x));
    const cy = Math.min(H - 1, Math.max(0, y));
    return depth.data[(cy * W + cx) * 4] / 255;
  };

  // conta primeiro para alocar buffers exactos
  let count = 0;
  for (let y = 0; y < H; y += stride) {
    for (let x = 0; x < W; x += stride) {
      if (front.data[(y * W + x) * 4 + 3] > 127) count++;
    }
  }
  const total = count * 2;
  const positions = new Float32Array(total * 3);
  const normals = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const seeds = new Float32Array(total * 4);
  const edges = new Float32Array(total);

  // gerador determinístico — a forma não muda entre visitas
  let s = 1337;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };

  const srgbToLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  let i = 0;
  const normal = new THREE.Vector3();
  for (let y = 0; y < H; y += stride) {
    for (let x = 0; x < W; x += stride) {
      const p = (y * W + x) * 4;
      if (front.data[p + 3] <= 127) continue;

      const jx = (rand() - 0.5) * stride;
      const jy = (rand() - 0.5) * stride;
      const d = depthAt(x, y);
      // perfil arredondado: sqrt dá ombros e braços cilíndricos
      const z = Math.sqrt(d) * depthMax;
      const gx = (Math.sqrt(depthAt(x + 2, y)) - Math.sqrt(depthAt(x - 2, y))) * depthMax / (4 * unit);
      const gy = (Math.sqrt(depthAt(x, y + 2)) - Math.sqrt(depthAt(x, y - 2))) * depthMax / (4 * unit);

      const wx = (x + jx) * unit - halfW;
      const wy = top - (y + jy) * unit;
      const edge = 1 - Math.min(1, d * 1.6);

      for (let side = 0; side < 2; side++) {
        const k = i * 3;
        const sign = side === 0 ? 1 : -1;
        positions[k] = wx;
        positions[k + 1] = wy;
        positions[k + 2] = z * sign * (side === 0 ? 1 : 0.82);
        // normal da superfície z = ±f(x,y); em y de imagem o eixo é invertido
        normal.set(-gx, gy, sign).normalize();
        normals[k] = normal.x;
        normals[k + 1] = normal.y;
        normals[k + 2] = normal.z;

        const src = side === 0 ? front.data : back.data;
        const hasBack = side === 1 && back.data[p + 3] > 127;
        const dim = side === 1 && !hasBack ? 0.35 : 1;
        const from = side === 1 && !hasBack ? front.data : src;
        colors[k] = srgbToLinear(from[p]) * dim;
        colors[k + 1] = srgbToLinear(from[p + 1]) * dim;
        colors[k + 2] = srgbToLinear(from[p + 2]) * dim;

        const q = i * 4;
        // direcção de dispersão: para fora e para cima, como poeira luminosa
        const theta = rand() * Math.PI * 2;
        const r = 0.4 + rand() * 0.9;
        seeds[q] = Math.cos(theta) * r;
        seeds[q + 1] = (rand() - 0.35) * 1.4;
        seeds[q + 2] = Math.sin(theta) * r * 0.6 + sign * 0.3;
        seeds[q + 3] = rand();
        edges[i] = edge;
        i++;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 4));
  geometry.setAttribute("edge", new THREE.BufferAttribute(edges, 1));
  geometry.computeBoundingSphere();

  const uniforms = {
    uTime: { value: 0 },
    uAssemble: { value: 0 },
    uSize: { value: unit * stride * 1.9 },
    uViewScale: { value: 1 },
    uKeyDir: { value: new THREE.Vector3(0.4, 0.5, 1) },
    uKey: { value: 0.9 },
    uRim: { value: 1 },
    uAmbient: { value: 0.35 },
    uRimColor: { value: new THREE.Color("#9956F6") },
    uBreath: { value: 1 },
    uBottom: { value: -top },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms,
    transparent: true,
    depthWrite: true,
    depthTest: true,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;

  const object = new THREE.Group();
  object.add(points);

  const keyDirWorld = new THREE.Vector3();

  return {
    object,
    kind: "twin",
    anchors: createAnchors(),
    pointCount: total,
    update(state: SceneState, time: number, camera: THREE.Camera, viewScale: number) {
      uniforms.uTime.value = time;
      uniforms.uAssemble.value = state.assemble;
      uniforms.uViewScale.value = viewScale;
      uniforms.uKey.value = state.key;
      uniforms.uRim.value = state.rim;
      uniforms.uAmbient.value = 0.18 + state.exposure * 0.32;
      // luz principal varre o modelo da esquerda para a direita (cena 02)
      keyDirWorld.set(state.keySweep * 1.4, 0.6, 1).normalize();
      uniforms.uKeyDir.value.copy(keyDirWorld).transformDirection(camera.matrixWorldInverse);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}
