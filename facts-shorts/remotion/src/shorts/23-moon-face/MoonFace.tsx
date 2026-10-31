import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, clamp, lerp, prog, pop, keys, easeOut} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

// stroke width that stays readable whatever the drawing scale k
const sw = (n: number, k: number) => (n / k) * clamp(k, 1, 1.6);

// the Moon: drawn at radius 100 then scaled; its face sits on the local +y side (rot turns face and craters)
const Moon: React.FC<{t: number; r: number; rot?: number; mood?: 'smile' | 'wow' | 'smug'; look?: [number, number]; sx?: number; sy?: number}> =
  ({t, r, rot = 0, mood = 'smile', look = [0, 1], sx = 1, sy = 1}) => {
    const k = r / 100;
    const blink = (t % 3.7) > 3.58;
    return (
      <g transform={`scale(${k * sx} ${k * sy})`}>
        <circle r={100} fill="#ECE6D2" stroke={INK} strokeWidth={sw(LW, k)} />
        <g transform={`rotate(${rot})`}>
          {[[-48, -44, 18], [34, -58, 12], [62, -14, 9], [-66, 2, 8], [10, -82, 7]].map(([x, y, cr], i) => (
            <circle key={i} cx={x} cy={y} r={cr} fill="#D4CCB2" stroke={INK} strokeWidth={sw(5, k)} />
          ))}
          <ellipse cx={-52} cy={42} rx={12} ry={7} fill="#F2A7A0" opacity={0.8} />
          <ellipse cx={52} cy={42} rx={12} ry={7} fill="#F2A7A0" opacity={0.8} />
          {[-28, 28].map((x) => (blink
            ? <path key={x} d={`M ${x - 9} 20 L ${x + 9} 20`} stroke={INK} strokeWidth={sw(6, k)} strokeLinecap="round" />
            : (
              <g key={x}>
                <ellipse cx={x + look[0] * 4} cy={18 + look[1] * 4} rx={8} ry={mood === 'wow' ? 13 : 11} fill={INK} />
                <circle cx={x + 3 + look[0] * 4} cy={14 + look[1] * 4} r={2.6} fill="#fff" />
              </g>
            )))}
          {mood === 'smile' && <path d="M -20 44 Q 0 62 20 44" stroke={INK} strokeWidth={sw(6, k)} fill="none" strokeLinecap="round" />}
          {mood === 'smug' && <path d="M -18 48 Q 6 56 24 40" stroke={INK} strokeWidth={sw(6, k)} fill="none" strokeLinecap="round" />}
          {mood === 'wow' && <ellipse cx={0} cy={52} rx={9} ry={12} fill={INK} />}
        </g>
        <path d="M -76 -40 A 86 86 0 0 1 -30 -82" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.8} />
      </g>
    );
  };

// cartoon Earth with a face; look = unit vector the pupils point along
const Earth: React.FC<{t: number; r: number; look?: [number, number]; mood?: 'smile' | 'wow'}> = ({t, r, look = [0, -1], mood = 'smile'}) => {
  const k = r / 100;
  const blink = ((t + 1.3) % 4.1) > 3.98;
  return (
    <g transform={`scale(${k})`}>
      <circle r={114} fill="none" stroke="#9FD8FF" strokeWidth={10} opacity={0.45} />
      <circle r={100} fill="#3D8CF0" stroke={INK} strokeWidth={sw(LW, k)} />
      <path d="M -40 -92 Q 0 -104 40 -92 Q 0 -82 -40 -92 Z" fill="#fff" />
      <path d="M -80 -36 q 22 -32 54 -22 q 18 22 -4 40 q -32 18 -50 -18 Z" fill="#6FB35A" stroke={INK} strokeWidth={sw(5, k)} strokeLinejoin="round" />
      <path d="M 34 32 q 30 -12 46 14 q -6 30 -36 26 q -20 -14 -10 -40 Z" fill="#6FB35A" stroke={INK} strokeWidth={sw(5, k)} strokeLinejoin="round" />
      <path d="M -54 54 q 16 -6 28 10 q -10 16 -28 -10 Z" fill="#C9A86A" stroke={INK} strokeWidth={sw(5, k)} strokeLinejoin="round" />
      {[-30, 30].map((x) => (
        <g key={x}>
          <circle cx={x} cy={-4} r={17} fill="#fff" stroke={INK} strokeWidth={sw(6, k)} />
          {blink
            ? <path d={`M ${x - 14} -4 L ${x + 14} -4`} stroke={INK} strokeWidth={sw(6, k)} strokeLinecap="round" />
            : <circle cx={x + look[0] * 7} cy={-4 + look[1] * 7} r={8} fill={INK} />}
        </g>
      ))}
      {mood === 'smile'
        ? <path d="M -22 28 Q 0 46 22 28" stroke={INK} strokeWidth={sw(6, k)} fill="none" strokeLinecap="round" />
        : <ellipse cx={0} cy={36} rx={9} ry={11} fill={INK} />}
    </g>
  );
};

