import { Injectable } from '@angular/core';

export type AppMode = 'light-mode' | 'dark-mode';
@Injectable({
  providedIn: 'root',
})
export class mode {

  private readonly  STORAGE_KEY = 'mode';


  get current(): AppMode {
    return (localStorage.getItem(this.STORAGE_KEY) as AppMode) || 'light-mode';
  }
  set(mode: AppMode) {
    const root = document.documentElement;
      root.classList.remove('light-mode', 'dark-mode');

    root.classList.add(mode);
    localStorage.setItem(this.STORAGE_KEY, mode);

  }
  toggle() {

    this.set(this.current === 'light-mode' ? 'dark-mode' : 'light-mode');
  }


}
