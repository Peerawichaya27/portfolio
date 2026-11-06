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

/** Code tokens drift up out of the guitar on screen; clicks and each strum release a burst. */
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

    const loops: gsap.core.Animation[] = [];
    const context = gsap.context(() => {
      notes.forEach((note, index) => {
        const sway = gsap.to(note.firstElementChild, {
          xPercent: () => random(-90, 90),
          duration: () => random(0.9, 1.6),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          repeatRefresh: true,
        });
        const rise = gsap
          .timeline({
            repeat: -1,
            repeatRefresh: true,
            repeatDelay: random(0.2, 1.4),
            delay: index * 0.38,
          })
          .fromTo(
            note,
            {
              x: () => origin().x + random(-50, 50),
              y: () => origin().y + random(-30, 30),
              rotation: () => random(-30, 30),
              scale: () => random(0.4, 0.7),
              opacity: 0,
            },
            {
              x: () => `+=${random(-260, 260)}`,
              y: () => `-=${random(280, 520)}`,
              rotation: () => random(-80, 80),
              scale: () => random(0.9, 1.4),
              duration: 4.2,
              ease: 'sine.out',
            },
            0,
          )
          .to(note, { opacity: 1, duration: 0.6 }, 0)
          .to(note, { opacity: 0, duration: 1.2 }, 3);
        loops.push(sway, rise);
      });
    }, element);

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
    const onPointer = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      burst(event.clientX - rect.left, event.clientY - rect.top);
    };
    const observer = new IntersectionObserver(([entry]) => {
      loops.forEach((loop) => (entry.isIntersecting ? loop.resume() : loop.pause()));
    });
    observer.observe(element);
    window.addEventListener('film:reveal', onReveal);
    const onStrum = () => {
      const { x, y } = origin();
      burst(x, y, 12);
    };
    window.addEventListener('guitar:strum', onStrum);
    stage?.addEventListener('pointerdown', onPointer);
    element.dataset.ready = 'true';

    return () => {
      observer.disconnect();
      pluck?.kill();
      window.removeEventListener('film:reveal', onReveal);
      window.removeEventListener('guitar:strum', onStrum);
      stage?.removeEventListener('pointerdown', onPointer);
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
