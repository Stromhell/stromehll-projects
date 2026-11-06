import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

const SKY = '#D7F0F7', WATER = '#7CC4D9', PINK = '#FF7FAF', GREY = '#B8B8C0';

const mix = (a: string, b: string, k: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join('');
};

const Flamingo: React.FC<{t: number; col: string; s?: number; eat?: boolean}> = ({t, col, s = 1, eat}) => (
  <g transform={`scale(${s})`}>
    <path d="M -10 0 L 0 -320 M 10 0 L 30 -180 L 0 -320" stroke="#E86A92" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx={0} cy={-390} rx={130} ry={85} fill={col} stroke={INK} strokeWidth={LW} />
    <path d="M -110 -400 Q -170 -380 -150 -330" fill={col} stroke={INK} strokeWidth={6} />
    {eat ? <path d={`M 100 -400 Q 200 -380 200 -250 Q 200 ${-140 + 10 * Math.sin(t * 6)} 170 -130`} stroke={col} strokeWidth={30} fill="none" strokeLinecap="round" />
      : <path d="M 100 -420 Q 180 -480 150 -580 Q 120 -670 190 -690" stroke={col} strokeWidth={30} fill="none" strokeLinecap="round" />}
    {eat ? <g transform="translate(170 -120)"><path d="M -10 0 L 30 30 L 10 -10 Z" fill={INK} /></g>
      : <g transform="translate(200 -690)"><circle r={40} fill={col} stroke={INK} strokeWidth={6} /><circle cx={8} cy={-8} r={7} fill={INK} /><path d="M 30 0 Q 70 10 60 50 L 40 30 Z" fill="#fff" stroke={INK} strokeWidth={5} /><path d="M 60 50 L 48 36" stroke={INK} strokeWidth={10} strokeLinecap="round" /></g>}
  </g>
);

