import { ImageResponse } from 'next/og';
export const alt = 'Peerawichaya Pholwiset — Software Engineer, Backend & Cloud';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#05070c',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '75px',
        color: '#f1f5f9',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', fontSize: 30 }}>
        tarpp<span style={{ color: '#65dfc6' }}>.dev</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 22, color: '#65dfc6' }}>SOFTWARE ENGINEER · BACKEND & CLOUD</div>
        <div style={{ fontSize: 70, letterSpacing: '-3px' }}>Thoughtful code.</div>
        <div style={{ fontSize: 70, letterSpacing: '-3px', color: '#65dfc6' }}>
          Reliable systems.
        </div>
      </div>
      <div style={{ fontSize: 23, color: '#a0aec1' }}>Peerawichaya Pholwiset</div>
    </div>,
    size,
  );
}
