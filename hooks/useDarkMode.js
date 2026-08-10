import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'darkMode';
const CLASS_DARK = 'dark-mode';
const CLASS_LIGHT = 'light-mode';

function getInitialValue() {
  if (typeof document === 'undefined') return false;
  return document.body.classList.contains(CLASS_DARK);
}

/**
 * Custom dark mode hook. Reads the body class set by the inline noflash
 * script in _document.js so the initial React render matches the DOM.
 * Returns { value: boolean, toggle, enable, disable }.
 */
export default function useDarkMode() {
  const [value, setValue] = useState(getInitialValue);

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
