"""
Premium Editorial Collage Thumbnail Generator
----------------------------------------------
18 unique layouts across 6 distinct grid templates.
Typography: Helvetica Neue — tracked, light weight, no paths.
Gaps: 2–3px, sampled from hero edge.
Bleeds to all 4 edges, no borders.
"""

import os
import re
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─── Paths ─────────────────────────────────────────────────────────────────
PUBLIC_DIR  = "/Users/dracoseven/ai-fake-project-porto/web-portfolio/public"
OUT_DIR     = "/Users/dracoseven/ai-fake-project-porto/thumbnails"
FONT_PATH   = "/System/Library/Fonts/HelveticaNeue.ttc"

os.makedirs(OUT_DIR, exist_ok=True)

W, H = 1200, 800          # output size
GAP  = 2                  # px gap between cells

# ─── Font helpers ──────────────────────────────────────────────────────────
def get_font(size, index=7):          # index 7 = Helvetica Neue Light
    try:
        return ImageFont.truetype(FONT_PATH, size, index=index)
    except Exception:
        return ImageFont.load_default()

def get_font_medium(size):
    return get_font(size, index=10)   # index 10 = Helvetica Neue Medium

FONT_SM  = get_font(10)              # label small
FONT_MD  = get_font(13)              # label medium
FONT_TIT = get_font(22)             # title
FONT_TIT_MD = get_font_medium(22)   # title medium weight

# ─── Image helpers ─────────────────────────────────────────────────────────
def collect_images(folder_name):
    d = os.path.join(PUBLIC_DIR, folder_name)
    if not os.path.exists(d):
        return []
    imgs = sorted([
        os.path.join(d, f) for f in os.listdir(d)
        if f.lower().endswith(('.jpg', '.jpeg', '.png'))
    ])
    return imgs

