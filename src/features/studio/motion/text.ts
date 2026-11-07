import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
// Splitting Thai into characters would separate vowels and tone marks from their
// consonants, so Thai text animates by word (whole lines, as Thai has no spaces).
const THAI = /[\u0E00-\u0E7F]/;
export const splitPieces = (element: HTMLElement) => {
  const thai = THAI.test(element.textContent ?? '');
  const split = SplitText.create(element, {
    type: thai ? 'words' : 'words,chars',
    charsClass: 'split-char',
    wordsClass: 'split-word',
  });
  return { split, pieces: thai ? split.words : split.chars };
};

export function animateText(scope: HTMLElement) {
  rotatingHeadings(scope);
  wordReveals(scope);
}
function rotatingHeadings(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>('[data-rotate-text]', scope).forEach((element) => {
    const mode = element.dataset.rotateText;
    const { pieces } = splitPieces(element);
    const random = gsap.utils.random;
    const vars: gsap.TweenVars =
      mode === 'scatter'
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

function wordReveals(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>('[data-word-reveal]', scope).forEach((element) => {
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
