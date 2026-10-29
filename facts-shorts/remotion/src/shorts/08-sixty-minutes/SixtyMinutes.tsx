import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys, easeOut} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue} from '../../lib/short';

const ClockFace: React.FC<{t: number; ticks: number; face?: 'happy' | 'dizzy' | 'none'; speed?: number}> = ({t, ticks, face = 'happy', speed = 1}) => (
  <g>
    <circle r={300} fill="#fff" stroke={INK} strokeWidth={LW * 1.6} />
    <circle r={300} fill="none" stroke="#E4E7EB" strokeWidth={26} transform="translate(-10 8)" opacity={0.6} />
    {Array.from({length: ticks}).map((_, i) => (
      <path key={i} transform={`rotate(${(i * 360) / ticks})`} d={`M 0 -280 L 0 ${i % (ticks / 12 >= 1 ? Math.round(ticks / 12) : 1) === 0 ? -240 : -262}`} stroke={INK} strokeWidth={ticks > 80 ? 3 : 6} />
    ))}
    <path transform={`rotate(${t * 30 * speed})`} d="M 0 20 L 0 -170" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    <path transform={`rotate(${t * 360 * 0.4 * speed})`} d="M 0 24 L 0 -230" stroke="#E5414A" strokeWidth={8} strokeLinecap="round" />
    <circle r={16} fill={INK} />
    {face === 'happy' && <g><ellipse cx={-80} cy={80} rx={14} ry={20} fill={INK} /><ellipse cx={80} cy={80} rx={14} ry={20} fill={INK} /><path d="M -50 150 Q 0 190 50 150" stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" /></g>}
    {face === 'dizzy' && <g><path d="M -96 64 l 32 32 m 0 -32 l -32 32 M 64 64 l 32 32 m 0 -32 l -32 32" stroke={INK} strokeWidth={9} strokeLinecap="round" /><path d="M -50 160 q 12 -14 25 0 q 12 14 25 0 q 12 -14 25 0 q 12 14 25 0" stroke={INK} strokeWidth={8} fill="none" /></g>}
    <g transform="translate(-220 -260)"><circle r={50} fill="#FFD84D" stroke={INK} strokeWidth={LW} /></g>
    <g transform="translate(220 -260)"><circle r={50} fill="#FFD84D" stroke={INK} strokeWidth={LW} /></g>
  </g>
);

const COLS = ['#FF8A5B', '#FFD84D', '#4CC38A', '#3D8CF0', '#B07AE8', '#F78FB3'];
const Pie: React.FC<{n: number; k: number; t: number}> = ({n, k, t}) => {
  const R = 290;
  return (
    <g>
      {Array.from({length: n}).map((_, i) => {
        const a0 = (i / n) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
        const mid = (a0 + a1) / 2, off = 18 * k;
        const ox = Math.cos(mid) * off, oy = Math.sin(mid) * off;
        const d = `M ${ox} ${oy} L ${ox + Math.cos(a0) * R} ${oy + Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${ox + Math.cos(a1) * R} ${oy + Math.sin(a1) * R} Z`;
        return <path key={i} d={d} fill={COLS[i % COLS.length]} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />;
      })}
      {Array.from({length: 60}).map((_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2 + Math.PI / 60;
        return <circle key={'d' + i} cx={Math.cos(a) * 240} cy={Math.sin(a) * 240} r={9} fill="#fff" stroke={INK} strokeWidth={3} />;
      })}
    </g>
  );
};

const Tablet: React.FC<{t: number; marks: number}> = ({t, marks}) => (
  <g>
    <rect x={-200} y={-140} width={400} height={280} rx={40} fill="#D9A86C" stroke={INK} strokeWidth={LW} />
    {Array.from({length: marks}).map((_, i) => (
      <path key={i} transform={`translate(${-150 + (i % 6) * 60} ${-80 + Math.floor(i / 6) * 70})`} d="M 0 0 L 28 -10 L 28 10 Z M 10 0 L 10 40" fill="#8A5A30" stroke="#8A5A30" strokeWidth={6} strokeLinejoin="round" />
    ))}
  </g>
);

const Beard: React.FC = () => (
  <g>
    <path d="M -40 -300 C -60 -200 0 -140 60 -150 C 130 -160 150 -230 140 -300 C 110 -260 30 -250 -40 -300 Z" fill="#3B2A1E" stroke={INK} strokeWidth={7} />
    <path d="M -110 -440 L -60 -520 L 120 -520 L 160 -440 Z" fill="#C0392B" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
  </g>
);

const Ziggurat: React.FC = () => (
  <g stroke={INK} strokeWidth={LW} strokeLinejoin="round">
    <rect x={-360} y={-120} width={720} height={120} fill="#C9935A" />
    <rect x={-260} y={-230} width={520} height={110} fill="#D9A86C" />
    <rect x={-160} y={-330} width={320} height={100} fill="#E6BA82" />
    <path d="M -40 0 L -40 -330 M 40 0 L 40 -330" stroke="#8A5A30" strokeWidth={10} />
  </g>
);

export const SixtyMinutes: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.babylonians - 0.2 ? 'clock' : t < T.halves - 0.25 ? 'babylon' : t < T.astronomers - 0.25 ? 'pie' : t < T.still - 0.25 ? 'sky' : 'today';
  const splits: [number, number][] = [[T.halves, 2], [T.thirds, 3], [T.quarters, 4], [T.fifths, 5], [T.sixths, 6], [T.tenths, 10]];
  let n = 1, since = 0;
  for (const [tt, nn] of splits) if (t >= tt - 0.05) { n = nn; since = tt - 0.05; }
  const k = n > 1 ? pop(t, since, 14, 6) : 0;
  const share = n > 1 ? 60 / n : 60;
  const cues: Cue[] = [
    {f: 'ticktock', at: 0.2, db: -20}, {f: 'boing', at: T.hundred, db: -20}, {f: 'whoosh', at: T.babylonians - 0.2, db: -22},
    {f: 'knock', at: T.thousands, db: -18}, {f: 'knock', at: T.thousands + 0.25, db: -18}, {f: 'knock', at: T.thousands + 0.5, db: -18},
    {f: 'pop', at: T.sixties, db: -16}, {f: 'whoosh', at: T.halves - 0.25, db: -24},
    ...splits.map(([tt]) => ({f: 'pop', at: tt, db: -18})),
    {f: 'ding', at: T.fractions + 0.3, db: -20}, {f: 'whoosh', at: T.astronomers - 0.25, db: -24}, {f: 'rise', at: T.sky, db: -24},
    {f: 'whoosh', at: T.still - 0.25, db: -24}, {f: 'ticktock', at: T.still + 0.2, db: -22}, {f: 'pop', at: T.circle, db: -16},
  ];
  return (
    <AbsoluteFill style={{background: '#FFF4DE'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill={scene === 'sky' ? '#1C2350' : '#FFF1D6'} />
        {scene !== 'sky' && Array.from({length: 9}).map((_, i) => <circle key={i} cx={(i * 263) % W} cy={(i * 511) % H} r={60} fill="#FFE6B8" />)}
        {scene === 'clock' && (
          <g>
            <g transform={`translate(540 980) scale(${1 + 0.02 * Math.sin(t * 6)})`}>
              <ClockFace t={t} ticks={t > T.hundred - 0.1 ? 100 : 60} face={t > T.hundred - 0.1 ? 'dizzy' : 'happy'} speed={t > T.hundred ? 4 : 1} />
            </g>
            <Sticker t={t} t0={0.25} t1={T.hundred - 0.1} x={540} y={560} text="60 MINUTES" size={100} fill="#2C7BE5" />
            <Sticker t={t} t0={T.hundred - 0.05} x={540} y={560} text="WHY NOT 100?" size={100} fill="#E5414A" />
          </g>
        )}
        {scene === 'babylon' && (
          <g>
            <g transform="translate(330 1560) scale(1.05)">
              <Guy t={t} stand expr="happy" handL={[-70, -150]} handR={[200, -230]} bendR={0.3} blink={((t + 0.3) % 2.8) < 0.1} />
              <g transform="translate(0 -60)"><Beard /></g>
            </g>
            <g transform={`translate(760 1200) rotate(-6) scale(${pop(t, T.thousands - 0.2, 10, 6)})`}><Tablet t={t} marks={Math.floor(prog(t, T.thousands, T.sixties + 0.3) * 12)} /></g>
            <Label x={540} y={560} size={90} s={pop(t, T.babylonians, 12, 6)} color="#FFE45C">THE BABYLONIANS</Label>
            <Sticker t={t} t0={T.sixties} x={760} y={880} text="BASE 60" size={96} fill="#E5414A" />
          </g>
        )}
        {scene === 'pie' && (
          <g>
            <g transform={`translate(540 1000) scale(${pop(t, T.halves - 0.25, 10, 6)})`}><Pie n={n} k={k} t={t} /></g>
            {n > 1 && <Label x={540} y={560} size={120} s={0.9 + 0.1 * k} color="#FFE45C">{`60 ÷ ${n} = ${share}`}</Label>}
            <Label x={540} y={1560} size={74} s={pop(t, T.fractions, 12, 6)} color="#7CF0B0">NO DECIMALS NEEDED</Label>
            <Label x={540} y={1660} size={56} s={pop(t, T.fractions + 0.4, 12, 6)} color="#FF8A8A">100 ÷ 3 = 33.333...</Label>
          </g>
        )}
        {scene === 'sky' && (
          <g>
            {Array.from({length: 50}).map((_, i) => <circle key={i} cx={(i * 197) % W} cy={(i * 389) % 1300} r={3 + (i % 3) * 2} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 2 + i)} />)}
            <circle cx={820} cy={360} r={90} fill="#FFF3B0" stroke={INK} strokeWidth={LW} />
            <path d="M 0 1500 L 1080 1500 L 1080 1920 L 0 1920 Z" fill="#B57B3E" stroke={INK} strokeWidth={LW} />
            <g transform="translate(700 1500)"><Ziggurat /></g>
            <g transform="translate(260 1560) scale(0.95)">
              <Guy t={t} stand expr="hope" handL={[-70, -150]} handR={[170, -420]} bendR={0.15} look={[8, -10]} blink={((t + 0.3) % 2.8) < 0.1} />
              <g transform="translate(0 -60)"><Beard /></g>
            </g>
            <path d={`M 400 1060 Q 600 ${700 - 40 * Math.sin(t)} 820 460`} stroke="#FFE45C" strokeWidth={6} strokeDasharray="20 18" fill="none" strokeDashoffset={-t * 80} />
            <Label x={540} y={560} size={86} s={pop(t, T.astronomers, 12, 6)} color="#FFE45C">TRACKING THE SKY</Label>
          </g>
        )}
        {scene === 'today' && (
          <g>
            <g transform={`translate(330 900) scale(${0.62 * pop(t, T.still - 0.25, 10, 6)})`}><ClockFace t={t} ticks={60} face="happy" /></g>
            <g transform={`translate(780 920) scale(${pop(t, T.circle - 0.15, 10, 6)})`}>
              <circle r={190} fill="#fff" stroke={INK} strokeWidth={LW} />
              {Array.from({length: 36}).map((_, i) => <path key={i} transform={`rotate(${i * 10})`} d={`M 0 -190 L 0 ${i % 9 === 0 ? -150 : -170}`} stroke={INK} strokeWidth={5} />)}
              <path d={`M 0 0 L ${150 * Math.cos(t * 2)} ${150 * Math.sin(t * 2)}`} stroke="#E5414A" strokeWidth={10} strokeLinecap="round" />
            </g>
            <Label x={540} y={1380} size={56} s={pop(t, T.still + 0.2, 12, 6)}>HOURS · MINUTES · SECONDS</Label>
            <Sticker t={t} t0={T.circle} x={780} y={1560} text="360°" size={110} fill="#2C7BE5" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="08-sixty-minutes" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
