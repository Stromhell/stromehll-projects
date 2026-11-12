#!/bin/bash
# snap.sh NN f1,f2,... -> gtest4/gNN/*.jpg
cd "$(dirname "$0")"; PAGE=page_gag$1.html node render.cjs gtest4/g$1 $2 2 2>&1 | grep ERR
true
