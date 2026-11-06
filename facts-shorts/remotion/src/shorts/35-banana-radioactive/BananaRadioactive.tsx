import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const YEL = '#FFD84A', GLOW = '#7CFF6B';

// banana with a face; mood changes the mouth
const Banana: React.FC<{t: number; s?: number; mood?: 'grin' | 'shock' | 'calm' | 'none'; bite?: number}> = ({t, s = 1, mood = 'grin', bite = 0}) => {
  const blink = t % 3.1 < 0.12;
  return (
    <g transform={`scale(${s * (1 - 0.6 * bite)})`}>
      <path d="M -260 -60 Q -40 120 260 -80 Q 270 -60 250 -20 Q -20 330 -280 -30 Z" fill={YEL} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -255 -55 L -300 -110 L -270 -120 L -240 -70" fill="#7A5A2E" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 250 -75 L 280 -100" stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <path d="M -170 60 Q 0 200 170 50" stroke="#F2C23A" strokeWidth={10} fill="none" strokeLinecap="round" />
            {mood !== 'none' && <><circle cx={-50} cy={55} r={blink ? 2 : 13} fill={INK} /><circle cx={40} cy={55} r={blink ? 2 : 13} fill={INK} /></>}
      {mood === 'grin' && <path d="M -40 85 Q 0 115 40 85" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />}
      {mood === 'shock' && <ellipse cx={0} cy={98} rx={16} ry={20} fill={INK} />}
      {mood === 'calm' && <path d="M -30 92 Q 0 104 30 92" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />}
    </g>
  );
};

const Trefoil: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <circle r={110} fill="#FFD84A" stroke={INK} strokeWidth={LW} />
    {[0, 120, 240].map((a) => <path key={a} transform={`rotate(${a})`} d="M 0 0 L -50 -85 A 98 98 0 0 1 50 -85 Z" fill={INK} />)}
    <circle r={22} fill="#FFD84A" stroke={INK} strokeWidth={8} />
  </g>
);

const Counter: React.FC<{t: number; t0: number}> = ({t, t0}) => {
  const sw = Math.sin(t * 9) * (t > t0 ? 6 : 1);
  return (
    <g>
      <rect x={-130} y={-110} width={260} height={220} rx={30} fill="#F28C28" stroke={INK} strokeWidth={LW} />
      <rect x={-95} y={-80} width={190} height={110} rx={12} fill="#FFF7DA" stroke={INK} strokeWidth={7} />
      <path d={`M 0 20 L ${70 * Math.sin((sw - 30) * Math.PI / 180)} ${20 - 70 * Math.cos((sw - 30) * Math.PI / 180)}`} stroke="#E5414A" strokeWidth={8} strokeLinecap="round" />
      <circle cy={20} r={10} fill={INK} />
      <path d="M 130 -40 Q 200 -60 210 20" stroke={INK} strokeWidth={14} fill="none" />
      <rect x={180} y={10} width={60} height={110} rx={20} fill="#555" stroke={INK} strokeWidth={7} />
    </g>
  );
};

