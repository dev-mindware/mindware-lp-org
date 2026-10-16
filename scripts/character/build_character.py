"""
Construção da personagem 3D da secção About (Blender 5.x como módulo `bpy`).

Referências: as duas fotografias (frente/costas) do membro da equipa Mindware.
- Rosto: malha reconstruída com MediaPipe Face Landmarker a partir da foto
  frontal (ver face_prep.py), usada como alvo de shrinkwrap da cabeça e
  como textura projectada.
- Corpo, colete, durag, auscultadores: modelados aqui, com as cores e detalhes
  medidos nas fotos; a impressão das costas é desenhada em textura
  (vest_texture.py) com o logótipo e a tipografia da marca.

Uso:
  python build_character.py <work_dir> <out_dir> [preview]
"""
import sys, os, json, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
from mathutils import Vector, Matrix
from common import *
import parts
import rig

WORK, OUT = sys.argv[1], sys.argv[2]
PREVIEW = len(sys.argv) > 3 and sys.argv[3] == "preview"
os.makedirs(OUT, exist_ok=True)

FACE = json.load(open(f"{WORK}/face_mesh.json"))
def lin(c):
    """sRGB (0–1) → linear, para cores de materiais."""
    return tuple((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c[:3]) + (1,)


# tom medido na própria textura do rosto (mediana das bochechas e testa)
SKIN = lin((84 / 255, 56 / 255, 47 / 255))

# ── Proporções (metros; Z para cima, personagem virada para −Y) ─────────────
HEAD_C = Vector((0.0, 0.004, 1.668))   # centro do crânio
FACE_C = Vector((0.0, -0.066, 1.652))  # centróide da malha do rosto


# Esqueleto de referência (pose A). Os mesmos pontos servem o Skin modifier e
# a armadura, para os pesos automáticos ficarem coerentes.
J = {
    "hip": (0, 0.0, 0.92), "spine": (0, 0.0, 1.05), "spine1": (0, -0.004, 1.19),
    "chest": (0, -0.006, 1.31), "chest_up": (0, 0.0, 1.41), "neck": (0, 0.01, 1.50),
    "head": (0, 0.012, 1.575), "head_end": (0, 0.004, 1.79),
}
for _s, _n in ((1, "L"), (-1, "R")):
    J[f"clav.{_n}"] = (_s * 0.12, 0.0, 1.44)
    J[f"shoulder.{_n}"] = (_s * 0.2, 0.006, 1.425)
    J[f"elbow.{_n}"] = (_s * 0.257, 0.014, 1.16)
    J[f"wrist.{_n}"] = (_s * 0.303, 0.0, 0.935)
    J[f"palm.{_n}"] = (_s * 0.316, -0.004, 0.872)
    J[f"thumb1.{_n}"] = (_s * 0.301, -0.03, 0.9)
    J[f"thumb2.{_n}"] = (_s * 0.301, -0.05, 0.872)
    J[f"thumb3.{_n}"] = (_s * 0.301, -0.064, 0.85)
    for _k, (_dx, _ln) in enumerate(((-0.022, 0.045), (-0.007, 0.05), (0.008, 0.047), (0.022, 0.038))):
        _x = 0.316 + _dx * 0.3
        J[f"f{_k}a.{_n}"] = (_s * _x, -0.006, 0.845)
        J[f"f{_k}b.{_n}"] = (_s * _x, -0.008, 0.845 - _ln * 0.55)
        J[f"f{_k}c.{_n}"] = (_s * _x, -0.009, 0.845 - _ln)
    J[f"thigh.{_n}"] = (_s * 0.095, 0.0, 0.88)
    J[f"knee.{_n}"] = (_s * 0.1, 0.0, 0.58)


def build_body():
    """Corpo base por Skin modifier: tronco, pescoço, braços (pose A) e coxas."""
    V, R, E, idx = [], [], [], {}

    def v(name, r):
        idx[name] = len(V)
        V.append(J[name])
        R.append(r)

    v("hip", (0.158, 0.104)); v("spine", (0.143, 0.094)); v("spine1", (0.153, 0.102))
    v("chest", (0.166, 0.106)); v("chest_up", (0.16, 0.092)); v("neck", (0.06, 0.058))
    v("head", (0.055, 0.053))
    chain = ["hip", "spine", "spine1", "chest", "chest_up", "neck", "head"]
    E += [(idx[a], idx[b]) for a, b in zip(chain, chain[1:])]
    for n in ("L", "R"):
        v(f"clav.{n}", (0.062, 0.058)); v(f"shoulder.{n}", (0.064, 0.06))
        v(f"elbow.{n}", (0.047, 0.046)); v(f"wrist.{n}", (0.031, 0.025))
        v(f"palm.{n}", (0.04, 0.0145))
        arm = ["chest_up", f"clav.{n}", f"shoulder.{n}", f"elbow.{n}", f"wrist.{n}", f"palm.{n}"]
        E += [(idx[a], idx[b]) for a, b in zip(arm, arm[1:])]
        v(f"thumb1.{n}", (0.0115, 0.011)); v(f"thumb2.{n}", (0.0098, 0.0095)); v(f"thumb3.{n}", (0.0085, 0.0082))
        E += [(idx[f"wrist.{n}"], idx[f"thumb1.{n}"]), (idx[f"thumb1.{n}"], idx[f"thumb2.{n}"]), (idx[f"thumb2.{n}"], idx[f"thumb3.{n}"])]
        for k in range(4):
            v(f"f{k}a.{n}", (0.0088, 0.0083)); v(f"f{k}b.{n}", (0.008, 0.0076)); v(f"f{k}c.{n}", (0.007, 0.0068))
            E += [(idx[f"palm.{n}"], idx[f"f{k}a.{n}"]), (idx[f"f{k}a.{n}"], idx[f"f{k}b.{n}"]), (idx[f"f{k}b.{n}"], idx[f"f{k}c.{n}"])]
        v(f"thigh.{n}", (0.09, 0.092)); v(f"knee.{n}", (0.07, 0.072))
        E += [(idx["hip"], idx[f"thigh.{n}"]), (idx[f"thigh.{n}"], idx[f"knee.{n}"])]

    me = bpy.data.meshes.new("Body")
    me.from_pydata(V, E, [])
    ob = link(bpy.data.objects.new("Body", me))
    sk = ob.modifiers.new("Skin", "SKIN")
    sk.use_smooth_shade = True
    for i, r in enumerate(R):
        me.skin_vertices[0].data[i].radius = r
    me.skin_vertices[0].data[idx["hip"]].use_root = True
    sub = ob.modifiers.new("Sub", "SUBSURF")
    sub.levels = 2
    apply_modifiers(ob)
    shade_smooth(ob)
    return ob


def face_mesh():
    """Malha do rosto (alvo do shrinkwrap)."""
    verts = []
    for x, y, z in FACE["v"]:
        verts.append(FACE_C + Vector((x * 0.01, -z * 0.01, y * 0.01)))
    return mesh_object("FaceTarget", verts, FACE["f"])


def face_uv(p: Vector):
    """Projecta um ponto (Blender) para UV da textura do rosto."""
    s, R = FACE["s"], Matrix(FACE["R"])
    f = Vector(((p.x - FACE_C.x) / 0.01, (p.z - FACE_C.z) / 0.01, -(p.y - FACE_C.y) / 0.01))
    L = R @ f * s + Vector(FACE["center_px"])
    px, py = L.x, -L.y
    x0, y0, x1, y1 = FACE["crop"]
    return ((px - x0) / (x1 - x0), 1 - (py - y0) / (y1 - y0))


def build_head(face_tex):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=72, ring_count=56, radius=1, location=HEAD_C)
    head = bpy.context.active_object
    head.name = "Head"
    head.scale = (0.076, 0.098, 0.113)
    bpy.ops.object.transform_apply(scale=True)
    # maxilar: a metade inferior estreita em direcção ao queixo
    for vtx in head.data.vertices:
        dz = vtx.co.z - HEAD_C.z
        if dz < -0.02:
            t = min(1.0, (-dz - 0.02) / 0.09)
            k = 1 - 0.3 * t * t
            vtx.co.x = HEAD_C.x + (vtx.co.x - HEAD_C.x) * k
            vtx.co.y = HEAD_C.y + (vtx.co.y - HEAD_C.y) * (1 - 0.12 * t * t)
        # abaixo do queixo, a cabeça funde-se no pescoço (sem "bola" sob o maxilar)
        if vtx.co.z < 1.585:
            t = min(1.0, (1.585 - vtx.co.z) / 0.03)
            nc = Vector((0.0, 0.016, vtx.co.z))
            off = Vector((vtx.co.x, vtx.co.y, vtx.co.z)) - nc
            off.z = 0
            target = off.normalized() * 0.056 if off.length > 1e-6 else off
            vtx.co.x = nc.x + off.x + (target.x - off.x) * t * 0.85
            vtx.co.y = nc.y + off.y + (target.y - off.y) * t * 0.85
    target = face_mesh()
    # peso do shrinkwrap: frente da cabeça (normal virada para −Y)
    vg = head.vertex_groups.new(name="front")
    for vtx in head.data.vertices:
        n = (vtx.co - HEAD_C).normalized()
        w = max(0.0, min(1.0, (-n.y - 0.15) / 0.35))
        if w > 0:
            vg.add([vtx.index], w, "REPLACE")
    sw = head.modifiers.new("Wrap", "SHRINKWRAP")
    sw.target = target
    sw.wrap_method = "PROJECT"
    sw.use_project_y = True
    sw.use_negative_direction = True
    sw.use_positive_direction = True
    sw.vertex_group = "front"
    sm = head.modifiers.new("Smooth", "CORRECTIVE_SMOOTH")
    sm.factor = 0.5
    sm.iterations = 4
    sm.vertex_group = "front"
    sm.invert_vertex_group = False
    apply_modifiers(head)
    bpy.data.objects.remove(target)
    # UV: projecção frontal da foto; atrás, um ponto com tom de pele
    me = head.data
    while me.uv_layers:
        me.uv_layers.remove(me.uv_layers[0])
    uvl = me.uv_layers.new(name="UVMap")
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            n = (co - HEAD_C).normalized()
            uvl.data[li].uv = face_uv(co) if n.y < 0.15 else (0.02, 0.02)
    shade_smooth(head)
    mat = material("Face", image=face_tex, rough=0.55)
    mat.node_tree.nodes["Image Texture"].extension = "EXTEND"
    head.data.materials.append(mat)
    return head


