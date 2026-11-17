cd /home/user/work/e8/build
for a in "$@"; do node render08.js $a ../render/act${a}_v2.mp4 > ../render/log$a.txt 2>&1 & done; wait; echo ALLDONE
