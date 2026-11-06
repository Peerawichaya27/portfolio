import { ImageResponse } from 'next/og';
export const alt = 'Peerawichaya Pholwiset — Full-Stack Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#0c0b0a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '72px',
        color: '#efe9de',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', fontSize: 30 }}>
        tarpp<span style={{ color: '#b3aa9d' }}>.dev</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 22, color: '#b3aa9d' }}>
          Full-stack engineer / Frontend, backend & cloud
        </div>
        <div style={{ fontSize: 60, letterSpacing: '-1px' }}>Guitar / Full-stack engineer</div>
        <div style={{ fontSize: 60, letterSpacing: '-1px', color: '#b3aa9d' }}>
          Interfaces, APIs & infrastructure
        </div>
      </div>
      <div style={{ fontSize: 23, color: '#a0aec1' }}>Peerawichaya Pholwiset</div>
    </div>,
    size,
  );
}
