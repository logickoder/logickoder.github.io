// localStorage can throw (private mode, blocked site data). Every read and write
// goes through here so callers get null / a silent no-op instead.

export const THEME_KEY = 'logickoder-theme';
export const SOUND_KEY = 'logickoder-sound';

export function load(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
}
