// REAL-WORLD SCALE MAP for the Doomsday trailer sets (hz horizon y, k person px per px below horizon, y0 farthest floor y; est = no standing cast; free = keep authored)
window.FLOOR_MODEL = Object.assign(window.FLOOR_MODEL || {}, {
  dd_balcony: { hz: 845, k: 1.1, y0: 1000 }, dd_battlefield: { hz: 860, k: .9, y0: 1000 }, dd_bench_clearing: { hz: 930, k: 1.1, y0: 1150 }, dd_brick_roof: { hz: 845, k: 1.1, y0: 1150 },
  dd_city_avenue: { hz: 900, k: .8, y0: 1000 }, dd_dark_room: { hz: 790, k: 1.1, y0: 1150 }, dd_doom_hall: { hz: 1000, k: 1.3, y0: 1150 }, dd_farm_kitchen: { hz: 845, k: 1.1, y0: 1150 },
  dd_farm_living: { hz: 845, k: 1.1, y0: 1150 }, dd_farm_yard: { hz: 955, k: 1.0, y0: 1100 }, dd_forest_portal: { hz: 845, k: .9, y0: 900 }, dd_hangar: { hz: 1000, k: 1.4, y0: 1130 },
  dd_lake_night: { est: 1 }, dd_library: { hz: 1010, k: 1.3, y0: 1150 }, dd_mask_shop: { hz: 845, k: 1.1, y0: 1150 }, dd_nyc_night: { est: 1 }, dd_plaza_beam: { est: 1 },
  dd_ship_corridor: { hz: 790, k: 1.0, y0: 1000 }, dd_storm_field: { hz: 1100, k: 1.6, y0: 1200 }, dd_studio_board: { hz: 900, k: 1.4, y0: 1180 }, dd_water_beach: { hz: 510, k: .7, y0: 560 } });
