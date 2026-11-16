import json, html, sys
link = sys.argv[1] if len(sys.argv) > 1 else '#'
LEN = sys.argv[2] if len(sys.argv) > 2 else '15:48'
VER = sys.argv[3] if len(sys.argv) > 3 else 'v1'
src = open('base-kit.html').read()
head = src[:src.index('<body>')].replace('Credit Cards Launch Kit', '10 Money Concepts Launch Kit')
tail = src[src.index('</main><script>'):]
desc = open('youtube-description_v1.txt').read(); tags = json.load(open('youtube-tags_v1.json'))
chap = [l for l in desc.split('\n') if len(l) > 4 and l[0].isdigit() and ':' in l[:6]]
titles = [("10 Money Concepts Nobody Explains (Until It Costs You)", True), ("Where Did My Paycheck Go? 10 Money Ideas in 15 Minutes", False), ("10 Money Concepts Nobody Explains", False)]
E = html.escape
b = '<body><main>\n<h1>10 Money Concepts Nobody Explains</h1>\n<p class="sub">Finance with Stromi · video 06 (Basic Financial Concepts) · launch kit ' + VER + '. Waiting for Pushpam\'s OK. Nothing is booked yet.</p>\n'
b += f'<section><h2>Full video ({VER})</h2><div class="meta"><div><b>Length</b>{LEN}</div><div><b>Format</b>1920×1080, 24 fps, -14 LUFS</div><div><b>End screen</b>clean last 5 s</div><div><b>Watch</b><a href="{link}">Open on Drive</a></div></div></section>\n'
b += '<section><h2>Thumbnail</h2><img src="thumb.jpg" alt="Thumbnail: $2,000 to $1,631, 10 MONEY CONCEPTS NOBODY EXPLAINS"></section>\n'
b += '<section><h2>Title options</h2><ol class="titles">' + ''.join(f'<li><span class="n">{i+1}</span><span class="t">{E(t)}</span><span class="c">{len(t)} chars</span>{"<span class=pill>Recommended</span>" if r else ""}</li>' for i, (t, r) in enumerate(titles)) + '</ol></section>\n'
b += f'<section><h2>Description <button data-copy="desc">Copy</button></h2><pre id="desc">{E(desc)}</pre></section>\n'
b += '<section><h2>Chapters</h2><ul class="chap">' + ''.join(f'<li><code>{c.split(" ",1)[0]}</code> {E(c.split(" ",1)[1])}</li>' for c in chap) + '</ul></section>\n'
b += '<section><h2>Tags <button data-copy="tagtxt">Copy</button></h2><div class="tags">' + ''.join(f'<span class="tag{" const" if i < 10 else ""}">{E(t)}</span>' for i, t in enumerate(tags)) + '</div><p class="sub" style="margin:10px 0 0;font-size:12px">Dashed = constant channel tags (always kept). Others are this video\'s own.</p><span id="tagtxt" hidden>' + E(', '.join(tags)) + '</span></section>\n'
b += '<section><h2>Pinned first comment <button data-copy="fc">Copy</button></h2><p id="fc" style="margin:0">Nana June says the lasagne is now $12. Which of the 10 did nobody ever explain to you?</p></section>\n'
b += '<section><h2>Posting plan</h2><div class="meta"><div><b>Channel</b>Finance with Stromi (YouTube)</div><div><b>Proposed slot</b>Wed 25 Nov 2026, 16:00 UTC (9:30 PM IST)</div><div><b>Status</b>Not booked. Books after Pushpam\'s OK</div></div></section>\n'
open('index.html', 'w').write(head + b + tail)
