import json

json_path = r'c:\Users\john.monday\Documents\GitHub\zorah-security-lab\public\wave_paths.json'
output_path = r'c:\Users\john.monday\Documents\GitHub\zorah-security-lab\components\svg\wave-paths.ts'

with open(json_path, 'r') as f:
    paths = json.load(f)

# Group paths to avoid massive single line if possible, but TypeScript handles long strings fine.
with open(output_path, 'w') as f:
    f.write("export const WAVE_PATHS = [\n")
    for path in paths:
        f.write(f'  "{path}",\n')
    f.write("];\n")

print(f"Generated {output_path}")
