#!/bin/bash
# motion-graphics skills (Barty-Bart/motion-graphics, MIT; installed 28 Nov 2026 on Pushpam's ask).
# Usage:  bash /mnt/project-files/tools/motion-graphics/setup.sh [--sfx] [--seg] [--broll DIR]
#   (no flag) copy the 6 skills into ~/.claude/skills (never overwrites an existing skill folder)
#   --sfx     also pip-install librosa/soundfile/scipy/matplotlib for the sound-effects skill
#   --seg     also pip-install torch/transformers/opencv for object-separation (big, ~2 GB)
#   --broll D prepare a motion-broll work folder D (default ./motion) using the PRE-INSTALLED
#             Playwright + Chromium (never run "playwright install" in the cloud)
K=/mnt/project-files/tools/motion-graphics/src/skills
mkdir -p ~/.claude/skills
for s in "$K"/*/; do n=$(basename "$s"); [ -e ~/.claude/skills/$n ] || cp -r "$s" ~/.claude/skills/$n; done
PIP="python3 -m pip install -q --break-system-packages"
python3 -c "import numpy" 2>/dev/null || $PIP numpy
while [ $# -gt 0 ]; do case "$1" in
  --sfx) python3 -c "import librosa,soundfile,scipy,matplotlib" 2>/dev/null || $PIP librosa soundfile scipy matplotlib ;;
  --seg) python3 -c "import torch,transformers,cv2" 2>/dev/null || $PIP torch transformers opencv-python-headless pillow ;;
  --broll) D="${2:-./motion}"; [ -n "$2" ] && shift
     mkdir -p "$D"/{clips,dist,out,work}; [ -f "$D/package.json" ] || echo '{"private":true}' > "$D/package.json"
     mkdir -p "$D/node_modules"; G=/opt/node-tools/node_modules
     for m in playwright playwright-core; do [ -e "$D/node_modules/$m" ] || ln -s "$G/$m" "$D/node_modules/$m"; done
     echo "motion-broll folder ready: $D (run engine scripts with NODE_PATH=$D/node_modules)" ;;
esac; shift; done
echo "motion-graphics installed: $(ls ~/.claude/skills | grep -cE '^(motion-broll|object-separation|explainer-(default|engaging|high-energy)|sound-effects)$')/6 skills in ~/.claude/skills"
