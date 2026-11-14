#!/bin/bash
# mkpage.sh NN -> page_actNN.html (embeds timing from VO json)
n=$1; VO=${VO:-/tmp/dp2work/vo}
cat > page_act$n.html <<H
<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#000"><canvas id="c" width="1920" height="1080"></canvas>
<script src="kit.js"></script>
<script>var module = { exports: {} }; var require = () => window.DumDown;</script>
<script src="cast.cjs"></script>
<script>window.CAST = module.exports.C; window.PLATE_NAMES = $(ls plates | sed 's/\.[a-z]*$//' | sort -u | python3 -c "import sys,json;print(json.dumps([l.strip() for l in sys.stdin]))"); window.LEAD = 0.6; window.TIMING = $(cat $VO/act$n.json);</script>
<script src="engine.js"></script><script src="fx.js"></script><script src="cards.js"></script><script src="props.js"></script>
<script src="acts/act$n.js"></script><script src="shots.js"></script></body></html>
H
