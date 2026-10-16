"""Esqueleto, pesos e animação ("Scroll", frames 0–100) da personagem."""
import math
import bpy, bmesh
from mathutils import Vector, Matrix, Quaternion
from mathutils.bvhtree import BVHTree
from common import *

SIDES = (("L", 1), ("R", -1))
# rolamento do antebraço/mão direitos na pose "mão no peito" (palma contra o peito)
PALM_TWIST = (-45.0, -45.0)


def build_armature(J):
    arm_data = bpy.data.armatures.new("Rig")
    arm = link(bpy.data.objects.new("Rig", arm_data))
    set_active(arm)
    bpy.ops.object.mode_set(mode="EDIT")
    eb = arm_data.edit_bones

    def bone(name, head, tail, parent=None, connect=False):
        b = eb.new(name)
        b.head = Vector(head)
        b.tail = Vector(tail)
        if parent:
            b.parent = eb[parent]
            b.use_connect = connect
        return b

    bone("hips", J["hip"], J["spine"])
    bone("spine", J["spine"], J["spine1"], "hips", True)
    bone("spine1", J["spine1"], J["chest"], "spine", True)
    bone("chest", J["chest"], J["chest_up"], "spine1", True)
    bone("upper_chest", J["chest_up"], J["neck"], "chest", True)
    bone("neck", J["neck"], J["head"], "upper_chest", True)
    bone("head", J["head"], J["head_end"], "neck", True)
    for n, s in SIDES:
        bone(f"clavicle.{n}", (s * 0.03, 0.0, 1.43), J[f"shoulder.{n}"], "upper_chest")
        bone(f"upper_arm.{n}", J[f"shoulder.{n}"], J[f"elbow.{n}"], f"clavicle.{n}", True)
        bone(f"forearm.{n}", J[f"elbow.{n}"], J[f"wrist.{n}"], f"upper_arm.{n}", True)
        bone(f"hand.{n}", J[f"wrist.{n}"], J[f"palm.{n}"], f"forearm.{n}", True)
        bone(f"thumb1.{n}", J[f"thumb1.{n}"], J[f"thumb2.{n}"], f"hand.{n}")
        bone(f"thumb2.{n}", J[f"thumb2.{n}"], J[f"thumb3.{n}"], f"thumb1.{n}", True)
        for k in range(4):
            bone(f"finger{k}_1.{n}", J[f"f{k}a.{n}"], J[f"f{k}b.{n}"], f"hand.{n}")
            bone(f"finger{k}_2.{n}", J[f"f{k}b.{n}"], J[f"f{k}c.{n}"], f"finger{k}_1.{n}", True)
        bone(f"thigh.{n}", J[f"thigh.{n}"], J[f"knee.{n}"], "hips")
    bpy.ops.object.mode_set(mode="OBJECT")
    return arm


def auto_weights(arm, ob):
    for o in bpy.context.selected_objects:
        o.select_set(False)
    ob.select_set(True)
    arm.select_set(True)
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.parent_set(type="ARMATURE_AUTO")


def rigid_weights(arm, ob, bone):
    ob.vertex_groups.clear()
    vg = ob.vertex_groups.new(name=bone)
    vg.add(list(range(len(ob.data.vertices))), 1.0, "REPLACE")
    bind(arm, ob)


def bind(arm, ob):
    ob.parent = arm
    mod = ob.modifiers.new("Armature", "ARMATURE")
    mod.object = arm


def transfer_weights(arm, body, ob):
    """Pesos da roupa = pesos do corpo no ponto mais próximo (interpolados)."""
    dg = bpy.context.evaluated_depsgraph_get()
    bvh = BVHTree.FromObject(body, dg, deform=False)
    names = [g.name for g in body.vertex_groups]
    # tabela vértice → {grupo: peso}
    bw = [dict() for _ in body.data.vertices]
    for v in body.data.vertices:
        for g in v.groups:
            if g.weight > 0.001:
                bw[v.index][names[g.group]] = g.weight
    ob.vertex_groups.clear()
    groups = {n: ob.vertex_groups.new(name=n) for n in names}
    polys = body.data.polygons
    for v in ob.data.vertices:
        loc, nrm, fi, dist = bvh.find_nearest(v.co)
        if fi is None:
            continue
        acc = {}
        tot = 0.0
        for vi in polys[fi].vertices:
            w = 1.0 / max(1e-5, (body.data.vertices[vi].co - loc).length)
            tot += w
            for g, gw in bw[vi].items():
                acc[g] = acc.get(g, 0.0) + gw * w
        for g, gw in acc.items():
            groups[g].add([v.index], gw / tot, "REPLACE")
    bind(arm, ob)


# ── Poses ──────────────────────────────────────────────────────────────────

def aim(pb, target_dir, arm):
    """Roda o osso (em espaço da armadura) para que aponte para target_dir."""
    rest = pb.bone.matrix_local.to_3x3()
    rest_dir = rest.col[1].normalized()
    q = rest_dir.rotation_difference(Vector(target_dir).normalized())
    head = pb.head.copy()
    m = (q.to_matrix() @ rest).to_4x4()
    m.translation = head
    pb.matrix = m
    bpy.context.view_layer.update()


