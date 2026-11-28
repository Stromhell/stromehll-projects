#!/bin/bash
# Extra motion-graphics skills (28 Nov 2026): HyperFrames craft skills + blocks, iart web-animation skills, alharkan7 2D/3D motion graphics.
# usage: bash /mnt/project-files/tools/motion-skills-extra/setup.sh   (links into ~/.claude/skills, never overwrites)
K=$(cd "$(dirname "$0")" && pwd); mkdir -p ~/.claude/skills; n=0
for d in "$K"/skills/*/; do b=$(basename "$d"); [ -e ~/.claude/skills/$b ] || { cp -r "$d" ~/.claude/skills/$b; n=$((n+1)); }; done
echo "motion-skills-extra: $n skills added"
