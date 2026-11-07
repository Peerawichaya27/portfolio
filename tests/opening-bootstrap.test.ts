import assert from 'node:assert/strict';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { filmIntroScript } from '../src/features/studio/opening-bootstrap';

type Environment = {
  hash?: string;
  reduced?: boolean;
  screen?: boolean;
  seen?: boolean;
  storageDenied?: boolean;
};
const bootstrap = (environment: Environment = {}) => {
  const root = { dataset: {} as Record<string, string> };
  runInNewContext(filmIntroScript, {
    document: { documentElement: root },
    location: { hash: environment.hash ?? '' },
    matchMedia: (query: string) => ({
      matches: query === 'screen' ? environment.screen !== false : environment.reduced === true,
    }),
    sessionStorage: {
      getItem() {
        if (environment.storageDenied) throw new Error('Storage denied');
        return environment.seen ? '1' : null;
      },
    },
  });
  return root.dataset.intro;
};

test('first screen visit covers the page before the opening components load', () => {
  assert.equal(bootstrap(), 'play');
});

test('reduced motion, deep links, print, and repeat visits never get an opening cover', () => {
  for (const environment of [
    { reduced: true },
    { hash: '#research' },
    { screen: false },
    { seen: true },
  ]) {
    assert.equal(bootstrap(environment), undefined);
  }
});

test('unavailable storage cannot leave a blocking prepaint cover', () => {
  assert.doesNotThrow(() => bootstrap({ storageDenied: true }));
  assert.equal(bootstrap({ storageDenied: true }), undefined);
});
