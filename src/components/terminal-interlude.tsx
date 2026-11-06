import { experience, site } from '@/data/site';

type Kind = 'cmd' | 'out' | 'ok' | 'dim';
type Line = { kind: Kind; text: string };

const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
/** "Nov 2025 — Jul 2026" → "2025-11" */
const started = (period: string) => {
  const [month, year] = period.split(' — ')[0].split(' ');
  return `${year}-${String(MONTHS.indexOf(month) + 1).padStart(2, '0')}`;
};

// Career as a commit history, oldest first, derived from data/site.
const log: Line[] = [...experience].reverse().map((role) => ({
  kind: 'out',
  text: `${started(role.period)}  ${role.role.padEnd(24)} ${role.company}`,
}));

const LINES: Line[] = [
  { kind: 'cmd', text: '$ whoami' },
  { kind: 'out', text: `${site.name} · full-stack engineer` },
  { kind: 'cmd', text: '$ cat stack.txt' },
  { kind: 'out', text: 'TypeScript  React  Node.js  NestJS  PostgreSQL  Kubernetes' },
  { kind: 'cmd', text: '$ git log --reverse --format="%as  %s"' },
  ...log,
  { kind: 'cmd', text: '$ yarn build' },
  { kind: 'dim', text: '> next build' },
  { kind: 'ok', text: '✓ Compiled successfully' },
  { kind: 'cmd', text: '$ ' },
];

/** A terminal that types itself out as it scrolls past. Decorative: it repeats the page. */
export function TerminalInterlude() {
  return (
    <section className="terminal-interlude" aria-hidden="true">
      <div className="container">
        <div className="terminal-window">
          <div className="editor-bar">
            <span className="editor-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="editor-tab mono">zsh — ~/tarpp.dev</span>
          </div>
          <pre className="terminal-body">
            {LINES.map((line, index) => (
              <span key={index} className={`term-line term-${line.kind}`}>
                <span
                  className="code-text"
                  style={{ '--len': line.text.length } as React.CSSProperties}
                >
                  {line.text}
                </span>
                {index === LINES.length - 1 && <i className="code-caret is-blinking" />}
                {'\n'}
              </span>
            ))}
          </pre>
        </div>
      </div>
    </section>
  );
}
