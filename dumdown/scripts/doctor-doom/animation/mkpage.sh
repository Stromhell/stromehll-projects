#!/bin/bash
# mkpage.sh NAME [timingjson] -> page_NAME.html ; NAME = act00.. or gag01..
n=$1; VO=${VO:-/tmp/ddwork/vo}; TJ=${2:-$VO/$n.json}; [[ $n == gag* ]] && TJ=gags/out/$n.json
cat > page_$n.html <<H
<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Fredoka;src:url(fonts/Fredoka.ttf)}@font-face{font-family:Nunito;src:url(fonts/Nunito.ttf)}</style></head><body style="margin:0;background:#000"><canvas id="c" width="1920" height="1080"></canvas>
<script src="flatkit.js"></script><script src="cast.js"></script><script src="sets.js"></script><script src="props.js"></script>
<script>window.LEAD = 0.6; window.TIMING = $(cat $TJ);</script>
$( [[ $n == gag* ]] && echo "<script src=\"gags/lib.js\"></script>" )<script src="acts/$n.js"></script><script src="film.js"></script></body></html>
H
