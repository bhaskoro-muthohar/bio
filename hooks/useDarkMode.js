import { useState, useEffect, useCallback } from 'react';

const KEY = 'theme';
const LEGACY_KEY = 'darkMode';
const QUERY = '(prefers-color-scheme: dark)';

export const THEME_CHOICES = ['system', 'light', 'dark'];

function applyClass(dark) {
  const c = document.body.classList;
  c.toggle('dark-mode', dark);
  c.toggle('light-mode', !dark);
}

function readStored() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    // one-time migration from the old boolean key
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === 'true') return 'dark';
    if (legacy === 'false') return 'light';
  } catch (e) {
    // localStorage unavailable (private mode, blocked cookies)
  }
  return 'system';
}

/**
 * Three-state theme control: 'system' (the default) follows the OS and keeps
 * following it, 'light'/'dark' pin the choice and persist it.
 *
 * State starts at 'system' so the client render matches the server's. The
 * painted theme comes from the inline script in _document.js, which runs
 * before first paint, so nothing flashes while this hook catches up. The
 * `ready` gate matters: without it the persistence effect would run once with
 * the pre-hydration default and overwrite a stored preference.
 */
export default function useDarkMode() {
  const [choice, setChoice] = useState('system');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(readStored());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;

    try {
      if (choice === 'system') {
        localStorage.removeItem(KEY);
        localStorage.removeItem(LEGACY_KEY);
      } else {
        localStorage.setItem(KEY, choice);
      }
    } catch (e) {
      // preference simply won't persist
    }

    if (choice !== 'system') {
      applyClass(choice === 'dark');
      return undefined;
    }

    const mql = window.matchMedia(QUERY);
    applyClass(mql.matches);
    const onChange = (event) => applyClass(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [choice, ready]);

  const select = useCallback((next) => {
    if (THEME_CHOICES.includes(next)) setChoice(next);
  }, []);

  return { choice, select, ready };
}
