export const FILM_INTRO_KEY = 'tarpp:film-intro';

/**
 * Runs before first paint so the opening titles cover the page without a flash.
 * Skipped for reduced motion, deep links, and visitors who already saw it this session.
 */
export const filmIntroScript = `(function(){try{var d=document.documentElement;if(location.hash||!matchMedia('screen').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(sessionStorage.getItem('${FILM_INTRO_KEY}'))return;d.dataset.intro='play';}catch(e){}})();`;
