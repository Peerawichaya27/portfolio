'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useStudioRuntime } from '@/features/studio/provider';

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

export function FlyingCode() {
  const host = useRef<HTMLDivElement>(null);
  const runtime = useStudioRuntime();

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let progress = 0;
    const unsubscribeProgress = runtime.onHeroProgress((value) => {
      progress = value;
    });
    const notes = gsap.utils.toArray<HTMLElement>('.flying-note', element);
    const random = gsap.utils.random;

    const origin = () => {
      const preview = runtime.measureGuitarBounds();
      const bounds = element.getBoundingClientRect();
      if (!preview) return null;
      return {
        x: preview.left - bounds.left + (preview.right - preview.left) * (0.5 - progress * 0.05),
        y: preview.top - bounds.top + (preview.bottom - preview.top) * 0.62,
      };
    };
    const context = gsap.context(() => gsap.set(notes, { opacity: 0 }), element);

    const burst = (x: number, y: number, count: number) => {
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

    const unsubscribeStrum = runtime.onStrum((source) => {
      if (document.hidden) return;
      const point = origin();
      if (point) burst(point.x, point.y, source === 'intro' ? TOKENS.length : 12);
    });
    element.dataset.ready = 'true';

    return () => {
      unsubscribeStrum();
      unsubscribeProgress();
      element.querySelectorAll('.is-burst').forEach((note) => {
        gsap.killTweensOf(note);
        note.remove();
      });
      context.revert();
      delete element.dataset.ready;
    };
  }, [runtime]);

  return (
    <div ref={host} className="flying-code" aria-hidden="true">
      {Array.from({ length: TOKENS.length }, (_, index) => (
        <span key={index} className={`flying-note tone-${index % 3}`}>
          <span>{TOKENS[index % TOKENS.length]}</span>
        </span>
      ))}
    </div>
  );
}
