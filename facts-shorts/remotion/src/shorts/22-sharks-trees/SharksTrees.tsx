import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Cloud, SweatDrop, clamp, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, NoText, wavePath} from '../../lib/short';

// ---------------------------------------------------------------- characters and props
type Mood = 'grin' | 'smug' | 'wow';
const SHARK_BODY = 'M -260 0 C -200 -70 -40 -110 120 -92 C 215 -80 275 -34 288 8 C 262 52 170 82 40 82 C -90 82 -200 50 -260 0 Z';

// cheeky side-view shark facing right; fin = pectoral fin lift (shrug), medal 0..1 drops a #1 medal on
const Shark: React.FC<{t: number; mood?: Mood; col?: string; fin?: number; medal?: number; wink?: boolean; look?: [number, number]}> =
  ({t, mood = 'grin', col = '#7C8C9A', fin = 0, medal = 0, wink, look = [0, 0]}) => {
    const sway = 12 * Math.sin(t * 5);
    const blink = (t % 3.3) > 3.18;
    const m = clamp(medal);
    return (
      <g>
        <g transform={`rotate(${sway} -250 0)`}>
          <path d="M -246 0 C -290 -60 -330 -120 -372 -166 C -352 -96 -344 -44 -330 0 C -344 40 -354 82 -372 124 C -326 90 -288 48 -246 0 Z" fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        </g>
        <path d="M -40 -96 C -10 -150 12 -190 44 -208 C 40 -160 58 -120 92 -88 Z" fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        <path d={SHARK_BODY} fill={col} />
        <path d="M -190 40 C -80 74 120 92 284 14 C 262 52 170 82 40 82 C -70 82 -150 64 -190 40 Z" fill="#F4F6F8" />
        <path d="M -150 -52 C -60 -84 60 -96 150 -82" stroke="#fff" strokeOpacity={0.35} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d={SHARK_BODY} fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        {[70, 94, 118].map((x) => <path key={x} d={`M ${x} -34 q -12 26 0 52`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />)}
        {/* medal on a sash */}
        {m > 0.01 && (
          <g transform={`translate(0 ${-320 * (1 - m)})`} opacity={clamp(m * 4)}>
            <path d="M -40 -96 L 10 -96 L 40 80 L -10 82 Z" fill="#E5414A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <circle cx={14} cy={18} r={54} fill="#FFD84D" stroke={INK} strokeWidth={LW} />
            <circle cx={14} cy={18} r={38} fill="none" stroke="#E0B93A" strokeWidth={6} />
            <Label x={14} y={40} size={56} color="#fff" keep>#1</Label>
          </g>
        )}
        <g transform={`rotate(${-38 * fin} 50 56)`}>
          <path d="M 40 56 L -30 150 Q 34 142 104 70 Z" fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        </g>
        <ellipse cx={240} cy={4} rx={16} ry={9} fill="#F49A9E" opacity={0.75} />
        {/* eye */}
        {wink || blink
          ? <path d="M 168 -32 Q 190 -18 212 -32" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
          : (
            <g>
              <circle cx={190} cy={-34} r={24} fill="#fff" stroke={INK} strokeWidth={6} />
              <circle cx={192 + look[0] * 8} cy={-32 + look[1] * 8} r={11} fill={INK} />
              <circle cx={196 + look[0] * 8} cy={-37 + look[1] * 8} r={3.5} fill="#fff" />
              {mood === 'smug' && <path d="M 165 -34 A 25 25 0 0 1 215 -34 Z" fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />}
            </g>
          )}
        <path d={mood === 'wow' ? 'M 164 -74 Q 190 -88 216 -74' : 'M 162 -72 L 216 -60'} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        {/* mouth */}
        {mood === 'grin' && (
          <g>
            <path d="M 150 22 Q 214 76 282 10 Q 214 34 150 22 Z" fill="#7A1F2B" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 162 + i * 22, y = 25 - i * 2.4;
              return <path key={i} d={`M ${x} ${y} L ${x + 10} ${y + 13} L ${x + 20} ${y - 1} Z`} fill="#fff" stroke={INK} strokeWidth={3} strokeLinejoin="round" />;
            })}
          </g>
        )}
        {mood === 'smug' && <path d="M 158 30 Q 222 46 274 14" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />}
        {mood === 'wow' && <ellipse cx={236} cy={36} rx={16} ry={20} fill={INK} />}
      </g>
    );
  };

