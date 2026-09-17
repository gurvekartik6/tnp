export type Theme = 'light' | 'dark';

const THEME_KEY = 'sggs-theme';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    return window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const dark = theme === 'dark';

  root.classList.toggle('theme-dark', dark);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}

export function setTheme(theme: Theme): void {
  applyTheme(theme);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<Theme>('sggs-theme-change', { detail: theme }));
  }
}

export function subscribeToTheme(listener: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const onThemeChange = (event: Event) => {
    const custom = event as CustomEvent<Theme>;
    listener(custom.detail === 'dark' ? 'dark' : 'light');
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_KEY) listener(event.newValue === 'dark' ? 'dark' : 'light');
  };

  window.addEventListener('sggs-theme-change', onThemeChange);
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener('sggs-theme-change', onThemeChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}
