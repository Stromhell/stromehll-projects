import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

const SKY = '#CDEBFF', SEA = '#2A7DB8', DEEP = '#1B4F7A';

const Waves: React.FC<{x: number; y: number; n: number; col: string; r0?: number}> = ({x, y, n, col, r0 = 30}) => (
  <g>{Array.from({length: n}).map((_, i) => <path key={i} d={`M ${x + r0 + i * 40} ${y - 50 - i * 12} Q ${x + r0 + 25 + i * 40} ${y} ${x + r0 + i * 40} ${y + 50 + i * 12}`} stroke={col} strokeWidth={12} fill="none" strokeLinecap="round" opacity={1 - i / (n + 1)} />)}</g>
);

const Speaker: React.FC = () => (
  <g>
    <rect x={-60} y={-50} width={60} height={100} fill="#3A3A48" stroke={INK} strokeWidth={LW} />
    <path d="M 0 -50 L 70 -110 L 70 110 L 0 50 Z" fill="#5A5A6E" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
  </g>
);

const Whale: React.FC<{t: number; flip?: boolean}> = ({t, flip}) => (
  <g transform={`scale(${flip ? -1 : 1} 1)`}>
    <path d="M -200 0 Q -200 -110 0 -110 Q 180 -110 200 0 Q 180 80 0 80 Q -150 80 -200 0 Z" fill="#4C6C9A" stroke={INK} strokeWidth={LW} />
    <path d={`M -195 0 L -290 ${-60 + 15 * Math.sin(t * 3)} L -270 0 L -290 ${60 + 15 * Math.sin(t * 3)} Z`} fill="#4C6C9A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -120 30 Q 0 80 150 30" stroke="#CFE0F0" strokeWidth={16} fill="none" />
    <circle cx={120} cy={-30} r={10} fill={INK} />
    <path d="M 130 20 Q 160 30 185 15" stroke={INK} strokeWidth={6} fill="none" />
  </g>
);

