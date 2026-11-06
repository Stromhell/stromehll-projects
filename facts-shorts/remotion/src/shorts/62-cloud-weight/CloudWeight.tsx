import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SKY = '#8FD0FF', GRASS = '#6CC05A';

const Cloud: React.FC<{s?: number; face?: 'happy' | 'strain' | 'sad'; fill?: string}> = ({s = 1, face = 'happy', fill = '#fff'}) => (
  <g transform={`scale(${s})`}>
    <path d="M -260 80 Q -330 80 -320 10 Q -310 -60 -230 -50 Q -220 -150 -110 -140 Q -60 -220 40 -190 Q 130 -230 180 -140 Q 290 -150 290 -40 Q 350 0 310 70 Q 290 100 240 90 Z" fill={fill} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <circle cx={-50} cy={-30} r={14} fill={INK} /><circle cx={60} cy={-30} r={14} fill={INK} />
    {face === 'happy' && <path d="M -30 20 Q 5 50 40 20" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />}
    {face === 'strain' && <path d="M -30 30 L 40 30" stroke={INK} strokeWidth={8} strokeLinecap="round" />}
    {face === 'sad' && <path d="M -30 35 Q 5 10 40 35" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />}
    <circle cx={-90} cy={10} r={18} fill="#FFB6C8" opacity={0.7} /><circle cx={100} cy={10} r={18} fill="#FFB6C8" opacity={0.7} />
  </g>
);

const Elephant: React.FC = () => (
  <g>
    <ellipse cx={0} cy={-60} rx={80} ry={55} fill="#9AA6B8" stroke={INK} strokeWidth={6} />
    <circle cx={70} cy={-90} r={40} fill="#9AA6B8" stroke={INK} strokeWidth={6} />
    <path d="M 100 -80 Q 130 -40 110 0" stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M 100 -80 Q 130 -40 110 0" stroke="#9AA6B8" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={45} cy={-90} rx={22} ry={30} fill="#B9C3D2" stroke={INK} strokeWidth={5} />
    <circle cx={80} cy={-100} r={6} fill={INK} />
    {[-50, -15, 25, 55].map((x) => <rect key={x} x={x - 12} y={-20} width={24} height={30} fill="#9AA6B8" stroke={INK} strokeWidth={5} />)}
  </g>
);

