import os
from PIL import Image
import numpy as np

def scan_logos(image_path):
    img = Image.open(image_path)
    # Convert to RGB if not already
    img = img.convert("RGB")
    arr = np.array(img)
    h, w, _ = arr.shape
    
    print(f"Scanning {image_path} ({w}x{h})...")
    
    # In LinkedIn Desktop (1024 wide), the experience column logos are roughly around x = 130 to 170
    # Let's verify by checking where the pixel variance is high in a 40x40 window
    box_size = 48
    results = []
    
    # Sweep x-centers from 120 to 180
    # Sweep y-centers from 50 to 600
    for y in range(40, h - box_size, 10):
        for x in range(120, 180, 5):
            box = arr[y:y+box_size, x:x+box_size]
            # calculate variance across channels and pixels
            var = np.var(box)
            # check if it's not a solid color (white background is very low variance)
            if var > 200:
                results.append((x, y, var))
                
    # Filter overlapping boxes (keep highest variance in neighborhood)
    results = sorted(results, key=lambda val: val[2], reverse=True)
    filtered = []
    for r in results:
        x, y, var = r
        # check distance to already filtered
        overlap = False
        for f in filtered:
            fx, fy, _ = f
            if abs(x - fx) < 30 and abs(y - fy) < 30:
                overlap = True
                break
        if not overlap:
            filtered.append(r)
            
    # Print the detected candidate boxes
    for idx, (x, y, var) in enumerate(filtered[:10]):
        print(f"Candidate {idx}: x={x}, y={y}, variance={var:.1f}")

scan_logos("public/logos/exp/screenshot_1.png")
scan_logos("public/logos/exp/screenshot_2.png")