export const SoundWater: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.air - 0.25 ? 'race' : t < T.molecules - 0.25 ? 'speeds' : t < T.whales - 0.25 ? 'mol' : 'whales';
  const cues: Cue[] = [
    {f: 'ding', at: 0.3, db: -20}, {f: 'whoosh', at: 0.6, db: -20}, {f: 'splash', at: 0.5, db: -24}, {f: 'pop', at: T.Sound + 1.2, db: -20},
    {f: 'whoosh', at: T.air - 0.25, db: -24}, {f: 'tick', at: T.air + 0.3, db: -22}, {f: 'rise', at: T.rushes, db: -20}, {f: 'ding', at: T.rushes + 1, db: -18},
    {f: 'whoosh', at: T.molecules - 0.25, db: -24}, {f: 'clink', at: T.molecules + 0.5, db: -20}, {f: 'clink', at: T.molecules + 0.7, db: -22},
    {f: 'whoosh', at: T.whales - 0.25, db: -24}, {f: 'wobble', at: T.whales + 0.3, db: -20}, {f: 'wobble', at: T.whales + 1.4, db: -22},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'race' && (() => {
          const u = prog(t, 0.5, T.air - 0.5, (x) => x);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1100, 1], [T.air - 0.3, 540, 1100, 1.05]])}>
                <rect x={-400} y={1300} width={1900} height={1200} fill={SEA} stroke={INK} strokeWidth={LW} />
                <path d={wavePath(t, 1300, 16, 200, 2)} fill={SEA} />
                <text x={60} y={1080} fontFamily={FONT} fontWeight={900} fontSize={56} fill={INK}>AIR</text>
                <text x={60} y={1580} fontFamily={FONT} fontWeight={900} fontSize={56} fill="#fff">WATER</text>
                <g transform="translate(110 1180)"><Speaker /></g>
                <g transform="translate(110 1680)"><Speaker /></g>
                <Waves x={lerp(110, 300, u)} y={1180} n={3} col="#2C7BE5" />
                <Waves x={lerp(110, 860, u)} y={1680} n={3} col="#FFE45C" />
                <path d="M 1000 1000 L 1000 1900" stroke="#fff" strokeWidth={10} strokeDasharray="20 16" />
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, 0.1, 12, 6)} color="#fff">SOUND IN WATER IS</Label>
              <Sticker t={t} t0={T.Sound + 1.2} x={540} y={790} text="OVER 4X FASTER" size={66} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'speeds' && (() => {
          const water = t > T.rushes - 0.2;
          const v = water ? Math.round(1480 * prog(t, T.rushes, T.rushes + 1)) : Math.round(340 * prog(t, T.air, T.air + 0.8));
          const ang = -90 + 180 * (v / 1600);
          return (
            <g>
              {water && <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SEA} />}
              <Layer cam={keys(t, [[T.air - 0.25, 540, 1100, 1], [T.molecules - 0.3, 540, 1100, 1.08]])}>
                <g transform="translate(540 1400)">
                  <path d="M -300 0 A 300 300 0 1 1 300 0" fill="#fff" stroke={INK} strokeWidth={LW} />
                  {Array.from({length: 9}).map((_, i) => { const a = (-90 + i * 22.5) * Math.PI / 180; return <path key={i} d={`M ${Math.sin(a) * 250} ${-Math.cos(a) * 250} L ${Math.sin(a) * 290} ${-Math.cos(a) * 290}`} stroke={INK} strokeWidth={8} />; })}
                  <path d={`M 0 0 L ${Math.sin(ang * Math.PI / 180) * 240} ${-Math.cos(ang * Math.PI / 180) * 240}`} stroke="#E5414A" strokeWidth={18} strokeLinecap="round" />
                  <circle r={26} fill={INK} />
                  <text y={160} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={100} fill={water ? '#fff' : INK} stroke={water ? INK : 'none'} strokeWidth={10} paintOrder="stroke">{`${v.toLocaleString('en-US')} m/s`}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={86} s={pop(t, water ? T.rushes : T.air, 12, 6)} color="#fff">{water ? 'IN WATER' : 'IN AIR'}</Label>
              <Sticker t={t} t0={water ? T.rushes + 0.8 : T.air + 0.6} x={540} y={790} text={water ? 'ABOUT 1,500 M/S!' : 'ABOUT 340 M/S'} size={60} fill={water ? '#E5414A' : '#2C7BE5'} />
            </g>
          );
        })()}

        {scene === 'mol' && (() => {
          const wv = (t - T.molecules - 0.3);
          return (
            <g>
              <Layer cam={keys(t, [[T.molecules - 0.25, 540, 990, 1], [T.whales - 0.3, 540, 1000, 1.04]])}>
                <rect x={60} y={950} width={960} height={380} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                <rect x={60} y={1420} width={960} height={380} rx={30} fill={SEA} stroke={INK} strokeWidth={LW} />
                {Array.from({length: 8}).map((_, i) => {
                  const x = 140 + i * 115, d = wv > 0 ? 18 * Math.exp(-((x - 140 - wv * 220) ** 2) / 8000) : 0;
                  return <circle key={i} cx={x + d} cy={1140 + 60 * Math.sin(i * 2.3)} r={26} fill="#9FC4E8" stroke={INK} strokeWidth={5} />;
                })}
                {Array.from({length: 30}).map((_, i) => {
                  const c = i % 15, r = Math.floor(i / 15), x = 110 + c * 62, d = wv > 0 ? 18 * Math.exp(-((x - 110 - wv * 900) ** 2) / 8000) : 0;
                  return <circle key={i} cx={x + d} cy={1560 + r * 70 + (c % 2) * 20} r={26} fill="#CFF0FF" stroke={INK} strokeWidth={5} />;
                })}
                <text x={100} y={1010} fontFamily={FONT} fontWeight={900} fontSize={48} fill={INK}>AIR: SPREAD OUT</text>
                <text x={100} y={1480} fontFamily={FONT} fontWeight={900} fontSize={48} fill="#fff">WATER: PACKED CLOSE</text>
              </Layer>
              <Label x={540} y={640} size={71} s={pop(t, T.molecules, 12, 6)} color="#fff">MOLECULES ARE CLOSER</Label>
              <Sticker t={t} t0={T.molecules + 0.6} x={540} y={790} text="SO VIBRATIONS PASS FASTER" size={46} fill="#7A4DC8" />
            </g>
          );
        })()}

        {scene === 'whales' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={DEEP} />
            <Layer cam={keys(t, [[T.whales - 0.25, 540, 1100, 1.1], [T.card, 540, 1100, 0.95]])}>
              <g transform={`translate(230 ${1200 + 20 * Math.sin(t * 1.5)}) scale(0.7)`}><Whale t={t} /></g>
              <g transform={`translate(850 ${1600 + 20 * Math.sin(t * 1.5 + 1)}) scale(0.6)`}><Whale t={t} flip /></g>
              {[0, 1, 2, 3].map((i) => {
                const a = ((t - T.whales) * 0.6 + i / 4) % 1;
                return <circle key={i} cx={330} cy={1200} r={60 + 700 * a} fill="none" stroke="#FFE45C" strokeWidth={10} opacity={0.8 * (1 - a)} />;
              })}
            </Layer>
            <Label x={540} y={640} size={79} s={pop(t, T.whales, 12, 6)} color="#fff">WHALES CALL ACROSS</Label>
            <Sticker t={t} t0={T.whales + 0.4} x={540} y={790} text="WHOLE OCEANS" size={66} fill="#2C7BE5" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="57-sound-water" voAt={VO_AT} card={T.card} cues={cues} bed="ocean" bedVol={0.04} />
    </AbsoluteFill>
  );
};
