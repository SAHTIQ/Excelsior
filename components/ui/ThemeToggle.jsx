import { useEffect, useState } from 'react';
import { applyTheme, DARK_THEME, getStoredTheme, persistTheme, toggleTheme } from '../../lib/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(DARK_THEME);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const onToggle = () => {
    const nextTheme = toggleTheme(theme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
    persistTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle dark and light mode"
      className="rounded-md border border-slate-500 px-3 py-1 text-sm transition hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {theme === DARK_THEME ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
