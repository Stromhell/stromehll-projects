import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SKY = '#CDEFD8', GREEN = '#2FA36A', GREEN2 = '#1E7A4C', THROAT = '#E5414A';

// hummingbird facing right; wing angle driven by t*speed
const Bird: React.FC<{t: number; speed?: number; eight?: boolean}> = ({t, speed = 60, eight}) => {
  const a = Math.sin(t * speed);
  return (
    <g>
      <path d="M -120 10 L -230 -20 L -220 30 Z" fill={GREEN2} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <ellipse cx={0} cy={0} rx={130} ry={80} fill={GREEN} stroke={INK} strokeWidth={LW} />
      <ellipse cx={30} cy={30} rx={70} ry={40} fill="#E8F5E0" />
      <circle cx={110} cy={-50} r={60} fill={GREEN} stroke={INK} strokeWidth={LW} />
      <path d="M 90 -10 Q 120 20 150 -10" fill={THROAT} stroke={INK} strokeWidth={5} />
      <path d="M 165 -55 L 330 -40 L 165 -40 Z" fill={INK} />
      <circle cx={125} cy={-65} r={11} fill={INK} /><circle cx={129} cy={-69} r={4} fill="#fff" />
      <g transform={`translate(-10 -40) rotate(${eight ? -60 + 80 * a : -50 + 70 * a})`}>
        <path d="M 0 0 Q -60 -200 -10 -260 Q 50 -200 0 0 Z" fill="#BFF0D6" stroke={INK} strokeWidth={6} opacity={0.9} />
      </g>
      <g transform={`translate(-10 -40) rotate(${eight ? -60 + 80 * a : -50 + 70 * a})`} opacity={0.35}>
        <path d="M 0 0 Q -60 -200 -10 -260 Q 50 -200 0 0 Z" fill="#BFF0D6" transform={`rotate(${-20 * Math.cos(t * speed)})`} />
      </g>
    </g>
  );
};

const Flower: React.FC = () => (
  <g>
    <path d="M 0 0 L 0 500" stroke="#3E9A4A" strokeWidth={16} />
    <path d="M -60 -20 Q -90 -160 0 -200 Q 90 -160 60 -20 Q 0 20 -60 -20 Z" fill="#E87AC8" stroke={INK} strokeWidth={LW} transform="rotate(-90)" />
    <circle cx={0} cy={0} r={22} fill="#FFD25C" stroke={INK} strokeWidth={5} />
  </g>
);

