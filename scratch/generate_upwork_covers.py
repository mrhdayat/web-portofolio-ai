import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WORKSPACE = "/Users/dracoseven/ai-fake-project-porto/web-portfolio"
PUBLIC_DIR = os.path.join(WORKSPACE, "public")
OUTPUT_DIR = os.path.join(PUBLIC_DIR) # Output directly in public

WIDTH, HEIGHT = 1600, 1200

# Premium Fonts
FONT_AVENIR = "/System/Library/Fonts/Avenir Next Condensed.ttc"
FONT_COURIER = "/System/Library/Fonts/Supplemental/Courier New.ttf"

def load_font(font_path, size):
    try:
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

# Swiss Courier and Aggressive Avenir Next Condensed
font_mono = load_font(FONT_COURIER, 14)
font_mono_large = load_font(FONT_COURIER, 16)
font_title_large = load_font(FONT_AVENIR, 130)
font_title_massive = load_font(FONT_AVENIR, 150)

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

# Gather a clean pool of images from all required categories
categories = [
    "baju",
    "skincare",
    "ai photoshoot1", "ai photoshoot2", "ai photoshoot3", "ai photoshoot4",
    "ai photoshoot5", "ai photoshoot6", "ai photoshoot7", "ai photoshoot8",
    "photoshoot brand", "photoshoot brand2", "photoshoot brand3", "photoshoot brand4",
    "photoshoot brand5", "photoshoot brand6", "photoshoot brand7", "photoshoot brand8"
]

img_pool = {}
for cat in categories:
    imgs = get_images_from_folder(cat)
    if imgs:
        img_pool[cat] = imgs
    else:
        print(f"WARNING: Category {cat} is empty!")

# Safe selection helper
def get_img(cat, idx=0):
    if cat in img_pool and img_pool[cat]:
        return img_pool[cat][idx % len(img_pool[cat])]
    # fallback to any available category
    for k in img_pool.keys():
        if img_pool[k]:
            return img_pool[k][0]
    return None

# ── PROJECT COVER 01: "SILENT THEORY" ──
def make_cover_01():
    print("Compiling Cover 01: SILENT THEORY...")
    # Warm off-white museum canvas
    img = Image.new("RGBA", (WIDTH, HEIGHT), (236, 234, 230, 255))
    draw = ImageDraw.Draw(img)
    
    # 1. Giant Asymmetric Hero (Baju) on the right
    hero_w, hero_h = 660, 1000
    hero_img = crop_and_resize(get_img("baju", 0), hero_w, hero_h)
    img.paste(hero_img, (860, 100), hero_img)
    draw.rectangle([860, 100, 860 + hero_w, 100 + hero_h], outline=(0, 0, 0, 30), width=1)
    
    # 2. 4 smaller staggered detail crops on the left with deep breathing whitespace
    coords = [
        (80, 500),   # skincare
        (300, 500),  # ai photoshoot1
        (80, 780),   # photoshoot brand
        (300, 780)   # photoshoot brand2
    ]
    
    thumb_w, thumb_h = 200, 260
    details = [
        ("skincare", 0),
        ("ai photoshoot1", 0),
        ("photoshoot brand", 0),
        ("photoshoot brand2", 0)
    ]
    
    for idx, (x, y) in enumerate(coords):
        cat, img_idx = details[idx]
        thumb = crop_and_resize(get_img(cat, img_idx), thumb_w, thumb_h)
        img.paste(thumb, (x, y), thumb)
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(0, 0, 0, 30), width=1)
        
    # 3. Giant brutalist stacked title "SILENT THEORY" (Overlapping the hero)
    # Draw title
    draw.text((80, 130), "SILENT", font=font_title_large, fill=(18, 18, 20, 255))
    draw.text((80, 250), "THEORY.", font=font_title_large, fill=(18, 18, 20, 255))
    
    # Small monospaced Swiss annotations
    draw.text((80, HEIGHT - 85), "VISUAL EXPERIMENTATION // SERIES 01 // ARCHIVE NOTES // SYSTEM 02", font=font_mono, fill=(110, 110, 115, 255))
    draw.text((WIDTH - 280, HEIGHT - 85), "◈ ARCHIVE_06  ·  SS26", font=font_mono, fill=(110, 110, 115, 255))
    
    out_path = os.path.join(OUTPUT_DIR, "project_cover_01.jpg")
    img.convert("RGB").save(out_path, "JPEG", quality=95)
    print(f"  Saved SILENT THEORY to: {out_path}")

