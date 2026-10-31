import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

// ---------------------------------------------------------------- helpers
const starD = (R: number, r: number) => 'M ' + Array.from({length: 10}).map((_, i) => {
  const a = -Math.PI / 2 + (i * Math.PI) / 5; const rr = i % 2 ? r : R;
  return `${(rr * Math.cos(a)).toFixed(1)} ${(rr * Math.sin(a)).toFixed(1)}`;
}).join(' L ') + ' Z';

// jittery flicker signal in about [-1, 1]
const jit = (t: number) => 0.5 * Math.sin(t * 37) + 0.3 * Math.sin(t * 61 + 1) + 0.2 * Math.sin(t * 23 + 2);

// the star character: flick 0 = perfectly still, 1 = wild twinkle
const StarChar: React.FC<{t: number; flick: number; mood?: 'dizzy' | 'calm' | 'smile'}> = ({t, flick, mood = 'smile'}) => {
  const j = flick * jit(t);
  const dim = clamp(flick * (0.5 + 0.5 * Math.sin(t * 29 + 0.7)));
  const blink = t % 3.3 < 0.12;
  const eyes = mood === 'calm'
    ? <g><path d="M -40 -6 Q -26 -20 -12 -6" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /><path d="M 12 -6 Q 26 -20 40 -6" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /></g>
    : <g>
      {[-26, 26].map((x, i) => {
        const wx = mood === 'dizzy' ? 5 * Math.sin(t * 19 + i * 2) : 0, wy = mood === 'dizzy' ? 4 * Math.cos(t * 17 + i) : 0;
        return <g key={i}><ellipse cx={x} cy={-8} rx={13} ry={blink ? 2 : 15} fill="#fff" stroke={INK} strokeWidth={5} />{!blink && <circle cx={x + wx} cy={-6 + wy} r={7} fill={INK} />}</g>;
      })}
    </g>;
  const mouth = mood === 'dizzy'
    ? <path d={`M -18 ${26 + 3 * Math.sin(t * 21)} q 6 -8 12 0 q 6 8 12 0 q 6 -8 12 0`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    : <path d="M -20 22 Q 0 40 20 22" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
  return (
    <g transform={`rotate(${8 * j}) scale(${1 + 0.2 * j})`}>
      <circle r={175} fill="#FFF6B0" opacity={0.14 + 0.16 * (1 - dim)} />
      {flick > 0.05 && [0, 1, 2, 3].map((i) => {
        const L = (30 + 70 * clamp(0.5 + 0.5 * Math.sin(t * 31 + i * 1.9))) * flick;
        return <path key={i} transform={`rotate(${i * 90 + 36})`} d={`M 0 -150 L 0 ${-150 - L}`} stroke="#FFF6B0" strokeWidth={12} strokeLinecap="round" />;
      })}
      <path d={starD(130, 62)} fill="#FFD84D" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d={starD(130, 62)} fill="#2E3470" opacity={0.5 * dim} />
      <path d="M -16 -40 L -6 -86" stroke="#FFF0A8" strokeWidth={11} strokeLinecap="round" />
      {eyes}
      {mouth}
      <circle cx={-44} cy={18} r={9} fill="#FF9A6A" opacity={0.6} /><circle cx={44} cy={18} r={9} fill="#FF9A6A" opacity={0.6} />
    </g>
  );
};

// calm ringed planet with a sleepy smile
const Planet: React.FC<{t: number; grin?: boolean}> = ({t, grin}) => (
  <g transform={`rotate(${3 * Math.sin(t * 0.8)})`}>
    <defs><clipPath id="pl-clip"><circle r={120} /></clipPath></defs>
    <circle r={168} fill="#FFE2B8" opacity={0.16} />
    <g transform="rotate(-16)">
      <path d="M -210 0 A 210 52 0 0 1 210 0" fill="none" stroke={INK} strokeWidth={34} />
      <path d="M -210 0 A 210 52 0 0 1 210 0" fill="none" stroke="#8FD6C8" strokeWidth={18} />
    </g>
    <circle r={120} fill="#FF9A4D" />
    <g clipPath="url(#pl-clip)">
      <path d="M -140 -70 Q 0 -50 140 -80" stroke="#FFBF7A" strokeWidth={24} fill="none" />
      <path d="M -140 70 Q 0 90 140 60" stroke="#E07A34" strokeWidth={22} fill="none" />
      <path d="M -90 -96 A 112 112 0 0 0 -110 20" stroke="#FFC48A" strokeWidth={14} fill="none" strokeLinecap="round" />
    </g>
    <circle r={120} fill="none" stroke={INK} strokeWidth={LW} />
    <path d="M -56 -24 Q -40 -38 -24 -24" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 24 -24 Q 40 -38 56 -24" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
    {grin
      ? <g><path d="M -26 0 Q 0 34 26 0 Z" fill={INK} /><ellipse cx={0} cy={14} rx={10} ry={5} fill="#F07A8A" /></g>
      : <path d="M -18 4 Q 0 18 18 4" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />}
    <circle cx={-62} cy={2} r={10} fill="#E5414A" opacity={0.45} /><circle cx={62} cy={2} r={10} fill="#E5414A" opacity={0.45} />
    <g transform="rotate(-16)">
      <path d="M -210 0 A 210 52 0 0 0 210 0" fill="none" stroke={INK} strokeWidth={34} />
      <path d="M -210 0 A 210 52 0 0 0 210 0" fill="none" stroke="#8FD6C8" strokeWidth={18} />
    </g>
  </g>
);

// background star dots; still = no twinkle (space)
const SkyDots: React.FC<{t: number; still?: boolean}> = ({t, still}) => (
  <g>{Array.from({length: 70}).map((_, i) => {
    const x = (i * 197 + 37) % W, y = (i * 331 + 91) % 1500;
    const tw = still ? 1 : 0.55 + 0.45 * Math.sin(t * (3 + (i % 5)) + i * 2.1);
    return <circle key={i} cx={x} cy={y} r={2.5 + (i % 3) * 1.5} fill="#fff" opacity={0.25 + 0.6 * tw} />;
  })}</g>
);

// layers of moving air, wobbling harder with amp
const AirBands: React.FC<{t: number; y0: number; y1: number; amp: number}> = ({t, y0, y1, amp}) => {
  const n = 4, h = (y1 - y0) / n;
  const xs = Array.from({length: 30}).map((_, i) => -40 + i * 40);
  const edge = (y: number, i: number) => xs.map((x) => `${x} ${(y + amp * Math.sin(x / 150 + t * (1.6 + i * 0.4) + i * 1.7)).toFixed(1)}`);
  return (
    <g>
      {Array.from({length: n}).map((_, i) => {
        const top = edge(y0 + i * h, i), bot = edge(y0 + (i + 1) * h, i + 1).reverse();
        return (
          <g key={i}>
            <path d={`M ${top.join(' L ')} L ${bot.join(' L ')} Z`} fill={i % 2 ? '#7FA6FF' : '#A9C6FF'} opacity={0.2} />
            <path d={`M ${top.join(' L ')}`} fill="none" stroke="#C9DCFF" strokeWidth={6} opacity={0.55} strokeLinecap="round" />
          </g>
        );
      })}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = ((t * (60 + i * 25) + i * 260) % 1300) - 110, y = y0 + h * (i % 4 + 0.5) + 10 * Math.sin(t * 2 + i);
        return <path key={'c' + i} transform={`translate(${x} ${y})`} d="M -40 0 Q -20 -22 0 0 Q 16 18 30 0 Q 36 -14 24 -16" fill="none" stroke="#E2ECFF" strokeWidth={7} strokeLinecap="round" opacity={0.7} />;
      })}
    </g>
  );
};

