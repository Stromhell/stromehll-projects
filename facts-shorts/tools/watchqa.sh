# watchqa.sh VIDEO OUT.png : /watch (claude-video, local engine) scene frames tiled into OUT.png, plus a 2-fps sheet OUT-2fps.png. Read both; fix every issue, re-render, re-check until clean.
set -e; R=/home/user/stromehll-projects; V=$(realpath "$1"); O=$(realpath -m "$2"); W=$(mktemp -d)
python3 $R/.claude/skills/watch/scripts/watch.py "$V" --engine local --detail balanced --max-frames 30 --resolution 300 --no-whisper --out-dir $W > $W/report.md 2>&1
python3 - "$W" "$O" <<'PY'
import sys, glob, re
from PIL import Image, ImageDraw
W, O = sys.argv[1:3]; rep = open(W + '/report.md').read()
fr = re.findall(r"`([^`]+frame_\d+\.jpg)` \(t=([\d:]+)", rep)
ims = [(Image.open(p).convert('RGB'), t) for p, t in fr]; w, h = ims[0][0].size; cols = 8
s = Image.new('RGB', (cols * w, ((len(ims) + cols - 1) // cols) * h), 'white')
for i, (im, t) in enumerate(ims):
    ImageDraw.Draw(im).text((4, 4), t, fill='red'); s.paste(im, ((i % cols) * w, (i // cols) * h))
s.save(O); print(len(ims), 'frames ->', O)
PY
rm -rf $W
# second sheet: 2 frames per second, catches short pop-ins/clipping that scene frames miss
ffmpeg -v error -i "$V" -vf "fps=2,scale=180:-1,drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=14:fontcolor=red,tile=12x4" -frames:v 1 -y "${O%.png}-2fps.png" && echo "2fps sheet -> ${O%.png}-2fps.png"
