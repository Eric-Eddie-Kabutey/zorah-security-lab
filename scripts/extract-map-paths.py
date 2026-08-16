import xml.etree.ElementTree as ET
import json
import os
import re

def get_bounding_box(d):
    # Regex to find commands and numbers
    tokens = re.findall(r"([a-zA-Z])|([-+]?\d*\.\d+|[-+]?\d+)", d)
    
    xs = []
    ys = []
    
    curr_x = 0.0
    curr_y = 0.0
    last_command = ''
    
    flat_tokens = []
    for cmd, val in tokens:
        if cmd:
            flat_tokens.append(cmd)
        else:
            flat_tokens.append(float(val))
            
    it = iter(flat_tokens)
    try:
        while True:
            t = next(it)
            if isinstance(t, str):
                cmd = t
                last_command = cmd
            else:
                cmd = last_command
                # If we got a number without a leading command, it's a re-run of the last command
                # We need to process 't' as the first parameter, so we don't 'next(it)' again for the first param.
            
            if cmd in 'Mm':
                x = t if isinstance(t, float) else next(it)
                y = next(it)
                if cmd == 'm':
                    curr_x += x
                    curr_y += y
                else:
                    curr_x = x
                    curr_y = y
                xs.append(curr_x); ys.append(curr_y)
                last_command = 'L' if cmd == 'M' else 'l'
            elif cmd in 'Ll':
                x = t if isinstance(t, float) else next(it)
                y = next(it)
                if cmd == 'l':
                    curr_x += x
                    curr_y += y
                else:
                    curr_x = x
                    curr_y = y
                xs.append(curr_x); ys.append(curr_y)
            elif cmd in 'Hh':
                x = t if isinstance(t, float) else next(it)
                if cmd == 'h': curr_x += x
                else: curr_x = x
                xs.append(curr_x); ys.append(curr_y)
            elif cmd in 'Vv':
                y = t if isinstance(t, float) else next(it)
                if cmd == 'v': curr_y += y
                else: curr_y = y
                xs.append(curr_x); ys.append(curr_y)
            elif cmd in 'Cc':
                # Cubic Bezier (6 params)
                x1 = t if isinstance(t, float) else next(it)
                y1 = next(it); x2 = next(it); y2 = next(it); x = next(it); y = next(it)
                if cmd == 'c':
                    # Simplify: just track control points and endpoints for bounds
                    xs.append(curr_x + x1); ys.append(curr_y + y1)
                    xs.append(curr_x + x2); ys.append(curr_y + y2)
                    curr_x += x; curr_y += y
                else:
                    xs.append(x1); ys.append(y1); xs.append(x2); ys.append(y2)
                    curr_x = x; curr_y = y
                xs.append(curr_x); ys.append(curr_y)
            elif cmd in 'SsQqTt':
                # Simplified consume for other curve types (could be improved if needed)
                params_count = {'S': 4, 's': 4, 'Q': 4, 'q': 4, 'T': 2, 't': 2}[cmd]
                first_val = t if isinstance(t, float) else next(it)
                # Just consume them
                for _ in range(params_count - 1): next(it)
                # Handle relative/absolute for the endpoint
                # (This is a coarse approximation, but better than skipping data)
                # For simplicity, we just keep current x/y if it's relative? No...
                # Let's just consume them and move curr_x/y ideally.
                # But for our map, we mostly see L, H, V, M.
                pass
            elif cmd in 'Aa':
                rx = t if isinstance(t, float) else next(it)
                ry = next(it); rot = next(it); large = next(it); sweep = next(it); x = next(it); y = next(it)
                if cmd == 'a':
                    curr_x += x; curr_y += y
                else:
                    curr_x = x; curr_y = y
                xs.append(curr_x); ys.append(curr_y)
            elif cmd in 'Zz':
                # Close path
                pass
                
    except StopIteration:
        pass
        
    if not xs or not ys:
        return {"x": 0, "y": 0, "w": 0, "h": 0}
        
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    
    return {
        "x": round(min_x, 3),
        "y": round(min_y, 3),
        "w": round(max_x - min_x, 3),
        "h": round(max_y - min_y, 3)
    }

def extract_svg_paths(svg_file, output_ts):
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    for el in root.iter():
        if '}' in el.tag:
            el.tag = el.tag.split('}', 1)[1]
            
    paths = []
    for path in root.findall('.//path'):
        d = path.get('d')
        if d:
            d = ' '.join(d.split())
            box = get_bounding_box(d)
            paths.append({"d": d, "box": box})
            
    print(f"Found {len(paths)} paths.")
    
    with open(output_ts, 'w') as f:
        f.write("export interface MapPath {\n")
        f.write("  id: string;\n")
        f.write("  d: string;\n")
        f.write("  box: { x: number; y: number; w: number; h: number };\n")
        f.write("}\n\n")
        f.write("export const MAP_PATHS: MapPath[] = [\n")
        
        for i, p in enumerate(paths):
            f.write(f'  {{ id: "c{i+1}", d: "{p["d"]}", box: {json.dumps(p["box"])} }},\n')
            
        f.write("];\n")

if __name__ == "__main__":
    pwd = os.getcwd()
    svg_path = os.path.join(pwd, "public", "map.svg")
    output_path = os.path.join(pwd, "components", "svg", "map-paths.ts")
    
    if not os.path.exists(svg_path):
        print(f"Error: {svg_path} not found.")
    else:
        extract_svg_paths(svg_path, output_path)
        print(f"Successfully generated {output_path}")