const Arrow: React.FC<{x1: number; y1: number; x2: number; y2: number; col?: string; w?: number}> = ({x1, y1, x2, y2, col = '#FFE45C', w = 12}) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = w * 2.6;
  const p = (da: number) => `${x2 - Math.cos(a + da) * h} ${y2 - Math.sin(a + da) * h}`;
  const head = `M ${p(0.55)} L ${x2} ${y2} L ${p(-0.55)}`;
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M ${x1} ${y1} L ${x2} ${y2} ${head}`} stroke={INK} strokeWidth={w + 12} />
      <path d={`M ${x1} ${y1} L ${x2} ${y2} ${head}`} stroke={col} strokeWidth={w} />
    </g>
  );
};

export const MoonFace: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.spin - 0.25 ? 'one' : t < T.gravity - 0.25 ? 'orbit' : t < T.slowing - 0.25 ? 'egg' : t < T.tidal - 0.25 ? 'slow' : t < T.face - 0.25 ? 'tidal' : 'face';
  const midOne = lerp(T.one, T.spin, 0.45);
  const tug = lerp(T.egg, T.slowing, 0.3);
  const match = lerp(T.slowing, T.tidal, 0.7);
  const peekAt = lerp(T.face, T.hidden, 0.6);
  const cues: Cue[] = [
    {f: 'pop', at: 0.2, db: -22}, {f: 'boing', at: T.one, db: -22},
    {f: 'whoosh', at: T.spin - 0.25, db: -24}, {f: 'whoosh', at: T.spin + 0.1, db: -26}, {f: 'ding', at: T.trip, db: -20},
    {f: 'whoosh', at: T.gravity - 0.25, db: -24}, {f: 'rise', at: T.gravity + 0.3, db: -24}, {f: 'squeeze', at: T.egg - 0.2, db: -22},
    {f: 'whoosh', at: T.slowing - 0.25, db: -24}, {f: 'tick', at: match, db: -20},
    {f: 'whoosh', at: T.tidal - 0.25, db: -24}, {f: 'clink', at: T.tidal + 0.25, db: -18},
    {f: 'whoosh', at: T.face - 0.25, db: -24}, {f: 'plop', at: T.hidden - 0.1, db: -20},
  ];
  const stars = Array.from({length: 70}).map((_, i) => (
    <circle key={i} cx={(i * 197 + 31) % W} cy={(i * 331 + 77) % H} r={2 + (i % 3)} fill="#fff" opacity={0.35 + 0.45 * Math.abs(Math.sin(t * 0.9 + i * 1.7))} />
  ));
  return (
    <AbsoluteFill style={{background: '#141A3A'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#141A3A" />
        {stars}
        {scene === 'one' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 980, 1.0], [T.spin - 0.25, 540, 1000, 1.08]])}>
              <path d="M 540 1640 L 330 1080 L 750 1080 Z" fill="#FFE45C" opacity={0.35 * prog(t, midOne, midOne + 0.5)} />
              <g transform={`translate(540 ${1060 + 12 * Math.sin(t * 1.6)}) scale(${pop(t, 0.15, 10, 6)}) rotate(${6 * Math.sin(clamp((t - T.one) / 0.8) * Math.PI * 2)})`}>
                <Moon t={t} r={210} mood={t > T.one && t < midOne ? 'wow' : 'smile'} />
              </g>
              <g transform={`translate(540 ${lerp(2450, 2050, prog(t, 0.3, 1.3))})`}>
                <Earth t={t} r={420} look={[0, -1]} mood={t > T.one && t < midOne ? 'wow' : 'smile'} />
              </g>
            </Layer>
            <Label x={540} y={630} size={72} s={pop(t, T.one, 12, 6)} color="#FFE45C">ONLY ONE SIDE?</Label>
          </g>
        )}
        {scene === 'orbit' && (() => {
          const E = [540, 1180], R = 360;
          const u = prog(t, T.spin - 0.1, T.gravity - 0.4);
          const th = -90 + 360 * u, a = (th * Math.PI) / 180;
          const mx = E[0] + R * Math.cos(a), my = E[1] + R * Math.sin(a);
          const phi = th + 90;
          const sight = prog(t, T.trip - 0.1, T.trip + 0.3);
          const a1 = (-150 * Math.PI) / 180, a2 = (-30 * Math.PI) / 180, ar = 128;
          const tip = [ar * Math.cos(a2), ar * Math.sin(a2)];
          return (
            <g>
              <circle cx={E[0]} cy={E[1]} r={R} fill="none" stroke="#5A6496" strokeWidth={6} strokeDasharray="16 18" />
              <circle cx={E[0]} cy={E[1]} r={R} fill="none" stroke="#FFE45C" strokeWidth={8} pathLength={1} strokeDasharray={`${u} 1`} transform={`rotate(-90 ${E[0]} ${E[1]})`} opacity={0.8} />
              <g transform={`translate(${E[0]} ${E[1] + 6 * Math.sin(t * 1.5)})`}><Earth t={t} r={130} look={[Math.cos(a), Math.sin(a)]} /></g>
              {sight > 0 && (
                <path d={`M ${mx - Math.cos(a) * 92} ${my - Math.sin(a) * 92} L ${lerp(mx - Math.cos(a) * 92, E[0] + Math.cos(a) * 140, sight)} ${lerp(my - Math.sin(a) * 92, E[1] + Math.sin(a) * 140, sight)}`} stroke="#FFE45C" strokeWidth={8} strokeDasharray="4 16" strokeLinecap="round" />
              )}
              <g transform={`translate(${mx} ${my}) rotate(${phi})`}>
                <g opacity={prog(t, T.spin, T.spin + 0.3)}>
                  <path d={`M ${ar * Math.cos(a1)} ${ar * Math.sin(a1)} A ${ar} ${ar} 0 0 1 ${tip[0]} ${tip[1]}`} stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
                  <path d={`M ${ar * Math.cos(a1)} ${ar * Math.sin(a1)} A ${ar} ${ar} 0 0 1 ${tip[0]} ${tip[1]}`} stroke="#7FD3FF" strokeWidth={10} fill="none" strokeLinecap="round" />
                  <path d={`M ${tip[0] - 22} ${tip[1] - 20} L ${tip[0] + 12} ${tip[1] + 22} L ${tip[0] - 30} ${tip[1] + 18} Z`} fill="#7FD3FF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
                </g>
                <g transform={`scale(${pop(t, T.spin - 0.25, 10, 6)})`}><Moon t={t} r={90} /></g>
              </g>
              <Label x={540} y={620} size={80} s={pop(t, T.spin, 12, 6)} color="#FFE45C">IT DOES SPIN</Label>
              <Sticker t={t} t0={T.trip} x={540} y={1730} text="1 SPIN = 1 TRIP" size={70} fill="#2C7BE5" />
            </g>
          );
        })()}
        {scene === 'egg' && (() => {
          const st = prog(t, T.gravity + 0.3, T.egg);
          const sx = 1 + 0.24 * st, sy = 1 - 0.08 * st;
          const on = clamp((t - tug) / 0.3);
          const xo = -14 * Math.sin((t - tug) * 7) * on;
          const mx = 760 + xo;
          const bx = mx - 160 * sx;
          return (
            <g>
              <Layer cam={keys(t, [[T.gravity - 0.25, 470, 1000, 1.08], [T.gravity + 0.4, 540, 990, 1.0], [T.slowing, 560, 990, 1.03]])}>
                <g transform={`translate(60 ${1150 + 6 * Math.sin(t * 1.4)})`}><Earth t={t} r={330} look={[1, 0]} /></g>
                {[1040, 1150, 1260].map((y, i) => {
                  const o = ((t * 1.4 + i * 0.3) % 1) * 40;
                  const vis = prog(t, T.gravity - 0.1 + i * 0.12, T.gravity + 0.25 + i * 0.12) * (i === 1 ? 1 - on : 1);
                  return vis > 0.01 ? <g key={y} opacity={vis}><Arrow x1={570 - o} y1={y} x2={440 - o} y2={y} /></g> : null;
                })}
                {on > 0 && (
                  <g>
                    <path d={`M 380 1150 Q ${(380 + bx) / 2} ${1110 + 20 * Math.sin(t * 7)} ${lerp(380, bx - 14, on)} 1150`} stroke={INK} strokeWidth={32} fill="none" strokeLinecap="round" />
                    <path d={`M 380 1150 Q ${(380 + bx) / 2} ${1110 + 20 * Math.sin(t * 7)} ${lerp(380, bx - 14, on)} 1150`} stroke="#3D8CF0" strokeWidth={16} fill="none" strokeLinecap="round" />
                    <circle cx={lerp(380, bx - 14, on)} cy={1150} r={26} fill="#fff" stroke={INK} strokeWidth={8} />
                  </g>
                )}
                <g transform={`translate(${mx} 1150)`}>
                  <Moon t={t} r={160} sx={sx} sy={sy} rot={90 + 40 * Math.sin(t * 1.6)} mood={t > T.egg ? 'wow' : 'smile'} look={[0, 1]} />
                </g>
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.gravity, 12, 6)} color="#7FD3FF">EARTH'S GRAVITY</Label>
              <Sticker t={t} t0={T.egg} x={540} y={1600} text="SLIGHT EGG SHAPE" size={66} fill="#E5414A" />
            </g>
          );
        })()}
        {scene === 'slow' && (() => {
          const s0 = T.slowing - 0.25;
          const ang = 1080 * easeOut(clamp((t - s0) / (match - s0))) + 25 * (t - s0);
          const fast = 1 - prog(t, T.slowing, match);
          const na = lerp(338, 220, prog(t, T.slowing - 0.1, match)) + 3 * Math.sin(t * 40) * fast;
          const nr = (na * Math.PI) / 180;
          const arc = (r: number, d0: number, d1: number) => {
            const p0 = [r * Math.cos((d0 * Math.PI) / 180), r * Math.sin((d0 * Math.PI) / 180)];
            const p1 = [r * Math.cos((d1 * Math.PI) / 180), r * Math.sin((d1 * Math.PI) / 180)];
            return `M ${p0[0]} ${p0[1]} A ${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`;
          };
          return (
            <g>
              <g transform={`translate(540 ${960 + 8 * Math.sin(t * 1.7)}) scale(${pop(t, s0, 10, 6)})`}>
                <g transform={`rotate(${ang})`} opacity={fast}>
                  {[0, 120, 240].map((d) => <path key={d} d={arc(195, d, d + 70)} stroke="#7FD3FF" strokeWidth={12} fill="none" strokeLinecap="round" />)}
                </g>
                <Moon t={t} r={150} rot={ang} mood={fast > 0.4 ? 'wow' : 'smile'} />
              </g>
              <g transform={`translate(540 1580) scale(${pop(t, s0 + 0.15, 10, 6)})`}>
                <path d="M -230 0 A 230 230 0 0 1 230 0 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <path d={arc(190, 186, 236)} stroke="#6FBF5A" strokeWidth={26} fill="none" />
                <path d={arc(190, 304, 354)} stroke="#E5414A" strokeWidth={26} fill="none" />
                {Array.from({length: 9}).map((_, i) => { const d = ((190 + i * 20) * Math.PI) / 180; return <path key={i} d={`M ${200 * Math.cos(d)} ${200 * Math.sin(d)} L ${170 * Math.cos(d)} ${170 * Math.sin(d)}`} stroke={INK} strokeWidth={6} />; })}
                <path d={`M ${232 * Math.cos((220 * Math.PI) / 180)} ${232 * Math.sin((220 * Math.PI) / 180)} L ${150 * Math.cos((220 * Math.PI) / 180)} ${150 * Math.sin((220 * Math.PI) / 180)}`} stroke="#FFD84D" strokeWidth={14} strokeLinecap="round" />
                <path d={`M 0 0 L ${165 * Math.cos(nr)} ${165 * Math.sin(nr)}`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
                <path d={`M 0 0 L ${165 * Math.cos(nr)} ${165 * Math.sin(nr)}`} stroke="#E5414A" strokeWidth={10} strokeLinecap="round" />
                <circle r={26} fill="#5B3A8C" stroke={INK} strokeWidth={7} />
                <rect x={-250} y={0} width={500} height={34} rx={12} fill="#8C969F" stroke={INK} strokeWidth={LW} />
              </g>
              <Label x={540} y={640} size={64} s={pop(t, T.slowing, 12, 6)} color="#FFE45C">SPIN SLOWING DOWN</Label>
              <Sticker t={t} t0={match} x={540} y={1740} text="MATCHED!" size={74} fill="#3E9A4A" />
            </g>
          );
        })()}
        {scene === 'tidal' && (() => {
          const Ex = 290, Ey = 1360, Mx = 800, My = 1090;
          const dx = Mx - Ex, dy = My - Ey, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
          const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
          const s0 = T.tidal - 0.25;
          const shut = prog(t, T.tidal + 0.15, T.tidal + 0.3);
          const lx = (Ex + Mx) / 2, ly = (Ey + My) / 2;
          return (
            <g transform={`rotate(${2 * Math.sin(t * 1.2)} 540 1220)`}>
              <g transform={`translate(${Ex} ${Ey + 6 * Math.sin(t * 1.5)}) scale(${pop(t, s0, 10, 6)})`}><Earth t={t} r={170} look={[ux, uy]} /></g>
              {Array.from({length: 8}).map((_, i) => {
                const f = (i + 0.5) / 8, d = 190 + f * (L - 190 - 125);
                return (
                  <g key={i} transform={`translate(${Ex + ux * d} ${Ey + uy * d}) rotate(${ang}) scale(${pop(t, s0 + 0.05 * i, 12, 6)})`}>
                    <ellipse rx={30} ry={16} fill="none" stroke={INK} strokeWidth={16} />
                    <ellipse rx={30} ry={16} fill="none" stroke="#C9D1D9" strokeWidth={7} />
                  </g>
                );
              })}
              <g transform={`translate(${Mx} ${My + 6 * Math.sin(t * 1.5 + 1)}) scale(${pop(t, s0 + 0.1, 10, 6)})`}><Moon t={t} r={110} rot={62} mood={shut > 0.5 ? 'smug' : 'smile'} /></g>
              <g transform={`translate(${lx} ${ly}) scale(${pop(t, T.tidal - 0.1, 10, 6) * 1.1})`}>
                <path d={`M -36 ${-10 - 36 * (1 - shut)} L -36 ${-46 - 36 * (1 - shut)} A 36 36 0 0 1 36 ${-46 - 36 * (1 - shut)} L 36 ${-10 - 36 * (1 - shut)}`} stroke={INK} strokeWidth={30} fill="none" strokeLinecap="round" />
                <path d={`M -36 ${-10 - 36 * (1 - shut)} L -36 ${-46 - 36 * (1 - shut)} A 36 36 0 0 1 36 ${-46 - 36 * (1 - shut)} L 36 ${-10 - 36 * (1 - shut)}`} stroke="#C9D1D9" strokeWidth={14} fill="none" strokeLinecap="round" />
                <rect x={-62} y={-20} width={124} height={100} rx={18} fill="#FFD84D" stroke={INK} strokeWidth={LW} />
                <circle cx={0} cy={18} r={12} fill={INK} /><path d="M 0 22 L 0 50" stroke={INK} strokeWidth={10} strokeLinecap="round" />
              </g>
              {shut > 0.9 && t < T.tidal + 0.8 && Array.from({length: 6}).map((_, i) => {
                const u = clamp((t - T.tidal - 0.3) / 0.45), d = ((i * 60 - 90) * Math.PI) / 180;
                return <path key={i} d={`M ${lx + Math.cos(d) * (90 + 50 * u)} ${ly + 30 + Math.sin(d) * (90 + 50 * u)} L ${lx + Math.cos(d) * (120 + 60 * u)} ${ly + 30 + Math.sin(d) * (120 + 60 * u)}`} stroke="#FFE45C" strokeWidth={10} strokeLinecap="round" opacity={1 - u} />;
              })}
              <Sticker t={t} t0={T.tidal} x={540} y={650} text="TIDAL LOCKING" size={80} fill="#5B3A8C" />
            </g>
          );
        })()}
        {scene === 'face' && (() => {
          const E = [540, 2060], Rm = 1000;
          const th = lerp(-106, -74, prog(t, T.face - 0.25, T.card + 1, (x) => x));
          const a = (th * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
          const mx = E[0] + Rm * c, my = E[1] + Rm * s;
          const sight = prog(t, T.face + 0.4, T.face + 0.8);
          const peek = prog(t, peekAt, peekAt + 0.45) * (1 - prog(t, T.hidden - 0.15, T.hidden + 0.2));
          return (
            <g>
              <g transform={`translate(${E[0]} ${E[1]})`}><Earth t={t} r={440} look={[c, s]} /></g>
              {sight > 0 && <path d={`M ${E[0] + 450 * c} ${E[1] + 450 * s} L ${lerp(E[0] + 450 * c, mx - 178 * c, sight)} ${lerp(E[1] + 450 * s, my - 178 * s, sight)}`} stroke="#FFE45C" strokeWidth={9} strokeDasharray="4 18" strokeLinecap="round" />}
              <g transform={`translate(${mx} ${my}) rotate(${th + 90})`}>
                {peek > 0.01 && (
                  <g transform={`translate(${6 * Math.sin(t * 7)} ${-60 - 160 * peek}) rotate(${-(th + 90)})`}>
                    <circle r={60} fill="#5B3A8C" stroke={INK} strokeWidth={LW} />
                    <Label x={0} y={30} size={84} color="#fff">?</Label>
                  </g>
                )}
                <g transform={`scale(${pop(t, T.face - 0.25, 10, 6)})`}><Moon t={t} r={170} mood={t > T.hidden - 0.15 ? 'smug' : 'smile'} /></g>
              </g>
              <Label x={540} y={640} size={64} s={pop(t, T.face, 12, 6)} color="#FFE45C">SAME FACE, ALWAYS</Label>
              <Sticker t={t} t0={T.hidden - 0.2} x={540} y={1490} text="FAR SIDE: HIDDEN" size={64} fill="#E5414A" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="23-moon-face" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
