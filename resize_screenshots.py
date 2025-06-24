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
        'topColor': (10, 31, 0),  # Adjusted from negative values
        'bottomColor': (0, 98, 66),  # Adjusted from negative values
        'accentColor': (150, 100, 255),
        'textColor': (255, 255, 255)
    },
    'scarab': {
        'topColor': (165, 61, 158),
        'bottomColor': (112, 112, 112),
        'accentColor': (204, 255, 141),
        'textColor': (255, 255, 255)
    }
}

font = 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf'

# Map theme fontName to system font names (no TTF files needed)
THEME_FONT_PATHS = {
    'cloud': 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf',  # Custom handwriting font
    'chrome': 'LucidaGrande',  # Bold monospace, safe for commercial use
    'mocha': 'Avenir',  # Safe system font, free for commercial use
    'scarab': 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf',  # Safe system font, free for commercial use
    'wheatgrass': 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf',  # Safe system font, free for commercial use
    'mag': font,  # Safe system font, free for commercial use
}

    # # 'cloud': 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf',
    # 'chrome': 'Fonts/brass-mono/BrassMono-Bold.ttf',
    # # 'mocha': 'Fonts/Catbrother/Catbrother.ttf',
    # 'scarab': 'Fonts/brass-mono/BrassMono-Bold.ttf',
    # 'wheatgrass': 'Fonts/brass-mono/BrassMono-Bold.ttf',
    # 'mag': 'Fonts/brass-mono/BrassMono-Bold.ttf',


# Map theme fontName to bold system font names for titles
THEME_BOLD_FONT_PATHS = {
    'cloud': 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf',  # Custom handwriting font
    'chrome': 'LucidaGrande-Bold',  # Bold monospace, safe for commercial use
    # 'chrome': 'Courier-Bold',  # Bold monospace, safe for commercial use
    'mocha': 'Avenir-Bold',  # Bold version, safe for commercial use
    'scarab': 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf',  # Bold monospace, safe for commercial use
    'wheatgrass': 'Monaco-Bold',  # Bold monospace, safe for commercial use
    'mag': 'Fonts/Original Fonts/KatyasHandwriting-Regular.ttf',  # Bold version, safe for commercial use
}

