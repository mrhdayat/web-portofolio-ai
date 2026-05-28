import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Output Paths
WORKSPACE = "/Users/dracoseven/ai-fake-project-porto/web-portfolio"
PUBLIC_DIR = os.path.join(WORKSPACE, "public")
TEMP_DIR = os.path.join(WORKSPACE, "scratch", "video_temp")
OUTPUT_VIDEO = os.path.join(WORKSPACE, "public", "mrd_portfolio_showcase.mp4")

os.makedirs(TEMP_DIR, exist_ok=True)

# 1. Slide Data Configuration presenting ALL 18 folders
# Layout modes: "split_left", "split_right", "top_heavy", "full_hud"
SLIDES_DATA = [
    {
        "type": "intro",
        "title": "MRD / CREATIVE",
        "subtitle": "VISUAL DIRECTION & AI PRODUCTION",
        "tagline": "PORTFOLIO REEL 2026 // VOL.04 // SS26"
    },
    {
        "type": "image",
        "layout": "split_left",
        "folder": "photoshoot brand",
        "tag": "BRAND I EDITORIAL",
        "desc": "Luxury Fashion Study",
        "tech": "Deterministic Pose Consistency"
    },
    {
        "type": "image",
        "layout": "split_right",
        "folder": "photoshoot brand2",
        "tag": "BRAND II KINETIC",
        "desc": "Activewear Motion Study",
        "tech": "Skeletal Joint Calibration"
    },
    {
        "type": "image",
        "layout": "top_heavy",
        "folder": "photoshoot brand3",
        "tag": "BRAND III WINTER",
        "desc": "Industrial Winter Lock",
        "tech": "Outfit & Scene Lock v1.4"
    },
    {
        "type": "image",
        "layout": "full_hud",
        "folder": "photoshoot brand4",
        "tag": "BRAND IV APPAREL",
        "desc": "Skeletal Joint Mapping",
        "tech": "Zero AI Slop Architecture"
    },
    {
        "type": "image",
        "layout": "split_left",
        "folder": "photoshoot brand5",
        "tag": "BRAND V EDITORIAL",
        "desc": "Depth & Focus Isolation",
        "tech": "High-Fashion Serialization"
    },
    {
        "type": "image",
        "layout": "split_right",
        "folder": "photoshoot brand6",
        "tag": "BRAND VI GEOMETRY",
        "desc": "High-Fashion Twisted Poses",
        "tech": "Pose & Outfit Identity Lock"
    },
    {
        "type": "image",
        "layout": "top_heavy",
        "folder": "photoshoot brand7",
        "tag": "BRAND VII MUSEUM",
        "desc": "Ambient Light Integration",
        "tech": "Multi-Stage Face Locking"
    },
    {
        "type": "image",
        "layout": "full_hud",
        "folder": "photoshoot brand8",
        "tag": "BRAND VIII CONCRETE",
        "desc": "Architecture Apparel Study",
        "tech": "Manual Film Grade / 35mm"
    },
    {
        "type": "image",
        "layout": "split_left",
        "folder": "skincare",
        "tag": "RHODE BEAUTY BOARD",
        "desc": "Dewy Skin Formulation Study",
        "tech": "Dewy Skin Pores & Liquid Comps"
    },
    {
        "type": "image",
        "layout": "split_right",
        "folder": "baju",
        "tag": "BAJU STREETWEAR",
        "desc": "Acne Studios Lookbook Spread",
        "tech": "Tactile Print Spacing Grid"
    },
    {
        "type": "image",
        "layout": "top_heavy",
        "folder": "ai photoshoot1",
        "tag": "AI SYNTHESIS I",
        "desc": "Stable Face & Outfit Lock",
        "tech": "Bespoke Multi-Layer Masking"
    },
    {
        "type": "image",
        "layout": "full_hud",
        "folder": "ai photoshoot2",
        "tag": "AI SYNTHESIS II",
        "desc": "Sequential High-Fashion Glow",
        "tech": "ControlNet & Custom Embeddings"
    },
    {
        "type": "image",
        "layout": "split_left",
        "folder": "ai photoshoot3",
        "tag": "AI SYNTHESIS III",
        "desc": "Kinetic Blur & Motion Trails",
        "tech": "Latent Identity Consistency"
    },
    {
        "type": "image",
        "layout": "split_right",
        "folder": "ai photoshoot4",
        "tag": "AI SYNTHESIS IV",
        "desc": "Apparel & Pack Composition",
        "tech": "Zero AI Slop / BNSP Certified"
    },
    {
        "type": "image",
        "layout": "top_heavy",
        "folder": "ai photoshoot5",
        "tag": "AI SYNTHESIS V",
        "desc": "Cyberpunk Editorial Lookbook",
        "tech": "Obsidian Color Grading v4.0"
    },
    {
        "type": "image",
        "layout": "full_hud",
        "folder": "ai photoshoot6",
        "tag": "AI SYNTHESIS VI",
        "desc": "Model Runway Face Proof Matrix",
        "tech": "Identity Stability Calibration"
    },
    {
        "type": "image",
        "layout": "split_left",
        "folder": "ai photoshoot7",
        "tag": "AI SYNTHESIS VII",
        "desc": "Circular Kinetic Movement Study",
        "tech": "Spacial Depth Interpolation"
    },
    {
        "type": "image",
        "layout": "split_right",
        "folder": "ai photoshoot8",
        "tag": "AI SYNTHESIS VIII",
        "desc": "Brutalist Catalog Presentation",
        "tech": "High-Breathing Layout Pacing"
    },
    {
        "type": "outro",
        "title": "LET'S WORK TOGETHER",
        "subtitle": "CREATIVE DIRECTION & BRAND MONTAGE",
        "tagline": "HIRE ON UPWORK · MUHAMMAD RAHMAT HIDAYAT"
    }
]

