# Secção About — experiência 3D controlada pelo scroll

A secção About da página inicial (`#about`) é uma sequência cinematográfica em
cinco cenas, controlada pelo progresso do scroll:

| Progresso | Cena | O que acontece |
| --- | --- | --- |
| 0–20 % | 01 · A presença | A luz roxa nasce, as partículas convergem (contornos primeiro, rosto e colete depois), surge a assinatura «A mente cria, o código segue.» |
| 20–42 % | 02 · Revelação | Aproximação ao rosto, a luz principal varre o modelo, aparecem etiquetas ancoradas ao corpo |
| 42–64 % | 03 · Identidade | A personagem roda 180° até às costas do colete (logótipo, assinatura, contactos); mostrador de rotação no chão |
| 64–86 % | 04 · Filosofia | A câmara recua; título e os três conceitos (Criatividade, Engenharia, Impacto) com o texto original da secção |
| 86–100 % | 05 · Encerramento | Regresso de frente, logótipo, assinatura e CTA «Fale connosco» |

## Arquitectura

```
src/components/about/
├── about-section.tsx     # escolhe a versão (cinematográfica / estática)
├── about-cinematic.tsx   # palco sticky, HUD, textos, ligação GSAP ↔ Three.js
├── about-timeline.ts     # coreografia (timeline GSAP de 0 a 100 unidades)
├── about-static.tsx      # versão sem movimento (reduced motion / sem WebGL)
├── about-content.ts      # textos (os mesmos da versão anterior)
├── capabilities.ts       # WebGL, prefers-reduced-motion, nível de qualidade
├── character-config.ts   # caminho do modelo GLB e dos assets do gémeo
├── split-words.tsx       # revelação tipográfica por máscara
└── scene/
    ├── about-scene.ts      # renderer, câmara, luz volumétrica, partículas, mostrador
    ├── twin-character.ts   # gémeo digital volumétrico (por omissão)
    ├── glb-character.ts    # integração do modelo GLB hiper-realista
    ├── anchors.ts          # âncoras das etiquetas
    └── types.ts            # estado partilhado da cena
```

- **GSAP + ScrollTrigger** (já existentes no projecto) controlam uma timeline
  única. O Lenis continua a ser o único sistema de scroll suave, e a sincronização
  com o ScrollTrigger já estava feita em `src/lib/smooth-scroll.ts`.
- **Three.js** (sem React Three Fiber, para não acrescentar dependências) corre
  numa classe imperativa. A timeline interpola um objecto de estado, a cena lê-o
  a cada frame e o React nunca re-renderiza durante o scroll.
- O palco usa `position: sticky` (sem pin), por isso não há espaçadores nem
  conflitos com o Lenis.
- O Three.js e a personagem são carregados com `import()` dinâmico, num chunk
  separado (~79 KB gzip). A cena só renderiza quando a secção está visível.
- `gsap.matchMedia()` gera variantes da coreografia para ecrã largo (texto à
  esquerda, modelo à direita) e estreito (um conceito de cada vez, modelo
  atenuado por trás).

### Desempenho e acessibilidade

- Nível `low` (toque, largura < 768 px, ≤ 4 núcleos ou ≤ 4 GB): ¼ dos pontos,
  menos partículas, sem antialias e DPR ≤ 1.35. Nível `high`: DPR ≤ 1.75.
- `prefers-reduced-motion` ou ausência de WebGL → `AboutStatic` (layout
  editorial com as duas fotografias, sem animação contínua).
- Se os assets 3D falharem ou o contexto WebGL se perder → é mostrado o retrato
  estático dentro da mesma narrativa (os textos continuam sincronizados).
- Todo o texto está no DOM (SEO e leitores de ecrã). Há um link «Saltar
  animação». Se o CTA receber foco pelo teclado antes de estar visível, a cena
  avança até ao encerramento.

## O gémeo digital (implementação actual)

Não foi possível criar um *digital human* hiper-realista (malha com rigging,
pele com SSS, cabelo por fios) neste ambiente. Em vez de uma geometria genérica,
a cena usa um **gémeo digital volumétrico construído a partir das duas
fotografias de referência**:

