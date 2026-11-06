'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

function subscribeMotionPreference(notify: () => void) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  preference.addEventListener('change', notify);
  return () => preference.removeEventListener('change', notify);
}

// Splitting Thai into characters would separate vowels and tone marks from their
// consonants, so Thai text animates by word (whole lines, as Thai has no spaces).
const THAI = /[\u0E00-\u0E7F]/;
const splitPieces = (element: HTMLElement) => {
  const thai = THAI.test(element.textContent ?? '');
  const split = SplitText.create(element, {
    type: thai ? 'words' : 'words,chars',
    charsClass: 'split-char',
    wordsClass: 'split-word',
  });
  return { split, pieces: thai ? split.words : split.chars };
};

const headerOffset = () => (window.innerWidth <= 760 ? 72 : 80);

/** Scroll effects enhance the static page; no content depends on animation. */
export function StudioMotion() {
  const pathname = usePathname();
  const reducedMotion = useSyncExternalStore(
    subscribeMotionPreference,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    // Wait for the device preference instead of starting and cancelling the intro.
    () => true,
  );
  const enabled = !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const main = document.querySelector('main');
    let disposed = false;
    root.dataset.studioMotion = 'on';

    const context = gsap.context(() => {
      heroScene();
      rotatingHeadings();
      wordReveals();
      perspectiveRows();
      marquees();
      skillDrum();
      terminal();
      filmStill();
      reveals();
      gsap.fromTo(
        root,
        { '--scroll-progress': 0 },
        {
          '--scroll-progress': 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
        },
      );
    }, main ?? undefined);

    let heroTimeline: gsap.core.Timeline | undefined;
    let heroSplit: SplitText | undefined;
    const heroEntrance = () =>
      context.add(() => {
        heroTimeline?.revert();
        heroSplit?.revert();
        const intro = document.querySelector<HTMLElement>('.stage-intro');
        const title = intro?.querySelector('h1');
        if (!intro || !title) return;
        const { split, pieces } = splitPieces(title);
        heroSplit = split;
        heroTimeline = gsap
          .timeline({ defaults: { ease: 'expo.out' }, onComplete: () => split.revert() })
          .from('.stage-letter', { yPercent: 90, opacity: 0, duration: 1.8, stagger: 0.07 }, 0)
          .from(
            pieces,
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
            '.code-editor',
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
            '.stage-bottom > *, .spin-badge',
            { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 },
            0.9,
          );
      });

    // Pinned scenes add height above later sections, so a deep link (e.g. /#research)
    // must be re-applied once the scroll layout exists.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const landing = hash
      ? requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          document.getElementById(hash)?.scrollIntoView({ block: 'start', behavior: 'instant' });
        })
      : 0;

    window.addEventListener('film:reveal', heroEntrance);
    if (root.dataset.intro !== 'play' && window.scrollY < window.innerHeight * 0.25) heroEntrance();

    const refresh = gsap.delayedCall(0.12, () => ScrollTrigger.refresh()).pause();
    const scheduleRefresh = () => {
      refresh.restart(true);
    };
    const resize = new ResizeObserver(scheduleRefresh);
    if (main) resize.observe(main);
    document.addEventListener('toggle', scheduleRefresh, true);
    void document.fonts.ready.then(() => {
      if (!disposed) scheduleRefresh();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(landing);
      window.removeEventListener('film:reveal', heroEntrance);
      resize.disconnect();
      document.removeEventListener('toggle', scheduleRefresh, true);
      refresh.kill();
      heroSplit?.revert();
      context.revert();
      delete root.dataset.studioMotion;
    };
  }, [pathname, enabled]);

  return <div className="scroll-progress" aria-hidden="true" />;
}

