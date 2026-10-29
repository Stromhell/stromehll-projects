// Ancient Humans act 4 plates. Paint: node shared/p2/paint.js ancient-humans/production/plates_act4.js ancient-humans/production/plates all
window.PLATES = {
  // southern Africa, Kalahari shaded. view chosen so 1 deg lon ~ 1 deg lat on the parchment
  kalahari_map: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 4, lon1: 44, lat0: -35, lat1: -15.5 }, grid: 5, compass: [8, -32], title: 'Africa Australis',
    titleXY: [1880, 1010],
    labels: [[8.5, -24, 'Oceanus Atlanticus', 42, true], [40, -27, 'Oceanus Indicus', 40, true], [24.6, -21.3, 'BOTSWANA', 40], [17.2, -21.5, 'NAMIBIA', 36], [25, -29.6, 'SOUTH AFRICA', 36], [32.5, -18.2, 'ZIMBABWE', 30], [35.8, -19.8, 'MOZAMBIQUE', 26]],
    mountains: [[29, -29.5, 6, 1.5], [16.5, -23, 5, 1.2]],
    rivers: [[[18, -17.8], [21, -18.3], [23, -18.8], [25.2, -17.8], [27.5, -17.2]], [[22.5, -19.2], [23.3, -19.8], [23.8, -20.4]], [[17, -28.6], [19.5, -28.5], [22, -28.6], [24.5, -28.9], [27, -27.2]]],
    greens: [[22.7, -19.4, 1.4], [31.5, -24.5, 2]], deserts: [[22, -23.6, 4.2], [24, -25.5, 3], [15.5, -24.5, 2.2]] }),
  // world for the three foraging groups
  world_map: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -110, lon1: 160, lat0: -50, lat1: 64 }, grid: 30, compass: [-100, -38], title: 'Orbis Terrarum',
    titleXY: [1880, 1010],
    labels: [[-30, 20, 'Oceanus Atlanticus', 38, true], [75, -25, 'Oceanus Indicus', 38, true], [-95, -15, 'Mare Pacificum', 36, true], [20, 8, 'AFRICA', 40], [-60, -12, 'SOUTH AMERICA', 30], [134, -25, 'AUSTRALIA', 30], [80, 50, 'ASIA', 40], [15, 52, 'EUROPA', 30]],
    mountains: [[-70, -25, 4, 18], [85, 32, 16, 3]], rivers: [], greens: [[-60, -5, 8], [20, 0, 6]], deserts: [[12, 22, 14], [128, -24, 9], [22, -23, 4]] }),
  // Kalahari camp at the Dobe waterhole: dry sand, grass huts, mongongo trees
  kalahari_camp: (c, r, W, H) => ENV.savanna(c, r, W, H, { tod: 'noon', camp: true, path: false, herd: 0, bushes: 18, clouds: 3, trees: [[.12, .72, 1.1], [.86, .69, .8], [.6, .66, .4], [.35, .655, .3]] }),
};
