import assert from 'node:assert/strict';
import test from 'node:test';
import { createStudioRuntime, type HeroReveal } from '../src/features/studio/runtime';

const start = (openingRequested = false, animateHero = true) => {
  const runtime = createStudioRuntime();
  runtime.initialize({ motionEnabled: true, openingRequested, animateHero });
  return runtime;
};

test('opening waits for reveal and late-loading guitar receives the same reveal', () => {
  const runtime = start(true);
  const observed: HeroReveal[] = [];
  runtime.onHeroReveal((reveal) => observed.push(reveal));
  assert.equal(observed.length, 0);
  assert.equal(runtime.getSnapshot().openingPhase, 'play');

  runtime.revealHero();
  runtime.revealHero();
  runtime.finishOpening();
  assert.equal(observed.length, 1);
  assert.equal(observed[0].animate, true);
  assert.equal(runtime.getSnapshot().openingPhase, 'idle');

  const late: HeroReveal[] = [];
  runtime.onHeroReveal((reveal) => late.push(reveal));
  assert.deepEqual(late, observed);
});

test('a repeat visit reveals immediately while a deep link uses a settled hero', () => {
  const repeat = start();
  const deepLink = start(false, false);
  assert.equal(repeat.getSnapshot().heroReveal?.animate, true);
  assert.equal(deepLink.getSnapshot().heroReveal?.animate, false);
  assert.equal(repeat.getSnapshot().openingPhase, 'idle');
  assert.equal(deepLink.getSnapshot().openingPhase, 'idle');
});

test('replay reaches a consumer that mounted without the initial film', () => {
  const runtime = start();
  const observed: HeroReveal[] = [];
  const unsubscribe = runtime.onHeroReveal((reveal) => observed.push(reveal));
  runtime.requestOpening();
  runtime.revealHero();
  runtime.finishOpening();
  assert.equal(observed.length, 2);
  assert(observed[1].id > observed[0].id);
  unsubscribe();
  runtime.requestOpening();
  runtime.revealHero();
  assert.equal(observed.length, 2);
});

test('reduced motion settles an active opening and blocks replay and strums', () => {
  const runtime = start(true);
  const strums: string[] = [];
  runtime.onStrum((source) => strums.push(source));
  runtime.setHeroProgress(0.6);
  runtime.setMotionEnabled(false);
  assert.equal(runtime.getSnapshot().openingPhase, 'idle');
  assert.equal(runtime.getSnapshot().heroReveal?.animate, false);
  const request = runtime.getSnapshot().openingRequestId;
  runtime.requestOpening();
  runtime.strum('editor');
  assert.equal(runtime.getSnapshot().openingRequestId, request);
  assert.deepEqual(strums, []);
  const progress: number[] = [];
  runtime.onHeroProgress((value) => progress.push(value));
  assert.deepEqual(progress, [0]);
});

test('initial reduced motion never starts an opening', () => {
  const runtime = createStudioRuntime();
  runtime.initialize({ motionEnabled: false, openingRequested: true, animateHero: true });
  assert.equal(runtime.getSnapshot().openingPhase, 'idle');
  assert.equal(runtime.getSnapshot().heroReveal?.animate, false);
  assert.equal(runtime.getSnapshot().openingRequestId, 0);
});

test('strums are explicit, source-aware, and unsubscribed consumers stay detached', () => {
  const runtime = start();
  const observed: string[] = [];
  const detach = runtime.onStrum((source) => observed.push(source));
  runtime.strum('intro');
  runtime.strum('editor');
  detach();
  runtime.strum('editor');
  assert.deepEqual(observed, ['intro', 'editor']);
});

test('progress replays to a late renderer and stays finite and bounded', () => {
  const runtime = start();
  runtime.setHeroProgress(0.42);
  const values: number[] = [];
  const detach = runtime.onHeroProgress((value) => values.push(value));
  assert.deepEqual(values, [0.42]);
  runtime.setHeroProgress(2);
  runtime.setHeroProgress(-1);
  runtime.setHeroProgress(Number.NaN);
  assert(values.every((value) => Number.isFinite(value) && value >= 0 && value <= 1));
  assert(values.includes(1));
  const count = values.length;
  detach();
  runtime.setHeroProgress(0.7);
  assert.equal(values.length, count);
});

test('old control cleanup cannot unregister a newly mounted intro', () => {
  const runtime = start(true);
  const invoked: string[] = [];
  const oldDetach = runtime.registerOpeningControls({ skip: () => invoked.push('old') });
  const newDetach = runtime.registerOpeningControls({ skip: () => invoked.push('new') });
  oldDetach();
  runtime.skipOpening();
  assert.deepEqual(invoked, ['new']);
  newDetach();
  runtime.skipOpening();
  assert.equal(runtime.getSnapshot().openingPhase, 'idle');
  assert.equal(runtime.getSnapshot().heroReveal?.animate, true);
});

test('skipping an idle opening never invents another entrance', () => {
  const runtime = start();
  const reveal = runtime.getSnapshot().heroReveal;
  runtime.skipOpening();
  assert.equal(runtime.getSnapshot().heroReveal, reveal);
});

test('initialization is idempotent and independent page runtimes do not share state', () => {
  const runtime = start(true);
  const request = runtime.getSnapshot().openingRequestId;
  runtime.initialize({ motionEnabled: true, openingRequested: true, animateHero: true });
  assert.equal(runtime.getSnapshot().openingRequestId, request);
  const other = createStudioRuntime();
  assert.equal(other.getSnapshot().motionEnabled, false);
  assert.equal(other.getSnapshot().heroReveal, null);
});

test('late consumers wait for the current replay instead of running a stale reveal', () => {
  const runtime = start();
  const previous = runtime.getSnapshot().heroReveal;
  runtime.requestOpening();
  const observed: HeroReveal[] = [];
  runtime.onHeroReveal((reveal) => observed.push(reveal));
  assert.equal(observed.length, 0);
  runtime.revealHero();
  assert.equal(observed.length, 1);
  assert(observed[0].id > (previous?.id ?? 0));
});
