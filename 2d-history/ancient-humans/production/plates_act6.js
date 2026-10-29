// Ancient Humans act 6 plates. Paint: node shared/p2/paint.js ancient-humans/production/plates_act6.js ancient-humans/production/plates all
window.PLATES = {
  // sunset over the Kalahari camp, fire lit, sun on the horizon
  camp_dusk: (c, r, W, H) => ENV.savanna(c, r, W, H, { tod: 'dusk', camp: true, path: false, herd: 0, bushes: 16, clouds: 4, campAt: [.5, .8], fireAt: [.5, .9], trees: [[.1, .71, 1.1], [.88, .69, .85], [.66, .655, .35], [.3, .65, .28]] }),
  // full night, camp in the middle, fire spot at screen centre-bottom
  camp_night: (c, r, W, H) => ENV.savanna(c, r, W, H, { tod: 'night', camp: true, path: false, herd: 0, bushes: 14, clouds: 1, campAt: [.5, .76], fireAt: [.5, .9], smoke: false, trees: [[.08, .72, 1.15], [.9, .7, .9], [.7, .655, .3], [.27, .65, .3]] }),
};
