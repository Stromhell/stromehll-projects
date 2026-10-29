import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, Cloud, clamp, lerp, prog, pop, keys, easeOut, easeInOut, shake} from '../../lib/cartoon';
import {W, H, FPS, Layer, Label, Sticker, Logo, EndCard, SoundTrack, Cue, SkyGrad} from '../../lib/short';

// rounded-rect path with corner radius r (r = 0 square, r = w/2 oval-ish)
const rr = (w: number, h: number, r: number) => {
  const x = -w / 2, y = -h / 2;
  return `M ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${x + r} ${y + h} Q ${x} ${y + h} ${x} ${y + h - r} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
};

// the jet (origin = fuselage centre), windows corner radius wr (0..1)
const Jet: React.FC<{t: number; wr: number; split?: number; s?: number}> = ({t, wr, split = 0, s = 1}) => {
  const half = (side: -1 | 1) => (
    <g transform={`translate(${side * split * 90} ${split * split * 300 * (side === 1 ? 1 : 0.8)}) rotate(${side * split * 18})`}>
      <g clipPath={`url(#half${side})`}>
        <path d="M -470 -60 L 380 -60 Q 470 -60 500 0 Q 470 60 380 60 L -470 60 Q -500 60 -500 0 Q -500 -60 -470 -60 Z" fill="#fff" stroke={INK} strokeWidth={LW} />
        <path d="M -480 18 L 480 18" stroke="#2C7BE5" strokeWidth={18} />
        <path d="M 400 -40 Q 450 -36 470 -6 L 410 -6 Z" fill="#2B3A4A" />
        {Array.from({length: 11}).map((_, i) => <path key={i} transform={`translate(${-380 + i * 70} -20)`} d={rr(34, 34, 17 * wr)} fill="#8ECFFF" stroke={INK} strokeWidth={5} />)}
        <path d="M -500 -50 L -560 -190 L -470 -190 L -380 -58 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      </g>
    </g>
  );
  return (
    <g transform={`scale(${s})`}>
      <defs>
        <clipPath id="half-1"><rect x={-700} y={-400} width={700 + 4} height={800} /></clipPath>
        <clipPath id="half1"><rect x={0} y={-400} width={700} height={800} /></clipPath>
      </defs>
      {/* wing with engines in the root, like the Comet */}
      <g transform={`translate(0 ${split * 160})`} opacity={split > 0.02 ? 1 - split : 1}>
        <path d="M -60 30 L 120 30 L -40 260 L -170 260 Z" fill="#DDE3EA" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        <ellipse cx={20} cy={40} rx={60} ry={16} fill="#B8C3CE" stroke={INK} strokeWidth={6} />
      </g>
      {half(-1)}{half(1)}
    </g>
  );
};

