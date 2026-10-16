"""Vestuário e acessórios da personagem (camisola, colete, durag, auscultadores)."""
import math
import bpy, bmesh
from mathutils import Vector, Matrix
from mathutils.bvhtree import BVHTree
from common import *


def seg_dist(p, a, b):
    """Distância de p ao segmento ab e parâmetro t ∈ [0,1]."""
    a, b = Vector(a), Vector(b)
    ab = b - a
    t = max(0.0, min(1.0, (p - a).dot(ab) / ab.length_squared))
    return (p - (a + ab * t)).length, t


def extract(src, name, keep_face):
    """Copia as faces de `src` que satisfazem keep_face(centro, normal) para um novo objecto."""
    bm = bmesh.new()
    bm.from_mesh(src.data)
    bm.normal_update()
    drop = [f for f in bm.faces if not keep_face(f.calc_center_median(), f.normal)]
    bmesh.ops.delete(bm, geom=drop, context="FACES")
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = link(bpy.data.objects.new(name, me))
    shade_smooth(ob)
    return ob


def smooth_boundary(ob, iterations=10, factor=0.5):
    """Suaviza o contorno serrilhado de uma região extraída (só os vértices de borda)."""
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    border = [v for v in bm.verts if v.is_boundary]
    for _ in range(iterations):
        new = {}
        for v in border:
            nb = [e.other_vert(v) for e in v.link_edges if e.is_boundary]
            if len(nb) == 2:
                avg = (nb[0].co + nb[1].co) / 2
                new[v] = v.co.lerp(avg, factor)
        for v, co in new.items():
            v.co = co
    bm.to_mesh(ob.data)
    bm.free()


def inflate(ob, amount_fn):
    """Empurra cada vértice ao longo da normal, com quantidade dependente da posição."""
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    bm.normal_update()
    for v in bm.verts:
        v.co += v.normal * amount_fn(v.co)
    bm.to_mesh(ob.data)
    bm.free()


def solidify(ob, thickness, offset=-1):
    m = ob.modifiers.new("Solid", "SOLIDIFY")
    m.thickness = thickness
    m.offset = offset
    m.use_even_offset = True
    apply_modifiers(ob)


def is_arm(p, J, n, reach=0.085):
    d, t = seg_dist(p, J[f"shoulder.{n}"], J[f"wrist.{n}"])
    return d < reach and p.z < J[f"shoulder.{n}"][2] + 0.03 and abs(p.x) > 0.15, t


