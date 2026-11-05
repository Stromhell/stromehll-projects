import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

// ---------------------------------------------------------------- props
const POO = '#7A4A26';
const Cube: React.FC<{s?: number; face?: boolean; t?: number; sq?: number}> = ({s = 1, face = false, t = 0, sq = 1}) => (
  <g transform={`scale(${s})`}>
    {/* sq: 0 = round blob, 1 = cube */}
    <rect x={-40} y={-40} width={80} height={80} rx={lerp(40, 10, sq)} fill={POO} stroke={INK} strokeWidth={LW} />
    {sq > 0.5 && <path d="M -40 -40 L -26 -54 L 54 -54 L 40 -40 M 40 40 L 54 26 L 54 -54" fill="none" stroke={INK} strokeWidth={6} strokeLinejoin="round" opacity={(sq - 0.5) * 2} />}
    <path d="M -26 -24 L -10 -24" stroke="#A8724A" strokeWidth={8} strokeLinecap="round" />
    {face && <g>
      <circle cx={-14} cy={-2} r={6} fill="#fff" /><circle cx={14} cy={-2} r={6} fill="#fff" />
      <circle cx={-13} cy={-1} r={t % 2.4 < 0.12 ? 1 : 3} fill={INK} /><circle cx={15} cy={-1} r={t % 2.4 < 0.12 ? 1 : 3} fill={INK} />
      <path d="M -8 16 Q 0 22 8 16" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>}
  </g>
);

