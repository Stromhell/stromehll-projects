// NVIDIA act 1 plates. Paint: node shared/p2/paint.js nvidia/production/plates_act1.js nvidia/production/plates all
window.PLATES = {
  asia_map: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 90, lon1: 130, lat0: 4, lat1: 32 }, grid: 5, compass: [93, 8], title: 'East & Southeast Asia', titleXY: [1880, 1010],
    labels: [[121, 26.6, 'TAIWAN', 36], [101, 15.5, 'THAILAND', 40], [112, 30, 'CHINA', 44], [124, 14, 'PHILIPPINES', 30], [114, 18, 'South China Sea', 34, true], [96, 12, 'Andaman Sea', 30, true], [126.5, 22, 'Pacific Ocean', 34, true]],
    mountains: [[100, 26, 10, 3], [121, 23.6, 5, .5], [104, 30, 10, 3]] }),
  us_map: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -128, lon1: -64, lat0: 22, lat1: 52 }, grid: 5, compass: [-124, 27], title: 'United States', titleXY: [1880, 1010],
    labels: [[-100, 39, 'UNITED STATES', 46], [-125.5, 38, 'Pacific', 34, true], [-70, 33, 'Atlantic', 34, true], [-120.5, 47.6, 'WASHINGTON', 24], [-120.5, 44, 'OREGON', 24], [-85.5, 37.6, 'KENTUCKY', 24], [-121.8, 37.2, 'CALIFORNIA', 24], [-102, 49.5, 'CANADA', 30], [-103, 26.5, 'MEXICO', 30]],
    mountains: [[-112, 42, 18, 5], [-120, 40, 10, 3], [-82, 37, 10, 2]] }),
  ky_school: (c, r, W, H) => ENV.kySchool(c, r, W, H),
  dorm_bath: (c, r, W, H) => ENV.dormBath(c, r, W, H),
};
