import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { createAnchors, HEAD_TOP_Y } from "./anchors";
import type { CharacterRig, SceneState } from "./types";

/**
 * Ponto de integração do modelo hiper-realista (GLB/GLTF).
 *
 * O modelo é escalado para `height` e alinhado pelo topo da cabeça com o
 * enquadramento do gémeo digital (cabeça → cintura), por isso a coreografia
 * (câmara, rotação, luzes, etiquetas) funciona sem alterações.
 * Espera-se o modelo virado para +Z.
 */
export async function createGlbCharacter(
  url: string,
  height: number,
  renderer: THREE.WebGLRenderer,
  signal?: AbortSignal,
): Promise<CharacterRig> {
  const loader = new GLTFLoader();
  // modelos optimizados com `gltf-transform meshopt` (ver docs/about-3d.md)
  loader.setMeshoptDecoder(MeshoptDecoder);
  const gltf = await new Promise<Awaited<ReturnType<GLTFLoader["loadAsync"]>>>(
    (resolve, reject) => {
      const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
      signal?.addEventListener("abort", onAbort, { once: true });
      loader.load(url, resolve, undefined, reject);
    },
  );

  const model = gltf.scene;
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const scale = height / Math.max(size.y, 1e-6);
  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, HEAD_TOP_Y - box.max.y * scale, -center.z * scale);

  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  model.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of materials) {
      const std = m as THREE.MeshStandardMaterial;
      if (std.map) std.map.anisotropy = maxAniso;
    }
  });

  // Iluminação física: contraluz roxo + luz principal que varre o rosto
  const rimLight = new THREE.DirectionalLight("#9956F6", 0);
  rimLight.position.set(-1.5, 1.2, -2.5);
  const rimLight2 = new THREE.DirectionalLight("#b899ff", 0);
  rimLight2.position.set(1.8, 0.8, -2);
  const keyLight = new THREE.SpotLight("#F5F3FA", 0, 12, Math.PI / 7, 0.6, 1.4);
  keyLight.position.set(0, 1.4, 4);
  const fill = new THREE.HemisphereLight("#b899ff", "#0D0D0D", 0);

  const object = new THREE.Group();
  object.add(model);

  // As luzes ficam presas à câmara/mundo, não ao modelo: quando o modelo roda,
  // a luz roxa continua a contornar a silhueta.
  const lights = new THREE.Group();
  lights.add(rimLight, rimLight2, keyLight, keyLight.target, fill);

  const mixer = gltf.animations.length ? new THREE.AnimationMixer(model) : null;
  const idle = gltf.animations.find((a) => /idle|breath/i.test(a.name)) ?? gltf.animations[0];
  if (mixer && idle) mixer.clipAction(idle).play();
  let last = 0;

  return {
    object,
    kind: "glb",
    lights,
    anchors: createAnchors(),
    update(state: SceneState, time: number) {
      const reveal = THREE.MathUtils.smoothstep(state.assemble, 0, 1);
      rimLight.intensity = state.rim * 4 * reveal;
      rimLight2.intensity = state.rim * 2 * reveal;
      keyLight.intensity = state.key * 14 * reveal;
      keyLight.position.x = state.keySweep * 2.5;
      fill.intensity = (0.15 + state.exposure * 0.6) * reveal;
      if (mixer) {
        mixer.update(Math.min(0.05, time - last));
        last = time;
      }
    },
    dispose() {
      mixer?.stopAllAction();
      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of materials) {
          for (const value of Object.values(m)) {
            if (value instanceof THREE.Texture) value.dispose();
          }
          m.dispose();
        }
      });
    },
  };
}