export const CloudWeight: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.elephants - 0.25 ? 'intro' : t < T.droplets - 0.25 ? 'eleph' : t < T.warm - 0.25 ? 'drops' : t < T.heavy - 0.25 ? 'warm' : 'rain';
  const cues: Cue[] = [
    {f: 'boing', at: 0.3, db: -20}, {f: 'rumble', at: T.cloud + 1.0, db: -22}, {f: 'ding', at: T.cloud + 1.6, db: -18},
    {f: 'whoosh', at: T.elephants - 0.25, db: -24}, ...[0, 1, 2, 3, 4].map((i) => ({f: 'plop', at: T.elephants + 0.2 + i * 0.15, db: -20})),
    {f: 'whoosh', at: T.droplets - 0.25, db: -24}, {f: 'pop', at: T.droplets + 0.3, db: -22}, {f: 'pop', at: T.droplets + 0.5, db: -22},
    {f: 'whoosh', at: T.warm - 0.25, db: -24}, {f: 'rise', at: T.warm, db: -20},
    {f: 'whoosh', at: T.heavy - 0.25, db: -24}, {f: 'pour', at: T.heavy + 0.4, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'intro' && (() => {
          const n = Math.round(500 * prog(t, T.cloud + 0.6, T.elephants - 0.6));
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1070, 1.1], [T.elephants - 0.3, 540, 1070, 1]])}>
                <rect x={-400} y={1780} width={1900} height={700} fill={GRASS} stroke={INK} strokeWidth={LW} />
                <g transform={`translate(540 ${1300 + 15 * Math.sin(t * 2)}) scale(${pop(t, 0.1, 10, 6)})`}><Cloud s={1.3} /></g>
                <g transform={`translate(540 1640) scale(${pop(t, T.cloud + 0.5, 12, 6)})`}>
                  <rect x={-300} y={-70} width={600} height={130} rx={26} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={76} fill="#E5414A">{`${n} TONNES`}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={76} s={pop(t, 0.1, 12, 6)} color="#fff">ONE FLUFFY CLOUD</Label>
              <Sticker t={t} t0={T.cloud + 0.4} x={540} y={790} text="WEIGHS ABOUT" size={60} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'eleph' && (
          <g>
            <Layer cam={keys(t, [[T.elephants - 0.25, 540, 1020, 1], [T.droplets - 0.3, 540, 1030, 1.04]])}>
              <rect x={-400} y={1780} width={1900} height={700} fill={GRASS} stroke={INK} strokeWidth={LW} />
              <g transform="translate(540 1780)"><Guy t={t} expr="worried" handL={[-160, -420]} handR={[160, -420]} stand /></g>
              <g transform={`translate(540 ${1180 + 10 * Math.sin(t * 2)})`}><Cloud s={1.05} face="strain" /></g>
              {Array.from({length: 10}).map((_, i) => (
                <g key={i} transform={`translate(${250 + (i % 5) * 145} ${1085 - Math.floor(i / 5) * 45}) scale(${0.55 * pop(t, T.elephants + 0.15 + i * 0.08, 12, 6)})`}><Elephant /></g>
              ))}
            </Layer>
            <Label x={540} y={640} size={66} s={pop(t, T.elephants, 12, 6)} color="#fff">LIKE 100 ELEPHANTS</Label>
            <Sticker t={t} t0={T.elephants + 0.5} x={540} y={790} text="FLOATING OVER YOUR HEAD" size={48} fill="#E5414A" />
          </g>
        )}

        {scene === 'drops' && (() => {
          const spread = prog(t, T.droplets + 0.2, T.warm - 0.4);
          return (
            <g>
              <Layer cam={keys(t, [[T.droplets - 0.25, 540, 1070, 1], [T.warm - 0.3, 540, 1070, 1.06]])}>
                <circle cx={540} cy={1350} r={420} fill="#fff" stroke={INK} strokeWidth={LW} />
                {Array.from({length: 60}).map((_, i) => {
                  const a = i * 2.4, r = Math.sqrt(i / 60) * 380 * lerp(0.15, 1, spread);
                  return <circle key={i} cx={540 + Math.cos(a) * r + 6 * Math.sin(t * 3 + i)} cy={1350 + Math.sin(a) * r} r={12} fill="#5FB6F0" stroke={INK} strokeWidth={3} />;
                })}
                <g transform="translate(860 1700) rotate(-30)"><circle r={70} fill="none" stroke={INK} strokeWidth={14} /><path d="M 50 50 L 120 120" stroke={INK} strokeWidth={22} strokeLinecap="round" /></g>
              </Layer>
              <Label x={540} y={640} size={66} s={pop(t, T.droplets, 12, 6)} color="#fff">TRILLIONS OF DROPLETS</Label>
              <Sticker t={t} t0={T.droplets + 0.5} x={540} y={790} text="SPREAD OUT OVER HUGE SPACE" size={44} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'warm' && (
          <g>
            <Layer cam={keys(t, [[T.warm - 0.25, 540, 1070, 1], [T.heavy - 0.3, 540, 1050, 1.05]])}>
              <rect x={-400} y={1780} width={1900} height={700} fill={GRASS} stroke={INK} strokeWidth={LW} />
              <circle cx={880} cy={1050} r={90} fill="#FFD23C" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(500 ${1200 + 12 * Math.sin(t * 2)})`}><Cloud s={1.0} /></g>
              {[0, 1, 2, 3].map((i) => {
                const a = ((t * 0.7 + i / 4) % 1);
                return <g key={i} transform={`translate(${260 + i * 160} ${1760 - 380 * a})`} opacity={1 - a}>
                  <path d="M 0 60 L 0 -30 M -30 0 L 0 -40 L 30 0" stroke="#F28C28" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>;
              })}
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.warm, 12, 6)} color="#fff">RISING WARM AIR</Label>
            <Sticker t={t} t0={T.warm + 0.4} x={540} y={790} text="KEEPS PUSHING IT UP" size={60} fill="#F28C28" />
          </g>
        )}

        {scene === 'rain' && (() => {
          const fall = t > T.heavy + 0.4;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#9FB4C8" />
              <Layer cam={keys(t, [[T.heavy - 0.25, 540, 1070, 1], [T.card, 540, 1070, 1.06]])}>
                <rect x={-400} y={1780} width={1900} height={700} fill={GRASS} stroke={INK} strokeWidth={LW} />
                <g transform={`translate(540 ${1180 + (fall ? 0 : 10 * Math.sin(t * 2))})`}><Cloud s={1.1} face={fall ? 'happy' : 'strain'} fill="#C9D3DE" /></g>
                {fall && Array.from({length: 18}).map((_, i) => {
                  const a = ((t * 1.3 + i * 0.37) % 1);
                  return <path key={i} transform={`translate(${260 + (i * 97) % 560} ${1300 + 460 * a})`} d="M 0 -26 Q 16 0 12 10 Q 0 22 -12 10 Q -16 0 0 -26 Z" fill="#5FB6F0" stroke={INK} strokeWidth={3} />;
                })}
                <g transform="translate(860 1780)"><Guy t={t} expr="happy" handL={[-140, -300]} handR={[140, -300]} stand /></g>
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.heavy, 12, 6)} color="#fff">TOO HEAVY?</Label>
              <Sticker t={t} t0={T.heavy + 0.5} x={540} y={790} text="IT FALLS AS RAIN" size={64} fill="#2C7BE5" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="62-cloud-weight" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
