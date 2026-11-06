'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Scroll effects enhance the static page; no content depends on animation. */
export function StudioMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};

    function setup() {
      dispose();
      if (preference.matches) return;

      const stage = document.querySelector<HTMLElement>('.studio-signature');
      const sections = document.querySelectorAll<HTMLElement>(
        '.section-heading, .expertise-grid > article, .project-card, .timeline > article, .skills-grid > div, .research-list > article, .contact, .education, .empty-state',
      );
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute('data-motion', 'entered');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );

      sections.forEach((element) => {
        if (element.getBoundingClientRect().top >= window.innerHeight) {
          element.dataset.motion = 'waiting';
          observer.observe(element);
        }
      });

      let frame = 0;
      const update = () => {
        frame = 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty(
          '--scroll-progress',
          String(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0),
        );
        if (stage) {
          const bounds = stage.getBoundingClientRect();
          const progress = Math.max(
            -1,
            Math.min(
              1,
              (window.innerHeight / 2 - bounds.top - bounds.height / 2) / window.innerHeight,
            ),
          );
          stage.style.setProperty('--stage-scroll', String(progress));
        }
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      const tilt = (event: PointerEvent) => {
        if (!stage || event.pointerType !== 'mouse') return;
        const bounds = stage.getBoundingClientRect();
        stage.style.setProperty(
          '--tilt-x',
          `${(event.clientX - bounds.left) / bounds.width - 0.5}`,
        );
        stage.style.setProperty(
          '--tilt-y',
          `${(event.clientY - bounds.top) / bounds.height - 0.5}`,
        );
      };
      const resetTilt = () => {
        stage?.style.setProperty('--tilt-x', '0');
        stage?.style.setProperty('--tilt-y', '0');
      };

      update();
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      stage?.addEventListener('pointermove', tilt);
      stage?.addEventListener('pointerleave', resetTilt);
      document.documentElement.dataset.studioMotion = 'on';

      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        stage?.removeEventListener('pointermove', tilt);
        stage?.removeEventListener('pointerleave', resetTilt);
        sections.forEach((element) => element.removeAttribute('data-motion'));
        stage?.style.removeProperty('--stage-scroll');
        resetTilt();
        delete document.documentElement.dataset.studioMotion;
        document.documentElement.style.removeProperty('--scroll-progress');
      };
    }

    if ('IntersectionObserver' in window) setup();
    preference.addEventListener('change', setup);
    return () => {
      dispose();
      preference.removeEventListener('change', setup);
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
