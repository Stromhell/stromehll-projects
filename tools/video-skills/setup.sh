#!/bin/bash
# Video/motion skills pack (Pushpam 28 Nov 2026). 9 MIT repos, sources in ./src (commits in SOURCE_COMMITS.txt).
# Usage: bash /mnt/project-files/tools/video-skills/setup.sh [--earshot] [--reanimate] [--take-one] [--explainroo] [--all]
#  (no flag) copies sources to ~/.cache/video-skills, links 10 skills into ~/.claude/skills (never overwrites),
#            writes ~/.cache/video-skills/env.sh (pre-installed Chromium paths). Then: source ~/.cache/video-skills/env.sh
#  --earshot    pip-install the earshot sound CLI (no model, no GPU)
#  --reanimate  bun-install reanimate's script deps (uses pre-installed Chromium)
#  --take-one   link pre-installed playwright-core for take-one
#  --explainroo npm-install explainroo deps (local Kokoro voice; model downloads on first use)
V=/mnt/project-files/tools/video-skills; C=~/.cache/video-skills; SK=~/.claude/skills
mkdir -p $C $SK
for d in $V/src/*/; do n=$(basename $d); [ -d $C/$n ] || { mkdir -p $C/$n; (cd $d && tar -cf - .) | tar -xf - -C $C/$n; }; done
find $C -path "*/node_modules" -prune -o -type f \( -name "*.sh" -o -path "*/bin/*" \) -exec chmod +x {} + 2>/dev/null
lk(){ [ -e "$SK/$1" ] || ln -s "$C/$2" "$SK/$1"; }
lk huashu-art-motion huashu-art-motion
lk huashu-motion huashu-motion/skills/huashu-motion
lk earshot earshot/skills/earshot
lk real-sound earshot/skills/real-sound
lk reanimate reanimate/skills/reanimate
lk explainroo explainroo/skills/explainroo
lk rossark-motion-skill rossark-motion-skill
lk video-director video-director/video-director
lk take-one take-one
lk argo-guide argo/skills/argo-guide
cat > $C/env.sh <<'E2'
export CHROME_PATH=/opt/pw-browsers/chromium OM_CHROME=/opt/pw-browsers/chromium EXPLAINROO_CHROME=/opt/pw-browsers/chromium
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers PLAYWRIGHT_NODE_MODULES=/opt/node-tools/node_modules
export NODE_PATH=/opt/node-tools/node_modules${NODE_PATH:+:$NODE_PATH} PATH=$HOME/.cache/video-skills/huashu-motion/skills/huashu-motion/bin:$PATH
E2
. $C/env.sh
[ "$1" = "--all" ] && set -- --earshot --reanimate --take-one --explainroo
for f in "$@"; do case $f in
 --earshot) command -v earshot >/dev/null || python3 -m pip install -q --break-system-packages "$C/earshot" ;;
 --reanimate) (cd $C/reanimate/skills/reanimate/scripts && bash setup.sh) ;;
 --take-one) mkdir -p $C/take-one/node_modules; [ -e $C/take-one/node_modules/playwright-core ] || ln -s /opt/node-tools/node_modules/playwright-core $C/take-one/node_modules/playwright-core ;;
 --explainroo) [ -d $C/explainroo/node_modules ] || (cd $C/explainroo && npm ci --silent --no-audit --no-fund) ;;
esac; done
echo "video-skills ready: $(ls $SK | grep -cE '^(huashu-art-motion|huashu-motion|earshot|real-sound|reanimate|explainroo|rossark-motion-skill|video-director|take-one|argo-guide)$')/10 skills. Run: source ~/.cache/video-skills/env.sh"
