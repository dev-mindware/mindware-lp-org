"""
Pré-processamento do gémeo digital da secção About.

Entrada: recortes RGBA (fundo removido, p.ex. com rembg/BiRefNet-portrait)
  <seg>/front_cut.png e <seg>/back_cut.png  (960x1280, fotos de referência)
Saída em <out>/: twin-front.webp, twin-back.webp, twin-depth.png (mesmo
enquadramento) e portrait-front/back.webp para o fallback estático.

Uso: python scripts/about-twin-prep.py <seg> public/about
"""
import sys, numpy as np
from PIL import Image
from scipy import ndimage
seg, out = sys.argv[1], sys.argv[2]
F = np.array(Image.open(f'{seg}/front_cut.png').convert('RGBA')).astype(np.float32)
B = np.array(Image.open(f'{seg}/back_cut.png').convert('RGBA')).astype(np.float32)
H0, W0 = F.shape[:2]
# equilíbrio de brancos parcial (gray-world): as fotos têm uma dominante roxa
# forte da iluminação; corrige-se 65% para a pele e o cinzento ficarem
# naturais — o roxo passa a vir do contraluz da cena 3D.
WB = 0.65
def white_balance(img):
    m = img[..., 3] > 127
    mean = img[..., :3][m].mean(0)
    gain = 1 + (mean.mean() / mean - 1) * WB
    img[..., :3] = np.clip(img[..., :3] * gain, 0, 255)
    return img
F = white_balance(F)
B = white_balance(B)
# alinhamento costas -> frente (cabeça como referência, espelhado)
k = 1/1.08; cf, cb, tf, tb = 352.0, 454.0, 264.0, 353.0
ys, xs = np.mgrid[0:H0, 0:W0].astype(np.float32)
bx = cb - (xs - cf) / k
by = tb + (ys - tf) / k
Bw = np.stack([ndimage.map_coordinates(B[..., c], [by, bx], order=1, mode='constant', cval=0) for c in range(4)], -1)
# moldura comum
x0, x1, y0, y1 = 60, 920, 230, 1280
OW = 600; OH = round(OW * (y1 - y0) / (x1 - x0))
mask = F[..., 3] > 127
# profundidade: insuflação da silhueta (transformada de distância), com o
# corte inferior tratado como continuação do corpo
pad = 260
mp = np.vstack([mask, np.repeat(mask[-1:], pad, 0)])
d = ndimage.distance_transform_edt(mp)[:H0]
d = ndimage.gaussian_filter(d, 9) * mask
d = d / d.max()
def crop(a): return a[y0:y1, x0:x1]
def save_rgba(a, name):
    im = Image.fromarray(np.clip(crop(a), 0, 255).astype(np.uint8), 'RGBA').resize((OW, OH), Image.LANCZOS)
    im.save(f'{out}/{name}', 'WEBP', quality=88, method=6, alpha_quality=100, exact=True)
front = F.copy(); front[..., 3] = mask * 255
back = Bw.copy(); back[..., 3] = ((Bw[..., 3] > 127) & mask) * 255
save_rgba(front, 'twin-front.webp'); save_rgba(back, 'twin-back.webp')
Image.fromarray((crop(d) * 255).astype(np.uint8), 'L').resize((OW, OH), Image.BILINEAR).save(f'{out}/twin-depth.png', optimize=True)
# imagens estáticas (fallback), recortadas na caixa da pessoa
for src, name in [('front_cut.png', 'portrait-front.webp'), ('back_cut.png', 'portrait-back.webp')]:
    a = white_balance(np.array(Image.open(f'{seg}/{src}').convert('RGBA')).astype(np.float32))
    im = Image.fromarray(a.astype(np.uint8), 'RGBA'); im = im.crop(im.split()[3].getbbox())
    im.thumbnail((900, 900)); im.save(f'{out}/{name}', 'WEBP', quality=84, method=6)
print(OW, OH)
