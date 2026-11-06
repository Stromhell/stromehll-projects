import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SPACE = '#141A33', SUN = '#FFC93C', SUN2 = '#FF8A3C';

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 50}).map((_, i) => <circle key={i} cx={(i * 397) % 1300 - 110} cy={(i * 613) % 2100 - 90} r={2 + (i % 3) * 2} fill="#fff" opacity={0.4 + 0.5 * Math.sin(t * 2 + i)} />)}</g>
);

const Sun: React.FC<{t: number; r: number; face?: boolean}> = ({t, r, face = true}) => (
  <g>
    {Array.from({length: 16}).map((_, i) => { const a = (i / 16) * Math.PI * 2 + t * 0.3; const l = r * (1.15 + 0.06 * Math.sin(t * 4 + i)); return <path key={i} d={`M ${Math.cos(a) * r * 0.95} ${Math.sin(a) * r * 0.95} L ${Math.cos(a) * l} ${Math.sin(a) * l}`} stroke={SUN2} strokeWidth={r * 0.08} strokeLinecap="round" />; })}
    <circle r={r} fill={SUN} stroke={INK} strokeWidth={LW} />
    {face && <g transform={`scale(${r / 300})`}>
      <circle cx={-90} cy={-40} r={26} fill={INK} /><circle cx={90} cy={-40} r={26} fill={INK} />
      <path d="M -90 60 Q 0 140 90 60" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
    </g>}
  </g>
);

