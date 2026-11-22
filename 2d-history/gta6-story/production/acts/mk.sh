#!/bin/bash
# usage: mk.sh N "title"  -> builds actN/act.html from head.tmpl + actN/body.js + foot.tmpl
#        mk.sh kit_test     -> builds kit_test/act.html (any folder name works too)
cd "$(dirname "$0")"; D=act$1; [ -d "$1" ] && D=$1
sed "s/G6 act N/G6 act $1 - $2/" head.tmpl > $D/act.html; cat $D/body.js >> $D/act.html; cat foot.tmpl >> $D/act.html
