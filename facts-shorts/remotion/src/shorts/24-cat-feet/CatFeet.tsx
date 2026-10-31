import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, clamp, lerp, prog, pop, Cloud} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue} from '../../lib/short';

type Pal = {col: string; stripe: string; belly: string; ink: string; pink: string};
const TABBY: Pal = {col: '#F39A3C', stripe: '#D2702A', belly: '#FFE3B8', ink: INK, pink: '#F59AAE'};
const KITTEN: Pal = {col: '#A9B3BF', stripe: '#7C8794', belly: '#EEF1F4', ink: INK, pink: '#F59AAE'};
const XRAY: Pal = {col: '#24557A', stripe: '#2B6690', belly: '#2F6E98', ink: '#9FE7FF', pink: '#4B8DB8'};
type Expr = 'worried' | 'shock' | 'calm' | 'happy';

const Leg: React.FC<{x: number; y: number; ang: number; len: number; c: string; ink: string; paw: string}> = ({x, y, ang, len, c, ink, paw}) => {
  const ex = x + Math.sin((ang * Math.PI) / 180) * len, ey = y + Math.cos((ang * Math.PI) / 180) * len;
  const d = `M ${x} ${y} L ${ex} ${ey}`;
  return (
    <g>
      <path d={d} stroke={ink} strokeWidth={36} strokeLinecap="round" />
      <path d={d} stroke={c} strokeWidth={20} strokeLinecap="round" />
      <ellipse cx={ex} cy={ey} rx={17} ry={13} fill={paw} stroke={ink} strokeWidth={6} />
    </g>
  );
};

