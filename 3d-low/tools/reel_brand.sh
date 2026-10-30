#!/bin/bash
# Brand a vertical reel (1080x1920): Stormi logo in the top-right corner inside the safe zone,
# plus a 3 s end card with the logo centred and "Watch the full video on our YouTube channel".
# Usage: reel_brand.sh <in.mp4> <out.mp4> [end card line 2, e.g. the video title]
set -e
IN=$1; OUT=$2; SUB=${3:-}
HERE=$(cd "$(dirname "$0")/.." && pwd)
LOGO=$HERE/branding/stormi-watermark-600x600.png
FONT=$(fc-match -f '%{file}' 'Oswald:bold' 2>/dev/null || fc-match -f '%{file}' 'DejaVu Sans:bold')
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
TMP=$(mktemp -d)
# 1) logo: 190 px wide, 70 px from the right edge, 250 px from the top (clear of the app's top bar and side buttons)
HASA=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$IN" | head -1)
AIN=(); AMAP=(-map 0:a); [ -z "$HASA" ] && AIN=(-f lavfi -t "$D" -i anullsrc=r=48000:cl=stereo) && AMAP=(-map 2:a)
ffmpeg -y -loglevel error -i "$IN" -i "$LOGO" "${AIN[@]}" -filter_complex \
  "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1[v];[1:v]scale=190:-1,format=rgba,colorchannelmixer=aa=0.92[l];[v][l]overlay=W-w-70:250[o]" \
  -map "[o]" "${AMAP[@]}" -c:v libx264 -crf 19 -preset medium -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -ar 48000 -ac 2 "$TMP/body.mp4"
# 2) end card: last frame blurred and darkened, logo centred, call to action
ffmpeg -y -loglevel error -sseof -0.1 -i "$TMP/body.mp4" -frames:v 1 "$TMP/last.png"
DT="drawtext=fontfile=$FONT:fontcolor=white:borderw=6:bordercolor=black"
ffmpeg -y -loglevel error -loop 1 -t 3 -i "$TMP/last.png" -i "$LOGO" -f lavfi -t 3 -i anullsrc=r=48000:cl=stereo -filter_complex \
  "[0:v]boxblur=24:2,eq=brightness=-0.25,format=yuv420p[bg];[1:v]scale=420:-1[l];[bg][l]overlay=(W-w)/2:560[a];\
[a]$DT:text='WATCH THE FULL VIDEO':fontsize=78:x=(w-text_w)/2:y=1040,$DT:text='ON OUR YOUTUBE CHANNEL':fontsize=64:fontcolor=0xE8B321:x=(w-text_w)/2:y=1150\
$( [ -n "$SUB" ] && printf ",%s:text='%s':fontsize=48:x=(w-text_w)/2:y=1260" "$DT" "${SUB//\'/}" ),fade=t=in:d=0.3[o]" \
  -map "[o]" -map 2:a -c:v libx264 -crf 19 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k "$TMP/end.mp4"
printf "file '%s'\nfile '%s'\n" "$TMP/body.mp4" "$TMP/end.mp4" > "$TMP/list.txt"
ffmpeg -y -loglevel error -f concat -safe 0 -i "$TMP/list.txt" -c copy "$OUT"
rm -rf "$TMP"
echo "branded $OUT"
