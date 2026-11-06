'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { StudioSignature } from './studio-signature';

export function GuitarScene() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = host.current,
      surface = canvas.current;
    if (!element || !surface) return;
    let stopped = false;
    let dispose = () => {};
    void import('@/lib/guitar-world')
      .then(({ createGuitarWorld }) => {
        if (stopped) return;
        let world: ReturnType<typeof createGuitarWorld>;
        try {
          world = createGuitarWorld(surface);
        } catch {
          return;
        }
        let frame = 0,
          pointerX = 0,
          pointerY = 0,
          visible = true,
          lost = false;
        const scene = element.closest<HTMLElement>('.performance-scene');
        const pose = { entrance: 1, vibration: 0, phase: 0 };
        let intro: gsap.core.Timeline | undefined;
        let played = false;
        const draw = () => {
          frame = 0;
          if (!visible || document.hidden || lost) return;
          const active = document.documentElement.dataset.studioMotion === 'on';
          const rawProgress = Number.parseFloat(
            scene?.style.getPropertyValue('--performance-progress') || '0',
          );
          const progress =
            active && Number.isFinite(rawProgress) ? Math.max(0, Math.min(1, rawProgress)) : 0;
          world.render(
            progress,
            active ? pointerX : 0,
            active ? pointerY : 0,
            active ? pose.entrance : 1,
            active ? pose.vibration : 0,
            pose.phase,
          );
          element.dataset.ready = 'true';
        };
        const schedule = () => {
          if (!frame) frame = requestAnimationFrame(draw);
        };
        const playIntro = () => {
          if (document.documentElement.dataset.studioMotion !== 'on' || document.hidden || lost)
            return;
          intro?.kill();
          played = true;
          pose.entrance = 0;
          pose.vibration = 0;
          pose.phase = 0;
          intro = gsap.timeline({ onUpdate: schedule });
          intro
            .to(pose, { entrance: 1, duration: 2.2, ease: 'power3.inOut' }, 0)
            .to(pose, { vibration: 1, duration: 0.12 }, 1.7)
            .to(pose, { vibration: 0, duration: 0.8, ease: 'power2.out' }, 1.82)
            .to(pose, { phase: 48, duration: 0.92, ease: 'none' }, 1.7);
          schedule();
        };
        const updateMotion = () => {
          const active = document.documentElement.dataset.studioMotion === 'on';
          if (!active) {
            intro?.kill();
            intro = undefined;
            pose.entrance = 1;
            pose.vibration = 0;
          } else if (
            !played &&
            document.documentElement.dataset.intro !== 'play' &&
            window.scrollY < window.innerHeight * 0.25 &&
            !window.location.hash
          )
            playIntro();
          schedule();
        };
        const move = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return;
          pointerX = event.clientX / window.innerWidth - 0.5;
          pointerY = event.clientY / window.innerHeight - 0.5;
          schedule();
        };
        const observer = new IntersectionObserver((entries) => {
          visible = entries[0].isIntersecting;
          if (visible) {
            if (intro?.paused() && !document.hidden) intro.resume();
            schedule();
          } else intro?.pause();
        });
        observer.observe(element);
        const resize = new ResizeObserver(schedule);
        resize.observe(element);
        const motion = new MutationObserver(updateMotion);
        motion.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-studio-motion', 'data-theme'],
        });
        const scrollMotion = new MutationObserver(schedule);
        if (scene) scrollMotion.observe(scene, { attributes: true, attributeFilter: ['style'] });
        const contextLost = (event: Event) => {
          event.preventDefault();
          lost = true;
          intro?.kill();
          delete element.dataset.ready;
        };
        surface.addEventListener('webglcontextlost', contextLost);
        window.addEventListener('pointermove', move, { passive: true });
        const visibilityChange = () => {
          if (document.hidden) intro?.pause();
          else {
            if (visible) intro?.resume();
            updateMotion();
          }
        };
        // The opening titles hand over to the guitar as the curtains part.
        window.addEventListener('film:reveal', playIntro);
        // The editor's code calls guitar.strum(): ring the strings without the entrance.
        let strum: gsap.core.Timeline | undefined;
        const onStrum = () => {
          if (document.documentElement.dataset.studioMotion !== 'on' || lost) return;
          strum?.kill();
          strum = gsap
            .timeline({ onUpdate: schedule })
            .fromTo(pose, { vibration: 0 }, { vibration: 1, duration: 0.1 }, 0)
            .to(pose, { vibration: 0, duration: 1.1, ease: 'power2.out' }, 0.1)
            .fromTo(pose, { phase: 0 }, { phase: 60, duration: 1.2, ease: 'none' }, 0);
        };
        window.addEventListener('guitar:strum', onStrum);
        document.addEventListener('visibilitychange', visibilityChange);
        updateMotion();
        dispose = () => {
          cancelAnimationFrame(frame);
          intro?.kill();
          observer.disconnect();
          resize.disconnect();
          motion.disconnect();
          scrollMotion.disconnect();
          window.removeEventListener('film:reveal', playIntro);
          window.removeEventListener('guitar:strum', onStrum);
          strum?.kill();
          window.removeEventListener('pointermove', move);
          document.removeEventListener('visibilitychange', visibilityChange);
          surface.removeEventListener('webglcontextlost', contextLost);
          world.dispose();
          delete element.dataset.ready;
        };
      })
      .catch(() => {
        /* The original SVG remains visible when WebGL cannot load. */
      });
    return () => {
      stopped = true;
      dispose();
    };
  }, []);

  return (
    <div ref={host} className="guitar-world" aria-hidden="true">
      <div className="guitar-fallback">
        <StudioSignature />
      </div>
      <canvas ref={canvas} />
    </div>
  );
}
