'use client';

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { createStudioRuntime, type StudioRuntime } from './runtime';

const StudioContext = createContext<StudioRuntime | null>(null);
const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribePreference(notify: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener('change', notify);
  return () => preference.removeEventListener('change', notify);
}

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <StudioPage key={pathname}>{children}</StudioPage>;
}

function StudioPage({ children }: { children: React.ReactNode }) {
  const [runtime] = useState(createStudioRuntime);
  const [bootstrap] = useState(() => ({ requested: undefined as boolean | undefined }));
  const reducedMotion = useSyncExternalStore<boolean | null>(
    subscribePreference,
    () => window.matchMedia(motionQuery).matches,
    () => null,
  );

  useEffect(() => {
    bootstrap.requested ??= document.documentElement.dataset.intro === 'play';
    const project = () => {
      const snapshot = runtime.getSnapshot();
      const root = document.documentElement;
      if (snapshot.motionEnabled) root.dataset.studioMotion = 'on';
      else delete root.dataset.studioMotion;
      if (snapshot.openingPhase === 'idle') delete root.dataset.intro;
      else root.dataset.intro = snapshot.openingPhase;
    };
    const unsubscribe = runtime.subscribe(project);
    if (runtime.getSnapshot().heroReveal || runtime.getSnapshot().openingRequestId) project();
    return () => {
      unsubscribe();
      delete document.documentElement.dataset.studioMotion;
      if (runtime.getSnapshot().heroReveal || runtime.getSnapshot().openingRequestId)
        delete document.documentElement.dataset.intro;
    };
  }, [runtime, bootstrap]);

  useEffect(() => {
    if (reducedMotion === null) return;
    runtime.initialize({
      motionEnabled: !reducedMotion,
      openingRequested: bootstrap.requested ?? false,
      animateHero: !window.location.hash && window.scrollY < window.innerHeight * 0.25,
    });
    runtime.setMotionEnabled(!reducedMotion);
  }, [runtime, reducedMotion, bootstrap]);

  return <StudioContext.Provider value={runtime}>{children}</StudioContext.Provider>;
}
export function useStudioRuntime() {
  const runtime = useContext(StudioContext);
  if (!runtime) throw new Error('Studio components require StudioProvider');
  return runtime;
}
export function useStudioSnapshot() {
  const runtime = useStudioRuntime();
  return useSyncExternalStore(runtime.subscribe, runtime.getSnapshot, runtime.getServerSnapshot);
}
