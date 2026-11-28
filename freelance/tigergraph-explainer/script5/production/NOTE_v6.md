# TigerGraph Script 5, v6 (28 Nov 2026), from the "Seamless Motion Transition Review"

Render: renders/TigerGraph_Script5_v6.mp4, 2:45.6, 1080p30, -14.3 LUFS, -4.1 dBTP, same VO as v4/v5.
Source: anim_v6/ (lib.js adds chip()/morph() carry system + envNet()), audio/mix_v6.sh.

Every scene change now carries one object that physically becomes the next scene (carry, travel, transform, reveal):
- 0:14 record cards fold into blue/orange identity discs -> the discs drop onto the bodies as the two people's heads.
- 0:20 each person folds into a record card -> the cards land on the orbit ring of the question scene.
- 0:29 Daniel and Dan fly off the ring toward camera and open into the two comparison lenses.
- 0:36 camera dives through the Graph lens into the schema (kept from v5).
- 0:53 the two name labels stretch into the two risk cards.
- 1:04 the risk cards travel into the Lena/Novakova record cards; the orange risk bar drops and opens into the 58% gauge card.
- 1:14 the two names lift off the records and become the graph's centre labels.
- 1:27 the three orange evidence nodes become the first three transaction cards (camera orbits).
- 1:35 the whole chart panel pulls in and becomes the 92% score card.
- 1:51 the three "kept in the graph" lines stretch into the three workflow slots.
- 2:04 the confirming graph node comes to centre and expands into the Anna Lee card (light opens from the card).
- 2:30 the camera travels into the orange shared-address node; it opens into the dashboard window.
- 2:38 the 90% ring pulls off the panel and sweeps down to become the glowing end-card arc.
Also: one persistent network drawn behind every scene on global time (only its lighting changes light <-> dark), and varied camera exits (push, pull, orbit, tilt, rise) instead of side whips.
Carried objects hold still on the handoff pose through the 0.6 s dissolve, so nothing doubles.

QA: qa_auto 1 FAIL flag "camera frozen 2:07.8" = the plain light ground while the duplicate cards animate and the world pushes in 12% (judged false positive, same as v5).
