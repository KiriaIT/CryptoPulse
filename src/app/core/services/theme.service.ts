import { effect, Injectable, signal } from '@angular/core';

import { STORAGE_KEYS } from '../constants/storage-keys.constants';

/** Manages dark/light mode by toggling the `dark` class on `<html>`. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _isDark = signal<boolean>(
    localStorage.getItem(STORAGE_KEYS.THEME) === 'dark' ||
      (!localStorage.getItem(STORAGE_KEYS.THEME) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  readonly isDark = this._isDark.asReadonly();

  constructor() {
    effect(() => {
      const dark = this._isDark();
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem(STORAGE_KEYS.THEME, dark ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this._isDark.update((v) => !v);
  }
}
