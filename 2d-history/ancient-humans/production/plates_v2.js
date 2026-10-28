// Ancient Humans painted plates (v2 detailed library). Paint with: node shared/p2/paint.js production/plates_v2.js production/plates all
window.PLATES = {
  bedroom: (c, r, W, H) => ENV.bedroom2(c, r, W, H, { dark: true }),
  fg_duvet: (c, r, W, H) => ENV.fgDuvet(c, r, W, H),
  sav_dawn: (c, r, W, H) => ENV.savanna(c, r, W, H, { tod: 'dawn' }),
  sav_dusk: (c, r, W, H) => ENV.savanna(c, r, W, H, { tod: 'dusk' }),
  kitchen: (c, r, W, H) => ENV.kitchen2(c, r, W, H),
  fg_washer: (c, r, W, H) => ENV.fgWasher(c, r, W, H),
  fg_microwave: (c, r, W, H) => ENV.fgMicrowave(c, r, W, H),
  fg_car: (c, r, W, H) => ENV.fgCar(c, r, W, H),
  office: (c, r, W, H) => ENV.office2(c, r, W, H),
  fg_desk: (c, r, W, H) => ENV.fgDesk(c, r, W, H),
  dig: (c, r, W, H) => ENV.dig(c, r, W, H),
};
