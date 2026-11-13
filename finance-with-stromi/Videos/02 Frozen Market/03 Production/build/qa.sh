#!/bin/bash
# qa.sh <act>  -> 1 fps frames from the act render into contact sheets of 24 (6x4) at /home/user/work/qa/act<N>_sheetK.jpg
a=$1; d=/home/user/work/qa/a$a; rm -rf $d; mkdir -p $d
ffmpeg -v error -i /home/user/work/renders/act$a.mp4 -vf "fps=1,scale=320:-1,drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=14:fontcolor=red" $d/f%04d.jpg
cd $d && n=$(ls f*.jpg | wc -l) && k=0 && for s in $(seq 1 24 $n); do ls f*.jpg | sed -n "${s},$((s+23))p" > l.txt; ffmpeg -v error -y $(sed 's/^/-i /' l.txt | tr '\n' ' ') -filter_complex "xstack=inputs=$(wc -l < l.txt):layout=$(python3 -c "
n=$(wc -l < l.txt);print('|'.join(f'{(i%6)*320}_{(i//6)*180}' for i in range(n)))"):fill=black" ../act${a}_sheet$k.jpg; k=$((k+1)); done; echo "act $a: $n frames, $k sheets"
