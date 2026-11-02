"""Lernapp-Logo: Doktorhut mit goldener Quaste und Funkeln auf violettem Verlauf.
Eine Geometrie, zwei Ausgaben: icon.svg (Vektor) und PNGs per PIL."""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# ---------- Geometrie (512er Raster) ----------
BOARD = [(256, 132), (440, 205), (256, 278), (72, 205)]                       # obere Platte (Raute)
def body_points(n=24):
    # Hutkörper: links runter, unten Bogen, rechts hoch
    pts = [(150, 244), (150, 322)]
    for i in range(1, n):  # quadratische Kurve (150,322) -> (256,372) -> (362,322)
        t = i / n
        x = (1 - t) ** 2 * 150 + 2 * (1 - t) * t * 256 + t * t * 362
        y = (1 - t) ** 2 * 322 + 2 * (1 - t) * t * 396 + t * t * 322
        pts.append((x, y))
    pts += [(362, 322), (362, 244), (256, 278)]
    return pts
BODY = body_points()
CORD = (424, 214, 424, 316)                                                   # Schnur x1,y1,x2,y2
TASSEL = [(412, 312), (436, 312), (444, 372), (404, 372)]                      # Quaste
KNOT = (424, 312, 14)                                                          # Knoten (cx, cy, r)
def star(cx, cy, r, k=0.2):
    import math
    pts = []
    for i in range(8):
        a = math.pi / 4 * i - math.pi / 2
        rr = r if i % 2 == 0 else r * k
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return pts
STAR1 = star(386, 98, 46)
STAR2 = star(116, 372, 22)

# ---------- SVG ----------
def poly(pts):
    return ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)

SVG = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9C7BFF"/><stop offset=".55" stop-color="#5B3CF0"/><stop offset="1" stop-color="#2A1790"/></linearGradient>
    <radialGradient id="glow" cx=".25" cy=".12" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="board" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#DDD3FF"/></linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBBDFF"/><stop offset="1" stop-color="#8F78F5"/></linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD76A"/><stop offset="1" stop-color="#FF9F1C"/></linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feGaussianBlur stdDeviation="12"/></filter>
    <filter id="gl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
  </defs>
  <rect width="512" height="512" rx="116" fill="url(#bg)"/>
  <rect width="512" height="512" rx="116" fill="url(#glow)"/>
  <g filter="url(#sh)" opacity=".38" transform="translate(0 14)"><polygon points="{poly(BODY)}" fill="#12063F"/><polygon points="{poly(BOARD)}" fill="#12063F"/></g>
  <polygon points="{poly(BODY)}" fill="url(#body)"/>
  <polygon points="{poly(BOARD)}" fill="url(#board)"/>
  <polyline points="72,205 256,278 440,205" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linejoin="round"/>
  <line x1="{CORD[0]}" y1="{CORD[1]}" x2="{CORD[2]}" y2="{CORD[3]}" stroke="url(#gold)" stroke-width="7" stroke-linecap="round"/>
  <polygon points="{poly(TASSEL)}" fill="url(#gold)" stroke="url(#gold)" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="{KNOT[0]}" cy="{KNOT[1]}" r="{KNOT[2]}" fill="url(#gold)"/>
  <g filter="url(#gl)" opacity=".9"><polygon points="{poly(STAR1)}" fill="#FFE9A8"/></g>
  <polygon points="{poly(STAR1)}" fill="#fff"/>
  <polygon points="{poly(STAR2)}" fill="#FFE9A8" opacity=".9"/>
