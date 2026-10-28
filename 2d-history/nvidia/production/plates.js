// NVIDIA painted plates. Paint with: node shared/p2/paint.js nvidia/production/plates.js nvidia/production/plates all
window.PLATES = {
  diner_ext: (c, r, W, H) => ENV.dinerExt(c, r, W, H),
  booth: (c, r, W, H) => ENV.dinerBooth(c, r, W, H),
  fg_booth: (c, r, W, H) => ENV.fgBoothTable(c, r, W, H),
  dishroom: (c, r, W, H) => ENV.dishroom(c, r, W, H),
  fg_sink: (c, r, W, H) => ENV.fgSink(c, r, W, H),
  office: (c, r, W, H) => ENV.office2(c, r, W, H, { night: true }),
  serverhall: (c, r, W, H) => ENV.serverhall(c, r, W, H),
  chip: (c, r, W, H) => ENV.chipTable(c, r, W, H),
};
