import base64
#!/usr/bin/env python3
"""Build the production script (.md) and storyboard page (.html) from a video's build/data.py.
Usage: python3 gen.py /mnt/project-files/2d-history/<video>
"""
import html, importlib.util, json, re, sys
from pathlib import Path

WPM = 160  # measured: Secret Service 2,460 words ran 14:52 in Pushpam's voice

def load(vdir):
    spec = importlib.util.spec_from_file_location("data", Path(vdir) / "build" / "data.py")
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m

def words(s): return len(re.findall(r"[\w'’%$.,-]+", s)) if s else 0
def secs(vo): return max(3.0, round(words(vo) / WPM * 60 + 0.8, 1)) if vo else 4.0
def mmss(s): s = int(round(s)); return f"{s//60}:{s%60:02d}"

def build(vdir):
    d = load(vdir); M = d.META; acts = d.ACTS
    rows, total_w, total_s, n = [], 0, 0.0, 0
    for ai, (aname, folder, shots) in enumerate(acts):
        arows = []
        for si, (typ, vo, vis, ons) in enumerate(shots, 1):
            sid = f"{ai}.{si:02d}"; s = secs(vo); n += 1
            total_w += words(vo); total_s += s
            sk = getattr(d, 'SK', None); anim = ''; img = ''
            if sk:
                anim = sk[ai][si - 1][1]
                f = Path(vdir) / 'storyboard/sketches' / f"{M['prefix']}_{sid}.jpg"
                if f.exists(): img = 'data:image/jpeg;base64,' + base64.b64encode(f.read_bytes()).decode()
            arows.append(dict(id=sid, type=typ, sec=s, vo=vo, visual=vis, onscreen=ons, anim=anim, img=img))
        rows.append(dict(name=aname, folder=folder, shots=arows,
                         sec=sum(r["sec"] for r in arows), words=sum(words(r["vo"]) for r in arows)))
    stats = dict(shots=n, words=total_w, runtime=mmss(total_s), acts=len(acts))
    vd = Path(vdir)
    # markdown
    md = [f"# {M['title']}", "", f"Working title: **{M['working_title']}**", "",
          f"{stats['acts']} parts (cold open + {stats['acts']-1} acts), {n} shots, {total_w} words, about {stats['runtime']} at {WPM} wpm.", "",
          f"**Running device:** {M['device']}", "", f"**Look:** {M['style']}", ""]
    if getattr(d, "HOOKS", None):
        md += ["## Hooks (yt-script hookscore)", ""] + [f"- ({h[1]}) {h[0]}" for h in d.HOOKS] + [""]
    for a in rows:
        md += [f"## {a['name']}  ({mmss(a['sec'])}, {a['words']} words)", "",
               "| Shot | Type | Sec | VO | Visual | On screen |", "|---|---|---|---|---|---|"]
        for r in a["shots"]:
            esc = lambda t: (t or "").replace("|", "/")
            md.append(f"| {r['id']} | {r['type']} | {r['sec']} | {esc(r['vo'])} | {esc(r['visual'])} | {esc(r['onscreen'])} |")
        md.append("")
    if getattr(d, "LAUNCH", None):
        L = d.LAUNCH
        md += ["## Launch package", "", "**Titles:**"] + [f"- {t}" for t in L["titles"]] + [
               "", f"**Thumbnail:** {L['thumb']}", "", "**15 reel moments:**"] + [f"{i}. {r}" for i, r in enumerate(L["reels"], 1)] + [""]
    md += ["## Fact-check fixes against the transcript", ""] + [f"- {f}" for f in d.FACT_FIXES]
    if getattr(d, "CUTS", None): md += ["", "## Removed from the transcript", ""] + [f"- {c}" for c in d.CUTS]
    (vd / f"{M['slug']}-production-script.md").write_text("\n".join(md) + "\n")
    # narration text per act for the voice step (years and numbers left as written; voice prep converts them)
    vdir_voice = vd / "production" / "voice"; vdir_voice.mkdir(parents=True, exist_ok=True)
    for i, a in enumerate(rows):
        (vdir_voice / f"act{i}.txt").write_text("\n\n".join(r["vo"] for r in a["shots"] if r["vo"]) + "\n")
    (vd / "build" / "storyboard.json").write_text(json.dumps(dict(meta=M, stats=stats, acts=rows,
        hooks=getattr(d, "HOOKS", []), launch=getattr(d, "LAUNCH", {}), fixes=d.FACT_FIXES,
        cuts=getattr(d, "CUTS", [])), indent=1))
    page = render_html(M, stats, rows, d)
    (vd / "storyboard").mkdir(exist_ok=True)
    (vd / "storyboard" / f"{M['prefix']}_storyboard.html").write_text(page)
    print(json.dumps(stats))

