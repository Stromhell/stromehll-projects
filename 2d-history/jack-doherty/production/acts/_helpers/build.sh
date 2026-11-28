cd /home/user/repo/2d-history/jack-doherty/production/acts
G=golf_course; [ -f ../plates/golf_course.jpg ] || G=studio
for n in 4 5 6; do mkdir -p act$n; T=$(case $n in 4) echo "Second Chances";; 5) echo "Banned From Golf";; 6) echo "Paid to Disappear";; esac)
(sed -n 1,2p /tmp/claude-0/jd/a$n.js; cat /tmp/claude-0/jd/helpers.js; sed -n '3,$p' /tmp/claude-0/jd/a$n.js) | sed "s/^const GOLF = '.*';/const GOLF = '$G';/" > act$n/body.js
(sed "s/JD act N/JD act $n - $T/" head.tmpl; cat act$n/body.js foot.tmpl) > act$n/act.html; done; echo $G
