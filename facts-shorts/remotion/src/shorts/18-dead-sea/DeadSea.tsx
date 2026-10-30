import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, SaltCube, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

// floating person lying on back, origin at belly
const Floater: React.FC<{t: number; paper?: boolean; s?: number}> = ({t, paper = true, s = 1}) => (
  <g transform={`scale(${s}) rotate(${3 * Math.sin(t * 1.5)})`}>
    <path d="M -220 0 L -360 -10" stroke={INK} strokeWidth={40} strokeLinecap="round" /><path d="M -220 0 L -360 -10" stroke="#F2C9A0" strokeWidth={24} strokeLinecap="round" />
    <path d="M -200 10 L -350 30" stroke={INK} strokeWidth={40} strokeLinecap="round" /><path d="M -200 10 L -350 30" stroke="#F2C9A0" strokeWidth={24} strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={230} ry={70} fill="#F2C9A0" stroke={INK} strokeWidth={LW} />
    <path d="M -120 -50 Q -40 -80 40 -50 L 40 50 Q -40 70 -120 50 Z" fill="#3D8CF0" stroke={INK} strokeWidth={6} />
    <circle cx={280} cy={-30} r={80} fill="#F2C9A0" stroke={INK} strokeWidth={LW} />
    <path d="M 220 -80 Q 280 -130 350 -80" stroke={INK} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M 270 -40 q 10 -10 20 0 M 310 -40 q 10 -10 20 0" stroke={INK} strokeWidth={6} fill="none" />
    <path d="M 280 0 q 20 14 40 0" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    {paper && (
      <g transform={`translate(160 -150) rotate(${-10 + 3 * Math.sin(t * 2)})`}>
        <path d="M 120 120 L 60 60" stroke={INK} strokeWidth={30} strokeLinecap="round" /><path d="M 120 120 L 60 60" stroke="#F2C9A0" strokeWidth={16} strokeLinecap="round" />
        <rect x={-110} y={-80} width={220} height={150} fill="#fff" stroke={INK} strokeWidth={7} />
        <path d="M -80 -50 L 80 -50 M -80 -20 L 40 -20 M -80 10 L 80 10 M -80 40 L 20 40" stroke="#9AA5B1" strokeWidth={8} />
      </g>
    )}
  </g>
);

const Glass: React.FC<{salt: number; t: number; lab: string; col: string}> = ({salt, t, lab, col}) => (
  <g>
    <path d="M -150 -260 L 150 -260 L 125 240 Q 120 270 90 270 L -90 270 Q -120 270 -125 240 Z" fill="#E8F7FF" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -142 -150 L 142 -150 L 125 240 Q 120 270 90 270 L -90 270 Q -120 270 -125 240 Z" fill={col} opacity={0.75} />
    {Array.from({length: salt}).map((_, i) => (
      <rect key={i} x={-100 + (i % 4) * 52} y={190 - Math.floor(i / 4) * 52 + 4 * Math.sin(t * 3 + i)} width={40} height={40} rx={6} fill="#fff" stroke={INK} strokeWidth={5} />
    ))}
    <Label x={0} y={380} size={68}>{lab}</Label>
  </g>
);

