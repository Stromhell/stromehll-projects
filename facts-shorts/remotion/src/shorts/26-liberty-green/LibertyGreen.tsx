import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

// copper (1886) and verdigris (today) palettes
const COP = '#D8783A', COP_D = '#A8532A', COP_L = '#FFB27A';
const VER = '#6CC3A6', VER_D = '#3E937A', VER_L = '#B4ECD8';
const mix = (a: string, b: string, u: number) => {
  const p = (h: string, i: number) => parseInt(h.slice(1 + 2 * i, 3 + 2 * i), 16);
  return '#' + [0, 1, 2].map((i) => Math.round(lerp(p(a, i), p(b, i), clamp(u))).toString(16).padStart(2, '0')).join('');
};

const Spark: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (s <= 0.02 ? null : (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M 0 -40 Q 7 -7 40 0 Q 7 7 0 40 Q -7 7 -40 0 Q -7 -7 0 -40 Z" fill="#FFF7C2" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
));

// cartoon Lady Liberty; origin = bottom centre of the pedestal, ~1240 px tall
const Lady: React.FC<{t: number; g: number; shine?: number; patch?: number; headRot?: number; mood?: 'happy' | 'cross' | 'proud'}> =
  ({t, g, shine = 0, patch = 0, headRot = 0, mood = 'happy'}) => {
    const f = mix(COP, VER, g), d = mix(COP_D, VER_D, g), l = mix(COP_L, VER_L, g);
    const blink = (t % 3.3) < 0.12;
    const flick = Math.sin(t * 13) * 6;
    const spikes = Array.from({length: 7}).map((_, i) => {
      const a = (-160 + i * (140 / 6)) * Math.PI / 180, b = 0.13;
      const p = (r: number, aa: number) => `${r * Math.cos(aa)} ${-830 + r * Math.sin(aa)}`;
      return `M ${p(74, a - b)} L ${p(172, a)} L ${p(74, a + b)} Z`;
    });
    const blobs = [[-90, -380, 34], [60, -460, 28], [-30, -560, 30], [100, -330, 26], [-60, -640, 22], [20, -300, 30], [130, -560, 24]];
    return (
      <g>
        <ellipse cx={0} cy={6} rx={260} ry={22} fill="rgba(30,40,40,0.22)" />
        {/* stone pedestal */}
        <path d="M -230 0 L 230 0 L 200 -60 L 200 -230 L 232 -230 L 232 -282 L -232 -282 L -232 -230 L -200 -230 L -200 -60 Z" fill="#E2CFA2" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        <path d="M -200 -140 L 200 -140 M -120 -230 L -120 -60 M 120 -230 L 120 -60" stroke="#C4AE7E" strokeWidth={8} />
        {/* robe */}
        <path d="M -150 -282 C -152 -450 -122 -600 -96 -700 Q 0 -742 96 -700 C 122 -600 152 -450 150 -282 Z" fill={f} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        {[-92, -30, 36, 98].map((x, i) => <path key={i} d={`M ${x} -296 C ${x + 10} -420 ${x * 0.7} -560 ${x * 0.55} -660`} stroke={d} strokeWidth={10} fill="none" strokeLinecap="round" />)}
        <path d="M -96 -690 L 136 -430" stroke={d} strokeWidth={26} strokeLinecap="round" />
        <path d="M -120 -330 C -128 -460 -108 -580 -84 -660" stroke={l} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.8} />
        {patch > 0 && blobs.map(([x, y, r], i) => {
          const k = clamp(patch * 1.6 - i * 0.09) * (1 - clamp((g - 0.8) / 0.2));
          return k > 0 ? <circle key={i} cx={x} cy={y} r={r * k} fill={VER} stroke={VER_D} strokeWidth={4} /> : null;
        })}
        {/* tablet + left arm (viewer's right) */}
        <g transform="rotate(-12 140 -575)">
          <rect x={92} y={-690} width={100} height={220} rx={10} fill={l} stroke={INK} strokeWidth={LW} />
          {[0, 1, 2].map((i) => <path key={i} d={`M 112 ${-640 + i * 50} L 172 ${-640 + i * 50}`} stroke={d} strokeWidth={8} strokeLinecap="round" />)}
        </g>
        <path d="M 84 -690 Q 140 -640 118 -560" stroke={INK} strokeWidth={62} fill="none" strokeLinecap="round" />
        <path d="M 84 -690 Q 140 -640 118 -560" stroke={f} strokeWidth={44} fill="none" strokeLinecap="round" />
        {/* head */}
        <g transform={`rotate(${headRot} 0 -740)`}>
          <rect x={-28} y={-770} width={56} height={70} fill={f} stroke={INK} strokeWidth={LW} />
          {spikes.map((p, i) => <path key={i} d={p} fill={f} stroke={INK} strokeWidth={7} strokeLinejoin="round" />)}
          <circle cx={0} cy={-810} r={78} fill={f} stroke={INK} strokeWidth={LW} />
          <path d="M -70 -850 Q 0 -900 70 -850" stroke={INK} strokeWidth={30} fill="none" strokeLinecap="round" />
          <path d="M -70 -850 Q 0 -900 70 -850" stroke={l} strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M -54 -790 A 60 60 0 0 0 -30 -750" stroke={l} strokeWidth={10} fill="none" strokeLinecap="round" />
          {blink ? <path d="M -36 -812 L -16 -812 M 16 -812 L 36 -812" stroke={INK} strokeWidth={7} strokeLinecap="round" />
            : <g><ellipse cx={-26} cy={-812} rx={9} ry={13} fill={INK} /><ellipse cx={26} cy={-812} rx={9} ry={13} fill={INK} /><circle cx={-23} cy={-817} r={3} fill="#fff" /><circle cx={29} cy={-817} r={3} fill="#fff" /></g>}
          {mood === 'cross'
            ? <g><path d="M -44 -842 L -12 -830 M 44 -842 L 12 -830" stroke={INK} strokeWidth={7} strokeLinecap="round" /><path d="M -22 -770 Q 0 -786 22 -770" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /></g>
            : mood === 'proud'
              ? <g><path d="M -26 -778 Q 0 -748 26 -778 Z" fill={INK} /><path d="M -44 -836 Q -26 -846 -10 -836 M 10 -836 Q 26 -846 44 -836" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /></g>
              : <path d="M -22 -778 Q 0 -758 22 -778" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />}
        </g>
        {/* raised torch arm (viewer's left) */}
        <path d="M -84 -690 Q -150 -820 -150 -1020" stroke={INK} strokeWidth={62} fill="none" strokeLinecap="round" />
        <path d="M -84 -690 Q -150 -820 -150 -1020" stroke={f} strokeWidth={44} fill="none" strokeLinecap="round" />
        <rect x={-168} y={-1100} width={36} height={90} fill={d} stroke={INK} strokeWidth={7} />
        <path d="M -200 -1132 L -100 -1132 L -120 -1092 L -180 -1092 Z" fill={f} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        <path d={`M -186 -1134 C -196 -1180 ${-160 + flick} -1200 ${-150 + flick} -1250 C -130 -1210 -100 -1180 -114 -1134 Z`} fill="#FFC93C" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        <path d={`M -160 -1140 C -164 -1166 ${-152 + flick * 0.5} -1180 -150 -1200 C -140 -1176 -130 -1160 -138 -1140 Z`} fill="#FFF0A0" />
        <circle cx={-150} cy={-1010} r={30} fill={f} stroke={INK} strokeWidth={LW} />
        {/* gleam */}
        {shine > 0 && (
          <g opacity={shine}>
            {[[-200, -900], [190, -760], [-170, -480], [180, -380], [0, -1000], [-260, -1180], [60, -560]].map(([x, y], i) =>
              <Spark key={i} x={x} y={y} s={0.6 + 0.5 * Math.abs(Math.sin(t * 3 + i * 1.7))} />)}
            <path d={`M ${-140 + ((t * 260) % 600)} -300 L ${-60 + ((t * 260) % 600)} -700`} stroke="#fff" strokeWidth={22} strokeLinecap="round" opacity={0.55} />
          </g>
        )}
      </g>
    );
  };