def preview_lights():
    add_light("AREA", (-1.2, -2.0, 2.0), 220, size=1.5)
    add_light("AREA", (1.6, -1.2, 1.6), 70, size=1.2)
    add_light("AREA", (0.0, 1.8, 2.0), 260, color=(0.6, 0.35, 1.0), size=1.0)
    add_light("AREA", (1.4, 1.6, 1.4), 120, size=1.0)


def build_all():
    clear_scene()
    face_tex = load_image(f"{WORK}/face_tex.png", "FaceTex")
    vest_tex = load_image(f"{WORK}/vest_tex.png", "VestTex")
    body = build_body()
    # UV mínimo: todas as malhas partilham a camada "UVMap" (o join herda-a)
    uvl = body.data.uv_layers.new(name="UVMap")
    for li, loop in enumerate(body.data.loops):
        co = body.data.vertices[loop.vertex_index].co
        uvl.data[li].uv = (0.5, 0.5)
    skin = material("Skin", SKIN, rough=0.5)
    pants = material("Pants", lin((0.07, 0.08, 0.12)), rough=0.85)
    body.data.materials.append(skin)
    body.data.materials.append(pants)
    for poly in body.data.polygons:
        if poly.center.z < 0.965 and abs(poly.center.x) < 0.2:
            poly.material_index = 1
    head = build_head(face_tex)
    stripes = load_image(f"{WORK}/stripes.png", "Stripes")
    shirt, collar = parts.build_shirt(body, J, stripes)
    vest = parts.build_vest(body, J, vest_tex)
    details = parts.build_vest_details(vest)
    ears = parts.build_ears(HEAD_C)
    durag = parts.build_durag(head, HEAD_C)
    braids = parts.build_braids(HEAD_C)
    phones = parts.build_headphones()
    return dict(body=body, head=head, shirt=shirt, collar=collar, vest=vest, details=details,
                ears=ears, durag=durag, braids=braids, phones=phones)


