// REAL-WORLD SCALE MAP v6 (Pushpam 23 Nov 17:16: characters walking in air, too big vs the set).
// Per set: hz = horizon (eye line) y, k = person height per px below the horizon (h = k*(y-hz)), y0 = farthest walkable floor y,
// free = no floor (underwater/sky/flat backdrop: keep authored scale), est = establishing wide only (no standing cast).
window.FLOOR_MODEL = {
  wk_lab: { hz: 840, k: 1.1, y0: 1000 }, wk_river: { hz: 700, k: 1.1, y0: 1300 }, wk_throne: { hz: 840, k: 1.1, y0: 1000 },
  un_hall: { hz: 870, k: .52, y0: 950 }, rig_deck: { hz: 900, k: .8, y0: 1000 }, desert: { free: 1 }, wk_street: { hz: 894, k: .5, y0: 1150 },
  sky_class: { hz: 1137, k: 6, y0: 1160 }, sea_ship: { hz: 860, k: .8, y0: 1000 }, mayan_wall: { hz: 937, k: 1.3, y0: 1300 },
  dorm: { hz: 830, k: 1.15, y0: 1140 }, deep_sea: { free: 1 }, boston_st: { hz: 1065, k: 1.9, y0: 1190 }, talent_stage: { hz: 988, k: 1.6, y0: 1080 },
  studio: { free: 1 }, ross_kitchen: { hz: 740, k: 1.4, y0: 1280 }, jabari_mount: { est: 1 }, haiti_beach: { hz: 1000, k: 1.1, y0: 1050 },
  ancestor: { hz: 919, k: 1.1, y0: 950 }, wk_city: { est: 1 }, talokan: { free: 1 }, sd_mit_gate: { est: 1 }, sd_corridor: { hz: 830, k: 1.3, y0: 900 },
  glow_cave: { free: 1 }, garage: { free: 1 }, cook_set: { hz: 565, k: 1.1, y0: 1060 }, bridge: { free: 1 }, un_mercs: { hz: 980, k: 1.1, y0: 1300 },
  shuri_room: { hz: 645, k: 1.1, y0: 1080 }, museum: { hz: 750, k: 1.1, y0: 920 }, market: { hz: 830, k: .8, y0: 1050 }, log_library: { hz: 840, k: 1.1, y0: 1080 },
  forest_rd: { hz: 963, k: 1.1, y0: 970 }, catwalk: { hz: 840, k: 1.05, y0: 940 },
  // v6 sets (movie-matched, eye level)
  wk_funeral_ave: { hz: 1040, k: 2.4, y0: 1110 }, un_chamber: { hz: 707, k: .46, y0: 760 }, rig_night: { hz: 804, k: 1.3, y0: 940 },
  mit_walk: { hz: 958, k: 1.1, y0: 1060 }, city_day_st: { free: 1 }, jabari_hall: { hz: 872, k: 1.1, y0: 1030 }, wk_lab_v6: { hz: 884, k: 1.1, y0: 1110 },
  wk_throne_v6: { hz: 880, k: 1.1, y0: 1180 }, wk_hangar: { hz: 960, k: 1.5, y0: 1080 }, rig_deck_v6: { hz: 760, k: 1.0, y0: 1020 },
  mayan_hall_v6: { hz: 950, k: 1.2, y0: 1150 }, wk_street_v6: { hz: 990, k: .75, y0: 1100 }, river_bank_v6: { hz: 820, k: 1.1, y0: 945, y1: 1005 },
  bridge_hwy: { free: 1 }, bridge_hwy2: { hz: 800, k: 1.3, y0: 900 },
};