const Backdrop: React.FC<{t: number; top: string; bot: string; ground?: number}> = ({t, top, bot, ground = 1700}) => (
  <g>
    <defs><linearGradient id="libsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bot} /></linearGradient></defs>
    <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="url(#libsky)" />
    <path d={wavePath(t, ground - 120, 22, 140, 2)} fill="#4FA3E0" stroke={INK} strokeWidth={LW} />
    <path d={`M -100 ${ground + 30} Q 540 ${ground - 70} 1180 ${ground + 30} L 1180 2100 L -100 2100 Z`} fill="#8CCB62" stroke={INK} strokeWidth={LW} />
  </g>
);

const Penny: React.FC<{t: number}> = ({t}) => {
  const wink = Math.abs(t - T.copper + 1.1) < 0.18;
  return (
    <g>
      <circle r={165} fill="#E08A45" stroke={INK} strokeWidth={LW} />
      <circle r={132} fill="none" stroke="#B05E2C" strokeWidth={9} strokeDasharray="14 12" />
      <path d="M -110 -60 A 125 125 0 0 1 -40 -118" stroke="#FFC48E" strokeWidth={18} fill="none" strokeLinecap="round" />
      <ellipse cx={-40} cy={-14} rx={13} ry={19} fill={INK} />
      {wink ? <path d="M 26 -14 L 54 -14" stroke={INK} strokeWidth={8} strokeLinecap="round" /> : <ellipse cx={40} cy={-14} rx={13} ry={19} fill={INK} />}
      <path d="M -46 40 Q 0 84 46 40" stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />
      <circle cx={-80} cy={30} r={16} fill="#F2A07A" opacity={0.8} /><circle cx={80} cy={30} r={16} fill="#F2A07A" opacity={0.8} />
    </g>
  );
};

