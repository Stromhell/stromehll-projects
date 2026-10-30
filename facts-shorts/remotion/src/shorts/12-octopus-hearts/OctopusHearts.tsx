import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const Heart: React.FC<{t: number; s?: number; col?: string; beat?: number; face?: boolean}> = ({t, s = 1, col = '#E5414A', beat = 2, face}) => {
  const b = 1 + 0.12 * Math.max(0, Math.sin(t * Math.PI * beat)) ** 6;
  return (
    <g transform={`scale(${s * b})`}>
      <path d="M 0 60 C -90 0 -90 -70 -40 -70 C -15 -70 0 -50 0 -35 C 0 -50 15 -70 40 -70 C 90 -70 90 0 0 60 Z" fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -50 -40 Q -60 -20 -48 -6" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.7} />
      {face && <g><circle cx={-18} cy={-14} r={7} fill={INK} /><circle cx={18} cy={-14} r={7} fill={INK} /><path d="M -12 8 q 12 10 24 0" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" /></g>}
    </g>
  );
};

const Octopus: React.FC<{t: number; col: string; xray?: number; strain?: number}> = ({t, col, xray = 0, strain = 0}) => (
  <g>
    {Array.from({length: 8}).map((_, i) => {
      const a = -70 + i * 20; const ph = t * 3 + i;
      const x1 = Math.sin((a * Math.PI) / 180) * 260, y1 = 230 + Math.cos((a * Math.PI) / 180) * 120;
      return <path key={i} d={`M ${a * 1.4} 60 Q ${x1 * 0.6 + 40 * Math.sin(ph)} ${180} ${x1 + 30 * Math.sin(ph + 1)} ${y1 + 20 * Math.cos(ph)}`} stroke={INK} strokeWidth={62} fill="none" strokeLinecap="round" />;
    })}
    {Array.from({length: 8}).map((_, i) => {
      const a = -70 + i * 20; const ph = t * 3 + i;
      const x1 = Math.sin((a * Math.PI) / 180) * 260, y1 = 230 + Math.cos((a * Math.PI) / 180) * 120;
      return <path key={i} d={`M ${a * 1.4} 60 Q ${x1 * 0.6 + 40 * Math.sin(ph)} ${180} ${x1 + 30 * Math.sin(ph + 1)} ${y1 + 20 * Math.cos(ph)}`} stroke={col} strokeWidth={44} fill="none" strokeLinecap="round" />;
    })}
    <ellipse cx={0} cy={-80} rx={190} ry={210} fill={col} stroke={INK} strokeWidth={LW} />
    <ellipse cx={-70} cy={-170} rx={40} ry={60} fill="#fff" opacity={0.25} />
    {xray > 0 && (
      <g opacity={xray}>
        <ellipse cx={0} cy={-90} rx={150} ry={170} fill="#1B2A55" stroke={INK} strokeWidth={6} />
        <g transform="translate(-80 -95)"><Heart t={t} s={0.5} beat={2.6 + strain * 2} /></g>
        <g transform="translate(80 -95)"><Heart t={t + 0.2} s={0.5} beat={2.6 + strain * 2} /></g>
        <g transform="translate(0 -200)"><Heart t={t + 0.1} s={0.75} beat={2 + strain * 2} /></g>
      </g>
    )}
    <g transform="translate(0 20)">
      <ellipse cx={-62} cy={0} rx={36} ry={44} fill="#fff" stroke={INK} strokeWidth={7} /><ellipse cx={62} cy={0} rx={36} ry={44} fill="#fff" stroke={INK} strokeWidth={7} />
      <circle cx={-56} cy={8} r={17} fill={INK} /><circle cx={68} cy={8} r={17} fill={INK} />
      <path d={strain > 0.5 ? 'M -30 70 q 30 -18 60 0' : 'M -30 62 q 30 24 60 0'} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
  </g>
);

export const OctopusHearts: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.why - 0.2 ? 'intro' : t < T.copper - 0.25 ? 'pump' : t < T.less - 0.25 ? 'copper' : t < T.extra - 0.2 ? 'less' : 'push';
  const blue = prog(t, T.blue, T.blue + 0.6);
  const col = `rgb(${lerp(166, 70, blue)},${lerp(92, 120, blue)},${lerp(214, 240, blue)})`;
  const cues: Cue[] = [
    {f: 'pop', at: 0.2, db: -18}, {f: 'pop', at: T.three, db: -20}, {f: 'splash', at: T.blue, db: -22},
    {f: 'whoosh', at: T.why - 0.2, db: -24}, {f: 'knock', at: T.gills, db: -20}, {f: 'knock', at: T.gills + 0.4, db: -20},
    {f: 'boing', at: T.bigger, db: -20}, {f: 'whoosh', at: T.copper - 0.25, db: -24}, {f: 'zap', at: T.copper, db: -22},
    {f: 'rise', at: T.turns, db: -22}, {f: 'whoosh', at: T.less - 0.25, db: -24}, {f: 'sad', at: T.less + 0.4, db: -24},
    {f: 'whoosh', at: T.extra - 0.2, db: -24}, {f: 'knock', at: T.extra + 0.2, db: -18}, {f: 'knock', at: T.extra + 0.5, db: -18},
    {f: 'ding', at: T.finale, db: -18},
  ];
  const camIn = keys(t, [[0, 540, 1000, 1], [T.three, 540, 1000, 1.08], [T.why - 0.2, 540, 960, 1.15]]);
  return (
    <AbsoluteFill style={{background: '#0E3A5C'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs><linearGradient id="sea12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2C8FC9" /><stop offset="1" stopColor="#0B2D4A" /></linearGradient></defs>
        <rect width={W} height={H} fill="url(#sea12)" />
        {Array.from({length: 14}).map((_, i) => {
          const y = H - ((t * 120 + i * 167) % (H + 200));
          return <circle key={i} cx={(i * 263) % W + 20 * Math.sin(t * 2 + i)} cy={y} r={8 + (i % 4) * 5} fill="none" stroke="#BFE9FF" strokeWidth={4} opacity={0.5} />;
        })}
        <path d={`M 0 1720 Q 270 1680 540 1720 T 1080 1720 L 1080 1920 L 0 1920 Z`} fill="#E8C98A" stroke={INK} strokeWidth={LW} />
        {scene === 'intro' && (
          <g>
            <Layer cam={camIn}><g transform={`translate(540 1060) rotate(${4 * Math.sin(t * 1.6)})`}><Octopus t={t} col={col} /></g></Layer>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${300 + i * 240} 700) scale(${pop(t, T.three + i * 0.18, 12, 6)})`}><Heart t={t} s={0.9} face /></g>
            ))}
            <Label x={540} y={1580} size={92} s={pop(t, T.blue, 12, 6)} color="#7FD3FF">BLUE BLOOD?!</Label>
          </g>
        )}
        {scene === 'pump' && (
          <g>
            <Layer cam={keys(t, [[T.why - 0.2, 540, 1040, 1.1], [T.bigger, 540, 1000, 1.2]])}>
              <g transform="translate(540 1000)"><Octopus t={t} col={col} xray={prog(t, T.why - 0.2, T.why + 0.3)} /></g>
            </Layer>
            <Sticker t={t} t0={T.gills} x={540} y={590} text="2 PUMP THE GILLS" size={74} fill="#2C7BE5" />
            <Sticker t={t} t0={T.bigger} x={540} y={1740} text="1 PUMPS THE BODY" size={74} fill="#E5414A" rot={4} />
          </g>
        )}
        {scene === 'copper' && (
          <g>
            <g transform={`translate(330 980) scale(${pop(t, T.copper - 0.1, 12, 6)})`}>
              <circle r={150} fill="#D9824A" stroke={INK} strokeWidth={LW} /><circle cx={-50} cy={-60} r={30} fill="#F4B98A" />
              <Label x={0} y={45} size={130} keep>Cu</Label>
            </g>
            <path d={`M 500 980 L ${lerp(500, 640, prog(t, T.copper + 0.3, T.copper + 0.8))} 980`} stroke="#fff" strokeWidth={14} strokeLinecap="round" />
            <g transform={`translate(780 980) rotate(${-8 + 6 * Math.sin(t * 3)})`}>
              <path d="M 0 -170 C 60 -80 110 -20 110 50 C 110 120 60 160 0 160 C -60 160 -110 120 -110 50 C -110 -20 -60 -80 0 -170 Z" fill={prog(t, T.turns, T.turns + 0.6) > 0.5 ? '#3D7CF0' : '#E5414A'} stroke={INK} strokeWidth={LW} />
              <path d="M -60 40 Q -66 90 -30 120" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.6} />
            </g>
            <Label x={540} y={620} size={80} s={pop(t, T.copper, 12, 6)} color="#FFB27A">COPPER, NOT IRON</Label>
            <Sticker t={t} t0={T.turns} x={540} y={1400} text="= BLUE BLOOD" size={86} fill="#2C7BE5" />
          </g>
        )}
        {scene === 'less' && (
          <g>
            {[{x: 300, n: 8, lab: 'OURS', c: '#E5414A'}, {x: 780, n: 3, lab: 'OCTOPUS', c: '#3D7CF0'}].map((c, j) => (
              <g key={j}>
                <rect x={c.x - 190} y={760} width={380} height={560} rx={40} fill="#ffffff22" stroke={INK} strokeWidth={LW} />
                <rect x={c.x - 170} y={820} width={340} height={480} rx={30} fill={c.c} opacity={0.85} />
                {Array.from({length: c.n}).map((_, i) => {
                  const k = pop(t, T.less + 0.1 + i * 0.08, 12, 6);
                  return <g key={i} transform={`translate(${c.x - 110 + (i % 3) * 110} ${880 + Math.floor(i / 3) * 140 + 10 * Math.sin(t * 3 + i)}) scale(${k})`}>
                    <circle r={44} fill="#fff" stroke={INK} strokeWidth={6} /><Label x={0} y={16} size={40} color={INK} keep>O₂</Label>
                  </g>;
                })}
                <Label x={c.x} y={1430} size={74}>{c.lab}</Label>
              </g>
            ))}
            <Label x={540} y={620} size={80} s={pop(t, T.less, 12, 6)} color="#FFE45C">CARRIES LESS O₂</Label>
          </g>
        )}
        {scene === 'push' && (
          <g>
            <Layer cam={keys(t, [[T.extra - 0.2, 540, 1000, 1.2], [T.finale, 540, 980, 1.1]])}>
              <g transform={`translate(540 1000) scale(${1 + 0.03 * Math.sin(t * 18)})`}><Octopus t={t} col={col} xray={1 - prog(t, T.finale - 0.1, T.finale + 0.4)} strain={1 - prog(t, T.finale - 0.1, T.finale + 0.3)} /></g>
            </Layer>
            <Sticker t={t} t0={T.extra} t1={T.finale - 0.1} x={540} y={620} text="EXTRA PUMPING POWER" size={70} fill="#E5414A" />
            <Label x={540} y={640} size={62} s={pop(t, T.finale, 12, 6)} color="#7FD3FF">3 HEARTS · 1 BLUE OCTOPUS</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="12-octopus-hearts" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