def build_shirt(body, J, stripes):
    """Camisola às riscas (cinzento/azul-marinho) com mangas curtas."""
    def keep(c, n):
        if c.z < 0.9 or c.z > 1.51:
            return False
        for side in ("L", "R"):
            arm, t = is_arm(c, J, side)
            if arm:
                return t < 0.42  # manga curta, acima do cotovelo
        return abs(c.x) < 0.24
    sh = extract(body, "Shirt", keep)
    smooth_boundary(sh)
    inflate(sh, lambda co: 0.006)
    solidify(sh, 0.003)
    # UV: riscas horizontais no tronco e à volta das mangas (período ~8 cm)
    me = sh.data
    uvl = me.uv_layers.get("UVMap") or me.uv_layers.new(name="UVMap")
    period = 0.082
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            coord = co.z
            for side in ("L", "R"):
                arm, t = is_arm(co, J, side, 0.1)
                if arm and t > 0.12:
                    a, b = Vector(J[f"shoulder.{side}"]), Vector(J[f"elbow.{side}"])
                    coord = J[f"shoulder.{side}"][2] - (co - a).dot((b - a).normalized()) - 0.03
            uvl.data[li].uv = (math.atan2(co.x, -co.y) / (2 * math.pi) + 0.5, coord / period)
    mat = material("Shirt", rough=0.8, image=stripes)
    me.materials.append(mat)
    # gola polo
    bpy.ops.mesh.primitive_torus_add(major_radius=0.066, minor_radius=0.012, location=(0, 0.004, 1.495))
    collar = bpy.context.active_object
    collar.name = "Collar"
    collar.scale = (1.05, 0.95, 0.8)
    collar.rotation_euler = (math.radians(-8), 0, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    shade_smooth(collar)
    collar.data.materials.append(material("CollarMat", lin((0.62, 0.62, 0.68)), rough=0.8))
    return sh, collar


def lin(c):
    return tuple((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c[:3]) + (1,)


VEST_A, VEST_B = 0.205, 0.13
VEST_Z0, VEST_Z1 = 0.93, 1.50


def build_vest(body, J, vest_tex):
    def keep(c, n):
        if c.z < 0.955 or c.z > 1.505:
            return False
        for side in ("L", "R"):
            if is_arm(c, J, side, 0.095)[0]:
                return False
        if abs(c.x) > 0.235:
            return False
        # decote: afasta-se do pescoço no topo
        if c.z > 1.43 and math.hypot(c.x, c.y - 0.0) < 0.1:
            return False
        return True
    vest = extract(body, "Vest", keep)
    smooth_boundary(vest, 14)
    # o colete fica por cima da camisola e cai ligeiramente solto em baixo
    inflate(vest, lambda co: 0.02 + 0.016 * max(0.0, (1.2 - co.z) / 0.25))
    sm = vest.modifiers.new("Smooth", "SMOOTH")
    sm.iterations = 6
    sm.factor = 0.5
    apply_modifiers(vest)
    solidify(vest, 0.007)
    me = vest.data
    uvl = me.uv_layers.get("UVMap") or me.uv_layers.new(name="UVMap")
    for poly in me.polygons:
        us = []
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            phi = math.atan2(-co.x / VEST_A, co.y / VEST_B)
            us.append((li, 0.5 + phi / (2 * math.pi), (co.z - VEST_Z0) / (VEST_Z1 - VEST_Z0)))
        if max(u for _, u, _ in us) - min(u for _, u, _ in us) > 0.5:
            us = [(li, u + 1 if u < 0.5 else u, v) for li, u, v in us]
        for li, u, v in us:
            uvl.data[li].uv = (u, v)
    mat = material("Vest", rough=0.78, image=vest_tex)
    me.materials.append(mat)
    return vest


def surface_point(target, x, z, from_front=True):
    """Ponto e normal na superfície exterior do colete, por raycast."""
    bvh = BVHTree.FromObject(target, bpy.context.evaluated_depsgraph_get())
    origin = Vector((x, -1.0 if from_front else 1.0, z))
    loc, nrm, _, _ = bvh.ray_cast(origin, Vector((0, 1 if from_front else -1, 0)))
    return loc, nrm


def oriented_box(name, loc, nrm, w, h, d, mat, bevel=0.004, up=Vector((0, 0, 1))):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc + nrm * (d / 2 - 0.002))
    ob = bpy.context.active_object
    ob.name = name
    ob.scale = (w, d, h)
    zaxis = up
    yaxis = -nrm.normalized()
    xaxis = yaxis.cross(zaxis).normalized()
    zaxis = xaxis.cross(yaxis).normalized()
    ob.rotation_euler = Matrix((xaxis, yaxis, zaxis)).transposed().to_euler()
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    bv = ob.modifiers.new("Bevel", "BEVEL")
    bv.width = bevel
    bv.segments = 2
    apply_modifiers(ob)
    shade_smooth(ob)
    ob.data.materials.append(mat)
    return ob


def build_vest_details(vest):
    """Bolsos com pala, puxadores de fecho e o fecho central, como na foto frontal."""
    fab = material("VestTrim", lin((0.07, 0.07, 0.08)), rough=0.82)
    metal = material("Zip", lin((0.55, 0.55, 0.58)), rough=0.35, metal=0.8)
    parts = []
    # bolsos inferiores (grandes) e de peito (pequenos), dos dois lados
    for s in (-1, 1):
        for (x, z, w, h) in ((0.1, 1.06, 0.13, 0.13), (0.1, 1.255, 0.11, 0.085)):
            loc, n = surface_point(vest, s * x, z)
            if loc is None:
                continue
            parts.append(oriented_box(f"Pocket{s}{z}", loc, n, w, h, 0.016, fab))
            fl, fn = surface_point(vest, s * x, z + h / 2 + 0.008)
            if fl is not None:
                parts.append(oriented_box(f"Flap{s}{z}", fl + fn * 0.012, fn, w + 0.012, 0.035, 0.008, fab, 0.003))
            # puxador do fecho do bolso
            zl, zn = surface_point(vest, s * (x - w / 2 + 0.018), z + h / 2 - 0.02)
            if zl is not None:
                parts.append(oriented_box(f"Pull{s}{z}", zl + zn * 0.02, zn, 0.008, 0.026, 0.004, metal, 0.0015))
    # fecho central com cursor
    for z in (1.0, 1.36):
        zl, zn = surface_point(vest, 0.0, z)
        if zl is not None:
            parts.append(oriented_box(f"Slider{z}", zl, zn, 0.012, 0.028, 0.006, metal, 0.002))
    return parts


def build_ears(head_c):
    ears = []
    skin = bpy.data.materials["Skin"]
    for s in (-1, 1):
        bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=16, radius=1,
                                             location=(s * 0.07, head_c.y + 0.014, head_c.z - 0.014))
        e = bpy.context.active_object
        e.name = f"Ear{s}"
        e.scale = (0.0075, 0.019, 0.027)
        e.rotation_euler = (0, s * math.radians(-8), s * math.radians(-12))
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        shade_smooth(e)
        e.data.materials.append(skin)
        ears.append(e)
    return ears


