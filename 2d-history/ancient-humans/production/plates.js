// Ancient Humans background plates (2560x1440). Light from the sun on the right at dawn.
window.PLATES = {
  savanna_dawn(ctx, r, W, H, P, M) {
    const N = P.Noise(11), sx = W * .72, sy = H * .555;
    M.sky(ctx, r, W, H * .66, '#4d6a96', '#f6b876');
    P.glow(ctx, sx, sy, W * .5, '#ffc98a', .35);
    M.clouds(ctx, r, W, H * .08, H * .4, 16, '#ffd2a2', '#7c6f8c');
    M.sun(ctx, r, sx, sy, 46, '#fff4d0', '#ff9f55');
    P.rays(ctx, r, sx, sy, 22, W * .9, '#ffd9a0', .04, 2.4, -Math.PI / 2);
    M.hills(ctx, r, N, W, H * .62, 110, .0012, 3, '#857a98', { topLight: .12, botDark: .02 });
    M.hills(ctx, r, N, W, H * .655, 50, .0028, 9, '#8f7663', { topLight: .1, botDark: -.05, rim: '#ffcf93' });
    M.distantTrees(ctx, r, W, H * .652, 30, '#6d5d70');
    M.ground(ctx, r, W, H, H * .645, '#5e4220', '#c99c5e', { n: 12000, light: '#ffd79a', patchLight: '#e0b876', patchDark: '#7a6638' });
    M.grassBand(ctx, r, W, H * .642, 24, ['#b8925a', '#9d8452', '#d9b47a']);
    // midground life
    for (let i = 0; i < 14; i++) { const x = r.range(0, W), y = r.range(H * .67, H * .74), s = .6 + (y - H * .67) / (H * .07) * .6; M.castShadow(ctx, x, y, 160 * s, 26 * s, Math.PI * .97); M.bush(ctx, r, x, y, 110 * s, 55 * s, '#4f5a2c', '#c9b46a', { lightDir: 1 }); }
    M.castShadow(ctx, W * .2, H * .7, 900, 80, Math.PI * .985, .3);
    M.acacia(ctx, r, W * .2, H * .7, 1.25, '#3d2a1c', '#46562a', '#c3b56a');
    M.castShadow(ctx, W * .88, H * .665, 380, 30, Math.PI * .985, .25);
    M.acacia(ctx, r, W * .88, H * .665, .55, '#4a3626', '#5f6a3c', '#c8b47a');
    // camp
    M.castShadow(ctx, W * .48, H * .78, 520, 90, Math.PI * .98, .35); M.grassHut(ctx, r, W * .48, H * .78, 300, 170, '#b08a52', '#22140c');
    M.castShadow(ctx, W * .63, H * .74, 380, 60, Math.PI * .98, .3); M.grassHut(ctx, r, W * .63, H * .74, 220, 120, '#b8935c', '#22140c');
    M.grassTufts(ctx, r, W, H * .7, H * .97, 160, ['#9a7840', '#86683a', '#b08a4e', '#7a5f30'], { h: 46, tipLight: .2 });
    M.campfire(ctx, r, W * .42, H * .9, 1.1, true);
    M.hide(ctx, r, W * .3, H * .93, 220, 60, '#8b5e3a');
    M.castShadow(ctx, W * .78, H * .9, 300, 50, Math.PI * .98, .35); M.rock(ctx, r, W * .78, H * .9, 180, 90, '#7b6b5a', '#ffcf93');
    M.fgFrame(ctx, r, W, H, ['#6f5526', '#5a4520', '#806030'], { w: .3, h: .22 });
    P.glow(ctx, sx, sy, W * .7, '#ffb070', .16);
    P.finish(ctx, r, W, H, { grain: 6, vig: .42, oil: 4 });
  },
};
