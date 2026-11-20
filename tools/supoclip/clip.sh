#!/usr/bin/env bash
# clip.sh VIDEO [clip_length=auto] [workflow=highlights] [OUT_DIR] - upload a video to local SupoClip, wait, copy the 9:16 clips out.
# Optional env: INSTRUCTIONS="Skip the intro" TOPIC="pricing" (for workflow=topic).
set -euo pipefail
V="$1"; LEN="${2:-auto}"; WF="${3:-highlights}"; OUT="${4:-$(dirname "$V")/supoclip-$(date +%Y%m%d-%H%M)}"
API=http://localhost:8000; K=$(cat "$HOME/.cache/supoclip/.local_api_key")
UP=$(curl -sf -H "x-api-key: $K" -F "video=@$V" $API/upload | python3 -c 'import sys,json;print(json.load(sys.stdin)["video_path"])')
BODY=$(python3 - "$UP" "$LEN" "$WF" "$(basename "$V")" <<'PY'
import json,os,sys
up,ln,wf,t=sys.argv[1:]
b={"source":{"url":up,"title":t},"clip_length":ln,"workflow":wf}
if os.getenv("INSTRUCTIONS"): b["instructions"]=os.environ["INSTRUCTIONS"]
if os.getenv("TOPIC"): b["workflow_options"]={"topic":os.environ["TOPIC"]}
print(json.dumps(b))
PY
)
T=$(curl -sf -H "x-api-key: $K" -H 'content-type: application/json' -d "$BODY" $API/tasks/ | python3 -c 'import sys,json;print(json.load(sys.stdin)["task_id"])')
echo "task $T"
while :; do
  S=$(curl -sf -H "x-api-key: $K" $API/tasks/$T | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("status"),d.get("progress"),(d.get("progress_message") or "")[:80])')
  echo "$S"; case "$S" in completed*|error*|failed*|cancelled*) break;; esac; sleep 20
done
case "$S" in completed*) ;; *) echo "[fail] task $T ended: $S (see ~/.cache/supoclip/logs/worker.log; no LLM key yet?)"; exit 1;; esac
mkdir -p "$OUT"
curl -sf -H "x-api-key: $K" $API/tasks/$T/clips > "$OUT/clips.json"
python3 - "$OUT" "$K" <<'PY'
import json,sys,urllib.request
out,k=sys.argv[1:]; d=json.load(open(f"{out}/clips.json")); clips=d.get("clips",d) if isinstance(d,dict) else d
for i,c in enumerate(clips,1):
    u=c.get("video_url") or ""; u=u if u.startswith("http") else "http://localhost:8000"+u
    r=urllib.request.urlopen(urllib.request.Request(u,headers={"x-api-key":k}))
    fn=f"{out}/clip_{i:02d}.mp4"; open(fn,"wb").write(r.read())
    print(fn, c.get("start_time"), c.get("end_time"), "score", c.get("virality_score"), "|", (c.get("text") or "")[:70])
PY
echo "[ok] clips + clips.json in $OUT"
