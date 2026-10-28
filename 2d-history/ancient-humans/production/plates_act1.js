// Ancient Humans act 1 plates. Paint: node shared/p2/paint.js ancient-humans/production/plates_act1.js ancient-humans/production/plates all
window.PLATES = {
  levant_map: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 18, lon1: 50, lat0: 26, lat1: 44 }, grid: 5, compass: [21, 30], title: 'Levantis et Anatoliae',
    titleXY: [1880, 1010],
    labels: [[21, 34.6, 'Mare Mediterraneum', 46, true], [34.5, 43.2, 'Pontus Euxinus', 40, true], [36.5, 25.8, '', 30, true], [33, 39.2, 'ANATOLIA', 44], [37.1, 33.6, 'LEVANT', 40], [22.2, 39.6, 'GRAECIA', 32], [29.8, 28.2, 'AEGYPTUS', 36], [43.6, 33.8, 'MESOPOTAMIA', 34], [47.5, 30.3, 'Sinus Persicus', 28, true]],
    mountains: [[34, 37.4, 18, 4], [45.5, 35, 14, 2.5], [43.5, 41.8, 12, 4], [36.2, 34.3, 5, .6], [22, 39.8, 5, 1]],
    rivers: [[[38.5, 39], [39.4, 37.5], [40.4, 35.6], [42, 34.4], [44, 32.6], [46, 31.2], [47.8, 30.4]], [[42.4, 38.2], [42.6, 36.4], [43.6, 34.8], [44.4, 33.3], [46.2, 31.6], [47.8, 30.4]], [[31.2, 26], [31.1, 28], [31.2, 30], [31.0, 31.4]], [[35.6, 33.2], [35.55, 32.4], [35.55, 31.4]]],
    greens: [[36.5, 35.5, 2.2], [44, 33.5, 2.5], [31, 30.6, 1.4]], deserts: [[38.5, 30, 4], [27, 27.5, 3], [44, 28, 3]] }),
  dig_dusk: (c, r, W, H) => ENV.digDusk(c, r, W, H),
  museum: (c, r, W, H) => ENV.museum(c, r, W, H),
};
