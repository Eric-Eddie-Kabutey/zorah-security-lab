import re
import os

def get_bounding_box(path_str):
    coords = re.findall(r'(\d+\.\d+|\d+)', path_str)
    if not coords:
        return None
    xs = [float(coords[i]) for i in range(0, len(coords), 2)]
    ys = [float(coords[i]) for i in range(1, len(coords), 2)]
    if not xs or not ys:
        return None
    return min(xs), min(ys), max(xs), max(ys)

def find_west_africa():
    pwd = os.getcwd()
    path_file = os.path.join(pwd, "components", "svg", "map-paths.ts")
    
    with open(path_file, 'r') as f:
        content = f.read()
    
    # Extract paths using regex
    matches = re.findall(r'id: "(c\d+)", d: "([^"]+)"', content)
    
    all_boxes = []
    for id_val, d_val in matches:
        box = get_bounding_box(d_val)
        if box:
            all_boxes.append((id_val, box))
            
    # Print boxes in the "West Africa" region
    # Africa center is roughly 500, 350
    # West Africa is left of center, near equator
    print("Paths in West Africa region (approx):")
    for id_val, (x1, y1, x2, y2) in all_boxes:
        if 400 < x1 < 600 and 300 < y1 < 450:
             print(f"{id_val}: ({x1}, {y1}) to ({x2}, {y2})")

if __name__ == "__main__":
    find_west_africa()
