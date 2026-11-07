const MARQUEE = [
  'Full-stack engineering',
  'Cloud & deployment',
  'Secure integrations',
  'TypeScript',
  'React',
  'Kubernetes',
];
const MARQUEE_ALT = [
  'Interfaces',
  'APIs',
  'Identity',
  'Infrastructure',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Docker',
];
export function Marquee({ tone = 'accent' }: { tone?: 'accent' | 'quiet' }) {
  return (
    <div className={`marquee-zone marquee-zone-${tone}`} aria-hidden="true">
      {[
        { items: MARQUEE, direction: 'left', className: 'marquee-band marquee-band-main' },
        { items: MARQUEE_ALT, direction: 'right', className: 'marquee-band marquee-band-cross' },
      ].map((band) => (
        <div key={band.direction} className={band.className} data-direction={band.direction}>
          <div className="marquee-track">
            {[0, 1, 2, 3].map((copy) =>
              band.items.map((item) => <span key={`${copy}-${item}`}>{item}</span>),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
