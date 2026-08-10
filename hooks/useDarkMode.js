import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'darkMode';
const CLASS_DARK = 'dark-mode';
const CLASS_LIGHT = 'light-mode';

/**
 * Custom dark mode hook. Always initializes as light (matching SSR output)
 * then reads the actual theme from the body class after hydration.
 * The inline script in _document.js handles the visual flash via CSS vars
 * on body — this hook syncs the styled-components ThemeProvider after mount.
 */
export default function useDarkMode() {
  // Always start light to match server-rendered markup
  const [value, setValue] = useState(false);

  useEffect(() => {
    // After hydration, read what the noflash script actually set
    const isDark = document.body.classList.contains(CLASS_DARK);
    setValue(isDark);
  }, []);

  useEffect(() => {
    document.body.classList.toggle(CLASS_DARK, value);
    document.body.classList.toggle(CLASS_LIGHT, !value);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
      // localStorage unavailable
    }
  }, [value]);

  const toggle = useCallback(() => setValue(v => !v), []);
  const enable = useCallback(() => setValue(true), []);
  const disable = useCallback(() => setValue(false), []);

  return { value, toggle, enable, disable };
}
