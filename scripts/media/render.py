"""Video d'apertura: avvicinamento lento con parallasse (cane davanti, sfondo dietro).
Uso: python3 render.py bg.png fg.png <ancora_x> <ancora_y> | ffmpeg -f rawvideo ... -i - ...
"""
import sys, math
from PIL import Image

bg_path, fg_path, ax, ay = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
OUT_W, OUT_H, FPS, SECONDS = 1920, 1080, 30, 14
PRE_W = 2160                      # pre-riduzione: evita sfarfallio dei quadretti
BG_ZOOM, FG_ZOOM = 0.04, 0.075    # zoom massimo di sfondo e cane

bg = Image.open(bg_path).convert("RGB")
fg = Image.open(fg_path).convert("RGBA")
k = PRE_W / bg.width
size = (PRE_W, round(bg.height * k))
bg, fg = bg.resize(size, Image.LANCZOS), fg.resize(size, Image.LANCZOS)
ax, ay = ax * k, ay * k           # punto d'appoggio delle zampe: il cane resta "a terra"

r = size[1] / OUT_H
x0 = (size[0] - OUT_W * r) / 2

def matrix(s):
    return (r / s, 0, ax + (x0 - ax) / s, 0, r / s, ay + (0 - ay) / s)

n = FPS * SECONDS
out = sys.stdout.buffer
for i in range(n):
    p = 0.5 - 0.5 * math.cos(2 * math.pi * i / n)   # 0 → 1 → 0, senza stacchi
    frame = bg.transform((OUT_W, OUT_H), Image.AFFINE, matrix(1 + BG_ZOOM * p), resample=Image.BICUBIC)
    dog = fg.transform((OUT_W, OUT_H), Image.AFFINE, matrix(1 + FG_ZOOM * p), resample=Image.BICUBIC)
    frame.paste(dog, (0, 0), dog)
    out.write(frame.tobytes())
