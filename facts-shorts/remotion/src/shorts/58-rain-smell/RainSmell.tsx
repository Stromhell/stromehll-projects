import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SKY = '#9FB4C8', SOIL = '#7A5534', SOIL2 = '#5E3F24', GRASS = '#5DA858', SMELL = '#B7E07A';

const Rain: React.FC<{t: number; n?: number}> = ({t, n = 40}) => (
  <g>{Array.from({length: n}).map((_, i) => {
    const x = (i * 137) % 1200 - 60, y = ((t * 1400 + i * 233) % 2100) - 100;
    return <path key={i} d={`M ${x} ${y} l -8 40`} stroke="#E8F4FF" strokeWidth={6} strokeLinecap="round" opacity={0.8} />;
  })}</g>
);

const Wisps: React.FC<{t: number; x: number; y: number; k: number}> = ({t, x, y, k}) => (
  <g opacity={k}>{[0, 1, 2].map((i) => {
    const a = (t * 0.5 + i / 3) % 1;
    return <path key={i} d={`M ${x - 60 + i * 60} ${y - 300 * a} q 30 -40 0 -80 q -30 -40 0 -80`} stroke={SMELL} strokeWidth={14} fill="none" strokeLinecap="round" opacity={1 - a} />;
  })}</g>
);

const Bug: React.FC<{t: number; seed: number}> = ({t, seed}) => (
  <g transform={`rotate(${10 * Math.sin(t * 3 + seed)})`}>
    <rect x={-40} y={-18} width={80} height={36} rx={18} fill="#8BD14E" stroke={INK} strokeWidth={5} />
    <circle cx={-12} cy={-4} r={5} fill={INK} /><circle cx={10} cy={-4} r={5} fill={INK} />
    <path d="M -8 8 Q 0 13 8 8" stroke={INK} strokeWidth={3} fill="none" />
  </g>
);

