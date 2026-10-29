// Act 3 plates: the persistence hunt. Open plain, no camp.
window.PLATES = {
  sav_morning: (c, r, W, H) => ENV.savanna(c, r, W, H, { tod: 'dawn', camp: false, path: false, herd: 10, bushes: 14, trees: [[.1, .74, 1.2], [.9, .67, .5], [.62, .655, .28]] }),
  sav_noon: (c, r, W, H) => ENV.savanna(c, r, W, H, { tod: 'noon', camp: false, path: false, herd: 0, bushes: 12, clouds: 6, trees: [[.72, .7, .95], [.95, .66, .3]] }),
};
