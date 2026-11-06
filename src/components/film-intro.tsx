'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FILM_INTRO_KEY } from '@/lib/film-intro-script';
import { useLang } from '@/i18n/use-lang';

const NAME = 'Peerawichaya Pholwiset';
const GLYPHS = '<>/{}[]=+*#$%&01λ';
const MODULES = ['react', 'next', 'three', 'gsap', 'guitar.ts'];

type BootKind = 'cmd' | 'dim' | 'out' | 'ok';
const BOOT: { kind: BootKind; text: string }[] = [
  { kind: 'cmd', text: '$ npm run dev' },
  { kind: 'dim', text: '> tarpp.dev@1.0.0 dev' },
  { kind: 'dim', text: '> next dev' },
  { kind: 'out', text: '▲ Next.js 16  ·  Local: http://localhost:3000' },
  { kind: 'out', text: '○ Compiling guitar.ts …' },
];
const READY = '✓ Ready in 1.2s';

function timecode(seconds: number) {
  const frames = Math.floor(seconds * 24);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `00:00:${pad(Math.floor(frames / 24))}:${pad(frames % 24)}`;
}

/**
 * Opening titles in the site's own language: the dev server boots, six strings are
 * plucked, the name decodes from code, and the whole screen shrinks into the hero's
 * editor window. Decorative: the page underneath is complete without it.
 */