export const BananaRadioactive: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.potassium - 0.25 ? 'intro' : t < T.dose - 0.25 ? 'atoms' : t < T.million - 0.25 ? 'eat' : t < T.relax - 0.25 ? 'pile' : 'relax';
  const cues: Cue[] = [
    {f: 'zap', at: T.radioactive, db: -22}, {f: 'tick', at: T.radioactive + 0.3, db: -20}, {f: 'tick', at: T.radioactive + 0.55, db: -20}, {f: 'tick', at: T.radioactive + 0.7, db: -20},
    {f: 'whoosh', at: T.potassium - 0.25, db: -24}, {f: 'pop', at: T.potassium + 0.2, db: -20}, {f: 'ding', at: T.tiny, db: -20},
    {f: 'whoosh', at: T.dose - 0.25, db: -24}, {f: 'slurp', at: T.dose + 0.2, db: -22}, {f: 'boing', at: T.joke, db: -20},
    {f: 'whoosh', at: T.million - 0.25, db: -24}, {f: 'rumble', at: T.million + 0.1, db: -22},
    {f: 'whoosh', at: T.relax - 0.25, db: -24}, {f: 'ding', at: T.relax + 0.2, db: -18},
  ];
  const bg = scene === 'intro' ? '#1E2B3A' : scene === 'atoms' ? '#14202C' : scene === 'pile' ? '#FFE7A8' : '#CFEFFF';
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bg} />

        {scene === 'intro' && (() => {
          const glow = 0.5 + 0.5 * Math.sin(t * 6);
          const [jx, jy] = shake(t, t > T.radioactive ? 4 : 0);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1150, 1], [T.potassium - 0.3, 540, 1150, 1.18]])}>
                <circle cx={540} cy={1180} r={430 + 30 * glow} fill={GLOW} opacity={0.18 + 0.12 * glow} />
                <g transform={`translate(${540 + jx} ${1180 + jy}) rotate(${-8 + 4 * Math.sin(t * 2)})`}><Banana t={t} s={1.35} mood={t > T.radioactive + 0.2 ? 'shock' : 'grin'} /></g>
                <g transform={`translate(840 1620) scale(${pop(t, T.radioactive + 0.2, 10, 6) * 0.9})`}><Counter t={t} t0={T.radioactive} /></g>
                <g transform={`translate(230 1600) rotate(${t * 40}) scale(${pop(t, T.radioactive, 10, 6) * 0.8})`}><Trefoil /></g>
              </Layer>
              <Label x={540} y={640} size={96} s={pop(t, T.radioactive, 12, 6)} color={GLOW}>RADIOACTIVE?!</Label>
            </g>
          );
        })()}

        {scene === 'atoms' && (
          <g>
            <Layer cam={keys(t, [[T.potassium - 0.25, 540, 1200, 1], [T.tiny + 0.2, 540, 1200, 1.04], [T.dose - 0.3, 540, 1220, 1.07]])}>
              <g transform={`translate(540 1220) rotate(${4 * Math.sin(t * 1.8)})`}><Banana t={t} s={1.35} mood="none" /></g>
              {Array.from({length: 9}).map((_, i) => {
                const u = 0.12 + i * 0.095, lx = (1 - u) * (1 - u) * -250 + 2 * u * (1 - u) * -30 + u * u * 255, ly = (1 - u) * (1 - u) * -45 + 2 * u * (1 - u) * 225 + u * u * -50;
                const x = 540 + 1.35 * lx, y = 1220 + 1.35 * ly + 14 * Math.sin(t * 5 + i * 1.7);
                const hot = i === 6 && t > T.tiny;
                const k = pop(t, T.potassium + 0.1 + i * 0.06, 12, 6);
                return (
                  <g key={i} transform={`translate(${x} ${y}) scale(${k * (hot ? 1.5 + 0.15 * Math.sin(t * 10) : 1)})`}>
                    {hot && [0, 1, 2].map((j) => { const a = (t * 1.4 + j / 3) % 1; return <circle key={j} r={40 + 160 * a} fill="none" stroke={GLOW} strokeWidth={10 * (1 - a)} />; })}
                    <circle r={30} fill={hot ? GLOW : '#B78CFF'} stroke={INK} strokeWidth={6} />
                    <text y={13} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={36} fill={INK}>K</text>
                  </g>
                );
              })}
            </Layer>
            <Label x={540} y={640} size={92} s={pop(t, T.potassium, 12, 6)} color="#B78CFF">POTASSIUM</Label>
            <Sticker t={t} t0={T.tiny} x={540} y={1700} text="1 IN 10,000 IS K-40" size={60} fill="#2EA043" />
          </g>
        )}

        {scene === 'eat' && (() => {
          const bite = prog(t, T.dose + 0.1, T.dose + 0.8);
          const needle = prog(t, T.dose + 0.6, T.dose + 1.2);
          return (
            <g>
              <Layer cam={keys(t, [[T.dose - 0.25, 540, 960, 1], [T.joke - 0.2, 580, 1150, 1.1], [T.million - 0.3, 640, 1250, 1.2]])}>
                <rect x={-400} y={1640} width={1900} height={700} fill="#3A4A5C" />
                <g transform={`translate(380 1640) scale(0.95 ${0.95 * (1 + 0.025 * Math.sin(t * 9))})`}>
                  <Guy t={t} expr="happy" handL={[-110, -170]} handR={[120, -330]} bendR={-0.3} stand blink={t % 2.9 < 0.12}
                    handChildren={bite < 1 ? <g transform="translate(40 -30) rotate(-60) scale(0.35)"><Banana t={t} mood="calm" bite={bite} /></g> : undefined} />
                </g>
                {/* dose meter: needle barely twitches */}
                <g transform="translate(800 1200)">
                  <path d="M -160 0 A 160 160 0 0 1 160 0" fill="#fff" stroke={INK} strokeWidth={LW} />
                  <path d="M -160 0 A 160 160 0 0 1 -80 -138" stroke="#2EA043" strokeWidth={22} fill="none" />
                  <path d="M 80 -138 A 160 160 0 0 1 160 0" stroke="#E5414A" strokeWidth={22} fill="none" />
                  <path d={`M 0 0 L ${-150 * Math.cos((4 * needle + Math.sin(t * 12)) * Math.PI / 180)} ${-150 * Math.sin((4 * needle + Math.sin(t * 12)) * Math.PI / 180)}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
                  <circle r={16} fill={INK} />
                </g>
                <g transform={`translate(800 ${1440 + 15 * Math.sin(t * 3)}) rotate(${-10 + 10 * Math.sin(t * 2.5)}) scale(${pop(t, T.joke, 10, 5) * 0.55})`}>
                  <circle r={150} fill="#FFD84A" stroke={INK} strokeWidth={LW} />
                  <circle r={120} fill="none" stroke="#F2B632" strokeWidth={12} strokeDasharray="18 14" />
                  <g transform="scale(0.4)"><Banana t={t} mood="grin" /></g>
                </g>
              </Layer>
              <Label x={540} y={640} size={92} s={pop(t, T.dose, 12, 6)}>TINY DOSE</Label>
              <Sticker t={t} t0={T.joke} x={540} y={1800} text="'BANANA EQUIVALENT DOSE'" size={48} fill="#F28C28" />
            </g>
          );
        })()}

        {scene === 'pile' && (() => {
          const n = Math.floor(lerp(0, 36, prog(t, T.million, T.million + 1.6)));
          const count = Math.round(10000000 * prog(t, T.million, T.million + 1.4));
          return (
            <g>
              <Layer cam={keys(t, [[T.million - 0.25, 540, 1100, 1.15], [T.relax - 0.3, 540, 1000, 1]])}>
                <rect x={-400} y={1700} width={1900} height={700} fill="#C99A6A" stroke={INK} strokeWidth={LW} />
                {Array.from({length: n}).map((_, i) => {
                  let row = 0, col = i; while (col >= 8 - row) { col -= 8 - row; row++; }
                  const x = 540 + (col - (7 - row) / 2) * 95, y = 1665 - row * 62;
                  return <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 53) % 60 - 30}) scale(0.32)`}><Banana t={t + i} mood={i % 3 ? 'grin' : 'calm'} /></g>;
                })}
              </Layer>
              <g transform={`translate(540 900) scale(${pop(t, T.million, 12, 6)})`}>
                <rect x={-330} y={-80} width={660} height={140} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={35} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={96} fill={INK}>{count.toLocaleString('en-GB')}</text>
              </g>
              <Label x={540} y={640} size={80} s={pop(t, T.million, 12, 6)}>BANANAS AT ONCE</Label>
            </g>
          );
        })()}

        {scene === 'relax' && (
          <g>
            <Layer cam={keys(t, [[T.relax - 0.25, 540, 960, 1], [T.card, 540, 1060, 1.1]])}>
              <rect x={-400} y={1640} width={1900} height={700} fill="#8CCB6A" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(540 ${1640 - 60 * Math.abs(Math.sin(t * 4.5))}) rotate(${4 * Math.sin(t * 4.5)})`}>
                <Guy t={t} expr="happy" handL={[-150, -330]} handR={[150, -330]} stand blink={t % 2.5 < 0.12}
                  handChildren={<g transform="translate(20 -40) rotate(-40) scale(0.4)"><Banana t={t} mood="grin" /></g>} />
              </g>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.relax, 12, 6)}>ENJOY YOUR SNACK</Label>
            <Sticker t={t} t0={T.relax + 0.4} x={540} y={1800} text="TOTALLY SAFE" size={64} fill="#2EA043" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="35-banana-radioactive" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
