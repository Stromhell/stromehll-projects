# TigerGraph Script 5, v4 (client v3 feedback brief, 28 Nov)

- VO re-voiced about 15% slower (Kokoro af_heart, speed 0.85). Runtime is 2:46, with rests at the pivots. Pronunciation fixes were checked with Whisper: Reyes, Novak, AML, deduplicating.
- Opening: the left-to-right scan line is gone. It is now a top-down neural cascade (parent node, curved branches with a travelling spark, cards bloom with a 3D settle, details cascade in). MERGE? is a blue pill: letters track out, an orange energy wave floods it on hover, and the press goes 96 -> 104 -> 100.
- Scene 3 is redesigned: deep navy #0A1628 with a vignette, crisp white type, glowing pill highlights, and record cards orbiting on a dotted 3D ring above a horizon.
- VS is a clean vector frosted-glass disc with a 1 px rim. The camera dives through the Graph lens into the navy network space.
- Scene joins: every scene renders 0.6 s past its end and is cross-dissolved under the next scene's camera move, so there are no blank or slide cuts.
- Network tiles land on their spoken nouns, more slowly. The gauge card has more padding, and its needle lazily overshoots to 61 and settles at 58. The Novak scene gets a dot-grid floor, bokeh, and tilted cards. Collisions get shockwave rings.
- Dull orange is removed: cards are frosted glass with an orange rim glow only on risk; the merged bar runs blue to bright orange.
- Deposit graph: faint axes, then a smooth line drawn left to right with a glowing leading orb and a gradient fill, plus orange anomaly points with callout tags.
- Nubank card: dotted glowing arc between the rings.
- End slate: a centred lockup per storyboard v5 (logo, line, CTA, URL) settles from 96% to 100%, then holds for about 4 s with a light sweep across the CTA.
- Mix: -14.3 LUFS, true peak -4.0 dBTP, music ducked under the VO.

Rebuild: `python3 vo/vo_v4.py && ~/.venvs/hf/bin/python vo/vo_v4.py --time && python3 anim_v4/gen.py && node anim_v4/render.js OUT && bash audio/mix_v4.sh OUT OUT/TigerGraph_Script5_v4.mp4`
