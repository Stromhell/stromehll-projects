import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const RAINBOW = ['#E5414A', '#FF8A3D', '#FFD84D', '#4CC38A', '#3D8CF0', '#6B4FD8'];

// a travelling sine wave from (x0,y0) heading at angle a (deg)
const Wave: React.FC<{x0: number; y0: number; a: number; len: number; lambda: number; col: string; t: number; amp?: number; grow?: number}> = ({x0, y0, a, len, lambda, col, t, amp = 22, grow = 1}) => {
  const L = len * grow; let d = '';
  for (let s = 0; s <= L; s += 6) d += `${s === 0 ? 'M' : 'L'} ${s} ${amp * Math.sin((s / lambda) * 2 * Math.PI - t * 10)} `;
  return <g transform={`translate(${x0} ${y0}) rotate(${a})`}><path d={d} stroke={INK} strokeWidth={16} fill="none" strokeLinecap="round" /><path d={d} stroke={col} strokeWidth={9} fill="none" strokeLinecap="round" /></g>;
};

const Molecule: React.FC<{t: number; s?: number; wob?: number}> = ({t, s = 1, wob = 0}) => (
  <g transform={`scale(${s}) rotate(${wob * 20 * Math.sin(t * 14)})`}>
    <circle cx={-34} r={40} fill="#BFE6FF" stroke={INK} strokeWidth={LW} /><circle cx={34} r={40} fill="#BFE6FF" stroke={INK} strokeWidth={LW} />
    <circle cx={-46} cy={-6} r={6} fill={INK} /><circle cx={22} cy={-6} r={6} fill={INK} />
    <path d="M -50 14 q 8 6 16 0 M 18 14 q 8 6 16 0" stroke={INK} strokeWidth={4} fill="none" />
  </g>
);

const SunDisc: React.FC<{t: number; col?: string; s?: number}> = ({t, col = '#FFF3B0', s = 1}) => (
  <g transform={`scale(${s})`}>
    <circle r={150 + 10 * Math.sin(t * 2)} fill={col} opacity={0.35} />
    <circle r={110} fill={col} stroke={INK} strokeWidth={LW} />
    <circle cx={-34} cy={-10} r={9} fill={INK} /><circle cx={34} cy={-10} r={9} fill={INK} />
    <path d="M -30 30 q 30 24 60 0" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>
);

