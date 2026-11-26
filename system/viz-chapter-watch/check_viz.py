#!/usr/bin/env python3
"""Daily VIZ new-chapter check. Usage: check_viz.py SERIES_SLUG LAST_DONE_CHAPTER
Prints NEW <n> <url> <date> for each chapter > LAST_DONE, or NONE latest=<n>."""
import re, sys, urllib.request
slug, last = sys.argv[1], float(sys.argv[2])
url = f"https://www.viz.com/shonenjump/chapters/{slug}"
html = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=60).read().decode("utf-8", "ignore")
chs = {}
for m in re.finditer(rf'/shonenjump/{slug}-chapter-([0-9]+(?:-[0-9])?)/chapter/([0-9]+)', html):
    n = float(m.group(1).replace('-', '.')); chs[n] = "https://www.viz.com" + m.group(0)
dates = re.findall(r'([A-Z][a-z]+ [0-9]{1,2}, 20[0-9]{2})\s*</[^>]+>\s*<[^>]+>\s*Ch\. *([0-9.]+)', html)
dmap = {float(c): d for d, c in dates}
new = sorted(n for n in chs if n > last)
for n in new: print("NEW", int(n) if n == int(n) else n, chs[n], dmap.get(n, "?"))
if not new: print("NONE latest=%s" % (int(max(chs)) if chs else "?"))
