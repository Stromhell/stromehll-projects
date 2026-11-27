// Floor models for the Doomsday 0.25x sets (measured on the 27 Nov SDXL plates, unshifted). dd interiors re-measured (+220 vs the shifted v3b plates).
window.FLOOR_MODEL = Object.assign(window.FLOOR_MODEL || {}, {
  ds_office: { hz: 640, k: 1.1, y0: 1150, y1: 1430 }, ds_courtyard: { hz: 650, k: 1.1, y0: 1060, y1: 1430 }, ds_bridge_out: { hz: 650, k: 1.1, y0: 1000, y1: 1430 },
  ds_bridge_in: { hz: 650, k: 1.1, y0: 1000, y1: 1430 }, ds_palace: { est: 1 }, ds_ruins: { hz: 650, k: 1.1, y0: 950, y1: 1430 }, ds_door1949: { est: 1 },
  ds_gravel: { hz: 650, k: 1.1, y0: 1050, y1: 1430 }, ds_eagle: { est: 1 }, ds_living_busy: { hz: 700, k: 1.1, y0: 1150, y1: 1430 }, ds_stairs: { est: 1 },
  ds_space: { est: 1 }, ds_tower: { est: 1 },
  dd_farm_living: { hz: 620, k: 1.1, y0: 1150, y1: 1430 }, dd_farm_kitchen: { hz: 720, k: 1.1, y0: 1250, y1: 1430 }, dd_doom_hall: { hz: 650, k: 1.1, y0: 1100, y1: 1430 } });
