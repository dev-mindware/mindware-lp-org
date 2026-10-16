"""
Textura do colete Mindware (4096×2048), desenhada a partir das fotografias.

Mapeamento (igual ao UV gerado em build_character.py):
  u = 0.5 + φ/2π, com φ = atan2(−x/a, y/b)  → costas ao centro (u = 0.5),
      junção na frente, escondida pelo fecho;
  v = (z − Z0) / (Z1 − Z0).
Perto do centro das costas/frente: ~3260 px/m na horizontal, ~3720 px/m na vertical.

Também gera stripes.png (riscas cinzento/azul-marinho da camisola).

Uso: python vest_texture.py <repo_root> <out_png>
"""
import sys, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

ROOT, OUT = sys.argv[1], sys.argv[2]
W, H = 4096, 2048
A_ELL = 0.205            # semi-eixo x usado no UV (m)
Z0, Z1 = 0.93, 1.50      # alturas do colete (m)
PXM_X = W / (2 * math.pi * A_ELL)
PXM_Y = H / (Z1 - Z0)

FONT = f"{ROOT}/src/fonts/Satoshi-Variable.ttf"
FABRIC = (16, 16, 18)
WHITE = (238, 236, 244)
REFLECT = (176, 160, 232)  # faixa reflectora (lavanda/roxo, como nas fotos)


def font(size, weight):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def x_back(meters):
    """x no corpo (m, positivo = lado esquerdo do portador) → px nas costas."""
    return W / 2 - meters * PXM_X


def x_front(meters):
    """frente: centro em u=0/1; lado direito do portador (x<0) perto de u=1."""
    u = (meters * PXM_X) / W
    return (u % 1.0) * W


def y_at(z):
    return (1 - (z - Z0) / (Z1 - Z0)) * H


def fabric():
    rng = np.random.default_rng(7)
    base = np.ones((H, W, 3), np.float32) * np.array(FABRIC, np.float32)
    noise = rng.normal(0, 3.2, (H, W, 1)).astype(np.float32)
    # trama subtil (ripstop)
    yy, xx = np.mgrid[0:H, 0:W]
    grid = ((xx % 48 < 2) | (yy % 48 < 2)).astype(np.float32)[..., None] * 5
    return Image.fromarray(np.clip(base + noise + grid, 0, 255).astype(np.uint8))


def band(d, z_top, z_bot, x0=0, x1=W):
    d.rectangle((x0, y_at(z_top), x1, y_at(z_bot)), fill=REFLECT)


def logo_white(height_px):
    lg = Image.open(f"{ROOT}/public/logo.png").convert("RGBA")
    lg = lg.crop(lg.getbbox())
    a = lg.split()[3]
    w = int(lg.width * height_px / lg.height)
    a = a.point(lambda v: max(0, min(255, (v - 150) * 4)))  # sem o halo do PNG
    a = a.resize((w, height_px), Image.LANCZOS)
    solid = Image.new("RGBA", a.size, WHITE + (255,))
    solid.putalpha(a)
    return solid


def text_center(d, cx, y, txt, f, fill=WHITE):
    w = d.textlength(txt, font=f)
    d.text((cx - w / 2, y), txt, font=f, fill=fill)
    return w


def phone_icon(d, cx, cy, r):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE)
    d.rounded_rectangle((cx - r * 0.42, cy - r * 0.55, cx + r * 0.42, cy + r * 0.55), r * 0.15, fill=FABRIC)


def mail_icon(d, cx, cy, r):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE)
    d.rectangle((cx - r * 0.5, cy - r * 0.32, cx + r * 0.5, cy + r * 0.32), fill=FABRIC)
    d.line((cx - r * 0.5, cy - r * 0.32, cx, cy + r * 0.05, cx + r * 0.5, cy - r * 0.32), fill=WHITE, width=max(2, int(r * 0.12)))


