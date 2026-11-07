import { ImageResponse } from 'next/og';
import { site } from '@/content/site';
export const alt = `${site.name} — ${site.roleTitle}`;
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
        {site.wordmark.name}
        <span style={{ color: '#b3aa9d' }}>{site.wordmark.suffix}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 22, color: '#b3aa9d' }}>
          Full-stack engineer / Frontend, backend & cloud
        </div>
        <div style={{ fontSize: 60, letterSpacing: '-1px' }}>{site.socialHeadline}</div>
        <div style={{ fontSize: 60, letterSpacing: '-1px', color: '#b3aa9d' }}>
          {site.socialSubheading}
        </div>
      </div>
      <div style={{ fontSize: 23, color: '#a0aec1' }}>{site.name}</div>
    </div>,
    size,
  );
}
