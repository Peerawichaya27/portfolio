'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useStudioRuntime, useStudioSnapshot } from '@/features/studio/provider';
import { animateHero } from '@/features/studio/motion/hero';
import { animateText } from '@/features/studio/motion/text';
import { animateContent } from '@/features/studio/motion/content';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function StudioMotion() {
  const runtime = useStudioRuntime();
  const { motionEnabled } = useStudioSnapshot();
  useEffect(() => {
    const scope = document.querySelector('main');
    if (!motionEnabled || !scope) return;
    let disposed = false;
    let cleanupContent = () => {};
    const context = gsap.context(() => {
      animateText(scope);
      cleanupContent = animateContent(scope);
      gsap.fromTo(
        document.documentElement,
        { '--scroll-progress': 0 },
        {
          '--scroll-progress': 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
        },
      );
    }, scope);
    const cleanupHero = animateHero(scope, runtime);
    const refresh = gsap.delayedCall(0.12, () => ScrollTrigger.refresh()).pause();
    const scheduleRefresh = () => {
      refresh.restart(true);
    };
    const resize = new ResizeObserver(scheduleRefresh);
    resize.observe(scope);
    document.addEventListener('toggle', scheduleRefresh, true);
    void document.fonts.ready.then(() => {
      if (!disposed) scheduleRefresh();
    });
    let landing = 0;
    const hash = window.location.hash.slice(1);
    if (hash)
      landing = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        document.getElementById(hash)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    return () => {
      disposed = true;
      cancelAnimationFrame(landing);
      resize.disconnect();
      refresh.kill();
      document.removeEventListener('toggle', scheduleRefresh, true);
      cleanupHero();
      cleanupContent();
      context.revert();
    };
  }, [runtime, motionEnabled]);
  return <div className="scroll-progress" aria-hidden="true" />;
}
