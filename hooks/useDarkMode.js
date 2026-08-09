import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'darkMode';
const CLASS_DARK = 'dark-mode';
const CLASS_LIGHT = 'light-mode';

/**
 * Custom dark mode hook replacing use-dark-mode.
 * Reads from localStorage (synced with noflash.js) and system preference.
 * Returns { value: boolean, toggle, enable, disable }.
 */
export default function useDarkMode(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Read the initial state from what noflash.js already set
    if (document.body.classList.contains(CLASS_DARK)) {
      setValue(true);
    } else if (document.body.classList.contains(CLASS_LIGHT)) {
      setValue(false);
    } else {
      // Fallback: check localStorage or system preference
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          setValue(JSON.parse(stored));
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setValue(prefersDark);
        }
      } catch (e) {
        setValue(false);
      }
    }
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