export const BlueSky: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.white - 0.2 ? 'intro' : t < T.tiny - 0.25 ? 'prism' : t < T.reaches - 0.25 ? 'scatter' : t < T.sunset - 0.25 ? 'eye' : 'sunset';
  const cues: Cue[] = [
    {f: 'pop', at: 0.2, db: -18}, {f: 'boing', at: T.why, db: -22}, {f: 'whoosh', at: T.white - 0.2, db: -24}, {f: 'zap', at: T.every, db: -22},
    {f: 'whoosh', at: T.tiny - 0.25, db: -24}, {f: 'pop', at: T.tiny, db: -20}, {f: 'boing', at: T.short, db: -20}, {f: 'boing', at: T.short + 0.3, db: -22},
    {f: 'whoosh', at: T.long, db: -26}, {f: 'whoosh', at: T.reaches - 0.25, db: -24}, {f: 'ding', at: T.reaches + 0.3, db: -20},
    {f: 'whoosh', at: T.sunset - 0.25, db: -24}, {f: 'rise', at: T.crosses, db: -24}, {f: 'ding', at: T.reds, db: -18},
  ];
  const skyBlue = scene === 'sunset' ? 1 - prog(t, T.crosses, T.reds + 0.4) : 1;
  return (
    <AbsoluteFill style={{background: '#7FCBFF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="sky13" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2F7FE0" /><stop offset="1" stopColor="#BFE6FF" /></linearGradient>
          <linearGradient id="dusk13" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5B3A8C" /><stop offset="0.55" stopColor="#F2704A" /><stop offset="1" stopColor="#FFD27A" /></linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#dusk13)" />
        <rect width={W} height={H} fill="url(#sky13)" opacity={skyBlue} />
        {scene === 'intro' && (
          <g>
            <g transform={`translate(230 820) scale(${pop(t, 0.2, 10, 6)})`}><SunDisc t={t} /></g>
            <Wave x0={330} y0={900} a={35} len={520} lambda={90} col="#fff" t={t} grow={prog(t, 0.4, 1.2)} />
            <path d="M 0 1600 Q 300 1540 540 1600 T 1080 1590 L 1080 1920 L 0 1920 Z" fill="#7CC46A" stroke={INK} strokeWidth={LW} />
            <g transform="translate(760 1640)"><Guy t={t} expr="hope" handL={[-110, -260]} handR={[110, -200]} look={[-6, -8]} stand /></g>
            <Label x={540} y={620} size={100} s={pop(t, T.why, 12, 6)} color="#fff">WHY BLUE?</Label>
          </g>
        )}
        {scene === 'prism' && (
          <g>
            <Wave x0={-20} y0={1000} a={0} len={460} lambda={80} col="#fff" t={t} />
            <g transform={`translate(540 1000) scale(${pop(t, T.white - 0.15, 12, 6)})`}>
              <path d="M 0 -170 L 150 110 L -150 110 Z" fill="#E8F7FF" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
              <path d="M -10 -110 L -90 60" stroke="#fff" strokeWidth={14} strokeLinecap="round" />
            </g>
            {RAINBOW.map((c, i) => <Wave key={c} x0={600} y0={1000} a={-14 + i * 6} len={520} lambda={130 - i * 14} amp={18} col={c} t={t} grow={prog(t, T.every - 0.1, T.every + 0.6)} />)}
            <Label x={540} y={620} size={74} s={pop(t, T.white, 12, 6)} color="#fff">WHITE = ALL COLOURS</Label>
          </g>
        )}
        {scene === 'scatter' && (
          <g>
            <Layer cam={keys(t, [[T.tiny - 0.25, 540, 1000, 1.25], [T.long + 0.6, 540, 1000, 1]])}>
              {[[540, 1000], [380, 820], [720, 1200], [330, 1240], [760, 780]].map(([x, y], i) => (
                <g key={i} transform={`translate(${x} ${y}) scale(${pop(t, T.tiny + i * 0.1, 12, 6)})`}><Molecule t={t} s={0.8} wob={prog(t, T.short, T.short + 0.2) * (1 - prog(t, T.short + 1.4, T.short + 1.8))} /></g>
              ))}
              {/* blue bounces every which way */}
              {[0, 60, 130, 200, 260, 320].map((a, i) => <Wave key={a} x0={540} y0={1000} a={a} len={420} lambda={60} amp={16} col="#3D8CF0" t={t + i} grow={prog(t, T.short + i * 0.06, T.short + 0.6 + i * 0.06)} />)}
              {/* red goes straight through */}
              <Wave x0={-40} y0={1420} a={0} len={1200} lambda={150} amp={22} col="#E5414A" t={t} grow={prog(t, T.long, T.long + 0.9)} />
            </Layer>
            <Sticker t={t} t0={T.short} x={540} y={620} text="BLUE BOUNCES" size={84} fill="#2C7BE5" />
            <Sticker t={t} t0={T.long} x={540} y={1620} text="RED SLIPS PAST" size={80} fill="#E5414A" rot={4} />
          </g>
        )}
        {scene === 'eye' && (
          <g>
            <path d="M 0 1600 Q 300 1540 540 1600 T 1080 1590 L 1080 1920 L 0 1920 Z" fill="#7CC46A" stroke={INK} strokeWidth={LW} />
            {Array.from({length: 9}).map((_, i) => {
              const a = 200 + i * 17.5; const r = 900; const k = prog(t, T.reaches - 0.1 + i * 0.05, T.reaches + 0.5 + i * 0.05);
              const sx = 540 + Math.cos((a * Math.PI) / 180) * r, sy = 1440 + Math.sin((a * Math.PI) / 180) * r;
              const ex = lerp(sx, 540, k * 0.8), ey = lerp(sy, 1300, k * 0.8);
              return <path key={i} d={`M ${sx} ${sy} L ${ex} ${ey}`} stroke="#fff" strokeWidth={12} strokeLinecap="round" strokeDasharray="30 18" opacity={0.9} />;
            })}
            <g transform="translate(540 1640)"><Guy t={t} expr="happy" handL={[-150, -300]} handR={[150, -300]} look={[0, -10]} stand /></g>
            <Label x={540} y={620} size={66} s={pop(t, T.reaches, 12, 6)} color="#fff">BLUE FROM EVERYWHERE</Label>
          </g>
        )}
        {scene === 'sunset' && (
          <g>
            <circle cx={540} cy={2700} r={1300} fill="#5FA55A" stroke={INK} strokeWidth={LW} />
            <circle cx={540} cy={2700} r={1300 + 260} fill="none" stroke="#ffffff55" strokeWidth={260} />
            <g transform={`translate(${lerp(900, 980, prog(t, T.sunset, T.reds))} ${lerp(1150, 1330, prog(t, T.sunset, T.reds))})`}><SunDisc t={t} s={0.7} col={skyBlue > 0.5 ? '#FFF3B0' : '#FF9A4D'} /></g>
            <path d={`M 900 1250 L ${lerp(900, 330, prog(t, T.crosses, T.crosses + 1))} ${lerp(1250, 1420, prog(t, T.crosses, T.crosses + 1))}`} stroke="#FF8A3D" strokeWidth={16} strokeLinecap="round" strokeDasharray="34 18" />
            <g transform="translate(300 1440) scale(0.6)"><Guy t={t} expr="happy" handL={[-110, -200]} handR={[120, -230]} look={[10, -6]} stand /></g>
            <Sticker t={t} t0={T.crosses} x={540} y={620} text="MORE AIR TO CROSS" size={78} fill="#5B3A8C" />
            <Label x={540} y={800} size={92} s={pop(t, T.reds, 12, 6)} color="#FFD84D">REDS ARE LEFT</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="13-blue-sky" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
