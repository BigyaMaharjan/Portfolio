import { Injectable, OnDestroy, effect, signal } from '@angular/core';

const storageKey = 'bigya-portfolio-reduced-motion';

@Injectable({ providedIn: 'root' })
export class MotionPreferenceService implements OnDestroy {
  private readonly mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  private hasOverride = this.readOverride() !== null;
  readonly reducedMotion = signal(this.readInitialPreference());

  private readonly onSystemPreferenceChange = (event: MediaQueryListEvent): void => {
    if (!this.hasOverride) {
      this.reducedMotion.set(event.matches);
    }
  };

  constructor() {
    this.mediaQuery.addEventListener('change', this.onSystemPreferenceChange);
    effect(() => {
      document.documentElement.dataset['motion'] = this.reducedMotion() ? 'reduce' : 'full';
    });
  }

  toggle(): void {
    const nextPreference = !this.reducedMotion();
    this.hasOverride = true;
    this.reducedMotion.set(nextPreference);

    try {
      localStorage.setItem(storageKey, nextPreference ? 'reduce' : 'full');
    } catch {
      // Motion preference still applies for this session without storage.
    }
  }

  ngOnDestroy(): void {
    this.mediaQuery.removeEventListener('change', this.onSystemPreferenceChange);
  }

  private readInitialPreference(): boolean {
    return this.readOverride() ?? this.mediaQuery.matches;
  }

  private readOverride(): boolean | null {
    try {
      const storedPreference = localStorage.getItem(storageKey);
      if (storedPreference === 'reduce') {
        return true;
      }
      if (storedPreference === 'full') {
        return false;
      }
    } catch {
      // Fall through to the system preference.
    }

    return null;
  }
}