# Total Duration: ~28 Seconds
# 20 Slides (18 Project folders + 1 Intro + 1 Outro)
# Staying frames per slide: 38 frames (1.27 seconds)
# Transition frames per slide: 4 frames (0.13 seconds) - rapid, highly precise editorial hard blends!
WIDTH, HEIGHT = 1920, 1080
FPS = 30
STAY_FRAMES = 38
TRANS_FRAMES = 4

FONT_HELVETICA = "/System/Library/Fonts/Helvetica.ttc"
FONT_COURIER = "/System/Library/Fonts/Supplemental/Courier New.ttf"

def load_font(font_path, size):
    try:
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

font_massive = load_font(FONT_HELVETICA, 76)
font_title_large = load_font(FONT_HELVETICA, 54)
font_title_medium = load_font(FONT_HELVETICA, 32)
font_body_large = load_font(FONT_HELVETICA, 22)
font_body_small = load_font(FONT_HELVETICA, 16)
font_tech = load_font(FONT_COURIER, 14)

def find_valid_image(folder_name):
    dir_path = os.path.join(PUBLIC_DIR, folder_name)
    if not os.path.exists(dir_path):
        return None
    files = os.listdir(dir_path)
    images = [os.path.join(dir_path, f) for f in files if f.endswith(('.jpeg', '.jpg', '.png'))]
    images.sort()
    if images:
        return images[0]
    return None

def create_intro_slide(data):
    # Luxury deep charcoal canvas
    img = Image.new("RGBA", (WIDTH, HEIGHT), (18, 18, 20, 255))
    draw = ImageDraw.Draw(img)
    
    # Elegant gold accent line
    draw.rectangle([0, 0, 15, HEIGHT], fill=(210, 198, 185, 255))
    
    # Asymmetric grid dividers
    draw.line([300, 0, 300, HEIGHT], fill=(255, 255, 255, 12), width=1)
    draw.line([0, 820, WIDTH, 820], fill=(255, 255, 255, 12), width=1)
    
    # Modern luxury typography
    draw.text((150, 280), "MRD / CREATIVE", font=font_massive, fill=(255, 255, 255, 255))
    draw.text((150, 390), data["subtitle"], font=font_body_large, fill=(210, 198, 185, 255))
    draw.text((150, 450), data["tagline"], font=font_tech, fill=(140, 140, 145, 255))
    
    # Swiss footers
    draw.text((150, 850), "INDEX_00 // INTRO", font=font_tech, fill=(255, 255, 255, 60))
    draw.text((800, 850), "◈ SYSTEM CALIBRATION: COMPLETE", font=font_tech, fill=(16, 185, 129, 200))
    draw.text((WIDTH - 300, 850), "VOGUE REEL ◈", font=font_tech, fill=(255, 255, 255, 60))
    
    return img