def e(t): return html.escape(t or "")

def render_html(M, stats, rows, d):
    hooks = getattr(d, "HOOKS", []); L = getattr(d, "LAUNCH", {}); cuts = getattr(d, "CUTS", [])
    acts_html = []
    for i, a in enumerate(rows):
        shots = "".join(f"""<li class="shot"><div class="sid"><b class="num">{e(r['id'])}</b><span class="ty t-{e(r['type']).lower()}">{e(r['type'])}</span><span class="sec num">{r['sec']}s</span></div>
{f'<img class="sk" loading="lazy" src="{r["img"]}" alt="Pencil sketch of shot {e(r["id"])}">' if r.get('img') else ''}<div class="body"><p class="vo">{e(r['vo']) or '<em>(no narration)</em>'}</p><p class="vis">{e(r['visual'])}</p>{f'<p class="ons">{e(r["onscreen"])}</p>' if r['onscreen'] else ''}{f'<p class="anim"><span>ANIMATION</span>{e(r["anim"])}</p>' if r.get('anim') else ''}</div></li>""" for r in a["shots"])
        acts_html.append(f"""<section class="act" id="part{i}"><header class="acthead"><h2>{e(a['name'])}</h2><span class="num">{mmss(a['sec'])} · {len(a['shots'])} shots · {a['words']} words</span></header><ol class="shots">{shots}</ol></section>""")
    toc = "".join(f'<a href="#part{i}">{e(a["name"].split(":")[0] if ":" in a["name"] else a["name"])}</a>' for i, a in enumerate(rows))
    hook_html = "".join(f'<li><span class="score num">{e(str(h[1]))}</span><span>{e(h[0])}</span></li>' for h in hooks)
    launch_html = ""
    if L:
        launch_html = f"""<section class="panel" id="launch"><h2>Launch package</h2>
<h3>Titles</h3><ol class="plain">{''.join(f'<li>{e(t)}</li>' for t in L['titles'])}</ol>
<h3>Thumbnail</h3><p>{e(L['thumb'])}</p>
<h3>15 reel moments</h3><ol class="plain reels">{''.join(f'<li>{e(r)}</li>' for r in L['reels'])}</ol></section>"""
    cuts_html = f"<h3>Removed from the transcript</h3><ul class='plain'>{''.join(f'<li>{e(c)}</li>' for c in cuts)}</ul>" if cuts else ""
    return f"""<title>{e(M['title'])}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
/* Layout: a production storyboard binder. Title block, then one strip of shots per act, then the launch package and the fact log. */
:root{{
 --paper:#efe4c9; --sheet:#f8f1df; --ink:#2b1e16; --mute:#6e5a45; --rule:#d6c39a; --gold:#b9862a; --red:#a3352b;
 --display:"Anton","Oswald","Arial Narrow",sans-serif; --sub:"Oswald","Arial Narrow",sans-serif;
 --body:"Source Serif 4",Georgia,serif; --mono:"IBM Plex Mono",ui-monospace,monospace;
}}
@media (prefers-color-scheme: dark){{:root:not([data-theme="light"]){{--paper:#17120e;--sheet:#211a14;--ink:#efe2c8;--mute:#b39d80;--rule:#3d3125;--gold:#e0b25a;--red:#e07a6c;color-scheme:dark}}}}
:root[data-theme="dark"]{{--paper:#17120e;--sheet:#211a14;--ink:#efe2c8;--mute:#b39d80;--rule:#3d3125;--gold:#e0b25a;--red:#e07a6c;color-scheme:dark}}
*{{box-sizing:border-box}}
body{{background:var(--paper);color:var(--ink);font-family:var(--body);font-size:16px;line-height:1.5}}
.wrap{{max-width:1040px;margin:0 auto;padding-block:32px 64px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:28px}}
.eyebrow{{font-family:var(--mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}}
h1{{font-family:var(--display);font-weight:400;font-size:clamp(34px,6.4vw,64px);line-height:1;margin:8px 0 10px;letter-spacing:.01em;text-transform:uppercase;text-wrap:balance}}
.wt{{font-family:var(--sub);font-size:clamp(18px,2.4vw,22px);color:var(--red);margin:0;text-wrap:balance}}
.num{{font-family:var(--mono);font-variant-numeric:tabular-nums}}
.stats{{display:flex;flex-wrap:wrap;gap:10px 28px;margin-top:16px}}
.stats div b{{display:block;font-family:var(--mono);font-size:22px;font-weight:500}}
.stats div span{{font-size:12px;color:var(--mute);text-transform:uppercase;letter-spacing:.08em;font-family:var(--mono)}}
.panel{{background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:20px 22px;display:grid;gap:8px;min-width:0}}
.panel h2,.acthead h2{{font-family:var(--sub);font-weight:600;font-size:24px;margin:0;letter-spacing:.02em;text-transform:uppercase}}
.panel h3{{font-family:var(--mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);margin:12px 0 2px;font-weight:500}}
.panel p{{margin:0;max-width:72ch}}
.grid2{{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:16px}}
ul.plain,ol.plain{{margin:0;padding-left:1.2em;display:grid;gap:6px}}
.hooks{{list-style:none;margin:0;padding:0;display:grid;gap:8px}}
.hooks li{{display:grid;grid-template-columns:44px 1fr;gap:10px;align-items:baseline}}
.score{{font-size:14px;color:var(--gold);border:1px solid var(--gold);border-radius:3px;text-align:center;padding:1px 0}}
nav.toc{{display:flex;flex-wrap:wrap;gap:6px}}
nav.toc a{{font-family:var(--mono);font-size:12px;color:var(--ink);text-decoration:none;border:1px solid var(--rule);border-radius:99px;padding:4px 10px;background:var(--sheet)}}
nav.toc a:hover,nav.toc a:focus-visible{{border-color:var(--red);color:var(--red);outline:none}}
.act{{display:grid;gap:10px}}
.acthead{{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px 16px;border-bottom:2px solid var(--ink);padding-bottom:6px}}
.acthead .num{{font-size:13px;color:var(--mute)}}
.shots{{list-style:none;margin:0;padding:0;display:grid;gap:0}}
.shot{{display:grid;grid-template-columns:90px minmax(0,320px) 1fr;gap:16px;align-items:start;padding:12px 0;border-bottom:1px solid var(--rule)}}
.sid{{display:flex;flex-direction:column;gap:4px;align-items:flex-start}}
.sid b{{font-size:15px;font-weight:500}}
.ty{{font-family:var(--mono);font-size:11px;letter-spacing:.08em;padding:1px 7px;border-radius:3px;border:1px solid currentColor;color:var(--mute)}}
.t-map,.t-chart{{color:var(--gold)}} .t-title,.t-card{{color:var(--red)}}
.sec{{font-size:12px;color:var(--mute)}}
.body{{min-width:0;display:grid;gap:4px}}
.vo{{margin:0;font-size:17px}}
.vis{{margin:0;font-size:14px;color:var(--mute);font-family:var(--sub);font-weight:500;letter-spacing:.01em}}
.ons{{margin:0;justify-self:start;font-family:var(--display);font-size:15px;letter-spacing:.04em;background:var(--ink);color:var(--sheet);padding:2px 10px;transform:rotate(-1.5deg)}}
.sk{{width:100%;aspect-ratio:16/9;object-fit:cover;border:1px solid var(--rule);border-radius:2px;background:#f4f1ea}}
.anim{{margin:4px 0 0;font-size:14px;line-height:1.45;border-left:3px solid var(--red);padding-left:10px}}
.anim span{{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;color:var(--red);margin-bottom:2px}}
@media (max-width:820px){{.shot{{grid-template-columns:80px 1fr}}.sk{{grid-column:2}}.body{{grid-column:2}}}}
@media (max-width:600px){{.shot{{grid-template-columns:1fr;gap:6px}}.sid{{flex-direction:row;gap:10px;align-items:baseline}}}}
</style>
<div class="wrap">
<header><div class="eyebrow">Stromhell · 2D dynamic · Village Painterly · storyboard v1</div><h1>{e(M['title'])}</h1><p class="wt">Recommended title: {e(M['working_title'])}</p>
<div class="stats"><div><b>{stats['runtime']}</b><span>Est. runtime</span></div><div><b>{stats['acts']}</b><span>Parts</span></div><div><b>{stats['shots']}</b><span>Shots</span></div><div><b>{stats['words']:,}</b><span>Words</span></div></div></header>
<div class="grid2"><section class="panel"><h2>Hook</h2><h3>Top hooks, yt-script score</h3><ul class="hooks">{hook_html}</ul></section>
<section class="panel"><h2>Look and device</h2><h3>Running device</h3><p>{e(M['device'])}</p><h3>Look</h3><p>{e(M['style'])}</p></section></div>
<nav class="toc" aria-label="Parts">{toc}<a href="#launch">Launch</a><a href="#facts">Fact log</a></nav>
{''.join(acts_html)}
{launch_html}
<section class="panel" id="facts"><h2>Fact log</h2><h3>Fixes against the transcript</h3><ul class="plain">{''.join(f'<li>{e(f)}</li>' for f in d.FACT_FIXES)}</ul>{cuts_html}</section>
</div>"""

if __name__ == "__main__":
    build(sys.argv[1])
