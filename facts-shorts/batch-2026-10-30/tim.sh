# tim.sh ID : mktiming from keys.txt
cd $(dirname "$0")
set -- $(grep "^$1 " keys.txt)
python3 ../tools/mktiming.py $PWD/$1 $1 $2 ${@:3} 2>&1 | tail -1