/** The pinned hero: guitar progress plus the giant word flipping letter by letter. */
function heroScene() {
  const scene = document.querySelector<HTMLElement>('.performance-scene');
  if (!scene) return;
  const trigger = (scrub: number): ScrollTrigger.Vars => ({
    trigger: scene,
    start: () => `top ${headerOffset()}px`,
    end: 'bottom bottom',
    scrub,
    invalidateOnRefresh: true,
  });
  gsap.fromTo(
    scene,
    { '--performance-progress': 0 },
    { '--performance-progress': 1, ease: 'none', scrollTrigger: trigger(0.7) },
  );
  gsap.to(scene.querySelectorAll('.stage-letter > span'), {
    rotationX: -360,
    ease: 'none',
    stagger: 0.14,
    scrollTrigger: trigger(1.2),
  });
  gsap.to('.spin-badge-ring', {
    rotation: 900,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.6 },
  });
}

/** Headings assemble from rotating letters as they scroll into view. */
function rotatingHeadings() {
  gsap.utils.toArray<HTMLElement>('[data-rotate-text]').forEach((element) => {
    const mode = element.dataset.rotateText;
    const { pieces } = splitPieces(element);
    const random = gsap.utils.random;
    const vars: gsap.TweenVars =
      mode === 'y'
        ? {
            rotationY: -110,
            xPercent: -40,
            opacity: 0,
            transformOrigin: '0% 50% -0.3em',
            stagger: { each: 0.04, from: 'center' },
          }
        : mode === 'scatter'
          ? {
              rotation: () => random(-160, 160),
              xPercent: () => random(-260, 260),
              yPercent: () => random(-320, 320),
              scale: 0.2,
              opacity: 0,
              stagger: { each: 0.015, from: 'random' },
            }
          : {
              rotationX: -110,
              yPercent: 60,
              opacity: 0,
              transformOrigin: '50% 50% -0.5em',
              stagger: 0.035,
            };
    gsap.from(pieces, {
      ...vars,
      transformPerspective: 700,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 92%',
        end: mode === 'scatter' ? 'top 30%' : 'top 48%',
        scrub: 0.8,
      },
    });
  });
}

/** Long statements light up word by word, each word tipping upright. */
function wordReveals() {
  gsap.utils.toArray<HTMLElement>('[data-word-reveal]').forEach((element) => {
    const split = SplitText.create(element, { type: 'words', wordsClass: 'split-word' });
    gsap.fromTo(
      split.words,
      {
        opacity: 0.1,
        rotationX: -35,
        yPercent: 25,
        transformOrigin: '50% 100%',
        transformPerspective: 900,
      },
      {
        opacity: 1,
        rotationX: 0,
        yPercent: 0,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: element, start: 'top 85%', end: 'bottom 50%', scrub: 0.6 },
      },
    );
  });
}

/** Experience reads as a timeline; the contact arrow spins into place. */
function perspectiveRows() {
  experienceTimeline();
  gsap.fromTo(
    '.contact-arrow',
    { rotation: -180, scale: 0.4 },
    {
      rotation: 0,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.final-session',
        start: 'top bottom',
        end: 'center center',
        scrub: 0.6,
      },
    },
  );
}

/** The rail draws down as you read; each stop lights up once the line reaches it. */
function experienceTimeline() {
  const timeline = document.querySelector<HTMLElement>('.timeline');
  if (!timeline) return;
  gsap.fromTo(
    timeline.querySelector('.timeline-progress'),
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: timeline, start: 'top 60%', end: 'bottom 60%', scrub: 0.4 },
    },
  );
  timeline.querySelectorAll<HTMLElement>('.timeline-company, .timeline-role').forEach((stop) => {
    ScrollTrigger.create({
      trigger: stop,
      start: 'top 60%',
      onEnter: () => stop.setAttribute('data-reached', ''),
      onLeaveBack: () => stop.removeAttribute('data-reached'),
    });
  });
  timeline.querySelectorAll<HTMLElement>('.timeline-role').forEach((role) => {
    gsap.from(role, {
      x: 70,
      rotationY: 18,
      opacity: 0,
      transformPerspective: 1200,
      transformOrigin: '100% 50%',
      ease: 'power2.out',
      scrollTrigger: { trigger: role, start: 'top 92%', end: 'top 62%', scrub: 0.6 },
    });
  });
}

