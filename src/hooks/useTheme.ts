import { useEffect, useState, useSyncExternalStore } from 'react';

import type { Theme } from '../types';

const storageKey = 'portfolio-theme-override';
const darkModeQuery = '(prefers-color-scheme: dark)';

function subscribe(onChange: () => void) {
  const preference = window.matchMedia(darkModeQuery);
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
}

function prefersDark() {
  return window.matchMedia(darkModeQuery).matches;
}

export function useTheme() {
  const deviceIsDark = useSyncExternalStore(subscribe, prefersDark, () => false);
  const [override, setOverride] = useState<Theme | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(storageKey);
    return saved === 'dark' || saved === 'light' ? saved : null;
  });
  const theme = override ?? (deviceIsDark ? 'dark' : 'light');
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (override === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, override);
    }
  }, [theme, override]);

  return {
    isDark,
    isAutomatic: override === null,
    toggleTheme: () => setOverride(isDark ? 'light' : 'dark'),
    resetTheme: () => setOverride(null),
  };
}
