# Secção About — personagem 3D controlada pelo scroll

A secção About da página inicial (`#about`) apresenta uma **personagem 3D** do
membro da equipa Mindware, criada a partir das duas fotografias de referência
(frente e costas). A personagem faz movimentos simples conforme o scroll, numa
sequência em cinco cenas:

| Progresso | Cena | Câmara / cena | Movimento da personagem |
| --- | --- | --- | --- |
| 0–20 % | 01 · A presença | A luz roxa revela a personagem; surge «A mente cria, o código segue.» | Mão no peito (pose da foto frontal), cabeça levanta-se |
| 20–42 % | 02 · Revelação | Aproximação ao rosto, varrimento de luz, etiquetas | Cabeça vira-se ligeiramente para a câmara |
| 42–64 % | 03 · Identidade | Rotação de 180° até às costas do colete | Braços levantam-se, polegares a apontar para as costas (pose da foto de costas) |
| 64–86 % | 04 · Filosofia | A câmara recua; título e três conceitos | Braços baixam, postura relaxada, vista ¾ posterior |
| 86–100 % | 05 · Encerramento | Regresso de frente, logótipo e CTA | Mão volta ao peito |

Sobre as poses há uma respiração procedimental subtil (peito e cabeça).

## A personagem (`public/about/mindware-character.glb`, ~335 KB)

Gerada por scripts em `scripts/character/` com o Blender (módulo `bpy`):

- **Rosto**: reconstruído a partir da foto frontal com MediaPipe Face Landmarker
  (478 pontos 3D), frontalizado e usado para moldar a cabeça (shrinkwrap). A
  textura do rosto é projectada da própria foto, com equilíbrio de brancos e
  gradação de pele (a foto tem iluminação roxa forte).
- **Durag** de cetim preto com as pontas atadas, **tranças** atrás das orelhas.
- **Camisola** às riscas cinzento/azul-marinho, com mangas curtas e gola.
- **Colete Mindware**: bolsos com pala e puxadores, fecho central, faixas
  reflectoras lavanda, «Mindware» e logótipo no peito; nas costas o logótipo,
  «Mindware», «Comércio e Serviços», «A mente cria, o código segue.» e os
  contactos. A impressão é desenhada com a fonte Satoshi do site e o
  `public/logo.png` (vest_texture.py), por isso fica nítida.
- **Auscultadores** cinzentos ao pescoço.
- **Esqueleto** de 47 ossos (coluna, pescoço, cabeça, braços, mãos e dedos),
  pesos automáticos no corpo e transferidos para a roupa.
- **Animação "Scroll"** (frames 0–100) com as poses acima; o site faz
  corresponder o progresso da secção ao tempo da animação.

`public/about/character-front.webp` e `character-back.webp` são renders da
mesma personagem, usados na versão estática.

### Regenerar o modelo

Requisitos: Python 3.12 (MediaPipe) e 3.13 (bpy), sem GPU.

```bash
# 0) ambientes
uv venv -p 3.12 .mp && uv pip install -p .mp/bin/python mediapipe pillow numpy
uv venv -p 3.13 .bl && uv pip install -p .bl/bin/python bpy pillow numpy
python -m venv .rb && .rb/bin/pip install "rembg[cpu]" pillow

# 1) modelos do MediaPipe
mkdir -p work/models
curl -L -o work/models/face_landmarker.task https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task
curl -L -o work/models/canonical_face_model.obj https://raw.githubusercontent.com/google-ai-edge/mediapipe/master/mediapipe/modules/face_geometry/data/canonical_face_model.obj

# 2) recorte da pessoa na foto frontal (máscara para o equilíbrio de brancos)
.rb/bin/python -c "from rembg import remove, new_session; from PIL import Image; remove(Image.open('frente.jpg').convert('RGB'), session=new_session('birefnet-portrait')).save('work/front_cut.png')"

# 3) rosto (malha + textura) e texturas do colete/camisola
.mp/bin/python scripts/character/face_prep.py frente.jpg work/front_cut.png work/models work
python scripts/character/vest_texture.py . work/vest_tex.png

# 4) personagem (malhas, rig, animação, export GLB) — "preview" gera renders
.bl/bin/python scripts/character/build_character.py work work/out preview

# 5) optimização para a web
npx @gltf-transform/cli optimize work/out/mindware-character.glb public/about/mindware-character.glb \
  --compress meshopt --texture-compress webp --texture-size 2048 --simplify false --palette false
```

Se o MediaPipe falhar com `libEGL.so.1`, instale `libegl1` (ou aponte
`LD_LIBRARY_PATH` para a `libEGL.so` do Chromium).

Para afinar: proporções e articulações em `J` (`build_character.py`), roupa e
acessórios em `parts.py`, poses e linha temporal da animação em `rig.py`
(`pose()` e `animate()`), impressão do colete em `vest_texture.py`.

### Limitações honestas

- É uma personagem **estilizada-realista** modelada por código, não um *digital
  human* fotogramétrico: a semelhança vem sobretudo do rosto reconstruído da foto
  (a geometria do resto da cabeça, das mãos e do corpo é genérica, com as
  proporções medidas nas fotos).
- O rosto tem a resolução da foto original (~240 px de largura); os olhos são
  textura, não globos oculares modelados.
- Sem GPU no ambiente de criação não foi possível usar geradores de imagem→3D
  ou captura fotogramétrica. Para maior fidelidade, faça um scan (40–80 fotos à
  volta da pessoa com o colete) ou use uma ferramenta de digital human, e
  substitua o GLB mantendo: virado para +Z, ossos com os mesmos nomes e uma
  animação "Scroll" de 0 a 100 frames.

## Arquitectura no site

```
src/components/about/
├── about-section.tsx     # escolhe a versão (cinematográfica / estática)
├── about-cinematic.tsx   # palco sticky, HUD, textos, ligação GSAP ↔ Three.js
├── about-timeline.ts     # coreografia (timeline GSAP de 0 a 100 unidades)
├── about-static.tsx      # versão sem movimento (reduced motion / sem WebGL)
├── about-content.ts      # textos (os mesmos da versão anterior)
├── capabilities.ts       # WebGL, prefers-reduced-motion, nível de qualidade
├── character-config.ts   # caminho e escala do GLB, renders estáticos
├── split-words.tsx       # revelação tipográfica por máscara
└── scene/
    ├── about-scene.ts      # renderer, câmara, luz volumétrica, partículas, mostrador
    ├── glb-character.ts    # carrega o GLB, animação pelo scroll, luzes PBR
    ├── anchors.ts          # alinhamento (topo da cabeça, cintura)
    └── types.ts            # estado partilhado da cena
```

- **GSAP + ScrollTrigger** (já existentes) controlam uma timeline única; o
  **Lenis** continua a ser o único scroll suave. A timeline interpola um objecto
  de estado (câmara, rotação, luzes, `progress`) que a cena lê a cada frame — o
  React não re-renderiza durante o scroll.
- **Three.js** carrega o GLB (descodificador meshopt) num chunk dinâmico; a
  cena só renderiza com a secção visível. Abaixo da cintura o modelo desvanece
  para o fundo (shader), para o enquadramento cabeça→cintura não mostrar cortes.
- Versão estática para `prefers-reduced-motion`/sem WebGL; render estático se o
  GLB falhar; todo o texto no DOM; link «Saltar animação»; o CTA mantém-se
  focável e o foco pelo teclado avança a cena.
