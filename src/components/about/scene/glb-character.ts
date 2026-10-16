import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { HEAD_TOP_Y, WAIST_Y } from "./anchors";
import type { CharacterRig, SceneState } from "./types";

/**
 * Personagem 3D da Mindware (GLB gerado por scripts/character/).
 *
 * - O modelo é escalado e alinhado pelo topo da cabeça com o enquadramento
 *   da cena (cabeça → cintura), por isso a coreografia de câmara funciona
 *   com qualquer modelo que siga as mesmas convenções.
 * - A animação "Scroll" (poses: mão no peito, polegares a apontar para as
 *   costas, etc.) é controlada pelo progresso do scroll — não pelo tempo.
 * - Por cima, uma respiração procedimental subtil mantém a personagem viva.
 */

/** Pontos de ancoragem para as etiquetas, em coordenadas do modelo (glTF, Y para cima, metros). */
const MODEL_ANCHORS: Record<string, [number, number, number]> = {
  head: [0.062, 1.71, 0.05],
  headphones: [-0.08, 1.462, 0.15],
  chest: [0.1, 1.37, 0.16],
  vest: [-0.1, 1.06, 0.17],
  shoulder: [0.22, 1.42, 0.0],
};

const INK = new THREE.Color("#0D0D0D");

type FadeUniforms = { uFadeTop: { value: number }; uFadeBottom: { value: number } };

/** Desvanece o modelo abaixo da cintura (em espaço do mundo) para o fundo da cena. */
function addWaistFade(material: THREE.Material, uniforms: FadeUniforms) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFadeTop = uniforms.uFadeTop;
    shader.uniforms.uFadeBottom = uniforms.uFadeBottom;
    shader.uniforms.uInk = { value: new THREE.Vector3(INK.r, INK.g, INK.b) };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vFadeY;")
      .replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvFadeY = (modelMatrix * vec4(transformed, 1.0)).y;",
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying float vFadeY;\nuniform float uFadeTop;\nuniform float uFadeBottom;\nuniform vec3 uInk;",
      )
      .replace(
        "#include <dithering_fragment>",
        "gl_FragColor.rgb = mix(gl_FragColor.rgb, uInk, smoothstep(uFadeTop, uFadeBottom, vFadeY));\n#include <dithering_fragment>",
      );
  };
  material.customProgramCacheKey = () => "about-waist-fade";
}

export async function createGlbCharacter(
  url: string,
  height: number,
  renderer: THREE.WebGLRenderer,
  signal?: AbortSignal,
): Promise<CharacterRig> {
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const gltf = await new Promise<Awaited<ReturnType<GLTFLoader["loadAsync"]>>>((resolve, reject) => {
    const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
    signal?.addEventListener("abort", onAbort, { once: true });
    loader.load(url, resolve, undefined, reject);
  });

  const model = gltf.scene;
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const scale = height / Math.max(size.y, 1e-6);
  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, HEAD_TOP_Y - box.max.y * scale, -center.z * scale);

  const fade: FadeUniforms = { uFadeTop: { value: WAIST_Y - 0.05 }, uFadeBottom: { value: WAIST_Y - 0.85 } };
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const materials = new Set<THREE.Material>();
  model.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.frustumCulled = false; // a pose animada sai da caixa de repouso
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of list) {
      if (materials.has(m)) continue;
      materials.add(m);
      const std = m as THREE.MeshPhysicalMaterial;
      if (std.map) std.map.anisotropy = maxAniso;
      if (m.name === "Durag") {
        // cetim preto: brilho suave, sem ficar prateado com o mapa de ambiente
        std.roughness = 0.42;
        std.envMapIntensity = 0.25;
        std.sheen = 0.35;
        std.sheenColor = new THREE.Color("#3a2a55");
      } else if (m.name === "Headphones" || m.name === "Zip") {
        std.envMapIntensity = 0.6;
      } else {
        std.envMapIntensity = 0.35;
      }
      addWaistFade(m, fade);
    }
  });

  // Animação controlada pelo scroll
  const mixer = new THREE.AnimationMixer(model);
  const clip = gltf.animations.find((a) => a.name === "Scroll") ?? gltf.animations[0];
  const action = clip ? mixer.clipAction(clip) : null;
  if (action) {
    action.play();
    action.paused = true;
  }

  const bone = (name: string) => model.getObjectByName(name) as THREE.Bone | undefined;
  const chest = bone("chest");
  const upperChest = bone("upper_chest");
  const head = bone("head");

  // Iluminação física: contraluz roxo + luz principal que varre o rosto.
  // As luzes ficam no mundo: quando o modelo roda, o roxo continua no contorno.
  const rimLight = new THREE.DirectionalLight("#9956F6", 0);
  rimLight.position.set(-2.2, 1.6, -2.8);
  const rimLight2 = new THREE.DirectionalLight("#b899ff", 0);
  rimLight2.position.set(2.4, 1.0, -2.4);
  const keyLight = new THREE.DirectionalLight("#F5F3FA", 0);
  keyLight.position.set(0.8, 1.6, 4);
  const fill = new THREE.HemisphereLight("#d9ccff", "#0D0D0D", 0);
  const lights = new THREE.Group();
  lights.add(rimLight, rimLight2, keyLight, fill);

  const object = new THREE.Group();
  object.add(model);

  const anchors: Record<string, THREE.Vector3> = {};
  for (const [key, [x, y, z]] of Object.entries(MODEL_ANCHORS)) {
    anchors[key] = new THREE.Vector3(x, y, z).multiplyScalar(scale).add(model.position);
  }

  return {
    object,
    kind: "glb",
    lights,
    anchors,
    update(state: SceneState, time: number) {
      const reveal = THREE.MathUtils.smoothstep(state.assemble, 0, 1);
      rimLight.intensity = state.rim * 3.2 * reveal;
      rimLight2.intensity = state.rim * 1.8 * reveal;
      keyLight.intensity = state.key * 2.6 * reveal;
      keyLight.position.x = state.keySweep * 3;
      fill.intensity = (0.25 + state.exposure * 1.2) * reveal;

      if (action && clip) {
        action.time = THREE.MathUtils.clamp(state.progress, 0, 1) * clip.duration;
        mixer.update(0);
      }
      // respiração e micro-movimentos por cima da pose
      const breath = Math.sin(time * 1.15);
      if (chest) chest.rotation.x += breath * 0.012;
      if (upperChest) upperChest.rotation.x -= breath * 0.008;
      if (head) {
        head.rotation.y += Math.sin(time * 0.45) * 0.02;
        head.rotation.x += Math.sin(time * 0.6 + 1.3) * 0.008;
      }
    },
    dispose() {
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of list) {
          for (const value of Object.values(m)) {
            if (value instanceof THREE.Texture) value.dispose();
          }
          m.dispose();
        }
      });
    },
  };
}
