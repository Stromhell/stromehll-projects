#!/bin/bash
# mkpage_am.sh NN -> page_actNN.html (timing = narrator VO + inline gags)
n=$1; TM=${TM:-/tmp/amwork/timing}
cat > page_act$n.html <<H
<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#000"><canvas id="c" width="1920" height="1080"></canvas>
<script src="kit.js"></script><script src="tbkit.js"></script>
<script>var module = { exports: {} }; var require = () => window.DumDown;</script>
<script src="cast.cjs"></script><script src="am_kit.js"></script>
<script>window.CAST = module.exports.C; window.PLATE_NAMES = $(ls plates | sed 's/\.[a-z]*$//' | sort -u | python3 -c "import sys,json;print(json.dumps([l.strip() for l in sys.stdin]))"); window.LEAD = 0.6; window.TIMING = $(cat $TM/act$n.json);</script>
<script src="acting.js"></script><script src="actions.js"></script><script src="engine.js"></script><script src="fx.js"></script><script src="cards.js"></script><script src="props.js"></script><script src="agprops.js"></script><script src="dwprops.js"></script><script src="tbprops.js"></script><script src="mvprops.js"></script><script src="siprops.js"></script><script src="sbprops.js"></script><script src="amprops.js"></script><script src="am_help.js"></script>
<script src="acts/act$n.js"></script><script src="shots.js"></script></body></html>
H
