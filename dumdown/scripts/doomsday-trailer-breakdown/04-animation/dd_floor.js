// REAL-WORLD SCALE MAP v3 (Pushpam 24 Nov: chars too small/flying vs sets). Measured per plate from known objects (desk .75 m, counter .9 m, sofa seat .45 m, railing 1.05 m, bed .55 m, truck 1.9 m):
// v3b: interior plates shifted up 220 px with the floor extended toward camera (open floor in front of furniture, visible above the bottom bar).
// eye-level camera -> hz = true horizon (eye height), k = 1.1 (person 1.75 m / eye 1.6 m). y0 = first walkable floor row (in front of furniture), y1 = last.
window.FLOOR_MODEL = Object.assign(window.FLOOR_MODEL || {}, {
  dd_balcony: { hz: 710, k: 1.1, y0: 1010, y1: 1250 }, dd_battlefield: { hz: 930, k: 1.1, y0: 1000, y1: 1250 }, dd_bench_clearing: { hz: 710, k: 1.1, y0: 1070, y1: 1250 }, dd_brick_roof: { est: 1 },
  dd_city_avenue: { hz: 1000, k: 1.1, y0: 1100, y1: 1250 }, dd_dark_room: { hz: 600, k: 1.1, y0: 1090, y1: 1250 }, dd_doom_hall: { hz: 680, k: 1.1, y0: 1070, y1: 1250 }, dd_farm_kitchen: { hz: 500, k: 1.1, y0: 1210, y1: 1250 },
  dd_farm_living: { hz: 400, k: 1.1, y0: 1080, y1: 1250 }, dd_farm_yard: { hz: 1230, k: 1.1, y0: 1300, y1: 1430 }, dd_forest_portal: { hz: 1190, k: 1.1, y0: 1250, y1: 1430 }, dd_hangar: { hz: 1060, k: 1.1, y0: 1150, y1: 1250 },
  dd_lake_night: { est: 1 }, dd_library: { hz: 655, k: 1.1, y0: 1110, y1: 1250 }, dd_mask_shop: { hz: 565, k: 1.1, y0: 1170, y1: 1250 }, dd_nyc_night: { est: 1 }, dd_plaza_beam: { est: 1 },
  dd_ship_corridor: { hz: 960, k: 1.1, y0: 1100, y1: 1250 }, dd_storm_field: { hz: 1230, k: 1.1, y0: 1270, y1: 1430 }, dd_studio_board: { hz: 340, k: 1.1, y0: 1190, y1: 1250 }, dd_water_beach: { hz: 510, k: .8, y0: 560, y1: 1430 } });
