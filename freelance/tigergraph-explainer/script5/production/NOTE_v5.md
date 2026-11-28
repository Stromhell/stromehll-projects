# TigerGraph Script 5, v5 (28 Nov 2026)

Render: renders/TigerGraph_Script5_v5.mp4, 2:45.6, 1920x1080 30 fps, -14.3 LUFS, -4.1 dBTP. Same VO as v4 (vo_track_v4.wav).
Source: anim_v5/ (gen.py, lib.js, scenes/), audio/mix_v5.sh.

Changes from Pushpam's v4 notes:
- 0:22 records fade with the ring (no blink); "fuzzy matching" highlighted orange.
- 0:37 VS disc portals into the lens, the lens already holds the graph schema, demo starts zoomed and settles (one continuous move).
- 0:52 / 1:24 camera framed wider (cam scale .84) so visuals sit away from the type.
- 1:14 "lets them go": both cards drift apart, tilt and fade back.
- 1:19 tile glow is a slow sine pulse; softer orange shockwave.
- 1:38 neural network grows in stages behind the scene with parallax drift.
- 2:02 mini graph lives in the camera space joined to the Graph-confirms line; at the end it grows toward camera and one line races out right.
- 2:04 sc12 opens on the blue ground, the line plugs into the Anna Lee card, the light ground opens from the card.
- 2:09 copies slower, power2.inOut. 2:14 the Anna Lee card morphs into the checklist card while its text fades; on "graph" large faint lines with travelling dots move behind.
- 2:22 / 2:29 all network lines are live links re-measured every frame, clipped to the card edges.
- 2:32 dashboard flies in as a tilted glass browser window with a light sweep and parallax glass panes, settles flat as the camera pushes in, rack focus, KPI panel comes forward with a tilt. sc12 exits with a portal into the shared-address node.
- Global: stronger 3D camera drift + foreground blurred glass shards for parallax (refs 1, 2, 5).

QA (qa_auto full): 0 errors decode. 2 FAIL flags at 2:06-2:08 judged false positives: "cut leak" is the radial ground reveal (blue corners stay while the centre opens, by design); "camera frozen" is on the near-flat light ground while cards are moving and the world pushes in 12%.
