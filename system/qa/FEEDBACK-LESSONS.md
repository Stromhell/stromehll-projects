# QA feedback lessons (auto-generated from FEEDBACK-LESSONS.json, do not edit by hand)

Every mistake Pushpam flagged becomes a check that qa_lean.py runs on EVERY video. Add with `qa_learn.py add`.

| id | kind | the mistake | first/seen in | standard fix |
|---|---|---|---|---|
| L01 | visual | a character standing or walking ON a wall, roof, table, car or other object instead of the floor/road | GTA 6 v2 1:23, 3:21, 3:23, 9:36 (22 Nov); checklist 1, 3, 6; DumDown Avengers Mistakes (Pushpam 22 Nov): characters hovering over objects | put feet on the floor plane; walk to the door along the ground |
| L02 | visual | a character sitting on air, or seated without a chair/bed under them | checklist 2; DumDown Avengers Mistakes (Pushpam 22 Nov): characters not sitting properly on chairs | add the seat, align hips to it |
| L03 | visual | props, objects, papers, glasses, signs floating in the air instead of resting on a table/surface or held in a hand | GTA 6 v2 14:27 (22 Nov); checklist 4, 51, 52, 69, 78, 80 | seat the object on the table top with a contact shadow, or put it in the hand |
| L04 | visual | a road, street or vehicles drawn at the wrong angle for the camera (road should run sideways across the frame, or a car facing the wrong way) | GTA 6 v2 0:48, 6:03 (22 Nov); checklist 23 | turn the road to run left-right across the frame, vehicles in side view on it |
| L05 | visual | wrong real-world size: a car smaller than a person, people bigger than houses, giant cups, tiny background people | GTA 6 v2 3:21 (22 Nov); checklist 21, 22, 71 | scale to real sizes (car ~4.5 m, person ~1.75 m, door ~2 m) |
| L06 | visual | characters overlapping each other or clipping through furniture, doors, desks, chairs or props | checklist 13, 14, 54, 55, 70, 81, 82 | separate on depth; move the prop; character in front of/behind furniture properly |
| L07 | visual | a map, image or graphic spilling outside its TV/screen/frame instead of being masked inside it | GTA 6 v2 12:16 (22 Nov) | clip the content to the screen rectangle (mask) |
| L08 | visual | a scene that does not show the action the story needs (e.g. hospital scene without the patient sitting on a bed, no injection, generic background instead) | GTA 6 v2 5:56, 6:39 (22 Nov); checklist 12 | build the specific scene the VO describes, with the action shown |
| L09 | visual | text, captions, titles or cards covering a character's face or body, cut off at the frame edge, or placed over other text | checklist 32, 33, 77, 84, 85 | move text to empty space inside the safe area |
| L10 | visual | plain, empty, flat or low-detail background, blocky textures | checklist 26, 27, 57, 75 | add set detail, texture, props, light |
| L11 | visual | very dark frame where the subject is hard to see, or a black/blank frame | checklist 28, 31 | lift key light / re-render the missing shot |
| L12 | visual | broken bodies: missing or extra limbs, distorted faces, hair over the eyes, glasses or mustache in the wrong place | checklist 11, 20, 72, 83 | fix the rig / face add-on anchor |
| L13 | visual | the previous scene still showing after a cut, or the camera past the edge of the background (black strip) | checklist 68, 76 | hard cut cleanly; keep camera inside the plate |
| L14 | visual | a wrong or unofficial map of India, or wrong spelling/dates/names on screen | checklist 34, 35 | use the official map; fix the text |
| L15 | visual | a vehicle passing through a building, bridge or arch, or wheels not on the ground | checklist 5, 16 | route the vehicle around; ground the wheels |
| L20 | repeat | the same background or scene reused in different parts of the video | GTA 6 v2 5:56 'the ocean looks same' (22 Nov); checklist 25, 67 | build a new set for the new place |
| L30 | audio | voice-over cut off before the sentence ends (hard stop in speech) | GTA 6 v2 9:25 (22 Nov); checklist 44, 62 | extend the shot or trim at a pause; never cut VO mid-sentence |
| L31 | visual | a character's head, face or body cut off by the black bars / letterbox layout or the frame edge (bad framing) | DumDown Avengers Mistakes (Pushpam 22 Nov) | reframe: keep heads and hands inside the picture area; use taste + impeccable for framing |
| L32 | audio | voice glitching: crackle, warble, pitch jumps, robotic artefacts or clipped words in the voice | DumDown Avengers Mistakes (Pushpam 22 Nov); checklist 59-66 | re-generate the glitched line; run voice_qa.py on the dry VO |
| L33 | motion | a graphic box, card or overlay glitching: flicker, jump, pop, wrong frame for a moment | DumDown Avengers Mistakes (Pushpam 22 Nov); checklist 29, 50 | fix the overlay's keyframes / z-order; ease in and out |
| L34 | edit | rough, jarring cuts between gags and scenes (no transition, mid-motion jump, audio jump) | DumDown Avengers Mistakes (Pushpam 22 Nov); checklist 67, 68 | cut on action or a quick whip/match cut; crossfade audio over the cut |
