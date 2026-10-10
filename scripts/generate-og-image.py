#!/usr/bin/env python3
"""
Generates public/og-image.png (1200×630) for AI for Academic Libraries.
Run from project root: python3 scripts/generate-og-image.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Canvas
WIDTH, HEIGHT = 1200, 630
OUTPUT = os.path.join(os.path.dirname(__file__), "..", "public", "og-image.png")

# Palette
GREEN       = "#0F6E56"
STONE_DARK  = "#44403c"
STONE_MID   = "#78716c"
WHITE       = "#ffffff"

# Font paths
GEORGIA_BOLD    = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
GEORGIA_REGULAR = "/System/Library/Fonts/Supplemental/Georgia.ttf"
SANS            = "/System/Library/Fonts/SFNS.ttf"

MARGIN_LEFT  = 80
MARGIN_RIGHT = 60

def load(path, size):
    return ImageFont.truetype(path, size)

def fit_font(path, text, max_width, max_size, min_size=40):
    """Return the largest font size that fits text within max_width."""
    for size in range(max_size, min_size - 1, -1):
        if load(path, size).getlength(text) <= max_width:
            return load(path, size)
    return load(path, min_size)

img  = Image.new("RGB", (WIDTH, HEIGHT), WHITE)
draw = ImageDraw.Draw(img)

# ── Top accent line ──────────────────────────────────────────────────────────
draw.rectangle([0, 0, WIDTH, 6], fill=GREEN)

# ── Fonts ────────────────────────────────────────────────────────────────────
title_max_w = WIDTH - MARGIN_LEFT - MARGIN_RIGHT - 20
f_title    = fit_font(GEORGIA_BOLD, "AI for Academic Libraries", title_max_w, 88)
f_subtitle = load(SANS,            36)
f_tagline  = load(SANS,            24)
f_byline   = load(SANS,            20)

# ── Layout ───────────────────────────────────────────────────────────────────
TOP_START = 6 + 80    # below accent line + 80px spacing

# Title
title_text = "AI for Academic Libraries"
draw.text((MARGIN_LEFT, TOP_START), title_text, font=f_title, fill=GREEN)
title_bbox   = draw.textbbox((MARGIN_LEFT, TOP_START), title_text, font=f_title)
title_bottom = title_bbox[3]

# Subtitle
subtitle_text = "Curriculum for Academic Library Workers"
subtitle_y = title_bottom + 24
draw.text((MARGIN_LEFT, subtitle_y), subtitle_text, font=f_subtitle, fill=STONE_DARK)
subtitle_bbox   = draw.textbbox((MARGIN_LEFT, subtitle_y), subtitle_text, font=f_subtitle)
subtitle_bottom = subtitle_bbox[3]

# Tagline — two lines
tagline_line1 = "Mapped to ACRL AI Competencies (2025)"
tagline_line2 = "Grounded in the 4D Framework from Anthropic’s AI Fluency course"
tagline_y = subtitle_bottom + 24
draw.text((MARGIN_LEFT, tagline_y), tagline_line1, font=f_tagline, fill=STONE_MID)
bbox1 = draw.textbbox((MARGIN_LEFT, tagline_y), tagline_line1, font=f_tagline)
draw.text((MARGIN_LEFT, bbox1[3] + 6), tagline_line2, font=f_tagline, fill=STONE_MID)

# Bottom-left: by Yulia Brusova
byline_y = HEIGHT - 50 - 20
draw.text((MARGIN_RIGHT, byline_y), "by Yulia Brusova", font=f_byline, fill=STONE_MID)

# Bottom-right: site URL (right-aligned)
url_text = "ai-in-academic-libraries.vercel.app"
url_bbox = draw.textbbox((0, 0), url_text, font=f_byline)
url_w    = url_bbox[2] - url_bbox[0]
url_x    = WIDTH - MARGIN_RIGHT - url_w
draw.text((url_x, byline_y), url_text, font=f_byline, fill=GREEN)

# ── Save ─────────────────────────────────────────────────────────────────────
img.save(OUTPUT, "PNG", optimize=True)
print(f"Saved: {os.path.abspath(OUTPUT)}")
print(f"Size:  {os.path.getsize(OUTPUT):,} bytes")
