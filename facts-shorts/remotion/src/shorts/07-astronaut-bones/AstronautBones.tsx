import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys, easeOut} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue} from '../../lib/short';

const Bone: React.FC<{thick: number; holes: number; t: number}> = ({thick, holes, t}) => {
  const w = 34 * thick;
  return (
    <g>
      <path d={`M ${-w} -230 L ${-w} 230 M ${w} -230 L ${w} 230`} stroke={INK} strokeWidth={LW} />
      <rect x={-w} y={-240} width={w * 2} height={480} fill="#FFF6E0" />
      <path d={`M ${-w} -230 L ${-w} 230 M ${w} -230 L ${w} 230`} stroke={INK} strokeWidth={LW} />
      {[-1, 1].map((e) => (
        <g key={e} transform={`translate(0 ${e * 250})`}>
          <circle cx={-46} cy={0} r={54} fill="#FFF6E0" stroke={INK} strokeWidth={LW} />
          <circle cx={46} cy={0} r={54} fill="#FFF6E0" stroke={INK} strokeWidth={LW} />
          <rect x={-46} y={-30} width={92} height={60} fill="#FFF6E0" />
        </g>
      ))}
      {Array.from({length: 14}).map((_, i) => {
        const show = clamp(holes * 14 - i); if (show <= 0) return null;
        const x = ((i * 37) % 50) - 25, y = ((i * 71) % 400) - 200;
        return <ellipse key={i} cx={x * thick} cy={y} rx={7 * show} ry={10 * show} fill="#C9B79A" stroke={INK} strokeWidth={3} />;
      })}
    </g>
  );
};

const Weight: React.FC<{label?: string}> = ({label = 'LOAD'}) => (
  <g>
    <path d="M -110 60 L -80 -60 L 80 -60 L 110 60 Z" fill="#5A6672" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -36 -60 Q 0 -120 36 -60" stroke={INK} strokeWidth={16} fill="none" />
    <Label x={0} y={26} size={46}>{label}</Label>
  </g>
);

