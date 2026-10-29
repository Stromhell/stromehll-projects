# Upload one finished short to Drive AI/Facts Shorts/<NN Name>/...   usage: drive_short.sh BATCH_DIR ID
B=$1; S=$2; G=/tmp/claude-0/-home-user-stromehll-projects/72cb5b34-fc06-591d-8eb1-a2536cf45d09/scratchpad/gdrive_upload.py
N=$(python3 -c "import json;print(json.load(open('$B/posts.json'))['$S']['name'])"); F="Facts Shorts/${S%%-*} $N"
python3 $G --dest "$F/Renders" $B/$S/render/$S-1080p.mp4 | grep "^{" >> $B/$S/drive.jsonl
python3 $G --dest "$F/Thumbnails" $B/$S/thumbnail/$S-cover-1080x1920.png | grep "^{" >> $B/$S/drive.jsonl
python3 $G --dest "$F/01 Script" $B/$S/README.md $B/$S/script.txt $B/$S/description.txt | grep "^{" >> $B/$S/drive.jsonl
python3 $G --dest "$F/05 Production/Voice" $B/$S/vo.wav $B/$S/words.json | grep "^{" >> $B/$S/drive.jsonl
