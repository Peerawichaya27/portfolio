import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const noop = () => () => {};

export function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const dark = !mounted || resolvedTheme !== 'light';
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-label={dark ? toLight : toDark}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