const Station: React.FC<{t: number}> = ({t}) => (
  <g>
    <rect width={W} height={H} fill="#DCE3EA" />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${-100 + i * 300} 0 L ${-100 + i * 300} ${H}`} stroke="#C2CCD6" strokeWidth={30} />)}
    <rect x={-20} y={1500} width={W + 40} height={500} fill="#C2CCD6" stroke={INK} strokeWidth={LW} />
    <g transform="translate(800 480)">
      <circle r={150} fill="#141A44" stroke={INK} strokeWidth={LW * 1.5} />
      <circle cx={-30} cy={40} r={70} fill="#3D8CF0" />
      <path d="M -80 20 Q -40 0 -10 30 Q 10 60 -30 90" fill="#4CC38A" />
      {Array.from({length: 6}).map((_, i) => <circle key={i} cx={(i * 53) % 200 - 100} cy={(i * 97) % 200 - 100} r={4} fill="#fff" />)}
    </g>
    {[200, 520].map((x, i) => <path key={i} d={`M ${x} 260 l 0 60 l 120 0 l 0 -60`} stroke="#F2B33D" strokeWidth={16} fill="none" strokeLinejoin="round" />)}
  </g>
);

const Treadmill: React.FC<{t: number}> = ({t}) => (
  <g>
    <rect x={-260} y={-30} width={520} height={60} rx={30} fill="#3A4652" stroke={INK} strokeWidth={LW} />
    {Array.from({length: 8}).map((_, i) => <path key={i} d={`M ${-240 + ((i * 66 + t * 400) % 480)} -24 l 0 48`} stroke="#5A6672" strokeWidth={8} />)}
  </g>
);

export const AstronautBones: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.weaker - 0.2 ? 'float' : t < T.rebuild - 0.25 ? 'earth' : t < T.exercise - 0.3 ? 'bone' : 'gym';
  const thick = t < T.space2 ? 1 + 0.25 * prog(t, T.load, T.load + 0.6) : lerp(1.25, 0.75, prog(t, T.nothing, T.percent + 1.2));
  const holes = prog(t, T.taking - 0.1, T.percent + 1.3);
  const weightY = t < T.space2 ? lerp(-700, -330, prog(t, T.load - 0.3, T.load + 0.2, easeOut)) : -330 - 700 * prog(t, T.space2, T.nothing + 0.4);
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.3, db: -26}, {f: 'whoosh', at: T.weaker - 0.25, db: -22}, {f: 'wobble', at: T.weaker + 0.3, db: -20},
    {f: 'whoosh', at: T.rebuild - 0.3, db: -24}, {f: 'pop', at: T.rebuild, db: -20}, {f: 'step', at: T.load + 0.2, db: -14},
    {f: 'rise', at: T.space2, db: -24}, {f: 'squeeze', at: T.taking, db: -22}, {f: 'pop', at: T.nasa, db: -18},
    {f: 'tick', at: T.percent, db: -20}, {f: 'sad', at: T.percent + 0.4, db: -24}, {f: 'whoosh', at: T.exercise - 0.3, db: -24},
    {f: 'step', at: T.exercise + 0.2, db: -20}, {f: 'step', at: T.exercise + 0.5, db: -20}, {f: 'step', at: T.exercise + 0.8, db: -20},
    {f: 'step', at: T.exercise + 1.1, db: -20}, {f: 'ding', at: T.single + 0.3, db: -20},
  ];
  const run = (t * 7) % (Math.PI * 2);
  return (
    <AbsoluteFill style={{background: '#DCE3EA'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        {scene === 'float' && (
          <g>
            <Station t={t} />
            <g transform={`translate(${480 + 40 * Math.sin(t * 0.8)} ${1150 + 50 * Math.sin(t * 1.1)}) rotate(${t * 25})`}>
              <Guy t={t} expr="happy" handL={[-170, -260]} handR={[180, -280]} bendL={0.3} bendR={0.3} blink={((t + 0.4) % 2.6) < 0.1} />
            </g>
            <Sticker t={t} t0={T.float} x={540} y={1720} text="ZERO WEIGHT" size={90} fill="#2C7BE5" />
          </g>
        )}
        {scene === 'earth' && (
          <g>
            <rect width={W} height={H} fill="#BFE6FF" />
            <rect x={-20} y={1450} width={W + 40} height={500} fill="#8FCF7A" stroke={INK} strokeWidth={LW} />
            <g transform={`translate(540 1460) rotate(${5 * Math.sin(t * 9)})`}>
              <Guy t={t} stand expr="worried" handL={[-130, -150]} handR={[130, -150]} bendL={0.6} bendR={0.6} stepL={-8 * Math.sin(t * 9)} stepR={8 * Math.sin(t * 9)}
                sweat={((t % 1.4) / 1.4)} />
            </g>
            <g transform="translate(540 1330) scale(0.7)"><Weight label="BAG" /></g>
            <Label x={540} y={560} size={110} s={pop(t, T.weaker, 12, 6)} color="#FF8A8A">WEAKER?</Label>
          </g>
        )}
        {scene === 'bone' && (
          <g>
            <rect width={W} height={H} fill={t < T.space2 ? '#BFE6FF' : '#141A44'} />
            {t > T.space2 && Array.from({length: 40}).map((_, i) => <circle key={i} cx={(i * 197) % W} cy={(i * 389) % H} r={3 + (i % 3)} fill="#fff" opacity={0.7} />)}
            <g transform={`translate(540 ${1050}) scale(${1.2 * pop(t, T.rebuild - 0.25, 10, 6)})`}>
              <Bone thick={thick} holes={holes} t={t} />
              <g transform={`translate(0 ${weightY})`}><Weight /></g>
            </g>
            <Label x={540} y={560} size={80} s={pop(t, T.rebuild + 0.1, 12, 6) * (1 - prog(t, T.space2 - 0.2, T.space2))} color="#FFE45C">BONE FOLLOWS LOAD</Label>
            <Label x={540} y={560} size={86} s={pop(t, T.nothing, 12, 6) * (1 - prog(t, T.nasa - 0.2, T.nasa))} color="#9FD0FF">NO LOAD IN SPACE</Label>
            <Sticker t={t} t0={T.nasa} t1={T.exercise - 0.3} x={540} y={560} text="-1 TO 2% A MONTH" size={88} fill="#E5414A" />
            <Label x={540} y={1700} size={60} s={pop(t, T.nasa + 0.3, 12, 6) * (1 - prog(t, T.exercise - 0.4, T.exercise - 0.3))}>STUDIES FOR NASA</Label>
          </g>
        )}
        {scene === 'gym' && (
          <g>
            <Station t={t} />
            <g transform="translate(540 1500)"><Treadmill t={t} /></g>
            <path d="M 400 1500 L 450 1180 M 680 1500 L 630 1180" stroke="#2C7BE5" strokeWidth={10} />
            <g transform="translate(540 1470)">
              <Guy t={t} stand expr="hot" handL={[-90 + 50 * Math.sin(run), -170]} handR={[90 - 50 * Math.sin(run), -170]} bendL={0.6} bendR={0.6}
                stepL={14 * Math.sin(run)} stepR={-14 * Math.sin(run)} sweat={((t % 1.2) / 1.2)} />
            </g>
            <Sticker t={t} t0={T.exercise} x={540} y={1720} text="EVERY SINGLE DAY" size={96} fill="#4CC38A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="07-astronaut-bones" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
