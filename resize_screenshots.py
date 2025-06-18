#!/usr/bin/env python3
"""
Script to resize screenshots in the images folder to 1320x2868 pixels
and save them to a new resized_screenshots folder with three variations:
1. distorted_fit: Screenshot stretched to exactly 1320x2868 px
2. scaled_with_space: Screenshot scaled down with space for text above
3. scaled_with_text: Screenshot scaled down with feature description text overlay
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFont
import glob
import json

# Configuration
TARGET_SIZE = (1320, 2868)
TEXT_SPACE_RATIO = 0.3
BOTTOM_PADDING_RATIO = 0.10  # Increased to 10%

# Theme configurations (from themes.js)
THEMES = {
    'cloud': {
        'topColor': (100, 114, 255),
        'bottomColor': (0, 4, 114),
        'accentColor': (255, 248, 148)
    },
    'chrome': {
        'topColor': (0, 0, 0),
        'bottomColor': (0, 65, 144),
        'accentColor': (146, 255, 255)
    },
    'mocha': {
        'topColor': (106, 84, 80),
        'bottomColor': (20, 15, 17),
        'accentColor': (255, 255, 255)
    },
    'mag': {
        'topColor': (199, 155, 161),
        'bottomColor': (186, 231, 194),
        'accentColor': (245, 255, 185)
    },
    'wheatgrass': {
        'topColor': (10, 31, 0),  # Adjusted from negative values
        'bottomColor': (0, 98, 66),  # Adjusted from negative values
        'accentColor': (150, 100, 255)
    },
    'scarab': {
        'topColor': (165, 61, 158),
        'bottomColor': (112, 112, 112),
        'accentColor': (204, 255, 141)
    }
}

# Feature descriptions mapping
FEATURE_DESCRIPTIONS = {
    'insights': 'Gain valuable insights into your journaling patterns and emotional trends',
    'stamps': 'Use custom stamps to quickly categorize and organize your entries',
    'calendar-schedule': 'Plan and schedule your journaling sessions with calendar integration',
    'privacy': 'Keep your thoughts secure with advanced privacy and encryption features',
    'customization': 'Personalize your journaling experience with themes and custom settings',
    'minimal-cognitive': 'Focus on writing with a clean, distraction-free interface',
    'search-organization': 'Find and organize your entries with powerful search and tagging',
    'easy-creation': 'Create beautiful journal entries quickly and effortlessly',
    'default screenshots': 'Experience the core journaling features designed for daily use'
}

def create_gradient_background(width, height, top_color, bottom_color):
    """Create a gradient background image."""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        # Calculate gradient ratio
        ratio = y / height
        # Interpolate between top and bottom colors
        r = int(top_color[0] * (1 - ratio) + bottom_color[0] * ratio)
        g = int(top_color[1] * (1 - ratio) + bottom_color[1] * ratio)
        b = int(top_color[2] * (1 - ratio) + bottom_color[2] * ratio)
        
        # Draw horizontal line with interpolated color
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def create_distorted_fit(input_path, output_path, target_size=TARGET_SIZE):
    """
    Create a version where the screenshot is stretched/distorted to fit exactly 1320x2868 px, with transparent background.
    """
    try:
        with Image.open(input_path) as img:
            # Always convert to RGBA to preserve alpha
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            # Resize to target size (distort)
            final_img = img.resize(target_size, Image.Resampling.LANCZOS)
            # Create a fully transparent background
            transparent_bg = Image.new('RGBA', target_size, (0, 0, 0, 0))
            # Composite the screenshot onto the transparent background using its alpha
            paste_with_alpha(transparent_bg, final_img, (0, 0))
            # Ensure output directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            # Save as PNG to preserve transparency
            transparent_bg.save(output_path.replace('.jpg', '.png'), 'PNG')
            print(f"Distorted fit: {input_path} -> {output_path.replace('.jpg', '.png')}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def create_scaled_with_space(input_path, output_path, target_size=TARGET_SIZE, text_space_ratio=TEXT_SPACE_RATIO, bottom_padding_ratio=0.03, theme_name='cloud'):
    """
    Move screenshot lower, with only a small gap (3%) at the bottom.
    """
    try:
        with Image.open(input_path) as img:
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            theme = THEMES.get(theme_name, THEMES['cloud'])
            top_color = theme['topColor']
            bottom_color = theme['bottomColor']
            text_space_height = int(target_size[1] * text_space_ratio)
            bottom_padding_height = int(target_size[1] * bottom_padding_ratio)
            image_space_height = target_size[1] - text_space_height - bottom_padding_height
            scale_factor = min(target_size[0] / img.width, image_space_height / img.height)
            new_width = int(img.width * scale_factor)
            new_height = int(img.height * scale_factor)
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            final_img = create_gradient_background(target_size[0], target_size[1], top_color, bottom_color).convert('RGBA')
            x_offset = (target_size[0] - new_width) // 2
            # Place screenshot as low as possible, leaving only the bottom gap
            y_offset = target_size[1] - bottom_padding_height - new_height
            paste_with_alpha(final_img, resized_img, (x_offset, y_offset))
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            final_img.convert('RGB').save(output_path, 'JPEG', quality=95)
            print(f"Scaled with space: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def create_scaled_with_text(input_path, output_path, target_size=TARGET_SIZE, text_space_ratio=TEXT_SPACE_RATIO, bottom_padding_ratio=0.03, theme_name='cloud', descriptions=None):
    """
    Move screenshot lower, bold text, less line spacing.
    """
    try:
        with Image.open(input_path) as img:
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            theme = THEMES.get(theme_name, THEMES['cloud'])
            top_color = theme['topColor']
            bottom_color = theme['bottomColor']
            accent_color = theme['accentColor']
            text_space_height = int(target_size[1] * text_space_ratio)
            bottom_padding_height = int(target_size[1] * bottom_padding_ratio)
            image_space_height = target_size[1] - text_space_height - bottom_padding_height
            scale_factor = min(target_size[0] / img.width, image_space_height / img.height)
            new_width = int(img.width * scale_factor)
            new_height = int(img.height * scale_factor)
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            final_img = create_gradient_background(target_size[0], target_size[1], top_color, bottom_color).convert('RGBA')
            x_offset = (target_size[0] - new_width) // 2
            y_offset = target_size[1] - bottom_padding_height - new_height
            paste_with_alpha(final_img, resized_img, (x_offset, y_offset))
            draw = ImageDraw.Draw(final_img)
            try:
                font_size = int(target_size[0] * 0.08)
                # Try bold system font
                font = ImageFont.truetype("/System/Library/Fonts/Helvetica Bold.ttf", font_size)
            except:
                try:
                    font = ImageFont.truetype("/System/Library/Fonts/Arial Bold.ttf", font_size)
                except:
                    font = ImageFont.load_default()
            rel_path = os.path.relpath(input_path, os.path.join(os.path.dirname(input_path), '..'))
            rel_path = rel_path.replace('images/screenshots/', '').replace('\\', '/').replace('\\', '/')
            description = None
            if descriptions:
                description = descriptions.get(rel_path)
            if not description:
                feature_name = get_feature_name_from_path(input_path)
                description = FEATURE_DESCRIPTIONS.get(feature_name, "Experience this amazing feature")
            max_width = int(target_size[0] * 0.7)
            wrapped_text = wrap_text(description, draw, font, max_width)
            lines = wrapped_text.split('\n')
            total_text_height = 0
            line_heights = []
            for line in lines:
                bbox = draw.textbbox((0, 0), line, font=font)
                h = bbox[3] - bbox[1]
                line_heights.append(h)
                total_text_height += h
            # Less line spacing (1.1x font size)
            line_spacing = int(font.size * 0.1)
            total_text_height += line_spacing * (len(lines) - 1)
            text_y = (text_space_height - total_text_height) // 2
            shadow_offset = 3
            for i, line in enumerate(lines):
                bbox = draw.textbbox((0, 0), line, font=font)
                text_width = bbox[2] - bbox[0]
                text_x = (target_size[0] - text_width) // 2
                draw.text((text_x + shadow_offset, text_y + shadow_offset), line, fill=(0, 0, 0), font=font)
                draw.text((text_x, text_y), line, fill=accent_color, font=font)
                text_y += line_heights[i] + line_spacing
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            final_img.convert('RGB').save(output_path, 'JPEG', quality=95)
            print(f"Scaled with text: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def get_feature_name_from_path(image_path):
    """Extract feature name from image path."""
    # Get the directory name that contains the image
    dir_name = os.path.basename(os.path.dirname(image_path))
    return dir_name

def wrap_text(text, draw, font, max_width):
    """Wrap text to fit within max_width with better line spacing."""
    words = text.split()
    lines = []
    current_line = []
    
    for word in words:
        current_line.append(word)
        test_line = ' '.join(current_line)
        bbox = draw.textbbox((0, 0), test_line, font=font)
        line_width = bbox[2] - bbox[0]
        
        if line_width > max_width:
            if len(current_line) == 1:
                # Single word is too long, keep it
                lines.append(test_line)
                current_line = []
            else:
                # Remove the last word and add current line
                current_line.pop()
                lines.append(' '.join(current_line))
                current_line = [word]
    
    # Add remaining words
    if current_line:
        lines.append(' '.join(current_line))
    
    # Add extra line spacing for better readability
    return '\n\n'.join(lines)  # Double line spacing

def load_descriptions(json_path):
    """Load per-screenshot descriptions from a JSON file."""
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def paste_with_alpha(bg, fg, position):
    """Paste fg onto bg at position, using fg's alpha if present."""
    if fg.mode in ('RGBA', 'LA'):
        bg.paste(fg, position, fg.split()[-1])
    else:
        bg.paste(fg, position)

