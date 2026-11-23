// PREDICTIONS: one paragraph per character, each on that character's trailer set, with a prediction pop; + GAG 9 STRING BOARD
const G9 = k => GS('GAG 9', k);
const PR = [
  [1, 'doomH', 'dd_doom_hall', 'DOOM WINS ROUND ONE', 'raise', 'wins'], [2, 'oldCap', 'dd_farm_yard', 'THE SPEECH THAT UNITES', 'raise', 'speech'], [3, 'agentPeg', 'dd_farm_living', 'KNOWS DOOM FIRST', 'pointHold', 'Never'],
  [4, 'thunderBro', 'dd_storm_field', 'RUNE KING POWER-UP', 'powerUp', 'gold'], [5, 'newCap', 'dd_brick_roof', 'THE SHIELD IS HIS', 'block', 'shield'], [6, 'stretch', 'dd_ship_corridor', 'THE PLAN (TOO MANY WORDS)', 'pointHold', 'plan'],
  [7, 'glowSue', 'dd_water_beach', 'HOLDS 2 UNIVERSES APART', 'block', 'Holds'], [8, 'flameKid', 'dd_battlefield', '1 TERRIBLE JOKE (MIN.)', 'fire', 'burns'], [9, 'rockBen', 'dd_water_beach', 'HANDSHAKE: STILL GOING', 'grab', 'Best'],
  [10, 'yelenaD', 'dd_hangar', 'SECRETLY RIGHT', 'shrug', 'secretly'], [11, 'ringGuy', 'dd_battlefield', 'FIGHT, THEN FRIENDS', 'punch', 'Fights'], [12, 'laserEyes', 'dd_battlefield', 'X-MEN JOIN THE AVENGERS', 'raise', 'join'],
  [13, 'blueLady', 'dd_hangar', 'FAKE TEAMMATE', 'morph', 'Pretends'], [14, 'profX', 'dd_library', 'WORLDS MUST TEAM UP', 'pointHold', 'first'], [15, 'ankles', 'dd_water_beach', 'UNEASY TRUCE', 'shrug', 'truce']];
const FIRE = { flameKid: [{ k: 'fireHands', on: 0, s: .6 }] };
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_studio_board', title: ['MY PREDICTIONS', 'WHAT EVERY CHARACTER WILL DO'], cam: { frame: 'med', on: 0, push: [1, 1.05] }, chars: [{ c: 'stormi', x: 900, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'happy', talk: true, acts: [{ a: 'pointHold', w: 'guesses' }] }],
   props: [{ k: 'stringWall', x: 1650, y: 1000, s: 1.1 }], pops: [{ t: 'GUESSES, NOT FACTS', w: 'guesses', dur: 2.2 }] },
].concat(...PR.map(([p, c, plate, t, a, w], i) => [
 { p, plate: 'dd_studio_board', still: 1, cam: { z: [1.5, 1.6], x: 1650, y: 900 }, props: [{ k: 'stringWall', x: 1650, y: 1000, s: 1.1 }], chars: [], pops: [{ t: 'PREDICTION #' + p, x: 960, y: 300, at: .1, dur: 1.1 }] },
 { p, f: .12, plate, cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c, x: 1280, y: 1300, s: 1.4, view: i % 2 ? 'threequarter' : 'front', dir: i % 3 ? 1 : -1, expr: a === 'shrug' ? 'smug' : 'angry', seat: c === 'profX' ? 1 : 0, acts: [{ a, w }] }].concat(c === 'rockBen' ? [{ c: 'mountain', x: 1780, y: 1300, s: 1.45, view: 'side', dir: -1, expr: 'smile', acts: [{ a: 'grab', at: 0 }] }] : []),
   props: (FIRE[c] || []).concat(c === 'profX' ? [{ k: 'armchair', x: 1280, y: 1300, s: 1.3 }] : []).concat(c === 'newCap' ? [{ k: 'roundShield', on: 0, s: .45, side: 'L' }] : []), pops: [{ t, x: 1400, y: 300, w, dur: 2.6 }] }]), [
 // GAG 9 STRING BOARD: Stormi pins the last card, tangled in red string, falls over, "...nailed it"
 { p: 16, plate: 'dd_studio_board', cam: { frame: 'med', on: 0, push: [1, 1.05] }, chars: [{ c: 'stormi', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'point', at: .1 }, { a: 'fall', at: 1.5 }], talk: TK('GAG 9', [0]) }],
   props: [{ k: 'stringWall', x: 1650, y: 1000, s: 1.1 }, { k: 'chains', x: 1100, y: 1100, s: .6, col: '#d82a2a', t0: 1.0 }], pops: [{ t: 'TANGLED', x: 640, y: 300, at: 1.2, dur: 1.6 }, { t: 'NAILED IT', x: 1300, y: 300, at: G9(0), dur: 1.8 }] },
]) };