def main():
    img = fabric()
    d = ImageDraw.Draw(img)

    # ── Costas ────────────────────────────────────────────────────────────
    cx = W / 2
    lg = logo_white(int(0.105 * PXM_Y))
    img.paste(lg, (int(cx - lg.width / 2), int(y_at(1.375))), lg)
    f_brand = font(int(0.062 * PXM_Y), 800)
    text_center(d, cx, y_at(1.258), "Mindware", f_brand)
    f_sub = font(int(0.022 * PXM_Y), 500)
    sub = "Comércio e Serviços"
    sw = d.textlength(sub, font=f_sub)
    ys = y_at(1.183)
    text_center(d, cx, ys, sub, f_sub)
    rule_y = ys + 0.013 * PXM_Y
    gap = 0.012 * PXM_X
    rule_w = 0.06 * PXM_X
    for s in (-1, 1):
        x_in = cx + s * (sw / 2 + gap)
        d.line((x_in, rule_y, x_in + s * rule_w, rule_y), fill=WHITE, width=5)
    f_slogan = font(int(0.03 * PXM_Y), 750)
    text_center(d, cx, y_at(1.148), "A mente cria, o código segue.", f_slogan)
    f_contact = font(int(0.018 * PXM_Y), 600)
    yc = y_at(1.098)
    r = 0.011 * PXM_Y
    phone = "+244 943 100 922"
    mail = "info@mindware.ao"
    pw = d.textlength(phone, font=f_contact)
    mw = d.textlength(mail, font=f_contact)
    total = 2 * r + 10 + pw + 0.03 * PXM_X + 2 * r + 10 + mw
    x = cx - total / 2
    phone_icon(d, x + r, yc + r * 1.05, r)
    d.text((x + 2 * r + 10, yc), phone, font=f_contact, fill=WHITE)
    x += 2 * r + 10 + pw + 0.03 * PXM_X
    mail_icon(d, x + r, yc + r * 1.05, r)
    d.text((x + 2 * r + 10, yc), mail, font=f_contact, fill=WHITE)

    # faixa reflectora inferior (à volta) e faixa superior (frente, nos ombros)
    band(d, 1.012, 0.982)
    band(d, 1.452, 1.428, x_front(-0.2) - 1, W)
    band(d, 1.452, 1.428, 0, x_front(0.2) + 1)

    # ── Frente ────────────────────────────────────────────────────────────
    # "Mindware" no peito direito do portador (lado esquerdo de quem olha)
    f_chest = font(int(0.02 * PXM_Y), 800)
    xt = x_front(-0.105)
    d.text((xt - d.textlength("Mindware", font=f_chest) / 2, y_at(1.35)), "Mindware", font=f_chest, fill=WHITE)
    # logótipo no peito esquerdo do portador
    lg2 = logo_white(int(0.055 * PXM_Y))
    xl = x_front(0.11)
    img.paste(lg2, (int(xl - lg2.width / 2), int(y_at(1.385))), lg2)
    # fecho central (os dois lados da junção UV)
    for x0, x1 in ((W - 0.008 * PXM_X, W), (0, 0.008 * PXM_X)):
        d.rectangle((x0, 0, x1, H), fill=(40, 40, 44))
    for yy in range(0, H, 14):
        d.line((W - 0.006 * PXM_X, yy, W, yy), fill=(90, 90, 96), width=4)
        d.line((0, yy + 7, 0.006 * PXM_X, yy + 7), fill=(90, 90, 96), width=4)
    # costuras (pespontos) das bainhas
    for z in (0.94, 1.49):
        yy = y_at(z)
        for xx in range(0, W, 26):
            d.line((xx, yy, xx + 13, yy), fill=(54, 54, 60), width=3)

    img = img.filter(ImageFilter.SMOOTH)
    img.save(OUT, optimize=True)

    # riscas da camisola: duas bandas por período, com orla suave
    st = Image.new("RGB", (16, 128))
    sd = ImageDraw.Draw(st)
    sd.rectangle((0, 0, 16, 63), fill=(150, 150, 166))
    sd.rectangle((0, 64, 16, 128), fill=(30, 32, 64))
    st.filter(ImageFilter.GaussianBlur(1.2)).save(OUT.replace("vest_tex.png", "stripes.png"))


main()
