"""Prepara i due livelli del video con più aria sopra la testa.
Riduce la scena al 92% e ricostruisce i bordi allungando lo sfondo sfocato:
ai lati con una parabola, in alto (solo sopra la testa del cane) con una cubica.
Il cane non viene mai deformato. Scrive bg.png, fg.png e still.jpg.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src_path, mask_path, out_dir = sys.argv[1], sys.argv[2], sys.argv[3]
C = 0.92
S = Image.open(src_path).convert("RGB")
M = Image.open(mask_path).convert("L")
W, H = S.size
w, h = round(W * C), round(H * C)
I = np.asarray(S.resize((w, h), Image.LANCZOS)).astype(np.float32)
m = np.asarray(M.resize((w, h), Image.LANCZOS)).astype(np.float32) / 255.0
padx, pady = (W - w) // 2, H - h
ys, xs = np.where(m > 0.5)
head_top = int(ys.min())

def side_map(n_out, n_in, band_in, pad):
    band_out = band_in + pad
    a = pad / band_out ** 2
    b = 1 - 2 * a * band_out
    g = lambda t: a * t * t + b * t
    x = np.arange(n_out, dtype=np.float32)
    u = x - pad
    left = x < band_out
    u[left] = g(x[left])
    right = x > n_out - 1 - band_out
    u[right] = (n_in - 1) - g((n_out - 1) - x[right])
    return np.clip(u, 0, n_in - 1)

def top_map(n_out, n_in, band_in, pad, s0=0.3):
    B = band_in + pad
    c1 = s0
    c3 = (B * (c1 + 1) - 2 * band_in) / B ** 3
    c2 = (1 - c1 - 3 * c3 * B * B) / (2 * B)
    y = np.arange(n_out, dtype=np.float32)
    v = y - pad
    top = y < B
    t = y[top]
    v[top] = c1 * t + c2 * t * t + c3 * t ** 3
    return np.clip(v, 0, n_in - 1)

def resample(arr, u, axis):
    i0 = np.floor(u).astype(np.int32)
    i1 = np.minimum(i0 + 1, arr.shape[axis] - 1)
    t = (u - i0).astype(np.float32)
    shape = [1] * arr.ndim
    shape[axis] = -1
    t = t.reshape(shape)
    return np.take(arr, i0, axis=axis) * (1 - t) + np.take(arr, i1, axis=axis) * t

ux = side_map(W, w, 520, padx)
uy = top_map(H, h, head_top - 6, pady)
ext = np.clip(resample(resample(I, ux, axis=1), uy, axis=0), 0, 255).astype(np.uint8)
Image.fromarray(ext).save(f"{out_dir}/bg.png")
Image.fromarray(ext).save(f"{out_dir}/still.jpg", quality=93)

alpha = np.zeros((H, W), dtype=np.uint8)
alpha[pady:pady + h, padx:padx + w] = np.asarray(
    Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)))
fg = np.dstack([ext, alpha])
Image.fromarray(fg).save(f"{out_dir}/fg.png")
print("anchor", padx + (xs.min() + xs.max()) / 2, pady + int(ys.max()) - 13, "head_top", pady + head_top, "size", W, H)
