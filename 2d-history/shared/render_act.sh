#!/bin/bash
# Render one act end to end: frames -> SFX/VO mix (-16 LUFS) -> H.264 MP4.  Usage: render_act.sh VIDEO_DIR ACT [workers]
set -e
V=$1; A=$2; W=${3:-4}; D=$V/production/acts/act$A; SH=$(dirname "$0")
rm -rf "$D/frames"; node "$SH/render.js" "$D/act.html" "$D/frames" "$W"
python3 "$SH/mix.py" "$D/vo.wav" "$D/cues.json" "$D/mix.wav"
ffmpeg -y -loglevel error -framerate 30 -i "$D/frames/f%05d.jpg" -i "$D/mix.wav" -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "$D/act$A.mp4"
[ -s "$D/act$A.mp4" ] && rm -rf "$D/frames"  # frames are throwaway once the MP4 exists (Pushpam OK 30 Oct)
echo "WROTE $D/act$A.mp4"
