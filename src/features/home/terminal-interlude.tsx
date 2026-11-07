import { experience, isoMonth, chronologicalRoles } from '@/content/career';
import { site } from '@/content/site';

type Kind = 'cmd' | 'out' | 'ok' | 'dim';
type Line = { kind: Kind; text: string };

const log: Line[] = chronologicalRoles(experience).map((role) => ({
  kind: 'out',
  text: `${isoMonth(role.start)}  ${role.role.padEnd(24)} ${role.company}`,
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
            <span className="editor-tab mono">zsh — ~/{site.brand}</span>
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
