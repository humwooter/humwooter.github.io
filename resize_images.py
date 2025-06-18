#!/usr/bin/env python3
"""
Script to resize all images in the images folder to 1320x2868 pixels
and save them to a new resized_images folder with the same structure.
"""

import os
import sys
from PIL import Image
import glob

def resize_image(input_path, output_path, target_size=(1320, 2868)):
    """
    Resize an image to the target size while maintaining aspect ratio.
    If the aspect ratio doesn't match, the image will be padded with white background.
    """
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for PNG with transparency)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create a white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Calculate aspect ratios
            img_ratio = img.width / img.height
            target_ratio = target_size[0] / target_size[1]
            
            if img_ratio > target_ratio:
                # Image is wider than target ratio - fit to height
                new_height = target_size[1]
                new_width = int(new_height * img_ratio)
                resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Create target size image with white background
                final_img = Image.new('RGB', target_size, (255, 255, 255))
                # Center the resized image
                x_offset = (target_size[0] - new_width) // 2
                final_img.paste(resized, (x_offset, 0))
            else:
                # Image is taller than target ratio - fit to width
                new_width = target_size[0]
                new_height = int(new_width / img_ratio)
                resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Create target size image with white background
                final_img = Image.new('RGB', target_size, (255, 255, 255))
                # Center the resized image
                y_offset = (target_size[1] - new_height) // 2
                final_img.paste(resized, (0, y_offset))
            
            # Ensure output directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Save the resized image
            final_img.save(output_path, 'JPEG', quality=95)
            print(f"Resized: {input_path} -> {output_path}")
            
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def process_directory(input_dir, output_dir, target_size=(1320, 2868)):
    """
    Recursively process all images in the input directory and its subdirectories.
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Supported image extensions
    image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.bmp', '*.tiff', '*.tif', '*.PNG', '*.JPG', '*.JPEG']
    
    # Find all image files recursively
    image_files = []
    for ext in image_extensions:
        pattern = os.path.join(input_dir, '**', ext)
        image_files.extend(glob.glob(pattern, recursive=True))
    
    print(f"Found {len(image_files)} image files to process")
    
    # Process each image
    for image_path in image_files:
        # Calculate relative path from input directory
        rel_path = os.path.relpath(image_path, input_dir)
        
        # Create output path
        output_path = os.path.join(output_dir, rel_path)
        
        # Change extension to .jpg for consistency
        output_path = os.path.splitext(output_path)[0] + '.jpg'
        
        # Resize the image
        resize_image(image_path, output_path, target_size)
    
    print(f"Resized images saved to: {output_dir}")

def main():
    # Define paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_dir = os.path.join(current_dir, 'images')
    output_dir = os.path.join(current_dir, 'resized_images')
    
    # Check if input directory exists
    if not os.path.exists(input_dir):
        print(f"Error: Input directory '{input_dir}' does not exist")
        sys.exit(1)
    
    print(f"Processing images from: {input_dir}")
    print(f"Output directory: {output_dir}")
    print(f"Target size: 1320x2868 pixels")
    print("-" * 50)
    
    # Process all images
    process_directory(input_dir, output_dir, target_size=(1320, 2868))
    
    print("-" * 50)
    print("Image resizing completed!")

if __name__ == "__main__":
    main() 