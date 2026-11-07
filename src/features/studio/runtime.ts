export type OpeningBounds = Readonly<{ top: number; right: number; bottom: number; left: number }>;
export type StrumSource = 'intro' | 'editor';
export type HeroReveal = Readonly<{ id: number; animate: boolean }>;
export type StudioSnapshot = Readonly<{
  motionEnabled: boolean;
  openingPhase: 'idle' | 'play' | 'reveal';
  openingRequestId: number;
  heroReveal: HeroReveal | null;
}>;
export type StudioStartup = {
  motionEnabled: boolean;
  openingRequested: boolean;
  animateHero: boolean;
};

const initialSnapshot: StudioSnapshot = {
  motionEnabled: false,
  openingPhase: 'idle',
  openingRequestId: 0,
  heroReveal: null,
};

export function createStudioRuntime() {
  let snapshot = initialSnapshot;
  let initialized = false;
  let animateLanding = false;
  let heroProgress = 0;
  let guitarBounds: (() => OpeningBounds | null) | undefined;
  let openingTarget: (() => OpeningBounds | null) | undefined;
  let controls: { skip: () => void } | undefined;
  const listeners = new Set<() => void>();
  const reveals = new Set<(reveal: HeroReveal) => void>();
  const strums = new Set<(source: StrumSource) => void>();
  const progressListeners = new Set<(progress: number) => void>();

  const update = (next: StudioSnapshot) => {
    snapshot = next;
    [...listeners].forEach((listener) => listener());
  };
  const reveal = (animate: boolean) => {
    const heroReveal = { id: (snapshot.heroReveal?.id ?? 0) + 1, animate };
    update({
      ...snapshot,
      openingPhase: snapshot.openingPhase === 'play' ? 'reveal' : 'idle',
      heroReveal,
    });
    [...reveals].forEach((listener) => listener(heroReveal));
  };
  const runtime = {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initialSnapshot,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    initialize(startup: StudioStartup) {
      if (initialized) return;
      initialized = true;
      animateLanding = startup.animateHero;
      update({ ...snapshot, motionEnabled: startup.motionEnabled });
      if (startup.motionEnabled && startup.openingRequested) runtime.requestOpening();
      else reveal(startup.motionEnabled && startup.animateHero);
    },
    setMotionEnabled(motionEnabled: boolean) {
      if (snapshot.motionEnabled === motionEnabled) return;
      const wasOpening = snapshot.openingPhase !== 'idle';
      update({
        ...snapshot,
        motionEnabled,
        openingPhase: motionEnabled ? snapshot.openingPhase : 'idle',
      });
      if (!motionEnabled) {
        runtime.setHeroProgress(0);
        reveal(false);
      } else if (!snapshot.heroReveal?.animate && !wasOpening) reveal(animateLanding);
    },
    requestOpening() {
      if (!snapshot.motionEnabled) return;
      update({
        ...snapshot,
        openingPhase: 'play',
        openingRequestId: snapshot.openingRequestId + 1,
      });
    },
    revealHero() {
      if (snapshot.openingPhase === 'play') reveal(snapshot.motionEnabled);
    },
    finishOpening() {
      if (snapshot.openingPhase === 'play') reveal(snapshot.motionEnabled);
      update({ ...snapshot, openingPhase: 'idle' });
    },
    skipOpening() {
      if (snapshot.openingPhase !== 'play') return;
      if (controls) controls.skip();
      else {
        reveal(snapshot.motionEnabled);
        runtime.finishOpening();
      }
    },
    registerGuitarBounds(measure: () => OpeningBounds | null) {
      guitarBounds = measure;
      return () => {
        if (guitarBounds === measure) guitarBounds = undefined;
      };
    },
    measureGuitarBounds: () => guitarBounds?.() ?? null,
    registerOpeningTarget(measure: () => OpeningBounds | null) {
      openingTarget = measure;
      return () => {
        if (openingTarget === measure) openingTarget = undefined;
      };
    },
    measureOpeningTarget: () => openingTarget?.() ?? null,
    registerOpeningControls(next: { skip: () => void }) {
      controls = next;
      return () => {
        if (controls === next) controls = undefined;
      };
    },
    onHeroReveal(listener: (reveal: HeroReveal) => void) {
      reveals.add(listener);
      if (snapshot.heroReveal && snapshot.openingPhase !== 'play') listener(snapshot.heroReveal);
      return () => {
        reveals.delete(listener);
      };
    },
    strum(source: StrumSource) {
      if (snapshot.motionEnabled) [...strums].forEach((listener) => listener(source));
    },
    onStrum(listener: (source: StrumSource) => void) {
      strums.add(listener);
      return () => {
        strums.delete(listener);
      };
    },
    setHeroProgress(progress: number) {
      const next = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;
      if (next === heroProgress) return;
      heroProgress = next;
      [...progressListeners].forEach((listener) => listener(next));
    },
    onHeroProgress(listener: (progress: number) => void) {
      progressListeners.add(listener);
      listener(heroProgress);
      return () => {
        progressListeners.delete(listener);
      };
    },
  };
  return runtime;
}
export type StudioRuntime = ReturnType<typeof createStudioRuntime>;