# ── PROJECT COVER 02: "HUMAN ERROR" ──
def make_cover_02():
    print("Compiling Cover 02: HUMAN ERROR...")
    # Deep obsidian studio canvas
    img = Image.new("RGBA", (WIDTH, HEIGHT), (10, 10, 12, 255))
    draw = ImageDraw.Draw(img)
    
    # 1. Giant Landscape Hero (AI Photoshoot 5) on the right
    hero_w, hero_h = 980, 640
    hero_img = crop_and_resize(get_img("ai photoshoot5", 0), hero_w, hero_h)
    img.paste(hero_img, (540, 460), hero_img)
    draw.rectangle([540, 460, 540 + hero_w, 460 + hero_h], outline=(255, 255, 255, 30), width=1)
    
    # 2. 4 supporting detail blocks layered on the left
    coords = [
        (80, 460),   # baju
        (300, 460),  # skincare
        (80, 680),   # photoshoot brand4
        (300, 680)   # photoshoot brand5
    ]
    
    thumb_w, thumb_h = 200, 200
    details = [
        ("baju", 1),
        ("skincare", 1),
        ("photoshoot brand4", 0),
        ("photoshoot brand5", 0)
    ]
    
    for idx, (x, y) in enumerate(coords):
        cat, img_idx = details[idx]
        thumb = crop_and_resize(get_img(cat, img_idx), thumb_w, thumb_h)
        img.paste(thumb, (x, y), thumb)
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(255, 255, 255, 30), width=1)
        
    # 3. Giant cropped stacked title "HUMAN ERROR"
    draw.text((80, 80), "HUMAN", font=font_title_massive, fill=(242, 242, 245, 255))
    draw.text((80, 220), "ERROR.", font=font_title_massive, fill=(242, 242, 245, 255))
    
    # Small Monospaced Swiss annotations
    draw.text((80, HEIGHT - 85), "ECHO FORM // CLASSIFIED AI PRODUCTION // v4.0.2 // COLD HEAT", font=font_mono, fill=(150, 150, 155, 255))
    draw.text((WIDTH - 280, HEIGHT - 85), "◈ STUDIO NOTES  ·  2026", font=font_mono, fill=(150, 150, 155, 255))
    
    out_path = os.path.join(OUTPUT_DIR, "project_cover_02.jpg")
    img.convert("RGB").save(out_path, "JPEG", quality=95)
    print(f"  Saved HUMAN ERROR to: {out_path}")

# ── PROJECT COVER 03: "OBJECT DESIRE" ──
def make_cover_03():
    print("Compiling Cover 03: OBJECT DESIRE...")
    # Pure gallery-white backdrop
    img = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # 1. Giant Square Hero (Skincare macro texture) on the left
    hero_w, hero_h = 840, 840
    hero_img = crop_and_resize(get_img("skincare", 0), hero_w, hero_h)
    img.paste(hero_img, (80, 260), hero_img)
    draw.rectangle([80, 260, 80 + hero_w, 260 + hero_h], outline=(0, 0, 0, 30), width=1)
    
    # 2. 4 vertical detail sheets staggered on the right
    coords = [
        (980, 360),   # baju
        (1180, 360),  # ai photoshoot7
        (980, 620),   # ai photoshoot8
        (1180, 620)   # photoshoot brand8
    ]
    
    thumb_w, thumb_h = 180, 240
    details = [
        ("baju", 2),
        ("ai photoshoot7", 0),
        ("ai photoshoot8", 0),
        ("photoshoot brand8", 0)
    ]
    
    for idx, (x, y) in enumerate(coords):
        cat, img_idx = details[idx]
        thumb = crop_and_resize(get_img(cat, img_idx), thumb_w, thumb_h)
        img.paste(thumb, (x, y), thumb)
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(0, 0, 0, 30), width=1)
        
    # 3. Floating polaroid overlap in the lower right (photoshoot brand 3)
    p_w, p_h = 200, 260
    border = 6
    sheet_w = p_w + border * 2
    sheet_h = p_h + border * 2
    
    sheet = Image.new("RGBA", (sheet_w, sheet_h), (255, 255, 255, 255))
    photo = crop_and_resize(get_img("photoshoot brand3", 1), p_w, p_h)
    sheet.paste(photo, (border, border), photo)
    
    s_draw = ImageDraw.Draw(sheet)
    s_draw.rectangle([0, 0, sheet_w, sheet_h], outline=(0, 0, 0, 30), width=1)
    s_draw.text((10, sheet_h - 18), "F:03", font=font_mono, fill=(120, 120, 125, 255))
    
    rotated_sheet = sheet.rotate(-3, expand=True, resample=Image.Resampling.BICUBIC)
    shadow, offset = make_shadow(sheet_w, sheet_h, blur=15, opacity=45)
    rotated_shadow = shadow.rotate(-3, expand=True, resample=Image.Resampling.BICUBIC)
    
    cx, cy = 1080, 980
    img.paste(rotated_shadow, (cx - rotated_shadow.size[0] // 2 + 3, cy - rotated_shadow.size[1] // 2 + 5), rotated_shadow)
    img.paste(rotated_sheet, (cx - rotated_sheet.size[0] // 2, cy - rotated_sheet.size[1] // 2), rotated_sheet)
    
    # 4. Giant stacked title "OBJECT DESIRE"
    draw.text((980, 100), "OBJECT", font=font_title_large, fill=(18, 18, 20, 255))
    draw.text((980, 220), "DESIRE.", font=font_title_large, fill=(18, 18, 20, 255))
    
    # Small Monospaced Swiss annotations
    draw.text((80, HEIGHT - 75), "PRIVATE FORM // BRANDING VISUALS // ARCHIVE_06 // STUDIO SERIES", font=font_mono, fill=(110, 110, 115, 255))
    draw.text((WIDTH - 280, HEIGHT - 75), "◈ SS26  ·  OBJECT DESIRE", font=font_mono, fill=(110, 110, 115, 255))
    
    out_path = os.path.join(OUTPUT_DIR, "project_cover_03.jpg")
    img.convert("RGB").save(out_path, "JPEG", quality=95)
    print(f"  Saved OBJECT DESIRE to: {out_path}")

# Run Compilation
make_cover_01()
make_cover_02()
make_cover_03()

print("\n🎉 ALL 3 PREMIUM UPWORK PROJECT COVERS GENERATED SUCCESSFULLY!")
