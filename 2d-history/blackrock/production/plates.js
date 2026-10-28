// BlackRock painted plates. Paint with: node shared/p2/paint.js blackrock/production/plates.js blackrock/production/plates all
window.PLATES = {
  skyline: (c, r, W, H) => ENV.skylinePlate(c, r, W, H),
  boardroom: (c, r, W, H) => ENV.boardroom(c, r, W, H),
  worldmap: (c, r, W, H) => ENV.worldMap(c, r, W, H),
  court: (c, r, W, H) => ENV.courthouse(c, r, W, H),
  trading: (c, r, W, H) => ENV.trading(c, r, W, H),
  fg_crt: (c, r, W, H) => ENV.fgCrt(c, r, W, H),
};
window.PLATES.suburb = (c, r, W, H) => ENV.suburb(c, r, W, H);
window.PLATES.bank = (c, r, W, H) => ENV.bankHall(c, r, W, H);