// a little sapling with a leafy round head
const Sapling: React.FC<{t: number; scared?: number; sweat?: number}> = ({t, scared = 0, sweat = 0}) => {
  const sw = 5 * Math.sin(t * 2.2) + 6 * scared * Math.sin(t * 30);
  const big = scared > 0.5;
  return (
    <g transform={`rotate(${sw})`}>
      <path d="M 0 0 Q -8 -70 0 -140" stroke={INK} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M 0 0 Q -8 -70 0 -140" stroke="#9A6436" strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d="M -4 -64 C -40 -94 -80 -84 -96 -54 C -60 -38 -24 -44 -4 -64 Z" fill="#7DCB5A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 4 -96 C 40 -126 80 -116 96 -86 C 60 -70 24 -76 4 -96 Z" fill="#7DCB5A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <circle cx={0} cy={-200} r={70} fill="#6DBE4B" stroke={INK} strokeWidth={LW} />
      <path d="M -46 -236 A 56 56 0 0 0 -50 -170" stroke="#9BE07A" strokeWidth={12} fill="none" strokeLinecap="round" />
      {[-22, 22].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={-206} rx={big ? 11 : 8} ry={big ? 15 : 11} fill={INK} />
          <circle cx={x + 3} cy={-211} r={3} fill="#fff" />
        </g>
      ))}
      {big
        ? <path d="M -20 -172 q 7 -7 13 0 q 7 7 13 0 q 7 -7 13 0" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        : <path d="M -18 -178 Q 0 -162 18 -178" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
      {sweat > 0 && <SweatDrop x={54} y={-252 + 40 * sweat} s={0.6} />}
    </g>
  );
};

// the first real tree: tall trunk, puffy canopy, friendly face
const OldTree: React.FC<{t: number}> = ({t}) => {
  const c = [[-90, -330, 90], [0, -392, 104], [90, -330, 90], [-52, -262, 80], [52, -262, 80]];
  return (
    <g transform={`rotate(${2 * Math.sin(t * 1.5)})`}>
      <path d="M -44 0 C -30 -100 -26 -200 -22 -280 L 22 -280 C 26 -200 30 -100 44 0 Z" fill="#8A5A30" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -8 -40 L -6 -160 M 12 -90 L 10 -200" stroke="#6B4424" strokeWidth={6} strokeLinecap="round" />
      {c.map(([x, y, r], i) => <circle key={'o' + i} cx={x} cy={y} r={r + LW / 2 + 1} fill={INK} />)}
      {c.map(([x, y, r], i) => <circle key={'f' + i} cx={x} cy={y} r={r - LW / 2 + 1} fill="#3E9A4A" />)}
      <circle cx={-40} cy={-420} r={26} fill="#62C36A" />
      <circle cx={-110} cy={-350} r={18} fill="#62C36A" />
      <ellipse cx={-30} cy={-334} rx={10} ry={13} fill={INK} /><ellipse cx={30} cy={-334} rx={10} ry={13} fill={INK} />
      <path d="M -26 -298 Q 0 -276 26 -298" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
  );
};

