import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const Arcs: React.FC<{t: number; n?: number; col: string; dir?: number; w?: number; k?: number}> = ({t, n = 3, col, dir = 0, w = 12, k = 1}) => (
  <g transform={`rotate(${dir})`} opacity={k}>
    {Array.from({length: n}).map((_, i) => {
      const r = 50 + ((t * 120 + i * 60) % (n * 60));
      return <path key={i} d={`M ${r * Math.cos(-0.6)} ${r * Math.sin(-0.6)} A ${r} ${r} 0 0 1 ${r * Math.cos(0.6)} ${r * Math.sin(0.6)}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" opacity={1 - ((t * 120 + i * 60) % (n * 60)) / (n * 60)} />;
    })}
  </g>
);

// big side-view head, facing right; mouth at (170,60), ear at (-30,0)
const Head: React.FC<{t: number; xray?: number; talk?: boolean}> = ({t, xray = 0, talk = true}) => (
  <g>
    <path d="M -230 -40 Q -250 -300 0 -320 Q 230 -320 230 -80 L 260 20 L 220 30 Q 230 120 190 160 Q 120 210 40 200 L 30 300 L -150 300 L -160 160 Q -240 100 -230 -40 Z" fill="#F2C9A0" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -240 -60 Q -250 -330 10 -340 Q 200 -340 230 -160 Q 120 -240 -60 -200 Q -150 -150 -190 -40 Z" fill="#3B2A1E" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    {xray > 0 && <path d="M -200 -40 Q -210 -270 0 -290 Q 200 -290 200 -80 L 210 30 Q 200 130 150 160 Q 90 190 20 170 L -130 160 Q -200 100 -200 -40 Z" fill="#E8EEF4" stroke="#9AA5B1" strokeWidth={8} opacity={xray * 0.85} />}
    <ellipse cx={-40} cy={10} rx={40} ry={60} fill="#E9B48A" stroke={INK} strokeWidth={7} />
    <path d="M -50 -10 Q -20 10 -50 40" stroke={INK} strokeWidth={6} fill="none" />
    <circle cx={140} cy={-60} r={16} fill={INK} />
    <path d="M 100 -110 L 170 -100" stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <ellipse cx={190} cy={80} rx={26} ry={talk ? 10 + 12 * Math.abs(Math.sin(t * 9)) : 4} fill={INK} />
  </g>
);

const Mic: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <rect x={-20} y={60} width={40} height={300} rx={14} fill="#4B5563" stroke={INK} strokeWidth={LW} />
    <rect x={-80} y={-120} width={160} height={200} rx={80} fill="#C9D3DD" stroke={INK} strokeWidth={LW} />
    {[-70, -30, 10, 50].map((y) => <path key={y} d={`M -70 ${y} L 70 ${y}`} stroke="#8A96A3" strokeWidth={6} />)}
    <circle cx={0} cy={-40} r={12} fill="#E5414A" />
  </g>
);

export const RecordedVoice: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.two - 0.4 ? 'intro' : t < T.low - 0.25 ? 'paths' : t < T.microphone - 0.25 ? 'deep' : t < T.thinner - 0.2 ? 'mic' : 'others';
  const cues: Cue[] = [
    {f: 'pop', at: 0.2, db: -18}, {f: 'blegh', at: T.weird, db: -20},
    {f: 'whoosh', at: T.two - 0.4, db: -24}, {f: 'whoosh', at: T.air, db: -24}, {f: 'rumble', at: T.bones, db: -24}, {f: 'knock', at: T.skull, db: -20},
    {f: 'whoosh', at: T.low - 0.25, db: -24}, {f: 'rumble', at: T.low, db: -20}, {f: 'boing', at: T.deeper, db: -20},
    {f: 'whoosh', at: T.microphone - 0.25, db: -24}, {f: 'clink', at: T.microphone, db: -22}, {f: 'tick', at: T.air2, db: -20},
    {f: 'whoosh', at: T.thinner - 0.2, db: -24}, {f: 'pop', at: T.everyone, db: -18}, {f: 'ding', at: T.everyone + 0.5, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: '#EDE3FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#E6DCFF" />
        {Array.from({length: 9}).map((_, i) => <path key={i} d={`M -50 ${200 + i * 210} Q 270 ${150 + i * 210 + 30 * Math.sin(t + i)} 540 ${200 + i * 210} T 1130 ${200 + i * 210}`} stroke="#D6C8FA" strokeWidth={14} fill="none" />)}
        {scene === 'intro' && (
          <g>
            <g transform="translate(400 1650)"><Guy t={t} expr={t > T.weird ? 'yuck' : 'hope'} handL={[-120, -180]} handR={[190, -330]} look={[12, -4]} stand handChildren={<g><rect x={-40} y={-80} width={90} height={160} rx={16} fill="#2B3A4A" stroke={INK} strokeWidth={6} /><rect x={-28} y={-64} width={66} height={110} rx={6} fill="#7FD3FF" /></g>} /></g>
            <g transform="translate(640 1260)"><Arcs t={t} col="#6B4FD8" dir={-30} /></g>
            <Label x={540} y={620} size={80} s={pop(t, 0.25, 12, 6)} color="#fff">IS THAT MY VOICE?</Label>
            <Sticker t={t} t0={T.weird} x={540} y={830} text="WEIRD!" size={96} fill="#E5414A" />
          </g>
        )}
        {scene === 'paths' && (
          <g>
            <Layer cam={keys(t, [[T.two - 0.4, 540, 1050, 1], [T.skull, 520, 1060, 1.12]])}>
              <g transform="translate(0 90)">
              <g transform="translate(560 1100) scale(1.35)"><Head t={t} xray={prog(t, T.bones - 0.1, T.bones + 0.3)} /></g>
              {/* air path: mouth -> around -> ear */}
              <path d={`M 820 1210 Q 960 1450 640 1520 Q 360 1560 500 1120`} stroke="#3D8CF0" strokeWidth={14} fill="none" strokeDasharray="28 18" strokeDashoffset={-t * 120} strokeLinecap="round" opacity={prog(t, T.air - 0.1, T.air + 0.3)} />
              {/* bone path: mouth -> straight through skull -> ear */}
              <path d="M 790 1200 Q 650 1120 510 1110" stroke="#E5414A" strokeWidth={22} fill="none" strokeLinecap="round" strokeDasharray="10 22" strokeDashoffset={-t * 90} opacity={prog(t, T.bones, T.bones + 0.3)} />
              {t > T.skull && Array.from({length: 4}).map((_, i) => <circle key={i} cx={560} cy={1000} r={260 + i * 30 + 10 * Math.sin(t * 30 + i)} fill="none" stroke="#E5414A" strokeWidth={5} opacity={0.4} />)}
              </g>
            </Layer>
            <Label x={540} y={620} size={82} s={pop(t, T.two, 12, 6)} color="#FFE45C">YOU HEAR IT TWICE</Label>
            <Sticker t={t} t0={T.air} x={300} y={1720} text="1. AIR" size={80} fill="#2C7BE5" />
            <Sticker t={t} t0={T.bones} x={760} y={1720} text="2. BONES" size={80} fill="#E5414A" rot={4} />
          </g>
        )}
        {scene === 'deep' && (
          <g>
            <g transform="translate(560 1200) scale(1.35)"><Head t={t} xray={1} /></g>
            {[0, 1, 2].map((i) => <path key={i} transform={`translate(0 ${i * 50})`} d={Array.from({length: 40}).map((_, j) => `${j === 0 ? 'M' : 'L'} ${300 + j * 13} ${1140 + (40 + 30 * prog(t, T.deeper, T.deeper + 0.5)) * Math.sin(j * 0.35 - t * 6 + i)}`).join(' ')} stroke="#6B4FD8" strokeWidth={14} fill="none" strokeLinecap="round" opacity={prog(t, T.low, T.low + 0.4)} />)}
            <Label x={540} y={620} size={72} s={pop(t, T.low, 12, 6)} color="#fff">BONES LOVE LOW NOTES</Label>
            <Sticker t={t} t0={T.deeper} x={540} y={1720} text="DEEPER INSIDE YOUR HEAD" size={60} fill="#6B4FD8" />
          </g>
        )}
        {scene === 'mic' && (
          <g>
            <g transform="translate(340 1150) scale(1.1)"><Head t={t} /></g>
            <g transform={`translate(840 1100) scale(${pop(t, T.microphone - 0.1, 12, 6)})`}><Mic /></g>
            <g transform="translate(560 1200)"><Arcs t={t} col="#3D8CF0" n={4} w={14} /></g>
            <path d="M 600 1500 L 780 1500" stroke="#E5414A" strokeWidth={16} strokeLinecap="round" opacity={prog(t, T.air2, T.air2 + 0.3)} />
            <g transform="translate(700 1560)" opacity={prog(t, T.air2, T.air2 + 0.3)}><path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke="#E5414A" strokeWidth={16} strokeLinecap="round" /></g>
            <Sticker t={t} t0={T.microphone} x={540} y={620} text="MIC = AIR ONLY" size={86} fill="#2C7BE5" />
            <Label x={540} y={1760} size={66} s={pop(t, T.air2 + 0.2, 12, 6)} color="#FF8A8A">NO BONE BASS</Label>
          </g>
        )}
        {scene === 'others' && (
          <g>
            {[[220, 1640, 'happy'], [540, 1700, 'hope'], [860, 1640, 'happy']].map(([x, y, e], i) => (
              <g key={i} transform={`translate(${x} ${y}) scale(${0.7 * pop(t, T.everyone - 0.3 + i * 0.12, 12, 6)})`}><Guy t={t + i} expr={e as 'happy'} handL={[-120, -180]} handR={[120, -180]} look={[0, -6]} stand /></g>
            ))}
            <g transform={`translate(540 1000) scale(${pop(t, T.thinner - 0.1, 12, 6)})`}>
              <rect x={-300} y={-120} width={600} height={220} rx={50} fill="#fff" stroke={INK} strokeWidth={LW} />
              <path d="M -80 100 L -40 170 L 0 100 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
              <path d={Array.from({length: 40}).map((_, j) => `${j === 0 ? 'M' : 'L'} ${-240 + j * 12} ${-10 + 26 * Math.sin(j * 1.1 - t * 10)}`).join(' ')} stroke="#3D8CF0" strokeWidth={10} fill="none" strokeLinecap="round" />
            </g>
            <Label x={540} y={620} size={66} s={pop(t, T.everyone, 12, 6)} color="#FFE45C">HOW EVERYONE HEARS YOU</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="20-recorded-voice" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
