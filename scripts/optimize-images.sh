#!/bin/bash

# Image optimization script for photography gallery
# Generates multiple sizes and blur placeholders for fast loading

# Create directories for optimized images
mkdir -p public/images/photography/thumbs
mkdir -p public/images/photography/medium
mkdir -p public/images/photography/blur

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🖼️  Starting image optimization...${NC}"

# Counter for progress
count=0
total=$(ls public/images/photography/*.webp | wc -l)

for img in public/images/photography/*.webp; do
    # Skip if it's already in a subdirectory
    if [[ "$img" == *"/thumbs/"* ]] || [[ "$img" == *"/medium/"* ]] || [[ "$img" == *"/blur/"* ]]; then
        continue
    fi
    
    filename=$(basename "$img" .webp)
    count=$((count + 1))
    
    echo -e "${BLUE}[$count/$total] Processing: $filename${NC}"
    
    # Generate thumbnail (400px wide, optimized for gallery grid)
    if [ ! -f "public/images/photography/thumbs/${filename}.webp" ]; then
        magick "$img" -resize 400x400^ -gravity center -extent 400x400 -quality 80 "public/images/photography/thumbs/${filename}.webp" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo -e "  ${GREEN}✓ Thumbnail created${NC}"
        else
            echo -e "  ${RED}✗ Thumbnail failed - trying with sips${NC}"
            # Fallback to sips (macOS built-in)
            sips -Z 400 "$img" --out "public/images/photography/thumbs/${filename}.webp" >/dev/null 2>&1
        fi
    else
        echo -e "  ${GREEN}✓ Thumbnail exists${NC}"
    fi
    
    # Generate medium size (1200px wide, for detail view)
    if [ ! -f "public/images/photography/medium/${filename}.webp" ]; then
        magick "$img" -resize 1200x1200\> -quality 85 "public/images/photography/medium/${filename}.webp" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo -e "  ${GREEN}✓ Medium size created${NC}"
        else
            echo -e "  ${RED}✗ Medium size failed - trying with sips${NC}"
            sips -Z 1200 "$img" --out "public/images/photography/medium/${filename}.webp" >/dev/null 2>&1
        fi
    else
        echo -e "  ${GREEN}✓ Medium size exists${NC}"
    fi
    
    # Generate blur placeholder (20px wide)
    if [ ! -f "public/images/photography/blur/${filename}.webp" ]; then
        magick "$img" -resize 20x20 -blur 0x1 -quality 50 "public/images/photography/blur/${filename}.webp" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo -e "  ${GREEN}✓ Blur placeholder created${NC}"
        else
            echo -e "  ${RED}✗ Blur placeholder failed - trying with sips${NC}"
            sips -Z 20 "$img" --out "public/images/photography/blur/${filename}.webp" >/dev/null 2>&1
        fi
    else
        echo -e "  ${GREEN}✓ Blur placeholder exists${NC}"
    fi
    
    echo ""
done

echo -e "${GREEN}🎉 Image optimization complete!${NC}"
echo -e "${BLUE}Generated sizes:${NC}"
echo "  📁 thumbs/   - 400x400px for gallery grid"
echo "  📁 medium/   - 1200px max for detail view"  
echo "  📁 blur/     - 20px blur placeholders"
echo "  📁 original/ - Full resolution (on demand)"

# Show size comparison
echo -e "\n${BLUE}💾 Size comparison:${NC}"
original_size=$(du -sh public/images/photography/*.webp | awk '{sum+=$1} END {print sum}' | head -1)
thumb_size=$(du -sh public/images/photography/thumbs/ 2>/dev/null | awk '{print $1}' || echo "0")
medium_size=$(du -sh public/images/photography/medium/ 2>/dev/null | awk '{print $1}' || echo "0")
blur_size=$(du -sh public/images/photography/blur/ 2>/dev/null | awk '{print $1}' || echo "0")

echo "  Original: ${original_size}B"
echo "  Thumbs:   ${thumb_size}B"
echo "  Medium:   ${medium_size}B"  
echo "  Blur:     ${blur_size}B"