def assemble(o):
    """Esqueleto, pesos, junção numa só malha skinned e animação."""
    arm = rig.build_armature(J)
    rig.auto_weights(arm, o["body"])
    for ob in [o["head"], *o["ears"], *o["durag"], *o["braids"]]:
        rig.rigid_weights(arm, ob, "head")
    for ob in o["phones"]:
        rig.rigid_weights(arm, ob, "upper_chest")
    for ob in [o["shirt"], o["collar"], o["vest"], *o["details"]]:
        rig.transfer_weights(arm, o["body"], ob)
    meshes = [o["body"], o["head"], o["shirt"], o["collar"], o["vest"], *o["details"],
              *o["ears"], *o["durag"], *o["braids"], *o["phones"]]
    for ob in bpy.context.selected_objects:
        ob.select_set(False)
    for ob in meshes:
        ob.select_set(True)
    bpy.context.view_layer.objects.active = o["body"]
    bpy.ops.object.join()
    char = bpy.context.active_object
    char.name = "MindwareCharacter"
    # o modificador de armadura tem de ser único e o último
    mods = [m for m in char.modifiers if m.type == "ARMATURE"]
    for m in mods[1:]:
        char.modifiers.remove(m)
    set_active(char)
    bpy.ops.object.vertex_group_limit_total(limit=4)
    bpy.ops.object.vertex_group_normalize_all(lock_active=False)
    rig.animate(arm)
    return arm, char