def draw_hud_elements(draw, slide_idx):
    # Fine editorial header labels
    draw.text((80, 50), f"VOL.04 // PAGE {slide_idx:02d}", font=font_tech, fill=(210, 198, 185, 200))
    draw.text((WIDTH - 250, 50), "STUDIO ARCHIVE ◈", font=font_tech, fill=(140, 140, 145, 180))
    draw.line([80, 80, WIDTH-80, 80], fill=(255, 255, 255, 12), width=1)

def create_image_slide(data, slide_idx):
    img_path = find_valid_image(data["folder"])
    
    # Dark lookbook backing
    slide_img = Image.new("RGBA", (WIDTH, HEIGHT), (18, 18, 20, 255))
    draw = ImageDraw.Draw(slide_img)
    
    if not img_path:
        draw.text((100, 100), f"No assets in folder: {data['folder']}", font=font_body_large, fill=(255, 0, 0, 255))
        return slide_img
        
    src_img = Image.open(img_path).convert("RGBA")
    src_w, src_h = src_img.size
    
    layout = data["layout"]
    
    # ── LAYOUT 1: SPLIT LEFT ──
    if layout == "split_left":
        img_w, img_h = 1140, 860
        ratio = min(img_w / src_w, img_h / src_h)
        new_w, new_h = int(src_w * ratio), int(src_h * ratio)
        fg_img = src_img.resize((new_w, new_h))
        
        offset_x = 80 + (img_w - new_w) // 2
        offset_y = 120 + (img_h - new_h) // 2
        slide_img.paste(fg_img, (offset_x, offset_y), fg_img)
        
        # 1px minimal border
        draw.rectangle([offset_x, offset_y, offset_x + new_w, offset_y + new_h], outline=(255, 255, 255, 20), width=1)
        
        # Sidebar dividing line
        draw.line([1260, 80, 1260, HEIGHT - 80], fill=(255, 255, 255, 12), width=1)
        
        # Text details
        draw.text((1300, 180), "CAMPAIGN ARCHIVE", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((1300, 210), data["tag"], font=font_title_medium, fill=(255, 255, 255, 255))
        
        draw.text((1300, 360), "PROJECT DESCRIPTION:", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((1300, 390), data["desc"], font=font_body_large, fill=(210, 198, 185, 255))
        
        draw.text((1300, 540), "PIPELINE / SYSTEM:", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((1300, 570), data["tech"], font=font_tech, fill=(255, 255, 255, 200))
        
        draw.text((1300, HEIGHT - 160), f"ARCHIVE_REF: 2026_SS", font=font_tech, fill=(255, 255, 255, 80))
        draw.text((1300, HEIGHT - 130), f"DIR: /{data['folder']}", font=font_tech, fill=(255, 255, 255, 40))
        
    # ── LAYOUT 2: SPLIT RIGHT ──
    elif layout == "split_right":
        img_w, img_h = 1140, 860
        ratio = min(img_w / src_w, img_h / src_h)
        new_w, new_h = int(src_w * ratio), int(src_h * ratio)
        fg_img = src_img.resize((new_w, new_h))
        
        offset_x = 700 + (img_w - new_w) // 2
        offset_y = 120 + (img_h - new_h) // 2
        slide_img.paste(fg_img, (offset_x, offset_y), fg_img)
        
        # 1px border
        draw.rectangle([offset_x, offset_y, offset_x + new_w, offset_y + new_h], outline=(255, 255, 255, 20), width=1)
        
        # Sidebar dividing line
        draw.line([660, 80, 660, HEIGHT - 80], fill=(255, 255, 255, 12), width=1)
        
        # Text details
        draw.text((80, 180), "STUDIO REEL SERIES", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((80, 210), data["tag"], font=font_title_medium, fill=(255, 255, 255, 255))
        
        draw.text((80, 360), "PROJECT DESCRIPTION:", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((80, 390), data["desc"], font=font_body_large, fill=(210, 198, 185, 255))
        
        draw.text((80, 540), "PIPELINE / SYSTEM:", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((80, 570), data["tech"], font=font_tech, fill=(255, 255, 255, 200))
        
        draw.text((80, HEIGHT - 160), f"ARCHIVE_REF: 2026_SS", font=font_tech, fill=(255, 255, 255, 80))
        draw.text((80, HEIGHT - 130), f"DIR: /{data['folder']}", font=font_tech, fill=(255, 255, 255, 40))
        
    # ── LAYOUT 3: TOP HEAVY ──
    elif layout == "top_heavy":
        img_w, img_h = 1760, 640
        ratio = min(img_w / src_w, img_h / src_h)
        new_w, new_h = int(src_w * ratio), int(src_h * ratio)
        fg_img = src_img.resize((new_w, new_h))
        
        offset_x = 80 + (img_w - new_w) // 2
        offset_y = 120 + (img_h - new_h) // 2
        slide_img.paste(fg_img, (offset_x, offset_y), fg_img)
        
        # Border
        draw.rectangle([offset_x, offset_y, offset_x + new_w, offset_y + new_h], outline=(255, 255, 255, 20), width=1)
        
        # Horizontal divider
        draw.line([80, 800, WIDTH-80, 800], fill=(255, 255, 255, 12), width=1)
        
        # Bottom columns
        draw.text((80, 830), "CATEGORY:", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((80, 865), data["tag"], font=font_body_large, fill=(255, 255, 255, 255))
        
        draw.line([560, 800, 560, HEIGHT - 80], fill=(255, 255, 255, 12), width=1)
        
        draw.text((590, 830), "PROJECT DESCRIPTION:", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((590, 865), data["desc"], font=font_body_large, fill=(210, 198, 185, 255))
        
        draw.line([1200, 800, 1200, HEIGHT - 80], fill=(255, 255, 255, 12), width=1)
        
        draw.text((1230, 830), "CORE PIPELINE:", font=font_tech, fill=(140, 140, 145, 255))
        draw.text((1230, 865), data["tech"], font=font_tech, fill=(255, 255, 255, 200))
        
    # ── LAYOUT 4: FULL HUD ──
    else:
        img_w, img_h = 1760, 860
        ratio = min(img_w / src_w, img_h / src_h)
        new_w, new_h = int(src_w * ratio), int(src_h * ratio)
        fg_img = src_img.resize((new_w, new_h))
        
        offset_x = 80 + (img_w - new_w) // 2
        offset_y = 120 + (img_h - new_h) // 2
        slide_img.paste(fg_img, (offset_x, offset_y), fg_img)
        
        # Border
        draw.rectangle([offset_x, offset_y, offset_x + new_w, offset_y + new_h], outline=(255, 255, 255, 30), width=1)
        
        # Elegant translucent panel overlay (bottom right)
        p_w, p_h = 560, 220
        p_x = offset_x + new_w - p_w - 40
        p_y = offset_y + new_h - p_h - 40
        
        # Dark solid premium block
        draw.rectangle([p_x, p_y, p_x + p_w, p_y + p_h], fill=(18, 18, 20, 235), outline=(255, 255, 255, 20), width=1)
        
        draw.text((p_x + 30, p_y + 30), "EDITORIAL DOSSIER ◈", font=font_tech, fill=(210, 198, 185, 255))
        draw.text((p_x + 30, p_y + 65), data["tag"], font=font_body_large, fill=(255, 255, 255, 255))
        draw.text((p_x + 30, p_y + 110), data["desc"], font=font_body_small, fill=(255, 255, 255, 180))
        draw.text((p_x + 30, p_y + 160), f"SYS: {data['tech']}", font=font_tech, fill=(16, 185, 129, 255))

    draw_hud_elements(draw, slide_idx)
    
    return slide_img

def create_outro_slide(data):
    img = Image.new("RGBA", (WIDTH, HEIGHT), (18, 18, 20, 255))
    draw = ImageDraw.Draw(img)
    
    # Elegant gold accent line
    draw.rectangle([0, 0, 15, HEIGHT], fill=(210, 198, 185, 255))
    
    # Dividers
    draw.line([300, 0, 300, HEIGHT], fill=(255, 255, 255, 12), width=1)
    draw.line([0, 820, WIDTH, 820], fill=(255, 255, 255, 12), width=1)
    
    # Outro typography
    draw.text((150, 280), data["title"], font=font_massive, fill=(255, 255, 255, 255))
    draw.text((150, 390), data["subtitle"], font=font_body_large, fill=(210, 198, 185, 255))
    draw.text((150, 450), data["tagline"], font=font_tech, fill=(140, 140, 145, 255))
    
    # Footers
    draw.text((150, 850), "INDEX_19 // OUTRO", font=font_tech, fill=(255, 255, 255, 60))
    draw.text((800, 850), "◈ RECRUITMENT STATUS: OPEN FOR DIRECT CONTRACTS", font=font_tech, fill=(16, 185, 129, 200))
    draw.text((WIDTH - 300, 850), "HIRE ON UPWORK ◈", font=font_tech, fill=(255, 255, 255, 60))
    
    return img

# ── 2. Render Frame Pipeline ──
print("Generating slide templates with dynamic human-edited layouts...")
slide_images = []
for idx, slide_data in enumerate(SLIDES_DATA):
    print(f"  Slide {idx+1}/{len(SLIDES_DATA)}: {slide_data['type']} (Folder: {slide_data.get('folder', 'custom')})...")
    if slide_data["type"] == "intro":
        slide_images.append(create_intro_slide(slide_data))
    elif slide_data["type"] == "outro":
        slide_images.append(create_outro_slide(slide_data))
    else:
        slide_images.append(create_image_slide(slide_data, idx))

print("\nGenerating transition frames at high-energy pace...")
frame_counter = 0

for i in range(len(slide_images)):
    curr_img = slide_images[i]
    
    # A. Static Stay frames
    for f in range(STAY_FRAMES):
        frame_path = os.path.join(TEMP_DIR, f"frame_{frame_counter:04d}.jpg")
        curr_img.convert("RGB").save(frame_path, "JPEG", quality=90)
        frame_counter += 1
        
    # B. Transition frames (to next slide, if not the last slide)
    if i < len(slide_images) - 1:
        next_img = slide_images[i+1]
        for f in range(TRANS_FRAMES):
            # Alpha goes from 0.0 to 1.0
            alpha = (f + 1) / (TRANS_FRAMES + 1)
            # Interpolate
            blended = Image.blend(curr_img, next_img, alpha)
            
            frame_path = os.path.join(TEMP_DIR, f"frame_{frame_counter:04d}.jpg")
            blended.convert("RGB").save(frame_path, "JPEG", quality=90)
            frame_counter += 1

print(f"\nGenerated {frame_counter} frames successfully.")

# ── 3. Compile with FFmpeg ──
print("\nCompiling video using FFmpeg...")
cmd = (
    f"ffmpeg -y -framerate {FPS} -i '{TEMP_DIR}/frame_%04d.jpg' "
    f"-c:v libx264 -pix_fmt yuv420p -profile:v high -level:v 4.0 -crf 20 "
    f"'{OUTPUT_VIDEO}'"
)

print(f"Running command: {cmd}")
ret = os.system(cmd)

if ret == 0:
    print(f"\n🎉 SUCCESS! Portfolio showcase video created at: {OUTPUT_VIDEO}")
    # Cleanup temp frames
    print("Cleaning up temporary frame assets...")
    for f in os.listdir(TEMP_DIR):
        os.remove(os.path.join(TEMP_DIR, f))
    os.rmdir(TEMP_DIR)
    sys.exit(0)
else:
    print("\n💥 FFmpeg compilation failed!")
    sys.exit(1)
