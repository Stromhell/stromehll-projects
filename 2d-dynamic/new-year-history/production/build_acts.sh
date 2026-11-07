#!/bin/bash
# Rebuild New Year act pages from ny_head.html + ny_lib.js + bodyN.js (act 0 also gets the 4.8 s title shot)
cd "$(dirname "$0")"; for n in 0 1 2 3 4 5; do [ -f body$n.js ] || continue; [ -f acts/act$n/timing.js ] || continue; { sed "s/__N__/$n/" ny_head.html; [ $n = 0 ] && echo "{ const T = window.TIMING, L = T.shots[T.shots.length - 1]; T.shots.push({ i: T.shots.length + 1, start: L.end, end: L.end + 4.8, vo_start: L.end, vo_end: L.end, text: '' }); T.dur = L.end + 4.8; }"; cat ny_lib.js body$n.js; } > acts/act$n/act.html; done
