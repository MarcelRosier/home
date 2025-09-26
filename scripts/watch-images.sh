#!/bin/bash

# Watch for new images and auto-optimize them
# Usage: ./scripts/watch-images.sh

echo "🔍 Watching for new images in public/images/photography/"
echo "Press Ctrl+C to stop"

# Function to optimize a single image
optimize_image() {
    local img="$1"
    local filename=$(basename "$img" .webp)
    
    echo "🆕 New image detected: $filename"
    
    # Generate thumbnail
    magick "$img" -resize 400x400^ -gravity center -extent 400x400 -quality 80 "public/images/photography/thumbs/${filename}.webp" 2>/dev/null
    echo "  ✓ Thumbnail created"
    
    # Generate medium size  
    magick "$img" -resize 1200x1200\> -quality 85 "public/images/photography/medium/${filename}.webp" 2>/dev/null
    echo "  ✓ Medium size created"
    
    # Generate blur placeholder
    magick "$img" -resize 20x20 -blur 0x1 -quality 50 "public/images/photography/blur/${filename}.webp" 2>/dev/null
    echo "  ✓ Blur placeholder created"
    
    echo "  🎉 $filename optimized!"
}

# Create directories if they don't exist
mkdir -p public/images/photography/thumbs
mkdir -p public/images/photography/medium  
mkdir -p public/images/photography/blur

# Use fswatch on macOS or inotifywait on Linux
if command -v fswatch >/dev/null 2>&1; then
    # macOS
    fswatch -o public/images/photography/ | while read f; do
        # Check for new .webp files
        for img in public/images/photography/*.webp; do
            if [[ -f "$img" && "$img" != *"/thumbs/"* && "$img" != *"/medium/"* && "$img" != *"/blur/"* ]]; then
                filename=$(basename "$img" .webp)
                if [[ ! -f "public/images/photography/thumbs/${filename}.webp" ]]; then
                    optimize_image "$img"
                fi
            fi
        done
    done
elif command -v inotifywait >/dev/null 2>&1; then
    # Linux
    inotifywait -m public/images/photography/ -e create -e moved_to |
    while read path action file; do
        if [[ "$file" == *.webp ]]; then
            optimize_image "${path}${file}"
        fi
    done
else
    echo "❌ Neither fswatch (macOS) nor inotifywait (Linux) found."
    echo "Please install one of them to use image watching."
    exit 1
fi