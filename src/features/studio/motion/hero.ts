import { gsap } from 'gsap';
import type { SplitText } from 'gsap/SplitText';
import type { StudioRuntime } from '../runtime';
import { splitPieces } from './text';
import { headerOffset } from './geometry';

export function animateHero(scope: HTMLElement, runtime: StudioRuntime) {
  const scene = scope.querySelector<HTMLElement>('.performance-scene');
  let entrance: gsap.core.Timeline | undefined;
  let split: SplitText | undefined;
  const context = gsap.context(() => {
    if (!scene) return;
    const progress = { value: 0 };
    const trigger = (scrub: number) => ({
      trigger: scene,
      start: () => `top ${headerOffset()}px`,
      end: 'bottom bottom',
      scrub,
      invalidateOnRefresh: true,
    });
    gsap.to(progress, {
      value: 1,
      ease: 'none',
      onUpdate: () => {
        scene.style.setProperty('--performance-progress', String(progress.value));
        runtime.setHeroProgress(progress.value);
      },
      scrollTrigger: trigger(0.7),
    });
    gsap.to(scene.querySelectorAll('.stage-letter > span'), {
      rotationX: -360,
      ease: 'none',
      stagger: 0.14,
      scrollTrigger: trigger(1.2),
    });
    gsap.to(scope.querySelector('.spin-badge-ring'), {
      rotation: 900,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.6 },
    });
  }, scope);
  const unsubscribe = runtime.onHeroReveal((reveal) =>
    context.add(() => {
      entrance?.revert();
      split?.revert();
      if (!reveal.animate) return;
      const intro = scope.querySelector<HTMLElement>('.stage-intro');
      const title = intro?.querySelector('h1');
      if (!intro || !title) return;
      const segmented = splitPieces(title);
      split = segmented.split;
      const currentSplit = split;
      entrance = gsap
        .timeline({ defaults: { ease: 'expo.out' }, onComplete: () => currentSplit.revert() })
        .from(
          scope.querySelectorAll('.stage-letter'),
          { yPercent: 90, opacity: 0, duration: 1.8, stagger: 0.07 },
          0,
        )
        .from(
          segmented.pieces,
          {
            yPercent: 110,
            rotationX: -95,
            opacity: 0,
            transformOrigin: '50% 100%',
            transformPerspective: 600,
            duration: 1.3,
            stagger: 0.035,
          },
          0.2,
        )
        .from(
          intro.querySelectorAll(':scope > :not(h1)'),
          { y: 28, opacity: 0, duration: 1.1, stagger: 0.12 },
          0.55,
        )
        .from(
          scope.querySelector('.code-editor'),
          {
            y: 70,
            rotationX: 16,
            opacity: 0,
            transformPerspective: 1400,
            transformOrigin: '50% 100%',
            duration: 1.5,
          },
          0.1,
        )
        .from(
          scope.querySelectorAll('.stage-bottom > *, .spin-badge'),
          { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 },
          0.9,
        );
    }),
  );
  return () => {
    unsubscribe();
    entrance?.revert();
    split?.revert();
    context.revert();
    scene?.style.removeProperty('--performance-progress');
    runtime.setHeroProgress(0);
  };
}
