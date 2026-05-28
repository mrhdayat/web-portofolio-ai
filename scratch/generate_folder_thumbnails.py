import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WORKSPACE = "/Users/dracoseven/ai-fake-project-porto/web-portfolio"
PUBLIC_DIR = os.path.join(WORKSPACE, "public")
THUMBNAILS_DIR = "/Users/dracoseven/ai-fake-project-porto/thumbnails"

os.makedirs(THUMBNAILS_DIR, exist_ok=True)

# 4:3 aspect ratio
WIDTH, HEIGHT = 1200, 900

# Fonts
FONT_HELVETICA = "/System/Library/Fonts/Helvetica.ttc"
FONT_COURIER = "/System/Library/Fonts/Supplemental/Courier New.ttf"

def load_font(font_path, size):
    try:
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

font_mono = load_font(FONT_COURIER, 13)
font_label = load_font(FONT_HELVETICA, 16)

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
        fallback = Image.new("RGBA", (target_w, target_h), (35, 35, 38, 255))
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

folders = [
    "baju",
    "skincare",
    "photoshoot brand", "photoshoot brand2", "photoshoot brand3", "photoshoot brand4",
    "photoshoot brand5", "photoshoot brand6", "photoshoot brand7", "photoshoot brand8",
    "ai photoshoot1", "ai photoshoot2", "ai photoshoot3", "ai photoshoot4",
    "ai photoshoot5", "ai photoshoot6", "ai photoshoot7", "ai photoshoot8"
]

print("Starting programmatic synthesis of 18 premium folder thumbnails...")

for folder in folders:
    out_name = f"{folder}.jpg"
    out_path = os.path.join(THUMBNAILS_DIR, out_name)
    
    # Check if file exists and warn
    if os.path.exists(out_path):
        print(f"⚠️ WARNING: {out_name} already exists in thumbnails directory. Script will overwrite.")
        
    imgs = get_images_from_folder(folder)
    if not imgs:
        print(f"❌ ERROR: Category folder '{folder}' has no images! Skipping.")
        continue
        
    print(f"  Processing '{folder}' ({len(imgs)} source images)...")
    
    # Determine the canvas background based on average visual tone or name
    # Skincare/beauty gets warm elegant paper white, dark cyber/fashion gets rich dark slate
    is_dark_theme = any(x in folder for x in ["ai photoshoot5", "ai photoshoot6", "ai photoshoot7", "baju", "photoshoot brand6"])
    if is_dark_theme:
        bg_color = (18, 18, 20, 255) # obsidian black
        outline_color = (255, 255, 255, 25)
        text_color = (150, 150, 155, 255)
    else:
        bg_color = (245, 245, 247, 255) # off-white museum
        outline_color = (0, 0, 0, 20)
        text_color = (110, 110, 115, 255)
        
    img = Image.new("RGBA", (WIDTH, HEIGHT), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Grid parameters
    margin = 60
    gutter = 15
    
    # 1. Main Hero Visual (Oversized Left Hook)
    hero_w = 540
    hero_h = 740
    hero_img = crop_and_resize(imgs[0 % len(imgs)], hero_w, hero_h)
    img.paste(hero_img, (margin, margin), hero_img)
    draw.rectangle([margin, margin, margin + hero_w, margin + hero_h], outline=outline_color, width=1)
    
    # 2. 3 Staggered supporting thumbnails on the right (asymmetric spacing)
    coords = [
        (margin + hero_w + gutter, margin),             # Top Right
        (margin + hero_w + gutter, margin + 260 + gutter),      # Middle Right
        (margin + hero_w + gutter, margin + (260 + gutter) * 2)  # Bottom Right
    ]
    
    thumb_w = 480
    thumb_h = 240
    
    for idx, (x, y) in enumerate(coords):
        src_idx = (idx + 1) % len(imgs)
        # If folder has very few images, cycle them
        thumb = crop_and_resize(imgs[src_idx], thumb_w, thumb_h)
        img.paste(thumb, (x, y), thumb)
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=outline_color, width=1)
        
    # Tiny Monospaced print footers
    label_text = f"{folder.upper()} // LOOKBOOK PORTFOLIO INDEX // VOL.04 // SS26"
    draw.text((margin, HEIGHT - 55), label_text, font=font_mono, fill=text_color)
    draw.text((WIDTH - margin - 220, HEIGHT - 55), f"◈ FILESYSTEM: /{folder}", font=font_mono, fill=text_color)
    
    # Save Lossless JPEG at 95% quality
    img.convert("RGB").save(out_path, "JPEG", quality=95)
    print(f"    Saved thumbnail to: {out_path}")

print("\n🎉 ALL 18 PREMIUM FOLDER THUMBNAILS COMPILED SUCCESSFULLY!")