def export(arm, char):
    # texturas em resolução web
    for name, size in (("VestTex", (2048, 1024)), ("FaceTex", (1024, 1024))):
        img = bpy.data.images[name]
        if tuple(img.size) != size:
            img.scale(*size)
    for ob in bpy.context.selected_objects:
        ob.select_set(False)
    arm.select_set(True)
    char.select_set(True)
    bpy.ops.export_scene.gltf(
        filepath=f"{OUT}/mindware-character.glb",
        export_format="GLB",
        use_selection=True,
        export_yup=True,
        export_apply=False,
        export_skins=True,
        export_animations=True,
        export_animation_mode="ACTIONS",
        export_force_sampling=True,
        export_frame_range=False,
        export_image_format="WEBP",
        export_image_quality=88,
        export_morph=False,
    )


def main():
    objs = build_all()
    arm, char = assemble(objs)
    if PREVIEW:
        setup_render((480, 600), 32)
        preview_lights()
        for f in (0, 30, 56):
            bpy.context.scene.frame_set(f)
            camera((0, -2.8, 1.3), (0, 0, 1.28), lens=55)
            render(f"{OUT}/anim_front_{f:03d}.png")
        bpy.context.scene.frame_set(60)
        camera((0, 2.8, 1.3), (0, 0, 1.28), lens=55)
        render(f"{OUT}/anim_back_060.png")
        # renders com fundo transparente para a versão estática do site
        sc = bpy.context.scene
        sc.render.resolution_x, sc.render.resolution_y = (720, 900)
        sc.cycles.samples = 96
        sc.render.film_transparent = True
        sc.frame_set(0)
        camera((0.3, -2.1, 1.42), (0, 0, 1.36), lens=58)
        render(f"{OUT}/hero_front.png")
        sc.frame_set(62)
        camera((-0.25, 2.1, 1.42), (0, 0, 1.36), lens=58)
        render(f"{OUT}/hero_back.png")
        sc.render.film_transparent = False
    export(arm, char)


main()