def reset(arm):
    for pb in arm.pose.bones:
        pb.rotation_mode = "QUATERNION"
        pb.rotation_quaternion = Quaternion()
        pb.location = (0, 0, 0)
    bpy.context.view_layer.update()


def twist(pb, degrees):
    """Rotação do osso em torno do seu próprio eixo (pronação, rolamento da mão)."""
    m = pb.matrix.copy()
    axis = m.to_3x3().col[1].normalized()
    r = Matrix.Rotation(math.radians(degrees), 4, axis)
    t = m.translation.copy()
    m = r @ m
    m.translation = t
    pb.matrix = m
    bpy.context.view_layer.update()


def place_arm(arm, n, elbow, wrist, hand_tip, forearm_twist=0.0, hand_twist=0.0):
    pbs = arm.pose.bones
    aim(pbs[f"upper_arm.{n}"], Vector(elbow) - pbs[f"upper_arm.{n}"].head, arm)
    aim(pbs[f"forearm.{n}"], Vector(wrist) - pbs[f"forearm.{n}"].head, arm)
    if forearm_twist:
        twist(pbs[f"forearm.{n}"], forearm_twist)
    aim(pbs[f"hand.{n}"], Vector(hand_tip) - pbs[f"hand.{n}"].head, arm)
    if hand_twist:
        twist(pbs[f"hand.{n}"], hand_twist)


def curl(arm, n, amount, thumb=0.0):
    pbs = arm.pose.bones
    for k in range(4):
        for j, f in ((1, 0.9), (2, 1.0)):
            pb = pbs[f"finger{k}_{j}.{n}"]
            pb.rotation_quaternion = Quaternion((1, 0, 0), math.radians(85 * amount * f))
    pbs[f"thumb1.{n}"].rotation_quaternion = Quaternion((0, 0, 1), math.radians(thumb))
    bpy.context.view_layer.update()


def pose(arm, name):
    reset(arm)
    pbs = arm.pose.bones
    s = {"L": 1, "R": -1}
    relax = lambda n: place_arm(arm, n, (s[n] * 0.215, 0.025, 1.165), (s[n] * 0.235, 0.0, 0.93), (s[n] * 0.24, -0.005, 0.86))
    if name == "relax":
        relax("L"); relax("R")
        curl(arm, "L", 0.2); curl(arm, "R", 0.2)
    elif name == "chest":
        # foto 1: mão direita no peito (lado do coração), braço esquerdo solto
        place_arm(arm, "R", (-0.215, -0.075, 1.17), (-0.045, -0.175, 1.255), (0.06, -0.165, 1.33),
                  forearm_twist=PALM_TWIST[0], hand_twist=PALM_TWIST[1])
        curl(arm, "R", 0.05)
        relax("L"); curl(arm, "L", 0.2)
    elif name == "thumbs":
        # foto 2: braços levantados, punhos fechados, polegares a apontar para as costas
        for n in ("L", "R"):
            place_arm(arm, n, (s[n] * 0.39, 0.03, 1.37), (s[n] * 0.31, 0.03, 1.6), (s[n] * 0.29, 0.03, 1.68))
            curl(arm, n, 1.0, thumb=s[n] * -40)
    return {pb.name: pb.rotation_quaternion.copy() for pb in pbs}


def key_pose(arm, frame, rots, head=(0, 0, 0), chest=0.0):
    pbs = arm.pose.bones
    for name, q in rots.items():
        pbs[name].rotation_quaternion = q
    pbs["head"].rotation_quaternion = Quaternion((1, 0, 0), math.radians(head[0])) @ \
        Quaternion((0, 1, 0), math.radians(head[1])) @ Quaternion((0, 0, 1), math.radians(head[2]))
    pbs["chest"].rotation_quaternion = Quaternion((1, 0, 0), math.radians(chest))
    for pb in pbs:
        pb.keyframe_insert("rotation_quaternion", frame=frame)


def animate(arm):
    """Acção 'Scroll': o site faz corresponder o progresso do scroll (0–100) ao frame."""
    set_active(arm)
    bpy.ops.object.mode_set(mode="POSE")
    P = {k: pose(arm, k) for k in ("chest", "relax", "thumbs")}
    arm.animation_data_create()
    act = bpy.data.actions.new("Scroll")
    arm.animation_data.action = act
    # (frame, pose, (inclinação, rolamento, viragem) da cabeça, peito)
    keys = [
        (0, "chest", (8, 0, 0), 0),
        (18, "chest", (0, 0, 0), -2),
        (30, "chest", (-3, 4, -10), -2),
        (40, "chest", (0, 0, -4), 0),
        (48, "relax", (0, 0, 0), 0),
        (56, "thumbs", (-6, 0, 0), -3),
        (66, "thumbs", (-6, 0, 0), -3),
        (75, "relax", (0, 0, 0), 0),
        (86, "relax", (2, 0, 6), 0),
        (95, "chest", (0, 0, 0), -2),
        (100, "chest", (3, 0, 0), -2),
    ]
    for f, p, h, c in keys:
        key_pose(arm, f, P[p], h, c)
    bpy.context.scene.frame_start = 0
    bpy.context.scene.frame_end = 100
    bpy.ops.object.mode_set(mode="OBJECT")
    return act


def set_frame(arm, frame):
    bpy.context.scene.frame_set(frame)
