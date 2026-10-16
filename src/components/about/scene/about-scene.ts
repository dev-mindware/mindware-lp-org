import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { CharacterRig, QualityTier, SceneState } from "./types";
import { INITIAL_STATE } from "./types";

const PURPLE = new THREE.Color("#9956F6");
const PURPLE_SOFT = new THREE.Color("#b899ff");
const INK = new THREE.Color("#0D0D0D");

/** Brilho volumétrico atrás da personagem — o "nascer" da luz roxa. */
function createGlow() {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uIntensity: { value: 0 },
      uColor: { value: PURPLE.clone() },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float uIntensity;
      uniform vec3 uColor;
      void main() {
        vec2 p = vUv - vec2(0.5, 0.56);
        p.x *= 1.25;
        float d = length(p);
        float core = exp(-d * d * 18.0);
        float halo = exp(-d * d * 4.0) * 0.35;
        gl_FragColor = vec4(uColor * (core + halo) * uIntensity, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), material);
  mesh.position.set(0, 0.2, -1.6);
  return { mesh, material };
}

/** Feixe de luz vindo de cima — iluminação volumétrica subtil. */
function createBeam() {
  const geometry = new THREE.CylinderGeometry(0.35, 1.7, 5.5, 48, 1, true);
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uIntensity: { value: 0 }, uColor: { value: PURPLE_SOFT.clone() } },
    vertexShader: /* glsl */ `
      varying float vY;
      varying float vFresnel;
      void main() {
        vY = uv.y;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * normal);
        vFresnel = abs(dot(n, normalize(-mv.xyz)));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vY;
      varying float vFresnel;
      uniform float uIntensity;
      uniform vec3 uColor;
      void main() {
        float a = pow(vY, 1.6) * pow(vFresnel, 2.0) * 0.16 * uIntensity;
        gl_FragColor = vec4(uColor * a, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 2.2, -0.4);
  return { mesh, material, geometry };
}

/** Partículas discretas em suspensão. */
function createDust(count: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    // quase todas atrás do modelo: em close-up não se cruzam com o rosto
    positions[i * 3 + 2] = -6 + Math.random() * 6.6;
    seeds[i] = Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uViewScale: { value: 1 },
      uColor: { value: PURPLE_SOFT.clone() },
    },
    vertexShader: /* glsl */ `
      attribute float seed;
      uniform float uTime;
      uniform float uViewScale;
      varying float vTwinkle;
      void main() {
        vec3 p = position;
        p.y = mod(p.y + uTime * (0.04 + seed * 0.06) + 3.5, 7.0) - 3.5;
        p.x += sin(uTime * 0.2 + seed * 40.0) * 0.08;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (0.012 + seed * 0.02) * uViewScale / -mv.z;
        vTwinkle = 0.45 + 0.55 * sin(uTime * (0.6 + seed) + seed * 30.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uOpacity;
      uniform vec3 uColor;
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * uOpacity * vTwinkle;
        gl_FragColor = vec4(uColor * a, 1.0);
      }
    `,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  return { points, material, geometry };
}

/** Mostrador no chão: marca a rotação da personagem como um instrumento. */
function createDial() {
  const radius = 1.45;
  const verts: number[] = [];
  const segments = 160;
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    verts.push(Math.cos(a0) * radius, 0, Math.sin(a0) * radius);
    verts.push(Math.cos(a1) * radius, 0, Math.sin(a1) * radius);
  }
  for (let deg = 0; deg < 360; deg += 5) {
    const a = (deg / 180) * Math.PI;
    const len = deg % 90 === 0 ? 0.16 : deg % 30 === 0 ? 0.09 : 0.04;
    verts.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
    verts.push(Math.cos(a) * (radius + len), 0, Math.sin(a) * (radius + len));
  }
  // indicador da frente (+z)
  verts.push(0, 0, radius + 0.22, 0, 0, radius - 0.12);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  const material = new THREE.LineBasicMaterial({
    color: PURPLE,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const lines = new THREE.LineSegments(geometry, material);
  lines.position.y = -1.32;
  return { lines, material, geometry };
}

/** Linha de varrimento que acompanha a luz principal (cena 02). */
function createScan() {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uOpacity: { value: 0 }, uColor: { value: PURPLE_SOFT.clone() } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float uOpacity;
      uniform vec3 uColor;
      void main() {
        float line = exp(-pow((vUv.y - 0.5) * 40.0, 2.0));
        float trail = smoothstep(0.5, 1.0, vUv.y) * (1.0 - vUv.y) * 0.6;
        float fadeX = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
        gl_FragColor = vec4(uColor * (line + trail) * fadeX * uOpacity, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 0.5), material);
  mesh.position.z = 0.55;
  return { mesh, material };
}

/** Circuitos ao fundo: linhas ortogonais com nós, evocando engenharia. */
function createCircuits(count: number) {
  const verts: number[] = [];
  const nodes: number[] = [];
  let s = 42;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  for (let i = 0; i < count; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    let x = side * (2.2 + rand() * 3.2);
    let y = (rand() - 0.5) * 5;
    nodes.push(x, y, 0);
    const steps = 2 + Math.floor(rand() * 3);
    for (let k = 0; k < steps; k++) {
      const horizontal = k % 2 === 0;
      const len = 0.4 + rand() * 1.1;
      const nx = horizontal ? x - side * len : x;
      const ny = horizontal ? y : y + (rand() > 0.5 ? len : -len);
      verts.push(x, y, 0, nx, ny, 0);
      x = nx;
      y = ny;
    }
    nodes.push(x, y, 0);
  }
  const group = new THREE.Group();
  group.position.z = -4.2;
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: PURPLE,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nodes, 3));
  const nodeMaterial = new THREE.PointsMaterial({
    color: PURPLE_SOFT,
    size: 0.06,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial));
  group.add(new THREE.Points(nodeGeometry, nodeMaterial));
  return {
    group,
    setOpacity(v: number) {
      lineMaterial.opacity = v * 0.22;
      nodeMaterial.opacity = v * 0.6;
    },
    dispose() {
      lineGeometry.dispose();
      lineMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
    },
  };
}

export type AnchorScreen = { x: number; y: number; visible: boolean };

export type AboutSceneOptions = {
  canvas: HTMLCanvasElement;
  quality: QualityTier;
};

export class AboutScene {
  readonly renderer: THREE.WebGLRenderer;
  readonly camera: THREE.PerspectiveCamera;
  readonly scene = new THREE.Scene();
  state: SceneState = { ...INITIAL_STATE };

  private readonly quality: QualityTier;
  private readonly clock = new THREE.Clock();
  private readonly figure = new THREE.Group();
  private readonly glow = createGlow();
  private readonly beam = createBeam();
  private readonly dust: ReturnType<typeof createDust>;
  private readonly dial = createDial();
  private readonly scan = createScan();
  private readonly circuits: ReturnType<typeof createCircuits>;
  private character: CharacterRig | null = null;
  private envMap: THREE.Texture | null = null;
  private frame = 0;
  private running = false;
  private width = 1;
  private height = 1;
  private viewScale = 1;
  private pointer = new THREE.Vector2();
  private pointerSmoothed = new THREE.Vector2();
  private readonly tmp = new THREE.Vector3();
  private readonly lookTarget = new THREE.Vector3();
  onFrame: ((scene: AboutScene) => void) | null = null;

  constructor({ canvas, quality }: AboutSceneOptions) {
    this.quality = quality;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: quality === "high",
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
    });
    this.renderer.setClearColor(INK, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
    this.dust = createDust(quality === "high" ? 900 : 320);
    this.circuits = createCircuits(quality === "high" ? 16 : 8);

    this.scene.add(this.glow.mesh, this.beam.mesh, this.dust.points, this.circuits.group);
    this.figure.add(this.dial.lines, this.scan.mesh);
    this.scene.add(this.figure);
  }

  setCharacter(rig: CharacterRig) {
    if (this.character) {
      this.figure.remove(this.character.object);
      if (this.character.lights) this.scene.remove(this.character.lights);
      this.character.dispose();
    }
    this.character = rig;
    this.figure.add(rig.object);
    if (rig.lights) this.scene.add(rig.lights);
    // reflexos suaves para os materiais PBR (plástico, fecho, cetim do durag)
    if (!this.envMap) {
      const pmrem = new THREE.PMREMGenerator(this.renderer);
      const room = new RoomEnvironment();
      this.envMap = pmrem.fromScene(room, 0.04).texture;
      room.dispose();
      pmrem.dispose();
    }
    this.scene.environment = this.envMap;
    this.scene.environmentIntensity = 0.35;
  }

  get hasCharacter() {
    return this.character !== null;
  }

  setPointer(x: number, y: number) {
    this.pointer.set(x, y);
  }

  resize(width: number, height: number) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    const maxDpr = this.quality === "high" ? 1.75 : 1.35;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    const fovRad = THREE.MathUtils.degToRad(this.camera.fov);
    this.viewScale = (this.height * dpr) / (2 * Math.tan(fovRad / 2));
  }

  /** Factor de enquadramento: afasta a câmara em ecrãs estreitos. */
  private framing() {
    const aspect = this.camera.aspect;
    return THREE.MathUtils.clamp(1.3 / aspect, 1, 1.85);
  }

  /** Enquadramento horizontal — em retrato o modelo fica centrado. */
  private get isWide() {
    return this.camera.aspect >= 1.05;
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.render();
      this.frame = requestAnimationFrame(loop);
    };
    this.frame = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frame);
  }

  render() {
    const s = this.state;
    const t = this.clock.getElapsedTime();
    const framing = this.framing();

    // parallax subtil com o ponteiro (só desktop)
    this.pointerSmoothed.lerp(this.pointer, 0.05);

    this.figure.position.x = this.isWide ? s.figureX : 0;
    this.figure.rotation.y = s.rotY + this.pointerSmoothed.x * 0.06;
    // movimento secundário: oscilação muito lenta do corpo
    this.figure.rotation.z = Math.sin(t * 0.35) * 0.008;

    this.camera.position.set(
      s.camX + this.pointerSmoothed.x * 0.12,
      s.camY + this.pointerSmoothed.y * 0.08,
      s.camZ * framing,
    );
    this.lookTarget.set((this.isWide ? s.figureX * 0.35 : 0) + s.lookX, s.lookY, 0);
    this.camera.lookAt(this.lookTarget);
    this.camera.updateMatrixWorld();

    this.glow.material.uniforms.uIntensity.value = s.glow;
    this.glow.mesh.position.x = this.figure.position.x;
    this.beam.material.uniforms.uIntensity.value = s.glow;
    this.beam.mesh.position.x = this.figure.position.x;

    this.dust.material.uniforms.uTime.value = t;
    this.dust.material.uniforms.uOpacity.value = s.particles;
    this.dust.material.uniforms.uViewScale.value = this.viewScale;

    this.dial.material.opacity = s.ring * 0.55;
    this.scan.material.uniforms.uOpacity.value = s.scan;
    this.scan.mesh.position.y = 1.25 - ((s.keySweep + 1) / 2) * 2.5;
    // o varrimento fica sempre virado para a câmara
    this.scan.mesh.rotation.y = -this.figure.rotation.y;

    this.circuits.setOpacity(s.particles);
    this.circuits.group.position.x = -this.pointerSmoothed.x * 0.25;

    this.character?.update(s, t, this.camera, this.viewScale);
    this.renderer.render(this.scene, this.camera);
    this.onFrame?.(this);
  }

  /** Projecta uma âncora da personagem para coordenadas de ecrã (px). */
  projectAnchor(key: string, out: AnchorScreen): AnchorScreen {
    const anchor = this.character?.anchors[key];
    if (!anchor) {
      out.visible = false;
      return out;
    }
    this.tmp.copy(anchor);
    this.figure.localToWorld(this.tmp);
    this.tmp.project(this.camera);
    out.x = (this.tmp.x * 0.5 + 0.5) * this.width;
    out.y = (-this.tmp.y * 0.5 + 0.5) * this.height;
    out.visible = this.tmp.z < 1 && Math.abs(this.tmp.x) < 1.1 && Math.abs(this.tmp.y) < 1.1;
    return out;
  }

  dispose() {
    this.stop();
    this.onFrame = null;
    this.character?.dispose();
    this.character = null;
    this.envMap?.dispose();
    this.glow.mesh.geometry.dispose();
    this.glow.material.dispose();
    this.beam.geometry.dispose();
    this.beam.material.dispose();
    this.dust.geometry.dispose();
    this.dust.material.dispose();
    this.dial.geometry.dispose();
    this.dial.material.dispose();
    this.scan.mesh.geometry.dispose();
    this.scan.material.dispose();
    this.circuits.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