// side-view cat facing +x, waist at (0,0). up* = 0 upside down -> 1 upright (roll about the long axis)
const Cat: React.FC<{t: number; upF?: number; upB?: number; arch?: number; spread?: number; expr?: Expr; pal?: Pal; seam?: boolean}> =
  ({t, upF = 1, upB = 1, arch = 0, spread = 0, expr = 'calm', pal = TABBY, seam}) => {
    const {col, stripe, belly, ink, pink} = pal;
    const syF = -Math.cos(upF * Math.PI), syB = -Math.cos(upB * Math.PI);
    const fa = lerp(18, 58, spread), ba = lerp(-18, -58, spread), ln = lerp(62, 86, spread);
    const blink = (t % 3.3) < 0.12;
    const tailW = 14 * Math.sin(t * 3);
    const E = [[166, -62], [200, -60]];
    let eyes: React.ReactNode, mouth: React.ReactNode;
    if (expr === 'happy') {
      eyes = E.map(([x, y], i) => <path key={i} d={`M ${x - 11} ${y + 4} Q ${x} ${y - 10} ${x + 11} ${y + 4}`} stroke={ink} strokeWidth={6} fill="none" strokeLinecap="round" />);
      mouth = <path d="M 204 -30 Q 214 -14 226 -30 Z" fill={ink} />;
    } else {
      const r = expr === 'shock' ? 15 : expr === 'worried' ? 13 : 11;
      eyes = E.map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={r} ry={blink ? 1.5 : expr === 'calm' ? r * 0.7 : r * 1.15} fill="#fff" stroke={ink} strokeWidth={5} />
          {!blink && <circle cx={x + 3} cy={y} r={expr === 'shock' ? 5 : 7} fill={ink} />}
        </g>
      ));
      mouth = expr === 'shock' ? <ellipse cx={214} cy={-24} rx={8} ry={10} fill={ink} />
        : expr === 'worried' ? <path d={`M 200 ${-26 + Math.sin(t * 16) * 2} q 6 -6 12 0 q 6 6 12 0`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />
        : <path d="M 204 -28 Q 212 -20 218 -28 Q 224 -20 232 -28" stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />;
    }
    return (
      <g>
        {/* back half */}
        <g transform={`rotate(${-arch}) scale(1 ${syB})`}>
          <path d={`M -132 -8 Q -205 ${-20 + tailW} -192 ${-110 + tailW}`} stroke={ink} strokeWidth={32} fill="none" strokeLinecap="round" />
          <path d={`M -132 -8 Q -205 ${-20 + tailW} -192 ${-110 + tailW}`} stroke={col} strokeWidth={17} fill="none" strokeLinecap="round" />
          <Leg x={-62} y={30} ang={ba + 8} len={ln} c={stripe} ink={ink} paw={belly} />
          <Leg x={-98} y={30} ang={ba} len={ln} c={col} ink={ink} paw={belly} />
          <path d="M 2 -48 L -90 -45 Q -140 -42 -140 0 Q -140 42 -90 45 L 2 46" fill={col} stroke={ink} strokeWidth={LW} strokeLinejoin="round" />
          <ellipse cx={-55} cy={30} rx={55} ry={12} fill={belly} />
          {[-40, -75, -108].map((x) => <path key={x} d={`M ${x} -44 Q ${x - 8} -22 ${x + 2} -8`} stroke={stripe} strokeWidth={9} fill="none" strokeLinecap="round" />)}
        </g>
        {/* front half */}
        <g transform={`rotate(${arch}) scale(1 ${syF})`}>
          <Leg x={58} y={30} ang={fa - 8} len={ln} c={stripe} ink={ink} paw={belly} />
          <Leg x={96} y={30} ang={fa} len={ln} c={col} ink={ink} paw={belly} />
          <path d="M -2 -48 L 90 -50 Q 132 -48 134 -5 Q 132 40 90 46 L -2 46" fill={col} stroke={ink} strokeWidth={LW} strokeLinejoin="round" />
          <ellipse cx={55} cy={30} rx={55} ry={12} fill={belly} />
          {[30, 62].map((x) => <path key={x} d={`M ${x} -48 Q ${x + 8} -24 ${x - 2} -8`} stroke={stripe} strokeWidth={9} fill="none" strokeLinecap="round" />)}
          {/* head */}
          <path d="M 128 -82 L 140 -142 L 172 -100 Z" fill={col} stroke={ink} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 178 -100 L 210 -140 L 218 -86 Z" fill={col} stroke={ink} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 140 -92 L 144 -124 L 160 -102 Z" fill={pink} />
          <path d="M 190 -100 L 206 -122 L 208 -94 Z" fill={pink} />
          <ellipse cx={180} cy={-52} rx={66} ry={58} fill={col} stroke={ink} strokeWidth={LW} />
          <ellipse cx={208} cy={-30} rx={30} ry={18} fill={belly} />
          {[150, 172].map((x) => <path key={x} d={`M ${x} -108 L ${x + 4} -88`} stroke={stripe} strokeWidth={8} strokeLinecap="round" />)}
          {eyes}
          <path d="M 222 -44 L 236 -44 L 229 -35 Z" fill={pink} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
          {mouth}
          {[-6, 4].map((o) => <path key={o} d={`M 232 ${-34 + o} L 268 ${-40 + o * 3}`} stroke={ink} strokeWidth={3} strokeLinecap="round" />)}
          {[-6, 4].map((o) => <path key={'l' + o} d={`M 196 ${-34 + o} L 160 ${-40 + o * 3}`} stroke={ink} strokeWidth={3} strokeLinecap="round" opacity={0.6} />)}
        </g>
        {seam && <path d="M 0 -64 L 0 62" stroke="#FFE45C" strokeWidth={7} strokeDasharray="12 10" strokeLinecap="round" />}
      </g>
    );
  };

const SpeedLines: React.FC<{t: number; v: number}> = ({t, v}) => (
  <g>
    {Array.from({length: 16}).map((_, i) => {
      const x = (i * 157 + 40) % W, y = ((((i * 263 - t * v) % 2400) + 2400) % 2400) - 240;
      return <path key={i} d={`M ${x} ${y} L ${x} ${y + 150 + (i % 3) * 60}`} stroke="#fff" strokeWidth={10 + (i % 2) * 6} strokeLinecap="round" opacity={0.55} />;
    })}
  </g>
);

const Clouds: React.FC<{t: number; v: number}> = ({t, v}) => (
  <g>
    {[[160, 0.7], [900, 1.0], [420, 0.55]].map(([x, s], i) => {
      const y = ((((i * 900 - t * v * 0.6) % 2600) + 2600) % 2600) - 300;
      return <g key={i} transform={`translate(${x} ${y})`} opacity={0.9 * clamp(Math.abs(y - 640) / 260 - 0.35)}><Cloud s={s} /></g>;
    })}
  </g>
);

