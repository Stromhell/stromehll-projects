// BlackRock act 4 plates: the Federal Reserve exterior (the courthouse set, relabelled, no podiums).
// Paint: node shared/p2/paint.js blackrock/production/plates_act4.js blackrock/production/plates all
window.PLATES = {
  fed: (c, r, W, H) => ENV.courthouse(c, r, W, H, { label: 'FEDERAL RESERVE', pods: [] }),
};
