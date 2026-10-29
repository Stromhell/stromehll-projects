import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys, easeOut} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue} from '../../lib/short';

// big cartoon hand, palm facing us, fingers up. wr[i] = wrinkle amount per finger (0..1)
const BigHand: React.FC<{t: number; wr: number[]; nerves?: number; cut?: number}> = ({t, wr, nerves = 0, cut = 0}) => {
  const fingers = [[-150, -170, -8], [-55, -230, -2], [45, -235, 2], [140, -190, 8]];
  return (
    <g>
      {/* thumb */}
      <g transform="rotate(-40 -170 120)"><rect x={-230} y={-20} width={110} height={230} rx={55} fill="#fff" stroke={INK} strokeWidth={LW} /></g>
      {fingers.map(([x, top, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${x} 100)`}>
          <rect x={x - 46} y={top - 220} width={92} height={420} rx={46} fill="#fff" stroke={INK} strokeWidth={LW} />
          {/* wrinkles near the tip */}
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={`M ${x - 30} ${top - 170 + k * 26} q 10 ${-10 * wr[i]} 20 0 q 10 ${10 * wr[i]} 20 0 q 10 ${-10 * wr[i]} 20 0`}
              stroke={INK} strokeWidth={5} fill="none" opacity={clamp(wr[i] * 1.4 - k * 0.12)} strokeLinecap="round" />
          ))}
          {nerves > 0.01 && (
            <path d={`M ${x} 260 L ${x} ${top - 120}`} stroke="#FFD84D" strokeWidth={10} strokeDasharray={600} strokeDashoffset={600 * (1 - nerves)} opacity={0.95} />
          )}
          {nerves > 0.01 && i === 3 && cut > 0.01 && (
            <g transform={`translate(${x} ${top + 40}) scale(${cut})`}><path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke="#E5414A" strokeWidth={14} strokeLinecap="round" /></g>
          )}
        </g>
      ))}
      {/* palm */}
      <path d="M -210 40 Q -220 330 0 360 Q 220 330 200 40 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -190 60 L 180 60" stroke="#fff" strokeWidth={30} />
      <path d="M -120 200 Q 0 240 120 190" stroke="#E4E7EB" strokeWidth={10} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Duck: React.FC<{t: number}> = ({t}) => (
  <g transform={`rotate(${6 * Math.sin(t * 2)})`}>
    <ellipse cx={0} cy={0} rx={90} ry={56} fill="#FFD84D" stroke={INK} strokeWidth={LW} />
    <circle cx={60} cy={-70} r={46} fill="#FFD84D" stroke={INK} strokeWidth={LW} />
    <path d="M 98 -70 L 140 -60 L 100 -48 Z" fill="#FF8A3D" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={72} cy={-80} r={8} fill={INK} />
    <path d="M -40 -10 Q -10 10 20 -6" stroke="#E0B93A" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);

const Bubbles: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 22}).map((_, i) => {
    const x = (i * 131) % 1100, y = 1180 + ((i * 53) % 140) - 10 * Math.sin(t * 2 + i);
    const r = 26 + (i % 4) * 10;
    return <g key={i}><circle cx={x} cy={y} r={r + 4} fill={INK} /><circle cx={x} cy={y} r={r - 3} fill="#fff" /><circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.2} fill="#CDEBFF" /></g>;
  })}</g>
);

// fingertip cross-section: skin ridge amount + vessel width
const CrossSection: React.FC<{t: number; shrink: number}> = ({t, shrink}) => {
  let d = 'M -360 -120';
  for (let x = -360; x <= 360; x += 40) d += ` Q ${x + 20} ${-120 - 40 * shrink} ${x + 40} -120`;
  return (
    <g>
      <path d={d + ' L 360 200 L -360 200 Z'} fill="#FFE7DC" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {[-200, 0, 200].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={60} rx={lerp(70, 30, shrink)} ry={lerp(40, 18, shrink)} fill="#E5414A" stroke={INK} strokeWidth={6} />
          {shrink > 0.1 && <path d={`M ${x - 110} 60 l 20 0 m 180 0 l 20 0`} stroke={INK} strokeWidth={6} />}
        </g>
      ))}
    </g>
  );
};

const Soap: React.FC = () => (
  <g><rect x={-80} y={-46} width={160} height={92} rx={34} fill="#9EE0D0" stroke={INK} strokeWidth={LW} /><path d="M -50 -20 Q -20 -36 20 -24" stroke="#D8FFF5" strokeWidth={12} fill="none" strokeLinecap="round" /></g>
);

const Tyre: React.FC<{t: number}> = ({t}) => (
  <g transform={`rotate(${t * 40})`}>
    <circle r={150} fill="#2B2F36" stroke={INK} strokeWidth={LW} />
    {Array.from({length: 14}).map((_, i) => <path key={i} transform={`rotate(${i * 25.7})`} d="M 0 -150 l -14 30 l 14 10 l 14 -10 Z" fill="#555C66" />)}
    <circle r={80} fill="#9AA5B1" stroke={INK} strokeWidth={LW} />
    <circle r={20} fill="#555C66" />
  </g>
);

export const WrinklyFingers: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.soaking - 0.25 ? 'bath' : t < T.shrinks - 0.25 ? 'hand' : t < T.grip - 0.25 ? 'section' : t < T.treads - 0.3 ? 'grip' : 'treads';
  const w = prog(t, 0.4, T.soaking - 0.3);
  const handW = scene === 'hand' ? [1, 1, 1, t > T.nerve + 0.6 ? 1 - prog(t, T.nerve + 0.6, T.smooth + 0.2) : 1] : [w, w, w, w];
  const cut = pop(t, T.nerve + 0.4, 12, 6);
  const nerves = prog(t, T.nerve - 0.1, T.nerve + 0.4);
  const sw = prog(t, T.switches, T.switches + 0.15);
  const shrink = prog(t, T.shrinks + 0.2, T.ridges + 0.3);
  const smoothSlip = prog(t, T.tests, T.tests + 0.8, easeOut);
  const cues: Cue[] = [
    {f: 'splash', at: 0.15, db: -24}, {f: 'squeeze', at: T.wrinkle, db: -22}, {f: 'whoosh', at: T.soaking - 0.25, db: -24},
    {f: 'zap', at: T.nerve + 0.4, db: -20}, {f: 'pop', at: T.smooth, db: -20}, {f: 'tick', at: T.switches, db: -16},
    {f: 'whoosh', at: T.shrinks - 0.25, db: -24}, {f: 'squeeze', at: T.ridges, db: -20}, {f: 'whoosh', at: T.grip - 0.25, db: -24},
    {f: 'whoosh', at: T.tests + 0.1, db: -22}, {f: 'splash', at: T.tests + 0.7, db: -20}, {f: 'ding', at: T.wet + 0.6, db: -20},
    {f: 'whoosh', at: T.treads - 0.3, db: -24}, {f: 'pop', at: T.treads, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: '#CFEFFF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#D7F0FF" />
        {/* bathroom tiles */}
        {Array.from({length: 12}).map((_, r) => Array.from({length: 7}).map((_, c) => (
          <rect key={`${r}-${c}`} x={c * 160 - 20} y={r * 160 - 40} width={156} height={156} fill="#E8F7FF" stroke="#B9DDF2" strokeWidth={4} />
        )))}
        {scene === 'bath' && (
          <g>
            <path d="M 40 1180 L 1040 1180 L 980 1700 Q 540 1780 100 1700 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
            <g transform="translate(470 1330) scale(1.15)">
              <Guy t={t} expr="hope" handL={[-90, -120]} handR={[170, -330]} bendR={0.2} blink={((t + 0.5) % 2.7) < 0.1} look={[10, -10]} />
            </g>
            <Bubbles t={t} />
            <g transform={`translate(${820 + 20 * Math.sin(t)} 1150)`}><Duck t={t} /></g>
            <g transform="translate(760 560) scale(0.55)"><BigHand t={t} wr={handW} /></g>
            <Label x={540} y={560} size={110} s={pop(t, T.wrinkle, 12, 6)} color="#FFE45C">PRUNE FINGERS?</Label>
          </g>
        )}
        {scene === 'hand' && (
          <g>
            <g transform={`translate(540 1100) scale(${1.3 * pop(t, T.soaking - 0.25, 10, 6)})`}><BigHand t={t} wr={handW} nerves={nerves} cut={cut} /></g>
            <Sticker t={t} t0={T.soaking} t1={T.nerve - 0.2} x={540} y={560} text="NOT JUST SOAKING" size={84} />
            <Label x={540} y={560} size={66} s={pop(t, T.smooth, 12, 6) * (1 - prog(t, T.switches - 0.2, T.switches))} color="#FFE45C">CUT NERVE = SMOOTH</Label>
            {t > T.switches - 0.2 && (
              <g transform={`translate(540 420) scale(${pop(t, T.switches - 0.2, 12, 6)})`}>
                <rect x={-80} y={-120} width={160} height={240} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                <rect x={-34} y={-80} width={68} height={160} rx={14} fill="#DDE3EA" stroke={INK} strokeWidth={6} />
                <rect x={-30} y={lerp(4, -76, sw)} width={60} height={72} rx={12} fill={sw > 0.5 ? '#4CC38A' : '#9AA5B1'} stroke={INK} strokeWidth={6} />
                <Label x={150} y={20} size={70} anchor="start" color={sw > 0.5 ? '#7CF0B0' : '#fff'}>{sw > 0.5 ? 'ON' : 'OFF'}</Label>
              </g>
            )}
          </g>
        )}
        {scene === 'section' && (
          <g>
            <g transform={`translate(540 1050) scale(${1.2 * pop(t, T.shrinks - 0.25, 10, 6)})`}><CrossSection t={t} shrink={shrink} /></g>
            <Label x={540} y={560} size={80} s={pop(t, T.shrinks, 12, 6)} color="#FF8A8A">VESSELS SHRINK</Label>
            <Label x={540} y={1500} size={60} s={pop(t, T.ridges, 12, 6)} color="#FFE45C">SKIN PULLS INTO RIDGES</Label>
          </g>
        )}
        {scene === 'grip' && (
          <g>
            <Label x={300} y={480} size={70} s={pop(t, T.tests - 0.1, 12, 6)}>SMOOTH</Label>
            <Label x={780} y={480} size={70} s={pop(t, T.tests - 0.1, 12, 6)} color="#FFE45C">WRINKLY</Label>
            <g transform="translate(300 1050) scale(0.75)"><BigHand t={t} wr={[0, 0, 0, 0]} /></g>
            <g transform="translate(780 1050) scale(0.75)"><BigHand t={t} wr={[1, 1, 1, 1]} /></g>
            <g transform={`translate(${300 + 60 * smoothSlip} ${880 + 700 * smoothSlip * smoothSlip}) rotate(${200 * smoothSlip})`}><Soap /></g>
            <g transform={`translate(780 ${880 + 4 * Math.sin(t * 6)})`}><Soap /></g>
            <Sticker t={t} t0={T.grip} t1={T.tests - 0.2} x={540} y={1660} text="BETTER GRIP?" size={84} fill="#2C7BE5" />
            <Label x={540} y={1660} size={80} s={pop(t, T.wet + 0.5, 12, 6)} color="#7CF0B0">HOLDS WET THINGS</Label>
          </g>
        )}
        {scene === 'treads' && (
          <g>
            <g transform="translate(330 1050) scale(0.8)"><BigHand t={t} wr={[1, 1, 1, 1]} /></g>
            <g transform="translate(800 1080) scale(1.1)"><Tyre t={t} /></g>
            <Label x={570} y={1110} size={100}>=</Label>
            <Sticker t={t} t0={T.treads} x={540} y={520} text="TYRE TREADS" size={110} fill="#E5414A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="06-wrinkly-fingers" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