</svg>
'''

# ---------- PNG ----------
def render(size, rounded=True, S=4):
    W = 512 * S
    def sc(pts): return [(x * S, y * S) for x, y in pts]
    yy, xx = np.mgrid[0:W, 0:W].astype(np.float32)
    t = (xx + yy) / (2 * W)
    stops = [(0, (0x9C, 0x7B, 0xFF)), (.55, (0x5B, 0x3C, 0xF0)), (1, (0x2A, 0x17, 0x90))]
    def ramp(t, stops):
        out = np.zeros(t.shape + (3,), np.float32)
        for c in range(3):
            out[..., c] = np.interp(t, [s[0] for s in stops], [s[1][c] for s in stops])
        return out
    bg = ramp(t, stops)
    d = np.sqrt((xx - .25 * W) ** 2 + (yy - .12 * W) ** 2) / (.9 * W)
    a = np.clip(1 - d, 0, 1)[..., None] * .38
    bg = bg * (1 - a) + 255 * a
    img = Image.fromarray(bg.clip(0, 255).astype(np.uint8), 'RGB').convert('RGBA')

    def vgrad(c0, c1, y0, y1):
        v = np.clip((yy - y0 * S) / ((y1 - y0) * S), 0, 1)[..., None]
        arr = np.array(c0, np.float32) * (1 - v) + np.array(c1, np.float32) * v
        return Image.fromarray(arr.clip(0, 255).astype(np.uint8), 'RGB').convert('RGBA')
    def mask_poly(pts):
        m = Image.new('L', (W, W), 0); ImageDraw.Draw(m).polygon(sc(pts), fill=255); return m
    def paste(layer, m): img.paste(layer, (0, 0), m)

    # Schatten
    sh = Image.new('L', (W, W), 0); dr = ImageDraw.Draw(sh)
    for p in (BODY, BOARD): dr.polygon(sc([(x, y + 14) for x, y in p]), fill=255)
    sh = sh.filter(ImageFilter.GaussianBlur(12 * S)).point(lambda v: int(v * .38))
    img.paste(Image.new('RGBA', (W, W), (18, 6, 63, 255)), (0, 0), sh)

    paste(vgrad((0xCB, 0xBD, 0xFF), (0x8F, 0x78, 0xF5), 244, 396), mask_poly(BODY))
    paste(vgrad((255, 255, 255), (0xDD, 0xD3, 0xFF), 132, 278), mask_poly(BOARD))
    dr = ImageDraw.Draw(img, 'RGBA')
    dr.line(sc([(72, 205), (256, 278), (440, 205)]), fill=(255, 255, 255, 178), width=3 * S, joint='curve')
    gold = vgrad((0xFF, 0xD7, 0x6A), (0xFF, 0x9F, 0x1C), 205, 372)
    m = Image.new('L', (W, W), 0); md = ImageDraw.Draw(m)
    md.line(sc([(CORD[0], CORD[1]), (CORD[2], CORD[3])]), fill=255, width=7 * S)
    md.polygon(sc(TASSEL), fill=255); md.line(sc(TASSEL + [TASSEL[0]]), fill=255, width=6 * S, joint='curve')
    cx, cy, r = KNOT; md.ellipse([(cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S], fill=255)
    paste(gold, m)
    # Funkeln mit Schein
    gl = Image.new('L', (W, W), 0); ImageDraw.Draw(gl).polygon(sc(STAR1), fill=255)
    gl = gl.filter(ImageFilter.GaussianBlur(9 * S)).point(lambda v: int(v * .9))
    img.paste(Image.new('RGBA', (W, W), (255, 233, 168, 255)), (0, 0), gl)
    dr = ImageDraw.Draw(img, 'RGBA')
    dr.polygon(sc(STAR1), fill=(255, 255, 255, 255))
    dr.polygon(sc(STAR2), fill=(255, 233, 168, 230))

    if rounded:
        mk = Image.new('L', (W, W), 0)
        ImageDraw.Draw(mk).rounded_rectangle([0, 0, W - 1, W - 1], radius=116 * S, fill=255)
        img.putalpha(mk)
    return img.resize((size, size), Image.LANCZOS)

if __name__ == '__main__':
    open(os.path.join(OUT, 'icon.svg'), 'w', encoding='utf8').write(SVG)
    render(512).save(os.path.join(OUT, 'icon-512.png'))
    render(192).save(os.path.join(OUT, 'icon-192.png'))
    render(180, rounded=False).convert('RGB').save(os.path.join(OUT, 'icon-180.png'))
    render(512, rounded=False).convert('RGB').save(os.path.join(OUT, 'icon-maskable-512.png'))
    print('ok')
