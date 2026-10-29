for id in "$@"; do c=S$(echo $id | tr -d '-'); bash render.sh $c $id; echo "$(date -u +%H:%M) $id $(ls -la out/$id-1080p.mp4 2>&1 | awk '{print $5}')"; done
