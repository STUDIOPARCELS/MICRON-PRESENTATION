"""Inline the CSS and JS into a single HTML file."""
import re

with open("dist/index.html", "r") as f:
    html = f.read()

with open("dist/assets/index-CkuOV5Vk.css", "r") as f:
    css = f.read()

with open("dist/assets/index-C0PlRFsN.js", "r") as f:
    js = f.read()

# Replace CSS link with inline style
html = re.sub(
    r'<link rel="stylesheet" crossorigin href="/assets/[^"]+">',
    f'<style>{css}</style>',
    html
)

# Replace JS script with inline script
html = re.sub(
    r'<script type="module" crossorigin src="/assets/[^"]+"></script>',
    f'<script type="module">{js}</script>',
    html
)

with open("dist/index-inline.html", "w") as f:
    f.write(html)

print(f"Done. Size: {len(html):,} bytes")
