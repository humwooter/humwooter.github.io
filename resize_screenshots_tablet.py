#!/usr/bin/env python3
"""
Script to resize tablet screenshots in the images/Logs/screenshots tablet folder to iPad landscape dimensions (2732x2048 px)
and save them to a new resized_screenshots_tablet folder with three variations:
1. distorted_fit: Screenshot stretched to exactly 2732x2048 px
2. scaled_with_space: Screenshot scaled down with space for text above
3. scaled_with_text: Screenshot scaled down with feature description text overlay

The text overlay will depend on the folder the image belongs to, using the descriptions.json file.
"""

import os
import json
from PIL import Image, ImageDraw, ImageFont
import glob

# Configuration
TARGET_SIZE = (2732, 2048)  # iPad landscape
TEXT_SPACE_RATIO = 0.15  # Reduced from 0.2 to 0.15 to make text field smaller
BOTTOM_PADDING_RATIO = 0.05  # 5% bottom padding

# Theme configurations (from themes.js)
THEMES = {
    'cloud': {
        'topColor': (100, 114, 255),
        'bottomColor': (0, 4, 114),
        'accentColor': (255, 248, 148),
        'textColor': (255, 255, 255)
    },
    'chrome': {
        'topColor': (0, 0, 0),
        'bottomColor': (0, 65, 144),
        'accentColor': (146, 255, 255),
        'textColor': (255, 255, 255)
    },
    'mocha': {
        'topColor': (106, 84, 80),
        'bottomColor': (20, 15, 17),
        'accentColor': (255, 255, 255),
        'textColor': (255, 255, 255)
    },
    'mag': {
        'topColor': (199, 155, 161),
        'bottomColor': (186, 231, 194),
        'accentColor': (245, 255, 185),
        'textColor': (0, 0, 0)
    },
    'wheatgrass': {
        'topColor': (10, 31, 0),
        'bottomColor': (0, 98, 66),
        'accentColor': (150, 100, 255),
        'textColor': (255, 255, 255)
    },
    'scarab': {
        'topColor': (165, 61, 158),
        'bottomColor': (112, 112, 112),
        'accentColor': (204, 255, 141),
        'textColor': (255, 255, 255)
    },
    'hyacinth': {
    'topColor': (128, 125, 255),
    'bottomColor': (88, 184, 255),
    'accentColor': (255, 189, 201),
    'textColor': (0, 0, 0)
    }
}

FONT_PATH = 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf'

# Mapping of actual tablet filenames to descriptions.json entries
TABLET_TO_DESCRIPTIONS_MAPPING = {
    'calendar-schedule/1.PNG': 'calendar-schedule/1.png',
    'customization/1.PNG': 'customization/1.png',
    'easy-creation/2.PNG': 'easy-creation/2.png',
    'easy-creation/3.PNG': 'easy-creation/3.png',
    'insights/IMG_0195.PNG': 'insights/1.png',  # Map IMG_0195 to insights/1
    'minimal-cognitive/3.PNG': 'minimal-cognitive/3.png',
    'privacy/1.PNG': 'privacy/1.png',
    'search-organization/1.PNG': 'search-organization/1.png',
    'search-organization/4.PNG': 'search-organization/4.png',
    'stamps/2.PNG': 'stamps/1.png',  # Map stamps/2 to stamps/1 since there's no stamps/2 in descriptions
}

