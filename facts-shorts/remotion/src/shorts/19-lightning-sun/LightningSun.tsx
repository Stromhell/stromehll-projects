import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, Sun, clamp, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const Bolt: React.FC<{t: number; s?: number; face?: boolean}> = ({t, s = 1, face = true}) => (
  <g transform={`scale(${s}) rotate(${4 * Math.sin(t * 9)})`}>
    <path d="M 40 -300 L -110 20 L 0 20 L -60 300 L 130 -60 L 20 -60 L 90 -300 Z" fill="#FFE45C" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M 50 -270 L -70 0" stroke="#FFF7C2" strokeWidth={14} strokeLinecap="round" />
    {face && <g transform="translate(10 -40)"><path d="M -44 -14 L -16 -4 M 40 -14 L 12 -4" stroke={INK} strokeWidth={7} strokeLinecap="round" /><circle cx={-28} cy={6} r={8} fill={INK} /><circle cx={26} cy={6} r={8} fill={INK} /><path d="M -24 34 Q 0 52 24 34 Z" fill={INK} /></g>}
  </g>
);

const Thermo: React.FC<{level: number; col: string; lab: string; val: string; t: number; k: number}> = ({level, col, lab, val, k}) => (
  <g transform={`scale(${k})`}>
    <rect x={-60} y={-760} width={120} height={800} rx={60} fill="#fff" stroke={INK} strokeWidth={LW} />
    <circle cx={0} cy={60} r={100} fill={col} stroke={INK} strokeWidth={LW} />
    <rect x={-34} y={40 - 760 * level} width={68} height={760 * level + 20} rx={30} fill={col} />
    {Array.from({length: 8}).map((_, i) => <path key={i} d={`M 60 ${-80 - i * 85} L 90 ${-80 - i * 85}`} stroke={INK} strokeWidth={6} />)}
    <Label x={0} y={250} size={60}>{lab}</Label>
    <Label x={0} y={-800} size={58} color="#FFE45C">{val}</Label>
  </g>
);