// big window close-up with stress lines and a crack
const BigWindow: React.FC<{t: number; r: number; stress: number; even: number; crack: number}> = ({t, r, stress, even, crack}) => {
  const w = 420, h = 520, R = r * 200;
  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  return (
    <g>
      <path d={rr(w + 120, h + 120, R + 40)} fill="#E6EBF0" stroke={INK} strokeWidth={LW} />
      <path d={rr(w, h, R)} fill="#8ECFFF" stroke={INK} strokeWidth={LW} />
      <g opacity={0.9}><g transform={`translate(${-60 + (t * 30) % 200} -120)`}><Cloud s={0.7} /></g></g>
      <path d={rr(w, h, R)} fill="none" stroke={INK} strokeWidth={LW} />
      {/* stress: red arcs crowding at corners, or calm blue lines flowing evenly */}
      {stress > 0.01 && corners.map(([sx, sy], i) => (
        <g key={i} transform={`translate(${sx * (w / 2 + 6)} ${sy * (h / 2 + 6)})`} opacity={stress * (1 - even)}>
          {[0, 1, 2].map((k) => {
            const pulse = (t * 1.6 + k / 3) % 1; const rad = 30 + pulse * 70;
            return <circle key={k} r={rad} fill="none" stroke="#E5414A" strokeWidth={10 * (1 - pulse) + 2} />;
          })}
        </g>
      ))}
      {even > 0.01 && [0, 1, 2].map((k) => (
        <path key={k} d={rr(w + 40 + k * 44, h + 40 + k * 44, R + 20 + k * 22)} fill="none" stroke="#2C9BF0" strokeWidth={8}
          strokeDasharray="40 30" strokeDashoffset={-t * 120} opacity={even} />
      ))}
      {crack > 0.01 && (
        <path d={`M ${w / 2} ${-h / 2} l 30 -26 l 6 -40 l 38 -18 l 10 -46`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={260} strokeDashoffset={260 * (1 - crack)} />
      )}
    </g>
  );
};

const WaterTank: React.FC<{t: number; on: number}> = ({t, on}) => {
  const swing = on * 50 * Math.sin(t * 7);
  return (
    <g>
      <rect x={-460} y={-300} width={920} height={520} rx={30} fill="#BFE6FF" stroke={INK} strokeWidth={LW} />
      <path d={`M -440 -230 Q -220 ${-246 + 6 * Math.sin(t * 3)} 0 -230 Q 220 ${-214 + 6 * Math.sin(t * 3)} 440 -230 L 440 200 L -440 200 Z`} fill="#62B4E8" />
      <g transform={`translate(0 0) scale(${1 + on * 0.015 * Math.sin(t * 7)})`}>
        <path d="M -330 -80 L 330 -80 Q 380 -80 380 0 Q 380 80 330 80 L -330 80 Q -380 80 -380 0 Q -380 -80 -330 -80 Z" fill="#fff" stroke={INK} strokeWidth={LW} />
        {Array.from({length: 8}).map((_, i) => <path key={i} transform={`translate(${-280 + i * 80} -20)`} d={rr(40, 40, 0)} fill="#8ECFFF" stroke={INK} strokeWidth={5} />)}
      </g>
      {/* pump gauge */}
      <g transform="translate(360 -380)">
        <circle r={70} fill="#fff" stroke={INK} strokeWidth={LW} />
        <path d="M -48 20 A 52 52 0 0 1 48 20" stroke="#E5414A" strokeWidth={8} fill="none" />
        <path d={`M 0 0 L ${50 * Math.sin((swing * Math.PI) / 180)} ${-50 * Math.cos((swing * Math.PI) / 180)}`} stroke={INK} strokeWidth={8} strokeLinecap="round" />
        <circle r={10} fill={INK} />
        <path d="M 0 70 L 0 140 L -300 140 L -300 80" stroke={INK} strokeWidth={14} fill="none" />
      </g>
    </g>
  );
};

const camAt = (t: number) => keys(t, [
  [0, 540, 960, 1.0],
  [T.cracks + 1, 540, 960, 1.0],
]);

export const PlaneWindows: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.first - 0.2 ? 'cabin' : t < T.tank - 0.25 ? 'sky' : t < T.cracks - 0.25 ? 'tank' : t < T.rounded - 0.4 ? 'window' : 'cabin';
  const split = prog(t, T.apart - 0.05, T.apart + 1.2, easeInOut);
  const [shx, shy] = shake(t, t > T.y1954 && t < T.apart + 0.4 ? 6 : 0);
  const r = prog(t, T.curves - 0.1, T.curves + 0.6, easeOut);
  const stress = prog(t, T.cracks + 0.6, T.cracks + 1.0);
  const even = prog(t, T.curves + 0.3, T.curves + 0.8);
  const crack = prog(t, T.cracks, T.cracks + 0.9) * (1 - prog(t, T.curves - 0.1, T.curves + 0.1));
  const planeX = scene === 'sky' ? lerp(-200, 560, prog(t, T.first - 0.2, T.first + 1.2, easeOut)) : 540;
  const happy = t > T.rounded - 0.4;
  const cues: Cue[] = [
    {f: 'whoosh', at: T.first - 0.25, db: -22}, {f: 'pop', at: T.square, db: -18}, {f: 'pop', at: T.y1954 - 0.05, db: -18},
    {f: 'rumble', at: T.y1954 + 0.2, db: -18}, {f: 'crack', at: T.apart, db: -14}, {f: 'whoosh', at: T.tank - 0.25, db: -24},
    {f: 'splash', at: T.tank, db: -20}, {f: 'creak', at: T.over, db: -22}, {f: 'creak', at: T.over + 0.9, db: -24},
    {f: 'whoosh', at: T.cracks - 0.25, db: -24}, {f: 'crack', at: T.cracks + 0.2, db: -18}, {f: 'squeeze', at: T.curves, db: -20},
    {f: 'ding', at: T.evenly, db: -22}, {f: 'whoosh', at: T.rounded - 0.45, db: -24}, {f: 'pop', at: T.rounded + 0.2, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: '#9BD8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', transform: `translate(${shx}px, ${shy}px)`}}>
        <SkyGrad top="#6FC1FF" bottom="#DDF3FF" />
        {scene === 'cabin' && (
          <g>
            <rect x={0} y={0} width={W} height={H} fill="#EEF1F5" />
            {[0, 1, 2, 3].map((i) => <path key={i} d={`M 0 ${300 + i * 420} L ${W} ${300 + i * 420}`} stroke="#DDE2E8" strokeWidth={8} />)}
            <g transform="translate(700 760)">
              <path d={rr(380, 500, 150)} fill="#D4DAE1" stroke={INK} strokeWidth={LW} />
              <path d={rr(290, 400, 120)} fill="#8ECFFF" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(${-40 + ((t * 40) % 160)} -60) scale(0.6)`}><Cloud /></g>
              {happy && <g><circle cx={-50} cy={20} r={10} fill={INK} /><circle cx={50} cy={20} r={10} fill={INK} /><path d="M -40 70 Q 0 110 40 70" stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" /></g>}
            </g>
            {/* seat */}
            <path d="M 60 1000 L 300 1000 Q 340 1000 340 1060 L 340 1700 L 60 1700 Z" fill="#2C5AA0" stroke={INK} strokeWidth={LW} />
            <g transform="translate(330 1560) scale(1.15)">
              <Guy t={t} expr={happy ? 'happy' : 'hope'} handL={[-70, -76]} handR={happy ? [120, -330] : [86, -76]} bendR={0.3}
                blink={((t + 0.3) % 3) < 0.1} look={[6, -4]} />
            </g>
            {!happy && <Label x={760} y={420} size={140} s={pop(t, 0.3, 10, 6)} color="#FFE45C">?</Label>}
            {happy && <Sticker t={t} t0={T.rounded} x={540} y={1760} text="ROUNDED = SAFER" size={74} fill="#2C7BE5" rot={-3} />}
          </g>
        )}
        {scene === 'sky' && (
          <g>
            <g transform={`translate(${200 - t * 20} 400)`}><Cloud s={1.2} /></g>
            <g transform={`translate(${900 - t * 30} 1500)`}><Cloud s={1.0} /></g>
            <g transform={`translate(${planeX} 960) rotate(${split * 6})`}><Jet t={t} wr={0} split={split} s={0.95} /></g>
            {split > 0.05 && [0, 1, 2, 3, 4].map((i) => { const a = t - T.apart; return <circle key={i} cx={540 + Math.cos(i * 1.3) * a * 260} cy={960 + Math.sin(i * 2.1) * a * 200} r={10} fill="#9AA5B1" stroke={INK} strokeWidth={4} />; })}
            <Label x={540} y={560} size={70} s={pop(t, T.comet - 0.1, 12, 6) * (1 - prog(t, T.y1954 - 0.3, T.y1954))}>DE HAVILLAND COMET</Label>
            <Sticker t={t} t0={T.square} t1={T.y1954 - 0.3} x={540} y={1380} text="SQUARE WINDOWS" size={76} />
            <Sticker t={t} t0={T.y1954 - 0.05} t1={T.tank - 0.3} x={540} y={520} text="1954" size={120} fill="#2B3A4A" />
          </g>
        )}
        {scene === 'tank' && (
          <g>
            <rect x={0} y={0} width={W} height={H} fill="#E9EEF3" />
            <path d="M 0 1500 L 1080 1500 L 1080 1920 L 0 1920 Z" fill="#C9D1D9" stroke={INK} strokeWidth={LW} />
            <g transform={`translate(540 1060) scale(${pop(t, T.tank - 0.2, 10, 6)})`}><WaterTank t={t} on={prog(t, T.over - 0.2, T.over + 0.2)} /></g>
            <g transform="translate(140 1720) scale(0.7)"><Guy t={t} expr="worried" stand handL={[-70, -150]} handR={[70, -150]} look={[6, -6]} blink={((t + 1) % 2.8) < 0.1} /></g>
            <Label x={540} y={560} size={88} s={pop(t, T.over, 12, 6)} color="#FFE45C">OVER AND OVER</Label>
          </g>
        )}
        {scene === 'window' && (
          <g>
            <rect x={0} y={0} width={W} height={H} fill="#F3F5F8" />
            <g transform={`translate(540 980) scale(${pop(t, T.cracks - 0.2, 10, 6)})`}><BigWindow t={t} r={r} stress={stress} even={even} crack={crack} /></g>
            <Label x={540} y={1560} size={80} s={pop(t, T.cracks + 0.7, 12, 6) * (1 - prog(t, T.curves - 0.2, T.curves))} color="#FF8A8A">STRESS PILES UP</Label>
            <Label x={540} y={1560} size={66} s={pop(t, T.curves + 0.2, 12, 6)} color="#7FD0FF">SPREADS OUT EVENLY</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="03-plane-windows" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
