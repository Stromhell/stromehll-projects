# Graph Report - pg  (2026-10-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 835 nodes · 1052 edges · 175 communities (22 shown, 153 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- 2d-dynamic / shared / gen.py (+10 files)
- 2d-dynamic / shared / mksfx.py (+6 files)
- 2d-history / shared / props.js
- 2d-history / shared / motifs.js (+1 files)
- 2d-dynamic / shared / kit.js
- 2d-history / shared / kit.js
- 2d-history / shared / kit_v1.js
- 2d-dynamic / shared / vp.js
- 2d-dynamic / shared / render.js (+4 files)
- 2d-history / shared / room.js (+1 files)
- 2d-history / shared / engine.js
- 2d-history / shared / envs.js
- 2d-history / shared / anim.js
- 2d-history / shared / anim_v4.js
- 2d-history / shared / anim_v1.js
- 2d-history / shared / anim_v2.js
- 2d-history / shared / anim_v3.js
- 2d-history / shared / rig.js
- 2d-history / shared / rig_v2a.js
- 2d-history / shared / rig_v3a.js
- 2d-history / shared / rig_v3b.js
- 2d-history / shared / rig_v4.js
- 2d-history / shared / rig_v5.js
- 2d-history / shared / rig_v5_presit.js
- 2d-history / shared / rig_v5_prewalk.js
- 2d-dynamic / napoleon / body3.js
- 2d-dynamic / shared / pipeline_dd.sh
- 2d-history / shared / rig_leo.js
- 2d-history / shared / rig_leo_v1.js
- 2d-history / shared / rig_leo_v2.js
- 2d-history / shared / rig_v1.js
- 2d-dynamic / mongols-ain-jalut / body5.js
- 2d-dynamic / mongols-ain-jalut / body6.js
- 2d-dynamic / napoleon / body0.js
- 2d-dynamic / napoleon / body5.js
- 2d-dynamic / mongols-ain-jalut / body2.js
- 2d-dynamic / mongols-ain-jalut / body4.js
- 2d-dynamic / napoleon / body4.js
- 2d-dynamic / eli-cohen-1 / body5.js
- 2d-dynamic / napoleon / body2.js
- 2d-dynamic / spain-2-empire / es2_cast.js
- 2d-dynamic / mongols-ain-jalut / body0.js
- 2d-dynamic / napoleon / body6.js
- 2d-dynamic / shared / scenes.js
- 2d-dynamic / shared / spain.js
- 2d-dynamic / shared / watchdog_dd.sh
- 2d-dynamic / style-frames / spain.js
- 2d-dynamic / eli-cohen-1 / build_acts.sh
- 2d-dynamic / eli-cohen-2 / build_acts.sh
- 2d-dynamic / mongols-ain-jalut / build_acts.sh
- 2d-dynamic / napoleon / build_acts.sh
- 2d-dynamic / north-korea-next / build_acts.sh
- 2d-dynamic / shared / render_act.sh
- 2d-history / shared / render_act.sh

## God Nodes (most connected - your core abstractions)
1. `PR` - 44 edges
2. `K` - 28 edges
3. `K` - 28 edges
4. `K` - 28 edges
5. `VP` - 25 edges
6. `M` - 23 edges
7. `ENV` - 18 edges
8. `A` - 14 edges
9. `A` - 14 edges
10. `A` - 13 edges

## Surprising Connections (you probably didn't know these)
- `frame()` --indirect_call--> `words()`  [INFERRED]
  pipeline/2d-dynamic/shared/reels/build_reel_dd.py → pipeline/2d-dynamic/shared/gen.py
- `wer()` --calls--> `norm()`  [INFERRED]
  pipeline/2d-dynamic/shared/wt.py → pipeline/2d-dynamic/shared/mksfx.py
- `wer()` --calls--> `norm()`  [INFERRED]
  pipeline/2d-history/shared/wt.py → pipeline/2d-history/shared/mksfx.py

## Import Cycles
- None detected.

## Communities (175 total, 153 thin omitted)

### Community 0 - "2d-dynamic / shared / gen.py (+10 files)"
Cohesion: 0.07
Nodes (26): build(), e(), load(), mmss(), render_html(), secs(), words(), frame() (+18 more)

### Community 1 - "2d-dynamic / shared / mksfx.py (+6 files)"
Cohesion: 0.09
Nodes (32): get(), load(), bp(), env(), fade(), loop(), lp(), noise() (+24 more)

