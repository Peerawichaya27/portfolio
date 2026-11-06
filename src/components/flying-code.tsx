'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TOKENS = [
  '{ }',
  '</>',
  '=>',
  '( )',
  '[ ]',
  '&&',
  'fn',
  'λ',
  '0x2A',
  '++',
  '::',
  '?.',
  '!=',
  '#',
];
const STREAM = 14;

/** Short code-particle bursts respond to the opening guitar and explicit strums. */
export function FlyingCode() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = element.closest<HTMLElement>('.performance-stage');
    const scene = element.closest<HTMLElement>('.performance-scene');
    const notes = gsap.utils.toArray<HTMLElement>('.flying-note', element);
    const random = gsap.utils.random;

    // Follows the guitar's sound hole as the scroll scene moves it left.
    const origin = () => {
      const progress = Number.parseFloat(
        scene?.style.getPropertyValue('--performance-progress') || '0',
      );
      // The guitar lives in the editor's preview pane; tokens rise from its body.
      const preview = stage?.querySelector('.editor-preview')?.getBoundingClientRect();
      const host = element.getBoundingClientRect();
      if (!preview) return { x: host.width * 0.6, y: host.height * 0.7 };
      return {
        x: preview.left - host.left + preview.width * (0.5 - (progress || 0) * 0.05),
        y: preview.top - host.top + preview.height * 0.62,
      };
    };

    // Particles are feedback for the guitar, not an always-running background.
    const context = gsap.context(() => gsap.set(notes, { opacity: 0 }), element);

    const burst = (x: number, y: number, count = 9) => {
      for (let i = 0; i < count; i++) {
        const note = notes[i % notes.length].cloneNode(true) as HTMLElement;
        note.classList.add('is-burst');
        element.appendChild(note);
        const angle = random(-Math.PI * 0.95, -Math.PI * 0.05);
        const distance = random(120, 320);
        gsap.fromTo(
          note,
          { x, y, scale: 0.2, rotation: random(-40, 40), opacity: 1 },
          {
            x: x + Math.cos(angle) * distance,
            y: y + Math.sin(angle) * distance,
            scale: random(0.9, 1.6),
            rotation: random(-200, 200),
            opacity: 0,
            duration: random(1.2, 2),
            ease: 'expo.out',
            onComplete: () => note.remove(),
          },
        );
      }
    };

    // The guitar intro plucks its strings about 1.7s after the curtains part.
    let pluck: gsap.core.Tween | undefined;
    const onReveal = () => {
      pluck?.kill();
      pluck = gsap.delayedCall(1.7, () => {
        const { x, y } = origin();
        burst(x, y, 14);
      });
    };
    window.addEventListener('film:reveal', onReveal);
    const onStrum = () => {
      const { x, y } = origin();
      burst(x, y, 12);
    };
    window.addEventListener('guitar:strum', onStrum);
    element.dataset.ready = 'true';

    return () => {
      pluck?.kill();
      window.removeEventListener('film:reveal', onReveal);
      window.removeEventListener('guitar:strum', onStrum);
      element.querySelectorAll('.is-burst').forEach((note) => {
        gsap.killTweensOf(note);
        note.remove();
      });
      context.revert();
      delete element.dataset.ready;
    };
  }, []);

  return (
    <div ref={host} className="flying-code" aria-hidden="true">
      {Array.from({ length: STREAM }, (_, index) => (
        <span key={index} className={`flying-note tone-${index % 3}`}>
          <span>{TOKENS[index % TOKENS.length]}</span>
        </span>
      ))}
    </div>
  );
}
