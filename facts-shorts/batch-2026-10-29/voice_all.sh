# Voice every short in this batch in Pushpam's cloned voice, then word times.
SPEAK=/root/.claude/skills/synced/28996af7-eb85-4e49-9dd9-f273fd537747_5b2788dc-eca9-4918-911b-4b5aaf7c3164/pushpam-voice/scripts/speak.py
PY=~/.cache/pushpam-voice/venv/bin/python
B=/home/user/stromehll-projects/facts-shorts/batch-2026-10-29
for d in $B/*/; do
  [ -f $d/vo.wav ] && continue
  (cd /tmp && $PY $SPEAK --file $d/script.txt --energy 0.55 --pace 0.45 --pause 0.3 --out $d/vo.wav > $d/speak.log 2>&1)
  (cd /tmp && $PY /home/user/stromehll-projects/facts-shorts/tools/words.py $d/vo.wav $d/words.json > $d/words.log 2>&1)
  echo "$(date -u +%H:%M) done $d"
done
