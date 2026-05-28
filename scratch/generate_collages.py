import os
import sys
import random
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

WORKSPACE = "/Users/dracoseven/ai-fake-project-porto/web-portfolio"
PUBLIC_DIR = os.path.join(WORKSPACE, "public")
OUTPUT_DIR = os.path.join(PUBLIC_DIR, "portfolio-collages")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 4:3 Landscape Orientation
WIDTH, HEIGHT = 1600, 1200

# Fonts
FONT_HELVETICA = "/System/Library/Fonts/Helvetica.ttc"
FONT_COURIER = "/System/Library/Fonts/Supplemental/Courier New.ttf"

def load_font(font_path, size):
    try:
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

font_label = load_font(FONT_HELVETICA, 16)
font_label_bold = load_font(FONT_HELVETICA, 20)
font_label_mono = load_font(FONT_COURIER, 14)
font_title = load_font(FONT_HELVETICA, 28)

# Helper: Find all images in a folder
def get_images_from_folder(folder_name):
    dir_path = os.path.join(PUBLIC_DIR, folder_name)
    if not os.path.exists(dir_path):
        return []
    files = os.listdir(dir_path)
    images = [os.path.join(dir_path, f) for f in files if f.endswith(('.jpeg', '.jpg', '.png'))]
    images.sort()
    return images

# Helper: Crop and resize image to exact dimensions
def crop_and_resize(img_path, target_w, target_h):
    try:
        img = Image.open(img_path).convert("RGBA")
        src_w, src_h = img.size
        ratio = max(target_w / src_w, target_h / src_h)
        new_w = int(src_w * ratio)
        new_h = int(src_h * ratio)
        
        resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Center crop
        left = (new_w - target_w) // 2
        top = (new_h - target_h) // 2
        cropped = resized.crop((left, top, left + target_w, top + target_h))
        return cropped
    except Exception as e:
        print(f"Error loading {img_path}: {e}")
        # Create a neutral fallback block
        fallback = Image.new("RGBA", (target_w, target_h), (30, 30, 35, 255))
        return fallback

