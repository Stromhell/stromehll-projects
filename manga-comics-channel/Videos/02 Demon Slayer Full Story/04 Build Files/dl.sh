#!/bin/bash
c=$(printf %04d $1); o=/tmp/claude-0/ds/pages
for p in $(seq 1 80); do pp=$(printf %03d $p); f=$o/c${c:1}-$pp.jpg
  [ -s $f ] && continue
  code=$(curl -s --retry 3 -o $f -w "%{http_code}" -A Mozilla/5.0 -e https://kimetsu-yaiba.com/ https://hot.planeptune.us/manga/Kimetsu-No-Yaiba/$c-$pp.png)
  if [ "$code" != 200 ]; then rm -f $f; break; fi
done
echo "ch $1 done $((p-1))"
