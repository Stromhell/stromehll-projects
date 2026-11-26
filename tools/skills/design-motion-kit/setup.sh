#!/bin/bash
# Design + motion skills kit (Pushpam 27 Nov 2026): GSAP, three.js, design-dna, LottieFiles motion-design, genjutsu.
# Installs every skill into ~/.claude/skills for this session. Never overwrites an existing skill folder.
K=/mnt/project-files/tools/skills/design-motion-kit
mkdir -p ~/.claude/skills
cp -r --update=none $K/greensock_gsap-skills/skills/* ~/.claude/skills/
cp -r --update=none $K/cloudai-x_threejs-skills/skills/* ~/.claude/skills/
cp -r --update=none $K/lottiefiles_motion-design-skill/skills/* ~/.claude/skills/
[ -e ~/.claude/skills/design-dna ] || cp -r $K/zanwei_design-dna ~/.claude/skills/design-dna
cp -r --update=none $K/AThevon_genjutsu/skills/* ~/.claude/skills/
echo "design-motion-kit installed: $(ls ~/.claude/skills | wc -l) skill folders in ~/.claude/skills"