// periodic-table style tile
const CuTile: React.FC = () => (
  <g>
    <rect x={-120} y={-130} width={240} height={260} rx={22} fill="#FFF3DC" stroke={INK} strokeWidth={LW} />
    <Label x={-70} y={-78} size={40} color="#fff">29</Label>
    <Label x={0} y={40} size={120} color={COP}>Cu</Label>
    <Label x={0} y={106} size={42} color="#fff">COPPER</Label>
  </g>
);

const RainCloud: React.FC<{t: number; dark: number}> = ({t, dark}) => {
  const c = [[-80, 14, 50], [-24, -22, 66], [50, -8, 56], [100, 18, 42], [0, 22, 54]];
  const fill = mix('#E8EEF3', '#8F9CAB', dark);
  return (
    <g>
      {c.map(([x, y, r], i) => <circle key={'o' + i} cx={x} cy={y} r={r + LW / 2 + 1} fill={INK} />)}
      {c.map(([x, y, r], i) => <circle key={'f' + i} cx={x} cy={y} r={r - LW / 2 + 1} fill={fill} />)}
      <ellipse cx={-26} cy={4} rx={8} ry={dark > 0.5 ? 6 : 11} fill={INK} /><ellipse cx={26} cy={4} rx={8} ry={dark > 0.5 ? 6 : 11} fill={INK} />
      {dark > 0.5 && <path d="M -40 -14 L -14 -6 M 40 -14 L 14 -6" stroke={INK} strokeWidth={6} strokeLinecap="round" />}
      <path d={`M -14 ${34 + Math.sin(t * 6) * 2} Q 0 ${dark > 0.5 ? 26 : 44} 14 34`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Brush: React.FC<{banned: number}> = ({banned}) => (
  <g transform="rotate(-30)">
    <path d="M 0 0 L 0 -110" stroke={INK} strokeWidth={22} strokeLinecap="round" />
    <path d="M 0 0 L 0 -110" stroke="#B5763A" strokeWidth={10} strokeLinecap="round" />
    <rect x={-50} y={-150} width={100} height={44} rx={12} fill="#3D8CF0" stroke={INK} strokeWidth={7} />
    {[-36, -18, 0, 18, 36].map((x) => <path key={x} d={`M ${x} -150 L ${x} -176`} stroke="#FFE45C" strokeWidth={8} strokeLinecap="round" />)}
    {banned > 0 && (
      <g transform={`translate(0 -90) scale(${banned})`}>
        <circle r={95} fill="none" stroke={INK} strokeWidth={34} /><circle r={95} fill="none" stroke="#E5414A" strokeWidth={20} />
        <path d="M -66 -66 L 66 66" stroke={INK} strokeWidth={34} strokeLinecap="round" /><path d="M -66 -66 L 66 66" stroke="#E5414A" strokeWidth={20} strokeLinecap="round" />
      </g>
    )}
  </g>
);

export const LibertyGreen: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const sShiny = lerp(T.green, T.shiny, 0.45);      // "...finished in"
  const t1886 = lerp(T.green, T.shiny, 0.6);        // "eighteen eighty-six"
  const sWeather = T.copper + 0.35;                 // "Over about thirty years"
  const tYears = lerp(T.copper, T.rain, 0.43);      // "thirty"
  const sShield = lerp(T.patina, T.protects, 0.45); // "That green layer"
  const sClean = lerp(T.protects, T.cleans, 0.5);   // "so nobody"
  const scene = t < sShiny ? 'intro' : t < sWeather ? 'shiny' : t < sShield ? 'weather' : t < sClean ? 'shield' : 'clean';
  const cues: Cue[] = [
    {f: 'pop', at: 0.3, db: -20}, {f: 'blegh', at: T.green - 0.75, db: -22},
    {f: 'whoosh', at: sShiny, db: -24}, {f: 'ding', at: T.shiny, db: -20}, {f: 'boing', at: T.penny - 0.3, db: -20}, {f: 'clink', at: T.copper, db: -18},
    {f: 'whoosh', at: sWeather, db: -24}, {f: 'pour', at: T.rain, db: -24}, {f: 'sizzle', at: lerp(T.rain, T.patina, 0.3), db: -26}, {f: 'pop', at: T.patina, db: -20},
    {f: 'whoosh', at: sShield, db: -24}, {f: 'plop', at: T.protects, db: -20},
    {f: 'step', at: sClean + 0.2, db: -24}, {f: 'boing', at: T.cleans, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: '#BFE6FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1180, 1.3], [1.6, 540, 990, 1], [sShiny, 540, 1010, 1.03]])}>
              <Backdrop t={t} top="#6EC1FF" bot="#D8F2FF" />
              <g transform={`translate(540 1700) scale(0.8) rotate(${1.2 * Math.sin(t * 1.3)} 0 -300)`}>
                <Lady t={t} g={1} mood={t > T.green ? 'proud' : 'happy'} />
              </g>
            </Layer>
            <g transform={`translate(820 1010) scale(${pop(t, T.green, 12, 6)}) rotate(${8 * Math.sin(t * 4)})`}>
              <Label x={0} y={0} size={180} color="#FFE45C">?</Label>
            </g>
            <Label x={540} y={620} size={80} s={pop(t, 0.3, 12, 6)} color="#fff">ALWAYS GREEN?</Label>
            <Sticker t={t} t0={T.green - 0.75} x={540} y={1730} text="WASN'T ALWAYS!" size={76} fill="#E5414A" />
          </g>
        )}
        {scene === 'shiny' && (
          <g>
            <Layer cam={keys(t, [[sShiny, 540, 960, 1.08], [T.penny - 0.4, 540, 960, 1], [sWeather, 560, 980, 1.02]])}>
              <Backdrop t={t} top="#FFC98A" bot="#FFF0D6" />
              <g transform={`translate(${lerp(540, 340, prog(t, T.penny - 0.9, T.penny - 0.3))} 1700) scale(0.72) rotate(${1.2 * Math.sin(t * 1.3)} 0 -300)`}>
                <Lady t={t} g={0} shine={prog(t, T.shiny - 0.2, T.shiny + 0.3)} mood="proud" />
              </g>
              <g transform={`translate(${lerp(1400, 790, prog(t, T.penny - 0.6, T.penny + 0.05))} ${1150 + 10 * Math.sin(t * 2.4)}) rotate(${-lerp(360, 0, prog(t, T.penny - 0.6, T.penny + 0.05)) + 5 * Math.sin(t * 2)})`}>
                <Penny t={t} />
              </g>
              <Label x={555} y={1190} size={110} s={pop(t, lerp(T.penny, T.copper, 0.55), 12, 6)} color="#FFE45C">=</Label>
              <g transform={`translate(790 1530) scale(${pop(t, T.copper, 12, 6)}) rotate(${6 + 3 * Math.sin(t * 3)})`}><CuTile /></g>
            </Layer>
            {t < T.shiny ? <Label x={540} y={620} size={70} s={pop(t, t1886, 12, 6)} color="#FFE45C">BRAND NEW: 1886</Label>
              : t < T.penny ? <Label x={540} y={620} size={56} s={pop(t, T.shiny, 12, 6)} color="#fff">SHINY REDDISH-BROWN</Label>
                : <Label x={540} y={620} size={67} s={pop(t, T.penny, 12, 6)} color="#fff">LIKE A NEW PENNY</Label>}
          </g>
        )}
        {scene === 'weather' && (() => {
          const g = prog(t, T.rain, T.patina - 0.2);
          const dark = prog(t, T.rain - 0.6, T.rain);
          const year = Math.round(lerp(1886, 1916, clamp((t - tYears) / (T.patina - 0.2 - tYears))));
          const [sx, sy] = shake(t, 3 * dark * (1 - prog(t, T.patina - 0.3, T.patina)));
          return (
            <g>
              <Layer cam={keys(t, [[sWeather, 540, 960, 1.04], [T.patina, 540, 990, 1]])}>
                <Backdrop t={t} top={mix('#8FD3FF', '#7A8EA3', dark * (1 - prog(t, T.patina - 0.3, T.patina + 0.3)))} bot="#DDEFFA" ground={1640} />
                <g transform={`translate(540 1640) scale(0.78) rotate(${1.2 * Math.sin(t * 1.3)} 0 -300)`}>
                  <Lady t={t} g={g} patch={prog(t, lerp(T.rain, T.patina, 0.2), lerp(T.rain, T.patina, 0.7), (u) => u)} mood={t > T.patina ? 'proud' : 'happy'} shine={t > T.patina ? 1 - prog(t, T.patina + 0.8, T.patina + 1.2) : 0} />
                </g>
                {/* air: wind gusts */}
                {[0, 1, 2].map((i) => {
                  const x = ((t - sWeather) * 700 + i * 420) % 1500 - 300;
                  return <path key={i} d={`M ${x} ${1020 + i * 160} q 80 -40 160 0 t 160 0`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.85 * (1 - prog(t, T.patina - 0.4, T.patina))} />;
                })}
                {/* rain */}
                {t > T.rain - 0.2 && Array.from({length: 36}).map((_, i) => {
                  const x = (i * 137 + 40) % 1080, y = 860 + ((t * 950 + i * 211) % 800);
                  return <path key={i} d={`M ${x} ${y} l -8 34`} stroke="#3D8CF0" strokeWidth={9} strokeLinecap="round" opacity={dark * (1 - prog(t, T.patina - 0.3, T.patina + 0.2))} />;
                })}
                {/* fizz: copper reacting */}
                {g > 0.05 && g < 0.98 && Array.from({length: 10}).map((_, i) => {
                  const ph = (t * 1.6 + i * 0.37) % 1;
                  return <circle key={i} cx={540 + ((i * 53) % 220) - 110} cy={1340 - ((i * 97) % 380) - ph * 40} r={8 + 8 * ph} fill={VER_L} stroke={VER_D} strokeWidth={4} opacity={1 - ph} />;
                })}
                <g transform={`translate(${200 + sx} ${820 + sy + 10 * Math.sin(t * 1.4)}) scale(${pop(t, sWeather + 0.05, 10, 6)})`}><RainCloud t={t} dark={dark} /></g>
                <g transform={`translate(${880 - sx} ${800 - sy + 10 * Math.sin(t * 1.2 + 1)}) scale(${pop(t, sWeather + 0.2, 10, 6)})`}><RainCloud t={t + 1} dark={dark} /></g>
              </Layer>
              {t < T.rain ? <Label x={540} y={620} size={76} s={pop(t, sWeather + 0.1, 12, 6)} color="#fff">ABOUT 30 YEARS</Label>
                : t < T.patina ? <Label x={540} y={620} size={56} s={pop(t, T.rain, 12, 6)} color="#fff">AIR + RAIN + COPPER</Label>
                  : <Label x={540} y={620} size={58} s={pop(t, T.patina, 12, 6)} color="#B4ECD8">GREEN COAT: PATINA</Label>}
              <Label x={540} y={1775} size={96} s={pop(t, tYears, 12, 6)} color="#FFE45C">{String(year)}</Label>
            </g>
          );
        })()}
        {scene === 'shield' && (
          <g>
            <rect width={W} height={H} fill="#FFF3DC" />
            {Array.from({length: 7}).map((_, i) => <circle key={i} cx={(i * 263) % W} cy={300 + (i * 389) % 1500} r={90} fill="#FBE6C2" />)}
            <Layer cam={keys(t, [[sShield, 540, 1080, 0.6], [sShield + 0.5, 540, 1080, 1], [sClean, 540, 1100, 1.04]])}>
              {/* raindrops bouncing off the green layer */}
              {Array.from({length: 8}).map((_, i) => {
                const x = 190 + i * 100; if (x > 430 && x < 650) return null;
                const ph = ((t - sShield) * 1.2 + i * 0.29) % 1;
                const y = ph < 0.7 ? lerp(760, 1030, ph / 0.7) : 1030 - 60 * Math.sin(((ph - 0.7) / 0.3) * Math.PI);
                return <g key={i}>
                  <path transform={`translate(${x} ${y})`} d="M 0 -26 C 8 -12 16 -2 16 8 C 16 18 8 24 0 24 C -8 24 -16 18 -16 8 C -16 -2 -8 -12 0 -26 Z" fill="#7CC8FF" stroke={INK} strokeWidth={5} />
                  {ph > 0.68 && ph < 0.85 && <path d={`M ${x - 40} 1030 q -10 -20 -20 -26 M ${x + 40} 1030 q 10 -20 20 -26`} stroke="#3D8CF0" strokeWidth={6} fill="none" strokeLinecap="round" />}
                </g>;
              })}
              <rect x={140} y={1130} width={800} height={430} rx={10} fill={COP} stroke={INK} strokeWidth={LW} />
              <path d="M 170 1200 L 340 1200 M 170 1260 L 260 1260" stroke={COP_L} strokeWidth={12} strokeLinecap="round" />
              <g transform="translate(540 1330)">
                <ellipse cx={-50} cy={0} rx={13} ry={(t % 2.7) < 0.12 ? 2 : 19} fill={INK} /><ellipse cx={50} cy={0} rx={13} ry={(t % 2.7) < 0.12 ? 2 : 19} fill={INK} />
                <path d="M -40 50 Q 0 86 40 50" stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />
              </g>
              <Label x={540} y={1500} size={56} color="#FFE0C2">COPPER</Label>
              <rect x={140} y={1040 + 10 * (1 - prog(t, sShield, sShield + 0.5))} width={800} height={90} rx={10} fill={VER} stroke={INK} strokeWidth={LW} />
              <Label x={540} y={1104} size={52} color="#fff">PATINA</Label>
              <g transform={`translate(540 ${880 + 6 * Math.sin(t * 3)}) scale(${pop(t, T.protects, 11, 6)})`}>
                <path d="M 0 -120 L 100 -84 Q 104 40 0 120 Q -104 40 -100 -84 Z" fill={VER} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <path d="M 0 -84 L 64 -60 Q 64 24 0 80 Z" fill={VER_L} />
                <path d="M -34 0 L -8 28 L 40 -30" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </Layer>
            <Label x={540} y={520} size={66} s={pop(t, sShield + 0.1, 12, 6)} color={VER}>THAT GREEN LAYER</Label>
            <Sticker t={t} t0={T.protects} x={540} y={1740} text="PROTECTS THE METAL" size={58} fill="#2C7BE5" rot={-3} />
          </g>
        )}
        {scene === 'clean' && (() => {
          const walkIn = prog(t, sClean, T.cleans - 0.1, (u) => u);
          const flee = prog(t, T.cleans + 0.45, T.card, (u) => u * u);
          const x = t < T.cleans + 0.45 ? lerp(1250, 790, walkIn) : lerp(790, 1350, flee);
          const walking = (walkIn > 0 && walkIn < 1) || flee > 0;
          const dir = flee > 0 ? 1 : -1;
          const step = walking ? 14 * Math.sin(t * 14) : 0;
          const banned = pop(t, T.cleans + 0.1, 12, 6);
          return (
            <g>
              <Layer cam={keys(t, [[sClean, 600, 1000, 1.06], [T.cleans, 560, 980, 1]])}>
                <Backdrop t={t} top="#6EC1FF" bot="#D8F2FF" ground={1680} />
                <g transform={`translate(360 1680) scale(0.75) rotate(${1.2 * Math.sin(t * 1.3)} 0 -300)`}>
                  <Lady t={t} g={1} mood={t > T.cleans ? 'cross' : 'happy'} headRot={t > T.cleans ? 12 * Math.sin((t - T.cleans) * 16) * (1 - prog(t, T.cleans + 0.6, T.cleans + 1.2)) : 0} />
                </g>
                <g transform={`translate(${x} ${1680 - (walking ? 6 * Math.abs(Math.sin(t * 14)) : 0)}) scale(${0.55 * dir} 0.55)`}>
                  <Guy t={t} expr={t > T.cleans ? 'worried' : 'hope'} stand stepL={step} stepR={-step}
                    handL={[-120, -190]} handR={[150, -270]} bendR={0.3} sweat={t > T.cleans ? clamp((t - T.cleans) / 0.9) : 0}
                    handChildren={<Brush banned={banned} />} />
                </g>
              </Layer>
              <Sticker t={t} t0={T.cleans} x={540} y={640} text="DON'T CLEAN IT!" size={70} fill="#E5414A" />
              <Label x={540} y={1775} size={70} s={pop(t, T.cleans, 12, 6)} color={VER_L}>LEAVE IT GREEN!</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="26-liberty-green" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
