import json, sys, os
PL = ['westview_corner','loft','noir_office','mind_living','attic','gala_hall','ruins','van_int','gala','gallery','mind_kitchen','suburb','madripoor','london','lab1939','cargo_plane','hospital','manor','bathroom','pub_int','pub','corkboard']
for i in sys.argv[1:]:
    m = json.load(open(f'../gags/out/gag{int(i):02d}.json'))
    open(f'page_gag{int(i):02d}.html','w').write(f'''<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#000"><canvas id="c" width="1920" height="1080"></canvas>
<script src="kit.js"></script>
<script>var module = {{ exports: {{}} }}; var require = () => window.DumDown;</script>
<script src="cast.cjs"></script>
<script>window.CAST = module.exports.C; window.PLATE_NAMES = {json.dumps(PL)}; window.LEAD = 0; window.GAGDATA = {json.dumps(m)};</script>
<script src="engine.js"></script><script src="fx.js"></script><script src="gags.js"></script></body></html>''')
