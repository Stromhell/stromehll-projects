# tim.sh ID : mktiming from keys.txt
cd /home/user/stromehll-projects/facts-shorts/batch-2026-10-30
set -- $(grep "^$1 " keys.txt)
python3 ../tools/mktiming.py $PWD/$1 $1 $2 ${@:3} 2>&1 | tail -1
