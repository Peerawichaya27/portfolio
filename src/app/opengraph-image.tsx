import { ImageResponse } from 'next/og';
export const alt = 'Peerawichaya Pholwiset — Software Engineer, Backend & Cloud';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#07090d',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '72px',
        color: '#f1f5f9',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', fontSize: 30 }}>
        tarpp<span style={{ color: '#a3a9b8' }}>.dev</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 22, color: '#a3a9b8' }}>Software engineer / Backend & cloud</div>
        <div style={{ fontSize: 60, letterSpacing: '-1px' }}>Backend systems</div>
        <div style={{ fontSize: 60, letterSpacing: '-1px', color: '#a3a9b8' }}>
          and enterprise integrations
        </div>
      </div>
      <div style={{ fontSize: 23, color: '#a0aec1' }}>Peerawichaya Pholwiset</div>
    </div>,
    size,
  );
}
