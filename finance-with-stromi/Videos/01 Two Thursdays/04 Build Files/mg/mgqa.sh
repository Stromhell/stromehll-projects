# mgqa.sh act base.mp4 -> /home/user/work/qa/mgqa_<act>.png : one still per beat, 1.8 s after it starts
a=$1; b=$2; cd /home/user/work/build
ts=$(node -e "
global.document={getElementById:()=>({getContext:()=>({})})};
const fs=require('fs');eval(fs.readFileSync('mg_ev.js','utf8').replace('const MG_EV','global.MG_EV'));eval(fs.readFileSync('mg_data.js','utf8').replace('const MGD','global.MGD'));
const sh=MG_EV[$a];const out=[];for(const s of sh)for(const b of MGD.filter(b=>b[0]===s.id))out.push((s.start+b[1]+1.8).toFixed(2));console.log(out.join(' '))")
rm -f /home/user/work/stills/mg${a}_*.png
node mgrender.js $a stills $b $ts
python3 - $a <<'PY'
import glob,subprocess,sys
a=sys.argv[1]; fs=sorted(glob.glob(f'/home/user/work/stills/mg{a}_*.png'),key=lambda f:float(f.split('_')[-1][:-4]))
for c in range(0,len(fs),16):
    g=fs[c:c+16]; n=len(g)
    subprocess.run(['ffmpeg','-v','error','-y']+sum([['-i',f] for f in g],[])+['-filter_complex',''.join(f'[{i}:v]scale=480:270,drawtext=text=\'{g[i].split("_")[-1][:-4]}\':x=6:y=6:fontsize=20:fontcolor=yellow:box=1:boxcolor=black[v{i}];' for i in range(n))+''.join(f'[v{i}]' for i in range(n))+(f'xstack=inputs={n}:layout='+'|'.join(f'{(i%4)*480}_{(i//4)*270}' for i in range(n))+':fill=black' if n>1 else 'null'),f'/home/user/work/qa/mgqa_{a}_{c//16}.png'])
print(len(fs))
PY