export const DeadSea: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.ten - 0.25 ? 'intro' : t < T.heavier - 0.25 ? 'salt' : t < T.get - 0.25 ? 'scale' : t < T.never - 0.25 ? 'push' : 'eyes';
  const cues: Cue[] = [
    {f: 'ocean', at: 0.1, db: -28}, {f: 'pop', at: T.float, db: -20}, {f: 'boing', at: T.why, db: -22},
    {f: 'whoosh', at: T.ten - 0.25, db: -24}, {f: 'plop', at: T.ten + 0.1, db: -20}, {f: 'plop', at: T.ten + 0.4, db: -20}, {f: 'ding', at: T.saltier, db: -20},
    {f: 'whoosh', at: T.heavier - 0.25, db: -24}, {f: 'knock', at: T.heavier + 0.2, db: -18}, {f: 'creak', at: T.heavier + 0.4, db: -22},
    {f: 'whoosh', at: T.get - 0.25, db: -24}, {f: 'splash', at: T.get, db: -20}, {f: 'rise', at: T.shoves, db: -22}, {f: 'boing', at: T.cork, db: -18},
    {f: 'whoosh', at: T.never - 0.25, db: -24}, {f: 'zap', at: T.never, db: -20},
  ];
  const water = (y: number, col: string) => <path d={wavePath(t, y, 14, 220, 1.4)} fill={col} stroke={INK} strokeWidth={LW} />;
  const sink = prog(t, T.get - 0.1, T.get + 0.4);
  const rise = prog(t, T.shoves, T.shoves + 0.7);
  const bob = t > T.cork ? 30 * Math.sin((t - T.cork) * 5) * Math.exp(-(t - T.cork) * 0.8) : 0;
  return (
    <AbsoluteFill style={{background: '#BFE6FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs><linearGradient id="sky18" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC27A" /><stop offset="1" stopColor="#FFF0D0" /></linearGradient></defs>
        <rect width={W} height={H} fill="url(#sky18)" />
        <path d="M 0 900 L 180 760 L 330 860 L 520 720 L 700 840 L 900 740 L 1080 820 L 1080 1000 L 0 1000 Z" fill="#D9A46A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        {scene === 'intro' && (
          <g>
            {water(1060, '#4FB3C8')}
            <g transform={`translate(500 ${1080 + 8 * Math.sin(t * 2)}) scale(1.2)`}><Floater t={t} /></g>
            {[[180, 1300], [700, 1450], [400, 1650], [900, 1250]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${10 * i})`}><SaltCube s={0.3} face={false} /></g>)}
            <Label x={540} y={620} size={80} s={pop(t, T.float, 12, 6)} color="#fff">NO EFFORT FLOATING</Label>
            <Sticker t={t} t0={T.why} x={540} y={1760} text="WHY?" size={96} fill="#E5414A" />
          </g>
        )}
        {scene === 'salt' && (
          <g>
            <g transform={`translate(300 1180) scale(${pop(t, T.ten - 0.2, 12, 6)})`}><Glass salt={1} t={t} lab="OCEAN" col="#3D8CF0" /></g>
            <g transform={`translate(780 1180) scale(${pop(t, T.ten, 12, 6)})`}><Glass salt={Math.min(16, Math.floor(prog(t, T.ten, T.saltier + 0.5, (u) => u) * 16))} t={t} lab="DEAD SEA" col="#4FB3C8" /></g>
            <Sticker t={t} t0={T.saltier} x={540} y={620} text="~10× SALTIER" size={100} fill="#2C7BE5" />
          </g>
        )}
        {scene === 'scale' && (
          <g>
            {(() => {
              const tilt = 14 * prog(t, T.heavier + 0.2, T.heavier + 0.8);
              return (
                <g transform="translate(540 1200)">
                  <path d="M -40 380 L 40 380 L 20 0 L -20 0 Z" fill="#9AA5B1" stroke={INK} strokeWidth={LW} />
                  <g transform={`rotate(${tilt})`}>
                    <rect x={-420} y={-20} width={840} height={36} rx={14} fill="#C9D3DD" stroke={INK} strokeWidth={LW} />
                    <g transform={`translate(-330 0) rotate(${-tilt})`}>
                      <path d="M -120 0 L 120 0 L 90 60 L -90 60 Z" fill="#C9D3DD" stroke={INK} strokeWidth={7} />
                      <g transform="translate(0 0) scale(0.7)"><Guy t={t} expr="worried" handL={[-120, -180]} handR={[120, -180]} look={[10, 0]} stand /></g>
                    </g>
                    <g transform={`translate(330 0) rotate(${-tilt})`}>
                      <path d="M -120 0 L 120 0 L 90 60 L -90 60 Z" fill="#C9D3DD" stroke={INK} strokeWidth={7} />
                      <rect x={-100} y={-220} width={200} height={220} rx={20} fill="#4FB3C8" stroke={INK} strokeWidth={LW} />
                      {[0, 1, 2, 3].map((i) => <rect key={i} x={-70 + (i % 2) * 80} y={-180 + Math.floor(i / 2) * 80} width={44} height={44} rx={6} fill="#fff" stroke={INK} strokeWidth={4} />)}
                    </g>
                  </g>
                </g>
              );
            })()}
            <Label x={540} y={620} size={70} s={pop(t, T.heavier, 12, 6)} color="#fff">SALTY WATER = HEAVIER</Label>
            <Label x={540} y={1760} size={70} s={pop(t, T.heavier + 0.8, 12, 6)} color="#FFE45C">THAN YOUR BODY</Label>
          </g>
        )}
        {scene === 'push' && (
          <g>
            <Layer cam={keys(t, [[T.get - 0.25, 540, 1100, 1.15], [T.cork, 540, 1100, 1]])}>
              {water(1060 - 20 * sink + 10 * rise, '#4FB3C8')}
              <g transform={`translate(520 ${1060 + 160 * sink - 200 * rise + bob})`}><Floater t={t} paper={false} /></g>
              <g opacity={0.55}>{water(1075 - 20 * sink + 10 * rise, '#4FB3C8')}</g>
              {[-1, 0, 1].map((i) => {
                const k = rise > 0 && rise < 1 ? 1 : 0;
                return <g key={i} opacity={k} transform={`translate(${520 + i * 200} ${1420 - 120 * rise})`}><path d="M 0 80 L 0 -60" stroke="#fff" strokeWidth={22} strokeLinecap="round" /><path d="M -40 -30 L 0 -80 L 40 -30" stroke="#fff" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
              })}
              {t > T.cork && <g transform={`translate(880 ${1030 + bob * 1.2}) rotate(${10 * Math.sin(t * 4)})`}><rect x={-34} y={-60} width={68} height={110} rx={18} fill="#C9935A" stroke={INK} strokeWidth={7} /><circle cx={-12} cy={-20} r={6} fill={INK} /><circle cx={12} cy={-20} r={6} fill={INK} /></g>}
            </Layer>
            <Sticker t={t} t0={T.weighs} t1={T.cork - 0.1} x={540} y={620} text="PUSHED-ASIDE WATER WEIGHS MORE" size={48} fill="#2C7BE5" />
            <Label x={540} y={620} size={90} s={pop(t, T.cork, 12, 6)} color="#FFE45C">BOB LIKE A CORK</Label>
          </g>
        )}
        {scene === 'eyes' && (
          <g>
            {water(1060, '#4FB3C8')}
            <g transform="translate(540 1300)">
              <g transform={`translate(0 70) scale(${pop(t, T.never, 12, 6)})`}><circle r={300} fill="#fff" stroke={INK} strokeWidth={LW} /><circle r={260} fill="none" stroke="#E5414A" strokeWidth={44} /></g>
              <g transform={`scale(${pop(t, T.never + 0.15, 12, 6)})`}>
                <ellipse cx={0} cy={70} rx={130} ry={70} fill="#fff" stroke={INK} strokeWidth={LW} />
                <circle cx={0} cy={70} r={46} fill="#5A8F3C" stroke={INK} strokeWidth={6} /><circle cx={0} cy={70} r={20} fill={INK} />
                {[-80, 0, 80].map((x) => <path key={x} d={`M ${x} 0 l ${x * 0.2} -30`} stroke="#E5414A" strokeWidth={8} strokeLinecap="round" />)}
              </g>
              <path d="M -184 -114 L 184 254" stroke="#E5414A" strokeWidth={44} strokeLinecap="round" transform={`scale(${pop(t, T.never + 0.3, 12, 6)})`} />
            </g>
            <Label x={540} y={620} size={74} s={pop(t, T.never, 12, 6)} color="#fff">NEVER IN YOUR EYES!</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="18-dead-sea" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