// long-necked dinosaur facing left; scared 0/1, down 0..1 = tipped over with X eyes
const Dino: React.FC<{t: number; scared?: boolean; down?: number}> = ({t, scared, down = 0}) => {
  const out = down > 0.5;
  return (
    <g transform={`rotate(${78 * down} 120 0)`}>
      <path d="M 110 -110 C 200 -100 262 -60 304 -14" stroke={INK} strokeWidth={46} fill="none" strokeLinecap="round" />
      <path d="M 110 -110 C 200 -100 262 -60 304 -14" stroke="#6FBF5A" strokeWidth={30} fill="none" strokeLinecap="round" />
      {[-90, -40, 40, 90].map((x) => <rect key={x} x={x - 22} y={-100} width={44} height={100} rx={14} fill="#5DAA4A" stroke={INK} strokeWidth={LW} />)}
      <ellipse cx={0} cy={-120} rx={136} ry={80} fill="#6FBF5A" stroke={INK} strokeWidth={LW} />
      {[[-40, -150, 16], [20, -170, 12], [60, -130, 14]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#4E9A3E" />)}
      <path d={`M -80 -150 C -140 -230 -150 -330 ${-132 + 6 * Math.sin(t * 3)} -380`} stroke={INK} strokeWidth={56} fill="none" strokeLinecap="round" />
      <path d={`M -80 -150 C -140 -230 -150 -330 ${-132 + 6 * Math.sin(t * 3)} -380`} stroke="#6FBF5A" strokeWidth={40} fill="none" strokeLinecap="round" />
      <g transform={`translate(${-150 + 6 * Math.sin(t * 3)} -396)`}>
        <ellipse cx={0} cy={0} rx={56} ry={34} fill="#6FBF5A" stroke={INK} strokeWidth={LW} />
        {out
          ? <path d="M -24 -16 l 16 16 M -8 -16 l -16 16" stroke={INK} strokeWidth={6} strokeLinecap="round" />
          : scared
            ? <g><circle cx={-14} cy={-10} r={15} fill="#fff" stroke={INK} strokeWidth={5} /><circle cx={-18} cy={-16} r={6} fill={INK} /></g>
            : <circle cx={-14} cy={-8} r={7} fill={INK} />}
        {scared && !out ? <ellipse cx={-34} cy={14} rx={9} ry={7} fill={INK} /> : <path d="M -46 12 Q -30 20 -14 14" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />}
      </g>
    </g>
  );
};

// meteor travelling along +x with a flame tail behind it
const Meteor: React.FC<{t: number}> = ({t}) => (
  <g>
    <path d={`M -20 -64 L ${-340 - 20 * Math.sin(t * 20)} -24 L -270 0 L ${-380 - 20 * Math.sin(t * 17)} 30 L -20 64 Z`} fill="#FF8A3D" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -20 -32 L -220 -6 L -200 6 L -240 18 L -20 34 Z" fill="#FFE45C" />
    <circle r={72} fill="#8C7B6B" stroke={INK} strokeWidth={LW} />
    <circle cx={-26} cy={30} r={14} fill="#6F6152" /><circle cx={30} cy={-34} r={10} fill="#6F6152" />
    <path d="M 4 -22 L 30 -12 M 4 18 L 30 8" stroke={INK} strokeWidth={6} strokeLinecap="round" />
    <circle cx={22} cy={-6} r={6} fill={INK} /><circle cx={22} cy={14} r={6} fill={INK} />
  </g>
);

// a disaster bubble: 0 volcano, 1 ice, 2 skull
const Hazard: React.FC<{kind: number}> = ({kind}) => (
  <g>
    <circle r={78} fill="#fff" fillOpacity={0.85} stroke={INK} strokeWidth={7} />
    {kind === 0 && (
      <g>
        <circle cx={-6} cy={-50} r={14} fill="#9AA3AD" /><circle cx={12} cy={-62} r={11} fill="#9AA3AD" />
        <path d="M -50 40 L -14 -26 L 14 -26 L 50 40 Z" fill="#8A5A30" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -14 -26 L -4 -6 L 4 -14 L 14 -26 Z" fill="#FF6A3D" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>
    )}
    {kind === 1 && (
      <g>
        {[0, 60, 120].map((a) => <path key={a} transform={`rotate(${a})`} d="M 0 -48 L 0 48" stroke={INK} strokeWidth={18} strokeLinecap="round" />)}
        {[0, 60, 120].map((a) => <path key={'c' + a} transform={`rotate(${a})`} d="M 0 -48 L 0 48" stroke="#7FD3FF" strokeWidth={8} strokeLinecap="round" />)}
      </g>
    )}
    {kind === 2 && (
      <g>
        <rect x={-22} y={10} width={44} height={30} rx={6} fill="#fff" stroke={INK} strokeWidth={6} />
        <circle cx={0} cy={-10} r={38} fill="#fff" stroke={INK} strokeWidth={6} />
        <circle cx={-15} cy={-10} r={10} fill={INK} /><circle cx={15} cy={-10} r={10} fill={INK} />
        <path d="M -8 30 L -8 40 M 8 30 L 8 40" stroke={INK} strokeWidth={4} />
      </g>
    )}
  </g>
);

const Pin: React.FC<{k: number; col: string}> = ({k, col}) => (k <= 0.01 ? null : (
  <g transform={`translate(0 ${-280 * (1 - k)})`}>
    <path d="M 0 0 C -12 -30 -46 -56 -46 -96 A 46 46 0 1 1 46 -96 C 46 -56 12 -30 0 0 Z" fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <circle cx={0} cy={-96} r={17} fill="#fff" stroke={INK} strokeWidth={5} />
  </g>
));

// two-line caption sign (big number line + small line), pops in at t0, out at t1
const Plaque: React.FC<{t: number; t0: number; t1?: number; x: number; y: number; l1: string; l2: string; fill: string; rot?: number}> =
  ({t, t0, t1 = 1e9, x, y, l1, l2, fill, rot = -3}) => {
    const k = pop(t, t0, 12, 6) * (1 - clamp((t - t1) / 0.2));
    if (React.useContext(NoText) || k <= 0.01) return null;
    const w = Math.max(l1.length * 80 * 0.56, l2.length * 56 * 0.56) + 90;
    return (
      <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
        <rect x={-w / 2} y={-92} width={w} height={180} rx={26} fill={fill} stroke={INK} strokeWidth={9} />
        <Label x={0} y={-6} size={80}>{l1}</Label>
        <Label x={0} y={62} size={56} color="#FFE45C">{l2}</Label>
      </g>
    );
  };

const Seaweed: React.FC<{t: number; h: number; ph: number}> = ({t, h, ph}) => {
  const s = 18 * Math.sin(t * 1.8 + ph);
  const d = `M 0 0 Q ${s} ${-h * 0.33} 0 ${-h * 0.5} Q ${-s} ${-h * 0.75} ${s * 0.6} ${-h}`;
  return <g><path d={d} stroke={INK} strokeWidth={30} fill="none" strokeLinecap="round" /><path d={d} stroke="#4E9A3E" strokeWidth={16} fill="none" strokeLinecap="round" /></g>;
};

const maX = (ma: number) => 300 + (450 - ma) * 20; // timeline: world x of "ma million years ago"

export const SharksTrees: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const M0 = lerp(T.extinction, T.dinosaurs, 0.55); // meteor scene starts on "the one that wiped out"
  const scene = t < T.swimming - 0.25 ? 'vs' : t < T.survived - 0.25 ? 'time' : t < M0 ? 'extinct' : t < T.first - 0.25 ? 'meteor' : 'champ';
  const midVs = lerp(T.older, T.swimming, 0.5);
  const pA = lerp(T.swimming, T.trees, 0.2), pB = T.trees + 0.15, pC = lerp(T.gap, T.survived, 0.42);
  const popAt = (i: number) => T.extinction + 1.6 + i * 0.35;
  const cues: Cue[] = [
    {f: 'splash', at: 0.15, db: -22}, {f: 'ding', at: T.older, db: -20}, {f: 'boing', at: midVs, db: -22},
    {f: 'whoosh', at: T.swimming - 0.25, db: -24}, {f: 'plop', at: pA, db: -20},
    {f: 'whoosh', at: T.trees - 0.6, db: -24}, {f: 'rise', at: T.trees - 0.1, db: -22},
    {f: 'tick', at: T.gap, db: -20},
    {f: 'whoosh', at: T.survived - 0.25, db: -24}, {f: 'pop', at: popAt(0), db: -20},
    {f: 'rumble', at: T.dinosaurs - 0.6, db: -20}, {f: 'crack', at: T.dinosaurs, db: -18},
    {f: 'splash', at: T.first - 0.15, db: -20}, {f: 'ding', at: T.still, db: -18},
  ];
  const [shx, shy] = scene === 'meteor' ? shake(t, 22 * clamp(1 - Math.abs(t - T.dinosaurs - 0.2) * 2)) : [0, 0];
  const flash = scene === 'meteor' ? 0.75 * clamp(1 - Math.abs(t - T.dinosaurs) * 5) : 0;
  return (
    <AbsoluteFill style={{background: '#7FCBFF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="sky22a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6FC3FF" /><stop offset="1" stopColor="#D4F1FF" /></linearGradient>
          <linearGradient id="sky22b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B2A6A" /><stop offset="1" stopColor="#8C6BB8" /></linearGradient>
          <linearGradient id="sky22c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F2683D" /><stop offset="1" stopColor="#FFD08A" /></linearGradient>
        </defs>
        <rect width={W} height={H} fill={scene === 'extinct' ? 'url(#sky22b)' : scene === 'meteor' ? 'url(#sky22c)' : 'url(#sky22a)'} />
        <g transform={`translate(${shx} ${shy})`}>
          {scene === 'vs' && (
            <g>
              <Layer cam={keys(t, [[0, 540, 1020, 1.12], [T.older, 540, 1000, 1.0], [T.swimming, 560, 990, 1.05]])}>
                <g transform={`translate(${200 + t * 14} 830)`}><Cloud s={0.8} /></g>
                <path d="M 600 1200 Q 840 1036 1180 1120 L 1180 1320 L 600 1320 Z" fill="#F2D38B" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <path d="M 700 1150 Q 840 1090 980 1110" stroke="#FFE7AE" strokeWidth={12} fill="none" strokeLinecap="round" />
                <g transform={`translate(845 1102) scale(${pop(t, 0.45, 10, 6)}) translate(0 ${-50 * Math.max(0, Math.sin(clamp((t - T.older) / 0.35) * Math.PI))})`}>
                  <Sapling t={t} scared={t > T.older ? 1 : 0} sweat={t > midVs ? clamp((t - midVs) / 1.2) : 0} />
                </g>
                <path d={wavePath(t, 1170, 24, 150, 2.2)} fill="#3D8CF0" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(360 ${1128 + 10 * Math.sin(t * 2) - 90 * Math.max(0, Math.sin(clamp((t - midVs) / 0.5) * Math.PI))}) scale(${0.95 * pop(t, 0.12, 10, 6)})`}>
                  <Shark t={t} mood={t > T.older ? 'smug' : 'grin'} look={[1, 0]} />
                </g>
                <path d={wavePath(t + 0.7, 1215, 20, 130, 2.6)} fill="#2C7BE5" stroke={INK} strokeWidth={LW} />
              </Layer>
              <Label x={540} y={630} size={68} s={pop(t, T.older, 12, 6)} color="#FFE45C">OLDER THAN TREES</Label>
              <Sticker t={t} t0={T.older + 1.1} x={540} y={1500} text="SHARKS CAME FIRST" size={64} fill="#E5414A" />
            </g>
          )}
          {scene === 'time' && (
            <g>
              <Layer cam={keys(t, [[T.swimming - 0.25, 380, 1000, 1.0], [T.trees - 0.7, 470, 1000, 1.0], [T.trees - 0.1, 1550, 1000, 1.0], [T.gap - 0.5, 1610, 1060, 1.1], [T.gap + 0.2, 950, 1250, 0.62], [T.survived, 950, 1250, 0.6]])}>
                <path d={wavePath(t, 950, 22, 150, 2, -1500, 1300)} fill="#3D8CF0" stroke={INK} strokeWidth={LW} />
                {[[-60, 220, 0], [130, 160, 1.3], [640, 240, 2.1], [900, 180, 3]].map(([x, h, ph], i) => <g key={i} transform={`translate(${x} 1580)`}><Seaweed t={t} h={h} ph={ph} /></g>)}
                <g transform={`translate(${lerp(-350, 450, prog(t, T.swimming - 0.2, T.swimming + 1.1))} ${1300 + 14 * Math.sin(t * 2.4)}) scale(0.55)`}>
                  <Shark t={t} col="#6E8C7C" mood={t > T.gap ? 'smug' : 'grin'} />
                </g>
                {[0, 1, 2, 3].map((i) => {
                  const u = ((t * 0.6 + i * 0.25) % 1);
                  return <circle key={i} cx={620 + 14 * Math.sin(t * 3 + i)} cy={1240 - 260 * u} r={8 + i * 2} fill="#BFE6FF" stroke={INK} strokeWidth={4} opacity={(1 - u) * prog(t, T.swimming + 0.8, T.swimming + 1.2)} />;
                })}
                <path d="M 1100 1600 L 1100 1400 C 1150 1260 1200 1200 1300 1200 L 3400 1200 L 3400 1600 Z" fill="#8BC34A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <path d="M 1100 1600 L 1110 1380 C 1160 1300 1200 1270 1300 1270 L 3400 1270 L 3400 1600 Z" fill="#7A5432" />
                {[1350, 1900, 2150].map((x, i) => (
                  <g key={x} transform={`translate(${x} 1204) scale(${pop(t, T.trees + 0.3 + i * 0.2, 10, 6)})`}>
                    <path d="M 0 0 Q -30 -50 -60 -60 M 0 0 Q 0 -60 10 -80 M 0 0 Q 30 -40 60 -50" stroke={INK} strokeWidth={16} fill="none" strokeLinecap="round" />
                    <path d="M 0 0 Q -30 -50 -60 -60 M 0 0 Q 0 -60 10 -80 M 0 0 Q 30 -40 60 -50" stroke="#5DAA4A" strokeWidth={7} fill="none" strokeLinecap="round" />
                  </g>
                ))}
                <g transform={`translate(1650 1206) scale(${0.75 * pop(t, T.trees - 0.1, 9, 5)})`}><OldTree t={t} /></g>
                {[0, 1, 2, 3, 4].map((i) => {
                  const u = ((t - T.trees - 0.6 + i * 0.55) / 2.6) % 1;
                  const vis = t > T.trees + 0.6 - i * 0.55 + 0.01 && t < T.gap - 0.3 ? 1 : 0;
                  return <ellipse key={'lf' + i} cx={1560 + i * 45 + 60 * Math.sin(u * 7 + i)} cy={930 + 270 * Math.max(0, u)} rx={16} ry={9} transform={`rotate(${40 * Math.sin(u * 6 + i)} ${1560 + i * 45} ${930 + 270 * Math.max(0, u)})`} fill="#62C36A" stroke={INK} strokeWidth={4} opacity={vis * Math.min(1, (1 - u) * 4)} />;
                })}
                {/* timeline ruler */}
                <rect x={-1500} y={1580} width={5000} height={1800} fill="#5A3E26" />
                <rect x={-800} y={1580} width={3600} height={100} fill="#F4D35E" stroke={INK} strokeWidth={LW} />
                {Array.from({length: 33}).map((_, i) => {
                  const ma = 500 - i * 5, x = maX(ma);
                  return <path key={i} d={`M ${x} 1584 L ${x} ${1584 + (ma % 10 === 0 ? 50 : 28)}`} stroke={INK} strokeWidth={6} />;
                })}
                <g transform={`translate(${maX(450)} 1580)`}><Pin k={pop(t, pA, 10, 6)} col="#2C7BE5" /></g>
                <g transform={`translate(${maX(385)} 1580)`}><Pin k={pop(t, pB, 10, 6)} col="#3E9A4A" /></g>
                <Label x={maX(450)} y={1764} size={64} s={pop(t, pA + 0.15, 12, 6)} color="#7FD3FF">450</Label>
                <Label x={maX(385)} y={1764} size={64} s={pop(t, pB + 0.15, 12, 6)} color="#9BE07A">385</Label>
                <path d={`M ${maX(450)} 1800 L ${maX(450)} 1850 L ${maX(385)} 1850 L ${maX(385)} 1800 M ${(maX(450) + maX(385)) / 2} 1850 L ${(maX(450) + maX(385)) / 2} 1900`} pathLength={1} strokeDasharray={`${prog(t, T.gap, T.gap + 0.8)} 1`} stroke={INK} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d={`M ${maX(450)} 1800 L ${maX(450)} 1850 L ${maX(385)} 1850 L ${maX(385)} 1800 M ${(maX(450) + maX(385)) / 2} 1850 L ${(maX(450) + maX(385)) / 2} 1900`} pathLength={1} strokeDasharray={`${prog(t, T.gap, T.gap + 0.8)} 1`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </Layer>
              <Plaque t={t} t0={pA} t1={T.trees - 0.6} x={540} y={640} l1="450 MILLION" l2="YEARS AGO" fill="#2C7BE5" />
              <Plaque t={t} t0={pB} t1={T.gap - 0.4} x={540} y={640} l1="385 MILLION" l2="YEARS AGO" fill="#3E9A4A" rot={3} />
              <Label x={540} y={640} size={84} s={pop(t, T.gap, 12, 6)} color="#FFE45C">A HUGE GAP</Label>
              <Plaque t={t} t0={pC} x={540} y={1540} l1="60+ MILLION" l2="YEARS" fill="#E5414A" />
            </g>
          )}
          {scene === 'extinct' && (
            <g>
              <Layer cam={keys(t, [[T.survived - 0.25, 540, 1000, 1.08], [T.extinction, 540, 980, 1.0], [M0, 540, 960, 0.96]])}>
                {Array.from({length: 24}).map((_, i) => <circle key={i} cx={(i * 211) % W} cy={500 + ((i * 137) % 500)} r={3 + (i % 3)} fill="#fff" opacity={0.3 + 0.3 * Math.abs(Math.sin(t * 1.5 + i))} />)}
                <path d={wavePath(t, 1180, 24, 150, 2.2)} fill="#2E6FC2" stroke={INK} strokeWidth={LW} />
                {[0, 1, 2].map((i) => {
                  const k = pop(t, T.extinction + i * 0.45, 10, 6);
                  const gone = t > popAt(i);
                  const x = [250, 540, 830][i], y = [930, 840, 930][i] + 12 * Math.sin(t * 2 + i);
                  if (gone) {
                    const u = clamp((t - popAt(i)) / 0.35);
                    return u < 1 ? <g key={i} transform={`translate(${x} ${y})`} opacity={1 - u}>{Array.from({length: 8}).map((_, j) => <path key={j} transform={`rotate(${j * 45})`} d={`M 0 ${-60 - 70 * u} L 0 ${-100 - 70 * u}`} stroke="#fff" strokeWidth={10} strokeLinecap="round" />)}</g> : null;
                  }
                  return <g key={i} transform={`translate(${x} ${y}) scale(${k})`}><Hazard kind={i} /></g>;
                })}
                <g transform={`translate(540 ${1150 + 10 * Math.sin(t * 2)}) scale(${pop(t, T.survived - 0.2, 10, 6)}) rotate(${-6 * Math.sin(clamp((t - popAt(0)) / 1.1) * Math.PI * 3)})`}>
                  <Shark t={t} mood={t > T.extinction ? 'smug' : 'grin'} look={[0, -1]} fin={t > popAt(0) ? 0.5 + 0.5 * Math.sin(t * 9) : 0} />
                </g>
                <path d={wavePath(t + 0.6, 1290, 20, 130, 2.6)} fill="#2C7BE5" stroke={INK} strokeWidth={LW} />
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.survived, 12, 6)} color="#FFE45C">SHARKS SURVIVED</Label>
              <Sticker t={t} t0={T.extinction + 0.2} x={540} y={1640} text="EVERY EXTINCTION" size={64} fill="#E5414A" />
            </g>
          )}
          {scene === 'meteor' && (
            <g>
              {(() => {
                const u = prog(t, M0 + 0.1, T.dinosaurs, (x) => x * x);
                const mx = lerp(180, 960, u), my = lerp(220, 1120, u);
                return t < T.dinosaurs ? <g transform={`translate(${mx} ${my}) rotate(49) scale(0.9)`}><Meteor t={t} /></g> : null;
              })()}
              {t >= T.dinosaurs && (() => {
                const k = pop(t, T.dinosaurs, 8, 4), fade = 1 - prog(t, T.dinosaurs + 0.6, T.first - 0.25);
                const pts = Array.from({length: 28}).map((_, i) => { const a = (i / 28) * Math.PI * 2, r = i % 2 ? 150 : 270; return `${Math.cos(a) * r} ${Math.sin(a) * r * 0.8}`; }).join(' L ');
                return (
                  <g transform={`translate(960 1160) scale(${k})`} opacity={0.3 + 0.7 * fade}>
                    {[0, 1, 2].map((i) => <circle key={i} cx={-120 + i * 120} cy={-140 - 40 * prog(t, T.dinosaurs, T.first)} r={110 + 30 * prog(t, T.dinosaurs, T.first)} fill="#9AA3AD" stroke={INK} strokeWidth={LW} />)}
                    <path d={`M ${pts} Z`} fill="#FFB938" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                    <circle r={110} fill="#FFE45C" />
                  </g>
                );
              })()}
              <path d={wavePath(t, 1200, 22, 150, 2.2)} fill="#3D8CF0" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(300 ${1180 + 10 * Math.sin(t * 2)}) scale(0.8)`}>
                <Shark t={t} mood={t > T.dinosaurs + 0.3 ? 'smug' : 'wow'} look={[1, -1]} fin={t > T.dinosaurs + 0.3 ? 0.5 + 0.5 * Math.sin((t - T.dinosaurs) * 6) : 0} />
              </g>
              <path d={wavePath(t + 0.5, 1290, 20, 130, 2.6, -1400, 600)} fill="#2C7BE5" stroke={INK} strokeWidth={LW} />
              <path d="M 560 1920 L 560 1320 C 600 1230 650 1190 720 1180 L 1200 1180 L 1200 1920 Z" fill="#C9A86A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
              <path d="M 640 1300 Q 760 1240 1100 1250" stroke="#B39460" strokeWidth={14} fill="none" strokeLinecap="round" />
              <g transform={`translate(820 1186) scale(0.8)`}><Dino t={t} scared={t > M0 + 0.3} down={prog(t, T.dinosaurs + 0.15, T.dinosaurs + 0.6)} /></g>
              <Label x={540} y={640} size={64} s={pop(t, T.dinosaurs + 0.35, 12, 6)} color="#fff">EVEN THE DINO ONE</Label>
              <rect width={W} height={H} fill="#fff" opacity={flash} />
            </g>
          )}
          {scene === 'champ' && (
            <g>
              <Layer cam={keys(t, [[T.first - 0.25, 540, 1060, 1.12], [T.first + 0.4, 540, 1000, 1.0], [T.card, 540, 990, 1.04]])}>
                <g transform={`translate(540 1120) rotate(${t * 8})`}>
                  {Array.from({length: 14}).map((_, i) => <path key={i} transform={`rotate(${i * (360 / 14)})`} d="M 0 0 L 70 -1300 L -70 -1300 Z" fill="#9FDBFF" />)}
                </g>
                <path d={wavePath(t, 1230, 24, 150, 2.2)} fill="#3D8CF0" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(540 ${lerp(1450, 1130, prog(t, T.first - 0.25, T.first + 0.15, (x) => 1 - Math.pow(1 - x, 2))) + 10 * Math.sin(t * 2.2)}) scale(1.1)`}>
                  <Shark t={t} mood="grin" medal={pop(t, T.first + 0.15, 10, 6)} wink={t > T.still && t < T.still + 0.5} look={[0.6, 0.4]} />
                </g>
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const u = clamp((t - T.first + 0.1) / 0.8); const a = -Math.PI / 2 + (i - 2.5) * 0.4;
                  return u > 0 && u < 1 ? <circle key={i} cx={540 + Math.cos(a) * 380 * u} cy={1220 + Math.sin(a) * 300 * u + 400 * u * u} r={18 * (1 - u) + 6} fill="#BFE6FF" stroke={INK} strokeWidth={5} /> : null;
                })}
                <path d={wavePath(t + 0.6, 1300, 20, 130, 2.6)} fill="#2C7BE5" stroke={INK} strokeWidth={LW} />
              </Layer>
              {Array.from({length: 26}).map((_, i) => {
                let x = (i * 137 + 40) % 1080; if (x > 790 && x < 1000) x -= 260;
                const y = -40 + (t - T.first - 0.2 - (i % 5) * 0.08) * (520 + (i % 4) * 90);
                return t > T.first + 0.2 && y < 1950 ? <rect key={i} x={x} y={y} width={22} height={34} rx={4} fill={['#E5414A', '#FFE45C', '#5B3A8C', '#3E9A4A'][i % 4]} stroke={INK} strokeWidth={4} transform={`rotate(${(i * 47 + t * 200) % 360} ${x + 11} ${y + 17})`} /> : null;
              })}
              <Label x={540} y={640} size={84} s={pop(t, T.first, 12, 6)} color="#FFE45C">HERE FIRST</Label>
              <Sticker t={t} t0={T.first + 0.5} x={540} y={1660} text="AND STILL HERE" size={72} fill="#2C7BE5" />
            </g>
          )}
        </g>
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="22-sharks-trees" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
