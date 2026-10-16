"""
Reconstrução do rosto a partir da fotografia frontal (corre num venv com MediaPipe).

1. MediaPipe Face Landmarker → 478 pontos 3D do rosto na foto.
2. Alinhamento (Kabsch com escala) com o modelo canónico do MediaPipe →
   rosto frontalizado, em cm; profundidade misturada 50/50 com a canónica.
3. Textura 1024² do rosto: equilíbrio de brancos parcial (a foto tem luz roxa),
   gradação para o tom de pele e transição suave para pele fora do oval.

Saída: <out>/face_mesh.json (vértices, triângulos, UV, pose) e <out>/face_tex.png

Uso:
  python face_prep.py <foto_frente.jpg> <recorte_frente.png> <models_dir> <out_dir>
  models_dir: face_landmarker.task e canonical_face_model.obj (ver docs/about-3d.md)
  recorte_frente.png: a pessoa sem fundo (RGBA), p.ex. com rembg/BiRefNet-portrait
"""
import sys, json, numpy as np
import mediapipe as mp
from mediapipe.tasks import python as mpt
from mediapipe.tasks.python import vision
from PIL import Image, ImageDraw, ImageFilter

PHOTO, CUT, MODELS, O = sys.argv[1:5]

img_rgb = Image.open(PHOTO).convert("RGB")
W, H = img_rgb.size
opts = vision.FaceLandmarkerOptions(
    base_options=mpt.BaseOptions(model_asset_path=f"{MODELS}/face_landmarker.task"), num_faces=1)
det = vision.FaceLandmarker.create_from_options(opts)
res = det.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.array(img_rgb)))
P = np.array([[p.x * W, p.y * H, p.z * W] for p in res.face_landmarks[0]])[:468]

cv, tris = [], []
for line in open(f"{MODELS}/canonical_face_model.obj"):
    t = line.split()
    if not t:
        continue
    if t[0] == "v":
        cv.append([float(x) for x in t[1:4]])
    if t[0] == "f":
        tris.append([int(x.split("/")[0]) - 1 for x in t[1:4]])
C, T = np.array(cv), np.array(tris)

# pontos em espaço y-up, z para a câmara; Kabsch com escala: L ≈ s R C
L = np.stack([P[:, 0], -P[:, 1], -P[:, 2]], 1)
Lc, Cc = L - L.mean(0), C - C.mean(0)
U, Sg, Vt = np.linalg.svd(Cc.T @ Lc)
D = np.eye(3); D[2, 2] = np.sign(np.linalg.det(U @ Vt))
R = (U @ D @ Vt).T
s = (Sg * np.diag(D)).sum() / (Cc ** 2).sum()
front = (R.T @ Lc.T).T / s
front[:, 2] = 0.5 * front[:, 2] + 0.5 * Cc[:, 2]  # a profundidade detectada é achatada

img = np.array(img_rgb).astype(np.float32)
cut = np.array(Image.open(CUT))[..., 3] > 127
mean = img[cut].mean(0)
img = np.clip(img * (1 + (mean.mean() / mean - 1) * 0.65), 0, 255)
x0, y0, x1, y1 = [int(v) for v in [P[:, 0].min() - 60, P[:, 1].min() - 70, P[:, 0].max() + 60, P[:, 1].max() + 50]]
crop = img[y0:y1, x0:x1]
sk = np.concatenate([img[int(P[i, 1]) - 3:int(P[i, 1]) + 3, int(P[i, 0]) - 3:int(P[i, 0]) + 3].reshape(-1, 3)
                     for i in [50, 280, 205, 425, 101, 330]])
skin = np.median(sk, 0)
oval = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176,
        149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]
m = Image.new("L", (x1 - x0, y1 - y0), 0)
ImageDraw.Draw(m).polygon([(P[i, 0] - x0, P[i, 1] - y0) for i in oval], fill=255)
m = m.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.GaussianBlur(9))
a = np.array(m, np.float32)[..., None] / 255
# gradação: leva a mediana da pele para um castanho profundo natural
TARGET = np.array([98.0, 66.0, 52.0])
crop = 255 * np.power(np.clip(crop * (TARGET / skin), 0, 255) / 255, 1.08)
tex = crop * a + TARGET * (1 - a)
Image.fromarray(tex.astype(np.uint8)).resize((1024, 1024), Image.LANCZOS).save(f"{O}/face_tex.png")
uv = np.stack([(P[:, 0] - x0) / (x1 - x0), 1 - (P[:, 1] - y0) / (y1 - y0)], 1)
json.dump({"v": front.tolist(), "f": T.tolist(), "uv": uv.tolist(), "R": R.tolist(), "s": s,
           "crop": [x0, y0, x1, y1], "skin": (TARGET / 255).tolist(), "center_px": L.mean(0).tolist()},
          open(f"{O}/face_mesh.json", "w"))
print("rosto reconstruído:", len(T), "triângulos; escala", round(s, 2), "px/cm")