### Community 8 - "2d-dynamic / shared / render.js (+4 files)"
Cohesion: 0.12
Nodes (15): { chromium }, fs, path, { chromium }, fs, path, { chromium }, fs (+7 more)

### Community 10 - "2d-history / shared / engine.js"
Cohesion: 0.24
Nodes (18): canvasTexture(), fillStrokes(), finish(), glow(), hex(), inPoly(), jitter(), kuwahara() (+10 more)

### Community 17 - "2d-history / shared / rig.js"
Cohesion: 0.33
Nodes (5): blinkAmt(), C, limb(), mitten(), poseAngles()

### Community 18 - "2d-history / shared / rig_v2a.js"
Cohesion: 0.33
Nodes (5): blinkAmt(), C, limb(), mitten(), poseAngles()

### Community 19 - "2d-history / shared / rig_v3a.js"
Cohesion: 0.33
Nodes (5): blinkAmt(), C, limb(), mitten(), poseAngles()

### Community 20 - "2d-history / shared / rig_v3b.js"
Cohesion: 0.33
Nodes (5): blinkAmt(), C, limb(), mitten(), poseAngles()

### Community 21 - "2d-history / shared / rig_v4.js"
Cohesion: 0.33
Nodes (5): blinkAmt(), C, limb(), mitten(), poseAngles()

### Community 22 - "2d-history / shared / rig_v5.js"
Cohesion: 0.33
Nodes (5): blinkAmt(), C, limb(), mitten(), poseAngles()

### Community 23 - "2d-history / shared / rig_v5_presit.js"
Cohesion: 0.33
Nodes (5): blinkAmt(), C, limb(), mitten(), poseAngles()

### Community 24 - "2d-history / shared / rig_v5_prewalk.js"
Cohesion: 0.33
Nodes (5): blinkAmt(), C, limb(), mitten(), poseAngles()

### Community 26 - "2d-dynamic / shared / pipeline_dd.sh"
Cohesion: 0.54
Nodes (7): back(), combine(), log(), reels(), render(), pipeline_dd.sh script, step()

### Community 27 - "2d-history / shared / rig_leo.js"
Cohesion: 0.39
Nodes (3): hand(), C, limb()

### Community 28 - "2d-history / shared / rig_leo_v1.js"
Cohesion: 0.39
Nodes (3): hand(), C, limb()

### Community 29 - "2d-history / shared / rig_leo_v2.js"
Cohesion: 0.39
Nodes (3): hand(), C, limb()

### Community 30 - "2d-history / shared / rig_v1.js"
Cohesion: 0.36
Nodes (4): blinkAmt(), C, limb(), poseAngles()

### Community 31 - "2d-dynamic / mongols-ain-jalut / body5.js"
Cohesion: 0.29
Nodes (4): ALL, MAM, MON, SYR

### Community 32 - "2d-dynamic / mongols-ain-jalut / body6.js"
Cohesion: 0.29
Nodes (4): GOLD, GREYE, MAM, MON

### Community 34 - "2d-dynamic / napoleon / body0.js"
Cohesion: 0.33
Nodes (3): BR, CROSSERS, EMPIRE

### Community 35 - "2d-dynamic / napoleon / body5.js"
Cohesion: 0.33
Nodes (4): ALLIES, CUIR, ROYAL, ROYAL2

### Community 37 - "2d-dynamic / mongols-ain-jalut / body2.js"
Cohesion: 0.40
Nodes (3): CITIES, HOME, WAVE

## Knowledge Gaps
- **153 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `2d-dynamic / shared / gen.py (+10 files)` be split into smaller, more focused modules?**
  _Cohesion score 0.07247223845704266 - nodes in this community are weakly interconnected._
- **Should `2d-dynamic / shared / mksfx.py (+6 files)` be split into smaller, more focused modules?**
  _Cohesion score 0.0851063829787234 - nodes in this community are weakly interconnected._
- **Should `2d-history / shared / props.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07878787878787878 - nodes in this community are weakly interconnected._
- **Should `2d-history / shared / motifs.js (+1 files)` be split into smaller, more focused modules?**
  _Cohesion score 0.0896551724137931 - nodes in this community are weakly interconnected._
- **Should `2d-dynamic / shared / kit.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1330049261083744 - nodes in this community are weakly interconnected._
- **Should `2d-history / shared / kit.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1330049261083744 - nodes in this community are weakly interconnected._
- **Should `2d-history / shared / kit_v1.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1330049261083744 - nodes in this community are weakly interconnected._