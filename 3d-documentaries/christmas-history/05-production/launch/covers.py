import json, subprocess, sys
sys.argv=['x']; exec(open('/home/user/work/xmas/launch/build_release.py').read().split("def ts(")[0])
R = json.load(open('/home/user/work/xmas/launch/reels.json'))
TXT = {1:"NOT HIS BIRTHDAY?",2:"BORN IN MAY?",3:"SUN GOD'S BIRTHDAY",4:"OLDER THAN CHRISTMAS",5:"NO TREE TILL 1982",6:"WHY RED AND GREEN?",7:"SANTA WAS REAL",8:"SAY IT FAST",9:"SANTA WAS GREEN",10:"A GIFT WITCH?",11:"GIFTS ON 6 JANUARY",12:"28 OXEN FEAST",13:"CHRISTMAS BANNED",14:"THE QUEEN'S TREE",15:"HAPPY CHRISTMAS!"}
import os
ov = json.load(open('work/cover_t.json')) if os.path.exists('work/cover_t.json') else {}
for r in R:
    n = r['n']; segs = r['segs'][0]; a, b = shots[segs[0]][0], shots[segs[-1]][1]
    t = ov.get(str(n), a + (b - a) * 0.45)
    f = f'work/frames/c{n:02d}.jpg'
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-ss',f'{t:.2f}','-i',FULL,'-frames:v','1','-q:v','2',f])
    subprocess.check_call(['node','/home/user/stromehll-projects/3d-documentaries/tools/reel_thumb.js',f,f'reel_covers/XM_Reel_{n:02d}_thumb.png','--text',TXT[n],'--kicker','CHRISTMAS','--accent','#e8323c','--zoom','1.2','--vy','0','--pos','top'])