export const HummingbirdBackwards: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.lift - 0.25 ? 'back' : t < T.twists - 0.25 ? 'normal' : t < T.times - 0.25 ? 'eight' : t < T.hover - 0.25 ? 'fast' : 'hover';
  const cues: Cue[] = [
    {f: 'wobble', at: 0.2, db: -22}, {f: 'whoosh', at: 0.8, db: -18}, {f: 'ding', at: 1.4, db: -20},
    {f: 'whoosh', at: T.lift - 0.25, db: -24}, {f: 'whoosh', at: T.lift + 0.4, db: -24},
    {f: 'whoosh', at: T.twists - 0.25, db: -24}, {f: 'rise', at: T.twists + 0.2, db: -22},
    {f: 'whoosh', at: T.times - 0.25, db: -24}, {f: 'ticktock', at: T.times + 0.1, db: -22},
    {f: 'whoosh', at: T.hover - 0.25, db: -24}, {f: 'pop', at: T.hover + 0.2, db: -20}, {f: 'whoosh', at: T.zoom, db: -16},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'back' && (() => {
          const x = lerp(700, 360, prog(t, 0.6, T.lift - 0.4));
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 960, 1.05], [T.lift - 0.3, 520, 960, 1]])}>
                <g transform="translate(900 1300)"><Flower /></g>
                <g transform={`translate(${x} ${1290 + 20 * Math.sin(t * 5)}) scale(0.95)`}><Bird t={t} /></g>
                {Array.from({length: 4}).map((_, i) => { const a = (t * 2 + i / 4) % 1; return <path key={i} d={`M ${x + 170 + 120 * a} ${1230 + i * 30} l 70 0`} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={(1 - a) * (t > 0.6 ? 1 : 0)} />; })}
                <path d={`M 560 1680 L 300 1680`} stroke="#E5414A" strokeWidth={18} strokeLinecap="round" opacity={pop(t, 0.9, 12, 6)} />
                <path d="M 330 1640 L 280 1680 L 330 1720" stroke="#E5414A" strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={pop(t, 0.9, 12, 6)} />
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, 0.1, 12, 6)} color="#fff">THIS BIRD FLIES</Label>
              <Sticker t={t} t0={0.7} x={540} y={790} text="BACKWARDS" size={78} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'normal' && (() => {
          const ph = (t * 3) % 1, down = ph < 0.5;
          return (
            <g>
              <Layer cam={keys(t, [[T.lift - 0.25, 540, 950, 1], [T.twists - 0.3, 540, 950, 1.05]])}>
                <g transform={`translate(540 1350)`}>
                  <ellipse rx={90} ry={60} fill="#7A8AA0" stroke={INK} strokeWidth={LW} />
                  <path d={`M -20 -20 L -260 ${down ? lerp(-160, 80, ph * 2) : lerp(80, -160, (ph - 0.5) * 2)}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
                  <path d={`M 20 -20 L 260 ${down ? lerp(-160, 80, ph * 2) : lerp(80, -160, (ph - 0.5) * 2)}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
                  <text y={300} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill={down ? '#2FA35A' : '#9AA6B8'} stroke={INK} strokeWidth={8} paintOrder="stroke">{down ? 'DOWN = LIFT' : 'UP = NOTHING'}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.lift, 12, 6)} color="#fff">MOST BIRDS</Label>
              <Sticker t={t} t0={T.lift + 0.3} x={540} y={790} text="ONLY LIFT ON THE DOWNSTROKE" size={42} fill="#7A8AA0" />
            </g>
          );
        })()}

        {scene === 'eight' && (() => {
          const ph = (t - T.twists) * 1.5;
          const px = 540 + 220 * Math.sin(ph * Math.PI * 2), py = 1350 + 120 * Math.sin(ph * Math.PI * 4);
          return (
            <g>
              <Layer cam={keys(t, [[T.twists - 0.25, 540, 950, 1], [T.times - 0.3, 540, 950, 1.06]])}>
                <path d={Array.from({length: 61}).map((_, i) => { const a = i / 60; return `${i ? 'L' : 'M'} ${540 + 220 * Math.sin(a * Math.PI * 2)} ${1350 + 120 * Math.sin(a * Math.PI * 4)}`; }).join(' ')} stroke="#7A4DC8" strokeWidth={14} fill="none" strokeDasharray="24 16" />
                <circle cx={px} cy={py} r={30} fill="#FFE45C" stroke={INK} strokeWidth={6} />
                <text x={300} y={1620} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill="#2FA35A" stroke={INK} strokeWidth={8} paintOrder="stroke" opacity={pop(t, T.twists + 0.6, 12, 6)}>DOWN: LIFT</text>
                <text x={780} y={1620} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill="#2FA35A" stroke={INK} strokeWidth={8} paintOrder="stroke" opacity={pop(t, T.twists + 1.0, 12, 6)}>UP: LIFT</text>
              </Layer>
              <Label x={540} y={640} size={68} s={pop(t, T.twists, 12, 6)} color="#fff">WINGS TRACE AN 8</Label>
              <Sticker t={t} t0={T.twists + 0.4} x={540} y={790} text="LIFT BOTH WAYS" size={62} fill="#7A4DC8" />
            </g>
          );
        })()}

        {scene === 'fast' && (
          <g>
            <Layer cam={keys(t, [[T.times - 0.25, 540, 1070, 1.1], [T.hover - 0.3, 540, 1070, 1.2]])}>
              <g transform={`translate(520 ${1350 + 6 * Math.sin(t * 40)}) scale(1.1)`}><Bird t={t} speed={90} /></g>
              <g transform={`translate(540 1700) scale(${pop(t, T.times + 0.2, 12, 6)})`}>
                <rect x={-330} y={-60} width={660} height={110} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill={INK}>{`${Math.round(80 * prog(t, T.times + 0.2, T.times + 1.2))} FLAPS / SEC`}</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.times, 12, 6)} color="#fff">UP TO 80 TIMES</Label>
            <Sticker t={t} t0={T.times + 0.3} x={540} y={790} text="EVERY SECOND" size={64} fill="#E5414A" />
          </g>
        )}

        {scene === 'hover' && (() => {
          const z = t > T.zoom - 0.1;
          const x = z ? lerp(560, 200, prog(t, T.zoom, T.zoom + 0.6, (u) => u * u)) : 560 + (t > T.hover + 1 ? 80 * Math.sin((t - T.hover) * 3) : 0);
          return (
            <g>
              <Layer cam={keys(t, [[T.hover - 0.25, 540, 1070, 1], [T.card, 540, 1070, 1.05]])}>
                <g transform="translate(900 1350)"><Flower /></g>
                <g transform={`translate(${x} 1340) scale(0.9)`}><Bird t={t} /></g>
                {z && Array.from({length: 5}).map((_, i) => <path key={i} d={`M ${x + 200 + i * 30} ${1280 + i * 25} l 120 0`} stroke="#fff" strokeWidth={8} strokeLinecap="round" />)}
              </Layer>
              <Label x={540} y={640} size={66} s={pop(t, T.hover, 12, 6)} color="#fff">{z ? 'AND ZOOM BACKWARDS' : 'HOVER. SIDEWAYS.'}</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="66-hummingbird-backwards" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
