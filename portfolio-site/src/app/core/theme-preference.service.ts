import { Injectable, effect, signal } from '@angular/core';

export type ColorTheme = 'dark' | 'light';

const storageKey = 'bigya-portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemePreferenceService {
  readonly theme = signal<ColorTheme>(this.readInitialTheme());

  constructor() {
    effect(() => {
      document.documentElement.dataset['theme'] = this.theme();
    });
  }

  toggle(): void {
    const nextTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(nextTheme);

    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Theme changes still work when browser storage is unavailable.
    }
  }

  private readInitialTheme(): ColorTheme {
    try {
      const storedTheme = localStorage.getItem(storageKey);
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
    } catch {
      // Fall through to the system preference.
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