export const SunMass: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.percent - 0.25 ? 'intro' : t < T.planets - 0.25 ? 'percent' : t < T.Jupiter - 0.25 ? 'planets' : t < T.million - 0.25 ? 'jupiter' : 'earths';
  const cues: Cue[] = [
    {f: 'rumble', at: 0.2, db: -20}, {f: 'rise', at: 0.4, db: -22},
    {f: 'whoosh', at: T.percent - 0.25, db: -24}, {f: 'rise', at: T.percent, db: -20}, {f: 'ding', at: T.percent + 1.3, db: -18},
    {f: 'whoosh', at: T.planets - 0.25, db: -24}, ...[0, 1, 2, 3].map((i) => ({f: 'pop', at: T.planets + 0.3 + i * 0.15, db: -22})),
    {f: 'whoosh', at: T.Jupiter - 0.25, db: -24}, {f: 'boing', at: T.Jupiter + 0.3, db: -18},
    {f: 'whoosh', at: T.million - 0.25, db: -24}, ...Array.from({length: 8}).map((_, i) => ({f: 'tick', at: T.million + 0.1 + i * 0.12, db: -24})), {f: 'ding', at: T.million + 1.3, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: SPACE}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SPACE} />
        <Stars t={t} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1170, 1.1], [T.percent - 0.3, 540, 1170, 0.95]])}>
              <g transform={`translate(540 1450) scale(${pop(t, 0.1, 10, 6)})`}><Sun t={t} r={300} /></g>
              {[0, 1, 2].map((i) => <circle key={i} cx={150 + i * 380} cy={1880} r={10 + i * 4} fill={['#B0B0B0', '#E8B87A', '#4FA3E0'][i]} stroke={INK} strokeWidth={3} />)}
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, 0.1, 12, 6)} color="#fff">THE SUN HOLDS</Label>
            <Sticker t={t} t0={0.6} x={540} y={790} text="ALMOST EVERYTHING" size={66} fill={SUN2} />
          </g>
        )}

        {scene === 'percent' && (() => {
          const p = 99.86 * prog(t, T.percent, T.percent + 1.3);
          return (
            <g>
              <Layer cam={keys(t, [[T.percent - 0.25, 540, 1120, 1], [T.planets - 0.3, 540, 1120, 1.05]])}>
                <g transform="translate(540 1200) scale(0.5)"><Sun t={t} r={300} /></g>
                <rect x={110} y={1480} width={860} height={130} rx={30} fill="#2A3255" stroke={INK} strokeWidth={LW} />
                <rect x={118} y={1488} width={844 * p / 100} height={114} rx={24} fill={SUN} />
                <text x={540} y={1800} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={130} fill={SUN} stroke={INK} strokeWidth={14} paintOrder="stroke">{`${p.toFixed(2)}%`}</text>
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.percent, 12, 6)} color="#fff">OF ALL THE MASS</Label>
              <Sticker t={t} t0={T.percent + 0.3} x={540} y={790} text="IN THE SOLAR SYSTEM" size={60} fill={SUN2} />
            </g>
          );
        })()}

        {scene === 'planets' && (
          <g>
            <Layer cam={keys(t, [[T.planets - 0.25, 540, 1120, 1], [T.Jupiter - 0.3, 540, 1120, 1.06]])}>
              <rect x={240} y={1150} width={600} height={500} rx={30} fill="#2A3255" stroke={INK} strokeWidth={LW} />
              <text x={540} y={1230} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill="#fff">THE OTHER 0.14%</text>
              {['#B0B0B0', '#E8B87A', '#4FA3E0', '#C1440E', '#D9A066', '#E8C97A', '#9FE0E8', '#4F7FE0'].map((c, i) => <circle key={i} cx={320 + (i % 4) * 150} cy={1360 + Math.floor(i / 4) * 160} r={[18, 30, 32, 24, 60, 52, 40, 40][i]} fill={c} stroke={INK} strokeWidth={5} opacity={pop(t, T.planets + 0.3 + i * 0.08, 12, 6)} />)}
              <text x={540} y={1760} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={52} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke">+ MOONS, ROCKS, COMETS</text>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, T.planets, 12, 6)} color="#fff">ALL THE PLANETS</Label>
            <Sticker t={t} t0={T.planets + 0.3} x={540} y={790} text="SHARE THE CRUMBS" size={64} fill="#7A4DC8" />
          </g>
        )}

        {scene === 'jupiter' && (() => {
          const g = prog(t, T.Jupiter + 0.2, T.Jupiter + 0.9);
          return (
            <g>
              <Layer cam={keys(t, [[T.Jupiter - 0.25, 540, 1120, 1], [T.million - 0.3, 540, 1120, 1.05]])}>
                <g transform={`translate(540 1400) scale(${lerp(0.4, 1, g)})`}>
                  <circle r={260} fill="#D9A066" stroke={INK} strokeWidth={LW} />
                  {[-150, -60, 30, 120].map((y, i) => <path key={y} d={`M -250 ${y} Q 0 ${y + 20 * Math.sin(t + i)} 250 ${y}`} stroke={i % 2 ? '#B07A4A' : '#F0D0A0'} strokeWidth={30} fill="none" />)}
                  <ellipse cx={90} cy={80} rx={60} ry={34} fill="#C8452C" stroke={INK} strokeWidth={6} />
                </g>
                <text x={540} y={1840} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.Jupiter + 0.8, 12, 6)}>MOST OF THE REST</text>
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.Jupiter, 12, 6)} color="#fff">AND JUPITER</Label>
              <Sticker t={t} t0={T.Jupiter + 0.3} x={540} y={790} text="HOGS THE LEFTOVERS" size={62} fill="#C8452C" />
            </g>
          );
        })()}

        {scene === 'earths' && (() => {
          const n = prog(t, T.million, T.million + 1.3);
          return (
            <g>
              <Layer cam={keys(t, [[T.million - 0.25, 540, 1170, 1], [T.card, 540, 1170, 1.05]])}>
                <g transform="translate(540 1440) scale(0.8)">
                  <Sun t={t} r={330} face={false} />
                  <clipPath id="sunclip"><circle r={320} /></clipPath>
                  <g clipPath="url(#sunclip)">
                    {Array.from({length: 22 * 22}).map((_, i) => { const x = (i % 22) * 30 - 315, y = Math.floor(i / 22) * 30 - 315; return i / 484 < n ? <circle key={i} cx={x} cy={y} r={12} fill="#4FA3E0" stroke={INK} strokeWidth={2} /> : null; })}
                  </g>
                </g>
                <g transform="translate(540 1860)">
                  <rect x={-340} y={-60} width={680} height={110} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={58} fill={INK}>{`${(1.3 * n).toFixed(1)} MILLION`}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.million, 12, 6)} color="#fff">EARTHS INSIDE IT</Label>
              <Sticker t={t} t0={T.million + 0.3} x={540} y={790} text="ABOUT 1.3 MILLION" size={64} fill="#2C7BE5" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="81-sun-mass" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
