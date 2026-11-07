import assert from 'node:assert/strict';
import test from 'node:test';
import { Window, type HTMLElement as TestElement } from 'happy-dom';
import type { StudioRuntime } from '../src/features/studio/runtime';

test('StrictMode preserves the prepaint opening, reduced motion settles interrupted typing, and unmount detaches DOM effects', async () => {
  const browser = new Window({ url: 'https://tarpp.dev' });
  const saved = new Map<string, PropertyDescriptor | undefined>();
  const install = (name: string, value: unknown) => {
    saved.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
  };
  for (const name of [
    'window',
    'document',
    'navigator',
    'HTMLElement',
    'Element',
    'Node',
    'MutationObserver',
  ]) {
    install(name, name === 'window' ? browser : browser[name as keyof Window]);
  }
  install('getComputedStyle', browser.getComputedStyle.bind(browser));
  install('requestAnimationFrame', browser.requestAnimationFrame.bind(browser));
  install('cancelAnimationFrame', browser.cancelAnimationFrame.bind(browser));
  install('IS_REACT_ACT_ENVIRONMENT', true);

  let reduced = false;
  const listeners = new Set<() => void>();
  Object.defineProperty(browser, 'matchMedia', {
    configurable: true,
    value: () => ({
      get matches() {
        return reduced;
      },
      addEventListener: (_name: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_name: string, listener: () => void) => listeners.delete(listener),
    }),
  });

  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { StudioProvider, useStudioRuntime } = await import('../src/features/studio/provider');
  const { CodeEditor } = await import('../src/features/studio/code-editor');
  let runtime: StudioRuntime | undefined;
  function Capture() {
    const value = useStudioRuntime();
    React.useEffect(() => {
      runtime = value;
    }, [value]);
    return null;
  }
  const container = browser.document.createElement('div');
  browser.document.body.append(container);
  const root = createRoot(container as unknown as Element);
  let unmounted = false;
  try {
    browser.document.documentElement.dataset.intro = 'play';
    await React.act(async () => {
      root.render(
        React.createElement(
          React.StrictMode,
          null,
          React.createElement(
            StudioProvider,
            null,
            React.createElement(Capture),
            React.createElement(CodeEditor, null, React.createElement('div')),
          ),
        ),
      );
    });
    assert(runtime);
    assert.equal(runtime.getSnapshot().openingPhase, 'play');
    assert.equal(browser.document.documentElement.dataset.intro, 'play');
    assert.equal(browser.document.documentElement.dataset.studioMotion, 'on');

    await React.act(async () => runtime!.revealHero());
    const editor = container.querySelector('.code-editor');
    assert(editor?.hasAttribute('data-running'));
    const code = [...container.querySelectorAll<TestElement>('.code-text')];
    assert(code.some((line) => line.style.getPropertyValue('--w') === '0'));

    await React.act(async () => {
      reduced = true;
      for (const listener of [...listeners]) listener();
    });
    assert.equal(runtime.getSnapshot().motionEnabled, false);
    assert.equal(editor?.hasAttribute('data-running'), false);
    assert(code.every((line) => line.style.getPropertyValue('--w') === ''));
    assert.equal(container.querySelectorAll('.is-typing').length, 0);
    assert.equal(browser.document.documentElement.dataset.studioMotion, undefined);

    await React.act(async () => root.unmount());
    unmounted = true;
    runtime.setMotionEnabled(true);
    runtime.requestOpening();
    runtime.revealHero();
    assert.equal(browser.document.documentElement.dataset.studioMotion, undefined);
    assert.equal(browser.document.documentElement.dataset.intro, undefined);
    assert.equal(listeners.size, 0);
  } finally {
    if (!unmounted) await React.act(async () => root.unmount());
    const { gsap } = await import('gsap');
    gsap.ticker.sleep();
    await browser.happyDOM.close();
    for (const [name, descriptor] of saved) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else Reflect.deleteProperty(globalThis, name);
    }
  }
});