// big front-facing cat head for the inner-ear close-up
const CatFace: React.FC<{t: number; look: number}> = ({t, look}) => {
  const blink = (t % 2.9) < 0.12;
  return (
    <g>
      <path d="M -210 -60 L -180 -300 L -60 -190 Z" fill={TABBY.col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M 210 -60 L 180 -300 L 60 -190 Z" fill={TABBY.col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -180 -100 L -168 -250 L -95 -185 Z" fill={TABBY.pink} />
      <path d="M 180 -100 L 168 -250 L 95 -185 Z" fill={TABBY.pink} />
      <ellipse cx={0} cy={0} rx={235} ry={205} fill={TABBY.col} stroke={INK} strokeWidth={LW} />
      {[-50, 0, 50].map((x) => <path key={x} d={`M ${x} -200 L ${x * 0.8} -150`} stroke={TABBY.stripe} strokeWidth={14} strokeLinecap="round" />)}
      <ellipse cx={0} cy={80} rx={110} ry={70} fill={TABBY.belly} />
      {[-90, 90].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={-20} rx={40} ry={blink ? 3 : 46} fill="#fff" stroke={INK} strokeWidth={7} />
          {!blink && <ellipse cx={x + look * 0.3} cy={-20 - look} rx={16} ry={26} fill="#3B9B4A" stroke={INK} strokeWidth={5} />}
          {!blink && <ellipse cx={x + look * 0.3} cy={-20 - look} rx={7} ry={18} fill={INK} />}
        </g>
      ))}
      <path d="M -22 40 L 22 40 L 0 64 Z" fill={TABBY.pink} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -40 84 Q -20 104 0 82 Q 20 104 40 84" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      {[-1, 1].map((sx) => [0, 1, 2].map((k) => <path key={`${sx}${k}`} d={`M ${sx * 70} ${70 + k * 18} L ${sx * 220} ${50 + k * 34}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />))}
    </g>
  );
};

const Arrow: React.FC<{d: string; o: number; c?: string}> = ({d, o, c = '#FFE45C'}) => (o <= 0.01 ? null : (
  <g opacity={o}>
    <defs><marker id={`ah${c.slice(1)}`} viewBox="0 0 10 10" refX={5} refY={5} markerWidth={4} markerHeight={4} orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 Z" fill={c} stroke={INK} strokeWidth={1.5} /></marker></defs>
    <path d={d} stroke={INK} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d={d} stroke={c} strokeWidth={11} fill="none" strokeLinecap="round" markerEnd={`url(#ah${c.slice(1)})`} />
  </g>
));

// a small bone shape (collarbone)
const Bone: React.FC<{c?: string}> = ({c = '#FFF6E0'}) => (
  <g>
    <path d="M -50 -6 L 50 -6 L 50 6 L -50 6 Z" fill={c} stroke={INK} strokeWidth={6} />
    {[-1, 1].map((s) => <g key={s}><circle cx={s * 56} cy={-10} r={13} fill={c} stroke={INK} strokeWidth={6} /><circle cx={s * 56} cy={10} r={13} fill={c} stroke={INK} strokeWidth={6} /></g>)}
    <path d="M -50 0 L 50 0" stroke={c} strokeWidth={10} />
  </g>
);

