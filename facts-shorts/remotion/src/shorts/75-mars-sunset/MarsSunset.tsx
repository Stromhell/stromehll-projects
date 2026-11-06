import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const MARS = '#C1440E', MARS2 = '#8E2F0A', BUTTER = '#E8B87A', BLUE = '#6FA8DC';

const Ground: React.FC = () => (
  <g>
    <path d="M -400 1600 Q 100 1520 540 1580 Q 900 1520 1500 1600 L 1500 2400 L -400 2400 Z" fill={MARS} stroke={INK} strokeWidth={LW} />
    {[[150, 1700, 50], [820, 1760, 70], [480, 1850, 40]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.5} fill={MARS2} />)}
  </g>
);

const Rover: React.FC<{t: number}> = ({t}) => (
  <g>
    <rect x={-120} y={-150} width={240} height={80} rx={10} fill="#E8E8EE" stroke={INK} strokeWidth={LW} />
    <path d="M 60 -150 L 60 -260" stroke={INK} strokeWidth={10} />
    <rect x={30} y={-300} width={70} height={45} rx={8} fill="#5A5A6E" stroke={INK} strokeWidth={6} />
    <circle cx={85} cy={-278} r={10} fill="#7CFFFF" opacity={0.6 + 0.4 * Math.sin(t * 6)} />
    {[-90, 0, 90].map((x) => <circle key={x} cx={x} cy={-30} r={34} fill="#3A3A48" stroke={INK} strokeWidth={6} />)}
  </g>
);

