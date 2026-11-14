import json, html, sys
link = sys.argv[1] if len(sys.argv) > 1 else '#'
src = open('/mnt/project-files/finance-with-stromi/Videos/03 Credit Card Rewards/05 Production/launch-kit.html').read()
head = src[:src.index('<body>')].replace('Credit Cards Launch Kit', 'Blackout Launch Kit')
tail = src[src.index('</main><script>'):]
desc = open('youtube-description.txt').read(); tags = json.load(open('youtube-tags.json'))
chap = [l for l in desc.split('\n') if len(l) > 4 and l[0].isdigit() and ':' in l[:6]]
titles = [("Email, Flights and Payroll All Broke in 48 Hours. Why?", True), ("America's Skies, Email and Payroll Broke at Once", False), ("A 20-Year-Old Router Grounded Every US Flight", False)]
E = html.escape
b = '<body><main>\n<h1>The 48-Hour Blackout</h1>\n<p class="sub">Finance with Stromi · video 04 · launch kit for review. Nothing is booked yet.</p>\n'
b += f'<section><h2>Full video</h2><div class="meta"><div><b>Length</b>16:14</div><div><b>Format</b>1920×1080, 24 fps, -14 LUFS</div><div><b>End screen</b>clean last 5.5 s</div><div><b>Watch</b><a href="{link}">Open on Drive</a></div></div></section>\n'
b += '<section><h2>Thumbnail</h2><img src="thumb.jpg" alt="Thumbnail: EVERYTHING BROKE IN 48 HOURS"></section>\n'
b += '<section><h2>Title options</h2><ol class="titles">' + ''.join(f'<li><span class="n">{i+1}</span><span class="t">{E(t)}</span><span class="c">{len(t)} chars</span>{"<span class=pill>Recommended</span>" if r else ""}</li>' for i, (t, r) in enumerate(titles)) + '</ol></section>\n'
b += f'<section><h2>Description <button data-copy="desc">Copy</button></h2><pre id="desc">{E(desc)}</pre></section>\n'
b += '<section><h2>Chapters</h2><ul class="chap">' + ''.join(f'<li><code>{c.split(" ",1)[0]}</code> {E(c.split(" ",1)[1])}</li>' for c in chap) + '</ul></section>\n'
b += '<section><h2>Tags <button data-copy="tagtxt">Copy</button></h2><div class="tags">' + ''.join(f'<span class="tag{" const" if i < 10 else ""}">{E(t)}</span>' for i, t in enumerate(tags)) + '</div><p class="sub" style="margin:10px 0 0;font-size:12px">Dashed = constant channel tags (always kept). Others are this video\'s own.</p><span id="tagtxt" hidden>' + E(', '.join(tags)) + '</span></section>\n'
b += '<section><h2>Pinned first comment <button data-copy="fc">Copy</button></h2><p id="fc" style="margin:0">Which one hit you this week: the dead inbox, the grounded flight, or the missing paycheck? Or did you dodge all three?</p></section>\n'
b += '<section><h2>Posting plan</h2><div class="meta"><div><b>Channel</b>Finance with Stromi (YouTube)</div><div><b>Proposed slot</b>16 Nov 2026, 13:00 UTC (before Monday\'s market open, since the video says \"watch Monday\")</div><div><b>Status</b>Waiting for your OK</div></div></section>\n'
open('index.html', 'w').write(head + b + tail)
