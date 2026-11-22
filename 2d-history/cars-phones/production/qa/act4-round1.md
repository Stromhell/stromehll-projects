# act4 QA round 1 (render of real timing)
qa_auto: FAIL 1 (camera frozen 0:56.3 for 6.8 s), WARN cut rhythm (57% shots > 8 s).

| time | issue | sev | cause | fix |
|---|---|---|---|---|
| 0:56-1:05 | camera frozen, frame empty, car small | high | cam z 1->1.06, car s .72 | cam push 1.0->1.12 + pan, car s .9 |
| all | tags/cards too small (cap < 34 px) | high | NAME 40px, SRC 26px, cards 30-56px | NAME 60/36, SRC 46, cards 50-96, boxes enlarged |
| 0:43-0:55 | lawmaker small in MED shot | med | s 1.6 | s 2.2, cam z 1.1->1.24 |
| 0:29-0:42 | memorial tiny | med | flowers s 1.6 | s 2.4; cam push 1.04->1.18 |
| 0:00-0:28 | weak camera motion | med | small cam ranges | bigger push/pan |
| 0:12 | PHONE WITH A DOOR card over source label | med | placement | moved to top right |
| cut rhythm | shots 13-15 s | low | one shot per VO paragraph (brief rule) | accepted, camera moves throughout |
| flicker CHECKs 0:14.75, 0:42.75 | shot cuts | low | intended cuts | none |