export const LightningSun: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.five - 0.3 ? 'vs' : t < T.blasts - 0.25 ? 'thermo' : t < T.thunder - 0.1 ? 'blast' : t < T.every - 0.25 ? 'boom' : 'jump';
  const flash = (t0: number) => clamp(1 - Math.abs(t - t0) * 8);
  const cues: Cue[] = [
    {f: 'zap', at: 0.15, db: -16}, {f: 'rumble', at: 0.3, db: -24}, {f: 'sizzle', at: T.hotter, db: -22},
    {f: 'whoosh', at: T.five - 0.3, db: -24}, {f: 'rise', at: T.five, db: -24}, {f: 'rise', at: T.thirty, db: -18}, {f: 'ding', at: T.thirty + 0.9, db: -18},
    {f: 'tick', at: T.fraction, db: -20}, {f: 'whoosh', at: T.blasts - 0.25, db: -22}, {f: 'whoosh', at: T.shock, db: -18},
    {f: 'rumble', at: T.thunder - 0.1, db: -14}, {f: 'crack', at: T.thunder, db: -16},
    {f: 'whoosh', at: T.every - 0.25, db: -24}, {f: 'boing', at: T.jumping, db: -20}, {f: 'boing', at: T.jumping + 0.25, db: -22},
  ];
  const [shx, shy] = shake(t, 22 * clamp(1 - Math.abs(t - T.thunder - 0.3) * 1.6));
  return (
    <AbsoluteFill style={{background: '#1A1F3D'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs><linearGradient id="storm19" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141836" /><stop offset="1" stopColor="#3B4470" /></linearGradient></defs>
        <rect width={W} height={H} fill="url(#storm19)" />
        <rect width={W} height={H} fill="#fff" opacity={0.6 * Math.max(flash(0.15), flash(T.thunder - 0.05))} />
        <g transform={`translate(${shx} ${shy})`}>
          {scene === 'vs' && (
            <g>
              <g transform={`translate(300 1050) scale(${pop(t, 0.15, 10, 6)})`}><Bolt t={t} s={1.1} /></g>
              <g transform={`translate(800 1080) scale(${pop(t, T.sun - 0.1, 10, 6) * 0.9})`}><Sun t={t} mood="smug" /></g>
              <Label x={540} y={1100} size={110} s={pop(t, T.hotter, 12, 6)} color="#FF8A3D">&gt;</Label>
              <Label x={540} y={620} size={68} s={pop(t, T.hotter, 12, 6)} color="#FFE45C">HOTTER THAN THE SUN</Label>
              <Sticker t={t} t0={T.sun} x={800} y={1420} text="SURFACE" size={70} fill="#FF8A3D" rot={4} />
            </g>
          )}
          {scene === 'thermo' && (
            <g>
              <g transform="translate(300 1560)"><Thermo t={t} k={pop(t, T.five - 0.3, 12, 6) * 0.85} level={0.18 * prog(t, T.five, T.five + 0.8)} col="#FF8A3D" lab="SUN" val="5,500°C" /></g>
              <g transform="translate(780 1560)"><Thermo t={t} k={pop(t, T.five + 1.4, 12, 6) * 0.85} level={prog(t, T.thirty, T.thirty + 0.9)} col="#FFE45C" lab="BOLT" val="30,000°C" /></g>
              <g transform={`translate(780 ${1560 - 760 * prog(t, T.thirty, T.thirty + 0.9) * 0.85 - 40})`} opacity={prog(t, T.thirty + 0.6, T.thirty + 0.9)}>{[0, 1, 2].map((i) => <path key={i} d={`M ${-60 + i * 60} -60 q -16 -30 0 -60`} stroke="#FF6A3D" strokeWidth={12} fill="none" strokeLinecap="round" />)}</g>
              {t < T.thirty && <Sticker t={t} t0={T.five + 2.2} x={540} y={570} text="WHY?" size={90} fill="#2C7BE5" />}
              <Sticker t={t} t0={T.fraction} x={540} y={570} text="IN A SPLIT SECOND" size={70} fill="#E5414A" />
            </g>
          )}
          {scene === 'blast' && (
            <g>
              <g transform="translate(540 980)"><Bolt t={t} s={0.9} face={false} /></g>
              {[0, 1, 2].map((r) => {
                const k = prog(t, T.blasts + r * 0.25, T.blasts + 1.2 + r * 0.25, (u) => u);
                return <circle key={r} cx={540} cy={980} r={120 + 650 * k} fill="none" stroke="#BFE6FF" strokeWidth={22 * (1 - k)} opacity={1 - k} />;
              })}
              {Array.from({length: 14}).map((_, i) => {
                const a = (i / 14) * Math.PI * 2; const k = prog(t, T.blasts, T.shock + 0.6);
                const r = 230 + 200 * k;
                return <g key={i} transform={`translate(${540 + Math.cos(a) * r} ${980 + Math.sin(a) * r * 1.1})`}><circle r={30} fill="#BFE6FF" stroke={INK} strokeWidth={6} /><circle cx={-8} cy={-4} r={5} fill={INK} /><circle cx={8} cy={-4} r={5} fill={INK} /><ellipse cx={0} cy={12} rx={6} ry={8} fill={INK} /></g>;
              })}
              <Sticker t={t} t0={T.shock} x={540} y={1700} text="SHOCK WAVE" size={92} fill="#2C7BE5" />
            </g>
          )}
          {scene === 'boom' && (
            <g>
              <g transform="translate(540 1640)"><Guy t={t} expr="worried" handL={[-95, -330]} handR={[95, -330]} bendL={0.3} bendR={0.3} look={[0, -6]} stand sx={1.2} sy={1.2 * (1 - 0.06 * pop(t, T.thunder, 14, 5))} /></g>
              <path d="M 0 1640 L 1080 1640 L 1080 1920 L 0 1920 Z" fill="#3E5A3A" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(540 760) rotate(-6) scale(${pop(t, T.thunder, 12, 5) * 1.05})`}>
                <path d="M -420 -20 L -300 -170 L -240 -60 L -100 -220 L -40 -90 L 100 -230 L 160 -80 L 320 -190 L 300 -40 L 430 -20 L 320 60 L 400 200 L 220 120 L 160 240 L 40 120 L -80 230 L -140 110 L -320 200 L -280 60 Z" fill="#FFE45C" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <Label x={0} y={50} size={170} color="#E5414A">BOOM!</Label>
              </g>
              <Sticker t={t} t0={T.thunder + 0.4} x={540} y={1790} text="= THUNDER" size={84} fill="#2C7BE5" />
            </g>
          )}
          {scene === 'jump' && (
            <g>
              <g transform="translate(540 1020)"><Bolt t={t} s={0.75} /></g>
              {Array.from({length: 6}).map((_, i) => {
                const side = i % 2 === 0 ? -1 : 1; const k = prog(t, T.jumping + Math.floor(i / 2) * 0.12, T.jumping + 0.5 + Math.floor(i / 2) * 0.12);
                const x = 540 + side * lerp(170, 380, k), y = 820 + Math.floor(i / 2) * 200 - 120 * Math.sin(k * Math.PI);
                return <g key={i} transform={`translate(${x} ${y}) scale(1.4)`}><circle r={34} fill="#BFE6FF" stroke={INK} strokeWidth={6} /><circle cx={-10} cy={-6} r={6} fill={INK} /><circle cx={10} cy={-6} r={6} fill={INK} /><ellipse cx={0} cy={12} rx={8} ry={10} fill={INK} />{k > 0.1 && <path d={`M ${-side * 40} 0 l ${-side * 30} -10 M ${-side * 40} 14 l ${-side * 30} 6`} stroke="#fff" strokeWidth={5} />}</g>;
              })}
              <Label x={540} y={620} size={72} s={pop(t, T.every, 12, 6)} color="#FFE45C">AIR JUMPING ASIDE</Label>
              <Sticker t={t} t0={T.jumping + 0.4} x={540} y={1600} text="EVERY THUNDERCLAP" size={70} fill="#5B3A8C" />
            </g>
          )}
        </g>
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="19-lightning-sun" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
