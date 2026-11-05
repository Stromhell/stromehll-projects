#!/bin/bash
# Frames go to local disk (not the shared mount, whose cache lives in RAM). Render one act end to end: frames -> SFX/VO mix (-16 LUFS) -> H.264 MP4.  Usage: render_act.sh VIDEO_DIR ACT [workers]
set -e
V=$1; A=$2; W=${3:-4}; D=$V/production/acts/act$A; SH=$(dirname "$0")
F=/tmp/claude-0/frames/$V/act$A; rm -rf "$F"; mkdir -p "$F"; node "$SH/render.js" "$D/act.html" "$F" "$W"
# local underscore (free): moods per act from music.txt ("0:tension,20:sad"), else tension throughout
DUR=$(python3 -c "import json;print(json.load(open('$D/cues.json'))['dur'])"); MOODS=$(cat "$D/music.txt" 2>/dev/null || echo "0:tension")
python3 "$SH/score.py" "$D/music.wav" --dur "$DUR" --moods "$MOODS" --seed "$A"
python3 "$SH/mix.py" "$D/vo.wav" "$D/cues.json" "$D/mix.wav" --music "$D/music.wav" --music-db -23 --bed-db -22 --sfx-db -9
ffmpeg -y -loglevel error -framerate 30 -i "$F/f%05d.jpg" -i "$D/mix.wav" -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "$D/act$A.mp4"
rm -rf "$F"; echo "WROTE $D/act$A.mp4"
