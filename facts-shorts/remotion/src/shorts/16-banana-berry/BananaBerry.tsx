import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const Eyes: React.FC<{y?: number; gap?: number; happy?: boolean; r?: number}> = ({y = 0, gap = 30, happy = true, r = 9}) => (
  <g>
    <circle cx={-gap} cy={y} r={r} fill={INK} /><circle cx={gap} cy={y} r={r} fill={INK} />
    <path d={happy ? `M ${-gap * 0.6} ${y + 24} q ${gap * 0.6} ${gap * 0.6} ${gap * 1.2} 0` : `M ${-gap * 0.6} ${y + 34} q ${gap * 0.6} ${-gap * 0.5} ${gap * 1.2} 0`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

const Banana: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s}) rotate(${-10 + 5 * Math.sin(t * 2)})`}>
    <path d="M -170 -120 Q -200 120 40 170 Q 170 190 220 120 Q 60 120 -20 40 Q -100 -40 -120 -150 Z" fill="#FFD84D" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -150 -100 Q -150 60 30 130" stroke="#FFE995" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M -170 -120 L -150 -170 L -116 -152 Z" fill="#6E5A2E" stroke={INK} strokeWidth={6} />
    <g transform="translate(-40 60) rotate(30)"><Eyes /></g>
  </g>
);

const Strawberry: React.FC<{t: number; s?: number; sad?: boolean; seedPop?: number}> = ({t, s = 1, sad, seedPop = 0}) => (
  <g transform={`scale(${s}) rotate(${6 * Math.sin(t * 2 + 1)})`}>
    <path d="M -150 -80 Q -170 60 0 200 Q 170 60 150 -80 Q 0 -140 -150 -80 Z" fill="#E5414A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    {Array.from({length: 18}).map((_, i) => {
      const x = -110 + (i % 5) * 55 + (Math.floor(i / 5) % 2) * 27, y = -50 + Math.floor(i / 5) * 55;
      if (Math.abs(x) > 140 - Math.floor(i / 5) * 25) return null;
      return <ellipse key={i} cx={x} cy={y} rx={8 * (1 + seedPop)} ry={13 * (1 + seedPop)} fill="#FFE45C" stroke={INK} strokeWidth={3} />;
    })}
    <path d="M -100 -100 L -40 -150 L 0 -110 L 40 -150 L 100 -100 L 40 -90 L 0 -60 L -40 -90 Z" fill="#4CC38A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <g transform="translate(0 30)"><Eyes happy={!sad} gap={34} /></g>
  </g>
);

const Check: React.FC<{ok: boolean; s: number}> = ({ok, s}) => (
  <g transform={`scale(${s})`}>
    <circle r={58} fill={ok ? '#4CC38A' : '#E5414A'} stroke={INK} strokeWidth={LW} />
    {ok ? <path d="M -26 0 L -6 22 L 28 -22" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M -22 -22 L 22 22 M 22 -22 L -22 22" stroke="#fff" strokeWidth={14} strokeLinecap="round" />}
  </g>
);

const Flower: React.FC<{t: number; n: number; s?: number; open?: number}> = ({t, n, s = 1, open = 1}) => (
  <g transform={`scale(${s})`}>
    {Array.from({length: 6}).map((_, i) => <ellipse key={i} cx={0} cy={-110 * open} rx={60} ry={90} fill="#fff" stroke={INK} strokeWidth={7} transform={`rotate(${i * 60 + 4 * Math.sin(t * 2)})`} />)}
    <circle r={n > 1 ? 110 : 70} fill="#FFD84D" stroke={INK} strokeWidth={LW} />
    {n === 1 ? <ellipse rx={30} ry={40} fill="#4CC38A" stroke={INK} strokeWidth={6} />
      : Array.from({length: n}).map((_, i) => { const a = i * 2.4, r = 18 * Math.sqrt(i); return <ellipse key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} rx={11} ry={14} fill="#4CC38A" stroke={INK} strokeWidth={4} />; })}
  </g>
);

export const BananaBerry: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.botanist - 0.25 ? 'intro' : t < T.grapes - 0.25 ? 'rule' : t < T.many - 0.6 ? 'lineup' : 'straw';
  const cues: Cue[] = [
    {f: 'pop', at: T.banana, db: -18}, {f: 'ding', at: T.banana + 0.6, db: -20}, {f: 'pop', at: T.strawberry, db: -18}, {f: 'blegh', at: T.not, db: -22},
    {f: 'whoosh', at: T.botanist - 0.25, db: -24}, {f: 'pop', at: T.flower, db: -20}, {f: 'pop', at: T.ovary, db: -20}, {f: 'plop', at: T.seeds, db: -20},
    {f: 'whoosh', at: T.grapes - 0.25, db: -24}, {f: 'pop', at: T.grapes, db: -20}, {f: 'pop', at: T.tomatoes, db: -20}, {f: 'boing', at: T.watermelons, db: -20},
    {f: 'whoosh', at: T.many - 0.6, db: -24}, {f: 'pop', at: T.dots, db: -20}, {f: 'zap', at: T.fruits, db: -22}, {f: 'ding', at: T.seed, db: -18},
  ];
  const lineup = [
    {at: T.banana2, el: (k: number) => <Banana t={t} s={0.5 * k} />, lab: 'BANANA'},
    {at: T.grapes, el: (k: number) => <g transform={`scale(${k})`}>{[[0, 0], [-46, -60], [46, -60], [0, -110], [-46, 50], [46, 50], [0, 100]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={42} fill="#7E4FD8" stroke={INK} strokeWidth={6} />)}<g transform="translate(0 0) scale(0.6)"><Eyes /></g></g>, lab: 'GRAPE'},
    {at: T.tomatoes, el: (k: number) => <g transform={`scale(${k})`}><circle r={110} fill="#E5414A" stroke={INK} strokeWidth={LW} /><path d="M -50 -100 L 0 -80 L 50 -100 L 20 -120 L 0 -140 L -20 -120 Z" fill="#4CC38A" stroke={INK} strokeWidth={6} /><Eyes y={0} /></g>, lab: 'TOMATO'},
    {at: T.watermelons, el: (k: number) => <g transform={`scale(${k})`}><ellipse rx={140} ry={110} fill="#4CC38A" stroke={INK} strokeWidth={LW} />{[-80, -30, 20, 70].map((x) => <path key={x} d={`M ${x} -100 Q ${x + 20} 0 ${x} 100`} stroke="#2E8A5A" strokeWidth={14} fill="none" />)}<Eyes y={0} /></g>, lab: 'WATERMELON'},
  ];
  return (
    <AbsoluteFill style={{background: '#FFF1D6'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#E9F7D9" />
        {Array.from({length: 16}).map((_, i) => <circle key={i} cx={(i * 211) % W} cy={(i * 373) % H} r={30 + (i % 4) * 14} fill="#D3EFBF" />)}
        {scene === 'intro' && (
          <g>
            <g transform={`translate(280 1080) scale(${pop(t, T.banana, 10, 6)})`}><Banana t={t} s={1.0} /></g>
            <g transform={`translate(290 790)`}><Check ok s={pop(t, T.banana + 0.6, 12, 6)} /></g>
            <g transform={`translate(790 1180) scale(${pop(t, T.strawberry, 10, 6)})`}><Strawberry t={t} sad={t > T.not} /></g>
            <g transform={`translate(790 880)`}><Check ok={false} s={pop(t, T.not, 12, 6)} /></g>
            <Label x={300} y={1480} size={70} s={pop(t, T.banana + 0.6, 12, 6)} color="#FFD84D">BERRY</Label>
            <Label x={780} y={1480} size={60} s={pop(t, T.not, 12, 6)} color="#FF8A8A">NOT A BERRY</Label>
            <Label x={540} y={620} size={84} s={pop(t, 0.25, 12, 6)} color="#fff">WAIT, WHAT?</Label>
          </g>
        )}
        {scene === 'rule' && (
          <g>
            <g transform="translate(220 1700) scale(0.85)">
              <Guy t={t} expr="happy" handL={[-120, -220]} handR={[130, -260]} look={[10, -4]} stand handChildren={<rect x={-10} y={-90} width={90} height={120} rx={10} fill="#fff" stroke={INK} strokeWidth={6} />} />
              <g transform="translate(0 -470)"><circle cx={-40} cy={0} r={30} fill="none" stroke={INK} strokeWidth={7} /><circle cx={40} cy={0} r={30} fill="none" stroke={INK} strokeWidth={7} /><path d="M -10 0 L 10 0" stroke={INK} strokeWidth={7} /></g>
            </g>
            <g transform={`translate(700 900) scale(${pop(t, T.flower, 12, 6) * 0.9})`}><Flower t={t} n={1} /></g>
            <path d="M 700 1060 L 700 1160" stroke={INK} strokeWidth={10} opacity={prog(t, T.ovary, T.ovary + 0.3)} />
            <path d="M 670 1130 L 700 1170 L 730 1130" stroke={INK} strokeWidth={10} fill="none" opacity={prog(t, T.ovary, T.ovary + 0.3)} />
            <g transform={`translate(700 1360) scale(${pop(t, T.seeds - 0.2, 12, 6)})`}>
              <ellipse rx={150} ry={130} fill="#B8E07A" stroke={INK} strokeWidth={LW} />
              <ellipse rx={110} ry={90} fill="#E9F7C9" />
              {[[-50, -20], [0, 20], [50, -20], [-20, -50], [30, 40]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={10} ry={16} fill={INK} transform={`scale(${pop(t, T.seeds + i * 0.08, 12, 6)})`} />)}
            </g>
            {t < T.flower - 0.1 && <Label x={540} y={620} size={72} s={pop(t, T.botanist, 12, 6)} color="#fff">TO A BOTANIST…</Label>}
            <Sticker t={t} t0={T.flower} x={540} y={600} text="1 FLOWER · 1 OVARY" size={72} fill="#2C7BE5" />
            <Label x={700} y={1620} size={68} s={pop(t, T.seeds, 12, 6)}>SEEDS INSIDE</Label>
          </g>
        )}
        {scene === 'lineup' && (
          <g>
            {lineup.map((f, i) => {
              const k = pop(t, f.at - 0.1, 12, 6);
              const x = i % 2 === 0 ? 300 : 780, y = 930 + Math.floor(i / 2) * 560;
              return (
                <g key={f.lab}>
                  <g transform={`translate(${x} ${y + 8 * Math.sin(t * 3 + i)}) scale(1.25)`}>{f.el(k)}</g>
                  <g transform={`translate(${x + 150} ${y - 150})`}><Check ok s={pop(t, f.at + 0.25, 12, 6) * 0.7} /></g>
                  <Label x={x} y={y + 240} size={i === 3 ? 58 : 66} s={k}>{f.lab}</Label>
                </g>
              );
            })}
            <Label x={540} y={620} size={86} s={pop(t, T.grapes - 0.2, 12, 6)} color="#FFD84D">ALL BERRIES</Label>
          </g>
        )}
        {scene === 'straw' && (
          <g>
            <Layer cam={keys(t, [[T.many - 0.6, 540, 1000, 1], [T.dots - 0.1, 540, 1000, 1], [T.fruits, 600, 1080, 1.8]])}>
              <g opacity={1 - prog(t, T.dots, T.dots + 0.3)} transform={`translate(${lerp(540, 300, prog(t, T.dots - 0.4, T.dots))} 900) scale(${lerp(0.9, 0.55, prog(t, T.dots - 0.4, T.dots))})`}><Flower t={t} n={34} /></g>
              <g transform={`translate(600 1180) scale(${pop(t, T.dots - 0.2, 10, 6) * 1.2})`}><Strawberry t={t} seedPop={0.6 * prog(t, T.fruits, T.fruits + 0.4)} /></g>
            </Layer>
            <Sticker t={t} t0={T.many} t1={T.dots - 0.1} x={540} y={600} text="MANY OVARIES" size={86} fill="#E5414A" />
            <Label x={540} y={620} size={58} s={pop(t, T.fruits, 12, 6)} color="#FFE45C">EACH DOT = TINY FRUIT</Label>
            <Sticker t={t} t0={T.seed} x={540} y={1720} text="+ 1 SEED EACH" size={78} fill="#4CC38A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="16-banana-berry" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
