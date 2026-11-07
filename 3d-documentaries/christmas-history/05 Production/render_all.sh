#!/bin/bash
# render acts 1-6 in order once act 0 is out of the way and each act's VO is finished
cd /home/user/stromehll-projects/3d-documentaries/tools
while pgrep -f "xm_act.sh 0" >/dev/null; do sleep 30; done
for A in 1 2 3 4 5 6; do
  until grep -q "act $A done" /home/user/work/xmas/vo/progress.txt; do sleep 30; done
  bash xm_act.sh $A > /home/user/work/xmas/acts/act$A.log 2>&1 || echo "act $A FAILED" >> /home/user/work/xmas/acts/progress.txt
done