def build_durag(head, head_c):
    """Durag de cetim preto: cobre o crânio até à linha da testa; nó e pontas atrás."""
    def keep(c, n):
        d = (c - head_c)
        horiz = Vector((d.x, d.y, 0))
        ang = math.atan2(d.x, -d.y)  # 0 = frente, ±π = trás
        a = abs(ang) / math.pi       # 0 frente → 1 trás
        # linha do durag: alta na testa, desce por cima das orelhas até à nuca
        z_line = head_c.z + 0.066 - 0.09 * a ** 1.6
        return c.z > z_line
    dg = extract(head, "Durag", keep)
    while dg.data.uv_layers:
        dg.data.uv_layers.remove(dg.data.uv_layers[0])
    dg.data.materials.clear()
    smooth_boundary(dg, 16)
    inflate(dg, lambda co: 0.0055)
    solidify(dg, 0.0025)
    satin = material("Durag", lin((0.025, 0.025, 0.03)), rough=0.42)
    bsdf = satin.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Sheen Weight"].default_value = 0.3
    dg.data.materials.append(satin)
    parts = [dg]
    # pontas atadas, a cair sobre a nuca (foto de costas)
    for s in (-1, 1):
        pts = [Vector((s * 0.01, head_c.y + 0.104, head_c.z - 0.05)),
               Vector((s * 0.022, head_c.y + 0.108, head_c.z - 0.095)),
               Vector((s * 0.03, head_c.y + 0.104, head_c.z - 0.135))]
        parts.append(ribbon(f"DuragTail{s}", pts, 0.036, satin))
    return parts


def ribbon(name, pts, width, mat):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    sp = cu.splines.new("POLY")
    sp.points.add(len(pts) - 1)
    for i, p in enumerate(pts):
        sp.points[i].co = (p.x, p.y, p.z, 1)
    cu.extrude = width / 2
    cu.twist_mode = "Z_UP"
    ob = link(bpy.data.objects.new(name, cu))
    set_active(ob)
    bpy.ops.object.convert(target="MESH")
    ob = bpy.context.active_object
    solidify(ob, 0.002, 0)
    shade_smooth(ob)
    ob.data.materials.append(mat)
    return ob