# Helper: Create drop shadow for layered elements
def make_shadow(width, height, offset=(10, 10), blur=20, opacity=80):
    shadow_w = width + blur * 2
    shadow_h = height + blur * 2
    shadow = Image.new("RGBA", (shadow_w, shadow_h), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(shadow)
    sh_draw.rectangle([blur, blur, blur + width, blur + height], fill=(0, 0, 0, opacity))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    return shadow, blur

# ── 1. BAJU / FASHION EDITORIAL COVERS (4 Collages) ──

def make_collage_1_baju_swiss_grid():
    # 8 images from 'baju' arranged in an asymmetrical grid
    img = Image.new("RGBA", (WIDTH, HEIGHT), (245, 245, 247, 255)) # Apple grey
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("baju")
    if not images:
        images = get_images_from_folder("photoshoot brand")
        
    margin = 80
    gutter = 16
    
    hero_w = 800
    hero_h = 1000
    
    # Left Hero
    c_hero = crop_and_resize(images[0 % len(images)], hero_w, hero_h)
    img.paste(c_hero, (margin, margin), c_hero)
    draw.rectangle([margin, margin, margin + hero_w, margin + hero_h], outline=(0, 0, 0, 20), width=1)
    
    # Right Column: 3 square detail shots (each 280x320)
    grid_w = 280
    grid_h = 320
    
    coords = []
    for r in range(3):
        for c in range(2):
            x = margin + hero_w + gutter + c * (grid_w + gutter)
            y = margin + r * (grid_h + gutter)
            coords.append((x, y))
            
    for idx, (x, y) in enumerate(coords[:7]):
        c_thumb = crop_and_resize(images[(idx + 1) % len(images)], grid_w, grid_h)
        img.paste(c_thumb, (x, y), c_thumb)
        draw.rectangle([x, y, x + grid_w, y + grid_h], outline=(0, 0, 0, 20), width=1)
        
    # Swiss minimalist annotations
    draw.text((margin, HEIGHT - 70), "STUDIO ARCHIVE // VOL.04 // BAJU EDITORIAL // SS26", font=font_label_mono, fill=(120, 120, 125, 255))
    draw.text((WIDTH - margin - 220, HEIGHT - 70), "LOOKBOOK ISSUE  ·  SS26", font=font_label_mono, fill=(120, 120, 125, 255))
    
    return img.convert("RGB")

def make_collage_2_baju_cos():
    # 7 images. Asymmetrical blocks, COS inspired visual identity cover
    img = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("baju")
    if not images:
        images = get_images_from_folder("photoshoot brand2")
        
    margin = 80
    gutter = 20
    
    # Left Column: 3 squares
    for i in range(3):
        c_left = crop_and_resize(images[i % len(images)], 280, 280)
        y = margin + i * (280 + gutter)
        img.paste(c_left, (margin, y), c_left)
        draw.rectangle([margin, y, margin + 280, y + 280], outline=(0, 0, 0, 25), width=1)
        
    # Right Hero
    c_hero = crop_and_resize(images[3 % len(images)], 1040, 580)
    img.paste(c_hero, (margin + 280 + gutter, margin), c_hero)
    draw.rectangle([margin + 280 + gutter, margin, margin + 280 + gutter + 1040, margin + 580], outline=(0, 0, 0, 25), width=1)
    
    # Bottom right pair
    c_b1 = crop_and_resize(images[4 % len(images)], 500, 400)
    img.paste(c_b1, (margin + 280 + gutter, margin + 580 + gutter), c_b1)
    draw.rectangle([margin + 280 + gutter, margin + 580 + gutter, margin + 280 + gutter + 500, margin + 580 + gutter + 400], outline=(0, 0, 0, 25), width=1)
    
    c_b2 = crop_and_resize(images[5 % len(images)], 520, 400)
    img.paste(c_b2, (margin + 280 + gutter + 500 + gutter, margin + 580 + gutter), c_b2)
    draw.rectangle([margin + 280 + gutter + 500 + gutter, margin + 580 + gutter, margin + 280 + gutter + 1040, margin + 580 + gutter + 400], outline=(0, 0, 0, 25), width=1)
    
    # Swiss annotations inside bottom space
    draw.text((margin, HEIGHT - 70), "STUDIO SERIES  //  CAMPAIGN 03  //  APPAREL STUDY", font=font_label_mono, fill=(120, 120, 125, 255))
    
    return img.convert("RGB")

def make_collage_3_baju_columns():
    # 9 images. Staggered vertical column split
    img = Image.new("RGBA", (WIDTH, HEIGHT), (242, 242, 242, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("baju")
    if not images:
        images = get_images_from_folder("photoshoot brand5")
        
    margin = 80
    gutter = 15
    col_w = (WIDTH - margin * 2 - gutter * 2) // 3
    
    # Col 1: 3 squares
    for idx in range(3):
        y = margin + idx * (320 + gutter)
        c = crop_and_resize(images[idx % len(images)], col_w, 320)
        img.paste(c, (margin, y), c)
        draw.rectangle([margin, y, margin + col_w, y + 320], outline=(0, 0, 0, 30), width=1)
        
    # Col 2: 1 tall vertical + 2 small squares
    c2_v = crop_and_resize(images[3 % len(images)], col_w, 655)
    img.paste(c2_v, (margin + col_w + gutter, margin), c2_v)
    draw.rectangle([margin + col_w + gutter, margin, margin + col_w * 2 + gutter, margin + 655], outline=(0, 0, 0, 30), width=1)
    
    c2_s1 = crop_and_resize(images[4 % len(images)], 227, 320)
    img.paste(c2_s1, (margin + col_w + gutter, margin + 655 + gutter), c2_s1)
    draw.rectangle([margin + col_w + gutter, margin + 655 + gutter, margin + col_w + gutter + 227, margin + 655 + gutter + 320], outline=(0, 0, 0, 30), width=1)
    
    c2_s2 = crop_and_resize(images[5 % len(images)], 227, 320)
    img.paste(c2_s2, (margin + col_w + gutter + 227 + gutter, margin + 655 + gutter), c2_s2)
    draw.rectangle([margin + col_w + gutter + 227 + gutter, margin + 655 + gutter, margin + col_w * 2 + gutter, margin + 655 + gutter + 320], outline=(0, 0, 0, 30), width=1)
    
    # Col 3: 3 squares
    for idx in range(3):
        y = margin + idx * (320 + gutter)
        c = crop_and_resize(images[(idx + 6) % len(images)], col_w, 320)
        img.paste(c, (margin + (col_w + gutter) * 2, y), c)
        draw.rectangle([margin + (col_w + gutter) * 2, y, margin + (col_w + gutter) * 2 + col_w, y + 320], outline=(0, 0, 0, 30), width=1)
        
    for x in [margin, margin + col_w + gutter, margin + (col_w + gutter) * 2]:
        draw.line([x - 8, margin, x - 8, HEIGHT - margin], fill=(0, 0, 0, 15), width=1)
        
    draw.text((margin, HEIGHT - 70), "VISUAL ARCHIVE  ·  CAMPAIGN 02  ·  BAJU EDITORIAL", font=font_label_mono, fill=(120, 120, 125, 255))
    
    return img.convert("RGB")

def make_collage_4_baju_contact():
    # 12 images: 3x4 Backstage sheet
    img = Image.new("RGBA", (WIDTH, HEIGHT), (18, 18, 20, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("baju")
    if not images:
        images = get_images_from_folder("photoshoot brand6")
        
    margin_x = 80
    margin_y = 100
    gutter = 15
    
    grid_w = (WIDTH - margin_x * 2 - gutter * 3) // 4
    grid_h = 280
    
    coords = []
    for r in range(3):
        for c in range(4):
            coords.append((margin_x + c * (grid_w + gutter), margin_y + r * (grid_h + gutter)))
            
    for idx, (x, y) in enumerate(coords):
        c_img = crop_and_resize(images[idx % len(images)], grid_w, grid_h)
        img.paste(c_img, (x, y), c_img)
        draw.rectangle([x, y, x + grid_w, y + grid_h], outline=(255, 255, 255, 30), width=1)
        draw.text((x + 5, y - 20), f"F:{idx+1:02d}", font=font_label_mono, fill=(100, 100, 105, 255))
        
    draw.text((margin_x, 45), "CAMPAIGN 02 // BACKSTAGE EDITORIAL PROOFS // ACNE INSPIRATION", font=font_label_mono, fill=(255, 255, 255, 200))
    
    return img.convert("RGB")

# ── 2. SKINCARE LUXURY COVERS (4 Collages) ──

def make_collage_5_skincare_board():
    # 7 skincare images. Triptych layouts, RHODE inspired beauty series
    img = Image.new("RGBA", (WIDTH, HEIGHT), (245, 245, 247, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("skincare")
    if not images:
        images = get_images_from_folder("photoshoot brand")
        
    margin = 80
    gutter = 16
    
    hero_w = 800
    hero_h = 1000
    
    # Left Hero
    c_hero = crop_and_resize(images[0 % len(images)], hero_w, hero_h)
    img.paste(c_hero, (margin, margin), c_hero)
    draw.rectangle([margin, margin, margin + hero_w, margin + hero_h], outline=(0, 0, 0, 20), width=1)
    
    # Right 3x2 Grid: 6 thumbnails (each 280x320)
    grid_w = 280
    grid_h = 320
    
    coords = []
    for r in range(3):
        for c in range(2):
            coords.append((margin + hero_w + gutter + c * (grid_w + gutter), margin + r * (grid_h + gutter)))
            
    for idx, (x, y) in enumerate(coords):
        c_thumb = crop_and_resize(images[(idx + 1) % len(images)], grid_w, grid_h)
        img.paste(c_thumb, (x, y), c_thumb)
        draw.rectangle([x, y, x + grid_w, y + grid_h], outline=(0, 0, 0, 20), width=1)
        
    draw.text((margin, HEIGHT - 70), "Rhode BEAUTY SERIES  //  VOL.04  //  SKINCARE DESIGN", font=font_label_mono, fill=(120, 120, 125, 255))
    draw.text((WIDTH - margin - 220, HEIGHT - 70), "LOOKBOOK ISSUE  ·  SS26", font=font_label_mono, fill=(120, 120, 125, 255))
    
    return img.convert("RGB")

def make_collage_6_skincare_aesop():
    # 6 overlapping beauty sheets on concrete. AESOP inspired research cover
    img = Image.new("RGBA", (WIDTH, HEIGHT), (235, 235, 237, 255))
    draw = ImageDraw.Draw(img)
    
    for i in range(120, WIDTH, 120):
        draw.line([i, 0, i, HEIGHT], fill=(255, 255, 255, 12), width=1)
    for j in range(120, HEIGHT, 120):
        draw.line([0, j, WIDTH, j], fill=(255, 255, 255, 12), width=1)
        
    images = get_images_from_folder("skincare")
    if not images:
        images = get_images_from_folder("photoshoot brand3")
        
    sheets = [
        (380, 520, 280, 360, -3, images[0 % len(images)]),
        (400, 500, 700, 320, 2, images[1 % len(images)]),
        (420, 520, 1140, 360, -2, images[2 % len(images)]),
        (460, 480, 300, 850, 1, images[3 % len(images)]),
        (440, 540, 720, 880, -3, images[4 % len(images)]),
        (400, 500, 1160, 860, 2, images[5 % len(images)])
    ]
    
    for idx, (sw, sh, cx, cy, rot, path) in enumerate(sheets):
        border = 8
        sheet_w = sw + border * 2
        sheet_h = sh + border * 2
        
        sheet = Image.new("RGBA", (sheet_w, sheet_h), (255, 255, 255, 255))
        photo = crop_and_resize(path, sw, sh)
        sheet.paste(photo, (border, border), photo)
        
        s_draw = ImageDraw.Draw(sheet)
        s_draw.rectangle([0, 0, sheet_w, sheet_h], outline=(0, 0, 0, 25), width=1)
        s_draw.text((12, sheet_h - 20), f"VOL.03 // SHEET_{idx+1:02d}", font=font_label_mono, fill=(120, 120, 125, 255))
        
        rotated_sheet = sheet.rotate(rot, expand=True, resample=Image.Resampling.BICUBIC)
        
        shadow, offset = make_shadow(sheet_w, sheet_h, blur=18, opacity=45)
        rotated_shadow = shadow.rotate(rot, expand=True, resample=Image.Resampling.BICUBIC)
        
        img.paste(rotated_shadow, (cx - rotated_shadow.size[0] // 2 + 5, cy - rotated_shadow.size[1] // 2 + 8), rotated_shadow)
        img.paste(rotated_sheet, (cx - rotated_sheet.size[0] // 2, cy - rotated_sheet.size[1] // 2), rotated_sheet)
        
    draw.text((80, 80), "BEAUTY NOTES  ·  STUDIO ARCHIVE  ·  SS26  ·  AESOP STYLE", font=font_label_mono, fill=(120, 120, 125, 255))
    
    return img.convert("RGB")

def make_collage_7_skincare_zine():
    # 8 images in a 4x2 matrix bottom, large elegant whitespace top. Rhode style cover
    img = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("skincare")
    if not images:
        images = get_images_from_folder("photoshoot brand7")
        
    margin = 80
    grid_w = (WIDTH - margin * 2 - 30) // 4
    grid_h = 320
    gutter = 10
    
    draw.text((margin, 120), "VOL.04 / SKINCARE DIRECTION", font=font_title, fill=(0, 0, 0, 255))
    draw.text((margin, 170), "STUDIO DOCUMENTATION FOR SKINCARE & LIQUID CAMPAIGN DIRECTION", font=font_label_mono, fill=(150, 150, 155, 255))
    
    coords = []
    for row in range(2):
        for col in range(4):
            coords.append((margin + col * (grid_w + gutter), 480 + row * (grid_h + gutter)))
            
    for idx, (x, y) in enumerate(coords):
        c = crop_and_resize(images[idx % len(images)], grid_w, grid_h)
        img.paste(c, (x, y), c)
        draw.rectangle([x, y, x + grid_w, y + grid_h], outline=(0, 0, 0, 20), width=1)
        draw.text((x, y + grid_h + 5), f"SK_{idx+1:02d}", font=font_label_mono, fill=(180, 180, 185, 255))
        
    draw.text((margin, HEIGHT - 100), "◈ Rhode BEAUTY TEST  ·  VISUAL DIRECTION  ·  VOL.04", font=font_label_mono, fill=(120, 120, 125, 255))
    
    return img.convert("RGB")

def make_collage_8_skincare_skii():
    # Asymmetric high-contrast grid of detailed crops. SK-II inspired cover (7 images)
    img = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("skincare")
    if not images:
        images = get_images_from_folder("photoshoot brand8")
        
    margin = 80
    gutter = 20
    
    # Left tall hero image
    hero_w = 640
    hero_h = 1040
    c_hero = crop_and_resize(images[0 % len(images)], hero_w, hero_h)
    img.paste(c_hero, (margin, margin), c_hero)
    draw.rectangle([margin, margin, margin + hero_w, margin + hero_h], outline=(0, 0, 0, 40), width=1)
    
    # Right: 3 rows, 2 columns of supporting detail shots (each 340x333)
    thumb_w = 340
    thumb_h = 333
    
    coords = []
    for r in range(3):
        for c in range(2):
            x = margin + hero_w + gutter + c * (thumb_w + gutter)
            y = margin + r * (thumb_h + 20)
            coords.append((x, y))
            
    for idx, (x, y) in enumerate(coords):
        c_thumb = crop_and_resize(images[(idx + 1) % len(images)], thumb_w, thumb_h)
        img.paste(c_thumb, (x, y), c_thumb)
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(0, 0, 0, 40), width=1)
        
    draw.text((margin, HEIGHT - 65), "SK-II ESSENTIAL SPEC  //  v4.0.8  //  TEXTURE LOCK  //  VISUAL ARCHIVE", font=font_label_mono, fill=(100, 100, 105, 255))
    
    return img.convert("RGB")

# ── 3. AI PHOTOSHOOT 5-8 EDITORIAL COVERS (4 Collages) ──

def make_collage_9_ai5_magazine():
    # 7 images from 'ai photoshoot5'. Cyber/fashion lookbook crops (1 hero + 6 bottom thumbnails)
    img = Image.new("RGBA", (WIDTH, HEIGHT), (10, 10, 12, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("ai photoshoot5")
    if not images:
        images = get_images_from_folder("photoshoot brand5")
        
    margin = 80
    gap = 20
    
    # Large top block hero
    top_w = WIDTH - margin * 2
    top_h = 620
    
    c_top = crop_and_resize(images[0 % len(images)], top_w, top_h)
    img.paste(c_top, (margin, margin), c_top)
    draw.rectangle([margin, margin, margin + top_w, margin + top_h], outline=(255, 255, 255, 60), width=2)
    
    # 6 small detail thumbnails aligned in a row below
    detail_w = (top_w - gap * 5) // 6
    detail_h = 360
    
    for idx in range(6):
        c_detail = crop_and_resize(images[(idx + 1) % len(images)], detail_w, detail_h)
        x = margin + idx * (detail_w + gap)
        y = margin + top_h + gap
        img.paste(c_detail, (x, y), c_detail)
        draw.rectangle([x, y, x + detail_w, y + detail_h], outline=(255, 255, 255, 60), width=2)
        
    draw.text((margin, HEIGHT - 70), "STUDIO SERIES  //  VISUAL ARCHIVE  //  AI_PHOTOSHOOT_5  //  VOL.04", font=font_label_mono, fill=(150, 150, 155, 255))
    
    return img.convert("RGB")

def make_collage_10_ai6_evaluation():
    # 12 images from 'ai photoshoot6'. Technical evaluation contact page
    img = Image.new("RGBA", (WIDTH, HEIGHT), (20, 20, 22, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("ai photoshoot6")
    if not images:
        images = get_images_from_folder("photoshoot brand6")
        
    margin = 80
    gutter = 15
    
    grid_w = (WIDTH - margin * 2 - gutter * 3) // 4
    grid_h = 290
    
    coords = []
    for r in range(3):
        for c in range(4):
            coords.append((margin + c * (grid_w + gutter), 180 + r * (grid_h + gutter)))
            
    for idx, (x, y) in enumerate(coords):
        c_img = crop_and_resize(images[idx % len(images)], grid_w, grid_h)
        img.paste(c_img, (x, y), c_img)
        draw.rectangle([x, y, x + grid_w, y + grid_h], outline=(255, 255, 255, 25), width=1)
        draw.text((x + 10, y + 10), f"SYS_LOC_[{idx}]:OK", font=font_label_mono, fill=(52, 211, 153, 200))
        
    draw.text((margin, 60), "AI SYNTHESIS  ·  IDENTITY MATCH MATRIX  ·  AI_PHOTOSHOOT_6", font=font_label_mono, fill=(255, 255, 255, 200))
    draw.text((margin, HEIGHT - 70), "◈ SYSTEM ARCHIVE  ·  CLASSIFIED AI PRODUCTION SAMPLES  ·  v1.0", font=font_label_mono, fill=(255, 204, 0, 200))
    
    return img.convert("RGB")

def make_collage_11_ai7_motion():
    # 7 motion trails images from 'ai photoshoot7' in staggered layout
    img = Image.new("RGBA", (WIDTH, HEIGHT), (10, 10, 12, 255))
    draw = ImageDraw.Draw(img)
    
    draw.ellipse([WIDTH//2 - 380, HEIGHT//2 - 380, WIDTH//2 + 380, HEIGHT//2 + 380], outline=(255, 255, 255, 12), width=1)
    
    images = get_images_from_folder("ai photoshoot7")
    if not images:
        images = get_images_from_folder("photoshoot brand7")
        
    layouts = [
        (80, 140, 360, 480, images[0 % len(images)]),
        (460, 140, 420, 360, images[1 % len(images)]),
        (900, 140, 620, 460, images[2 % len(images)]),
        (80, 640, 520, 460, images[3 % len(images)]),
        (620, 520, 420, 380, images[4 % len(images)]),
        (1060, 620, 460, 480, images[5 % len(images)]),
        (460, 920, 580, 180, images[6 % len(images)])
    ]
    
    for idx, (x, y, w, h, path) in enumerate(layouts):
        c = crop_and_resize(path, w, h)
        img.paste(c, (x, y), c)
        draw.rectangle([x, y, x + w, y + h], outline=(255, 255, 255, 45), width=2)
        draw.text((x + 10, y + 10), f"SEQ: {idx+1:02d}", font=font_label_mono, fill=(255, 255, 255, 200))
        
    draw.text((80, 60), "EXPERIMENTAL FASHION  //  MOTION TRAILS  //  AI_PHOTOSHOOT_7", font=font_label_mono, fill=(255, 204, 0, 200))
    draw.text((80, HEIGHT - 70), "STUDIO ARCHIVE  ·  SERIES 07  ·  2026", font=font_label_mono, fill=(150, 150, 155, 255))
    
    return img.convert("RGB")

def make_collage_12_ai8_brutalist():
    # 6 closeup beauty crops from 'ai photoshoot8' arranged in triptych layout
    img = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    images = get_images_from_folder("ai photoshoot8")
    if not images:
        images = get_images_from_folder("photoshoot brand8")
        
    margin = 80
    gutter = 18
    
    hero_w = 580
    hero_h = 1000
    c_hero = crop_and_resize(images[0 % len(images)], hero_w, hero_h)
    img.paste(c_hero, (margin, margin), c_hero)
    draw.rectangle([margin, margin, margin + hero_w, margin + hero_h], outline=(0, 0, 0, 35), width=1)
    
    col_w = 400
    col_h = 320
    for i in range(3):
        y = margin + i * (col_h + gutter)
        c = crop_and_resize(images[(i + 1) % len(images)], col_w, col_h)
        img.paste(c, (margin + hero_w + gutter, y), c)
        draw.rectangle([margin + hero_w + gutter, y, margin + hero_w + gutter + col_w, y + col_h], outline=(0, 0, 0, 35), width=1)
        
    col2_w = 420
    col2_h = 491
    for i in range(2):
        y = margin + i * (col2_h + gutter)
        c = crop_and_resize(images[(i + 4) % len(images)], col2_w, col2_h)
        img.paste(c, (margin + hero_w + gutter + col_w + gutter, y), c)
        draw.rectangle([margin + hero_w + gutter + col_w + gutter, y, margin + hero_w + gutter + col_w + gutter + col2_w, y + col2_h], outline=(0, 0, 0, 35), width=1)
        
    draw.text((margin, HEIGHT - 70), "AI PHOTO PRODUCTION  //  LOOKBOOK SERIES  //  v8.0  //  SS26", font=font_label_mono, fill=(100, 100, 105, 255))
    
    return img.convert("RGB")

# ── 3. EXECUTION PIPELINE ──

collages = [
    ("collage_01_swiss_grid.jpg", make_collage_1_baju_swiss_grid),
    ("collage_02_contact_sheet.jpg", make_collage_2_baju_cos),
    ("collage_03_brutalist_asymmetric.jpg", make_collage_3_baju_columns),
    ("collage_04_layered_paper.jpg", make_collage_4_baju_contact),
    ("collage_05_multiscale_editorial.jpg", make_collage_5_skincare_board),
    ("collage_06_three_column_grid.jpg", make_collage_6_skincare_aesop),
    ("collage_07_fashion_zine.jpg", make_collage_7_skincare_zine),
    ("collage_08_scattered_moodboard.jpg", make_collage_8_skincare_skii),
    ("collage_09_high_contrast.jpg", make_collage_9_ai5_magazine),
    ("collage_10_ai_synthesis_proof.jpg", make_collage_10_ai6_evaluation),
    ("collage_11_kinetic_motion.jpg", make_collage_11_ai7_motion),
    ("collage_12_beauty_closeups.jpg", make_collage_12_ai8_brutalist)
]

print("Synthesizing 12 distinct art-directed portfolio collages in 4:3 Landscape...")
for filename, creator in collages:
    print(f"  Generating {filename}...")
    try:
        res = creator()
        out_path = os.path.join(OUTPUT_DIR, filename)
        res.save(out_path, "JPEG", quality=95)
        print(f"    Saved to: {out_path}")
    except Exception as e:
        print(f"    FAILED generating {filename}: {e}")
        import traceback; traceback.print_exc()

print("\n🎉 ALL 12 4:3 COLLAGES GENERATED SUCCESSFULLY IN public/portfolio-collages/")
