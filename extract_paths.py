import re
import json

file_path = r'c:\Users\john.monday\Documents\GitHub\zorah-security-lab\public\wave.svg'
output_path = r'c:\Users\john.monday\Documents\GitHub\zorah-security-lab\public\wave_paths.json'

try:
    with open(file_path, 'r') as f:
        content = f.read()

    # Find all 'd' attributes in path tags
    paths = re.findall(r'<path[^>]+d="([^"]+)"', content)

    with open(output_path, 'w') as f:
        json.dump(paths, f)

    print(f"Successfully extracted {len(paths)} paths.")
except Exception as e:
    print(f"Error: {e}")
