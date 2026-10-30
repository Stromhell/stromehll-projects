// Shared pieces for every facts short: camera layers, labels, logo, end card, sound track.
import React from 'react';
import {Audio, Img, Sequence, staticFile} from 'remotion';
import {INK, clamp, easeOut, pop} from './cartoon';

export const W = 1080, H = 1920, CX = 540, CY = 960, FPS = 60;

// a world layer with parallax p (1 = main plane, smaller = further away); cam = [cx, cy, zoom]
export const Layer: React.FC<{cam: number[]; p?: number; children: React.ReactNode}> = ({cam, p = 1, children}) => {
  const [cx, cy, z] = cam; const zp = 1 + (z - 1) * p;
  const ox = 540 + (cx - 540) * p, oy = 960 + (cy - 960) * p;
  return <g transform={`translate(${CX} ${CY}) scale(${zp}) translate(${-ox} ${-oy})`}>{children}</g>;
};

export const FONT = "Anton, 'Arial Black', 'DejaVu Sans', sans-serif";
// thumbnails set this so the short's own captions don't clash with the cover headline
export const NoText = React.createContext(false);
export const Label: React.FC<{x: number; y: number; size: number; s?: number; color?: string; rot?: number; anchor?: 'middle' | 'start' | 'end'; keep?: boolean; children: React.ReactNode}> =
  ({x, y, size, s = 1, color = '#fff', rot = 0, anchor = 'middle', keep, children}) => (s <= 0.01 || (React.useContext(NoText) && !keep) ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <text textAnchor={anchor} fontFamily={FONT} fontWeight={900} fontSize={size}
        fill={color} stroke={INK} strokeWidth={size * 0.16} paintOrder="stroke" strokeLinejoin="round">{children}</text>
    </g>
  ));

// sticker: rounded rect with label, pops in at t0 and out at t1
export const Sticker: React.FC<{t: number; t0: number; t1?: number; x: number; y: number; text: string; size?: number; fill?: string; color?: string; rot?: number}> =
  ({t, t0, t1 = 1e9, x, y, text, size = 70, fill = '#E5414A', color = '#fff', rot = -5}) => {
    const k = pop(t, t0, 12, 6) * (1 - clamp((t - t1) / 0.2));
    const hide = React.useContext(NoText);
    if (k <= 0.01 || hide) return null;
    const w = text.length * size * 0.56 + size * 0.9;
    return (
      <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
        <rect x={-w / 2} y={-size * 0.95} width={w} height={size * 1.35} rx={size * 0.3} fill={fill} stroke={INK} strokeWidth={9} />
        <Label x={0} y={size * 0.2} size={size} color={color}>{text}</Label>
      </g>
    );
  };

export const wavePath = (t: number, y: number, amp: number, len: number, speed: number, x0 = -1400, x1 = 2500) => {
  let d = `M ${x0} ${y + 400} L ${x0} ${y}`;
  for (let x = x0; x <= x1; x += len) {
    const ph = Math.sin((x / len) * 1.3 + t * speed) * amp * 0.25;
    d += ` Q ${x + len / 2} ${y - amp + ph} ${x + len} ${y}`;
  }
  return d + ` L ${x1} ${y + 2000} L ${x0} ${y + 2000} Z`;
};

export const Logo: React.FC<{t: number; card: number}> = ({t, card}) => (t < card + 0.3 ? (
  <Img src={staticFile('shared/stormi.png')} style={{position: 'absolute', left: 820, top: 262, width: 150, height: 150, opacity: 0.92}} />
) : null);

export const EndCard: React.FC<{t: number; card: number}> = ({t, card}) => {
  const a = t - card; if (a < 0) return null;
  const r = 2300 * easeOut(clamp(a / 0.45));
  const lk = pop(t, card + 0.2, 10, 6);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
      <defs><clipPath id="iris"><circle cx={540} cy={960} r={r} /></clipPath></defs>
      <g clipPath="url(#iris)">
        <rect width={W} height={H} fill="#2C7BE5" />
        <g transform={`translate(540 800) rotate(${a * 10})`}>
          {Array.from({length: 16}).map((_, i) => <path key={i} transform={`rotate(${i * 22.5})`} d="M 0 0 L 90 -1600 L -90 -1600 Z" fill="#3D8CF0" />)}
        </g>
        <Label x={540} y={1330} size={70} s={pop(t, card + 0.45, 10, 6)}>WATCH FULL VIDEOS</Label>
        <Label x={540} y={1420} size={60} s={pop(t, card + 0.55, 10, 6)}>ON OUR YOUTUBE CHANNEL</Label>
        <Label x={540} y={1560} size={54} s={pop(t, card + 0.7, 10, 6)} rot={-3} color="#FFE45C">STORMI EXPLAIN EVERYTHING</Label>
      </g>
      <foreignObject x={0} y={0} width={W} height={H} clipPath="url(#iris)">
        <div style={{position: 'absolute', left: 540 - 330, top: 800 - 330, width: 660, height: 660, transform: `scale(${lk})`}}>
          <Img src={staticFile('shared/stormi.png')} style={{width: 660, height: 660}} />
        </div>
      </foreignObject>
    </svg>
  );
};

export type Cue = {f: string; at: number; db: number};
export const SoundTrack: React.FC<{id: string; voAt: number; card: number; cues: Cue[]; bed?: string; bedVol?: number}> = ({id, voAt, card, cues, bed, bedVol = 0.08}) => (
  <>
    <Sequence from={Math.round(voAt * FPS)} layout="none"><Audio src={staticFile(`${id}/vo.wav`)} /></Sequence>
    <Audio src={staticFile(`${id}/music.wav`)} volume={(f) => { const s = f / FPS; return s < card ? 0.075 : 0.075 + 0.25 * clamp((s - card) / 0.5); }} />
    {bed && <Audio src={staticFile(`shared/sfx/${bed}.wav`)} volume={(f) => bedVol * (1 - clamp((f / FPS - card) / 0.5))} />}
    {cues.filter((c) => c.at < card + 2.5).map((c, i) => (
      <Sequence key={i} from={Math.max(0, Math.round(c.at * FPS))} layout="none">
        <Audio src={staticFile(`shared/sfx/${c.f}.wav`)} volume={10 ** (c.db / 20)} />
      </Sequence>
    ))}
    <Sequence from={Math.round((card - 0.05) * FPS)} layout="none"><Audio src={staticFile('shared/sfx/whoosh.wav')} volume={0.1} /></Sequence>
    <Sequence from={Math.round((card + 0.2) * FPS)} layout="none"><Audio src={staticFile('shared/sfx/pop.wav')} volume={0.2} /></Sequence>
  </>
);

// word-time helper: timing files export W = {key: seconds} already offset by voAt
export const SkyGrad: React.FC<{top?: string; bottom?: string; id?: string}> = ({top = '#7FCBFF', bottom = '#D4F1FF', id = 'sky'}) => (
  <>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient></defs>
    <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={`url(#${id})`} />
  </>
);
