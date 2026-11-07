'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useStudioRuntime } from '@/features/studio/provider';
import { StudioSignature } from './studio-signature';

export function GuitarScene() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const runtime = useStudioRuntime();

  useEffect(() => {
    const element = host.current,
      surface = canvas.current;
    if (!element || !surface) return;
    let stopped = false;
    let dispose = () => {};
    void import('@/features/studio/guitar-world')
      .then(({ createGuitarWorld, GuitarCapabilityError }) => {
        if (stopped) return;
        let world: ReturnType<typeof createGuitarWorld>;
        try {
          world = createGuitarWorld(surface);
        } catch (error) {
          element.dataset.rendererStatus = 'unavailable';
          if (!(error instanceof GuitarCapabilityError))
            console.error('Unable to initialize guitar scene', error);
          return;
        }
        const unregisterBounds = runtime.registerGuitarBounds(() =>
          element.getBoundingClientRect(),
        );
        const pose = { entrance: 1, vibration: 0, phase: 0 };
        const pointer = { x: 0, y: 0 };
        let frame = 0,
          progress = 0,
          visible = true,
          lost = false;
        let entrance: gsap.core.Timeline | undefined;
        let strum: gsap.core.Timeline | undefined;
        const draw = () => {
          frame = 0;
          if (!visible || document.hidden || lost) return;
          const active = runtime.getSnapshot().motionEnabled;
          world.render({
            progress: active ? progress : 0,
            pointer: active ? pointer : { x: 0, y: 0 },
            entrance: active ? pose.entrance : 1,
            vibration: active ? pose.vibration : 0,
            phase: pose.phase,
          });
          element.dataset.ready = 'true';
        };
        const schedule = () => {
          if (!frame) frame = requestAnimationFrame(draw);
        };
        const synchronize = () => {
          const active = runtime.getSnapshot().motionEnabled;
          if (!active) {
            entrance?.kill();
            strum?.kill();
            entrance = undefined;
            strum = undefined;
            pose.entrance = 1;
            pose.vibration = 0;
          } else {
            const pause = !visible || document.hidden;
            entrance?.paused(pause);
            strum?.paused(pause);
          }
          schedule();
        };
        const unsubscribeState = runtime.subscribe(synchronize);
        const unsubscribeProgress = runtime.onHeroProgress((value) => {
          progress = value;
          schedule();
        });
        const unsubscribeStrum = runtime.onStrum(() => {
          if (lost) return;
          strum?.kill();
          strum = gsap
            .timeline({ onUpdate: schedule })
            .fromTo(pose, { vibration: 0 }, { vibration: 1, duration: 0.1 }, 0)
            .to(pose, { vibration: 0, duration: 1.1, ease: 'power2.out' }, 0.1)
            .fromTo(pose, { phase: 0 }, { phase: 60, duration: 1.2, ease: 'none' }, 0);
          synchronize();
        });
        const unsubscribeReveal = runtime.onHeroReveal((reveal) => {
          entrance?.kill();
          strum?.kill();
          pose.vibration = 0;
          if (!reveal.animate || lost) {
            pose.entrance = 1;
            schedule();
            return;
          }
          pose.entrance = 0;
          entrance = gsap
            .timeline({ onUpdate: schedule })
            .to(pose, { entrance: 1, duration: 2.2, ease: 'power3.inOut' }, 0)
            .call(() => runtime.strum('intro'), [], 1.7);
          synchronize();
        });
        const move = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return;
          pointer.x = event.clientX / window.innerWidth - 0.5;
          pointer.y = event.clientY / window.innerHeight - 0.5;
          schedule();
        };
        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          synchronize();
        });
        intersection.observe(element);
        const resize = new ResizeObserver(schedule);
        resize.observe(element);
        const contextLost = (event: Event) => {
          event.preventDefault();
          lost = true;
          entrance?.kill();
          strum?.kill();
          delete element.dataset.ready;
          element.dataset.rendererStatus = 'unavailable';
        };
        const visibilityChange = () => synchronize();
        surface.addEventListener('webglcontextlost', contextLost);
        window.addEventListener('pointermove', move, { passive: true });
        document.addEventListener('visibilitychange', visibilityChange);
        synchronize();
        dispose = () => {
          cancelAnimationFrame(frame);
          entrance?.kill();
          strum?.kill();
          unsubscribeState();
          unsubscribeProgress();
          unsubscribeStrum();
          unsubscribeReveal();
          intersection.disconnect();
          resize.disconnect();
          surface.removeEventListener('webglcontextlost', contextLost);
          window.removeEventListener('pointermove', move);
          document.removeEventListener('visibilitychange', visibilityChange);
          unregisterBounds();
          world.dispose();
          delete element.dataset.ready;
          delete element.dataset.rendererStatus;
        };
      })
      .catch((error) => {
        if (!stopped) {
          element.dataset.rendererStatus = 'unavailable';
          console.error('Unable to load guitar scene', error);
        }
      });
    return () => {
      stopped = true;
      dispose();
    };
  }, [runtime]);

  return (
    <div ref={host} className="guitar-world" aria-hidden="true">
      <div className="guitar-fallback">
        <StudioSignature />
      </div>
      <canvas ref={canvas} />
    </div>
  );
}