export const RainSmell: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.petrichor - 0.25 ? 'intro' : t < T.bacteria - 0.25 ? 'name' : t < T.raindrops - 0.25 ? 'soil' : t < T.nose - 0.25 ? 'drop' : 'nose';
  const cues: Cue[] = [
    {f: 'rumble', at: 0.2, db: -24}, {f: 'slurp', at: T.smell + 0.2, db: -20},
    {f: 'whoosh', at: T.petrichor - 0.25, db: -24}, {f: 'ding', at: T.petrichor + 0.2, db: -18},
    {f: 'whoosh', at: T.bacteria - 0.25, db: -24}, {f: 'pop', at: T.bacteria + 0.2, db: -20}, {f: 'pop', at: T.bacteria + 0.4, db: -20},
    {f: 'whoosh', at: T.raindrops - 0.25, db: -24}, {f: 'plop', at: T.raindrops + 0.3, db: -16}, {f: 'pop', at: T.fling, db: -18}, {f: 'pop', at: T.fling + 0.15, db: -20},
    {f: 'whoosh', at: T.nose - 0.25, db: -24}, {f: 'slurp', at: T.nose + 0.2, db: -18}, {f: 'splash', at: T.pool, db: -20}, {f: 'ding', at: T.pool + 0.6, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'intro' && (
          <g>
            <Rain t={t} />
            <Layer cam={keys(t, [[0, 540, 1050, 1], [T.petrichor - 0.3, 520, 1000, 1.12]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={GRASS} stroke={INK} strokeWidth={LW} />
              <g transform="translate(480 1700)"><Guy t={t} expr="happy" handL={[-150, -300]} handR={[150, -300]} stand lean={-4 + 3 * Math.sin(t * 2)} blink /></g>
              <Wisps t={t} x={500} y={1660} k={pop(t, T.smell, 8, 6)} />
            </Layer>
            <Label x={540} y={640} size={68} s={pop(t, 0.1, 12, 6)} color="#fff">THAT SMELL AFTER RAIN</Label>
            <Sticker t={t} t0={T.smell + 0.4} x={540} y={790} text="HAS A NAME" size={66} fill="#2FA35A" />
          </g>
        )}

        {scene === 'name' && (
          <g>
            <Rain t={t} n={25} />
            <Layer cam={keys(t, [[T.petrichor - 0.25, 540, 1000, 1], [T.bacteria - 0.3, 540, 1000, 1.08]])}>
              <g transform={`translate(540 1250) rotate(-4) scale(${pop(t, T.petrichor, 10, 6)})`}>
                <rect x={-430} y={-150} width={860} height={300} rx={40} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={130} fill="#2FA35A">PETRICHOR</text>
                <text y={110} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill={INK}>"PET-RI-KOR"</text>
              </g>
              <Wisps t={t} x={540} y={1700} k={1} />
            </Layer>
            <Label x={540} y={640} size={86} s={pop(t, T.petrichor - 0.1, 12, 6)} color="#fff">IT'S CALLED</Label>
          </g>
        )}

        {scene === 'soil' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SOIL2} />
            <Layer cam={keys(t, [[T.bacteria - 0.25, 540, 1050, 1], [T.raindrops - 0.3, 540, 1050, 1.1]])}>
              {Array.from({length: 12}).map((_, i) => <circle key={i} cx={(i * 197) % 1000 + 40} cy={1000 + (i * 151) % 900} r={50 + (i % 3) * 20} fill={SOIL} />)}
              {Array.from({length: 7}).map((_, i) => (
                <g key={i} transform={`translate(${160 + (i % 4) * 250 + (i > 3 ? 120 : 0)} ${1150 + Math.floor(i / 4) * 380 + 20 * Math.sin(t * 2 + i)}) scale(${1.4 * pop(t, T.bacteria + i * 0.1, 12, 6)})`}>
                  <Bug t={t} seed={i} />
                  {[0, 1].map((j) => { const a = ((t * 0.7 + j / 2 + i * 0.13) % 1); return <circle key={j} cx={30 * Math.sin(i + j)} cy={-30 - 90 * a} r={8} fill={SMELL} stroke={INK} strokeWidth={3} opacity={1 - a} />; })}
                </g>
              ))}
            </Layer>
            <Label x={540} y={640} size={68} s={pop(t, T.bacteria, 12, 6)} color="#fff">MADE BY SOIL BACTERIA</Label>
            <Sticker t={t} t0={T.bacteria + 0.5} x={540} y={790} text="A CHEMICAL CALLED GEOSMIN" size={46} fill="#2FA35A" />
          </g>
        )}

        {scene === 'drop' && (() => {
          const fall = prog(t, T.raindrops, T.raindrops + 0.5, (u) => u * u);
          const hit = t > T.raindrops + 0.5;
          const sp = prog(t, T.raindrops + 0.5, T.nose - 0.3, (u) => u);
          return (
            <g>
              <Layer cam={keys(t, [[T.raindrops - 0.25, 540, 1050, 1], [T.fling, 540, 1100, 1.15], [T.nose - 0.3, 540, 1050, 1.1]])}>
                <rect x={-400} y={1600} width={1900} height={900} fill={SOIL} stroke={INK} strokeWidth={LW} />
                {!hit && <path transform={`translate(540 ${lerp(800, 1560, fall)})`} d="M 0 -80 Q 50 0 40 30 Q 0 70 -40 30 Q -50 0 0 -80 Z" fill="#9FD8F5" stroke={INK} strokeWidth={LW} />}
                {hit && <ellipse cx={540} cy={1600} rx={80 + 120 * sp} ry={20 + 10 * sp} fill="#9FD8F5" stroke={INK} strokeWidth={6} opacity={1 - sp * 0.5} />}
                {hit && Array.from({length: 12}).map((_, i) => {
                  const ang = -Math.PI * (0.15 + 0.7 * i / 11), d = 600 * sp;
                  return <circle key={i} cx={540 + Math.cos(ang) * d} cy={1590 + Math.sin(ang) * d * 1.2} r={16} fill="#E8FFD0" stroke={INK} strokeWidth={4} opacity={1 - prog(t, T.nose - 0.8, T.nose - 0.3)} />;
                })}
              </Layer>
              <Label x={540} y={640} size={65} s={pop(t, T.raindrops, 12, 6)} color="#fff">{hit ? 'FLUNG INTO THE AIR' : 'RAINDROPS HIT THE SOIL'}</Label>
              {hit && <Sticker t={t} t0={T.fling + 0.2} x={540} y={790} text="AS TINY BUBBLES" size={62} fill="#2C7BE5" />}
            </g>
          );
        })()}

        {scene === 'nose' && (() => {
          const pool = t > T.pool - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.nose - 0.25, 540, 1050, 1], [T.card, 540, 1050, 1.08]])}>
                {!pool && <g transform={`translate(540 1300) scale(${1 + 0.05 * Math.sin(t * 6)})`}>
                  <path d="M -60 -300 Q -40 -60 -180 60 Q -200 160 -80 170 Q 0 120 80 170 Q 200 160 180 60 Q 40 -60 60 -300 Z" fill="#F2C29B" stroke={INK} strokeWidth={LW} />
                  <ellipse cx={-70} cy={130} rx={34} ry={22} fill="#8A5A3A" /><ellipse cx={70} cy={130} rx={34} ry={22} fill="#8A5A3A" />
                  {Array.from({length: 6}).map((_, i) => { const a = ((t - T.nose) * 1.2 + i / 6) % 1; return <circle key={i} cx={(i % 2 ? 70 : -70) + 40 * Math.sin(i)} cy={lerp(520, 140, a)} r={14} fill={SMELL} stroke={INK} strokeWidth={4} opacity={a} />; })}
                </g>}
                {pool && <g>
                  <path d="M 100 1150 L 980 1150 L 980 1750 L 100 1750 Z" fill="#5FC1F0" stroke={INK} strokeWidth={LW} />
                  {[0, 1, 2, 3].map((r) => <path key={r} d={`M 100 ${1250 + r * 130} Q 540 ${1230 + r * 130 + 20 * Math.sin(t * 2 + r)} 980 ${1250 + r * 130}`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.5} />)}
                  {[0, 1, 2].map((i) => <circle key={i} cx={480 + i * 50} cy={lerp(1000, 1180, prog(t, T.pool + i * 0.15, T.pool + 0.4 + i * 0.15, (u) => u * u))} r={14} fill={SMELL} stroke={INK} strokeWidth={4} />)}
                  <text x={540} y={1650} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.pool + 0.6, 12, 6)}>STILL SMELLABLE</text>
                </g>}
              </Layer>
              <Label x={540} y={640} size={57} s={pop(t, T.nose, 12, 6)} color="#fff">{pool ? 'A FEW DROPS IN A POOL' : 'YOUR NOSE IS SO SENSITIVE'}</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="58-rain-smell" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