// a light beam that zigzags through the air region (env 0..1 controls bending)
const beamD = (t: number, x0: number, y0: number, x1: number, y1: number, ya: number, yb: number, amp: number, seed: number) => {
  const N = 18; const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N, x = lerp(x0, x1, u), y = lerp(y0, y1, u);
    const inAir = y > ya && y < yb ? Math.sin((Math.PI * (y - ya)) / (yb - ya)) : 0;
    const off = i === 0 || i === N ? 0 : amp * inAir * ((i % 2 ? 0.7 : -0.7) * Math.sin(t * 5 + seed) + 0.6 * Math.sin(t * 7.3 + i * 1.1 + seed));
    pts.push(`${(x + off).toFixed(1)} ${y.toFixed(1)}`);
  }
  return 'M ' + pts.join(' L ');
};
const Beam: React.FC<{d: string; draw?: number; op?: number; w?: number}> = ({d, draw = 1, op = 1, w = 9}) => (draw <= 0.001 ? null : (
  <g opacity={op}>
    <path d={d} pathLength={1} strokeDasharray={`${draw} 2`} stroke={INK} strokeWidth={w + 9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} pathLength={1} strokeDasharray={`${draw} 2`} stroke="#FFF27A" strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
));

const Spaceman: React.FC<{t: number}> = ({t}) => (
  <g transform={`rotate(${-8 + 5 * Math.sin(t * 0.9)})`}>
    <rect x={-112} y={-40} width={224} height={230} rx={34} fill="#C9D3DD" stroke={INK} strokeWidth={LW} />
    {[[-40, -78, 290], [40, 84, 280]].map(([sx, ex, ey], i) => (
      <g key={i}>
        <path d={`M ${sx} 170 Q ${sx + (ex - sx) * 0.3} 240 ${ex} ${ey}`} stroke={INK} strokeWidth={60} fill="none" strokeLinecap="round" />
        <path d={`M ${sx} 170 Q ${sx + (ex - sx) * 0.3} 240 ${ex} ${ey}`} stroke="#fff" strokeWidth={42} fill="none" strokeLinecap="round" />
        <ellipse cx={ex} cy={ey + 14} rx={40} ry={24} fill="#FF8A3D" stroke={INK} strokeWidth={LW} />
      </g>
    ))}
    <path d="M -80 30 Q -170 70 -190 150" stroke={INK} strokeWidth={56} fill="none" strokeLinecap="round" />
    <path d="M -80 30 Q -170 70 -190 150" stroke="#fff" strokeWidth={38} fill="none" strokeLinecap="round" />
    <circle cx={-192} cy={156} r={30} fill="#FF8A3D" stroke={INK} strokeWidth={LW} />
    <rect x={-92} y={-20} width={184} height={210} rx={62} fill="#fff" stroke={INK} strokeWidth={LW} />
    <path d="M -86 120 L 86 120" stroke="#FF8A3D" strokeWidth={18} />
    <rect x={-46} y={20} width={92} height={60} rx={12} fill="#DDE4EA" stroke={INK} strokeWidth={6} />
    <circle cx={-22} cy={50} r={10} fill="#E5414A" /><circle cx={4} cy={50} r={10} fill="#2C7BE5" /><circle cx={28} cy={50} r={8} fill="#FFD84D" />
    <path d="M 80 30 Q 170 0 214 -88" stroke={INK} strokeWidth={56} fill="none" strokeLinecap="round" />
    <path d="M 80 30 Q 170 0 214 -88" stroke="#fff" strokeWidth={38} fill="none" strokeLinecap="round" />
    <circle cx={218} cy={-96} r={30} fill="#FF8A3D" stroke={INK} strokeWidth={LW} />
    <path d="M 62 -212 L 84 -262" stroke={INK} strokeWidth={8} /><circle cx={86} cy={-268} r={14} fill="#E5414A" stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={-110} r={116} fill="#fff" stroke={INK} strokeWidth={LW} />
    <ellipse cx={10} cy={-108} rx={84} ry={70} fill="#BFE9FF" stroke={INK} strokeWidth={7} />
    <ellipse cx={-14} cy={-118} rx={10} ry={t % 2.9 < 0.12 ? 2 : 14} fill={INK} /><ellipse cx={38} cy={-116} rx={10} ry={t % 2.9 < 0.12 ? 2 : 14} fill={INK} />
    <path d="M -8 -82 Q 14 -60 40 -84" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -50 -140 Q -40 -160 -18 -164" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);

const EarthArc: React.FC<{t: number; cx: number; cy: number; r: number}> = ({t, cx, cy, r}) => (
  <g transform={`translate(${cx} ${cy})`}>
    <circle r={r + 30} fill="none" stroke="#9FD8FF" strokeWidth={24} opacity={0.35} />
    <circle r={r} fill="#3D8CF0" stroke={INK} strokeWidth={LW} />
    <g transform={`rotate(${t * 3})`}>
      {Array.from({length: 8}).map((_, i) => (
        <ellipse key={i} transform={`rotate(${i * 45}) translate(0 ${-r * 0.88}) rotate(${i * 30})`} rx={r * 0.16} ry={r * 0.07} fill="#6FC25A" stroke={INK} strokeWidth={6} />
      ))}
      {Array.from({length: 6}).map((_, i) => (
        <ellipse key={'c' + i} transform={`rotate(${i * 60 + 20}) translate(0 ${-r * 0.97})`} rx={r * 0.08} ry={r * 0.025} fill="#fff" opacity={0.85} />
      ))}
    </g>
  </g>
);

const Hill: React.FC = () => (
  <path d="M -60 1600 Q 300 1470 560 1530 Q 820 1590 1140 1500 L 1140 2000 L -60 2000 Z" fill="#2F6B4F" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
);

export const StarsTwinkle: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const sw3 = Math.max(T.planets - 0.2, T.flickers + 0.45); // air -> planet
  const scene = t < T.far - 0.25 ? 'hill' : t < T.air - 0.25 ? 'far' : t < sw3 ? 'air' : t < T.space - 0.25 ? 'planet' : 'space';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.15, db: -24}, {f: 'ding', at: T.twinkle, db: -22}, {f: 'pop', at: T.twinkle + 0.75, db: -20},
    {f: 'whoosh', at: T.far - 0.25, db: -24}, {f: 'rise', at: T.far, db: -24}, {f: 'zap', at: T.far + 1.4, db: -24}, {f: 'pop', at: T.point, db: -20},
    {f: 'whoosh', at: T.air - 0.25, db: -24}, {f: 'wobble', at: T.air + 1.8, db: -22}, {f: 'zap', at: T.flickers - 0.25, db: -22},
    {f: 'whoosh', at: sw3, db: -24}, {f: 'boing', at: T.discs, db: -22}, {f: 'ding', at: T.steady, db: -18},
    {f: 'whoosh', at: T.space - 0.25, db: -24},
  ];
  const bg = scene === 'space' ? '#05061A' : '#141A44';
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0E1238" /><stop offset="1" stopColor="#3B2E6E" /></linearGradient>
        </defs>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={scene === 'space' ? '#05061A' : 'url(#night)'} />

        {scene === 'hill' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1000, 1.08], [T.far - 0.25, 540, 960, 1]])}>
              <SkyDots t={t} />
              <Hill />
              <g transform={`translate(290 ${900 + 10 * Math.sin(t * 1.4)}) scale(${0.7 * pop(t, 0.3, 12, 6)})`}>
                <StarChar t={t} flick={lerp(0.4, 1, prog(t, T.twinkle - 0.3, T.twinkle + 0.2))} mood="dizzy" />
              </g>
              <g transform={`translate(790 ${930 + 8 * Math.sin(t * 1.1 + 1)}) scale(${0.75 * pop(t, T.twinkle + 0.75, 12, 6)})`}><Planet t={t} /></g>
              <g transform="translate(430 1530) scale(0.72)">
                <Guy t={t} expr={t > T.twinkle + 0.75 ? 'hope' : 'worried'} handL={[-110, -170]} handR={[150, -420]} bendR={0.2} look={t > T.twinkle + 0.75 ? [10, -10] : [-12, -10]} stand blink={t % 2.7 < 0.12} />
              </g>
            </Layer>
            <Label x={290} y={1080} size={54} s={pop(t, 0.5, 12, 6)} color="#FFE45C">STAR</Label>
            <Label x={790} y={1090} size={54} s={pop(t, T.twinkle + 0.9, 12, 6)} color="#FFB36B">PLANET</Label>
            <Label x={540} y={640} size={60} s={pop(t, T.twinkle - 0.5, 12, 6)} color="#FFE45C">WHY DO STARS TWINKLE?</Label>
          </g>
        )}

        {scene === 'far' && (() => {
          const sx = 780, sy = 900, ex = 275, ey = 1640;
          const shrink = prog(t, T.point - 0.3, T.point + 0.3);
          const dots = Array.from({length: 26});
          const ph = prog(t, T.far + 1.4, T.point - 0.5);
          return (
            <g>
              <Layer cam={keys(t, [[T.far - 0.25, 540, 960, 1], [T.point + 1.8, 540, 960, 1], [T.air - 0.25, 420, 1450, 1.35]])}>
                <SkyDots t={t} />
                {dots.map((_, i) => {
                  const u = (i + 0.5) / dots.length; if (u > prog(t, T.far - 0.1, T.far + 0.9)) return null;
                  return <circle key={i} cx={lerp(ex, sx, u)} cy={lerp(ey, sy, u)} r={8} fill="#FFE45C" stroke={INK} strokeWidth={4} />;
                })}
                {t > T.point + 0.4 && <Beam d={`M ${sx} ${sy} L ${ex} ${ey}`} draw={prog(t, T.point + 0.4, T.point + 1.2)} w={6} />}
                {ph > 0 && ph < 1 && (
                  <g transform={`translate(${lerp(sx, ex, ph)} ${lerp(sy, ey, ph)})`}>
                    <circle r={34} fill="#FFF6B0" opacity={0.35} /><circle r={16} fill="#FFF27A" stroke={INK} strokeWidth={5} />
                  </g>
                )}
                <EarthArc t={t} cx={540} cy={2700} r={900} />
                <g transform="translate(300 1833) rotate(-15.5) scale(0.4)">
                  <Guy t={t} expr="hope" handL={[-110, -170]} handR={[120, -170]} look={[10, -12]} stand blink={t % 2.5 < 0.12} />
                </g>
                <g transform={`translate(${sx} ${sy}) scale(${0.75 * lerp(1, 0.12, shrink)})`}><StarChar t={t} flick={0.6} mood="smile" /></g>
                {shrink > 0.5 && (
                  <g transform={`translate(${sx} ${sy}) rotate(${t * 40}) scale(${pop(t, T.point, 12, 6)})`}>
                    <circle r={56} fill="none" stroke="#FFE45C" strokeWidth={7} strokeDasharray="16 12" />
                  </g>
                )}
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, T.far, 12, 6)} color="#FFE45C">SO FAR AWAY</Label>
              <Sticker t={t} t0={T.point} t1={T.point + 1.6} x={620} y={1500} text="ONE TINY POINT" size={64} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'air' && (() => {
          const amp = lerp(5, 28, prog(t, T.air - 0.1, T.air + 0.5));
          const bend = prog(t, T.air + 1.6, T.air + 2.3);
          const d = beamD(t, 540, 850, 425, 1585, 930, 1430, 70 * bend, 0);
          return (
            <g>
              <SkyDots t={t} />
              <AirBands t={t} y0={930} y1={1430} amp={amp} />
              <path d="M -40 1850 Q 540 1800 1120 1850 L 1120 2000 L -40 2000 Z" fill="#2F6B4F" stroke={INK} strokeWidth={LW} />
              <Beam d={d} draw={prog(t, T.air + 0.5, T.air + 1.1)} />
              <g transform="translate(540 800) scale(0.42)"><StarChar t={t} flick={lerp(0.15, 1, bend)} mood={bend > 0.5 ? 'dizzy' : 'smile'} /></g>
              <g transform="translate(380 1860) scale(0.6)">
                <Guy t={t} expr={t > T.flickers - 0.3 ? 'happy' : 'hope'} handL={[-110, -170]} handR={[120, -170]} look={[8, -12]} stand blink={t % 2.6 < 0.12} />
              </g>
              <Label x={540} y={640} size={84} s={pop(t, T.air, 12, 6)} color="#BFD8FF">WOBBLY AIR</Label>
              <Sticker t={t} t0={T.flickers - 0.25} x={790} y={1680} text="FLICKERS!" size={72} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'planet' && (() => {
          const s = lerp(0.12, 0.85, prog(t, sw3, T.planets + 1.3));
          const beamsOn = prog(t, T.discs, T.discs + 0.6);
          const avg = prog(t, T.discs + 1.15, T.discs + 1.9);
          const steady = t > T.steady;
          return (
            <g>
              <SkyDots t={t} />
              <AirBands t={t} y0={1080} y1={1420} amp={26} />
              <path d="M -40 1850 Q 540 1800 1120 1850 L 1120 2000 L -40 2000 Z" fill="#2F6B4F" stroke={INK} strokeWidth={LW} />
              {avg > 0 && <path d="M 560 960 L 330 1580" stroke="#FFF27A" strokeWidth={56} strokeLinecap="round" opacity={0.4 * avg} />}
              {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
                <Beam key={k} d={beamD(t, 560 + k * 28, 960, 330, 1580, 1080, 1420, 40, k * 2.3)} draw={beamsOn} w={6} op={lerp(1, 0.35, avg)} />
              ))}
              {avg > 0 && <path d="M 560 960 L 330 1580" stroke="#FFFBD0" strokeWidth={14} strokeLinecap="round" opacity={avg} />}
              <g transform={`translate(560 ${900 + 8 * Math.sin(t * 1.3)}) scale(${s})`}><Planet t={t} grin={steady} /></g>
              {t > T.discs && (
                <g transform={`translate(560 900) rotate(${t * 20}) scale(${pop(t, T.discs, 12, 6)})`}>
                  <circle r={124} fill="none" stroke="#FFE45C" strokeWidth={7} strokeDasharray="18 12" />
                </g>
              )}
              <g transform="translate(300 1860) scale(0.6)">
                <Guy t={t} expr={steady ? 'happy' : 'hope'} handL={[-110, -170]} handR={steady ? [150, -420] : [120, -170]} bendR={0.2} look={[10, -12]} stand blink={t % 2.4 < 0.12} />
              </g>
              <Label x={540} y={640} size={62} s={pop(t, T.planets + 0.9, 12, 6)} color="#FFB36B">PLANETS ARE CLOSER</Label>
              <Label x={850} y={1070} size={56} s={pop(t, T.discs + 0.1, 12, 6)} color="#FFE45C">TINY DISC</Label>
              <Sticker t={t} t0={T.steady} x={790} y={1660} text="STEADY" size={80} fill="#2E9E5B" rot={4} />
            </g>
          );
        })()}

        {scene === 'space' && (
          <g>
            <Layer cam={keys(t, [[T.space - 0.25, 540, 1000, 1.06], [T.card, 540, 960, 1]])}>
              <SkyDots t={t} still />
              <EarthArc t={t} cx={540} cy={2500} r={820} />
              <g transform={`translate(740 860) rotate(${t * 4}) scale(${0.7 * pop(t, T.space - 0.2, 10, 6)})`}><StarChar t={t} flick={0} mood="calm" /></g>
              <g transform={`translate(${360 + 10 * Math.sin(t * 0.7)} ${1250 + 18 * Math.sin(t * 1.3)}) scale(0.9)`}><Spaceman t={t} /></g>
            </Layer>
            <Label x={540} y={640} size={64} s={pop(t, T.space + 0.25, 12, 6)} color="#FFE45C">NO AIR, NO TWINKLE</Label>
            <Sticker t={t} t0={T.space + 1.2} x={560} y={1640} text="PERFECTLY STILL" size={66} fill="#5B3A8C" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="30-stars-twinkle" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