# Font size multipliers for different font types (display fonts need larger sizes)
FONT_SIZE_MULTIPLIERS = {
    'cloud': 1.0,  # Regular font
    'chrome': 1.0,  # Monospace font
    'mocha': 1.0,   # Display font - needs much larger size
    'scarab': 1.0,  # Monospace font
    'wheatgrass': 1.0,  # Monospace font
    'mag': 1.1,  # Regular font
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

def create_scaled_with_space(input_path, output_path, target_size=TARGET_SIZE, text_space_ratio=TEXT_SPACE_RATIO, bottom_padding_ratio=0.03, theme_name='cloud', descriptions=None, rel_path=None):
    """
    Move screenshot lower, with only a small gap (3%) at the bottom.
    """
    try:
        # Determine theme from descriptions if available
        theme_to_use = theme_name
        if descriptions and rel_path in descriptions:
            entry = descriptions[rel_path]
            if isinstance(entry, dict) and 'theme' in entry:
                theme_to_use = entry['theme']
        theme = THEMES.get(theme_to_use, THEMES['cloud'])
        with Image.open(input_path) as img:
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            top_color = theme['topColor']
            bottom_color = theme['bottomColor']
            text_space_height = int(target_size[1] * text_space_ratio)
            bottom_padding_height = int(target_size[1] * bottom_padding_ratio)
            image_space_height = target_size[1] - text_space_height - bottom_padding_height
            
            # Calculate scaling to fit in image space with 1.1 factor
            img_ratio = img.size[0] / img.size[1]
            max_width = int(target_size[0] * 1.1)  # Use 1.1 scaling for consistency
            max_height = int(image_space_height * 1.1)  # Use 1.1 scaling for consistency
            
            if img_ratio > max_width / max_height:
                new_width = max_width
                new_height = int(max_width / img_ratio)
            else:
                new_height = max_height
                new_width = int(max_height * img_ratio)
            
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            final_img = create_gradient_background(target_size[0], target_size[1], top_color, bottom_color).convert('RGBA')
            x_offset = (target_size[0] - new_width) // 2
            # Maintain the same bottom gap as before (3% of target height)
            bottom_gap = int(target_size[1] * 0.0258)  # Reduced from 0.03 to 0.0258 (14% decrease)
            y_offset = target_size[1] - bottom_gap - new_height - int(new_height * 0.05)  # Moved up by 5%
            paste_with_alpha(final_img, resized_img, (x_offset, y_offset))
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            final_img.convert('RGB').save(output_path, 'JPEG', quality=95)
            print(f"Scaled with space: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def create_scaled_with_text(input_path, output_path, target_size=TARGET_SIZE, text_space_ratio=TEXT_SPACE_RATIO, bottom_padding_ratio=0.03, theme_name='cloud', descriptions=None, rel_path=None):
    try:
        # Determine theme from descriptions if available
        theme_to_use = theme_name
        title_text = ""
        description_text = ""
        
        if descriptions and rel_path in descriptions:
            entry = descriptions[rel_path]
            if isinstance(entry, dict):
                if 'theme' in entry:
                    theme_to_use = entry['theme']
                if 'title' in entry:
                    title_text = entry['title']
                if 'description' in entry:
                    description_text = entry['description']
        
        # Fallback to feature description if no custom description
        if not description_text:
            feature_name = rel_path.split('/')[0] if '/' in rel_path else 'default'
            description_text = FEATURE_DESCRIPTIONS.get(feature_name, "Journal your thoughts with ease")
        
        theme = THEMES.get(theme_to_use, THEMES['cloud'])
        top_color = theme['topColor']
        bottom_color = theme['bottomColor']
        accent_color = theme['accentColor']
        
        # Calculate available space for the image (bottom portion minus bottom padding)
        text_space_height = int(target_size[1] * text_space_ratio)
        bottom_padding = int(target_size[1] * bottom_padding_ratio)
        image_space_height = target_size[1] - text_space_height - bottom_padding
        
        # Create gradient background
        final_img = Image.new('RGB', target_size)
        draw = ImageDraw.Draw(final_img)
        
        # Create gradient
        for y in range(target_size[1]):
            ratio = y / target_size[1]
            r = int(top_color[0] * (1 - ratio) + bottom_color[0] * ratio)
            g = int(top_color[1] * (1 - ratio) + bottom_color[1] * ratio)
            b = int(top_color[2] * (1 - ratio) + bottom_color[2] * ratio)
            draw.line([(0, y), (target_size[0], y)], fill=(r, g, b))
        
        # Load and resize screenshot
        with Image.open(input_path) as img:
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Calculate scaling to fit in image space
            img_ratio = img.size[0] / img.size[1]
            max_width = int(target_size[0] * 1.1)  # Use 1.1 scaling for consistency
            max_height = int(image_space_height * 1.1)  # Use 1.1 scaling for consistency
            
            if img_ratio > max_width / max_height:
                new_width = max_width
                new_height = int(max_width / img_ratio)
            else:
                new_height = max_height
                new_width = int(max_height * img_ratio)
            
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Position image at bottom center with minimal gap
            x_offset = (target_size[0] - new_width) // 2
            # Maintain the same bottom gap as before (3% of target height)
            bottom_gap = int(target_size[1] * 0.0258)  # Reduced from 0.03 to 0.0258 (14% decrease)
            y_offset = target_size[1] - bottom_gap - new_height   # Moved up by 5%
            
            # Composite image onto gradient background
            paste_with_alpha(final_img, resized_img, (x_offset, y_offset))
        
        # Add text overlay
        draw = ImageDraw.Draw(final_img)
        
        # Load fonts
        font_path = get_font_path(theme_to_use)
        bold_font_path = THEME_BOLD_FONT_PATHS.get(theme_to_use, font_path)
        base_description_font_size = int(target_size[0] * 0.04)  # 4% of width
        base_title_font_size = int(base_description_font_size * 1.99)  # 1.5x the description size
        
        # Apply font size multiplier for display fonts
        font_multiplier = FONT_SIZE_MULTIPLIERS.get(theme_to_use, 1.0)
        description_font_size = int(base_description_font_size * font_multiplier)
        title_font_size = int(base_title_font_size * font_multiplier)
        
        try:
            # Load system fonts with proper sizing
            title_font = load_system_font(bold_font_path, title_font_size)
            description_font = load_system_font(font_path, description_font_size)
        except Exception:
            # Fallback to default font if system font not found
            title_font = ImageFont.load_default()
            description_font = ImageFont.load_default()
        
        # Calculate text positioning
        text_y = int(text_space_height * 0.2)  # Start at 20% of text space

        # Draw title if available
        if title_text:
            title_lines = wrap_text(title_text, title_font, target_size[0] * 0.8)
            title_heights = [title_font.getbbox(line)[3] for line in title_lines]
            for i, line in enumerate(title_lines):
                bbox = draw.textbbox((0, 0), line, font=title_font)
                text_width = bbox[2] - bbox[0]
                text_x = (target_size[0] - text_width) // 2
                draw.text((text_x, text_y), line, fill=accent_color, font=title_font)
                text_y += title_heights[i] + int(title_font_size * 0.001)
            # Reduce the gap after the title to match the gap below the description
            title_gap = int(title_font_size * 0.08)
            text_y += title_gap
        title_bottom = text_y  # Record the bottom of the title block

        # Prepare description block for centering
        desc_block_height = 0
        desc_lines = []
        desc_heights = []
        if description_text:
            desc_lines = wrap_text(description_text, description_font, target_size[0] * 0.8)
            desc_heights = [description_font.getbbox(line)[3] for line in desc_lines]
            for i in range(len(desc_lines)):
                desc_block_height += desc_heights[i] + int(description_font_size * 0.08)

        # Calculate where the screenshot starts
        screenshot_top = y_offset  # y_offset is where the screenshot starts
        # Center description block between title_bottom and screenshot_top
        desc_start_y = title_bottom + ((screenshot_top - title_bottom - desc_block_height) // 2)

        # Draw description
        if description_text:
            text_y = desc_start_y
            for i, line in enumerate(desc_lines):
                bbox = draw.textbbox((0, 0), line, font=description_font)
                text_width = bbox[2] - bbox[0]
                text_x = (target_size[0] - text_width) // 2
                draw.text((text_x, text_y), line, fill=theme['textColor'], font=description_font)
                text_y += desc_heights[i] + int(description_font_size * 0.08)

        # Save the image
        final_img.save(output_path, 'PNG', quality=95)
        print(f"Scaled with text: {input_path} -> {output_path}")
        
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def get_feature_name_from_path(image_path):
    """Extract feature name from image path."""
    # Get the directory name that contains the image
    dir_name = os.path.basename(os.path.dirname(image_path))
    return dir_name

def wrap_text(text, font, max_width):
    """Wrap text to fit within max_width using the given font."""
    words = text.split()
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = ImageDraw.Draw(Image.new('RGB', (1, 1))).textbbox((0, 0), test_line, font=font)
        text_width = bbox[2] - bbox[0]
        
        if text_width <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                # Word is too long, add it anyway
                lines.append(word)
                current_line = []
    
    if current_line:
        lines.append(' '.join(current_line))
    
    return lines if lines else [text]

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

        # Skip images in 'default screenshots' folder
        if rel_path.startswith('default screenshots/'):
            continue

        # Create output paths for all three variations
        distorted_path = os.path.join(distorted_dir, rel_path)
        scaled_path = os.path.join(scaled_dir, rel_path)
        text_path = os.path.join(text_dir, rel_path)
        distorted_path = os.path.splitext(distorted_path)[0] + '.jpg'
        scaled_path = os.path.splitext(scaled_path)[0] + '.jpg'
        text_path = os.path.splitext(text_path)[0] + '.jpg'
        create_distorted_fit(image_path, distorted_path, target_size)
        create_scaled_with_space(image_path, scaled_path, target_size, theme_name=theme_name, descriptions=descriptions, rel_path=rel_path)
        create_scaled_with_text(image_path, text_path, target_size, theme_name=theme_name, descriptions=descriptions, rel_path=rel_path)
    
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

def get_font_path(theme_name):
    return THEME_FONT_PATHS.get(theme_name, 'Helvetica')  # Safe fallback font

def get_system_font_path(font_name):
    """Get the actual file path for a system font on macOS or custom TTF files."""
    # Check if it's already a file path (custom TTF)
    if font_name.endswith('.ttf') and os.path.exists(font_name):
        return font_name
    
    # Common macOS font locations
    font_locations = [
        '/System/Library/Fonts',
        '/Library/Fonts',
        '/System/Library/Fonts/Supplemental'
    ]
    
    # Map font names to actual file names - ONLY safe Apple fonts
    font_mapping = {
        # Safe sans-serif fonts (Apple fonts)
        'Helvetica': 'Helvetica.ttc',
        'Helvetica-Bold': 'Helvetica.ttc',
        'HelveticaNeue': 'HelveticaNeue.ttc',
        'HelveticaNeue-Bold': 'HelveticaNeue.ttc',
        'Avenir': 'Avenir.ttc',
        'Avenir-Bold': 'Avenir.ttc',
        'AvenirNext': 'Avenir Next.ttc',
        'AvenirNext-Bold': 'Avenir Next.ttc',
        'Geneva': 'Geneva.ttf',
        'Geneva-Bold': 'Geneva.ttf',
        'LucidaGrande': 'LucidaGrande.ttc',
        'LucidaGrande-Bold': 'LucidaGrande.ttc',
        
        # Safe monospace fonts (Apple fonts)
        'Courier': 'Courier.ttc',
        'Courier-Bold': 'Courier.ttc',
        'Menlo': 'Menlo.ttc',
        'Menlo-Bold': 'Menlo.ttc',
        'Monaco': 'Monaco.ttf',
        'Monaco-Bold': 'Monaco.ttf',
        
        # Safe serif fonts (Apple fonts)
        'NewYork': 'NewYork.ttf',
        'NewYork-Bold': 'NewYork.ttf',
        'AmericanTypewriter': 'AmericanTypewriter.ttc',
        'AmericanTypewriter-Bold': 'AmericanTypewriter.ttc',
        
        # Safe display fonts (Apple fonts)
        'MarkerFelt': 'MarkerFelt.ttc',
        'MarkerFelt-Bold': 'MarkerFelt.ttc',
        'Noteworthy': 'Noteworthy.ttc',
        'Noteworthy-Bold': 'Noteworthy.ttc',
        'AppleChancery': 'Apple Chancery.ttf',
        'AppleChancery-Bold': 'Apple Chancery.ttf'
    }
    
    file_name = font_mapping.get(font_name, 'Helvetica.ttc')
    
    for location in font_locations:
        font_path = os.path.join(location, file_name)
        if os.path.exists(font_path):
            return font_path
    
    return None

def load_system_font(font_name, size):
    """Load a system font with proper fallback."""
    font_path = get_system_font_path(font_name)
    
    if font_path:
        try:
            return ImageFont.truetype(font_path, size)
        except Exception:
            pass
    
    # Fallback to default font
    return ImageFont.load_default()

if __name__ == "__main__":
    main() 