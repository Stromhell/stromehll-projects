# sheet.sh out.jpg files... -> 2-column contact sheet, 640px tiles with labels
out=$1; shift; args=(); for f in "$@"; do args+=(-i "$f"); done; n=$#
flt=""; for i in $(seq 0 $((n-1))); do b=$(basename ${!i+x} 2>/dev/null); done
python3 - "$out" "$@" <<'P'
import sys,subprocess,os
out=sys.argv[1]; fs=sys.argv[2:]; n=len(fs); cols=2; rows=(n+1)//2
ins=[];f=[]
for i,p in enumerate(fs):
    ins+=['-i',p]; f.append(f"[{i}:v]scale=800:450,drawtext=text='{os.path.basename(p)}':x=8:y=8:fontsize=28:fontcolor=yellow:box=1:boxcolor=black@0.6[v{i}]")
if n%2: ins+=['-f','lavfi','-i','color=black:s=800x450:d=1']; f.append(f"[{n}:v]null[v{n}]"); n+=1
lay='|'.join(f"{(i%2)*800}_{(i//2)*450}" for i in range(n))
f.append(''.join(f'[v{i}]' for i in range(n))+f"xstack=inputs={n}:layout={lay}[o]")
subprocess.check_call(['ffmpeg','-y','-loglevel','error',*ins,'-filter_complex',';'.join(f),'-map','[o]','-frames:v','1','-q:v','4',out])
P
