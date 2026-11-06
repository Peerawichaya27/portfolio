'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Play } from 'lucide-react';
import { useLang } from '@/i18n/use-lang';

/** Token kinds: keyword, function, variable, string, number, comment, punctuation. */
type Kind = 'k' | 'f' | 'v' | 's' | 'n' | 'c' | 'p';
type Line = [Kind, string][];

// The hero really is rendered this way: a procedural guitar in three.js.
const CODE: Line[] = [
  [['c', '// guitar.ts · live in three.js']],
  [
    ['k', 'import'],
    ['p', ' { '],
    ['v', 'createGuitar'],
    ['p', ' } '],
    ['k', 'from'],
    ['p', ' '],
    ['s', "'./studio'"],
    ['p', ';'],
  ],
  [],
  [
    ['k', 'const'],
    ['p', ' '],
    ['v', 'guitar'],
    ['p', ' = '],
    ['f', 'createGuitar'],
    ['p', '({'],
  ],
  [
    ['p', '  '],
    ['v', 'strings'],
    ['p', ': '],
    ['n', '6'],
    ['p', ','],
  ],
  [
    ['p', '  '],
    ['v', 'tuning'],
    ['p', ': '],
    ['s', "'E A D G B E'"],
    ['p', ','],
  ],
  [
    ['p', '  '],
    ['v', 'engine'],
    ['p', ': '],
    ['s', "'three.js'"],
    ['p', ','],
  ],
  [['p', '});']],
  [],
  [
    ['k', 'await'],
    ['p', ' '],
    ['v', 'guitar'],
    ['p', '.'],
    ['f', 'render'],
    ['p', '('],
    ['v', 'canvas'],
    ['p', ');'],
  ],
  [
    ['v', 'guitar'],
    ['p', '.'],
    ['f', 'strum'],
    ['p', '();'],
  ],
];
const STRUM_LINE = CODE.length - 1;
const length = (line: Line) => line.reduce((sum, [, text]) => sum + text.length, 0);

/**
 * An editor window whose code types itself out and "runs" the guitar in its preview pane.
 * The full code is in the HTML; typing is a width reveal on monospace lines.
 */
export function CodeEditor({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLSpanElement>(null);
  const run = useRef<() => void>(() => {});

  useEffect(() => {
    const editor = root.current;
    if (!editor || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lines = Array.from(editor.querySelectorAll<HTMLElement>('.code-line'));
    let timeline: gsap.core.Timeline | undefined;

    const setStatus = (line: number, col: number) => {
      if (status.current) status.current.textContent = `Ln ${line}, Col ${col}`;
    };
    const type = () => {
      timeline?.kill();
      lines.forEach((line) => line.classList.remove('is-typing', 'is-done'));
      gsap.set(
        lines.map((line) => line.querySelector('.code-text')),
        { '--w': 0 },
      );
      editor.dataset.running = '';
      timeline = gsap.timeline({
        delay: 0.35,
        onComplete: () => {
          delete editor.dataset.running;
          lines.at(-1)?.classList.add('is-done');
        },
      });
      lines.forEach((line, index) => {
        const text = line.querySelector<HTMLElement>('.code-text');
        const chars = length(CODE[index]);
        timeline!.call(() => {
          lines.forEach((other) => other.classList.remove('is-typing'));
          line.classList.add('is-typing');
          setStatus(index + 1, 1);
        });
        if (chars)
          timeline!.to(text, {
            '--w': chars,
            duration: Math.min(0.8, chars * 0.022),
            ease: `steps(${chars})`,
            onUpdate() {
              setStatus(index + 1, Math.round(Number(gsap.getProperty(text, '--w'))) + 1);
            },
          });
        timeline!.to({}, { duration: chars ? 0.08 : 0.05 });
        if (index === STRUM_LINE)
          timeline!.call(() => window.dispatchEvent(new Event('guitar:strum')));
      });
    };
    run.current = type;

    // Start with the hero: after the opening titles, or right away on a repeat visit.
    const start = () => type();
    if (document.documentElement.dataset.intro === 'play')
      window.addEventListener('film:reveal', start);
    else if (window.scrollY < window.innerHeight * 0.5) type();
    return () => {
      window.removeEventListener('film:reveal', start);
      timeline?.kill();
      delete editor.dataset.running;
    };
  }, []);

  return (
    <div ref={root} className="code-editor" aria-label={t.hero.editor} role="group">
      <div className="editor-bar">
        <span className="editor-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="editor-tab mono">guitar.ts</span>
        <button type="button" className="editor-run mono" onClick={() => run.current()}>
          <Play size={12} /> {t.hero.run}
        </button>
      </div>
      <div className="editor-body">
        <pre className="editor-code" aria-label="guitar.ts">
          <code>
            {CODE.map((line, index) => (
              <span key={index} className="code-line">
                <span className="code-ln" aria-hidden="true">
                  {index + 1}
                </span>
                <span
                  className="code-text"
                  style={{ '--len': length(line) } as React.CSSProperties}
                >
                  {line.map(([kind, text], token) => (
                    <span key={token} className={`tok-${kind}`}>
                      {text}
                    </span>
                  ))}
                </span>
                <i className="code-caret" aria-hidden="true" />
                {'\n'}
              </span>
            ))}
          </code>
        </pre>
        <div className="editor-preview">
          <span className="editor-url mono" aria-hidden="true">
            localhost:3000
          </span>
          {children}
        </div>
      </div>
      <div className="editor-status mono" aria-hidden="true">
        <span>
          <i className="status-dot" /> main
        </span>
        <span>TypeScript</span>
        <span ref={status}>Ln {CODE.length}, Col 1</span>
      </div>
    </div>
  );
}

/** Replays the cinematic opening titles. */
export function ReplayOpening() {
  const { t } = useLang();
  return (
    <button
      type="button"
      className="guitar-replay"
      onClick={() => window.dispatchEvent(new Event('film:replay'))}
    >
      {t.hero.replay}
    </button>
  );
}
