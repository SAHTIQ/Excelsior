export const THEME_KEY = 'team-excelsior-theme';
export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

export function getStoredTheme() {
  if (typeof window === 'undefined') return DARK_THEME;
  return localStorage.getItem(THEME_KEY) || DARK_THEME;
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === DARK_THEME) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function toggleTheme(currentTheme) {
  return currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
}

export function persistTheme(theme) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
}