def process_screenshots(input_dir, output_dir, target_size=TARGET_SIZE, theme_name='cloud'):
    """
    Process all screenshots in the input directory and its subdirectories.
    Creates three variations for each screenshot.
    """
    # Create output directories
    distorted_dir = os.path.join(output_dir, 'distorted_fit')
    scaled_dir = os.path.join(output_dir, 'scaled_with_space')
    text_dir = os.path.join(output_dir, 'scaled_with_text')
    os.makedirs(distorted_dir, exist_ok=True)
    os.makedirs(scaled_dir, exist_ok=True)
    os.makedirs(text_dir, exist_ok=True)
    
    # Supported image extensions
    image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.bmp', '*.tiff', '*.tif', '*.PNG', '*.JPG', '*.JPEG']
    
    # Find all image files in screenshots directory recursively
    image_files = []
    screenshots_dir = os.path.join(input_dir, 'screenshots')
    if os.path.exists(screenshots_dir):
        for ext in image_extensions:
            pattern = os.path.join(screenshots_dir, '**', ext)
            image_files.extend(glob.glob(pattern, recursive=True))
    
    print(f"Found {len(image_files)} screenshot files to process")
    print(f"Using theme: {theme_name}")
    
    # Load per-screenshot descriptions
    descriptions_path = os.path.join(input_dir, 'screenshots', 'descriptions.json')
    descriptions = load_descriptions(descriptions_path)
    
    # Process each screenshot
    for image_path in image_files:
        # Calculate relative path from screenshots directory
        rel_path = os.path.relpath(image_path, screenshots_dir)
        
        # Create output paths for all three variations
        distorted_path = os.path.join(distorted_dir, rel_path)
        scaled_path = os.path.join(scaled_dir, rel_path)
        text_path = os.path.join(text_dir, rel_path)
        
        # Change extension to .jpg for consistency
        distorted_path = os.path.splitext(distorted_path)[0] + '.jpg'
        scaled_path = os.path.splitext(scaled_path)[0] + '.jpg'
        text_path = os.path.splitext(text_path)[0] + '.jpg'
        
        # Create all three variations
        create_distorted_fit(image_path, distorted_path, target_size)
        create_scaled_with_space(image_path, scaled_path, target_size, theme_name=theme_name)
        create_scaled_with_text(image_path, text_path, target_size, theme_name=theme_name, descriptions=descriptions)
    
    print(f"Resized screenshots saved to: {output_dir}")

def main():
    # Define paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_dir = os.path.join(current_dir, 'images')
    output_dir = os.path.join(current_dir, 'resized_screenshots')
    
    # Check if input directory exists
    if not os.path.exists(input_dir):
        print(f"Error: Input directory '{input_dir}' does not exist")
        sys.exit(1)
    
    # Default theme (can be changed)
    theme_name = 'cloud'
    
    print(f"Processing screenshots from: {input_dir}")
    print(f"Output directory: {output_dir}")
    print(f"Target size: {TARGET_SIZE[0]}x{TARGET_SIZE[1]} pixels")
    print(f"Using theme: {theme_name}")
    print(f"Bottom padding: {BOTTOM_PADDING_RATIO * 100}%")
    print("Creating three variations:")
    print("1. distorted_fit: Screenshot stretched to exactly 1320x2868 px")
    print("2. scaled_with_space: Screenshot scaled down with gradient background")
    print("3. scaled_with_text: Screenshot scaled down with feature description text overlay")
    print("-" * 80)
    
    # Process all screenshots
    process_screenshots(input_dir, output_dir, target_size=TARGET_SIZE, theme_name=theme_name)
    
    print("-" * 80)
    print("Screenshot resizing completed!")

if __name__ == "__main__":
    main() 