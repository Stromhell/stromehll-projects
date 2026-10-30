#!/bin/bash
# usage: mk.sh N "title"  -> builds actN/act.html from head.tmpl + actN/body.js + foot.tmpl
cd "$(dirname "$0")"; sed "s/WW act N/MX act $1 - $2/" head.tmpl > act$1/act.html; cat act$1/body.js >> act$1/act.html; cat foot.tmpl >> act$1/act.html