export const FlamingoPink: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.algae - 0.25 ? 'grey' : t < T.feathers - 0.25 ? 'food' : t < T.fade - 0.25 ? 'turn' : t < T.Zoos - 0.25 ? 'fade' : 'zoo';
  const cues: Cue[] = [
    {f: 'boing', at: 0.3, db: -20}, {f: 'sad', at: T.grey, db: -22},
    {f: 'whoosh', at: T.algae - 0.25, db: -24}, {f: 'splash', at: T.algae + 0.2, db: -20}, {f: 'slurp', at: T.algae + 1.0, db: -18},
    {f: 'whoosh', at: T.feathers - 0.25, db: -24}, {f: 'rise', at: T.feathers, db: -20}, {f: 'ding', at: T.feathers + 1.0, db: -18},
    {f: 'whoosh', at: T.fade - 0.25, db: -24}, {f: 'sad', at: T.fade + 0.3, db: -20},
    {f: 'whoosh', at: T.Zoos - 0.25, db: -24}, {f: 'pour', at: T.Zoos + 0.3, db: -20}, {f: 'ding', at: T.Zoos + 1.2, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'grey' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.algae - 0.3, 540, 1120, 1]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={WATER} />
              <path d={wavePath(t, 1700, 12, 200, 2)} fill={WATER} />
              <g transform="translate(300 1780)"><Flamingo t={t} col={PINK} s={0.75} /></g>
              <g transform={`translate(700 1780) scale(${pop(t, T.grey, 12, 6)})`}>
                <ellipse cx={0} cy={-120} rx={90} ry={70} fill={GREY} stroke={INK} strokeWidth={LW} />
                <circle cx={60} cy={-200} r={45} fill={GREY} stroke={INK} strokeWidth={LW} />
                <circle cx={72} cy={-210} r={8} fill={INK} />
                <path d="M 100 -200 L 135 -190 L 100 -180 Z" fill={INK} />
                <path d="M -20 -50 L -20 0 M 20 -50 L 20 0" stroke="#888" strokeWidth={10} />
              </g>
              <text x={700} y={1890} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill="#fff" stroke={INK} strokeWidth={8} paintOrder="stroke" opacity={pop(t, T.grey + 0.4, 12, 6)}>BABY</text>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, 0.1, 12, 6)} color="#fff">FLAMINGOS ARE BORN</Label>
            <Sticker t={t} t0={T.grey} x={540} y={790} text="GREY" size={80} fill="#7A7A88" />
          </g>
        )}

        {scene === 'food' && (
          <g>
            <Layer cam={keys(t, [[T.algae - 0.25, 540, 1120, 1], [T.feathers - 0.3, 540, 1170, 1.1]])}>
              <rect x={-400} y={1500} width={1900} height={1000} fill={WATER} />
              <path d={wavePath(t, 1500, 12, 200, 2)} fill={WATER} />
              <g transform="translate(330 1700)"><Flamingo t={t} col={mix(GREY, PINK, 0.3)} s={0.8} eat /></g>
              {Array.from({length: 8}).map((_, i) => <g key={i} transform={`translate(${560 + (i % 4) * 110 + 15 * Math.sin(t * 2 + i)} ${1600 + Math.floor(i / 4) * 120}) scale(${pop(t, T.algae + 0.2 + i * 0.08, 12, 6)})`}>
                {i % 2 ? <path d="M -30 0 Q 0 -30 30 0 Q 0 20 -30 0 Z M 30 0 L 45 -10 L 45 10 Z" fill="#FF6B6B" stroke={INK} strokeWidth={4} /> : <circle r={18} fill="#6CC05A" stroke={INK} strokeWidth={4} />}
              </g>)}
              <g transform={`translate(540 1800) scale(${pop(t, T.algae + 0.9, 12, 6)})`}>
                <rect x={-260} y={-50} width={520} height={90} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={46} fill="#E86A1E">CAROTENOIDS</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, T.algae, 12, 6)} color="#fff">ALGAE + TINY SHRIMP</Label>
            <Sticker t={t} t0={T.algae + 0.5} x={540} y={790} text="FULL OF PIGMENT" size={60} fill="#E86A1E" />
          </g>
        )}

        {scene === 'turn' && (() => {
          const k = prog(t, T.feathers, T.fade - 0.5);
          return (
            <g>
              <Layer cam={keys(t, [[T.feathers - 0.25, 540, 1120, 1], [T.fade - 0.3, 540, 1120, 1.05]])}>
                <rect x={-400} y={1750} width={1900} height={800} fill={WATER} />
                <g transform="translate(470 1830)"><Flamingo t={t} col={mix(GREY, PINK, k)} s={0.85} /></g>
                {Array.from({length: 6}).map((_, i) => { const a = ((t * 0.8 + i / 6) % 1); return <circle key={i} cx={470 + 40 * Math.sin(i * 2)} cy={lerp(1800, 1450, a)} r={12} fill="#E86A1E" opacity={(1 - a) * (1 - k * 0.5)} />; })}
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.feathers, 12, 6)} color="#fff">COLOUR GOES INTO</Label>
              <Sticker t={t} t0={T.feathers + 0.4} x={540} y={790} text="THEIR FEATHERS" size={68} fill={PINK} />
            </g>
          );
        })()}

        {scene === 'fade' && (() => {
          const k = 1 - 0.75 * prog(t, T.fade, T.Zoos - 0.4);
          return (
            <g>
              <Layer cam={keys(t, [[T.fade - 0.25, 540, 1120, 1], [T.Zoos - 0.3, 540, 1120, 1.04]])}>
                <rect x={-400} y={1750} width={1900} height={800} fill={WATER} />
                <g transform="translate(470 1830)"><Flamingo t={t} col={mix(GREY, PINK, k)} s={0.85} /></g>
                <g transform={`translate(860 1250) scale(${pop(t, T.fade + 0.2, 12, 6)})`}>
                  <circle r={80} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <path d="M -30 -10 Q 0 -40 30 -10 M -40 30 L 40 30" stroke="#6CC05A" strokeWidth={10} fill="none" />
                  <path d="M -60 -60 L 60 60" stroke="#E5414A" strokeWidth={14} strokeLinecap="round" />
                </g>
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.fade, 12, 6)} color="#fff">NO PIGMENT FOOD?</Label>
              <Sticker t={t} t0={T.fade + 0.4} x={540} y={790} text="FEATHERS FADE" size={66} fill="#7A7A88" />
            </g>
          );
        })()}

        {scene === 'zoo' && (() => {
          const k = 0.25 + 0.75 * prog(t, T.Zoos + 0.5, T.card - 0.5);
          return (
            <g>
              <Layer cam={keys(t, [[T.Zoos - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.05]])}>
                <rect x={-400} y={1750} width={1900} height={800} fill="#C9B48A" stroke={INK} strokeWidth={LW} />
                <g transform="translate(380 1830)"><Flamingo t={t} col={mix(GREY, PINK, k)} s={0.85} /></g>
                <g transform="translate(800 1750)">
                  <path d="M -110 0 L -90 -120 L 90 -120 L 110 0 Z" fill="#E8A040" stroke={INK} strokeWidth={LW} />
                  <text y={-45} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#fff">PINK</text>
                  <text y={-10} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#fff">FOOD</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={66} s={pop(t, T.Zoos, 12, 6)} color="#fff">ZOOS ADD PIGMENT</Label>
              <Sticker t={t} t0={T.Zoos + 0.4} x={540} y={790} text="TO KEEP THEM PINK" size={60} fill={PINK} />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="74-flamingo-pink" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
