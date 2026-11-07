import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { headerOffset } from './geometry';

export function animateContent(scope: HTMLElement) {
  const label = scope.querySelector<HTMLElement>('[data-drum-category]');
  const text = label?.textContent;
  perspectiveRows(scope);
  marquees(scope);
  skillDrum(scope);
  terminal(scope);
  filmStill(scope);
  reveals(scope);
  return () => {
    scope
      .querySelectorAll('[data-reached]')
      .forEach((element) => element.removeAttribute('data-reached'));
    scope
      .querySelectorAll('[data-active]')
      .forEach((element) => element.removeAttribute('data-active'));
    if (label && text !== undefined) label.textContent = text;
  };
}
function perspectiveRows(scope: HTMLElement) {
  experienceTimeline(scope);
  gsap.fromTo(
    scope.querySelector('.contact-arrow'),
    { rotation: -180, scale: 0.4 },
    {
      rotation: 0,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: scope.querySelector('.final-session'),
        start: 'top bottom',
        end: 'center center',
        scrub: 0.6,
      },
    },
  );
}

function experienceTimeline(scope: HTMLElement) {
  const timeline = scope.querySelector<HTMLElement>('.timeline');
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

function marquees(scope: HTMLElement) {
  const bands = gsap.utils.toArray<HTMLElement>('.marquee-band', scope);
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

function skillDrum(scope: HTMLElement) {
  const track = scope.querySelector<HTMLElement>('.drum-track');
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

function terminal(scope: HTMLElement) {
  const section = scope.querySelector<HTMLElement>('.terminal-interlude');
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

function filmStill(scope: HTMLElement) {
  const still = scope.querySelector<HTMLElement>('.film-still');
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

function reveals(scope: HTMLElement) {
  const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope);
  if (!elements.length) return;
  gsap.set(elements, { opacity: 0, y: 48 });
  ScrollTrigger.batch(elements, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }),
  });
}
