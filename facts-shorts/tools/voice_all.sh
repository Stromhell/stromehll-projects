# Voice every short in a batch in Pushpam's cloned voice, then word times.
# usage: bash tools/voice_all.sh BATCH_DIR   (skips shorts that already have vo.wav + words.json)
B=$(cd "$1" && pwd)
SPEAK=$(ls -d /root/.claude/skills/synced/*/pushpam-voice/scripts/speak.py 2>/dev/null | head -1)
PY=~/.cache/pushpam-voice/venv/bin/python
for d in $B/*/; do
  [ -f $d/script.txt ] || continue
  if [ ! -s $d/vo.wav ]; then
    (cd /tmp && $PY $SPEAK --file $d/script.txt --energy 0.55 --pace 0.45 --pause 0.3 --out $d/vo.wav.part.wav > $d/speak.log 2>&1) \
      && mv $d/vo.wav.part.wav $d/vo.wav || { echo "$(date -u +%H:%M) FAILED voice $d"; continue; }
  fi
  if [ ! -s $d/words.json ]; then
    (cd /tmp && $PY $(dirname "$0")/words.py $d/vo.wav $d/words.json > $d/words.log 2>&1) || { echo "$(date -u +%H:%M) FAILED words $d"; continue; }
  fi
  echo "$(date -u +%H:%M) done $d"
done
