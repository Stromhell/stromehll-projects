# tim.sh BATCH_DIR ID : word timings for one short from BATCH/keys.txt (line: ID SEED key=word[:n] ...)
B=$(cd "$1" && pwd); cd $B
set -- $(grep "^$2 " keys.txt)
[ -n "$1" ] || { echo "no keys line for $2"; exit 1; }
python3 $(dirname "$0")/mktiming.py $B/$1 $1 $2 ${@:3} 2>&1 | tail -1
