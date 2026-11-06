import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys, clamp} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

const HIP = '#9C8CB8', HIP2 = '#C7B6DD', RIVER = '#3E8FC4';

// side-view hippo facing right; legs swing with `step`; eyes closed when asleep
const Hippo: React.FC<{t: number; step?: number; asleep?: boolean; worried?: boolean}> = ({t, step = 0, asleep, worried}) => {
  const blink = t % 3.3 < 0.12 || asleep;
  return (
    <g>
      {[-150, -60, 70, 160].map((x, i) => {
        const sw = step * 22 * Math.sin(t * 8 + (i % 2) * Math.PI);
        return <rect key={x} x={x - 32 + sw} y={60} width={64} height={110} rx={24} fill={HIP} stroke={INK} strokeWidth={LW} />;
      })}
      <ellipse cx={0} cy={0} rx={260} ry={150} fill={HIP} stroke={INK} strokeWidth={LW} />
      <path d="M -255 -10 Q -300 -20 -310 20" stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />
      <ellipse cx={-30} cy={60} rx={180} ry={70} fill={HIP2} opacity={0.6} />
      {/* head */}
      <g transform="translate(240 -40)">
        <ellipse cx={60} cy={30} rx={140} ry={100} fill={HIP} stroke={INK} strokeWidth={LW} />
        <ellipse cx={120} cy={60} rx={70} ry={50} fill={HIP2} stroke={INK} strokeWidth={7} />
        <circle cx={150} cy={30} r={8} fill={INK} /><circle cx={110} cy={30} r={8} fill={INK} />
        <ellipse cx={-20} cy={-75} rx={22} ry={30} fill={HIP} stroke={INK} strokeWidth={7} />
        <circle cx={40} cy={-60} r={30} fill="#fff" stroke={INK} strokeWidth={7} />
        {blink ? <path d="M 22 -60 Q 40 -50 58 -60" stroke={INK} strokeWidth={6} fill="none" /> : <circle cx={48} cy={-58} r={11} fill={INK} />}
        {worried && <path d="M 10 -100 L 60 -92" stroke={INK} strokeWidth={7} strokeLinecap="round" />}
        <path d={worried ? 'M 70 110 Q 110 95 150 110' : 'M 60 100 Q 110 125 160 100'} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

const Bubbles: React.FC<{t: number; x: number; y: number; on: boolean}> = ({t, x, y, on}) => on ? (
  <g>{Array.from({length: 6}).map((_, i) => {
    const a = (t * 0.9 + i / 6) % 1;
    return <circle key={i} cx={x + 20 * Math.sin(t * 4 + i)} cy={y - 500 * a} r={10 + i * 3} fill="none" stroke="#CFF0FF" strokeWidth={5} opacity={1 - a} />;
  })}</g>
) : null;

export const HippoSwim: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.hours - 0.25 ? 'intro' : t < T.heavy - 0.25 ? 'hours' : t < T.breath - 0.25 ? 'floor' : t < T.sleep - 0.25 ? 'breath' : 'sleep';
  const cues: Cue[] = [
    {f: 'splash', at: 0.3, db: -20}, {f: 'sad', at: T.swim + 0.2, db: -22},
    {f: 'whoosh', at: T.hours - 0.25, db: -24}, {f: 'ticktock', at: T.hours, db: -24},
    {f: 'whoosh', at: T.heavy - 0.25, db: -24}, {f: 'plop', at: T.heavy + 0.1, db: -18}, {f: 'boing', at: T.bounce, db: -18}, {f: 'boing', at: T.bounce + 0.7, db: -20},
    {f: 'whoosh', at: T.breath - 0.25, db: -24}, {f: 'tick', at: T.breath + 0.4, db: -20},
    {f: 'whoosh', at: T.sleep - 0.25, db: -24}, {f: 'snore', at: T.sleep + 0.3, db: -22}, {f: 'rise', at: T.bob, db: -22}, {f: 'pop', at: T.bob + 0.6, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: '#BFE8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#BFE8FF" />

        {scene === 'intro' && (() => {
          const sink = prog(t, T.swim + 0.1, T.swim + 1.2);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1150, 1], [T.hours - 0.3, 540, 1250, 1.12]])}>
                <path d={wavePath(t, 1150, 30, 220, 2)} fill={RIVER} />
                <g transform={`translate(${lerp(-300, 470, prog(t, 0, 0.9))} ${lerp(1100, 1420, sink)}) rotate(${-8 * sink + 3 * Math.sin(t * 3)}) scale(0.95)`}><Hippo t={t} worried={sink > 0.2} step={sink > 0 ? 1 : 0} /></g>
                <path d={wavePath(t + 1, 1170, 26, 200, 2.4)} fill={RIVER} opacity={0.75} />
                <Bubbles t={t} x={620} y={1420} on={sink > 0.4} />
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.swim, 12, 6)} color="#fff">HIPPOS CAN'T SWIM</Label>
            </g>
          );
        })()}

        {scene === 'hours' && (() => {
          const hrs = Math.round(16 * prog(t, T.hours, T.hours + 1.2));
          return (
            <g>
              <Layer cam={keys(t, [[T.hours - 0.25, 540, 1150, 1], [T.heavy - 0.3, 520, 1180, 1.08]])}>
                <path d={wavePath(t, 1250, 30, 220, 2)} fill={RIVER} />
                <g transform={`translate(520 ${1290 + 10 * Math.sin(t * 2)}) scale(0.95)`}><Hippo t={t} /></g>
                <path d={wavePath(t + 1, 1280, 26, 200, 2.4)} fill={RIVER} opacity={0.85} />
                <g transform={`translate(540 1700) scale(${pop(t, T.hours, 12, 6)})`}>
                  <rect x={-340} y={-90} width={680} height={170} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={88} fill={INK}>{`${hrs} HRS / DAY`}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={86} s={pop(t, T.hours, 12, 6)} color="#fff">IN WATER ALL DAY</Label>
            </g>
          );
        })()}

        {scene === 'floor' && (() => {
          const drop = prog(t, T.heavy - 0.2, T.heavy + 0.4, (u) => u * u);
          const hop = t > T.bounce ? Math.abs(Math.sin((t - T.bounce) * 3.6)) : 0;
          const x = t > T.bounce ? lerp(380, 700, prog(t, T.bounce, T.breath - 0.3)) : 380;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#2C6E9E" />
              <Layer cam={keys(t, [[T.heavy - 0.25, 540, 1200, 1], [T.breath - 0.3, 600, 1250, 1.08]])}>
                <rect x={-400} y={1650} width={1900} height={800} fill="#8A7350" stroke={INK} strokeWidth={LW} />
                {[120, 360, 820, 1000].map((px, i) => <path key={px} d={`M ${px} 1650 Q ${px + 20 * Math.sin(t * 2 + i)} 1450 ${px + 10} 1300`} stroke="#3F8A4A" strokeWidth={22} fill="none" strokeLinecap="round" />)}
                <g transform={`translate(${x} ${lerp(900, 1470, drop) - 260 * hop}) scale(0.9)`}><Hippo t={t} step={t > T.bounce ? 1 : 0} /></g>
                {t > T.bounce && [0, 1, 2].map((i) => {
                  const a = ((t - T.bounce) * 1.15 + i / 3) % 1;
                  return <circle key={i} cx={x - 120 - 60 * a} cy={1640 - 30 * a} r={20 + 50 * a} fill="#B8A07A" opacity={0.8 * (1 - a)} />;
                })}
              </Layer>
              <Label x={540} y={640} size={71} s={pop(t, T.heavy, 12, 6)} color="#fff">{t < T.bounce ? 'TOO HEAVY TO FLOAT' : 'BOUNCE ALONG THE BED'}</Label>
            </g>
          );
        })()}

        {scene === 'breath' && (() => {
          const left = Math.max(0, 300 - Math.floor((t - T.breath) * 40));
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#2C6E9E" />
              <Layer cam={keys(t, [[T.breath - 0.25, 540, 1250, 1.1], [T.sleep - 0.3, 540, 1250, 1.2]])}>
                <rect x={-400} y={1650} width={1900} height={800} fill="#8A7350" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(460 1470) scale(${0.9 + 0.03 * Math.sin(t * 3)})`}><Hippo t={t} /></g>
                <g transform={`translate(540 1850) scale(${pop(t, T.breath, 12, 6)})`}>
                  <circle r={150} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <path d={`M 0 0 L ${120 * Math.sin(t * 2)} ${-120 * Math.cos(t * 2)}`} stroke="#E5414A" strokeWidth={12} strokeLinecap="round" />
                  <circle r={14} fill={INK} />
                  <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill={INK}>{`${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={86} s={pop(t, T.breath, 12, 6)} color="#fff">HOLDS BREATH</Label>
              <Sticker t={t} t0={T.breath + 0.4} x={540} y={790} text="ABOUT 5 MINUTES" size={60} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'sleep' && (() => {
          const up = t > T.bob ? Math.sin(Math.min(Math.PI, (t - T.bob) * 1.6)) : 0;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#2C6E9E" />
              <rect x={-100} y={-100} width={W + 200} height={1020} fill="#26305C" />
              <Layer cam={keys(t, [[T.sleep - 0.25, 540, 1200, 1], [T.card, 540, 1150, 1.08]])}>
                <path d={wavePath(t, 920, 22, 220, 2)} fill="#2C6E9E" />
                <rect x={-400} y={1650} width={1900} height={800} fill="#8A7350" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(520 ${lerp(1470, 1000, up)}) rotate(${-25 * up}) scale(0.9)`}><Hippo t={t} asleep /></g>
                {up > 0.85 && [0, 1].map((i) => <circle key={i} cx={760 + i * 40} cy={850 - 60 * ((t * 2 + i * 0.5) % 1)} r={14} fill="#fff" opacity={0.7} />)}
                {up < 0.3 && <text x={700} y={1250} fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 3)}>Z z z</text>}
              </Layer>
              <Label x={540} y={640} size={79} s={pop(t, T.sleep, 12, 6)} color="#fff">{t < T.bob ? 'EVEN ASLEEP...' : 'BOBS UP TO BREATHE'}</Label>
              <Sticker t={t} t0={T.bob + 0.8} x={540} y={1700} text="WITHOUT WAKING UP" size={58} fill="#7A4DC8" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="40-hippo-swim" voAt={VO_AT} card={T.card} cues={cues} bed="ocean" bedVol={0.05} />
    </AbsoluteFill>
  );
};
