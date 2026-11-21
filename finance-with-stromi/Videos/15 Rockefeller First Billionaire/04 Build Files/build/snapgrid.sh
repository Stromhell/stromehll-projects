#!/bin/sh
# usage: snapgrid.sh outdir frac  -> one jpg per non-card shot, then grids
out=$1; f=$2; mkdir -p $out
python3 - "$f" > /tmp/claude-0/specs.txt <<'P'
import sys,re
f=sys.argv[1]; src=open('/home/user/w14/src/shots14.py').read()
import importlib.util; sp=importlib.util.spec_from_file_location('s','/home/user/w14/src/shots14.py'); m=importlib.util.module_from_spec(sp); sp.loader.exec_module(m)
acts={}
for s in m.SHOTS:
  if 'card' in s: continue
  acts.setdefault(s['act'],[]).append(s['id'])
for a,ids in acts.items(): print(a, ';'.join(i+':'+f for i in ids))
P
while read a spec; do node snap14.js $a "$spec" $out/s 2>&1 | grep -v "^shots" & done < /tmp/claude-0/specs.txt; wait
python3 - $out $f <<'P'
import sys,glob
from PIL import Image, ImageDraw
out,f=sys.argv[1],sys.argv[2]; fs=sorted(glob.glob(f'{out}/s_M*_{f}.jpg'))
for g in range(0,len(fs),12):
  m=Image.new('RGB',(1280,540)); d=ImageDraw.Draw(m)
  for i,p in enumerate(fs[g:g+12]):
    im=Image.open(p).resize((320,180)); m.paste(im,((i%4)*320,(i//4)*180)); d.text(((i%4)*320+4,(i//4)*180+4),p.split('_')[1],fill=(255,255,0))
  m.save(f'{out}/grid_{f}_{g//12}.jpg')
print(len(fs))
P