export const MarsSunset: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.dust - 0.25 ? 'intro' : t < T.butterscotch - 0.25 ? 'dust' : t < T.glow - 0.25 ? 'day' : t < T.opposite - 0.25 ? 'sunset' : 'earth';
  const cues: Cue[] = [
    {f: 'rise', at: 0.2, db: -22}, {f: 'ding', at: 1.0, db: -18},
    {f: 'whoosh', at: T.dust - 0.25, db: -24}, {f: 'rumble', at: T.dust + 0.2, db: -24},
    {f: 'whoosh', at: T.butterscotch - 0.25, db: -24}, {f: 'slurp', at: T.butterscotch + 0.3, db: -22},
    {f: 'whoosh', at: T.glow - 0.25, db: -24}, {f: 'rise', at: T.glow, db: -20}, {f: 'zap', at: T.rovers, db: -22}, {f: 'ding', at: T.rovers + 0.4, db: -18},
    {f: 'whoosh', at: T.opposite - 0.25, db: -24}, {f: 'boing', at: T.opposite + 0.3, db: -20},
  ];
  const sky = scene === 'day' ? BUTTER : scene === 'dust' ? '#D9A06A' : '#2B2440';
  return (
    <AbsoluteFill style={{background: sky}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={sky} />

        {scene === 'intro' && (() => {
          const sun = prog(t, 0.2, T.dust - 0.4);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.dust - 0.3, 540, 1120, 1]])}>
                <circle cx={540} cy={lerp(1350, 1520, sun)} r={260} fill={BLUE} opacity={0.35} />
                <circle cx={540} cy={lerp(1350, 1520, sun)} r={160} fill={BLUE} opacity={0.5} />
                <circle cx={540} cy={lerp(1350, 1520, sun)} r={60} fill="#F4FBFF" stroke={INK} strokeWidth={6} />
                <Ground />
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, 0.1, 12, 6)} color="#fff">ON MARS, SUNSETS</Label>
              <Sticker t={t} t0={0.6} x={540} y={790} text="ARE BLUE" size={80} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'dust' && (
          <g>
            <Layer cam={keys(t, [[T.dust - 0.25, 540, 1120, 1], [T.butterscotch - 0.3, 540, 1120, 1.05]])}>
              <circle cx={180} cy={1250} r={70} fill="#FFF3B0" stroke={INK} strokeWidth={LW} />
              {Array.from({length: 40}).map((_, i) => <circle key={i} cx={(i * 131) % 1000 + 60 + 20 * Math.sin(t + i)} cy={1000 + (i * 97) % 500} r={10} fill="#B07A4A" opacity={0.7} />)}
              {[0, 1, 2].map((i) => <path key={i} d={`M 250 ${1240 + i * 10} L 960 ${1240 + i * 10 + (i - 1) * 40}`} stroke={['#E5414A', '#5DB55A', BLUE][i]} strokeWidth={10} opacity={pop(t, T.dust + 0.4 + i * 0.2, 12, 6)} strokeDasharray={i === 2 ? '0' : '18 14'} />)}
              <Ground />
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, T.dust, 12, 6)} color="#fff">FINE DUST IN THE AIR</Label>
            <Sticker t={t} t0={T.dust + 0.5} x={540} y={790} text="LETS BLUE THROUGH NEAR THE SUN" size={38} fill="#2C7BE5" />
          </g>
        )}

        {scene === 'day' && (
          <g>
            <Layer cam={keys(t, [[T.butterscotch - 0.25, 540, 1120, 1], [T.glow - 0.3, 540, 1120, 1.04]])}>
              <circle cx={820} cy={1050} r={60} fill="#FFF3B0" stroke={INK} strokeWidth={LW} />
              <Ground />
              <g transform="translate(420 1650)"><Rover t={t} /></g>
            </Layer>
            <Label x={540} y={640} size={76} s={pop(t, T.butterscotch, 12, 6)} color="#fff">DAYTIME SKY?</Label>
            <Sticker t={t} t0={T.butterscotch + 0.3} x={540} y={790} text="BUTTERSCOTCH" size={70} fill="#C88A3A" />
          </g>
        )}

        {scene === 'sunset' && (() => {
          const snap = t > T.rovers;
          return (
            <g>
              <Layer cam={keys(t, [[T.glow - 0.25, 540, 1120, 1], [T.opposite - 0.3, 540, 1120, 1.05]])}>
                <circle cx={600} cy={1450} r={300} fill={BLUE} opacity={0.3} />
                <circle cx={600} cy={1450} r={180} fill={BLUE} opacity={0.5} />
                <circle cx={600} cy={1450} r={55} fill="#F4FBFF" stroke={INK} strokeWidth={6} />
                <Ground />
                <g transform="translate(260 1680)"><Rover t={t} /></g>
                {snap && <rect x={-100} y={-100} width={W + 200} height={H + 300} fill="#fff" opacity={Math.max(0, 1 - (t - T.rovers) * 4)} />}
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.glow, 12, 6)} color="#fff">A BLUE GLOW</Label>
              <Sticker t={t} t0={T.rovers} x={540} y={790} text="PHOTOGRAPHED BY NASA ROVERS" size={42} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'earth' && (
          <g>
            <Layer cam={keys(t, [[T.opposite - 0.25, 540, 1030, 1], [T.card, 540, 1040, 1.03]])}>
              <rect x={60} y={1000} width={460} height={700} rx={30} fill="#F28C28" stroke={INK} strokeWidth={LW} />
              <circle cx={290} cy={1450} r={60} fill="#FFE45C" stroke={INK} strokeWidth={6} />
              <rect x={60} y={1500} width={460} height={200} fill="#3E8A44" />
              <rect x={560} y={1000} width={460} height={700} rx={30} fill="#2B2440" stroke={INK} strokeWidth={LW} />
              <circle cx={790} cy={1450} r={120} fill={BLUE} opacity={0.5} />
              <circle cx={790} cy={1450} r={45} fill="#F4FBFF" stroke={INK} strokeWidth={6} />
              <rect x={560} y={1500} width={460} height={200} fill={MARS} />
              <text x={290} y={1800} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke">EARTH</text>
              <text x={790} y={1800} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke">MARS</text>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.opposite, 12, 6)} color="#fff">THE OPPOSITE OF</Label>
            <Sticker t={t} t0={T.opposite + 0.3} x={540} y={790} text="EARTH'S SUNSETS" size={64} fill="#F28C28" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="75-mars-sunset" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