1. Recorte da pessoa nas duas fotos com BiRefNet-portrait (`rembg`).
2. Equilíbrio de brancos parcial (as fotos têm uma dominante roxa forte; o roxo
   passa a vir do contraluz da cena).
3. Alinhamento da foto de costas com a frontal (pela cabeça), espelhada.
4. Mapa de profundidade por insuflação da silhueta (transformada de distância
   suavizada). Dá volume arredondado à cabeça, ao tronco e aos braços.
5. No browser, cada pixel gera um ponto na casca frontal (cor da foto frontal) e
   outro na casca posterior (cor da foto de costas). As cascas fecham-se no
   contorno, por isso a rotação revela um volume real e a impressão do colete
   (logótipo, «A mente cria, o código segue.», contactos) aparece nas costas.

Para regenerar os assets (p.ex. com fotografias novas):

```bash
python -m venv .venv && .venv/bin/pip install "rembg[cpu]" scipy pillow
# recortar: gera front_cut.png e back_cut.png (960×1280) numa pasta à escolha
.venv/bin/python -c "from rembg import remove, new_session; from PIL import Image; s=new_session('birefnet-portrait'); [remove(Image.open(f'{n}.jpg').convert('RGB'), session=s).save(f'seg/{n}_cut.png') for n in ['front','back']]"
.venv/bin/python scripts/about-twin-prep.py seg public/about
```

As constantes de alinhamento (`k`, `cf`, `cb`, `tf`, `tb`) e a moldura em
`scripts/about-twin-prep.py` são específicas destas fotografias. Se mudar as
fotos, meça o topo e o centro da cabeça em cada recorte e actualize-as. Se a
moldura mudar, actualize também as âncoras em `scene/anchors.ts`.

### Limitações conhecidas

- É uma reconstrução a partir de duas fotos, não um scan: os perfis (90°/270°)
  mostram a junção das duas cascas, e a pose frontal (mão no peito) e a
  posterior (braços levantados) não coincidem. Na zona onde a foto de costas não
  tem dados (cintura), usa-se a cor frontal escurecida. A coreografia passa
  depressa pelos perfis e fica em vistas frontais, ¾ ou posteriores.
- Não há animação corporal articulada (só respiração e oscilação subtis).
- A legibilidade dos contactos nas costas depende da densidade de pontos. No
  nível `low` o logótipo e a assinatura continuam legíveis, os contactos não.

## Integrar o modelo hiper-realista (GLB)

A cena aceita um modelo GLB/GLTF sem mudar a coreografia:

1. Produza o modelo (sugestões, por ordem de fidelidade):
   - **Captura fotogramétrica** da pessoa com o colete (40–80 fotos à volta ou um
     scanner como Polycam/RealityScan), limpeza e retopologia em Blender.
   - **Digital human** (MetaHuman, Character Creator + Headshot, ou equivalente)
     a partir de fotos frontais e laterais do rosto, com o vestuário modelado
     à parte.
2. Vestuário: modele o colete com bolsos, fechos e faixas reflectoras. Para a
   impressão das costas, projecte `public/about/portrait-back.webp` (ou a
   arte vectorial original da marca, preferível) como textura no UV do colete.
3. Exporte em GLB, virado para +Z, com materiais PBR. Opcional: uma animação
   `idle`/`breathing` (é reproduzida automaticamente).
4. Optimize: `npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt --texture-compress webp`.
   O carregador já tem o descodificador meshopt. Objectivo: < 8 MB.
5. Coloque o ficheiro em `public/about/` e defina, em
   `src/components/about/character-config.ts`:

   ```ts
   export const CHARACTER_MODEL_URL = "/about/mindware-character.glb";
   ```

   O modelo é escalado para `CHARACTER_HEIGHT` (5.4 para corpo inteiro) e
   alinhado pelo topo da cabeça. A luz roxa de contorno e a luz principal ficam
   presas ao mundo, por isso acompanham a rotação.