const Wombat: React.FC<{t: number; walk?: number; xray?: number; blink?: boolean; mood?: 'calm' | 'proud' | 'push'}> = ({t, walk = 0, xray = 0, mood = 'calm'}) => {
  const bob = walk ? 6 * Math.abs(Math.sin(t * 9)) : 2 * Math.sin(t * 2);
  const blink = t % 3.3 < 0.12;
  const legs = [-120, -50, 60, 130];
  return (
    <g transform={`translate(0 ${-bob})`}>
      {legs.map((x, i) => <rect key={i} x={x - 22} y={40 + (walk ? 10 * Math.sin(t * 9 + i * 1.6) : 0)} width={44} height={70} rx={18} fill="#6B4A30" stroke={INK} strokeWidth={LW} />)}
      <path d="M -200 20 C -210 -110 -90 -170 20 -165 C 150 -160 230 -90 225 10 C 220 80 120 95 0 95 C -120 95 -195 80 -200 20 Z" fill="#9C7A58" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -150 30 C -100 70 40 75 120 50" stroke="#B9967A" strokeWidth={18} fill="none" strokeLinecap="round" />
      {xray > 0.01 && (
        <g opacity={xray}>
          <path d="M -200 20 C -210 -110 -90 -170 20 -165 C 150 -160 230 -90 225 10 C 220 80 120 95 0 95 C -120 95 -195 80 -200 20 Z" fill="#2A3A55" stroke={INK} strokeWidth={LW} />
          <path d="M 150 -60 C 60 -120 -60 -110 -60 -40 C -60 20 60 30 60 -20 C 60 -60 -20 -60 -40 -10 C -70 40 -150 40 -175 10" stroke="#F4A99A" strokeWidth={30} fill="none" strokeLinecap="round" />
          <path d="M 150 -60 C 60 -120 -60 -110 -60 -40 C -60 20 60 30 60 -20 C 60 -60 -20 -60 -40 -10 C -70 40 -150 40 -175 10" stroke={INK} strokeWidth={4} fill="none" strokeDasharray="10 14" strokeDashoffset={-t * 60} />
        </g>
      )}
      {/* head */}
      <g transform={`translate(190 -40) rotate(${mood === 'push' ? 6 : 2 * Math.sin(t * 1.6)})`}>
        {[-1, 1].map((sd) => <circle key={sd} cx={-10 + sd * 48} cy={-90} r={26} fill="#9C7A58" stroke={INK} strokeWidth={LW} />)}
        <ellipse cx={20} cy={-20} rx={95} ry={80} fill="#9C7A58" stroke={INK} strokeWidth={LW} />
        <ellipse cx={90} cy={-4} rx={44} ry={36} fill="#3A2A20" stroke={INK} strokeWidth={6} />
        <ellipse cx={80} cy={-16} rx={10} ry={6} fill="#6A5A50" />
        {[-1, 1].map((sd) => (
          <g key={sd}>
            <circle cx={8 + sd * 30} cy={-46} r={13} fill="#fff" stroke={INK} strokeWidth={5} />
            <circle cx={12 + sd * 30} cy={-44} r={blink ? 1.5 : 6} fill={INK} />
          </g>
        ))}
        {mood === 'proud' && <path d="M 20 44 Q 50 62 80 44" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
        {mood === 'push' && <path d="M -22 -70 L 0 -60 M 38 -70 L 16 -60" stroke={INK} strokeWidth={6} strokeLinecap="round" />}
      </g>
      <path d="M -200 0 Q -220 -10 -214 -26" stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Grass: React.FC<{y: number; col?: string}> = ({y, col = '#8FCB6B'}) => (
  <g>
    <path d={`M -60 ${y} Q 300 ${y - 30} 560 ${y} Q 820 ${y + 24} 1140 ${y - 12} L 1140 2600 L -60 2600 Z`} fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    {Array.from({length: 12}).map((_, i) => <path key={i} d={`M ${40 + i * 90} ${y + 40 + (i % 3) * 30} l 8 -26 l 8 26`} stroke="#5E9E45" strokeWidth={6} fill="none" strokeLinecap="round" />)}
  </g>
);

const Rabbit: React.FC<{t: number}> = ({t}) => (
  <g>
    {[-1, 1].map((sd) => <ellipse key={sd} cx={sd * 22} cy={-150} rx={18} ry={60} fill="#E9E4DE" stroke={INK} strokeWidth={LW} transform={`rotate(${sd * 10 + 3 * Math.sin(t * 3)} ${sd * 22} -100)`} />)}
    <ellipse cx={0} cy={0} rx={80} ry={64} fill="#E9E4DE" stroke={INK} strokeWidth={LW} />
    <circle cx={0} cy={-80} r={48} fill="#E9E4DE" stroke={INK} strokeWidth={LW} />
    <circle cx={-16} cy={-86} r={5} fill={INK} /><circle cx={16} cy={-86} r={5} fill={INK} />
    <circle cx={0} cy={-68} r={7} fill="#F08AA0" />
  </g>
);
const Dog: React.FC<{t: number}> = ({t}) => (
  <g>
    <rect x={-90} y={-50} width={180} height={90} rx={40} fill="#E2A65A" stroke={INK} strokeWidth={LW} />
    {[-60, 50].map((x) => <rect key={x} x={x - 14} y={20} width={28} height={50} rx={10} fill="#E2A65A" stroke={INK} strokeWidth={LW} />)}
    <circle cx={100} cy={-70} r={54} fill="#E2A65A" stroke={INK} strokeWidth={LW} />
    <ellipse cx={70} cy={-110} rx={20} ry={36} fill="#A86A2E" stroke={INK} strokeWidth={LW} transform={`rotate(${-20 + 5 * Math.sin(t * 4)} 70 -110)`} />
    <circle cx={120} cy={-80} r={6} fill={INK} /><circle cx={150} cy={-60} r={10} fill={INK} />
    <path d={`M -90 -20 Q -130 ${-60 + 12 * Math.sin(t * 10)} -140 -80`} stroke={INK} strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>
);
const Blob: React.FC<{s?: number}> = ({s = 1}) => <g transform={`scale(${s})`}><ellipse rx={30} ry={20} fill={POO} stroke={INK} strokeWidth={6} /></g>;

const Rock: React.FC<{w: number}> = ({w}) => (
  <path d={`M ${-w / 2} 0 C ${-w / 2} -90 ${-w / 4} -130 0 -130 C ${w / 3} -130 ${w / 2} -80 ${w / 2} 0 Z`} fill="#A9A9B4" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
);

// one straight piece of intestine with alternating stiff (dark) and stretchy (light) bands
const Gut: React.FC<{t: number; sq: number; slide: number}> = ({t, sq, slide}) => {
  const bands = [-330, -165, 0, 165, 330];
  return (
    <g>
      <rect x={-520} y={-170} width={1040} height={340} rx={40} fill="#F7C0A8" stroke={INK} strokeWidth={LW} />
      {bands.map((x, i) => {
        const stiff = i % 2 === 0;
        const pinch = stiff ? 0 : 30 * (0.5 + 0.5 * Math.sin(t * 6 + i));
        return <g key={x}>
          <rect x={x - 70} y={-170 + pinch} width={140} height={340 - pinch * 2} rx={18} fill={stiff ? '#C9604E' : '#FBDCCF'} stroke={INK} strokeWidth={6} />
          {!stiff && [-40, 0, 40].map((dx) => <path key={dx} d={`M ${x + dx} ${-150 + pinch} q 10 20 0 40 q -10 20 0 40`} stroke="#E8A08A" strokeWidth={5} fill="none" />)}
        </g>;
      })}
      <g transform={`translate(${lerp(-380, 140, slide)} 0) scale(${lerp(1.9, 1.6, sq)} ${lerp(1.2, 1.6, sq)}) rotate(${4 * Math.sin(t * 5)})`}><Cube sq={sq} face={sq > 0.6} t={t} /></g>
    </g>
  );
};

const Moon: React.FC<{t: number}> = ({t}) => (
  <g>
    <circle r={80} fill="#FFF3B0" stroke={INK} strokeWidth={LW} />
    <circle cx={-24} cy={-14} r={12} fill="#EADB8C" /><circle cx={22} cy={22} r={16} fill="#EADB8C" />
    {Array.from({length: 9}).map((_, i) => <circle key={i} cx={-420 + ((i * 197) % 900)} cy={-60 + ((i * 131) % 380)} r={5 + 3 * Math.abs(Math.sin(t * 2 + i))} fill="#fff" />)}
  </g>
);

const Log: React.FC = () => (
  <g>
    <rect x={-230} y={-80} width={460} height={110} rx={50} fill="#9A6236" stroke={INK} strokeWidth={LW} />
    <ellipse cx={230} cy={-25} rx={34} ry={55} fill="#D8A36A" stroke={INK} strokeWidth={LW} />
    <ellipse cx={230} cy={-25} rx={16} ry={28} fill="none" stroke="#9A6236" strokeWidth={5} />
    <path d="M -180 -40 L 120 -40 M -150 0 L 60 0" stroke="#7A4A26" strokeWidth={6} strokeLinecap="round" />
  </g>
);

export const WombatCubes: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.only - 0.25 ? 'drop' : t < T.gut - 0.25 ? 'only' : t < T.squeeze - 0.25 ? 'xray'
    : t < T.hundred - 0.25 ? 'squeeze' : t < T.stacks - 0.25 ? 'night' : 'stack';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.15, db: -24}, {f: 'plop', at: T.cubes - 0.1, db: -18}, {f: 'boing', at: T.cubes + 0.5, db: -22},
    {f: 'whoosh', at: T.only - 0.25, db: -24}, {f: 'ding', at: T.only + 1.0, db: -20},
    {f: 'whoosh', at: T.gut - 0.25, db: -24}, {f: 'zap', at: T.gut + 0.1, db: -24},
    {f: 'squeeze', at: T.squeeze, db: -20}, {f: 'squeeze', at: T.squeeze + 1.0, db: -22}, {f: 'pop', at: T.dries + 0.4, db: -20},
    {f: 'whoosh', at: T.hundred - 0.25, db: -24}, {f: 'tick', at: T.hundred + 0.2, db: -24},
    {f: 'whoosh', at: T.stacks - 0.25, db: -24}, {f: 'knock', at: T.stacks + 0.4, db: -20}, {f: 'knock', at: T.stacks + 0.8, db: -20},
    {f: 'ding', at: T.territory, db: -18},
  ];
  const bgCol = scene === 'night' ? '#2B3566' : scene === 'xray' ? '#1E2A44' : scene === 'squeeze' ? '#FFE3D6' : '#BDE8FF';
  return (
    <AbsoluteFill style={{background: bgCol}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bgCol} />

        {scene === 'drop' && (() => {
          const walkIn = prog(t, 0, Math.max(0.6, T.cubes - 0.4));
          const dropT = T.cubes - 0.15;
          const fall = prog(t, dropT, dropT + 0.3);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 960, 1], [T.cubes + 0.6, 540, 960, 1], [T.only - 0.3, 480, 1320, 1.1]])}>
                <Grass y={1500} />
                <g transform={`translate(${lerp(-320, 520, walkIn)} 1400)`}><Wombat t={t} walk={walkIn < 1 ? 1 : 0} mood={t > dropT ? 'proud' : 'calm'} /></g>
                {t > dropT && <g transform={`translate(300 ${lerp(1410, 1450, fall)}) scale(${pop(t, dropT, 12, 6)})`}><Cube face t={t} /></g>}
              </Layer>
              <Label x={540} y={640} size={92} s={pop(t, T.cubes, 12, 6)} color="#fff">CUBE POOP?!</Label>
            </g>
          );
        })()}

        {scene === 'only' && (
          <Layer cam={keys(t, [[T.only - 0.25, 540, 960, 1], [T.gut - 0.25, 540, 1250, 1.06]])}>
            <Grass y={1560} />
            {[[140, 'rabbit'], [400, 'dog']].map(([x, k], i) => (
              <g key={k as string} transform={`translate(${x} 1470) scale(${0.8 * pop(t, T.only - 0.2 + i * 0.2, 12, 6)})`}>
                {k === 'rabbit' ? <Rabbit t={t} /> : <Dog t={t} />}
                <g transform="translate(-60 110)"><Blob /></g><g transform="translate(-10 120)"><Blob s={0.8} /></g>
              </g>
            ))}
            {[140, 400].map((x, i) => (
              <g key={x} transform={`translate(${x} 1200) scale(${pop(t, T.only + 0.5 + i * 0.15, 12, 6)})`}>
                <path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke="#E5414A" strokeWidth={22} strokeLinecap="round" />
              </g>
            ))}
            <g transform={`translate(800 1500) scale(${0.55 * pop(t, T.only + 0.8, 12, 6)})`}>
              <g transform={`translate(0 ${-30 * Math.abs(Math.sin(t * 4))})`}><Wombat t={t} mood="proud" /></g>
              <g transform="translate(-250 60)"><Cube face t={t} s={1.3} /></g>
            </g>
            <g transform={`translate(800 1170) scale(${pop(t, T.only + 1.0, 12, 6)})`}>
              <circle r={56} fill="#3CB371" stroke={INK} strokeWidth={LW} />
              <path d="M -26 0 L -6 22 L 28 -20" stroke="#fff" strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </Layer>
        )}
        {scene === 'only' && <Label x={540} y={640} size={74} s={pop(t, T.only, 12, 6)} color="#fff">THE ONLY ONE</Label>}

        {scene === 'xray' && (() => {
          const xr = prog(t, T.gut, T.gut + 0.4);
          return (
            <g>
              <Layer cam={keys(t, [[T.gut - 0.25, 540, 960, 1], [T.squeeze - 0.3, 600, 1200, 1.3]])}>
                <g transform="translate(500 1240) scale(1.25)"><Wombat t={t} xray={xr} /></g>
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, T.gut, 12, 6)} color="#fff">INSIDE THE GUT</Label>
              <Sticker t={t} t0={T.intestine} x={540} y={1650} text="THE LAST BIT" size={62} fill="#F08A24" />
            </g>
          );
        })()}

        {scene === 'squeeze' && (() => {
          const sq = prog(t, T.dries - 0.2, T.dries + 0.5);
          const slide = prog(t, T.squeeze - 0.2, T.dries + 0.2);
          return (
            <g>
              <g transform="translate(540 1150)"><Gut t={t} sq={sq} slide={slide} /></g>
              <Label x={200} y={880} size={48} s={pop(t, T.squeeze + 0.3, 12, 6)} color="#C9604E">STIFF</Label>
              <Label x={375} y={1430} size={48} s={pop(t, T.squeeze + 0.7, 12, 6)} color="#E77F6A">STRETCHY</Label>
              <Label x={540} y={640} size={84} s={pop(t, T.squeeze, 12, 6)} color="#fff">SQUEEZE!</Label>
              <Sticker t={t} t0={T.dries + 0.4} x={540} y={1650} text="DRIES INTO CORNERS" size={60} fill="#7A4A26" />
            </g>
          );
        })()}

        {scene === 'night' && (() => {
          const n = Math.round(100 * prog(t, T.hundred, T.stacks - 0.6, (u) => u));
          return (
            <g>
              <g transform="translate(250 1000)"><Moon t={t} /></g>
              <Grass y={1600} col="#4E7A42" />
              {Array.from({length: 22}).map((_, i) => {
                const t0 = T.hundred - 0.1 + i * 0.05; const a = t - t0;
                if (a < 0) return null;
                const x = 380 + ((i * 113) % 420), yEnd = 1560 - Math.floor(i / 6) * 70 - (i % 2) * 10;
                const y = Math.min(yEnd, 900 + 4200 * a * a);
                return <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 37) % 30 - 15}) scale(0.8)`}><Cube t={t} face={i % 5 === 0} /></g>;
              })}
              <g transform="translate(820 1180)">
                <rect x={-150} y={-70} width={300} height={140} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text x={0} y={36} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={104} fill={INK}>{n}</text>
              </g>
              <Label x={540} y={640} size={76} s={pop(t, T.hundred, 12, 6)} color="#FFE45C">UP TO 100 A NIGHT</Label>
            </g>
          );
        })()}

        {scene === 'stack' && (() => {
          const placed = (i: number) => prog(t, T.stacks + 0.2 + i * 0.4, T.stacks + 0.5 + i * 0.4);
          const flag = pop(t, T.territory + 0.1, 12, 6);
          return (
            <g>
              <Grass y={1560} />
              <g transform="translate(560 1480)"><Log /></g>
              <g transform="translate(860 1560)"><Rock w={240} /></g>
              {[[420, 1385], [520, 1385], [470, 1305], [860, 1385]].map(([x, y], i) => {
                const u = placed(i);
                if (u <= 0) return null;
                return <g key={i} transform={`translate(${lerp(260, x, u)} ${lerp(1450, y, u) - 120 * Math.sin(Math.PI * u)}) scale(0.9)`}><Cube t={t} face={i === 2} /></g>;
              })}
              <g transform={`translate(${lerp(-200, 170, prog(t, T.stacks - 0.25, T.stacks + 0.3))} 1640) scale(0.7)`}>
                <Wombat t={t} mood={t > T.territory ? 'proud' : 'push'} />
              </g>
              {flag > 0.01 && (
                <g transform={`translate(470 1250) scale(${flag})`}>
                  <path d="M 0 0 L 0 -150" stroke={INK} strokeWidth={10} strokeLinecap="round" />
                  <path d={`M 0 -150 L 110 ${-125 + 8 * Math.sin(t * 6)} L 0 -100 Z`} fill="#E5414A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
                </g>
              )}
              <Label x={540} y={640} size={80} s={pop(t, T.stacks, 12, 6)} color="#fff">STACKED UP</Label>
              <Sticker t={t} t0={T.territory} x={540} y={1760} text="MY TERRITORY!" size={64} fill="#2C7BE5" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="32-wombat-cubes" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
