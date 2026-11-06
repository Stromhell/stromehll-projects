import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SPACE = '#141A33', GLOW = '#7FE3FF';

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 60}).map((_, i) => <circle key={i} cx={(i * 397) % 1300 - 110} cy={(i * 613) % 2100 - 90} r={3 + (i % 3) * 2} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 2 + i)} />)}</g>
);

// teaspoon holding a glowing blob of star stuff
const Spoon: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s})`}>
    <path d="M -22 120 L -14 480 Q 0 510 14 480 L 22 120 Z" fill="#C9D3DE" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={100} ry={140} fill="#DDE5EE" stroke={INK} strokeWidth={LW} />
    <ellipse cx={0} cy={-10} rx={70} ry={100} fill={GLOW} stroke={INK} strokeWidth={6} />
    <ellipse cx={0} cy={-10} rx={70 + 12 * Math.sin(t * 6)} ry={100 + 12 * Math.sin(t * 6)} fill="none" stroke={GLOW} strokeWidth={6} opacity={0.5} />
    <circle cx={-25} cy={-50} r={14} fill="#fff" opacity={0.8} />
  </g>
);

const NStar: React.FC<{t: number; r: number}> = ({t, r}) => (
  <g>
    <circle r={r * 2.2} fill={GLOW} opacity={0.15 + 0.05 * Math.sin(t * 8)} />
    <circle r={r * 1.5} fill={GLOW} opacity={0.3} />
    <circle r={r} fill="#E9FBFF" stroke={INK} strokeWidth={LW} />
    {[0, 1].map((i) => <path key={i} transform={`rotate(${t * 200 + i * 180})`} d={`M 0 ${-r} L 0 ${-r * 3.2}`} stroke={GLOW} strokeWidth={r * 0.25} strokeLinecap="round" opacity={0.8} />)}
  </g>
);

export const NeutronSpoon: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.neutron - 0.25 ? 'intro' : t < T.Sun - 0.25 ? 'boom' : t < T.Drop - 0.25 ? 'size' : 'drop';
  const cues: Cue[] = [
    {f: 'zap', at: 0.2, db: -22}, {f: 'rumble', at: T.teaspoon + 0.3, db: -20}, {f: 'tick', at: T.teaspoon + 0.6, db: -22},
    {f: 'whoosh', at: T.neutron - 0.25, db: -24}, {f: 'rise', at: T.neutron, db: -22}, {f: 'crack', at: T.explodes + 0.1, db: -14}, {f: 'rumble', at: T.explodes + 0.2, db: -16},
    {f: 'whoosh', at: T.Sun - 0.25, db: -24}, {f: 'squeeze', at: T.Sun + 0.4, db: -18}, {f: 'ding', at: T.city + 0.2, db: -20},
    {f: 'whoosh', at: T.Drop - 0.25, db: -24}, {f: 'whoosh', at: T.Drop + 0.2, db: -18}, {f: 'crack', at: T.punch, db: -12}, {f: 'rumble', at: T.punch + 0.1, db: -14},
  ];
  return (
    <AbsoluteFill style={{background: SPACE}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SPACE} />

        {scene === 'intro' && (() => {
          const n = Math.round(1e9 * prog(t, T.teaspoon + 0.6, T.neutron - 0.6));
          return (
            <g>
              <Stars t={t} />
              <Layer cam={keys(t, [[0, 540, 1250, 1], [T.neutron - 0.3, 540, 1250, 1.1]])}>
                <g transform={`translate(540 ${1320 + 15 * Math.sin(t * 2)}) rotate(${-8 + 4 * Math.sin(t * 1.5)})`}><Spoon t={t} s={pop(t, 0.05, 10, 6)} /></g>
                <g transform={`translate(540 1830) scale(${pop(t, T.teaspoon + 0.5, 12, 6)})`}>
                  <rect x={-450} y={-80} width={900} height={150} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={76} fill={INK}>{`${n.toLocaleString('en-US')} T`}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={92} s={pop(t, T.teaspoon, 12, 6)} color="#fff">ONE TEASPOON</Label>
              <Sticker t={t} t0={T.teaspoon + 0.5} x={540} y={790} text="WEIGHS A BILLION TONNES" size={46} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'boom' && (() => {
          const swell = prog(t, T.neutron, T.explodes);
          const b = t - T.explodes;
          const [sx, sy] = shake(t, b > 0 && b < 0.6 ? 16 * (1 - b / 0.6) : 0);
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <Stars t={t} />
              <Layer cam={keys(t, [[T.neutron - 0.25, 540, 1250, 1], [T.explodes, 540, 1250, 1.05], [T.Sun - 0.3, 540, 1250, 1.15]])}>
                {b < 0.15 && <circle cx={540} cy={1250} r={lerp(240, 330, swell) + 8 * Math.sin(t * 9)} fill="#E8523A" stroke={INK} strokeWidth={LW} />}
                {b > 0 && (
                  <g transform="translate(540 1250)">
                    {Array.from({length: 18}).map((_, i) => {
                      const r0 = 120 + 900 * prog(b, 0, 1.2);
                      return <path key={i} transform={`rotate(${i * 20})`} d={`M 0 ${-r0 * 0.4} L 30 ${-r0} L -30 ${-r0} Z`} fill={i % 2 ? '#FFD25C' : '#F28C28'} opacity={1 - prog(b, 0.6, 1.6)} />;
                    })}
                    <circle r={600 * prog(b, 0, 0.8)} fill="none" stroke="#FFD25C" strokeWidth={30} opacity={1 - prog(b, 0.2, 0.9)} />
                    <NStar t={t} r={60 * pop(t, T.explodes + 0.3, 10, 6)} />
                  </g>
                )}
              </Layer>
              <Label x={540} y={640} size={90} s={pop(t, T.neutron, 12, 6)} color={GLOW}>A NEUTRON STAR</Label>
              <Sticker t={t} t0={T.explodes + 0.4} x={540} y={790} text="WHAT'S LEFT AFTER A STAR EXPLODES" size={34} fill="#7A4DC8" />
            </g>
          );
        })()}

        {scene === 'size' && (() => {
          const city = t > T.city - 0.2;
          return (
            <g>
              <Stars t={t} />
              {!city && (
                <Layer cam={keys(t, [[T.Sun - 0.25, 540, 1250, 1], [T.city - 0.3, 540, 1250, 1.08]])}>
                  <circle cx={320} cy={1250} r={220} fill="#FFC93C" stroke={INK} strokeWidth={LW} />
                  <text x={320} y={1270} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill={INK}>SUN</text>
                  <text x={590} y={1280} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={110} fill="#fff" stroke={INK} strokeWidth={14} paintOrder="stroke">{'<'}</text>
                  <g transform={`translate(800 1250) scale(${1 + 0.06 * Math.sin(t * 7)})`}><NStar t={t} r={60} /></g>
                </Layer>
              )}
              {city && (
                <Layer cam={keys(t, [[T.city - 0.25, 540, 1260, 1], [T.Drop - 0.3, 540, 1260, 1.05]])}>
                  <rect x={-400} y={1500} width={1900} height={800} fill="#2B3A55" stroke={INK} strokeWidth={LW} />
                  {[[80, 260], [200, 380], [320, 220], [440, 460], [580, 300], [700, 420], [820, 250], [940, 340]].map(([x, h], i) => (
                    <g key={i}><rect x={x - 55} y={1500 - h * 0.55} width={110} height={h * 0.55} fill={i % 2 ? '#3E5A85' : '#4C6C9A'} stroke={INK} strokeWidth={7} />
                      {[0, 1, 2].map((j) => <rect key={j} x={x - 30} y={1500 - h * 0.55 + 25 + j * 45} width={60} height={22} fill="#FFE27A" opacity={0.8} />)}</g>
                  ))}
                  <g transform={`translate(540 ${lerp(900, 1500, pop(t, T.city - 0.2, 6, 5))})`}><NStar t={t} r={330} /></g>
                  <path d="M 210 1580 L 870 1580" stroke="#fff" strokeWidth={8} />
                  <text x={540} y={1680} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={72} fill="#fff" stroke={INK} strokeWidth={12} paintOrder="stroke">ABOUT 20 KM</text>
                </Layer>
              )}
              <Label x={540} y={640} size={city ? 76 : 62} s={pop(t, city ? T.city : T.Sun, 12, 6)} color="#fff">{city ? 'THE SIZE OF A CITY' : 'MORE MASS THAN THE SUN'}</Label>
            </g>
          );
        })()}

        {scene === 'drop' && (() => {
          const fall = prog(t, T.Drop, T.punch, (u) => u * u);
          const p = t - T.punch;
          const [sx, sy] = shake(t, p > 0 && p < 0.8 ? 20 * (1 - p / 0.8) : 0);
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#9ED8FF" />
              <Layer cam={keys(t, [[T.Drop - 0.25, 540, 1200, 1], [T.punch, 540, 1300, 1.08], [T.card, 540, 1350, 1.12]])}>
                <rect x={-400} y={1450} width={1900} height={900} fill="#8A6A45" stroke={INK} strokeWidth={LW} />
                <rect x={-400} y={1450} width={1900} height={60} fill="#5DB55A" stroke={INK} strokeWidth={LW} />
                {p > 0 && <g>
                  <ellipse cx={540} cy={1480} rx={190} ry={50} fill="#2A1C10" stroke={INK} strokeWidth={LW} />
                  {[-1, 1].map((s) => <path key={s} d={`M ${540 + s * 190} 1490 l ${s * 80} 60 l ${s * 30} 90 l ${s * 90} 40`} stroke={INK} strokeWidth={8} fill="none" />)}
                  {Array.from({length: 10}).map((_, i) => {
                    const a = -Math.PI * (0.1 + 0.8 * i / 9), d = 400 * prog(p, 0, 0.9);
                    return <rect key={i} x={540 + Math.cos(a) * d} y={1470 + Math.sin(a) * d + 600 * p * p} width={36} height={30} fill="#8A6A45" stroke={INK} strokeWidth={5} opacity={1 - prog(p, 0.8, 1.4)} />;
                  })}
                </g>}
                {p < 0.3 && <g transform={`translate(540 ${lerp(300, 1400, fall) + (p > 0 ? 500 * p : 0)}) rotate(${lerp(-10, 60, fall)})`}><Spoon t={t} s={0.7} /></g>}
              </Layer>
              <Label x={540} y={640} size={75} s={pop(t, T.Drop, 12, 6)} color="#fff">{p > 0 ? 'STRAIGHT THROUGH!' : 'DROP IT ON EARTH...'}</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="46-neutron-spoon" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
