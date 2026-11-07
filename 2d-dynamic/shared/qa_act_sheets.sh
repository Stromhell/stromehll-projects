#!/bin/bash
# QA sheets for one act: /watch frames (local engine) + 1 fps contact sheets (6x4, 320x180 each)
N=$1; F=/home/user/stromehll-projects/2d-dynamic/${V:-mongols-ain-jalut}/production/acts/act$N/act$N.mp4; O=/tmp/claude-0/qa/act$N; rm -rf $O; mkdir -p $O/fps
cd /tmp/claude-0/cv; WD=$(python3 tools/claude-video/skills/watch/scripts/watch.py $F --engine local --question "render QA per /mnt/project-files/system/render-qa-rules.md: overlaps, floating, pop-ins, flat sets, walking in place, legs still cycling after stopping, loads hovering over animals, walking over ground props, spears across faces, hills not touching ground, letters not in hand" 2>/dev/null | grep -o "/tmp/watch-[a-z0-9_]*" | head -1)
ffmpeg -loglevel error -i $F -vf "fps=1,scale=320:180" $O/fps/f%03d.jpg
ffmpeg -loglevel error -i $O/fps/f%03d.jpg -vf "tile=6x4" $O/sheet%02d.jpg
echo "watch=$WD"; ls $O/sheet*; ffprobe -v error -show_entries format=duration -of csv=p=0 $F
# motion strips (2 fps, 12 s per sheet): look for walking in place / legs cycling after a stop (rules 14-15)
mkdir -p $O/m; ffmpeg -loglevel error -i $F -vf "fps=2,scale=240:135" $O/m/f%03d.jpg
ffmpeg -loglevel error -i $O/m/f%03d.jpg -vf "tile=8x3" $O/motion%02d.jpg; ls $O/motion*