/** Crossing marquee bands slide with scroll and lean with scroll speed. */
function marquees() {
  const bands = gsap.utils.toArray<HTMLElement>('.marquee-band');
  if (!bands.length) return;
  bands.forEach((band) => {
    const toRight = band.dataset.direction === 'right';
    gsap.fromTo(
      band.querySelector('.marquee-track'),
      { xPercent: toRight ? -25 : 0 },
      {
        xPercent: toRight ? 0 : -25,
        ease: 'none',
        scrollTrigger: {
          trigger: band.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      },
    );
  });
  const lean = bands.map((band) => gsap.quickTo(band, 'skewX', { duration: 0.6, ease: 'power3' }));
  const settle = gsap.delayedCall(0.15, () => lean.forEach((to) => to(0))).pause();
  ScrollTrigger.create({
    onUpdate(self) {
      const skew = gsap.utils.clamp(-12, 12, self.getVelocity() / -220);
      lean.forEach((to) => to(skew));
      settle.restart(true);
    },
  });
}

/** A pinned drum of skills that rolls one full turn across its scroll track. */
function skillDrum() {
  const track = document.querySelector<HTMLElement>('.drum-track');
  const drum = track?.querySelector<HTMLElement>('.skill-drum');
  if (!track || !drum) return;
  const items = Array.from(drum.querySelectorAll<HTMLElement>('li'));
  const label = track.querySelector<HTMLElement>('[data-drum-category]');
  const step = 360 / items.length;
  let active = -1;
  const setActive = (rotation: number) => {
    const index = ((Math.round(rotation / step) % items.length) + items.length) % items.length;
    if (index === active) return;
    items[active]?.removeAttribute('data-active');
    items[index].setAttribute('data-active', '');
    active = index;
    if (label) label.textContent = items[index].dataset.category ?? '';
  };
  setActive(0);
  gsap.fromTo(
    drum,
    { rotationX: 0 },
    {
      rotationX: 360,
      ease: 'none',
      onUpdate: () => setActive(Number(gsap.getProperty(drum, 'rotationX'))),
      scrollTrigger: {
        trigger: track,
        start: () => `top ${headerOffset()}px`,
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    },
  );
}

/** The terminal types itself out line by line as it scrolls through the viewport. */
function terminal() {
  const section = document.querySelector<HTMLElement>('.terminal-interlude');
  if (!section) return;
  const lines = Array.from(section.querySelectorAll<HTMLElement>('.term-line .code-text'));
  const timeline = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 45%', scrub: 0.5 },
  });
  lines.forEach((line) => {
    const chars = Number(line.style.getPropertyValue('--len')) || 0;
    timeline.fromTo(
      line,
      { '--w': 0 },
      { '--w': chars, ease: `steps(${Math.max(chars, 1)})`, duration: Math.max(chars, 4) / 40 },
    );
  });
}

/** The photo opens like curtains, tilts upright, and the image drifts inside its frame. */
function filmStill() {
  const still = document.querySelector<HTMLElement>('.film-still');
  if (!still) return;
  gsap
    .timeline({
      scrollTrigger: { trigger: still, start: 'top 90%', end: 'top 35%', scrub: 0.8 },
    })
    .fromTo(
      still.querySelector('.film-still-frame'),
      { rotation: -12, rotationY: 28, y: 80, scale: 0.86, transformPerspective: 1200 },
      { rotation: -3, rotationY: 0, y: 0, scale: 1, ease: 'power2.out' },
      0,
    )
    .fromTo(
      still.querySelector('.film-still-window'),
      { clipPath: 'inset(50% 0% 50% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', ease: 'expo.inOut' },
      0,
    );
  gsap.fromTo(
    still.querySelector('.film-still-image'),
    { scale: 1.35, yPercent: -6 },
    {
      scale: 1.08,
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: still, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    },
  );
}

/** Supporting rows rise in once as they enter. */
function reveals() {
  const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (!elements.length) return;
  gsap.set(elements, { opacity: 0, y: 48 });
  ScrollTrigger.batch(elements, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }),
  });
}
