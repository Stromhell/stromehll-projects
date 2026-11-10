#!/bin/bash
# upload files to the Hackers pt2 Drive folder: up.sh SUBDIR FILE...
sub=$1; shift
python3 /mnt/project-files/tools/gdrive_upload.py "$@" --dest "long form history video/Kids Who Hacked Pt2 - Xbox Underground (2D)/$sub"