export const CatFeet: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const upT = lerp(T.ear, T.twists, 0.72);
  const frontT = T.twists + 0.1, backT = lerp(T.twists, T.spine, 0.45);
  const spreadT = lerp(T.arches, T.parachute, 0.4);
  const chuteT = spreadT + 0.3;
  const landT = T.kittens - 0.15;
  const scene = t < T.ear - 0.25 ? 'intro' : t < T.twists - 0.25 ? 'ear' : t < T.spine - 0.25 ? 'twist' : t < T.arches - 0.25 ? 'spine' : 'land';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.15, db: -24}, {f: 'pop', at: T.righting, db: -20}, {f: 'wobble', at: T.falls, db: -22},
    {f: 'whoosh', at: T.ear - 0.25, db: -24}, {f: 'ding', at: upT, db: -20},
    {f: 'whoosh', at: T.twists - 0.25, db: -24}, {f: 'creak', at: frontT, db: -22}, {f: 'creak', at: backT, db: -22},
    {f: 'whoosh', at: T.spine - 0.25, db: -24}, {f: 'boing', at: T.spine, db: -20}, {f: 'clink', at: T.collarbone, db: -20},
    {f: 'whoosh', at: T.arches - 0.25, db: -24}, {f: 'rise', at: spreadT, db: -24}, {f: 'plop', at: landT, db: -18},
    {f: 'pop', at: T.kittens, db: -20}, {f: 'ding', at: T.kittens + 0.5, db: -20},
  ];
  const fallV = scene === 'intro' ? (t < T.falls ? 900 : 1700) : scene === 'land' ? lerp(1300, 300, prog(t, spreadT, T.parachute)) : 1200;
  return (
    <AbsoluteFill style={{background: '#7FCBFF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="catsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6EC2FF" /><stop offset="1" stopColor="#D4F1FF" /></linearGradient>
          <clipPath id="earclip"><circle cx={0} cy={0} r={200} /></clipPath>
        </defs>
        <rect width={W} height={H} fill={scene === 'spine' ? '#10233F' : 'url(#catsky)'} />
        {scene !== 'spine' && scene !== 'land' && <Clouds t={t} v={fallV} />}
        {scene !== 'spine' && t < landT && <SpeedLines t={t} v={fallV} />}

        {scene === 'intro' && (
          <g>
            <g transform={`translate(${540 + 30 * Math.sin(t * 1.3)} ${lerp(600, 1120, prog(t, 0, 0.9)) + 18 * Math.sin(t * 2.2)}) rotate(${10 * Math.sin(t * 1.7) + (t > T.falls ? 6 * Math.sin(t * 9) : 0)}) scale(${1.35 + 0.35 * prog(t, 0.4, T.ear)})`}>
              <Cat t={t} upF={0} upB={0} spread={0.15 + 0.15 * Math.sin(t * 4)} expr={t > T.falls ? 'shock' : 'worried'} />
            </g>
            <Label x={540} y={640} size={54} s={pop(t, 0.5, 12, 6)} color="#FFE45C">ALWAYS ON THEIR FEET?</Label>
            {[[1.4, 250, 980, -12], [2.3, 840, 900, 10]].map(([a, x, y, r], i) => t > a && t < T.righting ? <Label key={'q' + i} x={x} y={y + 10 * Math.sin(t * 4 + i)} size={110} s={pop(t, a, 12, 6)} rot={r} color="#FFE45C">?</Label> : null)}
            {t > T.falls && <Label x={540 + 280} y={1490} size={80} s={pop(t, T.falls, 12, 6)} rot={8} color="#fff">AAH!</Label>}
            <Sticker t={t} t0={T.righting} x={540} y={1680} text="RIGHTING REFLEX" size={80} fill="#E5414A" />
          </g>
        )}

        {scene === 'ear' && (
          <g>
            <g transform={`translate(${540 + 10 * Math.sin(t * 2)} ${1480 + lerp(400, 0, prog(t, T.ear - 0.25, T.ear + 0.3))}) rotate(${4 * Math.sin(t * 1.6)})`}>
              <rect x={-170} y={150} width={340} height={400} rx={120} fill={TABBY.col} stroke={INK} strokeWidth={LW} />
              <CatFace t={t} look={lerp(0, 18, prog(t, upT - 0.4, upT))} />
              <circle cx={150} cy={-170} r={60} fill="none" stroke="#FFE45C" strokeWidth={9} strokeDasharray="16 12" opacity={prog(t, T.ear, T.ear + 0.3)} transform={`rotate(${t * 40} 150 -170)`} />
            </g>
            {(() => {
              const k = pop(t, T.ear, 11, 6);
              const bx = lerp(-100, 0, prog(t, T.ear + 0.5, upT)) + (t < upT ? 14 * Math.sin(t * 7) * (1 - prog(t, T.ear + 0.5, upT)) : 0);
              return k <= 0.01 ? null : (
                <g>
                  <path d={`M 690 ${1310} L 640 1140`} stroke="#FFE45C" strokeWidth={10} strokeDasharray="14 10" opacity={clamp(k)} />
                  <g transform={`translate(540 950) scale(${k})`}>
                    <circle r={206} fill="#13294B" stroke={INK} strokeWidth={LW} />
                    <g clipPath="url(#earclip)">
                      {[0, 60, 120].map((a) => <ellipse key={a} cx={-80} cy={-80} rx={70} ry={30} fill="none" stroke="#7FE3FF" strokeWidth={12} transform={`rotate(${a + 8 * Math.sin(t * 2)} -80 -80)`} />)}
                      <path d="M -20 -40 q 30 30 10 60 q -20 20 -40 0 q -10 -20 10 -26" stroke="#F59AAE" strokeWidth={12} fill="none" strokeLinecap="round" />
                      <rect x={-150} y={50} width={300} height={74} rx={37} fill="#B6F28A" stroke={INK} strokeWidth={7} />
                      <path d="M -40 56 L -40 118 M 40 56 L 40 118" stroke={INK} strokeWidth={5} />
                      <ellipse cx={bx} cy={87} rx={34} ry={22} fill="#fff" stroke={INK} strokeWidth={5} />
                    </g>
                    <circle r={206} fill="none" stroke="#fff" strokeWidth={10} opacity={0.6} />
                    <g transform={`translate(95 ${-40 - 8 * Math.sin(t * 4)}) scale(${pop(t, upT, 12, 6)})`}>
                      <path d="M 0 -110 L 40 -60 L 15 -60 L 15 0 L -15 0 L -15 -60 L -40 -60 Z" fill="#FFE45C" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
                      <Label x={0} y={56} size={56} color="#FFE45C">UP</Label>
                    </g>
                  </g>
                </g>
              );
            })()}
            <Label x={540} y={640} size={84} s={pop(t, T.ear, 12, 6)} color="#fff">INNER EAR</Label>
          </g>
        )}

        {scene === 'twist' && (() => {
          const uF = prog(t, frontT, frontT + 1.1), uB = prog(t, backT, backT + 1.1);
          return (
            <g>
              <g transform={`translate(${540 - 40} ${1130 + 20 * Math.sin(t * 2)}) rotate(${4 * Math.sin(t * 1.5)}) scale(1.6)`}>
                <Cat t={t} upF={uF} upB={uB} spread={0.2} expr={uB > 0.9 ? 'calm' : 'worried'} seam />
                <Arrow d="M 120 -150 Q 210 0 120 150" o={t > frontT - 0.2 && uF < 0.98 ? 1 : 0} />
                <Arrow d="M -100 -150 Q -190 0 -100 150" o={t > backT - 0.2 && uB < 0.98 ? 1 : 0} />
              </g>
              <Sticker t={t} t0={T.twists} t1={backT - 0.15} x={540} y={640} text="FRONT HALF FIRST" size={70} fill="#2C7BE5" />
              <Sticker t={t} t0={backT} x={540} y={640} text="THEN BACK HALF" size={74} fill="#E5414A" />
              <Label x={540} y={1640} size={78} s={pop(t, T.twists + 0.2, 12, 6)} rot={-3} color="#FFE45C">TWIST!</Label>
            </g>
          );
        })()}

        {scene === 'spine' && (() => {
          const b = 46 * Math.sin((t - T.spine) * 4) * prog(t, T.spine - 0.2, T.spine + 0.3);
          const P0 = [-130, -22], P1 = [0, -22 - b * 2], P2 = [128, -22];
          const pt = (u: number) => [0, 1].map((j) => (1 - u) ** 2 * P0[j] + 2 * (1 - u) * u * P1[j] + u * u * P2[j]);
          const cb = pop(t, T.collarbone, 10, 5);
          return (
            <g>
              {Array.from({length: 22}).map((_, i) => <path key={i} d={`M ${(i * 51) % W} 0 L ${(i * 51) % W} ${H}`} stroke="#1A3558" strokeWidth={3} />)}
              <rect x={60} y={1520} width={960} height={14} rx={7} fill="#1A3558" />
              <g transform={`translate(${520 + 10 * Math.sin(t)} 1180) scale(1.7)`}>
                <Cat t={t} upF={1} upB={1} arch={b * 0.2} spread={0.1} expr="calm" pal={XRAY} />
                <path d={`M ${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`} stroke="#FFE45C" strokeWidth={22} fill="none" opacity={0.35} strokeLinecap="round" />
                {Array.from({length: 11}).map((_, i) => {
                  const u = i / 10, [x, y] = pt(u), [x2, y2] = pt(Math.min(1, u + 0.01)), [x1, y1] = pt(Math.max(0, u - 0.01));
                  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
                  return <rect key={i} x={-9} y={-13} width={18} height={26} rx={6} fill="#FFE45C" stroke={INK} strokeWidth={4} transform={`translate(${x} ${y}) rotate(${a}) scale(${pop(t, T.spine - 0.2 + i * 0.04, 12, 6)})`} />;
                })}
                {cb > 0.01 && (
                  <g transform={`translate(96 ${-10 - 70 * clamp(cb) + 8 * Math.sin(t * 3)}) rotate(${12 * Math.sin(t * 2.4)}) scale(${0.55 * cb})`}>
                    <circle r={90} fill="none" stroke="#F59AAE" strokeWidth={8} strokeDasharray="14 10" />
                    <Bone c="#FFD1DC" />
                  </g>
                )}
              </g>
              <Label x={540} y={640} size={66} s={pop(t, T.spine, 12, 6)} color="#FFE45C">SUPER BENDY SPINE</Label>
              <Sticker t={t} t0={T.collarbone} x={540} y={1690} text="NO FIXED COLLARBONE" size={62} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'land' && (() => {
          const fallU = prog(t, T.arches - 0.25, landT, (u) => u * (2 - u) * 0.4 + u * u * 0.6);
          const y = lerp(880, 1222, fallU);
          const landed = t >= landT;
          const sq = landed ? 0.14 * Math.exp(-6 * (t - landT)) * Math.cos(14 * (t - landT)) : 0;
          const arch = landed ? 0 : 12 * prog(t, T.arches, T.arches + 0.4);
          const spread = landed ? lerp(0.6, 0.2, prog(t, landT, landT + 0.3)) : 0.2 + 0.8 * prog(t, spreadT, spreadT + 0.4);
          const chute = landed ? 1 - prog(t, landT, landT + 0.2) : prog(t, chuteT - 0.2, chuteT + 0.2);
          const cx = 380;
          return (
            <g>
              <rect x={0} y={1500} width={W} height={420} fill="#C98B5A" stroke={INK} strokeWidth={LW} />
              {[0, 1, 2, 3].map((i) => <path key={i} d={`M 0 ${1560 + i * 90} L ${W} ${1560 + i * 90}`} stroke="#B07548" strokeWidth={6} />)}
              {/* cushion */}
              <g transform={`translate(${cx} 1450) scale(${1 + sq} ${1 - sq})`}>
                <path d="M -230 40 Q -250 -40 -200 -60 Q 0 -80 200 -60 Q 250 -40 230 40 Q 0 70 -230 40 Z" fill="#E5414A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <path d="M -150 -40 Q 0 -54 150 -40" stroke="#F27A80" strokeWidth={10} fill="none" strokeLinecap="round" />
                {[-120, 0, 120].map((x) => <circle key={x} cx={x} cy={0} r={8} fill="#B8303A" />)}
              </g>
              {chute > 0.01 && (
                <g opacity={chute} transform={`translate(${cx + 40} ${y})`}>
                  <path d="M -300 60 Q -290 -330 40 -330 Q 330 -330 340 60" fill="#fff" fillOpacity={0.18} stroke="#fff" strokeWidth={9} strokeDasharray="22 14" />
                  {[-150, 0, 150].map((x, i) => <Arrow key={x} d={`M ${x} ${330 - 20 * Math.sin(t * 5 + i)} L ${x} ${230 - 20 * Math.sin(t * 5 + i)}`} o={1} c="#7FD3FF" />)}
                </g>
              )}
              <g transform={`translate(${cx} ${y}) rotate(${landed ? 0 : 3 * Math.sin(t * 2)}) scale(${1.4 * (1 + sq)} ${1.4 * (1 - sq)})`}>
                <Cat t={t} upF={1} upB={1} arch={arch} spread={spread} expr={landed ? 'happy' : 'calm'} />
              </g>
              {/* kitten */}
              {t > T.kittens - 0.05 && (
                <g transform={`translate(880 ${1428 - 30 * Math.abs(Math.sin((t - T.kittens) * 5)) * Math.exp(-(t - T.kittens)) - (t > T.kittens + 1 ? 90 * Math.max(0, Math.sin((t - T.kittens - 1) * 4.2)) : 0)}) scale(${-0.62 * pop(t, T.kittens, 12, 6)} ${0.62 * pop(t, T.kittens, 12, 6)})`}>
                  <Cat t={t + 1} expr="happy" pal={KITTEN} />
                </g>
              )}
              <Sticker t={t} t0={T.arches} t1={T.kittens - 0.1} x={540} y={640} text="ARCH & SPREAD" size={80} fill="#2C7BE5" />
              <Sticker t={t} t0={T.kittens} x={540} y={640} text="KITTENS MASTER IT" size={70} fill="#5B3A8C" />
              <Sticker t={t} t0={chuteT} t1={T.kittens - 0.05} x={540} y={1720} text="TINY PARACHUTE" size={74} fill="#E5414A" />
              <Sticker t={t} t0={T.kittens + 0.5} x={540} y={1720} text="BY 7 WEEKS OLD" size={74} fill="#2C7BE5" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="24-cat-feet" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