export function FilmIntro() {
  const { lang, t } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = root.current;
    if (!overlay) return;
    const html = document.documentElement;
    const q = gsap.utils.selector(overlay);
    const clock = overlay.querySelector<HTMLElement>('[data-timecode]');
    const percent = overlay.querySelector<HTMLElement>('[data-percent]');
    const moduleName = overlay.querySelector<HTMLElement>('[data-module]');
    const chars = Array.from(overlay.querySelectorAll<HTMLElement>('.film-char'));
    let timeline: gsap.core.Timeline | undefined;
    let revealed = false;
    let locked = false;
    let target = 'inset(0% 0% 0% 0% round 0px)';

    const block = (event: Event) => {
      event.preventDefault();
      skip();
    };
    const onKey = (event: KeyboardEvent) => {
      if (['Escape', 'Enter', ' ', 'ArrowDown', 'PageDown'].includes(event.key)) block(event);
    };
    const lock = () => {
      if (locked) return;
      locked = true;
      window.addEventListener('wheel', block, { passive: false });
      window.addEventListener('touchmove', block, { passive: false });
      window.addEventListener('keydown', onKey);
    };
    const unlock = () => {
      if (!locked) return;
      locked = false;
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', onKey);
    };
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      unlock();
      // Listeners set their "from" states synchronously, before the screen shrinks away.
      window.dispatchEvent(new Event('film:reveal'));
      html.dataset.intro = 'reveal';
    };
    const finish = () => {
      reveal();
      timeline?.kill();
      timeline = undefined;
      delete html.dataset.intro;
    };
    function skip() {
      if (!timeline || revealed) return;
      const cut = timeline.labels.reveal - 0.35;
      if (timeline.time() < cut) timeline.seek(cut, false);
    }
    // Where the opening lands: the hero's editor window, measured before it animates in.
    const measureEditor = () => {
      const editor = document.querySelector('.code-editor')?.getBoundingClientRect();
      const { innerWidth: w, innerHeight: h } = window;
      target = editor
        ? `inset(${editor.top}px ${w - editor.right}px ${h - editor.bottom}px ${editor.left}px round 14px)`
        : 'inset(40% 40% 40% 40% round 14px)';
    };
    // Unrevealed characters cycle through code glyphs; revealed ones settle on the name.
    const decode = (progress: number) => {
      chars.forEach((char, index) => {
        // Spread reveals over 0–85% so the last letter settles before the tween ends.
        const at = (index / chars.length) * 0.85;
        const real = char.dataset.char ?? '';
        char.textContent =
          progress >= at + 0.12
            ? real
            : progress >= at - 0.3
              ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              : real;
        char.dataset.state =
          progress >= at + 0.12 ? 'done' : progress >= at - 0.3 ? 'scramble' : 'wait';
      });
    };

    const play = () => {
      timeline?.kill();
      revealed = false;
      html.dataset.intro = 'play';
      try {
        sessionStorage.setItem(FILM_INTRO_KEY, '1');
      } catch {
        /* Storage can be unavailable; the intro still plays. */
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      lock();

      const lines = q('.boot-line .code-text');
      const decoder = { progress: 0 };
      const loader = { progress: 0 };
      timeline = gsap.timeline({
        onComplete: finish,
        onUpdate() {
          if (clock && timeline) clock.textContent = timecode(timeline.time());
        },
      });
      timeline
        .set(overlay, { clipPath: 'inset(0% 0% 0% 0% round 0px)', autoAlpha: 1 })
        .set(q('.film-screen > *, .film-meta, .film-skip'), { clearProps: 'all' })
        // Not clearProps: each string keeps its inline --s thickness.
        .set(q('.film-string'), { scaleX: 0, scaleY: 1 })
        .set(lines, { '--w': 0 })
        .set(q('.boot-line'), { autoAlpha: 0 })
        .set(q('.boot-progress'), { autoAlpha: 0 })
        .set(q('.film-presents, .film-rule, .film-role'), { autoAlpha: 0 })
        .set(chars, { autoAlpha: 0 })
        .fromTo(q('.film-meta'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0);

      // 1. The dev server boots, one line at a time.
      let at = 0.3;
      lines.forEach((line, index) => {
        const length = BOOT[index]?.text.length ?? READY.length;
        if (index === BOOT.length) {
          // Module progress bar before the ready line.
          timeline!.set(q('.boot-progress'), { autoAlpha: 1 }, at).fromTo(
            loader,
            { progress: 0 },
            {
              progress: 1,
              duration: 0.6,
              ease: 'power2.inOut',
              onUpdate() {
                const value = loader.progress;
                overlay.style.setProperty('--load', String(value));
                if (percent) percent.textContent = `${Math.round(value * 100)}%`;
                if (moduleName)
                  moduleName.textContent =
                    MODULES[Math.min(MODULES.length - 1, Math.floor(value * MODULES.length))];
              },
            },
            at,
          );
          at += 0.7;
        }
        timeline!
          .set(line.parentElement, { autoAlpha: 1 }, at)
          .to(
            line,
            { '--w': length, duration: Math.max(0.12, length * 0.011), ease: `steps(${length})` },
            at,
          );
        at += Math.max(0.12, length * 0.011) + 0.07;
      });
      at += 0.25;
      timeline
        .to(
          q('.film-boot'),
          { autoAlpha: 0, y: -24, filter: 'blur(6px)', duration: 0.3, ease: 'power2.in' },
          at,
        )
        .fromTo(
          q('.film-flash'),
          { opacity: 0 },
          { opacity: 0.5, duration: 0.05, yoyo: true, repeat: 1 },
          at + 0.25,
        );

      // 2. Six strings draw across the screen, the name decodes, then the strings are plucked.
      const strings = at + 0.3;
      timeline
        .to(
          q('.film-string'),
          { scaleX: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05 },
          strings,
        )
        .to(q('.film-presents'), { autoAlpha: 1, duration: 0.5 }, strings + 0.2)
        .to(chars, { autoAlpha: 1, duration: 0.01, stagger: 0.025 }, strings + 0.3)
        .fromTo(
          decoder,
          { progress: 0 },
          {
            progress: 1,
            duration: 1.1,
            ease: 'none',
            onUpdate: () => decode(decoder.progress),
            onComplete: () => decode(1),
          },
          strings + 0.3,
        )
        .fromTo(
          q('.film-name'),
          { letterSpacing: '-0.02em', scale: 0.96 },
          { letterSpacing: '0.03em', scale: 1, duration: 2, ease: 'none' },
          strings + 0.3,
        )
        .to(
          q('.film-string'),
          {
            scaleY: 3.5,
            duration: 0.045,
            yoyo: true,
            repeat: 9,
            stagger: 0.025,
            ease: 'sine.inOut',
          },
          strings + 0.75,
        )
        .fromTo(
          q('.film-rule'),
          { scaleX: 0, autoAlpha: 1 },
          { scaleX: 1, duration: 0.8, ease: 'expo.inOut' },
          strings + 1.2,
        )
        .fromTo(
          q('.film-role'),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          strings + 1.4,
        )
        .addLabel('reveal', strings + 2.5);

      // 3. The whole screen shrinks into the hero's editor window and hands over.
      timeline
        .call(measureEditor, [], 'reveal-=0.4')
        .to(
          q('.film-title, .film-strings'),
          { autoAlpha: 0, scale: 0.97, duration: 0.35, ease: 'power2.in' },
          'reveal-=0.35',
        )
        .to(
          q('.film-meta, .film-skip, .film-grain'),
          { autoAlpha: 0, duration: 0.3 },
          'reveal-=0.3',
        )
        .call(reveal, [], 'reveal')
        .to(overlay, { clipPath: () => target, duration: 1, ease: 'expo.inOut' }, 'reveal')
        .to(overlay, { autoAlpha: 0, duration: 0.35, ease: 'power1.out' }, 'reveal+=0.75');
    };

    const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (html.dataset.intro === 'play') {
      if (reducedMotion()) delete html.dataset.intro;
      else play();
    }
    const onReplay = () => {
      if (!reducedMotion()) play();
    };
    window.addEventListener('film:replay', onReplay);
    window.addEventListener('film:skip', skip);
    return () => {
      window.removeEventListener('film:replay', onReplay);
      window.removeEventListener('film:skip', skip);
      timeline?.kill();
      unlock();
    };
  }, []);

  return (
    <div ref={root} className="film-intro" lang={lang}>
      <div className="film-screen" aria-hidden="true">
        <div className="film-boot">
          {BOOT.map((line) => (
            <span key={line.text} className={`boot-line term-${line.kind}`}>
              <span
                className="code-text"
                style={{ '--len': line.text.length } as React.CSSProperties}
              >
                {line.text}
              </span>
            </span>
          ))}
          <span className="boot-progress">
            <span className="boot-bar">
              <span />
            </span>
            <span data-percent>0%</span>
            <span data-module>react</span>
          </span>
          <span className="boot-line term-ok">
            <span className="code-text" style={{ '--len': READY.length } as React.CSSProperties}>
              {READY}
            </span>
          </span>
        </div>
        <div className="film-strings">
          {Array.from({ length: 6 }, (_, index) => (
            <span
              key={index}
              className="film-string"
              style={{ '--s': index } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="film-title">
          <p className="film-presents">{t.film.presents}</p>
          <div className="film-name">
            {NAME.split(' ').map((word) => (
              <span className="film-word" key={word}>
                {word.split('').map((char, index) => (
                  <span className="film-char" key={index} data-char={char}>
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
          <span className="film-rule" />
          <p className="film-role">{t.film.role}</p>
        </div>
        <div className="film-meta">
          <span>tarpp.dev — build 01</span>
          <span data-timecode>00:00:00:00</span>
          <span>main ✓</span>
          <span>{t.film.kicker}</span>
        </div>
        <div className="film-flash" />
        <div className="film-scan" />
        <div className="film-grain" />
        <div className="film-vignette" />
      </div>
      <button className="film-skip" onClick={() => window.dispatchEvent(new Event('film:skip'))}>
        {t.film.skip}
      </button>
    </div>
  );
}