def build_braids(head_c):
    """Tranças a sair por baixo do durag, atrás das orelhas e na nuca."""
    hair = material("Braids", lin((0.035, 0.028, 0.025)), rough=0.55)
    out = []
    starts = [(-0.062, 0.045), (-0.05, 0.062), (0.05, 0.062), (0.062, 0.045)]
    for k, (x, y) in enumerate(starts):
        cu = bpy.data.curves.new(f"Braid{k}", "CURVE")
        cu.dimensions = "3D"
        sp = cu.splines.new("POLY")
        n = 10
        sp.points.add(n - 1)
        for i in range(n):
            t = i / (n - 1)
            px = x * (1 + 0.35 * t) + 0.003 * math.sin(t * 18 + k)
            py = head_c.y + y + 0.012 * t
            pz = head_c.z - 0.035 - 0.12 * t
            sp.points[i].co = (px, py, pz, 1)
        cu.bevel_depth = 0.0055
        cu.bevel_resolution = 2
        ob = link(bpy.data.objects.new(f"Braid{k}", cu))
        set_active(ob)
        bpy.ops.object.convert(target="MESH")
        ob = bpy.context.active_object
        shade_smooth(ob)
        ob.data.materials.append(hair)
        out.append(ob)
    return out


def build_headphones():
    """Auscultadores cinzentos pousados ao pescoço (foto frontal)."""
    plastic = material("Headphones", lin((0.44, 0.45, 0.5)), rough=0.45)
    cushion = material("Cushion", lin((0.12, 0.12, 0.14)), rough=0.7)
    parts = []
    # arco por trás do pescoço
    cu = bpy.data.curves.new("Band", "CURVE")
    cu.dimensions = "3D"
    sp = cu.splines.new("NURBS")
    ctrl = [(0.082, -0.112, 1.49), (0.11, -0.05, 1.51), (0.1, 0.06, 1.525), (0.0, 0.115, 1.53),
            (-0.1, 0.06, 1.525), (-0.11, -0.05, 1.51), (-0.082, -0.112, 1.49)]
    sp.points.add(len(ctrl) - 1)
    for i, c in enumerate(ctrl):
        sp.points[i].co = (*c, 1)
    sp.use_endpoint_u = True
    sp.order_u = 4
    sp.resolution_u = 8
    cu.bevel_depth = 0.011
    cu.bevel_resolution = 3
    band = link(bpy.data.objects.new("Band", cu))
    set_active(band)
    bpy.ops.object.convert(target="MESH")
    band = bpy.context.active_object
    band.scale = (1, 1, 1)
    shade_smooth(band)
    band.data.materials.append(plastic)
    parts.append(band)
    for s in (-1, 1):
        loc = Vector((s * 0.078, -0.128, 1.462))
        rot = (math.radians(62), 0, s * math.radians(-30))
        bpy.ops.mesh.primitive_cylinder_add(vertices=40, radius=0.047, depth=0.034, location=loc, rotation=rot)
        cup = bpy.context.active_object
        cup.name = f"Cup{s}"
        bv = cup.modifiers.new("Bevel", "BEVEL")
        bv.width = 0.008
        bv.segments = 3
        apply_modifiers(cup)
        shade_smooth(cup)
        cup.data.materials.append(plastic)
        parts.append(cup)
        bpy.ops.mesh.primitive_torus_add(major_radius=0.036, minor_radius=0.011, location=loc, rotation=rot)
        cush = bpy.context.active_object
        cush.name = f"Cushion{s}"
        mw = Matrix.Rotation(rot[2], 4, "Z") @ Matrix.Rotation(rot[0], 4, "X")
        cush.location = loc + (mw @ Vector((0, 0, 0.019)))
        shade_smooth(cush)
        cush.data.materials.append(cushion)
        parts.append(cush)
    return parts