def fill_crop(path, tw, th, crop_bias="center"):
    """Fill-crop an image to exact tw×th, with optional crop bias."""
    try:
        img = Image.open(path).convert("RGB")
    except Exception:
        return Image.new("RGB", (tw, th), (20, 20, 20))
    sw, sh = img.size
    scale = max(tw / sw, th / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    if crop_bias == "top":
        y0 = 0
    elif crop_bias == "bottom":
        y0 = nh - th
    else:
        y0 = (nh - th) // 2
    x0 = (nw - tw) // 2
    return img.crop((x0, y0, x0 + tw, y0 + th))

def sample_gap_color(img, region="right"):
    """Sample 1px-wide strip from edge of image to use as gap fill."""
    w, h = img.size
    if region == "right":
        strip = img.crop((w - 4, 0, w, h))
    elif region == "bottom":
        strip = img.crop((0, h - 4, w, h))
    else:
        strip = img.crop((0, 0, 4, h))

    strip = strip.convert("L")
    pixels = list(strip.getdata())
    avg = sum(pixels) // len(pixels) if pixels else 26
    # Shift darker to avoid bright seams
    v = max(0, avg - 30)
    return (v, v, v)

def get_bg_color(img):
    """Return the darkest region sampled from all 4 edges."""
    strip_r = sample_gap_color(img, "right")
    strip_b = sample_gap_color(img, "bottom")
    strip_l = sample_gap_color(img, "left")
    r = min(strip_r[0], strip_b[0], strip_l[0])
    return (max(8, r), max(8, r), max(8, r))

def smart_text_color(canvas, x, y, w, h):
    """Return white or near-black based on average luminosity in rect."""
    region = canvas.crop((x, y, x + w, y + h)).convert("L")
    pixels = list(region.getdata())
    lum = sum(pixels) / len(pixels) if pixels else 128
    if lum < 140:
        return (240, 240, 240)
    else:
        return (15, 15, 15)

# ─── Tracked text rendering ────────────────────────────────────────────────
def text_w(draw, text, font, tracking_px=2):
    total = 0
    for c in text:
        total += draw.textlength(c, font=font) + tracking_px
    return total - tracking_px if text else 0

def draw_tracked(draw, pos, text, font, fill, tracking_px=2):
    x, y = pos
    for c in text:
        draw.text((x, y), c, font=font, fill=fill)
        x += draw.textlength(c, font=font) + tracking_px

# ─── 6 Layout Templates ────────────────────────────────────────────────────
# Each returns list of (img_index, x, y, w, h, crop_bias) tuples

def layout_split_hero_left(imgs, extra=None):
    """
    [  HERO   ][ A ]
    [  HERO   ][ B ]
               [ C ]
    60/40 vertical split, 3 stacked right
    """
    hero_w = int(W * 0.60)
    side_w = W - hero_w - GAP
    cell_h = (H - 2 * GAP) // 3
    remainder = H - 2 * GAP - cell_h * 3
    cells = []
    cells.append((0, 0, 0, hero_w, H, "center"))                    # hero
    for i in range(3):
        ch = cell_h + (1 if i < remainder else 0)
        cy = i * (cell_h + GAP)
        cells.append((i + 1, hero_w + GAP, cy, side_w, ch, ["center","top","bottom"][i]))
    return cells

def layout_split_hero_right(imgs, extra=None):
    """
    [ A ][ B ][  HERO   ]
         [ C ][  HERO   ]
    """
    hero_w = int(W * 0.58)
    left_w = W - hero_w - GAP
    cell_w = (left_w - GAP) // 2
    top_h  = int(H * 0.55)
    bot_h  = H - top_h - GAP
    cells = []
    cells.append((0, left_w + GAP, 0, hero_w, H, "center"))         # hero right
    cells.append((1, 0, 0, cell_w, top_h, "top"))                   # A top-left
    cells.append((2, cell_w + GAP, 0, left_w - cell_w - GAP, top_h, "center"))  # B top-right of left col
    cells.append((3, 0, top_h + GAP, left_w, bot_h, "bottom"))      # C bottom spanning
    return cells

def layout_three_rows(imgs, extra=None):
    """
    [ WIDE HERO top       ]
    [ A  ][ TALL ][  B   ]
    [ C  ][      ][  D   ]
    """
    top_h  = int(H * 0.48)
    bot_h  = H - top_h - GAP
    mid_w  = int(W * 0.38)
    side_w = (W - mid_w - 2 * GAP) // 2
    cells = []
    cells.append((0, 0, 0, W, top_h, "center"))                             # top hero full-width
    cells.append((1, 0, top_h + GAP, side_w, bot_h, "bottom"))              # A
    cells.append((2, side_w + GAP, top_h + GAP, mid_w, bot_h, "top"))      # TALL center
    cells.append((3, side_w + mid_w + 2*GAP, top_h + GAP, side_w, bot_h, "center"))  # B
    return cells

def layout_large_left_two_right(imgs, extra=None):
    """
    [ BIG  ][ top  ]
    [ BIG  ][------]
    [------][ bot  ]
    [small ][      ]
    """
    main_w = int(W * 0.55)
    side_w = W - main_w - GAP
    main_h = int(H * 0.65)
    bot_main_h = H - main_h - GAP
    top_side_h = int(H * 0.42)
    bot_side_h = H - top_side_h - GAP
    cells = []
    cells.append((0, 0, 0, main_w, main_h, "center"))                           # big left
    cells.append((1, 0, main_h + GAP, main_w, bot_main_h, "bottom"))            # small bottom left
    cells.append((2, main_w + GAP, 0, side_w, top_side_h, "top"))               # top right
    cells.append((3, main_w + GAP, top_side_h + GAP, side_w, bot_side_h, "center"))  # bot right
    return cells

def layout_magazine_grid(imgs, extra=None):
    """
    [ A  ][ HERO         ]
    [----][              ]
    [ B  ][              ]
    [ C  ][              ]
    Reverse: tall hero right, 3 left strips
    """
    hero_w = int(W * 0.62)
    strip_w = W - hero_w - GAP
    strip_h = (H - 2 * GAP) // 3
    remainder = H - 2 * GAP - strip_h * 3
    cells = []
    cells.append((0, strip_w + GAP, 0, hero_w, H, "center"))                   # hero right
    for i in range(3):
        sh = strip_h + (1 if i < remainder else 0)
        cy = i * (strip_h + GAP)
        cells.append((i + 1, 0, cy, strip_w, sh, ["top","center","bottom"][i]))
    return cells

def layout_quad_dynamic(imgs, extra=None):
    """
    [ HERO        ][ B ]
    [             ][----|
    [  C wide     ][ D ]
    Asymmetric quadrant
    """
    top_h   = int(H * 0.57)
    bot_h   = H - top_h - GAP
    left_w  = int(W * 0.63)
    right_w = W - left_w - GAP
    bot_left_w = int(W * 0.42)
    bot_right_w = W - bot_left_w - GAP
    cells = []
    cells.append((0, 0, 0, left_w, top_h, "center"))                                     # HERO top-left
    cells.append((1, left_w + GAP, 0, right_w, top_h, "top"))                           # B top-right
    cells.append((2, 0, top_h + GAP, bot_left_w, bot_h, "bottom"))                      # C bottom-left
    cells.append((3, bot_left_w + GAP, top_h + GAP, bot_right_w, bot_h, "center"))     # D bottom-right
    return cells

LAYOUTS = [
    layout_split_hero_left,
    layout_magazine_grid,
    layout_three_rows,
    layout_large_left_two_right,
    layout_split_hero_right,
    layout_quad_dynamic,
]

# ─── Folder configuration ──────────────────────────────────────────────────
# Each entry: folder_name, creative_title, tag_line, layout_index (0-5)
FOLDERS = [
    ("baju",             "Signature Looks",         "WARDROBE EDIT",       0),
    ("skincare",         "Glow Ritual",              "BEAUTY ARCHIVE",      1),
    ("photoshoot brand", "The Collection",           "BRAND CAMPAIGN 01",   2),
    ("photoshoot brand2","Industrial Frequency",     "BRAND CAMPAIGN 02",   3),
    ("photoshoot brand3","Absolute Scene",           "BRAND CAMPAIGN 03",   4),
    ("photoshoot brand4","Scene Lock",               "BRAND CAMPAIGN 04",   5),
    ("photoshoot brand5","Editorial Frames",         "BRAND CAMPAIGN 05",   0),
    ("photoshoot brand6","Face & Form",              "BRAND CAMPAIGN 06",   1),
    ("photoshoot brand7","Raw Flash",                "BRAND CAMPAIGN 07",   2),
    ("photoshoot brand8","Model in Motion",          "BRAND CAMPAIGN 08",   3),
    ("ai photoshoot1",   "AI Couture",               "DIGITAL EDIT 01",     4),
    ("ai photoshoot2",   "Future Faces",             "DIGITAL EDIT 02",     5),
    ("ai photoshoot3",   "Synthetic Elegance",       "DIGITAL EDIT 03",     0),
    ("ai photoshoot4",   "Digital Muse",             "DIGITAL EDIT 04",     1),
    ("ai photoshoot5",   "Uncanny Beauty",           "DIGITAL EDIT 05",     2),
    ("ai photoshoot6",   "Campaign Sequence",        "DIGITAL EDIT 06",     3),
    ("ai photoshoot7",   "Editorial Close-Up",       "DIGITAL EDIT 07",     4),
    ("ai photoshoot8",   "Structure & Skin",         "DIGITAL EDIT 08",     5),
]

# ─── Typography placement ──────────────────────────────────────────────────
def draw_labels(canvas, title, tag, layout_idx):
    """
    Draw editorial labels:
    - Bottom-left: creative title (22px Helvetica Neue Light, tracked)
    - Bottom-right: tag line (10px, all-caps, tracked)
    Both auto-color for contrast.
    """
    draw = ImageDraw.Draw(canvas)
    pad_x, pad_y = 22, 16

    # ── TITLE (bottom-left) ──
    title_upper = title.upper()
    tw = text_w(draw, title_upper, FONT_TIT, tracking_px=3)
    tx = pad_x
    ty = H - 44
    tc = smart_text_color(canvas, tx, ty - 6, min(tw + 20, W // 2), 40)
    draw_tracked(draw, (tx, ty), title_upper, FONT_TIT, tc, tracking_px=3)

    # ── TAG LINE (bottom-right, same baseline) ──
    tag_upper = tag.upper()
    gw = text_w(draw, tag_upper, FONT_SM, tracking_px=2)
    gx = W - gw - pad_x
    gy = H - 34
    gc = smart_text_color(canvas, gx - 8, gy - 6, min(gw + 20, W // 3), 32)
    draw_tracked(draw, (gx, gy), tag_upper, FONT_SM, gc, tracking_px=2)

# ─── Build one thumbnail ───────────────────────────────────────────────────
def build_thumbnail(folder, title, tag, layout_idx):
    imgs = collect_images(folder)
    if not imgs:
        print(f"  ✗ SKIP — no images in '{folder}'")
        return

    layout_fn = LAYOUTS[layout_idx % len(LAYOUTS)]
    cells = layout_fn(imgs)

    # 1. Build a placeholder canvas with bg colour from hero
    hero_path = imgs[cells[0][0] % len(imgs)]
    hero_preview = fill_crop(hero_path, 80, 80)
    bg = get_bg_color(hero_preview)
    canvas = Image.new("RGB", (W, H), bg)

    # 2. Paste each cell
    for (img_idx, cx, cy, cw, ch, bias) in cells:
        src_path = imgs[img_idx % len(imgs)]
        tile = fill_crop(src_path, cw, ch, crop_bias=bias)
        canvas.paste(tile, (cx, cy))

    # 3. Draw editorial typography
    draw_labels(canvas, title, tag, layout_idx)

    return canvas

# ─── Main ──────────────────────────────────────────────────────────────────
print("━" * 60)
print("  PREMIUM EDITORIAL COLLAGE THUMBNAIL GENERATOR")
print("━" * 60)

for (folder, title, tag, layout_idx) in FOLDERS:
    out_path = os.path.join(OUT_DIR, f"{folder}.png")

    if os.path.exists(out_path):
        print(f"  ⚠  Overwriting: {folder}.png")

    print(f"  ▸  [{LAYOUTS[layout_idx % len(LAYOUTS)].__name__}]  {folder}")

    result = build_thumbnail(folder, title, tag, layout_idx)
    if result:
        result.save(out_path, "PNG", optimize=False)
        print(f"       ✓  Saved → {folder}.png")

print()
print("━" * 60)
print("  ALL 18 THUMBNAILS COMPILED — EDITORIAL GRADE")
print("━" * 60)