def load_descriptions(json_path):
    """Load descriptions from JSON file."""
    try:
        with open(json_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Warning: {json_path} not found. Using placeholder descriptions.")
        return {}

def create_gradient_background(width, height, top_color, bottom_color):
    """Create a gradient background image."""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        ratio = y / height
        r = int(top_color[0] * (1 - ratio) + bottom_color[0] * ratio)
        g = int(top_color[1] * (1 - ratio) + bottom_color[1] * ratio)
        b = int(top_color[2] * (1 - ratio) + bottom_color[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def create_distorted_fit(input_path, output_path, target_size=TARGET_SIZE):
    """
    Stretch the screenshot to fit exactly the iPad landscape size.
    """
    try:
        with Image.open(input_path) as img:
            img = img.convert('RGB')
            final_img = img.resize(target_size, Image.Resampling.LANCZOS)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            final_img.save(output_path, 'JPEG', quality=95)
            print(f"Distorted fit: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def create_scaled_with_space(input_path, output_path, target_size=TARGET_SIZE, text_space_ratio=TEXT_SPACE_RATIO, bottom_padding_ratio=BOTTOM_PADDING_RATIO, theme_name='cloud', descriptions=None, rel_path=None):
    """
    Scale screenshot down, leave space for text at the top.
    """
    try:
        theme_to_use = theme_name
        if descriptions and rel_path in descriptions:
            entry = descriptions[rel_path]
            if isinstance(entry, dict) and 'theme' in entry:
                theme_to_use = entry['theme']
        theme = THEMES.get(theme_to_use, THEMES['cloud'])
        
        with Image.open(input_path) as img:
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            text_space_height = int(target_size[1] * text_space_ratio)
            bottom_padding_height = int(target_size[1] * bottom_padding_ratio)
            image_space_height = target_size[1] - text_space_height - bottom_padding_height
            img_ratio = img.size[0] / img.size[1]
            max_width = int(target_size[0] * 0.95)  # Reduced by 5% to make screenshot smaller
            max_height = int(image_space_height * 0.95)  # Reduced by 5% to make screenshot smaller
            if img_ratio > max_width / max_height:
                new_width = max_width
                new_height = int(max_width / img_ratio)
            else:
                new_height = max_height
                new_width = int(max_height * img_ratio)
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            final_img = create_gradient_background(target_size[0], target_size[1], theme['topColor'], theme['bottomColor']).convert('RGBA')
            x_offset = (target_size[0] - new_width) // 2
            y_offset = text_space_height + int(text_space_height * 0.14)  # Reduced from 0.2 to 0.14 (30% decrease)
            paste_with_alpha(final_img, resized_img, (x_offset, y_offset))
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            final_img.convert('RGB').save(output_path, 'JPEG', quality=95)
            print(f"Scaled with space: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def create_scaled_with_text(input_path, output_path, feature_name, target_size=TARGET_SIZE, text_space_ratio=TEXT_SPACE_RATIO, bottom_padding_ratio=BOTTOM_PADDING_RATIO, theme_name='cloud', descriptions=None, rel_path=None):
    """
    Scale screenshot down, overlay actual description text at the top.
    """
    try:
        theme_to_use = theme_name
        if descriptions and rel_path in descriptions:
            entry = descriptions[rel_path]
            if isinstance(entry, dict) and 'theme' in entry:
                theme_to_use = entry['theme']
        theme = THEMES.get(theme_to_use, THEMES['cloud'])
        
        with Image.open(input_path) as img:
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            text_space_height = int(target_size[1] * text_space_ratio)
            bottom_padding_height = int(target_size[1] * bottom_padding_ratio)
            image_space_height = target_size[1] - text_space_height - bottom_padding_height
            img_ratio = img.size[0] / img.size[1]
            max_width = int(target_size[0] * 0.95)  # Reduced by 5% to make screenshot smaller
            max_height = int(image_space_height * 0.95)  # Reduced by 5% to make screenshot smaller
            if img_ratio > max_width / max_height:
                new_width = max_width
                new_height = int(max_width / img_ratio)
            else:
                new_height = max_height
                new_width = int(max_height * img_ratio)
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            final_img = create_gradient_background(target_size[0], target_size[1], theme['topColor'], theme['bottomColor']).convert('RGBA')
            x_offset = (target_size[0] - new_width) // 2
            y_offset = text_space_height + int(text_space_height * 0.14)  # Reduced from 0.2 to 0.14 (30% decrease)
            paste_with_alpha(final_img, resized_img, (x_offset, y_offset))
            
            # Draw text
            draw = ImageDraw.Draw(final_img)
            try:
                title_font = ImageFont.truetype(FONT_PATH, size=int(text_space_height * 0.25))
                desc_font = ImageFont.truetype(FONT_PATH, size=int(text_space_height * 0.16))  # Increased from 0.12 to 0.16
            except:
                title_font = ImageFont.load_default()
                desc_font = ImageFont.load_default()
            
            # Get actual description from JSON using mapping
            if descriptions and rel_path in descriptions:
                entry = descriptions[rel_path]
                title = entry.get('title', feature_name)
                description = entry.get('description', '')
                
                # Draw title with accent color and top padding (moved up more)
                title_bbox = draw.textbbox((0, 0), title, font=title_font)
                title_width = title_bbox[2] - title_bbox[0]
                title_x = (target_size[0] - title_width) // 2
                title_y = text_space_height * 0.35  # Increased from 0.25 to 0.35 to move title down more
                draw.text((title_x, title_y), title, fill=theme['accentColor'], font=title_font)
                
                # Draw description (wrapped if needed) with increased spacing
                desc_y = title_y + int(text_space_height * 0.45)  # Increased from 0.3 to 0.45
                words = description.split()
                lines = []
                current_line = []
                
                for word in words:
                    test_line = ' '.join(current_line + [word])
                    bbox = draw.textbbox((0, 0), test_line, font=desc_font)
                    if bbox[2] - bbox[0] <= target_size[0] * 0.8:  # 80% of width
                        current_line.append(word)
                    else:
                        if current_line:
                            lines.append(' '.join(current_line))
                            current_line = [word]
                        else:
                            current_line = [word]
                
                if current_line:
                    lines.append(' '.join(current_line))
                
                for line in lines:
                    if line.strip():
                        desc_bbox = draw.textbbox((0, 0), line, font=desc_font)
                        desc_width = desc_bbox[2] - desc_bbox[0]
                        desc_x = (target_size[0] - desc_width) // 2
                        draw.text((desc_x, desc_y), line, fill=theme['textColor'], font=desc_font)
                        desc_y += int(text_space_height * 0.2)
            else:
                # Fallback to feature name
                bbox = draw.textbbox((0, 0), feature_name, font=title_font)
                text_width = bbox[2] - bbox[0]
                text_x = (target_size[0] - text_width) // 2
                text_y = text_space_height * 0.4
                draw.text((text_x, text_y), feature_name, fill=theme['accentColor'], font=title_font)
            
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            final_img.convert('RGB').save(output_path, 'JPEG', quality=95)
            print(f"Scaled with text: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def paste_with_alpha(bg, fg, position):
    """Paste fg onto bg at position, using fg's alpha if present."""
    if fg.mode in ('RGBA', 'LA'):
        bg.paste(fg, position, fg.split()[-1])
    else:
        bg.paste(fg, position)

def process_screenshots(input_dir, output_dir, target_size=TARGET_SIZE, theme_name='cloud'):
    descriptions = load_descriptions(os.path.join(input_dir, 'descriptions.json'))
    
    for feature_folder in os.listdir(input_dir):
        folder_path = os.path.join(input_dir, feature_folder)
        if not os.path.isdir(folder_path) or feature_folder == '__pycache__':
            continue
            
        # Look for both .png and .PNG files
        for img_file in glob.glob(os.path.join(folder_path, '*.png')) + glob.glob(os.path.join(folder_path, '*.PNG')):
            base = os.path.basename(img_file)
            rel_path = f"{feature_folder}/{base}"
            
            # Map to descriptions.json entry
            mapped_path = TABLET_TO_DESCRIPTIONS_MAPPING.get(rel_path, rel_path)
            
            # Distorted fit
            out1 = os.path.join(output_dir, 'distorted_fit', feature_folder, base.replace('.png', '.jpg').replace('.PNG', '.jpg'))
            create_distorted_fit(img_file, out1, target_size)
            
            # Scaled with space
            out2 = os.path.join(output_dir, 'scaled_with_space', feature_folder, base.replace('.png', '.jpg').replace('.PNG', '.jpg'))
            create_scaled_with_space(img_file, out2, target_size, theme_name=theme_name, descriptions=descriptions, rel_path=mapped_path)
            
            # Scaled with text
            out3 = os.path.join(output_dir, 'scaled_with_text', feature_folder, base.replace('.png', '.jpg').replace('.PNG', '.jpg'))
            create_scaled_with_text(img_file, out3, feature_folder, target_size, theme_name=theme_name, descriptions=descriptions, rel_path=mapped_path)

def main():
    import argparse

    parser = argparse.ArgumentParser(description="Resize tablet screenshots (3 variations).")
    parser.add_argument("--input-dir", required=False, help="Folder that contains feature folders + descriptions.json")
    parser.add_argument("--output-dir", required=False, help="Where to write resized outputs")
    parser.add_argument("--theme-name", default="cloud")
    args = parser.parse_args()

    # default behavior (keeps script runnable standalone from repo root)
    if args.input_dir is None:
        args.input_dir = os.path.join("images", "screenshots tablet")
    if args.output_dir is None:
        args.output_dir = "resized_screenshots_tablet"

    process_screenshots(args.input_dir, args.output_dir, theme_name=args.theme_name)

if __name__ == '__main__':
    main() 