# Pushpam review 1 (22 Nov 18:20 UTC) of full v2: fixes (times = full video; act start times below)
Act starts in full: act0 0:00, act1 0:45.1, act2 1:46.6, act3 3:34.9, act4 5:32.2, act5 7:23.5, act6 9:06.4, act7 11:22.6, act8 13:29.5, act9 15:20.0. Act-local time = full time - act start.
His words (verbatim) and what they mean:
1. 0:48 (act1 ~2.9s) "make the road sideways now it look wrong" -> the road in the plate recedes in perspective while cars drive side-on. Use a SIDE-ON road plate (road runs left-right across frame, horizontal, cars drive along it), new plate road_side_night.
2. 1:23 (act1 ~38s) "the character is standing over the wall" -> Lucia's feet/body are on the corridor side wall. Stand her on the floor area, clear of walls/doors.
3. 3:21 (act2 ~94.4s) "standing on the wall and the size of car is small" -> Lucia in the prison half is standing on the wall; Jason's half: car parked behind is too small vs Jason (scale it to real size: a car is ~2.6x a person's height long).
4. 3:23 (act2 ~96.4s) "walk on the wall make the walk to the door" -> Lucia walks over the wall; make her walk along the floor towards the corridor door/gate.
5. 5:56 (act4 ~23.8s) "the ocean look same, create new scene for hospital and make him sit on the bed" -> the hospital is a small picture-in-picture over a reused sea/house plate. Build a real full-frame hospital room plate (hospital_room: bed with rails, drip stand, monitor, curtain, window) and show Jason SITTING ON THE BED, cop entering.
6. 6:03 (act4 ~30.8s) "make the road sideways" -> ambulance on a perspective road. Use the side-on road plate (road_side_night), ambulance driving left-right, wheels turning.
7. 6:39 (act4 ~66.8s) "make the character sit on the bed and inject also" -> motel: Jason must SIT ON THE BED (not floating/sofa), and show a painkiller injection (Lucia gives him an injection / syringe in hand, no gore).
8. 9:25 (act6 ~18.6s) "the vo is getting cut without completing the sentence" -> line rewritten + re-voiced: shot 2 now starts "Lucia says no. Straight away. So Abe makes them work..." Change the WHAT? bubble to "NO." and re-anchor.
9. 9:36 (act6 ~29.6s) "character are walking over the objects" -> in the warehouse shot, people walk over the crate/trainer; route walks around/behind props, props at correct depth.
10. 12:16 (act7 ~53.4s) "map is coming out of tv, mask it properly" -> the sea-lanes map draws outside the TV screen; clip it to the screen rect.
11. 14:27 (act8 ~57.5s) "place the object on the table" -> IMMUNITY file floats above the table; rest it on the table top.
Also look for the SAME class of problem in your whole act (people on walls, floating props, perspective roads with side-on cars, things outside screens) and fix it too.
Rules: ACT_BRIEF.md + QA_FIX_BRIEF.md still apply (edit only your acts' body.js, plates via plates.js if assigned, rebuild with mk.sh "act N", verify with snap.js at the problem times and LOOK, no renders, no commit). Never delete files.
